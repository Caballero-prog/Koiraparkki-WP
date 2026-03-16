const base = import.meta.env.BASE_URL; // includes trailing slash
const img = (name) => `${base}assets/locations/${name}`;
export const locations = [
  {
    id: "kamppi",
    name: "Kamppi",
    city: "Helsinki",
    address: "Kalevankatu 17",
    hours: [{ label: "Ma-Pe", value: "07-18" }],
    email: "info@koiraparkki.com",
    phone: "+358 456 133 212",

    // Show as badges in UI
    services: ["Päivähoito", "Tuntiparkki"],

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

    mapUrl:
      "https://www.google.com/maps/place/Koiraparkki.com/@60.1667626,24.9334417,17z/data=!3m1!4b1!4m6!3m5!1s0x46920bcd5ced80f7:0xf9b3cbc74474d937!8m2!3d60.16676!4d24.936022!16s%2Fg%2F11b7qbr85v?hl=en&entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 60.167, lng: 24.934 }, // placeholder
  },
  {
    id: "herttoniemi",
    name: "Herttoniemi",
    city: "Helsinki",
    address: "Sahaajankatu 35",
    hours: [{ label: "Ma-Pe", value: "07-18" }],
    email: "herttoniemi@koiraparkki.fi",
    phone: "+358 44 244 2655",

    services: ["Päivähoito", "Tuntiparkki", "Hotelli", "Trimmaus", "Koulutus"],

    summary:
      "Meitä varten suunnitellut isot tilat, sisäleikkipuisto ja loistavat yhteydet (metro + Itäväylä).",

    highlights: [
      "15-18 koiraa / päivä",
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

    mapUrl:
      "https://www.google.com/maps/place/Koiraparkki+Herttoniemi+Koirap%C3%A4iv%C3%A4koti+ja+koirahotelli/@60.2049034,25.0483621,17z/data=!3m1!4b1!4m6!3m5!1s0x46920f9195c74e93:0xdeaedd12d83e168e!8m2!3d60.2049008!4d25.0509424!16s%2Fg%2F11k8szktrb?hl=en&entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 60.19, lng: 25.04 }, // placeholder
  },
  {
    id: "latokaski",
    name: "Latokaski",
    city: "Espoo",
    address: "Rinnekaski",
    hours: [{ label: "Ma-Pe", value: "07-18" }],
    email: "info@koiraparkki.com",
    phone: "+358 456 133 212",

    services: ["Päivähoito", "Hotelli", "Tuntiparkki"],

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

    mapUrl:
      "https://www.google.com/maps/place/Koiraparkki.com+-+Espoo+Koirap%C3%A4iv%C3%A4koti+ja+koirahotelli/@60.1802594,24.6701515,18z/data=!4m7!3m6!1s0x468df51d4738eddf:0x9c36d1c72d24f137!4b1!8m2!3d60.1803966!4d24.6700617!16s%2Fg%2F11gmdqvf_w?hl=en&entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 60.2, lng: 24.7 }, // placeholder
  },
  {
    id: "mukkula",
    name: "Mukkula",
    city: "Lahti",
    address: "Mukkula",
    hours: [{ label: "Ma–Pe", value: "07–18" }], // adjust later if needed
    email: "lahti@koiraparkki.fi",
    phone: "+358 4003 92211",

    services: ["Päivähoito", "Tuntiparkki", "Hotelli", "Rescue-osaaminen"],

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

    mapUrl:
      "https://www.google.com/maps/place/Koiraparkki+Lahti+koirap%C3%A4iv%C3%A4koti/@61.0248646,25.669673,17z/data=!3m1!4b1!4m6!3m5!1s0x468e29094b7e1de7:0x288bd9c3d030fd87!8m2!3d61.024862!4d25.6722533!16s%2Fg%2F11lw0cnc1s?hl=en&entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    coords: { lat: 60.98, lng: 25.66 }, // placeholder
  },
];
