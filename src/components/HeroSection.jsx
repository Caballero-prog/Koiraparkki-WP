import "../styles/HeroSection.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { heroData } from "../data/heroData";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";

const HeroSection = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [content, setContent] = useState(heroData);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const res = await fetch("/wp-json/custom/v1/hero-section");
        if (!res.ok) return;

        const data = await res.json();

        if (data?.title && data?.subtitle && data?.phone) {
          setContent({
            ...heroData,
            title: data.title,
            subtitle: data.subtitle,
            phone: data.phone,
            phoneHref: `tel:${data.phone.replace(/\s+/g, "")}`,
          });
        }
      } catch {
        return;
      }
    };

    fetchHeroContent();
  }, []);

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
    <section className="hero" id="top">
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
          <h2>{content.title}</h2>

          <p>{content.subtitle}</p>

          <div className="hero-actions">
            <a href={content.phoneHref} className="hero-contact">
              <FontAwesomeIcon icon={faPhone} />
              <span>{content.phone}</span>
            </a>

            <a
              href="/hoitosopimus"
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
