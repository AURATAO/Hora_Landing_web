import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// 開啟 localStorage 支援（預設就會自動儲存登入狀態）

export default pb;
