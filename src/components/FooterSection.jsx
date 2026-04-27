import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FooterSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import doglogo from "../assets/doglogo.svg";

const FooterSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goHomeTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
      return;
    }

    navigate("/", {
      state: { scrollTop: true },
    });
  };

  const scrollToSection = (id) => {
    navigate(`/${id}`);
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

            <a
              href="https://www.youtube.com/@Koiraparkkicom-ze8hv"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} />
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

            <button type="button" onClick={() => navigate("/varaus")}>
              Varauslomake
            </button>
          </div>

          <div className="footer-column">
            <h4>Lakiasiat</h4>

            <button type="button" onClick={() => navigate("/privacy")}>
              Tietosuojaseloste
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
