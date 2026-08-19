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
import { POWER_TIERS as TIERS, PEAK_HEAD, powerOrder } from "../lib/power";

function main() {
  const byId = new Map(allCharacters.map((c) => [c.id, c]));
  /* The order is lib/power.ts's, so the documents and the site's sort can
     never disagree. Grouped back into tiers only for presentation. */
  const rows = TIERS.map((tier) => ({
    tier,
    members: powerOrder.filter((x) => x.tier === tier.n),
  }));

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
    out.push(
      `**${members.length}** ${members.length === 1 ? "character" : "characters"}.`,
    );
    out.push("");
    /* A REAL ordered list, so it renders as one. Bolding the number instead
       breaks the list syntax and the whole tier collapses into a paragraph. */
    members.forEach((m, i) => {
      const name = m.ranked ? `**${m.c.nameEn}**` : m.c.nameEn;
      const why = m.c.mutantClass
        ? `${m.c.mutantClass} mutant`
        : (m.c.species ?? "unknown");
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
    "- **The Living Tribunal vs the Beyonders.** The Beyonders killed him " +
      "during Secret Wars, and every source still ranks him second only to " +
      "the One Above All — including sources written after the kill. Placed " +
      "on the ranking rather than the kill, because the Beyonders came from " +
      "outside the hierarchy he is second in.",
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
    if (!c)
      throw new Error(`PEAK_HEAD names "${id}", which is not a character`);
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
      const why = m.c.mutantClass
        ? `${m.c.mutantClass} mutant`
        : (m.c.species ?? "unknown");
      peak.push(`${i + 1}. ${m.c.nameEn} — ${why}`);
    });
    peak.push("");
  }
  writeFileSync("docs/POWER-TIERS-PEAK.md", peak.join("\n"));
  console.log(
    `\n  wrote docs/POWER-TIERS.md — ${allCharacters.length} characters in ${TIERS.length} tiers.\n`,
  );
  for (const { tier, members } of rows) {
    console.log(
      `    tier ${tier.n}  ${String(members.length).padStart(3)}  ${tier.title}`,
    );
  }
  console.log("");
}

main();
