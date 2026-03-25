import "../styles/LocationsSection.css";
import { useEffect, useMemo, useState } from "react";
import { locations } from "../data/locations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faPhone,
  faEnvelope,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";

const getImageNumberFromSlug = (slug) => {
  const match = slug.match(/-(\d+)$/);
  return match ? Number(match[1]) : 999;
};

const LocationsSection = () => {
  const [activeId, setActiveId] = useState(locations[0]?.id);
  const [locationImages, setLocationImages] = useState({});

  useEffect(() => {
    const fetchLocationImages = async () => {
      try {
        const response = await fetch(MEDIA_API_URL);

        if (!response.ok) {
          return;
        }

        const mediaItems = await response.json();

        const groupedImages = {};

        locations.forEach((location) => {
          const prefix = `locations-${location.id}-`;

          groupedImages[location.id] = mediaItems
            .filter((item) => item.media_type === "image")
            .filter((item) => item.slug?.startsWith(prefix))
            .sort((a, b) => {
              return getImageNumberFromSlug(a.slug) - getImageNumberFromSlug(b.slug);
            })
            .slice(0, 4)
            .map((item) => {
              return (
                item.media_details?.sizes?.large?.source_url ||
                item.media_details?.sizes?.medium_large?.source_url ||
                item.source_url
              );
            });
        });

        console.log("groupedImages", groupedImages);
        setLocationImages(groupedImages);
      } catch {
        return;
      }
    };

    fetchLocationImages();
  }, []);

  const active = useMemo(() => {
    const baseLocation =
      locations.find((l) => l.id === activeId) || locations[0];

    if (!baseLocation) return null;

    return {
      ...baseLocation,
      images: locationImages[baseLocation.id] || [],
    };
  }, [activeId, locationImages]);

  console.log("active location", active);

  return (
    <section className="locations" id="locations" aria-label="Toimipisteet">
      <div className="locations-inner">
        <header className="locations-header">
          <h2 className="locations-title">Toimipisteet</h2>
          <p className="locations-lead">
            Valitse toimipiste ja katso tärkeimmät tiedot sekä tunnelma kuvien kautta.
          </p>
        </header>

        <div className="locations-tabs" role="tablist" aria-label="Valitse toimipiste">
          {locations.map((loc) => {
            const isActive = loc.id === activeId;

            return (
              <button
                key={loc.id}
                type="button"
                className={`locations-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveId(loc.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${loc.id}`}
              >
                {loc.name}
              </button>
            );
          })}
        </div>

        {active ? (
          <div
            id={`panel-${active.id}`}
            className="locations-panel"
            role="tabpanel"
            aria-label={`${active.name} tiedot`}
          >
            <div className="locations-bento" aria-label="Toimipisteen kuvat">
              <div className="bento-tile bento-big">
                <img
                  src={active.images?.[0]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              </div>

              <div className="bento-tile bento-small">
                <img
                  src={active.images?.[1] || active.images?.[0]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              </div>

              <div className="bento-tile bento-small">
                <img
                  src={active.images?.[2] || active.images?.[0]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              </div>

              {active.images?.[3] ? (
                <div className="bento-tile bento-wide">
                  <img
                    src={active.images?.[3]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                </div>
              ) : null}
            </div>

            <div className="locations-info">
              <div className="locations-info-head">
                <div className="locations-name-row">
                  <h3 className="locations-name">{active.name}</h3>
                  {active.city ? (
                    <span className="locations-city">{active.city}</span>
                  ) : null}
                </div>

                {active.services?.length ? (
                  <div className="locations-badges" aria-label="Palvelut">
                    {active.services.map((s) => (
                      <span key={s} className="locations-badge">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}

                {active.summary ? (
                  <p className="locations-summary">{active.summary}</p>
                ) : null}
              </div>

              <div className="locations-info-grid">
                <div className="info-block">
                  <h4 className="info-title">
                    <FontAwesomeIcon icon={faClock} /> Aukioloajat
                  </h4>
                  <ul className="hours-list">
                    {(active.hours || []).map((h) => (
                      <li key={`${h.label}-${h.value}`} className="hours-row">
                        <span className="hours-label">{h.label}</span>
                        <span className="hours-value">{h.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="info-block">
                  <h4 className="info-title">
                    <FontAwesomeIcon icon={faLocationDot} /> Yhteystiedot
                  </h4>
                  <ul className="contact-list">
                    {active.address ? (
                      <li className="contact-muted">{active.address}</li>
                    ) : null}

                    {active.phone ? (
                      <li>
                        <a
                          className="contact-link"
                          href={`tel:${active.phone.replace(/\s/g, "")}`}
                        >
                          <FontAwesomeIcon icon={faPhone} />
                          <span>{active.phone}</span>
                        </a>
                      </li>
                    ) : null}

                    {active.email ? (
                      <li>
                        <a className="contact-link" href={`mailto:${active.email}`}>
                          <FontAwesomeIcon icon={faEnvelope} />
                          <span>{active.email}</span>
                        </a>
                      </li>
                    ) : null}
                  </ul>

                  {active.mapUrl ? (
                    <a
                      className="map-button"
                      href={active.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Avaa kartta <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  ) : null}
                </div>
              </div>

              {active.highlights?.length ? (
                <div className="info-block info-block-full">
                  <h4 className="info-title">Tärkeimmät erot</h4>
                  <ul className="highlights">
                    {active.highlights.map((item) => (
                      <li key={item} className="highlight">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default LocationsSection;