export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.horaapp.co";

// TODO: replace with the real App Store listing URL once the app is live.
export const APP_STORE_URL = "https://apps.apple.com/";
export const WEB_APP_URL = "https://mvp.horaapp.co";
// Requires an account: signed-out visitors are sent to sign-in first, then on to the application form.
export const SUPPORTER_APPLY_URL = `${WEB_APP_URL}/become-supporter`;
