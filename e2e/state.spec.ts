import { expect, test } from "@playwright/test";

/**
 * Client state: hydration, the shield, and progress.
 *
 * Every check here exists because the static equivalent CANNOT see the thing it
 * would claim to check. A hydration mismatch is a console warning nobody reads
 * followed by a full re-render nobody attributes to it. A blurred spoiler and an
 * absent one are identical in a screenshot. A progress fill that never moves
 * looks exactly like one at 0%.
 */

const WATCHED = ["iron-man", "iron-man-2", "thor"];

test.describe("hydration", () => {
  for (const locale of ["en", "ar"]) {
    test(`${locale}: no hydration warning on the order page with progress saved`, async ({
      page,
    }) => {
      const problems: string[] = [];
      page.on("console", (m) => {
        const text = m.text();
        if (/hydrat|did not match|server rendered|Warning:/i.test(text)) problems.push(text);
      });
      page.on("pageerror", (e) => problems.push(String(e)));

      await page.goto(`/${locale}`);
      await page.evaluate((ids) => {
        localStorage.setItem("the-thread:watched", JSON.stringify(ids));
      }, WATCHED);

      await page.goto(`/${locale}/universes/mcu/release/timeline`, { waitUntil: "networkidle" });
      await page.waitForTimeout(400);

      expect(problems, "reading localStorage during render mismatches").toEqual([]);
    });
  }

  /**
   * THE WATCHED CHECKBOXES ARE GONE, and the tests for them with it.
   *
   * They stored progress in `localStorage`, which means a different browser or
   * a cleared cache silently lost everything anybody had ticked — and the site
   * has no accounts to fix that. A control that promises to remember and then
   * forgets is worse than no control, so it was removed until there is
   * somewhere real to keep it.
   */
});

test.describe("spoiler shield", () => {
  test("the context is ABSENT from the page, not hidden", async ({ page }) => {
    await page.goto("/en/path/avengers-endgame", { waitUntil: "networkidle" });

    /**
     * 1. Not in the rendered DOM at all.
     *
     * The pattern was `/devastating|snap|Thanos/i`, a loose proxy for the
     * context sentence. PRD v2 put a cast rail and character chips on this
     * page, so "Thanos" now appears as a CAST CREDIT and as a link to his
     * character page — public metadata that is on the poster, in the same class
     * as the runtime.
     *
     * A test that fires on correct data is one somebody deletes, so this now
     * asserts the same thing assertions 2 and 3 do: the context SENTENCE is
     * absent. That is what this test is named after and what the shield
     * actually promises.
     *
     * The open question this surfaced is real and is not a test problem: a cast
     * list can itself spoil, and No Way Home is the obvious case. Recorded in
     * the README rather than decided silently here.
     */
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).not.toMatch(/devastating actions of Thanos/i);
    expect(bodyText).not.toMatch(/restore balance to the universe/i);

    // 2. Not in the emitted HTML either — a blur or visibility:hidden would
    //    leave it here, and view-source would hand it over.
    const html = await page.content();
    expect(html).not.toMatch(/devastating actions of Thanos/i);

    // 3. Select-all copies nothing of it.
    const selected = await page.evaluate(() => {
      const r = document.createRange();
      r.selectNodeContents(document.body);
      const s = window.getSelection()!;
      s.removeAllRanges();
      s.addRange(r);
      return s.toString();
    });
    expect(selected).not.toMatch(/devastating/i);
  });

  test("the reveal is a real button, keyboard-reachable, 44px", async ({ page }) => {
    await page.goto("/en/path/avengers-endgame", { waitUntil: "networkidle" });
    const button = page.getByRole("button", { name: /show context/i });
    await expect(button).toBeVisible();

    const box = (await button.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);

    await button.focus();
    await expect(button).toBeFocused();
    await button.press("Enter");
    // Now the text arrives — fetched, not unhidden.
    await expect(page.locator(".spoiler-context p")).toBeVisible();
  });

  test("the toggle is on by default and persists", async ({ page }) => {
    /**
     * THE TOGGLE MOVED INTO THE SETTINGS DISCLOSURE, so this opens it first.
     *
     * The header used to carry the locale, theme and spoiler switches in the
     * open, which made it two rows on a laptop and three on a phone. They are
     * settings — changed once, then forgotten — so they now live behind one
     * `<details>` and the bar is a single line.
     *
     * Opening the disclosure is a real extra step for a real user, and the
     * test doing it too is the honest reflection of that. What is asserted is
     * unchanged: default on, click flips it, and it survives a reload.
     */
    await page.goto("/en/path/iron-man", { waitUntil: "networkidle" });
    const settings = page.locator(".settings > summary");
    await settings.click();

    const toggle = page.getByRole("button", { name: /spoilers/i });
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await page.reload({ waitUntil: "networkidle" });
    /* A native `<details>` does not remember its state across a load, so it
       has to be reopened. The SHIELD state is what persists, and that is what
       is being asserted. */
    await page.locator(".settings > summary").click();
    await expect(page.getByRole("button", { name: /spoilers/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
