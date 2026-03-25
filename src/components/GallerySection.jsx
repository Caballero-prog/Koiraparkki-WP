import "../styles/GallerySection.css";
import { useMemo, useState } from "react";
import { galleryData } from "../data/galleryData";

const getTileType = (width, height) => {
  if (!width || !height) return "square";

  const ratio = width / height;

  if (ratio >= 1.25) return "wide";
  if (ratio <= 0.8) return "tall";
  return "square";
};

const GallerySection = () => {
  const [activeId, setActiveId] = useState(galleryData[0]?.id);
  const [imageMeta, setImageMeta] = useState({});

  const activeGallery = useMemo(() => {
    return galleryData.find((location) => location.id === activeId) || galleryData[0];
  }, [activeId]);

  const handleImageLoad = (imageId, event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    setImageMeta((prev) => ({
      ...prev,
      [imageId]: {
        width: naturalWidth,
        height: naturalHeight,
      },
    }));
  };

  return (
    <section className="gallery" id="gallery" aria-label="Galleria">
      <div className="gallery-inner">
        <header className="gallery-header">
          <h2 className="gallery-title">Galleria</h2>
          <p className="gallery-lead">
            Valitse toimipiste ja selaa kuvia tiloista sekä tunnelmasta.
          </p>
        </header>

        <div className="gallery-tabs" role="tablist" aria-label="Valitse toimipiste">
          {galleryData.map((location) => {
            const isActive = location.id === activeId;

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
                <p className="gallery-location-text">{activeGallery.description}</p>
              ) : null}
            </div>

            <div className="gallery-grid">
              {activeGallery.images.map((image) => {
                const meta = imageMeta[image.id];
                const tileType = getTileType(meta?.width, meta?.height);

                return (
                  <figure
                    key={image.id}
                    className={`gallery-tile gallery-tile--${tileType}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || ""}
                      loading="lazy"
                      className="gallery-image"
                      onLoad={(event) => handleImageLoad(image.id, event)}
                    />
                  </figure>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default GallerySection;