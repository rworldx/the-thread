import { expect, test } from "@playwright/test";

/**
 * Does `sizes` describe the box the poster actually occupies?
 *
 * This exists because a static assertion could not answer that. The hero
 * declared 45vw for a box laid out at `clamp(7.5rem, 34vw, 17.5rem)` — 176px
 * claimed against 133px rendered on a 390px phone, which at 2× DPR fetches the
 * 360 candidate instead of the 280, on the LCP image of every title page. It
 * passed the DOM test, which only checked the attribute existed.
 *
 * §14.5 calls wrong `sizes` the most common Next.js performance bug and notes it
 * is invisible until Lighthouse. Measuring is the only way to see it.
 */

const WIDTHS = [320, 390, 768, 1440];

/** Resolve a `sizes` attribute the way a browser would, for one viewport. */
async function resolveSizes(page: import("@playwright/test").Page, sizes: string) {
  return page.evaluate((s) => {
    const parts = s.split(",").map((p) => p.trim());
    for (const part of parts) {
      const m = part.match(/^\((.+)\)\s+(.+)$/);
      if (!m) continue;
      if (window.matchMedia(`(${m[1]})`).matches) return m[2]!;
    }
    // The last entry has no media condition — it is the default.
    return parts[parts.length - 1]!;
  }, sizes);
}

function toPx(value: string, viewport: number): number {
  if (value.endsWith("vw")) return (parseFloat(value) / 100) * viewport;
  if (value.endsWith("px")) return parseFloat(value);
  if (value.endsWith("rem")) return parseFloat(value) * 16;
  return NaN;
}

test.describe("poster sizes", () => {
  for (const [route, label] of [
    ["/en/path/deadpool-and-wolverine", "hero + panels"],
    ["/en/universes/mcu/release/timeline", "panels"],
  ] as const) {
    test(`${label}: declared sizes matches the rendered box`, async ({ page }) => {
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route, { waitUntil: "networkidle" });

        const imgs = await page.locator(".poster img").all();
        expect(imgs.length).toBeGreaterThan(0);

        // A handful is enough — they share three size classes.
        for (const img of imgs.slice(0, 4)) {
          const sizes = (await img.getAttribute("sizes")) ?? "";
          const box = (await img.boundingBox())?.width ?? 0;
          if (box === 0) continue; // below the fold and not yet laid out

          /**
           * AN UNOPTIMIZED POSTER HAS NO `sizes`, and that is now correct.
           *
           * TMDB publishes each poster at fixed widths, so those are requested
           * pre-sized and served straight from their CDN — no `srcset`, and
           * `sizes` without one means nothing, so Next omits it. This test
           * exists to catch a `sizes` that LIES about the rendered box; where
           * there is no `sizes` there is nothing to lie. The width is asserted
           * instead, at its source, by P5.
           */
          if (!sizes) {
            const src = (await img.getAttribute("src")) ?? "";
            expect(src, "no sizes AND no width in the URL").toMatch(/\/t\/p\/w\d+\//);
            continue;
          }

          const declared = toPx(await resolveSizes(page, sizes), width);
          expect(Number.isNaN(declared), `unparsed sizes: ${sizes}`).toBe(false);

          const drift = Math.abs(declared - box) / box;
          expect(
            drift,
            `at ${width}px: declared ${Math.round(declared)}px, rendered ${Math.round(box)}px (${sizes})`,
          ).toBeLessThan(0.12);
        }
      }
    });
  }

  test("the hero is the only preloaded image, and it is the LCP element", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/en/path/deadpool-and-wolverine", { waitUntil: "networkidle" });

    const preloads = await page.locator('link[rel="preload"][as="image"]').count();
    expect(preloads, "priority is a preload; more than one makes LCP worse").toBe(1);

    // And it really is the topmost poster.
    const first = await page.locator(".poster img").first().boundingBox();
    expect(first!.y).toBeLessThan(600);
  });
});
