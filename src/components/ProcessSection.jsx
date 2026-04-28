import "../styles/ProcessSection.css";
import { useEffect, useMemo, useState } from "react";
import { processSectionData, processSteps } from "../data/processData";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";
const PROCESS_API_URL = "/wp-json/custom/v1/process-section";

const ProcessSection = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [wpProcessData, setWpProcessData] = useState(null);

  const currentProcessData = wpProcessData
    ? {
        ...processSectionData,
        title: wpProcessData.title || processSectionData.title,
        lead: wpProcessData.lead || processSectionData.lead,
      }
    : processSectionData;

  const currentSteps = useMemo(() => {
    return wpProcessData?.steps?.length
      ? wpProcessData.steps.slice(0, 3)
      : processSteps.slice(0, 3);
  }, [wpProcessData]);

  useEffect(() => {
    const fetchProcessContent = async () => {
      try {
        const res = await fetch(PROCESS_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        if (data?.title && Array.isArray(data?.steps)) {
          setWpProcessData(data);
        }
      } catch {
        return;
      }
    };

    fetchProcessContent();
  }, []);

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
              alt={currentProcessData.imageAlt}
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
              {currentProcessData.title}
            </h2>

            <p className="process-lead">{currentProcessData.lead}</p>
          </header>

          <ol className="process-steps">
            {currentSteps.map((step) => (
              <li key={step.number} className="process-step">
                <span className="process-number">{step.number}</span>

                <div className="process-step-text">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-description">{step.text}</p>

                  {step.hasCta ? (
                    <a
                      href={currentProcessData.ctaHref}
                      className="process-cta"
                    >
                      {currentProcessData.ctaText}
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