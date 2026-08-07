import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const news = [
  {
    tag: "Beta",
    date: "July, 2026",
    headline: "Round 3 is coming.",
    body: "After 120+ inquiries and sign-ups from our first beta, we're launching the next round in Midtown Manhattan. Limited spots — be early.",
    color: "bg-[#3A5A2D]",
    textColor: "text-[#E1B145]",
    tagColor: "bg-[#E1B145] text-[#3A5A2D]",
  },
  {
    tag: "Coming soon",
    date: "2026",
    headline: "Give back, effortlessly.",
    body: "Every task on HO:RA will include an optional $1 donation to support homeless outreach in NYC. Small change, real impact.",
    color: "bg-[#E1B145]",
    textColor: "text-[#3A5A2D]",
    tagColor: "bg-[#3A5A2D] text-[#E1B145]",
  },
  {
    tag: "Join us",
    date: "Now open",
    headline: "Become a Supporter.",
    body: "Turn your spare time into income. Help people nearby with errands, deliveries, and more — on your schedule.",
    color: "bg-[#3A5A2D]",
    textColor: "text-[#E1B145]",
    tagColor: "bg-[#E1B145] text-[#3A5A2D]",
  },
];

export default function NewsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/40 mb-2">Latest</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">What's new.</h2>
          </div>
          {/* Nav buttons */}
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="w-11 h-11 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              ref={nextRef}
              className="w-11 h-11 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swiper */}
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
          {news.map((item, i) => (
            <SwiperSlide key={i}>
              <div className={`${item.color} rounded-3xl p-8 md:p-10 h-72 flex flex-col justify-between cursor-grab active:cursor-grabbing`}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className={`text-xs font-secondary ${item.textColor} opacity-70`}>{item.date}</span>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold ${item.textColor} mb-3 leading-tight`}>
                    {item.headline}
                  </h3>
                  <p className={`text-sm font-secondary ${item.textColor} opacity-80 leading-relaxed`}>
                    {item.body}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}