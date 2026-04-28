import "../styles/GallerySection.css";
import { useEffect, useMemo, useState } from "react";
import { galleryData, gallerySectionData } from "../data/galleryData";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";
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

const getImageNumberFromSlug = (slug) => {
  const match = slug.match(/-(\d+)$/);
  return match ? Number(match[1]) : 999;
};

const GallerySection = () => {
  const [activeId, setActiveId] = useState(null);
  const [wpGalleryData, setWpGalleryData] = useState([]);
  const [galleryImages, setGalleryImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const currentGalleryData = useMemo(() => {
    return wpGalleryData.length ? wpGalleryData : galleryData;
  }, [wpGalleryData]);

  const currentActiveId = activeId || currentGalleryData[0]?.id;

  useEffect(() => {
    const fetchGalleryLocations = async () => {
      try {
        const response = await fetch(GALLERY_LOCATIONS_API_URL);
        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data)) {
          setWpGalleryData(data);
        }
      } catch {
        return;
      }
    };

    fetchGalleryLocations();
  }, []);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(MEDIA_API_URL);
        if (!response.ok) return;

        const mediaItems = await response.json();
        const groupedImages = {};

        currentGalleryData.forEach((location) => {
          const prefix = `gallery-${location.id}-`;

          groupedImages[location.id] = mediaItems
            .filter((item) => item.media_type === "image")
            .filter((item) => item.slug?.startsWith(prefix))
            .sort(
              (a, b) =>
                getImageNumberFromSlug(a.slug) -
                getImageNumberFromSlug(b.slug)
            )
            .map((item) => ({
              id: item.id,
              src:
                item.media_details?.sizes?.large?.source_url ||
                item.media_details?.sizes?.medium_large?.source_url ||
                item.source_url,
              alt: item.alt_text || item.slug || "",
            }));
        });

        setGalleryImages(groupedImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, [currentGalleryData]);

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
  const shouldShowSkeletons = isLoading || featuredImages.length === 0;

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
              {shouldShowSkeletons
                ? skeletonTiles.map((tile) => (
                    <figure
                      key={tile.id}
                      className={tile.className}
                      aria-hidden="true"
                    >
                      <div className="gallery-skeleton-shimmer" />
                    </figure>
                  ))
                : featuredImages.map((image, index) => (
                    <figure
                      key={image.id}
                      className={`gallery-slot gallery-slot-${index + 1}`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt || ""}
                        loading="lazy"
                        className="gallery-image"
                      />
                    </figure>
                  ))}
            </div>

            {restImages.length > 0 ? (
              <div className="gallery-rest-grid">
                {restImages.map((image) => (
                  <figure key={image.id} className="gallery-rest-tile">
                    <img
                      src={image.src}
                      alt={image.alt || ""}
                      loading="lazy"
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