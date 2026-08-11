/**
 * Builds `content/search-index.json` — the only content that ships to the
 * client.
 *
 * Every row carries its COST, because that is the thing that makes this search
 * ours: nobody else's Marvel search tells you what a title depends on. Computing
 * it here rather than in the browser keeps the client work to a string compare
 * over 130 rows.
 *
 *   npm run gen:search
 */

import { writeFile } from "node:fs/promises";
import { titles, posterOf, isAbsolutePoster, ratingsOf } from "../content/build";
import { pathTo } from "../lib/graph";
import { shownCharacters } from "../lib/characters";
import type { SearchItem } from "../lib/search";

const titleRows: SearchItem[] = titles
  .map((t) => {
    const path = pathTo(titles, t.id, "minimum");
    const known = path.filter((p) => p.runtimeMin !== null);
    return {
      id: t.id,
      image: (() => {
        const p = posterOf(t.id);
        if (!p) return null;
        /* Hand-supplied posters are already absolute; TMDB's are paths. w185
           is the smallest size that still reads at a 40px thumbnail on 2x. */
        return isAbsolutePoster(p) ? p : `https://image.tmdb.org/t/p/w185${p}`;
      })(),
      titleEn: t.titleEn,
      titleAr: t.titleAr,
      year: t.releaseDate.slice(0, 4),
      universe: t.universe,
      fame: ratingsOf(t.id)?.tmdb?.votes ?? 0,
      // Everything BEFORE it — the number the row quotes.
      pathLength: path.length - 1,
      minutes: known.length === path.length ? known.reduce((n, p) => n + p.runtimeMin!, 0) : null,
    };
  })
  .sort((a, b) => (a.id < b.id ? -1 : 1));

/**
 * CHARACTERS, in the same index and marked as such.
 *
 * `pathLength` and `minutes` are the cost of a TITLE and mean nothing here, so
 * they carry the character's screen count instead — which the row renders as
 * "in 24 titles" rather than as a runtime. Two shapes in one array is a small
 * price for one query answering the whole site.
 */
const characterRows: SearchItem[] = shownCharacters.map((c) => ({
  id: c.id,
  titleEn: c.nameEn,
  titleAr: c.nameAr,
  year: "",
  universe: c.universe[0] ?? "mcu",
  kind: "character" as const,
  image: c.image,
  aliases: c.aliases,
  pathLength: c.appearances.length,
  minutes: null,
}));

const index: SearchItem[] = [...titleRows, ...characterRows];

await writeFile(
  new URL("../content/search-index.json", import.meta.url),
  JSON.stringify(index) + "\n",
);

const bytes = JSON.stringify(index).length;
console.log(`  wrote content/search-index.json — ${index.length} rows, ${(bytes / 1024).toFixed(1)}KB`);
