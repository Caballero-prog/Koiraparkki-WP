import "../styles/LegalPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const LEGAL_IMAGE_API_URL = "/wp-json/custom/v1/media-image?slug=privacy-main";
const LEGAL_PAGE_API_URL = "/wp-json/custom/v1/legal-page";

const LegalSection = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const cachedLegalContent = sessionStorage.getItem("legal-content");
  const parsedLegalContent = cachedLegalContent
    ? JSON.parse(cachedLegalContent)
    : null;

  const [legalTitle, setLegalTitle] = useState(
    parsedLegalContent?.title || "Tietosuojaseloste",
  );

  const [legalContent, setLegalContent] = useState(
    parsedLegalContent?.content || "",
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { state: { scrollTop: true } });
  };

  useEffect(() => {
    const fetchLegalContent = async () => {
      try {
        const cached = sessionStorage.getItem("legal-content");

        if (cached) {
          const parsed = JSON.parse(cached);
          setLegalTitle(parsed.title);
          setLegalContent(parsed.content);
          return;
        }

        const res = await fetch(LEGAL_PAGE_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        if (!data?.title) return;

        const formatted = {
          title: data.title,
          content: data.content || "",
        };

        setLegalTitle(formatted.title);
        setLegalContent(formatted.content);

        sessionStorage.setItem("legal-content", JSON.stringify(formatted));
      } catch {
        return;
      }
    };

    fetchLegalContent();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const cached = sessionStorage.getItem("legal-image");

        if (cached) {
          setImageSrc(cached);
          return;
        }

        const res = await fetch(LEGAL_IMAGE_API_URL);
        if (!res.ok) return;

        const image = await res.json();

        if (image?.src) {
          setImageSrc(image.src);
          sessionStorage.setItem("legal-image", image.src);
        }
      } catch {
        return;
      }
    };

    fetchImage();
  }, []);

  return (
    <section className="legal-page" aria-labelledby="legal-title">
      <div className="legal-inner">
        <button type="button" className="legal-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Takaisin</span>
        </button>

        <div className="legal-hero">
          <div className="legal-hero-media">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt=""
                aria-hidden="true"
                className="legal-hero-image"
              />
            ) : (
              <div className="legal-skeleton" aria-hidden="true">
                <div className="legal-skeleton-shimmer" />
              </div>
            )}

            <div className="legal-hero-overlay" />

            <div className="legal-hero-content">
              <h1 id="legal-title" className="legal-title">
                {legalTitle}
              </h1>
            </div>
          </div>
        </div>

        <article className="legal-content-card">
          {legalContent ? (
            <div
              className="legal-content"
              dangerouslySetInnerHTML={{ __html: legalContent }}
            />
          ) : (
            <div className="legal-content">
              <p>Sisältöä ladataan...</p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default LegalSection;
