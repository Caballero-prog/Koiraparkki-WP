import "../styles/PricingSection.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  pricingOptions,
  seasonalNotice,
  pricingSectionData,
} from "../data/pricingData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarCheck,
  faCircleInfo,
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";

const PRICING_API_URL = "/wp-json/custom/v1/pricing";
const PRICING_SEASONAL_API_URL = "/wp-json/custom/v1/pricing-seasonal";

const PricingSection = () => {
  const navigate = useNavigate();
  const [wpPricingOptions, setWpPricingOptions] = useState([]);
  const [wpSeasonalNotice, setWpSeasonalNotice] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const currentPricingOptions = useMemo(() => {
    return wpPricingOptions.length ? wpPricingOptions : pricingOptions;
  }, [wpPricingOptions]);

  const currentSeasonalNotice = wpSeasonalNotice || seasonalNotice;

  const currentActiveId = activeId || currentPricingOptions[0]?.id;

  const active = useMemo(() => {
    return (
      currentPricingOptions.find((item) => item.id === currentActiveId) ||
      currentPricingOptions[0]
    );
  }, [currentActiveId, currentPricingOptions]);

  useEffect(() => {
    const fetchPricingContent = async () => {
      try {
        const cached = sessionStorage.getItem("pricing-options");

        if (cached) {
          setWpPricingOptions(JSON.parse(cached));
          return;
        }

        const response = await fetch(PRICING_API_URL);
        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data)) {
          setWpPricingOptions(data);
          sessionStorage.setItem("pricing-options", JSON.stringify(data));
        }
      } catch {
        return;
      }
    };

    fetchPricingContent();
  }, []);

  useEffect(() => {
    const fetchSeasonalContent = async () => {
      try {
        const cached = sessionStorage.getItem("pricing-seasonal");

        if (cached) {
          setWpSeasonalNotice(JSON.parse(cached));
          return;
        }

        const response = await fetch(PRICING_SEASONAL_API_URL);
        if (!response.ok) return;

        const data = await response.json();

        if (data?.title && data?.modifier && data?.description) {
          setWpSeasonalNotice(data);
          sessionStorage.setItem("pricing-seasonal", JSON.stringify(data));
        }
      } catch {
        return;
      }
    };

    fetchSeasonalContent();
  }, []);

  return (
    <section
      className="pricing"
      id="pricing"
      aria-label={pricingSectionData.title}
    >
      <div className="pricing-inner">
        <header className="pricing-header">
          <h2 className="pricing-title">{pricingSectionData.title}</h2>
          <p className="pricing-lead">{pricingSectionData.lead}</p>
        </header>

        <div
          className="pricing-tabs"
          role="tablist"
          aria-label={pricingSectionData.tabsAriaLabel}
        >
          {currentPricingOptions.map((option) => {
            const isActive = option.id === currentActiveId;

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

                {active.includes?.length ? (
                  <div className="pricing-includes">
                    <h3 className="pricing-block-title">
                      <FontAwesomeIcon icon={faEuroSign} />
                      <span>{pricingSectionData.includesTitle}</span>
                    </h3>

                    <ul className="pricing-list">
                      {active.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="pricing-side">
                <div className="pricing-block pricing-block-booking">
                  <h3 className="pricing-block-title">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    <span>{pricingSectionData.bookingTitle}</span>
                  </h3>

                  <ul className="pricing-list">
                    {active.booking ? <li>{active.booking}</li> : null}
                    {active.cancellation ? (
                      <li>{active.cancellation}</li>
                    ) : null}
                    {active.noShow ? <li>{active.noShow}</li> : null}
                  </ul>

                  <button
                    type="button"
                    className="pricing-booking-button"
                    onClick={() => navigate("/varaus")}
                  >
                    {pricingSectionData.bookingButtonText}
                  </button>
                </div>

                {active.suitableFor?.length ? (
                  <div className="pricing-block pricing-block-suitable">
                    <h3 className="pricing-block-title">
                      <FontAwesomeIcon icon={faCircleInfo} />
                      <span>{pricingSectionData.suitableTitle}</span>
                    </h3>

                    <ul className="pricing-list">
                      {active.suitableFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div
          className="season-card"
          aria-label={pricingSectionData.seasonalAriaLabel}
        >
          <div className="season-card-header">
            <span className="season-badge">
              {currentSeasonalNotice.modifier}
            </span>

            <div className="season-header-text">
              <h3 className="season-title">{currentSeasonalNotice.title}</h3>
              <p className="season-description">
                {currentSeasonalNotice.description}
              </p>
            </div>
          </div>

          <ul className="season-tags">
            {(currentSeasonalNotice.periods || []).map((period) => (
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
