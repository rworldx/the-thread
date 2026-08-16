import { describe, expect, it } from "vitest";
import { titles } from "@/content/titles";
import { isSynced, syncSummary, titles as shipped } from "@/content/build";
import {
  curatedOrder,
  essentialsOrder,
  pathTo,
  releaseOrder,
} from "@/lib/graph";
import { schedule } from "@/lib/runtime";
import { sagaGroups } from "@/lib/saga";
import { membersOf } from "@/lib/collections";
import { visibleLength } from "@/content/schema";

describe("F. regression guards on the real corpus", () => {
  it("F21 the MCU timeline and the MCU collection are the same list", () => {
    /**
     * TWO DEFINITIONS OF THE MCU ORDER, DISAGREEING.
     *
     * `sagaGroups` filtered on `universe === "mcu"` and nothing else, while
     * `membersOf("mcu")` also dropped the five Marvel One-Shots. So the
     * timeline drew 72 titles and the collection page said 67 — the same list,
     * on two pages, off by five, with "Item 47" sitting on an eighteen-year
     * spine as though four minutes of disc extra were a step between two films.
     *
     * They read one rule now. This asserts they still do, and it fails on a
     * drift of one rather than waiting for someone to notice a count.
     */
    const timeline = sagaGroups(titles).flatMap((s) => s.phases.flatMap((p) => p.titles));
    const collection = membersOf("mcu");
    expect(timeline.map((t) => t.id).sort()).toEqual(collection.map((t) => t.id).sort());
    expect(timeline.filter((t) => t.type === "short")).toEqual([]);
    /* The One-Shots are not deleted — they keep their pages and stay in the
       catalogue. Out of the ORDER, not out of the site. */
    expect(titles.filter((t) => t.universe === "mcu" && t.type === "short").length).toBe(5);
  });

  it("F1 node count is stable — adding a title is a deliberate diff", () => {
    expect(titles).toHaveLength(216);
  });

  it("F1b universe distribution is stable", () => {
    /**
     * `marvel-tv` was carved out of `mcu` and it is a correction, not a
     * reshuffle. Agents of S.H.I.E.L.D., Agent Carter, Inhumans, Runaways and
     * Cloak & Dagger were made by Marvel TELEVISION for ABC, Freeform and Hulu.
     * Marvel Television was a different company under a different executive; it
     * was absorbed into Marvel Studios in late 2019 and its shows lost canon
     * status. Filing them beside Endgame told a beginner something false about
     * what they needed to watch, which is the one thing this site exists not to
     * do.
     *
     * The Gifted and Legion stay in `fox`: same company, different rights.
     */
    const counts = titles.reduce<Record<string, number>>((acc, t) => {
      acc[t.universe] = (acc[t.universe] ?? 0) + 1;
      return acc;
    }, {});
    expect(counts).toEqual({
      mcu: 74,
      sony: 15,
      fox: 18,
      defenders: 13,
      /* +3: M.O.D.O.K. and the two Hit-Monkey seasons, the Hulu adult
         animations that had been missing entirely. */
      "marvel-tv": 9,
      legacy: 31,
      animation: 56,
    });
  });

  it("F2 the spine is exactly the 22 titles the homepage promises", () => {
    // The two-doors card says "22 titles". If this number moves, the copy moves
    // with it — the headline and the list cannot be allowed to disagree.
    expect(essentialsOrder(titles)).toHaveLength(22);
  });

  it("F2b the spine runs Iron Man → Far From Home", () => {
    const spine = essentialsOrder(titles);
    expect(spine[0]!.id).toBe("iron-man");
    expect(spine.at(-1)!.id).toBe("spider-man-far-from-home");
  });

  it("F3 ids are stable — an id is a public URL, renaming one breaks a link", () => {
    expect([...titles.map((t) => t.id)].sort()).toMatchSnapshot();
  });

  it("F4 seven editor's notes: four source markers, She-Hulk, and two from the marvel-tv split", () => {
    // Five of these predate the split. The sixth and seventh arrived with it:
    // Agents of S.H.I.E.L.D. requires The Winter Soldier and Agent Carter
    // requires The First Avenger, and both of those edges now cross a universe
    // boundary that did not exist while the shows were filed as `mcu`. B11
    // caught them the moment the enum changed, which is the rule working.
    //
    // Seven is still few. If every edge produced a box it would become
    // wallpaper and stop meaning "detour ahead".
    const noted = titles.filter((t) => t.editorNote !== null).map((t) => t.id);
    expect(noted.sort()).toEqual([
      "agent-carter",
      "agents-of-shield",
      "deadpool-and-wolverine",
      "doctor-strange-in-the-multiverse-of-madness",
      "echo-s1",
      "she-hulk-attorney-at-law-s1",
      "spider-man-no-way-home",
    ]);
  });

  it("F4b every cross-universe edge in the corpus is explained, and no other", () => {
    // The iff, asserted against the real data rather than a fixture.
    const byId = new Map(titles.map((t) => [t.id, t]));
    for (const t of titles) {
      const crosses = [...t.requires, ...t.enriches].some(
        (r) => byId.get(r)!.universe !== t.universe,
      );
      expect(
        t.editorNote !== null,
        `${t.id}: note=${t.editorNote !== null} cross=${crosses}`,
      ).toBe(crosses);
    }
  });

  it("F5 every editor's note is genuinely bilingual", () => {
    for (const t of titles) {
      if (!t.editorNote) continue;
      expect(t.editorNote.en.length).toBeGreaterThan(10);
      expect(t.editorNote.ar).toMatch(/[؀-ۿ]/);
      // Catches the Latin-in-Arabic slip that survives a casual read.
      expect(t.editorNote.ar).not.toMatch(/[a-zA-Z]{3,}/);
    }
  });

  it("F5b every Arabic title is in Arabic script", () => {
    for (const t of titles) {
      expect(t.titleAr, `${t.id} titleAr`).toMatch(/[؀-ۿ]/);
      expect(t.titleAr, `${t.id} titleAr has Latin text`).not.toMatch(
        /[a-zA-Z]{3,}/,
      );
    }
  });

  it("F6 the Fox universe is fully ranked, so its story toggle can be shown", () => {
    const fox = curatedOrder(titles, "fox");
    expect(fox).not.toBeNull();
    expect(fox).toHaveLength(18);
  });

  it("F6b the Fox curated order is by events, not release — that is the point", () => {
    const fox = curatedOrder(titles, "fox")!.map((t) => t.id);
    const xmenBlock = fox.slice(3, 7);
    expect(xmenBlock).toEqual([
      "x-men-first-class",
      "x-men-origins-wolverine",
      "x-men",
      "x2",
    ]);

    // The same four in release order come out differently. If these ever match,
    // the curated order has silently collapsed into the derived one.
    const byRelease = releaseOrder(
      titles.filter((t) => xmenBlock.includes(t.id)),
    ).map((t) => t.id);
    expect(byRelease).toEqual([
      "x-men",
      "x2",
      "x-men-origins-wolverine",
      "x-men-first-class",
    ]);
    expect(byRelease).not.toEqual(xmenBlock);
  });

  it("F6c every other universe is unranked, so no partial toggle can render", () => {
    for (const u of [
      "mcu",
      "sony",
      "defenders",
      "legacy",
      "animation",
    ] as const) {
      expect(curatedOrder(titles, u)).toBeNull();
    }
  });

  it("F8 no title bakes its season range into its name", () => {
    // `seasons` is the single source of truth for size. If the name also
    // carries it, the two can drift, and the UI renders "Seasons 1–7
    // (7 seasons)". A single-season node may still say "Season 1", because
    // that is what distinguishes Loki S1 from Loki S2.
    for (const t of titles) {
      if (t.seasons.length > 1) {
        expect(t.titleEn, `${t.id}`).not.toMatch(
          /Seasons?\s*\d+\s*[–-]\s*\d+/i,
        );
        expect(t.titleAr, `${t.id}`).not.toMatch(/\d+\s*[–-]\s*\d+/);
      }
    }
  });

  it("F8b every title is distinguishable from every other", () => {
    // Dropping the range suffixes could have collided "Spider-Man" (2002) with
    // the 2017 animated series. Years stay where they do the disambiguating.
    const names = titles.map((t) => t.titleEn);
    const dupes = names.filter((n, i) => names.indexOf(n) !== i);
    // Fantastic Four 2005 and 2015 genuinely share a name; nothing else may.
    expect([...new Set(dupes)]).toEqual([
      /* Two Ghost Riders now: the 2007 Nicolas Cage film and the 2028 Marvel
         Studios one announced at Comic-Con. Same allowance as Fantastic Four,
         which has three — a repeated title is a fact about Hollywood, and the
         year beside it on every card is what tells them apart. */
      "Fantastic Four",
      "Ghost Rider",
    ]);
  });

  it("F7 the authored corpus never carries machine-fetched facts", () => {
    // titles.ts is hand-written and stays that way. Runtimes arrive by merge,
    // not by editing this file — asserting on it would pass vacuously forever.
    expect(titles.every((t) => t.runtimeMin === null)).toBe(true);
  });

  it("F7b the shipped corpus reflects whether sync has run", () => {
    const s = syncSummary();
    expect(s.total).toBe(titles.length);
    if (isSynced) {
      // Post-sync: runtimes are real, and the page stops saying "not yet synced".
      expect(s.withRuntime).toBeGreaterThan(s.total * 0.9);

      // Every title TMDB actually matched gets a full-precision date. The ones
      // it did not keep the authored year — see F7d.
      const matched = shipped.filter((t) => t.tmdbId !== null);
      expect(matched.length).toBeGreaterThan(s.total * 0.9);
      for (const t of matched) {
        expect(t.releaseDate, `${t.id}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    } else {
      expect(s.withRuntime).toBe(0);
    }
  });

  it("F7d unmatched titles are named, not silently absent", () => {
    // Elektra (The Hand & The Devil) is a rumoured project with no TMDB record.
    // That is a legitimate null and §14.7's typographic-fallback case — but it
    // must be a KNOWN null, so a future title quietly failing to match cannot
    // hide among them.
    const unmatched = shipped.filter((t) => t.tmdbId === null).map((t) => t.id);
    expect(unmatched).toEqual(
      isSynced ? ["elektra-the-hand-and-the-devil"] : shipped.map((t) => t.id),
    );
  });

  it("F7e every season of a show resolves to ONE TMDB record", () => {
    // Season nodes carry the season's year, not the show's, so searching with a
    // year filter matched "Jurassic What If…?" for What If season 2 and put
    // Daredevil seasons 2 and 3 on two entirely different series.
    if (!isSynced) return;
    const byShow = new Map<string, Set<number | null>>();
    for (const t of shipped) {
      if (!t.showId) continue;
      if (!byShow.has(t.showId)) byShow.set(t.showId, new Set());
      byShow.get(t.showId)!.add(t.tmdbId);
    }
    const split = [...byShow]
      .filter(([, ids]) => ids.size > 1)
      .map(([show]) => show);
    expect(split).toEqual([]);
  });

  it("F7f the spine really is the 48 hours the copy promises", () => {
    // Brief §12: "Start here. 22 titles, about 48 hours." That claim was
    // unverified for nine commits because no runtime existed to check it with.
    if (!isSynced) return;
    const hours =
      essentialsOrder(shipped).reduce((n, t) => n + (t.runtimeMin ?? 0), 0) /
      60;
    expect(hours).toBeGreaterThan(45);
    expect(hours).toBeLessThan(51);
  });

  it("F9 the TMDB overview seeds context, NEVER spoilerSafe", () => {
    // The regression that matters most. `spoilerSafe` is shown ALWAYS, shield up
    // or down; an overview is a marketing synopsis that gives the premise away.
    // Seeding it there switched the spoiler shield off by default for every
    // matched title, silently, while every test stayed green.
    if (!isSynced) return;
    // Every spoilerSafe comes from copy.ts, and none matches its own overview.
    // Checked per language: a context override may name only one, and after the
    // Arabic review the Arabic side is the one carrying hand-authored text.
    for (const t of shipped) {
      if (!t.spoilerSafe || !t.context) continue;
      for (const lang of ["en", "ar"] as const) {
        const ctx = t.context[lang];
        if (!ctx) continue;
        expect(ctx, `${t.id} ${lang} spoilerSafe is its context`).not.toBe(
          t.spoilerSafe[lang],
        );
        expect(
          ctx.length,
          `${t.id} ${lang} context is not longer`,
        ).toBeGreaterThan(t.spoilerSafe[lang].length);
      }
    }
    expect(shipped.filter((t) => t.context !== null).length).toBeGreaterThan(
      100,
    );
  });

  it("F11 every title has a spoiler-safe line, in both languages", () => {
    for (const t of shipped) {
      expect(t.spoilerSafe, `${t.id} has no spoiler-safe line`).not.toBeNull();
      expect(t.spoilerSafe!.ar, `${t.id} ar`).toMatch(/[؀-ۿ]/);
      expect(t.spoilerSafe!.ar, `${t.id} ar has Latin runs`).not.toMatch(
        /[a-zA-Z]{3,}/,
      );
    }
  });

  it("F11b no line names another title — no cross-references", () => {
    // The rule that catches "leads into Endgame". Enforced in lib/validate.ts
    // as B19; asserted here against the real corpus as well.
    const works = shipped.filter((t) => t.titleEn.includes(" "));
    for (const t of shipped) {
      if (!t.spoilerSafe) continue;
      for (const w of works) {
        if (w.id === t.id) continue;
        expect(t.spoilerSafe.en, `${t.id} names "${w.titleEn}"`).not.toContain(
          w.titleEn,
        );
        expect(t.spoilerSafe.ar, `${t.id} names "${w.titleEn}"`).not.toContain(
          w.titleEn,
        );
      }
    }
  });

  it("F11c lines stay short enough to read at a glance", () => {
    // Measured in VISIBLE characters, not UTF-16 code units: `.length` charges
    // Arabic for every diacritic, so a fully-voweled line could fail the cap
    // while being visually shorter than its English counterpart.
    for (const t of shipped) {
      if (!t.spoilerSafe) continue;
      expect(visibleLength(t.spoilerSafe.en), `${t.id} en`).toBeLessThanOrEqual(
        90,
      );
      expect(visibleLength(t.spoilerSafe.ar), `${t.id} ar`).toBeLessThanOrEqual(
        90,
      );
    }
  });

  it("F11d the cap does not charge Arabic for its diacritics", () => {
    // A fully-voweled line is visually shorter than the same words unvoweled
    // are long — but `.length` says the opposite. If this ever fails, the cap
    // has quietly become two different rules.
    const voweled =
      "جُنْدِيٌّ خَارِجَ زَمَنِهِ، وَشَبَحٌ لَا يَعْرِفُ أَحَدٌ هُوِيَّتَهُ.";
    expect(voweled.length).toBeGreaterThan(visibleLength(voweled));
    expect(visibleLength(voweled)).toBeLessThanOrEqual(90);
  });

  it("F9b no spoilerSafe line is long enough to be a synopsis", () => {
    for (const t of shipped) {
      if (!t.spoilerSafe) continue;
      expect(t.spoilerSafe.en.length, `${t.id} en`).toBeLessThanOrEqual(120);
      expect(t.spoilerSafe.ar.length, `${t.id} ar`).toBeLessThanOrEqual(120);
    }
  });

  it("F10 the over-budget flag stays rare enough to mean something", () => {
    // At budget+1 the flag fired on 24 of 34 Marvel films — a warning that
    // fires on most rows is a design defect, and should fail a test rather than
    // be noticed in review.
    if (!isSynced) return;
    /**
     * TWO TOLERANCES, because the two paths are now different shapes.
     *
     * The spine is 22 films and holds at 0.2. Deadpool & Wolverine is an MCU
     * path, which since the spine landed means the whole MCU line behind it —
     * 76 titles including four Loki and Guardians seasons of five hours each.
     * A third of those nights genuinely run past two and a half hours, and the
     * flag is reporting that correctly rather than getting noisier.
     *
     * The point of the guard survives: a warning on a MINORITY of rows still
     * means something, and 0.35 would still fail the defect it was written for
     * — 24 of 34 rows, which is 0.7.
     */
    for (const [label, path, tolerance] of [
      [
        "deadpool-and-wolverine",
        pathTo(shipped, "deadpool-and-wolverine", "minimum"),
        0.35,
      ],
      ["the spine", essentialsOrder(shipped), 0.2],
    ] as const) {
      const plan = schedule(path);
      const flagged = plan.filter((e) => e.overBudget).length;
      expect(flagged / plan.length, `${label}`).toBeLessThan(tolerance);
    }
  });

  it("F10b a season-heavy path DOES flag, and that is correct", () => {
    // Echo's path is thirteen Defenders seasons. A 13-hour season genuinely
    // does not fit a 2.5-hour night, so a high flag rate there is the truth
    // rather than noise — which is exactly the distinction the tolerance draws.
    //
    // It also marks a real limit: `overBudget` currently conflates "slightly
    // long film" with "this needs a fortnight". The UI in step 6 needs a
    // nights-required figure for episodic nodes, not just a boolean.
    if (!isSynced) return;
    const plan = schedule(pathTo(shipped, "echo-s1", "minimum"));
    const flagged = plan.filter((e) => e.overBudget);
    expect(flagged.length / plan.length).toBeGreaterThan(0.2);
    // And everything flagged really is enormous, not marginally over.
    for (const e of flagged) expect(e.totalMin).toBeGreaterThan(150 * 1.25);
  });

  it("F12 no film matched a promo featurette instead of the feature", () => {
    // TMDB orders search results by its own relevance, which is not "the thing
    // you meant": searching X-Men/2000 returns "X-Men: The Mutant Watch", a
    // 22-minute featurette, ABOVE the film. Taking results[0] shipped 22m and
    // 17m onto the thread, and only rendering the page revealed it.
    if (!isSynced) return;
/**
     * ONE EXEMPTION, and it is a fact about 1944 rather than a bad match.
     *
     * `captain-america-1944` is a fifteen-chapter theatrical SERIAL, shown a
     * chapter a week. 244 minutes is what those chapters add up to, and TMDB
     * holds it as a single movie record because that is how serials are
     * catalogued. Retyping it as a series to dodge this bound is what handed
     * it The Falcon and the Winter Soldier's cast — the shape of the record
     * should follow the work, not the guard.
     */
    const SERIALS = new Set(["captain-america-1944"]);
    const odd = shipped
      .filter((t) => t.type === "film" && t.runtimeMin !== null)
      .filter((t) => !SERIALS.has(t.id))
      .filter((t) => t.runtimeMin! < 70 || t.runtimeMin! > 220)
      .map((t) => `${t.id}: ${t.runtimeMin}m`);
    expect(odd).toEqual([]);
  });

  it("F12b the two that were wrong are right", () => {
    if (!isSynced) return;
    const byId = new Map(shipped.map((t) => [t.id, t]));
    expect(byId.get("x-men")!.runtimeMin).toBeGreaterThan(95);
    expect(byId.get("x2")!.runtimeMin).toBeGreaterThan(120);
  });

  it("F7c the merge preserves every id, exactly once", () => {
    expect(shipped.map((t) => t.id).sort()).toEqual(
      titles.map((t) => t.id).sort(),
    );
  });

});
