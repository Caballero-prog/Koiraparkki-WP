import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FooterSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { footerData } from "../data/footerData";
import doglogo from "../assets/doglogo.svg";

const FOOTER_API_URL = "/wp-json/custom/v1/footer-section";

const socialIcons = {
  facebook: faFacebook,
  instagram: faInstagram,
  x: faXTwitter,
  youtube: faYoutube,
};

const FooterSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [socials, setSocials] = useState([]);
  const [wpFooterData, setWpFooterData] = useState({});

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(FOOTER_API_URL);
        if (!response.ok) return;

        const data = await response.json();

        if (data) {
          setWpFooterData(data);

          if (Array.isArray(data.socials)) {
            setSocials(data.socials);
          }
        }
      } catch {
        return;
      }
    };

    fetchFooterData();
  }, []);

  const currentFooterData = {
    description: wpFooterData.description || footerData.description,
    phone: wpFooterData.phone || footerData.phone,
    email: wpFooterData.email || footerData.email,
    copyrightName: wpFooterData.copyrightName || footerData.copyrightName,
  };

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

          <p className="footer-description">{currentFooterData.description}</p>

          {socials.length > 0 && (
            <div className="footer-socials">
              {socials.map((social) => {
                const icon = socialIcons[social.platform];

                if (!icon || !social.url) return null;

                return (
                  <a
                    key={`${social.platform}-${social.url}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social"
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon icon={icon} />
                  </a>
                );
              })}
            </div>
          )}
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

            <a href={`tel:${String(currentFooterData.phone).replace(/\s/g, "")}`}>
              {currentFooterData.phone}
            </a>

            <a href={`mailto:${currentFooterData.email}`}>
              {currentFooterData.email}
            </a>
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
        © {new Date().getFullYear()} {currentFooterData.copyrightName}
      </div>
    </footer>
  );
};

export default FooterSection;
