import type { TitleSource } from "@/content/schema";

type Timed = Pick<TitleSource, "id" | "runtimeMin">;

/**
 * Sum a path's runtime.
 *
 * Throws on a null rather than coercing to 0. A silent zero would understate a
 * total that the UI presents as "18h 40m · about 6 evenings" — the one number
 * a user actually plans around.
 */
export function runtimeOf(titles: readonly Timed[]): number {
  let total = 0;
  for (const t of titles) {
    if (t.runtimeMin === null) {
      throw new Error(`runtimeOf: "${t.id}" has no runtime — run \`npm run sync:tmdb\``);
    }
    total += t.runtimeMin;
  }
  return total;
}

/** The three shapes a runtime takes. Rendered through ICU so plurals are right. */
export interface RuntimeMessages {
  hoursMinutes: (h: number, mm: string, m: number) => string;
  hoursOnly: (h: number) => string;
  minutesOnly: (m: number) => string;
}

/**
 * "2h 06m" · "45m" · "2h" · "0m" — ENGLISH ONLY.
 *
 * Kept for tests and for anything that needs a bare Latin figure. Do NOT render
 * this to a user: it has no plural rules and no way to express Arabic units.
 * Use `formatRuntimeIntl` for anything on a page.
 */
export function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

/**
 * The rendered form, through the message layer.
 *
 * Arabic previously read "1س 44د", which is ambiguous and WRONG: a bare letter
 * unit does not bind to its number, so the bidi algorithm is free to reorder
 * the two clauses — and the result reads as 44 hours and 1 minute. Full unit
 * words with an explicit "و" bind unambiguously, and ICU gets the Arabic dual
 * and few/many forms right where "ساعة" alone never could.
 */
export function formatRuntimeIntl(minutes: number, m: RuntimeMessages): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return m.minutesOnly(mins);
  if (mins === 0) return m.hoursOnly(hours);
  return m.hoursMinutes(hours, String(mins).padStart(2, "0"), mins);
}

/**
 * People budget an evening in film-shaped units, not round hours. Two hours
 * does not fit a two-hour film once you include sitting down.
 */
export const DEFAULT_NIGHT_MIN = 150;

/**
 * How far past the budget a single title must run before it is worth warning
 * about. At exactly budget+1 the flag fired on 24 of 34 Marvel films, which
 * made it noise: a warning that fires on most rows tells you nothing.
 */
const OVER_BUDGET_TOLERANCE = 1.25;

export interface Evening<T> {
  titles: T[];
  totalMin: number;
  /**
   * A single title that runs MEANINGFULLY past the nightly budget — more than
   * 1.25× it. A 126-minute film on a 120-minute night is not news; a 99-hour
   * series node is.
   */
  overBudget: boolean;
  /**
   * How many nights this evening actually takes.
   *
   * 1 for anything that fits. For a collapsed series node it is the real figure:
   * Agents of S.H.I.E.L.D. is ~99 hours, which at 2.5 hours a night is about 40
   * evenings. A boolean conflated "slightly long film" with "this needs six
   * weeks", which made the flag useless on exactly the rows where the number
   * matters most.
   */
  nights: number;
}

/**
 * Pack a path into evenings against a nightly budget.
 *
 * Order is preserved absolutely — this is a watch order, not a bin-packing
 * problem, and reordering it to fit more per night would break the one
 * guarantee the whole site makes. A title longer than the budget gets its own
 * evening, flagged, rather than being dropped or split.
 */
export function schedule<T extends Timed>(
  titles: readonly T[],
  minutesPerNight: number = DEFAULT_NIGHT_MIN,
): Evening<T>[] {
  if (!Number.isFinite(minutesPerNight) || minutesPerNight <= 0) {
    throw new RangeError(`schedule: minutesPerNight must be positive, got ${minutesPerNight}`);
  }

  const evenings: Evening<T>[] = [];
  let current: Evening<T> | null = null;

  for (const t of titles) {
    if (t.runtimeMin === null) {
      throw new Error(`schedule: "${t.id}" has no runtime — run \`npm run sync:tmdb\``);
    }
    const solo = t.runtimeMin > minutesPerNight;

    // A title that cannot fit any night stands alone, and never absorbs the
    // next one into an evening that is already over budget.
    if (solo) {
      evenings.push({
        titles: [t],
        totalMin: t.runtimeMin,
        overBudget: t.runtimeMin > minutesPerNight * OVER_BUDGET_TOLERANCE,
        nights: Math.ceil(t.runtimeMin / minutesPerNight),
      });
      current = null;
      continue;
    }

    if (current === null || current.totalMin + t.runtimeMin > minutesPerNight) {
      current = { titles: [t], totalMin: t.runtimeMin, overBudget: false, nights: 1 };
      evenings.push(current);
    } else {
      current.titles.push(t);
      current.totalMin += t.runtimeMin;
    }
  }

  return evenings;
}

/** Total nights a plan really takes — a 40-evening node counts as 40, not 1. */
export function totalNights<T>(plan: Evening<T>[]): number {
  return plan.reduce((n, e) => n + e.nights, 0);
}
