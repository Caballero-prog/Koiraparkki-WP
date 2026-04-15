import "../styles/FAQSection.css";
import { useEffect, useRef, useState } from "react";
import { faqData } from "../data/faqData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const DESKTOP_BREAKPOINT = 768;

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= DESKTOP_BREAKPOINT
      : false
  );

  const gridRef = useRef(null);

  // Handle resize (mobile vs desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Equal height cards (desktop only)
  useEffect(() => {
    const setEqualHeights = () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".faq-card");

      // reset first
      cards.forEach((card) => {
        card.style.minHeight = "auto";
      });

      if (!isDesktop) return;

      let tallest = 0;

      cards.forEach((card) => {
        const height = card.offsetHeight;
        if (height > tallest) tallest = height;
      });

      cards.forEach((card) => {
        card.style.minHeight = `${tallest}px`;
      });
    };

    // run after layout
    const timeout = setTimeout(setEqualHeights, 50);

    window.addEventListener("resize", setEqualHeights);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", setEqualHeights);
    };
  }, [isDesktop]);

  const handleToggle = (index) => {
    if (isDesktop) return;

    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="faq-inner">
        <header className="faq-header">
          <h2 id="faq-title" className="faq-title">
            UKK
          </h2>
          <p className="faq-lead">
            Löydät alta vastauksia yleisimpiin kysymyksiin päivähoidosta,
            käytännöistä ja hoitoon tulosta.
          </p>
        </header>

        <div className="faq-grid" ref={gridRef}>
          {faqData.map((item, index) => {
            const isOpen = isDesktop || openIndex === index;

            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <article
                key={item.question}
                className={`faq-card ${isOpen ? "is-open" : ""}`}
              >
                <button
                  id={buttonId}
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(index)}
                >
                  <span>{item.question}</span>

                  {!isDesktop && (
                    <span className="faq-icon" aria-hidden="true">
                      <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
                    </span>
                  )}
                </button>

                <div
                  id={panelId}
                  className={`faq-answer-wrap ${isOpen ? "is-open" : ""}`}
                  role="region"
                  aria-labelledby={buttonId}
                >
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;