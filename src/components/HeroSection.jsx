import "../styles/HeroSection.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };

    setVar();
    window.addEventListener("resize", setVar);
    return () => window.removeEventListener("resize", setVar);
  }, []);

  return (
    <header className="site-header">
      <nav ref={navRef} className="navigation-bar" aria-label="Main">
        <button
          className={`burger-menu ${open ? "open" : ""}`}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <FontAwesomeIcon icon={open ? faTimes : faBars} />
        </button>

        <h1 className="hero-title">Koiraparkki</h1>
        <div className="nav-spacer" aria-hidden="true" />
      </nav>

      <nav
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <ul>
          <li>
            <a href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => setOpen(false)}>
              Services
            </a>
          </li>
          <li>
            <a href="#pricing" onClick={() => setOpen(false)}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeroSection;
