"use client";

import { useMemo } from "react";
import { useUrlState } from "@/lib/use-url-state";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { normalise, squash } from "@/lib/search";

/**
 * EVERY PROJECT, and four ways to cut it down.
 *
 * 155 tiles is a catalogue, not an answer, so the filters are the page. All of
 * it runs in the browser over an index passed down from the server: 155 rows is
 * nothing to ship, and it means a filter is instant with no navigation.
 *
 * The four are deliberately different questions. Category is "which corner of
 * this", studio is "who owned it", genre is "what kind of night", year is
 * "when". A reader has one of those in mind, rarely two.
 */

export interface ProjectCard {
  id: string;
  titleEn: string;
  titleAr: string;
  year: string;
  universe: string;
  category: string;
  type: string;
  genres: string[];
  score: number | null;
  poster: string | null;
  runtime: string | null;
}

/**
 * CATEGORY IS NOT UNIVERSE.
 *
 * The universe is who owned the rights. The category is how someone thinks
 * about what they are about to watch, and those diverge: the Spider-Verse is
 * three eras under one studio, the X-Men and the Fantastic Four are one studio
 * and two entirely separate things, and "animated" cuts across all of them.
 */
/** Module-level, so the hook's mount effect runs once per mount. */
const PROJECT_DEFAULTS: {
  order: string; kind: string; cat: string; studio: string;
  genre: string; decade: string; q: string;
} = { order: "oldest", kind: "all", cat: "all", studio: "all", genre: "all", decade: "all", q: "" };

const CATEGORIES = [
  "all",
  "mcu",
  "spider-verse",
  "x-men",
  "fantastic-four",
  "defenders",
  "marvel-tv",
  "legacy",
  "animated",
] as const;

export function ProjectBrowser({
  index,
  locale,
}: {
  index: ProjectCard[];
  locale: string;
}) {
  const t = useTranslations("projects");
  /**
   * FILM, SERIES OR SPECIAL — the first question most people actually have.
   *
   * "I have two hours" and "I want something to sit with for a week" are
   * different moods, and until now the grid answered neither: a 167-title page
   * mixed a six-season show, a one-shot and a feature with nothing to separate
   * them. `type` was already on every card and filtered by nothing.
   *
   * THREE BUCKETS, not the corpus's six. `season` is a child of a series and
   * would double-count it; `short` and `animation` are formats, and a reader
   * asking for "a film" means an animated one too. So the six collapse to the
   * three shapes a viewer recognises.
   */
  /* Every filter in the URL, so back restores the whole view. */
  const [st, set] = useUrlState(PROJECT_DEFAULTS);
  const newestFirst = st.order === "newest";
  const { kind, cat, studio, genre, decade, q: query } = st;
  const setNewestFirst = (v: boolean) => set({ order: v ? "newest" : "oldest" });
  const setKind = (v: string) => set({ kind: v });
  const setCat = (v: string) => set({ cat: v });
  const setStudio = (v: string) => set({ studio: v });
  const setGenre = (v: string) => set({ genre: v });
  const setDecade = (v: string) => set({ decade: v });
  const setQuery = (v: string) => set({ q: v });

  /** Built from the data, so an option can never point at an empty set. */
  const studios = useMemo(
    () => [...new Set(index.map((x) => x.universe))].sort(),
    [index],
  );
  const genres = useMemo(
    () => [...new Set(index.flatMap((x) => x.genres))].sort(),
    [index],
  );
  const decades = useMemo(
    () =>
      [...new Set(index.map((x) => `${x.year.slice(0, 3)}0`))].sort((a, b) =>
        b.localeCompare(a),
      ),
    [index],
  );

  const haystack = useMemo(
    () =>
      new Map(
        index.map((x) => {
          const both = `${x.titleEn} ${x.titleAr}`;
          /* Spaced AND squashed, so "modok" finds M.O.D.O.K. and
             "spiderman" finds Spider-Man. */
          return [x.id, `${normalise(both)} ${squash(x.titleEn)} ${squash(x.titleAr)}`];
        }),
      ),
    [index],
  );

  /**
   * FOUR BUCKETS, not the corpus's six, and `short` is its own.
   *
   * It was folded into "film" on the reasoning that a viewer asking for a film
   * means an animated one too — true for `animation`, wrong for `short`. The
   * six `short` entries are the MARVEL ONE-SHOTS: Item 47, All Hail the King,
   * the Agent Carter one, and the rest. They are five-to-fifteen minutes long
   * and a reader looking for them is looking for exactly that, not for a film.
   *
   * `season` still rides with `series`, because a season is a child of a show
   * rather than a different shape of thing.
   */
  const KINDS: Record<string, (t: string) => boolean> = {
    film: (t) => t === "film" || t === "animation",
    series: (t) => t === "series" || t === "season",
    special: (t) => t === "special",
    oneshot: (t) => t === "short",
  };

  const shown = useMemo(() => {
    const q = normalise(query);
    const kept = index.filter(
      (x) =>
        (kind === "all" || (KINDS[kind]?.(x.type) ?? true)) &&
        (cat === "all" || x.category === cat) &&
        (studio === "all" || x.universe === studio) &&
        (genre === "all" || x.genres.includes(genre)) &&
        (decade === "all" || x.year.startsWith(decade.slice(0, 3))) &&
        (q === "" || (haystack.get(x.id) ?? "").includes(q) ||
          (haystack.get(x.id) ?? "").includes(squash(query))),
    );
    /* `index` is already release order, so oldest-first is free and
       newest-first is one reverse — no date parsing, no re-sort. */
    return newestFirst ? [...kept].reverse() : kept;
  }, [index, kind, cat, studio, genre, decade, query, haystack, newestFirst]);

  const reset = () => {
    setNewestFirst(false);
    setKind("all");
    setCat("all");
    setStudio("all");
    setGenre("all");
    setDecade("all");
    setQuery("");
  };
  const filtered = shown.length !== index.length;

  return (
    <>
      <div className="filters">
        <label className="filter-search">
          <span className="filter-label">{t("searchLabel")}</span>
          <input
            type="search"
            className="search-input"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>

        <div className="filter-selects">
          <label className="filter-select">
            <span className="filter-label">{t("filter.order")}</span>
            <select
              value={newestFirst ? "newest" : "oldest"}
              onChange={(e) => setNewestFirst(e.target.value === "newest")}
            >
              <option value="oldest">{t("filter.oldestFirst")}</option>
              <option value="newest">{t("filter.newestFirst")}</option>
            </select>
          </label>

          <label className="filter-select">
            <span className="filter-label">{t("filter.kind")}</span>
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="all">{t("filter.any")}</option>
              <option value="film">{t("filter.kindFilm")}</option>
              <option value="series">{t("filter.kindSeries")}</option>
              <option value="special">{t("filter.kindSpecial")}</option>
              <option value="oneshot">{t("filter.kindOneShot")}</option>
            </select>
          </label>

          <label className="filter-select">
            <span className="filter-label">{t("filter.studio")}</span>
            <select value={studio} onChange={(e) => setStudio(e.target.value)}>
              <option value="all">{t("filter.any")}</option>
              {studios.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-select">
            <span className="filter-label">{t("filter.genre")}</span>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="all">{t("filter.any")}</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-select">
            <span className="filter-label">{t("filter.decade")}</span>
            <select value={decade} onChange={(e) => setDecade(e.target.value)}>
              <option value="all">{t("filter.any")}</option>
              {decades.map((d) => (
                <option key={d} value={d}>
                  {d}s
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="chip-row" role="radiogroup" aria-label={t("filter.category")}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={cat === c}
            className="chip"
            onClick={() => setCat(c)}
          >
            {t(`category.${c}`)}
          </button>
        ))}
      </div>

      <p className="section-count" role="status" aria-live="polite">
        {t("count", { n: shown.length })}
        {filtered && (
          <>
            {" "}
            <button type="button" className="filter-reset" onClick={reset}>
              {t("filter.clear")}
            </button>
          </>
        )}
      </p>

      {shown.length === 0 ? (
        <p className="char-empty">{t("empty")}</p>
      ) : (
        /* An ORDERED list: release order is the information, and it survives
           every filter because filtering removes rows without reordering them. */
        <ol className="project-grid" role="list">
          {shown.map((x) => (
            <li key={x.id}>
              <Link className="project-tile" href={`/${locale}/path/${x.id}`}>
                <span className="project-art poster-scrim">
                  <span className="poster" data-tint={x.id} data-size="grid">
                    {x.poster ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          x.poster.startsWith("http")
                            ? x.poster
                            : `https://image.tmdb.org/t/p/w500${x.poster}`
                        }
                        /**
                         * A TILE IS UP TO 11rem — 176px — and a phone renders
                         * it at 2× or 3×. w342 was being upscaled on every
                         * modern screen, which is why these looked soft next
                         * to the posters everywhere else. `srcset` serves 342
                         * to a 1× display and 500 to anything denser, so the
                         * cheap case stays cheap.
                         */
                        srcSet={
                          x.poster && !x.poster.startsWith("http")
                            ? `https://image.tmdb.org/t/p/w342${x.poster} 1x, https://image.tmdb.org/t/p/w500${x.poster} 2x`
                            : undefined
                        }
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      /* §14.7 — THE GAP IS DESIGNED, here too. Rendering only
                         the tint left one title as an empty coloured box, which
                         reads as a loading state that never finishes. This is
                         the same typographic card the Poster component uses, so
                         the absence looks deliberate in both places. */
                      <span className="poster-fallback" aria-hidden="true">
                        <bdi lang="en" className="poster-fallback-title">
                          {x.titleEn}
                        </bdi>
                      </span>
                    )}
                  </span>
                  {x.score !== null && (
                    <span className="project-score tabular">{x.score.toFixed(1)}</span>
                  )}
                </span>
                <span className="project-title">
                  <bdi lang="en">{x.titleEn}</bdi>
                </span>
                <span className="project-meta">
                  <span className="tabular">{x.year}</span>
                  {x.runtime && <span className="runtime">{x.runtime}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
