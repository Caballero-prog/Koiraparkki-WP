import "../styles/LocationsSection.css";
import { useEffect, useMemo, useState } from "react";
import { locations, locationsSectionData } from "../data/locations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faPhone,
  faEnvelope,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const LOCATION_IMAGES_API_URL = "/wp-json/custom/v1/location-images";
const LOCATIONS_API_URL = "/wp-json/custom/v1/locations";

const getMapUrl = (location) => {
  if (location.mapUrl) return location.mapUrl;

  if (location.coords?.lat && location.coords?.lng) {
    return `https://maps.google.com/?q=${location.coords.lat},${location.coords.lng}`;
  }

  return "";
};

const LocationsSection = () => {
  const [activeId, setActiveId] = useState(null);
  const [wpLocations, setWpLocations] = useState([]);
  const [locationImages, setLocationImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [locationsLoaded, setLocationsLoaded] = useState(false);

  const mergedLocations = useMemo(() => {
    return wpLocations.length ? wpLocations : locations;
  }, [wpLocations]);

  const currentActiveId = activeId || mergedLocations[0]?.id;

  useEffect(() => {
    const fetchLocationsContent = async () => {
      try {
        const response = await fetch(LOCATIONS_API_URL);
        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data)) {
          setWpLocations(data);
        }
      } catch {
        return;
      } finally {
        setLocationsLoaded(true);
      }
    };

    fetchLocationsContent();
  }, []);

  useEffect(() => {
    if (!locationsLoaded) return;
    if (!currentActiveId) return;
    if (currentActiveId in locationImages) {
      setIsLoading(false);
      return;
    }

    const fetchLocationImages = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${LOCATION_IMAGES_API_URL}?location=${encodeURIComponent(currentActiveId)}`,
        );

        if (!response.ok) return;

        const data = await response.json();

        if (!Array.isArray(data)) return;

        setLocationImages((prev) => ({
          ...prev,
          [currentActiveId]: data.map((image) => image.src),
        }));
      } catch {
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationImages();
  }, [locationsLoaded, currentActiveId, locationImages]);

  useEffect(() => {
    if (!locationsLoaded) return;
    if (!currentActiveId) return;
    if (!mergedLocations.length) return;
    if (!(currentActiveId in locationImages)) return;

    const timer = window.setTimeout(() => {
      mergedLocations.forEach((location) => {
        if (!location.id) return;
        if (location.id === currentActiveId) return;
        if (location.id in locationImages) return;

        fetch(
          `${LOCATION_IMAGES_API_URL}?location=${encodeURIComponent(location.id)}`,
        )
          .then((response) => {
            if (!response.ok) return null;
            return response.json();
          })
          .then((data) => {
            if (!Array.isArray(data)) return;

            setLocationImages((prev) => {
              if (location.id in prev) return prev;

              return {
                ...prev,
                [location.id]: data.map((image) => image.src),
              };
            });
          })
          .catch(() => {});
      });
    }, 800);

    return () => window.clearTimeout(timer);
  }, [locationsLoaded, currentActiveId, mergedLocations, locationImages]);

  const active = useMemo(() => {
    const baseLocation =
      mergedLocations.find((location) => location.id === currentActiveId) ||
      mergedLocations[0];

    if (!baseLocation) return null;

    return {
      ...baseLocation,
      images: locationImages[baseLocation.id] || [],
    };
  }, [currentActiveId, mergedLocations, locationImages]);

  const hasImages = active?.images?.length > 0;
  const showSkeleton = isLoading || !hasImages;
  const activeMapUrl = active ? getMapUrl(active) : "";

  return (
    <section
      className="locations"
      id="locations"
      aria-label={locationsSectionData.title}
    >
      <div className="locations-inner">
        <header className="locations-header">
          <h2 className="locations-title">{locationsSectionData.title}</h2>
          <p className="locations-lead">{locationsSectionData.lead}</p>
        </header>

        <div
          className="locations-tabs"
          role="tablist"
          aria-label="Valitse toimipiste"
        >
          {mergedLocations.map((location) => {
            const isActive = location.id === currentActiveId;

            return (
              <button
                key={location.id}
                type="button"
                className={`locations-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveId(location.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${location.id}`}
              >
                {location.name}
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
              {showSkeleton ? (
                <>
                  <div
                    className="bento-tile bento-big bento-skeleton"
                    aria-hidden="true"
                  >
                    <div className="bento-skeleton-shimmer" />
                  </div>

                  <div
                    className="bento-tile bento-small bento-skeleton"
                    aria-hidden="true"
                  >
                    <div className="bento-skeleton-shimmer" />
                  </div>

                  <div
                    className="bento-tile bento-small bento-skeleton"
                    aria-hidden="true"
                  >
                    <div className="bento-skeleton-shimmer" />
                  </div>
                </>
              ) : (
                <>
                  <div className="bento-tile bento-big">
                    <img
                      src={active.images[0]}
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                    />
                  </div>

                  <div className="bento-tile bento-small">
                    <img
                      src={active.images[1] || active.images[0]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </div>

                  <div className="bento-tile bento-small">
                    <img
                      src={active.images[2] || active.images[0]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </div>
                </>
              )}
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
                    {active.services.map((service) => (
                      <span key={service} className="locations-badge">
                        {service}
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
                    {(active.hours || []).map((hour) => (
                      <li
                        key={`${hour.label}-${hour.value}`}
                        className="hours-row"
                      >
                        <span className="hours-label">{hour.label}</span>
                        <span className="hours-value">{hour.value}</span>
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
                        <a
                          className="contact-link"
                          href={`mailto:${active.email}`}
                        >
                          <FontAwesomeIcon icon={faEnvelope} />
                          <span>{active.email}</span>
                        </a>
                      </li>
                    ) : null}
                  </ul>

                  {activeMapUrl ? (
                    <a
                      className="map-button"
                      href={activeMapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Avaa kartta{" "}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
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
