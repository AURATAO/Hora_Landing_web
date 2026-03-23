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
    quote: "I moved to NYC two months ago and needed stuff from the Asian grocery store — things I couldn’t find anywhere nearby. Found someone on Hora who literally went to the Taiwanese market and brought everything to my door. Felt like having a friend in the city already.",
    name: "Jamie L.",
    location: "Astoria, NY · Grocery run",
  },
  {
    quote: "I run a small cake business and had a last-minute delivery fall through. Posted on Hora, someone showed up in under 10 minutes, delivered the order fresh, and honestly charged less than any courier app. Saved the whole day.",
    name: "Mei C.",
    location: "Brooklyn, NY · Last-minute delivery",
  },
  {
    quote: "I had a spare 15 minutes between meetings and figured I’d try supporting on Hora. Helped someone carry groceries upstairs. Made a bit of pocket money, nothing crazy — but it was fun and weirdly satisfying. Now I do it a few times a week.",
    name: "Marco B.",
    location: "Milan · Supporter — errands",
  },
  {
    quote: "Needed someone to help me assemble IKEA furniture. Found a supporter nearby, he came over, we chatted the whole time — done in an hour. Way cheaper than a professional service and honestly more fun.",
    name: "Sofia R.",
    location: "Manhattan, NY · Assembly help",
  },
  {
    quote: "I was visiting Milan for a week and needed a local sim card and some errands sorted. Hora connected me with someone who spoke English and knew the city. Felt like having a local friend show me around.",
    name: "Daniel K.",
    location: "Milan · Local errands",
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