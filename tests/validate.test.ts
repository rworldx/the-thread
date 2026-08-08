import { describe, expect, it } from "vitest";
import { validateAuthoring, validateCorpus } from "@/lib/validate";
import { titles } from "@/content/titles";
import {
  brokenSpine,
  crossUniverseNoNote,
  crossUniverseViaEnrichesNoNote,
  crossUniverseViaEnrichesWithNote,
  danglingEnriches,
  danglingRequires,
  cyclic,
  disconnected,
  forkRejoin,
  linear,
  optionalAsSoftEdge,
  optionalWithDependents,
  sameUniverseWithNote,
  selfCycle,
  softCyclic,
  soundSpine,
  spoilerCrossReference,
  spoilerCrossReferenceArabic,
  spoilerGenericDescriptor,
  spoilerRealReferenceStillFails,
  spoilerMentionsSeason,
  spoilerSelfContained,
  node,
} from "./__fixtures__/graphs";

const rules = (input: Parameters<typeof validateCorpus>[0]) =>
  validateCorpus(input).map((v) => v.rule);

describe("B. corpus validation — cross-node rules zod cannot see", () => {
  it("B1 flags a duplicate id and names both offenders", () => {
    const v = validateCorpus([node("a"), node("a"), node("b")]);
    const dup = v.find((x) => x.rule === "duplicate-id");
    expect(dup).toBeDefined();
    expect(dup!.ids).toEqual(["a"]);
  });

  it("B2 flags a requires edge to a non-existent id, naming source and target", () => {
    const v = validateCorpus(danglingRequires);
    const dangling = v.find((x) => x.rule === "dangling-requires");
    expect(dangling).toBeDefined();
    expect(dangling!.message).toContain("ghost");
    expect(dangling!.ids).toContain("a");
  });

  it("B3 flags a dangling enriches edge", () => {
    expect(rules(danglingEnriches)).toContain("dangling-enriches");
  });

  it("B4 flags two nodes sharing a showId and a season number", () => {
    const corpus = [
      node("loki-s1", { type: "season", seasons: [1], showId: "loki" }),
      node("loki-s1-again", { type: "season", seasons: [1], showId: "loki" }),
    ];
    expect(rules(corpus)).toContain("duplicate-season");
  });

  it("B4b allows the same season number under different shows", () => {
    const corpus = [
      node("loki-s1", { type: "season", seasons: [1], showId: "loki" }),
      node("hawkeye-s1", { type: "season", seasons: [1], showId: "hawkeye" }),
    ];
    expect(rules(corpus)).not.toContain("duplicate-season");
  });

  it("B7 flags a cycle in requires — the build-breaker", () => {
    expect(rules(cyclic)).toContain("cycle");
    expect(rules(selfCycle)).toContain("cycle");
  });

  it("B8 the cycle error names the full path, not just 'a cycle exists'", () => {
    const v = validateCorpus(cyclic).find((x) => x.rule === "cycle");
    expect(v).toBeDefined();
    // Every member of the loop is named, and the message shows it as a loop.
    expect(v!.ids.sort()).toEqual(["a", "b", "c"]);
    expect(v!.message).toMatch(/→/);
    expect(v!.message).toMatch(/a/);
  });

  it("B9 flags a cycle in requires ∪ enriches even when requires alone is acyclic", () => {
    expect(rules(softCyclic)).not.toContain("cycle");
    expect(rules(softCyclic)).toContain("soft-cycle");
  });

  it("B10 flags an essential title requiring a non-essential one", () => {
    const v = validateCorpus(brokenSpine).find((x) => x.rule === "essential-closure");
    expect(v).toBeDefined();
    expect(v!.ids).toEqual(expect.arrayContaining(["b", "a"]));
  });

  it("B10b accepts a spine whose prerequisites are all on the spine", () => {
    expect(rules(soundSpine)).not.toContain("essential-closure");
  });

  it("B11 requires an editorNote when a requires edge crosses a universe", () => {
    expect(rules(crossUniverseNoNote)).toContain("missing-editor-note");
    expect(rules(forkRejoin)).not.toContain("missing-editor-note");
  });

  it("B11b rejects an editorNote on a node whose requires never leave its universe", () => {
    expect(rules(sameUniverseWithNote)).toContain("superfluous-editor-note");
  });

  it("B11c the rule is iff — same-universe sequence needs no note", () => {
    expect(rules(linear)).toEqual([]);
  });

  it("B11d a cross-universe edge via enriches ALSO needs a note", () => {
    // A detour is a detour whether it is mandatory or recommended. Without
    // this, softening a hard prerequisite to a recommendation — an ordinary
    // editorial move — would fail CI on a correct corpus.
    expect(rules(crossUniverseViaEnrichesNoNote)).toContain("missing-editor-note");
  });

  it("B11e a note explaining an enriches-only detour is valid, not superfluous", () => {
    expect(rules(crossUniverseViaEnrichesWithNote)).toEqual([]);
  });

  it("B18 flags an optional title that something hard-requires", () => {
    const v = validateCorpus(optionalWithDependents).find(
      (x) => x.rule === "optional-with-dependents",
    );
    expect(v).toBeDefined();
    expect(v!.ids).toEqual(expect.arrayContaining(["skippable", "dependent"]));
    expect(v!.message).toMatch(/enriches/);
  });

  it("B18b softening that edge to enriches is the fix, and validates", () => {
    expect(rules(optionalAsSoftEdge)).toEqual([]);
  });

  it("B18b2 B10 does not catch this — both ends can sit off the spine", () => {
    // Documents why B18 has to exist separately rather than being folded into
    // the essential-closure check.
    expect(rules(optionalWithDependents)).not.toContain("essential-closure");
  });

  it("B19 rejects a spoiler-safe line that names another title", () => {
    const v = validateCorpus(spoilerCrossReference).find(
      (x) => x.rule === "spoiler-cross-reference",
    );
    expect(v).toBeDefined();
    expect(v!.message).toContain("Avengers: Endgame");
  });

  it("B19b a self-contained line is fine", () => {
    expect(rules(spoilerSelfContained)).not.toContain("spoiler-cross-reference");
  });

  it("B19c catches an ARABIC line naming an Arabic title", () => {
    // The rule compared titleEn only, so half the corpus was unguarded under a
    // check written to be mechanical precisely so judgment was not required.
    const v = validateCorpus(spoilerCrossReferenceArabic).find(
      (x) => x.rule === "spoiler-cross-reference",
    );
    expect(v).toBeDefined();
    expect(v!.message).toContain("نهاية اللعبة");
  });

  it("B19e a generic descriptor is not a citation", () => {
    // "المسلسل الكرتوني" is a colon-segment of two Arabic titles, but nobody
    // reads "the famous cartoon series" as naming another work.
    expect(rules(spoilerGenericDescriptor)).not.toContain("spoiler-cross-reference");
  });

  it("B19f the stoplist does NOT open a hole for a real reference", () => {
    // The hazard of any exclusion list: it stops catching the thing it was for.
    // Naming the whole title still fails, stoplist or not.
    expect(rules(spoilerRealReferenceStillFails)).toContain("spoiler-cross-reference");
  });

  it("B19d a season marker is not a citation", () => {
    // "Season 1" is bookkeeping. Banning it would make half the episodic corpus
    // undescribable, which is how an over-eager rule gets deleted wholesale.
    expect(rules(spoilerMentionsSeason)).not.toContain("spoiler-cross-reference");
  });

  it("B20 spoilerSafe may not be authored in titles.ts", () => {
    // content/copy.ts owns it. Two homes is the same shape as titleEn baking in
    // a season range while `seasons` also carried it.
    const v = validateAuthoring([
      { id: "a", spoilerSafe: { en: "x", ar: "س" } },
      { id: "b", spoilerSafe: null },
    ]);
    expect(v.map((x) => x.rule)).toEqual(["spoiler-safe-two-homes"]);
    expect(v[0]!.ids).toEqual(["a"]);
  });

  it("B20b the real authored corpus sets none", () => {
    expect(validateAuthoring(titles)).toEqual([]);
  });

  it("B12 the real corpus passes every rule", () => {
    const violations = validateCorpus(titles);
    // Print them, so a CI failure is actionable without a re-run.
    if (violations.length) console.error(violations);
    expect(violations).toEqual([]);
  });

  it("B13 reports ALL violations, not just the first", () => {
    const messy = [
      node("a", { requires: ["ghost"] }),
      node("a"),
      node("b", { enriches: ["phantom"] }),
    ];
    const v = validateCorpus(messy);
    expect(v.length).toBeGreaterThanOrEqual(3);
    expect(new Set(v.map((x) => x.rule))).toEqual(
      new Set(["dangling-requires", "duplicate-id", "dangling-enriches"]),
    );
  });

  it("B14 a clean disconnected corpus is valid — components need not touch", () => {
    expect(validateCorpus(disconnected)).toEqual([]);
  });

  it("B15 an empty corpus is valid, not a crash", () => {
    expect(validateCorpus([])).toEqual([]);
  });
});
