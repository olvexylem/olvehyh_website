// PROJECT DATA
// One entry per project. Newest first.
//
//   title      → shown on hover / in the text list
//   date       → "YYYY-MM" (displayed as "MM YYYY")
//   categories → any of: "graphic-design", "image", "installations"
//                (these drive BOTH the filter and the label shown, so they can't drift apart)
//   url        → project page in /PROJECTS ("" = no page yet, card is not clickable)
//   cover      → thumbnail image

const projectData = [
  {
    title: "Morbid Case Study",
    date: "2026-08",
    categories: ["image"],
    url: "",
    cover: "ARCHIVE/260808_MORBID/COMPRESSED/magnific_0epLDGNTfW.png"
  },
  {
    title: "Antwerpen Sightseeing",
    date: "2026-04",
    categories: ["image"],
    url: "",
    cover: "ARCHIVE/260400_ANTWERPEN/SELECTION/3_ANTWERPEN.png"
  },

  // Hidden for now (was commented out in the HTML)
  // {
  //   title: "Synthetic Transcendence",
  //   date: "2026-05",
  //   categories: ["installations", "graphic-design", "image"],
  //   url: "",
  //   cover: "ARCHIVE/34_SYTHENTIC/test_01.JPG"
  // },

  {
    title: "Citra",
    date: "2025-12",
    categories: ["graphic-design"],
    url: "PROJECTS/251203_CITRA.html",
    cover: "ARCHIVE/251203_CITRA/SELECTION/1_CITRA_CARD.jpg"
  },
  {
    title: "Pharaoh",
    date: "2025-12",
    categories: ["image"],
    url: "PROJECTS/251205_PHARAOH.html",
    cover: "ARCHIVE/251205_PHARAOH/SELECTION/1_PHARAOH_AI.png"
  },
  {
    title: "Vitrine Gallery",
    date: "2025-11",
    categories: ["graphic-design"],
    url: "PROJECTS/251103_VITRINE.html",
    cover: "ARCHIVE/251103_VITRINE/EXHIBITION_DISPLAYS/5_VITRINE_VINYL.jpeg"
  },
  {
    title: "Runner's High",
    date: "2025-11",
    categories: ["graphic-design", "image"],
    url: "PROJECTS/251205_RUNNERS_HIGH.html",
    cover: "ARCHIVE/251205_RUNNERS_HIGH/BOOK_RELEASE/444_04.jpg"
  },
  {
    title: "air place",
    date: "2025-05",
    categories: ["installations", "graphic-design"],
    url: "PROJECTS/250530_AIRPLACE.html",
    cover: "ARCHIVE/250530_AIRPLACE/STILLS_COMPRESSED/IMG_7394.png"
  },
  {
    title: "Best Dutch Book Design Catalogue",
    date: "2025-05",
    categories: ["graphic-design", "image"],
    url: "PROJECTS/250525_CATALOGUE.html",
    cover: "ARCHIVE/250525_CATALOGUE/COMPRESSED/CATALOGUE_VISUAL_EDIT.webp"
  },
  {
    title: "Ruth Gottstein, Women in Print",
    date: "2025-05",
    categories: ["graphic-design"],
    url: "PROJECTS/250504_RUTH_GOTTSTEIN.html",
    cover: "ARCHIVE/250504_RUTH_GOTTSTEIN/COMPRESSED/R_PHOTOSHOOT_01.jpeg"
  },
  {
    title: "Sanctuary",
    date: "2025-04",
    categories: ["graphic-design"],
    url: "PROJECTS/250411_SANCTUARY_QUESTIONNAIRE.html",
    cover: "ARCHIVE/250411_SANCTUARY_QUESTIONNAIRE/SELECTION_COMPRESSED/S_PHOTOSHOOT_08.png"
  },
  {
    title: "Exploded Typeface",
    date: "2025-04",
    categories: ["graphic-design"],
    url: "PROJECTS/250410_EXPLOSION.html",
    cover: "ARCHIVE/250410_EXPLOSION/SPECIMEN/explosion_3.webp"
  },
  {
    title: "Muscle Memory",
    date: "2025-03",
    categories: ["image"],
    url: "PROJECTS/250323_MUSCLE_MEMORY.html",
    cover: "ARCHIVE/250323_MUSCLE_MEMORY/COMPRESSED/bw-cig.webp"
  },
  {
    title: "Dune Appendices",
    date: "2025-02",
    categories: ["graphic-design"],
    url: "PROJECTS/250207_DUNE_APPENDICES.html",
    cover: "ARCHIVE/250207_DUNE_APPENDICES/IPHONE_PHOTOS/2_DUNE_BOOK.webp"
  },
  {
    title: "Shuttle Bus, Singapore Art Week",
    date: "2025-01",
    categories: ["graphic-design"],
    url: "PROJECTS/250119_SAW_BUS.html",
    cover: "ARCHIVE/250119_SAW_BUS/PHOTO_SELECTION/db7c3e04-4017-4040-a8ef-4fad16339a2c.JPG"
  },
  {
    title: "Stockman",
    date: "2024-12",
    categories: ["graphic-design"],
    url: "PROJECTS/241216_STOCKMAN.html",
    cover: "ARCHIVE/241216_STOCKMAN/SCREEN CAPTURE/screencapture-olvexylem-github-io-the-curious-life-of-the-stockman-Rodeo-html-2026-07-28-14_16_47.png"
  },
  {
    title: "Relic, Cyberpunk",
    date: "2025-02",
    categories: ["image"],
    url: "PROJECTS/241202_RELIC.html",
    cover: "ARCHIVE/241202_RELIC/STILLS/RELIC_FS_01.jpg"
  },

  // Hidden for now (was commented out in the HTML)
  // {
  //   title: "Metamorphoses Exhibition Website",
  //   date: "2024-10",
  //   categories: ["graphic-design"],
  //   url: "",
  //   cover: "ARCHIVE/241031_METAMORPHOSES_WEB/COMPRESSED/Screenshot 2025-12-24 at 10.00.57.png"
  // },

  {
    title: "Ether",
    date: "2024-10",
    categories: ["image", "installations"],
    url: "PROJECTS/241015_ETHER.html",
    cover: "ARCHIVE/241015_ETHER/PHOTOGRAPY/2_ETHER_PHOTO.webp"
  },
  {
    title: "Inuit Garment, Visual Exploration",
    date: "2024-06",
    categories: ["graphic-design", "image"],
    url: "PROJECTS/240526_INUIT_GARMENT.html",
    cover: "ARCHIVE/240526_INUIT_GARMENT/POSTER_COMPRESSED/blck.1.png"
  },
  {
    title: "Good Time",
    date: "2024-05",
    categories: ["graphic-design", "image"],
    url: "PROJECTS/240525_GOODTIME_PUBLICATION.html",
    cover: "ARCHIVE/240525_GOODTIME_PUBLICATION/SPREADS/1_GT_SPREAD.webp"
  },
  {
    title: "Utopian Presentation",
    date: "2024-05",
    categories: ["graphic-design", "installations"],
    url: "PROJECTS/240510_UTOPIA.html",
    cover: "ARCHIVE/240510_UTOPIA/DOCUMENTS/VIDEO_STILLS/U_FS_02.jpg"
  },
  {
    title: "Future World",
    date: "2024-04",
    categories: ["image"],
    url: "PROJECTS/240405_FUTURE_WORLD.html",
    cover: "ARCHIVE/240405_FUTURE_WORLD/COMPRESSED/CANON IXUS/FW_02.jpeg"
  },
  {
    title: "Su Su Su Studio",
    date: "2024-02",
    categories: ["image"],
    url: "PROJECTS/240228_SUSUSUSTUDIO.html",
    cover: "ARCHIVE/240228_SUSUSUSTUDIO/RUBBISH_COMPOSITION/3_RUBBISH.webp"
  },
  {
    title: "Anna Firth Interview, Transcript",
    date: "2023-11",
    categories: ["graphic-design"],
    url: "PROJECTS/240119_ANNA.html",
    cover: "ARCHIVE/240119_ANNA/COMPRESSED/ANNA_PUBLICATION.jpeg"
  },
  {
    title: "Opium War, Timeline",
    date: "2023-10",
    categories: ["graphic-design"],
    url: "PROJECTS/231021_OPIUM_WAR.html",
    cover: "ARCHIVE/231021_OPIUM_WAR/COMPRESSED/CROP_3.png"
  },
  {
    title: "Do Androids Dream of Electric Sheep?",
    date: "2023-07",
    categories: ["graphic-design"],
    url: "PROJECTS/230704_ANDROIDS.html",
    cover: "ARCHIVE/230704_ANDROIDS/SELECTION/261024_DADES_THUMBNAILS.png"
  },
  {
    title: "Porcelain Hallway",
    date: "2022-08",
    categories: ["image"],
    url: "PROJECTS/220808_PORCELAIN_HALLWAY.html",
    cover: "ARCHIVE/220808_PORCELAIN_HALLWAY/COMPRESSED/1_PORCELAIN.png"
  },
  {
    title: "Fish Helmet, GCSE",
    date: "2021-02",
    categories: ["installations"],
    url: "",
    cover: "ARCHIVE/210201_FISH_HELMET/COMPRESSED/IMG_4818.png"
  }
];