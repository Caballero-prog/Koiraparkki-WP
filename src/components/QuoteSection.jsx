import { useEffect, useState } from "react";
import { quoteData } from "../data/quoteData"; // fallback
import "../styles/QuoteSection.css";

const QuoteSection = () => {
  const [quote, setQuote] = useState(quoteData.quote);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const cached = sessionStorage.getItem("quote");

        if (cached) {
          setQuote(cached);
          return;
        }

        const res = await fetch("/wp-json/custom/v1/quote-section");
        if (!res.ok) return;

        const data = await res.json();

        if (data?.quote) {
          setQuote(data.quote);
          sessionStorage.setItem("quote", data.quote);
        }
      } catch (err) {
        console.error("Quote fetch failed:", err);
      }
    };

    fetchQuote();
  }, []);

  return (
    <section className="intro-quote">
      <div className="intro-quote-inner">
        <blockquote className="intro-quote-text">{quote}</blockquote>
      </div>
    </section>
  );
};

export default QuoteSection;
