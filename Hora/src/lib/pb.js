import PocketBase from "pocketbase";

// Set VITE_PB_URL in .env for local dev, and in your Vercel env vars for production.
const pb = new PocketBase(
  import.meta.env.VITE_PB_URL || "http://127.0.0.1:8090"
);

// 開啟 localStorage 支援（預設就會自動儲存登入狀態）

export default pb;
