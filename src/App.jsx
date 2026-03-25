import HeaderNav from "./components/HeaderNav";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import AboutUsSection from "./components/AboutUs";
import QuoteSection from "./components/QuoteSection";
import LocationsSection from "./components/LocationsSection";
import PricingSection from "./components/PricingSection";
import ProcessSection from "./components/ProcessSection";
import MonthlyPlansSection from "./components/MonthlyPlans";
import GallerySection from "./components/GallerySection";
import "./App.css";

function App() {
  return (
    <>
      <HeaderNav />
      <HeroSection />
      <StatsSection />
      <AboutUsSection />
      <QuoteSection />
      <LocationsSection />
      <PricingSection />
      <MonthlyPlansSection />
      <ProcessSection />
      <GallerySection />
    </>
  );
}

export default App;
