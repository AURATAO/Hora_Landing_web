import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

const QuoteIcon = () => (
  <svg viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 text-secondary mb-6">
    <path d="M25 11.749C25.4348 6.96234 29.0217 3.91631 35 2.93723V0C24.4565 0.761503
            18.6957 7.17991 18.6957 15.8828C18.6957 21.7573 21.7391 26 26.9565 26C31.3043
            26 34.6739 23.0628 34.6739 18.6025C34.6739 14.6862 32.1739 12.4017 29.0217
            11.749H25ZM6.19565 11.749C6.73913 6.96234 10.2174 3.91631 16.3043 2.93723V0C5.76087
            0.761503 0 7.17991 0 15.8828C0 21.7573 3.04348 26 8.26087 26C12.5 26 15.9783
            23.0628 15.9783 18.6025C15.9783 14.6862 13.4783 12.4017 10.3261 11.749H6.19565Z"
            fill="currentColor" />
  </svg>
);

const testimonials = [
{
    quote: "Knicks were playing at MSG and I couldn't get off work in time to line up. Posted on Hora at 3pm, someone got there by 4:30 and held a spot for almost two hours. Texted me photos the whole time so I knew it was real. Got my ticket, missed zero minutes of work.",
    name: "Laura T.",
    location: "Midtown, NY · Ticket line",
  },
  {
    quote: "My dryer died on a Sunday and the laundromat two blocks over doesn't do pickup. Found a supporter on Hora who did three loads for me and folded everything — took him about 4 hours total, charged by time so it wasn't crazy expensive. Would've been a whole afternoon wasted otherwise.",
    name: "Priya S.",
    location: "Astoria, NY · Laundry",
  },
  {
    quote: "Landlord needed my signature on paperwork in Jersey City and I was stuck in back-to-back calls. Someone on Hora picked it up from my apartment, took the PATH train over, dropped it off, sent me a photo of the receipt. Small thing but it would've eaten my whole evening.",
    name: "Wei L.",
    location: "Lower East Side, NY · Errand/delivery",
  },
  {
    quote: "Was in back-to-back meetings but needed to know if Whole Foods still had something in stock before I made the trip. Posted on Hora, Daniele was in the store within 10 minutes and sent photos of the shelf to confirm, then asked if I wanted him to grab anything else while he was there. Faster than texting a friend would've been.",
    name: "Grace H.",
    location: "Upper West Side, NY · Real-time check/pickup",
  },
];

export default function TestimonialsSlider() {
  const swiperRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const togglePause = () => {
    if (!swiperRef.current) return;
    if (paused) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.stop();
    }
    setPaused(!paused);
  };

  return (
    <div className="py-16 bg-primary w-full">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          speed={1000}
          aria-live={paused ? "polite" : "off"}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <blockquote className="text-left">
                <QuoteIcon />
                <p className="text-2xl md:text-3xl font-secondary text-accent mb-6">
                  {t.quote}
                </p>
                <span className="text-lg font-secondary block text-accent">{t.name}</span>
                <span className="text-sm font-secondary text-accent/50 mt-1 block">{t.location}</span>
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-6 flex justify-start">
          <button
            onClick={togglePause}
            aria-label={paused ? "Play testimonials slideshow" : "Pause testimonials slideshow"}
            className="text-accent/50 hover:text-accent transition text-sm font-secondary flex items-center gap-2"
          >
            {paused ? (
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
            ) : (
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            )}
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
}