import "../styles/FooterSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";

import doglogo from "../assets/doglogo.svg";

const FooterSection = () => {
  const scrollToSection = (id) => {
  window.location.hash = "#/";

  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, 0);
};

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={doglogo} alt="Koiraparkki logo" className="footer-logo" />

          <p className="footer-description">
            Häkitön koirahoitola turvalliseen ja aktiiviseen päivähoitoon.
          </p>

          <div className="footer-socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="X"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>Sivut</h4>

            <button type="button" onClick={() => scrollToSection("site-header")}>
              Etusivu
            </button>

            <button type="button" onClick={() => scrollToSection("locations")}>
              Toimipisteet
            </button>

            <button type="button" onClick={() => scrollToSection("pricing")}>
              Hinnasto
            </button>

            <button type="button" onClick={() => scrollToSection("gallery")}>
              Galleria
            </button>

            <button type="button" onClick={() => scrollToSection("faq")}>
              UKK
            </button>
          </div>

          <div className="footer-column">
            <h4>Yhteys</h4>

            <a href="tel:+358456133212">+358 456 133 212</a>
            <a href="mailto:info@koiraparkki.fi">info@koiraparkki.fi</a>
          </div>

          <div className="footer-column">
            <h4>Lomakkeet</h4>

            <a href="#/hoitosopimus">Hoitosopimus</a>
          </div>

          <div className="footer-column">
            <h4>Lakiasiat</h4>

            <a href="#/privacy">Tietosuojaseloste</a>
            <a href="#/terms">Hoitoehdot</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Koiraparkki
      </div>
    </footer>
  );
};

export default FooterSection;