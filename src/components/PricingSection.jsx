import "../styles/PricingSection.css";
import { useMemo, useState } from "react";
import { pricingOptions, seasonalNotice } from "../data/pricingData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarCheck,
  faCircleInfo,
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";

const PricingSection = () => {
  const [activeId, setActiveId] = useState(pricingOptions[0]?.id);

  const active = useMemo(() => {
    return (
      pricingOptions.find((item) => item.id === activeId) || pricingOptions[0]
    );
  }, [activeId]);

  return (
    <section className="pricing" id="pricing" aria-label="Hinnasto">
      <div className="pricing-inner">
        <header className="pricing-header">
          <h2 className="pricing-title">Hinnasto</h2>
          <p className="pricing-lead">
            Valitse palvelu ja katso sisältö, ajat sekä varaus- ja
            peruutusehdot.
          </p>
        </header>

        <div
          className="pricing-tabs"
          role="tablist"
          aria-label="Valitse palvelu"
        >
          {pricingOptions.map((option) => {
            const isActive = option.id === activeId;

            return (
              <button
                id={`pricing-tab-${option.id}`}
                key={option.id}
                type="button"
                className={`pricing-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveId(option.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`pricing-panel-${option.id}`}
                tabIndex={isActive ? 0 : -1}
              >
                {option.name}
              </button>
            );
          })}
        </div>

        {active ? (
          <div
            id={`pricing-panel-${active.id}`}
            className="pricing-panel"
            role="tabpanel"
            aria-labelledby={`pricing-tab-${active.id}`}
          >
            <div className="pricing-panel-main">
              <div className="pricing-offer">
                <p className="pricing-service">{active.name}</p>

                <div className="pricing-price-wrap">
                  <span className="pricing-price">{active.price}</span>
                  <span className="pricing-unit">{active.unit}</span>
                </div>

                <p className="pricing-hours">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{active.hours}</span>
                </p>

                <p className="pricing-summary">{active.summary}</p>

                <div className="pricing-includes">
                  <h3 className="pricing-block-title">
                    <FontAwesomeIcon icon={faEuroSign} />
                    <span>Hinta sisältää</span>
                  </h3>

                  <ul className="pricing-list">
                    {active.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pricing-side">
                <div className="pricing-block pricing-block-booking">
                  <h3 className="pricing-block-title">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    <span>Varaus ja peruutus</span>
                  </h3>

                  <ul className="pricing-list">
                    <li>{active.booking}</li>
                    <li>{active.cancellation}</li>
                    <li>{active.noShow}</li>
                  </ul>
                </div>

                <div className="pricing-block pricing-block-suitable">
                  <h3 className="pricing-block-title">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <span>Sopii erityisesti</span>
                  </h3>

                  <ul className="pricing-tags">
                    {active.suitableFor.map((item) => (
                      <li key={item} className="pricing-tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="season-card" aria-label="Sesonkihinnoittelu">
          <div className="season-card-header">
            <span className="season-badge">{seasonalNotice.modifier}</span>

            <div className="season-header-text">
              <h3 className="season-title">{seasonalNotice.title}</h3>
              <p className="season-description">{seasonalNotice.description}</p>
            </div>
          </div>

          <ul className="season-tags">
            {seasonalNotice.periods.map((period) => (
              <li key={period} className="season-tag">
                {period}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;