/**
 * THE POSTER WALL BEHIND THE HERO — which 24, and in what order.
 *
 * This began as a stride across the corpus in release order, taking every Nth
 * title. That is stable only while the corpus is: going from 167 titles to 216
 * moved the stride from 6 to 8 and dealt a completely different 24. The wall
 * that had been Avengers and Iron Man became Pryde of the X-Men, Marvel Disk
 * Wars, Spider-Man (1967) and Howard the Duck. Nothing about those is wrong as
 * data — they are real Marvel — but a first-time visitor recognises none of
 * them, and a wall exists to be recognised.
 *
 * Every version after that derived them — vote count, universe quotas, newest
 * of each — and every one answered a question about POPULARITY when the
 * question is about ARTWORK. A ranking cannot see that Iron Fist has a
 * beautiful poster and a small audience, and no amount of tuning turns it into
 * an eye. So the twenty-four are named in app/[locale]/page.tsx and this file
 * arranges them: which colours sit beside which, and which are placed where a
 * visitor can actually see them.
 *
 * The derivation below still runs and is not dead. If a named title is ever
 * renamed or loses its poster, it fills the gap rather than shipping a wall of
 * twenty-three.
 */

export interface WallItem {
  id: string;
  universe: string;
  releaseDate: string;
  votes: number;
  posterPath: string;
  /** The poster's dominant colour, "#rrggbb", already extracted per title. */
  tint: string;
}

/**
 * HOW FAR APART TWO POSTERS LOOK — "redmean", a cheap approximation of
 * perceived colour difference that is markedly better than treating RGB as a
 * cube. Plain Euclidean RGB calls navy and forest green neighbours; this does
 * not, because it weights the channels by where in the red range the pair
 * sits. Good enough to order a wall, and it needs no colour library.
 */
export function colourGap(a: string, b: string): number {
  const rgb = (h: string) => {
    const n = parseInt(h.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
  };
  const [r1, g1, b1] = rgb(a);
  const [r2, g2, b2] = rgb(b);
  const rm = (r1 + r2) / 2;
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt((2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db);
}

/**
 * WHAT COUNTS AS "THE SAME THING" FOR ADJACENCY.
 *
 * Derived from the title rather than kept as a list, because a list would go
 * stale the moment a film is added. Everything before the colon, minus a
 * leading article and a trailing volume or sequel number, so "Avengers:
 * Endgame", "The Avengers" and "Avengers: Doomsday" collapse together, as do
 * "Iron Man", "Iron Man 3" and "Guardians of the Galaxy Vol. 2".
 */
export function franchiseOf(titleEn: string): string {
  return (
    titleEn
      .toLowerCase()
      .split(":")[0]!
      .replace(/^(the|a)\s+/, "")
      // ascii-ok: this reads titleEn only — the ENGLISH title, which is Latin
      // by construction. The Arabic title is never passed here, and the key is
      // internal to the adjacency rule rather than shown to a reader.
      .replace(/\s+(vol\.?\s*\d+|part\s+\w+|\d+|i{1,3}v?|v)$/, "")
      .trim()
  );
}

/**
 * ORDER THE WALL AS A GRADIENT, DARKEST TO LIGHTEST.
 *
 * Twenty-four posters chosen well individually still make an ugly wall if a
 * neon Deadpool red lands beside a black Blade beside a beige Legion. What a
 * visitor sees first is not any one poster but the field they make together,
 * and the field is what has to be composed.
 *
 * A nearest-neighbour colour walk was tried first and is worse: greedy chains
 * strand their outliers at the end, so it opened well and finished on three
 * hard jumps. Sorting by luminance has no end to strand — every neighbour is
 * the next step along one axis. Measured across the shipped 24, mean
 * neighbour difference is 56 sorted by luminance against 64 for the walk and
 * 132 for the vote order it replaced.
 *
 * It also reads as intent rather than accident: the wall opens on the dark
 * end — Daredevil, Blade, Iron Man — and rises to the pale ones, which is the
 * direction the scrim already runs.
 *
 * The franchise rule still wins where the two disagree: a same-franchise
 * neighbour is nudged one place along, because two near-identical posters side
 * by side read as a bug no matter how well their colours agree.
 */
export function harmonise(
  items: readonly WallItem[],
  keyOf: (x: WallItem) => string,
  band: readonly string[] = [],
): WallItem[] {
  const luma = (x: WallItem) => colourGap(x.tint, "#000000");
  const byLuma = (a: WallItem, b: WallItem) => luma(a) - luma(b);

  /**
   * THE MIDDLE OF THE WALL IS THE ONLY PART SEEN WHOLE.
   *
   * The grid is 8 x 3 on a desktop and 4 x 6 on a phone, and in both the top
   * and bottom rows run under the headline and off the edges — a tile there is
   * cropped, tinted and half-covered. Positions 9 to 16 are the middle row on
   * a desktop and the two middle rows on a phone, and they are the only
   * posters a visitor actually sees.
   *
   * A pure luminance sort decides what lands there by tint alone, which is an
   * accident: it was seating Jessica Jones and TASM 1 in the shop window while
   * Doomsday and Doctor Strange sat in the cropped rows. So the strongest
   * eight are placed in the middle on purpose, and the remaining sixteen fill
   * the dark rows above and the pale rows below.
   *
   * Each of the three segments is still sorted by luminance, so the wall reads
   * as a composition rather than three piles. It costs a little smoothness at
   * the two seams — mean neighbour difference 51 against 48 for a pure sort —
   * which is a cheap price for the right posters being the visible ones.
   */
  const inBand = new Set(band);
  const centre = items.filter((x) => inBand.has(x.id)).sort(byLuma);
  const edges = items.filter((x) => !inBand.has(x.id)).sort(byLuma);
  const start = Math.floor((items.length - centre.length) / 2);
  const segments = centre.length
    ? [edges.slice(0, start), centre, edges.slice(start)]
    : [[...items].sort(byLuma)];

  /* Separated WITHIN each segment, so fixing an adjacent pair can never push a
     title out of the middle band it was deliberately placed in. */
  return segments.flatMap((seg) => {
    const out = [...seg];
    for (let i = 1; i < out.length; i++) {
      if (keyOf(out[i]!) !== keyOf(out[i - 1]!)) continue;
      /* Swap with the nearest following tile that clashes with neither side.
         One pass, and a pair with no legal partner is simply left — the wall
         degrades rather than looping. */
      const j = out.findIndex(
        (x, k) =>
          k > i &&
          keyOf(x) !== keyOf(out[i - 1]!) &&
          (k + 1 >= out.length || keyOf(out[i]!) !== keyOf(out[k + 1]!)),
      );
      if (j !== -1) [out[i], out[j]] = [out[j]!, out[i]!];
    }
    return out;
  });
}

/**
 * HAND SWAPS, APPLIED LAST — the editorial pass over a derived order.
 *
 * Everything above answers "which 24 and roughly where", which no rule can
 * finish: whether two posters sit well beside each other is a judgement about
 * artwork, not about data. So a short list of exchanges runs over the result.
 *
 * A swap naming an id that is NOT on the wall THROWS rather than doing
 * nothing. A silent no-op is the exact failure mode that has already cost this
 * project twice — the image overrides that quietly matched nothing, and the
 * search index that sat at 167 while the corpus moved on. If a swap stops
 * applying, the wall changed underneath it and somebody needs to look.
 */
export function applySwaps<T extends { id: string }>(
  list: readonly T[],
  swaps: readonly (readonly [string, string])[],
): T[] {
  const out = [...list];
  for (const [a, b] of swaps) {
    const i = out.findIndex((x) => x.id === a);
    const j = out.findIndex((x) => x.id === b);
    if (i === -1 || j === -1) {
      throw new Error(
        `wall swap [${a}, ${b}]: ${i === -1 ? a : b} is not on the wall. ` +
          `The selection changed — re-check the swap list against it.`,
      );
    }
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * @param pool     every title that has a usable poster
 * @param pinned   ids that must appear whatever their vote count
 * @param count    how many tiles the wall holds
 * @param keyOf    franchise key, for the adjacency rule
 * @param swaps    hand exchanges applied to the finished order
 */
export function pickWall(
  pool: readonly WallItem[],
  pinned: readonly string[],
  count: number,
  keyOf: (x: WallItem) => string,
  swaps: readonly (readonly [string, string])[] = [],
  excluded: readonly string[] = [],
  band: readonly string[] = [],
): WallItem[] {
  const out = new Set(excluded);
  const byVotes = [...pool].filter((x) => !out.has(x.id)).sort((a, b) => b.votes - a.votes);
  const chosen = new Map<string, WallItem>();
  /**
   * ONE TILE PER FRANCHISE, which is stricter than the adjacency rule and
   * replaces most of its work. Spacing three Daredevil seasons apart still
   * spends three of twenty-four tiles on one show — and seasons of a show
   * routinely share a single poster on TMDB, so it can literally repeat the
   * same artwork. A wall of 24 distinct franchises says far more about how
   * much is here than a wall of 24 titles.
   */
  const used = new Set<string>();
  const take = (x: WallItem | undefined, force = false) => {
    if (!x || chosen.has(x.id) || chosen.size >= count) return;
    const key = keyOf(x);
    if (!force && used.has(key)) return;
    /* A forced pick does NOT claim its franchise. Pinning Avengers: Doomsday
       was taking the "avengers" slot and knocking The Avengers, Endgame and
       Infinity War off the wall entirely — a pin is a demand that one title
       appear, not a demand that its franchise appear only once. */
    if (!force) used.add(key);
    chosen.set(x.id, x);
  };

  /* 1. The named ones first, so nothing below can crowd them out — and they
        override the one-per-franchise rule, since being asked for by name is
        the whole point of pinning. */
  for (const id of pinned) take(byVotes.find((x) => x.id === id), true);

  /**
   * 2. ONE OF EVERY UNIVERSE FIRST, THEN A CAP.
   *
   * Two failed attempts are worth recording, because the right answer is
   * between them. Filling purely by vote count gave 18 MCU tiles out of 24 —
   * the wall became an advertisement for one universe. Correcting that with a
   * strict round-robin overshot: it gave marvel-tv seven tiles and had to
   * reach Runaways, Inhumans, Cloak & Dagger, Helstrom and Hit-Monkey to fill
   * them, while The Avengers, Endgame, Infinity War and Black Panther fell off
   * the wall entirely. Equal shares are the wrong target, because the
   * universes are not equal in size: the MCU genuinely has more distinct
   * properties than the Defenders do.
   *
   * So every universe is guaranteed its best title, and after that the wall
   * fills by vote count with a ceiling on any one universe. The MCU keeps the
   * largest share because it earns it, and it cannot take the whole wall.
   */
  for (const u of new Set(byVotes.map((x) => x.universe))) {
    take(byVotes.find((x) => x.universe === u));
  }

  /* Generous enough that the MCU is clearly the largest block, tight enough
     that six of the seven universes are still visible at a glance. */
  const CAP = Math.ceil(count / 3);
  const perUniverse = () => {
    const n = new Map<string, number>();
    for (const x of chosen.values()) n.set(x.universe, (n.get(x.universe) ?? 0) + 1);
    return n;
  };
  for (const x of byVotes) {
    if (chosen.size >= count) break;
    if ((perUniverse().get(x.universe) ?? 0) >= CAP) continue;
    take(x);
  }

  /* 3. Anything still short — a universe running out of titles — by votes. */
  for (const x of byVotes) take(x);

  /**
   * ORDERED BY VOTES BEFORE SPACING, so the most recognisable tiles are the
   * ones that survive if the wall is ever cropped, and the pinned and
   * newest-of picks sit among them rather than in a clump at the front.
   */
  return applySwaps(harmonise([...chosen.values()], keyOf, band), swaps);
}
