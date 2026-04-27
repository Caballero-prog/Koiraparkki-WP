import { useEffect, useState } from "react";
import { quoteData } from "../data/quoteData"; // fallback
import "../styles/QuoteSection.css";

const QuoteSection = () => {
  const [quote, setQuote] = useState(quoteData.quote);

  useEffect(() => {
    fetch("/wp-json/custom/v1/quote-section")
      .then((res) => res.json())
      .then((data) => {
        if (data?.quote) {
          setQuote(data.quote);
        }
      })
      .catch((err) => {
        console.error("Quote fetch failed:", err);
      });
  }, []);

  return (
    <section className="intro-quote">
      <div className="intro-quote-inner">
        <blockquote className="intro-quote-text">
          {quote}
        </blockquote>
      </div>
    </section>
  );
};

export default QuoteSection;