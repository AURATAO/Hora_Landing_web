import { Link } from "react-router-dom";
import { IMESSAGE_NUMBER, IMESSAGE_URL, WHATSAPP_NUMBER, WHATSAPP_URL } from "../../lib/config";

const sectionLinks = [
  { to: "/#services", label: "Services" },
  { to: "/#how-it-works", label: "How it works" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/#trust", label: "Trust" },
];

const companyLinks = [
  { to: "/#supporters", label: "Become a Supporter" },
  { to: "/mission", label: "Mission" },
  { to: "/faq", label: "FAQ" },
  { to: "/Contact", label: "Contact" },
];

const legalLinks = [
  { to: "/support", label: "Support" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/privacy", label: "Privacy Policy" },
];

// bookingNumbers: show the customer booking numbers. Supporter pages pass false.
export default function Footer({ bookingNumbers = true }) {
  return (
    <footer className="w-full bg-cream text-ink">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <Link to="/" aria-label="HO:RA home" className="shrink-0 self-start">
            <img src="/img/hora_logo.png" alt="HO:RA" width="2239" height="707" className="h-10 w-auto" />
          </Link>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 md:gap-x-16">
            {[sectionLinks, companyLinks, legalLinks].map((links) => (
              <ul key={links[0].label} className="flex flex-col gap-3">
                {links.map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-ink/80 hover:text-forest transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {bookingNumbers && (
          <p className="mt-12 text-sm text-ink/80">
            Book by text. iMessage:{" "}
            <a href={IMESSAGE_URL} className="underline underline-offset-2 hover:text-forest">
              {IMESSAGE_NUMBER}
            </a>{" "}
            · WhatsApp: {WHATSAPP_NUMBER}{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-forest"
            >
              Open in WhatsApp
            </a>
          </p>
        )}

        <p className={`${bookingNumbers ? "mt-6" : "mt-12"} border-t border-ink/15 pt-6 text-sm text-ink/70`}>
          © {new Date().getFullYear()} Arcodiax LLC · Delaware, United States ·{" "}
          <a href="mailto:info@my-hora.com" className="underline underline-offset-2 hover:text-forest">
            info@my-hora.com
          </a>
        </p>
      </div>
    </footer>
  );
}
