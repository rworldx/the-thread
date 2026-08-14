/**
 * WHO IS STRONGEST — docs/POWER-TIERS.md, generated from the corpus.
 *
 *   npm run gen:power
 *
 * THE HONEST SHAPE OF THIS IS A TIER, NOT A RANK.
 *
 * A rank claims that #38 beats #39, and no source in Marvel supports a claim
 * like that 670 times over. What the sources DO agree on is strata: nothing
 * touches the One Above All; abstracts outrank gods; an omega mutant outranks
 * a trained human. So this file ranks the head strictly, where twelve sources
 * were read and genuinely agree, and buckets the tail by what the corpus
 * already knows about each character.
 *
 * THE HEAD IS HAND-ORDERED AND CITED. It is the only part where the order
 * between two names is a claim. Everything below it is alphabetical inside its
 * tier, which is a deliberate refusal to invent precision — if two names sit
 * in the same tier, this document is saying it does not know which wins.
 *
 * THE TAIL IS DERIVED, so it cannot go stale. Add a character tomorrow and
 * they land in a tier from their own species, mutant class and affiliations.
 * A ranking typed by hand would be wrong the moment the corpus moved, which
 * is the same argument that makes appearances derived rather than listed.
 */

import { writeFileSync } from "node:fs";
import { allCharacters } from "../lib/characters";
import type { Character } from "../content/character-schema";

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
 *   GALACTUS ABOVE KNULL. Both have killed Celestials, and the sources that
 *   compare them directly give Galactus the higher raw output. Knull's edge is
 *   a weapon rather than a power.
 */
const PEAK_HEAD: string[] = [
  "the-one-above-all",
  "the-one-below-all",
  "the-fulcrum",
  "first-firmament",
  "the-beyonders",
  "molecule-man",
  "the-beyonder",
  "doctor-doom",
  "the-living-tribunal",
  "protege",
  "master-weaver",
  "great-web",
  "franklin-richards",
  "thanos",
  "adam-warlock",
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
  "hulk",
  "gorr",
  "odin",
  "surtur",
  "sentry",
  "silver-surfer",
  "doctor-strange",
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
  "hela",
  "apocalypse",
  "cosmic-ghost-rider",
  "ghost-rider",
  "kang",
];

function main() {
  const byId = new Map(allCharacters.map((c) => [c.id, c]));
  const placed = new Set<string>();
  const rows: { tier: Tier; members: { c: Character; ranked: boolean }[] }[] = [];

  /* Head first, so a hand-ranked name is never stolen by a broad rule below. */
  for (const t of TIERS) {
    for (const id of t.ranked ?? []) {
      if (!byId.has(id)) throw new Error(`tier ${t.n} names "${id}", which is not a character`);
      placed.add(id);
    }
  }

  for (const t of TIERS) {
    const ranked = (t.ranked ?? []).map((id) => ({ c: byId.get(id)!, ranked: true }));
    const rest = allCharacters
      .filter((c) => !placed.has(c.id) && (t.match?.(c) ?? false))
      .sort((a, b) => a.nameEn.localeCompare(b.nameEn, "en"))
      .map((c) => ({ c, ranked: false }));
    for (const m of rest) placed.add(m.c.id);
    rows.push({ tier: t, members: [...ranked, ...rest] });
  }

  const missed = allCharacters.filter((c) => !placed.has(c.id));
  if (missed.length) throw new Error(`unplaced: ${missed.map((c) => c.id).join(", ")}`);

  const out: string[] = [];
  out.push("# Power tiers");
  out.push("");
  out.push(
    "**Generated — do not edit.** `npm run gen:power` rebuilds it from " +
      "`content/characters.ts`. **Bold names are ranked** — hand-ordered from " +
      "the sources at the bottom, and the only place this file claims one " +
      "character beats another. Plain names are alphabetical inside their tier, " +
      "which is the file saying it does not know which of them wins.",
  );
  out.push("");
  out.push(
    "Every character is in **base form, Earth-616**. Thanos has no Gauntlet, " +
      "Jean Grey has no Phoenix, the Hulk is not World-Breaker. That single rule " +
      "moves more names than any other decision here.",
  );
  out.push("");
  out.push(`${allCharacters.length} characters, strongest to weakest.`);
  out.push("");
  for (const { tier, members } of rows) {
    const head = members.filter((m) => m.ranked).length;
    out.push(`## Tier ${tier.n} — ${tier.title}`);
    out.push("");
    out.push(`*${tier.gloss}*`);
    out.push("");
    out.push(`**${members.length}** ${members.length === 1 ? "character" : "characters"}.`);
    out.push("");
    /* A REAL ordered list, so it renders as one. Bolding the number instead
       breaks the list syntax and the whole tier collapses into a paragraph. */
    members.forEach((m, i) => {
      const name = m.ranked ? `**${m.c.nameEn}**` : m.c.nameEn;
      const why = m.c.mutantClass ? `${m.c.mutantClass} mutant` : (m.c.species ?? "unknown");
      out.push(`${i + 1}. ${name} — ${why}`);
    });
    if (head > 0 && head < members.length) {
      out.push("");
      out.push(`_1–${head} are ranked. ${head + 1} onward are alphabetical._`);
    } else if (head === 0) {
      out.push("");
      out.push("_Alphabetical. No source ranks within this tier._");
    }
    out.push("");
  }
  out.push("## Where the sources disagree");
  out.push("");
  out.push(
    "- **Molecule Man vs Franklin Richards.** Unresolved in the comics and in " +
      "the sources. Reece has the higher ceiling, Franklin the wider range.",
  );
  out.push(
    "- **Silver Surfer vs base Thanos.** The Surfer wins on the Power Cosmic, " +
      "Thanos on durability and planning. Korvac has a real claim above both.",
  );
  out.push(
    "- **The Beyonders vs the Living Tribunal.** Placed on the kill. Anything " +
      "written before 2015 reverses it.",
  );
  out.push(
    "- **Eternity vs Infinity.** Twins. ComicBasics puts Infinity first; most " +
      "others treat them as one entry.",
  );
  out.push("");
  out.push("## Sources");
  out.push("");
  for (const s of [
    "[CBR — The 40 Strongest Characters In Marvel Comics](https://www.cbr.com/most-powerful-characters-in-the-marvel-universe/)",
    "[CBR — The Official 10 Strongest Marvel Characters of 2025](https://www.cbr.com/marvel-official-strongest-characters-2025/)",
    "[Collider — 40 Most Powerful Marvel Characters](https://collider.com/most-powerful-marvel-characters-ranked-strongest/)",
    "[ScreenRant — 20 Most Powerful Marvel Characters](https://screenrant.com/most-powerful-marvel-characters-ranking/)",
    "[ComicBasics — All 16 Abstract Entities, Ranked](https://www.comicbasics.com/all-abstract-entities-in-marvel-ranked/)",
    "[Database Comics — The Marvel Cosmic Hierarchy](https://databasecomics.com/2024/07/03/super-power-explained-the-marvel-cosmic-hierarchy-potential-cosmos-respect-threads/)",
    "[Marvel Database — Glossary: Cosmic Beings](https://marvel.fandom.com/wiki/Glossary:Cosmic_Beings)",
    "[Marvel Database — Abstract Entities](https://marvel.fandom.com/wiki/Abstract_Entities)",
    "[Comic Book Co — Beyond Galactus](https://comicbookco.com/comics/marvel/beyond-galactus-cosmic-hierarchy-abstract-entities-explained/)",
    "[Ranker — 50+ Most Powerful Marvel Characters](https://www.ranker.com/list/powerful-characters-marvel-comics/ranker-comics)",
    "[Looper — 15 Most Powerful Marvel Superheroes](https://www.looper.com/1690972/most-powerful-marvel-superheroes-ever-ranked/)",
    "[VS Battles — Revising the Cosmic Hierarchy](https://vsbattles.com/threads/marvel-comics-revising-the-cosmic-hierarchy.56117/)",
    "[Wikipedia — Living Tribunal](https://en.wikipedia.org/wiki/Living_Tribunal)",
  ])
    out.push(`- ${s}`);
  out.push("");

  writeFileSync("docs/POWER-TIERS.md", out.join("\n"));

  /* The peak document: one researched head, then everyone not named in it, in
     the same derived tiers. */
  const peak: string[] = [];
  peak.push("# Power tiers — peak forms");
  peak.push("");
  peak.push(
    "**Generated — do not edit.** `npm run gen:power` rebuilds it. The " +
      "companion to POWER-TIERS.md, asking a different question: not how " +
      "strong a character is when you meet them, but **how strong they have " +
      "ever been**. Thanos has the Gauntlet here. Thor is Rune King. Jean is " +
      "the White Phoenix. Hawkeye is still a man with a bow — which is why " +
      "this reorders the top violently and barely touches the bottom.",
  );
  peak.push("");
  peak.push("## The peak head, ranked");
  peak.push("");
  PEAK_HEAD.forEach((id, i) => {
    const c = byId.get(id);
    if (!c) throw new Error(`PEAK_HEAD names "${id}", which is not a character`);
    peak.push(`${i + 1}. **${c.nameEn}** — ${c.species ?? "unknown"}`);
  });
  peak.push("");
  peak.push(
    "_Everything below keeps the tiers of the base ranking, because a peak " +
      "claim needs a peak feat and most characters do not have one._",
  );
  peak.push("");
  const inHead = new Set(PEAK_HEAD);
  for (const { tier, members } of rows) {
    const rest = members.filter((m) => !inHead.has(m.c.id));
    if (rest.length === 0) continue;
    peak.push(`## Tier ${tier.n} — ${tier.title}`);
    peak.push("");
    rest.forEach((m, i) => {
      const why = m.c.mutantClass ? `${m.c.mutantClass} mutant` : (m.c.species ?? "unknown");
      peak.push(`${i + 1}. ${m.c.nameEn} — ${why}`);
    });
    peak.push("");
  }
  writeFileSync("docs/POWER-TIERS-PEAK.md", peak.join("\n"));
  console.log(`\n  wrote docs/POWER-TIERS.md — ${allCharacters.length} characters in ${TIERS.length} tiers.\n`);
  for (const { tier, members } of rows) {
    console.log(`    tier ${tier.n}  ${String(members.length).padStart(3)}  ${tier.title}`);
  }
  console.log("");
}

main();
