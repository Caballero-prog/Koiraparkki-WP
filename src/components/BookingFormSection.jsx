import "../styles/BookingFormSection.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "./CustomSelect";

const BookingFormSection = () => {
  const [status, setStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");
  const [formResetKey, setFormResetKey] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (status !== "success") return;

    const timer = setTimeout(() => {
      setStatus("idle");
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (!formMessage) return;

    const timer = setTimeout(() => {
      setStatus("idle");
      setFormMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [formMessage]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { state: { scrollTop: true } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFormMessage("");

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.location) {
      setFormMessage("Valitse toimipiste.");
      setStatus("error");
      return;
    }

    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      setFormMessage("Päättymispäivä ei voi olla ennen alkamispäivää.");
      setStatus("error");
      return;
    }

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
        throw new Error("Lähetys epäonnistui. Yritä uudelleen.");
      }

      form.reset();
      setFormResetKey((current) => current + 1);
      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setFormMessage("Lähetys epäonnistui. Yritä uudelleen.");
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
          <section className="booking-card">
            <h2 className="booking-card-title">Asiakkuus</h2>

            <div className="booking-radio-group">
              <label>
                <input type="radio" name="isCustomer" value="Kyllä" required />
                <span>Olen jo asiakas</span>
              </label>

              <label>
                <input type="radio" name="isCustomer" value="En" required />
                <span>En ole vielä asiakas</span>
              </label>
            </div>
          </section>

          <section className="booking-card">
            <h2 className="booking-card-title">Perustiedot</h2>

            <div className="booking-fields">
              <div className="booking-field booking-field--half">
                <label htmlFor="bookingFirstName">Etunimi *</label>
                <input
                  id="bookingFirstName"
                  name="firstName"
                  type="text"
                  placeholder="Etunimi"
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingLastName">Sukunimi *</label>
                <input
                  id="bookingLastName"
                  name="lastName"
                  type="text"
                  placeholder="Sukunimi"
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingDogName">Koiran nimi *</label>
                <input
                  id="bookingDogName"
                  name="dogName"
                  type="text"
                  placeholder="Koiran nimi"
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
                  placeholder="+358 40 123 4567"
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingEmail">Sähköposti *</label>
                <input
                  id="bookingEmail"
                  name="email"
                  type="email"
                  placeholder="nimi@email.com"
                  required
                />
              </div>
            </div>
          </section>

          <section className="booking-card">
            <CustomSelect
              key={formResetKey}
              id="bookingLocation"
              name="location"
              label="Toimipiste *"
              placeholder="Valitse toimipiste"
              required
              options={[
                { value: "Espoo", label: "Espoo" },
                { value: "Herttoniemi", label: "Herttoniemi" },
                { value: "Kamppi", label: "Kamppi" },
                { value: "Lahti", label: "Lahti" },
              ]}
            />
          </section>

          <section className="booking-card">
            <h2 className="booking-card-title">Ajankohta</h2>

            <div className="booking-fields">
              <div className="booking-field booking-field--half">
                <label htmlFor="bookingStartDate">Alkaa *</label>
                <input
                  id="bookingStartDate"
                  type="date"
                  name="startDate"
                  min={today}
                  required
                />
              </div>

              <div className="booking-field booking-field--half">
                <label htmlFor="bookingEndDate">Päättyy *</label>
                <input
                  id="bookingEndDate"
                  type="date"
                  name="endDate"
                  min={today}
                  required
                />
              </div>
            </div>
          </section>

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
              {formMessage || "Lähetys epäonnistui. Yritä uudelleen."}
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
