import DailyParkingPricing from "./DailyParkingPricing";
import HourlyParkingPricing from "./HourlyParkingPricing";
import "../styles/PricingSection.css";

const PricingSection = () => {
  return (
    <section className="pricing-section" id="prices">
      <div className="pricing-container">
        <h2 className="pricing-title">Hinnasto</h2>
        <p className="pricing-text">
          Samat hinnat kaikissa toimipisteissä. Valitse kokopäiväinen hoito tai
          tuntipysäköinti tarpeesi mukaan.
        </p>

        <div className="pricing-grid">
          <DailyParkingPricing />
          <HourlyParkingPricing />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;