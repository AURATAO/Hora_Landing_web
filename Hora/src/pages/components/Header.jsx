import { useEffect, useState, useMemo } from "react";
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
    if (isActive) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [isActive]);

  const isAccentBg = handleColor === "bg-accent";
  const textColor = isAccentBg ? "text-primary" : "text-accent";
  const hamburgerTheme = isAccentBg ? "hamburger-dark" : "hamburger-light";

  return (
    <>
      <header
        className={`flex items-center justify-even px-3 h-18 w-full fixed z-40 header-fix transition-colors duration-300 ${handleColor === 'bg-accent' ? 'bg-transparent' : handleColor} shadow-[0_12px_22px_0_rgba(0,0,0,0.08)]`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full w-full mx-auto lg:max-w-7xl">
          <nav className="flex space-x-5">
            <div className="hidden lg:flex items-center gap-6" data-aos="fade-up">
              <Link to="/mission" className={`${textColor} text-xl font-light hover:text-gray-500`}>
                Mission
              </Link>
              <Link to="/faq" className={`${textColor} text-xl font-light hover:text-gray-500`}>
                FAQ
              </Link>
              <Link to="/Contact" className={`${textColor} text-xl font-light hover:text-gray-500`}>
                Contact
              </Link>
              <Link to="/beta" className="text-secondary text-xl font-semibold hover:text-secondary/75">
                Join Beta →
              </Link>
            </div>

            <div className="flex justify-between items-center lg:hidden">
              <button
                type="button"
                aria-label={isActive ? "Close menu" : "Open menu"}
                aria-expanded={isActive}
                aria-controls="mobile-nav"
                className={`hamburger hamburger--squeeze transform scale-75 ${isActive ? "is-active" : ""
                  } ${hamburgerTheme}`}
                onClick={() => setIsActive(!isActive)}
              >
                <div className="w-11.25 relative">
                  <div
                    className={`hamburger-inner ${isAccentBg ? "bg-primary" : "bg-accent"} h-0.5`}
                  ></div>
                </div>
              </button>
            </div>
          </nav>

          <div className={`flex items-center justify-center logo-flip ${flipped ? "flipped" : ""}`}>
            <div className={`front text-4xl font-normal font-heading md:text-5xl ${textColor}`}>
              <Link to="/">
                <div className="w-28 sm:w-36 md:w-45">
                  <img src="/img/hora_logo.png" alt="horalogo" className="w-full" />
                </div>
              </Link>
            </div>

            <div className="back text-center flex flex-row items-center gap-2 md:gap-4">
              <div className={`logo-flip font-secondary text-sm md:text-base ${textColor}`}>
                {hours.toString().padStart(2, "0")}:
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </div>

              <div className="dot hidden md:inline-block shrink-0" />

              {/* cold-tech: value + live value */}
              <div className={`logo-flip font-secondary ${textColor} flex items-center gap-1 md:gap-2`}>
                <span className="hidden md:inline uppercase tracking-[0.12em] text-xs opacity-80">
                  Value now
                </span>
                <span className="font-semibold text-sm md:text-base hidden md:inline">${valueNow}</span>
              </div>

              <div className="dot hidden md:inline-block shrink-0" />

              <div className={`logo-flip font-secondary text-sm md:text-base ${textColor}`}>
                ${earned}
              </div>
            </div>
          </div>

          <button
            className="flex justify-center items-center button-tech-sm md:button-tech justify-self-end"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-center"
            onClick={onDemoClick}
          >
            Book Demo
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        aria-hidden={!isActive}
        className={`fixed top-18 pt-8 left-0 w-full h-screen bg-primary/50 transition-all duration-500 ease-in-out z-39 flex flex-col items-center justify-start ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"
          } lg:hidden`}
      >
        <Link
          to="/"
          onClick={() => setIsActive(false)}
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4 pb-4"
        >
          Home
        </Link>
        <Link
          to="/mission"
          onClick={() => setIsActive(false)}
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4 pb-4"
        >
          Mission
        </Link>
        <Link
          to="/faq"
          onClick={() => setIsActive(false)}
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4 pb-4"
        >
          FAQ
        </Link>
        <Link
          to="/Contact"
          onClick={() => setIsActive(false)}
          className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4 pb-4"
        >
          Contact
        </Link>
        <Link
          to="/beta"
          onClick={() => setIsActive(false)}
          className="mt-2 px-10 py-4 bg-secondary text-white font-semibold rounded-xl text-xl hover:bg-secondary/90 transition-all duration-200"
        >
          Join Beta →
        </Link>
      </div>
    </>
  );
}
