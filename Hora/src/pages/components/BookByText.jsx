import { BOOKING_LIVE, IMESSAGE_NUMBER, IMESSAGE_URL, WHATSAPP_NUMBER, WHATSAPP_URL } from "../../lib/config";
import WaitlistLine from "./Waitlist";

// Every export here shows a booking number, so each one falls back to the
// waitlist line (or nothing) while BOOKING_LIVE is false.

// The two ways to book by text. Pass linkClass so the links match the surrounding section.
export function IMessageLine({ linkClass }) {
  if (!BOOKING_LIVE) return null;
  return (
    <>
      On iPhone: text HO:RA on iMessage at{" "}
      <a href={IMESSAGE_URL} className={linkClass}>
        {IMESSAGE_NUMBER}
      </a>
      .
    </>
  );
}

export function WhatsAppLine({ linkClass }) {
  if (!BOOKING_LIVE) return null;
  return (
    <>
      On WhatsApp: message HO:RA at {WHATSAPP_NUMBER}.{" "}
      <a href={WHATSAPP_URL} className={linkClass} target="_blank" rel="noopener noreferrer">
        Open in WhatsApp
      </a>
    </>
  );
}

export default function BookByText({ className = "", linkClass = "font-semibold underline underline-offset-4", after = null }) {
  if (!BOOKING_LIVE) {
    return (
      <div className={className}>
        <WaitlistLine linkClass={linkClass} />
        {after && <p>{after}</p>}
      </div>
    );
  }
  return (
    <div className={className}>
      <p>
        <IMessageLine linkClass={linkClass} />
      </p>
      <p>
        <WhatsAppLine linkClass={linkClass} />
      </p>
      {after && <p>{after}</p>}
    </div>
  );
}
