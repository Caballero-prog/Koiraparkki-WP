import { useNavigate } from "react-router-dom";
import "../styles/FooterSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import doglogo from "../assets/doglogo.svg";

const FooterSection = () => {
  const navigate = useNavigate();

  const goHomeTop = () => {
    navigate("/");
  };

  const scrollToSection = (id) => {
    navigate(`/#${id}`);
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
              href="https://www.facebook.com/koiraparkki/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>

            <a
              href="https://www.instagram.com/koiraparkki/?hl=fi"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a
              href="https://x.com/koiraparkki?lang=fi"
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

            <button type="button" onClick={goHomeTop}>
              Etusivu
            </button>

            <button type="button" onClick={() => scrollToSection("locations")}>
              Toimipisteet
            </button>

            <button type="button" onClick={() => scrollToSection("pricing")}>
              Hinnasto
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("monthly-plans")}
            >
              Kortit
            </button>

            <button type="button" onClick={() => scrollToSection("gallery")}>
              Galleria
            </button>

            <button type="button" onClick={() => scrollToSection("faq")}>
              UKK
            </button>

            <button type="button" onClick={() => scrollToSection("contact")}>
              Yhteys
            </button>
          </div>

          <div className="footer-column">
            <h4>Yhteys</h4>

            <a href="tel:+358456133212">+358 456 133 212</a>
            <a href="mailto:info@koiraparkki.fi">info@koiraparkki.fi</a>
          </div>

          <div className="footer-column">
            <h4>Lomakkeet</h4>

            <button type="button" onClick={() => navigate("/hoitosopimus")}>
              Hoitosopimus
            </button>

            <button type="button" onClick={() => navigate("/kortti")}>
              Korttitilaus
            </button>
          </div>

          <div className="footer-column">
            <h4>Lakiasiat</h4>

            <button type="button" onClick={() => navigate("/privacy")}>
              Tietosuojaseloste
            </button>

            <button type="button" onClick={() => navigate("/terms")}>
              Hoitoehdot
            </button>
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