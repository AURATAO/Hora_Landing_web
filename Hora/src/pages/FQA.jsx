import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";

const faqs = [
  {
    question: 'What is HO:RA and how does it work?',
    answer: 'HO:RA is a task platform where you book an approved local person for the small physical things that eat your day. Describe what you need, see the price before you post, and an approved Supporter nearby picks it up — usually within minutes.',
  },
  {
    question: 'What are Supporters and Requesters?',
    answer: 'Requesters post tasks and pay for the time worked. Supporters are the people who do them — every Supporter applies, is interviewed one-on-one by our team, and completes identity verification before they can accept a task.',
  },
  {
    question: 'How much does a task cost?',
    answer: 'A $12 base fee covers the first 15 minutes of an everyday task, then it\'s $0.50 per minute. Companionship has a $25 base fee with the same per-minute rate. For tasks starting between 9 PM and 8 AM, the rate is $1.00 per minute after the first 15 minutes. There is no booking fee and no subscription.',
  },
  {
    question: 'How do I post a task?',
    answer: <>Open the app or the web app, describe what you need, set the location and when you need it. You\'ll see the estimated cost before you post, and that exact amount is reserved on your card — never more.</>,
  },
  {
    question: 'What kinds of tasks can I post?',
    answer: 'Quick errands, deliveries, laundry runs, grocery shopping, holding a place in line, and companionship — a walk, a conversation, a shared meal, or company at an event. Companionship is non-medical.',
  },
  {
    question: 'Are tasks 1-on-1?',
    answer: <>Yes. HO:RA currently offers <span className="text-secondary">1-on-1</span> support only.</>,
  },
  {
    question: 'How are Supporters verified?',
    answer: 'Every Supporter applies, is interviewed one-on-one by our team, and completes identity verification through Checkr before they can accept a task. You can also see their rating and past reviews.',
  },
  {
    question: 'What happens to the money I don\'t use?',
    answer: 'When you post a task, we reserve your estimated cost on your card — it isn\'t a charge. When the task is done, you\'re charged for the time actually worked plus any purchases you approved, and the rest of the reservation is released automatically. Releases usually reach your account within a few business days, depending on your bank.',
  },
  {
    question: 'What if the task takes longer than expected?',
    answer: 'Time beyond your estimate is billed at the same per-minute rate, up to the limit you agreed when posting. If your Supporter needs more time than that, they ask you first — and if you don\'t answer within five minutes, the request is declined automatically and billing stops at your limit.',
  },
  {
    question: 'What about shopping — who pays for what I asked for?',
    answer: 'Your Supporter pays at the till and is reimbursed in full against a photo of the receipt, up to the budget you set. No markup. If something costs more than your budget, they ask you before buying it.',
  },
  {
    question: 'Can I cancel a task after posting?',
    answer: <>Yes. Cancelling is <span className="text-secondary">free</span> before a Supporter accepts, and for three minutes after they accept. After that, you\'re charged the $12 base fee — or the time already worked, if more — and that goes to your Supporter for committing to the task.</>,
  },
  {
    question: 'What if the Supporter doesn\'t show up?',
    answer: 'You can see your Supporter approaching on a live map and you\'re notified when they arrive. If they don\'t turn up, cancel the task and get in touch — we handle these case by case.',
  },
  {
    question: 'Can I see where my Supporter is?',
    answer: 'Yes, while they\'re on their way to you and while they\'re working on your task. Sharing stops automatically when they clock out or the task ends — never before, never after.',
  },
  {
    question: 'Is my personal data safe?',
    answer: 'Payments are processed by Stripe; we never see or store your card number. Task photos and receipts are stored privately and are visible only to you and your Supporter. Read the full details in our Privacy Policy.',
  },
  {
    question: 'Can I be both a Supporter and a Requester?',
    answer: 'Yes, but the sides work differently: anyone can post tasks, while becoming a Supporter means applying, being interviewed and completing identity verification first.',
  },
  {
    question: 'How do I become a Supporter?',
    answer: 'Create your account, fill in the application, and we\'ll get in touch for a short interview. You\'ll then complete identity verification through Checkr. Reviews usually take 1–3 business days. You keep 80% of service pay, and anything you buy for a Requester is reimbursed in full.',
  },
  {
    question: 'I just moved to a new city — how can HO:RA help me settle in?',
    answer: 'Post tasks like unpacking, grocery shopping, or a walk around the neighbourhood with someone local. HO:RA is currently available in New York City.',
  },
  {
    question: 'Can I use HO:RA for one-off weekend help?',
    answer: 'Yes. There\'s no subscription and no minimum — one task is as welcome as fifty.',
  },
  {
    question: 'Where is HO:RA available?',
    answer: 'New York City. More cities will follow.',
  },
];

export default function FQA() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": typeof faq.question === "string" ? faq.question : "",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === "string" ? faq.answer : "",
      },
    })),
  };

  return (
    <>
    <Helmet>
      <title>FAQ | HO:RA — Frequently Asked Questions</title>
      <meta name="description" content="How HO:RA works, what a task costs, how Supporters are approved, cancellations, and what happens to money you don't use." />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
    </Helmet>
    <Header />
    <section id="main-content" className="bg-linear-to-br from-primary to-primary/30 text-secondary min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h3 className='text-accent font-base text-sm pb-4 text-center'>HO:RA is currently available in New York City.</h3>
        <h1 className="text-4xl font-bold text-accent text-center mb-12">FAQ</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isContextual = index >= faqs.length - 3;
            const panelId = `faq-panel-${index}`;
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl overflow-hidden border transition
                  ${isContextual
                    ? 'bg-accent/5 border-accent/20 border-l-4 border-l-accent/50'
                    : 'bg-accent/10 border-accent/30'}
                `}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-accent/20"
                >
                  <span className="text-base font-medium">{faq.question}</span>
                  <span className="text-accent text-xl" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div id={panelId} role="region" className="px-6 pb-5 pt-1 text-sm text-secondary/80 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center text-xs text-accent mt-12">
        If you have further questions, feel free to contact us at <a href="mailto:info@my-hora.com" className="text-secondary underline underline-offset-2 hover:text-accent">info@my-hora.com</a>
       </p>
    </section>
    <Footer/>
    </>
  );
}