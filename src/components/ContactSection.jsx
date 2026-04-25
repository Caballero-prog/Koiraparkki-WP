import "../styles/ContactSection.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const ContactSection = () => {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status !== "success") return;

    const timer = window.setTimeout(() => {
      setStatus("idle");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/wp-json/custom/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Request failed");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <header className="contact-header">
          <h2 id="contact-title" className="contact-title">
            Ota yhteyttä
          </h2>
          <p className="contact-lead">
            Voit lähettää meille viestin alla olevalla lomakkeella, niin
            palaamme asiaan mahdollisimman pian.
          </p>
        </header>

        <div className="contact-details">
          <a href="tel:+358456133212" className="contact-detail">
            <FontAwesomeIcon icon={faPhone} />
            <span>+358 456 133 212</span>
          </a>

          <a href="mailto:info@koiraparkki.fi" className="contact-detail">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>info@koiraparkki.fi</span>
          </a>
        </div>

        <div className="contact-form-wrap">
          {status === "success" && (
            <div
              className="contact-success-overlay"
              aria-live="polite"
              aria-label="Viesti lähetetty onnistuneesti"
            >
              <div className="contact-success-card">
                <div className="contact-success-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>

                <div className="contact-success-content">
                  <h3 className="contact-success-title">
                    Viesti lähetetty onnistuneesti
                  </h3>
                  <p className="contact-success-text">
                    Kiitos viestistäsi. Palaamme asiaan mahdollisimman pian.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-fields">
              <div className="contact-field contact-field--half">
                <label htmlFor="contactFirstName">Etunimi *</label>
                <input
                  id="contactFirstName"
                  name="firstName"
                  type="text"
                  placeholder="Etunimi"
                  required
                />
              </div>

              <div className="contact-field contact-field--half">
                <label htmlFor="contactLastName">Sukunimi *</label>
                <input
                  id="contactLastName"
                  name="lastName"
                  type="text"
                  placeholder="Sukunimi"
                  required
                />
              </div>

              <div className="contact-field contact-field--full">
                <label htmlFor="contactEmail">Sähköposti *</label>
                <input
                  id="contactEmail"
                  name="email"
                  type="email"
                  placeholder="nimi@email.com"
                  required
                />
              </div>

              <div className="contact-field contact-field--full">
                <label htmlFor="contactSubject">Aihe *</label>
                <input
                  id="contactSubject"
                  name="subject"
                  type="text"
                  placeholder="Viestin aihe"
                  required
                />
              </div>

              <div className="contact-field contact-field--full">
                <label htmlFor="contactMessage">Viesti *</label>
                <textarea
                  id="contactMessage"
                  name="message"
                  rows="6"
                  placeholder="Kirjoita viestisi tähän"
                  required
                />
              </div>
            </div>

            {status === "error" && (
              <p className="contact-message contact-message--error">
                Viestin lähetys epäonnistui. Yritä uudelleen.
              </p>
            )}

            <div className="contact-actions">
              <button
                type="submit"
                className="contact-submit"
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading" ? "Lähetetään..." : "Lähetä viesti"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;