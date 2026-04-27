import "../styles/HeaderNav.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import dogLogo from "../assets/doglogo.svg";
import { navData } from "../data/navData";

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

  const closeMenu = () => setOpen(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    closeMenu();
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    closeMenu();
  };

  return (
    <header className="site-header" id="site-header">
      <nav ref={navRef} className="navigation-bar" aria-label="Päänavigaatio">
        <button
          className={`burger-menu ${open ? "open" : ""}`}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Sulje valikko" : "Avaa valikko"}
        >
          <FontAwesomeIcon icon={open ? faTimes : faBars} />
        </button>

        {/* Mobile text logo */}
        <button
          type="button"
          className="site-title site-title-mobile nav-brand-button"
          onClick={goToTop}
        >
          {navData.brandName}
        </button>

        {/* Mobile icon logo */}
        <button
          type="button"
          className="site-logo-link site-logo-link-mobile nav-brand-button"
          onClick={goToTop}
        >
          <img
            src={dogLogo}
            alt=""
            aria-hidden="true"
            className="site-logo site-logo-mobile"
          />
        </button>

        {/* Desktop logo */}
        <button
          type="button"
          className="brand-desktop nav-brand-button"
          onClick={goToTop}
        >
          <img
            src={dogLogo}
            alt=""
            aria-hidden="true"
            className="site-logo site-logo-desktop"
          />
          <span className="site-title site-title-desktop">
            {navData.brandName}
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="desktop-nav">
          {navData.sectionLinks.map((link) => (
            <li key={link.targetId}>
              <button
                type="button"
                className="nav-link-button"
                onClick={() => scrollToSection(link.targetId)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
        inert={!open ? "" : undefined}
      >
        <ul>
          {navData.sectionLinks.map((link) => (
            <li key={link.targetId}>
              <button
                type="button"
                className="nav-link-button"
                onClick={() => scrollToSection(link.targetId)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;