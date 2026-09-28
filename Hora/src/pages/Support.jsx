import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";

const SUPPORT_EMAIL = "info@my-hora.com";

const sections = [
  { id: "contact", label: "Contact" },
  { id: "pricing", label: "How pricing works" },
  { id: "cancelling", label: "Cancelling" },
  { id: "becoming-a-supporter", label: "Becoming a supporter" },
  { id: "service-area", label: "Service area" },
];

const pricing = [
  "$12 base covers the first 15 minutes, then $0.50 per minute",
  "Companionship tasks: $25 base, same per-minute rate",
  "Evening & overnight (9 PM–8 AM): $1.00 per minute after the first 15",
  "Shopping budgets are set by you and reimbursed in full against a photo of the receipt",
  "Purchases up to $5 over the approved budget are reimbursed automatically; anything more, or extra time, needs your approval first",
];

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 rounded-2xl border border-accent/15 bg-accent/5 p-6 md:p-8"
    >
      <h2 id={`${id}-title`} className="text-accent text-xl md:text-2xl font-semibold mb-3">
        {title}
      </h2>
      <div className="text-accent/90 font-secondary text-base md:text-lg leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function Support() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <Helmet>
        <title>Support | HO:RA</title>
        <meta
          name="description"
          content="HO:RA support — contact us, how pricing works, cancelling, becoming a supporter, and where HO:RA is available."
        />
      </Helmet>
      <Header handleColor="bg-primary/40" onDemoClick={() => setShowDemoModal(true)} />
      <main
        id="main-content"
        className="bg-linear-to-br from-primary to-primary/50 min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4"
      >
        <DemoModal show={showDemoModal === true} onClose={() => setShowDemoModal(false)} />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-accent mb-6">HO:RA Support</h1>

          <nav aria-label="Support sections" className="flex flex-wrap gap-2 mb-10">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <Section id="contact" title="Contact">
              <p>
                Email{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-secondary font-semibold underline underline-offset-4 hover:text-secondary/80 break-all"
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                — we reply within 24 hours.
              </p>
            </Section>

            <Section id="pricing" title="How pricing works">
              <ul className="space-y-2">
                {pricing.map((item) => (
                  <li key={item} className="list-disc ml-5 md:ml-6 marker:text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="cancelling" title="Cancelling">
              <p>
                Free within 3 minutes of a supporter accepting. After that you're charged the $12 base
                fee (or the time already worked, if more), which goes to your supporter for the time
                they committed.
              </p>
            </Section>

            <Section id="becoming-a-supporter" title="Becoming a supporter">
              <p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Supporter%20application`}
                  className="text-secondary font-semibold underline underline-offset-4 hover:text-secondary/80"
                >
                  Email us
                </a>{" "}
                and we'll send you the application. Every supporter is reviewed and approved before
                they can accept tasks.
              </p>
            </Section>

            <Section id="service-area" title="Service area">
              <p>HO:RA is currently available in New York City.</p>
            </Section>
          </div>

          <p className="mt-10 text-sm text-accent/60 font-secondary">
            See also our{" "}
            <Link to="/terms" className="underline underline-offset-4 hover:text-accent">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-accent">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
      <footer className="bg-primary border-t border-accent/10 px-4 py-4 text-center">
        <p className="text-accent/60 text-sm font-secondary">Arcodiax LLC, Delaware, United States</p>
      </footer>
    </>
  );
}
