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
    /**
     * THE PUBLISHED OMEGA LIST IS NOT A POWER RANKING, and this tier learned
     * that the hard way. `mutantClass` follows Marvel's own list on purpose —
     * C12 exists because five names were once added to it off a fan roster and
     * had to come back off. That rule is right for the FIELD and wrong as the
     * only way in here: it left Nate Grey at 253 and Matthew Malloy at 509,
     * behind an alligator, because a list they are absent from is not evidence
     * that they cannot warp reality. Nate reshaped the world in Age of X-Man.
     * Malloy was so far past control that Xavier erased him rather than fight.
     *
     * So they are named. The field still says what Marvel published; the
     * ranking says what they did.
     */
    ranked: [
      "molecule-man",
      "franklin-richards",
      "captain-universe",
      "onslaught",
      "legion",
      "scarlet-witch",
      "mad-jim-jaspers",
      "nate-grey",
      "proteus",
      "matthew-malloy",
      "marquis-of-death",
      "jamie-braddock",
      "rachel-summers",
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
      /* Named because their species is a dead end: Bill is a Korbinite and
         Gladiator a Strontian, races of one, so no rule could ever find them.
         Bill carries Stormbreaker and fought Thor to a draw; Gladiator has
         held off the entire X-Men roster. Both were ranked below Cyclops. */
      "beta-ray-bill",
      "gladiator",
      /**
       * COSMIC POWER WORN BY A HUMAN BODY, which "Enhanced human" and
       * "Artificial being" describe about as well as "mammal" describes a
       * whale. Adam Warlock came out at 295, Quasar at 267, Richard Rider at
       * 405 and Blue Marvel at 474 — a man whose body is an antimatter
       * reactor, ranked below three hundred people.
       *
       * Rider before Sam Alexander deliberately: Rich has carried the entire
       * Nova Force and the Worldmind, and Sam's own record says the helmet
       * does most of it.
       */
      "adam-warlock",
      "quasar",
      "richard-rider",
      "blue-marvel",
      /* The Hulk is here rather than higher ONLY because of the base-form
         rule. Savage Hulk is what the corpus holds; World-Breaker, who tore
         a continent, is a state he reaches and not a form he keeps. */
      "hulk",
      "hyperion",
    ],
    match: (c) =>
      /**
       * ASGARDIAN, FROST GIANT AND ETERNAL ARE RACES, NOT POWER LEVELS, and
       * treating them as tier-5 admission put Heimdall and Frigga above Doctor
       * Strange, and Valkyrie above Doctor Doom. The Asgardians who belong up
       * here are named in the head — Odin, Thor, Hela — and the rest are
       * warriors, which tier 6 already describes.
       *
       * ELDERS OF THE UNIVERSE STAY. They are not warriors either, but Marvel's
       * own glossary files them with the cosmic beings: survivors of the
       * universe's oldest races, wielding the Power Primordial, older than the
       * gods below them. That is a claim about what they are rather than how
       * they fight, and it is the same claim this tier is making.
       */
      /* TITAN IS A HOMEWORLD, NOT A POWER LEVEL. The rule was written for
         Thanos, who is named in the head above, and his four lieutenants
         inherited it: the whole Black Order came out at 148-154, ahead of
         Doctor Strange, Doom, Apocalypse, Kang and the Ancient One. Strange
         beat Ebony Maw on his own and the Hulkbuster handled Cull Obsidian.
         They are elite soldiers, which is what tier 6 describes. */
      sp(
        "God",
        "Olympian",
        "Elder of the Universe",
        "Fire demon",
        "Alien dragon",
        "Zenn-Lavian",
        "Elder god",
      /* "Gods" is 28 characters and most of them are Heimdall — a god by
         species and a sentry by job. The ones who belong are named above. */
      )(c) || aff("Heralds of Galactus", "Elders of the Universe")(c),
  },
  {
    n: 6,
    title: "Alpha class",
    gloss:
      "The strongest tier a person can reach without leaving the scale. Sorcerers, alpha mutants, symbiotes, Inhumans — and the ones whose power is a machine.",
    /**
     * THE CORPUS HAS NO FIELD FOR "CONQUERED THE TIMELINE WITH A MACHINE",
     * and this tier is where that shows.
     *
     * Kang came out at 610 of 670, below Hawkeye, because he is `species:
     * Human` with no mutant class, no magic and no affiliation — so every rule
     * above him missed and he fell to "humans who turn up anyway". He Who
     * Remains and Ultron landed the same way. Doom escaped only by accident:
     * he carries `magicSchools`, added months ago for a different argument,
     * and that one field is the whole reason he ranks 194 instead of 600.
     *
     * A ranking that puts the man who rules the multiverse below the man with
     * the bow is not making a judgement, it is reporting a gap in its own
     * inputs. Naming them here is the same hand-placement the ranked heads
     * already use, and it is honest about what it is: technology and time
     * travel are power, and nothing else in this file can see them.
     */
    /**
     * THIS TIER NEEDED A HEAD MORE THAN ANY OTHER, because it is where every
     * notable character who is not a god or a cosmic entity ends up — and
     * alphabetical order inside it kept producing claims. The Ancient One
     * ranked 234th, below Wong's teacher-of-Wong, because her name starts with
     * "The"; Agatha Harkness ranked 164th on the strength of an "A".
     *
     * Ordered by what they have actually done: the Sorcerer Supreme, the woman
     * who taught him and held Dormammu off for centuries, then the two men who
     * beat gods with study, then the first mutant, then the psychics who have
     * emptied minds by the million.
     */
    ranked: [
      "doctor-strange",
      "the-ancient-one",
      "doctor-doom",
      "kang",
      "apocalypse",
      "cassandra-nova",
      "shadow-king",
      "selene",
      /* Same family, same fault: a clone of Jean Grey with her telepathy and
         a demon army, stranded at 393 for having no published class. */
      "madelyne-pryor",
      /* Carol goes Binary. Monica becomes any part of the spectrum. Sue is
         the strongest of the Fantastic Four and was ranked last of them, at
         501, because "Invisibility / Force fields" reads small and is not —
         she has held a force field against a Celestial. */
      "captain-marvel",
      "invisible-woman",
      "monica-rambeau",
      "sam-alexander",
      "he-who-remains",
      "loki",
      "clea",
      "agatha-harkness",
      "doctor-voodoo",
      "mister-sinister",
      "ultron",
      "sylvie",
      "magik",
      "khonshu",
    ],
    match: (c) =>
      c.mutantClass === "alpha" ||
      (c.magicSchools?.length ?? 0) > 0 ||
      Boolean(c.symbioteClass) ||
      sp(
        "Asgardian",
        "Frost Giant",
        "Eternal",
        "Titan",
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




/**
 * WHAT A RECORD SAYS IT CAN DO — the within-tier order.
 *
 * Alphabetical was the placeholder and it kept making claims: Alligator Loki
 * ahead of President Loki, the Ancient One at 234 for starting with "The".
 * Inside a tier the honest answer is not "we don't know" — the corpus has been
 * telling us all along, in the three power bullets and the origin paragraph
 * every character carries. Alligator Loki's read "Is an alligator / Wears the
 * horns / Nobody checks". Classic Loki's read "Illusions on an enormous
 * scale". That is the difference, written down, and nothing was reading it.
 *
 * So each record is scored on the SCALE of what it claims, plus what the
 * structured fields already know. Bigger scale sorts first; the name breaks
 * exact ties so the order stays stable.
 *
 * THIS IS A HEURISTIC AND IT IS BOUNDED BY THE TIER. It cannot move anyone
 * across a tier boundary, and it never overrides a hand-ranked head — it only
 * decides the part that was previously alphabetical, where the alternative is
 * the alphabet. Where it is obviously wrong for a specific pair, OUTRANKS
 * still wins.
 */
/* ascii-ok: every pattern here is matched against `powers[].en` and
   `origin.en` — the ENGLISH text, which is Latin by construction. The Arabic
   fields are never scored, so \b behaving as ASCII-only is correct rather
   than merely tolerable. */
const SCALE: [RegExp, number][] = [
  /* Reality itself. ascii-ok: scores English `powers[].en` only. */
  [/\b(realit|universe|universal|multiverse|cosmos|cosmic|existence|creation|omnipot|omniscien|timeline|time itself|all things|infinit)/i, 120],
  /* Worlds and stars. ascii-ok: English only. */
  [/\b(planet|world|star|sun|galax|continent|ocean|weather|storm|nine realms|devour)/i, 70],
  /* Gods, ages, souls. ascii-ok: English only. */
  [/\b(god|divine|immortal|ageless|millenni|thousand years|eternal|resurrect|soul|underworld|hell\b|death)/i, 40],
  /* Armies, cities, dimensions. ascii-ok: English only. */
  [/\b(army|armies|legion|horde|city|dimension|portal|realm|kingdom|throne|conquer|rules?\b|command)/i, 25],
  /* Ordinary superhuman. ascii-ok: English only. */
  [/\b(strength|durab|regenerat|healing|telepath|telekine|psychic|energy|matter|magic|sorcer|illusion|shapeshift|flight|flies|speed|claws|symbiote|venom|gamma|adamantium)/i, 14],
  /* Training and equipment. ascii-ok: English only. */
  [/\b(sword|blade|marksman|master|expert|trained|tactic|genius|strateg|armour|armor|suit|gun|bow)/i, 6],
];

const CLASS_WEIGHT: Record<string, number> = {
  omega: 90, alpha: 45, beta: 20, gamma: 20, delta: 10, epsilon: 4,
};
const SYMBIOTE_WEIGHT: Record<string, number> = {
  gestalt: 45, ancient: 40, lineage: 25, spawn: 18, anomaly: 18,
};

/**
 * ABILITIES COUNT FULLY, THE ORIGIN PARAGRAPH COUNTS A LITTLE.
 *
 * Scoring both equally put Spider-UK, Spider-Byte and Nocturne at the top of
 * their tier, because their origins all mention the multiverse — they TRAVEL
 * between realities, which the pattern cannot tell from bending one. The three
 * power bullets are a deliberate claim about what someone can do; the origin
 * is prose, and prose mentions big things in passing.
 */
function scaleScore(c: Character): number {
  const score = (text: string) =>
    SCALE.reduce((n, [re, w]) => n + (re.test(text) ? w : 0), 0);
  let n = score(c.powers.map((p) => p.en).join(" ")) + score(c.origin.en) / 4;
  n += CLASS_WEIGHT[c.mutantClass ?? ""] ?? 0;
  n += SYMBIOTE_WEIGHT[c.symbioteClass ?? ""] ?? 0;
  /* A supporting character is rarely a power, whatever words their origin
     happens to contain — Ben Parker's paragraph mentions the world. */
  if (c.category === "supporting") n -= 40;
  return n;
}

/**
 * WHEN THE ALPHABET MAKES A CLAIM — the one escape hatch from alphabetical.
 *
 * Inside a tier the order is alphabetical and is meant to mean nothing. That
 * holds right up until two characters share a name, and then it means
 * something loudly and wrongly: the six Loki variants are all Frost Giants, so
 * they all land in tier 5, and the alphabet handed the tier to BOASTFUL LOKI —
 * whose entire character is that he lies about feats he never performed — at
 * 123, with Kid Loki at 136 and Loki himself at 139.
 *
 * Nobody reading the sort would take that as "we don't know". They would take
 * it as the site claiming a child beats the god he is a copy of.
 *
 * A general rule was tried first and does not work: the corpus HAS variant
 * edges, but they are symmetric, so nothing marks which one is the original —
 * and "a variant never outranks its base" is false anyway, since Onslaught
 * came out of Professor X and the Cosmic Ghost Rider out of the Punisher, and
 * both dwarf what they came from.
 *
 * So: an explicit order, applied to the slots those characters already hold.
 * Everyone else keeps their position exactly. A group must sit in ONE tier,
 * because reordering across a tier boundary would make rank contradict tier,
 * which is the thing C28 exists to prevent.
 */
export const OUTRANKS: string[][] = [
  /* TWO GROUPS, NOT ONE, and the tier guard is what found that. Loki and
     Sylvie carry the "Gods" affiliation and stay in tier 5; the lesser
     variants carry nothing and fall to 6 — which is the correct answer and
     not one I would have thought to write.

     The god, then the one who killed He Who Remains. */
  ["loki", "sylvie"],
  /* Then the one who cast an illusion big enough to hide a city, a thug, a
     child, and a liar whose whole character is feats he never performed. */
  ["classic-loki", "president-loki", "kid-loki", "boastful-loki"],
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
      .sort(
        (a, b) => scaleScore(b) - scaleScore(a) || a.nameEn.localeCompare(b.nameEn, "en"),
      );
    for (const c of rest) {
      out.push({ c, tier: t.n, ranked: false });
      seen.add(c.id);
    }
  }
  const missed = allCharacters.filter((c) => !seen.has(c.id));
  if (missed.length) throw new Error(`unplaced: ${missed.map((c) => c.id).join(", ")}`);

  /* Reseat each group into the slots its own members already occupy. */
  for (const group of OUTRANKS) {
    const slots = group
      .map((id) => out.findIndex((x) => x.c.id === id))
      .sort((a, b) => a - b);
    if (slots.some((i) => i === -1)) {
      throw new Error(`OUTRANKS names an id that is not ranked: ${group.join(", ")}`);
    }
    const tiers = new Set(slots.map((i) => out[i]!.tier));
    if (tiers.size > 1) {
      throw new Error(
        `OUTRANKS group [${group.join(", ")}] spans tiers ${[...tiers].join(", ")}. ` +
          `Reordering across a tier boundary would make rank contradict tier.`,
      );
    }
    const rows = group.map((id) => out.find((x) => x.c.id === id)!);
    slots.forEach((slot, i) => {
      out[slot] = rows[i]!;
    });
  }
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
