import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import { IMESSAGE_HREF, IMESSAGE_NUMBER } from "../lib/config";

// MISSION, rebuilt. 853 lines to five sections.
//
// THREE CLAIMS WERE REMOVED BECAUSE THEY WERE NOT TRUE. They had been corrected
// on the homepage and in the FAQ in early October and were missed here:
//
//   "100% Verified — ID-verified and background-checked"
//       Background checks are not live. Checkr is used for IDENTITY verification
//       only, triggered manually after a Supporter's interview. The Privacy
//       Policy was corrected to say exactly this on 1 October; this page still
//       claimed the opposite.
//
//   "Lightning Fast — Get matched with nearby supporters in seconds"
//       The median match time is about ten minutes, which is the figure the
//       homepage's own proof strip carried.
//
//   "24/7 Support — Our team is always here to help"
//       Dispatch is still manual and done by one person.
//
// Also gone: the six icon feature cards that carried those claims, the
// Supporter/Requester comparison table (that belongs on /supporters), and the
// two large counter-statements, which repeated the new homepage hero.
//
// THE RAIL. Body text is held to about 70 characters a line because that is
// what reads; held inside a max-w-7xl page, that left a third of every section
// empty, which looks like an unfinished layout rather than a measure. So the
// heading moves into a narrow left column and the body keeps its measure in the
// right one: the full width is used and nothing about the reading changed. The
// heading is sticky, so during a long section you can still see which one you
// are in. Below md it stacks back to heading-above-body, where a 300px rail
// would be nonsense.

const rail = "md:grid md:grid-cols-[1fr_2.25fr] md:items-start md:gap-x-20";
// top-28 clears the fixed 4.5rem header with room to spare.
const railHeading =
  "m-0 text-[2rem] font-bold leading-[1.14] tracking-[-0.025em] md:sticky md:top-28 md:text-[2.125rem]";

const principles = [
  {
    title: "Respect time",
    desc: "Time is finite. We never waste it — yours, or a Supporter's. Billing is by the minute worked, not by the hour booked.",
  },
  {
    title: "Build trust",
    desc: "Openness makes every connection stronger. You know who is coming, where they are, and what you paid for.",
  },
  {
    title: "Stay fair",
    desc: "Fair pay, fair use — always balanced. Supporters keep 80% of service revenue, and every reimbursement in full.",
  },
  {
    title: "Keep it clear",
    desc: "No hidden rules. You see the price before anything starts, and nothing is spent without your say-so.",
  },
];

const differences = [
  {
    title: "Interviewed, not just signed up",
    desc: "Every Supporter applies, is interviewed one-on-one by our team, and completes identity verification through Checkr before they can accept a task. Requesters sign up normally — the vetting is on the side doing the work.",
  },
  {
    title: "Flexible requests",
    desc: "Ask for anything — big or small — as long as it meets our community guidelines. Built to support exactly what you need, not a fixed menu of services.",
  },
  {
    title: "Company, not care",
    desc: "Companionship on HO:RA means a walk, a conversation, a shared meal or company at an event. It is non-medical, and that boundary is deliberate.",
  },
  {
    title: "Billed by the minute, not by the hour",
    desc: "A base fee covers the first 15 minutes, then you pay per minute for the time actually worked. We reserve the estimate when you book, charge what happened when it's done, and release the rest.",
  },
  {
    title: "Nothing is spent without your say-so",
    desc: "If your Supporter needs more time or a bigger budget, you approve it first. No answer within five minutes counts as a no, and they fall back to the option chosen up front.",
  },
  {
    title: "Supporters keep 80%",
    desc: "No registration fee, no verification fee, no charge to join. HO:RA takes 20% of service pay, and anything a Supporter buys for a Requester is reimbursed in full with no markup.",
  },
];

// Square source crops, head to collarbone. The circle and the grayscale are CSS,
// not baked in, so swapping a photo never means re-cropping.
//
// TODO(founders): replace both bios with real sentences. Placeholders ship
// visibly rather than invented copy — an obviously empty slot is a smaller
// problem than a plausible lie about who we are.
const founders = [
  {
    name: "Aura Tao",
    role: "Co-founder",
    photo: "/img/founder-aura.jpg",
    bio: "[ONE OR TWO SENTENCES — what you do at HO:RA and one thing that is actually true about you.]",
  },
  {
    name: "Daniele Rollo",
    role: "Co-founder",
    photo: "/img/founder-dani.jpg",
    bio: "[ONE OR TWO SENTENCES — same for Dani.]",
  },
];

const container = "mx-auto w-full max-w-7xl px-5 md:px-8";
const btn = "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[17px] font-semibold whitespace-nowrap transition active:scale-[0.98]";

export default function Mission() {
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  return (
    <>
      <Helmet>
        <title>Mission — Unlock the true value of time | HO:RA</title>
        <meta
          name="description"
          content="Why HO:RA exists, how we operate, and the six decisions we have not traded away. Built and run by two people in New York City."
        />
      </Helmet>

      <Header />

      <main ref={mainRef} id="main-content" className="bg-white pt-18 text-ink">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="bg-white">
          <div className={`${container} py-20 md:py-24`}>
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.12em] text-forest">Our mission</p>
            <h1 className="mb-8 max-w-[61rem] text-[2.75rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.75rem] lg:leading-[1]">
              Unlock the true value of time.
            </h1>
            <p className="max-w-xl font-secondary text-lg leading-relaxed text-ink/78 md:text-xl">
              Delegate life&apos;s small tasks, or turn spare hours into fair pay.
            </p>
          </div>
        </section>

        {/* ── WHY WE BUILT IT ───────────────────────────────────────────── */}
        <section className="bg-cream">
          <div className={`${container} pb-0 pt-20 md:pt-24`}>
            <div className={rail} data-reveal="rise">
              <h2 className={`${railHeading} mb-7 md:mb-0`}>Why we built it.</h2>
              <div>
                {/* TODO(founding-story): the first paragraph is the one piece of this
                    page nobody else can write. */}
                <p className="mb-6 font-secondary text-[18px] leading-[1.68] text-ink/85 md:text-[19px]">
                  [YOUR FOUNDING STORY — the specific moment that started this. A few sentences,
                  first person. What you were trying to get done, and why it was harder than it
                  should have been.]
                </p>
                <p className="mb-6 font-secondary text-[18px] leading-[1.68] text-ink/85 md:text-[19px]">
                  Most of what eats a day isn&apos;t work. It&apos;s the twenty minutes at the dry
                  cleaner, the afternoon waiting for a delivery, the trip across town for a form
                  that had to be handed over in person. Each one is small. Together they are most
                  of a life.
                </p>
                <p className="font-secondary text-[18px] leading-[1.68] text-ink/85 md:text-[19px]">
                  HO:RA exists so that an hour you don&apos;t want can go to someone who does — and
                  so that person is paid properly for it. Both sides of that sentence matter equally.
                </p>
              </div>
            </div>
          </div>

          <div className={`${container} py-16 md:py-20`} data-reveal="rise" data-reveal-step="1">
            <img
              src="/img/horaImage8.jpg"
              alt="Two friends sitting outdoors, laughing at something on a phone"
              width="7281"
              height="4300"
              loading="lazy"
              decoding="async"
              className="h-[clamp(14rem,36vw,30rem)] w-full rounded-3xl object-cover"
            />
            <p className="mt-4 font-secondary text-sm text-ink/55">The hour you get back is the point.</p>
          </div>
        </section>

        {/* ── HOW WE OPERATE ────────────────────────────────────────────── */}
        <section className="bg-white">
          <div className={`${container} py-20 md:py-24`}>
            <div className={rail} data-reveal="rise">
              <h2 className={`${railHeading} mb-9 md:mb-0`}>How we operate, always.</h2>
              <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                {principles.map(({ title, desc }) => (
                  <div key={title} className="border-t-2 border-forest pt-5">
                    <h3 className="mb-2.5 text-xl font-semibold tracking-[-0.016em]">{title}</h3>
                    <p className="font-secondary text-base leading-relaxed text-ink/78">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT MAKES HO:RA DIFFERENT ────────────────────────────────── */}
        <section className="bg-forest text-white">
          <div className={`${container} py-20 md:py-24`}>
            <div className={rail} data-reveal="rise">
              <div className="mb-10 md:mb-0 md:sticky md:top-28">
                <h2 className={`${railHeading} text-white md:static`}>What makes HO:RA different.</h2>
                <p className="mt-4 font-secondary text-base leading-relaxed text-white/70">
                  Six things we decided early, and have not traded away since.
                </p>
              </div>

              <dl className="m-0 border-b border-white/20">
                {differences.map(({ title, desc }) => (
                  <div key={title} className="border-t border-white/20 py-6">
                    <dt className="mb-2 text-[1.2rem] font-semibold tracking-[-0.015em] text-gold">{title}</dt>
                    <dd className="m-0 font-secondary text-base leading-relaxed text-white/85">{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── THE TWO OF US ─────────────────────────────────────────────── */}
        <section className="bg-white">
          <div className={`${container} py-20 md:py-24`}>
            <div className={rail} data-reveal="rise">
              <div className="mb-10 md:mb-0 md:sticky md:top-28">
                <h2 className={`${railHeading} md:static`}>The two of us.</h2>
                <p className="mt-4 font-secondary text-base leading-relaxed text-ink/72">
                  HO:RA is built and run by two people. When you message us, one of us is on the
                  other end.
                </p>
              </div>

              <div className="grid gap-12 sm:grid-cols-2 sm:gap-14">
                {founders.map(({ name, role, photo, bio }) => (
                  <div key={name}>
                    <img
                      src={photo}
                      alt={`${name}, co-founder of HO:RA`}
                      width="640"
                      height="640"
                      loading="lazy"
                      decoding="async"
                      className="mb-6 h-[10.5rem] w-[10.5rem] rounded-full object-cover grayscale contrast-[1.04]"
                    />
                    <h3 className="mb-1.5 text-[1.2rem] font-semibold tracking-[-0.01em]">{name}</h3>
                    <p className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink/50">{role}</p>
                    <p className="font-secondary text-[15.5px] leading-relaxed text-ink/76">{bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING ───────────────────────────────────────────────────── */}
        <section className="bg-cream">
          <div className={`${container} flex flex-wrap items-center justify-between gap-9 py-16 md:py-20`}>
            <div>
              <h2 className="mb-2.5 text-[2.35rem] font-bold leading-[1.12] tracking-[-0.028em]">
                Start with one task.
              </h2>
              <p className="font-secondary text-[17px] text-ink/72">
                Tell us what you need. We&apos;ll tell you what it costs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3.5">
              <a href={IMESSAGE_HREF} className={`${btn} bg-forest text-white hover:bg-forest/90`}>
                Text {IMESSAGE_NUMBER} <span aria-hidden="true">→</span>
              </a>
              <Link
                to="/supporters"
                className="inline-flex min-h-11 items-center px-1 py-2.5 text-base font-medium text-forest underline underline-offset-4"
              >
                Or work with us →
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
