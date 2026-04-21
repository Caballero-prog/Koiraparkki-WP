import "../styles/HeaderNav.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import dogLogo from "../assets/doglogo.svg";

const sectionLinks = [
  { label: "Toimipisteet", targetId: "locations" },
  { label: "Hinnat", targetId: "pricing" },
  { label: "Kortit", targetId: "monthly-plans" },
  { label: "UKK", targetId: "faq" },
];

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

    const navHeight =
      navRef.current?.getBoundingClientRect().height || 0;

    const top =
      el.getBoundingClientRect().top + window.scrollY - navHeight - 12;

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
    <header className="site-header">
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

        <button
          type="button"
          className="site-title site-title-mobile nav-brand-button"
          onClick={goToTop}
        >
          Koiraparkki
        </button>

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
          <span className="site-title site-title-desktop">Koiraparkki</span>
        </button>

        <ul className="desktop-nav">
          {sectionLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                className="nav-link-button"
                onClick={() => scrollToSection(link.targetId)}
              >
                {link.label}
              </button>
            </li>
          ))}

          <li>
            <a href="#/hoitosopimus">Hoitosopimus</a>
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
          {sectionLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                className="nav-link-button"
                onClick={() => scrollToSection(link.targetId)}
              >
                {link.label}
              </button>
            </li>
          ))}

          <li>
            <a href="#/hoitosopimus" onClick={closeMenu}>
              Hoitosopimus
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;