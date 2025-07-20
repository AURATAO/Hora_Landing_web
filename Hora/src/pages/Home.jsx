import React, {useEffect, useRef, useState } from 'react';
import TestimonialsSlider from './components/TestimonialsSlider.jsx';
import Logo_01 from './components/animated/Logo_01.jsx';
import Logo_02 from './components/animated/Logo_02.jsx';
import Logo_03 from './components/animated/Logo_03.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import DemoModal from './components/DemoModal.jsx';
import JoinModal from "./components/JoinModal";
import Stopwatch from '../pages/components/Stopwatch.jsx';
import Iphone_01 from './components/Iphone_01.jsx';
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
  
  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(titleRef.current, { opacity: 0, y: 80, skewY: 9 });
  gsap.set(stopwatchRef.current, { opacity: 0, x: -100 });

  const tl = gsap.timeline();
  tl.to(titleRef.current, {
    opacity: 1,
    y: 0,
    skewY: 0,
    duration: 1.5,
    ease: "back.out"
  })
  .to(stopwatchRef.current, {
    opacity: 1,
    x: 0,
    duration: 1
  }, "-=0.5");


  gsap.from([...paragraphs.current], {
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: h2Ref.current,
      start: "top 90%",
      toggleActions: "play none none none",
    }
  });

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);


    useEffect(()=>{
        const handleScroll =()=>{
            const y = window.scrollY;
            const width = window.innerWidth;
             console.log("scrollY:", window.scrollY);
            if (window.scrollY > 1000) {
              console.log("Trigger animation!");
              setActiveAnimated(true);
            }

           //setHandleColor 
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
    console.log("activeAnimated changed:", activeAnimated);
  }, [activeAnimated]);

  const titleRef = useRef(null)
  const stopwatchRef = useRef(null)
  const pinSectionRef = useRef(null)
  const h2Ref = useRef(null)
  const paragraphs = useRef([])

useEffect(() => {
  paragraphs.current = paragraphs.current.slice(0, 2)
  gsap.set(titleRef.current, { opacity: 0, y: 80, skewY: 9 })
  gsap.set(stopwatchRef.current, { opacity: 0, x: -100 })

  const tl = gsap.timeline()
  tl.to(titleRef.current, {
    opacity: 1,
    y: 0,
    skewY: 0,
    duration: 1.5,
    ease: "back.out"
  })
  .to(stopwatchRef.current, {
    opacity: 1,
    x: 0,
    duration: 1
  }, "-=0.5")



  // paragraphs 用 batch 處理
  ScrollTrigger.batch(paragraphs.current, {
    onEnter: batch => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        overwrite: true
      })
    },
    start: "top 90%"
  })

  return () => {
    tl.kill()
    ScrollTrigger.getAll()?.forEach(trigger => trigger.kill())
  }
}, [])

useEffect(() => {
  AOS.init({
    duration: 1200,
  });
}, []);


  return (
  <>
 <Header handleColor={handleColor} secondsElapsed={secondsElapsed} flipped={flipped} onDemoClick={() => setShowDemoModal(true)}/>
  <main className="flex max-x-7xl flex-col items-center justify-center min-h-screen bg-accent " ref={pinSectionRef}>
    {/*banner*/}
    {/* <div className="bg-[url(/img/banner_3.JPG)] bg-cover bg-[position:80%_center] w-full min-h-[844px] md:bg-center"> */}
      <div className="max-w-7xl mx-auto min-h-screen px-6 pb-10 pt-[250px] lg:pt-[350px]">  
          <div className='text-center flex flex-col justify-center items-center  md:items-start md:justify-end md:text-left'>
           <h3 className='text-gray-500 font-base text-sm pb-2'>🚧 Currently building our MVP. Request a demo to learn more.</h3>
          <h1 className="text-6xl font-bold text-primary leading-tight mb-6 hero" ref={titleRef}>Your Hour, Your Way</h1>
          <div ref={stopwatchRef} style={{ opacity: 0, transform: "translateX(-100px)" }}>
          <Stopwatch  secondsElapsed={secondsElapsed} />
          </div>
          </div>
    </div>
    <DemoModal show={showDemoModal===true} onClose={() => setShowDemoModal(false)} />

    {/* Section 1 */}
    <div className="py-[100px] pt-10 w-full px-2 flex flex-col items-center justify-center md:py-[150px]">
      <h2 className=" text-5xl text-left font-semibold mb-4 text-primary p-4 md:text-6xl " data-aos="fade-up">What is Hora?</h2>
      <div className="text-lg mb-8 max-w-2xl text-left space-y-3 mx-8 ">
        <p className=" text-primary font-secondary " ref={el => paragraphs.current[0] = el}>Life’s busy. <br/>
          Get your time back. <br/>
          
          From errands to quiet company — it’s handled.</p>

        <p  className=" text-primary  font-secondary " ref={el => paragraphs.current[1] = el}>Your day runs lighter.
          Your mind stays sharp. <br/>
          Life doesn’t slow down. Neither do you. 
          </p>

      </div>
      <button className="py-9 font-secondary">
      <a href="/mission" className="button-tech font-secondary">
        How we do it
      </a>
      </button>
    </div>
    <div className="py-[90px] w-full mx-auto flex flex-col items-center justify-center bg-primary">
      <div className="flex flex-col items-start justify-center px-4 w-full md:items-center lg:items-start lg:px-0 max-w-7xl">
        <div className="pb-[64px] mx-4  pt-8"> 
          <h2 className="text-4xl text-accent md:text-6xl  " data-aos="fade-up">Why Hora?</h2>
          <p className="text-lg text-accent max-w-2xl pt-4 font-secondary">
            Your time, your needs — matched with trust and ease.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-[32px] w-full pt-[32px] pb-2 md:items-center lg:items-start lg:px-4 max-w-7xl">
          <div className="flex flex-col items-start justify-between py-4 md:items-center lg:items-start ">
           <div className='pb-4'>
            <Logo_01 activeAnimated={activeAnimated}/>
           </div>
            <div className="flex flex-col items-start pt-2 md:items-center lg:items-start ">
              <h3 className="text-3xl font-semibold text-accent pb-4  md:text-center lg:text-left">
                Safety is standard.
              </h3>
              <p className="text-lg font-secondary text-accent max-w-xl md:text-center lg:text-left">
              All supporters and requesters complete secure ID verification and background checks. Hire or earn with confidence. </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between py-4 md:items-center lg:items-start ">
            <div className='pb-4'>
            <Logo_02 activeAnimated ={activeAnimated}/>
            </div>
            <div className="flex flex-col items-start pt-2 md:items-center lg:items-start md:text-center lg:text-left ">
              <h3 className="text-3xl font-semibold text-accent pb-4  md:text-center lg:text-left">
                Payments, safeguarded.
              </h3>
              <p className="text-lg  font-secondary text-accent max-w-xl md:text-center lg:text-left">
               Transactions run on Stripe. Funds stay protected, always.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between py-4 md:items-center lg:items-start ">
            <div className='pb-4 '>
            <Logo_03 activeAnimated ={activeAnimated}/>
            </div>
            <div className="flex flex-col items-start justify-center pt-2 md:items-center lg:items-start ">
              <h3 className="text-3xl font-semibold text-accent pb-4  md:text-center lg:text-left">
                Only pay for real time.
              </h3>
              <p className="text-lg font-secondary text-accent max-w-xl">
                We charge by the minute — no rounding. You pay precisely for time used.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Section 2 */}
    <div className=" bg-accent w-full mx-auto flex flex-col items-center justify-center max-w-7xl py-[100px] md:py-[150px] lg:py-[90px]">
      <div className='flex flex-col font-semibold justify-center items-center mx-4 w-full lg:flex-row lg:justify-between lg:py-8'>
        <div className='flex flex-col justify-center items-center mx-4 lg:items-start'>
         <h1 className="text-5xl  text-primary pb-4 ">How to request a support</h1>
         <h3 className="text-xl text-primary font-secondary pb-10">One app. Two ways to request Support — instant or pre-scheduled.</h3>
        </div>
      <label className="label flex  pt-5 mx-5 lg:pt-0" >
        <div className="toggle" >
          <input className="toggle-state" type="checkbox" name="check" value="check" checked={isQuickRequest}  onChange={() => setIsQuickRequest(!isQuickRequest)}/>
           <div className="labels" >
              <span className="icon-left text-xs text-primary/30">QickRequest</span>
              <span className="icon-right text-xs text-primary/30">Scheduled</span>
            </div>
          <div className="indicator">
          </div>
        </div>
      </label>
      </div>
       {/* Section requester */}
    <div className= {`w-full mx-auto pt-8 flex-col items-center justify-center lg:flex-row-reverse lg:py-4 ${isQuickRequest ? "flex":"hidden"}`}>
      <div className=" max-w-3xl mx-auto px-6 pb-4 flex flex-col items-center justify-center">
        <h2 className="text-4xl text-primary pb-4 font-secondary font-semibold ">Scheduled Post (Pick your Supporter)</h2>
        <h3 className="text-xl  text-primary pb-10 font-secondary">Best for pre-planned needs/  — choose who to work with.</h3>
        {/* Step 1 */}
        <div className="flex flex-col w-full items-start py-12">
          <h2 className="text-[80px] font-semibold text-primary leading-none mb-4"  >01</h2>
          <h3 className="text-2xl  font-semibold text-primary mb-4"> Create profile & verified</h3>
          <p className="text-lg text-primary font-secondary max-w-lg">
            Join our verified network. Trust starts here.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col w-full items-start pb-12">
          <h2 className="text-[80px] font-semibold text-primary leading-none mb-4">02</h2>
          <h3 className="text-2xl  font-semibold text-primary mb-4">Post a task & set time</h3>
          <p className="text-lg text-primary font-secondary max-w-lg ">
            Define task details and schedule
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col w-full items-start pb-8">
          <h2 className="text-[80px] font-semibold text-primary leading-none mb-4">03</h2>
          <h3 className="text-2xl  font-semibold text-primary mb-4">Chat, negotiate & agree</h3>
          <p className="text-lg text-primary font-secondary max-w-lg">
           Confirm terms directly with supporter
          </p>
        </div>
        {/*step 4*/}
        <div className="flex flex-col w-full items-start pb-8">
          <h2 className="text-[80px] font-semibold text-primary leading-none mb-4">04</h2>
          <h3 className="text-2xl  font-semibold text-primary mb-4">Track time & pay for minutes used</h3>
          <p className="text-lg text-primary font-secondary max-w-lg">
            Pay only for the time actually used
          </p>
        </div>
      </div>
      {/* <div className="bg-[url(/img/requester_1.png)] w-full h-[300px] bg-cover bg-top md:w-1/2 md:h-[700px] lg:m-8 lg:h-lvh transition-transform duration-500 hover:scale-105"/> */}
      <div className='w-full md:w-1/2'data-aos="fade-right" ><Iphone_01/></div>
    </div>
       {/* Section supporter */}
    <div className={`w-full mx-auto pt-4 flex-col items-center justify-center lg:p-4 ${isQuickRequest? "hidden":"flex"}`}>
      <div className="w-full max-w-7xl mx-auto px-6 pb-4 flex flex-col items-center justify-center  ">
        <h2 className="text-4xl text-primary pb-4 font-secondary font-semibold">QuickRequest (Instant Match)</h2>
        <h3 className="text-xl text-primary font-secondary pb-10"> Best for urgent tasks — platform auto-matches supporters nearby.</h3>
        <div className='flex-col flex justify-center items-center lg:w-full lg:flex-row lg:gap-8 lg:items-start' >    
        {/* Step 1 */}
        <div className="flex flex-col items-start pb-12 w-full lg:w-1/4">
          <h2 className="text-[80px] font-semibold text-primary leading-none mb-4">01</h2>
          <h3 className="text-2xl   font-semibold text-primary mb-4">Create profile & verified</h3>
          <p className="text-lg text-primary font-secondary max-w-lg">
          Instant access with ID verification
          </p>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-start pb-12 w-full lg:w-1/4 ">
          <h2 className="text-[80px] font-semibold text-primary leading-none mb-4">02</h2>
          <h3 className="text-2xl  font-semibold text-primary mb-4">Tap QuickRequest</h3>
          <p className="text-lg text-primary font-secondary max-w-lg ">
            Send task request in one tap
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-start pb-12 w-full lg:w-1/4 ">
          <h2 className="text-[80px] font-semibold text-primary leading-none mb-4">03</h2>
          <h3 className="text-2xl font-semibold text-primary mb-4"> Auto-match with nearby supporter</h3>
          <p className="text-lg text-primary  font-secondary max-w-lg">
            System auto-matches based on location
          </p>
        </div>
         {/* Step 4 */}
        <div className="flex flex-col items-start pb-12 w-full lg:w-1/4 ">
          <h2 className="text-[80px] font-semibold text-primary leading-none mb-4">04</h2>
          <h3 className="text-2xl font-semibold text-primary mb-4"> Track time & pay for minutes used</h3>
          <p className="text-lg text-primary  font-secondary max-w-lg">
            Real-time tracking and minute-based billing
          </p>
        </div>
        </div>
      </div>
      {/* <div className=" bg-[url(/img/supporter_1.png)] w-full h-[400px] bg-cover bg-top md:h-[700px] lg:h-lvh lg:m-8 transition-transform duration-500 hover:scale-105 " /> */}
       <div className="relative flex justify-center items-center py-12 ">
          <div className='w-1/2'><div data-aos="fade-left" className="flex justify-center items-center">
              <img src="/img/pinkIphone.png" alt="" style={{width:'700px'}}/>
                  </div>
          </div>
          <div className="absolute top-6  left-12
              flex items-center gap-3 
              px-4 py-2  bg-white/30 backdrop-blur-md rounded-2xl shadow-lg w-64" data-aos="fade-up">
            <span className="text-xl">✅</span>
          <div className="flex flex-col">
             <span className="text-xs font-semibold text-gray-700">Hora</span>
              <span className="text-sm text-gray-900 leading-tight">Task matched successfully</span>
           </div>
        </div>
                {/*note 2*/}
                <div className="absolute top-20 left-12
                    flex items-center gap-3 
                    px-4 py-2
                    bg-white/30 backdrop-blur-md
                    rounded-2xl shadow-lg
                    w-64
                  " data-aos="fade-up">
                  <span className="text-xl">🕒</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700">Hora</span>
                    <span className="text-sm text-gray-900 leading-tight">Task checked in</span>
                  </div>
                </div>
                {/*note 3*/}
                <div className="absolute top-36 left-12
                    flex items-center gap-3 
                    px-4 py-2
                    bg-white/30 backdrop-blur-md
                    rounded-2xl shadow-lg
                    w-64
                  " data-aos="fade-up">
                  <span className="text-xl">💸</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700">Hora</span>
                    <span className="text-sm text-gray-900 leading-tight">Payment received</span>
                  </div>
                </div>

         </div>
         
    </div> 
   
    </div>
    {/*Section 3*/}
    <div className="py-20 bg-accent w-full mt-20 z-40">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold text-primary  mb-4"  data-aos="fade-up">Who uses Hora?</h2>
        <p className="text-primary/70 font-secondary mb-12">
          Be among the first to try Hora — join our waitlist now.
        </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Supporter Card */}
          <div className="border border-[#E5E7EB] bg-white rounded-3xl p-8 shadow-md"  >
            <h3 className="text-xl font-semibold text-[#222831] mb-4">💚 Supporter</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><span className="font-medium text-secondary">Who:</span> Students, freelancers, part-timers</li>
              <li><span className="font-medium text-secondary">How to start:</span> Sign up + verify identity</li>
              <li><span className="font-medium text-secondary">Earn:</span> $30-60/hr</li>
              <li className="italic text-xs text-gray-500">“Hora fits perfectly between my studies and weekend gigs.”</li>
            </ul>
            <button
              className="mt-6 w-full py-2 rounded-lg bg-[#222831] text-white hover:bg-[#333f48] transition"
              onClick={() => setShowJoinModal('supporter')}
            >
              Become a supporter
            </button>
          </div>

          {/* Requester Card */}
          <div className="border border-[#E5E7EB] bg-white rounded-3xl p-8 shadow-md" >
            <h3 className="text-xl font-semibold text-[#222831] mb-4">🤝 Requester</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><span className="font-medium text-secondary">Who:</span> Busy professionals, families, teams</li>
              <li><span className="font-medium text-secondary">How to start:</span> Quick Request or Schedule a task</li>
              <li><span className="font-medium text-secondary">Save time:</span> Up to 4 hrs per week</li>
              <li className="italic text-xs text-gray-500">“Posting a task takes less than 60 seconds. Love it.”</li>
            </ul>
            <button
              className="mt-6 w-full py-2 rounded-lg bg-[#A3C585] text-[#222831] hover:bg-[#91b76e] transition"
              onClick={() => setShowJoinModal('requester')}
            >
              Post a task
            </button>
          </div>
        </div>
         {showJoinModal && (
          <JoinModal role={showJoinModal} onClose={() => setShowJoinModal(null)} />
        )}
      </div>
    </div>



    {/*team*/}
    <div className='bg-primary w-full py-[90px]  '>
      <div className='max-w-7xl mx-auto px-10'>
      <div className="flex items-center gap-4 px-30">
          <div className="flex-1 h-px bg-gray-300 "></div>
          <div className="text-base font-semibold tracking-widest uppercase text-gray-600" data-aos="fade-up">
            Team
          </div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-30 p-6">
      {/* Founder 1 */}
      <div className="flex flex-col items-center">
        <img
          src="/img/founder1.JPG"
          alt="Anna"
          className="w-32 h-32 rounded-full object-cover transition-transform duration-300 hover:scale-110 mb-4  filter grayscale"
        />
        <h3 className="text-sm  text-accent/50 ">co-Founder</h3>
        <h3 className="text-xl text-accent" data-aos="fade-left" >Liang you</h3>
        <div className="flex gap-2 mt-2">
          <a href="https://www.linkedin.com/in/liang-you-tao-658705106/" target="_blank" rel="noopener noreferrer" className='text-accent/30 text-sm'>
            Linkedin
          </a>
          <a href="https://github.com/AURATAO" target="_blank" rel="noopener noreferrer" className='text-accent/30  text-sm'>
            github
          </a>
        </div>
      </div>

      {/* Founder 2 */}
      <div className="flex flex-col items-center">
        <img
          src="/img/founder2.jpg"
          alt="Leo"
          className="w-32 h-32 rounded-full object-cover object-left-bottom mb-4 transition-transform duration-300 hover:scale-110  filter grayscale"
        />
         <h3 className="text-sm  text-accent/50 ">co-Founder</h3>
        <h3 className="text-xl text-accent" data-aos="fade-left">Daniele</h3>
        <div className="flex gap-4 mt-2">
          <a href="https://linkedin.com/in/leo" target="_blank" rel="noopener noreferrer" className='text-accent/30  text-sm'>
            Linkedin
          </a>
        </div>
      </div>
      </div>
      </div>
    </div>
    {/* Section 3 未來補上 */}
    {/* <div className=' w-full mx-auto flex flex-col items-center justify-center bg-neutralbg'>
    <div className="py-[32px] w-full mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-x-32 ">
      <img src="/img/logo/Forbes.png" alt="Forbes" className="w-24 opacity-60"/>
      <img src="/img/logo/Stripe.png" alt="Stripe" className="w-24 opacity-60"/>
      <img src="/img/logo/Visa.png" alt="Visa" className="w-24 opacity-60"/>
      <img src="/img/logo/Vogue.png" alt="Vogue" className="w-24 opacity-60"/>
      <img src="/img/logo/Forbes.png" alt="Forbes" className="w-24 opacity-60"/>
    </div>
    </div> */}
    {/* Section 4 未來補上*/}
    {/* <div className='w-full mx-auto flex flex-col items-center justify-center bg-primary py-[32px]'>
    <div className="w-full mx-auto max-w-7xl flex flex-col items-start justify-center gap-24">
    <p className='text-secondary text-xl pt-8 mx-3'>What our users say</p>
    <TestimonialsSlider />
  </div>
    </div> */}
    {/* Section 5 */}
    <div className='w-full h-[300px] mx-auto flex flex-col items-center justify-center bg-[url(/img/section_5_1.JPG)] bg-cover bg-center  bg-no-repeat py-[64px]'/>

    {/* Footer */}
    <Footer />
  </main>
    
  </>
  );
}