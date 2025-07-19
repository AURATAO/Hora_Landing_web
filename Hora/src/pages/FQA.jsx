import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";

const faqs = [
  {
    question: 'What is Hora and how does it work?',
    answer: 'Hora is a time-based service platform where you can request support from trusted people nearby. You can post tasks, book time, and get matched with a supporter instantly or schedule one for later.',
  },
  {
    question: 'What are Supporters and Requesters?',
    answer: 'Requesters post tasks and pay for time. Supporters are individuals offering their available time to support.',
  },
  {
    question: 'How do I post a task?',
    answer: 'Click on <span class="text-secondary">QuickRequest</span> to match instantly, or <span class="text-secondary">Schedule Request</span> to book someone for a future time.',
  },
  {
    question: 'Which cities are supported?',
    answer: 'Currently available in <span class="text-secondary">New York</span>. More cities coming soon.',
  },
  {
    question: 'Is this a 1-on-1 or group service?',
    answer: 'Hora currently supports <span class="text-secondary">1-on-1</span> sessions only. In the future, we plan to introduce group or third-party service options to better meet different needs.',
  },
  {
    question: 'How are service fees calculated?',
    answer: 'You pay per minute. The base unit is 30 minutes, but unused time is refunded and overtime is billed automatically.',
  },
  {
    question: 'Which payment methods are accepted?',
    answer: 'Major credit/debit cards. More options coming soon.',
  },
  {
    question: 'Will I get refunded for unused time?',
    answer: 'Yes, unused minutes are automatically refunded after the session.',
  },
  {
    question: 'What if the session goes overtime?',
    answer: 'You’ll be charged for the extra minutes at the same rate.',
  },
  {
    question: 'How are Supporters verified?',
    answer: 'All supporters go through identity verification. Most provide time, not skills. For specific abilities, use <span class="text-secondary">Scheduled Request</span> to choose who fits your needs.',
  },
  {
    question: 'What if a Supporter doesn’t show up?',
    answer: 'We trace departure time. If they’re late or absent, you may cancel and receive a full refund.',
  },
  {
    question: 'Can I cancel my task?',
    answer: 'Yes, cancellations made within our guidelines are <span class="text-secondary">free of charge</span>.',
  },
  {
    question: 'Will my data be protected?',
    answer: 'Yes. We value your privacy and follow industry standards for data protection and encryption.',
  },
  {
    question: 'Can I book in advance?',
    answer: 'Yes. Use <span class="text-secondary">QuickRequest</span> for now, or <span class="text-secondary">Schedule Request</span> for future bookings.',
  },
  {
    question: 'Will the Supporter show up on time?',
    answer: 'We trace departures. If late or absent, you can cancel and get a full refund.',
  },
  {
    question: 'Is there a minimum booking time?',
    answer: 'The minimum is <span class="text-secondary">30 minutes</span>. You pay only for time used.',
  },
  {
    question: 'Does Hora take a commission?',
    answer: 'Yes, we charge a <span class="text-secondary">15% commission</span> on each transaction.',
  },
  {
    question: 'Can I be both a Supporter and Requester?',
    answer: 'Yes. You can switch roles at any time in your profile.',
  },
];

export default function FQA() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
    <Header handleColor={'bg-primary/40'}  onDemoClick={() => setShowDemoModal(true)}/>
    <section className="bg-gradient-to-br from-primary to-primary/30 text-secondary min-h-screen py-[200px] px-4">
      <div className="max-w-4xl mx-auto">
        <DemoModal show={showDemoModal===true} onClose={() => setShowDemoModal(false)} />
        <h1 className="text-4xl font-bold text-accent text-center mb-12">FAQ</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-accent/10 border border-accent/30 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-accent/20 transition"
              >
                <span className="text-base font-medium">{faq.question}</span>
                <span className="text-accent text-xl">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div
                  className="px-6 pb-5 pt-1 text-sm text-secondary/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-secondary/60 mt-12">
        If you have further questions, feel free to contact us at <a href="mailto:info@my-hora.com" className="text-secondary underline underline-offset-2 hover:text-accent">info@my-hora.com</a>
       </p>
    </section>
    <Footer/>
    </>
  );
}
