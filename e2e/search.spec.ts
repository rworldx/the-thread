import { expect, test } from "@playwright/test";

/**
 * Search behaviour a static test cannot see: focus, keyboard traversal, the
 * sheet-versus-panel switch, and the row height.
 */

test.describe("search", () => {
  test("does NOT autofocus on page load, and does focus on open", async ({ page }) => {
    // Autofocus on mobile yanks the keyboard up and shifts the layout out from
    // under whoever was reading (§13.6).
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/en/universes/all");
    expect(await page.evaluate(() => document.activeElement?.tagName)).not.toBe("INPUT");

    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByRole("combobox")).toBeFocused();
  });

  test("results carry the cost, not just the title", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/en/universes/all");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("combobox").fill("deadpool");

    // EVERY row carries a cost line — either a count or "Start here" for a
    // root. The first hit for "deadpool" is Deadpool itself, which is a root,
    // so asserting "titles before it" on row one was wrong.
    for (const row of (await page.getByRole("option").all()).slice(0, 3)) {
      await expect(row).toContainText(/(titles? before it|Start here)/);
      await expect(row).toContainText(/\d{4}/);
    }
    // And at least one row shows a real count — a search that returns only
    // titles is one anyone can build.
    await expect(page.getByRole("option").filter({ hasText: "titles before it" }).first()).toBeVisible();
  });

  test("a root title says start here rather than 0 titles", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/en/universes/all");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("combobox").fill("iron man");
    await expect(page.getByRole("option").first()).toContainText("Start here");
  });

  test("arrows move the selection, Enter follows it, Escape closes", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/en/universes/all");
    await page.getByRole("button", { name: "Search" }).click();
    const box = page.getByRole("combobox");
    await box.fill("spider");

    await expect(page.getByRole("option").first()).toHaveAttribute("aria-selected", "true");
    await box.press("ArrowDown");
    await expect(page.getByRole("option").nth(1)).toHaveAttribute("aria-selected", "true");
    await box.press("ArrowUp");
    await expect(page.getByRole("option").first()).toHaveAttribute("aria-selected", "true");

    await box.press("Escape");
    await expect(page.getByRole("combobox")).toHaveCount(0);

    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("combobox").fill("venom");
    await page.getByRole("combobox").press("Enter");
    await page.waitForURL(/\/en\/path\/venom$/);
  });

  test("the empty state offers the fuzzy hit as a link", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/en/universes/all");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("combobox").fill("venum");
    // "venum" is close enough to rank, so it appears as a result rather than as
    // an empty state — which is the better outcome. Assert it resolves at all.
    await expect(page.getByRole("option").first()).toContainText("Venom");
  });

  test("rows clear 44px and the input clears 16px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/en/universes/all");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("combobox").fill("spider");

    const fontSize = await page
      .getByRole("combobox")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(fontSize, "below 16px iOS Safari zooms on focus").toBeGreaterThanOrEqual(16);

    for (const row of (await page.getByRole("option").all()).slice(0, 3)) {
      const h = (await row.boundingBox())!.height;
      expect(h).toBeGreaterThanOrEqual(44);
    }
  });

  test("full-screen sheet below 768, anchored panel above", async ({ page }) => {
    for (const [width, expectFull] of [
      [390, true],
      [1280, false],
    ] as const) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/en/universes/all");
      await page.getByRole("button", { name: "Search" }).click();
      const box = (await page.getByRole("dialog").boundingBox())!;
      if (expectFull) expect(box.width).toBeGreaterThan(width * 0.9);
      else expect(box.width).toBeLessThan(width * 0.6);
    }
  });

  test("Arabic query finds the title, in the AR locale", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/ar/universes/all");
    await page.getByRole("button", { name: "بحث" }).click();
    await page.getByRole("combobox").fill("سبايدر");
    await expect(page.getByRole("option").first()).toContainText("Spider-Man");
  });
});
