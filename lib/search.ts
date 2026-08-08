/**
 * SEARCH — pure functions, no dependency, no index library.
 *
 * 130 items does not need Lunr or FlexSearch. What it does need is Arabic that
 * actually matches: a reader typing "سبايدر" must find "سبايدر مان", and one
 * typing with full tashkeel must find the same row as one typing without.
 *
 * Everything here is a pure function of its input so it can be tested without a
 * browser, and so the same code ranks results on the server and in the client.
 */

export interface SearchItem {
  id: string;
  titleEn: string;
  titleAr: string;
  year: string;
  universe: string;
  /**
   * WHAT THIS ROW IS, because the index now holds two kinds of thing.
   *
   * The top bar was the only search on the site that could not find a
   * character — every other one is scoped to its own page, so a reader who
   * typed "Magik" into the one global box got nothing and reasonably concluded
   * the site had never heard of her. Titles and characters live in one index
   * so a single query answers both, and the kind is what lets a row route to
   * `/path/…` or `/characters/…` and look like what it is.
   *
   * Absent means title, so every existing row keeps working unchanged.
   */
  kind?: "title" | "character";
  /** Character rows only: aliases, so "Logan" finds Wolverine. */
  aliases?: string[];
  /**
   * A THUMBNAIL, absolute and ready to render.
   *
   * A result list of pure text makes the reader parse names to find the one
   * they meant; a poster is recognised before it is read. Titles carry a TMDB
   * path and characters carry a full URL from three different hosts, so this
   * is resolved to an absolute URL at GENERATION time — the components then
   * render one shape and neither needs to know where art comes from.
   */
  image?: string | null;
  /** How many titles come before this one — the cost, which the row shows. */
  pathLength: number;
  /** Total minutes of that path, or null where a runtime is unknown. */
  minutes: number | null;
}

/**
 * Arabic combining marks: fatha through sukun, plus the superscript alef.
 * Each is its own code point, so a voweled query never matches an unvoweled
 * title unless both are stripped first.
 */
const DIACRITICS = /[ً-ٰٕ]/gu;
/** Tatweel — a purely typographic stretch, carrying no meaning. */
const TATWEEL = /ـ/gu;

/**
 * Orthographic folds. Readers type these interchangeably and are right to:
 * hamza placement and final ya/alef-maqsura are inconsistent even in published
 * titles, and ta-marbuta is routinely typed as ha.
 */
const FOLDS: [RegExp, string][] = [
  [/[آأإٱ]/gu, "ا"], // آ أ إ ٱ → ا
  [/ة/gu, "ه"], // ة → ه
  [/ى/gu, "ي"], // ى → ي
  [/ؤ/gu, "و"], // ؤ → و
  [/ئ/gu, "ي"], // ئ → ي
];

/**
 * One normal form for both scripts.
 *
 * Latin folds to lowercase and loses its punctuation; Arabic loses its
 * diacritics, its tatweel, and its orthographic variants. Note there is no
 * `\w` or `\b` anywhere — those are ASCII-only and would silently do nothing to
 * the Arabic half (see tests/regex-guard.test.ts).
 */
export function normalise(input: string): string {
  let s = input.normalize("NFKD").toLowerCase();
  s = s.replace(DIACRITICS, "").replace(TATWEEL, "");
  for (const [re, to] of FOLDS) s = s.replace(re, to);
  // Punctuation and separators become spaces; letters and numbers survive.
  s = s.replace(/[^\p{L}\p{N}]+/gu, " ");
  return s.trim().replace(/\s+/gu, " ");
}

export const tokenise = (input: string): string[] =>
  normalise(input).split(" ").filter(Boolean);

/**
 * THE SAME STRING WITH THE GAPS CLOSED — for the initials nobody types in full.
 *
 * `normalise` turns punctuation into spaces, which is right for almost
 * everything and wrong for exactly one shape: "M.O.D.O.K." becomes the five
 * words "m o d o k", and a reader typing "modok" matches none of them. Same for
 * "S.H.I.E.L.D.", and same for anyone typing "spiderman" as one word.
 *
 * Nobody types the dots. So the squashed form joins the haystack alongside the
 * spaced one, and the query is squashed too — which makes "modok", "M.O.D.O.K"
 * and "m.o.d.o.k." the same search, at the cost of one string per title.
 */
export const squash = (input: string): string => normalise(input).replace(/ /gu, "");

/**
 * Levenshtein distance, bailed out early.
 *
 * Dependency-free and capped: once every cell in a row exceeds `max` the answer
 * cannot come back under it, so there is no reason to finish the matrix.
 */
export function editDistance(a: string, b: string, max = 2): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(row[j - 1]! + 1, prev[j]! + 1, prev[j - 1]! + cost);
      row.push(v);
      if (v < best) best = v;
    }
    if (best > max) return max + 1;
    prev = row;
  }
  return prev[b.length]!;
}

/** How close a query token got to a title, higher is better. 0 means no match. */
function scoreToken(token: string, haystack: string[]): number {
  let best = 0;
  for (const word of haystack) {
    if (word === token) best = Math.max(best, 100);
    else if (word.startsWith(token)) best = Math.max(best, 80);
    else if (word.includes(token)) best = Math.max(best, 55);
    else if (token.length >= 4) {
      // Typo tolerance. "venum" must find Venom — the brief names that case.
      const d = editDistance(token, word, 2);
      if (d <= 2) best = Math.max(best, 40 - d * 8);
    }
  }
  return best;
}

export interface SearchResult {
  item: SearchItem;
  score: number;
  /** True when nothing matched exactly and this got here by edit distance. */
  fuzzy: boolean;
}

/**
 * Rank the corpus against a query.
 *
 * Every token must contribute something — "spider man" should not match a title
 * that only contains "man" — which is what makes a two-word query narrow rather
 * than widen the list.
 */
export function search(query: string, index: readonly SearchItem[], limit = 8): SearchResult[] {
  const tokens = tokenise(query);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];
  for (const item of index) {
    /* The squashed whole title joins the words, so a dotted acronym and a
       run-together spelling both land on a real haystack entry. */
    const haystack = [
      ...tokenise(item.titleEn),
      ...tokenise(item.titleAr),
      squash(item.titleEn),
      squash(item.titleAr),
      /* A character is searched by every name they answer to — "Logan",
         "Wade Wilson", "MJ" — the same surface the characters page uses. */
      ...(item.aliases ?? []).flatMap((a) => [...tokenise(a), squash(a)]),
    ];
    let total = 0;
    let exactAll = true;

    for (const token of tokens) {
      const s = scoreToken(token, haystack);
      if (s === 0) {
        total = 0;
        break;
      }
      if (s < 55) exactAll = false;
      total += s;
    }
    if (total === 0) continue;

    // A shorter title matching the same tokens is the better hit: "Venom"
    // should outrank "Venom: Let There Be Carnage" for the query "venom".
    const brevity = Math.max(0, 20 - haystack.length * 2);
    results.push({ item, score: total + brevity, fuzzy: !exactAll });
  }

  return results
    .sort((a, b) => b.score - a.score || (a.item.year < b.item.year ? -1 : 1))
    .slice(0, limit);
}

/** The "did you mean" hit: the best result when nothing matched cleanly. */
export function suggestion(query: string, index: readonly SearchItem[]): SearchItem | null {
  const [top] = search(query, index, 1);
  return top && top.fuzzy ? top.item : null;
}
