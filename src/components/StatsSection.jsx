import "../styles/StatsSection.css";

const StatsSection = () => {
  return (
    <section className="stats" aria-label="Koiraparkin tilastot">
      <div className="stats-inner">
        <ul className="stats-grid">
          <li className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">vuotta kokemusta</span>
          </li>
          <li className="stat-card">
            <span className="stat-number">4</span>
            <span className="stat-label">toimipistettä</span>
          </li>
          <li className="stat-card">
            <span className="stat-number">500+</span>
            <span className="stat-label">koiraa hoidettua</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
