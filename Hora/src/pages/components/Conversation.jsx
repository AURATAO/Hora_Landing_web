// The hero visual: one task, start to receipt, as the thread a requester actually sees.
//
// This replaces the photograph. It is here because the product IS text — a stock
// photo of people smiling says nothing a hundred other landing pages do not, while
// a real thread explains the mechanism, proves it works, demonstrates the tone and
// discloses the price in one object.
//
// It is also the FALLBACK for the looping film. When the 12-second silent loop
// exists it replaces this component's inner panel; until then the page is complete
// without it, because the same four beats (ask → quote → dispatch → receipt) are
// already here. Nothing on the page depends on the film shipping.
//
// Decorative in the sense that no information here is unique to it — every figure
// also appears as text in the pricing section — but it is NOT aria-hidden: the
// thread reads perfectly as a list of messages, and hiding it would cost a
// screen-reader user the clearest explanation on the page.

const thread = [
  { from: "them", text: "Hi — can someone pick up my dry cleaning on Lex before 6?" },
  { from: "hora", text: "Perry Cleaners, Lex & 68th? About 30 minutes — $27.00 total ($12 base + 30 min). Want me to send someone?" },
  { from: "them", text: "Yes please" },
  { from: "hora", text: "Amara's on her way. I'll let you know when it's done." },
  { from: "hora", text: "Done — picked up and left with your doorman. $24.50 charged to Visa ••6632. Receipt attached." },
];

export default function Conversation({ compact = false }) {
  return (
    <div
      className={`${compact ? "rounded-[2.1rem] p-2.5" : "rounded-[2.6rem] p-3"} bg-ink shadow-[0_30px_70px_-30px_rgba(34,40,49,0.55)]`}
    >
      <div className={`${compact ? "rounded-[1.7rem]" : "rounded-[2.1rem]"} overflow-hidden bg-white`}>

        <div className="border-b border-ink/10 bg-[#F7F7F8] px-4 pb-3 pt-3.5 text-center">
          <span
            aria-hidden="true"
            className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-[11px] font-bold text-white"
          >
            HR
          </span>
          <span className="block text-[13px] font-semibold text-ink">HO:RA</span>
        </div>

        <ul className="flex list-none flex-col gap-2 px-3.5 pb-5 pt-4">
          {thread.map((msg, i) => (
            <li
              key={i}
              className={
                msg.from === "them"
                  ? "max-w-[84%] self-end rounded-[18px] rounded-br-[5px] bg-[#2C7BF2] px-3.5 py-2.5 text-[13.5px] leading-snug text-white"
                  : "max-w-[86%] self-start rounded-[18px] rounded-bl-[5px] bg-[#ECECEE] px-3.5 py-2.5 text-[13.5px] leading-snug text-ink"
              }
            >
              {msg.text}
            </li>
          ))}

          <li className="mt-1.5 self-start rounded-xl border border-ink/15 px-3 py-2 text-[12px] text-ink/70">
            Receipt · 24 min worked
          </li>

          <li
            aria-hidden="true"
            className="mt-1.5 rounded-full border border-ink/10 px-3.5 py-2 text-[12.5px] text-ink/40"
          >
            iMessage
          </li>
        </ul>

      </div>
    </div>
  );
}
