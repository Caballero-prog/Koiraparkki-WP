import "../styles/ProcessSection.css";
import { useEffect, useMemo, useState } from "react";
import { processSectionData, processSteps } from "../data/processData";
import { Link } from "react-router-dom";

const PROCESS_IMAGE_API_URL =
  "/wp-json/custom/v1/media-image?slug=process-main";
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
        const cached = sessionStorage.getItem("process-content");

        if (cached) {
          setWpProcessData(JSON.parse(cached));
          return;
        }

        const res = await fetch(PROCESS_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        if (data?.title && Array.isArray(data?.steps)) {
          setWpProcessData(data);
          sessionStorage.setItem("process-content", JSON.stringify(data));
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
        const cached = sessionStorage.getItem("process-image");

        if (cached) {
          setImageSrc(cached);
          return;
        }

        const res = await fetch(PROCESS_IMAGE_API_URL);
        if (!res.ok) return;

        const image = await res.json();

        if (image?.src) {
          setImageSrc(image.src);
          sessionStorage.setItem("process-image", image.src);
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
                    <Link
                      to={currentProcessData.ctaHref}
                      className="process-cta"
                    >
                      {currentProcessData.ctaText}
                    </Link>
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
