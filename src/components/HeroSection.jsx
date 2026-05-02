import "../styles/HeroSection.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { heroData } from "../data/heroData";
import { Link } from "react-router-dom";

const HERO_IMAGE_API_URL = "/wp-json/custom/v1/media-image?slug=hero-main";

const HeroSection = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const res = await fetch("/wp-json/custom/v1/hero-section");

        if (!res.ok) {
          setContent(heroData);
          return;
        }

        const data = await res.json();

        if (data?.title && data?.subtitle && data?.phone) {
          setContent({
            ...heroData,
            title: data.title,
            subtitle: data.subtitle,
            phone: data.phone,
            phoneHref: `tel:${data.phone.replace(/\s+/g, "")}`,
          });
        } else {
          setContent(heroData);
        }
      } catch {
        setContent(heroData);
      }
    };

    fetchHeroContent();
  }, []);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const res = await fetch(HERO_IMAGE_API_URL);
        if (!res.ok) return;

        const image = await res.json();

        if (image?.src) {
          setImageSrc(image.src);
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

        {content ? (
          <div className="hero-content">
            <h2>{content.title}</h2>

            <p>{content.subtitle}</p>

            <div className="hero-actions">
              <a href={content.phoneHref} className="hero-contact">
                <FontAwesomeIcon icon={faPhone} />
                <span>{content.phone}</span>
              </a>

              <Link
                to="/hoitosopimus"
                className="hero-cta"
                aria-label="Täytä koiran hoitosopimuslomake"
              >
                Täytä hoitosopimus
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;
