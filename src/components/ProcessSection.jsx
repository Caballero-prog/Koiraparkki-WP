import "../styles/ProcessSection.css";
import { useEffect, useState } from "react";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";

const steps = [
  {
    number: "01",
    title: "Ota yhteyttä",
    text: "Soita tai lähetä viesti, niin käymme läpi koirasi tilanteen ja sopivan hoitomuodon.",
  },
  {
    number: "02",
    title: "Tuo koirasi tutustumaan",
    text: "Tutustumiskäynnillä koirasi pääsee rauhassa näkemään tilan, ihmiset ja arjen ennen hoidon aloitusta.",
  },
  {
    number: "03",
    title: "Täytä hoitosopimus",
    text: "Ennen ensimmäistä hoitokertaa pyydämme täyttämään hoitosopimuksen ja koiran perustiedot.",
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
              Näin aloitus etenee
            </h2>
            <p className="process-lead">
              Aloittaminen on helppoa. Sovimme ensin yhteydenoton ja
              tutustumiskäynnin, jonka jälkeen voit täyttää hoitosopimuksen
              ennen ensimmäistä hoitokertaa.
            </p>
          </header>

          <ol className="process-steps">
            {steps.map((step) => (
              <li key={step.number} className="process-step">
                <span className="process-number">{step.number}</span>

                <div className="process-step-text">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-description">{step.text}</p>

                  {step.number === "03" && (
                    <a href="#/hoitosopimus" className="process-cta">
                      Täytä hoitosopimus
                    </a>
                  )}
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