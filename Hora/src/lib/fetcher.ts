import { API_BASE } from "./config";

function joinUrl(path: string) {
  // 若已是絕對網址就原樣返回
  if (/^https?:\/\//i.test(path)) return path;
  // 把 "/submit-demo" 這種相對路徑補上 API_BASE
  return new URL(path.replace(/^\//, ""), API_BASE + "/").toString();
}

export async function postJSON<T>(
  url: string,
  data: any,
  { timeoutMs = 8000, retries = 1 } = {}
): Promise<T> {
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
      await new Promise(r => setTimeout(r, 400));
      return postJSON<T>(url, data, { timeoutMs, retries: retries - 1 });
    }
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(text || `HTTP ${res.status}`) as any;
      (err as any).status = res.status;
      throw err;
    }
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return (await res.json()) as T;
    return {} as T;
  } catch (e: any) {
    if (e?.name === "AbortError") {
      const err = new Error("Network timeout, please retry.") as any;
      err.status = 408;
      throw err;
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}