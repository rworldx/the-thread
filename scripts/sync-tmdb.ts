/**
 * scripts/sync-tmdb.ts — the bridge between TitleSource and Title.
 *
 * Run manually when titles are added:  npm run sync:tmdb
 *
 * Fetches at BUILD time, never at request time (brief §14.1). Output lands in
 * `content/tmdb.generated.json` and is COMMITTED, so:
 *   - production makes zero TMDB calls; no rate limit, no third-party outage
 *   - every page stays static HTML
 *   - poster paths and runtimes are reviewable in a PR diff
 *
 * It writes to a separate generated file rather than editing titles.ts in
 * place, so a sync run never touches hand-written editorial content and the
 * diff is obvious.
 *
 * Auth: TMDB v4 API Read Access Token as a bearer. Server-side only, never a
 * NEXT_PUBLIC_ var — this file never runs in a browser (brief §9).
 */

import { writeFile } from "node:fs/promises";
import { generateTintStylesheet } from "./gen-tints";
import { titles } from "../content/titles";
import type { TitleSource } from "../content/schema";

const TOKEN = process.env.TMDB_READ_TOKEN;
const API = "https://api.themoviedb.org/3";

if (!TOKEN) {
  console.error(
    "TMDB_READ_TOKEN is not set.\n" +
      "Get an API Read Access Token (v4 bearer, NOT the v3 key) from\n" +
      "  https://www.themoviedb.org/settings/api\n" +
      "then put it in .env.local as:  TMDB_READ_TOKEN=eyJ...\n",
  );
  process.exit(1);
}

export interface SyncedFields {
  tmdbId: number | null;
  tmdbType: "movie" | "tv" | null;
  releaseDate: string;
  runtimeMin: number | null;
  /**
   * THE EPISODES, for the season nodes that have them.
   *
   * A season page said "8 episodes, 6h 12m" and stopped, which is a receipt
   * rather than a look at the thing. The episode list — a still and a title
   * each — is what a streaming service shows, and it is the difference between
   * knowing a season is eight hours and knowing what is IN it.
   *
   * It costs no extra requests. `seasonRuntime` was already fetching every
   * season's detail to sum real per-episode runtimes, and throwing away
   * everything on the response except the numbers.
   *
   * NO OVERVIEWS. An episode synopsis is a spoiler with a title on it, and
   * this site refuses those everywhere else; the still and the name say what
   * the episode is without saying what happens.
   */
  episodes: {
    season: number;
    number: number;
    name: string;
    still: string | null;
    /** Minutes, or null where TMDB has none — never a confident zero. */
    runtime: number | null;
  }[];
  posterPath: string | null;
  posterTint: string;
  overviewEn: string | null;
  overviewAr: string | null;
  /**
   * Where to watch, per region — TMDB's JustWatch data, fetched at BUILD time
   * like everything else. Region code → provider names.
   *
   * We link out and never embed (§10). A site that streams is a takedown; one
   * that routes traffic to legal streamers is one the studios are happy about.
   *
   * KEPT, but no longer what the UI reads. See `providersGlobal`.
   */
  providers: Record<string, string[]>;

  /**
   * Every provider TMDB knows of, ANYWHERE, deduplicated by name.
   *
   * The region selector is gone. Per-country coverage is thin and gating on it
   * made the site look emptier than the world is: "not streaming in OM" is a
   * false negative for a Marvel film that is on Disney+ in Oman. One list, and
   * a line saying availability varies, is both truer and more useful.
   */
  providersGlobal: string[];

  // --- PRD v2 ------------------------------------------------------------
  /** The join key for the IMDb and Rotten Tomatoes scores below. */
  imdbId: string | null;
  /**
   * The two CRITIC scores, from OMDb's `Ratings` array. Null unless
   * OMDB_API_KEY was set when the sync ran.
   *
   * IMDb is deliberately NOT here: it comes from IMDb's own daily dump in
   * scripts/sync-ratings.ts, which is authoritative where OMDb keeps a copy
   * that can lag.
   */
  /** The Tomatometer, 0-100. Critics, not audience. */
  rtScore: number | null;
  /** Metacritic, 0-100. The honest answer to the Letterboxd gap. */
  metacritic: number | null;
  /**
   * TMDB's OWN score and vote count, not IMDb's. These are different numbers
   * from different populations and the UI must never print one under the
   * other's name. See README → Ratings for the decision and its trigger.
   */
  tmdbRating: number | null;
  tmdbVotes: number | null;
  /** YouTube key, never a full URL. The player is a facade; see §6. */
  trailerKey: string | null;
  /**
   * EVERY official YouTube video TMDB has, not just the first trailer.
   * A film usually has a teaser, two or three trailers and a featurette, and
   * showing one of them and calling it "Trailer" hides the rest for no reason.
   */
  videos: TitleVideo[];
  /** The gallery, capped. Ordered by TMDB vote average, best first. */
  posters: string[];
  /** The title-page hero image. 16:9, unlike everything else here. */
  backdrop: string | null;
  cast: CastCredit[];
  /**
   * WHO MADE IT. A film has a director; a series has creators, and per-episode
   * directors that no show-level record can meaningfully summarise. So the
   * label travels with the names rather than being assumed by the UI.
   */
  authors: string[];
  authorPhotos: (string | null)[];
  authorRole: "director" | "creator" | null;
  /** TMDB genre names, for the projects filter. */
  genres: string[];
}

export interface TitleVideo {
  key: string;
  name: string;
  /** "Trailer" | "Teaser" | "Clip" | "Featurette" | "Behind the Scenes" */
  type: string;
  official: boolean;
  /** ISO date, so the list can run oldest-first the way a campaign ran. */
  publishedAt: string | null;
}

export interface CastCredit {
  actor: string;
  /** TMDB `profile_path`. Null is common and has to render as something. */
  actorPhoto: string | null;
  /** As credited, which is not always the character's canonical name. */
  character: string;
}

/**
 * The regions worth shipping. GCC first, because that is the audience the whole
 * Arabic side exists for and it is the region JustWatch-backed sites cover
 * worst. Every extra region is bytes in the committed JSON, so this is a list
 * rather than "everything TMDB has".
 */
/**
 * Canonical name to the fragments TMDB uses for it. Order here is the order
 * they render, which puts the ones this audience is likeliest to hold first.
 */
const PROVIDERS: [string, string[]][] = [
  ["Disney+", ["disney plus", "disney+"]],
  ["Netflix", ["netflix"]],
  ["Prime Video", ["amazon prime video", "prime video", "amazon video"]],
  ["OSN+", ["osn"]],
  ["Shahid", ["shahid"]],
  ["HBO Max", ["hbo max", "max"]],
  ["StarzPlay", ["starzplay", "starz play", "starz"]],
  ["Hulu", ["hulu"]],
  ["Apple TV", ["apple tv"]],
  ["TOD", ["tod"]],
  ["Crunchyroll", ["crunchyroll"]],
];

function canonicalProviders(found: Set<string>): string[] {
  const lower = [...found].map((x) => x.toLowerCase());
  return PROVIDERS.filter(([, frags]) =>
    frags.some((f) => lower.some((x) => x === f || x.startsWith(f + " ") || x.includes(f))),
  ).map(([name]) => name);
}

const REGIONS = ["OM", "AE", "SA", "KW", "QA", "BH", "EG", "GB", "US"];

const NEUTRAL_TINT = "#241414"; // --muted, dark. A calm box, not a loading state.

/** id → how many episodes had no runtime on TMDB and were filled with an average. */
const estimatedFor = new Map<string, number>();
/** OMDb failures, reported at the end rather than written as nulls. */
const omdbErrors: string[] = [];

/**
 * showId → the resolved TMDB record, looked up ONCE per show.
 *
 * Season nodes carry the SEASON's year, not the show's. Searching "What If…?"
 * filtered to 2023 excluded the real show (first aired 2021) and cheerfully
 * returned "Jurassic What If…?" instead; Daredevil seasons 2 and 3 matched two
 * entirely different series. Every node sharing a showId is by definition the
 * same TMDB record, so it gets resolved once and reused.
 */
const showCache = new Map<string, { id: number; kind: "movie" | "tv" } | null>();

/** showId → the earliest year any of its nodes claims, which is the show's year. */
const showFirstYear = new Map<string, string>();
for (const t of titles) {
  if (!t.showId) continue;
  const year = t.releaseDate.slice(0, 4);
  const prior = showFirstYear.get(t.showId);
  if (!prior || year < prior) showFirstYear.set(t.showId, year);
}

async function tmdb<T>(path: string, params: Record<string, string> = {}): Promise<T | null> {
  const url = new URL(API + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}`, accept: "application/json" },
  });

  if (res.status === 429) {
    const wait = Number(res.headers.get("retry-after") ?? 2) * 1000;
    await sleep(wait);
    return tmdb<T>(path, params);
  }
  if (!res.ok) return null;
  return (await res.json()) as T;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Films and TV are different endpoints, and `type` is the WRONG signal for
 * choosing between them: Into the Spider-Verse is `type: "animation"` and
 * Werewolf by Night is `type: "special"`, and TMDB lists both as movies. Keying
 * off `type` sent six titles to the wrong endpoint and matched nothing.
 *
 * `seasons` is the honest signal — a node that covers seasons is episodic, and
 * a node that covers none is not, whatever we call it.
 */
function endpointFor(t: TitleSource): "movie" | "tv" {
  return t.seasons.length > 0 ? "tv" : "movie";
}

async function resolveId(t: TitleSource): Promise<{ id: number; kind: "movie" | "tv" } | null> {
  if (t.tmdbId && t.tmdbType) return { id: t.tmdbId, kind: t.tmdbType };

  // Every node sharing a showId is the same TMDB record — resolve it once.
  if (t.showId && showCache.has(t.showId)) return showCache.get(t.showId)!;

  // Search on the SHOW's year, not this season's. Loki season 2 is a 2023 node
  // on a show that first aired in 2021.
  const year = t.showId ? (showFirstYear.get(t.showId) ?? t.releaseDate.slice(0, 4)) : t.releaseDate.slice(0, 4);
  // Strip our own season/range suffixes before searching — TMDB indexes the
  // show, not "Loki: Season 1".
  const query = t.titleEn
    .replace(/:?\s*Seasons? \d+(–\d+)?$/i, "")
    .replace(/\s*—\s*Season \d+$/i, "")
    .replace(/\s*\(\d{4}(–\d{4})?\)$/, "")
    .trim();

  /**
   * Pick the best result, not the first one.
   *
   * TMDB orders search results by its own relevance, which is NOT "the thing
   * you meant". Searching "X-Men" for 2000 returns "X-Men: The Mutant Watch", a
   * 22-minute promo featurette, ahead of the actual film; "X2" for 2003 returns
   * "X2 Global Webcast Highlights" at 17 minutes. Both were taken silently and
   * both shipped a wrong runtime onto the thread, where only rendering the page
   * revealed it.
   *
   * An exact title match wins outright; failing that, popularity.
   */
  const pick = (results: TmdbResult[]): TmdbResult | null => {
    if (results.length === 0) return null;
    const norm = (v: string) => v.toLowerCase().replace(/[\s\u2019']/g, "");
    const target = norm(query);

    const exact = results.filter((r) => norm(r.title ?? r.name ?? "") === target);
    const pool = exact.length > 0 ? exact : results;
    return [...pool].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))[0] ?? null;
  };

  const search = async (kind: "movie" | "tv", withYear: boolean) => {
    const r = await tmdb<{ results: TmdbResult[] }>(`/search/${kind}`, {
      query,
      ...(withYear
        ? kind === "movie"
          ? { primary_release_year: year }
          : { first_air_date_year: year }
        : {}),
    });
    const best = pick(r?.results ?? []);
    return best ? { id: best.id, kind } : null;
  };

  const primary = endpointFor(t);
  const other = primary === "movie" ? "tv" : "movie";

  const found =
    // Year first: it disambiguates the three Fantastic Fours and two Spider-Mans.
    (await search(primary, true)) ??
    // Then without — our source years are occasionally off by one (The Amazing
    // Spider-Man is listed as 2013; TMDB says 2012).
    (await search(primary, false)) ??
    // Then the other endpoint. Disney+ "specials" are catalogued inconsistently,
    // so a miss on one side is not evidence the title does not exist.
    (await search(other, true)) ??
    (await search(other, false));

  if (t.showId) showCache.set(t.showId, found);
  return found;
}

interface TmdbResult {
  id: number;
  title?: string;
  name?: string;
  popularity?: number;
}

interface MovieDetail {
  runtime: number | null;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average?: number;
  vote_count?: number;
  genres?: { name: string }[];
}

/**
 * Everything `append_to_response` folds into the detail call.
 *
 * One request per title instead of five. The alternative was images, videos,
 * credits, external_ids and watch/providers as separate round trips, which at
 * 147 titles is 735 requests against a rate-limited API for data that TMDB will
 * hand over in a single response.
 */
interface Appended {
  external_ids?: { imdb_id?: string | null };
  videos?: {
    results: {
      key: string;
      site: string;
      type: string;
      name?: string;
      official?: boolean;
      published_at?: string;
    }[];
  };
  images?: { posters?: { file_path: string; vote_average?: number }[] };
  credits?: {
    cast?: { name: string; character?: string; profile_path?: string | null; order?: number }[];
    crew?: { name: string; job?: string; profile_path?: string | null; department?: string }[];
  };
  /**
   * TV ONLY, and it is a different shape from `credits` on purpose.
   *
   * `credits` on a TV record returns the SERIES REGULARS — the people under
   * contract for the show — and nothing else. For an anthology that is close to
   * nothing at all: What If returned exactly one credit, the Watcher, across
   * three seasons. Eleven series had two credits or fewer, and TV averaged 8
   * against 38 for films.
   *
   * Because APPEARANCES ARE DERIVED FROM CAST, that ceiling was invisible and
   * absolute: no amount of writing character records could put Captain Carter
   * in What If, because the credit was not there to match.
   *
   * `aggregate_credits` returns every performer across every episode, with
   * their roles nested — one entry per person, `roles[]` per character they
   * played, and `total_episode_count` for billing.
   */
  aggregate_credits?: {
    cast?: {
      name: string;
      profile_path?: string | null;
      order?: number;
      total_episode_count?: number;
      roles?: { character?: string; episode_count?: number }[];
    }[];
    crew?: { name: string; job?: string; department?: string }[];
  };
  created_by?: { name: string; profile_path?: string | null }[];
  "watch/providers"?: {
    results?: Record<
      string,
      { flatrate?: { provider_name: string }[]; free?: { provider_name: string }[] }
    >;
  };
}
interface TvDetail {
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average?: number;
  vote_count?: number;
  seasons: { season_number: number; episode_count: number; air_date: string | null }[];
  episode_run_time: number[];
}
interface SeasonDetail {
  air_date: string | null;
  episodes: {
    runtime: number | null;
    episode_number: number;
    name: string | null;
    still_path: string | null;
  }[];
}

/**
 * Sum a season's ACTUAL per-episode runtimes.
 *
 * The show-level `episode_run_time` is a single average TMDB reports
 * inconsistently, and using it priced What If…? at 45 min/episode when its
 * episodes run about 32 — a 40% overstatement on a total the site asks people
 * to plan evenings around. One extra request per season buys real numbers.
 *
 * Episodes with a null runtime fall back to the show average; the count of
 * those is returned so the caller can flag an estimate as such.
 */
async function seasonRuntime(
  tvId: number,
  season: number,
  fallbackPerEpisode: number,
): Promise<{
  minutes: number;
  airDate: string | null;
  guessed: number;
  episodes: SyncedFields["episodes"];
} | null> {
  const detail = await tmdb<SeasonDetail>(`/tv/${tvId}/season/${season}`);
  if (!detail?.episodes?.length) return null;

  let minutes = 0;
  let guessed = 0;
  for (const ep of detail.episodes) {
    if (typeof ep.runtime === "number" && ep.runtime > 0) minutes += ep.runtime;
    else {
      minutes += fallbackPerEpisode;
      guessed += 1;
    }
  }
  /* Specials (season 0) and unaired entries come back with no name; an
     untitled row in a list of episodes reads as a bug rather than as data. */
  const episodes = detail.episodes
    .filter((ep) => (ep.name ?? "").trim().length > 0)
    .map((ep) => ({
      season,
      number: ep.episode_number,
      name: ep.name!.trim(),
      still: ep.still_path ?? null,
      /* The real per-episode figure, not the show average that already gets
         substituted into the season total. A null here renders as nothing at
         all, which is honest; a fallback would print the same number under
         every episode and look like data. */
      runtime: typeof ep.runtime === "number" && ep.runtime > 0 ? ep.runtime : null,
    }));

  return { minutes, airDate: detail.air_date ?? null, guessed, episodes };
}

async function fetchOne(t: TitleSource): Promise<SyncedFields> {
  const resolved = await resolveId(t);
  const blank: SyncedFields = {
    tmdbId: null,
    tmdbType: null,
    releaseDate: t.releaseDate,
    runtimeMin: null,
    episodes: [],
    posterPath: null,
    posterTint: NEUTRAL_TINT,
    overviewEn: null,
    overviewAr: null,
    providers: {},
    providersGlobal: [],
    imdbId: null,
    rtScore: null,
    metacritic: null,
    tmdbRating: null,
    tmdbVotes: null,
    trailerKey: null,
    videos: [],
    posters: [],
    backdrop: null,
    cast: [],
    authors: [],
    authorPhotos: [],
    authorRole: null,
    genres: [],
  };
  if (!resolved) return blank;

  const { id, kind } = resolved;
  /**
   * ONE request for the detail plus images, videos, credits, external ids and
   * providers. `include_image_language=en,null` keeps the gallery from coming
   * back with the same poster in eleven languages.
   */
  const [en, ar] = await Promise.all([
    tmdb<MovieDetail & TvDetail & Appended>(`/${kind}/${id}`, {
      language: "en-US",
      /* `aggregate_credits` is a TV-only endpoint and `credits` is the movie
         one; asking for both costs nothing and keeps this a single request. */
      append_to_response:
        kind === "tv"
          ? "images,videos,aggregate_credits,credits,external_ids,watch/providers"
          : "images,videos,credits,external_ids,watch/providers",
      include_image_language: "en,null",
    }),
    tmdb<{ overview: string }>(`/${kind}/${id}`, { language: "ar-SA" }),
  ]);
  if (!en) return blank;

  const posterPath = en.poster_path ?? null;

  // Region map, kept for anything that still wants it.
  const wpResults = en["watch/providers"]?.results ?? {};
  const providers: Record<string, string[]> = {};
  for (const region of REGIONS) {
    const names = (wpResults[region]?.flatrate ?? []).map((p) => p.provider_name);
    if (names.length > 0) providers[region] = names;
  }

  /**
   * Every region TMDB has, flattened and deduplicated by name. Sorted so the
   * committed JSON does not churn on every sync for no reason.
   */
  /**
   * ONLY THE SERVICES ANYONE HERE ACTUALLY HAS.
   *
   * TMDB returns every regional reseller and bundle it knows of, so a popular
   * film came back with thirty names, most of them channels nobody in this
   * audience subscribes to. Thirty chips is not an answer to "where can I watch
   * this", it is a haystack. This is the allowlist, matched loosely because
   * TMDB writes the same service several ways: "Amazon Prime Video",
   * "Prime Video", "Amazon Video".
   */
  const globalSet = new Set<string>();
  for (const entry of Object.values(wpResults)) {
    for (const p of entry?.flatrate ?? []) globalSet.add(p.provider_name);
    for (const p of entry?.free ?? []) globalSet.add(p.provider_name);
  }
  const providersGlobal = canonicalProviders(globalSet);

  /**
   * A trailer, preferring an official one. Some titles have none, and that is a
   * real state rather than a bug: the facade renders the poster and no play
   * button, which is designed rather than blank.
   */
  /**
   * OFFICIAL YouTube videos, teasers and trailers first.
   *
   * TMDB returns fan edits and reaction uploads alongside the real thing, so
   * `official` is the filter that keeps this honest. Clips and behind-the-scenes
   * are dropped: someone on a watch-order site wants to know what a film looks
   * like, not to watch a six-part press junket.
   *
   * Ordered by publication date, which is the order the campaign ran: teaser,
   * then trailer, then the final one.
   */
  const WANTED = new Set(["Teaser", "Trailer"]);
  const videos: TitleVideo[] = (en.videos?.results ?? [])
    .filter((v) => v.site === "YouTube" && v.official && WANTED.has(v.type))
    .map((v) => ({
      key: v.key,
      name: v.name ?? v.type,
      type: v.type,
      official: Boolean(v.official),
      publishedAt: v.published_at ?? null,
    }))
    .sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""))
    // Deduplicated by key: TMDB lists the same upload twice often enough.
    .filter((v, i, xs) => xs.findIndex((y) => y.key === v.key) === i);

  /** The one the facade opens with: the last full trailer, else anything. */
  const trailerKey =
    [...videos].reverse().find((v) => v.type === "Trailer")?.key ?? videos[0]?.key ?? null;

  /**
   * The gallery, capped at 8. Uncapped, a popular film returns 40+ posters and
   * the committed JSON stops being reviewable in a pull request.
   */
  const posters = [...(en.images?.posters ?? [])]
    .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
    .slice(0, 8)
    .map((x) => x.file_path);

  /**
   * A film's DIRECTOR, or a series' CREATORS.
   *
   * `credits.crew` only carries a director for a movie; on a TV record the crew
   * is show-level production staff and the direction is per episode, which no
   * single name can honestly stand for. TMDB gives `created_by` there instead,
   * and that is a different claim, so it is stored with its own label rather
   * than printed under "Director".
   *
   * Deduplicated: co-directed films list the same pair on several crew rows.
   */
  const directorRows = (en.credits?.crew ?? []).filter((c) => c.job === "Director");
  const directors = [...new Set(directorRows.map((c) => c.name))];
  const creators = [...new Set((en.created_by ?? []).map((c) => c.name))];
  const authors = kind === "movie" ? directors : creators;
  /**
   * THE AUTHOR'S FACE, alongside the name.
   *
   * The director is the single most useful credit on a title page and it was a
   * line of plain text under the heading while forty actors got portraits. One
   * photo per name, in the same order, so the page can put the person who made
   * the thing above the people who are in it.
   */
  const photoOf = (name: string): string | null =>
    (kind === "movie"
      ? directorRows.find((c) => c.name === name)?.profile_path
      : (en.created_by ?? []).find((c) => c.name === name)?.profile_path) ?? null;
  const authorPhotos = authors.map(photoOf);
  const authorRole: "director" | "creator" | null =
    authors.length === 0 ? null : kind === "movie" ? "director" : "creator";

  /**
   * TOP 40, up from 12, and the cap is what was limiting the product.
   *
   * Endgame credits 106 people. Twelve of them stopped at Doctor Strange, so
   * Valkyrie, Okoye, Wong, Shuri, Mantis, Drax, the Ancient One, Frigga, Pepper
   * Potts, Hank Pym and Janet Van Dyne were all absent from a film they are
   * plainly in — and because APPEARANCES ARE DERIVED FROM CAST, no amount of
   * writing character records could have fixed it. The ceiling was here.
   *
   * 40 is where the billing order stops naming people anyone recognises and
   * starts naming stunt doubles and on-set voices. It roughly triples the
   * character graph without adding noise to a cast rail.
   */
  /**
   * TV READS `aggregate_credits`, FILMS READ `credits`.
   *
   * One performer can play several roles across a run, so an aggregate entry
   * carries `roles[]` rather than a single `character`. They are joined with a
   * slash, which is the same shape TMDB already uses for a double role in a
   * film ("Marc Spector / Steven Grant / Moon Knight / Mr. Knight") and which
   * the alias matcher already splits on. Nothing downstream changes.
   *
   * ORDERING IS BY EPISODE COUNT, and `order` is deliberately ignored here.
   *
   * I first wrote this as "fall back to episode count where TMDB gives no
   * billing order" — a fallback for a field that is NEVER absent and is
   * meaningless when present. What If's aggregate cast carries orders of 635,
   * 613, 606, 593 and 608 in that sequence: not a billing order at all. Sorting
   * by it buried Hayley Atwell — the lead of the first episode, in eight of
   * them — below forty walk-on voices, so Captain Carter went on being absent
   * from What If after the very fix that was supposed to find her.
   *
   * Episode count IS the billing order in a series: the lead is in every
   * episode and the guest is in one. TMDB's own array already arrives that way.
   */
  const aggregate = (en.aggregate_credits?.cast ?? []).map((c) => ({
    name: c.name,
    profile_path: c.profile_path ?? null,
    order: 100000 - (c.total_episode_count ?? 0),
    character: (c.roles ?? [])
      .map((r) => (r.character ?? "").trim())
      .filter(Boolean)
      .join(" / "),
  }));
  const flat = (en.credits?.cast ?? []).map((c) => ({
    name: c.name,
    profile_path: c.profile_path ?? null,
    order: c.order ?? 999,
    character: (c.character ?? "").trim(),
  }));
  /* Whichever is richer. A TV record with no aggregate data still gets its
     regulars rather than nothing. */
  /**
   * A SEASON NODE TAKES THE SEASON'S CAST, not the whole series'.
   *
   * `loki-s1` and `loki-s2` are two titles sharing one TMDB id and differing
   * only by `seasons`. Both were handed the SERIES aggregate, so every Loki
   * variant and Throg — all of them season-one only — showed up as appearing in
   * season two as well. That is wrong for all 76 season nodes in the corpus,
   * not just this one: a character introduced in season three has been claiming
   * season one for as long as this data has existed.
   *
   * TMDB has a per-season aggregate endpoint. One extra request per season,
   * unioned where a node covers several, and it falls back to the series cast
   * if a season call fails — a slightly-too-wide cast beats an empty one.
   */
  let seasonCast: typeof aggregate = [];
  if (kind === "tv" && t.seasons.length > 0) {
    for (const n of t.seasons) {
      const sc = await tmdb<{
        cast?: {
          name: string;
          profile_path?: string | null;
          total_episode_count?: number;
          roles?: { character?: string }[];
        }[];
      }>(`/tv/${id}/season/${n}/aggregate_credits`, { language: "en-US" });
      for (const c of sc?.cast ?? []) {
        seasonCast.push({
          name: c.name,
          profile_path: c.profile_path ?? null,
          order: 100000 - (c.total_episode_count ?? 0),
          character: (c.roles ?? [])
            .map((r) => (r.character ?? "").trim())
            .filter(Boolean)
            .join(" / "),
        });
      }
    }
    /* One actor can appear in several of a node's seasons. Keep the first,
       which is the highest episode count after the sort below. */
    const seen = new Set<string>();
    seasonCast = seasonCast
      .sort((a, b) => a.order - b.order)
      .filter((c) => (seen.has(c.name + c.character) ? false : seen.add(c.name + c.character)));
  }

  const seriesWide = aggregate.length > flat.length ? aggregate : flat;
  const source = seasonCast.length > 0 ? seasonCast : seriesWide;

  /**
   * A DEEPER CAP FOR TV, and generic crew rows dropped.
   *
   * 40 is the right ceiling for a film, where billing order stops naming
   * people anyone recognises. It is the wrong one for a series ordered by
   * episode count, because a one-episode CAMEO sorts to the bottom — and on
   * this site a cameo is often the whole point. Chris Hemsworth voices Throg in
   * Loki, credited and uncredited, at index 67 of 92. The cap was hiding him.
   *
   * The rows that make a deeper cap noisy are not performances at all —
   * "Additional Voices", stand-ins, photo doubles, on-set readers — so those
   * come out by name rather than by position. The cast rail shows ten and folds
   * the rest away, so depth costs the reader nothing and buys the character
   * graph a great deal.
   */
  const GENERIC = /additional voices|on-set|stand-?in|photo double|stunt|uncredited voice$/i;

  /**
   * KEPT REGARDLESS OF BILLING — the cap was silently eating the cameos.
   *
   * The top-40 cut is right for a cast rail and wrong for anyone whose entire
   * career here is walk-ons. Stan Lee is in Iron Man, The Avengers, Endgame,
   * Civil War, Ragnarok and Ant-Man and is billed below 40th in every one of
   * them, so a scan of the stored cast found 28 appearances and reported them
   * as complete. They were not; they were the cameos that happened to be
   * billed high enough to survive the slice.
   *
   * A truncation that hides data is worse than one that fails, because the
   * result still looks like an answer. So a named few are kept whatever their
   * order, which costs one row per film and nothing else.
   */
  const ALWAYS_KEEP = new Set(["Stan Lee"]);

  const eligible = [...source].filter(
    (c) => c.character && !GENERIC.test(c.character),
  );
  const ranked = eligible.sort((a, b) => a.order - b.order);
  const top = ranked.slice(0, kind === "tv" ? 100 : 40);
  const kept = new Set(top);
  for (const c of ranked) if (ALWAYS_KEEP.has(c.name)) kept.add(c);

  const cast: CastCredit[] = ranked
    .filter((c) => kept.has(c))
    .map((c) => ({
      actor: c.name,
      actorPhoto: c.profile_path ?? null,
      character: c.character,
    }));

  let runtimeMin: number | null = null;
  let releaseDate = t.releaseDate;
  const episodes: SyncedFields["episodes"] = [];

  if (kind === "movie") {
    /**
     * TMDB returns `runtime: 0` for an unreleased film, not null. Zero passed
     * every null check downstream and then tripped F12, the guard that exists
     * to catch a promo featurette matching instead of the feature. An
     * unannounced runtime is an absence, so it is stored as one.
     */
    runtimeMin = typeof en.runtime === "number" && en.runtime > 0 ? en.runtime : null;
    if (en.release_date) releaseDate = en.release_date;
  } else {
    if (en.first_air_date) releaseDate = en.first_air_date;

    // Sum only the seasons this node actually covers — that is what `seasons`
    // is for, and it is why a collapsed 1–7 range still totals honestly.
    const perEpisode = en.episode_run_time?.[0] ?? 30;
    let total = 0;
    let guessedEpisodes = 0;
    let firstSeasonAir: string | null = null;

    for (const n of t.seasons) {
      const s = await seasonRuntime(id, n, perEpisode);
      await sleep(40);
      if (!s) continue;
      total += s.minutes;
      guessedEpisodes += s.guessed;
      firstSeasonAir ??= s.airDate;
      episodes.push(...s.episodes);
    }
    runtimeMin = total > 0 ? total : null;
    if (guessedEpisodes > 0) estimatedFor.set(t.id, guessedEpisodes);

    // A season node should date from its own season, not the show's premiere.
    if (t.seasons.length === 1 && firstSeasonAir) releaseDate = firstSeasonAir;
  }

  return {
    tmdbId: id,
    tmdbType: kind,
    releaseDate,
    runtimeMin,
    episodes,
    posterPath,
    posterTint: posterPath ? await dominantColor(posterPath) : NEUTRAL_TINT,
    overviewEn: en.overview?.trim() || null,
    overviewAr: ar?.overview?.trim() || null,
    providers,
    providersGlobal,
    imdbId: en.external_ids?.imdb_id || null,
    ...(await omdb(en.external_ids?.imdb_id || null)),
    tmdbRating: typeof en.vote_average === "number" && en.vote_average > 0 ? en.vote_average : null,
    tmdbVotes: typeof en.vote_count === "number" && en.vote_count > 0 ? en.vote_count : null,
    trailerKey,
    videos,
    posters,
    backdrop: en.backdrop_path ?? null,
    cast,
    authors,
    authorPhotos,
    authorRole,
    genres: (en.genres ?? []).map((g) => g.name),
  };
}

/**
 * OMDb, for the two CRITIC scores. Not for IMDb.
 *
 * IMDb comes from datasets.imdbws.com in scripts/sync-ratings.ts, and stays
 * there: that dump is IMDb's own, authoritative and daily, while OMDb keeps a
 * copy that can lag. So this reads the `Ratings` array and nothing else, even
 * though the payload also carries `imdbRating`.
 *
 * METACRITIC IS THE ANSWER TO THE LETTERBOXD GAP. Letterboxd has no public API
 * and scraping one would be the only unverifiable number on the page.
 * Metacritic is a real third score from a real source, already in this payload.
 *
 * FOUR PARSING TRAPS, all of them silent:
 *
 *   1. "N/A" is a STRING and it is truthy. Every field needs an explicit
 *      equality check; a falsy guard passes it straight through.
 *   2. The Ratings array OMITS a source rather than nulling it, and the order
 *      is not stable. Find by `Source`, never by index. Older and smaller
 *      titles come back with IMDb only.
 *   3. Every value is a string, including `Response: "True"`.
 *   4. RT is "85%", Metacritic is "67/100". Both parse to a number here and
 *      are formatted in the UI, so the shape of the source never leaks into
 *      the component.
 */
async function omdb(
  imdbId: string | null,
): Promise<{ rtScore: number | null; metacritic: number | null }> {
  const key = process.env.OMDB_API_KEY;
  const blank = { rtScore: null, metacritic: null };
  if (!key || !imdbId) return blank;

  const res = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${key}`);
  if (!res.ok) {
    // Logged, never silently written as null: a rate limit and a genuine
    // absence look identical in the output otherwise.
    omdbErrors.push(`${imdbId}: HTTP ${res.status}`);
    return blank;
  }

  const j = (await res.json()) as {
    Response?: string;
    Error?: string;
    Ratings?: { Source: string; Value: string }[];
  };
  if (j.Response !== "True") {
    omdbErrors.push(`${imdbId}: ${j.Error ?? "Response not True"}`);
    return blank;
  }

  const valueOf = (source: string): string | null => {
    const hit = j.Ratings?.find((r) => r.Source === source)?.Value;
    // "N/A" is a string, and it is truthy.
    return !hit || hit === "N/A" ? null : hit;
  };

  const rt = valueOf("Rotten Tomatoes"); // "85%"
  const mc = valueOf("Metacritic"); // "67/100"
  const num = (raw: string | null, strip: RegExp): number | null => {
    if (raw === null) return null;
    const n = Number.parseInt(raw.replace(strip, ""), 10);
    return Number.isFinite(n) ? n : null;
  };

  return {
    rtScore: num(rt, /%/),
    metacritic: num(mc, /\/100$/),
  };
}

/**
 * Dominant colour: fetch the smallest poster, resize to 1×1, read the pixel.
 * Six bytes per title instead of a 400-byte base64 blurDataURL on all 130
 * (brief §14.4). `sharp` is optional — without it every tint is neutral, which
 * still reserves the box and still keeps CLS honest.
 */
async function dominantColor(posterPath: string): Promise<string> {
  try {
    const { default: sharp } = await import("sharp");
    const res = await fetch(`https://image.tmdb.org/t/p/w92${posterPath}`);
    if (!res.ok) return NEUTRAL_TINT;
    const buf = Buffer.from(await res.arrayBuffer());
    const { data } = await sharp(buf).resize(1, 1, { fit: "fill" }).raw().toBuffer({
      resolveWithObject: true,
    });
    const hex = [data[0], data[1], data[2]]
      .map((n) => (n ?? 0).toString(16).padStart(2, "0"))
      .join("");
    return `#${hex}`;
  } catch {
    return NEUTRAL_TINT;
  }
}

// ---------------------------------------------------------------------------

/**
 * Flag Arabic CONTEXT that needs a human. TMDB's ar-SA overviews are patchy and
 * frequently machine-translated, so we surface the suspects rather than
 * pretending the field is done.
 *
 * Note this only ever concerns `context` — the shielded field. `spoilerSafe` is
 * never seeded from TMDB at all, and every title needs one written by hand.
 */
function arabicNeedsReview(en: string | null, ar: string | null): string | null {
  if (!ar) return "no Arabic overview on TMDB";
  if (ar === en) return "Arabic overview is identical to English";
  if (!/[؀-ۿ]/.test(ar)) return "Arabic overview contains no Arabic script";
  if (/[a-zA-Z]{4,}/.test(ar)) return "Arabic overview contains Latin runs";
  if (ar.length < 40) return "Arabic overview is suspiciously short";
  return null;
}

async function main() {
  const out: Record<string, SyncedFields> = {};
  const noPoster: string[] = [];
  const noRuntime: string[] = [];
  const noMatch: string[] = [];
  const copyTodo: { id: string; titleEn: string; reason: string }[] = [];

  for (const [i, t] of titles.entries()) {
    process.stdout.write(`\r[${i + 1}/${titles.length}] ${t.id}`.padEnd(70));
    const synced = await fetchOne(t);
    out[t.id] = synced;

    if (!synced.tmdbId) noMatch.push(t.id);
    if (!synced.posterPath) noPoster.push(t.id);
    if (!synced.runtimeMin) noRuntime.push(t.id);

    const reason = arabicNeedsReview(synced.overviewEn, synced.overviewAr);
    if (reason) copyTodo.push({ id: t.id, titleEn: t.titleEn, reason });

    await sleep(60); // stay well under TMDB's rate limit
  }
  process.stdout.write("\n");

  await writeFile(
    new URL("../content/tmdb.generated.json", import.meta.url),
    JSON.stringify(out, null, 2) + "\n",
  );

  console.log(`\n  synced      ${titles.length - noMatch.length}/${titles.length}`);
  console.log(`  no match    ${noMatch.length}${noMatch.length ? ` — ${noMatch.join(", ")}` : ""}`);
  console.log(`  no poster   ${noPoster.length}${noPoster.length ? ` — ${noPoster.join(", ")}` : ""}`);
  console.log(`  no runtime  ${noRuntime.length}${noRuntime.length ? ` — ${noRuntime.join(", ")}` : ""}`);
  const vals = Object.values(out);
  const withProviders = vals.filter((v) => v.providersGlobal.length > 0);
  console.log(`  AR context to curate  ${copyTodo.length}  → npm run gen:copy-todo`);
  console.log(`  streaming somewhere   ${withProviders.length}/${titles.length}`);

  /**
   * PRD §4: report per title what came back EMPTY. A title with no trailer is a
   * real state and its fallback has to be designed rather than left blank, so
   * the count has to be visible here rather than discovered in a screenshot.
   */
  const empty = (pick: (v: SyncedFields) => boolean) =>
    Object.entries(out)
      .filter(([, v]) => pick(v))
      .map(([id]) => id);
  const noTrailer = empty((v) => !v.trailerKey);
  const noCast = empty((v) => v.cast.length === 0);
  const noBackdrop = empty((v) => !v.backdrop);
  const noRating = empty((v) => v.tmdbRating === null);
  const noGallery = empty((v) => v.posters.length < 2);
  const show = (label: string, ids: string[]) =>
    console.log(
      `  ${label.padEnd(21)} ${String(titles.length - ids.length).padStart(3)}/${titles.length}` +
        (ids.length && ids.length <= 12 ? `  missing: ${ids.join(", ")}` : ""),
    );
  console.log("");
  show("with a trailer", noTrailer);
  show("with cast", noCast);
  show("with a backdrop", noBackdrop);
  show("with a TMDB score", noRating);
  show("with a Tomatometer", empty((v) => v.rtScore === null));
  show("with a Metacritic", empty((v) => v.metacritic === null));
  if (omdbErrors.length) {
    console.log(`\n  OMDb errors ${omdbErrors.length}:`);
    for (const e of omdbErrors.slice(0, 15)) console.log(`    ${e}`);
  }
  show("with a gallery", noGallery);
  const galleryTotal = vals.reduce((n, v) => n + v.posters.length, 0);
  const castTotal = vals.reduce((n, v) => n + v.cast.length, 0);
  console.log(`  gallery images        ${galleryTotal}`);
  console.log(`  cast credits          ${castTotal}`);
  const tints = await generateTintStylesheet(out);
  console.log(`  poster tints          ${tints.rules} rules, ${tints.distinct} distinct colours`);
  console.log("\n  wrote content/tmdb.generated.json and app/poster-tints.css — commit both.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
