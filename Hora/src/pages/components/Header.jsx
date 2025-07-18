import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import 'hamburgers/dist/hamburgers.min.css';

export default function Header({handleColor, secondsElapsed, flipped, onDemoClick }) {
      const [isActive, setIsActive] = useState(false);

        const hours = Math.floor(secondsElapsed / 3600);
        const minutes = Math.floor((secondsElapsed % 3600) / 60);
        const seconds = secondsElapsed % 60;
        const earned = (secondsElapsed * (16.50/3600)).toFixed(4);
            
      useEffect(()=>{
        if(isActive){
          document.body.classList.add('overflow-hidden');
        }else{
          document.body.classList.remove('overflow-hidden')
        }
      },[isActive])
    return (
        <>
         <header className={` flex items-center justify-even px-3 h-[72px] w-full fixed shadow-[0_12px_22px_0_rgba(0,0,0,0.08)] z-40 ${handleColor} header-fix`} >
            <div className="flex items-center justify-between w-full mx-auto lg:max-w-7xl ">
            <nav className="flex space-x-5">
                <div className='hidden lg:flex'  data-aos="fade-up" >
                    <Link to="/mission" className={`${handleColor === 'bg-accent' ? 'text-primary' : 'text-accent'} text-xl font-light hover:text-gray-500`}>Mission</Link>
                </div>
              <div className='flex justify-between items-center lg:hidden'>
               <div
                  className={`hamburger hamburger--squeeze transform scale-75 
                      ${isActive ? 'is-active' : ''} 
                      ${handleColor === 'bg-accent' ? 'hamburger-dark' : 'hamburger-light'}
                    `}                    
                    onClick={() => setIsActive(!isActive)}
                    >
                    <div className=" w-[45px] relative " >
                        <div className={`hamburger-inner ${handleColor === 'bg-accent' ? 'bg-primary' : 'bg-accent'} h-[2px]`} ></div>
                </div>
               </div>
              </div>
            </nav>
            <div className={`flex items-center justify-center logo-flip ${flipped ? "flipped" : ""}`}>
            <div className={`front text-4xl font-normal font-heading md:text-5xl ${handleColor === 'bg-accent' ? 'text-primary' : 'text-accent'}`} >
              <Link to="/">Hora</Link>
            </div>
            <div className="back text-center flex flex-col justify-center items-center md:flex-row md:gap-4">
              <div className={`logo-flip font-secondary ${handleColor === 'bg-accent' ? 'text-primary !important' : 'text-accent !important'}`}>
                  {hours.toString().padStart(2,'0')}:
                  {minutes.toString().padStart(2,'0')}:
                  {seconds.toString().padStart(2,'0')}
              </div>
                 <div className="dot hidden md:inline-block flex-shrink-0 mb-" ></div>
                <div className={`logo-flip font-secondary ${handleColor === 'bg-accent' ? 'text-primary !important' : 'text-accent !important'}`}>
                  ${earned}
                </div>
            </div>
            </div>
          
            <button className='flex justify-center items-center button-tech-sm md:button-tech 'data-aos="fade-up"
             data-aos-anchor-placement="bottom-center" onClick={onDemoClick} >
                Book Demo
            </button>
            </div>
        </header>
        <div
        className={`fixed top-[72px] pt-8 left-0 w-full h-screen bg-primary/70 transition-all duration-500 ease-in-out z-30 flex flex-col items-center justify-start ${
          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
        } lg:hidden` }
      >
        <a
          href="/"
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4"
          
        >
          Home
        </a>
        <a
          href="/mission"
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4"
         
        >
          Mission
        </a>
        <a
          href="/about"
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4"
          
        >
          About
        </a>
      </div>
        </>
    )
}