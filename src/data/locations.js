const base = import.meta.env.BASE_URL; // includes trailing slash
const img = (name) => `${base}assets/locations/${name}`;
export const locations = [
  {
    id: "kamppi",
    name: "Kamppi",
    city: "Helsinki",
    address: "Kalevankatu 17, Helsinki",
    hours: [{ label: "Ma–Pe", value: "07–18" }],
    email: "info@koiraparkki.com",
    phone: "+358 456 133 212",

    // Show as badges in UI
    services: ["Päivähoito"],

    // Used in the feature panel
    summary:
      "Avara ja kodinomainen hoitola keskustassa. Isot yhteislenkit ja puistoretket joka arkipäivä.",

    highlights: [
      "Keskustasijainti",
      "Noin 20 koiraa / päivä",
      "Ryhmittely leikkityylin mukaan",
      "Pitkät retket puistoihin",
    ],

    details: [
      "Tilava, kodinomainen ja täysin häkitön.",
      "Aamupäivisin usean tunnin retkiä (esim. Eira, Tervasaari, Mustikkamaa, Keskuspuisto, Rajasaari).",
      "Iltapäivällä vielä lyhyempi lenkki noin klo 15.",
    ],

    images: [
      "/assets/locations/kamppi-1.webp",
      "/assets/locations/kamppi-2.webp",
      "/assets/locations/kamppi-3.webp",
      "/assets/locations/kamppi-4.webp",
    ],

    mapUrl: "https://www.google.com/maps?q=Kalevankatu+17+Helsinki",
    coords: { lat: 60.167, lng: 24.934 }, // placeholder
  },

  {
    id: "rinnekaski",
    name: "Rinnekaski",
    city: "Espoo (Latokaski)",
    address: "Latokaski, Espoo",
    hours: [{ label: "Ma–Pe", value: "07–18" }],
    email: "info@koiraparkki.com",
    phone: "+358 456 133 212",

    services: ["Päivähoito", "Hotelli"],

    summary:
      "Rauhallinen omakotialue metsien ja peltojen laidalla. Aidattu piha ja pienempi koiramäärä.",

    highlights: [
      "Max 10 koiraa kerrallaan",
      "Aidattu piha",
      "Metsä- ja peltolenkit",
      "Kodikas & häkitön",
    ],

    details: [
      "Sijaitsee rauhallisella alueella, noin 18 km Helsingin keskustasta.",
      "Päivisin ulkoilua pellolle, metsään ja läheisiin koirapuistoihin.",
      "Kesäisin paljon vihreää kasvillisuutta ja tilaa peuhata aidatulla pihalla.",
    ],

    images: [
      `${import.meta.env.BASE_URL}assets/locations/herttoniemi-1.webp`,
      `${import.meta.env.BASE_URL}assets/locations/herttoniemi-2.webp`,
      `${import.meta.env.BASE_URL}assets/locations/herttoniemi-3.webp`,
      `${import.meta.env.BASE_URL}assets/locations/herttoniemi-4.webp`,
    ],

    mapUrl: "https://www.google.com/maps?q=Latokaski+Espoo",
    coords: { lat: 60.20, lng: 24.70 }, // placeholder
  },

  {
    id: "herttoniemi",
    name: "Herttoniemi",
    city: "Helsinki",
    address: "Sahaajankatu 35, Herttoniemi, Helsinki",
    hours: [{ label: "Ma–Pe", value: "07–18" }],
    email: "herttoniemi@koiraparkki.fi",
    phone: "+358 44 244 2655",

    services: ["Päivähoito", "Hotelli", "Trimmaus", "Koulutus"],

    summary:
      "Meitä varten suunnitellut isot tilat, sisäleikkipuisto ja loistavat yhteydet (metro + Itäväylä).",

    highlights: [
      "15–18 koiraa / päivä",
      "100 m² sisäleikkipuisto",
      "5 min Siilitien metrosta",
      "Sopii myös aroille koirille",
      "Trimmaus & koulutus",
    ],

    details: [
      "Useita erilaisia tiloja rauhoittumiseen ja leikkiin.",
      "Päivittäin ulkoilua lähimetsissä ja koirapuistoissa lauman kanssa.",
      "Ammattitaitoiset hoitajat paikalla koko päivän — koiria ei koskaan jätetä yksin.",
    ],

    images: [
      "/assets/locations/herttoniemi-1.webp",
      "/assets/locations/herttoniemi-2.webp",
      "/assets/locations/herttoniemi-3.webp",
      "/assets/locations/herttoniemi-4.webp",
    ],

    mapUrl: "https://www.google.com/maps?q=Sahaajankatu+35+Helsinki",
    coords: { lat: 60.19, lng: 25.04 }, // placeholder
  },

  {
    id: "lahti-mukkula",
    name: "Mukkula",
    city: "Lahti",
    address: "Mukkula, Lahti",
    hours: [{ label: "Ma–Pe", value: "07–18" }], // adjust later if needed
    email: "lahti@koiraparkki.fi",
    phone: "+358 4003 92211",

    services: ["Päivähoito", "Hotelli", "Rescue-osaaminen"],

    summary:
      "Pienimuotoinen kodinomainen hoitola, erikoistunut rescue-koiriin ja yksilöllisempää tukea tarvitseville.",

    highlights: [
      "Erikoistunut rescue-koiriin",
      "Max 5 koiraa kerrallaan",
      "Aidattu piha",
      "15+ vuoden kokemus",
      "Mahdollinen bootcamp / yksityiskoulutus",
    ],

    details: [
      "Rauhallinen asuinalue, paljon luontoa ja viheralueita ulkoiluun.",
      "Käytetään positiivisen vahvistamisen metodeja.",
      "Mahdollisuus yksityiskoulutukseen tai pidempään koulutusjaksoon (bootcamp).",
    ],

    images: [
      "/assets/locations/lahti-mukkula-1.webp",
      "/assets/locations/lahti-mukkula-2.webp",
      "/assets/locations/lahti-mukkula-3.webp",
      "/assets/locations/lahti-mukkula-4.webp",
    ],

    mapUrl: "https://www.google.com/maps?q=Mukkula+Lahti",
    coords: { lat: 60.98, lng: 25.66 }, // placeholder
  },
];