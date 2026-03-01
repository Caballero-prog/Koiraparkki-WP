import HeaderNav from "./components/HeaderNav";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import AboutUsSection from "./components/AboutUs";
import QuoteSection from "./components/QuoteSection";
import './App.css';

function App() {
  return (
    <>
      <HeaderNav/>
      <HeroSection />
      <StatsSection />
      <AboutUsSection/>
      <QuoteSection/>
    </>
  );
}

export default App;