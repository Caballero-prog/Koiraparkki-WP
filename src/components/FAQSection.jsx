import "../styles/FAQSection.css";
import { useEffect, useState } from "react";
import { faqData } from "../data/faqData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const DESKTOP_BREAKPOINT = 768;

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isDesktopLayout, setIsDesktopLayout] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= DESKTOP_BREAKPOINT
      : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopLayout(window.innerWidth >= DESKTOP_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = (index) => {
    if (isDesktopLayout) return;

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

        <div className="faq-grid">
          {faqData.map((item, index) => {
            const isOpen = isDesktopLayout || openIndex === index;
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

                  {!isDesktopLayout ? (
                    <span className="faq-icon" aria-hidden="true">
                      <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
                    </span>
                  ) : null}
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
