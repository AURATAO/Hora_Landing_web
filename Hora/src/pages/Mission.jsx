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

// THE SAME TYPE, WITHOUT THE POSITIONING, and it has to be a separate string
// rather than an override.
//
// Two sections wrap the heading and its standfirst in one sticky div, so that
// the pair travels together. There the h2 must NOT stick: the wrapper already
// does. That was written as `${railHeading} md:static` and it silently did
// nothing — Tailwind emits position utilities in a fixed order, `.md\:static`
// before `.md\:sticky`, at equal specificity, so the later rule wins and the
// heading stayed sticky. Nested inside its own sticky parent it then pinned
// independently and slid down onto the paragraph, which is the overlap that
// sent me looking.
//
// No amount of class ordering in the JSX fixes that, because the cascade is
// decided by the stylesheet, not the attribute. The class has to be absent.
const railHeadingStatic =
  "m-0 text-[2rem] font-bold leading-[1.14] tracking-[-0.025em] md:text-[2.125rem]";

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
    desc: "Fair pay, fair use, always balanced. Supporters are paid for the minutes they work, and every reimbursement comes back to them in full.",
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
    // WAS "Supporters keep 80%", with "no registration fee, no verification
    // fee, no charge to join". Both halves had to go, for different reasons.
    //
    // The percentage is a PRICE, and prices change. Published here it became a
    // third copy of a number that also lives on /supporters and in the FAQ,
    // and this page has already shipped three claims that went stale without
    // anyone noticing. Policy belongs on a mission page; rates belong in one
    // maintained place.
    //
    // The fee promise was worse: charging Supporters for identity verification
    // is under consideration, so "no verification fee" is a promise that may
    // be broken, and the people it was made to will have screenshots.
    title: "Never a cut of a receipt",
    desc: "Anything a Supporter buys for a Requester comes back to them in full, with no markup and no commission. The platform fee applies to service pay only.",
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
    name: "Liangyou Tao",
    role: "Co-founder/Product & Strategy",
    photo: "/img/founder-aura.jpg",
    bio: "Seven years in fashion before turning to code. What she took from it was never the clothes. It was the people who made everything happen.",
  },
  {
    name: "Daniele Rollo",
    role: "Co-founder/Business & Partnerships",
    photo: "/img/founder-dani.jpg",
    bio: "Years in production, where the job is getting the right person to the right place with the right thing, on time. HO:RA is the same job without the film crew.",
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
        {/* ── WHY WE BUILT IT ───────────────────────────────────────────── */}
        <section className="bg-cream">
          <div className={`${container} pb-0 pt-20 md:pt-24`}>
            <div className={rail} data-reveal="rise">
              <h2 className={`${railHeading} mb-7 md:mb-0`}>Why we built it.</h2>

              {/* Fourteen beats, fourteen <p> elements. Blank lines inside a single <p>
                  collapse to one space, so every pause in this text has to be a real
                  element or it is not a pause. The shared styling lives on the wrapper
                  rather than on all fourteen tags: change the measure or the leading in
                  one place. mb-5 rather than mb-6 because most of these paragraphs are
                  one line, and fourteen 24px gaps make a column you scroll instead of
                  read. */}
              <div className="[&>p]:mb-5 [&>p:last-child]:mb-0 [&>p]:font-secondary [&>p]:text-[18px] [&>p]:leading-[1.68] [&>p]:text-ink/85 md:[&>p]:text-[19px]">

                <p className="!text-[19px] md:!text-[21px] md:!leading-[1.6]">
                  One afternoon, someone broke the window of Daniele’s apartment while he was at
                  work. He had a meeting he couldn’t miss. His family lived elsewhere, his friends
                  were working, and nobody could get there in time.
                </p>

                <p>All he needed was someone he could trust to stay until he got home.</p>

                <p>
                  It wasn’t a job for a locksmith or a cleaner. It didn’t fit into any service
                  category. But it was something he genuinely needed.
                </p>

                <p>And once we started looking, we saw the same problem everywhere.</p>

                <p>
                  Twenty minutes at the dry cleaner. An afternoon waiting for a delivery. A quick
                  trip across town to pick something up.
                </p>

                <p className="!text-ink">Small things, until they take over your day.</p>

                <p className="!mt-11">
                  Liangyou grew up in Taiwan, where everyday life felt easier. Not because of better
                  technology, but because help was often just around the corner. Someone nearby,
                  willing to lend a hand.
                </p>

                <p>Daniele experienced what was missing. Liangyou knew what it felt like when it wasn’t.</p>

                <p>That became the idea behind HO:RA.</p>

                <p>
                  We believe technology should make it easier for people to help each other, not
                  replace the human part of it.
                </p>

                <p>
                  AI can understand what you need and connect the right people. But it can’t wait in
                  your apartment, collect your parcel, or give you an hour of your day back.
                </p>

                {/* The hinge. Set at the rail heading's size so it reads as the second
                    title of this section rather than a stray line. */}
                <p className="!my-9 !text-[1.75rem] !font-semibold !leading-[1.2] !tracking-[-0.022em] !text-ink md:!text-[2.125rem]">
                  A person can.
                </p>

                <p>
                  So we built HO:RA to make everyday help accessible, flexible, and worth everyone’s
                  time.
                </p>

                <p className="!text-ink">Because sometimes, all you need is another human being.</p>

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
                <h2 className={`${railHeadingStatic} text-white`}>What makes HO:RA different.</h2>
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
                <h2 className={`${railHeadingStatic}`}>The two of us.</h2>
                <p className="mt-4 font-secondary text-base leading-relaxed text-ink/72">
                  HO:RA is run by two people, and between us we have met every Supporter on the platform one-on-one. When you message us, one of us is on the other end.
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
