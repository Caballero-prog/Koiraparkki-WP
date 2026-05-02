import "../styles/MonthlyPlansSection.css";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { monthlyPlans, monthlyPlansInfo } from "../data/monthlyPlansData";

const PLANS_API_URL = "/wp-json/custom/v1/plans";
const PLANS_INFO_API_URL = "/wp-json/custom/v1/plans-info";

const MonthlyPlansSection = () => {
  const [wpPlans, setWpPlans] = useState([]);
  const [wpPlansInfo, setWpPlansInfo] = useState(null);

  const currentPlans = useMemo(() => {
    return wpPlans.length ? wpPlans : monthlyPlans;
  }, [wpPlans]);

  const currentPlansInfo = wpPlansInfo || monthlyPlansInfo;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const cached = sessionStorage.getItem("plans");

        if (cached) {
          setWpPlans(JSON.parse(cached));
          return;
        }

        const res = await fetch(PLANS_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        if (Array.isArray(data)) {
          setWpPlans(data);
          sessionStorage.setItem("plans", JSON.stringify(data));
        }
      } catch {
        return;
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchPlansInfo = async () => {
      try {
        const cached = sessionStorage.getItem("plans-info");

        if (cached) {
          setWpPlansInfo(JSON.parse(cached));
          return;
        }

        const res = await fetch(PLANS_INFO_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        if (data?.title && Array.isArray(data?.items)) {
          const formatted = {
            ...monthlyPlansInfo,
            noteTitle: data.title,
            items: data.items,
          };

          setWpPlansInfo(formatted);
          sessionStorage.setItem("plans-info", JSON.stringify(formatted));
        }
      } catch {
        return;
      }
    };

    fetchPlansInfo();
  }, []);

  return (
    <section
      className="monthly-plans"
      id="monthly-plans"
      aria-labelledby="monthly-plans-title"
    >
      <div className="monthly-plans-inner">
        <header className="monthly-plans-header">
          <h2 id="monthly-plans-title" className="monthly-plans-title">
            {currentPlansInfo.title}
          </h2>

          <p className="monthly-plans-lead">{currentPlansInfo.lead}</p>
        </header>

        <div className="monthly-plans-grid">
          {currentPlans.map((plan) => (
            <article
              key={plan.id}
              className={`monthly-plan-card ${
                plan.featured ? "is-featured" : ""
              }`}
            >
              <h3 className="monthly-plan-name">{plan.name}</h3>

              <div className="monthly-plan-price-wrap">
                <span className="monthly-plan-price">{plan.price}</span>
              </div>

              <p className="monthly-plan-rate">{plan.dailyRate}</p>

              {plan.details?.length ? (
                <ul className="monthly-plan-details">
                  {plan.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}

              <Link
                to={`/kortti?card=${plan.id}`}
                className="monthly-plan-button"
              >
                {currentPlansInfo.buttonText}
              </Link>
            </article>
          ))}
        </div>

        <div
          className="monthly-plans-note"
          aria-label={currentPlansInfo.noteAriaLabel}
        >
          <h3 className="monthly-plans-note-title">
            {currentPlansInfo.noteTitle}
          </h3>

          {currentPlansInfo.items?.length ? (
            <ul className="monthly-plans-note-list">
              {currentPlansInfo.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default MonthlyPlansSection;
