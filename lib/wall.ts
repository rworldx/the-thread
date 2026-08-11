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
 * So the wall is now chosen against four requirements, in this order:
 *
 *   1. NAMED titles that must appear regardless of rank.
 *   2. EVERY universe gets at least one tile — the wall is the only place the
 *      site claims breadth before a reader has clicked anything, and a wall of
 *      pure MCU would be claiming something false.
 *   3. The NEWEST film and the NEWEST show, so the wall says "up to date"
 *      without anybody having to write a date anywhere.
 *   4. The rest by TMDB vote COUNT — not how good a film is, but how many
 *      people have seen it enough to rate it. It is already fetched for every
 *      title and needs no hand-kept list of "the famous ones" to rot.
 *
 * Then the order is shuffled apart so no two neighbours are the same thing:
 * two Avengers posters side by side read as a repeat rather than a range.
 */

export interface WallItem {
  id: string;
  universe: string;
  releaseDate: string;
  votes: number;
  /** Whether it has episodes. Used only to find the newest SHOW. */
  show: boolean;
  posterPath: string;
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
 * Interleave so no two neighbours share a franchise.
 *
 * Greedy with one look-ahead: take the next item whose franchise differs from
 * the one just placed, otherwise take the next one at all. A perfect
 * arrangement is not always possible — if half the wall were Avengers films
 * nothing could separate them — and this degrades to "as separated as the set
 * allows" rather than failing or looping.
 */
export function spaceOut<T>(items: readonly T[], keyOf: (x: T) => string): T[] {
  const rest = [...items];
  const out: T[] = [];
  let last = "";
  while (rest.length > 0) {
    let i = rest.findIndex((x) => keyOf(x) !== last);
    if (i === -1) i = 0;
    const [taken] = rest.splice(i, 1);
    out.push(taken!);
    last = keyOf(taken!);
  }
  return out;
}

/**
 * @param pool     every title that has a usable poster
 * @param pinned   ids that must appear whatever their vote count
 * @param count    how many tiles the wall holds
 * @param keyOf    franchise key, for the adjacency rule
 */
export function pickWall(
  pool: readonly WallItem[],
  pinned: readonly string[],
  count: number,
  keyOf: (x: WallItem) => string,
): WallItem[] {
  const byVotes = [...pool].sort((a, b) => b.votes - a.votes);
  const chosen = new Map<string, WallItem>();
  const take = (x: WallItem | undefined) => {
    if (x && !chosen.has(x.id) && chosen.size < count) chosen.set(x.id, x);
  };

  /* 1. The named ones first, so nothing below can crowd them out. */
  for (const id of pinned) take(pool.find((x) => x.id === id));

  /* 2. The newest film and the newest show. Latest by release date, which for
        an announced-but-unreleased title is the date it is announced for —
        that is exactly the "we go up to here" the wall is meant to say. */
  const newest = (want: boolean) =>
    pool
      .filter((x) => x.show === want)
      .reduce<WallItem | undefined>(
        (best, x) => (!best || x.releaseDate > best.releaseDate ? x : best),
        undefined,
      );
  take(newest(false));
  take(newest(true));

  /* 3. One per universe, the most-seen of each, for the ones not yet covered. */
  for (const u of new Set(pool.map((x) => x.universe))) {
    if ([...chosen.values()].some((x) => x.universe === u)) continue;
    take(byVotes.find((x) => x.universe === u));
  }

  /* 4. Fill out by vote count. */
  for (const x of byVotes) take(x);

  /**
   * ORDERED BY VOTES BEFORE SPACING, so the most recognisable tiles are the
   * ones that survive if the wall is ever cropped, and the pinned and
   * newest-of picks sit among them rather than in a clump at the front.
   */
  const ordered = [...chosen.values()].sort((a, b) => b.votes - a.votes);
  return spaceOut(ordered, keyOf);
}
