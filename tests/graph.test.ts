import { describe, expect, it } from "vitest";
import { CycleError, essentialsOrder, releaseOrder, topoSort } from "@/lib/graph";
import { titles } from "@/content/titles";
import {
  cyclic,
  diamond,
  disconnected,
  empty,
  forkRejoin,
  linear,
  sameDate,
  single,
  soundSpine,
  unconstrained,
} from "./__fixtures__/graphs";

const ids = (ts: { id: string }[]) => ts.map((t) => t.id);

/** For each edge a → b, a must appear before b. */
function respectsRequires(ordered: { id: string; requires: string[] }[]) {
  const index = new Map(ordered.map((t, i) => [t.id, i]));
  return ordered.every((t) =>
    t.requires.every((r) => !index.has(r) || index.get(r)! < index.get(t.id)!),
  );
}

describe("C1. releaseOrder", () => {
  it("sorts ascending by releaseDate", () => {
    expect(ids(releaseOrder(unconstrained))).toEqual(["alpha", "bravo", "charlie", "delta"]);
  });

  it("breaks ties on id, deterministically", () => {
    expect(ids(releaseOrder(sameDate))).toEqual(["alpha", "mike", "zulu"]);
  });

  it("is total — nothing dropped, nothing duplicated", () => {
    const out = releaseOrder(titles);
    expect(out).toHaveLength(titles.length);
    expect(new Set(ids(out)).size).toBe(titles.length);
  });

  it("does not mutate its input", () => {
    const before = ids(unconstrained);
    releaseOrder(unconstrained);
    expect(ids(unconstrained)).toEqual(before);
  });

  it("is NOT a topological sort — release order may legitimately violate requires", () => {
    // This is a statement of intent, not a defect: you watch Iron Man 2 before
    // Thor by release date even though the graph does not order them that way.
    expect(() => releaseOrder(cyclic)).not.toThrow();
  });
});

describe("C3. topoSort", () => {
  it("respects every requires edge", () => {
    for (const fixture of [linear, diamond, forkRejoin, disconnected]) {
      expect(respectsRequires(topoSort(fixture))).toBe(true);
    }
  });

  it("is stable: unconstrained nodes come out by date, then id", () => {
    expect(ids(topoSort(unconstrained))).toEqual(["alpha", "bravo", "charlie", "delta"]);
    expect(ids(topoSort(sameDate))).toEqual(["alpha", "mike", "zulu"]);
  });

  it("is deterministic across repeated calls and input shuffles", () => {
    const once = ids(topoSort(diamond));
    const twice = ids(topoSort([...diamond].reverse()));
    expect(once).toEqual(twice);
  });

  it("throws CycleError rather than returning a partial order", () => {
    expect(() => topoSort(cyclic)).toThrow(CycleError);
  });

  it("the thrown CycleError carries the cycle path", () => {
    try {
      topoSort(cyclic);
      expect.unreachable("should have thrown");
    } catch (e) {
      expect(e).toBeInstanceOf(CycleError);
      expect((e as CycleError).cycle.length).toBeGreaterThan(0);
    }
  });

  it("empty input yields empty output, not a throw", () => {
    expect(topoSort(empty)).toEqual([]);
  });

  it("single node yields that node", () => {
    expect(ids(topoSort(single))).toEqual(["only"]);
  });

  it("is total over the real corpus", () => {
    const out = topoSort(titles);
    expect(out).toHaveLength(titles.length);
    expect(respectsRequires(out)).toBe(true);
  });
});

describe("C4. essentialsOrder", () => {
  it("keeps only essential titles", () => {
    expect(ids(essentialsOrder(soundSpine))).toEqual(["a", "b"]);
  });

  it("topologically sorts the induced subgraph", () => {
    expect(respectsRequires(essentialsOrder(titles))).toBe(true);
  });

  it("is non-empty on the real corpus — the spine exists", () => {
    expect(essentialsOrder(titles).length).toBeGreaterThan(0);
  });

  it("is self-contained: no essential title depends on something outside the result", () => {
    const out = essentialsOrder(titles);
    const inResult = new Set(ids(out));
    for (const t of out) {
      for (const r of t.requires) expect(inResult.has(r)).toBe(true);
    }
  });
});

describe("C2. storyOrder is deliberately absent from v1", () => {
  it("is not exported — a half-null story toggle is worse than none", async () => {
    const graph = await import("@/lib/graph");
    expect("storyOrder" in graph).toBe(false);
  });
});
