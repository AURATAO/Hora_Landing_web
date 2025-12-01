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
  <main className="flex max-x-7xl flex-col items-center justify-center  bg-accent " ref={pinSectionRef}>
    {/* HERO */}
    <div className="px-2 mx-auto pb-16 pt-[100px] lg:py-[250px]
                flex flex-col lg:flex-row justify-center items-center gap-10 md:mx-4 md:gap-10">

      {/* 左側：標題 + 計時 + CTA */}
      <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
        <h3 className="text-gray-500 text-sm pb-2 font-secondary">
          🚧 <span className='pl-2'>Alpha testing Hora in NYC.</span>
        </h3>

        <h1
          className="text-5xl md:text-6xl font-bold text-primary leading-tight mb-6 hero"
          ref={titleRef}
        >
          My Time, My Way
        </h1>

        <div
          ref={stopwatchRef}
          className="mb-8"
          style={{ opacity: 10, transform: "translateX(-100px)" }}
        >
          <Stopwatch secondsElapsed={secondsElapsed} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full ">
          {/* 主要 CTA：登記制 */}
          <button
            type="button"
            onClick={() => setShowJoinModal('requester')}
            className="button-tech font-secondary w-full "
          >
            Join the alpha waitlist
          </button>

          {/* 次要 CTA：直接進入 MVP */}
          <a
            href="https://mvp.horaapp.co"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full  px-6 py-3 rounded-full border border-primary/20
                      text-sm font-secondary text-primary/80
                      hover:bg-primary hover:text-accent transition"
          >
            View live MVP
          </a>
        </div>
      </div>

      {/* 右側：一張 app 圖（可以之後換成你想要的插畫） */}
      <div className="w-full lg:w-4/5 flex justify-center" data-aos="fade-left">
        <div  className="
          relative
          w-full
          sm:max-w-sm md:max-w-md lg:max-w-lg
          aspect-4/3                      
          overflow-hidden
          rounded-4xl
          shadow-2xl
        ">
          <img
            src="/heroPic.png"   
            alt="Hora app preview"
            className="w-full h-full object-cover"
          />
        </div>
          <div className="absolute -bottom-4 left-6
                          rounded-full bg-white/80 backdrop-blur-md px-4 py-1.5
                          text-[11px] font-secondary text-gray-700 shadow">
            Live MVP · Early access
          </div>
      </div>
    </div>
    <DemoModal show={showDemoModal===true} onClose={() => setShowDemoModal(false)} />

    {/* Section 1 */}
    <section className="w-full bg-primary py-20 md:py-[150px] px-4  flex justify-center">
    <div className="max-w-5xl w-full text-center">
      <h2
        ref={h2Ref}
        className="text-4xl md:text-5xl font-semibold text-accent mb-6"
        data-aos="fade-up"
      >
        What is Hora?
      </h2>

      {/* 兩句話，講清楚是什麼（保留 paragraphs 的 ref 給 GSAP 用） */}
      <div className="space-y-6 text-base md:text-lg text-accent font-secondary mb-10">
              <p ref={el => (paragraphs.current[0] = el)}>
                Hora is a time-based marketplace for everyday tasks and company.
              </p>
              <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6">
          {/* 左：busy 狀態 */}
          <p
            ref={el => (paragraphs.current[0] = el)}
            className="flex-1 rounded-2xl bg-accent/5 border border-accent/10 px-4 py-3 text-sm md:text-base text-left"
          >
            <span className="block text-xs uppercase tracking-wide text-accent mb-1">
              When you&apos;re busy
            </span>
            <span className="font-medium">
              you post what you need.
            </span>
          </p>

          {/* 中間：雙向箭頭 */}
          <div className="hidden md:flex items-center justify-center px-2">
            <span className="text-2xl text-accent">⇄</span>
          </div>

          {/* 右：free 狀態 */}
          <p
            ref={el => (paragraphs.current[1] = el)}
            className="flex-1 rounded-2xl bg-accent/5 border border-accent/10 px-4 py-3 text-sm md:text-base text-left"
          >
            <span className="block text-xs uppercase tracking-wide text-accent mb-1">
              When you&apos;re free
            </span>
            <span className="font-medium">
              you earn by offering your time nearby — tracked by the minute.
            </span>
          </p>
        </div>
      </div>

    {/* 三個很乾淨的小點：安全 / 金流 / 計費方式 */}
    <div className="grid gap-4 md:grid-cols-3 text-left">
      <div className="flex items-start gap-3 rounded-2xl border border-accent/10 bg-accent/5 px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 text-[11px] font-medium text-accent">
          1
        </span>
        <div>
          <p className="text-sm font-semibold text-accent">Verified people only</p>
          <p className="text-xs font-secondary text-accent/70">
            Requesters and supporters complete ID checks before using Hora.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-accent/10 bg-accent/5 px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 text-[11px] font-medium text-accent">
          2
        </span>
        <div>
          <p className="text-sm font-semibold text-accent">Secure payments</p>
          <p className="text-xs font-secondary text-accent/70">
            Payments run through Stripe so funds stay protected, both ways.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-accent/10 bg-accent/5 px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 text-[11px] font-medium text-accent">
          3
        </span>
        <div>
          <p className="text-sm font-semibold text-accent">Minute-based pricing</p>
          <p className="text-xs font-secondary text-accent/70">
            Hora tracks time in-app and you only pay for minutes actually used.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
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
      <div className=" max-w-3xl mx-auto px-4  flex flex-col items-center justify-center">
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
       <div className="relative flex justify-center items-center py-12 ">
          <div className='w-full sm:w-1/2'><div data-aos="fade-up" className="flex justify-center items-center">
              <img src="/img/greenphone2.png" alt="" className='hidden lg:flex' style={{width:'700px'}}/>
               <img src="/img/greenphone2-1.png" alt="" className='lg:hidden' style={{width:'700px'}}/>
            </div>
          </div>
                <div className="absolute  top-0 left-2  lg:top-100  lg:left-70
                    flex items-center gap-3 
                    px-4 py-2  bg-white/30 backdrop-blur-md rounded-2xl shadow-lg w-80 lg:w-64" data-aos="fade-up">
                  <span className="text-xl">✅</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-700">Hora</span>
                    <span className="text-xs text-gray-900 leading-tight">Task matched – ready to go</span>
                </div>
              </div>
                {/*note 2*/}
                <div className="absolute top-15 left-2  lg:top-80 lg:left-70
                    flex items-center gap-3 
                    px-4 py-2
                    bg-white/30 backdrop-blur-md
                    rounded-2xl shadow-lg
                    w-80 lg:w-64
                  " data-aos="fade-up">
                  <span className="text-xl">🕒</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700">Hora</span>
                    <span className="text-sm text-gray-900 leading-tight">Checked in at 3:14 PM</span>
                  </div>
                </div>
                {/*note 3*/}
                <div className="absolute top-30 left-2  lg:top-36 lg:right-0
                    flex items-center gap-3 
                    px-4 py-2
                    bg-white/30 backdrop-blur-md
                    rounded-2xl shadow-lg
                    w-80 lg:w-64
                  " data-aos="fade-up">
                  <span className="text-xl">💸</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700">Hora</span>
                    <span className="text-sm text-gray-900 leading-tight ">Payment Recieved </span>
                  </div>
                </div>

         </div>
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
          <div className='w-full sm:w-1/2'><div data-aos="fade-up" className="flex justify-center items-center">
              <img src="/img/greenphone.png" alt="" style={{width:'700px'}}/>
            </div>
          </div>
                <div className="absolute top-6  left-12
                    flex items-center gap-3 
                    px-4 py-2  bg-white/30 backdrop-blur-md rounded-2xl shadow-lg w-72 sm:w-64" data-aos="fade-up">
                  <span className="text-xl">✅</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-700">Hora</span>
                    <span className="text-sm text-gray-900 leading-tight">Match found!</span>
                </div>
              </div>
                {/*note 2*/}
                <div className="absolute top-20 left-12
                    flex items-center gap-3 
                    px-4 py-2
                    bg-white/30 backdrop-blur-md
                    rounded-2xl shadow-lg
                    w-72 sm:w-64
                  " data-aos="fade-up">
                  <span className="text-xl">🕒</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700">Hora</span>
                    <span className="text-sm text-gray-900 leading-tight">Task Checked in at 3:14 PM</span>
                  </div>
                </div>
                {/*note 3*/}
                <div className="absolute top-36 left-12
                    flex items-center gap-3 
                    px-4 py-2
                    bg-white/30 backdrop-blur-md
                    rounded-2xl shadow-lg
                    w-72 sm:w-64
                  " data-aos="fade-up">
                  <span className="text-xl">💸</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700">Hora</span>
                    <span className="text-sm text-gray-900 leading-tight">Payment confirmed</span>
                  </div>
                </div>

         </div>
         
    </div> 
   
    </div>
    {/*Section 3*/}
    <div className="pt-12 pb-20 bg-accent w-full  ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold text-primary  mb-4"  data-aos="fade-up">Who uses Hora?</h2>
        <p className="text-primary/70 font-secondary mb-12">
          Be among the first to try Hora — join our waitlist now.
        </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Supporter Card */}
          <div className="border border-[#E5E7EB] bg-white rounded-3xl p-8 shadow-md"  >
            <h3 className="text-xl font-semibold text-primary ` mb-4">💚 Supporter</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><span className="font-medium text-secondary">Who:</span> Students, freelancers, part-timers</li>
              <li><span className="font-medium text-secondary">Why:</span> Use your spare time wisely — support with groceries, clean a backyard, or share an hour at the park. Every task brings value.</li>
              <li><span className="font-medium text-secondary">How to start:</span> Sign up + verify identity</li>
              <li className="italic text-xs text-gray-500">“Weekend free? I take a task or two — and turn time into extra income.”</li>
            </ul>
            <button
              className="mt-6 w-full py-2 rounded-lg bg-primary text-white hover:bg-[#333f48] transition"
              onClick={() => setShowJoinModal('supporter')}
            >
              Offer Your Time
            </button>
          </div>

          {/* Requester Card */}
          <div className="border border-[#E5E7EB] bg-white rounded-3xl p-8 shadow-md" >
            <h3 className="text-xl font-semibold text-primary mb-4">🤝 Requester</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><span className="font-medium text-secondary">Who:</span> Busy professionals, families, teams</li>
              <li><span className="font-medium text-secondary">Why:</span> Whether it’s picking up groceries, handling chores, or simply needing company — post what you need and use your time wisely.</li>
              <li><span className="font-medium text-secondary">How to start:</span> QuickRequest or Schedule a task</li>
              <li className="italic text-xs text-gray-500">“One tap. Chores done. I’ve got my time back.”</li>
            </ul>
            <button
              className="mt-6 w-full py-2 rounded-lg bg-secondary text-primary hover:bg-[#91b76e] transition"
              onClick={() => setShowJoinModal('requester')}
            >
              Start a Request
            </button>
          </div>
        </div>
         {showJoinModal && (
          <JoinModal role={showJoinModal} onClose={() => setShowJoinModal(null)} />
        )}
      </div>
    </div>



    {/*team*/}
    <div className='bg-primary w-full py-[150px]  '>
      <div className='max-w-7xl mx-auto px-10'>
      <div className="flex items-center gap-4 px-30">
          <div className="hidden  md:flex flex-1 h-px bg-gray-300 "></div>
          <div className="text-base font-semibold md:tracking-widest uppercase text-gray-600" data-aos="fade-up">
            Behind Hora
          </div>
          <div className=" hidden md:flex flex-1 h-px bg-gray-300"></div>
        </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-30 p-6">
      {/* Founder 1 */}
      <div className="flex flex-col items-center">
        <img
          src="/img/founder1.JPG"
          alt="Anna"
          className="w-32 h-32 rounded-full object-cover transition-transform duration-300 hover:scale-110 mb-4  filter grayscale"
        />
        <h3 className="text-sm  text-accent/50 ">Co-founder, Product & Business</h3>
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
          className="w-32 h-32 rounded-full object-cover object-bottom-left mb-4 transition-transform duration-300 hover:scale-110  filter grayscale"
        />
         <h3 className="text-sm  text-accent/50 ">Co-founder, Marketing & Growth</h3>
        <h3 className="text-xl text-accent" data-aos="fade-left">Daniele</h3>
        <div className="flex gap-4 mt-2">
          <a href="https://www.linkedin.com/in/daniele-rollo-9898061a5/" target="_blank" rel="noopener noreferrer" className='text-accent/30  text-sm'>
            Linkedin
          </a>
        </div>
      </div>
      </div>
       <p className='text-center text-accent/70 font-secondary pt-[30px]'>"We are building Hora to redefine how the world values time."</p>
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
    <div className='w-full h-[300px] mx-auto flex flex-col items-center justify-center bg-[url(/img/section_5_1.JPG)] bg-cover bg-center  bg-no-repeat py-16'/>

    {/* Footer */}
    <Footer />
  </main>
    
  </>
  );
}