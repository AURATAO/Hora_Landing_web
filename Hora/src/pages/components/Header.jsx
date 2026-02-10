import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "hamburgers/dist/hamburgers.min.css";

export default function Header({ handleColor, secondsElapsed, flipped, onDemoClick }) {
  const [isActive, setIsActive] = useState(false);

  // elapsed time (keep)
  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

  // NYC time-based value (12am–8am => $1, otherwise $0.5)
  const { valueNow, earned } = useMemo(() => {
    const nyHour = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    ).getHours();

    const valueNow = nyHour >= 0 && nyHour < 8 ? 1 : 0.5;
    const perSecond = valueNow / 60;
    const earned = (secondsElapsed * perSecond).toFixed(2);

    return { valueNow, earned };
  }, [secondsElapsed]);

  useEffect(() => {
    if (isActive) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isActive]);

  const isAccentBg = handleColor === "bg-accent";
  const textColor = isAccentBg ? "text-primary" : "text-accent";
  const hamburgerTheme = isAccentBg ? "hamburger-dark" : "hamburger-light";

  return (
    <>
      <header
        className={`flex items-center justify-even px-3 h-18 w-full fixed shadow-[0_12px_22px_0_rgba(0,0,0,0.08)] z-40 ${handleColor} header-fix`}
      >
        <div className="flex items-center justify-between w-full mx-auto lg:max-w-7xl ">
          <nav className="flex space-x-5">
            <div className="hidden lg:flex" data-aos="fade-up">
              <Link
                to="/mission"
                className={`${textColor} text-xl font-light hover:text-gray-500`}
              >
                Mission
              </Link>
            </div>

            <div className="flex justify-between items-center lg:hidden">
              <div
                className={`hamburger hamburger--squeeze transform scale-75 ${
                  isActive ? "is-active" : ""
                } ${hamburgerTheme}`}
                onClick={() => setIsActive(!isActive)}
              >
                <div className="w-11.25 relative">
                  <div
                    className={`hamburger-inner ${isAccentBg ? "bg-primary" : "bg-accent"} h-0.5`}
                  ></div>
                </div>
              </div>
            </div>
          </nav>

          <div className={`flex items-center justify-center logo-flip ${flipped ? "flipped" : ""}`}>
            <div className={`front text-4xl font-normal font-heading md:text-5xl ${textColor}`}>
              <Link to="/">
                <div className="w-45">
                  <img src="/img/Horalogonew.png" alt="horalogo" className="w-full" />
                </div>
              </Link>
            </div>

            <div className="back text-center flex flex-col justify-center items-center md:flex-row md:gap-4">
              <div className={`logo-flip font-secondary ${textColor}`}>
                {hours.toString().padStart(2, "0")}:
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </div>

              <div className="dot hidden md:inline-block shrink-0" />

              {/* cold-tech: value + live value */}
              <div className={`logo-flip font-secondary ${textColor} flex items-center gap-2`}>
                <span className="uppercase tracking-[0.12em] text-xs opacity-80">
                  Value now
                </span>
                <span className="font-semibold">${valueNow}</span>
              </div>

              <div className="dot hidden md:inline-block shrink-0" />

              <div className={`logo-flip font-secondary ${textColor}`}>
                ${earned}
              </div>
            </div>
          </div>

          <button
            className="flex justify-center items-center button-tech-sm md:button-tech"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-center"
            onClick={onDemoClick}
          >
            Book Demo
          </button>
        </div>
      </header>

      <div
        className={`fixed top-18 pt-8 left-0 w-full h-screen bg-primary/70 transition-all duration-500 ease-in-out z-30 flex flex-col items-center justify-start ${
          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
        } lg:hidden`}
      >
        <Link
          to="/"
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4"
        >
          Home
        </Link>
        <Link
          to="/mission"
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4"
        >
          Mission
        </Link>
      </div>
    </>
  );
}
