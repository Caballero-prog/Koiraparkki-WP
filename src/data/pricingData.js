export const pricingOptions = [
  {
    id: "paivahoito-arki",
    name: "Päivähoito Ma–Pe",
    price: "40 €",
    unit: "/ päivä",
    hours: "07–18",
    summary:
      "Joustava päivähoito arkipäivisin aktiivisille, seuraa kaipaaville ja virikkeitä hyötyville koirille.",

    includes: [
      "Parin tunnin päivälenkki Kampin ja Helsingin alueella",
      "Koirapuistokäynti tai metsälenkki",
      "Iltapäivälenkki",
      "Aktivointia ja leikkimistä koirakavereiden kanssa",
    ],

    booking:
      "Varaus viimeistään edellisenä iltana puhelimitse, tekstiviestillä tai WhatsAppilla.",
    cancellation: "Peruutus viimeistään edellisenä iltana klo 18 mennessä.",
    noShow:
      "Myöhäisestä peruutuksesta tai no-show’sta veloitetaan päivän hinta.",

    suitableFor: [
      "aktiivisille koirille",
      "pennuille",
      "vanhemmille koirille, jotka hyötyvät aktiviteeteista",
      "eroahdistuksesta kärsiville",
      "koirille, jotka kaipaavat sosiaalisia kontakteja",
    ],
  },

  {
    id: "paivahoito-viikonloppu",
    name: "Päivähoito La–Su",
    price: "55 €",
    unit: "/ päivä",
    hours: "09–18",
    summary:
      "Viikonloppuhoito rauhallisemmassa ympäristössä. Sopii erityisen hyvin myös koirille, jotka hyötyvät pienemmästä ryhmästä.",

    includes: [
      "Parin tunnin päivälenkki",
      "Koirapuistokäynti",
      "Iltapäivälenkki",
      "Aktivointia ja leikkimistä muiden hoitokoirien kanssa",
      "Herkkupala ja muu päivän aikana tarvittava perushoito",
    ],

    booking:
      "Varaus viimeistään edellisenä päivänä ennen klo 12 puhelimitse, tekstiviestillä tai WhatsAppilla.",
    cancellation: "Peruutus ilman kuluja edellisenä iltana klo 18 mennessä.",
    noShow:
      "No-show-tilanteessa tai saman päivän peruutuksessa veloitetaan koko päivän hinta.",

    suitableFor: [
      "kaikenlaisille koirille",
      "koirille, jotka hyötyvät viikonlopun rauhallisemmasta ympäristöstä",
    ],
  },

  {
    id: "tuntiparkki",
    name: "Tuntiparkki",
    price: "20 €",
    unit: "/ 2 ensimmäistä tuntia",
    hours: "Ma–Pe, max 5 h",
    summary:
      "Kevyempi hoitovaihtoehto lyhyempään tarpeeseen. Sopii esimerkiksi puolipäivähoidoksi, asioinnin ajaksi tai hallittuun sosiaalistamiseen.",

    includes: [
      "2 ensimmäistä tuntia 20 €",
      "Sen jälkeen 8 € / alkava tunti",
      "Maksimissaan 5 tuntia",
      "Yli 5 tunnin jälkeen veloitus koko päivän hinnan mukaan",
      "Tuonti ja nouto oman aikataulun mukaan",
    ],

    booking: "Varaus viimeistään edellisenä iltana.",
    cancellation: "Peruutus viimeistään edellisenä iltana.",
    noShow: "No-show-tilanteessa tai viime hetken peruutuksessa veloitus 20 €.",

    suitableFor: [
      "puolipäivähoidoksi",
      "esimerkiksi siivoojan, kampaajan tai lounaan ajaksi",
      "pennuille playdate-hetkeksi",
      "ujon tai aran koiran hallittuun tutustumiseen",
      "sosiaalistamista kaipaaville koirille",
    ],
  },

  {
    id: "iltaparkki",
    name: "Iltaparkki",
    price: "20 €",
    unit: "/ 1 h",
    hours: "18–22",
    summary:
      "Joustava iltahoito lyhyemmäksi tai pidemmäksi ajaksi. Hyvä vaihtoehto iltamenoihin tai rauhalliseen iltaseuraan koiralle.",

    includes: ["18–19: 20 €", "18–20: 30 €", "18–21: 40 €", "18–22: 50 €"],

    booking: "Varaus viimeistään edellisenä päivänä klo 12 mennessä.",
    cancellation: "Peruutus viimeistään edellisenä iltana klo 18 mennessä.",
    noShow: "No-show-tilanteessa tai myöhäisestä peruutuksesta veloitus 20 €.",

    suitableFor: [
      "ilta-ajalle",
      "tilanteisiin, joissa koiraa ei haluta jättää yksin",
      "lyhyempään tai pidempään iltahoitoon tarpeen mukaan",
    ],
  },
];

export const seasonalNotice = {
  title: "Sesonkihinnoittelu",
  modifier: "+20 %",
  description:
    "Joissakin ajankohdissa hinnat ovat korkeamman kysynnän vuoksi 20 % korkeammat.",
  periods: [
    "Talvilomat 7–9",
    "Pääsiäinen",
    "Juhannus – 30.7",
    "Syyslomat 41–42",
    "Jouluviikko",
    "Uusivuosi 2.1–6.1",
  ],
};
