import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import QuoteSection from "../components/QuoteSection";
import LocationsSection from "../components/LocationsSection";
import PricingSection from "../components/PricingSection";
import ProcessSection from "../components/ProcessSection";
import MonthlyPlansSection from "../components/MonthlyPlans";
import GallerySection from "../components/GallerySection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTop) {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
      return;
    }

    if (!location.hash) return;

    window.setTimeout(() => {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }, 50);
  }, [location.hash, location.state]);

  return (
    <>
      <HeaderNav />
      <HeroSection />
      <StatsSection />
      <QuoteSection />
      <LocationsSection />
      <PricingSection />
      <MonthlyPlansSection />
      <ProcessSection />
      <GallerySection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </>
  );
};

export default HomePage;