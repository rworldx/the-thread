/**
 * The §13.12 screenshot matrix, as a script rather than as something remembered.
 *
 *   npm run shots            # every route at every width
 *   npm run shots -- --route /path/iron-man
 *
 * Ad-hoc screenshots caught four real bugs in one session that no numeric test
 * saw: desktop panels sharing a grid row, a 3px node/text collision, Arabic
 * titles flung to the far edge, and bidi soup in the title block. None of those
 * move a scrollWidth. The only way to keep catching them is to make looking
 * cheap and repeatable.
 *
 * Shots are FULL PAGE. An earlier version used the default viewport-only
 * screenshot, which meant every sheet was the top ~900px and the target panel —
 * the 34th item on the deep path — had never been rendered to an image at any
 * width in either theme. Neither had the recommendations section, the editor's
 * notes below the fold, or the footer. An instrument that only ever sees the
 * first screen is worse than no instrument, because it is trusted.
 *
 * Full-page images go to screenshots/ (gitignored). The contact sheet shows two
 * crops per width — the top and the bottom of the page — because a 15,000px
 * column scaled to fit would be an unreadable sliver.
 *
 * Locales and themes join the matrix at step 7 and step 4 respectively — the
 * grid below is deliberately the axes that exist today, not a placeholder for
 * axes that do not.
 */

import { mkdir, readdir, rm } from "node:fs/promises";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const BASE = process.env.SHOTS_BASE ?? "http://127.0.0.1:3100";
const OUT = new URL("../screenshots/", import.meta.url).pathname;

const WIDTHS = [320, 360, 390, 430, 768, 1024, 1280, 1440];

/**
 * Dark shipped with the design tokens and had never been rendered until this
 * axis existed — half the visual surface, unlooked-at, while the only thing
 * catching this class of bug was looking at it.
 *
 * Narrower width set for dark: the three regimes (single column, 15% inset,
 * centred alternating) are what change with width, and one shot per regime is
 * enough to catch a colour that fails on the other background.
 */
const NARROW = [390, 768, 1440];

/**
 * locale × theme. Full widths only for the primary combination; the other three
 * get one width per layout regime (single column, 15% inset, centred
 * alternating), which is enough to catch a colour or a mirror that fails.
 */
const COMBOS = [
  { locale: "en", theme: "light", widths: WIDTHS },
  { locale: "en", theme: "dark", widths: NARROW },
  { locale: "ar", theme: "light", widths: NARROW },
  { locale: "ar", theme: "dark", widths: NARROW },
];

// Locale-prefixed. Step 7 adds a locale axis alongside the theme axis; the
// route list stays as-is and gains a loop, rather than being rewritten.
const ROUTES = [
  ["", "index"],
  ["/path/iron-man", "path-root"],
  ["/path/deadpool-and-wolverine", "path-deep"],
  ["/path/doctor-strange-in-the-multiverse-of-madness", "path-recommendations"],
  ["/path/echo-s1", "path-defenders"],
  ["/universes/all", "collection-all"],
  ["/universes/mcu/release/timeline", "collection-mcu"],
  ["/universes", "universes-index"],
  ["/universes/x-men", "universe-x-men"],
  ["/universes/mcu/story/timeline", "universe-mcu-story-timeline"],
  ["/what-is-marvel", "what-is-marvel"],
  ["/projects", "projects"],
  ["/characters", "characters"],
  ["/characters/wolverine", "character-wolverine"],
  ["/characters/spider-man", "character-spider-man"],
  ["/rights", "rights"],
];

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? null : process.argv[i + 1];
};

/** Thumbnail height in the contact sheet. Tall enough to judge, small enough to fit. */
const SHEET_H = 900;

async function main() {
  const only = arg("route");
  const routes = only ? ROUTES.filter(([r]) => r === only || `/en${r}` === only) : ROUTES;
  if (routes.length === 0) {
    console.error(`no route matching ${only}. Known: ${ROUTES.map(([r]) => r).join(", ")}`);
    process.exit(1);
  }

  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Fail loudly rather than silently shooting an error page.
  page.on("response", (r) => {
    if (r.status() >= 400) console.error(`  ! ${r.status()} ${r.url()}`);
  });

  for (const [page_, slug] of routes) {
    for (const combo of COMBOS) {
      const route = `/${combo.locale}${page_}`;
      const theme = { name: combo.theme, widths: combo.widths };
      await page.emulateMedia({ colorScheme: theme.name });
      const shots = [];

      for (const width of theme.widths) {
        await page.setViewportSize({ width, height: SHEET_H });
        const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
        if (!res || !res.ok()) throw new Error(`${route} returned ${res?.status()}`);

        /**
         * SCROLL THE WHOLE PAGE FIRST, then come back and shoot.
         *
         * `fullPage` does not render the page in one go — it scrolls and
         * stitches. Almost every image on this site is `loading="lazy"`, so
         * they were decoding DURING the stitch: the document grew between
         * strips and the output showed poster bands duplicated across two rows
         * with the text under them missing.
         *
         * That is a lie in the only instrument that catches what assertions
         * cannot. I spent a round chasing a layout bug that did not exist,
         * measured the DOM, and found every band exactly 160px with one row.
         * A screenshot tool that invents defects is worse than none, because
         * the real ones stop being believed.
         *
         * `networkidle` does not cover this: a lazy image below the fold has
         * not been requested yet, so the network is legitimately idle.
         */
        await page.evaluate(async () => {
          const step = window.innerHeight;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
          await Promise.all(
            [...document.images].filter((i) => !i.complete).map(
              (i) => new Promise((r) => { i.onload = i.onerror = r; }),
            ),
          );
        });
        await page.waitForLoadState("networkidle");

        const file = `${OUT}${slug}-${combo.locale}-${theme.name}-${String(width).padStart(4, "0")}.png`;
        await page.screenshot({ path: file, fullPage: true });
        const { height } = await sharp(file).metadata();
        shots.push({ file, width, height: height ?? SHEET_H });

        // The dev overflow guard cannot run in a production build, so check here.
        const over = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        const flag = over > 0 ? `  ⚠ overflows by ${over}px` : "";
        const tall = shots.at(-1).height;
        console.log(
          `  ${slug.padEnd(22)} ${combo.locale} ${theme.name.padEnd(6)} ${String(width).padStart(5)}` +
            `  ${String(tall).padStart(6)}px tall${flag}`,
        );
      }
      await contactSheet(`${slug}-${combo.locale}-${theme.name}`, shots, theme.name);
    }
  }

  await browser.close();
  const files = (await readdir(OUT)).length;
  console.log(`\n  ${files} files in screenshots/  — open the *-sheet.png first\n`);
}

/**
 * One image per route per theme: every width side by side, each shown as its top
 * and its bottom, so the fold is never the edge of what gets looked at.
 */
async function contactSheet(slug, shots, theme = "light") {
  // The sheet's own ground matches the theme, so a background that fails
  // against the page background is still judged against the right surround.
  const ground =
    theme === "dark" ? { r: 36, g: 20, b: 20, alpha: 1 } : { r: 240, g: 237, b: 241, alpha: 1 };
  const labelColour = theme === "dark" ? "#f5eded" : "#450a0a";
  const rule = theme === "dark" ? "#5a1e1e" : "#fecaca";

  const cells = await Promise.all(
    shots.map(async ({ file, width, height }) => {
      const img = sharp(file);
      const crop = Math.min(SHEET_H, height);
      const top = await img.clone().extract({ left: 0, top: 0, width, height: crop }).png().toBuffer();
      // Bottom-anchored: the target panel, the recommendations, the footer.
      const bottom =
        height > SHEET_H
          ? await sharp(file)
              .extract({ left: 0, top: height - crop, width, height: crop })
              .png()
              .toBuffer()
          : null;
      return { top, bottom, w: width, label: String(width), tall: height };
    }),
  );

  const gap = 12;
  const labelH = 28;
  const totalW = cells.reduce((n, c) => n + c.w + gap, gap);
  const totalH = labelH + gap + SHEET_H + gap + SHEET_H + gap;

  const xOf = (i) => cells.slice(0, i).reduce((n, p) => n + p.w + gap, gap);

  const labels = cells
    .map(
      (c, i) =>
        `<text x="${xOf(i)}" y="${labelH - 8}" font-family="monospace" font-size="16" ` +
        `fill="${labelColour}">${c.label}px · ${c.tall}px tall</text>`,
    )
    .join("");

  const composites = [];
  for (const [i, c] of cells.entries()) {
    composites.push({ input: c.top, left: xOf(i), top: labelH + gap });
    if (c.bottom) {
      composites.push({ input: c.bottom, left: xOf(i), top: labelH + gap + SHEET_H + gap });
    }
  }
  composites.push({
    input: Buffer.from(
      `<svg width="${totalW}" height="${totalH}">${labels}` +
        `<rect x="0" y="${labelH + gap + SHEET_H + gap / 2 - 1}" width="${totalW}" height="2" fill="${rule}"/>` +
        `</svg>`,
    ),
    left: 0,
    top: 0,
  });

  await sharp({
    create: { width: totalW, height: totalH, channels: 4, background: ground },
  })
    .composite(composites)
    .png()
    .toFile(`${OUT}${slug}-sheet.png`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
