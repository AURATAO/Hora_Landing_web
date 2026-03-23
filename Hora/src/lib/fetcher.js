import { API_BASE } from "./config";

function joinUrl(path) {
  // Return absolute URLs as-is
  if (/^https?:\/\//i.test(path)) return path;
  // Prepend API_BASE for relative paths like "/submit-demo"
  return new URL(path.replace(/^\//, ""), API_BASE + "/").toString();
}

export async function postJSON(url, data, { timeoutMs = 8000, retries = 1 } = {}) {
  const fullUrl = joinUrl(url);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data ?? {}),
      signal: ctrl.signal,
    });

    if (res.status >= 500 && retries > 0) {
      await new Promise((r) => setTimeout(r, 400));
      return postJSON(url, data, { timeoutMs, retries: retries - 1 });
    }
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(text || `HTTP ${res.status}`);
      err.status = res.status;
      throw err;
    }
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return await res.json();
    return {};
  } catch (e) {
    if (e?.name === "AbortError") {
      const err = new Error("Network timeout, please retry.");
      err.status = 408;
      throw err;
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
