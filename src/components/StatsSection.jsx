import { useEffect, useState } from "react";
import "../styles/StatsSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faDog,
} from "@fortawesome/free-solid-svg-icons";
import { statsData } from "../data/statsData";

const iconMap = {
  clock: faClock,
  location: faLocationDot,
  dog: faDog,
};

const StatsSection = () => {
  const [content, setContent] = useState(statsData);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const cached = sessionStorage.getItem("stats-content");

        if (cached) {
          setContent(JSON.parse(cached));
          return;
        }

        const res = await fetch("/wp-json/custom/v1/stats-section");
        if (!res.ok) return;

        const data = await res.json();

        if (data?.heading && data?.items?.length) {
          const formatted = {
            heading: data.heading,
            items: statsData.items.map((fallbackItem, index) => ({
              ...fallbackItem,
              number: data.items[index]?.number || fallbackItem.number,
              label: data.items[index]?.label || fallbackItem.label,
            })),
          };

          setContent(formatted);
          sessionStorage.setItem("stats-content", JSON.stringify(formatted));
        }
      } catch (err) {
        console.error("Stats fetch failed:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="stats" aria-label="Koiraparkin tilastot">
      <div className="stats-inner">
        <h2 id="stats-heading" className="stats-heading">
          {content.heading}
        </h2>

        <ul className="stats-grid">
          {content.items.map((item) => (
            <li className="stat-card" key={item.label}>
              <FontAwesomeIcon
                icon={iconMap[item.icon]}
                className="stat-icon"
              />
              <span className="stat-number">{item.number}</span>
              <span className="stat-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
