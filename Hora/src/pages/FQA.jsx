import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { IMESSAGE_HREF, IMESSAGE_NUMBER, SUPPORTER_APPLY_URL, WEB_APP_URL } from "../lib/config";

// REWRITTEN for the messaging model, and split by who is asking.
//
// Every answer here described posting inside the app: "Click QuickRequest",
// "Schedule Request", "in your app". A requester now texts, so the old set
// answered questions about a product they will never open.
//
// Four things that were simply wrong, kept out of the new set:
//
//   "$18 Flex tasks"        There is no $18 tier and there never was in the
//                           server's billing config — $12 standard, $25
//                           companionship.
//   "nights, holidays and   The evening rate is a clock window, 9 PM to 8 AM
//    bad weather"           New York. Holidays and weather have never changed
//                           a price.
//   "unused time is         Nothing is refunded, because nothing was taken. The
//    automatically          estimate is authorised on the card and the unused
//    refunded"              part of the hold is released — a materially
//                           different thing to say to someone watching their
//                           balance.
//   "full refund" if a      The hold is released. Same correction.
//    Supporter is late
//
// A fifth was added on 31 October, after the platform's own payout data was
// read for the first time: "on a daily schedule" implied next-day money. The
// schedule is daily; the ARRIVAL is not. Stripe holds each payout, measured at
// seven days here, and longer for an account's first one. The answer below
// says that in words rather than a number, because at the time of writing no
// live payout had completed yet and the measured seven days came from test
// mode. Replace the wording with the real figure once one has landed.
//
// The page is also where everything the three-section homepage no longer says
// has to be findable. That is the deal that lets the homepage stay short, so
// this list is allowed to be long.

const requesterFaqs = [
  {
    question: "What is HO:RA?",
    answer:
      "A way to hand off the small physical things that eat your day — errands, pickups, returns, waiting in for a delivery, queueing, company for an hour. You text us what you need, we tell you what it costs, and an approved local Supporter does it.",
  },
  {
    question: "How do I start? Do I need an app?",
    answer:
      "No app. You send a text message, the way you would to a friend. We reply with a price and a time; you say yes; someone goes. On Android or a desktop, where iMessage isn't available, there's a web app instead.",
  },
  {
    question: "What does it cost?",
    answer:
      "$12 to start, which includes the first 15 minutes. After that it's $0.50 a minute. Companionship starts at $25 on the same terms. Tasks starting between 9 PM and 8 AM (New York time) bill at $1.00 a minute after the included 15 — the rate is fixed when you book and doesn't change if the work runs into or out of that window.",
  },
  {
    question: "When do I actually pay?",
    answer:
      "The estimate is authorised on your card when you book — held, not taken. At the end you're charged for the time actually worked, and the rest of the hold is released. Nothing is refunded because nothing was collected in the first place.",
  },
  {
    question: "Do I have to leave Messages?",
    answer:
      "Once. On your first booking we'll send you a secure page for your email and a card — about a minute. Everything after that happens in the conversation.",
  },
  {
    question: "What if it takes longer than estimated?",
    answer:
      "Billing stops at the time you approved. If your Supporter needs longer they ask you first, and no answer within five minutes counts as a no. If you opted in when booking, they may run up to 15 minutes past the estimate without asking, and that time is billable.",
  },
  {
    question: "What about shopping — who pays for what I asked for?",
    answer:
      "Your Supporter pays at the till and you reimburse the receipt in full, with no markup and no commission. You set a budget up front; purchases up to $5 over it are reimbursed automatically, and anything more needs your approval first. A photo of the receipt is attached to your final bill.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Free any time before a Supporter accepts, and for three minutes after. After that you're charged the greater of the $12 base fee or the time already worked — the base fee is what your Supporter is guaranteed for committing and dropping what they were doing. The exact amount is shown before you confirm.",
  },
  {
    question: "What if my Supporter doesn't show up?",
    answer:
      "Tell us in the conversation and we'll cancel it at no cost to you — the hold is released in full. We also look at the recorded arrival times, and repeated no-shows cost a Supporter their place on the platform.",
  },
  {
    question: "Can I see where my Supporter is?",
    answer:
      "Yes, from the moment they tap \"On my way\" until they clock out, on a live map, and you're notified when they arrive. You can't see them at any other time, and nobody else can see them at all.",
  },
  {
    question: "Who are the Supporters?",
    answer:
      "People who applied, were interviewed one-on-one by us, and completed identity verification through Checkr before they could accept anything. There is no open sign-up. We do not currently run criminal background checks, and we don't claim to.",
  },
  {
    question: "What can I ask for?",
    answer:
      "Anything legal and within our community guidelines that one person can reasonably do in the time booked. Errands, deliveries, returns, laundry runs, groceries, holding a place in a queue, waiting in for a tradesperson, a walk or company at an event. Not medical or personal care, not anything requiring a licence we haven't checked.",
  },
  {
    question: "Is companionship the same as care?",
    answer:
      "No, and the boundary is deliberate. Companionship means a walk, a conversation, a shared meal, company at an appointment or an event. It is non-medical, and Supporters are not carers or health workers.",
  },
  {
    question: "Where does HO:RA work?",
    answer:
      "New York City. That's the whole service area for now — a request from anywhere else can't be matched.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Card details go straight to Stripe and never touch our servers. Location is collected only while a task is running, and completion and receipt photos are stored privately and shown only to the two people on that task. The Privacy Policy sets out exactly what is kept and for how long.",
  },
];

const supporterFaqs = [
  {
    question: "How do I become a Supporter?",
    answer:
      "Apply, have a one-on-one conversation with us, and complete identity verification through Checkr. Usually one to three business days. You'll need to be 18 or over, legally able to work in the US, in or around New York City, and have an iPhone.",
  },
  {
    question: "What do I earn?",
    answer:
      "80% of a task's service revenue — the base fee, the billable minutes, and any approved time extension. HO:RA keeps 20%. Anything you buy for a requester comes back to you in full: we never take a cut of a receipt.",
  },
  {
    question: "When am I paid?",
    answer:
      "Every task pays out automatically through Stripe once it settles. There is no invoicing and nothing to chase. Stripe then holds each payout for a few days before it reaches your bank, and the first one after you join takes longer while the account is new. You can see exactly where a payment is, and when it is expected, in your Stripe dashboard.",
  },
  {
    question: "What about taxes?",
    answer:
      "You work for yourself on HO:RA, so your taxes are yours to file. Stripe keeps a record of every payment made to you, and you can download it from your Stripe dashboard at any time, so you are never guessing what you earned over a year.",
  },
  {
    question: "Do Supporters use the app?",
    answer:
      "Yes — the app is yours. Available tasks, clock in and out, your earnings and payouts all live there. Requesters never need it.",
  },
  {
    question: "Do I have to take tasks?",
    answer:
      "No. There are no shifts and no quotas. You see every detail — what, where, how long, what it pays — before you accept anything.",
  },
  {
    question: "What if a requester cancels after I've accepted?",
    answer:
      "After the three-minute window you're paid the greater of the base fee or the time you logged, less the platform fee. Committing to a task and having it pulled is not free work.",
  },
  {
    question: "Can I be both a Supporter and a Requester?",
    answer:
      "Yes. The same account can do both — text us when you need something, work from the app when you have time to spare.",
  },
];

const groups = [
  { id: "requesters", label: "Getting help", items: requesterFaqs },
  { id: "supporters", label: "Working with HO:RA", items: supporterFaqs },
];

export default function FQA() {
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...requesterFaqs, ...supporterFaqs].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Helmet>
        <title>FAQ | HO:RA — Frequently Asked Questions</title>
        <meta
          name="description"
          content="How HO:RA works over text, what a task costs, when you're charged, how Supporters are approved, cancellations, and what Supporters earn."
        />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main id="main-content" className="bg-white pt-18 text-ink">

        <section className="bg-cream">
          <div className="mx-auto w-full max-w-4xl px-5 py-16 md:px-8 md:py-20">
            <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.12em] text-forest">New York City</p>
            <h1 className="mb-6 text-[2.5rem] font-bold leading-[1.04] tracking-[-0.035em] md:text-6xl">
              Questions, answered.
            </h1>
            <p className="font-secondary text-lg leading-relaxed text-ink/78">
              If something isn&apos;t here, text us and ask — it&apos;s the same number you&apos;d
              use to book anything else.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto w-full max-w-4xl px-5 py-16 md:px-8 md:py-20">
            {groups.map(({ id, label, items }) => (
              <div key={id} id={id} className="mb-14 last:mb-0">
                <h2 className="mb-7 text-[13px] font-bold uppercase tracking-[0.12em] text-forest">{label}</h2>

                <div className="border-t border-ink/15">
                  {items.map((faq) => {
                    const key = `${id}-${faq.question}`;
                    const isOpen = openKey === key;
                    const panelId = `panel-${key.replace(/\W+/g, "-").toLowerCase()}`;
                    return (
                      <div key={key} className="border-b border-ink/15">
                        <h3 className="m-0">
                          <button
                            type="button"
                            onClick={() => toggle(key)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            className="flex min-h-11 w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-forest"
                          >
                            <span className="text-[17px] font-medium md:text-lg">{faq.question}</span>
                            <span aria-hidden="true" className="shrink-0 text-xl text-forest">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>
                        </h3>
                        {isOpen && (
                          <div id={panelId} role="region" className="max-w-2xl pb-6 pr-8">
                            <p className="font-secondary text-base leading-relaxed text-ink/78">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto w-full max-w-4xl px-5 py-14 md:px-8 md:py-16">
            <h2 className="mb-3 text-[1.6rem] font-bold tracking-[-0.022em]">Still stuck?</h2>
            <p className="mb-7 max-w-xl font-secondary text-[17px] leading-relaxed text-ink/75">
              Text {IMESSAGE_NUMBER} and a person will answer — the same conversation you&apos;d
              use to book anything. Or email{" "}
              <a href="mailto:info@my-hora.com" className="text-forest underline underline-offset-[3px]">
                info@my-hora.com
              </a>
              .
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-base">
              <a href={IMESSAGE_HREF} className="font-medium text-forest underline underline-offset-4">
                Text us →
              </a>
              <a href={WEB_APP_URL} className="font-medium text-forest underline underline-offset-4">
                Open the web app →
              </a>
              <a href={SUPPORTER_APPLY_URL} className="font-medium text-forest underline underline-offset-4">
                Apply as a Supporter →
              </a>
              <Link to="/mission" className="font-medium text-forest underline underline-offset-4">
                Read our mission →
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
