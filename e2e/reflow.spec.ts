import { expect, test } from "@playwright/test";

/**
 * The 320px hard floor (WCAG 1.4.10 reflow) and the 400% zoom case, measured in
 * a real browser.
 *
 * This is only meaningful because `body` has no `overflow-x: hidden`. That
 * property conceals overflow instead of preventing it, so with it in place every
 * assertion below would pass on a visibly broken layout.
 *
 * 320px is also iPhone SE 1st gen, which is still in use in the GCC.
 */

/**
 * Locale-prefixed. Step 7 adds a second locale to this list rather than
 * rewriting it — which is why the segment went in before step 6 doubled the
 * number of page types.
 */
const LOCALE = "en";
const PAGES = [
  "",
  "/path/iron-man",
  "/path/deadpool-and-wolverine",
  "/path/doctor-strange-in-the-multiverse-of-madness",
  "/path/echo-s1",
];
const ROUTES = PAGES.map((p) => `/${LOCALE}${p}`);
/** Both directions. RTL is where logical-property mistakes actually surface. */
const ALL_ROUTES = ["en", "ar"].flatMap((l) => PAGES.map((p) => `/${l}${p}`));

/** Widths from the §13.2 device matrix. 320 is the floor, 1920 the ceiling case. */
const WIDTHS = [320, 360, 390, 430, 768, 1024, 1280, 1440];

test.describe("reflow", () => {
  for (const route of ROUTES) {
    test(`${route} never scrolls horizontally at 320px`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(route);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `${route} overflows at 320px`).toBeLessThanOrEqual(clientWidth);
    });
  }

  test("no route overflows at any width in the device matrix, either direction", async ({
    page,
  }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ALL_ROUTES) {
        await page.goto(route);
        const over = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(over, `${route} overflows by ${over}px at ${width}px`).toBeLessThanOrEqual(0);
      }
    }
  });

  test("names the specific element that overflows, not just the page", async ({ page }) => {
    // A failure that says "the page is 340px wide" costs an afternoon. One that
    // names the node costs a minute.
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(`/${LOCALE}/path/doctor-strange-in-the-multiverse-of-madness`);

    const offenders = await page.evaluate(() => {
      const limit = document.documentElement.clientWidth;
      /**
       * Anything inside a DELIBERATE horizontal scroller is out of scope.
       *
       * The cast rail and the character rail scroll sideways on purpose, so
       * their later items sit beyond the viewport by design. Counting them made
       * this report twelve offenders on a page that does not overflow, and a
       * check that fires on correct layout is the one someone deletes. The
       * page-level assertions above still catch a real horizontal scroll.
       */
      const scrollers = [...document.querySelectorAll<HTMLElement>("*")].filter((el) => {
        const ox = getComputedStyle(el).overflowX;
        return ox === "auto" || ox === "scroll";
      });
      return [...document.querySelectorAll<HTMLElement>("body *")]
        .filter((el) => !scrollers.some((s) => s !== el && s.contains(el)))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.right > limit + 1 || r.left < -1;
        })
        .slice(0, 10)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className} → ${Math.round(el.getBoundingClientRect().right)}px`);
    });
    expect(offenders).toEqual([]);
  });

  test("400% zoom at 1280×1024 reflows to one column (WCAG 1.4.10)", async ({ page }) => {
    /**
     * Browser zoom shrinks the CSS viewport, so media queries re-evaluate:
     * 1280×1024 at 400% is a 320×256 CSS px viewport. `style.zoom` does NOT do
     * this — it scales rendering while media queries still report 1280px, which
     * runs the desktop layout inside a phone-sized box, a state no real user can
     * reach. Setting the viewport is the honest simulation.
     *
     * The short height is the point: 256px surfaces anything that assumes
     * vertical room, which the plain 320px tests above do not.
     */
    await page.setViewportSize({ width: 320, height: 256 });
    await page.goto(`/${LOCALE}/path/deadpool-and-wolverine`);

    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(over).toBeLessThanOrEqual(0);

    // Reflow to ONE column: no panel may sit beside another.
    const columns = await page.evaluate(() => {
      const lefts = [...document.querySelectorAll(".thread-panel")].map(
        (el) => Math.round(el.getBoundingClientRect().left),
      );
      return new Set(lefts).size;
    });
    expect(columns).toBeLessThanOrEqual(1);
  });

  test("the alternating desktop layout does not reorder the DOM", async ({ page }) => {
    // Grid placement moves panels visually; tab order and screen-reader order
    // follow the DOM, and the DOM order IS the watch order.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${LOCALE}/path/deadpool-and-wolverine`);

    /**
     * The panel's TITLE link, not every link inside the panel.
     *
     * An editor's note now renders the titles it mentions as links, so
     * `.thread-panel a` picks up five navigation chips as well as the titles —
     * and the first of them is not the first step in the order. `.panel-title
     * a` is the one link per panel that IS the panel's title, which is what
     * this test has always been about.
     */
    const domOrder = await page.evaluate(() =>
      [...document.querySelectorAll(".thread-panel .panel-title a")].map((a) =>
        a.textContent?.trim(),
      ),
    );
    expect(domOrder[0]).toBe("X-Men");
    expect(domOrder.at(-1)).toBe("Deadpool & Wolverine");

    // Alternation is measured on .panel-body, not .thread-panel: the panel
    // spans the full grid width so it can own its row without an inline style,
    // and the left/right split happens inside it.
    const lefts = await page.evaluate(() =>
      [...document.querySelectorAll(".panel-body")].map((el) =>
        Math.round(el.getBoundingClientRect().left),
      ),
    );
    expect(new Set(lefts).size).toBe(2);

    // Consecutive panels must land on opposite sides — that is what makes it a
    // sequence rather than two parallel columns.
    for (let i = 1; i < Math.min(lefts.length, 8); i += 1) {
      expect(lefts[i], `panel ${i} did not alternate`).not.toBe(lefts[i - 1]);
    }

    // Each panel occupies its own row: no two share a vertical position.
    const tops = await page.evaluate(() =>
      [...document.querySelectorAll(".panel-body")].map((el) =>
        Math.round(el.getBoundingClientRect().top),
      ),
    );
    expect(new Set(tops).size, "panels share a row — reads as simultaneous").toBe(tops.length);
  });

  test("the target ends the one continuous thread, on its own side", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${LOCALE}/path/deadpool-and-wolverine`);

    // One rail, not two. A second <Thread> for the target would break the
    // continuous line, split the list for screen readers, and reset nth-child
    // parity so the target always landed left.
    expect(await page.locator(".thread-wrap").count()).toBe(1);
    expect(await page.locator("ol.thread-list").count()).toBe(1);

    const sides = await page.evaluate(() =>
      [...document.querySelectorAll(".thread-panel")].map((p) => ({
        left: Math.round(p.querySelector(".panel-body")!.getBoundingClientRect().left),
        target: p.getAttribute("data-target") === "true",
      })),
    );

    const last = sides.at(-1)!;
    const prev = sides.at(-2)!;
    expect(last.target).toBe(true);
    expect(last.left, "target did not alternate off the previous panel").not.toBe(prev.left);
  });

  test("every node centres on the rail, at every width, whatever its size", async ({ page }) => {
    /**
     * Three separate drifts lived here, all invisible to every other check:
     *
     *  - the target node is 1.6× and its offset had been recomputed for desktop
     *    only, so its centre sat ~3px off the rail on mobile and tablet;
     *  - `--thread-inset` is a PERCENTAGE at ≥768, and a percentage inset
     *    resolves against the element's own containing block — capping the panel
     *    at 60ch made 15% mean two different distances, 42px apart;
     *  - the rail SVG is 4px wide with its stroke in the middle, so its visible
     *    centre sat 2px past the inset every node measured from.
     *
     * Centring is now computed from a per-panel --node variable, so a node can
     * change size without anyone recomputing anything. This asserts that.
     */
    for (const width of [320, 390, 768, 820, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`/${LOCALE}/path/deadpool-and-wolverine`);

      const drift = await page.evaluate(() => {
        const rail = document.querySelector(".thread-rail")!.getBoundingClientRect();
        const railX = rail.left + rail.width / 2;
        // PHYSICAL left/marginLeft, not the logical pair. `insetInlineStart`
        // is measured from the RIGHT edge in RTL, so adding it to rect.left
        // reports the node ~318px adrift on a layout that is actually correct.
        // The resolved physical values are direction-agnostic.
        const centre = (el: Element) => {
          const s = getComputedStyle(el, "::before");
          return (
            el.getBoundingClientRect().left +
            parseFloat(s.left) +
            parseFloat(s.marginLeft || "0") +
            parseFloat(s.width) / 2
          );
        };
        return [...document.querySelectorAll(".thread-panel")]
          .map((p) => ({
            id: p.getAttribute("data-target") ? "target" : (p.textContent ?? "").slice(0, 24),
            off: +(centre(p) - railX).toFixed(1),
          }))
          .filter((r) => Math.abs(r.off) > 0.6);
      });

      expect(drift, `nodes off the rail at ${width}px`).toEqual([]);
    }
  });

  test("the thread mirrors in RTL, and the nodes mirror with it", async ({ page }) => {
    /**
     * The logical-property mirroring had NEVER executed: `ar` was absent from
     * LOCALES, so every `[dir="rtl"]` rule in globals.css was unreachable code.
     * If the rail does not move to the right edge here, there is a hardcoded
     * `left:` somewhere (§13.10).
     */
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });

      await page.goto("/ar/path/deadpool-and-wolverine");
      expect(await page.getAttribute("html", "dir")).toBe("rtl");

      const ar = await page.evaluate(() => {
        const rail = document.querySelector(".thread-rail")!.getBoundingClientRect();
        // PHYSICAL left/marginLeft, not the logical pair. `insetInlineStart`
        // is measured from the RIGHT edge in RTL, so adding it to rect.left
        // reports the node ~318px adrift on a layout that is actually correct.
        // The resolved physical values are direction-agnostic.
        const centre = (el: Element) => {
          const s = getComputedStyle(el, "::before");
          return (
            el.getBoundingClientRect().left +
            parseFloat(s.left) +
            parseFloat(s.marginLeft || "0") +
            parseFloat(s.width) / 2
          );
        };
        return {
          railX: rail.left + rail.width / 2,
          vw: window.innerWidth,
          drift: [...document.querySelectorAll(".thread-panel")]
            .map((p) => +(centre(p) - (rail.left + rail.width / 2)).toFixed(1))
            .filter((d) => Math.abs(d) > 0.6),
        };
      });

      // Below the desktop breakpoint the rail hugs the END edge, which is the
      // RIGHT in RTL. At ≥1024 it centres in both directions.
      if (width < 1024) {
        expect(ar.railX, `rail did not mirror at ${width}px`).toBeGreaterThan(ar.vw / 2);
      } else {
        expect(Math.abs(ar.railX - ar.vw / 2)).toBeLessThan(2);
      }
      expect(ar.drift, `nodes off the mirrored rail at ${width}px`).toEqual([]);
    }
  });

  test("RTL and LTR are mirror images, not different layouts", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    const inset = async (route: string) => {
      await page.goto(route);
      return page.evaluate(() => {
        const r = document.querySelector(".thread-rail")!.getBoundingClientRect();
        return { fromStart: Math.round(r.left), fromEnd: Math.round(window.innerWidth - r.right) };
      });
    };
    const en = await inset("/en/path/iron-man");
    const ar = await inset("/ar/path/iron-man");
    // The rail sits the same distance from its own start edge in both.
    expect(ar.fromEnd).toBe(en.fromStart);
  });

  test("the viewport meta does not block zoom", async ({ page }) => {
    await page.goto(`/${LOCALE}`);
    const content = await page.getAttribute('meta[name="viewport"]', "content");
    expect(content).not.toMatch(/maximum-scale|user-scalable\s*=\s*no/);
  });

  test("every interactive target clears 44×44 at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(`/${LOCALE}/path/deadpool-and-wolverine`);

    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("a, button, summary, [role=button]")]
        // Inline links inside prose are text, not tap targets — they are
        // exempted in globals.css and must stay exempt here.
        .filter((el) => !el.closest("p, li"))
        /**
         * VISIBLE TARGETS ONLY, and this is not a loosening of the rule.
         *
         * The nav now ships two copies of its five links and hides one with
         * `display: none`, so a hidden link measures 0×0 and was being counted
         * as a tap target 44px too small. Nobody can tap it — it is not in the
         * layout, not in the tab order and not in the accessibility tree.
         *
         * `checkVisibility` is the right question here and a rect is not: a
         * box has a size whether or not anybody can reach it. This project has
         * measured the wrong property before.
         */
        .filter((el) => el.checkVisibility())
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.height < 44 || r.width < 24)
        .map((r) => `${Math.round(r.width)}×${Math.round(r.height)}`),
    );
    expect(small).toEqual([]);
  });
});

test.describe("what is marvel", () => {
  test("the chapters never run horizontally, at any width", async ({ page }) => {
    /**
     * INVERTED, deliberately. This used to assert the opposite: that the
     * chapters ran sideways above 1024 on a fine pointer, and stacked below.
     * That version was carefully built — native scroll-snap, no jacking, a
     * coarse-pointer fallback — and it was still the wrong idea. A chronology
     * that runs sideways on one page and downward on every other page teaches a
     * reader two reading directions for the same kind of content, and a drag
     * rail hides most of its contents behind a gesture.
     *
     * Two columns at desktop shows all five at once. So the assertion is now
     * that nothing here ever flows in a column direction.
     */
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en/what-is-marvel");
      const flow = await page
        .locator(".what-journey")
        .evaluate((el) => getComputedStyle(el).gridAutoFlow);
      expect(flow, `${width}px must not scroll sideways`).not.toContain("column");
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(over).toBeLessThanOrEqual(0);
    }
  });

  test("the chapters are an ordered list in both directions", async ({ page }) => {
    for (const locale of ["en", "ar"]) {
      await page.setViewportSize({ width: 390, height: 800 });
      await page.goto(`/${locale}/what-is-marvel`);
      // The order IS the information; it survives with no stylesheet.
      await expect(page.locator("ol.what-journey > li")).toHaveCount(5);
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(over, `${locale} overflows`).toBeLessThanOrEqual(0);
    }
  });
});

test.describe("the marquee", () => {
  /**
   * THE BUG THIS EXISTS FOR: an empty strip on the Arabic homepage.
   *
   * `translateX` is a PHYSICAL transform. In LTR the track starts at the left
   * edge and walking it by -50% is correct. In RTL a block places an over-wide
   * child from its inline-start — the RIGHT edge — so the track already extends
   * leftward, and the same -50% pushed all 8,691px of it outside the
   * `overflow: hidden` box. Every word sat at a negative x and the band
   * rendered blank.
   *
   * Nothing structural could see it. The element existed, the spans existed,
   * the colour was `rgb(250,250,250)`, and every one of them was off-screen.
   * The only check that catches it is asking whether any of them INTERSECT the
   * box they are supposed to fill — which is what this does, in both scripts,
   * because the failure only ever appeared in one of them.
   */
  for (const locale of ["en", "ar"] as const) {
    test(`${locale}: words actually fill the strip`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/${locale}`, { waitUntil: "networkidle" });

      const visible = await page.evaluate(() => {
        const box = document.querySelector(".marquee")?.getBoundingClientRect();
        if (!box) return -1;
        return [...document.querySelectorAll(".marquee-track span")].filter((s) => {
          const r = s.getBoundingClientRect();
          return r.right > box.left && r.left < box.right && r.width > 0;
        }).length;
      });

      /* Six is comfortably below what either script fits (12 in Arabic, 8 in
         English at this width) and comfortably above the zero that shipped. */
      expect(visible, `${locale}: words inside the marquee box`).toBeGreaterThan(5);
    });
  }
});

/**
 * THE NAV FOLDS INTO THE SETTINGS, AND EXACTLY ONE COPY IS EVER LIVE.
 *
 * Below 832px the five titles no longer share a line with the wordmark and the
 * controls, so they move into the settings disclosure. Both copies are in the
 * markup and CSS chooses — which is the right mechanism, and also the one that
 * fails silently: a rule edited above this breakpoint could leave both visible
 * (five links twice in the tab order) or neither (no navigation at all), and
 * the page would still build, still render, still pass every other test.
 */
test.describe("the nav fold", () => {
  const width = (w: number) => ({ width: w, height: 800 });

  for (const locale of ["en", "ar"]) {
    test(`${locale}: wide keeps the bar, narrow moves it into the settings`, async ({
      page,
    }) => {
      await page.setViewportSize(width(1200));
      await page.goto(`/${locale}/projects`);

      const bar = page.locator(".site-nav a");
      const panel = page.locator(".settings-nav a");

      /* Wide: the bar has them, and nothing was added to the disclosure. */
      await expect(bar.first()).toBeVisible();
      /**
       * `expect.poll`, NOT a one-shot `evaluateAll`.
       *
       * `setViewportSize` resolves before the renderer has necessarily
       * re-evaluated the media query and re-laid out, so reading visibility
       * once races the resize — this test failed on a different locale each
       * run until it retried. Playwright's own visibility assertions
       * auto-wait; a bare `evaluate` does not, and that difference is the
       * whole bug.
       */
      await expect
        .poll(() => panel.evaluateAll((els) => els.filter((e) => e.checkVisibility()).length))
        .toBe(0);

      /* Narrow: the bar's copy is gone from the accessibility tree entirely,
         not merely painted over — `display: none`, so `checkVisibility` is
         the right question and `getBoundingClientRect` would not be. */
      await page.setViewportSize(width(700));
      await expect
        .poll(() => bar.evaluateAll((els) => els.filter((e) => e.checkVisibility()).length))
        .toBe(0);

      await page.locator("details.settings > summary").click();
      await expect(panel.first()).toBeVisible();
      await expect(panel).toHaveCount(5);

      /* And it is no longer called Settings. Narrow, this control holds the
         five sections of the site, and nobody looks for Characters under
         Settings. The accessible name is the visible label. */
      /* `innerText`, not `toHaveText`. Both labels are in the markup and CSS
         shows one, so `textContent` reads "SettingsMenu" — the hidden word
         included. `innerText` is rendered text, which is the only kind a
         reader or a screen reader ever gets. */
      const shown = await page
        .locator("details.settings > summary")
        .innerText();
      expect(shown.toLowerCase()).not.toContain("settings");
      expect(shown.trim().length).toBeGreaterThan(0);

      /* Titles, then language, then theme, then spoilers — in that order. */
      const order = await page
        .locator(".settings-panel > *")
        .evaluateAll((els) =>
          els
            .filter((e) => e.checkVisibility())
            .map((e) => e.className.split(" ")[0]),
        );
      /* Sections, a heading that separates them from the switches, then
         language, theme, spoilers. The heading is part of the contract:
         `nav-hierarchy` says primary navigation and settings must not read as
         one undifferentiated stack. */
      expect(order).toEqual([
        "settings-nav",
        "settings-group-label",
        "locale-switch",
        "theme-switch",
        "shield-toggle",
      ]);

      /* Still a 44px target, which a link in a dropdown loses by default. */
      const heights = await panel.evaluateAll((els) =>
        els.map((e) => e.getBoundingClientRect().height),
      );
      /* Rounded: `min-block-size: 2.75rem` resolves to 43.99998px on some
         zoom levels, and a twenty-thousandth of a pixel is float noise, not a
         tap target that is too small. */
      for (const h of heights) expect(Math.round(h)).toBeGreaterThanOrEqual(44);
    });
  }
});

/**
 * THE SPINE DRAWS IN PROPORTION TO THE SPINE.
 *
 * `.thread-progress` is shared by the path pages and the saga timeline, and it
 * used to take its timeline from `scroll(root block)` on both. That is right
 * for a path — thread and page are the same length — and wrong here, where the
 * rail spans every saga and the document completes long before the reader does.
 * It filled almost at once and then held, which reads as a static red bar.
 *
 * A regression would look exactly like that again, and nothing else would fail:
 * the line is present, the page builds, every other test passes. So this
 * measures the one thing that actually broke — that dash offset moves DOWN as
 * you scroll, roughly linearly, rather than bottoming out at the top.
 */
test.describe("the saga spine", () => {
  test("draws against its own extent, not the document", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/en/universes/mcu/release/timeline");

    const supported = await page.evaluate(() =>
      CSS.supports("animation-timeline", "view()"),
    );
    test.skip(!supported, "no view timelines in this engine");

    const offsetAt = async (frac: number) => {
      /* `behavior: instant` because the document now scrolls smoothly, and a
         smooth scroll is still in flight when the measurement runs — the test
         was reading a position the page was on its way through. */
      await page.evaluate((f) => {
        window.scrollTo({
          top: (document.body.scrollHeight - innerHeight) * f,
          behavior: "instant",
        });
      }, frac);
      await page.waitForTimeout(220);
      return page.evaluate(() => {
        const el = document.querySelector(".saga-rail .thread-progress");
        return parseFloat(getComputedStyle(el!).strokeDashoffset);
      });
    };

    const top = await offsetAt(0);
    const mid = await offsetAt(0.5);
    const end = await offsetAt(1);

    /* Undrawn at the top, half drawn in the middle, complete at the bottom.
       The root-scroller bug put `top` near zero — already full before the
       reader had moved. */
    expect(top).toBeGreaterThan(0.8);
    expect(mid).toBeGreaterThan(0.3);
    expect(mid).toBeLessThan(0.7);
    expect(end).toBeLessThan(0.05);
  });
});
