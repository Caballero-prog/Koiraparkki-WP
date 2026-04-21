import "../styles/HeroSection.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";

const HeroSection = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const res = await fetch(MEDIA_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        const image = data.find(
          (item) => item.media_type === "image" && item.slug === "hero-main",
        );

        if (image) {
          setImageSrc(
            image.media_details?.sizes?.large?.source_url ||
              image.media_details?.sizes?.medium_large?.source_url ||
              image.source_url,
          );
        }
      } catch {
        return;
      }
    };

    fetchHeroImage();
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className="hero-image"
          />
        ) : (
          <div className="hero-skeleton" aria-hidden="true">
            <div className="hero-skeleton-shimmer" />
          </div>
        )}

        <div className="hero-overlay" />

        <div className="hero-content">
          <h2>
            Häkitön <br />
            koirahoitola
          </h2>

          <p>Turvallinen päivähoito koirille</p>

          <div className="hero-actions">
            <a href="tel:+358456133212" className="hero-contact">
              <FontAwesomeIcon icon={faPhone} />
              <span>+358 456 133 212</span>
            </a>

            <a
              href="#/hoitosopimus"
              className="hero-cta"
              aria-label="Täytä koiran hoitosopimuslomake"
            >
              Täytä hoitosopimus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
