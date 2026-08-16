import { expect, test } from "@playwright/test";

/**
 * The accessibility floor (§8 / ISO 40500), checked in a browser.
 *
 * The <ol role="list"> claim in particular has been asserted in the DOM since
 * step 5 and never exercised as a traversal.
 */

const ROUTES = ["/en", "/en/path/deadpool-and-wolverine", "/en/universes/mcu/release/timeline", "/ar/universes/mcu/release/timeline"];

test.describe("accessibility", () => {
  test("every route is keyboard-traversable with a visible focus ring", async ({ page }) => {
    for (const route of ROUTES) {
      await page.setViewportSize({ width: 390, height: 800 });
      await page.goto(route, { waitUntil: "networkidle" });

      const seen: string[] = [];
      for (let i = 0; i < 12; i += 1) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          const s = getComputedStyle(el);
          return {
            tag: el.tagName.toLowerCase(),
            // Never `outline: none` — the ring is 2px red at 2px offset.
            outline: s.outlineStyle,
            width: s.outlineWidth,
          };
        });
        if (!info) continue;
        seen.push(info.tag);
        expect(info.outline, `${route}: focus ring removed on <${info.tag}>`).not.toBe("none");
      }
      expect(seen.length, `${route} has no keyboard-reachable elements`).toBeGreaterThan(3);
    }
  });

  test("the watch order is a real list, with a real item count", async ({ page }) => {
    // `list-style: none` strips list semantics in Safari; role="list" restores
    // them. This is the traversal that claim has never had.
    /**
     * The saga timeline replaced the flat thread on /universes/mcu/release/timeline, so this points
     * at a path page, which still renders one. The rule it guards is unchanged
     * and is the oldest one in the project: the ORDER lives in a real list, so
     * a screen reader hears "list, 77 items" and "item 3 of 77". The timeline's
     * own list semantics are asserted separately in tests/render.test.ts.
     */
    await page.goto("/en/path/deadpool-and-wolverine", { waitUntil: "networkidle" });
    const list = page.getByRole("list").filter({ has: page.locator(".thread-panel") }).first();
    await expect(list).toHaveCount(1);
    /**
     * DIRECT CHILDREN, because the thread now nests a list inside a panel.
     *
     * An editor's note renders the titles it names as links, and that is a
     * `<ul>` inside a `.thread-panel`, which is itself an `<li>`. Nesting a
     * list inside a list item is correct HTML and a screen reader still hears
     * "list, 77 items" for the outer one — but `getByRole("listitem")` returns
     * every descendant, so it counted the note's chips too.
     *
     * The claim being made is about the OUTER list, so the count is taken from
     * its own children. That is also what a screen reader announces.
     */
    const items = await page.evaluate(
      () => document.querySelectorAll("ol.thread-list > li").length,
    );
    /* 77, not 34. An MCU path is the whole MCU line behind the target now,
       not the dependency closure alone — which makes this list longer and the
       claim it guards more important, not less. */
    expect(items).toBe(77);
  });

  test("the thread rail is decoration, invisible to assistive tech", async ({ page }) => {
    /**
     * TWO PAGES, because the two claims no longer live on one.
     *
     * This asserted the rail AND the ordinal on /order/release, which had both.
     * That page is now the MCU release timeline, and the saga timeline
     * deliberately prints no ordinal: on a timeline the YEAR is the marker, and
     * "#014" beside it is a second competing one. So `.panel-index` is not
     * there to check, and pointing the whole test at a page missing half its
     * subject would have quietly stopped testing the other half.
     *
     * The rail is checked where the rail is. The ordinal is checked on the path
     * pages, which is the only place it is still rendered.
     */
    await page.goto("/en/universes/mcu/release/timeline", { waitUntil: "networkidle" });
    await expect(page.locator(".thread-rail")).toHaveAttribute("aria-hidden", "true");

    // The ordinal duplicates the position the list already announces.
    await page.goto("/en/path/deadpool-and-wolverine", { waitUntil: "networkidle" });
    await expect(page.locator(".thread-rail")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".panel-index").first()).toHaveAttribute("aria-hidden", "true");
  });

  test("every page has exactly one h1 and no heading level is skipped", async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "networkidle" });
      const levels = await page.evaluate(() =>
        [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1])),
      );
      expect(levels.filter((l) => l === 1).length, `${route}: h1 count`).toBe(1);
      for (let i = 1; i < levels.length; i += 1) {
        expect(levels[i]! - levels[i - 1]!, `${route}: heading level jump`).toBeLessThanOrEqual(1);
      }
    }
  });

  test("400% zoom reflows to one column with nothing lost", async ({ page }) => {
    // 1280×1024 at 400% is a 320×256 CSS viewport.
    await page.setViewportSize({ width: 320, height: 256 });
    await page.goto("/en/universes/mcu/release/timeline", { waitUntil: "networkidle" });
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(over).toBeLessThanOrEqual(0);
    // The search is still reachable at 320×256 — no functionality lost.
    await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
  });

  test("html carries lang and dir in both locales", async ({ page }) => {
    for (const [locale, dir] of [["en", "ltr"], ["ar", "rtl"]] as const) {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", dir);
    }
  });
});
