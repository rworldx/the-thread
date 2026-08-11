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
  for (const id of pinned) take(pool.find((x) => x.id === id), true);

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

  /**
   * 3. ONE OF EVERY UNIVERSE FIRST, THEN A CAP.
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

  /* 4. Anything still short — a universe running out of titles — by votes. */
  for (const x of byVotes) take(x);

  /**
   * ORDERED BY VOTES BEFORE SPACING, so the most recognisable tiles are the
   * ones that survive if the wall is ever cropped, and the pinned and
   * newest-of picks sit among them rather than in a clump at the front.
   */
  const ordered = [...chosen.values()].sort((a, b) => b.votes - a.votes);
  return spaceOut(ordered, keyOf);
}
