import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import DemoModal from './components/DemoModal.jsx';
import JoinModal from "./components/JoinModal.jsx";
import Logo_01 from './components/animated/Logo_01.jsx';
import Logo_02 from './components/animated/Logo_02.jsx';
import Logo_03 from './components/animated/Logo_03.jsx';
import { TECollapse } from "tw-elements-react";
import FakeIphone from "./components/FakeIphone.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Mission( {secondsElapsed } ) {
   const [handleColor, setHandleColor] = useState('bg-accent');
   const [activeAnimated, setActiveAnimated] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [showJoinModal, setShowJoinModal] = useState(null);
 

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
            


  useEffect(()=>{
           const handleScroll =()=>{
            const y = window.scrollY;
            const width = window.innerWidth;
                console.log("scrollY:", y);
               if (y > 1000 ) {
                 console.log("Trigger animation!");
                 setActiveAnimated(true);
               }

                //setHandleColor 
             if (width < 1024) {
              // 手機
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
              // 桌機
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
       console.log("activeAnimated changed:", activeAnimated);
     }, [activeAnimated]);
     const [activeElement, setActiveElement] = useState("");

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <>
    <Header handleColor={handleColor} secondsElapsed={secondsElapsed} flipped={flipped} onDemoClick={()=>setShowModal(true)}/>
      <main className="bg-accent  w-full md:pt-[72px]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col justify-center  items-center mx-8 pt-8 " >
            <div className="w-full flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:px-[72px]">
               <div data-aos="fade-left" className="flex justify-center items-center">
                  <div className="relative flex justify-center items-center pt-[60px] lg:pt-0">
                    <div className="relative rounded-[40px]">
                      {/* 綠灰科技光暈 */}
                      <div className="absolute inset-0 rounded-[40px] bg-emerald-400 opacity-10 blur-3xl"></div>
                      
                      {/* 外層額外光圈，增強數位感 */}
                      <div className="absolute inset-0 rounded-[40px] border border-emerald-400/10 shadow-[0_0_30px_#00ff9e22]"></div>

                      {/* 手機本體 */}
                      <div className="relative rounded-[40px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-inner shadow-emerald-900/30 backdrop-blur-sm bg-black/20">
                        <FakeIphone />
                      </div>
                    </div>
                  </div>
                </div>
              <div className="flex flex-col justify-center items-center lg:items-start">
              <div className="pb-4 flex items-baseline space-x-2 font-secondary text-xl text-primary " data-aos="zoom-out-left">
                <span>{hours.toString().padStart(2,'0')}:{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</span>
                <span className="text-sm text-primary/40">${earned} <span className="text-[10px]">at min wage</span></span>
              </div>
              <button className="time-box"  onClick={() => setShowModal(true)}  >  Book Demo </button>
              <h3 className='text-gray-500 font-base text-sm pt-4'>🚧 MVP in development.</h3>

              </div>
            </div>
            <div className="lg:flex-col lg:justify-center lg:items-start lg:text-left"> 
             <h1 className="text-primary  text-5xl pt-4 text-center md:text-7xl  lg:text-center  font-semibold " data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">Unlock the true value of time.</h1>
             <p className=" text-primary font-secondary  text-lg text-center pt-4 md:text-xl  lg:text-left lg:font-light  ">Delegate life’s small tasks, or turn spare hours into fair pay.</p>
            </div> 
          </div>
          <DemoModal show={showModal} onClose={() => setShowModal(false)} />
          {/*value*/}
        <div className="grid grid-rows-2 gap-4 max-w-7xl pb-[64px] mx-8 pt-[200px]  md:mx-8 hero">
          <div className="py-4">
          <h4 className="text-base text-secondary lg:text-xl pb-2" >Hora Today</h4>
          <p className="text-primary font-secondary text-2xl font-semibold  lg:text-5xl md:w-3/4" data-aos="zoom-in-right">Simple, trusted connections. Your time, your terms.</p>
          </div>
          <div className="py-4 flex" >
            <p className="text-primary font-secondary text-2xl font-semibold text-right  md:ml-auto md:w-3/4 lg:text-5xl lg:pt-10 " data-aos="fade-up" >Free your day. Or earn your way. Hora makes it effortless. </p>
          </div>
        </div>
        </div>
        {/*our value*/}
        <div className="bg-primary w-full py-[80px] ">
          <div className="max-w-7xl mx-8 py-10 md:mx-auto">
              <div className="flex items-center justify-center gap-4 px-30">
              <div className="flex-1 h-px bg-gray-300 hidden md:flex"></div>
              <div className="text-base font-semibold tracking-widest uppercase text-accent/50 text-center" data-aos="fade-up">
                Why now
              </div>
              <div className="flex-1 h-px bg-gray-300  hidden md:flex"></div>
            </div>
               <p className="text-base w-full font-semibold tracking-widest uppercase  text-accent/50   text-center pt-10 px-8" >
                In a world where trust is rare and time feels scarce, we believe micro-support between real people can rebuild something we've lost — connection, value, and agency.
              </p>
              <div className="flex-1 h-px bg-accent/50 my-10 md:hidden" data-aos="fade-up"></div>
          </div>
          <div className="max-w-7xl mx-8 py-20 md:mx-auto">
            <h4 className="text-base text-secondary py-2 md:pl-8 lg:text-xl ">Our Values</h4>
            <p className="text-5xl text-accent   md:w-4/5  w-full  md:mx-auto lg:w-1/2 lg:mx-8" data-aos="fade-down" >Time. Trust. Fair. Simple.</p>
            <p className="text-lg text-accent font-secondary  pt-[32px]  md:w-4/5 md:mx-auto lg:w-1/2 lg:mx-8">
              What we stand for, distilled into what matters most.
              </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left mx-4 pt-[72px]">  
                        <div className="flex flex-col items-start justify-center py-8  md:items-center lg:items-start  ">
                         <div className='pb-4  -ml-30 md:ml-0 '>
                          <Logo_01 activeAnimated={activeAnimated} />
                         </div>
                          <div className="flex flex-col items-start pt-2 md:items-center lg:items-start ">
                            <h3 className="text-3xl font-semibold text-accent pb-4  md:text-center lg:text-left">
                              Time
                            </h3>
                            <p className="text-xl text-accent font-secondary max-w-xl md:text-center lg:text-left">
                             More for what matters.
                            </p>
                          </div>
                        </div>
              
                        <div className="flex flex-col items-start justify-center py-8 md:items-center lg:items-start ">
                          <div className='pb-4 -ml-29 md:ml-0'>
                          <Logo_02 activeAnimated={activeAnimated} />
                          </div>
                          <div className="flex flex-col items-start  pt-2 md:items-center lg:items-start md:text-center lg:text-left ">
                            <h3 className="text-3xl font-semibold text-accent pb-4 md:text-center lg:text-left">
                              Human
                            </h3>
                            <p className="text-lg text-accent font-secondary max-w-xl md:text-center lg:text-left">
                            Trust. Respect. Always.
                            </p>
                          </div>
                        </div>
              
                        <div className="flex flex-col items-start justify-center py-8  md:items-center lg:items-start ">
                          <div className='pb-4 -ml-29 md:ml-0 '>
                          <Logo_03 activeAnimated={activeAnimated}/>
                          </div>
                          <div className="flex flex-col items-start pt-2 justify-center md:items-center lg:items-start ">
                            <h3 className="text-3xl font-semibold text-accent pb-4 md:text-center lg:text-left">
                              Money
                            </h3>
                            <p className="text-lg font-secondary text-accent max-w-xl">
                             Earn fair. Pay fair.
                            </p>
                          </div>
                        </div>
              
            </div>
          </div>
        </div>
        {/*our principle*/}
          <div className="max-w-7xl mx-auto relative h-full">
              <div className="relative flex justify-between ">
                  <div
                    className="h-full w-full overflow-hidden rounded transition-opacity duration-700"
                  >
                    <img
                      src="/img/Group9.png"
                      alt=""
                      className="absolute w-full object-cover lg:rounded-2xl lg:w-[700px]  lg:absolute lg:top-[-80px] lg:right-0 "
                    />
                  </div>
                </div>
                <div className="absolute pt-[350px] sm:pt-[600px] mx-8 md:pt-[700px]  lg:py-[108px] ">
                  <h4 className="text-base text-secondary  md:pl-8 lg:text-xl ">Our Principle </h4>
                  <p className="text-3xl text-primary font-secondary md:text-5xl md:w-4/5 md:mx-auto lg:w-2/3 lg:pt-8 lg:mx-8">How we operate, always.</p>
                </div> 
          </div>
           <div className="relative w-full pb-[72px] pt-[500px] sm:pt-[800px] md:pt-[850px] lg:pt-[400px]">
                <div className="flex justify-start items-start max-w-7xl mx-auto snap-x overflow-x-auto space-x-8 px-4 md:px-[64px] md:pt-[64px] scroll-container ">
                  <div className="snap-center shrink-0 w-[200px] flex flex-col justify-center items-start md:w-[300px]">
                    <h1 className="text-secondary/70 text-5xl pb-2 ">01</h1>
                    <h2 className="text-primary text-3xl font-semibold">Respect time</h2>
                    <p className="text-primary font-secondary text-lg py-8 text-left md:text-xl lg:text-2xl">Time is finite. We never waste it.</p>
                  </div>
                  <div className="snap-center shrink-0 w-[200px]  flex flex-col justify-center items-start md:w-[300px]">
                    <h1 className="text-secondary/70 text-5xl pb-2">02</h1>
                    <h2 className="text-primary text-3xl font-semibold">Build trust</h2>
                    <p className="text-primary font-secondary text-lg py-8 text-left md:text-xl lg:text-2xl">Openness makes every connection stronger.</p>
                  </div>
                  <div className="snap-center shrink-0 w-[200px]  flex flex-col justify-center items-start md:w-[300px]">
                    <h1 className="text-secondary/70 text-5xl pb-2 ">03</h1>
                    <h2 className="text-primary text-3xl font-semibold">Stay fair</h2>
                    <p className="text-primary font-secondary text-lg py-8 text-left md:text-xl lg:text-2xl">Fair pay, fair use — always balanced.</p>
                  </div>
                    <div className="snap-center shrink-0 w-[200px]  flex flex-col justify-center items-start md:w-[300px]">
                     <h1 className="text-secondary/70 text-5xl pb-2">04</h1>
                    <h2 className="text-primary text-3xl font-semibold">Keep it clear</h2>
                    <p className="text-primary font-secondary text-lg py-8 text-left md:text-xl lg:text-2xl">No hidden rules. Just simple, honest terms.</p>
                  </div>
                </div>
              </div>
              {/* our difference */}
              <div className="bg-primary w-full py-10 ">
                <div className="max-w-7xl mx-auto">
                  <div className="mx-8" >
                      <h1 className="text-base text-secondary py-4 md:pl-8 lg:text-xl">Our Apporach</h1> 
                      <p className="text-5xl text-accent  md:w-4/5  w-full  md:mx-auto lg:w-1/2 lg:mx-8">The Hora Difference</p>
                     <div className="py-10 md:hidden">
                       <div id="accordionExample">
                        <div >
                          <h2 className="mb-0" id="headingOne">
                            <button
                              className={`text-xl ${
                                activeElement === "element2" &&
                                `text-accent [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                              } group relative flex w-full items-center rounded-none  bg-primary px-2 py-4 text-left text-base text-accent transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                              type="button"
                              onClick={() => handleClick("element2")}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                               Verified & Safe 
                              <span
                                className={` ${
                                  activeElement === "element2"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#dfe8f0]`
                                } ml-auto h-5 w-5 shrink-0 fill-secondary transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </h2>
                          <TECollapse
                            show={activeElement === "element2"}
                            className="!mt-0 !rounded-b-none !shadow-none text-accent "
                          >
                            <div className="px-5 py-4 font-secondary text-sm">
                              <strong>All users complete ID verification and background checks</strong> ,ensuring every connection happens in a secure, trusted environment.</div>
                          </TECollapse>
                        </div>
                        <div>
                          <h2 className="mb-0" id="headingOne">
                            <button
                              className={` text-xl ${
                                activeElement === "element1" &&
                                `text-accent [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                              } group relative flex w-full items-center rounded-none  bg-primary px-2 py-4 text-left text-base text-accent transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                              type="button"
                              onClick={() => handleClick("element1")}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Flexible Requests
                              <span
                                className={` ${
                                  activeElement === "element1"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#dfe8f0]`
                                } ml-auto h-5 w-5 shrink-0 fill-secondary transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </h2>
                          <TECollapse
                            show={activeElement === "element1"}
                            className="!mt-0 !rounded-b-none !shadow-none text-accent"
                          >
                            <div className="px-5 py-4 font-secondary text-sm">
                               Post any kind of request — big or small — as long as it meets our community guidelines. <strong>Built to support exactly what you need.</strong>
                            </div>
                          </TECollapse>
                        </div>
                         <div>
                          <h2 className="mb-0" id="headingOne">
                            <button
                              className={` text-xl ${
                                activeElement === "element3" &&
                                `text-accent [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                              } group relative flex w-full items-center rounded-none  bg-primary px-2 py-4 text-left text-base text-accent transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                              type="button"
                              onClick={() => handleClick("element3")}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Emotional Support
                              <span
                                className={` ${
                                  activeElement === "element3"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#dfe8f0]`
                                } ml-auto h-5 w-5 shrink-0 fill-secondary transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </h2>
                          <TECollapse
                            show={activeElement === "element3"}
                            className="!mt-0 !rounded-b-none !shadow-none text-accent"
                          >
                            <div className="px-5 py-4 font-secondary text-sm">
                              <strong>The first platform where you can seek verified, genuine human connection</strong>  — verified people to talk, walk, and build healthy connections with. 
                            </div>
                          </TECollapse>
                        </div>
                         <div>
                          <h2 className="mb-0" id="headingOne">
                            <button
                              className={` text-xl ${
                                activeElement === "element4" &&
                                `text-accent [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                              } group relative flex w-full items-center rounded-none  bg-primary px-2 py-4 text-left text-base text-accent transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                              type="button"
                              onClick={() => handleClick("element4")}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Every Minute Counts
                              <span
                                className={` ${
                                  activeElement === "element4"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#dfe8f0]`
                                } ml-auto h-5 w-5 shrink-0 fill-secondary transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </h2>
                          <TECollapse
                            show={activeElement === "element4"}
                            className="!mt-0 !rounded-b-none !shadow-none text-accent"
                          >
                            <div className="px-5 py-4 font-secondary text-sm">
                            <strong>Only pay for the time you actually use.</strong>  If your session ends early, we automatically refund the unused minutes.
                            </div>
                          </TECollapse>
                        </div>
                         <div >
                          <h2 className="mb-0" id="headingOne">
                            <button
                              className={` text-xl ${
                                activeElement === "element5" &&
                                `text-accent [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                              } group relative flex w-full items-center rounded-none  bg-primary px-2 py-4 text-left text-base text-accent transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                              type="button"
                              onClick={() => handleClick("element5")}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Zero Cost to Earn
                              <span
                                className={` ${
                                  activeElement === "element5"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#dfe8f0]`
                                } ml-auto h-5 w-5 shrink-0 fill-secondary transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </h2>
                          <TECollapse
                            show={activeElement === "element5"}
                            className="!mt-0 !rounded-b-none !shadow-none text-accent"
                          >
                            <div className="px-5 py-4 font-secondary text-sm">
                             <strong>Become a supporter without paying any upfront registration or verification fees.</strong> Join freely and start earning right away.
                            </div>
                          </TECollapse>
                        </div>
                         <div >
                          <h2 className="mb-0" id="headingOne">
                            <button
                              className={` text-xl ${
                                activeElement === "element6" &&
                                `text-accent [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                              } group relative flex w-full items-center rounded-none  bg-primary px-2 py-4 text-left text-base text-accent transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                              type="button"
                              onClick={() => handleClick("element6")}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Reputation Check
                              <span
                                className={` ${
                                  activeElement === "element6"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#dfe8f0]`
                                } ml-auto h-5 w-5 shrink-0 fill-secondary transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </h2>
                          <TECollapse
                            show={activeElement === "element6"}
                            className="!mt-0 !rounded-b-none !shadow-none text-accent"
                          >
                            <div className="px-5 py-4 font-secondary text-sm">
                              Our playful, transparent review system helps everyone feel secure. In fact, 81% of people feel more confident reaching out to strangers when backed by trusted ratings and recommendations. 
                            </div>
                          </TECollapse>
                        </div>
                         <div >
                          <h2 className="mb-0" id="headingOne">
                            <button
                              className={` text-xl ${
                                activeElement === "element7" &&
                                `text-accent [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                              } group relative flex w-full items-center rounded-none  bg-primary px-2 py-4 text-left text-base text-accent transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                              type="button"
                              onClick={() => handleClick("element7")}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Bonus Tips
                              <span
                                className={` ${
                                  activeElement === "element7"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#dfe8f0]`
                                } ml-auto h-5 w-5 shrink-0 fill-secondary transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </h2>
                          <TECollapse
                            show={activeElement === "element7"}
                            className="!mt-0 !rounded-b-none !shadow-none text-accent"
                          >
                            <div className="px-5 py-4 font-secondary text-sm">
                              Great service deserves more. <strong>Supporters can receive tips without limits</strong> , giving them even more ways to earn.
                            </div>
                          </TECollapse>
                        </div>
                        <div >
                          <h2 className="mb-0" id="headingOne">
                            <button
                              className={`text-xl ${
                                activeElement === "element8" &&
                                `text-accent [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                              } group relative flex w-full items-center rounded-none  bg-primary px-2 py-4 text-left text-base text-accent transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                              type="button"
                              onClick={() => handleClick("element8")}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Smart Matchmaking
                              <span
                                className={` ${
                                  activeElement === "element8"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#dfe8f0]`
                                } ml-auto h-5 w-5 shrink-0 fill-secondary transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </h2>
                          <TECollapse
                            show={activeElement === "element8"}
                            className="!mt-0 !rounded-b-none !shadow-none text-accent "
                          >
                            <div className="px-5 py-4 font-secondary text-sm">
                             Our proprietary algorithm connects you to the best supporters based on location, availability, and shared interests — so every match feels just right.
                            </div>
                          </TECollapse>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex md:mx-8 md:py-10">
                      <div className="grid grid-cols-2 lg:grid-cols-3 space-x-4 lg:space-x-4">
                        <div className="py-4">
                           <h2 className="text-accent text-2xl font-semibold  "><span className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary/50 hover:after:w-full after:transition-all after:duration-300 ">Verified & Safety</span></h2>
                           <p className="text-accent font-secondary text-sm py-4 text-left lg:text-base">All users complete ID verification and background checks, so every connection happens in a secure, trusted environment.</p>
                        </div>
                         <div className="py-4">
                           <h2 className="text-accent text-2xl font-semibold"><span  className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary/50 hover:after:w-full after:transition-all after:duration-300">Fully Flexible Requests</span> </h2>
                           <p className="text-accent font-secondary text-sm py-4 text-left lg:text-base ">Post any kind of request — big or small — as long as it meets our community guidelines. We’re built to handle whatever support you need.</p>
                        </div>
                        <div className="py-4">
                           <h2 className="text-accent text-2xl font-semibold"> <span  className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary/50 hover:after:w-full after:transition-all after:duration-300">Emotional Support</span> </h2>
                           <p className="text-accent font-secondary text-sm py-4 text-left lg:text-base">We’re the first platform where real emotional needs are met — not just tasks, but presence. — verified people to talk, walk, and build healthy connections with. </p>
                        </div  >
                        <div className="py-4">
                           <h2 className="text-accent text-2xl font-semibold"> <span  className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary/50 hover:after:w-full after:transition-all after:duration-300">Every Minute Counts</span> </h2>
                           <p className="text-accent font-secondary text-sm py-4 text-left lg:text-base">Only pay for the time you actually use. If your session ends early, we automatically refund the unused minutes.</p>
                        </div>
                         <div className="py-4">
                           <h2 className="text-accent text-2xl font-semibold"> <span  className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary/50 hover:after:w-full after:transition-all after:duration-300">Zero Cost to Earn</span> </h2>
                           <p className="text-accent font-secondary text-sm py-4 text-left lg:text-base">Become a supporter without paying any upfront registration or verification fees. Join freely and start earning right away.</p>
                        </div>
                         <div className="py-4">
                           <h2 className="text-accent text-2xl font-semibold"><span  className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary/50 hover:after:w-full after:transition-all after:duration-300">Reputation Check </span> </h2>
                           <p className="text-accent font-secondary text-sm py-4 text-left lg:text-base">Our playful, transparent review system helps everyone feel secure. In fact, 81% of people feel more confident reaching out to strangers when backed by trusted ratings and recommendations.</p>
                        </div>
                        <div className="py-4">
                           <h2 className="text-accent text-2xl font-semibold"> <span  className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary/50 hover:after:w-full after:transition-all after:duration-300"> Bonus Tips</span></h2>
                           <p className="text-accent font-secondary text-sm py-4 text-left  lg:text-base"> Great service deserves more. Supporters can receive tips without limits, giving them even more ways to earn.</p>
                        </div>
                        <div className="py-4">
                           <h2 className="text-accent text-2xl font-semibold"> <span  className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary/50 hover:after:w-full after:transition-all after:duration-300">Smart Matchmaking</span></h2>
                           <p className="text-accent font-secondary text-sm py-4 text-left  lg:text-base">Our proprietary algorithm connects you to the best supporters based on location, availability, and shared interests — so every match feels just right.</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
           {/*Section 3*/}
             <div className="py-20 bg-primary w-full">
                <div className=" flex-1 h-px bg-accent/30 mx-10 lg:mx-[200px] " data-aos="fade-down"
                   data-aos-easing="linear" data-aos-duration="1500"></div>
               <div className="max-w-6xl mx-auto px-4 text-center py-20">
                 <h2 className="text-4xl font-semibold text-accent  mb-4"  data-aos="fade-up">Time, Reimagine.</h2>
                 <p className="text-accent/70 font-secondary mb-12">
                   Join our waitlist and be the first to experience Hora.
                 </p>
         
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                   {/* Supporter Card */}
                   <div className="border border-[#E5E7EB] bg-white rounded-3xl p-8 shadow-md"  >
                     <h3 className="text-xl font-semibold text-[#222831] mb-4">💚 Supporter</h3>
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li><span className="font-medium text-secondary">Who:</span> Students, freelancers, part-timers</li>
                        <li><span className="font-medium text-secondary">Why:</span> Use your spare time wisely — support with groceries, clean a backyard, or share an hour at the park. Every task brings value.</li>
                        <li><span className="font-medium text-secondary">How to start:</span> Sign up + verify identity</li>
                        <li className="italic text-xs text-gray-500">“🕒 Weekend free? I take a task or two — and turn time into extra income.”</li>
                      </ul>
                     <button
                       className="mt-6 w-full py-2 rounded-lg bg-[#222831] text-white hover:bg-[#333f48] transition"
                       onClick={() => setShowJoinModal('supporter')}
                     >
                      Offer Your Time
                     </button>
                   </div>
         
                   {/* Requester Card */}
                   <div className="border border-[#E5E7EB] bg-white rounded-3xl p-8 shadow-md" >
                     <h3 className="text-xl font-semibold text-[#222831] mb-4">🤝 Requester</h3>
                       <ul className="space-y-3 text-sm text-gray-700">
                        <li><span className="font-medium text-secondary">Who:</span> Busy professionals, families, teams</li>
                        <li><span className="font-medium text-secondary">Why:</span> Whether it’s picking up groceries, handling chores, or simply needing company — post what you need and use your time wisely.</li>
                        <li><span className="font-medium text-secondary">How to start:</span> QuickRequest or Schedule a task</li>
                        <li className="italic text-xs text-gray-500">“📱 One tap. Chores done. I’ve got my time back.”</li>
                      </ul>
                     <button
                       className="mt-6 w-full py-2 rounded-lg bg-[#A3C585] text-[#222831] hover:bg-[#91b76e] transition"
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
          <div className='w-full h-[300px] mx-auto flex flex-col items-center justify-center bg-[url(/img/section_5_1.JPG)] bg-cotain bg-center bg-no-repeat py-[64px]'/>

      </main>
        <Footer/>
      
    </>
    
  );
}