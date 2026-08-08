import type { TitleSource } from "@/content/schema";
import { titles, posterOf } from "@/content/build";
import { releaseOrder } from "@/lib/graph";

/**
 * THE EIGHT COLLECTIONS — the site's whole navigation, in one list.
 *
 * A COLLECTION IS NOT A UNIVERSE, and keeping the two apart is the point.
 *
 *   `universe` is a RIGHTS fact: who owned what. Seven values, and the reason
 *   this site needs the rights page at all. It stays exactly as it is, because
 *   it is the honest answer to "why is this not on Disney+".
 *
 *   A COLLECTION is how a reader thinks about what to watch tonight. Fox held
 *   the X-Men and the Fantastic Four, and nobody has ever sat down to watch
 *   "the Fox films" — they sit down to watch the X-Men. The Defenders shows
 *   are Marvel TV to everyone except a lawyer. Animation cuts across all of it.
 *
 * So: eight, no more. Every one of them is a real place a reader goes, every
 * one of them gets the same four pages (release or story, posters or timeline),
 * and nothing on this site offers a ninth. The homepage's five doors, the
 * projects filter chips and the universes index all read THIS list, so adding a
 * collection is one edit rather than four that drift.
 *
 * `all` is a real member and not a special case. It is the only honest home for
 * the 167 titles as one body of work, and it behaves like every other member.
 */

export const COLLECTIONS = [
  "all",
  "mcu",
  "x-men",
  "fantastic-four",
  "spider-verse",
  "defenders",
  "marvel-tv",
  "legacy",
  "animation",
] as const;

export type Collection = (typeof COLLECTIONS)[number];

export function isCollection(v: string): v is Collection {
  return (COLLECTIONS as readonly string[]).includes(v);
}

/**
 * WHAT THE /universes INDEX LISTS — every universe EXCEPT the MCU.
 *
 * The MCU is a top-level nav item. It is what most readers came for, and
 * sending them through an index to reach it is a click of ceremony. Everything
 * else is here, `all` included and first: it is the widest door and it reads as
 * the way in rather than as one of the set.
 *
 * The exclusion is from the INDEX, never from the set. `/universes/mcu` has
 * exactly the same four pages as every other collection.
 */
export const INDEXED_COLLECTIONS = COLLECTIONS.filter((c) => c !== "mcu");

/**
 * THE HOMEPAGE SECTION — the same list, without `all`.
 *
 * The homepage tile grid used to read the seven RIGHTS buckets, which meant it
 * showed one "Fox: X-Men and Fantastic Four" tile while /universes showed two
 * separate doors for them. Two pages disagreeing about how many universes
 * there are is the exact confusion the collections list exists to end, so both
 * read it now.
 *
 * `all` is left out here only because the homepage is already the door to
 * everything.
 */
export const HOME_COLLECTIONS = COLLECTIONS.filter((c) => c !== "all");

/**
 * Which collection a title belongs to. DERIVED from fields the corpus already
 * validates, never authored a second time on each title.
 *
 * ANIMATION WINS over everything else. An animated X-Men series is something a
 * reader reaches for as animation, not as part of the film continuity, and the
 * Spider-Verse films are the exception that proves it — they are animated and
 * they are unmistakably the Spider-Verse, which is why they carry `universe:
 * "sony"` rather than `"animation"` in the corpus.
 *
 * THE DEFENDERS STAND ALONE. They were folded into Marvel Television for a
 * while on the reasoning that both are TV; that was wrong. Thirteen seasons of
 * one continuous story with its own crossover event is not the same kind of
 * thing as Agents of S.H.I.E.L.D. and Cloak & Dagger, and a reader looking for
 * Daredevil is looking for the Defenders, not for "Marvel's television output".
 */
export function collectionOf(t: Pick<TitleSource, "id" | "universe" | "type">): Collection {
  if (t.universe === "animation") return "animation";
  if (t.universe === "sony") return "spider-verse";
  if (t.universe === "fox") {
    return t.id.startsWith("fantastic-four") ? "fantastic-four" : "x-men";
  }
  return t.universe as Collection;
}

/**
 * ONE-SHOTS ARE IN THE CATALOGUE AND OUT OF THE ORDER.
 *
 * The Marvel One-Shots are five-minute discs extras. They exist, they have
 * pages, and /projects lists every one of them — but putting them in the MCU
 * watch order tells a beginner that "Item 47" is a step between two films,
 * which is the opposite of what this site is for. They are dropped from the
 * MCU's ordering only, and `type` is what says so, so nothing has to be
 * maintained by hand.
 */
export function inCollectionOrder(t: Pick<TitleSource, "type">, c: Collection): boolean {
  return !(c === "mcu" && t.type === "short");
}

/** The titles in a collection, unordered. */
export function membersOf(c: Collection): TitleSource[] {
  const all = c === "all" ? [...titles] : titles.filter((t) => collectionOf(t) === c);
  return all.filter((t) => inCollectionOrder(t, c));
}

export type Order = "release" | "story";

/**
 * STORY ORDER EXISTS ONLY WHERE THE FACTS DO.
 *
 * There are two sources for it and they are not interchangeable:
 *
 *   `storyRank` is an author's explicit sequence, used where a block has been
 *   ranked end to end. Fox is the only one, because the X-Men timeline is a
 *   genuine editorial argument rather than a lookup.
 *
 *   `storyYear` is a researched in-universe date, which sorts naturally and
 *   degrades honestly — a title with no year is simply not orderable.
 *
 * A collection where either source covers EVERY member gets the toggle. A
 * collection where it covers some of them does not, because a half-ranked list
 * silently puts the unranked titles in a lump at one end and looks like an
 * answer. `null` here is what makes the toggle disappear rather than appear
 * broken.
 */
export function storyOrderOf(c: Collection): TitleSource[] | null {
  const members = membersOf(c);
  if (members.length === 0) return null;

  if (members.every((t) => t.storyRank !== null)) {
    return [...members].sort((a, b) => a.storyRank! - b.storyRank!);
  }
  if (members.every((t) => t.storyYear !== null)) {
    /**
     * Ties break on RELEASE date, not on id. Several MCU films share a story
     * year — the whole of 2016 is Civil War, Doctor Strange and Homecoming's
     * opening — and within a year the release sequence is the one a viewer has
     * any intuition about.
     */
    const rank = new Map(releaseOrder(members).map((t, i) => [t.id, i]));
    return [...members].sort(
      (a, b) => a.storyYear! - b.storyYear! || rank.get(a.id)! - rank.get(b.id)!,
    );
  }
  return null;
}

/** The list a collection page renders, for a given order. Never null. */
export function orderedMembers(c: Collection, order: Order): TitleSource[] {
  if (order === "story") {
    const story = storyOrderOf(c);
    if (story) return story;
  }
  return releaseOrder(membersOf(c));
}

/** Does this collection offer the story toggle at all? */
export function hasStoryOrder(c: Collection): boolean {
  return storyOrderOf(c) !== null;
}

export type View = "posters" | "timeline";
export const VIEWS: View[] = ["posters", "timeline"];

/**
 * Every prerenderable path for the collection pages.
 *
 * The order and the view are SEGMENTS, not query parameters. `searchParams`
 * opts a route out of static generation, silently — an earlier version of the
 * universe page emitted no HTML at all while the build still reported success.
 * Segments cost a handful of extra pages and keep the whole site prerendered.
 */
export function collectionRoutes(): { id: Collection; order: Order; view: View }[] {
  return COLLECTIONS.flatMap((id) =>
    VIEWS.flatMap((view) =>
      (["release", ...(hasStoryOrder(id) ? (["story"] as const) : [])] as Order[]).map(
        (order) => ({ id, order, view }),
      ),
    ),
  );
}

/** Release-year span, for the index cards. */
export function spanOf(c: Collection): { from: string; to: string; count: number } {
  const list = releaseOrder(membersOf(c));
  return {
    from: list[0]!.releaseDate.slice(0, 4),
    to: list.at(-1)!.releaseDate.slice(0, 4),
    count: list.length,
  };
}

/**
 * A RIGHTS UNIVERSE, TO THE COLLECTION A READER WOULD LAND IN.
 *
 * The rights page, the title pages and the homepage bento all talk in
 * universes, because that is what they are ABOUT — who owned what. Their links
 * still have to arrive somewhere a reader can browse, and the browsable thing
 * is a collection.
 *
 * Fox is the one that cannot be answered from the universe alone: it held the
 * X-Men and the Fantastic Four as two entirely separate things. Where a title
 * is in hand, `collectionOf` gives the exact answer; this is the fallback for
 * the places that only have the bucket, and it lands on the X-Men because that
 * is fifteen titles against three.
 */
export function collectionForUniverse(u: string): Collection {
  if (u === "sony") return "spider-verse";
  if (u === "fox") return "x-men";
  /**
   * `string`, not `Universe`, because the rights rows carry an OPTIONAL free
   * `universe` field — some rows explain a deal rather than a bucket. Casting
   * an unchecked string into a route segment is how a link 404s silently on a
   * route with `dynamicParams: false`, so anything unrecognised lands on the
   * collection that contains everything rather than on nothing.
   */
  return isCollection(u) ? u : "all";
}


/**
 * A BAND OF POSTERS FOR A COLLECTION — the same one on both pages.
 *
 * The /universes cards and the homepage tiles each show a strip of real
 * artwork from inside a collection, and they were about to compute it twice.
 * Two copies of a stride calculation is how the two pages end up showing
 * different films for the same universe.
 *
 * SPREAD ACROSS THE WHOLE SPAN, not taken from the front: the first six would
 * be six films from one year, the newest six would make every band look like
 * 2024. An even stride says "this is eighteen years of work".
 *
 * DEDUPED, because three titles can share one poster — Daredevil seasons 1, 2
 * and 3 all carry the same path on TMDB, which showed the same art twice in a
 * six-tile strip and made React warn about a duplicate key.
 *
 * TMDB paths only. One title carries an absolute URL and these bands build a
 * fixed size prefix; a scrim-covered strip can spare one of 167.
 */
export function bandFor(id: Collection, count = 6): string[] {
  const list = [
    ...new Set(
      releaseOrder(membersOf(id))
        .map((t) => posterOf(t.id))
        .filter((p): p is string => p !== null && !p.startsWith("http")),
    ),
  ];
  const stride = Math.max(1, Math.floor(list.length / count));
  return list.filter((_, i) => i % stride === 0).slice(0, count);
}
