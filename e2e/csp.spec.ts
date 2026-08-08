import { expect, test } from "@playwright/test";

/**
 * Does the site actually work under the CSP?
 *
 * This is what every "no inline style" decision was for. A blocked resource is
 * a console error and a silently missing behaviour — the poster tints would
 * become 130 grey boxes, the alternating layout would collapse, the thread fill
 * would vanish. None of that throws.
 */

const ROUTES = [
  "/en",
  "/en/path/deadpool-and-wolverine",
  "/en/universes/all",
  "/en/universes/x-men",
  "/en/what-is-marvel",
  "/ar/path/deadpool-and-wolverine",
  "/ar/universes/mcu/release/timeline",
];

test.describe("content security policy", () => {
  test("the header is present and script-src is strict", async ({ page }) => {
    const res = await page.goto("/en/path/iron-man");
    const csp = res!.headers()["content-security-policy"] ?? "";
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    // Posters are hotlinked; nothing else may load an image.
    expect(csp).toContain("https://image.tmdb.org");

    /**
     * script-src carries 'unsafe-inline' and that is a KNOWN, written-down
     * downgrade from §9 — see the note in next.config.ts. Next's App Router
     * always emits an inline bootstrap script, and allowing it needs a nonce
     * (per-request, therefore dynamic) or a hash (different on 294 pages).
     * Static won.
     *
     * What is still enforced, and asserted here: no THIRD-PARTY script host.
     * That is the part that matters when there is no injection surface.
     */
    expect(csp).toMatch(/script-src 'self'/);
    expect(csp, "no third-party script host may be allowlisted").not.toMatch(
      /script-src[^;]*https?:\/\//,
    );

    /**
     * NO 'unsafe-eval'. It rode along beside 'unsafe-inline' with no
     * justification in an earlier version — Turbopack needs it in dev, a
     * production build does not, and the whole suite passes without it. With
     * BOTH unsafe keywords this directive blocks almost nothing except
     * third-party hosts, which would make the documented compromise meaningless.
     */
    expect(csp, "unsafe-eval is not needed by a production build").not.toMatch(
      /script-src[^;]*'unsafe-eval'/,
    );
    // And the directives that do not depend on any of that.
    expect(csp).toContain("connect-src 'self'");
    expect(csp).toContain("base-uri 'self'");
  });

  /**
   * `upgrade-insecure-requests` is now emitted for production builds ONLY,
   * because on `http://localhost` Safari applies it — unlike Chrome — upgrades
   * every chunk to https, finds no TLS, and drops the request. Dev served
   * unstyled HTML with no JS and no server-side trace, since the requests were
   * never sent.
   *
   * That conditional is exactly the shape that quietly becomes "not emitted at
   * all". This suite runs against `next start`, a production build, so the
   * directive must be here. If someone widens the condition, this fails.
   */
  test("https upgrade is enforced in the production build", async ({
    page,
  }) => {
    const res = await page.goto("/en");
    const csp = res!.headers()["content-security-policy"] ?? "";
    expect(
      csp,
      "upgrade-insecure-requests must survive in production",
    ).toContain("upgrade-insecure-requests");
  });

  test("images may load ONLY from TMDB", async ({ page }) => {
    const res = await page.goto("/en/universes/all");
    const csp = res!.headers()["content-security-policy"] ?? "";
    const img = csp.split(";").find((d) => d.trim().startsWith("img-src"))!;
    expect(img).toContain("https://image.tmdb.org");
    // A wildcard here would let any host serve an image into the page.
    expect(img).not.toContain("*");
  });

  test("no route logs a CSP violation", async ({ page }) => {
    const violations: string[] = [];
    page.on("console", (m) => {
      if (/Content Security Policy|Refused to/i.test(m.text()))
        violations.push(m.text());
    });

    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "networkidle" });
    }
    expect(violations).toEqual([]);
  });

  test("the things the CSP would have broken still work", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    /**
     * /universes/all is a flat grid now and /universes/mcu/release/timeline is the saga timeline;
     * the ALTERNATING desktop thread this asserts lives on a path page. Pointed
     * there rather than relaxed: the alternating layout is the thing a blocked
     * `style` attribute would silently collapse, so it still has to be checked
     * somewhere that actually renders it.
     */
    await page.goto("/en/path/deadpool-and-wolverine", { waitUntil: "networkidle" });

    // 1. Poster tints arrive from the stylesheet, not an inline style.
    const tint = await page
      .locator(".poster")
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(
      tint,
      "tints would be a flat grey if the stylesheet were blocked",
    ).not.toBe("rgba(0, 0, 0, 0)");

    // 2. The alternating desktop layout still alternates.
    const lefts = await page.evaluate(() =>
      [...document.querySelectorAll(".panel-body")]
        .slice(0, 4)
        .map((el) => Math.round(el.getBoundingClientRect().left)),
    );
    expect(new Set(lefts).size).toBe(2);

    // 3. The fetched spoiler context still loads — connect-src 'self'.
    await page.goto("/en/path/avengers-endgame", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /show context/i }).click();
    await expect(page.locator(".spoiler-context p")).toBeVisible();
  });
});
