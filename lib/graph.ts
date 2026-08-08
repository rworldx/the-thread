import type { TitleSource } from "@/content/schema";

/**
 * Pure graph functions. No React, no DOM, no I/O.
 *
 * `storyOrder` is deliberately absent — see schema.ts on `storyYear`. What
 * exists instead is `curatedOrder`, scoped to one universe, driven by the
 * author's `storyRank`.
 */

/** A node needs only these fields to be ordered. Keeps the functions testable. */
export type GraphNode = Pick<
  TitleSource,
  "id" | "releaseDate" | "requires" | "enriches" | "essential" | "universe" | "storyRank"
>;

export class CycleError extends Error {
  constructor(readonly cycle: string[]) {
    super(`requires forms a cycle: ${cycle.join(" → ")}`);
    this.name = "CycleError";
  }
}

export class UnknownTitleError extends Error {
  constructor(readonly id: string) {
    super(`no title with id "${id}"`);
    this.name = "UnknownTitleError";
  }
}

export type PathMode = "minimum" | "full";

// ---------------------------------------------------------------------------
// Ordering primitives
// ---------------------------------------------------------------------------

/**
 * The single tie-break used everywhere: date, then id.
 *
 * Sorting by id as the final key is what makes every order in this codebase
 * deterministic. Without it, two same-day releases could swap places between
 * builds — same data, different HTML, and a user's bookmarked row silently
 * points somewhere else.
 */
function byDateThenId(a: GraphNode, b: GraphNode): number {
  if (a.releaseDate !== b.releaseDate) return a.releaseDate < b.releaseDate ? -1 : 1;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/** Sort by releaseDate ascending. Never mutates the input. */
export function releaseOrder<T extends GraphNode>(titles: readonly T[]): T[] {
  return [...titles].sort(byDateThenId);
}

/**
 * The author's curated sequence for one universe — the Fox X-Men reading order
 * (§ source document), which is by events rather than release.
 *
 * Returns `null` when the universe is not fully ranked, so a caller can only
 * ever render a complete toggle. A partially-ranked block would put unranked
 * titles in an arbitrary bucket, which is the "half-null toggle" failure this
 * project already decided not to ship.
 */
export function curatedOrder<T extends GraphNode>(
  titles: readonly T[],
  universe: TitleSource["universe"],
): T[] | null {
  const inUniverse = titles.filter((t) => t.universe === universe);
  if (inUniverse.length === 0) return null;
  if (inUniverse.some((t) => t.storyRank === null)) return null;
  return [...inUniverse].sort((a, b) => a.storyRank! - b.storyRank!);
}

// ---------------------------------------------------------------------------
// Topological sort
// ---------------------------------------------------------------------------

/** Edges are only counted when both ends are inside the given set. */
function edgesWithin<T extends GraphNode>(titles: readonly T[], mode: PathMode) {
  const present = new Set(titles.map((t) => t.id));
  const out = new Map<string, string[]>();
  for (const t of titles) {
    const raw = mode === "full" ? [...t.requires, ...t.enriches] : t.requires;
    out.set(
      t.id,
      raw.filter((r) => present.has(r)),
    );
  }
  return out;
}

/**
 * Kahn's algorithm with a ready-queue sorted by date-then-id.
 *
 * The sorted queue is the whole point: a plain Set or array-shift would produce
 * a *valid* topological order that differs run to run. This one is stable —
 * among nodes with no ordering constraint between them, the earlier release
 * always comes first.
 */
export function topoSort<T extends GraphNode>(titles: readonly T[]): T[] {
  const deps = edgesWithin(titles, "minimum");
  const byId = new Map(titles.map((t) => [t.id, t]));

  const remaining = new Map<string, number>();
  const dependents = new Map<string, string[]>();
  for (const t of titles) {
    remaining.set(t.id, deps.get(t.id)!.length);
    for (const d of deps.get(t.id)!) {
      if (!dependents.has(d)) dependents.set(d, []);
      dependents.get(d)!.push(t.id);
    }
  }

  const ready = titles.filter((t) => remaining.get(t.id) === 0).sort(byDateThenId);
  const result: T[] = [];

  while (ready.length > 0) {
    const next = ready.shift()!;
    result.push(next);
    for (const dep of dependents.get(next.id) ?? []) {
      const left = remaining.get(dep)! - 1;
      remaining.set(dep, left);
      if (left === 0) {
        // Insert in sorted position rather than push-and-resort: keeps the
        // queue stable without re-sorting the whole array each iteration.
        const node = byId.get(dep)!;
        const at = ready.findIndex((r) => byDateThenId(node, r) < 0);
        if (at === -1) ready.push(node);
        else ready.splice(at, 0, node);
      }
    }
  }

  if (result.length !== titles.length) {
    throw new CycleError(findCycle(titles, deps));
  }
  return result;
}

/**
 * Extract an actual cycle, not just the fact that one exists.
 * "a cycle exists" is a useless CI failure on a 130-node graph; the path is
 * what tells you which edge to delete.
 */
function findCycle<T extends GraphNode>(
  titles: readonly T[],
  deps: Map<string, string[]>,
): string[] {
  const WHITE = 0, GREY = 1, BLACK = 2;
  const colour = new Map<string, number>(titles.map((t) => [t.id, WHITE]));
  const stack: string[] = [];
  let found: string[] | null = null;

  function visit(id: string): boolean {
    colour.set(id, GREY);
    stack.push(id);
    for (const d of deps.get(id) ?? []) {
      if (colour.get(d) === GREY) {
        // Close the loop so the message reads a → b → c → a.
        found = [...stack.slice(stack.indexOf(d)), d];
        return true;
      }
      if (colour.get(d) === WHITE && visit(d)) return true;
    }
    stack.pop();
    colour.set(id, BLACK);
    return false;
  }

  for (const t of titles) {
    if (colour.get(t.id) === WHITE && visit(t.id)) break;
  }
  return found ?? [];
}

// ---------------------------------------------------------------------------
// The product
// ---------------------------------------------------------------------------

/** Filter to the spine, then order it. Rule B10 guarantees this is closed. */
export function essentialsOrder<T extends GraphNode>(titles: readonly T[]): T[] {
  return topoSort(titles.filter((t) => t.essential));
}

/**
 * THE INFINITY SAGA — twenty-three films, which is the published number.
 *
 * The homepage's beginner door said "22 titles", because it was still counting
 * the curated `essential` set from before that idea was deleted. Twenty-two is
 * not a number Marvel has ever used for anything; the Infinity Saga is 23
 * films, Marvel says so on the box set, and a reader who knows that reads 22 as
 * an error — correctly.
 *
 * FILMS ONLY, deliberately. The five One-Shots carry `saga: "infinity"` because
 * they are from that era, and none of them is one of the 23. `type` is what
 * says so, so the count cannot drift from the corpus.
 */
export function infinitySaga<T extends GraphNode & { universe: string; saga: string | null; type: string }>(
  titles: readonly T[],
): T[] {
  return releaseOrder(
    titles.filter((t) => t.universe === "mcu" && t.saga === "infinity" && t.type === "film"),
  );
}

/**
 * THE MCU ORDER — everything Marvel Studios made, minus the One-Shots.
 *
 * This replaced "essentials" as the second order. The distinction essentials
 * drew was between a curated 22 and everything, and the honest version of that
 * distinction is the MCU itself: 72 titles that are one continuous story, next
 * to a projects page that holds all 156.
 *
 * The One-Shots come OUT here and stay on /projects. They are canon, they are
 * four minutes each, and none of them is a step in the story — putting five
 * of them on an eighteen-year spine makes the spine harder to read for
 * something a reader can find any time from the catalogue.
 */
export function mcuOrder<T extends GraphNode & { universe: string; type: string }>(
  titles: readonly T[],
): T[] {
  return releaseOrder(titles.filter((t) => t.universe === "mcu" && t.type !== "short"));
}

/**
 * "What do I watch before X?"
 *
 * Walks the ancestor closure iteratively — a `visited` set, not recursion, so a
 * soft cycle in `enriches` cannot hang the build — then topologically sorts the
 * induced subgraph and appends the target.
 *
 * Appending the target rather than trusting the sort to place it last matters
 * in `full` mode: an `enriches` edge can point at a title released *after* the
 * target, and the answer to "what comes before X" must still end at X.
 */
export function pathTo<T extends GraphNode>(
  titles: readonly T[],
  id: string,
  mode: PathMode = "minimum",
): T[] {
  const byId = new Map(titles.map((t) => [t.id, t]));
  const target = byId.get(id);
  if (!target) throw new UnknownTitleError(id);

  const ancestors = new Set<string>();
  const queue = [id];
  while (queue.length > 0) {
    const current = byId.get(queue.pop()!);
    if (!current) continue;
    const edges = mode === "full" ? [...current.requires, ...current.enriches] : current.requires;
    for (const e of edges) {
      if (e === id || ancestors.has(e) || !byId.has(e)) continue;
      ancestors.add(e);
      queue.push(e);
    }
  }

  const subgraph = titles.filter((t) => ancestors.has(t.id));
  return [...topoSort(subgraph), target];
}

/**
 * What taking one recommendation actually costs.
 *
 * Returns the titles that following `recId` drags in ON TOP of what `fromId`
 * already requires: the recommendation's own hard prerequisites, minus anything
 * already on the minimum path, minus the recommendation itself.
 *
 * This exists because a "+ Recommended" list is a lie when rendered flat. On
 * this corpus, recommending Marvel's Inhumans alongside Multiverse of Madness
 * silently commits you to seven seasons of Agents of S.H.I.E.L.D., while Blade
 * costs nothing but Blade. Presenting those as identical bullets is the same
 * failure the editor's note exists to prevent — homework discovered three
 * screens in rather than surfaced before you commit.
 */
export function recommendationCost<T extends GraphNode>(
  titles: readonly T[],
  fromId: string,
  recId: string,
): T[] {
  const already = new Set(pathTo(titles, fromId, "minimum").map((t) => t.id));
  return pathTo(titles, recId, "minimum").filter((t) => t.id !== recId && !already.has(t.id));
}

export interface Recommendation<T> {
  /** The recommended title itself. */
  rec: T;
  /** Which node on the minimum path recommends it. */
  via: T;
  /** What it drags in besides itself. Empty means it is free to take. */
  cost: T[];
}

/**
 * Every recommendation reachable from a title, grouped by what recommends it
 * and annotated with its transitive cost — the shape the UI needs so that
 * "+ Recommended" can never render as a flat list of equals.
 */
export function recommendationsFor<T extends GraphNode>(
  titles: readonly T[],
  id: string,
): Recommendation<T>[] {
  const byId = new Map(titles.map((t) => [t.id, t]));
  const minimum = pathTo(titles, id, "minimum");
  const onPath = new Set(minimum.map((t) => t.id));

  const out: Recommendation<T>[] = [];
  const seen = new Set<string>();

  // Walk the minimum path in order, so a recommendation is attributed to the
  // earliest title that suggests it rather than an arbitrary one.
  for (const via of minimum) {
    for (const recId of via.enriches) {
      if (onPath.has(recId) || seen.has(recId)) continue;
      const rec = byId.get(recId);
      if (!rec) continue;
      seen.add(recId);
      out.push({ rec, via, cost: recommendationCost(titles, id, recId) });
    }
  }
  return out;
}
