/**
 * Deployment gate — NOT a build gate.
 *
 * `/ar` builds and renders unconditionally, because that is the only way the
 * RTL layout gets any feedback. What it must not do is ship as finished work
 * while its copy carries unreviewed drafts.
 *
 * Run before a production deploy:  npm run check:publishable
 */

import { arReviewed } from "../content/copy";
import { LOCALES } from "../lib/locales";
import { titles } from "../content/build";

const problems: string[] = [];

if (LOCALES.includes("ar" as never) && !arReviewed) {
  problems.push(
    "Arabic routes are built but the copy review is outstanding.\n" +
      `      ${titles.length} spoiler-safe lines plus the character corpus are drafts.\n` +
      "      Set `arReviewed = true` in content/copy.ts once a native reader has been through them.",
  );
}

// The Arabic COPY is the only remaining gate. The font is settled: Thmanyah's
// own FAQ states the family is free for personal and commercial use, explicitly
// including website and app interfaces.
const noCopy = titles.filter((t) => t.spoilerSafe === null).map((t) => t.id);
if (noCopy.length > 0) {
  problems.push(`${noCopy.length} title(s) have no spoiler-safe line: ${noCopy.join(", ")}`);
}

if (problems.length > 0) {
  console.error("\n  NOT PUBLISHABLE:\n");
  for (const p of problems) console.error(`    • ${p}\n`);
  console.error(
    "  CI reports this and does not block on it: the alternative was either\n" +
    "  claiming a review nobody did, or dropping half the product. To ship\n" +
    "  English only, remove \"ar\"\n" +
      "  from LOCALES in lib/locales.ts — that is a deliberate act, which is the point.\n",
  );
  process.exit(1);
}

console.log("\n  publishable — all locales reviewed\n");
