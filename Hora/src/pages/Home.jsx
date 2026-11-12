import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HeroFilm from './components/HeroFilm.jsx';
import AskBox from './components/AskBox.jsx';
import useScrollReveal from '../hooks/useScrollReveal';
import { IMESSAGE_HREF, WEB_APP_URL, imessageHrefFor } from '../lib/config';
import { MapPin, ChevronDown, MessageSquare, IdCard, ShieldCheck } from 'lucide-react';

// THE 2026 HOME, second pass (Aura, 2026-11-10). Hero + two sections.
//
// The idea the page is built on: HO:RA is half online and half offline. The
// conversation happens in Messages (the assistant asks, quotes, waits for YES);
// the errand happens in the city (a verified person goes, and you can see them).
// Section 2 shows those two halves side by side; section 3 is who that person is.
//
// Kept from the first 2026 rebuild: the film (full-bleed on phones, framed on
// desktop), one call to action, the header and footer, the colour tokens.
// Brought back from my-hora.com: the shimmer on the hero line, the Checkr and
// Stripe marks, and a supporter line with a link.
//
// No prices on this page, on purpose: they are set in the Ops pricing page and
// can change, and the chat always quotes before anyone sets off. What the page
// does state is how long tasks take. Those two figures come from production:
// completed tasks with tests and broken clocks removed (44 tasks, 2026-11-10:
// median 22 minutes, 64% within 30). Re-check them before changing the copy.
//
// The conversation in section 2 is an illustration and says so under it. It
// must stay inside what supporters do: over-the-counter medicine is fine,
// prescriptions are not (playbooks.json, "prescriptions of any kind").

const tryOne = [
  { label: "Wait in line for me", body: "Can someone wait in line for me?" },
  { label: "Grab my coffee and bagel", body: "Can someone grab my coffee and a bagel?" },
  { label: "Drop off my dry cleaning", body: "Can someone drop off my dry cleaning?" },
  { label: "Return my packages", body: "Can someone return a few packages for me?" },
];

const chat = [
  { me: true, text: "Can someone grab me some Advil and bring it to my office? On the way, could you ask the cobbler on Lexington if my boots are ready?" },
  { me: false, text: "On it. If the boots are ready, should we pick them up too?" },
  { me: true, text: "Yes please, they're already paid for." },
  { me: false, text: "Should take about 40 minutes. Here's your quote. Reply YES and we'll send someone." },
  { me: true, text: "YES" },
];

const updates = [
  { dot: "bg-sage", title: "Jake is on the way.", text: "8 minutes out. Follow him on the map." },
  { dot: "bg-gold", title: "The 24-count Advil is out.", text: "Reply 1 for the 50-count, 2 to skip it." },
  { dot: "bg-cream", title: "Boots picked up. Done in 38 minutes.", text: "Advil and boots at your desk, with a photo and an itemised receipt." },
];

const trust = [
  { Icon: MessageSquare, title: "Interviewed", desc: "We meet every supporter one-on-one before their first task." },
  { Icon: IdCard, title: "ID verified", desc: "Identity checked before they're activated.", checkr: true },
  { Icon: MapPin, title: "Visible the whole way", desc: "Follow them on the map. Receipt the moment it's done." },
  { Icon: ShieldCheck, title: "Safe both ways", desc: "Company happens in public. Anyone can say no to what feels wrong." },
];

const container = "mx-auto w-full max-w-7xl px-5 md:px-8";
const btn = "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[17px] font-semibold whitespace-nowrap transition active:scale-[0.98]";
const btnPrimary = `${btn} bg-ink text-cream hover:bg-ink/90`;
// Headings are bold Inter, set tight (Aura, 2026-11-12: "bold, direct", not the serif).
const h2 = "text-[2.15rem] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-[3.5rem]";

// Hero entrance order; each value is that element's start time. The last ends at ~1.1s.
const heroDelay = (ms, duration) => ({ "--hero-delay": `${ms}ms`, ...(duration && { "--hero-duration": `${duration}ms` }) });

export default function Home() {
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  return (
    <>
      <Helmet>
        <title>HO:RA — Text us. A real human gets it done. | New York City</title>
        <meta
          name="description"
          content="Text HO:RA what you need. We sort out the details in Messages, then a verified person in New York goes and gets it done. Billed by the minute."
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

      <main ref={mainRef} id="main-content" className="bg-cream pt-18 text-ink">

        {/* ── 1. HERO, PHONES ───────────────────────────────────────────────
            The film fills the first screen and the words sit over it. The scrim
            is load-bearing: the film runs dark, then cuts to a golden-hour
            street, and white text over the bare video would vanish halfway. */}
        <section className="relative h-[calc(100svh-4.5rem)] overflow-hidden bg-ink lg:hidden">
          <HeroFilm variant="fill" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(34,40,49,0.98)_0%,rgba(34,40,49,0.97)_40%,rgba(34,40,49,0.9)_50%,rgba(34,40,49,0.6)_62%,rgba(34,40,49,0.2)_72%,transparent_80%)]"
          />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 text-[12.5px] font-semibold text-ink">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
              Now live in New York City
            </div>
            <h1 className="mb-5 text-[2.05rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
              <span className="block">Text us.</span>
              <span className="hero-gradient-gold block text-balance">A real human gets it done.</span>
            </h1>
            <a href={IMESSAGE_HREF} className={`${btn} w-full bg-cream text-ink`}>
              Text us to start <span aria-hidden="true">→</span>
            </a>
            <p className="mt-3.5 text-center text-sm text-white/70">
              On Android?{" "}
              <a href={WEB_APP_URL} className="text-white underline underline-offset-[3px]">
                Open the web app
              </a>
            </p>
            <p className="mt-6 flex items-center justify-center gap-1.5 text-[13px] text-white/55">
              How it works
              <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
            </p>
          </div>
        </section>

        {/* ── 1. HERO, DESKTOP ─────────────────────────────────────────────── */}
        <section className="hidden lg:block">
          <div className={`${container} grid grid-cols-[1fr_auto] items-center gap-16 py-20`}>
            <div>
              <div
                className="hero-in mb-7 inline-flex items-center gap-2 rounded-full border border-forest/30 bg-white/60 px-4 py-1.5 text-sm font-medium text-forest"
                style={heroDelay(0, 400)}
              >
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                Now live in New York City
              </div>
              <h1 className="mb-7 text-[3.1rem] font-extrabold leading-[1.05] tracking-[-0.025em] xl:text-[3.5rem]">
                <span className="hero-rise-blur block" style={heroDelay(120, 600)}>Text us.</span>
                <span className="hero-rise-blur block" style={heroDelay(240, 600)}>
                  <span className="hero-gradient">A real human gets it done.</span>
                </span>
              </h1>
              <p className="hero-rise mb-9 max-w-xl text-[1.2rem] leading-relaxed text-ink/80" style={heroDelay(400)}>
                We sort out the details with you in Messages. Then a verified person in New York
                goes out and takes care of it.
              </p>
              <div className="hero-rise" style={heroDelay(520)}>
                <AskBox />
                <p className="mt-6 text-[15px] text-ink/65">
                  On Android or desktop?{" "}
                  <a href={WEB_APP_URL} className="text-forest underline underline-offset-[3px]">
                    Open the web app
                  </a>
                  <span className="mx-2 text-ink/30">·</span>No app to download.
                </p>
              </div>
            </div>
            <div className="hero-in" style={heroDelay(120, 900)}>
              <HeroFilm />
            </div>
          </div>
        </section>

        {/* ── 2. SORTED IN THE CHAT · DONE IN THE CITY ──────────────────────── */}
        <section id="how-it-works" className="border-t border-[#E6DBB8] bg-[#FBF6E6]">
          <div className={`${container} py-16 md:py-24`}>
            <h2 className={`${h2} mb-4`} data-reveal="rise">
              <span className="whitespace-nowrap">Sorted in the chat.</span>{" "}
              <span className="whitespace-nowrap">Done in the city.</span>
            </h2>
            <p className="mb-10 max-w-2xl text-[1.15rem] leading-relaxed text-ink/80" data-reveal="rise" data-reveal-step="1">
              Our assistant handles the back-and-forth in Messages. A person you can see does the
              part that needs hands.
            </p>

            <div className="grid gap-6 lg:grid-cols-2" data-reveal="rise" data-reveal-step="2">
              {/* ONLINE */}
              <div className="flex flex-col gap-6 rounded-[28px] border border-[#E6DBB8] bg-white p-7">
                <div>
                  <h3 className="text-[1.75rem] font-extrabold tracking-[-0.01em]">In your messages</h3>
                  <p className="mt-1 text-ink/60">Online. Before anyone sets off.</p>
                </div>
                <div className="flex flex-col gap-2 text-[15px] leading-snug">
                  {chat.map(({ me, text }) =>
                    <p
                      key={text}
                      className={me
                        ? "max-w-[80%] self-end rounded-[20px_20px_6px_20px] bg-[#0A6CDB] px-3.5 py-2.5 text-white"
                        : "max-w-[80%] self-start rounded-[20px_20px_20px_6px] bg-[#ECECEE] px-3.5 py-2.5 text-ink"}
                    >
                      {text}
                    </p>
                  )}
                </div>
                <ul className="mt-auto flex flex-col gap-2.5 border-t border-[#EFE6C9] pt-5 leading-relaxed">
                  <li><strong className="font-semibold">We ask what matters.</strong> Brands, budget, what to do if it's not there.</li>
                  <li><strong className="font-semibold">You see the price first.</strong> Nothing starts until you say yes.</li>
                </ul>
              </div>

              {/* OFFLINE */}
              <div className="flex flex-col gap-6 rounded-[28px] bg-ink p-7 text-cream">
                <div>
                  <h3 className="text-[1.75rem] font-extrabold tracking-[-0.01em]">Out in the city</h3>
                  <p className="mt-1 text-[#D9CFAE]">Offline. A real person, on the way.</p>
                </div>
                <ol className="flex flex-col gap-3 text-[15px] leading-snug">
                  {updates.map(({ dot, title, text }) =>
                    <li key={title} className="flex items-start gap-3.5 rounded-[18px] bg-[#2E353F] px-4 py-3.5">
                      <span aria-hidden="true" className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
                      <span><strong className="font-semibold text-white">{title}</strong> {text}</span>
                    </li>
                  )}
                </ol>
                <ul className="mt-auto flex flex-col gap-2.5 border-t border-[#3A424D] pt-5 leading-relaxed">
                  <li><strong className="font-semibold text-white">If something changes, you decide.</strong> One digit, no phone call.</li>
                  <li><strong className="font-semibold text-white">You pay for the minutes worked.</strong> Not a minute of waiting around.</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
              Illustration only. A real chat confirms more before anyone sets off, such as the exact
              price, a budget for anything bought, and the addresses.
            </p>

            {/* How long it takes, not what it costs (see the note at the top). */}
            <div
              className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E6DBB8] bg-white md:grid-cols-[1fr_1fr_1.3fr]"
              data-reveal="rise"
            >
              <div className="bg-gold px-7 py-8">
                <p className="text-[3.2rem] font-extrabold leading-none tracking-[-0.03em] md:text-[4rem]">~20 min</p>
                <p className="mt-2 text-[17px]">A typical task, from yes to done.</p>
              </div>
              <div className="border-b border-[#EFE6C9] px-7 py-8 md:border-b-0 md:border-r">
                <p className="text-[3.2rem] font-extrabold leading-none tracking-[-0.03em] md:text-[4rem]">2 in 3</p>
                <p className="mt-2 text-[17px] text-ink/80">are wrapped up in about half an hour.</p>
              </div>
              <div className="flex flex-col justify-center gap-2.5 px-7 py-8">
                <p className="text-xl font-semibold">Billed by the minute.</p>
                <p className="leading-relaxed text-ink/80">
                  You see the price in the chat before anyone sets off, and only pay for the time worked.
                </p>
                <span className="inline-flex items-center gap-2 text-[13px] text-ink/60">
                  Secure payments by
                  <img src="/img/stripeLogo.png" alt="Stripe" width="1024" height="413" className="h-[22px] w-auto" />
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2.5" data-reveal="rise">
              <span className="mr-1.5 text-[15px] text-ink/60">Try one:</span>
              {tryOne.map(({ label, body }) =>
                <a
                  key={label}
                  href={imessageHrefFor(body)}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#C9BB8E] bg-white px-[18px] text-[15px] text-ink transition hover:border-forest"
                >
                  {label}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── 3. WHO SHOWS UP · CLOSING ─────────────────────────────────────── */}
        <section id="trust" className="bg-forest text-cream">
          <div className={`${container} py-16 md:py-24`}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <img
                src="/img/hero-photo.jpg"
                alt="A supporter handing keys back to a customer at his front door"
                width="1122"
                height="1402"
                loading="lazy"
                className="h-[380px] w-full rounded-[28px] object-cover object-[center_35%] md:h-[560px]"
                data-reveal="fade"
              />
              <div data-reveal="rise">
                <h2 className={h2}>Who shows up.</h2>
                <p className="mt-3 text-lg text-[#E4DBBE]">People from your city, chosen one at a time.</p>
                <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {trust.map(({ Icon, title, desc, checkr }) =>
                    <div key={title} className="flex flex-col gap-2.5">
                      <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-forest">
                        <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                      </span>
                      <h3 className="text-xl font-bold text-gold">{title}</h3>
                      <p className="text-[15px] leading-relaxed text-[#E4DBBE]">{desc}</p>
                      {checkr &&
                        <span className="inline-flex items-center gap-2 self-start rounded-full bg-white px-3.5 py-1.5 text-[13px] text-ink/80">
                          with <img src="/img/checkr.png" alt="Checkr" width="1565" height="367" className="h-4 w-auto" />
                        </span>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="mt-12 flex flex-col gap-6 rounded-[28px] bg-cream p-7 text-ink md:flex-row md:items-center md:justify-between md:p-10"
              data-reveal="rise"
            >
              <div>
                <h3 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-5xl">Get your time back.</h3>
                <p className="mt-1.5 text-[17px] text-ink/75">One message is all it takes.</p>
              </div>
              <a href={IMESSAGE_HREF} className={btnPrimary}>
                Text us in iMessage <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Supporters are recruited one at a time, so this is a line, not a section. */}
            <p className="mt-8 text-center text-[19px] text-white">
              Free hours you'd rather put to use?{" "}
              <Link to="/supporters" className="ml-1 inline-flex min-h-11 items-center font-bold text-gold underline underline-offset-4">
                Work with us →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
