import pb from "../lib/pb";

// Use this to log in a real user with credentials they type into a form.
// Example:
//   import { loginUser } from '../utils/auth';
//   await loginUser(email, password);
export async function loginUser(email, password) {
  return pb.collection("users").authWithPassword(email, password);
}

export function logoutUser() {
  pb.authStore.clear();
}

// ⚠️ DO NOT add admin/service-account credentials here.
// VITE_* env vars are compiled into the public JS bundle and are
// visible to anyone in DevTools. Admin auth must live in the Go backend.
