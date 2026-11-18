import { LAUNCH_NOTE, WAITLIST_URL } from "../../lib/config";

// Shown in place of the iMessage / WhatsApp CTAs while BOOKING_LIVE is false.
// Pass linkClass so the link matches the surrounding section.
export default function WaitlistLine({ className = "", linkClass = "font-semibold underline underline-offset-4" }) {
  return (
    <p className={className}>
      {LAUNCH_NOTE}{" "}
      <a href={WAITLIST_URL} className={linkClass}>
        Join the waitlist
      </a>
    </p>
  );
}
