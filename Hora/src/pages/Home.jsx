import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import useScrollReveal from '../hooks/useScrollReveal';
import { APP_STORE_URL, WEB_APP_URL, SUPPORTER_APPLY_URL } from '../lib/config';
import {
  ShoppingBag,
  Bike,
  WashingMachine,
  ShoppingCart,
  Clock,
  Users,
  Wallet,
  MapPin,
  ListChecks,
  Banknote,
  UserCheck,
  ClipboardList,
  Navigation,
  Receipt,
  BadgeCheck,
  Check,
  Image as ImageIcon,
} from "lucide-react";

// Copy source: hora-landing-copy.md — use verbatim, do not edit numbers or wording here.

const heroTrust = [
  "Interviewed & ID-verified Supporters",
  "Price shown before you post",
  "Pay by the minute",
];

const proof = [
  { value: "400+", label: "tasks completed" },
  { value: "81%", label: "fulfilment rate" },
  { value: "~10 min", label: "median match time" },
];

const categories = [
  { icon: ShoppingBag, title: "Quick errand", desc: "A local purchase, a document drop, a last-minute pickup." },
  { icon: Bike, title: "Delivery", desc: "Collect something from one place and bring it to another, with as many stops as you need." },
  { icon: WashingMachine, title: "Laundry", desc: "Drop off, wait out the wash, pick it back up. Waiting time isn't billed." },
  { icon: ShoppingCart, title: "Grocery", desc: "A shopping list, a budget you set, a receipt photo at the end." },
  { icon: Clock, title: "Queue", desc: "Someone holds your place while you keep moving." },
  { icon: Users, title: "Companionship", desc: "A walk, a conversation, a shared meal, or company at an event. Non-medical." },
];

const steps = [
  { n: "01", title: "Describe it", desc: "Say what you need, where, and how long you think it'll take. Add stops and a shopping budget if there is one." },
  { n: "02", title: "See the price first", desc: "The estimate appears before you post. That exact amount is reserved on your card — nothing more." },
  { n: "03", title: "Follow along", desc: "Your Supporter taps \"On my way\" and you see them approach on a live map. You're notified when they arrive." },
  { n: "04", title: "Pay for what happened", desc: "An itemised receipt at the end: base fee, minutes worked, and any purchases, with the receipt photo attached." },
];

const plans = [
  {
    title: "Everyday tasks",
    sub: "Errands, delivery, laundry, grocery, queues",
    price: "$12",
    unit: "base",
    note: "Includes the first 15 minutes, then $0.50 per minute.",
    highlighted: true,
  },
  {
    title: "Companionship",
    sub: "A walk, a conversation, company at an event",
    price: "$25",
    unit: "base",
    note: "Includes the first 15 minutes, then $0.50 per minute.",
  },
  {
    title: "Evening & overnight",
    sub: "Tasks starting 9 PM – 8 AM",
    price: "$1.00",
    unit: "per minute",
    note: "After the first 15 minutes. The rate is locked when you post and shown before you confirm.",
  },
];

const pricingTicks = [
  "Supporters keep 80% of service pay",
  "Purchases reimbursed in full, no markup",
  "Cancel free within 3 minutes of a Supporter accepting",
];

const supporterCards = [
  { icon: Wallet, title: "Transparent payout", desc: "You keep 80% of service pay. Purchases you front are reimbursed in full." },
  { icon: MapPin, title: "Stay local", desc: "Take tasks that fit your zone and the way you already move through the city." },
  { icon: ListChecks, title: "Choose freely", desc: "Every detail is visible before you accept or decline." },
  { icon: Banknote, title: "Paid for your commitment", desc: "If a Requester cancels after accepting, the base fee is still yours." },
];

const trustCards = [
  { icon: UserCheck, title: "Approved before activation", desc: "Every Supporter applies, is interviewed one-on-one by our team, and completes identity verification through Checkr before they can take a task." },
  { icon: ClipboardList, title: "Scope stays recorded", desc: "Stops, spending limits and any approved change stay attached to the task." },
  { icon: Navigation, title: "Live location while it matters", desc: "You see your Supporter's location only while they're on their way to you and working — never before, never after." },
  { icon: Receipt, title: "Itemised closeout", desc: "Time worked and approved purchases are listed separately, with the receipt photo attached." },
];

const container = "mx-auto w-full max-w-7xl px-5 md:px-8";
const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold whitespace-nowrap transition active:scale-[0.98]";
const btnPrimary = `${btn} bg-forest text-white hover:bg-forest/90`;
const btnSecondary = `${btn} border border-ink/25 text-ink hover:bg-ink/5`;

function Eyebrow({ children, dark = false }) {
  return (
    <p className={`mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] ${dark ? "text-gold" : "text-forest"}`}>
      <span aria-hidden="true" className="h-px w-6 bg-gold" />
      {children}
    </p>
  );
}

function Tick({ children, dark = false }) {
  return (
    <li className="flex items-start gap-2.5">
      <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest">
        <Check className="h-3 w-3 text-gold" strokeWidth={3} />
      </span>
      <span className={dark ? "text-white/90" : "text-ink/85"}>{children}</span>
    </li>
  );
}

function IconChip({ icon: Icon }) {
  return (
    <div aria-hidden="true" className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-forest">
      <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
    </div>
  );
}

// Sized stand-in until the real photography is supplied. `ratio` reserves the space so nothing shifts on swap.
// With `parallax`, the inner layer is taller than the frame and drifts as it scrolls; put the real <img> there.
function ImagePlaceholder({ ratio, label, size, parallax = false }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      // overflow-clip, not overflow-hidden: a hidden box becomes the scroll container the drift would track instead of the page.
      className={`relative ${ratio} w-full overflow-clip rounded-3xl border border-dashed border-forest/40 bg-sage/20`}
    >
      <div
        className={`absolute inset-x-0 flex flex-col items-center justify-center gap-2 p-6 text-center ${parallax ? "parallax-drift -top-[6%] h-[112%]" : "inset-y-0"}`}
      >
        <ImageIcon aria-hidden="true" className="h-7 w-7 text-forest/70" />
        <span className="text-sm font-semibold text-forest">{label}</span>
        <span className="text-xs text-ink/70">{size}</span>
      </div>
    </div>
  );
}

// Hero entrance order; each value is that element's start time. The last one ends at ~1.1s.
const heroDelay = (ms, duration) => ({ "--hero-delay": `${ms}ms`, ...(duration && { "--hero-duration": `${duration}ms` }) });

export default function Home() {
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  return (
    <>
      <Helmet>
        <title>HO:RA — A real person, 5 minutes away | New York City</title>
        <meta name="description" content="Post any task — errands, deliveries, laundry runs. Get matched with someone approved and nearby, usually within minutes." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Hora",
          "url": "https://my-hora.com",
          "logo": "https://my-hora.com/img/hora_logo.png",
          "description": "Time-based task matching platform connecting requesters with verified local supporters.",
          "sameAs": []
        })}</script>
      </Helmet>

      <Header />

      <main ref={mainRef} id="main-content" className="bg-white pt-18 text-ink">

        {/* ── HERO ── */}
        <section className="bg-cream">
          <div className={`${container} grid items-center gap-12 py-14 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:py-20`}>
            <div>
              <div className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-forest/25 bg-white/70 px-4 py-1.5 text-sm font-medium text-forest" style={heroDelay(0, 400)}>
                <MapPin aria-hidden="true" className="h-4 w-4 text-forest" />
                New York City
              </div>

              <p className="hero-in mb-3 text-lg italic text-ink/75 md:text-xl" style={heroDelay(0, 400)}>Time has value.</p>

              <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl xl:text-7xl">
                <span className="hero-rise-blur block" style={heroDelay(120, 600)}>A real person,</span>
                <span className="hero-rise-blur block text-forest" style={heroDelay(240, 600)}>5 minutes away.</span>
              </h1>

              <p className="hero-rise mb-8 max-w-xl font-secondary text-lg text-ink/80 md:text-xl" style={heroDelay(420)}>
                Post any task — errands, deliveries, laundry runs. Get matched with someone approved and nearby, usually within minutes.
              </p>

              <ul className="hero-rise mb-9 flex flex-col gap-3 text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-x-6" style={heroDelay(500)}>
                {heroTrust.map((item) => (
                  <Tick key={item}>{item}</Tick>
                ))}
              </ul>

              <div className="hero-rise flex flex-col gap-3 sm:flex-row" style={heroDelay(580)}>
                <a href={APP_STORE_URL} className={btnPrimary}>
                  Get the app <span aria-hidden="true">→</span>
                </a>
                <a href={WEB_APP_URL} className={btnSecondary}>
                  Open the web app
                </a>
              </div>
            </div>

            {/* TODO(prefill-form): replace this framed visual with the real task prefill form once the web app
                can receive handed-over values. Until then this stays a static image — no inputs, no estimate. */}
            <div className="hero-in mx-auto w-full max-w-md rounded-[2rem] border border-ink/10 bg-white p-3 shadow-[0_24px_60px_-24px_rgba(58,90,45,0.35)] lg:max-w-none" style={heroDelay(120, 900)}>
              <div className="overflow-hidden rounded-3xl">
                <div className="hero-settle" style={heroDelay(120, 900)}>
                  <ImagePlaceholder ratio="aspect-[4/5]" label="Hero photo" size="4:5 · supply at 1600 × 2000" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROOF STRIP ── */}
        <section aria-label="Pilot results" className="border-b border-ink/10 bg-white">
          <div className={`${container} py-12 md:py-14`} data-reveal="fade">
            <dl className="grid gap-8 text-center sm:grid-cols-3">
              {proof.map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <dt className="order-2 mt-1 font-secondary text-ink/75">{label}</dt>
                  <dd className="order-1 text-4xl font-bold tracking-tight text-forest md:text-5xl">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink/70">
              Results from HO:RA's 2026 New York City pilot rounds. Past match times are not a service guarantee.
            </p>
          </div>
        </section>

        {/* ── WHAT HO:RA IS ── */}
        <section className="bg-white">
          <div className={`${container} grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20`}>
            <div>
              <div data-reveal="rise">
                <Eyebrow>BUILT FOR REAL LIFE</Eyebrow>
                <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                  One local network.
                  <br />
                  Many small tasks.
                </h2>
              </div>
              <div data-reveal="rise" data-reveal-step="1">
                <p className="mb-8 max-w-xl font-secondary text-lg text-ink/80">
                  Start with the task, not a job category. Describe what you need, HO:RA prices the time, and an approved Supporter nearby picks it up.
                </p>
                <a href="#how-it-works" className="inline-flex items-center gap-2 font-semibold text-forest underline-offset-4 hover:underline">
                  See how it works <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <figure data-reveal="fade">
              <ImagePlaceholder parallax ratio="aspect-[4/3]" label="Handover scene" size="4:3 · supply at 1600 × 1200" />
              <figcaption className="mt-3 text-sm text-ink/70">Illustrative scene created for HO:RA.</figcaption>
            </figure>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section id="services" className="scroll-mt-20 bg-cream">
          <div className={`${container} py-20 md:py-28`}>
            <h2 className="sr-only">Services</h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-block>
              {categories.map(({ icon, title, desc }) => (
                <li
                  key={title}
                  className="rounded-3xl border border-ink/10 bg-white p-7 md:p-8"
                  data-reveal="rise"
                  data-reveal-stagger
                >
                  <IconChip icon={icon} />
                  <h3 className="mb-2 text-xl font-bold">{title}</h3>
                  <p className="font-secondary leading-relaxed text-ink/75">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="scroll-mt-20 bg-white">
          <div className={`${container} py-20 md:py-28`}>
            <div className="mb-12 md:mb-16" data-reveal="rise">
              <Eyebrow>FROM REQUEST TO DONE</Eyebrow>
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">Clear at every minute.</h2>
            </div>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal-block>
              {steps.map(({ n, title, desc }) => (
                <li
                  key={n}
                  className="rounded-3xl border border-ink/10 bg-white p-7"
                  data-reveal="rise"
                  data-reveal-stagger
                >
                  <span aria-hidden="true" className="mb-6 block text-4xl font-bold tracking-tight text-sage">{n}</span>
                  <h3 className="mb-2 text-xl font-bold">{title}</h3>
                  <p className="font-secondary leading-relaxed text-ink/75">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="scroll-mt-20 bg-cream">
          <div className={`${container} py-20 md:py-28`}>
            <div className="mb-12 max-w-2xl md:mb-16">
              <div data-reveal="rise">
                <Eyebrow>SIMPLE PRICING</Eyebrow>
                <h2 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">Pay for the time you use.</h2>
              </div>
              <p className="font-secondary text-lg text-ink/80" data-reveal="rise" data-reveal-step="1">
                No booking fee, no subscription. The base fee covers the first 15 minutes; after that you're billed by the minute.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3" data-reveal-block>
              {plans.map(({ title, sub, price, unit, note, highlighted }) => (
                <div
                  key={title}
                  className={`flex flex-col rounded-3xl border p-8 ${highlighted ? "border-forest bg-forest text-white" : "border-ink/10 bg-white text-ink"}`}
                  data-reveal="rise"
                  data-reveal-stagger
                >
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className={`mt-1 font-secondary ${highlighted ? "text-white/85" : "text-ink/75"}`}>{sub}</p>
                  <p className="mt-8 mb-4 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight md:text-6xl">{price}</span>
                    <span className={`font-secondary text-lg ${highlighted ? "text-white/85" : "text-ink/75"}`}>{unit}</span>
                  </p>
                  <p className={`font-secondary leading-relaxed ${highlighted ? "text-white/90" : "text-ink/80"}`}>{note}</p>
                </div>
              ))}
            </div>

            <ul className="mt-10 grid gap-4 text-sm font-medium md:grid-cols-3 md:gap-5">
              {pricingTicks.map((item) => (
                <Tick key={item}>{item}</Tick>
              ))}
            </ul>

            <p className="mt-8 max-w-4xl text-sm leading-relaxed text-ink/70">
              Shopping budgets are set by you and reimbursed against a photo of the receipt. If your Supporter needs more time or a larger budget, you approve it first. After the free cancellation window, a cancelled task is charged the base fee — or the time already worked, if more — and that goes to your Supporter.
            </p>
          </div>
        </section>

        {/* ── FOR SUPPORTERS ── */}
        <section id="supporters" className="scroll-mt-20 bg-white">
          <div className={`${container} grid items-start gap-12 py-20 md:py-28 lg:grid-cols-[5fr_7fr] lg:gap-16`}>
            <div className="mx-auto w-full max-w-md lg:max-w-none" data-reveal="fade">
              <ImagePlaceholder parallax ratio="aspect-[4/5]" label="Supporter photo" size="4:5 · supply at 1600 × 2000" />
            </div>
            <div>
              <div data-reveal="rise">
                <Eyebrow>FOR SUPPORTERS</Eyebrow>
                <h2 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">Make open time count.</h2>
              </div>
              <div data-reveal="rise" data-reveal-step="1">
                <p className="mb-8 max-w-xl font-secondary text-lg text-ink/80">
                  See the task, the stops, the expected commitment and your payout before you accept. Work locally, no exclusivity, no minimum hours.
                </p>
                <a href={SUPPORTER_APPLY_URL} className={btnPrimary}>
                  Apply as a Supporter <span aria-hidden="true">→</span>
                </a>
                <p className="mt-4 text-sm text-ink/70">
                  Sign up → apply → interview → ID verification → approval
                </p>
              </div>
              <ul className="mt-12 grid gap-5 sm:grid-cols-2" data-reveal-block>
                {supporterCards.map(({ icon, title, desc }) => (
                  <li
                    key={title}
                    className="rounded-3xl border border-ink/10 bg-cream/40 p-7"
                    data-reveal="rise"
                    data-reveal-stagger
                  >
                    <IconChip icon={icon} />
                    <h3 className="mb-2 text-lg font-bold">{title}</h3>
                    <p className="font-secondary leading-relaxed text-ink/75">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section id="trust" className="scroll-mt-20 bg-ink text-white" data-reveal="tone" data-reveal-margin="-20%">
          <div className={`${container} py-20 md:py-28`}>
            <div className="mb-12 max-w-3xl md:mb-16">
              <div data-reveal="rise">
                <Eyebrow dark>TRUST IS INFRASTRUCTURE</Eyebrow>
                <h2 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">The right person for the right task.</h2>
              </div>
              <p className="font-secondary text-lg text-white/80" data-reveal="rise" data-reveal-step="1">
                Every Supporter is reviewed and approved by our team before they can accept a task. What happens during the task is recorded, and what you pay is itemised.
              </p>
            </div>

            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal-block data-reveal-step="3">
              {trustCards.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="rounded-3xl border border-white/15 bg-white/5 p-7"
                  data-reveal="rise"
                  data-reveal-stagger
                  data-reveal-step="3"
                >
                  <Icon aria-hidden="true" className="mb-5 h-6 w-6 text-gold" strokeWidth={2} />
                  <h3 className="mb-2 text-lg font-bold">{title}</h3>
                  <p className="font-secondary leading-relaxed text-white/75">{desc}</p>
                </li>
              ))}
            </ul>

            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-white/15 pt-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                <BadgeCheck aria-hidden="true" className="h-5 w-5 text-gold" />
                <span className="font-secondary text-sm text-white">ID Verified</span>
              </div>
              <img src="/img/checkr.png" alt="Checkr" width="136" height="32" loading="lazy" className="h-8 w-auto" />
              <img src="/img/stripeLogo.png" alt="Stripe" width="99" height="40" loading="lazy" className="h-10 w-auto" />
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="bg-forest text-white">
          <div className={`${container} flex flex-col items-center py-20 text-center md:py-28`}>
            <h2 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">Get your time back.</h2>
            <p className="mb-9 font-secondary text-lg text-white/90 md:text-xl">HO:RA is live in New York City.</p>
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a href={APP_STORE_URL} className={`${btn} bg-cream text-ink hover:bg-white`}>
                Download on the App Store
              </a>
              <a href={WEB_APP_URL} className={`${btn} border border-white/50 text-white hover:bg-white/10`}>
                Open the web app
              </a>
            </div>
            <a href={SUPPORTER_APPLY_URL} className="mt-7 inline-flex items-center gap-2 font-semibold text-white underline underline-offset-4 hover:text-cream">
              Apply as a Supporter <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
