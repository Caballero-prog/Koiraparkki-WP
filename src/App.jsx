import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterFormPage from "./pages/RegisterFormPage";
import LegalPage from "./pages/LegalPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hoitosopimus" element={<RegisterFormPage />} />
      <Route path="/privacy" element={<LegalPage />} />
    </Routes>
  );
}

export default App;