import { expect, test } from "@playwright/test";

/**
 * THE PACE LINE, which only exists once somebody has watched something.
 *
 * Asserted in a real browser rather than in a render test, because every claim
 * it makes depends on localStorage and on hydration having happened — the
 * server has no idea who you are, and the component deliberately renders
 * nothing until it does.
 */
test.describe("pace", () => {
  test("nothing before you have watched anything", async ({ page }) => {
    await page.goto("/en/path/avengers-doomsday");
    await expect(page.locator(".pace")).toHaveCount(0);
  });

  test("counts what is left, and the pace that clears it in time", async ({ page }) => {
    await page.goto("/en/path/avengers-doomsday");
    /* Two titles from the front of the Doomsday spine. Written straight to the
       store the app reads, then reloaded, which is the same path a returning
       viewer takes. */
    await page.evaluate(() => {
      localStorage.setItem("the-thread:watched", JSON.stringify(["iron-man", "iron-man-2"]));
    });
    await page.reload();

    const pace = page.locator(".pace");
    await expect(pace).toHaveCount(1);
    const text = (await pace.innerText()).replace(/\s+/g, " ");
    expect(text).toMatch(/\d+% done/);
    expect(text).toMatch(/\d+ titles left/);
    expect(text).toMatch(/\d+ hours left/);
    /* Doomsday is still ahead, so the deadline clause must be there. */
    expect(text).toMatch(/hrs\/week to finish in \d+/);

    /* The fill is a real width, not a placeholder. */
    const w = await page.locator(".pace-fill").evaluate((el) => (el as HTMLElement).style.inlineSize);
    expect(w).toMatch(/^\d+%$/);
    expect(w).not.toBe("0%");
  });
});
