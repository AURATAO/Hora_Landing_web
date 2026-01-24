import React, {useEffect, useRef, useState } from 'react';
import TestimonialsSlider from './components/TestimonialsSlider.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import DemoModal from './components/DemoModal.jsx';
import JoinModal from "./components/JoinModal";
import Stopwatch from '../pages/components/Stopwatch.jsx';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos';
import 'aos/dist/aos.css';



export default function Home({ secondsElapsed  } ) {
  const [handleColor, sethandleColor] = useState('bg-accent');
  const [activeAnimated, setActiveAnimated] = useState(false);
  const [isQuickRequest, setIsQuickRequest] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showJoinModal, setShowJoinModal]=useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const lerp = (a, b, t) => a + (b - a) * t;
 

  const heroRef = useRef(null);
  const titleRef = useRef(null)
  const stopwatchRef = useRef(null)
  const pinSectionRef = useRef(null)
  const h2Ref = useRef(null)
  const paragraphs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFlipped(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const hero = document.querySelector('.hero');
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  
  // Scroll-driven hero animation
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const wrap = pinSectionRef.current;
  const pinned = heroRef.current;
  if (!wrap || !pinned) return;

  const mm = ScrollTrigger.matchMedia();

  const make = (multiplier) =>
    ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * multiplier)}`,
      pin: pinned,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => setScrollProgress(self.progress),
    });

  let st;

  mm.add("(max-width: 1023px)", () => {
    // 手機：pin 距離短一點（更順、更不會空白）
    st = make(1.35);
    return () => st?.kill();
  });

  mm.add("(min-width: 1024px)", () => {
    // 桌機：距離長一點
    st = make(2.0);
    return () => st?.kill();
  });

  // iOS/手機地址列伸縮會影響高度，refresh 讓它穩
  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    mm.kill();
    st?.kill();
  };
}, []);

  useEffect(()=>{
        const handleScroll =()=>{
            const y = window.scrollY;
            const width = window.innerWidth;
            
            if (window.scrollY > 1000) {
              setActiveAnimated(true);
            }

           if(width < 1024 ){
            if(y > 4136){
              sethandleColor('bg-primary');
            }else if(y>3113){
              sethandleColor('bg-accent');
            }else if(y > 1496 ){
              sethandleColor('bg-primary');
            }else if(y > 774){
              sethandleColor('bg-accent');
            } else {
              sethandleColor('bg-accent');
            }

           } else {
             if (y > 3347) {
              sethandleColor('bg-primary');
              } else if (y > 2148) {
              sethandleColor('bg-accent');
              } else if (y > 1410) {
              sethandleColor('bg-primary');
              } else if (y > 772 ) {
              sethandleColor('bg-accent');
              } else {
              sethandleColor('bg-accent');
              }
           }
        }
         window.addEventListener('scroll', handleScroll);
         return () => window.removeEventListener('scroll', handleScroll);
    },[])

useEffect(() => {
  AOS.init({
    duration: 1200,
  });
}, []);

  // Calculate which scene to show based on scroll
  const getScene = () => {
    if (scrollProgress < 0.33) return 1;
    if (scrollProgress < 0.66) return 2;
    return 3;
  };

  const p1 = clamp01(scrollProgress / 0.5);          // 0 -> 1  (0 ~ 0.5)
  const p2 = clamp01((scrollProgress - 0.5) / 0.5);  // 0 -> 1  (0.5 ~ 1)
  const currentScene = getScene();

  return (
  <>
  
 <Header handleColor={handleColor} secondsElapsed={secondsElapsed} flipped={flipped} onDemoClick={() => setShowDemoModal(true)}/>
  
  <main className="flex flex-col items-center justify-center bg-accent">
    
    {/* SCROLL SECTION WRAPPER - Provides scroll length (200vh for 2 scenes) */}
    <div
        ref={pinSectionRef}
        className="heroScrollSection relative w-full min-h-svh "
      >
        <div
          ref={heroRef}
          className="heroPinned relative w-full h-svh overflow-hidden z-40"
          style={{ isolation: 'isolate' }}
        >
        
        {/* SCENE 1 - horaImage4 fullscreen (0-50%) - Fades out */}
        {/* SCENE 1 - image4 fullscreen (0-50%) - collapses from all sides into center */}
      <div
        className="absolute inset-0 z-10"
        style={{
          // 四邊一起收：0% -> 45%（想更狠可改到 55）
          clipPath: `inset(${lerp(0, 45, p1)}% round ${lerp(0, 28, p1)}px)`,
          WebkitClipPath: `inset(${lerp(0, 45, p1)}% round ${lerp(0, 28, p1)}px)`,
          opacity: lerp(1, 0, p1),
          transform: `scale(${lerp(1, 0.985, p1)})`,
          pointerEvents: p1 < 0.98 ? 'auto' : 'none',
          willChange: 'clip-path, opacity, transform, filter',
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
       <img
          src="/img/horaImage4.png"
          alt="Hora supporter delivering in NYC"
          className="w-full h-full object-cover"
          style={{
            transform: 'scale(1.2) translate(4%, -2%)',
            transformOrigin: 'center',
          }}
        />
          <div className="absolute inset-0 bg-linear-to-br from-primary/40 via-primary/20 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center justify-center z-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg mb-6">
                <span className="text-xl">🚧</span>
                <span className="text-sm font-medium text-primary font-secondary">
                  Alpha testing Hora in NYC
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
                My Time,
                <br />
                <span className="gradient-animate inline-block">My Way</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-secondary mb-8 max-w-2xl">
                Connect with verified supporters for tasks, errands, or companionship—on your schedule.
              </p>

              <div className="inline-block">
                <Stopwatch secondsElapsed={secondsElapsed} />
              </div>
            </div>
          </div>
        </div>

          {/* Floating stat card */}
          <div
            className="absolute bottom-20 right-8 lg:bottom-32 lg:right-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-white/20 animate-float z-30"
            style={{ opacity: lerp(1, 0, p1) }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <p className="text-xs text-primary/60 font-secondary">Avg Response</p>
                <p className="text-lg font-bold text-primary">2 min</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-30"
            style={{ opacity: p1 < 0.6 ? 1 : 0 }}
          >
            <span className="text-sm text-white/80 font-secondary">Scroll to explore</span>
            <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* SCENE 2 - Phone with CTA (50-100%) - Fades in from bottom */}
     
      {/* =========================
    SCENE 2 (50% -> 100%)
    - Background fades in
    - Phone slides up + scales in + de-blurs
    - Floating cards appear progressively
   ========================= */}

  <div
    className="absolute inset-0 bg-linear-to-br from-accent via-white to-secondary/10 z-10"
    style={{
      opacity: p2,
      transform: `translateY(${lerp(40, 0, p2)}px)`,
      pointerEvents: p2 > 0.05 ? 'auto' : 'none',
      willChange: 'opacity, transform',
    }}
  >
  {/* Background pattern */}
  <div className="absolute inset-0 grid-pattern opacity-50 z-0"></div>

  {/* Content */}
         <div className="relative h-full flex items-start lg:items-center justify-center z-20 pt-16 lg:pt-0">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left - Text */}
                <div className="text-center lg:text-left space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
                      Live in NYC
                    </span>
                  </div>

                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.05]">
                    Real people.
                    <br />
                    Real connections.
                    <br />
                    <span className="gradient-animate inline-block">Real fast.</span>
                  </h2>

                  <p className="text-xl md:text-2xl text-primary/70 font-secondary max-w-2xl">
                    Get matched with nearby supporters in seconds. No waiting, no hassle—just instant help.
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-primary/10 shadow-sm">
                      <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-secondary text-primary">ID Verified</span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-primary/10 shadow-sm">
                      <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-secondary text-primary">Background Checked</span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-primary/10 shadow-sm">
                      <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-secondary text-primary">Secure Payments</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="group relative px-8 py-4 bg-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                      onClick={() => setShowJoinModal('requester')}
                    >
                      <span className="relative z-10">Start a Request</span>
                      <div className="absolute inset-0 bg-linear-to-r from-secondary to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <button
                      className="px-8 py-4 bg-white/80 backdrop-blur-sm text-primary font-semibold rounded-xl border-2 border-primary/10 hover:border-secondary/30 hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                      onClick={() => setShowJoinModal('supporter')}
                    >
                      Become a Supporter
                    </button>
                  </div>
                </div>

                {/* Right - Phone enters */}
                <div
                   className="relative hidden lg:flex justify-center lg:justify-end"
                  style={{
                    opacity: p2,
                    transform: `translateY(${lerp(140, 0, p2)}px) scale(${lerp(0.92, 1, p2)})`,
                    filter: `blur(${lerp(10, 0, p2)}px)`,
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  <div className="relative max-w-md">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[70%] h-[70%] rounded-full blur-3xl bg-secondary/20 opacity-40" />
                    </div>

                    <div className="relative bg-linear-to-b rounded-3xl shadow-2xl">
                      <img
                        src="/img/greenphone.png"
                        alt="Hora App Interface"
                        className="w-full h-auto max-w-[280px] lg:max-w-[320px] mx-auto rounded-2xl shadow-lg"
                      />
                    </div>

                    {/* Floating notifications - appear progressively (mapped to p2) */}
                    <div
                      className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-3 hover:scale-105 transition-transform duration-300 animate-float"
                      style={{
                        opacity: clamp01((p2 - 0.2) / 0.25),
                        transform: `translateY(${lerp(18, 0, clamp01((p2 - 0.2) / 0.25))}px)`,
                        willChange: 'opacity, transform',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          M
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Task matched!</p>
                          <p className="text-sm font-semibold text-primary">Maria • 2 min away</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-3 hover:scale-105 transition-transform duration-300 animate-float-delayed"
                      style={{
                        opacity: clamp01((p2 - 0.45) / 0.25),
                        transform: `translateY(${lerp(18, 0, clamp01((p2 - 0.45) / 0.25))}px)`,
                        willChange: 'opacity, transform',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⭐</span>
                        <div>
                          <p className="text-xs text-gray-500">User rating</p>
                          <p className="text-sm font-semibold text-primary">4.9/5.0 average</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute top-1/3 -left-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-3 hover:scale-105 transition-transform duration-300"
                      style={{
                        opacity: clamp01((p2 - 0.65) / 0.2),
                        transform: `translateX(${lerp(-20, 0, clamp01((p2 - 0.65) / 0.2))}px)`,
                        animation: p2 > 0.65 ? 'float-slow 5s ease-in-out infinite' : 'none',
                        willChange: 'opacity, transform',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xl">✓</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Tasks completed</p>
                          <p className="text-sm font-semibold text-primary">500+</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* NEXT SECTION - Features (Starts AFTER 200vh scroll, will never overlap) */}
    <div className="relative w-full z-10">{/* z-10 ensures it's below hero's z-40 */}

    {/* FEATURES SECTION - Enhanced */}
    <div className="w-full bg-linear-0-to-b from-accent to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Why Choose Hora?
          </h2>
          <p className="text-lg text-primary/70 font-secondary max-w-2xl mx-auto">
            A smarter way to get things done with real people you can trust
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/5" data-aos="fade-up" data-aos-delay="100">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Lightning Fast</h3>
            <p className="text-primary/70 font-secondary leading-relaxed">
              Get matched with nearby supporters in seconds. No waiting, no hassle—just instant help when you need it.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/5" data-aos="fade-up" data-aos-delay="200">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">100% Verified</h3>
            <p className="text-primary/70 font-secondary leading-relaxed">
              Every supporter is ID-verified and background-checked. Connect with confidence in a secure environment.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/5" data-aos="fade-up" data-aos-delay="300">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Pay Per Minute</h3>
            <p className="text-primary/70 font-secondary leading-relaxed">
              Only pay for the exact time used. Automatic refunds for unused minutes—fair and transparent pricing.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/5" data-aos="fade-up" data-aos-delay="100">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Real Connections</h3>
            <p className="text-primary/70 font-secondary leading-relaxed">
              Beyond tasks—get companionship, conversations, and emotional support from verified community members.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/5" data-aos="fade-up" data-aos-delay="200">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">24/7 Support</h3>
            <p className="text-primary/70 font-secondary leading-relaxed">
              Our team is always here to help. Real-time tracking, in-app chat, and dedicated customer support.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/5" data-aos="fade-up" data-aos-delay="300">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Quality Ratings</h3>
            <p className="text-primary/70 font-secondary leading-relaxed">
              Transparent reviews and ratings help you choose the best supporters. Build trust with every interaction.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* HOW IT WORKS SECTION - Enhanced */}
    <div className="w-full bg-primary py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-accent mb-4">
            How Hora Works
          </h2>
          <p className="text-lg text-accent/70 font-secondary max-w-2xl mx-auto">
            Get help in four simple steps
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          
          {/* Steps */}
          <div className="w-full lg:w-1/2 space-y-12">
            
            {/* Step 1 */}
            <div className="flex gap-6 group" data-aos="fade-right">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  01
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-bold text-accent mb-3">Sign Up & Verify</h3>
                <p className="text-accent/70 font-secondary leading-relaxed">
                  Create your account and complete quick ID verification. Get instant access to our trusted community.
                </p>
              </div>
            </div>

            {/* Connector Line */}
            <div className="ml-8 h-12 w-0.5 bg-accent/20"></div>

            {/* Step 2 */}
            <div className="flex gap-6 group" data-aos="fade-right" data-aos-delay="100">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  02
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-bold text-accent mb-3">Tap QuickRequest</h3>
                <p className="text-accent/70 font-secondary leading-relaxed">
                  Describe what you need in one tap. Whether it's groceries, errands, or companionship—we've got you covered.
                </p>
              </div>
            </div>

            {/* Connector Line */}
            <div className="ml-8 h-12 w-0.5 bg-accent/20"></div>

            {/* Step 3 */}
            <div className="flex gap-6 group" data-aos="fade-right" data-aos-delay="200">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  03
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-bold text-accent mb-3">Auto-Match Nearby</h3>
                <p className="text-accent/70 font-secondary leading-relaxed">
                  Our smart algorithm instantly matches you with the best supporter based on location, availability, and preferences.
                </p>
              </div>
            </div>

            {/* Connector Line */}
            <div className="ml-8 h-12 w-0.5 bg-accent/20"></div>

            {/* Step 4 */}
            <div className="flex gap-6 group" data-aos="fade-right" data-aos-delay="300">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  04
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-bold text-accent mb-3">Track & Pay</h3>
                <p className="text-accent/70 font-secondary leading-relaxed">
                  Real-time tracking keeps you updated. Pay only for minutes used with automatic refunds for early completions.
                </p>
              </div>
            </div>
          </div>

          {/* Phone Visual */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end" data-aos="fade-up" data-aos-delay="200">
            <div className="relative max-w-xs lg:max-w-sm">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl"></div>
              
              {/* Phone image */}
              <div className="relative">
                <img 
                  src="/img/greenphone2.png" 
                  alt="Hora App Process" 
                  className="w-full  max-w-[260px] lg:max-w-[600px] "
                />
              </div>

              {/* Floating notification 1 */}
              <div className="absolute top-6 left-2 lg:-left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-3 hover:scale-105 transition-transform duration-300 animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  <div>
                    <span className="text-xs font-semibold text-gray-700 block">Hora</span>
                    <p className="text-xs text-gray-900 leading-tight">Match found!</p>
                  </div>
                </div>
              </div>

              {/* Floating notification 2 */}
              <div className="absolute top-20 left-2 lg:-left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-3 hover:scale-105 transition-transform duration-300 animate-float-delayed">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🕒</span>
                  <div>
                    <span className="text-xs font-semibold text-gray-700 block">Hora</span>
                    <p className="text-xs text-gray-900 leading-tight">Checked in 3:14 PM</p>
                  </div>
                </div>
              </div>

              {/* Floating notification 3 */}
              <div className="absolute top-36 left-2 lg:-left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-3 hover:scale-105 transition-transform duration-300 animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💸</span>
                  <div>
                    <span className="text-xs font-semibold text-gray-700 block">Hora</span>
                    <p className="text-xs text-gray-900 leading-tight">Payment confirmed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* WHO USES HORA SECTION - Enhanced */}
    <div className="w-full bg-linear-to-b from-white to-accent py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Who Uses Hora?
          </h2>
          <p className="text-lg text-primary/70 font-secondary">
            Join thousands already getting things done smarter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Supporter Card - Enhanced */}
          <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/5 overflow-hidden" >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-secondary to-secondary/50"></div>
            
            <div className="relative z-10">
              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  💚
                </div>
                <h3 className="text-2xl font-bold text-primary">Supporter</h3>
              </div>

              {/* Content */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-secondary">Who: </span>
                    <span className="text-primary/80 font-secondary">Students, freelancers, part-timers</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-secondary">Why: </span>
                    <span className="text-primary/80 font-secondary">Turn spare time into income—help with groceries, yard work, or simply share an hour at the park.</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-secondary">How to start: </span>
                    <span className="text-primary/80 font-secondary">Sign up + verify identity</span>
                  </div>
                </li>
              </ul>

              {/* Quote */}
              <div className="bg-secondary/5 border-l-4 border-secondary rounded-r-xl p-4 mb-6">
                <p className="text-sm italic text-primary/70 font-secondary">
                  "Weekend free? I take a task or two—and turn time into extra income."
                </p>
              </div>

              {/* CTA Button */}
              <button
                className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                onClick={() => setShowJoinModal('supporter')}
              >
                Offer Your Time →
              </button>
            </div>

            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          </div>

          {/* Requester Card - Enhanced */}
          <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/5 overflow-hidden" >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-primary/50"></div>
            
            <div className="relative z-10">
              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  🤝
                </div>
                <h3 className="text-2xl font-bold text-primary">Requester</h3>
              </div>

              {/* Content */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Who: </span>
                    <span className="text-primary/80 font-secondary">Busy professionals, families, teams</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Why: </span>
                    <span className="text-primary/80 font-secondary">Get groceries, handle chores, or simply need company—post it and reclaim your time.</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">How to start: </span>
                    <span className="text-primary/80 font-secondary">QuickRequest or Schedule a task</span>
                  </div>
                </li>
              </ul>

              {/* Quote */}
              <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-4 mb-11">
                <p className="text-sm italic text-primary/70 font-secondary">
                  "One tap. Chores done. I've got my time back."
                </p>
              </div>

              {/* CTA Button */}
              <button
                className="w-full py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                onClick={() => setShowJoinModal('requester')}
              >
                Start a Request →
              </button>
            </div>

            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        </div>

        {showJoinModal && (
          <JoinModal role={showJoinModal} onClose={() => setShowJoinModal(null)} />
        )}
      </div>
    </div>

    {/* TEAM SECTION - Enhanced */}
    <div className='w-full bg-linear-to-br from-primary via-primary to-primary/90 py-20 lg:py-32'>
      <div className='max-w-7xl mx-auto px-4'>
        
        {/* Section Divider */}
        <div className="flex items-center gap-4 mb-16" data-aos="fade-down">
          <div className="flex-1 h-px bg-accent/20"></div>
          <div className="text-sm font-semibold tracking-[0.3em] uppercase text-accent/60">
            Behind Hora
          </div>
          <div className="flex-1 h-px bg-accent/20"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-16 mb-12">
          
          {/* Founder 1 */}
          <div className="group flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="relative mb-6">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl scale-110"></div>
              
              <img
                src="/img/founder1.JPG"
                alt="Liang you"
                className="relative w-40 h-40 rounded-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 filter grayscale shadow-2xl border-4 border-white/10"
              />
            </div>
            
            <p className="text-sm text-accent/50 mb-2 font-secondary">Co-founder, Product & Business</p>
            <h3 className="text-2xl font-bold text-accent mb-3">Liang you</h3>
            
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/liang-you-tao-658705106/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='group/link inline-flex items-center gap-2 text-accent/60 hover:text-secondary text-sm transition-colors duration-300'
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              <a 
                href="https://github.com/AURATAO" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='group/link inline-flex items-center gap-2 text-accent/60 hover:text-secondary text-sm transition-colors duration-300'
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="group flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="relative mb-6">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl scale-110"></div>
              
              <img
                src="/img/founder2.jpg"
                alt="Daniele"
                className="relative w-40 h-40 rounded-full object-cover object-bottom transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 filter grayscale shadow-2xl border-4 border-white/10"
              />
            </div>
            
            <p className="text-sm text-accent/50 mb-2 font-secondary">Co-founder, Marketing & Growth</p>
            <h3 className="text-2xl font-bold text-accent mb-3">Daniele</h3>
            
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/daniele-rollo-9898061a5/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='group/link inline-flex items-center gap-2 text-accent/60 hover:text-secondary text-sm transition-colors duration-300'
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="300">
          <div className="inline-block bg-accent/5 border border-accent/10 rounded-2xl px-8 py-6 backdrop-blur-sm">
            <p className='text-lg text-accent/90 font-secondary italic'>
              "We are building Hora to redefine how the world values time."
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* FINAL CTA BANNER */}
    <div className='w-full h-[400px] relative overflow-hidden'>
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/img/section_5_1.JPG)' }}
      >
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6" data-aos="zoom-in">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-accent/80 font-secondary mb-8 max-w-2xl" data-aos="zoom-in" data-aos-delay="100">
          Join the Hora community and experience a new way to manage your time
        </p>
        <button 
          className="px-10 py-5 bg-secondary text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-secondary/50 hover:-translate-y-1 transition-all duration-300"
          onClick={() => setShowDemoModal(true)}
          data-aos="zoom-in" 
          data-aos-delay="200"
        >
          Book Your Demo Today
        </button>
      </div>
    </div>

    {/* Modals */}
    <DemoModal show={showDemoModal} onClose={() => setShowDemoModal(false)} />

    {/* Footer */}
    <Footer />
    </div>{/* Close the z-10 wrapper div from line 368 */}
  </main>
    
  </>
  );
}


