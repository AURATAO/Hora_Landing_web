import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

async function loginAsPublicUser() {
  try {
    await pb
      .collection("users")
      .authWithPassword(
        import.meta.env.VITE_PB_EMAIL,
        import.meta.env.VITE_PB_PASSWORD
      );
    console.log("✅ public user 登入成功");
  } catch (error) {
    console.error("❌ public user 登入失敗：", error);
  }
}

loginAsPublicUser();

export default pb;
