import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "hamburgers/dist/hamburgers.min.css";
import { APP_STORE_URL } from "../../lib/config";

const navLinks = [
  { id: "services", label: "Services" },
  { id: "how-it-works", label: "How it works" },
  { id: "pricing", label: "Pricing" },
  { id: "trust", label: "Trust" },
  { id: "supporters", label: "Become a Supporter" },
];

// Home sections are plain anchors; this also covers a repeat click on the current hash.
const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView();
};

export default function Header() {
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
        className={`flex items-center px-5 md:px-8 h-18 w-full fixed z-40 header-fix bg-white/85 backdrop-blur-md border-b border-ink/10 transition-transform duration-300 ${hidden ? "lg:-translate-y-full" : "translate-y-0"}`}
      >
        <div className="flex items-center justify-between gap-6 h-full w-full mx-auto lg:max-w-7xl">
          <Link to="/" aria-label="HO:RA home" className="shrink-0">
            <img src="/img/hora_logo.png" alt="HO:RA" width="2239" height="707" className="h-9 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
            {navLinks.map(({ id, label }) => (
              <Link
                key={id}
                to={`/#${id}`}
                onClick={() => scrollToSection(id)}
                className="text-sm font-medium text-ink/80 hover:text-forest whitespace-nowrap transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={APP_STORE_URL}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap hover:bg-forest/90 active:scale-[0.98] transition"
            >
              Get the app
            </a>

            <div className="flex items-center lg:hidden -mr-3">
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
          </div>
        </div>
      </header>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        inert={!isActive}
        className={`fixed top-18 pt-8 left-0 w-full h-screen bg-ink/95 transition-opacity duration-300 ease-in-out z-39 flex flex-col items-center justify-start ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"} lg:hidden`}
      >
        {navLinks.map(({ id, label }) => (
          <Link
            key={id}
            to={`/#${id}`}
            onClick={() => {
              setIsActive(false);
              scrollToSection(id);
            }}
            className="text-xl text-center text-white mb-5 border-b border-white/15 w-3/4 pb-4"
          >
            {label}
          </Link>
        ))}
        <a
          href={APP_STORE_URL}
          className="mt-2 px-10 py-4 bg-cream text-ink font-semibold rounded-full text-lg hover:bg-cream/90 transition"
        >
          Get the app
        </a>
      </nav>
    </>
  );
}
