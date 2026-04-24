import "../styles/FooterSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";

import doglogo from "../assets/doglogo.svg";

const FooterSection = () => {
  const scrollToSection = (id) => {
    // ensure we're on homepage route
    window.location.hash = "#/";

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
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

        {/* Links */}
        <div className="footer-columns">

          <div className="footer-column">
            <h4>Sivut</h4>

            <button onClick={() => scrollToSection("site-header")}>
              Etusivu
            </button>

            <button onClick={() => scrollToSection("locations")}>
              Toimipisteet
            </button>

            <button onClick={() => scrollToSection("pricing")}>
              Hinnasto
            </button>

            <button onClick={() => scrollToSection("gallery")}>
              Galleria
            </button>

            <button onClick={() => scrollToSection("faq")}>
              UKK
            </button>
          </div>

          <div className="footer-column">
            <h4>Yhteys</h4>

            <a href="tel:+358456133212">
              +358 456 133 212
            </a>

            <a href="mailto:info@koiraparkki.fi">
              info@koiraparkki.fi
            </a>
          </div>

          <div className="footer-column">
            <h4>Lomakkeet</h4>

            <a href="#/hoitosopimus">
              Hoitosopimus
            </a>
          </div>

          <div className="footer-column">
            <h4>Lakiasiat</h4>

            <a href="#/privacy">
              Tietosuojaseloste
            </a>

            <a href="#/terms">
              Hoitoehdot
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Koiraparkki
      </div>
    </footer>
  );
};

export default FooterSection;