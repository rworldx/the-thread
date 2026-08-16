import { z } from "zod";
import { TitleSource } from "./schema";

/**
 * THE CORPUS.
 *
 * Migrated 1:1 from the source document — ONE NODE PER LINE. Where the source
 * lists seasons separately (Loki season 1, Loki season 2) they are separate
 * nodes, because they sit at different points in the order. Where it lists a
 * range ("Agents of S.H.I.E.L.D. season 1 – season 7") it is one node covering
 * seasons 1–7, because nobody navigates that show by season.
 *
 * `releaseDate` carries only the year the source gave. `scripts/sync-tmdb.ts`
 * upgrades every one to a full ISO date and fills `runtimeMin`, `tmdbId`,
 * `posterPath`, `posterTint`, and a seed `spoilerSafe`. Until it runs, the
 * `Title` gate in schema.ts refuses to build. That is deliberate.
 *
 * The four `(((...)))` markers in the source are encoded as cross-universe
 * `requires` edges plus an `editorNote`. They are the only four editor's notes
 * in the corpus, and `lib/validate.ts` rule B11 keeps it that way.
 */

type Draft = z.input<typeof TitleSource>;

// ---------------------------------------------------------------------------
// Marvel Cinematic Universe — The Infinity Saga
// ---------------------------------------------------------------------------

const phase1: Draft[] = [
  {
    id: "iron-man",
    titleEn: "Iron Man",
    titleAr: "الرجل الحديدي",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 1,
    releaseDate: "2008",
    storyYear: 2010,
    essential: true,
  },
  {
    id: "the-incredible-hulk",
    titleEn: "The Incredible Hulk",
    titleAr: "هالك المذهل",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 1,
    releaseDate: "2008",
    storyYear: 2011,
    optional: true,
  },
  {
    id: "iron-man-2",
    titleEn: "Iron Man 2",
    titleAr: "الرجل الحديدي 2",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 1,
    releaseDate: "2010",
    storyYear: 2011,
    essential: true,
    requires: ["iron-man"],
  },
  {
    id: "thor",
    titleEn: "Thor",
    titleAr: "ثور",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 1,
    releaseDate: "2011",
    storyYear: 2011,
    essential: true,
  },
  {
    id: "captain-america-the-first-avenger",
    titleEn: "Captain America: The First Avenger",
    titleAr: "كابتن أمريكا: المنتقم الأول",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 1,
    releaseDate: "2011",
    storyYear: 1943,
    essential: true,
  },
  {
    id: "the-avengers",
    titleEn: "The Avengers",
    titleAr: "المنتقمون",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 1,
    releaseDate: "2012",
    storyYear: 2012,
    essential: true,
    requires: [
      "iron-man",
      "iron-man-2",
      "thor",
      "captain-america-the-first-avenger",
    ],
    // Hulk is skippable per the source, so it stays a soft edge — otherwise it
    // would drag a non-essential title onto the spine and trip rule B10.
    enriches: ["the-incredible-hulk"],
  },
];

const phase2: Draft[] = [
  {
    id: "iron-man-3",
    titleEn: "Iron Man 3",
    titleAr: "الرجل الحديدي 3",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2013",
    storyYear: 2012,
    essential: true,
    requires: ["iron-man-2", "the-avengers"],
  },
  {
    id: "thor-the-dark-world",
    titleEn: "Thor: The Dark World",
    titleAr: "ثور: العالم المظلم",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2013",
    storyYear: 2013,
    essential: true,
    requires: ["thor", "the-avengers"],
  },
  {
    id: "captain-america-the-winter-soldier",
    titleEn: "Captain America: The Winter Soldier",
    titleAr: "كابتن أمريكا: جندي الشتاء",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2014",
    storyYear: 2014,
    essential: true,
    requires: ["captain-america-the-first-avenger", "the-avengers"],
  },
  {
    id: "guardians-of-the-galaxy",
    titleEn: "Guardians of the Galaxy",
    titleAr: "حراس المجرة",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2014",
    storyYear: 2014,
    essential: true,
  },
  {
    id: "avengers-age-of-ultron",
    titleEn: "Avengers: Age of Ultron",
    titleAr: "المنتقمون: عصر ألترون",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2015",
    storyYear: 2015,
    essential: true,
    requires: [
      "the-avengers",
      "iron-man-3",
      "thor-the-dark-world",
      "captain-america-the-winter-soldier",
    ],
  },
  {
    id: "ant-man",
    titleEn: "Ant-Man",
    titleAr: "الرجل النملة",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2015",
    storyYear: 2015,
    essential: true,
    requires: ["avengers-age-of-ultron"],
  },
];

const phase3: Draft[] = [
  {
    id: "captain-america-civil-war",
    titleEn: "Captain America: Civil War",
    titleAr: "كابتن أمريكا: الحرب الأهلية",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2016",
    storyYear: 2016,
    essential: true,
    requires: ["avengers-age-of-ultron", "captain-america-the-winter-soldier"],
  },
  {
    id: "doctor-strange",
    titleEn: "Doctor Strange",
    titleAr: "دكتور سترينج",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2016",
    storyYear: 2016,
    essential: true,
  },
  {
    id: "spider-man-homecoming",
    titleEn: "Spider-Man: Homecoming",
    titleAr: "سبايدر مان: العودة للوطن",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2017",
    storyYear: 2016,
    essential: true,
    requires: ["captain-america-civil-war"],
  },
  {
    id: "guardians-of-the-galaxy-vol-2",
    titleEn: "Guardians of the Galaxy Vol. 2",
    titleAr: "حراس المجرة: الجزء الثاني",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2017",
    storyYear: 2014,
    essential: true,
    requires: ["guardians-of-the-galaxy"],
  },
  {
    id: "thor-ragnarok",
    titleEn: "Thor: Ragnarok",
    titleAr: "ثور: راجناروك",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2017",
    storyYear: 2017,
    essential: true,
    requires: [
      "thor-the-dark-world",
      "avengers-age-of-ultron",
      "doctor-strange",
    ],
  },
  {
    id: "black-panther",
    titleEn: "Black Panther",
    titleAr: "النمر الأسود",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2018",
    storyYear: 2016,
    essential: true,
    requires: ["captain-america-civil-war"],
  },
  {
    id: "avengers-infinity-war",
    titleEn: "Avengers: Infinity War",
    titleAr: "المنتقمون: حرب اللانهاية",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2018",
    storyYear: 2018,
    essential: true,
    requires: [
      "thor-ragnarok",
      "black-panther",
      "doctor-strange",
      "guardians-of-the-galaxy-vol-2",
      "spider-man-homecoming",
    ],
  },
  {
    id: "ant-man-and-the-wasp",
    titleEn: "Ant-Man and the Wasp",
    titleAr: "الرجل النملة والدبورة",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2018",
    storyYear: 2018,
    essential: true,
    requires: ["ant-man", "captain-america-civil-war"],
  },
  {
    id: "captain-marvel",
    titleEn: "Captain Marvel",
    titleAr: "كابتن مارفل",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2019",
    storyYear: 1995,
    essential: true,
  },
  {
    id: "avengers-endgame",
    titleEn: "Avengers: Endgame",
    titleAr: "المنتقمون: نهاية اللعبة",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2019",
    storyYear: 2023,
    essential: true,
    requires: [
      "avengers-infinity-war",
      "ant-man-and-the-wasp",
      "captain-marvel",
    ],
    // Hand-authored by the Arabic review — replacing the ar-SA seed.
    context: {
      ar: "المنتقمون يواجهون عواقب ما حدث، ويحاولون إيجاد طريق لإصلاح ما فُقد.",
    },
  },
  {
    id: "spider-man-far-from-home",
    titleEn: "Spider-Man: Far From Home",
    titleAr: "سبايدر مان: بعيدًا عن الوطن",
    type: "film",
    universe: "mcu",
    saga: "infinity",
    phase: 3,
    releaseDate: "2019",
    storyYear: 2024,
    essential: true,
    requires: ["avengers-endgame", "spider-man-homecoming"],
  },
];

// ---------------------------------------------------------------------------
// MCU — The Multiverse Saga
// ---------------------------------------------------------------------------

const phase4: Draft[] = [
  {
    id: "wandavision-s1",
    titleEn: "WandaVision: Season 1",
    titleAr: "واندافيجن: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2023,
    seasons: [1],
    showId: "wandavision",
    requires: ["avengers-endgame"],
  },
  {
    id: "the-falcon-and-the-winter-soldier-s1",
    titleEn: "The Falcon and the Winter Soldier: Season 1",
    titleAr: "الفالكون وجندي الشتاء: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2024,
    seasons: [1],
    showId: "the-falcon-and-the-winter-soldier",
    requires: ["avengers-endgame", "captain-america-the-winter-soldier"],
    // Hand-authored by the Arabic review — replacing the ar-SA seed.
    context: {
      ar: "سام ويلسون وباكي بارنز يجدان نفسيهما أمام مسؤولية جديدة، وسط عالم يحاول التعافي.",
    },
  },
  {
    id: "loki-s1",
    titleEn: "Loki: Season 1",
    titleAr: "لوكي: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2012,
    seasons: [1],
    showId: "loki",
    requires: ["avengers-endgame"],
  },
  {
    id: "black-widow",
    titleEn: "Black Widow",
    titleAr: "الأرملة السوداء",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2016,
    requires: ["captain-america-civil-war"],
  },
  {
    id: "what-if-s1",
    titleEn: "What If…?: Season 1",
    titleAr: "ماذا لو…؟: الموسم الأول",
    type: "animation",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2023,
    seasons: [1],
    showId: "what-if",
    requires: ["avengers-endgame", "loki-s1"],
  },
  {
    id: "shang-chi-and-the-legend-of-the-ten-rings",
    titleEn: "Shang-Chi and the Legend of the Ten Rings",
    titleAr: "شانغ تشي وأسطورة الحلقات العشر",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2024,
    requires: ["avengers-endgame"],
  },
  {
    id: "eternals",
    titleEn: "Eternals",
    titleAr: "الخالدون",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2024,
    /* NOT a requirement. The Blip is why the world looks the way it does when
       they finally step out of it, which is a fact about the timeline rather
       than something you need in order to follow the film — it opens on the
       creation of the Earth and explains itself from there. Kept as a
       recommendation so the "+ Recommended" toggle still offers Endgame.
       See MCU_STANDALONE in lib/graph.ts. */
    requires: [],
    enriches: ["avengers-endgame"],
  },
  {
    id: "hawkeye-s1",
    titleEn: "Hawkeye: Season 1",
    titleAr: "هوك آي: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2024,
    seasons: [1],
    showId: "hawkeye",
    requires: ["avengers-endgame", "black-widow"],
    // Hand-authored by the Arabic review — replacing the ar-SA seed.
    context: {
      ar: "رامي سهام متمرس يلتقي بشابة تحمل طموحًا كبيرًا، خلال فترة الأعياد في نيويورك.",
    },
  },

  // ((( before the next film watch spider-man (andrew & toby) movies
  //     - optional watch daredevil season 1 )))
  {
    id: "spider-man-no-way-home",
    titleEn: "Spider-Man: No Way Home",
    titleAr: "سبايدر مان: لا مجال للعودة",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2021",
    storyYear: 2024,
    requires: [
      "spider-man-far-from-home",
      "doctor-strange",
      "spider-man",
      "spider-man-2",
      "spider-man-3",
      "the-amazing-spider-man",
      "the-amazing-spider-man-2",
    ],
    enriches: ["daredevil-s1"],
    editorNote: {
      en: "Before this one: the Tobey Maguire and Andrew Garfield Spider-Man films. Daredevil Season 1 is optional.",
      ar: "قبل هذا الفيلم: أفلام سبايدرمان لتوبي ماغواير وأندرو غارفيلد. الموسم الأول من ديرديفل اختياري.",
      mentions: ["spider-man", "spider-man-2", "spider-man-3", "the-amazing-spider-man", "the-amazing-spider-man-2", "daredevil-s1"],
    },
  },
  {
    id: "moon-knight-s1",
    titleEn: "Moon Knight: Season 1",
    titleAr: "فارس القمر: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
    seasons: [1],
    showId: "moon-knight",
  },

  // ((( before the next film watch x-men & fantastic four movies
  //     - optional watch inhumans season 1 )))
  {
    id: "doctor-strange-in-the-multiverse-of-madness",
    titleEn: "Doctor Strange in the Multiverse of Madness",
    titleAr: "دكتور سترينج في تعدد الأكوان",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
    // The source puts the X-Men / Fantastic Four instruction in a parenthetical
    // aside, not in the list — so they are recommendations, not homework.
    // Twelve hard prerequisites for a Professor X cameo is precisely the thing
    // this site exists to prevent.
    requires: [
      "doctor-strange",
      "wandavision-s1",
      "spider-man-no-way-home",
      "what-if-s1",
    ],
    enriches: [
      "marvels-inhumans",
      // the X-Men films
      "x-men",
      "x2",
      "x-men-the-last-stand",
      "x-men-first-class",
      "x-men-days-of-future-past",
      "x-men-apocalypse",
      "x-men-dark-phoenix",
      "x-men-origins-wolverine",
      "the-wolverine",
      // the Fantastic Four films
      "fantastic-four-2005",
      "fantastic-four-rise-of-the-silver-surfer",
      "fantastic-four-2015",
    ],
    editorNote: {
      en: "Before this one: the X-Men and Fantastic Four films. Inhumans Season 1 is optional.",
      ar: "قبل هذا الفيلم: أفلام إكس مِن والأربعة الرائعون. الموسم الأول من إنهيومانز اختياري.",
      mentions: [
        "x-men",
        "x2",
        "x-men-the-last-stand",
        "x-men-origins-wolverine",
        "x-men-first-class",
        "the-wolverine",
        "x-men-days-of-future-past",
        "deadpool",
        "x-men-apocalypse",
        "logan",
        "deadpool-2",
        "x-men-dark-phoenix",
        "the-new-mutants",
        "fantastic-four-2005",
        "fantastic-four-rise-of-the-silver-surfer",
        "fantastic-four-2015",
        "marvels-inhumans",
      ],
    },
  },
  {
    id: "ms-marvel-s1",
    titleEn: "Ms. Marvel: Season 1",
    titleAr: "مِس مارفل: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
    seasons: [1],
    showId: "ms-marvel",
    requires: ["captain-marvel"],
  },
  {
    id: "thor-love-and-thunder",
    titleEn: "Thor: Love and Thunder",
    titleAr: "ثور: الحب والرعد",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
    requires: ["thor-ragnarok", "avengers-endgame"],
  },
  {
    id: "the-guardians-of-the-galaxy-holiday-special",
    titleEn: "The Guardians of the Galaxy Holiday Special",
    titleAr: "حراس المجرة: عرض العطلة الخاص",
    type: "special",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
    requires: ["guardians-of-the-galaxy-vol-2", "avengers-endgame"],
  },
  {
    id: "i-am-groot-s1",
    titleEn: "I Am Groot: Season 1",
    titleAr: "أنا جروت: الموسم الأول",
    type: "animation",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
    seasons: [1],
    showId: "i-am-groot",
    requires: ["guardians-of-the-galaxy-vol-2"],
  },
  {
    id: "she-hulk-attorney-at-law-s1",
    titleEn: "She-Hulk: Attorney at Law: Season 1",
    titleAr: "شي-هالك: محامية",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
    seasons: [1],
    showId: "she-hulk-attorney-at-law",
    requires: ["avengers-endgame", "shang-chi-and-the-legend-of-the-ten-rings"],
    enriches: ["the-incredible-hulk", "daredevil-s1"],
    // A fifth note, and not from a source marker: widening B11 to cover
    // `enriches` surfaced that this episode brings Daredevil in from the
    // Netflix universe. By the rule's own logic that is a detour and gets a box.
    editorNote: {
      en: "Daredevil turns up here. His Netflix season 1 is worth seeing first, but it is not required.",
      ar: "يظهر ديرديفل في هذا المسلسل. يُستحسن مشاهدة موسمه الأول على نتفليكس أولاً، لكنه ليس شرطًا.",
      mentions: ["daredevil-s1"],
    },
  },
  {
    id: "werewolf-by-night",
    titleEn: "Werewolf by Night",
    titleAr: "المستذئب",
    type: "special",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
  },
  {
    id: "black-panther-wakanda-forever",
    titleEn: "Black Panther: Wakanda Forever",
    titleAr: "النمر الأسود: واكاندا إلى الأبد",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 4,
    releaseDate: "2022",
    storyYear: 2025,
    requires: ["black-panther", "avengers-endgame"],
  },
];

const phase5: Draft[] = [
  {
    id: "ant-man-and-the-wasp-quantumania",
    titleEn: "Ant-Man and the Wasp: Quantumania",
    titleAr: "الرجل النملة والدبورة: كوانتومانيا",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2023",
    storyYear: 2026,
    requires: ["ant-man-and-the-wasp", "loki-s1", "avengers-endgame"],
  },
  {
    id: "guardians-of-the-galaxy-vol-3",
    titleEn: "Guardians of the Galaxy Vol. 3",
    titleAr: "حراس المجرة: الجزء الثالث",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2023",
    storyYear: 2025,
    requires: [
      "guardians-of-the-galaxy-vol-2",
      "the-guardians-of-the-galaxy-holiday-special",
    ],
  },
  {
    id: "secret-invasion-s1",
    titleEn: "Secret Invasion: Season 1",
    titleAr: "الغزو السري: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2023",
    storyYear: 2026,
    seasons: [1],
    showId: "secret-invasion",
    requires: ["captain-marvel", "the-falcon-and-the-winter-soldier-s1"],
  },
  {
    id: "i-am-groot-s2",
    titleEn: "I Am Groot: Season 2",
    titleAr: "أنا جروت: الموسم الثاني",
    type: "animation",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2023",
    storyYear: 2025,
    seasons: [2],
    showId: "i-am-groot",
    requires: ["i-am-groot-s1"],
  },
  {
    id: "loki-s2",
    titleEn: "Loki: Season 2",
    titleAr: "لوكي: الموسم الثاني",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2023",
    storyYear: 2012,
    seasons: [2],
    showId: "loki",
    requires: ["loki-s1", "ant-man-and-the-wasp-quantumania"],
  },
  {
    id: "the-marvels",
    titleEn: "The Marvels",
    titleAr: "ذا مارفلز",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2023",
    storyYear: 2026,
    requires: [
      "captain-marvel",
      "ms-marvel-s1",
      "secret-invasion-s1",
      "wandavision-s1",
    ],
  },
  {
    id: "what-if-s2",
    titleEn: "What If…?: Season 2",
    titleAr: "ماذا لو…؟: الموسم الثاني",
    type: "animation",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2023",
    storyYear: 2023,
    seasons: [2],
    showId: "what-if",
    requires: ["what-if-s1"],
  },

  // ((( before watch the next show watch all the defenders saga )))
  {
    id: "echo-s1",
    titleEn: "Echo: Season 1",
    titleAr: "إيكو: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2024",
    storyYear: 2025,
    seasons: [1],
    showId: "echo",
    requires: [
      "hawkeye-s1",
      "daredevil-s1",
      "jessica-jones-s1",
      "daredevil-s2",
      "luke-cage-s1",
      "iron-fist-s1",
      "the-defenders-s1",
      "the-punisher-s1",
      "jessica-jones-s2",
      "luke-cage-s2",
      "iron-fist-s2",
      "daredevil-s3",
      "the-punisher-s2",
      "jessica-jones-s3",
    ],
    editorNote: {
      en: "Before this one: the whole Defenders saga. Thirteen seasons, Daredevil through Jessica Jones.",
      ar: "قبل هذا المسلسل: ملحمة الدفاع كاملة. ثلاثة عشر موسمًا، من ديرديفل إلى جيسيكا جونز.",
      mentions: [
        "daredevil-s1",
        "jessica-jones-s1",
        "daredevil-s2",
        "luke-cage-s1",
        "iron-fist-s1",
        "the-defenders-s1",
        "the-punisher-s1",
        "jessica-jones-s2",
        "luke-cage-s2",
        "iron-fist-s2",
        "daredevil-s3",
        "the-punisher-s2",
        "jessica-jones-s3",
      ],
    },
  },

  // ((( optional before watch the next movie watch electra & blade movies )))
  {
    id: "deadpool-and-wolverine",
    titleEn: "Deadpool & Wolverine",
    titleAr: "ديدبول وولفرين",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2024",
    storyYear: 2014,
    requires: [
      "deadpool",
      "deadpool-2",
      "logan",
      "loki-s2",
      "avengers-endgame",
    ],
    enriches: [
      "elektra",
      "blade",
      "blade-ii",
      "blade-trinity",
      "the-new-mutants",
      "x-men-origins-wolverine",
    ],
    editorNote: {
      en: "Before this one: the Deadpool films and Logan. The Elektra and Blade films are optional.",
      ar: "قبل هذا الفيلم: فيلما ديدبول ولوجان. أفلام إلكترا وبليد اختيارية.",
      mentions: [
        "deadpool",
        "deadpool-2",
        "x-men-origins-wolverine",
        "the-wolverine",
        "logan",
        "elektra",
        "blade",
        "blade-ii",
        "blade-trinity",
      ],
    },
  },
  {
    id: "agatha-all-along-s1",
    titleEn: "Agatha All Along: Season 1",
    titleAr: "أغاثا طوال الوقت: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2024",
    storyYear: 2026,
    seasons: [1],
    showId: "agatha-all-along",
    requires: ["wandavision-s1"],
  },
  {
    id: "what-if-s3",
    titleEn: "What If…?: Season 3",
    titleAr: "ماذا لو…؟: الموسم الثالث",
    type: "animation",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2024",
    storyYear: 2023,
    seasons: [3],
    showId: "what-if",
    requires: ["what-if-s2"],
  },
  {
    id: "your-friendly-neighborhood-spider-man",
    titleEn: "Your Friendly Neighborhood Spider-Man",
    titleAr: "سبايدر مان الودود",
    type: "animation",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2025",
    storyYear: 2016,
    seasons: [1],
    showId: "your-friendly-neighborhood-spider-man",
  },
  {
    id: "captain-america-brave-new-world",
    titleEn: "Captain America: Brave New World",
    titleAr: "كابتن أمريكا: عالم جديد شجاع",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2025",
    storyYear: 2027,
    // Hulk is a soft edge here for the same reason it is on the-avengers: it is
    // marked skippable, the thread draws it dashed, and a hard requirement on a
    // title we tell people to skip is a trap (rule `optional-with-dependents`).
    requires: ["the-falcon-and-the-winter-soldier-s1", "eternals"],
    enriches: ["the-incredible-hulk"],
  },
  {
    id: "daredevil-born-again-s1",
    titleEn: "Daredevil: Born Again, Season 1",
    titleAr: "ديرديفل: ولادة جديدة، الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2025",
    storyYear: 2026,
    seasons: [1],
    showId: "daredevil-born-again",
    // Echo already pulls the entire Defenders saga in, so this stays a
    // same-universe edge and the corpus keeps exactly four editor's notes.
    requires: ["echo-s1"],
  },
  {
    id: "thunderbolts",
    titleEn: "Thunderbolts*",
    titleAr: "ثاندربولتس*",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2025",
    storyYear: 2027,
    requires: [
      "the-falcon-and-the-winter-soldier-s1",
      "black-widow",
      "ant-man-and-the-wasp-quantumania",
    ],
  },
  {
    id: "ironheart-s1",
    titleEn: "Ironheart: Season 1",
    titleAr: "أيرونهارت: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 5,
    releaseDate: "2025",
    storyYear: 2026,
    seasons: [1],
    showId: "ironheart",
    requires: ["black-panther-wakanda-forever"],
  },
];

const phase6: Draft[] = [
  {
    id: "the-fantastic-four-first-steps",
    titleEn: "The Fantastic Four: First Steps",
    titleAr: "الأربعة الرائعون: الخطوات الأولى",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2025",
    storyYear: 1964,
  },
  {
    id: "eyes-of-wakanda-s1",
    titleEn: "Eyes of Wakanda: Season 1",
    titleAr: "عيون واكاندا: الموسم الأول",
    type: "animation",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2025",
    storyYear: -1000,
    seasons: [1],
    showId: "eyes-of-wakanda",
    requires: ["black-panther"],
  },
  {
    id: "marvel-zombies-s1",
    titleEn: "Marvel Zombies: Season 1",
    titleAr: "مارفل زومبيز: الموسم الأول",
    type: "animation",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2025",
    storyYear: 2023,
    seasons: [1],
    showId: "marvel-zombies",
    requires: ["what-if-s3"],
  },
  {
    id: "wonder-man-s1",
    titleEn: "Wonder Man: Season 1",
    titleAr: "وندر مان: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2026",
    storyYear: 2027,
    seasons: [1],
    showId: "wonder-man",
  },
  {
    id: "daredevil-born-again-s2",
    titleEn: "Daredevil: Born Again, Season 2",
    titleAr: "ديرديفل: ولادة جديدة، الموسم الثاني",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    // Ran 2026-03-24 to 2026-05-05. The corpus had 2025, which was wrong.
    releaseDate: "2026-03-24",
    storyYear: 2027,
    seasons: [2],
    showId: "daredevil-born-again",
    requires: ["daredevil-born-again-s1"],
  },
  {
    id: "the-punisher-one-last-kill",
    titleEn: "The Punisher: One Last Kill",
    titleAr: "المعاقب: آخر عملية قتل",
    type: "special",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2026",
    storyYear: 2027,
    requires: ["daredevil-born-again-s2"],
  },
  {
    /** 2026-12-18. Delayed from May 2026 to the December window. */
    id: "avengers-doomsday",
    titleEn: "Avengers: Doomsday",
    titleAr: "المنتقمون: يوم الحساب",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2026-12-18",
    storyYear: 2028,
    requires: ["avengers-endgame", "the-fantastic-four-first-steps"],
    enriches: ["loki-s2", "deadpool-and-wolverine"],
  },
  {
    /** 2027-12-17. */
    id: "avengers-secret-wars",
    titleEn: "Avengers: Secret Wars",
    titleAr: "المنتقمون: حروب سرية",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2027-12-17",
    storyYear: 2028,
    requires: ["avengers-doomsday"],
  },
  /**
   * ANNOUNCED AT COMIC-CON 2026, and carried by Reuters, CBC and others the
   * same day — which is the bar for putting an unmade film in a corpus that
   * refuses invented data. What is confirmed is the title, the director, the
   * lead and the window. What is NOT confirmed is the rest of the cast, so
   * neither has a character list, and both will fill themselves in from the
   * credits the moment TMDB has them.
   */
  {
    id: "black-panther-3",
    titleEn: "Black Panther 3",
    titleAr: "النمر الأسود 3",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2028-12-15",
    requires: ["black-panther-wakanda-forever"],
  },
  {
    id: "ghost-rider-2028",
    titleEn: "Ghost Rider",
    titleAr: "غوست رايدر",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    /* No date beyond the year, so the first of it — the sync will correct
       this the moment Marvel names a day. */
    releaseDate: "2028-01-01",
  },
  {
    /** Disney+, 2026-10-14. Marvel Studios, not Marvel Television. */
    id: "visionquest",
    titleEn: "VisionQuest: Season 1",
    titleAr: "رحلة فيجن: الموسم الأول",
    type: "season",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2026-10-14",
    storyYear: 2027,
    seasons: [1],
    showId: "visionquest",
    requires: ["wandavision-s1"],
    enriches: ["avengers-age-of-ultron"],
  },
  {
    id: "spider-man-brand-new-day",
    titleEn: "Spider-Man: Brand New Day",
    titleAr: "سبايدر مان: يوم جديد تمامًا",
    type: "film",
    universe: "mcu",
    saga: "multiverse",
    phase: 6,
    releaseDate: "2026",
    storyYear: 2027,
    requires: ["spider-man-no-way-home"],
  },
];

// ---------------------------------------------------------------------------
// Sony
// ---------------------------------------------------------------------------

const sony: Draft[] = [
  {
    id: "spider-man",
    titleEn: "Spider-Man",
    titleAr: "سبايدر مان",
    type: "film",
    universe: "sony",
    releaseDate: "2002",
  },
  {
    id: "spider-man-2",
    titleEn: "Spider-Man 2",
    titleAr: "سبايدر مان 2",
    type: "film",
    universe: "sony",
    releaseDate: "2004",
    requires: ["spider-man"],
  },
  {
    id: "spider-man-3",
    titleEn: "Spider-Man 3",
    titleAr: "سبايدر مان 3",
    type: "film",
    universe: "sony",
    releaseDate: "2007",
    requires: ["spider-man-2"],
  },
  {
    id: "the-amazing-spider-man",
    titleEn: "The Amazing Spider-Man",
    titleAr: "سبايدر مان المذهل",
    type: "film",
    universe: "sony",
    releaseDate: "2013",
  },
  {
    id: "the-amazing-spider-man-2",
    titleEn: "The Amazing Spider-Man 2",
    titleAr: "سبايدر مان المذهل 2",
    type: "film",
    universe: "sony",
    releaseDate: "2014",
    requires: ["the-amazing-spider-man"],
  },
  {
    id: "spider-man-into-the-spider-verse",
    titleEn: "Spider-Man: Into the Spider-Verse",
    titleAr: "سبايدر مان: عبر عالم العنكبوت",
    type: "animation",
    universe: "sony",
    releaseDate: "2018",
  },
  {
    id: "spider-man-across-the-spider-verse",
    titleEn: "Spider-Man: Across the Spider-Verse",
    titleAr: "سبايدر مان: عبر عوالم العنكبوت",
    type: "animation",
    universe: "sony",
    releaseDate: "2023",
    requires: ["spider-man-into-the-spider-verse"],
  },
  {
    /* June 25 2027, moved back three weeks from June 4 — reported by CinemaCon
       coverage and confirmed since. The trilogy's last part. */
    id: "spider-man-beyond-the-spider-verse",
    titleEn: "Spider-Man: Beyond the Spider-Verse",
    titleAr: "سبايدر مان: ما وراء عالم العنكبوت",
    type: "animation",
    universe: "sony",
    releaseDate: "2027-06-25",
    requires: ["spider-man-across-the-spider-verse"],
  },
  {
    id: "spider-noir-s1",
    titleEn: "Spider-Noir: Season 1",
    titleAr: "سبايدر نوار: الموسم الأول",
    type: "season",
    universe: "sony",
    releaseDate: "2026",
    seasons: [1],
    showId: "spider-noir",
  },
  {
    id: "venom",
    titleEn: "Venom",
    titleAr: "فينوم",
    type: "film",
    universe: "sony",
    releaseDate: "2018",
  },
  {
    id: "venom-let-there-be-carnage",
    titleEn: "Venom: Let There Be Carnage",
    titleAr: "فينوم: ليكن هناك مجزرة",
    type: "film",
    universe: "sony",
    releaseDate: "2021",
    requires: ["venom"],
  },
  {
    id: "venom-the-last-dance",
    titleEn: "Venom: The Last Dance",
    titleAr: "فينوم: الرقصة الأخيرة",
    type: "film",
    universe: "sony",
    releaseDate: "2024",
    requires: ["venom-let-there-be-carnage"],
  },
  {
    id: "morbius",
    titleEn: "Morbius",
    titleAr: "موربيوس",
    type: "film",
    universe: "sony",
    releaseDate: "2022",
  },
  {
    id: "madame-web",
    titleEn: "Madame Web",
    titleAr: "مدام ويب",
    type: "film",
    universe: "sony",
    releaseDate: "2024",
  },
  {
    id: "kraven-the-hunter",
    titleEn: "Kraven the Hunter",
    titleAr: "كرافين الصياد",
    type: "film",
    universe: "sony",
    releaseDate: "2024",
  },
];

// ---------------------------------------------------------------------------
// Fox — Fantastic Four
// ---------------------------------------------------------------------------

const fantasticFour: Draft[] = [
  {
    id: "fantastic-four-2005",
    titleEn: "Fantastic Four",
    titleAr: "الأربعة الرائعون",
    type: "film",
    universe: "fox",
    releaseDate: "2005",
    storyRank: 1,
  },
  {
    id: "fantastic-four-rise-of-the-silver-surfer",
    titleEn: "Fantastic Four: Rise of the Silver Surfer",
    titleAr: "الأربعة الرائعون: صعود المتزلج الفضي",
    type: "film",
    universe: "fox",
    releaseDate: "2007",
    storyRank: 2,
    requires: ["fantastic-four-2005"],
  },
  {
    id: "fantastic-four-2015",
    titleEn: "Fantastic Four",
    titleAr: "الأربعة الرائعون",
    type: "film",
    universe: "fox",
    releaseDate: "2015",
    storyRank: 3,
  },
];

// ---------------------------------------------------------------------------
// The Defenders Saga
// ---------------------------------------------------------------------------

const defenders: Draft[] = [
  {
    id: "daredevil-s1",
    titleEn: "Daredevil: Season 1",
    titleAr: "ديرديفل: الموسم الأول",
    type: "season",
    universe: "defenders",
    releaseDate: "2015",
    seasons: [1],
    showId: "daredevil",
  },
  {
    id: "jessica-jones-s1",
    titleEn: "Jessica Jones: Season 1",
    titleAr: "جيسيكا جونز: الموسم الأول",
    type: "season",
    universe: "defenders",
    releaseDate: "2015",
    seasons: [1],
    showId: "jessica-jones",
  },
  {
    id: "daredevil-s2",
    titleEn: "Daredevil: Season 2",
    titleAr: "ديرديفل: الموسم الثاني",
    type: "season",
    universe: "defenders",
    releaseDate: "2016",
    seasons: [2],
    showId: "daredevil",
    requires: ["daredevil-s1"],
  },
  {
    id: "luke-cage-s1",
    titleEn: "Luke Cage: Season 1",
    titleAr: "لوك كيج: الموسم الأول",
    type: "season",
    universe: "defenders",
    releaseDate: "2016",
    seasons: [1],
    showId: "luke-cage",
    requires: ["jessica-jones-s1"],
  },
  {
    id: "iron-fist-s1",
    titleEn: "Iron Fist: Season 1",
    titleAr: "آيرون فيست: الموسم الأول",
    type: "season",
    universe: "defenders",
    releaseDate: "2017",
    seasons: [1],
    showId: "iron-fist",
  },
  {
    id: "the-defenders-s1",
    titleEn: "The Defenders: Season 1",
    titleAr: "المدافعون: الموسم الأول",
    type: "season",
    universe: "defenders",
    releaseDate: "2017",
    seasons: [1],
    showId: "the-defenders",
    requires: [
      "daredevil-s2",
      "jessica-jones-s1",
      "luke-cage-s1",
      "iron-fist-s1",
    ],
  },
  {
    id: "the-punisher-s1",
    titleEn: "The Punisher: Season 1",
    titleAr: "المعاقب: الموسم الأول",
    type: "season",
    universe: "defenders",
    releaseDate: "2017",
    seasons: [1],
    showId: "the-punisher",
    requires: ["daredevil-s2"],
  },
  {
    id: "jessica-jones-s2",
    titleEn: "Jessica Jones: Season 2",
    titleAr: "جيسيكا جونز: الموسم الثاني",
    type: "season",
    universe: "defenders",
    releaseDate: "2018",
    seasons: [2],
    showId: "jessica-jones",
    requires: ["the-defenders-s1"],
  },
  {
    id: "luke-cage-s2",
    titleEn: "Luke Cage: Season 2",
    titleAr: "لوك كيج: الموسم الثاني",
    type: "season",
    universe: "defenders",
    releaseDate: "2018",
    seasons: [2],
    showId: "luke-cage",
    requires: ["the-defenders-s1"],
  },
  {
    id: "iron-fist-s2",
    titleEn: "Iron Fist: Season 2",
    titleAr: "آيرون فيست: الموسم الثاني",
    type: "season",
    universe: "defenders",
    releaseDate: "2018",
    seasons: [2],
    showId: "iron-fist",
    requires: ["the-defenders-s1"],
  },
  {
    id: "daredevil-s3",
    titleEn: "Daredevil: Season 3",
    titleAr: "ديرديفل: الموسم الثالث",
    type: "season",
    universe: "defenders",
    releaseDate: "2018",
    seasons: [3],
    showId: "daredevil",
    requires: ["the-defenders-s1", "the-punisher-s1"],
  },
  {
    id: "the-punisher-s2",
    titleEn: "The Punisher: Season 2",
    titleAr: "المعاقب: الموسم الثاني",
    type: "season",
    universe: "defenders",
    releaseDate: "2019",
    seasons: [2],
    showId: "the-punisher",
    requires: ["the-punisher-s1"],
  },
  {
    id: "jessica-jones-s3",
    titleEn: "Jessica Jones: Season 3",
    titleAr: "جيسيكا جونز: الموسم الثالث",
    type: "season",
    universe: "defenders",
    releaseDate: "2019",
    seasons: [3],
    showId: "jessica-jones",
    requires: ["jessica-jones-s2"],
  },
];

// ---------------------------------------------------------------------------
// Fox — X-Men, Deadpool, Wolverine
// ---------------------------------------------------------------------------

/**
 * `storyRank` here is the source document's own ordering, which for this block
 * is by EVENTS, not release: First Class → Origins: Wolverine → X-Men → X2.
 * The user reads it that way by default and can flip to release order, which
 * `releaseOrder` derives from `releaseDate` as it does everywhere else.
 *
 * These are deliberately NOT `requires` edges. First Class is not a
 * prerequisite of Origins: Wolverine — it merely comes first — and encoding a
 * reading order as a hard dependency would drag the whole block into every
 * `pathTo` result that touches any one of these films.
 */
const xmen: Draft[] = [
  {
    id: "x-men-first-class",
    titleEn: "X-Men: First Class",
    titleAr: "إكس مِن: الصف الأول",
    type: "film",
    universe: "fox",
    releaseDate: "2011",
    storyRank: 4,
  },
  {
    id: "x-men-origins-wolverine",
    titleEn: "X-Men Origins: Wolverine",
    titleAr: "إكس مِن الأصول: وولفرين",
    type: "film",
    universe: "fox",
    releaseDate: "2009",
    storyRank: 5,
  },
  {
    id: "x-men",
    titleEn: "X-Men",
    titleAr: "إكس مِن",
    type: "film",
    universe: "fox",
    releaseDate: "2000",
    storyRank: 6,
  },
  {
    id: "x2",
    titleEn: "X2",
    titleAr: "إكس 2",
    type: "film",
    universe: "fox",
    releaseDate: "2003",
    storyRank: 7,
    requires: ["x-men"],
  },
  {
    id: "x-men-the-last-stand",
    titleEn: "X-Men: The Last Stand",
    titleAr: "إكس مِن: الموقف الأخير",
    type: "film",
    universe: "fox",
    releaseDate: "2006",
    storyRank: 8,
    requires: ["x2"],
  },
  {
    id: "the-wolverine",
    titleEn: "The Wolverine",
    titleAr: "وولفرين",
    type: "film",
    universe: "fox",
    releaseDate: "2013",
    storyRank: 9,
    requires: ["x-men-the-last-stand"],
  },
  {
    id: "x-men-days-of-future-past",
    titleEn: "X-Men: Days of Future Past",
    titleAr: "إكس مِن: أيام المستقبل الماضي",
    type: "film",
    universe: "fox",
    releaseDate: "2014",
    storyRank: 10,
    requires: ["x-men-first-class", "x-men-the-last-stand", "the-wolverine"],
  },
  {
    id: "x-men-apocalypse",
    titleEn: "X-Men: Apocalypse",
    titleAr: "إكس مِن: أبوكاليبس",
    type: "film",
    universe: "fox",
    releaseDate: "2016",
    storyRank: 11,
    requires: ["x-men-days-of-future-past"],
    // Hand-authored by the Arabic review — replacing the ar-SA seed.
    context: {
      ar: "يستيقظ كائن قديم بقوة هائلة، ويجد عالمًا مختلفًا عما عرفه.",
    },
  },
  {
    id: "x-men-dark-phoenix",
    titleEn: "X-Men: Dark Phoenix",
    titleAr: "إكس مِن: العنقاء المظلمة",
    type: "film",
    universe: "fox",
    releaseDate: "2019",
    storyRank: 12,
    requires: ["x-men-apocalypse"],
  },
  {
    id: "deadpool",
    titleEn: "Deadpool",
    titleAr: "ديدبول",
    type: "film",
    universe: "fox",
    releaseDate: "2016",
    storyRank: 13,
  },
  {
    id: "deadpool-2",
    titleEn: "Deadpool 2",
    titleAr: "ديدبول 2",
    type: "film",
    universe: "fox",
    releaseDate: "2018",
    storyRank: 14,
    requires: ["deadpool"],
  },
  {
    id: "the-new-mutants",
    titleEn: "The New Mutants",
    titleAr: "المتحولون الجدد",
    type: "film",
    universe: "fox",
    releaseDate: "2020",
    storyRank: 15,
  },
  {
    id: "logan",
    titleEn: "Logan",
    titleAr: "لوجان",
    type: "film",
    universe: "fox",
    releaseDate: "2017",
    storyRank: 16,
    requires: ["x-men-days-of-future-past"],
  },
];

// ---------------------------------------------------------------------------
// Marvel series, old and new — source lists these as ranges, so one node each
// ---------------------------------------------------------------------------

const series: Draft[] = [
  {
    id: "agents-of-shield",
    titleEn: "Agents of S.H.I.E.L.D.",
    titleAr: "عملاء شيلد",
    type: "series",
    universe: "marvel-tv",
    releaseDate: "2013",
    seasons: [1, 2, 3, 4, 5, 6, 7],
    showId: "agents-of-shield",
    requires: ["captain-america-the-winter-soldier"],
    // Marvel Television, ABC, 2013. The edge into Marvel Studios' own film is
    // real and it now crosses a universe boundary, which is exactly the case an
    // editor's note exists for.
    editorNote: {
      en: "Before this one: Captain America: The Winter Soldier. Different company, same year, and season one is built to land on that film.",
      ar: "قبل هذا المسلسل: «كابتن أمريكا: جندي الشتاء». شركة مختلفة والسنة نفسها، والموسم الأول مبنيّ ليصل إلى ذلك الفيلم.",
      mentions: ["captain-america-the-winter-soldier"],
    },
  },
  {
    id: "agent-carter",
    titleEn: "Marvel's Agent Carter",
    titleAr: "العميلة كارتر",
    type: "series",
    universe: "marvel-tv",
    releaseDate: "2015",
    seasons: [1, 2],
    showId: "agent-carter",
    requires: ["captain-america-the-first-avenger"],
    editorNote: {
      en: "Before this one: Captain America: The First Avenger. Peggy Carter's story starts there, and this is Marvel Television rather than Marvel Studios.",
      ar: "قبل هذا المسلسل: «كابتن أمريكا: المنتقم الأول». قصة بيغي كارتر تبدأ هناك، وهذا العمل من إنتاج مارفل تلفيجن لا مارفل ستوديوز.",
      mentions: ["captain-america-the-first-avenger"],
    },
    // Hand-authored by the Arabic review — TMDB had no overview at all.
    context: {
      ar: "تواصل بيغي كارتر عملها بعد الحرب، في زمن لا يمنح النساء بسهولة المكانة التي يستحققنها.",
    },
  },
  {
    id: "marvels-inhumans",
    titleEn: "Marvel's Inhumans: Season 1",
    titleAr: "إنهيومانز: الموسم الأول",
    type: "season",
    universe: "marvel-tv",
    releaseDate: "2017",
    seasons: [1],
    showId: "marvels-inhumans",
    requires: ["agents-of-shield"],
    // Hand-authored by the Arabic review — TMDB had no overview at all.
    context: { ar: "عائلة ملكية ذات قدرات خاصة تواجه اضطرابًا يهدد مكانتها." },
  },
  {
    id: "runaways",
    titleEn: "Marvel's Runaways",
    titleAr: "الهاربون",
    type: "series",
    universe: "marvel-tv",
    releaseDate: "2017",
    seasons: [1, 2, 3],
    showId: "runaways",
    // Hand-authored by the Arabic review — TMDB had no overview at all.
    context: {
      ar: "مجموعة من المراهقين تكتشف أن عائلاتهم تخفي أسرارًا كبيرة.",
    },
  },
  {
    id: "cloak-and-dagger",
    titleEn: "Marvel's Cloak & Dagger",
    titleAr: "كلوك ودايجر",
    type: "series",
    universe: "marvel-tv",
    releaseDate: "2018",
    seasons: [1, 2],
    showId: "cloak-and-dagger",
    // Hand-authored by the Arabic review — TMDB had no overview at all.
    context: { ar: "شابان من خلفيتين مختلفتين تجمعهما حادثة غيّرت حياتهما." },
  },
  {
    id: "the-gifted",
    titleEn: "The Gifted",
    titleAr: "الموهوبون",
    type: "series",
    universe: "fox",
    releaseDate: "2017",
    storyRank: 17,
    seasons: [1, 2],
    showId: "the-gifted",
    // Hand-authored by the Arabic review — TMDB had no overview at all.
    context: { ar: "عائلة تهرب بعد اكتشاف قدرات غير عادية لدى أطفالها." },
  },
  {
    id: "legion",
    titleEn: "Legion",
    titleAr: "ليجن",
    type: "series",
    universe: "fox",
    releaseDate: "2017",
    storyRank: 18,
    seasons: [1, 2, 3],
    showId: "legion",
  },
];


/**
 * THE WIDER CANON — everything a person can actually sit down and watch.
 *
 * The site claims 'every film, series, one-shot and special', and at 173
 * titles that was false: the 1940s serial, the 1970s live-action run, four
 * anime series, two decades of Saturday-morning animation and a dozen more
 * were simply absent. These are all real, released, cast-carrying projects.
 *
 * NOT INCLUDED, deliberately: motion comics, LEGO specials, web shorts and
 * mockumentary shorts. None of them is a thing you watch BEFORE something
 * else, so they would add nodes with no edges — noise in a dependency graph.
 */
const widerCanon: Draft[] = [
  {
    id: "captain-america-1944",
    titleEn: "Captain America (1944)",
    titleAr: "كابتن أمريكا (1944)",
    universe: "legacy",
    releaseDate: "1944-02-05",
    /**
     * A FILM, AND PINNED, after getting this wrong twice.
     *
     * Typed as a film, a name-and-year search found nothing and its
     * 244-minute total tripped the featurette guard. Retyped as a series to
     * satisfy that, the TV endpoint handed it THE FALCON AND THE WINTER
     * SOLDIER — a 2021 show, with Anthony Mackie's cast attached to a 1944
     * serial. Both failures were the same mistake: reshaping the record to
     * suit a search instead of telling the search what the record is.
     *
     * TMDB holds it as a movie. 244 minutes is what fifteen chapters add up
     * to, and that is a fact about serials rather than a bad match.
     */
    type: "film",
    tmdbId: 106355,
    tmdbType: "movie",
    optional: true,
  },
  {
    id: "the-marvel-super-heroes-1966",
    titleEn: "The Marvel Super Heroes",
    titleAr: "أبطال مارفل الخارقون",
    type: "animation",
    universe: "animation",
    releaseDate: "1966-09-01",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "the-marvel-super-heroes-1966",
    /* PINNED. Name-and-year search resolved this to the wrong work —
       the 1978 Hulk series matched the 2008 FILM and took Edward Norton
    /* PINNED: the name alone is ambiguous across decades. */
    tmdbId: 2164,
    tmdbType: "tv",
    optional: true,
  },
  {
    id: "fantastic-four-1967",
    titleEn: "Fantastic Four (1967)",
    titleAr: "الأربعة الرائعون (1967)",
    type: "animation",
    universe: "animation",
    releaseDate: "1967-09-09",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "fantastic-four-1967",
    optional: true,
  },
  {
    id: "spider-man-1967",
    titleEn: "Spider-Man (1967)",
    titleAr: "سبايدر مان (1967)",
    type: "animation",
    universe: "animation",
    releaseDate: "1967-09-09",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "spider-man-1967",
    /* PINNED. Name-and-year search resolved this to the wrong work —
       the 1978 Hulk series matched the 2008 FILM and took Edward Norton
    /* PINNED: the name alone is ambiguous across decades. */
    tmdbId: 1482,
    tmdbType: "tv",
    optional: true,
  },
  {
    id: "spider-man-1977",
    titleEn: "Spider-Man (1977)",
    titleAr: "سبايدر مان (1977)",
    type: "film",
    universe: "legacy",
    releaseDate: "1977-09-14",
    optional: true,
  },
  {
    id: "the-amazing-spider-man-1977",
    titleEn: "The Amazing Spider-Man (1977)",
    titleAr: "سبايدر مان المذهل (1977)",
    type: "series",
    universe: "legacy",
    releaseDate: "1977-09-14",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "the-amazing-spider-man-1977",
    optional: true,
  },
  {
    id: "the-incredible-hulk-1978",
    titleEn: "The Incredible Hulk (1978)",
    titleAr: "الهالك المذهل (1978)",
    type: "series",
    universe: "legacy",
    releaseDate: "1978-11-04",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "the-incredible-hulk-1978",
    /* PINNED. Name-and-year search resolved this to the wrong work —
       the 1978 Hulk series matched the 2008 FILM and took Edward Norton
       with it. An id cannot be ambiguous. */
    tmdbId: 648,
    tmdbType: "tv",
    optional: true,
  },
  {
    id: "dr-strange-1978",
    titleEn: "Dr. Strange",
    titleAr: "الدكتور سترينج",
    type: "film",
    universe: "legacy",
    releaseDate: "1978-09-06",
    optional: true,
  },
  {
    id: "the-new-fantastic-four-1978",
    titleEn: "The New Fantastic Four",
    titleAr: "الأربعة الرائعون الجدد",
    type: "animation",
    universe: "animation",
    releaseDate: "1978-09-09",
    /* Thirteen episodes of about 22 minutes. TMDB has the series but none of its episode runtimes.
       See `runtimeFallbackMin` on the schema: a stated figure where the
       sync came back empty, kept separate from the fetched field so F7
       still holds. */
    runtimeFallbackMin: 286,
    optional: true,
  },
  {
    id: "spider-man-toei-1978",
    titleEn: "Spider-Man (Toei)",
    titleAr: "سبايدر مان (توي)",
    type: "series",
    universe: "legacy",
    releaseDate: "1978-05-17",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "spider-man-toei-1978",
    optional: true,
  },
  {
    id: "captain-america-1979",
    titleEn: "Captain America (1979)",
    titleAr: "كابتن أمريكا (1979)",
    type: "film",
    universe: "legacy",
    releaseDate: "1979-01-19",
    optional: true,
  },
  {
    id: "captain-america-ii-1979",
    titleEn: "Captain America II: Death Too Soon",
    titleAr: "كابتن أمريكا 2: موت مبكر",
    type: "film",
    universe: "legacy",
    releaseDate: "1979-11-23",
    optional: true,
  },
  {
    id: "spider-woman-1979",
    titleEn: "Spider-Woman",
    titleAr: "المرأة العنكبوت",
    type: "animation",
    universe: "animation",
    releaseDate: "1979-09-22",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "spider-woman-1979",
    optional: true,
  },
  {
    id: "fred-and-barney-meet-the-thing",
    titleEn: "Fred and Barney Meet the Thing",
    titleAr: "فريد وبارني يقابلان الثينغ",
    type: "animation",
    universe: "animation",
    releaseDate: "1979-09-08",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "fred-and-barney-meet-the-thing",
    optional: true,
  },
  {
    id: "spider-man-1981",
    titleEn: "Spider-Man (1981)",
    titleAr: "سبايدر مان (1981)",
    type: "animation",
    universe: "animation",
    releaseDate: "1981-09-12",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "spider-man-1981",
    /* PINNED. Name-and-year search resolved this to the wrong work —
       the 1978 Hulk series matched the 2008 FILM and took Edward Norton
    /* PINNED: the name alone is ambiguous across decades. */
    tmdbId: 3973,
    tmdbType: "tv",
    optional: true,
  },
  {
    id: "spider-man-amazing-friends",
    titleEn: "Spider-Man and His Amazing Friends",
    titleAr: "سبايدر مان وأصدقاؤه المذهلون",
    type: "animation",
    universe: "animation",
    releaseDate: "1981-09-12",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "spider-man-amazing-friends",
    optional: true,
  },
  {
    id: "the-incredible-hulk-1982",
    titleEn: "The Incredible Hulk (1982)",
    titleAr: "الهالك المذهل (1982)",
    type: "animation",
    universe: "animation",
    releaseDate: "1982-09-18",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "the-incredible-hulk-1982",
    /* PINNED. Name-and-year search resolved this to the wrong work —
       the 1978 Hulk series matched the 2008 FILM and took Edward Norton
       with it. An id cannot be ambiguous. */
    tmdbId: 11328,
    tmdbType: "tv",
    optional: true,
  },
  {
    id: "the-incredible-hulk-returns",
    titleEn: "The Incredible Hulk Returns",
    titleAr: "عودة الهالك المذهل",
    type: "film",
    universe: "legacy",
    releaseDate: "1988-05-22",
    optional: true,
  },
  {
    id: "the-trial-of-the-incredible-hulk",
    titleEn: "The Trial of the Incredible Hulk",
    titleAr: "محاكمة الهالك المذهل",
    type: "film",
    universe: "legacy",
    releaseDate: "1989-05-07",
    optional: true,
  },
  {
    id: "pryde-of-the-x-men",
    titleEn: "Pryde of the X-Men",
    titleAr: "كبرياء الإكس مِن",
    type: "animation",
    universe: "animation",
    releaseDate: "1989-09-16",
    /* A single 22-minute animated pilot. TMDB carries no runtime for it.
       See `runtimeFallbackMin` on the schema: a stated figure where the
       sync came back empty, kept separate from the fetched field so F7
       still holds. */
    runtimeFallbackMin: 22,
    optional: true,
  },
  {
    id: "the-death-of-the-incredible-hulk",
    titleEn: "The Death of the Incredible Hulk",
    titleAr: "موت الهالك المذهل",
    type: "film",
    universe: "legacy",
    releaseDate: "1990-02-18",
    optional: true,
  },
  {
    id: "spider-man-unlimited",
    titleEn: "Spider-Man Unlimited",
    titleAr: "سبايدر مان بلا حدود",
    type: "animation",
    universe: "animation",
    releaseDate: "1999-10-02",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "spider-man-unlimited",
    optional: true,
  },
  {
    id: "the-avengers-united-they-stand",
    titleEn: "The Avengers: United They Stand",
    titleAr: "المنتقمون: متّحدين يقفون",
    type: "animation",
    universe: "animation",
    releaseDate: "1999-10-30",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "the-avengers-united-they-stand",
    optional: true,
  },
  {
    id: "mutant-x",
    titleEn: "Mutant X",
    titleAr: "ميوتانت إكس",
    type: "series",
    universe: "legacy",
    releaseDate: "2001-10-06",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "mutant-x",
    /* PINNED. Name-and-year search resolved this to the wrong work —
       the 1978 Hulk series matched the 2008 FILM and took Edward Norton
    /* PINNED: the name alone is ambiguous across decades. */
    tmdbId: 1449,
    tmdbType: "tv",
    optional: true,
  },
  {
    id: "spider-man-2003",
    titleEn: "Spider-Man: The New Animated Series",
    titleAr: "سبايدر مان: المسلسل المتحرك الجديد",
    type: "animation",
    universe: "animation",
    releaseDate: "2003-07-11",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "spider-man-2003",
    optional: true,
  },
  {
    id: "fantastic-four-worlds-greatest-heroes",
    titleEn: "Fantastic Four: World's Greatest Heroes",
    titleAr: "الأربعة الرائعون: أعظم أبطال العالم",
    type: "animation",
    universe: "animation",
    releaseDate: "2006-09-02",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "fantastic-four-worlds-greatest-heroes",
    optional: true,
  },
  {
    id: "punisher-war-zone",
    titleEn: "Punisher: War Zone",
    titleAr: "المعاقب: منطقة حرب",
    type: "film",
    universe: "legacy",
    releaseDate: "2008-12-05",
    optional: true,
  },
  {
    id: "the-super-hero-squad-show",
    titleEn: "The Super Hero Squad Show",
    titleAr: "عرض فرقة الأبطال الخارقين",
    type: "animation",
    universe: "animation",
    releaseDate: "2009-09-14",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "the-super-hero-squad-show",
    optional: true,
  },
  {
    id: "iron-man-armored-adventures",
    titleEn: "Iron Man: Armored Adventures",
    titleAr: "الرجل الحديدي: مغامرات مدرّعة",
    type: "animation",
    universe: "animation",
    releaseDate: "2009-04-24",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "iron-man-armored-adventures",
    optional: true,
  },
  {
    id: "marvel-anime-iron-man",
    titleEn: "Marvel Anime: Iron Man",
    titleAr: "أنمي مارفل: الرجل الحديدي",
    type: "animation",
    universe: "animation",
    releaseDate: "2010-10-01",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "marvel-anime-iron-man",
    optional: true,
  },
  {
    id: "marvel-anime-wolverine",
    titleEn: "Marvel Anime: Wolverine",
    titleAr: "أنمي مارفل: وولفرين",
    type: "animation",
    universe: "animation",
    releaseDate: "2011-01-07",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "marvel-anime-wolverine",
    optional: true,
  },
  {
    id: "marvel-anime-x-men",
    titleEn: "Marvel Anime: X-Men",
    titleAr: "أنمي مارفل: إكس مِن",
    type: "animation",
    universe: "animation",
    releaseDate: "2011-04-01",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "marvel-anime-x-men",
    optional: true,
  },
  {
    id: "marvel-anime-blade",
    titleEn: "Marvel Anime: Blade",
    titleAr: "أنمي مارفل: بليد",
    type: "animation",
    universe: "animation",
    releaseDate: "2011-07-01",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "marvel-anime-blade",
    optional: true,
  },
  {
    id: "iron-man-hulk-heroes-united",
    titleEn: "Iron Man & Hulk: Heroes United",
    titleAr: "الرجل الحديدي وهالك: أبطال متّحدون",
    type: "animation",
    universe: "animation",
    releaseDate: "2013-12-03",
    optional: true,
  },
  {
    id: "iron-man-captain-america-heroes-united",
    titleEn: "Iron Man & Captain America: Heroes United",
    titleAr: "الرجل الحديدي وكابتن أمريكا: أبطال متّحدون",
    type: "animation",
    universe: "animation",
    releaseDate: "2014-07-29",
    optional: true,
  },
  {
    id: "marvel-disk-wars-the-avengers",
    titleEn: "Marvel Disk Wars: The Avengers",
    titleAr: "حروب أقراص مارفل: المنتقمون",
    type: "animation",
    universe: "animation",
    releaseDate: "2014-04-02",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "marvel-disk-wars-the-avengers",
    optional: true,
  },
  {
    id: "marvel-super-hero-adventures-frost-fight",
    titleEn: "Marvel Super Hero Adventures: Frost Fight!",
    titleAr: "مغامرات أبطال مارفل: معركة الصقيع",
    type: "animation",
    universe: "animation",
    releaseDate: "2015-12-15",
    optional: true,
  },
  {
    id: "powers",
    titleEn: "Powers",
    titleAr: "باورز",
    type: "series",
    universe: "legacy",
    releaseDate: "2015-03-10",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "powers",
    optional: true,
  },
  {
    id: "hulk-where-monsters-dwell",
    titleEn: "Hulk: Where Monsters Dwell",
    titleAr: "هالك: حيث تسكن الوحوش",
    type: "animation",
    universe: "animation",
    releaseDate: "2016-10-21",
    optional: true,
  },
  {
    id: "marvel-future-avengers",
    titleEn: "Marvel Future Avengers",
    titleAr: "منتقمو مارفل المستقبليون",
    type: "animation",
    universe: "animation",
    releaseDate: "2017-07-01",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "marvel-future-avengers",
    optional: true,
  },
  {
    id: "avengers-black-panthers-quest",
    titleEn: "Marvel's Avengers: Black Panther's Quest",
    titleAr: "منتقمو مارفل: رحلة النمر الأسود",
    type: "animation",
    universe: "animation",
    releaseDate: "2018-09-23",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "avengers-black-panthers-quest",
    optional: true,
  },
  {
    id: "spidey-and-his-amazing-friends",
    titleEn: "Marvel's Spidey and His Amazing Friends",
    titleAr: "سبايدي وأصدقاؤه المذهلون",
    type: "animation",
    universe: "animation",
    releaseDate: "2021-08-06",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
    /* See the note above: a series needs a season to be synced as one. */
    seasons: [1],
    showId: "spidey-and-his-amazing-friends",
    optional: true,
  },
  {
    id: "moon-girl-and-devil-dinosaur",
    titleEn: "Moon Girl and Devil Dinosaur",
    titleAr: "مون غيرل وديفل ديناصور",
    type: "animation",
    universe: "animation",
    releaseDate: "2023-02-10",
    /* A SERIES, so it needs a season. Without one the sync treats a
       title as a film — searches the movie endpoint and never sums the
       per-episode runtimes, which is why 24 of these arrived with no
       runtime at all. */
    seasons: [1],
    showId: "moon-girl-and-devil-dinosaur",
    optional: true,
  },
];

// ---------------------------------------------------------------------------
// Legacy — 1998–2011
// ---------------------------------------------------------------------------

const legacy: Draft[] = [
  {
    id: "blade",
    titleEn: "Blade",
    titleAr: "بليد",
    type: "film",
    universe: "legacy",
    releaseDate: "1998",
  },
  {
    id: "blade-ii",
    titleEn: "Blade II",
    titleAr: "بليد 2",
    type: "film",
    universe: "legacy",
    releaseDate: "2002",
    requires: ["blade"],
    // Hand-authored by the Arabic review — replacing the ar-SA seed.
    context: {
      ar: "يجد صائد مصاصي الدماء نفسه مضطرًا للتعاون مع من لا يثق بهم.",
    },
  },
  {
    id: "daredevil-2003",
    titleEn: "Daredevil",
    titleAr: "ديرديفل",
    type: "film",
    universe: "legacy",
    releaseDate: "2003",
    // Hand-authored by the Arabic review — TMDB had no overview at all.
    context: {
      ar: "محامٍ كفيف يستخدم مهاراته الخاصة لمواجهة الجريمة في المدينة.",
    },
  },
  {
    id: "hulk-2003",
    titleEn: "Hulk",
    titleAr: "هالك",
    type: "film",
    universe: "legacy",
    releaseDate: "2003",
  },
  {
    id: "blade-trinity",
    titleEn: "Blade: Trinity",
    titleAr: "بليد: الثالوث",
    type: "film",
    universe: "legacy",
    releaseDate: "2004",
    requires: ["blade-ii"],
  },
  {
    id: "the-punisher-2004",
    titleEn: "The Punisher (2004)",
    titleAr: "المعاقب (2004)",
    type: "film",
    universe: "legacy",
    releaseDate: "2004",
  },
  {
    id: "elektra",
    titleEn: "Elektra",
    titleAr: "إلكترا",
    type: "film",
    universe: "legacy",
    releaseDate: "2005",
    requires: ["daredevil-2003"],
    // Hand-authored by the Arabic review — TMDB had no overview at all.
    context: {
      ar: "قاتلة مأجورة تجد نفسها أمام مهمة تجعلها تعيد التفكير في خياراتها.",
    },
  },
  {
    id: "ghost-rider",
    titleEn: "Ghost Rider",
    titleAr: "غوست رايدر",
    type: "film",
    universe: "legacy",
    releaseDate: "2007",
  },
  {
    /**
     * A Blinky Productions short by Chris R. Notarile, 11 minutes, 2009.
     *
     * TMDB has no record of it at all, so `tmdbId` stays null and the poster,
     * the runtime and the providers come back empty. IMDb does have it, which
     * is why `imdbId` is set by hand: the ratings sync keys on that and picks
     * up the real 4.6. This is the only title in the corpus whose id is
     * hand-written, and the reason is written here so nobody deletes it as
     * clutter.
     */
    id: "elektra-the-hand-and-the-devil",
    titleEn: "Elektra: The Hand & the Devil",
    titleAr: "إلكترا: اليد والشيطان",
    type: "short",
    universe: "legacy",
    releaseDate: "2009",
    /* Eleven minutes. TMDB has no runtime for this short and IMDb does — see
       `runtimeFallbackMin` on the schema for why this is a separate field and
       not `runtimeMin`. */
    runtimeFallbackMin: 11,
    imdbId: "tt1513070",
    // Supplied by hand, because no service the sync reads has this poster.
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BYjdjZGZmOTAtYjE2OS00Zjc4LTg1NTktNzA3MDkwNTExZTJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    optional: true,
    requires: ["daredevil-2003"],
  },
  {
    id: "ghost-rider-spirit-of-vengeance",
    titleEn: "Ghost Rider: Spirit of Vengeance",
    titleAr: "غوست رايدر: روح الانتقام",
    type: "film",
    universe: "legacy",
    releaseDate: "2011",
    requires: ["ghost-rider"],
  },
];

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

const animation: Draft[] = [
  {
    id: "x-men-the-animated-series",
    titleEn: "X-Men: The Animated Series",
    titleAr: "إكس مِن: المسلسل الكرتوني",
    type: "series",
    universe: "animation",
    releaseDate: "1992",
    seasons: [1, 2, 3, 4, 5],
    showId: "x-men-animated",
    // Hand-authored by the Arabic review — TMDB had no overview at all.
    context: {
      ar: "مسلسل الرسوم المتحركة الكلاسيكي من التسعينيات الذي قدّم عالم المتحولين لجيل كامل.",
    },
  },
  {
    id: "spider-man-1994",
    titleEn: "Spider-Man: The Animated Series (1994)",
    titleAr: "سبايدر مان: المسلسل الكرتوني",
    type: "series",
    universe: "animation",
    releaseDate: "1994",
    seasons: [1, 2, 3, 4, 5],
    showId: "spider-man-1994",
  },
  {
    id: "the-spectacular-spider-man",
    titleEn: "The Spectacular Spider-Man",
    titleAr: "سبايدر مان المذهل (2008)",
    type: "series",
    universe: "animation",
    releaseDate: "2008",
    seasons: [1, 2],
    showId: "the-spectacular-spider-man",
  },
  {
    id: "ultimate-spider-man",
    titleEn: "Ultimate Spider-Man",
    titleAr: "سبايدر مان المطلق",
    type: "series",
    universe: "animation",
    releaseDate: "2012",
    seasons: [1, 2, 3, 4],
    showId: "ultimate-spider-man",
  },
  {
    id: "spider-man-2017",
    titleEn: "Spider-Man (2017)",
    titleAr: "سبايدر مان (2017)",
    type: "series",
    universe: "animation",
    releaseDate: "2017",
    seasons: [1, 2, 3],
    showId: "spider-man-2017",
  },
  {
    id: "x-men-97",
    titleEn: "X-Men '97: Season 1",
    titleAr: "إكس مِن '97: الموسم الأول",
    type: "animation",
    universe: "animation",
    releaseDate: "2024",
    seasons: [1],
    showId: "x-men-97",
    requires: ["x-men-the-animated-series"],
  },
  // -------------------------------------------------------------------------
  // Marvel Animated Features — the direct-to-video films, 2006 to 2018.
  //
  // A separate line from the series and easy to miss entirely: none of them is
  // canon to anything, several are the only animated origin a character has,
  // and Hulk Vs. is two shorts in one release. TMDB ids are hand-set because
  // several share a name with a live-action film ("Doctor Strange", "The
  // Invincible Iron Man") and the search cannot tell them apart.
  // -------------------------------------------------------------------------
  {
    id: "hulk-vs",
    titleEn: "Hulk Vs.",
    titleAr: "هالك ضد",
    type: "animation",
    universe: "animation",
    tmdbId: 394355,
    tmdbType: "movie",
    releaseDate: "2009-01-27",
    optional: true,
  },
  {
    id: "ultimate-avengers",
    titleEn: "Ultimate Avengers: The Movie",
    titleAr: "المنتقمون النهائيون",
    type: "animation",
    universe: "animation",
    tmdbId: 14609,
    tmdbType: "movie",
    releaseDate: "2006-02-21",
    optional: true,
  },
  {
    id: "ultimate-avengers-2",
    titleEn: "Ultimate Avengers 2",
    titleAr: "المنتقمون النهائيون 2",
    type: "animation",
    universe: "animation",
    tmdbId: 14611,
    tmdbType: "movie",
    releaseDate: "2006-08-08",
    optional: true,
  },
  {
    id: "planet-hulk",
    titleEn: "Planet Hulk",
    titleAr: "كوكب هالك",
    type: "animation",
    universe: "animation",
    tmdbId: 30675,
    tmdbType: "movie",
    releaseDate: "2010-02-02",
    optional: true,
  },
  {
    id: "doctor-strange-2007",
    titleEn: "Doctor Strange: The Sorcerer Supreme",
    titleAr: "دكتور سترينج: الساحر الأعظم",
    type: "animation",
    universe: "animation",
    tmdbId: 14830,
    tmdbType: "movie",
    releaseDate: "2007-08-14",
    optional: true,
  },
  {
    id: "next-avengers",
    titleEn: "Next Avengers: Heroes of Tomorrow",
    titleAr: "المنتقمون القادمون",
    type: "animation",
    universe: "animation",
    tmdbId: 14613,
    tmdbType: "movie",
    releaseDate: "2008-09-02",
    optional: true,
  },
  {
    id: "thor-tales-of-asgard",
    titleEn: "Thor: Tales of Asgard",
    titleAr: "ثور: حكايات أسجارد",
    type: "animation",
    universe: "animation",
    tmdbId: 63686,
    tmdbType: "movie",
    releaseDate: "2011-05-16",
    optional: true,
  },
  {
    id: "iron-man-rise-of-technovore",
    titleEn: "Iron Man: Rise of Technovore",
    titleAr: "الرجل الحديدي: صعود تكنوفور",
    type: "animation",
    universe: "animation",
    tmdbId: 169934,
    tmdbType: "movie",
    releaseDate: "2013-04-24",
    optional: true,
  },
  {
    id: "avengers-confidential",
    titleEn: "Avengers Confidential: Black Widow & Punisher",
    titleAr: "المنتقمون: الأرملة السوداء والمعاقب",
    type: "animation",
    universe: "animation",
    tmdbId: 257346,
    tmdbType: "movie",
    releaseDate: "2014-04-19",
    optional: true,
  },
  {
    id: "the-invincible-iron-man",
    titleEn: "The Invincible Iron Man",
    titleAr: "الرجل الحديدي الذي لا يُقهر",
    type: "animation",
    universe: "animation",
    tmdbId: 13647,
    tmdbType: "movie",
    releaseDate: "2007-01-23",
    optional: true,
  },
  {
    id: "marvel-rising-secret-warriors",
    titleEn: "Marvel Rising: Secret Warriors",
    titleAr: "مارفل رايزنغ: المحاربون السريون",
    type: "animation",
    universe: "animation",
    tmdbId: 491633,
    tmdbType: "movie",
    releaseDate: "2018-09-30",
    optional: true,
  },
  {
    /** Marvel Action Hour, 1994 to 1996. Two seasons. */
    id: "iron-man-1994",
    /**
     * Hand-set. TMDB indexes this as plain "Iron Man", which the search cannot
     * tell from the 2008 film, and renaming our node to match would collide
     * with it in F8b. An explicit id is the honest resolution.
     */
    tmdbId: 3097,
    tmdbType: "tv",
    titleEn: "Iron Man: The Animated Series",
    titleAr: "الرجل الحديدي: المسلسل الكرتوني",
    type: "animation",
    universe: "animation",
    releaseDate: "1994",
    seasons: [1, 2],
    showId: "iron-man-1994",
  },
  {
    /** The other half of the Marvel Action Hour. */
    id: "fantastic-four-1994",
    titleEn: "Fantastic Four: The Animated Series",
    titleAr: "الأربعة الرائعون: المسلسل الكرتوني",
    type: "animation",
    universe: "animation",
    releaseDate: "1994",
    seasons: [1, 2],
    showId: "fantastic-four-1994",
  },
  {
    /** UPN, 1996 to 1997, sharing an hour with Spider-Man. */
    id: "the-incredible-hulk-1996",
    /** Hand-set for the same reason: TMDB calls it "The Incredible Hulk", and
     *  so do a 1977 series, a 1982 series and the 2008 film. */
    tmdbId: 6332,
    tmdbType: "tv",
    titleEn: "The Incredible Hulk: The Animated Series",
    titleAr: "هالك المذهل: المسلسل الكرتوني",
    type: "animation",
    universe: "animation",
    releaseDate: "1996",
    seasons: [1, 2],
    showId: "the-incredible-hulk-1996",
  },
  {
    id: "x-men-evolution",
    titleEn: "X-Men: Evolution",
    titleAr: "إكس مِن: التطوّر",
    type: "animation",
    universe: "animation",
    releaseDate: "2000",
    seasons: [1, 2, 3, 4],
    showId: "x-men-evolution",
  },
  {
    id: "wolverine-and-the-x-men",
    titleEn: "Wolverine and the X-Men",
    titleAr: "وولفرين وإكس مِن",
    type: "animation",
    universe: "animation",
    releaseDate: "2008",
    seasons: [1],
    showId: "wolverine-and-the-x-men",
  },
  {
    /** 2010 to 2012, two seasons, then replaced by Avengers Assemble. */
    id: "avengers-earths-mightiest-heroes",
    titleEn: "The Avengers: Earth's Mightiest Heroes",
    titleAr: "المنتقمون: أعظم أبطال الأرض",
    type: "animation",
    universe: "animation",
    releaseDate: "2010",
    seasons: [1, 2],
    showId: "avengers-earths-mightiest-heroes",
  },
  {
    id: "avengers-assemble",
    titleEn: "Marvel's Avengers Assemble",
    titleAr: "المنتقمون: اتحدوا",
    type: "animation",
    universe: "animation",
    releaseDate: "2013",
    seasons: [1, 2, 3, 4, 5],
    showId: "avengers-assemble",
  },
  {
    id: "hulk-and-the-agents-of-smash",
    titleEn: "Hulk and the Agents of S.M.A.S.H.",
    titleAr: "هالك وعملاء سماش",
    type: "animation",
    universe: "animation",
    releaseDate: "2013",
    seasons: [1, 2],
    showId: "hulk-and-the-agents-of-smash",
  },
  {
    id: "guardians-of-the-galaxy-2015",
    titleEn: "Marvel's Guardians of the Galaxy",
    titleAr: "حرّاس المجرّة: المسلسل الكرتوني",
    type: "animation",
    universe: "animation",
    releaseDate: "2015",
    seasons: [1, 2, 3],
    showId: "guardians-of-the-galaxy-2015",
  },
  {
    /** Nine episodes from 2026-07-01. */
    id: "x-men-97-s2",
    titleEn: "X-Men '97: Season 2",
    titleAr: "إكس مِن '97: الموسم الثاني",
    type: "animation",
    universe: "animation",
    releaseDate: "2026-07-01",
    seasons: [2],
    showId: "x-men-97",
    requires: ["x-men-97"],
  },
];


// ---------------------------------------------------------------------------
// Marvel One-Shots — short, canon, and on nobody else's list
//
// Direct-to-video shorts from Marvel Studios, 2011 to 2014, all on Disney+
// since January 2022. They are genuinely part of the MCU and genuinely
// skippable, which is exactly what `optional` is for.
// ---------------------------------------------------------------------------

const oneShots: Draft[] = [
  {
    id: "the-consultant",
    titleEn: "The Consultant",
    titleAr: "المستشار",
    type: "short",
    universe: "mcu",
    saga: "infinity",
    phase: 1,
    releaseDate: "2011",
    optional: true,
    // `enriches`, not `requires`: The Incredible Hulk is itself optional, and a
    // hard edge into an optional title makes the graph claim something false.
    enriches: ["the-incredible-hulk"],
  },
  {
    id: "a-funny-thing-happened-on-the-way-to-thors-hammer",
    titleEn: "A Funny Thing Happened on the Way to Thor's Hammer",
    titleAr: "طرفة وقعت في الطريق إلى مطرقة ثور",
    type: "short",
    universe: "mcu",
    saga: "infinity",
    phase: 1,
    releaseDate: "2011",
    optional: true,
    requires: ["thor"],
  },
  {
    id: "item-47",
    titleEn: "Item 47",
    titleAr: "القطعة 47",
    type: "short",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2012",
    optional: true,
    requires: ["the-avengers"],
  },
  {
    id: "agent-carter-one-shot",
    titleEn: "Agent Carter",
    titleAr: "العميلة كارتر",
    type: "short",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2013",
    optional: true,
    requires: ["captain-america-the-first-avenger"],
  },
  {
    id: "all-hail-the-king",
    titleEn: "All Hail the King",
    titleAr: "ليحيَ الملك",
    type: "short",
    universe: "mcu",
    saga: "infinity",
    phase: 2,
    releaseDate: "2014",
    optional: true,
    requires: ["iron-man-3"],
  },
];

// ---------------------------------------------------------------------------
// Pre-1998 and licensed-out oddities
//
// None of these are Marvel Studios canon and none of them is a prerequisite of
// anything. They are here because the legacy universe is not honest without
// them: this is what the characters were doing while the rights were scattered.
// ---------------------------------------------------------------------------

const preLegacy: Draft[] = [
  {
    id: "howard-the-duck",
    titleEn: "Howard the Duck",
    titleAr: "هوارد البطة",
    type: "film",
    universe: "legacy",
    releaseDate: "1986",
    optional: true,
  },
  {
    id: "the-punisher-1989",
    titleEn: "The Punisher (1989)",
    titleAr: "المعاقب (1989)",
    type: "film",
    universe: "legacy",
    releaseDate: "1989",
    optional: true,
  },
  {
    id: "captain-america-1990",
    titleEn: "Captain America",
    titleAr: "كابتن أمريكا",
    type: "film",
    universe: "legacy",
    releaseDate: "1990",
    optional: true,
  },
  {
    id: "generation-x",
    titleEn: "Generation X",
    titleAr: "الجيل إكس",
    type: "film",
    universe: "legacy",
    releaseDate: "1996",
    optional: true,
  },
  {
    id: "nick-fury-agent-of-shield",
    titleEn: "Nick Fury: Agent of S.H.I.E.L.D.",
    titleAr: "نيك فيوري: عميل شيلد",
    type: "film",
    universe: "legacy",
    releaseDate: "1998",
    optional: true,
  },
  {
    id: "man-thing",
    titleEn: "Man-Thing",
    titleAr: "مان ثينغ",
    type: "film",
    universe: "legacy",
    releaseDate: "2005",
    optional: true,
  },
  {
    id: "blade-the-series",
    titleEn: "Blade: The Series",
    titleAr: "بليد: المسلسل",
    type: "series",
    universe: "legacy",
    releaseDate: "2006",
    seasons: [1],
    showId: "blade-the-series",
    optional: true,
    requires: ["blade-trinity"],
  },
];

// ---------------------------------------------------------------------------
// Marvel Television, continued
// ---------------------------------------------------------------------------

const marvelTv: Draft[] = [
  {
    /** Hulu, 2020-10-16. Ten episodes, cancelled after one season. */
    id: "helstrom",
    titleEn: "Helstrom: Season 1",
    titleAr: "هيلستروم: الموسم الأول",
    type: "season",
    universe: "marvel-tv",
    releaseDate: "2020-10-16",
    seasons: [1],
    showId: "helstrom",
    optional: true,
  },
  /**
   * THE TWO HULU ADULT ANIMATIONS, which the corpus had never heard of.
   *
   * M.O.D.O.K. and Hit-Monkey are Marvel Television shows that shipped while
   * everyone was watching Disney+, and they fell through exactly the gap that
   * catches every Marvel list: not MCU, not Netflix, not a Fox film, and
   * animated, which most people file as "for children" and skip.
   *
   * They are `optional` for the same reason the rest of this section is —
   * nothing in the main thread requires them — but "optional" is a routing
   * fact, not a judgement, and leaving them out entirely made the site wrong.
   */
  {
    id: "modok-s1",
    titleEn: "M.O.D.O.K.: Season 1",
    titleAr: "مودوك: الموسم الأول",
    type: "animation",
    universe: "marvel-tv",
    releaseDate: "2021-05-21",
    seasons: [1],
    showId: "modok",
    optional: true,
  },
  {
    id: "hit-monkey-s1",
    titleEn: "Hit-Monkey: Season 1",
    titleAr: "هيت مانكي: الموسم الأول",
    type: "animation",
    universe: "marvel-tv",
    releaseDate: "2021-11-17",
    seasons: [1],
    showId: "hit-monkey",
    optional: true,
  },
  {
    id: "hit-monkey-s2",
    titleEn: "Hit-Monkey: Season 2",
    titleAr: "هيت مانكي: الموسم الثاني",
    type: "animation",
    universe: "marvel-tv",
    releaseDate: "2024-07-15",
    seasons: [2],
    showId: "hit-monkey",
    /* No `requires`: D16 forbids an optional title as a prerequisite, because
       that pulls it into a minimum path. Season order is carried by the dates
       and by the story rank, which is where it belongs. */
    optional: true,
  },
];

// ---------------------------------------------------------------------------

const drafts: Draft[] = [
  ...phase1,
  ...phase2,
  ...phase3,
  ...phase4,
  ...phase5,
  ...phase6,
  ...sony,
  ...fantasticFour,
  ...defenders,
  ...xmen,
  ...series,
  ...marvelTv,
  ...legacy,
  ...widerCanon,
  ...preLegacy,
  ...oneShots,
  ...animation,
];

/**
 * Parsed at module load. A malformed node is a crash here, at import time,
 * rather than a blank panel three screens deep in the UI.
 */
export const titles = drafts.map((d, i) => {
  const parsed = TitleSource.safeParse(d);
  if (!parsed.success) {
    throw new Error(
      `content/titles.ts: node #${i} (${String(d.id)}) failed schema:\n` +
        JSON.stringify(parsed.error.format(), null, 2),
    );
  }
  return parsed.data;
});

export const byId = new Map(titles.map((t) => [t.id, t]));
