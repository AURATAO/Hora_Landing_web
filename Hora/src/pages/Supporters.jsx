import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import { SUPPORTER_APPLY_URL, APP_STORE_URL } from "../lib/config";

// THE SUPPORTER SIDE, now its own page rather than one band on the homepage.
//
// This is where the App Store badge lives. In the 2026 model the mobile app is
// the Supporter's dashboard — available tasks, clock in and out, earnings — and
// a requester never needs it, so every download link on this site points here.
//
// Replaces Beta.jsx, which was an invite-code gate from the closed pilot. The
// code field is gone: the product's own application form (SUPPORTER_APPLY_URL)
// is the gate now, and an "Early Access · limited spots" page contradicts a
// homepage that says HO:RA is live.
//
// The three figures below are the real terms, not marketing. They are the most
// persuasive thing on the page precisely because they are checkable: 80% is
// BillingConfig.PlatformFeeBps inverted, reimbursement really is untouched by
// the fee, and payouts really are Stripe's daily automatic schedule.

const earnings = [
  {
    figure: "80%",
    desc: "of every task's service revenue. HO:RA keeps 20% to run the platform.",
  },
  {
    figure: "100%",
    desc: "of anything you buy for a requester comes back to you. We never take a cut of a receipt.",
  },
  {
    figure: "Daily",
    desc: "payouts land in your bank automatically through Stripe. No invoicing, no chasing.",
  },
];

const steps = [
  {
    n: "01",
    title: "Apply",
    desc: "A short form — who you are, where in the city you are, when you're usually free.",
  },
  {
    n: "02",
    title: "Talk to us",
    desc: "A one-on-one conversation, then identity verification through Checkr. Usually 1–3 business days.",
  },
  {
    n: "03",
    title: "Start taking tasks",
    desc: "Download the app, set up payouts once, and take whatever fits your day.",
  },
];

const requirements = [
  "18 or over, legally able to work in the US",
  "An iPhone, and the patience to clock in and out honestly",
  "Based in or around New York City",
  "Show up when you say you will",
];

const container = "mx-auto w-full max-w-7xl px-5 md:px-8";
const btn = "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[17px] font-semibold whitespace-nowrap transition active:scale-[0.98]";

export default function Supporters() {
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  return (
    <>
      <Helmet>
        <title>Work with HO:RA — Make open time count | New York City</title>
        <meta
          name="description"
          content="Take the tasks that fit your day, clock in, and get paid for the minutes you actually work. Supporters keep 80% of service pay and every reimbursement in full."
        />
      </Helmet>

      <Header />

      <main ref={mainRef} id="main-content" className="bg-white pt-18 text-ink">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="bg-white">
          <div className={`${container} grid items-center gap-14 py-16 lg:grid-cols-[7fr_5fr] lg:gap-20 lg:py-24`}>

            <div>
              <div className="mb-7 inline-flex items-center rounded-full border border-forest/30 bg-sage/20 px-4 py-1.5 text-sm font-medium text-forest">
                Applications open — New York City
              </div>

              <h1 className="mb-7 text-5xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
                Make open<br />time count.
              </h1>

              <p className="mb-9 max-w-lg font-secondary text-lg leading-relaxed text-ink/80 md:text-[1.15rem]">
                An hour between classes, a free afternoon, a slow Tuesday. Take the tasks
                that fit, clock in, get paid for the minutes you actually work.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a href={SUPPORTER_APPLY_URL} className={`${btn} bg-forest text-white hover:bg-forest/90`}>
                  Apply to be a Supporter <span aria-hidden="true">→</span>
                </a>
                <a
                  href={APP_STORE_URL}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-ink/25 px-5 py-3 transition hover:bg-ink/5"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5.5 w-5.5 fill-ink">
                    <path d="M16.4 12.8c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2s1.3-.6 2.5-.6 1.5.6 2.6.6 1.7-1 2.4-1.9c.7-1.1 1-2.2 1-2.3 0 0-1.9-.7-2-3.1ZM14.5 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9 0 1.8-.5 2.4-1.2Z" />
                  </svg>
                  <span>
                    <span className="block text-[11px] text-ink/60">Download on the</span>
                    <span className="block text-[15px] font-semibold">App Store</span>
                  </span>
                </a>
              </div>

              <p className="mt-5 text-[15px] text-ink/60">
                The app is where you work: available tasks, clock in and out, earnings.
              </p>
            </div>

            {/* The real Earnings screen, not a drawing of one. It carries the page's
                central claim better than the prose does: every row says "after 20%
                platform fee" in the app's own words, so a Supporter can check the
                number against the thing they will actually hold. */}
            {/* Desktop only. On a phone this screen would push Apply and the App Store
                badge below the fold to show someone a picture of a phone while they
                are holding one — the three figures under "What you earn" make the same
                argument in a fraction of the height. Sized by height like the hero
                film, so a tall window cannot stretch it. */}
            <div className="mx-auto hidden w-fit rounded-[2.2rem] bg-ink p-2.5 shadow-[0_30px_70px_-30px_rgba(34,40,49,0.5)] lg:block">
              <img
                src="/img/supporters-earnings.png"
                alt="The Earnings screen in the HO:RA app: payouts set up, $222.40 earned all time, and recent tasks each paying $9.60 for service after the 20% platform fee."
                width="1179"
                height="2556"
                loading="lazy"
                decoding="async"
                className="block aspect-[1179/2556] h-[min(62svh,500px)] w-auto rounded-[1.8rem] object-cover object-top"
              />
            </div>

          </div>
        </section>

        {/* ── WHAT YOU EARN ─────────────────────────────────────────────── */}
        <section className="bg-cream">
          <div className={`${container} py-20 md:py-24`}>
            <h2 className="mb-14 text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl" data-reveal="rise">
              What you earn.
            </h2>

            <div className="grid gap-11 md:grid-cols-3" data-reveal="rise" data-reveal-step="1">
              {earnings.map(({ figure, desc }) => (
                <div key={figure}>
                  <div className="mb-2.5 text-[2.5rem] font-bold tracking-[-0.03em] text-forest">{figure}</div>
                  <p className="font-secondary text-[16.5px] leading-relaxed text-ink/80">{desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-11 max-w-2xl font-secondary text-[15px] leading-relaxed text-ink/65" data-reveal="rise" data-reveal-step="2">
              Example: a 30-minute dry cleaning pickup bills the requester $27.00. You receive
              $21.60, plus any receipt in full. Evening and overnight tasks (9 PM – 8 AM) bill
              at double the per-minute rate.
            </p>
          </div>
        </section>

        {/* ── HOW TO JOIN ───────────────────────────────────────────────── */}
        <section className="bg-white">
          <div className={`${container} py-20 md:py-24`}>
            <h2 className="mb-14 text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl" data-reveal="rise">
              How to join.
            </h2>

            <div className="mb-16 grid gap-11 md:grid-cols-3" data-reveal="rise" data-reveal-step="1">
              {steps.map(({ n, title, desc }) => (
                <div key={n} className="border-t-2 border-forest pt-5">
                  <div className="mb-3 text-[13px] font-bold tracking-[0.1em] text-forest">{n}</div>
                  <h3 className="mb-2.5 text-xl font-semibold tracking-[-0.015em]">{title}</h3>
                  <p className="font-secondary text-base leading-relaxed text-ink/80">{desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-ink/15 px-8 py-9 md:px-11" data-reveal="rise" data-reveal-step="2">
              <h3 className="mb-5 text-xl font-semibold tracking-[-0.012em]">What we ask of you</h3>
              <ul className="grid list-none gap-3.5 font-secondary text-base leading-snug text-ink/80 md:grid-cols-2 md:gap-x-12">
                {requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CLOSING ───────────────────────────────────────────────────── */}
        <section className="bg-forest text-white">
          <div className={`${container} flex flex-wrap items-center justify-between gap-9 py-16 md:py-20`}>
            <div>
              <h2 className="mb-2.5 text-[2.35rem] font-bold leading-[1.12] tracking-[-0.025em] text-white">
                Your time, your terms.
              </h2>
              <p className="font-secondary text-[17px] text-white/75">No shifts, no quotas. Take what fits.</p>
            </div>
            <a href={SUPPORTER_APPLY_URL} className={`${btn} bg-cream text-ink hover:bg-white`}>
              Apply now <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="bg-white">
          <div className={`${container} py-14 text-center`}>
            <p className="font-secondary text-[17px] text-ink/70">
              Looking for help instead?{" "}
              <Link to="/" className="font-medium text-forest underline underline-offset-4">
                Message HO:RA
              </Link>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
