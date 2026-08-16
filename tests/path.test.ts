import { describe, expect, it } from "vitest";
import {
  UnknownTitleError,
  pathTo,
  recommendationCost,
  recommendationsFor,
} from "@/lib/graph";
import { titles } from "@/content/titles";
import { diamond, forkRejoin, linear, single } from "./__fixtures__/graphs";

const ids = (ts: { id: string }[]) => ts.map((t) => t.id);
const path = (id: string, mode: "minimum" | "full" = "minimum") => ids(pathTo(titles, id, mode));

describe("D. pathTo — the product", () => {
  it("D1 a root is its own path, not an empty list", () => {
    expect(ids(pathTo(single, "only"))).toEqual(["only"]);
    expect(ids(pathTo(linear, "a"))).toEqual(["a"]);
  });

  it("D2 an unknown id throws a named error, never returns undefined", () => {
    expect(() => pathTo(titles, "spider-man-4")).toThrow(UnknownTitleError);
    expect(() => pathTo(titles, "")).toThrow(UnknownTitleError);
  });

  it("D3 follows the transitive closure", () => {
    expect(ids(pathTo(linear, "d"))).toEqual(["a", "b", "c", "d"]);
  });

  it("D4 diamond: a shared prerequisite appears EXACTLY once", () => {
    const out = ids(pathTo(diamond, "d"));
    expect(out.filter((x) => x === "a")).toHaveLength(1);
    expect(out).toEqual(["a", "b", "c", "d"]);
  });

  it("D4b no duplicates anywhere, on any corpus node", () => {
    for (const t of titles) {
      const out = path(t.id, "full");
      expect(new Set(out).size).toBe(out.length);
    }
  });

  it("D5 minimum mode follows requires only", () => {
    const out = ids(pathTo(forkRejoin, "main-3", "minimum"));
    expect(out).toEqual(["main-1", "side-1", "side-2", "main-2", "main-3"]);
  });

  it("D6/D7 full ⊇ minimum for every node in the real corpus", () => {
    for (const t of titles) {
      const min = new Set(path(t.id, "minimum"));
      const full = path(t.id, "full");
      for (const id of min) expect(full).toContain(id);
    }
  });

  it("D8 the target is always last — the thing you asked for is what you watch last", () => {
    for (const t of titles) {
      expect(path(t.id, "minimum").at(-1)).toBe(t.id);
      expect(path(t.id, "full").at(-1)).toBe(t.id);
    }
  });

  it("D9 the result is a valid topological order of its own subgraph", () => {
    for (const t of titles) {
      const out = pathTo(titles, t.id, "minimum");
      const index = new Map(out.map((x, i) => [x.id, i]));
      for (const n of out) {
        for (const r of n.requires) {
          expect(index.has(r)).toBe(true);
          expect(index.get(r)!).toBeLessThan(index.get(n.id)!);
        }
      }
    }
  });

  it("D10 no descendants leak in", () => {
    expect(path("iron-man")).not.toContain("avengers-endgame");
    expect(path("iron-man")).toEqual(["iron-man"]);
  });

  it("D11 No Way Home pulls in the Raimi and Webb films (marker 1)", () => {
    const min = path("spider-man-no-way-home");
    for (const id of [
      "spider-man",
      "spider-man-2",
      "spider-man-3",
      "the-amazing-spider-man",
      "the-amazing-spider-man-2",
    ]) {
      expect(min).toContain(id);
    }
    // Daredevil S1 is marked optional in the source — soft edge only.
    expect(min).not.toContain("daredevil-s1");
    expect(path("spider-man-no-way-home", "full")).toContain("daredevil-s1");
  });

  it("D12 Deadpool & Wolverine pulls in Fox; Elektra and Blade are recommended only", () => {
    const min = path("deadpool-and-wolverine");
    expect(min).toContain("deadpool");
    expect(min).toContain("deadpool-2");
    expect(min).toContain("logan");

    for (const id of ["elektra", "blade", "blade-ii", "blade-trinity"]) {
      expect(min).not.toContain(id);
      expect(path("deadpool-and-wolverine", "full")).toContain(id);
    }
  });

  it("D13 Echo pulls in all thirteen Defenders-saga seasons (marker 3)", () => {
    const min = path("echo-s1");
    const defenders = titles.filter((t) => t.universe === "defenders").map((t) => t.id);
    expect(defenders).toHaveLength(13);
    for (const id of defenders) expect(min).toContain(id);
  });

  it("D13b Multiverse of Madness recommends X-Men and Fantastic Four (marker 2)", () => {
    // The source puts this instruction in a parenthetical aside, so these are
    // recommendations. Twelve hard prerequisites for a Professor X cameo is the
    // thing this site exists to prevent.
    const min = path("doctor-strange-in-the-multiverse-of-madness");
    const full = path("doctor-strange-in-the-multiverse-of-madness", "full");

    for (const id of [
      "x-men",
      "x2",
      "x-men-first-class",
      "x-men-days-of-future-past",
      "fantastic-four-2005",
      "fantastic-four-2015",
      "marvels-inhumans",
    ]) {
      expect(min, `${id} must not be required`).not.toContain(id);
      expect(full, `${id} must be recommended`).toContain(id);
    }
  });

  it("D13c the minimum path to Multiverse of Madness drops by exactly the 12 recommendations", () => {
    // Four direct prerequisites, but 38 titles resolved — because No Way Home
    // is a genuine prerequisite and it drags in the five Sony Spider-Man films,
    // and because an MCU path is now the whole MCU line behind it rather than
    // the dependency closure alone. 32 before the spine; the six that joined
    // are MCU titles nothing happened to require. That is the point of the
    // spine: the saga is a sequence, not a set of prerequisites.
    const min = path("doctor-strange-in-the-multiverse-of-madness");
    expect(min).toHaveLength(38);
    for (const id of ["doctor-strange", "wandavision-s1", "spider-man-no-way-home", "what-if-s1"]) {
      expect(min).toContain(id);
    }
    expect(min).toContain("spider-man"); // via No Way Home, correctly
  });

  it("D16 an optional title never appears in any minimum path", () => {
    // The corpus counterpart of rule B18: if the thread draws something dashed,
    // no minimum path may depend on it.
    const optional = titles.filter((t) => t.optional).map((t) => t.id);
    expect(optional.length).toBeGreaterThan(0);
    for (const t of titles) {
      for (const id of optional) {
        if (id === t.id) continue;
        expect(path(t.id, "minimum"), `${t.id} requires optional ${id}`).not.toContain(id);
      }
    }
  });

  it("D14 every node in the corpus has a resolvable path", () => {
    for (const t of titles) {
      expect(() => pathTo(titles, t.id, "minimum")).not.toThrow();
      expect(() => pathTo(titles, t.id, "full")).not.toThrow();
    }
  });

  it("D17 recommendationCost prices Inhumans honestly", () => {
    // The finding that motivated the helper: recommending Inhumans on
    // Multiverse of Madness silently commits you to Agents of S.H.I.E.L.D.
    const cost = recommendationCost(
      titles,
      "doctor-strange-in-the-multiverse-of-madness",
      "marvels-inhumans",
    );
    expect(cost.map((t) => t.id)).toEqual(["agents-of-shield"]);
    expect(cost[0]!.seasons).toHaveLength(7);
  });

  it("D17b a recommendation with no prerequisites of its own costs nothing", () => {
    expect(recommendationCost(titles, "deadpool-and-wolverine", "blade")).toEqual([]);
  });

  it("D17c cost is transitive and excludes what the path already covers", () => {
    // Blade: Trinity needs the two earlier Blade films, neither of which is on
    // Deadpool & Wolverine's minimum path.
    const cost = recommendationCost(titles, "deadpool-and-wolverine", "blade-trinity");
    expect(cost.map((t) => t.id)).toEqual(["blade", "blade-ii"]);

    // But once Blade is itself on the path, it stops being a cost.
    const already = new Set(pathTo(titles, "blade-trinity", "minimum").map((t) => t.id));
    expect(already.has("blade")).toBe(true);
    expect(recommendationCost(titles, "blade-trinity", "blade")).toEqual([]);
  });

  it("D18 recommendationsFor groups by recommender and never duplicates", () => {
    const recs = recommendationsFor(titles, "deadpool-and-wolverine");
    const ids = recs.map((r) => r.rec.id);
    expect(new Set(ids).size).toBe(ids.length);

    // Nothing already on the minimum path is offered as a recommendation.
    const onPath = new Set(pathTo(titles, "deadpool-and-wolverine", "minimum").map((t) => t.id));
    for (const id of ids) expect(onPath.has(id)).toBe(false);

    // Hulk is recommended by The Avengers, not by the target — attribution
    // matters, because the note that explains it hangs off the recommender.
    const hulk = recs.find((r) => r.rec.id === "the-incredible-hulk");
    expect(hulk?.via.id).toBe("the-avengers");
  });

  it("D18b the grouped recommendations cover every title full mode adds", () => {
    for (const id of ["deadpool-and-wolverine", "doctor-strange-in-the-multiverse-of-madness"]) {
      const min = new Set(pathTo(titles, id, "minimum").map((t) => t.id));
      const marginal = pathTo(titles, id, "full")
        .map((t) => t.id)
        .filter((x) => !min.has(x));
      const covered = new Set(
        recommendationsFor(titles, id).flatMap((r) => [r.rec.id, ...r.cost.map((c) => c.id)]),
      );
      // Every extra title in `full` is accounted for by some recommendation —
      // nothing appears in the UI without an explanation of where it came from.
      for (const m of marginal) expect(covered.has(m), `${id} → ${m} unattributed`).toBe(true);
    }
  });

  it("D15 pathTo does not mutate the corpus", () => {
    const before = JSON.stringify(titles);
    pathTo(titles, "avengers-endgame", "full");
    expect(JSON.stringify(titles)).toBe(before);
  });
});
