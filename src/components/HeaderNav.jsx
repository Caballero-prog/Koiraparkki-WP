import "../styles/HeaderNav.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import dogLogo from "../assets/doglogo.svg";

const HeaderNav = () => {
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
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <FontAwesomeIcon icon={open ? faTimes : faBars} />
        </button>

        {/* Mobile / tablet centered title */}
        <h1 className="site-title site-title-mobile">Koiraparkki</h1>

        {/* Mobile / tablet right-side logo */}
        <img
          src={dogLogo}
          alt=""
          aria-hidden="true"
          className="site-logo site-logo-mobile"
        />

        {/* Desktop left brand */}
        <div className="brand-desktop">
          <img
            src={dogLogo}
            alt=""
            aria-hidden="true"
            className="site-logo site-logo-desktop"
          />
          <h1 className="site-title site-title-desktop">Koiraparkki</h1>
        </div>

        <ul className="desktop-nav">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <nav
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
        inert={!open ? "" : undefined}
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

export default HeaderNav;