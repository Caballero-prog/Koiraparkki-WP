import "../styles/CardFormSection.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const CardFormSection = () => {
  const [status, setStatus] = useState("idle");
  const [searchParams] = useSearchParams();
  const selectedCard = searchParams.get("card");

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "#/";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/wp-json/custom/v1/card-order", {
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

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="card-order card-order--success">
        <div className="card-order-inner">
          <button type="button" className="card-order-back" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Takaisin</span>
          </button>

          <div className="card-order-success-card">
            <div className="card-order-success-icon" aria-hidden="true">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>

            <h1 className="card-order-success-title">
              Tilaus lähetetty onnistuneesti
            </h1>

            <p className="card-order-success-text">
              Kiitos tilauksestasi. Lähetämme antamaasi sähköpostiin
              tarkennukset tai laskutustiedot.
            </p>

            <p className="card-order-success-note">
              Lisätietoja: 0456 133 212 tai laskutus@koiraparkki.com
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="card-order" aria-labelledby="card-order-title">
      <div className="card-order-inner">
        <button type="button" className="card-order-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Takaisin</span>
        </button>

        <header className="card-order-header">
          <h1 id="card-order-title" className="card-order-title">
            Tilaa sarja- tai kuukausikortti
          </h1>

          <p className="card-order-lead">
            Valitse haluamasi sarja- tai kuukausikortti sekä maksutapa. Kortti
            on elektroninen, ja saat sähköpostitse tietoa käytetyistä ja jäljellä
            olevista päivistä.
          </p>
        </header>

        <form className="card-order-form" onSubmit={handleSubmit}>
          <section className="card-order-card" aria-labelledby="customer-title">
            <h2 id="customer-title" className="card-order-card-title">
              Asiakkaan tiedot
            </h2>

            <div className="card-order-fields">
              <div className="card-field card-field--half">
                <label htmlFor="firstName">Etunimi *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Etunimi"
                  required
                />
              </div>

              <div className="card-field card-field--half">
                <label htmlFor="lastName">Sukunimi *</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Sukunimi"
                  required
                />
              </div>

              <div className="card-field card-field--full">
                <label htmlFor="dogName">Koiran nimi</label>
                <input
                  id="dogName"
                  name="dogName"
                  type="text"
                  placeholder="Koiran nimi"
                />
              </div>

              <div className="card-field card-field--full">
                <label htmlFor="streetAddress">Katuosoite</label>
                <input
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  placeholder="Katuosoite"
                />
              </div>

              <div className="card-field card-field--half">
                <label htmlFor="zipCode">Postinumero</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="00100"
                />
              </div>

              <div className="card-field card-field--half">
                <label htmlFor="city">Kaupunki</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Helsinki"
                />
              </div>

              <div className="card-field card-field--half">
                <label htmlFor="email">Sähköposti *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nimi@email.com"
                  required
                />
              </div>

              <div className="card-field card-field--half">
                <label htmlFor="phone">Puhelinnumero *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+358 40 123 4567"
                  required
                />
              </div>
            </div>
          </section>

          <section className="card-order-card" aria-labelledby="plan-title">
            <h2 id="plan-title" className="card-order-card-title">
              Sarja- tai kuukausikortti
            </h2>

            <div className="card-choice-group">
              <label className="card-choice-row">
                <input
                  type="radio"
                  name="selectedCard"
                  value="10 käyntiä sarjakortti — 360 €"
                  defaultChecked={selectedCard === "sarjakortti-10"}
                  required
                />
                <span>10 käyntiä sarjakortti — 360 €</span>
              </label>

              <label className="card-choice-row">
                <input
                  type="radio"
                  name="selectedCard"
                  value="20 käyntiä sarjakortti — 610 €"
                  defaultChecked={selectedCard === "sarjakortti-20"}
                />
                <span>20 käyntiä sarjakortti — 610 €</span>
              </label>

              <label className="card-choice-row">
                <input
                  type="radio"
                  name="selectedCard"
                  value="Kuukausikortti Ma–Pe — 550 €"
                  defaultChecked={selectedCard === "kuukausikortti"}
                />
                <span>Kuukausikortti Ma–Pe — 550 €</span>
              </label>
            </div>
          </section>

          <section className="card-order-card" aria-labelledby="payment-title">
            <h2 id="payment-title" className="card-order-card-title">
              Maksutapa
            </h2>

            <div className="card-choice-group">
              <label className="card-choice-row">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Pankkisiirto"
                  required
                />
                <span>Pankkisiirto</span>
              </label>

              <label className="card-choice-row">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Pankki- tai luottokortti toimipisteessä"
                />
                <span>Pankki- tai luottokortti toimipisteessä</span>
              </label>

              <label className="card-choice-row">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Käteinen toimipisteessä"
                />
                <span>Käteinen toimipisteessä</span>
              </label>
            </div>
          </section>

          <section className="card-order-card" aria-labelledby="notes-title">
            <h2 id="notes-title" className="card-order-card-title">
              Lisätiedot
            </h2>

            <div className="card-order-fields">
              <div className="card-field card-field--full">
                <label htmlFor="message">Viesti</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Voit kirjoittaa tähän mahdolliset lisätiedot"
                />
              </div>
            </div>
          </section>

          {status === "error" && (
            <p className="card-order-message card-order-message--error">
              Tilauksen lähetys epäonnistui. Yritä uudelleen.
            </p>
          )}

          <div className="card-order-actions">
            <button
              type="submit"
              className="card-order-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Lähetetään..." : "Lähetä tilaus"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CardFormSection;