import "../styles/LegalPage.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";
const LEGAL_PAGE_API_URL = "/wp-json/wp/v2/pages?slug=tietosuojaseloste";

const LegalSection = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [legalTitle, setLegalTitle] = useState("Tietosuojaseloste");
  const [legalContent, setLegalContent] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "#/";
    }
  };

  useEffect(() => {
    const fetchLegalContent = async () => {
      try {
        const res = await fetch(LEGAL_PAGE_API_URL);
        if (!res.ok) return;

        const data = await res.json();
        const page = Array.isArray(data) ? data[0] : null;

        if (!page) return;

        setLegalTitle(page.title?.rendered || "Tietosuojaseloste");
        setLegalContent(page.content?.rendered || "");
      } catch {
        return;
      }
    };

    fetchLegalContent();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(MEDIA_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        const image = data.find(
          (item) => item.media_type === "image" && item.slug === "privacy-main"
        );

        if (image) {
          const version = image.modified_gmt || image.modified || image.id;

          setImageSrc(`${image.source_url}?v=${encodeURIComponent(version)}`);
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