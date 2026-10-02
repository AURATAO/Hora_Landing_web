export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.horaapp.co";

// TODO: replace APP_STORE_URL with the real App Store listing URL once the app is live.
// While it still equals the placeholder, APP_STORE_LIVE is false and the "Now on the App Store" card stays hidden.
const APP_STORE_PLACEHOLDER_URL = "https://apps.apple.com/";
export const APP_STORE_URL = APP_STORE_PLACEHOLDER_URL;
export const APP_STORE_LIVE = APP_STORE_URL !== APP_STORE_PLACEHOLDER_URL;
// Hero visual: "A" = photograph with a floating notification, "B" = phone mockup.
// Add ?hero=a or ?hero=b to the URL to preview the other one without changing this.
export const HERO_VARIANT = "A";
export const WEB_APP_URL = "https://mvp.horaapp.co";
// The product's application form. Requires an account: signed-out visitors are sent to sign-in first,
// then on to the form. Linked from /beta (the Supporter page), which is where the site's own
// "Apply as a Supporter" links go.
export const SUPPORTER_APPLY_URL = `${WEB_APP_URL}/become-supporter`;
