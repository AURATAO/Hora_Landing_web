import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HeroFilm from './components/HeroFilm.jsx';
import useScrollReveal from '../hooks/useScrollReveal';
import { IMESSAGE_HREF, IMESSAGE_NUMBER, WEB_APP_URL } from '../lib/config';
import { MapPin, ChevronDown } from 'lucide-react';

// THE 2026 REBUILD. Three sections, one audience, one call to action.
//
// What changed and why, because the old file is still in git history and the
// difference will look like vandalism without this note:
//
// The requester's entry point moved from the app to iMessage. Every CTA on the
// old homepage — "Get the app", "Open the web app", the App Store badges in the
// hero and the closing band — pointed a requester at software that is now the
// SUPPORTER's dashboard. Someone looking for help would have downloaded a screen
// full of other people's jobs. That is why the badges are gone from this page
// and live on /supporters and in the footer instead.
//
// Gone with them: the four-step "Clear at every minute" flow (those steps now
// happen inside a conversation, and the thread in the hero shows them), the
// three-card pricing table (one sentence carries it), the six category cards
// (six lines of real requests carry it), the proof-number strip, and the
// supporter section (its own page now).
//
// What did NOT change: the colour tokens, the type, the scroll reveal, the hero
// entrance timing. This is the same site, saying the true thing.

const requests = [
  "“Pick up my dry cleaning before 6”",
  "“Wait for the plumber, I'm stuck at work”",
  "“Return this box to the UPS store”",
  "“Groceries — list and budget below”",
  "“Hold my place in line at the DMV”",
  "“Walk with me to my appointment”",
];

const trust = [
  {
    title: "Interviewed",
    desc: "We speak to every Supporter one-on-one before they can take a single task. No open sign-up.",
  },
  {
    title: "ID verified",
    desc: "Identity is confirmed through Checkr before a Supporter is activated.",
  },
  {
    title: "Visible the whole way",
    desc: "You can see where they are on the way, and you get an itemised receipt the moment it's done.",
  },
];

const container = "mx-auto w-full max-w-7xl px-5 md:px-8";
const btn = "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[17px] font-semibold whitespace-nowrap transition active:scale-[0.98]";
const btnPrimary = `${btn} bg-forest text-white hover:bg-forest/90`;

// Hero entrance order; each value is that element's start time. The last ends at ~1.1s.
const heroDelay = (ms, duration) => ({ "--hero-delay": `${ms}ms`, ...(duration && { "--hero-duration": `${duration}ms` }) });

export default function Home() {
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  return (
    <>
      <Helmet>
        <title>HO:RA — Text us. A real person does the rest. | New York City</title>
        <meta
          name="description"
          content="Errands, pickups, returns, waiting in line, company for an hour. Message HO:RA and someone nearby takes it on — you see the price before anything starts."
        />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Hora",
          "url": "https://my-hora.com",
          "logo": "https://my-hora.com/img/hora_logo.png",
          "description": "Message HO:RA and a verified local Supporter takes on your errand. New York City.",
          "sameAs": []
        })}</script>
      </Helmet>

      <Header />

      <main ref={mainRef} id="main-content" className="bg-white pt-18 text-ink">

        {/* ── 1. HERO ───────────────────────────────────────────────────── */}
        {/* ── HERO, PHONES ─────────────────────────────────────────────────
            The film fills the first screen; the writing begins below it. Trying
            to fit a 9:16 film AND the full pitch above the fold meant shrinking
            both until neither worked — a 140px-tall conversation on an SE is not
            a conversation. So the film gets the screen, and the only things laid
            over it are the two a visitor cannot do without: what this is, and how
            to start.

            The scrim is not decoration. The film runs dark for fifteen seconds and
            then cuts to a golden-hour street, so white text over the bare video
            would vanish halfway through. */}
        <section className="relative h-[calc(100svh-4.5rem)] overflow-hidden bg-ink lg:hidden">
          <HeroFilm variant="fill" />

          {/* Hand-written stops rather than from/via/to, which allows only one via and
              could not hold near-solid through the text and still fade out cleanly.
              Nearly opaque to 24% — the whole text block sits inside that — then a long
              fade that is gone by 70%, leaving the top third of the frame untouched so
              the conversation the film opens on stays legible. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(34,40,49,0.97)_0%,rgba(34,40,49,0.94)_24%,rgba(34,40,49,0.74)_42%,rgba(34,40,49,0.4)_56%,rgba(34,40,49,0.14)_64%,transparent_72%)]"
          />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
            {/* The location tag belongs with the words, not floating at the top of the
                screen. Up there it was the third interface layer in a row — site header,
                tag, then the status bar of the phone inside the film — and all three were
                saying "I am chrome" at once. Down here it reads as the first line of one
                argument: where this works, what it does, how to start.

                It replaces the "Time has value." eyebrow on phones. The pill is already an
                eyebrow; two stacked is the clutter. That line still opens the desktop hero
                and the Mission page. */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 text-[12.5px] font-semibold text-ink">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
              Now live in New York City
            </div>

            <h1 className="mb-5 text-[2.1rem] font-bold leading-[1.08] tracking-[-0.032em] text-white">
              Text us. A real person does the rest.
            </h1>

            <a href={IMESSAGE_HREF} className={`${btn} w-full bg-cream text-ink`}>
              Text us to start <span aria-hidden="true">→</span>
            </a>

            <p className="mt-3.5 text-center text-sm text-white/65">
              On Android?{" "}
              <a href={WEB_APP_URL} className="text-white underline underline-offset-[3px]">
                Open the web app
              </a>
            </p>

            {/* Without this nobody knows the page continues: the film ends on a logo,
                which reads as the bottom of something. */}
            <p className="mt-6 flex items-center justify-center gap-1.5 text-[12.5px] uppercase tracking-[0.14em] text-white/45">
              What we do
              <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
            </p>
          </div>
        </section>

        {/* ── HERO, DESKTOP ─────────────────────────────────────────────── */}
        <section className="hidden bg-cream lg:block">
          <div
            className={`${container} grid grid-cols-[7fr_5fr] items-center gap-20 py-24`}
          >

            <div>
              <div
                className="hero-in mb-7 inline-flex items-center gap-2 rounded-full border border-forest/30 bg-white/60 px-4 py-1.5 text-sm font-medium text-forest"
                style={heroDelay(0, 400)}
              >
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                Now live in New York City
              </div>

              <p className="hero-in mb-3.5 font-secondary text-lg italic text-ink/70" style={heroDelay(0, 400)}>
                Time has value.
              </p>

              <h1 className="mb-7 text-[3.3rem] font-bold leading-[1.04] tracking-[-0.035em] xl:text-[3.9rem]">
                <span className="hero-rise-blur block" style={heroDelay(120, 600)}>Text us.</span>
                <span className="hero-rise-blur block" style={heroDelay(240, 600)}>A real person</span>
                <span className="hero-rise-blur block" style={heroDelay(360, 600)}>does the rest.</span>
              </h1>

              <p
                className="hero-rise mb-9 max-w-xl font-secondary text-[1.15rem] leading-relaxed text-ink/80"
                style={heroDelay(480)}
              >
                Errands, pickups, returns, waiting in line, company for an hour. Message us
                and someone nearby takes it on. You see the price before anything starts.
              </p>

              {/* ONE call to action. The web app is a fallback for people iMessage cannot
                  reach, not a second offer — so it is a sentence, not a button. Device
                  sniffing was considered and rejected: when it guesses wrong the visitor
                  has no idea why the button did nothing. */}
              <div className="hero-rise" style={heroDelay(560)}>
                <a href={IMESSAGE_HREF} className={btnPrimary}>
                  Text us to start <span aria-hidden="true">→</span>
                </a>
                <p className="mt-5 text-[15px] text-ink/60">
                  On Android or desktop?{" "}
                  <a href={WEB_APP_URL} className="text-forest underline underline-offset-[3px]">
                    Open the web app
                  </a>
                </p>
              </div>
            </div>

            <div className="hero-in" style={heroDelay(120, 900)}>
              <HeroFilm />
            </div>

          </div>
        </section>

        {/* ── 2. WHAT WE DO · WHAT IT COSTS ─────────────────────────────── */}
        <section id="services" className="bg-white">
          <div className={`${container} py-20 md:py-28`}>

            <h2 className="mb-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl" data-reveal="rise">
              Ask for what you actually need.
            </h2>
            <p className="mb-14 max-w-xl font-secondary text-lg leading-relaxed text-ink/75" data-reveal="rise" data-reveal-step="1">
              No categories, no forms, no app to install. Write it the way you'd text a friend who owes you a favour.
            </p>

            <ul className="mb-16 grid list-none grid-cols-1 gap-x-14 md:grid-cols-2" data-reveal="rise" data-reveal-step="2">
              {requests.map((r) => (
                <li key={r} className="border-t border-ink/12 py-5 font-secondary text-[17px]">
                  {r}
                </li>
              ))}
            </ul>

            {/* Price in plain sight. Instinct and the rest of the text-agent category can
                leave pricing off a page because they are selling a subscription that does
                not exist yet; HO:RA is paying a person by the minute, so the number IS the
                product and hiding it reads as evasion, not minimalism. */}
            <div
              id="pricing"
              className="rounded-3xl border border-forest/20 bg-cream px-8 py-10 md:px-12 md:py-11"
              data-reveal="rise"
              data-reveal-step="3"
            >
              <p className="mb-4 text-[1.45rem] font-semibold leading-snug tracking-[-0.015em] md:text-[1.7rem]">
                $12 to start — the first 15 minutes are included. After that it's{" "}
                <span className="text-forest">$0.50 a minute</span>.
              </p>
              <p className="mb-3.5 max-w-2xl font-secondary text-[17px] leading-relaxed text-ink/80">
                Evenings and overnight (9 PM – 8 AM) are $1.00 a minute. Company and companionship
                start at $25. You see the full price before anyone sets off, and you're only
                charged for the time actually worked.
              </p>
              <p className="max-w-2xl font-secondary text-[14.5px] leading-relaxed text-ink/60">
                First booking only: we'll ask for your email and a card on a secure page.
                One minute, once — everything after that stays in Messages.
              </p>
            </div>

          </div>
        </section>

        {/* ── 3. WHO SHOWS UP · CLOSING ─────────────────────────────────── */}
        <section id="trust" className="bg-forest text-white">
          <div className={`${container} py-20 md:py-28`}>

            <h2 className="mb-14 text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-white md:text-5xl" data-reveal="rise">
              Who shows up.
            </h2>

            <div className="mb-20 grid gap-11 md:grid-cols-3" data-reveal="rise" data-reveal-step="1">
              {trust.map(({ title, desc }) => (
                <div key={title}>
                  <h3 className="mb-3.5 text-[15px] font-bold uppercase tracking-[0.08em] text-gold">{title}</h3>
                  <p className="font-secondary text-[16.5px] leading-relaxed text-white/85">{desc}</p>
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap items-center justify-between gap-9 border-t border-white/20 pt-14"
              data-reveal="rise"
              data-reveal-step="2"
            >
              <div>
                <h3 className="mb-2.5 text-[2.35rem] font-bold leading-[1.12] tracking-[-0.025em] text-white">
                  Get your time back.
                </h3>
                <p className="font-secondary text-[17px] text-white/75">One message is all it takes.</p>
              </div>
              <a href={IMESSAGE_HREF} className={`${btn} bg-cream text-ink hover:bg-white`}>
                Text {IMESSAGE_NUMBER} <span aria-hidden="true">→</span>
              </a>
            </div>

          </div>
        </section>

        {/* Supporters are recruited one at a time through an interview, not from cold
            homepage traffic — so this is a line, not a section. */}
        <section className="bg-white">
          <div className={`${container} py-14 text-center`}>
            <p className="font-secondary text-[17px] text-ink/70">
              Free hours you'd rather put to use?{" "}
              <Link to="/supporters" className="font-medium text-forest underline underline-offset-4">
                Work with us
              </Link>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
