/**
 * Writes `public/context.json` — the spoiler-shielded connective tissue.
 *
 * Kept OUT of every page's HTML on purpose. A blur filter or `visibility:hidden`
 * leaves the text in the DOM: select-all copies it, a screen reader may reach
 * it, and view-source hands it over. The only way the shield is real is if the
 * text is not there until someone asks for it.
 *
 *   npm run gen:context
 */

import { writeFile } from "node:fs/promises";
import { titles } from "../content/build";

/**
 * Per language, because a context override may name only one. Nine of the
 * titles the Arabic review wrote context for have no TMDB overview in any
 * language, so they now ship Arabic connective tissue and no English — which is
 * the honest state. Writing `en: ""` to keep the shape rectangular would put an
 * empty reveal behind the shield for every English reader.
 */
/**
 * The long dash is banned in anything the reader sees, and ten of these strings
 * arrive from TMDB carrying one. Hand-editing them is useless: the next
 * `npm run sync:tmdb` writes them back. So the transform lives HERE, on the way
 * out, where it survives every re-sync.
 *
 * It is a punctuation normalisation and nothing more. `-` replaces the dash,
 * spaces are added when the original had none ("Vision—two beings—begin"), and
 * no word is added, removed, or reordered. Rewriting a TMDB synopsis would be
 * inventing a fact about a film; changing its punctuation is not.
 */
function normalizeDashes(s: string): string {
  return s.replace(/\s*[—–]\s*/g, " - ");
}

const out: Record<string, { en?: string; ar?: string }> = {};
for (const t of titles) {
  if (!t.context) continue;
  const entry: { en?: string; ar?: string } = {};
  if (t.context.en) entry.en = normalizeDashes(t.context.en);
  if (t.context.ar) entry.ar = normalizeDashes(t.context.ar);
  if (entry.en || entry.ar) out[t.id] = entry;
}

await writeFile(
  new URL("../public/context.json", import.meta.url),
  JSON.stringify(out) + "\n",
);
const bytes = JSON.stringify(out).length;
console.log(
  `  wrote public/context.json — ${Object.keys(out).length} entries, ${(bytes / 1024).toFixed(1)}KB, fetched on reveal only`,
);
