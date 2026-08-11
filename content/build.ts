import generatedRaw from "./tmdb.generated.json";
/**
 * IMDb's OWN published ratings dataset, keyed on the same imdbId the TMDB sync
 * stores. Keyless, official, updated daily. This is why the page can say
 * "IMDb" and mean it.
 */
import imdbRaw from "./imdb.generated.json";
import { titles as authored } from "./titles";
import { spoilerSafe as authoredCopy } from "./copy";
import { Title, type TitleSource } from "./schema";

/**
 * THE MERGE — where hand-authored nodes meet machine-fetched facts.
 *
 * `content/titles.ts` is what a human wrote. `content/tmdb.generated.json` is
 * what `npm run sync:tmdb` fetched. Neither is what a page should render: this
 * module joins them and is the ONLY thing pages import.
 *
 * Without it the `Title` schema is a gate with nothing passing through it —
 * sync would write its file, the file would be committed, and every page would
 * go on saying "runtime not yet synced" forever.
 *
 * Precedence, deliberately asymmetric:
 *   releaseDate  → generated wins. It is strictly more precise; the corpus only
 *                  ever carries the year the source document gave.
 *   runtimeMin,
 *   tmdbId/Type  → hand-authored wins if present. A human who typed one meant it.
 *   context      → hand-authored wins ALWAYS. The TMDB overview seeds THIS
 *                  field, never spoilerSafe — see below.
 *   spoilerSafe  → never seeded from TMDB. Comes from `copy.ts`, which is
 *                  hand-written; a node-level override in titles.ts still wins.
 *   posterPath,
 *   posterTint   → generated only. Nobody hand-writes a TMDB hash.
 */

export interface CastCredit {
  actor: string;
  actorPhoto: string | null;
  character: string;
}

interface SyncedFields {
  tmdbId: number | null;
  tmdbType: "movie" | "tv" | null;
  releaseDate: string;
  runtimeMin: number | null;
  /** Season nodes only; fetched by the same request that sums their runtimes. */
  episodes?: {
    season: number;
    number: number;
    name: string;
    still: string | null;
    runtime: number | null;
  }[];
  posterPath: string | null;
  posterTint: string;
  overviewEn: string | null;
  overviewAr: string | null;
  providers?: Record<string, string[]>;
  providersGlobal?: string[];
  imdbId?: string | null;
  rtScore?: number | null;
  metacritic?: number | null;
  tmdbRating?: number | null;
  tmdbVotes?: number | null;
  trailerKey?: string | null;
  videos?: { key: string; name: string; type: string; official: boolean; publishedAt: string | null }[];
  posters?: string[];
  backdrop?: string | null;
  cast?: CastCredit[];
  authors?: string[];
  authorRole?: "director" | "creator" | null;
  genres?: string[];
}

const generated = generatedRaw as unknown as Record<string, SyncedFields>;
const generatedIds = Object.keys(generated);

/** True once sync has run at all. An empty file is the un-synced state. */
export const isSynced = generatedIds.length > 0;

// ---------------------------------------------------------------------------
// Join integrity — checked in BOTH directions, at import time
// ---------------------------------------------------------------------------

if (isSynced) {
  const corpusIds = new Set(authored.map((t) => t.id));

  // A record with no node: someone renamed an id and orphaned its data. The
  // title would silently lose its runtime and poster, forever, with no error.
  const orphans = generatedIds.filter((id) => !corpusIds.has(id));

  // A node with no record: a title added since the last sync. Rendering it
  // beside fully-populated neighbours is worse than failing the build.
  const unfetched = authored
    .filter((t) => !(t.id in generated))
    .map((t) => t.id);

  if (orphans.length > 0 || unfetched.length > 0) {
    throw new Error(
      "content/tmdb.generated.json is out of sync with content/titles.ts.\n" +
        (orphans.length
          ? `  ${orphans.length} orphaned record(s) — no such title: ${orphans.join(", ")}\n`
          : "") +
        (unfetched.length
          ? `  ${unfetched.length} title(s) never fetched: ${unfetched.join(", ")}\n`
          : "") +
        "  Run `npm run sync:tmdb` and commit the result.",
    );
  }
}

/**
 * copy.ts is checked in both directions too, for the same reason: a key that
 * matches no title is a line somebody wrote that will never be read, and a
 * title with no key ships a blank where the always-visible one-liner goes.
 */
{
  const corpusIds = new Set(authored.map((t) => t.id));
  const orphanCopy = Object.keys(authoredCopy).filter(
    (id) => !corpusIds.has(id),
  );
  const noCopy = authored.filter(
    (t) => !(t.id in authoredCopy) && t.spoilerSafe === null,
  );

  if (orphanCopy.length > 0 || noCopy.length > 0) {
    throw new Error(
      "content/copy.ts does not line up with content/titles.ts.\n" +
        (orphanCopy.length
          ? `  ${orphanCopy.length} line(s) for no such title: ${orphanCopy.join(", ")}\n`
          : "") +
        (noCopy.length
          ? `  ${noCopy.length} title(s) with no spoiler-safe line: ${noCopy.map((t) => t.id).join(", ")}\n`
          : ""),
    );
  }
}

// ---------------------------------------------------------------------------
// The merge
// ---------------------------------------------------------------------------

/**
 * Spreading `{ en: undefined }` over a seed erases the seed. An override that
 * names only Arabic must leave English alone, so the absent key has to be
 * genuinely absent before it reaches the spread.
 */
function stripUndefined<T extends object>(v: T | null | undefined): Partial<T> {
  if (!v) return {};
  return Object.fromEntries(
    Object.entries(v).filter(([, x]) => x !== undefined),
  ) as Partial<T>;
}

function merge(t: TitleSource): TitleSource {
  /** Hand-written line from copy.ts. A node-level override still outranks it. */
  const line = t.spoilerSafe ?? authoredCopy[t.id] ?? null;

  const g = generated[t.id];
  // A title TMDB could not match still gets its copy — the two are independent.
  if (!g) return { ...t, spoilerSafe: line };

  /**
   * The TMDB overview seeds `context`, NOT `spoilerSafe`.
   *
   * An overview is a marketing synopsis. It routinely gives away the premise
   * turn, and for Infinity War or Endgame it describes the plot outright.
   * `spoilerSafe` is defined as the line shown ALWAYS, shield up or down — so
   * seeding it from an overview switches the spoiler shield off by default for
   * every title TMDB matched, silently, while every test stays green. Spoiler
   * safety is one of the five things this project competes on (§1).
   *
   * `context` is the shielded field — connective tissue, masked until tapped —
   * which is exactly what a synopsis is. Hand-authored context still wins.
   *
   * The override is applied PER LANGUAGE, not as a whole object. The Arabic
   * review hand-wrote 14 Arabic context lines; five of those titles have an
   * English overview from TMDB that is still current, and replacing the object
   * wholesale would silently blank it. Merging field-by-field means an authored
   * Arabic line wins over the `ar-SA` seed while the English keeps syncing.
   */
  const seed =
    g.overviewEn && g.overviewAr
      ? { en: g.overviewEn, ar: g.overviewAr }
      : null;
  const seededContext =
    t.context || seed ? { ...seed, ...stripUndefined(t.context) } : null;

  return {
    ...t,
    releaseDate: g.releaseDate || t.releaseDate,
    /* Fetched first, always. The fallback only fills a hole the sync left. */
    runtimeMin: t.runtimeMin ?? g.runtimeMin ?? t.runtimeFallbackMin ?? null,
    tmdbId: t.tmdbId ?? g.tmdbId,
    tmdbType: t.tmdbType ?? g.tmdbType,
    context: seededContext,
    // spoilerSafe comes from copy.ts, NEVER from the overview.
    spoilerSafe: line,
  };
}

const merged = authored.map(merge);

/**
 * What every page renders from.
 *
 * Typed as `TitleSource[]`, not `Title[]`, on purpose: `Title` is the stricter
 * shape and the repo must still build for anyone who clones it and has not run
 * sync. Pages already handle a null runtime honestly — that path stays working
 * rather than becoming a type error nobody can satisfy without an API key.
 */
export const titles: TitleSource[] = merged;

export const byId = new Map(titles.map((t) => [t.id, t]));

/**
 * Which nodes actually clear the `Title` gate — full-precision date, real
 * runtime, bilingual spoiler-safe copy.
 *
 * Expect this to be short of the full corpus even after a successful sync:
 * TMDB's `ar-SA` overviews are patchy, and `docs/COPY-TODO.md` lists exactly
 * which ones need a human. That is the honest state, not a failure.
 */
export const built = merged.filter((t) => Title.safeParse(t).success);

export const isComplete = isSynced && built.length === merged.length;

/** For code that genuinely cannot proceed without the guarantees. */
export function requireBuilt() {
  if (!isComplete) {
    const short = merged.length - built.length;
    throw new Error(
      `${short} of ${merged.length} titles do not clear the Title gate. ` +
        (isSynced
          ? "See docs/COPY-TODO.md — most gaps are missing Arabic copy."
          : "Run `npm run sync:tmdb` first."),
    );
  }
  return built;
}

/**
 * The TMDB poster path for a title, or null.
 *
 * Pages need this without importing the generated JSON directly — the tint that
 * pairs with it lives in app/poster-tints.css, keyed off the same id, so the two
 * cannot drift.
 */
/** The poster's dominant colour, "#rrggbb". Null where none was extracted. */
export function tintOf(id: string): string | null {
  return generated[id]?.posterTint ?? null;
}

export function posterOf(id: string): string | null {
  /**
   * A hand-set absolute URL wins. It starts with "http" where a TMDB path
   * starts with "/", and every consumer branches on that rather than being
   * handed two differently-named fields it has to remember to check.
   */
  const authoredUrl = authored.find((t) => t.id === id)?.posterUrl;
  return authoredUrl ?? generated[id]?.posterPath ?? null;
}

/** True when `posterOf` returned a complete URL rather than a TMDB path. */
export function isAbsolutePoster(src: string): boolean {
  return src.startsWith("http");
}

/**
 * Where a title streams, by region. Build-time TMDB/JustWatch data.
 *
 * We link OUT and never embed or host video (§10). Kept for anything that still
 * needs the region breakdown; the UI reads `providersGlobalOf` instead.
 */
export function providersOf(id: string): Record<string, string[]> {
  return generated[id]?.providers ?? {};
}

/**
 * EVERY provider TMDB knows of, anywhere, deduplicated.
 *
 * The region selector is gone. Per-country coverage is thin and gating on it
 * made the site look emptier than the world is: "not streaming in OM" was a
 * false negative for a Marvel film that is on Disney+ in Oman. One list plus a
 * line saying availability varies is both truer and more useful.
 */
export function providersGlobalOf(id: string): string[] {
  return generated[id]?.providersGlobal ?? [];
}

/**
 * TMDB's OWN score, and its vote count, or null.
 *
 * NOT IMDb's. They are different numbers from different populations, and a UI
 * that prints one under the other's name is lying. The label is "TMDB"
 * everywhere this is rendered, and `imdbIdOf` exists so a real IMDb rating can
 * be joined later without a migration.
 */
export interface Ratings {
  /** IMDb, when OMDb ran. Null otherwise — never TMDB's number relabelled. */
  imdb: { score: number; votes: number } | null;
  /** The Tomatometer, 0-100. Critics, not audience. */
  rt: number | null;
  /** Metacritic, 0-100. A real third critic score, from a source. */
  metacritic: number | null;
  /** TMDB's own. Synced, not rendered; a different population from IMDb's. */
  tmdb: { score: number; votes: number } | null;
}

/**
 * Every score we hold, each labelled with whose it is.
 *
 * There is no Letterboxd figure: they have no public API, and scraping one to
 * print it as fact is exactly what this corpus refuses to do elsewhere.
 * Metacritic fills that slot honestly instead, from OMDb, from a source.
 */
const imdb = imdbRaw as Record<string, { score: number; votes: number }>;

export function ratingsOf(id: string): Ratings {
  const g = generated[id];
  return {
    /** IMDb's own number, from IMDb's own dataset. Never TMDB's relabelled. */
    imdb: imdb[id] ?? null,
    rt: typeof g?.rtScore === "number" ? g.rtScore : null,
    metacritic: typeof g?.metacritic === "number" ? g.metacritic : null,
    tmdb:
      g && typeof g.tmdbRating === "number" && g.tmdbVotes
        ? { score: g.tmdbRating, votes: g.tmdbVotes }
        : null,
  };
}

export function imdbIdOf(id: string): string | null {
  const authoredId = authored.find((t) => t.id === id)?.imdbId;
  return authoredId ?? generated[id]?.imdbId ?? null;
}

/** A YouTube key, never a URL. The player is a facade; nothing is embedded. */
export function trailerOf(id: string): string | null {
  return generated[id]?.trailerKey ?? null;
}

export interface TitleVideo {
  key: string;
  name: string;
  type: string;
  official: boolean;
  publishedAt: string | null;
}

/**
 * Every official teaser and trailer, in campaign order. A film usually has
 * three or four, and showing one and calling it "the trailer" hid the rest.
 */
export function videosOf(id: string): TitleVideo[] {
  return generated[id]?.videos ?? [];
}

/** The gallery. Capped at 8 by the sync so the committed JSON stays reviewable. */
export function postersOf(id: string): string[] {
  return generated[id]?.posters ?? [];
}

/** The 16:9 hero image. Null is common on shorts and unreleased titles. */
export function backdropOf(id: string): string | null {
  return generated[id]?.backdrop ?? null;
}

/** Top 12 by billing order. */
export function castOf(id: string): CastCredit[] {
  return generated[id]?.cast ?? [];
}

/**
 * The episodes of a season node, in order. Empty for anything that is not one.
 *
 * Fetched by the same season request that already sums per-episode runtimes,
 * so this costs nothing new. A still and a name each — no synopsis, because an
 * episode synopsis is a spoiler with a title on it.
 */
export function episodesOf(
  id: string,
): {
  season: number;
  number: number;
  name: string;
  still: string | null;
  runtime: number | null;
}[] {
  return generated[id]?.episodes ?? [];
}

/**
 * Who made it, and under which claim. A film returns its director; a series
 * returns its creators, because direction on a series is per episode and no
 * show-level name stands for it honestly.
 */
export function authorsOf(id: string): {
  names: string[];
  photos: (string | null)[];
  role: "director" | "creator" | null;
} {
  const g = generated[id];
  return {
    names: g?.authors ?? [],
    /* Older generated data has no photos; a name with no face still renders. */
    photos: (g as { authorPhotos?: (string | null)[] } | undefined)?.authorPhotos ?? [],
    role: g?.authorRole ?? null,
  };
}

/** TMDB genre names. The projects filter reads these. */
export function genresOf(id: string): string[] {
  return generated[id]?.genres ?? [];
}

/** A one-line summary for the validator and for CI logs. */
export function syncSummary() {
  const withRuntime = merged.filter((t) => t.runtimeMin !== null).length;
  const withPoster = generatedIds.filter(
    (id) => generated[id]?.posterPath,
  ).length;
  const withContext = merged.filter((t) => t.context !== null).length;
  const withSpoilerSafe = merged.filter((t) => t.spoilerSafe !== null).length;
  return {
    synced: isSynced,
    total: merged.length,
    withRuntime,
    withPoster,
    withContext,
    withSpoilerSafe,
  };
}
