import "../styles/ProcessSection.css";
import { useEffect, useState } from "react";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";

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
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(MEDIA_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        const image = data.find(
          (item) => item.media_type === "image" && item.slug === "process-main"
        );

        if (image) {
          setImageSrc(
            image.media_details?.sizes?.large?.source_url ||
              image.media_details?.sizes?.medium_large?.source_url ||
              image.source_url
          );
        }
      } catch {
        return;
      }
    };

    fetchImage();
  }, []);

  return (
    <section className="process" aria-labelledby="process-title">
      <div className="process-inner">
        <div className="process-media">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Koira päivähoitotilassa tutustumassa ympäristöön"
              className="process-image"
            />
          ) : (
            <div className="process-skeleton" aria-hidden="true">
              <div className="process-skeleton-shimmer" />
            </div>
          )}
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