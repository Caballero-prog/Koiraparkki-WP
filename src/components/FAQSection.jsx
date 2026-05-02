import "../styles/FAQSection.css";
import { useEffect, useRef, useState } from "react";
import { faqData } from "../data/faqData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const DESKTOP_BREAKPOINT = 768;
const FAQ_API_URL = "/wp-json/custom/v1/faq";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [wpFaqData, setWpFaqData] = useState([]);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= DESKTOP_BREAKPOINT
      : false,
  );

  const gridRef = useRef(null);

  const currentFaqData = wpFaqData.length ? wpFaqData : faqData;

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const cached = sessionStorage.getItem("faq");

        if (cached) {
          setWpFaqData(JSON.parse(cached));
          return;
        }

        const response = await fetch(FAQ_API_URL);
        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data) && data.length) {
          setWpFaqData(data);
          sessionStorage.setItem("faq", JSON.stringify(data));
        }
      } catch {
        return;
      }
    };

    fetchFaqData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const setEqualHeights = () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".faq-card");

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

    const timeout = setTimeout(setEqualHeights, 50);

    window.addEventListener("resize", setEqualHeights);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", setEqualHeights);
    };
  }, [isDesktop, currentFaqData]);

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
          {currentFaqData.map((item, index) => {
            const isOpen = isDesktop || openIndex === index;

            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <article
                key={`${item.question}-${index}`}
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
