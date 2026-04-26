import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterFormPage from "./pages/RegisterFormPage";
import LegalPage from "./pages/LegalPage";
import ScrollToTop from "./components/ScrollToTop";
import CardFormPage from "./pages/CardFormPage";
import BookingFormPage from "./pages/BookingFormPage";
import "./App.css";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/locations" element={<HomePage />} />
        <Route path="/pricing" element={<HomePage />} />
        <Route path="/monthly-plans" element={<HomePage />} />
        <Route path="/gallery" element={<HomePage />} />
        <Route path="/faq" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />

        <Route path="/hoitosopimus" element={<RegisterFormPage />} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/kortti" element={<CardFormPage />} />
        <Route path="/varaus" element={<BookingFormPage />} />
      </Routes>
    </>
  );
}

export default App;
