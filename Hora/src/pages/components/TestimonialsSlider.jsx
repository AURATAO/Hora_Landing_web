import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

export default function TestimonialsSlider() {
  return (
    <div className="py-16 bg-primary w-full">
      <Swiper
           modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        speed={1000}
      >
        <SwiperSlide>
          <blockquote className="max-w-3xl mr-auto text-left px-6">
            <div className="text-accent mb-6">
              {/* SVG quote icon */}
           <svg viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-auto h-5 text-secondary">
            <path d="M25 11.749C25.4348 6.96234 29.0217 3.91631 35 2.93723V0C24.4565 0.761503 
                    18.6957 7.17991 18.6957 15.8828C18.6957 21.7573 21.7391 26 26.9565 26C31.3043 
                    26 34.6739 23.0628 34.6739 18.6025C34.6739 14.6862 32.1739 12.4017 29.0217 
                    11.749H25ZM6.19565 11.749C6.73913 6.96234 10.2174 3.91631 16.3043 2.93723V0C5.76087 
                    0.761503 0 7.17991 0 15.8828C0 21.7573 3.04348 26 8.26087 26C12.5 26 15.9783 
                    23.0628 15.9783 18.6025C15.9783 14.6862 13.4783 12.4017 10.3261 11.749H6.19565Z" 
                    fill="currentColor" />
            </svg>
            </div>
            <p className="text-2xl md:text-3xl font-secondary text-accent mb-6">
             I hired someone on Hora to help move my new dresser — saved a ton on delivery fees. Super chill experience, he even helped me set it up.
            </p>
            <span className="text-lg font-secondary block text-accent">Sofia R.</span>
          </blockquote>
        </SwiperSlide>
        <SwiperSlide>
          <blockquote className="max-w-3xl mr-auto text-left px-6">
            <div className="text-accent mb-6">
              {/* SVG quote icon */}
           <svg viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-auto h-5 text-secondary">
            <path d="M25 11.749C25.4348 6.96234 29.0217 3.91631 35 2.93723V0C24.4565 0.761503 
                    18.6957 7.17991 18.6957 15.8828C18.6957 21.7573 21.7391 26 26.9565 26C31.3043 
                    26 34.6739 23.0628 34.6739 18.6025C34.6739 14.6862 32.1739 12.4017 29.0217 
                    11.749H25ZM6.19565 11.749C6.73913 6.96234 10.2174 3.91631 16.3043 2.93723V0C5.76087 
                    0.761503 0 7.17991 0 15.8828C0 21.7573 3.04348 26 8.26087 26C12.5 26 15.9783 
                    23.0628 15.9783 18.6025C15.9783 14.6862 13.4783 12.4017 10.3261 11.749H6.19565Z" 
                    fill="currentColor" />
            </svg>
            </div>
            <p className="text-2xl md:text-3xl font-secondary text-accent mb-6">
              I love how easy it is to find someone reliable on Hora.<br/>
              I posted my request in the morning and by lunch, everything was sorted. So simple!
            </p>
            <span className="text-lg font-secondary block text-accent">Emily T.</span>
          </blockquote>
        </SwiperSlide>
        <SwiperSlide>
          <blockquote className="max-w-3xl mr-auto text-left px-6">
            <div className="text-accent mb-6">
              {/* SVG quote icon */}
           <svg viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-auto h-5 text-secondary">
            <path d="M25 11.749C25.4348 6.96234 29.0217 3.91631 35 2.93723V0C24.4565 0.761503 
                    18.6957 7.17991 18.6957 15.8828C18.6957 21.7573 21.7391 26 26.9565 26C31.3043 
                    26 34.6739 23.0628 34.6739 18.6025C34.6739 14.6862 32.1739 12.4017 29.0217 
                    11.749H25ZM6.19565 11.749C6.73913 6.96234 10.2174 3.91631 16.3043 2.93723V0C5.76087 
                    0.761503 0 7.17991 0 15.8828C0 21.7573 3.04348 26 8.26087 26C12.5 26 15.9783 
                    23.0628 15.9783 18.6025C15.9783 14.6862 13.4783 12.4017 10.3261 11.749H6.19565Z" 
                    fill="currentColor" />
            </svg>
            </div>
            <p className="text-2xl md:text-3xl font-secondary text-accent mb-6">
              I’d just gotten out of a long relationship and needed someone to talk to. Ended up chatting for three hours over coffee. Zero pressure, just good vibes.<br/>
              Highly recommeded if you need a friendly ear!
            </p>
            <span className="text-lg font-secondary block text-accent"> Carlos M.</span>
          </blockquote>
        </SwiperSlide>
        <SwiperSlide>
          <blockquote className="max-w-3xl mr-auto text-left px-6">
            <div className="text-accent mb-6">
              {/* SVG quote icon */}
           <svg viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-auto h-5 text-secondary">
            <path d="M25 11.749C25.4348 6.96234 29.0217 3.91631 35 2.93723V0C24.4565 0.761503 
                    18.6957 7.17991 18.6957 15.8828C18.6957 21.7573 21.7391 26 26.9565 26C31.3043 
                    26 34.6739 23.0628 34.6739 18.6025C34.6739 14.6862 32.1739 12.4017 29.0217 
                    11.749H25ZM6.19565 11.749C6.73913 6.96234 10.2174 3.91631 16.3043 2.93723V0C5.76087 
                    0.761503 0 7.17991 0 15.8828C0 21.7573 3.04348 26 8.26087 26C12.5 26 15.9783 
                    23.0628 15.9783 18.6025C15.9783 14.6862 13.4783 12.4017 10.3261 11.749H6.19565Z" 
                    fill="currentColor" />
            </svg>
            </div>
            <p className="text-2xl md:text-3xl font-secondary text-accent mb-6">
              I was nervous booking someone just to have dinner with me, but everyone’s been so kind and genuine. Already planning to have someone join me for a movie next time. </p>
            <span className="text-lg font-secondary block text-accent"> Lina K.</span>
          </blockquote>
        </SwiperSlide>
        <SwiperSlide>
          <blockquote className="max-w-3xl mr-auto text-left px-6">
            <div className="text-accent mb-6">
              {/* SVG quote icon */}
           <svg viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-auto h-5 text-secondary">
            <path d="M25 11.749C25.4348 6.96234 29.0217 3.91631 35 2.93723V0C24.4565 0.761503 
                    18.6957 7.17991 18.6957 15.8828C18.6957 21.7573 21.7391 26 26.9565 26C31.3043 
                    26 34.6739 23.0628 34.6739 18.6025C34.6739 14.6862 32.1739 12.4017 29.0217 
                    11.749H25ZM6.19565 11.749C6.73913 6.96234 10.2174 3.91631 16.3043 2.93723V0C5.76087 
                    0.761503 0 7.17991 0 15.8828C0 21.7573 3.04348 26 8.26087 26C12.5 26 15.9783 
                    23.0628 15.9783 18.6025C15.9783 14.6862 13.4783 12.4017 10.3261 11.749H6.19565Z" 
                    fill="currentColor" />
            </svg>
            </div>
            <p className="text-2xl md:text-3xl font-secondary text-accent mb-6">
              I have a car, so on weekends I pick up small gigs through Hora. Easy way to make extra cash, and the people I’ve met have all been really friendly.  </p>
            <span className="text-lg font-secondary block text-accent"> Davide T.</span>
          </blockquote>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}