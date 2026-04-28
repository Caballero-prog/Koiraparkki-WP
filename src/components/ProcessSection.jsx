import "../styles/ProcessSection.css";
import { useEffect, useState } from "react";
import { processSectionData, processSteps } from "../data/processData";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";

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
              alt={processSectionData.imageAlt}
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
              {processSectionData.title}
            </h2>

            <p className="process-lead">{processSectionData.lead}</p>
          </header>

          <ol className="process-steps">
            {processSteps.map((step) => (
              <li key={step.number} className="process-step">
                <span className="process-number">{step.number}</span>

                <div className="process-step-text">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-description">{step.text}</p>

                  {step.hasCta ? (
                    <a
                      href={processSectionData.ctaHref}
                      className="process-cta"
                    >
                      {processSectionData.ctaText}
                    </a>
                  ) : null}
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