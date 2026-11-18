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

// Booking is live (backend gate live and tested, 2026-11-18). While BOOKING_LIVE is false the site shows no iMessage or
// WhatsApp number or link anywhere; every booking CTA becomes LAUNCH_NOTE plus a
// "Join the waitlist" link to WAITLIST_URL instead. Set it back to false to hide the
// numbers again; the waitlist code stays in place for that.
export const BOOKING_LIVE = true;
export const LAUNCH_NOTE = "HO:RA launches in New York City in December.";
export const WAITLIST_URL = "mailto:info@my-hora.com?subject=Waitlist";

// The iMessage channel — the one and only requester CTA on this site.
//
// TODO: replace IMESSAGE_NUMBER with the real Sendblue number. Two things read it:
// the visible label on the button, and IMESSAGE_HREF below. Change it here only.
// While it equals the placeholder, IMESSAGE_LIVE is false — use that to gate
// anything that must not ship pointing at a dead number.
const IMESSAGE_PLACEHOLDER = "+1 (000) 000-0000";
export const IMESSAGE_NUMBER = "+1 (917) 741-0961";
export const IMESSAGE_LIVE = IMESSAGE_NUMBER !== IMESSAGE_PLACEHOLDER;

// The draft we put in the composer. Deliberately unfinished: "I need help with"
// leaves the cursor where the person carries on, which is a far lower bar than
// an empty thread or a complete sentence they have to delete.
export const IMESSAGE_DRAFT = "Hi — I need help with";

// sms: works on iOS and Android and is what Apple documents for prefilled bodies.
// The `&body=` separator is correct after a bare number on iOS 8+; Android accepts
// `?body=` only, which is why non-Apple devices are offered WhatsApp first
// (lib/channel.js) and never this link on its own.
export const imessageHrefFor = (body) =>
  `sms:${IMESSAGE_NUMBER.replace(/[^\d+]/g, "")}&body=${encodeURIComponent(body)}`;
export const IMESSAGE_HREF = imessageHrefFor(IMESSAGE_DRAFT);

// The WhatsApp channel (live 2026-11-14, Meta Cloud API). Works where iMessage
// can't: Android phones, and Windows/Linux computers through WhatsApp Web or
// Desktop. wa.me takes the digits with no "+" and pre-fills `text`.
export const WHATSAPP_NUMBER = "+1 (332) 301-4299";
export const whatsappHrefFor = (body) =>
  `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(body)}`;
export const WHATSAPP_HREF = whatsappHrefFor(IMESSAGE_DRAFT);

// Plain links with no pre-filled text (from main). iMessage and WhatsApp are
// different numbers: never swap them.
const digitsOnly = (n) => n.replace(/\D/g, "");
export const IMESSAGE_URL = `sms:+${digitsOnly(IMESSAGE_NUMBER)}`;
export const WHATSAPP_URL = `https://wa.me/${digitsOnly(WHATSAPP_NUMBER)}`;
