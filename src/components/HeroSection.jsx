import "../styles/HeroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-content">
          <h2>
            Häkitön <br />
            koirahoitola
          </h2>
          <p>Turvallinen päivähoito koirille</p>
          <a href="tel:+358456133212" className="hero-contact">
            <FontAwesomeIcon icon={faPhone} />
            <span>+358 456 133 212</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
