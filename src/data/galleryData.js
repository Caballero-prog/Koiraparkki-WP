const base = import.meta.env.BASE_URL;
const img = (name) => `${base}assets/gallery/${name}`;

export const galleryData = [
  {
    id: "kamppi",
    name: "Kamppi",
    images: [
      img("kamppi-1.webp"),
      img("kamppi-2.webp"),
      img("kamppi-3.webp"),
      img("kamppi-4.webp"),
      img("kamppi-5.webp"),
    ],
  },
  {
    id: "herttoniemi",
    name: "Herttoniemi",
    images: [
      img("herttoniemi-1.webp"),
      img("herttoniemi-2.webp"),
      img("herttoniemi-3.webp"),
      img("herttoniemi-4.webp"),
      img("herttoniemi-5.webp"),
    ],
  },
  {
    id: "latokaski",
    name: "Latokaski",
    images: [
      img("latokaski-1.webp"),
      img("latokaski-2.webp"),
      img("latokaski-3.webp"),
      img("latokaski-4.webp"),
      img("latokaski-5.webp"),
    ],
  },
  {
    id: "mukkula",
    name: "Mukkula",
    images: [
      img("mukkula-1.webp"),
      img("mukkula-2.webp"),
      img("mukkula-3.webp"),
      img("mukkula-4.webp"),
      img("mukkula-5.webp"),
    ],
  },
];