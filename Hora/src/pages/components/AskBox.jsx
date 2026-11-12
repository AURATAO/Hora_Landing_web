import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { IMESSAGE_DRAFT, imessageHrefFor } from '../../lib/config';

// The desktop hero's question, answered in place (Aura, 2026-11-12). The
// visitor types what they need; Send opens Messages to our number with their
// words already in it, the same sms: link the Try one chips use. Nothing is
// sent from the page and nothing is stored: the words only travel inside the
// link, and the person still presses send in Messages.
//
// The placeholder cycles through real errands people have booked, so a
// visitor sees what kind of thing to ask for. With reduced motion it stays on
// the first one.

const EXAMPLES = [
  "Pick up my dry cleaning before 6",
  "Wait in line for me at the Apple Store",
  "Grab Advil and bring it to my office",
  "Return three packages at the UPS on 23rd",
  "Get me a coffee and a bagel by 9",
];

export default function AskBox() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % EXAMPLES.length), 3200);
    return () => clearInterval(t);
  }, []);

  const send = (e) => {
    e.preventDefault();
    window.location.href = imessageHrefFor(text.trim() || IMESSAGE_DRAFT);
  };

  return (
    <form onSubmit={send} className="w-full max-w-xl">
      <label htmlFor="ask" className="sr-only">What do you need today?</label>
      <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-white py-2 pl-6 pr-2 shadow-[0_12px_30px_-18px_rgba(34,40,49,0.45)] focus-within:border-forest">
        <input
          id="ask"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`${EXAMPLES[i]}…`}
          autoComplete="off"
          maxLength={300}
          className="min-w-0 flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-ink/40"
        />
        <button
          type="submit"
          aria-label="Send in Messages"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A6CDB] text-white transition hover:bg-[#0A6CDB]/90 active:scale-95"
        >
          <ArrowUp aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
      <p className="mt-3 pl-6 text-[14px] text-ink/55">Opens Messages with your request ready to send.</p>
    </form>
  );
}
