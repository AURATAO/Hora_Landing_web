import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";

const faqs = [
  {
    question: 'What is Hora and how does it work?',
    answer: 'Hora is a task-matching platform where you can request support from verified people nearby. Post a task, get matched with a Supporter instantly or schedule one for later.',
  },
  {
    question: 'What are Supporters and Requesters?',
    answer: 'Requesters post tasks and pay a flat fee based on task type. Supporters offer their time to help others and earn per task.',
  },
  {
    question: 'How much does a task cost?',
    answer: 'Quick tasks start at $12, Flex tasks at $18, and Companionship at $25 — flat fee for the first 15 minutes. After that, $0.50/min standard, or $1.00/min during nights, holidays, and bad weather.',
  },
  {
    question: 'How do I post a task?',
    answer: <>Click <span className="text-secondary">QuickRequest</span> to match instantly, or <span className="text-secondary">Schedule Request</span> to book someone for later.</>,
  },
  {
    question: 'Are tasks always 1-on-1 or group service?',
    answer: <>Hora currently offers <span className="text-secondary">1-on-1</span> support only. Group features may be added in the future.</>,
  },
  {
    question: 'How are Supporters verified?',
    answer: 'All Supporters go through identity verification before joining. You can also review their past ratings and session history.',
  },
  {
    question: 'Will I get refunded for unused time?',
    answer: 'Yes. If your session ends early, unused time is automatically refunded. Run over? You\'ll be charged $0.50/min after the first 15 minutes — or $1.00/min during nights, holidays, and bad weather.',
  },
  {
    question: 'What if the session goes overtime?',
    answer: 'Extra time is billed at $0.50/min. During nights, public holidays, and bad weather, the rate is $1.00/min.',
  },
  {
    question: 'Can I cancel a task after booking?',
    answer: <>Yes. Cancellations made within our guidelines are <span className="text-secondary">free of charge</span>.</>,
  },
  {
    question: 'Is my personal data safe?',
    answer: 'Yes. We use encryption and follow industry standards to protect your personal and payment information.',
  },
  {
    question: 'Can I be both a Supporter and Requester?',
    answer: 'Yes. You can switch roles anytime in your profile settings.',
  },
  {
    question: 'I just moved to a new city — how can Hora help me settle in?',
    answer: 'Post tasks like unpacking, grocery shopping, or even a neighborhood walk with someone nearby. Hora helps you feel connected and supported in new places.',
  },
  {
    question: 'Can I use Hora just for one-off weekend support?',
    answer: 'Absolutely. Whether it\'s running errands, yardwork, or assembling furniture — Hora works for one-time tasks too.',
  },
  {
    question: 'Can I ask for non-physical tasks like tech help or talking?',
    answer: 'Yes. You can request help with simple digital setups, a chat during a hard day, or anything that fits within someone\'s time and willingness.',
  },
  {
    question: 'I don\'t feel safe inviting strangers — how do I know Supporters are trustworthy?',
    answer: 'All Supporters are verified and reviewed. You can choose who to book and see their past feedback before confirming.',
  },
  {
    question: 'What if the Supporter doesn\'t show up?',
    answer: 'We track arrival times. If your Supporter is late or absent, you can cancel and receive a full refund.',
  },
];
export default function FQA() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
  const [showDemoModal, setShowDemoModal] = useState(false);

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
      <title>FAQ | Hora — Frequently Asked Questions</title>
      <meta name="description" content="Got questions about Hora? Find answers about how it works, pricing, supporter verification, cancellations, and more." />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
    </Helmet>
    <Header handleColor={'bg-primary/40'}  onDemoClick={() => setShowDemoModal(true)}/>
    <section id="main-content" className="bg-linear-to-br from-primary to-primary/30 text-secondary min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <DemoModal show={showDemoModal===true} onClose={() => setShowDemoModal(false)} />
        <h3 className='text-accent font-base text-sm pb-4 text-center'>🚧 Currently building our MVP. Request a demo to learn more.</h3>
        <h1 className="text-4xl font-bold text-accent text-center mb-12">FAQ</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isContextual = index >= faqs.length - 5;
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
        If you have further questions, feel free to contact us at <a href="mailto:info@my-hora.com" className="text-secondary underline underline-offset-2 hover:text-accent">liang.you@horaapp.co</a>
       </p>
    </section>
    <Footer/>
    </>
  );
}
