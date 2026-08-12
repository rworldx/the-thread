import { describe, expect, it } from "vitest";
import { shownCharacters } from "@/lib/characters";
import type { MutantClass } from "@/content/character-schema";

/**
 * C26 EVERY CHILD CHIP LIVES INSIDE ITS PARENT.
 *
 * This guard exists because the same bug shipped three times in one session.
 * Heralds and Elders each had a chip UNDER Cosmic entities while not matching
 * Cosmic entities itself, so pressing the parent hid the very people the
 * children listed. Then nine characters carried a magic school and did not
 * match Magicians — Frigga among them, who taught Loki everything he knows.
 *
 * A parent that does not contain its own children is not a hierarchy, it is
 * two unrelated filters wearing one. Rather than re-check by eye, this
 * asserts the property: for every child rule, everyone it matches must also
 * be matched by the parent's rule.
 */
type C = (typeof shownCharacters)[number] & {
  magicSchool?: string | null;
  symbioteClass?: string | null;
};
const aff = (n: string) => (c: C) => c.affiliation.includes(n);
const is = (...n: string[]) => (c: C) => c.species !== null && n.includes(c.species);

const PARENTS: Record<string, (c: C) => boolean> = {
  mutant: (c) => is("Mutant", "Mutant hybrid")(c) || Boolean(c.mutantClass),
  symbiote: (c) =>
    is("Symbiote", "Symbiote god", "Symbiote host")(c) || Boolean(c.symbioteClass),
  magician: (c) =>
    Boolean(c.magicSchool) ||
    aff("Magic")(c) ||
    aff("Masters of the Mystic Arts")(c) ||
    is("Witch", "Demon", "Human avatar")(c),
  cosmic: (c) =>
    is("Abstract entity", "Abstract Entity", "Cosmic entity", "Cosmic Being", "Watcher")(c) ||
    aff("Cosmic entities")(c) ||
    aff("Celestials")(c) ||
    aff("Heralds of Galactus")(c) ||
    aff("Elders of the Universe")(c),
};

const CHILDREN: { id: string; parent: string; match: (c: C) => boolean }[] = [
  ...(["omega", "alpha", "beta", "gamma"] as MutantClass[]).map((k) => ({
    id: `mutant-${k}`,
    parent: "mutant",
    match: (c: C) => c.mutantClass === k,
  })),
  ...["lineage", "spawn", "anomaly", "ancient"].map((k) => ({
    id: `symbiote-${k}`,
    parent: "symbiote",
    match: (c: C) => c.symbioteClass === k,
  })),
  ...[
    "eldritch", "asgardian", "chaos", "dark-dimension", "infernal", "witchcraft",
    "necromancy", "blood", "voodoo", "elder", "green",
  ].map((k) => ({
    id: `magic-${k}`,
    parent: "magician",
    match: (c: C) => c.magicSchool === k,
  })),
  /* The umbrella. Every fan calls all of these dark magic, so the question
     has to remain askable even though the corpus separates the practices. */
  {
    id: "magic-dark",
    parent: "magician",
    match: (c: C) =>
      ["dark-dimension", "infernal", "witchcraft", "necromancy", "blood"].includes(
        c.magicSchool ?? "",
      ),
  },
  { id: "abstract", parent: "cosmic", match: is("Abstract entity", "Abstract Entity") },
  { id: "celestial", parent: "cosmic", match: (c) => is("Celestial")(c) || aff("Celestials")(c) },
  { id: "elder-universe", parent: "cosmic", match: aff("Elders of the Universe") },
  { id: "herald", parent: "cosmic", match: aff("Heralds of Galactus") },
];

describe("C26 the chip hierarchy", () => {
  const all = shownCharacters as unknown as C[];

  for (const child of CHILDREN) {
    it(`${child.id} is contained by ${child.parent}`, () => {
      const parent = PARENTS[child.parent]!;
      const escaped = all.filter((c) => child.match(c) && !parent(c)).map((c) => c.id);
      expect(escaped, `${child.id} members outside ${child.parent}`).toEqual([]);
    });
  }

  /** A child that matches nobody is a chip a reader can press for nothing. */
  it("no child chip is empty", () => {
    const empty = CHILDREN.filter((ch) => !all.some((c) => ch.match(c))).map((c) => c.id);
    expect(empty).toEqual([]);
  });
});
