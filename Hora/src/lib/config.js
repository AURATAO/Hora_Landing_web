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

// The iMessage channel — the one and only requester CTA on this site.
//
// TODO: replace IMESSAGE_NUMBER with the real Sendblue number. Two things read it:
// the visible label on the button, and IMESSAGE_HREF below. Change it here only.
// While it equals the placeholder, IMESSAGE_LIVE is false — use that to gate
// anything that must not ship pointing at a dead number.
const IMESSAGE_PLACEHOLDER = "+1 (000) 000-0000";
export const IMESSAGE_NUMBER = IMESSAGE_PLACEHOLDER;
export const IMESSAGE_LIVE = IMESSAGE_NUMBER !== IMESSAGE_PLACEHOLDER;

// The draft we put in the composer. Deliberately unfinished: "I need help with"
// leaves the cursor where the person carries on, which is a far lower bar than
// an empty thread or a complete sentence they have to delete.
export const IMESSAGE_DRAFT = "Hi — I need help with";

// sms: works on iOS and Android and is what Apple documents for prefilled bodies.
// The `&body=` separator is correct after a bare number on iOS 8+; Android accepts
// `?body=` only, so the hero keeps a visible web-app fallback rather than relying
// on this link alone.
export const IMESSAGE_HREF = `sms:${IMESSAGE_NUMBER.replace(/[^\d+]/g, "")}&body=${encodeURIComponent(IMESSAGE_DRAFT)}`;
