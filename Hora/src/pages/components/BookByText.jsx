import { IMESSAGE_NUMBER, IMESSAGE_URL, WHATSAPP_NUMBER, WHATSAPP_URL } from "../../lib/config";

// The two ways to book by text. Pass linkClass so the links match the surrounding section.
export function IMessageLine({ linkClass }) {
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
