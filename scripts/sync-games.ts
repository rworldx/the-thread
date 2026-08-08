/**
 * MARVEL VIDEO GAMES, fetched at build time and committed.
 *
 *   npm run sync:games
 *
 * TWO KEYLESS SOURCES, because no single one has both halves.
 *
 *   WIKIDATA has the list, the platforms and the release dates, in structured
 *   form, for everything from a 1982 Atari cartridge to whatever shipped last
 *   month. It has almost no cover art: box art is copyrighted, so it is not in
 *   Commons and not in Wikipedia's `pageimages` either.
 *
 *   MARVEL'S OWN FANDOM WIKI has the covers, and exposes them through the same
 *   MediaWiki `pageimages` endpoint that supplies all 258 character portraits
 *   here — on `static.wikia.nocookie.net`, a host this project already allows
 *   in both `remotePatterns` and `img-src`.
 *
 * Neither needs a key, which is the whole reason this shape was chosen: the
 * commercial game databases (RAWG, IGDB) both do, and RAWG was returning 522s
 * when this was written.
 *
 * A GAME WITH NO COVER IS STILL A GAME. It ships with a typographic plate, the
 * same way a title with no poster does. Inventing a cover URL is the one thing
 * `npm run verify:assets` exists to catch.
 */

import { writeFile } from "node:fs/promises";

const WDQS = "https://query.wikidata.org/sparql";
const FANDOM = "https://marvel.fandom.com/api.php";
const UA = "the-thread/1.0 (marvel watch-order project)";

/**
 * MATCHED ON RELATIONS, NOT ON THE TITLE — except where the title says Marvel.
 *
 * The first version also matched any game whose name contained "thor", "venom",
 * "blade" or "hulk", and returned 706 rows including a 1988 game called Thor,
 * something called Crown of Thorns, and Knightblade. None of them are Marvel
 * games. Data that looks right and is wrong is the same failure as a fabricated
 * URL, wearing different clothes.
 *
 * So: based on a Marvel work, based on a character from a Marvel franchise,
 * published or developed under a Marvel label, part of a series Wikidata calls
 * Marvel — or a title that names Marvel, Spider-Man, the X-Men, Wolverine,
 * Deadpool or the Avengers, none of which is ambiguous.
 *
 * The `?date` is the EARLIEST publication date: Wikidata carries one row per
 * regional release, which is why an unaggregated query returns Lego Marvel
 * Super Heroes eight times.
 */
const QUERY = `
SELECT ?game ?gameLabel (MIN(?d) AS ?date)
       (GROUP_CONCAT(DISTINCT ?platLabel; separator="|") AS ?platforms) WHERE {
  ?game wdt:P31/wdt:P279* wd:Q7889 .
  {
    # Based on a work whose owner is Marvel, or on a Marvel character.
    ?game wdt:P144 ?work . ?work (wdt:P170|wdt:P123|wdt:P1889|wdt:P8345) wd:Q1090904 .
  } UNION {
    ?game wdt:P144 ?ch . ?ch wdt:P1080 ?fic . ?fic rdfs:label ?fl .
    FILTER(LANG(?fl)="en") FILTER(CONTAINS(LCASE(?fl),"marvel"))
  } UNION {
    # Published or developed under a Marvel label.
    ?game (wdt:P123|wdt:P178|wdt:P750) ?pub . ?pub rdfs:label ?pl2 .
    FILTER(LANG(?pl2)="en") FILTER(CONTAINS(LCASE(?pl2),"marvel"))
  } UNION {
    # Part of a series Wikidata itself calls Marvel.
    ?game wdt:P179 ?ser . ?ser rdfs:label ?sl .
    FILTER(LANG(?sl)="en") FILTER(CONTAINS(LCASE(?sl),"marvel"))
  } UNION {
    # Or the title itself names Marvel, which is unambiguous.
    ?game rdfs:label ?gl . FILTER(LANG(?gl)="en")
    FILTER(REGEX(LCASE(?gl),"marvel|spider-man|x-men|wolverine|deadpool|avengers"))
  }
  OPTIONAL { ?game wdt:P577 ?d . }
  OPTIONAL { ?game wdt:P400 ?plat . ?plat rdfs:label ?platLabel . FILTER(LANG(?platLabel)="en") }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
GROUP BY ?game ?gameLabel
`;

export interface Game {
  id: string;
  name: string;
  /** Release year, or null where Wikidata has no date. */
  year: number | null;
  /** Normalised platform buckets — what the filter chips read. */
  platforms: string[];
  /** Which corner of Marvel: spider-man, x-men, avengers, lego, general… */
  franchise: string;
  /** Cover art, or null. A game with no cover gets the typographic plate. */
  image: string | null;
}

/**
 * PLATFORM BUCKETS, because Wikidata names 90 distinct platforms and a reader
 * wants six. "PlayStation 4", "PlayStation 4 Pro" and "PS4" are one shelf.
 */
const BUCKETS: [RegExp, string][] = [
  [/playstation 5|ps5/i, "PS5"],
  [/playstation 4|ps4/i, "PS4"],
  [/playstation 3|ps3/i, "PS3"],
  [/playstation 2|ps2/i, "PS2"],
  [/playstation portable|playstation vita|psp/i, "PlayStation handheld"],
  [/playstation/i, "PS1"],
  [/xbox series|xbox one|xbox 360|xbox/i, "Xbox"],
  [/nintendo switch|wii|nintendo ds|game boy|nintendo 64|gamecube|nintendo|snes|nes/i, "Nintendo"],
  [/android|ios|iphone|ipad|mobile|java platform, micro edition|n-gage/i, "Phone"],
  [/microsoft windows|linux|macos|ms-dos|steam|personal computer|amiga|commodore|atari|zx spectrum|arcade/i, "PC"],
];

function bucket(platforms: string[]): string[] {
  const out = new Set<string>();
  for (const p of platforms) {
    for (const [re, name] of BUCKETS) {
      if (re.test(p)) {
        out.add(name);
        break;
      }
    }
  }
  return [...out].sort();
}

/**
 * WHICH CORNER OF MARVEL. Read off the title, because Wikidata's series field
 * is empty for most of these and a wrong franchise is worse than a general one.
 */
function franchiseOf(name: string): string {
  const n = name.toLowerCase();
  if (/lego/.test(n)) return "lego";
  if (/spider|venom|miles morales/.test(n)) return "spider-man";
  if (/x-men|wolverine|deadpool|mutant/.test(n)) return "x-men";
  if (/avengers|iron man|captain america|thor|hulk|black widow|ant-man/.test(n)) return "avengers";
  if (/guardians|star-lord/.test(n)) return "guardians";
  if (/fantastic four|silver surfer/.test(n)) return "fantastic-four";
  if (/punisher|daredevil|blade|ghost rider|elektra/.test(n)) return "street-level";
  return "general";
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function fromWikidata(): Promise<Omit<Game, "image">[]> {
  /**
   * BACKOFF, because WDQS rate-limits and says so with a 429.
   *
   * It is a free public endpoint running a query that touches every video game
   * in the graph; being told to wait is the normal case, not an error. Five
   * tries with a widening pause, and the failure is loud only if all five fail.
   */
  let res: Response | null = null;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    res = await fetch(`${WDQS}?query=${encodeURIComponent(QUERY)}`, {
      headers: { Accept: "application/sparql-results+json", "User-Agent": UA },
    });
    if (res.ok) break;
    const wait = (attempt + 1) * 20_000;
    console.log(`  WDQS ${res.status} — waiting ${wait / 1000}s (attempt ${attempt + 1}/5)`);
    await new Promise((r) => setTimeout(r, wait));
  }
  if (!res || !res.ok) throw new Error(`Wikidata returned ${res?.status}`);
  const json = (await res.json()) as {
    results: { bindings: Record<string, { value: string }>[] };
  };

  const seen = new Set<string>();
  const games: Omit<Game, "image">[] = [];
  for (const row of json.results.bindings) {
    const name = row.gameLabel?.value ?? "";
    /* A Wikidata id that never got a label comes back as "Q12345". Not a name. */
    if (!name || /^Q\d+$/.test(name)) continue;
    const id = slug(name);
    if (seen.has(id)) continue;
    seen.add(id);
    const platforms = bucket((row.platforms?.value ?? "").split("|").filter(Boolean));
    const year = row.date?.value ? Number(row.date.value.slice(0, 4)) : null;
    games.push({ id, name, year, platforms, franchise: franchiseOf(name) });
  }
  return games.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name));
}

/** Covers from Marvel's own wiki, 20 titles per call — the anonymous ceiling. */
async function covers(names: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (let i = 0; i < names.length; i += 20) {
    const batch = names.slice(i, i + 20);
    const url =
      `${FANDOM}?action=query&prop=pageimages&piprop=original&format=json` +
      `&redirects=1&titles=${encodeURIComponent(batch.join("|"))}`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) continue;
    const j = (await res.json()) as {
      query?: {
        pages?: Record<string, { title?: string; original?: { source?: string } }>;
        normalized?: { from: string; to: string }[];
        redirects?: { from: string; to: string }[];
      };
    };
    const back = new Map<string, string>();
    for (const r of [...(j.query?.normalized ?? []), ...(j.query?.redirects ?? [])]) {
      back.set(r.to, back.get(r.from) ?? r.from);
    }
    for (const page of Object.values(j.query?.pages ?? {})) {
      const src = page.original?.source;
      if (!src || !page.title) continue;
      out.set(back.get(page.title) ?? page.title, src);
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  return out;
}

async function main() {
  console.log("\n  source: Wikidata for the list, Marvel's wiki for the covers\n");
  const base = await fromWikidata();
  console.log(`  ${base.length} games from Wikidata`);

  const art = await covers(base.map((g) => g.name));
  const games: Game[] = base.map((g) => ({ ...g, image: art.get(g.name) ?? null }));

  const withCover = games.filter((g) => g.image).length;
  const platforms = new Map<string, number>();
  for (const g of games) for (const p of g.platforms) platforms.set(p, (platforms.get(p) ?? 0) + 1);

  console.log(`  ${withCover} of ${games.length} have cover art`);
  for (const [p, n] of [...platforms].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${p.padEnd(22)} ${n}`);
  }

  await writeFile(
    new URL("../content/games.generated.json", import.meta.url),
    JSON.stringify(games, null, 2) + "\n",
  );
  console.log("\n  wrote content/games.generated.json — commit it.\n");
}

await main();
