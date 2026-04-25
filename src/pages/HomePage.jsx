import { useEffect } from "react";
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
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (!target) return;

    sessionStorage.removeItem("scrollTarget");

    window.setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }, 0);
  }, []);

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