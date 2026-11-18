import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { WEB_APP_URL, SUPPORTER_APPLY_URL } from "../lib/config";

const SUPPORT_EMAIL = "info@my-hora.com";

const linkClass =
  "text-secondary font-semibold underline underline-offset-4 hover:text-secondary/80 break-all";

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

function Bullets({ children }) {
  return <ul className="space-y-2">{children}</ul>;
}

function Bullet({ children }) {
  return <li className="list-disc ml-5 md:ml-6 marker:text-secondary">{children}</li>;
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
          content="HO:RA support: contact us, how to book by text or in the web app, pricing, cancelling, text message commands, help for Supporters using the app, becoming a Supporter, and where HO:RA is available."
        />
      </Helmet>
      <Header />
      <main
        id="main-content"
        className="bg-linear-to-br from-primary to-primary/50 min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4"
      >
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
                Email <EmailLink />. We reply within 24 hours.
              </p>
            </Section>

            <Section id="how-to-book" title="How to book">
              <p>
                Text HO:RA on iMessage from the phone number linked to your HO:RA account. Where
                iMessage isn't available, texts are sent as SMS or RCS. You can also book in the web
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
                    Reply <span className="font-semibold">{word}</span> to {action}
                  </Bullet>
                ))}
              </Bullets>
            </Section>

            <Section id="for-supporters" title="For Supporters">
              <p>The HO:RA iPhone app is for Supporters.</p>
              <Bullets>
                <Bullet>
                  <span className="font-semibold">Accepting tasks:</span> before you can accept
                  tasks, complete identity verification and set up payouts with Stripe. You can then
                  accept or decline any task you're offered.
                </Bullet>
                <Bullet>
                  <span className="font-semibold">Getting paid:</span> you're paid through Stripe.
                  Payouts follow Stripe's automatic payout schedule after the task settles. HO:RA's
                  30% platform fee is taken out of your pay. Shopping reimbursements are paid in full,
                  with no fee.
                </Bullet>
                <Bullet>
                  <span className="font-semibold">Help during a task:</span> use the in-app chat for
                  the task, or email <EmailLink />.
                </Bullet>
                <Bullet>
                  <span className="font-semibold">Deleting your account:</span> go to Profile, then
                  Delete account, in the app or the web app. You can't delete your account while you
                  have a task in progress, an unpaid balance, or a payout that hasn't been sent yet.
                  The app tells you which one applies.
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
              <p>HO:RA is currently available in New York City, across all five boroughs.</p>
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
