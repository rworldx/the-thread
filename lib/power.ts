/**
 * HOW STRONG IS EVERYONE — the ranking the /characters sort runs on.
 *
 * DERIVED, NOT TYPED, for the same reason appearances are. A `powerRank` field
 * on 670 records would be 670 numbers to keep in step with each other: insert
 * one character at rank 200 and every number below it is wrong. Here the order
 * falls out of what the corpus already knows — species, mutant class,
 * affiliations — plus a hand-ordered head per tier where twelve sources were
 * read and agree.
 *
 * THE RANK IS A TOTAL ORDER AND THE TIER IS THE CLAIM. A sort needs every
 * character to have a distinct position, so this produces 1..N with no ties.
 * That is not the same as asserting #340 beats #341: inside a tier, past the
 * ranked head, the order is alphabetical and means nothing. The tier is what
 * this file is willing to defend, which is why it is exported alongside.
 *
 * Two documents are generated from this — docs/POWER-TIERS.md and
 * -PEAK.md — by scripts/gen-power-tiers.ts.
 */

import { allCharacters } from "@/lib/characters";
import type { Character } from "@/content/character-schema";

interface Tier {
  n: number;
  title: string;
  gloss: string;
  /** Ordered ids, strongest first. Only the researched head uses this. */
  ranked?: string[];
  /** Everyone else falls in here, alphabetically. */
  match?: (c: Character) => boolean;
}

/* `species` is nullable on the schema; an unset one matches no tier by name
   and falls through to the category rules at the bottom. */
const sp =
  (...names: string[]) =>
  (c: Character) =>
    c.species !== null && names.includes(c.species);
const aff = (...names: string[]) => (c: Character) =>
  c.affiliation.some((a) => names.includes(a));

/**
 * Ordered strongest to weakest. A character lands in the FIRST tier that takes
 * them, so the specific tests must come before the broad ones.
 */
const TIERS: Tier[] = [
  {
    n: 0,
    title: "Outside creation",
    gloss:
      "Not combatants. The reason there is anything to fight over. No source ranks anything above these two.",
    ranked: ["the-one-above-all", "the-one-below-all"],
  },
  {
    n: 1,
    title: "Above the multiverse",
    gloss:
      "Each has ended, judged or rewritten a cosmos. The Beyonders lead on the plainest feat available: they killed the Living Tribunal.",
    ranked: [
      "the-beyonders",
      "the-living-tribunal",
      "the-beyonder",
      "first-firmament",
      "protege",
      "nemesis",
    ],
  },
  {
    n: 2,
    title: "The universe, personified",
    gloss:
      "Concepts with a will. Eternity and Infinity are twins and the sources split on which leads; the pairing is the honest answer.",
    ranked: [
      "eternity",
      "infinity",
      "oblivion",
      "death",
      "master-order",
      "lord-chaos",
      "the-in-betweener",
      "queen-of-nevers",
      "phoenix",
      "mistress-love",
      "sire-hate",
    ],
    match: sp("Abstract Entity", "Abstract entity"),
  },
  {
    n: 3,
    title: "Beings with a cosmic office",
    gloss:
      "Power that comes with a job — devouring, judging, holding a dimension. Ranked above gods and below the abstracts they answer to.",
    ranked: [
      "knull",
      "chaos-king",
      "galactus",
      "arishem",
      "exitar",
      "the-progenitor",
      "tiamut",
      "chthon",
      "set",
      "shuma-gorath",
      "cyttorak",
      "dormammu",
    ],
    match: (c) =>
      sp(
        "Celestial",
        "Elder God",
        "Cosmic Being",
        "Cosmic entity",
        "Cosmic Force",
        "Watcher",
        "Symbiote god",
        "Psychic Entity",
      )(c) || aff("Cosmic entities", "Celestials")(c),
  },
  {
    n: 4,
    title: "Mortals who rewrite reality",
    gloss:
      "Born inside the universe and able to edit it. Molecule Man and Franklin Richards are the live argument for strongest being in Marvel, and neither wins it cleanly.",
    ranked: [
      "molecule-man",
      "franklin-richards",
      "captain-universe",
      "onslaught",
      "legion",
      "proteus",
      "scarlet-witch",
      "jamie-braddock",
      "mister-m",
    ],
    match: (c) => c.mutantClass === "omega",
  },
  {
    n: 5,
    title: "Gods, and the top of the physical scale",
    gloss:
      "No cosmic office, no reality warping — just more raw power than anything below can survive.",
    ranked: [
      "odin",
      "surtur",
      "zeus",
      "mangog",
      "sentry",
      "silver-surfer",
      "thanos",
      "hela",
      "thor",
      /* The Hulk is here rather than higher ONLY because of the base-form
         rule. Savage Hulk is what the corpus holds; World-Breaker, who tore
         a continent, is a state he reaches and not a form he keeps. */
      "hulk",
      "hyperion",
    ],
    match: (c) =>
      sp(
        "God",
        "Asgardian",
        "Olympian",
        "Titan",
        "Eternal",
        "Elder of the Universe",
        "Frost Giant",
        "Fire demon",
        "Alien dragon",
        "Zenn-Lavian",
        "Elder god",
      )(c) || aff("Heralds of Galactus", "Elders of the Universe", "Gods")(c),
  },
  {
    n: 6,
    title: "Alpha class",
    gloss:
      "The strongest tier a person can reach without leaving the scale. Sorcerers, alpha mutants, symbiotes, Inhumans.",
    match: (c) =>
      c.mutantClass === "alpha" ||
      (c.magicSchools?.length ?? 0) > 0 ||
      Boolean(c.symbioteClass) ||
      sp(
        "Demon",
        "Witch",
        "Faltine",
        "Inheritor",
        "Inhuman",
        "Symbiote",
        "Symbiote host",
        "Technarch",
        "Energy being",
        "Cursed being",
        "Mutant island",
        "Artifact",
        "Strontian",
      )(c) ||
      aff("Magic", "Vishanti", "Masters of the Mystic Arts")(c),
  },
  {
    n: 7,
    title: "Enhanced",
    gloss:
      "Beta and gamma mutants, mutates, super-soldiers, androids, aliens. Superhuman, and bounded.",
    match: (c) =>
      c.mutantClass !== null ||
      sp(
        "Mutant",
        "Mutant hybrid",
        "Mutate",
        "Human mutate",
        "Gamma mutate",
        "Enhanced human",
        "Synthezoid",
        "Artificial being",
        "Artificial intelligence",
        "Machine",
        "Cyborg",
        "Clone",
        "Vampire",
        "Dhampir",
        "Werewolf",
        "Human hybrid",
        "Human-Kree hybrid",
        "Human host",
        "Human avatar",
        "Empath",
        "Atlantean",
        "Talokanil",
        "Uplifted animal",
        "Uplifted raccoon",
        "Flora colossus",
        "Plant elemental",
        "Alligator",
        "Frog",
        "Sabretooth tiger",
        "Insectivorid",
        "Dark elf",
        "Dwarf",
        "Kronan",
        "Alien",
        "Kree",
        "Skrull",
        "Shi'ar",
        "Xandarian",
        "Centaurian",
        "Luphomoid",
        "Zehoberei",
        "Kylosian",
        "Korbinite",
        "Birjian",
        "Mephitisoid",
        "Mojoworlder",
        "Pluvian",
        "Lem",
        "Djinn-blooded",
      )(c),
  },
  {
    n: 8,
    title: "Humans who turn up anyway",
    gloss:
      "No powers at all. A suit, a bow, a plan or a badge — and a place on a team that has all three.",
    /* Belonging to an organisation counts. Filing Nick Fury with the aunts and
       reporters was the tell that `category` alone was the wrong test: he is
       "supporting" because he is nobody's protagonist, which says nothing at
       all about whether he turns up to the fight. */
    match: (c) => c.category !== "supporting" || c.affiliation.length > 0,
  },
  {
    n: 9,
    title: "The ones with nothing but nerve",
    gloss:
      "Reporters, aunts, girlfriends, police captains. They have no business in a fight and are in every one of these stories anyway.",
    match: () => true,
  },
];


/**
 * PEAK FORMS — docs/POWER-TIERS-PEAK.md, a second and different question.
 *
 * The tiers above ask "how strong is this character when you meet them". This
 * asks "how strong have they ever been", which reorders the top violently and
 * barely touches the bottom: Thanos picks up the Gauntlet, Thor becomes Rune
 * King, Jean becomes the White Phoenix, and a man with a bow is still a man
 * with a bow.
 *
 * THAT ASYMMETRY IS THE POINT, and it is why this is a separate head over the
 * same derived tail rather than a whole second ranking. A "peak" list that
 * reorders all 670 is claiming a peak feat for 600 characters who do not have
 * one.
 *
 * The two hardest calls, both stated rather than hidden:
 *
 *   GOD EMPEROR DOOM ABOVE THE LIVING TRIBUNAL. Doom held the power of a
 *   thousand Beyonders, murdered a Phoenix-powered Cyclops and beat an
 *   Infinity Gauntlet. The Beyonders as a race killed the Tribunal, so the
 *   power that killed it ranks above it. Reasonable people put the Tribunal
 *   first because its office is permanent and Doom's throne was borrowed.
 *
 *   A CHARACTER'S PEAK IS WHAT THEY WIELDED, NOT WHAT RODE THEM. Jean's
 *   White Phoenix counts because she mastered the Force; Wanda's chaos magic
 *   counts because she casts it. The Hulk as a vessel for the One Below All
 *   does NOT, and he is ranked as the Breaker of Worlds instead — otherwise
 *   the rule proves too much, since Xavier would be ranked as Onslaught and
 *   half this list would collapse into the four entities doing the riding,
 *   each of which already has its own record here.
 *
 *   GALACTUS ABOVE KNULL. Both have killed Celestials, and the sources that
 *   compare them directly give Galactus the higher raw output. Knull's edge is
 *   a weapon rather than a power.
 */
export const PEAK_HEAD: string[] = [
  "the-one-above-all",
  "the-one-below-all",
  "the-fulcrum",
  "first-firmament",
  "the-beyonders",
  "molecule-man",
  "the-beyonder",
  /* Thanos moved up on the Heart of the Universe, which the sources call a
     FRAGMENT OF THE ONE ABOVE ALL'S OWN POWER — a higher ceiling than the
     Infinity Gauntlet he is usually ranked on, and higher than God Emperor
     Doom, whose thousand Beyonders were borrowed and lost. */
  "thanos",
  "doctor-doom",
  /* FRANKLIN AHEAD OF WARLOCK, which is the one place I disagree with the
     26-name draft. Warlock's peak is the Infinity Gauntlet — the same object
     Thanos is already ranked on two places above — and ranking two characters
     on one borrowed artifact stacks the list with the artifact rather than
     with them. Franklin's ceiling is his own, and he beat God Emperor Doom. */
  "franklin-richards",
  "adam-warlock",
  "the-living-tribunal",
  "protege",
  "master-weaver",
  "great-web",
  "eternity",
  "infinity",
  "oblivion",
  "death",
  "queen-of-nevers",
  "chaos-king",
  "master-order",
  "lord-chaos",
  "the-in-betweener",
  "powers-that-be",
  "natural-order",
  "nemesis",
  "abraxas",
  "griever",
  "phoenix",
  "jean-grey",
  "scarlet-witch",
  "legion",
  "onslaught",
  "galactus",
  "knull",
  "thor",
  /* Hulk above Odin, per Rashid. Ranked as the Breaker of Worlds — see the
     note on One-Below-All in the comment above PEAK_HEAD. */
  "hulk",
  "gorr",
  "odin",
  "surtur",
  "silver-surfer",
  "doctor-strange",
  "sentry",
  "captain-universe",
  "the-progenitor",
  "arishem",
  "exitar",
  "chthon",
  "shuma-gorath",
  "cyttorak",
  "dormammu",
  "mephisto",
  "zeus",
  "hercules",
  "apocalypse",
  "cosmic-ghost-rider",
  "hela",
  /* The God of Stories rewrote himself into the narrative, which is a bigger
     peak than any version of Loki that only fights. */
  "loki",
  "ghost-rider",
  "professor-x",
  /* Binary above Magneto: Carol at her peak is channelling a white hole,
     which is a larger claim than magnetism however well it is used. */
  "captain-marvel",
  "magneto",
  "iceman",
  "kang",
];


/** Ordered strongest to weakest, every character exactly once. */
export const powerOrder: { c: Character; tier: number; ranked: boolean }[] = (() => {
  const byId = new Map(allCharacters.map((c) => [c.id, c]));
  const placed = new Set<string>();
  for (const t of TIERS) {
    for (const id of t.ranked ?? []) {
      if (!byId.has(id)) throw new Error(`tier ${t.n} names "${id}", which is not a character`);
      placed.add(id);
    }
  }
  const out: { c: Character; tier: number; ranked: boolean }[] = [];
  const seen = new Set<string>();
  for (const t of TIERS) {
    for (const id of t.ranked ?? []) {
      out.push({ c: byId.get(id)!, tier: t.n, ranked: true });
      seen.add(id);
    }
    const rest = allCharacters
      .filter((c) => !placed.has(c.id) && !seen.has(c.id) && (t.match?.(c) ?? false))
      .sort((a, b) => a.nameEn.localeCompare(b.nameEn, "en"));
    for (const c of rest) {
      out.push({ c, tier: t.n, ranked: false });
      seen.add(c.id);
    }
  }
  const missed = allCharacters.filter((c) => !seen.has(c.id));
  if (missed.length) throw new Error(`unplaced: ${missed.map((c) => c.id).join(", ")}`);
  return out;
})();

const rankById = new Map(powerOrder.map((x, i) => [x.c.id, i + 1]));
const tierById = new Map(powerOrder.map((x) => [x.c.id, x.tier]));

/** 1 is strongest. Every character has one, and no two share it. */
export function powerRankOf(id: string): number {
  const r = rankById.get(id);
  if (r === undefined) throw new Error(`no power rank for "${id}"`);
  return r;
}

/** 0 is strongest. The part of the ranking that is a claim rather than a sort. */
export function powerTierOf(id: string): number {
  const t = tierById.get(id);
  if (t === undefined) throw new Error(`no power tier for "${id}"`);
  return t;
}

export { TIERS as POWER_TIERS };
