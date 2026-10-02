import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { APP_STORE_LIVE } from '../../lib/config';

// Copy source: hora-landing-copy.md, section 4b. Illustrative past requests — no names, no quotes, no outcomes.
const tasks = [
  { tag: "Delivery", headline: "Bagels for the office", body: "Smoked salmon, capers, red onion, tomato — and a bottle of water. Before a 9am meeting." },
  { tag: "Laundry", headline: "Drop off the dry cleaning", body: "Handed over on the way out; picked up again two days later." },
  { tag: "Queue", headline: "Hold my place in line", body: "An hour of queueing, so she didn't have to stand in it." },
  { tag: "Delivery", headline: "A birthday cake, across town", body: "Collected from the bakery and carried flat." },
  { tag: "Grocery", headline: "Groceries before the weekend", body: "A list, a budget, a receipt photo at the end." },
  { tag: "Quick errand", headline: "Coupon, free bowl, delivered", body: "Picked up the coupon, redeemed it, brought lunch back." },
];

// Shown only once APP_STORE_URL in lib/config.js is the real listing.
const news = [
  { tag: "Update", headline: "Now on the App Store", body: "HO:RA is live for iPhone in New York City." },
];

const cards = APP_STORE_LIVE ? [...tasks, ...news] : tasks;

const tones = [
  { card: "bg-forest text-white", tag: "bg-white/15 text-white", body: "text-white/85" },
  { card: "bg-cream text-ink", tag: "bg-forest text-white", body: "text-ink/75" },
];

export default function NewsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10" data-reveal="rise">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-ink mb-4">What people ask for</h2>
            <p className="font-secondary text-lg text-ink/80">Real tasks from our New York rounds.</p>
          </div>
          {/* Nav buttons */}
          <div className="flex gap-3 shrink-0">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous cards"
              className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink transition-all duration-200"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next cards"
              className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink transition-all duration-200"
            >
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swiper — the whole row reveals as one block */}
        <div data-reveal="rise" data-reveal-step="1">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            slidesPerView={1.1}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 24 },
            }}
            grabCursor={true}
          >
            {cards.map((item, i) => {
              const tone = tones[i % tones.length];
              return (
                // Slides stretch to the tallest card; inside, the tag-to-headline gap is fixed, so copy length only changes the space below.
                <SwiperSlide key={item.headline} className="!h-auto">
                  <div className={`${tone.card} rounded-3xl p-8 md:p-10 h-full min-h-64 flex flex-col cursor-grab active:cursor-grabbing`}>
                    <span className={`self-start mb-10 text-xs font-bold tracking-[0.14em] px-3 py-1 rounded-full ${tone.tag}`}>
                      {item.tag}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                        {item.headline}
                      </h3>
                      <p className={`font-secondary leading-relaxed ${tone.body}`}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
