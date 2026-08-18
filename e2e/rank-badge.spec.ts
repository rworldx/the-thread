import { expect, test } from "@playwright/test";

/**
 * THE RANK BADGE ANSWERS THE QUESTION THAT WAS ASKED.
 *
 * A chip filter is a category, so counting down it is meaningful: "1st of the
 * X-Men". A search is a lookup, and "1 of 1" is not a fact about anybody — so
 * a query switches the badge to the corpus-wide rank.
 */
test.describe("the Strongest badge", () => {
  test("counts down a filtered category", async ({ page }) => {
    await page.goto("/en/characters?sort=power&chip=x-men");
    const first = page.locator(".char-grid .tile-index").first();
    await expect(first).toHaveText("1");
  });

  test("shows the corpus rank when searching a name", async ({ page }) => {
    await page.goto("/en/characters?sort=power&q=Storm");
    const badges = page.locator(".char-grid .tile-index");
    await expect(badges.first()).not.toHaveText("1");
    /* Storm's own rank, not her position in a one-row list. */
    await expect(badges.first()).toHaveText("123");
  });
});
