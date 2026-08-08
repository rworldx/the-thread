/**
 * IMDb ratings, from IMDb's own published dataset.
 *
 *   npm run sync:ratings
 *
 * NO KEY, and that is the point. IMDb publishes `title.ratings.tsv.gz` at
 * datasets.imdbws.com: every rated title, keyed by `tconst`, which is exactly
 * the `imdbId` the TMDB sync already stores. It is the real IMDb average and
 * the real IMDb vote count, from IMDb, updated daily.
 *
 * This replaces printing TMDB's `vote_average` and hoping nobody notices the
 * label. TMDB's score is TMDB's users; a site that shows one under the other's
 * name is lying about something the reader cannot check.
 *
 * ROTTEN TOMATOES is not here and cannot be, keyless. They publish no API and
 * no dataset. OMDb carries the Tomatometer on its free tier keyed on the same
 * imdbId, so `OMDB_API_KEY` turns it on in scripts/sync-tmdb.ts and nothing
 * else changes.
 *
 * LETTERBOXD is not here and will not be from here. They have no public API at
 * all. Scraping a rating and printing it as fact is the thing this corpus
 * refuses everywhere else, and it would be the only unverifiable number on the
 * page.
 *
 * The download is ~8MB gzipped and ~25MB open. It is streamed and filtered to
 * the 147 ids we hold, so what lands in the repo is a few kilobytes.
 */

import { writeFile } from "node:fs/promises";
import { createGunzip } from "node:zlib";
import { Readable } from "node:stream";
import { createInterface } from "node:readline";
import { titles } from "../content/titles";
import generated from "../content/tmdb.generated.json";

const URL_TSV = "https://datasets.imdbws.com/title.ratings.tsv.gz";

interface Row {
  score: number;
  votes: number;
}

async function main() {
  const byImdb = new Map<string, string>();
  const gen = generated as Record<string, { imdbId?: string | null }>;
  for (const t of titles) {
    /**
     * A hand-set id wins. One title (a 2009 independent short) exists on IMDb
     * and not on TMDB at all, so the sync has nothing to offer for it and the
     * corpus carries the id itself.
     */
    const imdb = t.imdbId ?? gen[t.id]?.imdbId;
    if (imdb) byImdb.set(imdb, t.id);
  }
  console.log(`  ${byImdb.size}/${titles.length} titles carry an IMDb id`);

  const res = await fetch(URL_TSV);
  if (!res.ok || !res.body) throw new Error(`IMDb dataset returned ${res.status}`);

  const out: Record<string, Row> = {};
  const stream = Readable.fromWeb(res.body as Parameters<typeof Readable.fromWeb>[0]).pipe(
    createGunzip(),
  );

  let seen = 0;
  for await (const line of createInterface({ input: stream, crlfDelay: Infinity })) {
    seen += 1;
    if (seen === 1) continue; // header
    /**
     * Split on tab and take three columns rather than parsing the whole file
     * into objects. This is 1.6 million rows; allocating for each one to keep
     * 147 of them is the difference between two seconds and forty.
     */
    const tab1 = line.indexOf("\t");
    if (tab1 < 0) continue;
    const tconst = line.slice(0, tab1);
    const id = byImdb.get(tconst);
    if (!id) continue;
    const rest = line.slice(tab1 + 1).split("\t");
    const score = Number.parseFloat(rest[0] ?? "");
    const votes = Number.parseInt(rest[1] ?? "", 10);
    if (Number.isFinite(score) && Number.isFinite(votes)) out[id] = { score, votes };
  }

  await writeFile(
    new URL("../content/imdb.generated.json", import.meta.url),
    JSON.stringify(out, null, 2) + "\n",
  );

  const missing = titles.filter((t) => !out[t.id]).map((t) => t.id);
  console.log(`  scanned     ${seen.toLocaleString("en")} rows`);
  console.log(`  rated       ${Object.keys(out).length}/${titles.length}`);
  if (missing.length) {
    console.log(`  unrated     ${missing.length} — ${missing.slice(0, 12).join(", ")}`);
    console.log("              unreleased titles have no rating, which is a state");
  }
  console.log("\n  wrote content/imdb.generated.json — commit it.\n");
}

await main();
