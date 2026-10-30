import { Link } from "react-router-dom";

// The homepage is three sections now; an anchor list of them is longer than the
// page it indexes. What belongs here is the rest of the site.
const sectionLinks = [
  { to: "/", label: "Need help?" },
  { to: "/supporters", label: "For Supporters" },
  { to: "/faq", label: "FAQ" },
];

const companyLinks = [
  { to: "/mission", label: "Mission" },
  { to: "/Contact", label: "Contact" },
];

const legalLinks = [
  { to: "/support", label: "Support" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
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

        {/* The only App Store link on a requester-facing page, and it is labelled for
            whom: a requester who follows it would land in a Supporter's dashboard. */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-6">
          <p className="text-sm text-ink/70">
            © {new Date().getFullYear()} Arcodiax LLC · Delaware, United States ·{" "}
            <a href="mailto:info@my-hora.com" className="underline underline-offset-2 hover:text-forest">
              info@my-hora.com
            </a>
          </p>
          <Link
            to="/supporters"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-ink/20 px-4 py-2.5 transition hover:bg-ink/5"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-ink">
              <path d="M16.4 12.8c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2s1.3-.6 2.5-.6 1.5.6 2.6.6 1.7-1 2.4-1.9c.7-1.1 1-2.2 1-2.3 0 0-1.9-.7-2-3.1ZM14.5 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9 0 1.8-.5 2.4-1.2Z" />
            </svg>
            <span className="text-[13.5px] font-semibold">HO:RA for iPhone</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
