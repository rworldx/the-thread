/**
 * CI gate. Brief §2: "Cycle detection runs in CI. If someone adds a bad edge,
 * the build fails." This is that.
 *
 * Exits non-zero on any violation and prints every one of them, so a bad
 * content PR is a single readable failure rather than an afternoon of
 * whack-a-mole.
 */

// The MERGED corpus: identical edges, but with real runtimes, so the detour
// cost report prices each recommendation instead of saying "unsynced".
import { titles, syncSummary } from "../content/build";
import { titles as authored } from "../content/titles";
import { validateAuthoring, validateCorpus } from "../lib/validate";
import { essentialsOrder, pathTo, releaseOrder, topoSort } from "../lib/graph";

// Authored-layer rules run against titles.ts, not the merge: by the time nodes
// reach build.ts the fields they forbid are legitimately populated.
const violations = [...validateAuthoring(authored), ...validateCorpus(titles)];

if (violations.length > 0) {
  console.error(`\n  ${violations.length} corpus violation(s):\n`);
  for (const v of violations) {
    console.error(`  [${v.rule}] ${v.message}`);
    console.error(`      ${v.ids.join(", ")}\n`);
  }
  process.exit(1);
}

// Proves the orders are actually derivable, not just that the edges parse.
const release = releaseOrder(titles);
const topo = topoSort(titles);
const spine = essentialsOrder(titles);

const sync = syncSummary();
console.log(`\n  ${titles.length} titles, 0 violations`);
console.log(
  `  sync            ${sync.synced ? "run" : "NOT RUN"} — ` +
    `${sync.withRuntime}/${sync.total} runtimes, ${sync.withPoster} posters, ` +
    `${sync.withContext} context, ${sync.withSpoilerSafe} spoiler-safe lines`,
);
console.log(`  release order   ${release.length}`);
console.log(`  topological     ${topo.length}`);
console.log(`  essentials      ${spine.length}  (${spine[0]?.id} → ${spine.at(-1)?.id})`);
console.log(`  editor's notes  ${titles.filter((t) => t.editorNote).length}`);

/**
 * Editorial cost of every detour, printed on every CI run.
 *
 * A note is a promise that a detour is worth taking. How long that detour
 * actually is should be visible in the diff that introduces it, not discovered
 * by a user three screens into the thread.
 *
 * Runtime totals stay blank until `npm run sync:tmdb` has run — the Title gate
 * (content/schema.ts) is what keeps a null from rendering as a confident "0h".
 */
const noted = titles.filter((t) => t.editorNote !== null);

console.log(`\n  DETOUR COST — ${noted.length} node(s) carrying an editor's note\n`);
console.log("  node                                          min   full   +rec   runtime");
console.log("  " + "─".repeat(78));

for (const t of noted) {
  const min = pathTo(titles, t.id, "minimum");
  const full = pathTo(titles, t.id, "full");
  const known = full.filter((x) => x.runtimeMin !== null);
  const hours =
    known.length === full.length
      ? `${Math.round(known.reduce((n, x) => n + (x.runtimeMin ?? 0), 0) / 60)}h`
      : `— (${full.length - known.length} unsynced)`;

  console.log(
    `  ${t.id.padEnd(46)}${String(min.length).padStart(3)}` +
      `${String(full.length).padStart(7)}${String(full.length - min.length).padStart(7)}` +
      `   ${hours}`,
  );

  // Surface the biggest thing a recommendation drags in. A "+ Recommended"
  // toggle that quietly adds 136 episodes is a decision, not a detail.
  const added = full.filter((x) => !min.some((m) => m.id === x.id));
  const heaviest = added
    .filter((x) => x.seasons.length > 1)
    .sort((a, b) => b.seasons.length - a.seasons.length)[0];
  if (heaviest) {
    console.log(
      `      ↳ recommends "${heaviest.id}" (${heaviest.seasons.length} seasons) — ` +
        `check this is intended`,
    );
  }
}
console.log("");
