import "../styles/ProcessSection.css";
import processDog from "../assets/process-dog.webp";

const steps = [
  {
    number: "01",
    title: "Täytä lomake",
    text: "Täytä varauslomake ja kerro koirastasi lyhyesti.",
  },
  {
    number: "02",
    title: "Soita tai lähetä viesti",
    text: "Vahvistamme ajan ja käymme läpi tärkeimmät tiedot.",
  },
  {
    number: "03",
    title: "Tuo koirasi tutustumiskäynnille",
    text: "Koirasi pääsee rauhassa tutustumaan tilaan, ihmisiin ja arkeen.",
  },
];

const ProcessSection = () => {
  return (
    <section className="process" aria-labelledby="process-title">
      <div className="process-inner">
        <div className="process-media">
          <img
            src={processDog}
            alt="Koira päivähoitotilassa tutustumassa ympäristöön"
            className="process-image"
          />
        </div>

        <div className="process-content">
          <header className="process-header">
            <h2 id="process-title" className="process-title">
              Näin varaus etenee
            </h2>
            <p className="process-lead">
              Varaaminen on helppoa. Aloitamme lyhyellä yhteydenotolla ja
              sovimme tutustumiskäynnin koirasi tarpeiden mukaan.
            </p>
          </header>

          <ol className="process-steps">
            {steps.map((step) => (
              <li key={step.number} className="process-step">
                <span className="process-number">{step.number}</span>

                <div className="process-step-text">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-description">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;