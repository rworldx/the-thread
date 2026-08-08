import type { TitleSource } from "@/content/schema";

/**
 * Synthetic graphs. These test the ALGORITHM.
 * The real corpus tests that the algorithm is correct about Marvel, which is a
 * different claim — both suites exist and neither substitutes for the other.
 */

let seq = 0;

/** A node with only the fields a graph test cares about. Everything else is filler. */
export function node(id: string, over: Partial<TitleSource> = {}): TitleSource {
  seq += 1;
  return {
    id,
    titleEn: id,
    titleAr: `ع-${id}`,
    type: "film",
    universe: "mcu",
    saga: "none",
    phase: null,
    releaseDate: `20${String(10 + (seq % 15)).padStart(2, "0")}-01-01`,
    storyYear: null,
    storyRank: null,
    runtimeMin: 100,
    runtimeFallbackMin: null,
    tmdbId: null,
    imdbId: null,
    posterUrl: null,
    tmdbType: null,
    seasons: [],
    showId: null,
    requires: [],
    enriches: [],
    optional: false,
    essential: false,
    editorNote: null,
    spoilerSafe: { en: `about ${id}`, ar: `عن ${id}` },
    context: null,
    ...over,
  };
}

/** Explicit dates so ordering tests are not at the mercy of the counter above. */
function dated(id: string, releaseDate: string, over: Partial<TitleSource> = {}) {
  return node(id, { releaseDate, ...over });
}

// a → b → c → d   (arrow reads "is required by")
export const linear: TitleSource[] = [
  dated("a", "2001-01-01"),
  dated("b", "2002-01-01", { requires: ["a"] }),
  dated("c", "2003-01-01", { requires: ["b"] }),
  dated("d", "2004-01-01", { requires: ["c"] }),
];

/**
 * The diamond. `a` is reachable from `d` by two distinct routes.
 * A naive recursive pathTo returns `a` twice; this is THE bug to catch.
 *
 *        a
 *       / \
 *      b   c
 *       \ /
 *        d
 */
export const diamond: TitleSource[] = [
  dated("a", "2001-01-01"),
  dated("b", "2002-01-01", { requires: ["a"] }),
  dated("c", "2003-01-01", { requires: ["a"] }),
  dated("d", "2004-01-01", { requires: ["b", "c"] }),
];

/** Fork into another universe and rejoin — the §4 branch, in miniature. */
export const forkRejoin: TitleSource[] = [
  dated("main-1", "2001-01-01"),
  dated("side-1", "2002-01-01", { universe: "sony" }),
  dated("side-2", "2003-01-01", { universe: "sony", requires: ["side-1"] }),
  dated("main-2", "2004-01-01", {
    requires: ["main-1", "side-2"],
    editorNote: { en: "Detour into Sony first.", ar: "مرّ على سوني أولاً.", mentions: [] },
  }),
  dated("main-3", "2005-01-01", { requires: ["main-2"] }),
];

/** a → b → c → a. Must throw, must name the whole loop. */
export const cyclic: TitleSource[] = [
  dated("a", "2001-01-01", { requires: ["c"] }),
  dated("b", "2002-01-01", { requires: ["a"] }),
  dated("c", "2003-01-01", { requires: ["b"] }),
];

/** A node that requires itself — the degenerate cycle. */
export const selfCycle: TitleSource[] = [dated("a", "2001-01-01", { requires: ["a"] })];

/** Hard edges are acyclic; the soft overlay is not. Caught by B9, not B7. */
export const softCyclic: TitleSource[] = [
  dated("a", "2001-01-01", { enriches: ["b"] }),
  dated("b", "2002-01-01", { enriches: ["a"] }),
];

/** Two components that never touch. Both must appear in the output. */
export const disconnected: TitleSource[] = [
  dated("a", "2001-01-01"),
  dated("b", "2002-01-01", { requires: ["a"] }),
  dated("x", "2003-01-01"),
  dated("y", "2004-01-01", { requires: ["x"] }),
];

export const single: TitleSource[] = [dated("only", "2001-01-01")];

export const empty: TitleSource[] = [];

/** An edge pointing at an id that does not exist. B2. */
export const danglingRequires: TitleSource[] = [
  dated("a", "2001-01-01", { requires: ["ghost"] }),
];

export const danglingEnriches: TitleSource[] = [
  dated("a", "2001-01-01", { enriches: ["ghost"] }),
];

/** An essential node depending on a non-essential one. B10 — the silent hole. */
export const brokenSpine: TitleSource[] = [
  dated("a", "2001-01-01", { essential: false }),
  dated("b", "2002-01-01", { essential: true, requires: ["a"] }),
];

export const soundSpine: TitleSource[] = [
  dated("a", "2001-01-01", { essential: true }),
  dated("b", "2002-01-01", { essential: true, requires: ["a"] }),
  dated("side", "2003-01-01", { essential: false, requires: ["b"] }),
];

/** Cross-universe requires with NO editorNote. B11 must reject. */
export const crossUniverseNoNote: TitleSource[] = [
  dated("sony-thing", "2001-01-01", { universe: "sony" }),
  dated("mcu-thing", "2002-01-01", { requires: ["sony-thing"], editorNote: null }),
];

/**
 * The cross-universe edge is `enriches`, not `requires`. A recommendation into
 * another universe is still a detour, so a note here is CORRECT and B11 must
 * accept it. Before B11 was widened this fixture tripped superfluous-editor-note.
 */
export const crossUniverseViaEnrichesWithNote: TitleSource[] = [
  dated("fox-thing", "2001-01-01", { universe: "fox" }),
  dated("mcu-thing", "2002-01-01", {
    enriches: ["fox-thing"],
    editorNote: { en: "Worth seeing the Fox film first.", ar: "يُستحسن مشاهدة فيلم فوكس أولاً.", mentions: [] },
  }),
];

/** Same shape, no note. B11 must reject — the detour goes unexplained. */
export const crossUniverseViaEnrichesNoNote: TitleSource[] = [
  dated("fox-thing", "2001-01-01", { universe: "fox" }),
  dated("mcu-thing", "2002-01-01", { enriches: ["fox-thing"], editorNote: null }),
];

/**
 * An optional title that something hard-requires. The thread draws `skippable`
 * dashed, and anyone who takes that cue is stranded at `dependent`.
 */
export const optionalWithDependents: TitleSource[] = [
  dated("skippable", "2001-01-01", { optional: true }),
  dated("dependent", "2002-01-01", { requires: ["skippable"] }),
];

/** The same edge softened to `enriches` — the correct fix, and valid. */
export const optionalAsSoftEdge: TitleSource[] = [
  dated("skippable", "2001-01-01", { optional: true }),
  dated("dependent", "2002-01-01", { enriches: ["skippable"] }),
];

/** A spoiler-safe line that names another work. B19 must reject. */
export const spoilerCrossReference: TitleSource[] = [
  dated("avengers-endgame", "2019-04-26", {
    titleEn: "Avengers: Endgame",
    titleAr: "المنتقمون: نهاية اللعبة",
  }),
  dated("some-film", "2018-04-27", {
    titleEn: "Some Film",
    spoilerSafe: { en: "A setup that leads into Avengers: Endgame.", ar: "تمهيد يقود إلى ما بعده." },
  }),
];

/**
 * The reference is in ARABIC, and is the subtitle rather than the full title —
 * "نهاية اللعبة" is not "المنتقمون: نهاية اللعبة". The first version of B19
 * compared titleEn only, so every Arabic line was unguarded; and comparing full
 * titles only would miss the way anyone actually cites one.
 */
export const spoilerCrossReferenceArabic: TitleSource[] = [
  dated("avengers-endgame", "2019-04-26", {
    titleEn: "Avengers: Endgame",
    titleAr: "المنتقمون: نهاية اللعبة",
  }),
  dated("some-film", "2018-04-27", {
    titleEn: "Some Film",
    spoilerSafe: { en: "A setup for what follows.", ar: "تمهيد يقود إلى نهاية اللعبة." },
  }),
];

/**
 * A GENERIC DESCRIPTOR is not a citation either. "المسلسل الكرتوني" — the
 * cartoon series — is a colon-segment of two Arabic titles, so a line calling
 * something "the famous cartoon series" would otherwise trip B19.
 */
export const spoilerGenericDescriptor: TitleSource[] = [
  dated("x-men-tas", "1992-10-31", {
    titleEn: "X-Men: The Animated Series",
    titleAr: "إكس مِن: المسلسل الكرتوني",
  }),
  dated("x-men-97", "2024-03-20", {
    titleEn: "X-Men '97",
    titleAr: "إكس مِن '97",
    spoilerSafe: {
      en: "The 1990s cartoon, picked up where it stopped.",
      ar: "عودة إلى المسلسل الكرتوني الشهير من حيث توقف.",
    },
  }),
];

/** But a REAL cross-title reference must still fail, stoplist or not. */
export const spoilerRealReferenceStillFails: TitleSource[] = [
  dated("x-men-tas", "1992-10-31", {
    titleEn: "X-Men: The Animated Series",
    titleAr: "إكس مِن: المسلسل الكرتوني",
  }),
  dated("some-show", "2024-03-20", {
    titleEn: "Some Show",
    spoilerSafe: {
      en: "A sequel to X-Men: The Animated Series.",
      ar: "تكملة لإكس مِن: المسلسل الكرتوني.",
    },
  }),
];

/** A season marker is bookkeeping, not a citation — "Season 1" must not be banned. */
export const spoilerMentionsSeason: TitleSource[] = [
  dated("loki-s1", "2021-06-09", { titleEn: "Loki: Season 1", titleAr: "لوكي: الموسم الأول" }),
  dated("some-show", "2022-01-01", {
    titleEn: "Some Show",
    spoilerSafe: { en: "Season 1 of something else entirely.", ar: "الموسم الأول من شيء آخر." },
  }),
];

/** The same line without the reference. Valid. */
export const spoilerSelfContained: TitleSource[] = [
  dated("avengers-endgame", "2019-04-26", { titleEn: "Avengers: Endgame" }),
  dated("some-film", "2018-04-27", {
    titleEn: "Some Film",
    spoilerSafe: { en: "A collector comes looking for something.", ar: "جامع يبحث عن شيء ما." },
  }),
];

/** Same-universe requires WITH an editorNote. B11 must also reject — "iff". */
export const sameUniverseWithNote: TitleSource[] = [
  dated("first", "2001-01-01"),
  dated("second", "2002-01-01", {
    requires: ["first"],
    editorNote: { en: "unnecessary", ar: "غير ضروري", mentions: [] },
  }),
];

/**
 * Ordering-stability fixture: four mutually unconstrained nodes, deliberately
 * declared out of date order. A stable sort must return them by date, then id.
 */
export const unconstrained: TitleSource[] = [
  dated("delta", "2004-01-01"),
  dated("alpha", "2001-01-01"),
  dated("charlie", "2003-01-01"),
  dated("bravo", "2002-01-01"),
];

/** Same date on purpose — the tie-break must be `id`, deterministically. */
export const sameDate: TitleSource[] = [
  dated("zulu", "2008-05-02"),
  dated("alpha", "2008-05-02"),
  dated("mike", "2008-05-02"),
];
