import "../styles/GallerySection.css";
import { useEffect, useMemo, useState } from "react";
import { galleryData, gallerySectionData } from "../data/galleryData";

const GALLERY_IMAGES_API_URL = "/wp-json/custom/v1/gallery-images";
const GALLERY_LOCATIONS_API_URL = "/wp-json/custom/v1/gallery-locations";

const skeletonTiles = [
  { id: "s1", className: "gallery-slot gallery-slot-1 gallery-tile--skeleton" },
  { id: "s2", className: "gallery-slot gallery-slot-2 gallery-tile--skeleton" },
  { id: "s3", className: "gallery-slot gallery-slot-3 gallery-tile--skeleton" },
  { id: "s4", className: "gallery-slot gallery-slot-4 gallery-tile--skeleton" },
  { id: "s5", className: "gallery-slot gallery-slot-5 gallery-tile--skeleton" },
  { id: "s6", className: "gallery-slot gallery-slot-6 gallery-tile--skeleton" },
  { id: "s7", className: "gallery-slot gallery-slot-7 gallery-tile--skeleton" },
];

const GallerySection = () => {
  const [activeId, setActiveId] = useState(null);
  const [wpGalleryData, setWpGalleryData] = useState([]);
  const [galleryImages, setGalleryImages] = useState({});
  const [locationsLoaded, setLocationsLoaded] = useState(false);

  const currentGalleryData = useMemo(() => {
    return wpGalleryData.length ? wpGalleryData : galleryData;
  }, [wpGalleryData]);

  const currentActiveId = activeId || currentGalleryData[0]?.id;

  useEffect(() => {
    const fetchGalleryLocations = async () => {
      try {
        const cached = sessionStorage.getItem("gallery-locations");

        if (cached) {
          setWpGalleryData(JSON.parse(cached));
          setLocationsLoaded(true);
          return;
        }

        const response = await fetch(GALLERY_LOCATIONS_API_URL);
        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data)) {
          setWpGalleryData(data);
          sessionStorage.setItem("gallery-locations", JSON.stringify(data));
        }
      } catch {
        return;
      } finally {
        setLocationsLoaded(true);
      }
    };

    fetchGalleryLocations();
  }, []);

  useEffect(() => {
    if (!locationsLoaded) return;
    if (!currentActiveId) return;

    if (currentActiveId in galleryImages) return;

    const fetchGalleryImages = async () => {
      try {
        const cacheKey = `gallery-images-${currentActiveId}`;
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
          setGalleryImages((prev) => ({
            ...prev,
            [currentActiveId]: JSON.parse(cached),
          }));
          return;
        }

        const response = await fetch(
          `${GALLERY_IMAGES_API_URL}?location=${encodeURIComponent(currentActiveId)}`,
        );

        if (!response.ok) return;

        const data = await response.json();

        if (!Array.isArray(data)) return;

        setGalleryImages((prev) => ({
          ...prev,
          [currentActiveId]: data,
        }));

        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      } catch {
        return;
      }
    };

    fetchGalleryImages();
  }, [locationsLoaded, currentActiveId, galleryImages]);

  useEffect(() => {
    if (!locationsLoaded) return;
    if (!currentActiveId) return;
    if (!currentGalleryData.length) return;
    if (!(currentActiveId in galleryImages)) return;

    const timer = window.setTimeout(() => {
      currentGalleryData.forEach((location) => {
        if (!location.id) return;
        if (location.id === currentActiveId) return;
        if (location.id in galleryImages) return;

        const cacheKey = `gallery-images-${location.id}`;
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
          setGalleryImages((prev) => ({
            ...prev,
            [location.id]: JSON.parse(cached),
          }));

          return;
        }

        fetch(
          `${GALLERY_IMAGES_API_URL}?location=${encodeURIComponent(location.id)}`,
        )
          .then((response) => {
            if (!response.ok) return null;
            return response.json();
          })
          .then((data) => {
            if (!Array.isArray(data)) return;

            setGalleryImages((prev) => {
              if (location.id in prev) return prev;

              sessionStorage.setItem(cacheKey, JSON.stringify(data));

              return {
                ...prev,
                [location.id]: data,
              };
            });
          })
          .catch(() => {});
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [locationsLoaded, currentActiveId, currentGalleryData, galleryImages]);

  const activeGallery = useMemo(() => {
    const baseGallery =
      currentGalleryData.find((location) => location.id === currentActiveId) ||
      currentGalleryData[0];

    if (!baseGallery) return null;

    return {
      ...baseGallery,
      images: galleryImages[baseGallery.id] || [],
    };
  }, [currentActiveId, currentGalleryData, galleryImages]);

  const featuredImages = activeGallery?.images?.slice(0, 7) || [];
  const restImages = activeGallery?.images?.slice(7) || [];

  return (
    <section
      className="gallery"
      id="gallery"
      aria-label={gallerySectionData.sectionAriaLabel}
    >
      <div className="gallery-inner">
        <header className="gallery-header">
          <h2 className="gallery-title">{gallerySectionData.title}</h2>
          <p className="gallery-lead">{gallerySectionData.lead}</p>
        </header>

        <div
          className="gallery-tabs"
          role="tablist"
          aria-label={gallerySectionData.tabsAriaLabel}
        >
          {currentGalleryData.map((location) => {
            const isActive = location.id === currentActiveId;

            return (
              <button
                key={location.id}
                type="button"
                className={`gallery-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveId(location.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`gallery-panel-${location.id}`}
                id={`gallery-tab-${location.id}`}
              >
                {location.name}
              </button>
            );
          })}
        </div>

        {activeGallery ? (
          <div
            id={`gallery-panel-${activeGallery.id}`}
            className="gallery-panel"
            role="tabpanel"
            aria-labelledby={`gallery-tab-${activeGallery.id}`}
          >
            <div className="gallery-panel-head">
              <h3 className="gallery-location-name">{activeGallery.name}</h3>

              {activeGallery.description ? (
                <p className="gallery-location-text">
                  {activeGallery.description}
                </p>
              ) : null}
            </div>

            <div className="gallery-bento">
              {skeletonTiles.map((tile, index) => {
                const image = featuredImages[index];

                if (!image) {
                  return (
                    <figure
                      key={tile.id}
                      className={tile.className}
                      aria-hidden="true"
                    >
                      <div className="gallery-skeleton-shimmer" />
                    </figure>
                  );
                }

                return (
                  <figure
                    key={image.id}
                    className={`gallery-slot gallery-slot-${index + 1}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || ""}
                      loading="lazy"
                      decoding="async"
                      className="gallery-image"
                    />
                  </figure>
                );
              })}
            </div>

            {restImages.length > 0 ? (
              <div className="gallery-rest-grid">
                {restImages.map((image) => (
                  <figure key={image.id} className="gallery-rest-tile">
                    <img
                      src={image.src}
                      alt={image.alt || ""}
                      loading="lazy"
                      decoding="async"
                      className="gallery-image"
                    />
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default GallerySection;