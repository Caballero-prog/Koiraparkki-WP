import "../styles/LegalPage.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MEDIA_API_URL = "/wp-json/wp/v2/media?per_page=100";

const LegalSection = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "#/";
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(MEDIA_API_URL);
        if (!res.ok) return;

        const data = await res.json();

        const image = data.find(
          (item) => item.media_type === "image" && item.slug === "privacy-main",
        );

        if (image) {
          setImageSrc(
            image.media_details?.sizes?.large?.source_url ||
              image.media_details?.sizes?.medium_large?.source_url ||
              image.source_url,
          );
        }
      } catch {
        return;
      }
    };

    fetchImage();
  }, []);

  return (
    <section className="legal-page" aria-labelledby="legal-title">
      <div className="legal-inner">
        <button type="button" className="legal-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Takaisin</span>
        </button>

        <div className="legal-hero">
          <div className="legal-hero-media">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt=""
                aria-hidden="true"
                className="legal-hero-image"
              />
            ) : (
              <div className="legal-skeleton" aria-hidden="true">
                <div className="legal-skeleton-shimmer" />
              </div>
            )}

            <div className="legal-hero-overlay" />

            <div className="legal-hero-content">
              <h1 id="legal-title" className="legal-title">
                Tietosuojaseloste
              </h1>
            </div>
          </div>
        </div>

        <article className="legal-content-card">
          <div className="legal-content">
            <p>Henkilötietolaki (523/1999) 10 ja 24§</p>

            <section className="legal-block">
              <h2>Rekisterin pitäjä</h2>
              <p>
                Koiraparkki Perro Koirahotelli Ky
                <br />
                Kalevankatu 17
                <br />
                00100 Helsinki
                <br />
                +358 456 133 212
                <br />
                info@koiraparkki.com
                <br />
                Y-tunnus 27668887
              </p>
            </section>

            <section className="legal-block">
              <h2>Yhteyshenkilö rekisteriä koskevissa asioissa</h2>
              <p>
                Pekka Kähkönen
                <br />
                0456 133 212
                <br />
                info@koiraparkki.com
              </p>
            </section>

            <section className="legal-block">
              <h2>Rekisterin nimi</h2>
              <p>Koiraparkki.com asiakasrekisteri</p>
            </section>

            <section className="legal-block">
              <h2>Henkilötietojen käsittely</h2>
              <p>
                Asiakas tilaa Koiraparkki-Koirahotelli Perro Ky (myöhemmin
                Koiraparkki) palveluita soittamalla tai sähköpostitse, Asiakas
                täyttänyt hoitosopimus-lomakkeen Koiraparkin nettisivuilla
                www.koiraparkki.com ja siten on rekisteröitynyt Koiraparkin
                asiakkaaksi ja voi käyttää Koiraparkin palveluita. Asiakkaalle on
                lähetetty antamaansa osoitteeseen lasku palveluista.
              </p>

              <p>
                Koiraparkki&nbsp; tarvitsee henkilötiedot, jotta asiakas voi
                käyttää palveluita ja asiakasta voidaan laskuttaa käyttämistään
                palveluista.
              </p>

              <p>Henkilötiedot tarvitaan, jotta:</p>

              <ul>
                <li>Asiakas voi käyttää Koiraparkin palveluita</li>
                <li>Koiraparkki voi kommunikoida asiakkaan kanssa</li>
                <li>Koiraparkki voi laskuttaa asiakasta palveluista</li>
                <li>Asiakassuhteen ylläpitäminen ja viestintä</li>
                <li>Palveluiden kehittäminen</li>
                <li>
                  Markkinointi&nbsp; ja asiakasviestintä (mikäli asiakas antaa
                  suostumuksensa)
                </li>
              </ul>
            </section>

            <section className="legal-block">
              <h2>Rekisterin tietosisältö</h2>
              <p>Henkilötiedot:</p>

              <ul>
                <li>Henkilön etu- ja sukunimi</li>
                <li>Osoite</li>
                <li>Sähköpostiosoite</li>
                <li>Puhelinnumero</li>
                <li>Varahenkilön etu- ja sukunimi</li>
                <li>Varahenkilön puhelinnumero</li>
                <li>
                  Lemmikin tiedot (nimi, rotu, rekisterinumero, mahdolliset
                  lääkitykset)
                </li>
              </ul>

              <ul>
                <li>Tilatut palvelut</li>
                <li>Tilauksen päivämäärä, ajankohta ja kesto</li>
                <li>Asiakkaan mahdollisesti antamat tilauksen lisätiedot</li>
                <li>Asiakkaan mahdollisesti antamat tiedot lemmikeistä</li>
                <li>Hinnoittelutiedot</li>
              </ul>
            </section>

            <section className="legal-block">
              <h2>Säännönmukaiset tietolähteet</h2>
              <p>
                Asiakkaaseen liittyviä tietoja kerätään ensisijaisesti
                asiakkaalta itseltään rekisteröitymisen, tilauksen tekemisen
                sekä asiakaspalvelutilanteiden yhteydessä.
              </p>
            </section>

            <section className="legal-block">
              <h2>Tietojen luovutus ja siirto</h2>
              <p>
                Tietoja ei käsitellä eikä siirretä sellaisiin maihin, joiden
                tietosuojalainsäädäntöä EU:n komissio ei ole hyväksynyt. Tietoja
                voidaan käsitellä ulkopuolisilla tahoilla esimerkiksi
                uutiskirjeen lähettämiseen, mikäli asiakas on antanut erillisen
                suostumuksensa.
              </p>

              <p>
                Tietoja ei luovuteta kolmansille osapuolille ilman asiakkaan
                erillistä suostumusta asiakkaalta, poikkeuksena seuraavat
                tilanteet:
              </p>

              <ul>
                <li>
                  Jos se on laissa vaadittu, esimerkiksi haasteen
                  vastaanottamisessa, asianmukaisten viranomaisten tai valtion
                  pyynnöstä, tai muussa vastaavassa laillisessa tilanteessa
                </li>
                <li>
                  Jos Koiraparkki on osallisena yritysten yhdistymisessä tai
                  hankinnassa
                </li>
                <li>
                  Kun uskomme hyvässä uskossa, että tietojen luovuttaminen on
                  vaadittua turvallisuuden tai oikeuksien täyttämisessä,
                  petoksen selvityksessä tai tutkimuksessa
                </li>
              </ul>
            </section>

            <section className="legal-block">
              <h2>Rekisterin suojaus</h2>
              <p>
                Rekisteri&nbsp; sijaitsee IT-palveluntarjoajan palvelimella&nbsp;
                ja se on suojattu teknisin- ja hallinnollisin keinoin&nbsp;
                IT-palveluntarjoajan toimesta . Henkilötietoja käsittelee
                pelkästään&nbsp; Koiraparkin henkilökunta, laskutus sekä johto.
                Järjestelmään pääsy on rajattu.
              </p>
            </section>

            <section className="legal-block">
              <h2>Tarkastusoikeus</h2>
              <p>
                Asiakkaalla on henkilötietolain nojalla oikeus tarkistaa
                maksuttomasti kerran vuodessa mitä häntä koskevia tietoja on
                tallennettu rekisteriin. Vapaamuotoinen pyyntö tulee lähettää
                kirjallisesti yllämainitulle rekisterin yhteyshenkilöön.
                Pyynnössä tulee mainita tarvittavat tunnistetiedot, jotta
                tietojen hakeminen järjestelmästä on mahdollista. Tällaisia
                tietoja ovat nimi, sähköpostiosoite ja osoite.
              </p>
            </section>

            <section className="legal-block">
              <h2>Oikeus tiedon korjaamiseen</h2>
              <p>
                Asiakas voi korjata omat tietonsa milloin tahansa ottamalla
                yhteyttä yllämainittuun rekisterin yhteyshenkilöön. Tällöin
                vaadimme kirjallista yhteydenottoa, jossa mainitaan edellisessä
                kappaleessa tarvittavat tunnistetiedot.
              </p>
            </section>

            <section className="legal-block">
              <h2>Suostumukset ja kiellot</h2>
              <p>
                Asiakas voi milloin tahansa kieltää tietojensa käyttämisen
                suoramarkkinointiin. Mikäli asiakas kieltää tietojen käyttämisen
                suoramarkkinointiin lähetetään hänelle vain
                asiakassuhdeviestintää.
                <br />
                Asiakkaalle ei lähetetä suoramarkkinointia ilman erillistä
                suostumusta, esimerkiksi rekisteröitymällä uutiskirjeen
                vastaanottajaksi tai varauksen yhteydessä ilmoittautumalla
                uutiskirjeen vastaanottajaksi.
              </p>
            </section>

            <section className="legal-block">
              <h2>Muutokset tietosuojaselosteeseen</h2>
              <p>
                Koiraparkki pidättää oikeuden päivittämään tai muuttamaan tätä
                tietosuojaselostetta milloin tahansa. Tietosuojaselosteesta
                pidetään aina uusin versio saatavilla asiakkaalle.
              </p>

              <p>Päivitetty 25.5.2018</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
};

export default LegalSection;