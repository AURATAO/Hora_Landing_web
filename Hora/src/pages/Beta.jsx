import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SUPPORTER_APPLY_URL } from "../lib/config";

// The Supporter entry point. The URL is still /beta because that is what old
// links and the retired access-code page used; "Apply as a Supporter" across
// the site points here.
//
// There is no form on this page on purpose. An application only exists once
// it is in the product, and the product's form (SUPPORTER_APPLY_URL) needs an
// account — a signed-out visitor is sent to sign-in and then on to it. This
// page explains that path and hands off to it.
//
// Copy source: docs/hora-landing-copy.md, section 11.

const needs = [
  "To be in New York City, where we currently operate",
  "To be 18 or over, with a valid US government ID",
  "A phone that can share location while you're on a task",
];

const steps = [
  "Create your account — Apple, Google or an email code.",
  "Fill in the application — name, phone and city.",
  "We review it and get in touch for a short interview.",
  "Identity verification through Checkr, sent to you as a link.",
  "Once approved, you can start accepting tasks.",
];

const h2 = "mb-4 text-2xl font-bold tracking-tight md:text-3xl";
const body = "font-secondary text-lg leading-relaxed text-ink/80";

export default function Beta() {
  return (
    <>
      <Helmet>
        <title>Become a Supporter | HO:RA</title>
        <meta
          name="description"
          content="Become a HO:RA Supporter in New York City. Take tasks near you, see the pay before you accept, and keep 80% of service pay."
        />
      </Helmet>

      <Header />

      <main id="main-content" className="bg-white pt-18 text-ink">
        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
            <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              Become a HO:RA Supporter
            </h1>
            <p className={`${body} max-w-2xl`}>
              Use the time you already have. Take tasks near you, see the pay before you accept, and keep 80% of
              service pay.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl space-y-14 px-5 py-16 md:px-8 md:py-20">
          <section>
            <h2 className={h2}>What you&apos;ll do</h2>
            <p className={body}>
              Errands, deliveries, laundry runs, holding a place in line, or keeping someone company. You see the
              task, the stops, the expected time and your payout before you accept — and you decline anything that
              doesn&apos;t fit.
            </p>
          </section>

          <section>
            <h2 className={h2}>What you need</h2>
            <ul className={`${body} space-y-2`}>
              {needs.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="text-forest">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={h2}>How it works</h2>
            <ol className={`${body} space-y-2`}>
              {steps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="w-6 shrink-0 font-semibold text-forest">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink/70">Reviews usually take 1–3 business days.</p>
          </section>

          <section>
            <h2 className={h2}>What you earn</h2>
            <p className={body}>
              $12 base for everyday tasks, $25 for companionship, covering the first 15 minutes, then $0.50 a minute.
              $1.00 a minute for tasks starting between 9 PM and 8 AM. You keep 80% of service pay, and anything you
              buy for a Requester is reimbursed in full, no markup. If a Requester cancels after accepting, the base
              fee is still yours.
            </p>
          </section>

          <section>
            <a
              href={SUPPORTER_APPLY_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-base font-semibold whitespace-nowrap text-white transition hover:bg-forest/90 active:scale-[0.98]"
            >
              Start your application <span aria-hidden="true">→</span>
            </a>
            <p className="mt-4 text-sm text-ink/70">
              You&apos;ll create an account first — it&apos;s the same step as signing in.
            </p>
          </section>

          <p>
            <Link to="/" className="text-sm text-ink/70 underline underline-offset-4 hover:text-forest">
              ← Back to main site
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
