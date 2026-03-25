import "../styles/GallerySection.css";
import { useMemo, useState } from "react";
import { galleryData } from "../data/galleryData";

const GallerySection = () => {
  const [activeId, setActiveId] = useState(galleryData[0]?.id);

  const active = useMemo(() => {
    return galleryData.find((item) => item.id === activeId) || galleryData[0];
  }, [activeId]);

  return (
    <section className="gallery" id="gallery" aria-label="Galleria">
      <div className="gallery-inner">
        <header className="gallery-header">
          <h2 className="gallery-title">Galleria</h2>
          <p className="gallery-lead">
            Valitse toimipiste ja selaa kuvia tiloista sekä tunnelmasta.
          </p>
        </header>

        {/* Selector tabs */}
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
              >
                {location.name}
              </button>
            );
          })}
        </div>

        {/* Gallery panel */}
        {active ? (
          <div
            id={`gallery-panel-${active.id}`}
            className="gallery-panel"
            role="tabpanel"
            aria-label={`${active.name} kuvat`}
          >
            <div className="gallery-bento">
              <div className="gallery-tile gallery-big">
                <img
                  src={active.images?.[0]}
                  alt={`${active.name} kuva 1`}
                  loading="lazy"
                />
              </div>

              <div className="gallery-tile gallery-small">
                <img
                  src={active.images?.[1] || active.images?.[0]}
                  alt={`${active.name} kuva 2`}
                  loading="lazy"
                />
              </div>

              <div className="gallery-tile gallery-small">
                <img
                  src={active.images?.[2] || active.images?.[0]}
                  alt={`${active.name} kuva 3`}
                  loading="lazy"
                />
              </div>

              {active.images?.[3] ? (
                <div className="gallery-tile gallery-wide">
                  <img
                    src={active.images[3]}
                    alt={`${active.name} kuva 4`}
                    loading="lazy"
                  />
                </div>
              ) : null}

              {active.images?.[4] ? (
                <div className="gallery-tile gallery-small">
                  <img
                    src={active.images[4]}
                    alt={`${active.name} kuva 5`}
                    loading="lazy"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default GallerySection;