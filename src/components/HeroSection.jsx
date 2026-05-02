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
      const lang = localStorage.getItem("lang") || "fi";
      const cacheKey = `hero-content-${lang}`;

      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        setContent(JSON.parse(cached));
        return;
      }

      try {
        const res = await fetch(`/wp-json/custom/v1/hero-section?lang=${lang}`);
        if (!res.ok) throw new Error();

        const data = await res.json();

        const formatted = {
          ...heroData,
          title: data.title,
          subtitle: data.subtitle,
          phone: data.phone,
          phoneHref: data.phoneHref || `tel:${data.phone.replace(/\s+/g, "")}`,
          cta: data.cta || heroData.cta,
        };

        setContent(formatted);
        sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
      } catch {
        setContent(heroData);
      }
    };

    fetchHeroContent();

    window.addEventListener("languagechange", fetchHeroContent);

    return () => {
      window.removeEventListener("languagechange", fetchHeroContent);
    };
  }, []);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const cached = sessionStorage.getItem("hero-image");

        if (cached) {
          setImageSrc(cached);
          return;
        }

        const res = await fetch(HERO_IMAGE_API_URL);
        if (!res.ok) return;

        const image = await res.json();

        if (image?.src) {
          setImageSrc(image.src);
          sessionStorage.setItem("hero-image", image.src);
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
            loading="eager"
            fetchPriority="high"
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
                aria-label={content.cta}
              >
                {content.cta || "Täytä hoitosopimus"}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;
