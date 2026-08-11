import type { TitleSource } from "@/content/schema";
import { formatRuntimeIntl, type RuntimeMessages } from "./runtime";

/**
 * The message shapes these helpers need. Passed in rather than imported so the
 * module stays a pure function of its inputs — and so a caller cannot forget to
 * translate by accidentally getting an English default.
 */
export interface DescribeMessages extends RuntimeMessages {
  titleCount: (n: number) => string;
  seasonSuffix: (n: number) => string;
  costSynced: (runtime: string, titles: string, seasons: string) => string;
  costUnsynced: (titles: string, seasons: string) => string;
  notSynced: (missing: number, total: number) => string;
  approx: (runtime: string, missing: number) => string;
  /** Released, but no service the sync reads carries a runtime for it. */
  approxUnmeasured: (runtime: string, missing: number) => string;
  approxMixed: (runtime: string, unreleased: number, unmeasured: number) => string;
  seasonCount: (n: number) => string;
}

/**
 * Display helpers that keep a title's real size honest.
 *
 * The collapsed-range decision — "Agents of S.H.I.E.L.D. seasons 1–7" is ONE
 * node — is right for the graph and invisible in the UI unless these are used.
 * A node that covers seven seasons must never render as one bare line beside
 * Blade, and a cost of "1 title" must never look cheaper than "2 titles" when
 * it is 25 times the hours.
 */

/** "7 seasons" for a collapsed range, null for anything that is one thing. */
export function seasonLabel(
  t: Pick<TitleSource, "seasons">,
  m: Pick<DescribeMessages, "seasonCount">,
): string | null {
  return t.seasons.length > 1 ? m.seasonCount(t.seasons.length) : null;
}

/**
 * What a recommendation costs, with RUNTIME as the primary term.
 *
 * Leading with the title count is actively misleading: Agents of S.H.I.E.L.D.
 * is one title and about 102 hours, while Blade and Blade II are two titles and
 * about four. Hours are what a person is actually spending.
 *
 * Before sync there is no runtime, so it leads with the season count — the only
 * honest size signal available — and says so plainly rather than implying the
 * cost is small.
 */
export function formatCost(cost: TitleSource[], m: DescribeMessages): string {
  if (cost.length === 0) return "";

  const titles = m.titleCount(cost.length);
  const seasons = cost.reduce((n, t) => n + t.seasons.length, 0);
  const seasonPart = seasons > 1 ? m.seasonSuffix(seasons) : "";

  const unsynced = cost.filter((t) => t.runtimeMin === null).length;
  if (unsynced > 0) return m.costUnsynced(titles, seasonPart);

  const total = cost.reduce((n, t) => n + (t.runtimeMin ?? 0), 0);
  return m.costSynced(formatRuntimeIntl(total, m), titles, seasonPart);
}

/**
 * Total runtime of a path, or an honest statement that it is unknown.
 * Never renders as a confident "0h" — an invented total is worse than an
 * absent one on a page whose job is helping someone plan their evenings.
 */
/**
 * A path's total, and how honest it can be about itself.
 *
 * Three states, because two were not enough. One title with no runtime used to
 * suppress the whole figure — the 130-item order page read "runtime not yet
 * synced (1/130)" and hid roughly 700 hours because of a single gap. That is
 * technically true and useless.
 *
 *   nothing missing  → the exact total
 *   a few missing    → approximate, and says WHY each one is missing
 *   most missing     → not synced at all, which is a different statement
 *
 * AND "MISSING" IS TWO DIFFERENT FACTS. A film with no runtime is either not
 * made yet — Secret Wars, Black Panther 3 — or made and simply unmeasured,
 * which is one 2009 Elektra short that no service the sync reads carries. The
 * copy called both "not yet released", so a legacy page spanning 1986–2011 was
 * claiming one of its titles had not come out. Anyone can check that in a
 * second, and it makes the whole figure look invented.
 *
 * The release date already knows the difference, so nothing has to be authored
 * into the corpus — which F7 forbids anyway, and rightly.
 */
const APPROX_THRESHOLD = 0.2;

export function totalRuntime(
  path: TitleSource[],
  m: Pick<DescribeMessages, "notSynced" | "approx" | "approxUnmeasured" | "approxMixed"> &
    RuntimeMessages,
): string {
  if (path.length === 0) return formatRuntimeIntl(0, m);
  const missing = path.filter((t) => t.runtimeMin === null).length;
  if (missing / path.length > APPROX_THRESHOLD) return m.notSynced(missing, path.length);

  /**
   * NOT YET RELEASED IS A QUESTION ABOUT THE DATE, NOT ABOUT THE RUNTIME.
   *
   * This counted only titles that were BOTH undated in the future AND missing
   * a runtime, on the assumption that an unreleased film has no runtime yet.
   * That assumption expires: TMDB publishes a runtime for Avengers: Doomsday
   * long before it opens, so Doomsday silently stopped counting and a list
   * holding four unreleased titles said three. A reader counting the future
   * films in front of them gets a different number than the page does, and
   * they are right.
   *
   * So the two facts are now counted separately, because they are separate:
   * how many titles are not out yet, and how many released ones have no
   * runtime on record.
   */
  const now = new Date().toISOString().slice(0, 10);
  const unreleased = path.filter((t) => String(t.releaseDate) > now).length;
  const unmeasured = path.filter(
    (t) => t.runtimeMin === null && String(t.releaseDate) <= now,
  ).length;

  const known = path.reduce((n, t) => n + (t.runtimeMin ?? 0), 0);
  /* Everything is out and every runtime is known: an exact total, no caveat. */
  if (unreleased === 0 && unmeasured === 0) return formatRuntimeIntl(known, m);

  const runtime = formatRuntimeIntl(known, m);
  /* Unmade titles outnumbering unmeasured ones is the normal case, so that
     wording leads; a released title with no figure is the exception. */
  if (unmeasured === 0) return m.approx(runtime, unreleased);
  if (unreleased === 0) return m.approxUnmeasured(runtime, unmeasured);
  return m.approxMixed(runtime, unreleased, unmeasured);
}
