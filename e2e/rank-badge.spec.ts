import { expect, test } from "@playwright/test";

/**
 * THE RANK BADGE ANSWERS THE QUESTION THAT WAS ASKED.
 *
 * A chip filter is a category, so counting down it is meaningful: "1st of the
 * X-Men". A search is a lookup, and "1 of 1" is not a fact about anybody — so
 * a query switches the badge to the corpus-wide rank.
 *
 * NO PINNED RANK HERE. Importing lib/power to read Storm's number would be
 * exact, and Playwright's loader cannot follow this project's JSON imports;
 * hardcoding it instead makes an unrelated tuning pass fail a test about
 * behaviour. So the claim is the SHAPE: one row on screen, and a number on it
 * that is plainly not the row count.
 */
test.describe("the Strongest badge", () => {
  test("counts down a filtered category", async ({ page }) => {
    await page.goto("/en/characters?sort=power&chip=x-men");
    await expect(page.locator(".char-grid .tile-index").first()).toHaveText("1");
  });

  test("shows the corpus rank when searching a name", async ({ page }) => {
    await page.goto("/en/characters?sort=power&q=Storm");
    const badges = page.locator(".char-grid .tile-index");
    /* "Storm" matches three — Ororo, and the Storm siblings by alias. Their
       badges must be corpus ranks, so they are not the sequence 1, 2, 3 that
       counting the rows would produce. */
    /* The grid is client-rendered, and `allInnerTexts` does not auto-wait —
       reading it straight after `goto` returns an empty array. */
    await expect(badges.first()).toBeVisible();
    const shown = await badges.allInnerTexts();
    const nums = shown.map(Number);
    expect(nums.every(Number.isInteger)).toBe(true);
    expect(nums).not.toEqual(nums.map((_, i) => i + 1));
    expect(Math.min(...nums)).toBeGreaterThan(1);
  });
});
