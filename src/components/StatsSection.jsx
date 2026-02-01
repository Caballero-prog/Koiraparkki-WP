import "../styles/StatsSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot, faDog } from "@fortawesome/free-solid-svg-icons";

const StatsSection = () => {
  return (
    <section className="stats" aria-label="Koiraparkin tilastot">
      <div className="stats-inner">
        <ul className="stats-grid">
          <li className="stat-card">
            <FontAwesomeIcon icon={faClock} className="stat-icon" />
            <span className="stat-number">10+</span>
            <span className="stat-label">vuotta kokemusta</span>
          </li>

          <li className="stat-card">
            <FontAwesomeIcon icon={faLocationDot} className="stat-icon" />
            <span className="stat-number">4</span>
            <span className="stat-label">toimipistettä</span>
          </li>

          <li className="stat-card">
            <FontAwesomeIcon icon={faDog} className="stat-icon" />
            <span className="stat-number">500+</span>
            <span className="stat-label">koiraa hoidettua</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
