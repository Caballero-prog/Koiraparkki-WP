import "../styles/BookingFormSection.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const BookingFormSection = () => {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status !== "success") return;

    const timer = setTimeout(() => {
      setStatus("idle");
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

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
      const response = await fetch("/wp-json/custom/v1/booking", {
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

  if (status === "success") {
    return (
      <section className="booking booking--success">
        <div className="booking-inner">
          <button type="button" className="booking-back" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Takaisin</span>
          </button>

          <div className="booking-success-card">
            <div className="booking-success-icon">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>

            <h1 className="booking-success-title">
              Varaus lähetetty onnistuneesti
            </h1>

            <p className="booking-success-text">
              Kiitos varauksestasi. Olemme sinuun yhteydessä mahdollisimman
              pian.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="booking" aria-labelledby="booking-title">
      <div className="booking-inner">
        <button type="button" className="booking-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Takaisin</span>
        </button>

        <header className="booking-header">
          <h1 id="booking-title" className="booking-title">
            Tee varaus
          </h1>
          <p className="booking-lead">
            Täytä alla oleva lomake ja otamme sinuun yhteyttä mahdollisimman
            nopeasti.
          </p>
        </header>

        <form className="booking-form" onSubmit={handleSubmit}>
          {/* Asiakkuus */}
          <section className="booking-card">
            <h2 className="booking-card-title">Asiakkuus</h2>

            <div className="booking-radio-group">
              <label>
                <input type="radio" name="isCustomer" value="Kyllä" required />
                <span>Olen jo asiakas</span>
              </label>

              <label>
                <input type="radio" name="isCustomer" value="En" />
                <span>En ole vielä asiakas</span>
              </label>
            </div>
          </section>

          {/* Perustiedot */}
          <section className="booking-card">
            <h2 className="booking-card-title">Perustiedot</h2>

            <div className="booking-fields">
              <div className="booking-field booking-field--half">
                <label htmlFor="bookingFirstName">Etunimi *</label>
                <input
                  id="bookingFirstName"
                  name="firstName"
                  type="text"
                  placeholder="Etunimi *"
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingLastName">Sukunimi *</label>
                <input
                  id="bookingLastName"
                  name="lastName"
                  type="text"
                  placeholder="Sukunimi *"
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingDogName">Koiran nimi *</label>
                <input
                  id="bookingDogName"
                  name="dogName"
                  type="text"
                  placeholder="Koiran nimi *"
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingBreed">Rotu</label>
                <input
                  id="bookingBreed"
                  name="breed"
                  type="text"
                  placeholder="Rotu"
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingPhone">Puhelin *</label>
                <input
                  id="bookingPhone"
                  name="phone"
                  type="tel"
                  placeholder="Puhelin *"
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingEmail">Sähköposti *</label>
                <input
                  id="bookingEmail"
                  name="email"
                  type="email"
                  placeholder="Sähköposti *"
                  required
                />
              </div>
            </div>
          </section>

          {/* Toimipiste */}
          <section className="booking-card">
            <h2 className="booking-card-title">Toimipiste</h2>

            <div className="select-wrap">
              <select name="location" defaultValue="" required>
                <option value="" disabled>
                  Valitse toimipiste
                </option>
                <option value="Espoo">Espoo</option>
                <option value="Herttoniemi">Herttoniemi</option>
                <option value="Kamppi">Kamppi</option>
                <option value="Lahti">Lahti</option>
              </select>
            </div>
          </section>

          {/* Päivämäärät */}
          <section className="booking-card">
            <h2 className="booking-card-title">Ajankohta</h2>

            <div className="booking-fields">
              <div className="booking-field booking-field--half">
                <label htmlFor="bookingStartDate">Alkaa *</label>
                <input
                  id="bookingStartDate"
                  type="date"
                  name="startDate"
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingEndDate">Päättyy *</label>
                <input
                  id="bookingEndDate"
                  type="date"
                  name="endDate"
                  required
                />
              </div>
            </div>
          </section>

          {/* Lisätiedot */}
          <section className="booking-card">
            <h2 className="booking-card-title">Lisätiedot</h2>

            <textarea
              name="message"
              rows="5"
              placeholder="Lisätietoja varauksesta"
            />
          </section>

          {status === "error" && (
            <p className="booking-error">
              Lähetys epäonnistui. Yritä uudelleen.
            </p>
          )}

          <div className="booking-actions">
            <button
              type="submit"
              className="booking-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Lähetetään..." : "Lähetä varaus"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingFormSection;
