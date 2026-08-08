import type { TitleSource } from "@/content/schema";
import { releaseOrder } from "@/lib/graph";
import { inCollectionOrder } from "@/lib/collections";

/**
 * THE MCU, GROUPED THE WAY MARVEL GROUPS IT.
 *
 * Two sagas, six phases, and the nesting is real rather than decorative: a
 * phase belongs to a saga, so it renders as a nested list inside its saga's
 * item. A screen reader hears "Infinity Saga, list of 3 phases, Phase One, list
 * of 8 titles" instead of a flat run of 72 rows with headings scattered in it.
 *
 * The grouping is DERIVED from `saga` and `phase`, which every MCU node already
 * carries and which the schema already validates. Nothing here is a second
 * source of truth; if a title's phase changes, this changes with it.
 */

export interface PhaseGroup {
  phase: number;
  titles: TitleSource[];
  /** First and last release year in the phase, for the header. */
  from: string;
  to: string;
}

export interface SagaGroup {
  saga: "infinity" | "multiverse";
  phases: PhaseGroup[];
  from: string;
  to: string;
  count: number;
}

/** Phases in each saga, in order. Derived, not typed, so it cannot drift. */
const SAGA_ORDER: SagaGroup["saga"][] = ["infinity", "multiverse"];

export function sagaGroups(all: readonly TitleSource[]): SagaGroup[] {
  /**
   * RELEASE ORDER FIRST, then grouped. Sorting inside each phase separately
   * would be the same result today and a lie the first time a phase overlaps
   * another, which phases 4 and 5 already nearly do.
   */
  /**
   * THE ONE-SHOTS COME OUT, and this is the SAME rule the collection pages
   * use rather than a second copy of it.
   *
   * This filtered on `universe === "mcu"` alone, so the timeline drew 72 titles
   * while /universes/mcu said 67 — the five Marvel One-Shots, four minutes
   * each, sitting on an eighteen-year spine as though "Item 47" were a step
   * between two films. Two definitions of the MCU order, disagreeing, on two
   * pages that are meant to be the same list.
   *
   * They keep their pages and stay in /projects. They are not steps.
   */
  const mcu = releaseOrder(all).filter(
    (t) => t.universe === "mcu" && inCollectionOrder(t, "mcu"),
  );

  return SAGA_ORDER.map((saga) => {
    const own = mcu.filter((t) => t.saga === saga);
    const phaseNumbers = [...new Set(own.map((t) => t.phase))]
      .filter((p): p is number => p !== null)
      .sort((a, b) => a - b);

    const phases: PhaseGroup[] = phaseNumbers.map((phase) => {
      const titles = own.filter((t) => t.phase === phase);
      return {
        phase,
        titles,
        from: titles[0]!.releaseDate.slice(0, 4),
        to: titles.at(-1)!.releaseDate.slice(0, 4),
      };
    });

    return {
      saga,
      phases,
      from: own[0]!.releaseDate.slice(0, 4),
      to: own.at(-1)!.releaseDate.slice(0, 4),
      count: own.length,
    };
  });
}

/**
 * Has it come out yet?
 *
 * A timeline that renders 2026 and 2008 identically is lying about which ones
 * you can actually watch tonight, which is the only question this site exists
 * to answer. Compared against the build date rather than a hardcoded year, so
 * Phase 6 stops being "upcoming" on its own without anyone editing a constant.
 */
export function isReleased(t: TitleSource, now = new Date()): boolean {
  // `releaseDate` is ISO and may be year-only; "2026" < "2026-08-08" compares
  // correctly as a prefix either way.
  return t.releaseDate <= now.toISOString().slice(0, 10);
}
