import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "hamburgers/dist/hamburgers.min.css";

export default function Header({ onDemoClick }) {
  const [isActive, setIsActive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

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

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 1024) return;
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setHidden(false), 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <>
      <header
        className={`flex items-center justify-even px-3 h-18 w-full fixed z-40 header-fix bg-accent/20 backdrop-blur-md shadow-[0_12px_22px_0_rgba(0,0,0,0.08)] transition-transform duration-300 ${hidden ? "lg:-translate-y-full" : "translate-y-0"}`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full w-full mx-auto lg:max-w-7xl">
          <nav className="flex space-x-5">
            <div className="hidden lg:flex items-center gap-6" data-aos="fade-up">
              <Link to="/mission" className="text-primary text-xl font-light hover:text-gray-500">
                Mission
              </Link>
              <Link to="/faq" className="text-primary text-xl font-light hover:text-gray-500">
                FAQ
              </Link>
              <Link to="/Contact" className="text-primary text-xl font-light hover:text-gray-500">
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
                className={`hamburger hamburger--squeeze transform scale-75 ${isActive ? "is-active" : ""} hamburger-dark`}
                onClick={() => setIsActive(!isActive)}
              >
                <div className="w-11.25 relative">
                  <div className="hamburger-inner bg-primary h-0.5"></div>
                </div>
              </button>
            </div>
          </nav>

          <div className="flex items-center justify-center">
            <Link to="/">
              <div className="w-28 sm:w-36 md:w-45">
                <img src="/img/hora_logo.png" alt="horalogo" className="w-full" />
              </div>
            </Link>
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
        className={`fixed top-18 pt-8 left-0 w-full h-screen bg-primary/80 transition-all duration-500 ease-in-out z-39 flex flex-col items-center justify-start ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"} lg:hidden`}
      >
        <Link to="/" onClick={() => setIsActive(false)} className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4 pb-4">
          Home
        </Link>
        <Link to="/mission" onClick={() => setIsActive(false)} className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4 pb-4">
          Mission
        </Link>
        <Link to="/faq" onClick={() => setIsActive(false)} className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4 pb-4">
          FAQ
        </Link>
        <Link to="/Contact" onClick={() => setIsActive(false)} className="text-2xl text-center text-accent mb-6 border-b border-accent/20 w-2/4 md:w-3/4 pb-4">
          Contact
        </Link>
        <Link to="/beta" onClick={() => setIsActive(false)} className="mt-2 px-10 py-4 bg-secondary text-white font-semibold rounded-xl text-xl hover:bg-secondary/90 transition-all duration-200">
          Join Beta →
        </Link>
      </div>
    </>
  );
}
