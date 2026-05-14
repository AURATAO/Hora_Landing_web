import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTimer } from "../context/TimerContext.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import DemoModal from './components/DemoModal.jsx';
import JoinModal from "./components/JoinModal.jsx";
import Logo_01 from './components/animated/Logo_01.jsx';
import Logo_02 from './components/animated/Logo_02.jsx';
import Logo_03 from './components/animated/Logo_03.jsx';
import { TECollapse } from "tw-elements-react";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Mission() {
  const secondsElapsed = useTimer();
   const [handleColor, setHandleColor] = useState('bg-accent');
   const [activeAnimated, setActiveAnimated] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [showJoinModal, setShowJoinModal] = useState(null);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 
 // time
const hours = Math.floor(secondsElapsed / 3600);
const minutes = Math.floor((secondsElapsed % 3600) / 60);
const seconds = secondsElapsed % 60;

// NYC time-based "value now" (12am–8am => $1, otherwise $0.5)
const nyHour = new Date(
  new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
).getHours();

const valueNow = nyHour >= 0 && nyHour < 8 ? 1 : 0.5;

// running value (matches the current valueNow)
const earned = (secondsElapsed * (valueNow / 60)).toFixed(2);
   const [flipped, setFlipped] = useState(false);

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

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(()=>{
           const handleScroll =()=>{
            const y = window.scrollY;
            const width = window.innerWidth;
               if (y > 1000 ) {
                 setActiveAnimated(true);
               }

             if (width < 1024) {
              if(y > 3673){
                setHandleColor('bg-primary');
              } else if (y > 3122) {
                setHandleColor('bg-accent');
              } else if (y > 1284){
                setHandleColor('bg-primary');
              }else {
                setHandleColor('bg-accent');
              }
            } else {
              if(y > 2796){
                setHandleColor('bg-primary')
              } else if (y > 2028) {
                setHandleColor('bg-accent');
              } else if (y > 1239) {
                setHandleColor('bg-primary');
              } else {
                setHandleColor('bg-accent');
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

  const [activeElement, setActiveElement] = useState("");
  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  }

  return (
    <>
    <Helmet>
      <title>Our Mission | Hora — Why We're Building a Time Economy</title>
      <meta name="description" content="Learn why we built Hora — a platform that turns spare time into real value. Connecting people who need help with those ready to give it, minute by minute." />
    </Helmet>
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }

      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-30px) rotate(5deg); }
      }

      @keyframes float-reverse {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(20px); }
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(163, 197, 133, 0.3); }
        50% { box-shadow: 0 0 40px rgba(163, 197, 133, 0.6); }
      }

      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes scale-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes rotate-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .gradient-animate {
        background: linear-gradient(135deg, #A3C585, #8FAF6E, #A3C585);
        background-size: 200% 200%;
        animation: gradient-shift 8s ease infinite;
      }

      .image-overlay {
        position: relative;
        overflow: hidden;
      }

      .image-overlay::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(163, 197, 133, 0.15) 0%, rgba(34, 40, 49, 0.1) 100%);
        z-index: 1;
      }

      .image-overlay::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40%;
        background: linear-gradient(to top, rgba(34, 40, 49, 0.9), transparent);
        z-index: 2;
      }

      /* Revolut-style floating orbs */
      .floating-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(40px);
        opacity: 0.3;
        pointer-events: none;
      }

      .hero-image {
        transition: transform 0.3s ease-out;
      }

      /* Grid pattern */
      .grid-pattern {
        background-image: 
          linear-gradient(rgba(163, 197, 133, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(163, 197, 133, 0.05) 1px, transparent 1px);
        background-size: 50px 50px;
      }
    `}</style>
    
    <Header handleColor={handleColor} secondsElapsed={secondsElapsed} flipped={flipped} onDemoClick={()=>setShowModal(true)}/>
    
      <main className="bg-accent w-full pt-18">
        
        {/* HERO SECTION - Revolut Style with Cool Animations */}
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-accent via-white to-secondary/10">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 grid-pattern opacity-50"></div>
          
          {/* Floating Orbs - Revolut Style */}
          <div className="floating-orb w-96 h-96 bg-secondary top-0 right-0" 
               style={{ animation: 'float-slow 20s ease-in-out infinite' }}></div>
          <div className="floating-orb w-80 h-80 bg-primary bottom-0 left-0" 
               style={{ animation: 'float-reverse 15s ease-in-out infinite' }}></div>
          <div className="floating-orb w-64 h-64 bg-secondary/50 top-1/2 left-1/2" 
               style={{ animation: 'float 25s ease-in-out infinite' }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left - Content */}
              <div className="space-y-8 text-center lg:text-left hero" data-aos="fade-right">
                
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-md rounded-full border border-secondary/20 shadow-lg">
                  <div className="relative">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-secondary rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Live in NYC</span>
                </div>

                {/* Main Headline with Stagger Animation */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.05]">
                    <span className="block" data-aos="fade-up" data-aos-delay="100">Unlock the</span>
                    <span className="block" data-aos="fade-up" data-aos-delay="200">true value of</span>
                     <span className=" gradient-animate block" data-aos="fade-up" data-aos-delay="300" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>time.</span>
                  </h1>
                </div>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-primary/70 font-secondary max-w-xl" data-aos="fade-up" data-aos-delay="400">
                  Delegate life's small tasks, or turn spare hours into fair pay.
                </p>

                {/* CTA Buttons with Hover Effects */}
                <div className="flex flex-col sm:flex-row items-center gap-4" data-aos="fade-up" data-aos-delay="500">
                  <button 
                    className="group relative px-8 py-4 bg-secondary text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    onClick={() => setShowModal(true)}
                  >
                    <span className="relative z-10">Book Demo</span>
                    <div className="absolute inset-0 bg-linear-to-r from-secondary to-secondary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </button>
                  
                  <div className="group flex items-center gap-3 px-6 py-4 bg-white/70 backdrop-blur-md rounded-xl border border-primary/10 hover:border-secondary/30 transition-all duration-300 cursor-default">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="font-secondary text-base font-semibold text-primary">
                        {hours.toString().padStart(2, "0")}:
                        {minutes.toString().padStart(2, "0")}:
                        {seconds.toString().padStart(2, "0")}
                      </span>
                    </div>

                    <div className="w-px h-6 bg-primary/20"></div>

                    <span className="text-sm text-primary/60 flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/40" />
                      <span className="uppercase tracking-[0.12em] text-[10px]">Value now</span>
                      <span className="font-semibold text-primary">${valueNow}</span>/min
                      <span className="text-primary/40">·</span>
                      <span className="text-primary/70">${earned}</span>
                    </span>
                  </div>

                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4" data-aos="fade-up" data-aos-delay="600">
                  <div className="flex items-center gap-2 text-sm text-primary/60">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-secondary">ID Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary/60">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-secondary">Background Checked</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary/60">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-secondary">Secure Payments</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-primary/10" data-aos="fade-up" data-aos-delay="700">
                  <span className="text-sm font-medium text-primary/70">MVP in development</span>
                </div>
              </div>

              {/* Right - Hero Image with Parallax */}
              <div className="relative" data-aos="fade-left">
                  <div className="relative w-full rounded-4xl h-full overflow-hidden">
                      <img 
                        src="/img/horaImage5.png" 
                        alt="Hora supporter delivering in NYC"
                        className="w-full h-auto rounded-3xl transform scale-110 hover:scale-115 transition-transform duration-700 origin-center"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center center'
                        }}
                      />
                    </div>

                  {/* Floating Stats Cards */}
                  <div 
                    className=" absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-secondary/20"
                    style={{ 
                      animation: 'float 3s ease-in-out infinite',
                      transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
                    }}
                    data-aos="fade-down"
                    data-aos-delay="800"
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

                  <div 
                    className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-secondary/20"
                    style={{ 
                      animation: 'float-reverse 4s ease-in-out infinite',
                      transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`
                    }}
                    data-aos="fade-up"
                    data-aos-delay="900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div>
                        <p className="text-xs text-primary/60 font-secondary">User Rating</p>
                        <p className="text-lg font-bold text-primary">4.9/5</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="absolute top-1/2 -left-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-secondary/20"
                    style={{ 
                      animation: 'float-slow 5s ease-in-out infinite',
                      transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`
                    }}
                    data-aos="fade-right"
                    data-aos-delay="1000"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                      </div>
                      <div>
                        <p className="text-xs text-primary/60 font-secondary">Tasks Done</p>
                        <p className="text-lg font-bold text-primary">500+</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 border-2 border-secondary/20 rounded-full" 
                     style={{ animation: 'rotate-slow 20s linear infinite' }}></div>
                <div className="absolute bottom-20 left-10 w-16 h-16 border-2 border-primary/20 rounded-full" 
                     style={{ animation: 'rotate-slow 15s linear infinite reverse' }}></div>
              </div>
            </div>
          </div>
      

        <DemoModal show={showModal} onClose={() => setShowModal(false)} />

     
           {/* ── FEATURES ── */}
        <div className="w-full bg-linear-0-to-b from-accent to-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Why Choose HO:RA?</h2>
              <p className="text-lg text-primary/70 font-secondary max-w-2xl mx-auto">A smarter way to get things done with real people you can trust</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Lightning Fast", desc: "Get matched with nearby supporters in seconds. No waiting, no hassle—just instant help when you need it." },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "100% Verified", desc: "Every supporter is ID-verified and background-checked. Connect with confidence in a secure environment." },
                { 
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",title: "Simple Pricing", desc: "Flat rate per task, plus a small per-minute charge if you run over. No hidden fees." 
                },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "Real Connections", desc: "Beyond tasks—get companionship, conversations, and emotional support from verified community members." },
                { icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z", title: "24/7 Support", desc: "Our team is always here to help. Real-time tracking, in-app chat, and dedicated customer support." },
                { icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", title: "Quality Ratings", desc: "Transparent reviews and ratings help you choose the best supporters. Build trust with every interaction." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/5">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                  <p className="text-primary/70 font-secondary leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VALUE PROPOSITION - Tech Stats Style */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Big Statement */}
            <div className="space-y-6" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Live in NYC</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.05]">
                Simple, trusted connections.
              </h2>
              <p className="text-xl text-primary/70 font-secondary">
                Your time, your terms.
              </p>
            </div>
            
            {/* Right - Counter Statement */}
            <div className="space-y-6 lg:text-right" >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.05]">
                Free your day.<br />Or earn your way.
              </h2>
              <p className="text-xl text-primary/70 font-secondary">
                HO:RA makes it effortless.
              </p>
            </div>
          </div>
        </div>

        {/* OUR VALUES - Tech Clean */}
        <div className="bg-primary w-full py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            
            {/* Header */}
            <div className="text-center mb-20" data-aos="fade-up">
              <div className="inline-block text-sm font-semibold text-accent/50 mb-4 tracking-[0.3em] uppercase">Why Now</div>
              <p className="text-lg md:text-xl text-accent/70 font-secondary max-w-4xl mx-auto leading-relaxed">
                In a world where trust is rare and time feels scarce, we believe micro-support between real people can rebuild something we've lost — connection, value, and agency.
              </p>
            </div>

            <div className="w-full h-px bg-accent/10 mb-20"></div>

            {/* Values Header */}
            <div className="mb-20 text-center" data-aos="fade-up">
              <div className="text-sm font-semibold text-secondary mb-4 tracking-wider uppercase">Our Values</div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-6">
                Time. Trust. Fair. Simple.
              </h2>
              <p className="text-xl text-accent/60 font-secondary max-w-2xl mx-auto">
                What we stand for, distilled into what matters most.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              
              <div className="text-center space-y-6" data-aos="fade-up" data-aos-delay="100">
                <div className="flex justify-center">
                  <Logo_01 activeAnimated={activeAnimated} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-accent mb-3">Time</h3>
                  <p className="text-lg text-accent/70 font-secondary">More for what matters.</p>
                </div>
              </div>

              <div className="text-center space-y-6" data-aos="fade-up" data-aos-delay="200">
                <div className="flex justify-center">
                  <Logo_02 activeAnimated={activeAnimated} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-accent mb-3">Human</h3>
                  <p className="text-lg text-accent/70 font-secondary">Trust. Respect. Always.</p>
                </div>
              </div>

              <div className="text-center space-y-6" data-aos="fade-up" data-aos-delay="300">
                <div className="flex justify-center">
                  <Logo_03 activeAnimated={activeAnimated}/>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-accent mb-3">Money</h3>
                  <p className="text-lg text-accent/70 font-secondary">Earn fair. Pay fair.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OUR PRINCIPLES - List Style */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-32">
          
          {/* Principles Header */}
          <div className="mb-16" data-aos="fade-up">
            <div className="text-sm font-semibold text-secondary mb-4 tracking-wider uppercase">Our Principles</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              How we operate, always.
            </h2>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-16">
            
            <div className="flex gap-6 group" data-aos="fade-right" data-aos-delay="100">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">01</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Respect time</h3>
                <p className="text-lg text-primary/70 font-secondary">Time is finite. We never waste it.</p>
              </div>
            </div>

            <div className="flex gap-6 group" data-aos="fade-right" data-aos-delay="200">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">02</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Build trust</h3>
                <p className="text-lg text-primary/70 font-secondary">Openness makes every connection stronger.</p>
              </div>
            </div>

            <div className="flex gap-6 group" data-aos="fade-right" data-aos-delay="300">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">03</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Stay fair</h3>
                <p className="text-lg text-primary/70 font-secondary">Fair pay, fair use — always balanced.</p>
              </div>
            </div>

            <div className="flex gap-6 group" data-aos="fade-right" data-aos-delay="400">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">04</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Keep it clear</h3>
                <p className="text-lg text-primary/70 font-secondary">No hidden rules. Just simple, honest terms.</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="mt-20" data-aos="fade-up">
            <div className="relative image-overlay rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/img/horaImage8.jpg"
                alt="Our Principles"
                className="w-full h-100 md:h-125 object-cover"
              />
            </div>
          </div>
        </div>

        {/* THE HORA DIFFERENCE - Accordion */}
        <div className="bg-primary w-full py-32">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            
            {/* Header */}
            <div className="mb-16 text-center" data-aos="fade-up">
              <div className="text-sm font-semibold text-secondary mb-4 tracking-wider uppercase">Our Approach</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-4">
                The HO:RA Difference
              </h2>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {[
                { id: "element1", title: "Verified & Safe", content: "All users complete ID verification and background checks, ensuring every connection happens in a secure, trusted environment." },
                { id: "element2", title: "Flexible Requests", content: "Post any kind of request — big or small — as long as it meets our community guidelines. Built to support exactly what you need." },
                { id: "element3", title: "Emotional Support", content: "The first platform where you can seek verified, genuine human connection — verified people to talk, walk, and build healthy connections with." },
                { id: "element4", title: "Fair for Everyone", content: "A flat fee guarantees supporters are fairly compensated. Run over? You're charged a small per-minute rate. Finish early? The unused time is refunded automatically."  },
                { id: "element5", title: "Zero Cost to Earn", content: "Become a supporter without paying any upfront registration or verification fees. Join freely and start earning right away." },
                { id: "element6", title: "Reputation System", content: "Our transparent review system helps everyone feel secure. 81% of people feel more confident with trusted ratings." },
                { id: "element7", title: "Bonus Tips", content: "Great service deserves more. Supporters can receive tips without limits, giving them even more ways to earn." },
                { id: "element8", title: "Smart Matchmaking", content: "Our algorithm connects you to the best supporters based on location, availability, and shared interests." }
              ].map((item, index) => (
                <div key={item.id} className="border-b border-accent/10 last:border-0" data-aos="fade-up" data-aos-delay={index * 50}>
                  <button
                    className="w-full flex items-center justify-between py-6 text-left group"
                    onClick={() => handleClick(item.id)}
                  >
                    <span className="text-xl md:text-2xl font-semibold text-accent group-hover:text-secondary transition-colors">
                      {item.title}
                    </span>
                    <span className={`transform transition-transform duration-300 ${activeElement === item.id ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <TECollapse show={activeElement === item.id}>
                    <div className="pb-6 text-lg text-accent/70 font-secondary leading-relaxed">
                      {item.content}
                    </div>
                  </TECollapse>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* JOIN WAITLIST */}
        <div className="w-full bg-accent py-32">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            
            {/* Header */}
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="w-full h-px bg-primary/10 mb-12"></div>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                Time, Reimagined.
              </h2>
              <p className="text-lg text-primary/70 font-secondary">
                Join our waitlist and be the first to experience HO:RA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Supporter Card */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-secondary to-secondary/50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-3xl">
                      💚
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Supporter</h3>
                  </div>

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
                        <span className="text-primary/80 font-secondary">Turn spare time into income.</span>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold text-secondary">How: </span>
                        <span className="text-primary/80 font-secondary">Sign up + verify identity</span>
                      </div>
                    </li>
                  </ul>

                  <div className="bg-secondary/5 border-l-4 border-secondary rounded-r-xl p-4 mb-6">
                    <p className="text-sm italic text-primary/70 font-secondary">
                      "Weekend free? Turn time into extra income."
                    </p>
                  </div>

                  <button
                    className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1"
                    onClick={() => setShowJoinModal('supporter')}
                  >
                    Offer Your Time →
                  </button>
                </div>
              </div>

              {/* Requester Card */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/5 overflow-hidden" >
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-primary/50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl">
                      🤝
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Requester</h3>
                  </div>

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
                        <span className="text-primary/80 font-secondary">Get help with tasks and reclaim your time.</span>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold text-primary">How: </span>
                        <span className="text-primary/80 font-secondary">QuickRequest or schedule a task</span>
                      </div>
                    </li>
                  </ul>

                  <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-4 mb-6">
                    <p className="text-sm italic text-primary/70 font-secondary">
                      "One tap. Chores done. Got my time back."
                    </p>
                  </div>

                  <button
                    className="w-full py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-all duration-300 hover:-translate-y-1"
                    onClick={() => setShowJoinModal('requester')}
                  >
                    Start a Request →
                  </button>
                </div>
              </div>
            </div>

            {showJoinModal && (
              <JoinModal role={showJoinModal} onClose={() => setShowJoinModal(null)} />
            )}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className='w-full h-100 relative overflow-hidden'>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/img/section_5_1.JPG)' }}
          >
            <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
          </div>

          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6" data-aos="zoom-in">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-accent/80 font-secondary mb-8 max-w-2xl" data-aos="zoom-in" data-aos-delay="100">
              Join the HO:RA community today
            </p>
            <button 
              className="px-10 py-5 bg-secondary text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-secondary/50 hover:-translate-y-1 transition-all duration-300"
              onClick={() => setShowModal(true)}
              data-aos="zoom-in" 
              data-aos-delay="200"
            >
              Book Your Demo
            </button>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}