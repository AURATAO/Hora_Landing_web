import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BOOKING_LIVE, WEB_APP_URL, SUPPORTER_APPLY_URL } from "../lib/config";
import { IMessageLine, WhatsAppLine } from "./components/BookByText";
import WaitlistLine from "./components/Waitlist";

// The 2026 layout with main's Support content. The App Store listing's support
// URL points here, and App Review reads it against the live Terms, so the
// wording of every section below must stay in step with terms.md: pricing,
// cancelling, how to book, For Supporters, STOP/START/HELP, account deletion
// and contact. Change the copy only alongside the Terms.

const SUPPORT_EMAIL = "info@my-hora.com";

const linkClass = "font-medium text-forest underline underline-offset-4 hover:text-forest/80 break-all";

const sections = [
  { id: "contact", label: "Contact" },
  { id: "how-to-book", label: "How to book" },
  { id: "pricing", label: "How pricing works" },
  { id: "cancelling", label: "Cancelling" },
  { id: "text-messages", label: "Text messages" },
  { id: "for-supporters", label: "For Supporters" },
  { id: "becoming-a-supporter", label: "Becoming a Supporter" },
  { id: "service-area", label: "Service area" },
];

const pricing = [
  "$15 base fee covers the first 15 minutes, then $0.60 per minute",
  "Tasks scheduled to start between 9 PM and 8 AM (New York time): $1.00 per minute after the first 15 minutes. The rate is set when you book and stays the same even if the task runs past 8 AM",
  "The price is shown in the summary before you confirm. You pay for the time actually worked, up to the time you approved; more time needs your approval",
  "Shopping: your Supporter pays and is reimbursed against a photo of the receipt, up to your approved budget",
  "Up to $5 over the budget is reimbursed automatically; anything more, or extra time, needs your approval first",
];

const textKeywords = [
  ["STOP", "stop texts from HO:RA"],
  ["START", "start receiving texts again"],
  ["HELP", "get help"],
];

function Section({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t-2 border-forest pt-6">
      <h2 id={`${id}-title`} className="mb-3 text-2xl font-semibold tracking-[-0.018em]">
        {title}
      </h2>
      <div className="space-y-3 font-secondary text-base leading-relaxed text-ink/78">{children}</div>
    </section>
  );
}

function Bullets({ children }) {
  return <ul className="space-y-2">{children}</ul>;
}

function Bullet({ children }) {
  return <li className="ml-5 list-disc marker:text-forest">{children}</li>;
}

function EmailLink() {
  return (
    <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
      {SUPPORT_EMAIL}
    </a>
  );
}

export default function Support() {
  return (
    <>
      <Helmet>
        <title>Support | HO:RA</title>
        <meta
          name="description"
          content="HO:RA support: contact us, how to book by iMessage, WhatsApp or the web app, pricing, cancelling, text message commands, help for Supporters using the app, becoming a Supporter, and where HO:RA is available."
        />
      </Helmet>

      <Header />

      <main id="main-content" className="bg-white pt-18 text-ink">
        <section className="bg-cream">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-20">
            <h1 className="mb-8 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.035em] md:text-5xl">
              HO:RA Support
            </h1>
            <nav aria-label="Support sections" className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/20 bg-white/60 px-4 text-sm font-medium text-ink/80 transition hover:border-forest hover:text-forest"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-5 py-16 md:px-8 md:py-20">
            <Section id="contact" title="Contact">
              <p>
                Email <EmailLink />. We reply within 24 hours.
              </p>
            </Section>

            <Section id="how-to-book" title="How to book">
              {BOOKING_LIVE ? (
                <>
                  <p>
                    <IMessageLine linkClass={linkClass} /> Where iMessage isn't available, texts are
                    sent as SMS or RCS.
                  </p>
                  <p>
                    <WhatsAppLine linkClass={linkClass} />
                  </p>
                </>
              ) : (
                <WaitlistLine linkClass={linkClass} />
              )}
              <p>
                Text from the phone number linked to your HO:RA account. Not texting? Book in the web
                app at{" "}
                <a href={WEB_APP_URL} className={linkClass}>
                  {WEB_APP_URL.replace(/^https:\/\//, "")}
                </a>
                .
              </p>
              <p>
                Tell us what you need. Before anything is booked, you'll get a summary of the task
                with its price. Reply YES to confirm.
              </p>
              <p>The iPhone app is for Supporters only. To book, text us or use the web app.</p>
            </Section>

            <Section id="pricing" title="How pricing works">
              <Bullets>
                {pricing.map((item) => (
                  <Bullet key={item}>{item}</Bullet>
                ))}
              </Bullets>
            </Section>

            <Section id="cancelling" title="Cancelling">
              <p>
                Cancelling is free before a Supporter accepts your task and for 3 minutes after.
                After that, you're charged the $15 base fee, or the time already worked if that's
                more. The base fee is your Supporter's guarantee for committing to the task. You'll
                see the exact amount before you confirm.
              </p>
              <p>By text, reply "cancel task". In the web app, cancel from the task.</p>
            </Section>

            <Section id="text-messages" title="Text messages">
              <Bullets>
                {textKeywords.map(([word, action]) => (
                  <Bullet key={word}>
                    Reply <span className="font-semibold text-ink">{word}</span> to {action}
                  </Bullet>
                ))}
              </Bullets>
            </Section>

            <Section id="for-supporters" title="For Supporters">
              <p>The HO:RA iPhone app is for Supporters.</p>
              <Bullets>
                <Bullet>
                  <span className="font-semibold text-ink">Accepting tasks:</span> before you can
                  accept tasks, complete identity verification and set up payouts with Stripe. You can
                  then accept or decline any task you're offered.
                </Bullet>
                <Bullet>
                  <span className="font-semibold text-ink">Getting paid:</span> you're paid through
                  Stripe. Payouts follow Stripe's automatic payout schedule after the task settles.
                  HO:RA's 30% platform fee is taken out of your pay. Shopping reimbursements are paid
                  in full, with no fee.
                </Bullet>
                <Bullet>
                  <span className="font-semibold text-ink">Help during a task:</span> use the in-app
                  chat for the task, or email <EmailLink />.
                </Bullet>
                <Bullet>
                  <span className="font-semibold text-ink">Deleting your account:</span> go to
                  Profile, then Delete account, in the app or the web app. You can't delete your
                  account while you have a task in progress, an unpaid balance, or a payout that
                  hasn't been sent yet. The app tells you which one applies.
                </Bullet>
              </Bullets>
            </Section>

            <Section id="becoming-a-supporter" title="Becoming a Supporter">
              <p>
                <a href={SUPPORTER_APPLY_URL} className={linkClass}>
                  Apply to become a Supporter
                </a>
                . You'll be asked to sign in or create an account first. Every Supporter is
                reviewed and approved before they can accept tasks.
              </p>
            </Section>

            <Section id="service-area" title="Service area">
              <p>HO:RA opens in New York City in January 2027, across all five boroughs.</p>
            </Section>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto w-full max-w-3xl px-5 py-12 md:px-8">
            <p className="font-secondary text-[15px] leading-relaxed text-ink/65">
              See also our{" "}
              <Link to="/terms" className="underline underline-offset-4 hover:text-forest">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline underline-offset-4 hover:text-forest">
                Privacy Policy
              </Link>
              . Arcodiax LLC, Delaware, United States.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
