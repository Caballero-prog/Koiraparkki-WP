export const pricingSectionData = {
  title: "Hinnasto",
  lead:
    "Valitse palvelu ja katso sisältö, ajat sekä varaus- ja peruutusehdot.",
  tabsAriaLabel: "Valitse palvelu",
  includesTitle: "Hinta sisältää",
  bookingTitle: "Varaus ja peruutus",
  bookingButtonText: "Tee varaus",
  suitableTitle: "Sopii erityisesti",
  seasonalAriaLabel: "Sesonkihinnoittelu",
};

export const pricingOptions = [
  {
    id: "example",
    name: "Palvelun nimi",
    price: "00 €",
    unit: "/ yksikkö",
    hours: "Aukioloajat",
    summary: "Lyhyt kuvaus palvelusta.",

    includes: [
      "Sisältö 1",
      "Sisältö 2",
      "Sisältö 3",
    ],

    booking: "Varausohje tähän.",
    cancellation: "Peruutusehto tähän.",
    noShow: "No-show ehto tähän.",

    suitableFor: [
      "Kenelle sopii 1",
      "Kenelle sopii 2",
    ],
  },
];

export const seasonalNotice = {
  title: "Sesonkihinnoittelu",
  modifier: "+20 %",
  description: "Lyhyt kuvaus sesonkihinnoittelusta.",

  periods: [
    "Ajanjakso 1",
    "Ajanjakso 2",
    "Ajanjakso 3",
    "Ajanjakso 4",
    "Ajanjakso 5",
  ],
};