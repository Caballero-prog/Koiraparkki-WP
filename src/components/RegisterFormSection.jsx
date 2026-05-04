import "../styles/RegisterFormSection.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "./CustomSelect";

const RegisterFormSection = () => {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status !== "success") return;

    const timer = setTimeout(() => {
      setStatus("idle");
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/wp-json/custom/v1/register", {
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

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { state: { scrollTop: true } });
  };

  if (status === "success") {
    return (
      <section
        className="agreement agreement--success"
        aria-labelledby="agreement-success-title"
      >
        <div className="agreement-inner">
          <button type="button" className="agreement-back" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Takaisin</span>
          </button>

          <div className="agreement-success-card">
            <div className="agreement-success-icon" aria-hidden="true">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>

            <h1
              id="agreement-success-title"
              className="agreement-success-title"
            >
              Lomake lähetetty onnistuneesti
            </h1>

            <p className="agreement-success-text">
              Kiitos rekisteröinnistä. Olemme vastaanottaneet tiedot ja palaamme
              asiaan mahdollisimman pian.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="agreement" aria-labelledby="agreement-title">
      <div className="agreement-inner">
        <button type="button" className="agreement-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Takaisin</span>
        </button>

        <header className="agreement-header">
          <h1 id="agreement-title" className="agreement-title">
            Rekisteröi koirasi asiakkaaksi
          </h1>
          <p className="agreement-lead">
            Täytä alla olevat tiedot ennen ensimmäistä hoitokertaa. Lähetetty
            lomake toimii samalla hoitosopimuksena.
          </p>
        </header>

        <form className="agreement-form" onSubmit={handleSubmit}>
          <section className="agreement-card" aria-labelledby="owner-title">
            <h2 id="owner-title" className="agreement-card-title">
              Omistajan tiedot
            </h2>

            <div className="agreement-fields">
              <div className="field field--half">
                <label htmlFor="ownerFirstName">Etunimi *</label>
                <input
                  id="ownerFirstName"
                  name="ownerFirstName"
                  type="text"
                  placeholder="Etunimi"
                  required
                />
              </div>

              <div className="field field--half">
                <label htmlFor="ownerLastName">Sukunimi *</label>
                <input
                  id="ownerLastName"
                  name="ownerLastName"
                  type="text"
                  placeholder="Sukunimi"
                  required
                />
              </div>

              <div className="field field--full">
                <label htmlFor="ownerAddress">Osoite</label>
                <input
                  id="ownerAddress"
                  name="ownerAddress"
                  type="text"
                  placeholder="Katuosoite"
                />
              </div>

              <div className="field field--half">
                <label htmlFor="ownerZip">Postinumero</label>
                <input
                  id="ownerZip"
                  name="ownerZip"
                  type="text"
                  placeholder="00100"
                />
              </div>

              <div className="field field--half">
                <label htmlFor="ownerCity">Paikkakunta</label>
                <input
                  id="ownerCity"
                  name="ownerCity"
                  type="text"
                  placeholder="Helsinki"
                />
              </div>

              <div className="field field--half">
                <label htmlFor="ownerPhone">Puhelin *</label>
                <input
                  id="ownerPhone"
                  name="ownerPhone"
                  type="tel"
                  placeholder="+358 40 123 4567"
                  required
                />
              </div>

              <div className="field field--half">
                <label htmlFor="ownerEmail">Sähköposti *</label>
                <input
                  id="ownerEmail"
                  name="ownerEmail"
                  type="email"
                  placeholder="nimi@email.com"
                  required
                />
              </div>
            </div>
          </section>

          <section className="agreement-card" aria-labelledby="backup-title">
            <h2 id="backup-title" className="agreement-card-title">
              Varahenkilö
            </h2>

            <div className="agreement-fields">
              <div className="field field--half">
                <label htmlFor="backupName">Nimi</label>
                <input
                  id="backupName"
                  name="backupName"
                  type="text"
                  placeholder="Varahenkilön nimi"
                />
              </div>

              <div className="field field--half">
                <label htmlFor="backupPhone">Puhelin</label>
                <input
                  id="backupPhone"
                  name="backupPhone"
                  type="tel"
                  placeholder="+358 40 123 4567"
                />
              </div>

              <div className="field field--full">
                <label htmlFor="backupEmail">Sähköposti</label>
                <input
                  id="backupEmail"
                  name="backupEmail"
                  type="email"
                  placeholder="nimi@email.com"
                />
              </div>
            </div>
          </section>

          <section className="agreement-card" aria-labelledby="dog-title">
            <h2 id="dog-title" className="agreement-card-title">
              Koiran tiedot
            </h2>

            <div className="agreement-fields">
              <div className="field field--half">
                <label htmlFor="dogName">Koiran nimi *</label>
                <input
                  id="dogName"
                  name="dogName"
                  type="text"
                  placeholder="Koiran nimi"
                  required
                />
              </div>

              <div className="field field--half">
                <label htmlFor="dogDob">Syntymäaika *</label>
                <input
                  id="dogDob"
                  name="dogDob"
                  type="text"
                  placeholder="01.01.2020"
                  required
                />
              </div>

              <div className="field field--half">
                <label htmlFor="dogChip">Sirunumero / passin numero *</label>
                <input
                  id="dogChip"
                  name="dogChip"
                  type="text"
                  placeholder="Sirunumero tai passin numero"
                  required
                />
              </div>

              <div className="field field--half">
                <label htmlFor="dogBreed">Rotu *</label>
                <input
                  id="dogBreed"
                  name="dogBreed"
                  type="text"
                  placeholder="Rotu"
                  required
                />
              </div>

              <div className="field field--half">
                <CustomSelect
                  id="dogLocation"
                  name="dogLocation"
                  label="Hoitopaikka *"
                  placeholder="Valitse hoitopaikka"
                  required
                  options={[
                    { value: "Espoo Latokaski", label: "Espoo Latokaski" },
                    { value: "Helsinki Kamppi", label: "Helsinki Kamppi" },
                    {
                      value: "Helsinki Herttoniemi",
                      label: "Helsinki Herttoniemi",
                    },
                    { value: "Lahti Mukkula", label: "Lahti Mukkula" },
                  ]}
                />
              </div>

              <div className="field field--half">
                <CustomSelect
                  id="dogSterilized"
                  name="dogSterilized"
                  label="Steriloitu / kastroitu"
                  placeholder="Valitse"
                  options={[
                    { value: "Kyllä", label: "Kyllä" },
                    { value: "Ei", label: "Ei" },
                    {
                      value: "Kemiallinen kastraatio",
                      label: "Kemiallinen kastraatio",
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          <section className="agreement-card" aria-labelledby="notes-title">
            <h2 id="notes-title" className="agreement-card-title">
              Lisätiedot
            </h2>

            <div className="agreement-fields">
              <div className="field field--full">
                <label htmlFor="dogNotes">Koirasta huomioitavaa</label>
                <textarea
                  id="dogNotes"
                  name="dogNotes"
                  rows="6"
                  placeholder="Käytös, allergiat, lääkitys, ruokinta tai muu tärkeä tieto"
                />
              </div>
            </div>
          </section>

          <section
            className="agreement-card"
            aria-labelledby="permissions-title"
          >
            <h2 id="permissions-title" className="agreement-card-title">
              Suostumukset
            </h2>

            <div className="checkbox-group">
              <label className="checkbox-row">
                <input type="checkbox" name="allowDogPark" />
                <span>Koirani saa osallistua koirapuistoiluun</span>
              </label>

              <label className="checkbox-row">
                <input type="checkbox" name="allowPhotos" />
                <span>
                  Koirastani saa julkaista kuvia sosiaalisessa mediassa
                </span>
              </label>

              <label className="checkbox-row">
                <input type="checkbox" name="allowTreats" />
                <span>Koiralleni saa antaa herkkuja</span>
              </label>
            </div>
          </section>

          <section className="agreement-card" aria-labelledby="terms-title">
            <h2 id="terms-title" className="agreement-card-title">
              Hyväksynnät
            </h2>

            <p className="agreement-note">
              Täyttämällä lomakkeen vahvistan antamani tiedot oikeiksi ja
              hyväksyn hoitoon liittyvät ehdot sekä tietojen käsittelyn.
            </p>

            <div className="checkbox-group">
              <label className="checkbox-row">
                <input type="checkbox" name="acceptTerms" required />
                <span>Hyväksyn hoitoehdot *</span>
              </label>

              <label className="checkbox-row">
                <input type="checkbox" name="acceptPrivacy" required />
                <span>Hyväksyn tietosuojaselosteen *</span>
              </label>

              <label className="checkbox-row">
                <input type="checkbox" name="confirmInfo" required />
                <span>Vakuutan antamani tiedot oikeiksi *</span>
              </label>
            </div>
          </section>

          {status === "error" && (
            <p className="form-message error">
              Lähetys epäonnistui. Yritä uudelleen.
            </p>
          )}

          <div className="agreement-actions">
            <button
              type="submit"
              className="agreement-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Lähetetään..." : "Lähetä"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterFormSection;
