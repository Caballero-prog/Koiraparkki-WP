// src/data/locations.js
export const locations = [
  {
    id: "kamppi",
    name: "Kamppi",
    city: "Helsinki",
    address: "Kalevankatu 17, Helsinki",
    hours: [{ label: "M-Pe", value: "07-18" }],
    email: "info@koiraparkki.com",
    phone: "+358 456 133 212",

    // lyhyt ingressi listaan/korttiin
    summary: "Avara ja kodinomainen hoitola keskustassa, isot yhteislenkit ja puistoretket.",

    // erot jotka halutaan nostaa esiin “pill”-badgeina tai listana
    highlights: [
      "Keskustasijainti",
      "Noin 20 koiraa / päivä",
      "Ryhmittely leikkityylin mukaan",
      "Pitkät retket puistoihin",
    ],

    // pitempi kuvaus detail-näkymään (valinnainen)
    details: [
      "Tilava, kodinomainen ja täysin häkitön.",
      "Aamupäivisin usean tunnin retkiä (esim. Eira, Tervasaari, Mustikkamaa, Keskuspuisto, Rajasaari).",
      "Iltapäivällä vielä lyhyempi lenkki noin klo 15.",
    ],

    // myöhemmin karttaa varten
    coords: { lat: 60.167, lng: 24.934 }, // placeholder
  },

  {
    id: "rinnekaski-latokaski",
    name: "Rinnekaski",
    city: "Espoo (Latokaski)",
    address: "Latokaski, Espoo",
    hours: [{ label: "Ma-Pe", value: "07-18" }],
    email: "info@koiraparkki.com",
    phone: "+358 456 133 212",
    summary: "Rauhallinen omakotialue metsien ja peltojen laidalla. Aidattu piha ja pienempi koiramäärä.",
    highlights: [
      "Max 10 koiraa kerrallaan",
      "Aidattu piha",
      "Metsä- ja peltolenkit",
      "Kodikas & häkitön",
    ],
    details: [
      "Sijaitsee rauhallisella alueella, noin 18 km Helsingin keskustasta.",
      "Päivisin ulkoilua pellolle, metsään ja läheisiin koirapuistoihin.",
    ],
    coords: { lat: 60.20, lng: 24.70 }, // placeholder
  },

  {
    id: "herttoniemi",
    name: "Herttoniemi",
    city: "Helsinki",
    address: "Sahaajankatu 35, Herttoniemi, Helsinki",
    hours: [{ label: "Ma-Pe", value: "07-18" }],
    email: "herttoniemi@koiraparkki.fi",
    phone: "+358 44 244 2655",
    summary: "Meitä varten suunnitellut isot tilat, sisäleikkipuisto ja loistavat yhteydet (metro + Itäväylä).",
    highlights: [
      "15-18 koiraa / päivä",
      "100m² sisäleikkipuisto",
      "5 min Siilitien metrosta",
      "Sopii myös aroille koirille",
      "Trimmaus & koulutus",
    ],
    details: [
      "Useita erilaisia tiloja rauhoittumiseen ja leikkiin.",
      "Päivittäin ulkoilua lähimetsissä ja koirapuistoissa.",
    ],
    coords: { lat: 60.19, lng: 25.04 }, // placeholder
  },

  {
    id: "lahti-mukkula",
    name: "Mukkula",
    city: "Lahti",
    address: "Mukkula, Lahti",
    hours: [{ label: "Ma-Pe", value: "07-18" }], // jos tarkentuu myöhemmin
    email: "lahti@koiraparkki.fi",
    phone: "+358 4003 92211",
    summary: "Pienimuotoinen kodinomainen hoitola, erikoistunut rescue-koiriin ja yksilöllisempää tukea tarvitseville.",
    highlights: [
      "Erikoistunut rescue-koiriin",
      "Max 5 koiraa kerrallaan",
      "Aidattu piha",
      "15+ vuoden kokemus & ongelmakoirakouluttaja",
      "Mahdollinen bootcamp / yksityiskoulutus",
    ],
    details: [
      "Rauhallinen asuinalue, paljon luontoa ja viheralueita.",
      "Käytetään positiivisen vahvistamisen metodeja.",
      "Mahdollisuus yksityiskoulutukseen tai pidempään koulutusjaksoon (bootcamp).",
    ],
    coords: { lat: 60.98, lng: 25.66 }, // placeholder
  },
];