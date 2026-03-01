import "../styles/QuoteSection.css";
import wideDog from "../assets/koira2.jpg";

const QuoteSection = () => {
  return (
    <section className="intro-quote">
      <div className="intro-quote-bg">
        <img
          className="intro-quote-img"
          src={wideDog}
          alt=""
          aria-hidden="true"
        />
        <div className="intro-quote-inner">
          <blockquote className="intro-quote-text">
            <p>
              Oletko nähnyt hauskan koiralauman Helsingin kaduilla kävelyllä tai
              törmännyt laumaamme koirapuistossa? Teemme päivittäin usean tunnin
              pituisia retkiä Helsingin koirapuistoihin ja viheralueille –
              ilmoista huolimatta. Päivän touhuja voi katsoa Instagramista.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
