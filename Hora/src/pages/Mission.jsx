import { useEffect, useState } from "react";
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


export default function Mission( {secondsElapsed } ) {
   const [handleColor, setHandleColor] = useState('bg-accent');
   const [activeAnimated, setActiveAnimated] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [showJoinModal, setShowJoinModal] = useState(null);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 
   const hours = Math.floor(secondsElapsed / 3600);
   const minutes = Math.floor((secondsElapsed % 3600) / 60);
   const seconds = secondsElapsed % 60;
   const earned = (secondsElapsed * (16.50/3600)).toFixed(4);
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
    
      <main className="bg-accent w-full md:pt-[72px]">
        
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
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-secondary text-base font-semibold text-primary">
                        {hours.toString().padStart(2,'0')}:{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}
                      </span>
                    </div>
                    <div className="w-px h-6 bg-primary/20"></div>
                    <span className="text-sm text-primary/60">${earned}</span>
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
                  <span>🚧</span>
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
                    className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-secondary/20"
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

        {/* HORA IN ACTION - Image Grid */}
        <div className="w-full bg-white py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
                Hora in Action
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                Real people. Real tasks. Real connections.
              </h2>
              <p className="text-xl text-primary/70 font-secondary max-w-3xl mx-auto">
                From groceries to companionship, Hora supporters are making life easier across NYC.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Image 1 */}
              <div className="relative group image-overlay rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="100">
                <img 
                  src="/img/horaImage1.png" 
                  alt="Hora supporter delivering groceries in NYC"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Quick Delivery</h3>
                  <p className="text-white/90 font-secondary">Fresh groceries, delivered on your schedule</p>
                </div>
              </div>

              {/* Image 2 */}
              <div className="relative group image-overlay rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="200">
                <img 
                  src="/img/horaImage6.png" 
                  alt="Hora supporter handling packages"
                  className="w-full h-[500px] object-bottom object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Any Task</h3>
                  <p className="text-white/90 font-secondary">From shipping to errands, we've got you</p>
                </div>
              </div>

              {/* Image 3 */}
              <div className="relative group image-overlay rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="300">
                <img 
                  src="/img/horaImage3.png" 
                  alt="Hora supporter connecting with client"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Human Touch</h3>
                  <p className="text-white/90 font-secondary">Real connections that matter</p>
                </div>
              </div>
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
            <div className="space-y-6 lg:text-right" data-aos="fade-left">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.05]">
                Free your day.<br />Or earn your way.
              </h2>
              <p className="text-xl text-primary/70 font-secondary">
                Hora makes it effortless.
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
                className="w-full h-[400px] md:h-[500px] object-cover"
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
                The Hora Difference
              </h2>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {[
                { id: "element1", title: "Verified & Safe", content: "All users complete ID verification and background checks, ensuring every connection happens in a secure, trusted environment." },
                { id: "element2", title: "Flexible Requests", content: "Post any kind of request — big or small — as long as it meets our community guidelines. Built to support exactly what you need." },
                { id: "element3", title: "Emotional Support", content: "The first platform where you can seek verified, genuine human connection — verified people to talk, walk, and build healthy connections with." },
                { id: "element4", title: "Every Minute Counts", content: "Only pay for the time you actually use. If your session ends early, we'll automatically refund the unused minutes." },
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
                Join our waitlist and be the first to experience Hora.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Supporter Card */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/5 overflow-hidden" data-aos="fade-right">
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
              <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/5 overflow-hidden" data-aos="fade-left">
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
        <div className='w-full h-[400px] relative overflow-hidden'>
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
              Join the Hora community today
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