import { readFileSync, existsSync } from "node:fs";
import { parse } from "node-html-parser";
import { describe, expect, it } from "vitest";
import { titles } from "@/content/build";
import { pathTo, recommendationsFor } from "@/lib/graph";
import { DEFAULT_LOCALE } from "@/lib/locales";

/**
 * Build-output smoke tests. These read the HTML that `npm run build` actually
 * emitted, not the React source.
 *
 * They exist because of a real failure: Next 15 made `params` a Promise, and
 * reading it synchronously made `pathTo` throw, so all 130 pages rendered as
 * notFound(). The build was green, the typecheck was clean, and every page was
 * empty. Nothing in the toolchain objected — it was only caught by dumping the
 * HTML by hand. A page that compiles, renders nothing, and exits zero must fail
 * a test rather than depend on someone remembering to look.
 *
 * Requires a prior `npm run build`. CI runs build before this suite.
 */

const OUT = new URL("../.next/server/app/", import.meta.url).pathname;
const built = existsSync(OUT);

/**
 * Routes live under `[locale]`. Callers pass a locale-less route and this adds
 * the default — so step 7 adding "ar" means asserting against a second locale,
 * not rewriting every path in this file.
 */
const routePath = (route: string) => `${OUT}${DEFAULT_LOCALE}/${route}`;
const html = (route: string) => readFileSync(`${routePath(route)}.html`, "utf8");

/**
 * Parse, don't pattern-match.
 *
 * Three consecutive failures in this file were in the extraction, not the app:
 * splitting on /<li[\s>]/ left `value="32">` glued to each item, React's SSR
 * `<!-- -->` separators broke text matching, and `&#x27;` went unescaped so an
 * assertion on "Marvel's Inhumans" silently matched nothing and reported
 * "expected undefined to be defined". Each regex fix was a new special case
 * waiting. A real parser retires the whole class.
 */
const dom = (route: string) => parse(html(route), { comment: false });

/** Visible text of the body, whitespace-collapsed. */
const text = (route: string) => {
  const body = dom(route).querySelector("body") ?? dom(route);
  for (const s of body.querySelectorAll("script")) s.remove();
  return body.structuredText.replace(/\s+/g, " ");
};

const title = (route: string) => dom(route).querySelector("title")?.innerHTML ?? "";

/** Each <li> as its own visible-text string, so assertions cannot leak across items. */
const listItems = (route: string) =>
  dom(route)
    .querySelectorAll("li")
    .map((li) => li.structuredText.replace(/\s+/g, " ").trim());

const countTag = (route: string, tag: string) => dom(route).querySelectorAll(tag).length;

/**
 * "· 0h" in either script.
 *
 * This was `/·\s*0h\b/`, and `\b` is ASCII-only — so the moment the Arabic
 * unit (س) rendered, the pattern could never match and a NEGATIVE assertion
 * guarding a stated product rule would have been permanently green. The
 * lookahead is the Unicode-safe boundary.
 */
const ZERO_RUNTIME = /·\s*0\s*(h|m|س|د)(?![\p{L}\p{N}])/u;

describe.skipIf(!built)("R. build output", () => {
  it("R0 the build actually emitted pages", () => {
    expect(existsSync(`${routePath("path/iron-man")}.html`)).toBe(true);
    expect(existsSync(`${routePath("path/deadpool-and-wolverine")}.html`)).toBe(true);
  });

  it("R1 the <title> is the real title, not 'Not found'", () => {
    // generateMetadata is a SEPARATE function from the page component and reads
    // `params` independently. Fixing one does not fix the other, and a wrong
    // <title> is invisible in a browser tab you are not looking at.
    expect(title("path/deadpool-and-wolverine")).toBe(
      "What to watch before Deadpool &amp; Wolverine · The Thread",
    );
    expect(title("path/iron-man")).toBe("What to watch before Iron Man · The Thread");
    expect(title("path/echo-s1")).toBe("What to watch before Echo: Season 1 · The Thread");
    for (const route of ["path/iron-man", "path/echo-s1", "path/spider-man-no-way-home"]) {
      expect(title(route)).not.toMatch(/not found/i);
    }
  });

  it("R2 the page renders the target title in its body", () => {
    expect(text("path/deadpool-and-wolverine")).toContain("Your path to Deadpool & Wolverine");
    expect(text("path/echo-s1")).toContain("Your path to Echo: Season 1");
  });

  it("R3 the Arabic title is present and marked as Arabic", () => {
    const raw = html("path/deadpool-and-wolverine");
    expect(raw).toContain("ديدبول وولفرين");
    expect(raw).toMatch(/lang="ar"/);
    expect(raw).toMatch(/dir="rtl"/);
  });

  it("R4 the thread has one panel per title, and one recommendation per rec", () => {
    /**
     * Scoped to the thread and the recommendation list rather than every <li>
     * on the page. The where-to-watch section is also a list, so a page-wide
     * count now measures streaming providers as well — which would make this
     * fail on a correct page, and a test that fails on correct data is the one
     * someone deletes.
     */
    for (const id of ["deadpool-and-wolverine", "spider-man-no-way-home", "echo-s1"]) {
      const d = dom(`path/${id}`);
      expect(d.querySelectorAll(".thread-panel").length, `${id} panels`).toBe(
        pathTo(titles, id, "minimum").length,
      );
      const recs = recommendationsFor(titles, id);
      if (recs.length > 0) {
        const list = d.querySelectorAll("ul")
          .filter((ul) => !ul.getAttribute("class")?.includes("wtw"))
          .find((ul) => ul.querySelectorAll("li").length === recs.length);
        expect(list, `${id} recommendations`).toBeDefined();
      }
    }
  });

  it("R5 a root title renders its own page, not an empty one", () => {
    const t = text("path/iron-man");
    expect(t).toContain("Your path to Iron Man");
    expect(t).toContain("Nothing to watch first");
    // One panel — the target itself. A root is its own path, not an empty page.
    expect(dom("path/iron-man").querySelectorAll(".thread-panel").length).toBe(1);
    /**
     * SCOPED TO THE THREAD, and it had to be.
     *
     * This counted every `<li>` on the page as a proxy for "one panel", which
     * held while the title page was a thread and nothing else. PRD v2 gave it a
     * cast rail, a character chip list and a poster gallery, all of them lists,
     * and the count went to 38 — a failure that says nothing about whether a
     * root title renders its own path.
     *
     * Counting the thread's own children measures the thing the test is named
     * after, and it keeps failing if the thread ever renders empty.
     */
    expect(
      dom("path/iron-man").querySelectorAll("ol.thread-list > li").length,
    ).toBe(1);
  });

  it("R6 the editor's note text is on the page, in both languages", () => {
    const raw = html("path/deadpool-and-wolverine");
    expect(raw).toContain("Before this one: the Deadpool films and Logan");
    expect(raw).toContain("قبل هذا الفيلم");
    expect(raw).toContain("Ed.");
  });

  it("R7 recommendations carry their transitive cost, not a bare bullet", () => {
    // The Inhumans finding, asserted against rendered output.
    const t = text("path/doctor-strange-in-the-multiverse-of-madness");
    expect(t).toContain("Marvel's Inhumans");
    expect(t).toMatch(/needs Agents of S\.H\.I\.E\.L\.D\..{0,80}first/);
  });

  it("R8 cost annotations attach to the right recommendation, and only there", () => {
    // Scoped per <li>: a regex spanning list items would happily match
    // "Blade …</li><li>… Blade II … needs Blade first" and prove nothing.
    const items = listItems("path/deadpool-and-wolverine");
    const find = (name: string) => items.find((li) => li.startsWith(name + " "));

    // Blade has no prerequisites of its own — it must not claim any.
    const blade = find("Blade");
    expect(blade).toBeDefined();
    expect(blade).not.toContain("needs");

    // Blade II needs exactly Blade; Trinity needs both earlier films.
    expect(find("Blade II")).toMatch(/needs Blade first/);
    expect(find("Blade: Trinity")).toMatch(/needs Blade, Blade II first/);
  });

  it("R8b every title full mode adds is either listed or named as a cost", () => {
    // Guards the gap between the headline count and the number of bullets:
    // Daredevil (2003) is not its own entry, it is Elektra's prerequisite.
    const id = "deadpool-and-wolverine";
    const min = new Set(pathTo(titles, id, "minimum").map((t) => t.id));
    const marginal = pathTo(titles, id, "full").filter((t) => !min.has(t.id));
    const rendered = text(`path/${id}`);
    for (const t of marginal) {
      expect(rendered, `${t.titleEn} is unaccounted for on the page`).toContain(t.titleEn);
    }
  });

  it("R12 a collapsed multi-season node shows its season count on its face", () => {
    // "Agents of S.H.I.E.L.D." beside "Blade" is a lie: one is 7 seasons and
    // the other is one film. The collapsed-range decision is right for the
    // graph and must not be invisible in the UI.
    const t = text("path/doctor-strange-in-the-multiverse-of-madness");
    expect(t).toMatch(/Agents of S\.H\.I\.E\.L\.D\..{0,40}7 seasons/);
  });

  it("R12b every multi-season node on a page carries its count", () => {
    const id = "doctor-strange-in-the-multiverse-of-madness";
    const rendered = text(`path/${id}`);
    const shown = [...pathTo(titles, id, "full")].filter((t) => t.seasons.length > 1);
    expect(shown.length).toBeGreaterThan(0);
    for (const t of shown) {
      expect(rendered, `${t.titleEn} missing its season count`).toMatch(
        new RegExp(`${t.seasons.length} seasons`),
      );
    }
  });

  it("R13 the cost annotation leads with size, not a bare title count", () => {
    // "1 title" for Agents of S.H.I.E.L.D. reads cheaper than "2 titles" for the
    // Blade films while costing roughly 25× the hours. Before sync the season
    // count is the only honest size signal, so it has to be present.
    /**
     * SCOPED TO THE RECOMMENDATION LIST, and it had to be.
     *
     * This scanned every `<li>` on the page for one starting with "Marvel's
     * Inhumans". That is a proxy, and it held only while the page had one list
     * of titles on it. The editor's note now renders the titles it names as
     * links — each an `<li>` — and one of those chips matched first, so the
     * test was asserting a cost annotation against a navigation chip.
     *
     * Same shape as the R5 failure: a page-wide `<li>` count standing in for a
     * specific list, breaking the moment the page grew a second one.
     */
    const items = dom("path/doctor-strange-in-the-multiverse-of-madness")
      .querySelectorAll(".rec-list > li")
      .map((li) => li.structuredText.replace(/\s+/g, " ").trim());
    const inhumans = items.find((li) => li.startsWith("Marvel's Inhumans"));
    expect(inhumans).toBeDefined();
    expect(inhumans).toMatch(/needs Agents of S\.H\.I\.E\.L\.D\. \(7 seasons\) first/);
    // RUNTIME leads. Agents of S.H.I.E.L.D. is ~99 hours; the whole point of
    // the annotation is that "1 title" would rank it below Blade's "2 titles".
    //
    // The separator was a long dash and is now a comma; the long dash is banned
    // in anything the reader sees. The separator is not what this test is
    // about, so it is matched loosely and the two claims that matter — hours
    // first, count second — are matched exactly as before.
    expect(inhumans).toMatch(/first,\s*~\d{2,3}h/);
    expect(inhumans).toMatch(/\(1 title, 7 seasons\)/);
    expect(inhumans).not.toMatch(/first,\s*1 title$/);
  });

  it("R14 the thread ships FULLY DRAWN in the static HTML", () => {
    // The base state must be complete-and-still, never absent. If a
    // stroke-dashoffset were baked into the markup, every reduced-motion user
    // and every browser without scroll timelines would see the signature
    // element looking broken rather than simply not animating.
    const progress = dom("path/deadpool-and-wolverine").querySelectorAll(".thread-progress");
    expect(progress.length).toBeGreaterThan(0);
    for (const line of progress) {
      expect(line.getAttribute("stroke-dashoffset")).toBeUndefined();
      expect(line.getAttribute("style") ?? "").not.toMatch(/dashoffset/);
      // pathLength normalises the dash maths for the CSS enhancement, but on
      // its own it hides nothing.
      expect(line.getAttribute("pathLength")).toBe("1");
    }
  });

  it("R14b the rail is decoration — aria-hidden and outside the accessible tree", () => {
    const rail = dom("path/deadpool-and-wolverine").querySelector(".thread-rail");
    expect(rail).not.toBeNull();
    expect(rail!.getAttribute("aria-hidden")).toBe("true");
    expect(rail!.getAttribute("focusable")).toBe("false");
  });

  it("R14c the order still lives in an <ol>, not in the thread", () => {
    // The guard against restyling the list into divs for grid placement. Grid
    // can position <li> elements; the order must never move into the
    // decoration, because the decoration is aria-hidden.
    const d = dom("path/deadpool-and-wolverine");
    const lists = d.querySelectorAll("ol.thread-list");
    expect(lists.length).toBeGreaterThan(0);
    for (const ol of lists) {
      expect(ol.querySelectorAll("li").length).toBeGreaterThan(0);
    }
  });

  it("R14d panel state is data attributes, so DOM order carries no styling duty", () => {
    const d = dom("path/deadpool-and-wolverine");
    const optional = d.querySelectorAll('.thread-panel[data-optional="true"]');
    const branch = d.querySelectorAll('.thread-panel[data-branch="true"]');
    // Deadpool & Wolverine's path runs through Fox, so both exist here.
    expect(branch.length).toBeGreaterThan(0);
    expect(optional.length + branch.length).toBeGreaterThan(0);
  });

  it("R15 the <ol> carries role=\"list\" — this is NOT redundant ARIA", () => {
    // Safari with VoiceOver drops list semantics entirely when `list-style` is
    // `none`: no "list, 34 items", no "item 3 of 34". The premise of the whole
    // Thread component is that the order lives in the <ol> rather than in the
    // decoration, and that premise is FALSE in Safari without this attribute.
    // It looks redundant. It will get deleted by someone tidying up. Hence this.
    for (const ol of dom("path/deadpool-and-wolverine").querySelectorAll("ol.thread-list")) {
      expect(ol.getAttribute("role")).toBe("list");
    }
  });

  it("R16 no inline style carries data or layout — only next/image cosmetics", () => {
    /**
     * The rule this protects is narrower than "no style attributes", because
     * next/image emits one and we do not control it.
     *
     * What matters is that no inline style is LOAD-BEARING. CSP nonces do not
     * cover style attributes — `style-src` without `unsafe-inline` blocks them —
     * and the failure is silent: the desktop layout once depended on
     * `style={{ "--n": value }}` and would have collapsed to side-by-side panels
     * the day the CSP landed. Poster tints ship as a generated stylesheet for
     * the same reason.
     *
     * next/image is given explicit width/height rather than `fill` precisely so
     * its inline style is `color:transparent` — cosmetic. Blocked, nothing moves.
     */
    for (const id of ["deadpool-and-wolverine", "iron-man", "echo-s1"]) {
      for (const el of dom(`path/${id}`).querySelectorAll("[style]")) {
        const style = el.getAttribute("style") ?? "";
        expect(
          el.tagName.toLowerCase(),
          `${id}: only <img> may carry an inline style, found <${el.tagName.toLowerCase()}>`,
        ).toBe("img");
        // Cosmetic only. Anything positional would break under a strict CSP.
        expect(style, `${id}: img inline style is load-bearing`).not.toMatch(
          /position|top|left|right|bottom|width|height|grid|--/,
        );
      }
    }
  });

  it("R20 poster tints ship as a stylesheet, never as inline styles", () => {
    // `.poster` reads --poster-tint, which is per-title. The obvious delivery is
    // style="--poster-tint:#4a1d1d" — the same trap as the grid-row inline style
    // already removed from ThreadPanel, and with a nastier failure: under a CSP
    // without `unsafe-inline` the layout would not break, it would silently
    // become 130 identical grey boxes, cancelling the whole §14.4 strategy.
    const css = readFileSync(new URL("../app/poster-tints.css", import.meta.url).pathname, "utf8");
    const rules = css.match(/\[data-tint="[^"]+"\]\s*\{\s*--poster-tint:\s*#[0-9a-f]{6};?\s*\}/g) ?? [];
    expect(rules.length).toBeGreaterThan(120);

    // Every title with a poster has a rule, and every rule names a real title.
    const withPoster = titles.filter((t) => t.tmdbId !== null).map((t) => t.id);
    const ids = new Set(css.match(/data-tint="([^"]+)"/g)?.map((m) => m.slice(11, -1)) ?? []);
    for (const id of withPoster) expect(ids.has(id), `${id} has no tint rule`).toBe(true);
    for (const id of ids) expect(titles.some((t) => t.id === id), `${id} is not a title`).toBe(true);
  });

  it("R20b the tints are real colours, not 130 copies of the fallback", () => {
    // If sharp had failed silently every value would be the neutral fallback and
    // the placeholder strategy would be grey boxes with extra steps.
    const css = readFileSync(new URL("../app/poster-tints.css", import.meta.url).pathname, "utf8");
    const colours = new Set(css.match(/#[0-9a-f]{6}/g) ?? []);
    expect(colours.size).toBeGreaterThan(100);
  });

  it("R17 both title runs are bidi-isolated, not only the Arabic", () => {
    // Isolating only Arabic works today and breaks at step 7: in the AR locale
    // the page becomes dir="rtl" and the ENGLISH titles hit the mirror of the
    // same bug, flying to the opposite edge of every panel.
    const d = dom("path/deadpool-and-wolverine");
    const en = d.querySelectorAll('bdi[lang="en"]');
    const ar = d.querySelectorAll('bdi[lang="ar"]');
    expect(en.length).toBeGreaterThan(0);
    expect(ar.length).toBeGreaterThan(0);

    // Every panel title, in both scripts, is inside a <bdi>.
    for (const panel of d.querySelectorAll(".thread-panel")) {
      expect(panel.querySelectorAll('bdi[lang="en"]').length, "en title").toBeGreaterThan(0);
      expect(panel.querySelectorAll('bdi[lang="ar"]').length, "ar title").toBeGreaterThan(0);
    }
  });

  it("R17b no title block carries a hardcoded dir attribute", () => {
    // A `dir` on the block flips what start/end mean FOR THAT BLOCK, which is
    // what flung the Arabic to the far edge. Direction belongs on <html>.
    for (const el of dom("path/deadpool-and-wolverine").querySelectorAll(
      ".panel-title, .panel-title-ar",
    )) {
      expect(el.getAttribute("dir")).toBeUndefined();
    }
  });

  it("R18 a path page has exactly ONE thread and ONE list", () => {
    // An earlier version rendered a second <Thread> for the target under a
    // "Then" heading. That broke the signature element three ways: the
    // continuous line became two lines with a heading between them, screen
    // readers announced "list, 33 items" then "list, 1 item", and :nth-child
    // parity reset so the target always landed in the left column — at exactly
    // the most important row.
    for (const id of ["deadpool-and-wolverine", "iron-man", "echo-s1"]) {
      const d = dom(`path/${id}`);
      expect(d.querySelectorAll(".thread-wrap").length, `${id} thread-wrap`).toBe(1);
      expect(d.querySelectorAll("ol.thread-list").length, `${id} thread-list`).toBe(1);
      expect(d.querySelectorAll(".thread-rail").length, `${id} rail`).toBe(1);
    }
  });

  it("R18b the whole minimum path is in that one list, target last", () => {
    for (const id of ["deadpool-and-wolverine", "echo-s1"]) {
      const min = pathTo(titles, id, "minimum");
      const panels = dom(`path/${id}`).querySelectorAll(".thread-panel");
      expect(panels.length, id).toBe(min.length);

      const last = panels.at(-1)!;
      expect(last.getAttribute("data-target")).toBe("true");
      expect(last.structuredText).toContain(min.at(-1)!.titleEn);

      // And only the last one is the target.
      expect(
        panels.filter((p) => p.getAttribute("data-target") === "true").length,
        `${id} target count`,
      ).toBe(1);
    }
  });

  it("R19 the visible ordinal is hidden from the accessibility tree", () => {
    // With role="list" restored, VoiceOver already announces "item 3 of 34".
    // The "#003" is a visual restatement of that position; reading it as
    // content makes every row say its number twice.
    const indices = dom("path/deadpool-and-wolverine").querySelectorAll(".panel-index");
    expect(indices.length).toBeGreaterThan(0);
    for (const el of indices) {
      expect(el.getAttribute("aria-hidden")).toBe("true");
    }
  });

  it("R9 runtimes render as real figures, never as a confident zero", () => {
    for (const route of ["path/iron-man", "path/deadpool-and-wolverine"]) {
      const t = text(route);
      // A real total, e.g. "2h 06m" or "48h 09m".
      expect(t, route).toMatch(/\d+h(\s\d{2}m)?/);
      expect(t, route).not.toMatch(ZERO_RUNTIME);
      expect(t, route).not.toContain("not yet synced");
    }
  });

  it("R9b a title TMDB could not match degrades quietly, not loudly", () => {
    // Elektra (The Hand & The Devil) has no TMDB record. Its page must still
    // render — no "0h", no NaN, no broken layout.
    const t = text("path/elektra-the-hand-and-the-devil");
    expect(t).toContain("Your path to Elektra");
    expect(t).not.toMatch(/NaN|undefined/);
    expect(t).not.toMatch(ZERO_RUNTIME);
  });

  it("R10 the legal footer is on every page", () => {
    for (const route of ["path/iron-man", "index"]) {
      if (!existsSync(`${routePath(route)}.html`)) continue;
      expect(text(route)).toContain("Not affiliated with or endorsed by Marvel Studios");
    }
  });

  it("R11 no page ships an unresolved React error boundary", () => {
    for (const id of titles.slice(0, 20).map((t) => t.id)) {
      const raw = html(`path/${id}`);
      expect(raw, id).not.toMatch(/Application error|digest.{0,10}NEXT_NOT_FOUND/);
      expect(raw.length, `${id} is suspiciously small`).toBeGreaterThan(2000);
    }
  });
});

describe.skipIf(built)("R. build output (skipped)", () => {
  it("run `npm run build` first to enable these", () => {
    expect(built).toBe(false);
  });
});

describe("R. tabular discipline", () => {
  it("R21 no .tabular span contains Arabic — Plex Mono has no Arabic coverage", () => {
    /**
     * `.tabular` is `--font-mono` (IBM Plex Mono), which covers no Arabic. A
     * tabular span holding Arabic renders its digits in Plex and its words in a
     * fallback: a mixed-font phrase, on every row of every AR page. That is what
     * happened when the runtime was `.tabular` and became
     * "ساعة واحدة و44 دقيقة".
     *
     * A CSS `:lang(ar)` override cannot fix it, because `lang` is inherited from
     * <html> and the rule would strip mono from the year and the index too. So
     * the rule is: `.tabular` holds numerals. Asserted, not hoped for.
     *
     * THE ROUTE LIST GREW, and it grew because this test failed to fire. The
     * design pass put a three-node thread slice on the homepage and wrapped its
     * runtime in `.tabular`, reintroducing the exact defect above. Every test
     * here passed, because the list was two path routes and the homepage was
     * not one of them. It was caught by looking at an Arabic screenshot.
     *
     * Any route that renders a runtime belongs in this list.
     */
    for (const locale of ["en", "ar"]) {
      for (const route of [
        "path/deadpool-and-wolverine",
        "path/echo-s1",
        // The homepage emits as `en.html`, not `en/index.html`.
        "",
        "universes/mcu/release/timeline",
        "universes/x-men",
      ]) {
        const file = route ? `${OUT}${locale}/${route}.html` : `${OUT}${locale}.html`;
        const d = parse(readFileSync(file, "utf8"), { comment: false });
        for (const el of d.querySelectorAll(".tabular")) {
          expect(el.structuredText, `${locale}/${route}: .tabular holds Arabic`).not.toMatch(
            /[؀-ۿ]/u,
          );
        }
      }
    }
  });

  it("R21b the runtime is NOT tabular, and the year still is", () => {
    const d = parse(readFileSync(`${OUT}ar/path/deadpool-and-wolverine.html`, "utf8"), {
      comment: false,
    });
    const runtimes = d.querySelectorAll(".runtime");
    expect(runtimes.length).toBeGreaterThan(0);
    for (const el of runtimes) {
      expect(el.getAttribute("class")).not.toMatch(/tabular/);
    }
    // The year keeps mono: Latin digits in a column.
    expect(d.querySelectorAll(".panel-meta .tabular").length).toBeGreaterThan(0);
  });
});

describe("P. posters — §14, asserted as written", () => {
  const routes = ["path/deadpool-and-wolverine", "universes/all", "universes/x-men"];

  it("P1 every poster box reserves 2:3 and carries a tint key", () => {
    // aspect-ratio on the box is what keeps CLS < 0.1; data-tint is what lets
    // the dominant colour arrive from a stylesheet rather than an inline style.
    for (const locale of ["en", "ar"]) {
      for (const route of routes) {
        const d = parse(readFileSync(`${OUT}${locale}/${route}.html`, "utf8"), { comment: false });
        const posters = d.querySelectorAll(".poster");
        expect(posters.length, `${locale}/${route}`).toBeGreaterThan(0);
        for (const p of posters) {
          expect(p.getAttribute("data-tint"), `${locale}/${route}`).toBeTruthy();
        }
      }
    }
  });

  it("P2 every data-tint has a rule in the generated stylesheet, or no poster", () => {
    const css = readFileSync(new URL("../app/poster-tints.css", import.meta.url).pathname, "utf8");
    const d = parse(readFileSync(`${OUT}en/universes/all.html`, "utf8"), { comment: false });
    for (const p of d.querySelectorAll(".poster")) {
      const id = p.getAttribute("data-tint")!;
      const hasImage = p.querySelectorAll("img").length > 0;
      if (hasImage) expect(css, `no tint rule for ${id}`).toContain(`[data-tint="${id}"]`);
    }
  });

  it("P3 exactly ONE priority image per page", () => {
    // `priority` is a <link rel=preload>. Eight of them compete with the CSS
    // and the fonts and make LCP worse, which is why §14.5 says one.
    for (const locale of ["en", "ar"]) {
      const title = parse(readFileSync(`${OUT}${locale}/path/deadpool-and-wolverine.html`, "utf8"));
      const preloads = title
        .querySelectorAll("link[rel=preload]")
        .filter((l) => (l.getAttribute("as") ?? "") === "image");
      expect(preloads.length, `${locale} title page`).toBe(1);

      // The 130-panel order page preloads nothing at all.
      const order = parse(readFileSync(`${OUT}${locale}/universes/all.html`, "utf8"));
      const orderPreloads = order
        .querySelectorAll("link[rel=preload]")
        .filter((l) => (l.getAttribute("as") ?? "") === "image");
      expect(orderPreloads.length, `${locale} order page`).toBe(0);
    }
  });

  it("P4 every non-priority poster is lazy", () => {
    const d = parse(readFileSync(`${OUT}en/universes/all.html`, "utf8"), { comment: false });
    const imgs = d.querySelectorAll(".poster img");
    expect(imgs.length).toBeGreaterThan(50);
    for (const img of imgs) {
      expect(img.getAttribute("loading"), "a poster on a 130-item list is eager").toBe("lazy");
    }
  });

  it("P5 every poster declares sizes at all", () => {
    /**
     * Presence only. Whether `sizes` MATCHES the rendered box cannot be checked
     * from the DOM — the first version declared 45vw for a box that renders at
     * 34vw and sailed through the old version of this test, which asked only
     * that the attribute exist and mention max-width.
     *
     * The real check measures, and lives in e2e/posters.spec.ts.
     */
    const d = parse(readFileSync(`${OUT}en/universes/all.html`, "utf8"), { comment: false });
    for (const img of d.querySelectorAll(".poster img")) {
      /**
       * `sizes` OR A WIDTH BAKED INTO THE URL — two mechanisms, one job.
       *
       * `sizes` only means anything alongside a `srcset`, and an `unoptimized`
       * image has neither: Next omits both. TMDB posters are now unoptimized
       * on purpose, because their CDN publishes each poster at fixed widths
       * and `SOURCE[size]` already asks for the right one — the responsive
       * decision moved from the browser to the server, and the 5,000
       * transformations it used to cost went with it.
       *
       * So the rule becomes: a poster must declare how wide it wants to be,
       * by one route or the other. A bare `<img>` with neither still fails.
       */
      const src = img.getAttribute("src") ?? "";
      /**
       * Three ways a poster can settle its width, and the third is a fixed
       * asset. A couple of titles supply an absolute poster URL by hand
       * because no service has a record of them — those hosts publish one
       * size, so there is no width to declare anywhere. What still fails is a
       * poster with none of the three: no `sizes`, no width in the path, and
       * not a hand-supplied file.
       */
      const HAND_SUPPLIED = /^https:\/\/(?!image\.tmdb\.org)/;
      const declaresWidth =
        /\/t\/p\/w\d+\//.test(src) ||
        /[?&]w=\d+/.test(src) ||
        HAND_SUPPLIED.test(src);
      expect(
        Boolean(img.getAttribute("sizes")) || declaresWidth,
        `neither sizes nor a width in the URL: ${src.slice(0, 90)}`,
      ).toBe(true);
    }
  });

  it("P6 no poster box is empty — an image or the typographic card, never neither", () => {
    /**
     * §14.7 — the gap is designed.
     *
     * THIS ASSERTION HAS NOW MOVED TWICE, and the second move is the
     * interesting one. It first read /universes/all and broke when that route
     * became the MCU timeline, where all 72 titles have posters. Repointed at
     * /projects it caught a real bug: that grid renders its own <img> and was
     * drawing an empty tinted box instead of the card.
     *
     * Then the premise disappeared. It counted `.poster-fallback` and required
     * at least one, and the one title that needed it — Elektra: The Hand & the
     * Devil, which no service has a record of — was given a hand-authored
     * poster URL. Zero fallbacks on the page, red test, nothing broken.
     *
     * So it asserts the INVARIANT instead of the instance: every poster box
     * resolves to something a reader can see. That stays true at zero
     * fallbacks and at fifty, it still catches the empty-coloured-box
     * regression, and it does not go red the next time a poster is found for
     * something. Where a card IS rendered its own guarantees still hold.
     */
    const d = parse(readFileSync(`${OUT}en/projects.html`, "utf8"), { comment: false });
    const boxes = d.querySelectorAll(".poster");
    expect(boxes.length).toBeGreaterThan(100);
    for (const box of boxes) {
      const img = box.querySelector("img");
      const card = box.querySelector(".poster-fallback");
      const id = box.getAttribute("data-tint");
      expect(Boolean(img) || Boolean(card), `empty poster box for ${id}`).toBe(true);
      if (img) expect(img.getAttribute("src") ?? "", `empty src for ${id}`).not.toBe("");
      if (card) {
        expect(card.getAttribute("aria-hidden")).toBe("true");
        expect(card.structuredText.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("P7 poster alt is empty — the title beside it is the accessible name", () => {
    // A poster repeated as alt text makes every row announce its title twice.
    const d = parse(readFileSync(`${OUT}en/universes/all.html`, "utf8"), { comment: false });
    for (const img of d.querySelectorAll(".poster img")) {
      expect(img.getAttribute("alt")).toBe("");
    }
  });

  it("P8 container-type is on the card wrapper, never on .thread-panel", () => {
    // Containment establishes a containing block: on .thread-panel the ::before
    // node and ::after connector would position against the card and the thread
    // geometry would silently detach.
    const css = readFileSync(new URL("../app/globals.css", import.meta.url).pathname, "utf8");
    const panelRules = css.match(/\.thread-panel\s*\{[^}]*\}/g) ?? [];
    for (const rule of panelRules) {
      expect(rule, ".thread-panel must not establish containment").not.toMatch(/container-type/);
    }
    expect(css).toMatch(/\.panel-card\s*\{[^}]*container-type:\s*inline-size/);
  });
});
