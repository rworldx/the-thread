import { expect, test } from "@playwright/test";

/**
 * The §14.8 budget, measured on the heaviest page.
 *
 * These numbers are also the answer to a deferred decision. §14.6 proposes
 * `content-visibility: auto` on the thread panels; step 6 deferred it pending a
 * measurement, because §14.6 fixed a MEASURED problem and adding it blind would
 * mean debugging two unproven things at once.
 *
 * Measured: LCP 212ms and CLS 0.019 on /universes/all at 390px under a 4× CPU
 * throttle, with 130 panels and lazy images. There is no problem to fix, so
 * content-visibility is NOT applied — and if these budgets ever fail, the fix
 * goes on the POSTER GRID (uniform 2:3 cells, exact intrinsic size), never on
 * the variable-height panels, where a changing document height breaks any
 * scroll-linked animation.
 */

test.describe("performance budget", () => {
  test("/projects stays inside the §14.8 budget on a throttled phone", async ({ page }) => {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.setViewportSize({ width: 390, height: 844 });
    // The heaviest page is now /projects: 156 posters against the MCU's 72.
    await page.goto("/en/projects", { waitUntil: "load" });

    const m = await page.evaluate(
      () =>
        new Promise<{ lcp: number; cls: number; nodes: number; loaded: number; total: number }>(
          (resolve) => {
            let lcp = 0;
            let cls = 0;
            new PerformanceObserver((l) => {
              for (const e of l.getEntries()) lcp = e.startTime;
            }).observe({ type: "largest-contentful-paint", buffered: true });
            new PerformanceObserver((l) => {
              for (const e of l.getEntries()) {
                const s = e as PerformanceEntry & { hadRecentInput?: boolean; value: number };
                if (!s.hadRecentInput) cls += s.value;
              }
            }).observe({ type: "layout-shift", buffered: true });

            setTimeout(() => {
              const imgs = [...document.querySelectorAll<HTMLImageElement>(".poster img")];
              resolve({
                lcp: Math.round(lcp),
                cls: Number(cls.toFixed(4)),
                nodes: document.querySelectorAll("*").length,
                loaded: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
                total: imgs.length,
              });
            }, 2500);
          },
        ),
    );

    // Generous ceilings — these are budgets, not a snapshot of today's number.
    expect(m.lcp, "LCP on the heaviest page").toBeLessThan(2500);
    expect(m.cls, "CLS — the 2:3 box is reserved on every poster").toBeLessThan(0.1);

    // Lazy loading is doing its job: a small fraction of 129 posters fetched
    // before any scroll. A parent with `overflow: hidden` defeating the
    // intersection heuristic is the usual cause when this creeps up (§14.8).
    expect(m.loaded, `${m.loaded}/${m.total} posters loaded before scroll`).toBeLessThan(40);
    expect(m.total).toBeGreaterThan(120);
  });

  test("content-visibility is NOT on the thread panels", async ({ page }) => {
    // Decided by measurement, not by memory. If it ever returns it goes on the
    // poster grid — uniform cells — never on the variable-height panels.
    // The thread lives on path pages and the MCU timeline now; /universes/all is a
    // grid and has no `.thread-panel` at all, so this timed out looking for one.
    await page.goto("/en/path/deadpool-and-wolverine");
    const cv = await page
      .locator(".thread-panel")
      .first()
      .evaluate((el) => getComputedStyle(el).contentVisibility);
    expect(cv).not.toBe("auto");
  });
});
