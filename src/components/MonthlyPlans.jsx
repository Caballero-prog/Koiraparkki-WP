import "../styles/MonthlyPlansSection.css";
import { monthlyPlans, monthlyPlansInfo } from "../data/monthlyPlansData";

const MonthlyPlansSection = () => {
  return (
    <section className="monthly-plans" aria-labelledby="monthly-plans-title">
        
      <div className="monthly-plans-inner">
        <header className="monthly-plans-header">
          <h2 id="monthly-plans-title" className="monthly-plans-title">
            Sarja- ja kuukausikortit
          </h2>
          <p className="monthly-plans-lead">
            Sarja- ja kuukausikorteilla saat edullisemman päiväkohtaisen hinnan
            säännölliseen hoitoon arkipäivisin.
          </p>
        </header>

        <div className="monthly-plans-grid">
          {monthlyPlans.map((plan) => (
            <article
              key={plan.id}
              className={`monthly-plan-card ${plan.featured ? "is-featured" : ""}`}
            >
              <h3 className="monthly-plan-name">{plan.name}</h3>

              <div className="monthly-plan-price-wrap">
                <span className="monthly-plan-price">{plan.price}</span>
              </div>

              <p className="monthly-plan-rate">{plan.dailyRate}</p>

              <ul className="monthly-plan-details">
                {plan.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="monthly-plans-note" aria-label="Hyvä tietää">
          <h3 className="monthly-plans-note-title">{monthlyPlansInfo.title}</h3>

          <ul className="monthly-plans-note-list">
            {monthlyPlansInfo.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MonthlyPlansSection;
