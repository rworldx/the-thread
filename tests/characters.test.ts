import { describe, expect, it } from "vitest";
import { allCharacters, charactersIn, shownCharacters } from "@/lib/characters";
import { characters as authored } from "@/content/characters";
import { CharacterSource } from "@/content/character-schema";
import { titles } from "@/content/build";
import artRaw from "@/content/character-art.generated.json";
import { visibleLength } from "@/content/schema";
import { releaseOrder } from "@/lib/graph";

const ids = new Set(authored.map((c) => c.id));
const titleIds = new Set(titles.map((t) => t.id));

describe("C. the character corpus", () => {
  it("C1 every record parses against the schema", () => {
    // Same gate the titles get: a malformed record fails the build loudly
    // rather than rendering a page with a hole in it.
    for (const c of authored) {
      expect(() => CharacterSource.parse(c), c.id).not.toThrow();
    }
  });

  it("C2 ids are unique", () => {
    expect(new Set(authored.map((c) => c.id)).size).toBe(authored.length);
  });

  it("C3 corpus size is stable — adding a character is a deliberate diff", () => {
    expect(authored).toHaveLength(651);
  });

  it("C4 every relation points at a character that exists", () => {
    // A dangling relation renders as a link to a 404. The character page groups
    // relations by kind, so a missing target is a hole in a list, not a crash,
    // which is exactly the kind of thing that ships unnoticed.
    for (const c of allCharacters) {
      for (const r of c.related) {
        expect(ids.has(r.id), `${c.id} → ${r.id}`).toBe(true);
      }
    }
  });

  it("C5 no character relates to itself", () => {
    for (const c of allCharacters) {
      expect(c.related.map((r) => r.id), c.id).not.toContain(c.id);
    }
  });

  it("C6 APPEARANCES ARE DERIVED, and every one resolves to a real title", () => {
    /**
     * The whole point of deriving them. If this ever fails, someone has started
     * hand-listing appearances and the two sources of truth have begun to
     * drift, which is the failure this project has already hit twice.
     */
    for (const c of allCharacters) {
      for (const t of c.appearances) {
        expect(titleIds.has(t), `${c.id} → ${t}`).toBe(true);
      }
    }
  });

  it("C7 the off-screen count is stable — a broken alias would move it", () => {
    /**
     * THIS GUARD CHANGED ITS CLAIM, and the reason matters.
     *
     * It used to require that NOBODY was authored without a screen credit, on
     * the reasoning that such a record renders empty. That reasoning stopped
     * being true when the corpus deliberately took in the cosmic layer:
     * Eternity, the Living Tribunal, the Beyonder, Mister Sinister, the Runner.
     * Those are among the names a reader is most likely to search for and none
     * of them has ever been cast. Their pages say "not on screen yet", which is
     * an answer; "no results" is not.
     *
     * The failure it was actually built to catch is still real and still
     * caught: appearances are DERIVED by matching `aliases` against TMDB cast
     * credits, so one bad alias silently drops a character out of every title
     * they are in. That does not show up as an error anywhere — it shows up as
     * this number moving. A count is the right instrument for it, and it is
     * pinned rather than bounded so that a drift of one still fails.
     */
    const offScreen = allCharacters.filter((c) => c.appearances.length === 0);
    /* 16 -> 30 -> 42: the fourteen unfilmed Celestials, then eleven of
       Spider-Man's rogues and twelve named mutants, then the Inheritors and the Life Foundation symbiotes, then the Elders and the cosmic abstracts, then the mystics and the remaining Heralds, then more mutants — of whom only three stayed off-screen, the other
       eight turning out to be credited in the animated series once they had
       aliases to match on. Empty lists here are the intent, not a fault. */
    expect(offScreen).toHaveLength(242);
    /* And everyone is reachable: the browse page no longer filters anyone out,
       so an off-screen character has a page like everybody else. */
    expect(shownCharacters).toHaveLength(allCharacters.length);
  });

  it("C8 appearances are in release order", () => {
    /**
     * MEASURED AGAINST `releaseOrder`, not against a re-sort written here.
     *
     * This built its own rank map with a bare `localeCompare` on the date. The
     * app uses `releaseOrder`, which breaks a same-date tie on id — and four
     * pairs in the corpus share a release date, including Ultimate Avengers and
     * Ultimate Avengers 2. Two orderings, both defensible, disagreeing on four
     * positions, and the test asserting the one the app does not use.
     *
     * It passed for months because no character happened to appear in both
     * halves of a tied pair. Richer TV credits put the Hulk in both Ultimate
     * Avengers films, and the test failed on a correct corpus — which is the
     * one kind of failure that teaches people to ignore a suite.
     *
     * A test that re-implements the thing it is checking is testing its own
     * copy. This one now imports it.
     */
    const rank = new Map(releaseOrder(titles).map((t, i) => [t.id, i]));
    for (const c of allCharacters) {
      const seq = c.appearances.map((id) => rank.get(id)!);
      expect([...seq].sort((a, b) => a - b), c.id).toEqual(seq);
    }
  });

  it("C9 a title never appears twice for one character", () => {
    // No Way Home credits more than one Peter Parker. That is several
    // PORTRAYALS of one appearance, and conflating them made the title show up
    // three times in his own list.
    for (const c of allCharacters) {
      expect(new Set(c.appearances).size, c.id).toBe(c.appearances.length);
    }
  });

  it("C10 variants are actually visible — the multiverse is the point", () => {
    const spider = allCharacters.find((c) => c.id === "spider-man")!;
    const inNwh = spider.portrayals.filter(
      (p) => p.titleId === "spider-man-no-way-home",
    );
    expect(inNwh.length).toBeGreaterThan(1);
    // Distinct actors, not the same actor recorded twice by a matching bug.
    expect(new Set(inNwh.map((p) => p.actor)).size).toBe(inNwh.length);
  });

  it("C11 mutant class is only ever set on a mutant", () => {
    // `allCharacters`, not `authored`: the field is `.default(null)`, so on an
    // unparsed record it is `undefined` and a `=== null` guard skips nothing.
    for (const c of allCharacters) {
      if (c.mutantClass === null) continue;
      expect(c.species, c.id).toMatch(/Mutant/i);
    }
  });

  it("C12 the Omegas are the published ones", () => {
    /**
     * Marvel published the Omega-level list in House of X #1. These four are
     * the members of it that this corpus holds; Legion and the rest are on the
     * list but not in this corpus. Charles Xavier is NOT on that
     * list, which is a real and slightly famous omission, and recording him as
     * Omega because he feels like one would be inventing a fact.
     */
    const omegas = authored
      .filter((c) => c.mutantClass === "omega")
      .map((c) => c.id)
      .sort();
    /* Proteus and Rachel Summers join on the same rule the others are here
       by: both are named on Marvel's published Omega list, which the supplied
       roster reproduces. Neither is here because they feel powerful. */
    expect(omegas).toEqual([
      "elixir", "exodus", "hope-summers", "iceman", "jamie-braddock",
      "jean-grey", "legion", "magneto", "mister-m", "proteus",
      "quentin-quire", "storm", "vulcan",
    ]);
    expect(allCharacters.find((c) => c.id === "professor-x")!.mutantClass).not.toBe(
      "omega",
    );
  });

  it("C20 every avatar resolved to the character we asked for", () => {
    /**
     * THE BUG THIS EXISTS FOR shipped a picture of Shazam.
     *
     * Two records in the source are named "Captain Marvel": DC's Billy Batson
     * and Marvel's Carol Danvers. The tie was broken on
     * `publisher === "Marvel Comics"`, which is obviously right and was wrong,
     * because that field is corrupt for a large slice of the data — Carol's
     * reads "Binary" while Billy's correctly reads "DC Comics". The run
     * succeeded, the page rendered, and the face was somebody else's.
     *
     * Nothing in the type system or the build could see it. Only comparing what
     * we asked for against what came back can, so that comparison is a test.
     */
    const art = artRaw as Record<string, { matchedAs: string | null; source: string | null }>;
    /** Where the two corpora genuinely use different canonical names. */
    const EXPECTED_ALIASES: Record<string, string> = {
      "kate-bishop": "Hawkeye II",
      "ms-marvel": "Ms Marvel II",
      // Our node is "Kang the Conqueror"; the source lists him as "Kang".
      kang: "Kang",
      rocket: "Rocket Raccoon",
      drax: "Drax the Destroyer",
      "gwen-stacy": "Spider-Gwen",
      "the-mandarin": "Mandarin",
      /**
       * THE PAGE OVERRIDES, and each one is here because a name search found
       * the wrong article and shipped the wrong face.
       *
       * These are not exemptions from the check — they are the check, stated
       * the other way round. The sync names an exact wiki article for these
       * five, so `matchedAs` must be that article title and nothing else. If
       * an override ever silently stops resolving and the automatic stage
       * fills the gap instead, `matchedAs` reverts to the plain name and this
       * goes red, which is precisely the regression worth catching.
       */
      "miles-morales": "Miles Morales (Earth-1610)",
      "sebastian-shaw": "Sebastian Shaw (Earth-616)",
      kraglin: "Kraglin Obfonteri",
      "the-one-above-all": "One Above All (Multiverse)",
      "the-one-below-all": "One Below All (Multiverse)",
      /**
       * Our node is "Nova (Richard Rider)", because there are two Novas and
       * the corpus names both. The search for that string found the MCU wiki's
       * "Irani.jpg" — Irani Rael, the Nova Prime from Guardians of the Galaxy,
       * a different person with the same job title. Wrong face, and the URL
       * had since gone dead, which is how verify:assets surfaced it.
       */
      "richard-rider": "Richard Rider (Earth-616)",
    };
    const bare = (x: string) =>
      x.toLowerCase().replace(/[^a-z0-9]+/g, "").replace(/^the/, "");

    const wrong: string[] = [];
    for (const c of allCharacters) {
      /**
       * HAND-PICKED ART IS OUT OF SCOPE FOR THIS CHECK, and that is not a
       * loophole — it is what the check is about.
       *
       * C20 compares the name we ASKED a source for against the name it
       * answered with, because a name search can quietly return the wrong
       * person. A chosen URL was never searched for: somebody looked at a
       * picture and said "that one". There is no asked-for name to compare, so
       * `matchedAs` reads "hand-picked" and this has nothing to verify.
       *
       * What verifies these instead is `npm run verify:assets`, which requests
       * every one of them — and it has already caught two that could not work:
       * a tvtropes URL that 403s without a browser referer, and a Google
       * thumbnail-cache URL that expires.
       */
      if (art[c.id]?.source === "chosen") continue;
      const got = art[c.id]?.matchedAs;
      if (!got) continue;
      const want = EXPECTED_ALIASES[c.id] ?? c.nameEn;
      if (bare(got) !== bare(want)) wrong.push(`${c.id}: asked ${want}, got ${got}`);
    }
    expect(wrong).toEqual([]);
  });

  it("C13 an origin is a paragraph, not a synopsis", () => {
    for (const c of authored) {
      expect(c.origin.en.length, `${c.id} en`).toBeLessThanOrEqual(340);
      // Arabic is measured by what it RENDERS, not by code units — diacritics
      // make `.length` lie by up to a third.
      expect(visibleLength(c.origin.ar), `${c.id} ar`).toBeLessThanOrEqual(340);
    }
  });

  it("C14 a power is a chip, not a sentence", () => {
    for (const c of authored) {
      for (const p of c.powers) {
        expect(p.en.length, `${c.id}: ${p.en}`).toBeLessThanOrEqual(48);
        expect(visibleLength(p.ar), `${c.id}: ${p.ar}`).toBeLessThanOrEqual(48);
      }
    }
  });

  it("C15 no long dash anywhere in character copy", () => {
    // The ban is total and applies to every visible string on the site.
    for (const c of authored) {
      const strings = [
        c.nameEn,
        c.nameAr,
        c.origin.en,
        c.origin.ar,
        ...c.powers.flatMap((p) => [p.en, p.ar]),
      ];
      for (const s of strings) {
        expect(s, c.id).not.toMatch(/[—–]/);
      }
    }
  });

  it("C16 charactersIn is the inverse of appearances", () => {
    // The title page and the character page read the same relation from two
    // directions. If they ever disagree, one of them is lying to a reader.
    for (const t of ["spider-man-no-way-home", "logan", "the-avengers"]) {
      for (const c of charactersIn(t)) {
        expect(c.appearances, `${c.id} in ${t}`).toContain(t);
      }
    }
  });

  it("C18 no alias is shared between two characters", () => {
    /**
     * An alias is a JOIN KEY, so a shared one silently gives one character
     * another's credits. Sam Wilson had "Captain America" in his list because
     * he takes the name later; Steve Rogers is credited as
     * "Steve Rogers / Captain America" in eight films, so Sam collected all
     * eight and the grid showed Chris Evans on Sam's tile.
     *
     * Nothing threw, nothing looked wrong in the data, and every value involved
     * was a real photo of a real credited performer. It was caught by looking
     * at a screenshot, which is why it is now a test.
     */
    const norm = (x: string) =>
      x.toLowerCase().replace(/[.'’`-]/g, "").replace(/\s+/g, " ").trim();
    const owners = new Map<string, Set<string>>();
    for (const c of allCharacters) {
      for (const a of [c.nameEn, ...c.aliases]) {
        const k = norm(a);
        if (!owners.has(k)) owners.set(k, new Set());
        owners.get(k)!.add(c.id);
      }
    }
    const shared = [...owners.entries()]
      .filter(([, ids]) => ids.size > 1)
      .map(([alias, ids]) => `${alias}: ${[...ids].join(" + ")}`);
    expect(shared).toEqual([]);
  });

  it("C19 the LEAD ACTOR is the one people picture, not the earliest credit", () => {
    /**
     * `appearances` is in release order, so "the first photo" meant the 1992
     * animated series: Wolverine rendered as a voice actor and Spider-Man,
     * Falcon and Captain America were all nineties cartoon voices. Correct by
     * the letter of the rule, useless on screen.
     *
     * The portrait is now the most-credited actor. These four are the cases the
     * screenshot surfaced, pinned so the heuristic cannot quietly regress.
     */
    const photoOf = (id: string) => {
      const c = allCharacters.find((x) => x.id === id)!;
      const counts = new Map<string, number>();
      for (const p of c.portrayals) counts.set(p.actor, (counts.get(p.actor) ?? 0) + 1);
      const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]![0];
      return { top, image: c.leadActorPhoto };
    };
    expect(photoOf("wolverine").top).toBe("Hugh Jackman");
    expect(photoOf("spider-man").top).toBe("Tom Holland");
    expect(photoOf("iron-man").top).toBe("Robert Downey Jr.");
    expect(photoOf("falcon").top).toBe("Anthony Mackie");
  });

  it("C17 the avatar is CHARACTER ART, never an actor still", () => {
    /**
     * This assertion is the inverse of what it used to be, and the reversal is
     * the point. It once required every character to carry an image, and that
     * image was the most-credited actor's TMDB photograph — Hugh Jackman in a
     * blue t-shirt where a picture of Wolverine belongs.
     *
     * An actor still answers "who played this". The avatar is answering "who is
     * this". So `image` is now artwork or NOTHING, and eleven characters
     * legitimately have nothing: the sources we use are comics-era and have no
     * Shuri, no Sylvie, no Killmonger. Those render a designed plate.
     *
     * What must never happen is `image` quietly falling back to a face. If it
     * ever points at image.tmdb.org again, someone has reintroduced exactly
     * that, and this fails.
     */
    /**
     * ONE EXEMPTION, and it is the opposite case rather than a hole in the rule.
     *
     * `creditedActor` records are REAL PEOPLE appearing as themselves — Stan
     * Lee, credited under a different name in all 28 of his cameos. For him a
     * photograph is not an actor still standing in for character art; it is
     * the correct portrait, because the person IS the subject. The rule exists
     * to stop a face being substituted for a drawing of someone else, and that
     * is not what is happening here.
     */
    for (const c of allCharacters) {
      if (c.creditedActor !== null) continue;
      if (c.image === null) continue;
      expect(c.image, `${c.id} avatar is an actor still`).not.toContain("image.tmdb.org");
      expect(c.artSource, `${c.id} has art with no source`).not.toBeNull();
    }
    // The actor photo still exists, for the "played by" line where it belongs.
    const withLead = allCharacters.filter((c) => c.leadActorPhoto).length;
    expect(withLead).toBeGreaterThan(120);
  });

  it("C17b most of the corpus has real artwork, and the rest is a known set", () => {
    // A coverage floor, so a broken sync cannot silently empty the grid.
    const withArt = allCharacters.filter((c) => c.image !== null);
    expect(withArt.length).toBe(allCharacters.length);
    // Named, so adding one to this list is a deliberate diff rather than drift.
    const without = allCharacters
      .filter((c) => c.image === null)
      .map((c) => c.id)
      .sort();
    /**
     * Nine, down from eleven: Kang and Ms. Marvel were found under names the
     * source uses and are now mapped explicitly. The rest are genuinely absent
     * from a comics-era dataset. Marvel's own API has all nine, and a key turns
     * them on without touching this list's reason for existing.
     */
    /**
     * EMPTY, and getting here took a second source.
     *
     * The comics dataset is comics-era: it has Wolverine and Magneto and has
     * never heard of Shuri, Okoye, Killmonger, Valkyrie or the Ancient One —
     * precisely the characters a reader of THIS site looks up. The MCU wiki's
     * MediaWiki API is keyless and its infobox image is a character portrait,
     * so it fills the gaps, and the general Marvel wiki catches Sony's corner.
     *
     * Comics art still wins where both have it, so the grid does not alternate
     * between drawn and photographic at random.
     *
     * BACK TO EMPTY. Kosmos was the one exception and is not any more:
     * Rashid supplied the URL, and it came from a wiki that files the
     * character where Marvel Database files only the dimension of the same
     * name. Every character in the corpus has real artwork again.
     */
    expect(without).toEqual([]);
  });

  /**
   * C21 THE THREE PETERS ARE SEPARABLE BY ACTOR — every one of them, in order.
   *
   * All three live-action Spider-Men are Peter Parker, so a name can never
   * tell them apart; only the performer can. That was the argument against
   * splitting him into three records, and the reason the character page groups
   * `portrayals` by actor instead. This asserts the grouping actually answers
   * the question — that each era holds exactly the films it should, and that
   * No Way Home is the one title all three share.
   *
   * The lists are written out rather than counted because a count passes while
   * pointing at the wrong films. If a credit changes upstream this fails
   * loudly, which is the point: the eras are derived from TMDB, and derived
   * data is exactly what needs a guard.
   */
  it("C21 each live-action Peter holds his own films, and all three meet once", () => {
    const peter = allCharacters.find((c) => c.id === "spider-man");
    expect(peter).toBeDefined();

    const filmsOf = (actor: string) =>
      peter!.portrayals.filter((p) => p.actor === actor).map((p) => p.titleId);

    expect(filmsOf("Tobey Maguire")).toEqual([
      "spider-man",
      "spider-man-2",
      "spider-man-3",
      "spider-man-no-way-home",
    ]);
    expect(filmsOf("Andrew Garfield")).toEqual([
      "the-amazing-spider-man",
      "the-amazing-spider-man-2",
      "spider-man-no-way-home",
    ]);
    /* Holland's begins at Civil War, not Homecoming — he is introduced in
       somebody else's film, which is the fact this list makes visible. */
    expect(filmsOf("Tom Holland")[0]).toBe("captain-america-civil-war");
    expect(filmsOf("Tom Holland")).toContain("avengers-infinity-war");
    expect(filmsOf("Tom Holland")).toContain("avengers-endgame");

    /* One appearance, three portrayals. The seam where the eras meet. */
    const nwh = peter!.portrayals.filter(
      (p) => p.titleId === "spider-man-no-way-home",
    );
    expect(nwh.map((p) => p.actor).sort()).toEqual([
      "Andrew Garfield",
      "Tobey Maguire",
      "Tom Holland",
    ]);
    expect(
      peter!.appearances.filter((t) => t === "spider-man-no-way-home"),
    ).toHaveLength(1);
  });

  /**
   * C22 A PERFORMANCE RECORD CANNOT STEAL A CREDIT.
   *
   * The three live-action Peters exist because no alias can separate them —
   * every credit for all three reads "Peter Parker". The whole design rests on
   * those records carrying NO aliases, so they take no part in name matching
   * and the main Spider-Man keeps every appearance he had.
   *
   * Add one alias to one of them and the damage is silent: the matcher starts
   * handing Spider-Man films to a record that should only ever get its
   * performer's. This asserts the invariant directly rather than the symptom.
   */
  it("C22 performance records have no aliases, and the base keeps its films", () => {
    const performances = allCharacters.filter((c) => c.performerOf !== null);
    expect(performances.length).toBeGreaterThan(0);

    for (const p of performances) {
      expect(p.aliases).toEqual([]);
      /* Every film it claims must be one the base character is also in, and
         must actually credit this performer. Both, or the key is wrong. */
      const base = allCharacters.find((c) => c.id === p.performerOf!.character);
      expect(base).toBeDefined();
      for (const t of p.appearances) {
        expect(base!.appearances).toContain(t);
        expect(
          base!.portrayals.some(
            (x) => x.titleId === t && x.actor === p.performerOf!.actor,
          ),
        ).toBe(true);
      }
      expect(p.appearances.length).toBeGreaterThan(0);
    }

    /* The base is untouched: it still holds every film, including the ones the
       performances now also claim. A split that shrinks the original is a
       move, not a split. */
    const peter = allCharacters.find((c) => c.id === "spider-man")!;
    expect(peter.appearances).toContain("spider-man");
    expect(peter.appearances).toContain("the-amazing-spider-man");
    expect(peter.appearances).toContain("captain-america-civil-war");
    expect(peter.appearances.length).toBeGreaterThanOrEqual(24);
  });

  /**
   * C23 THE FAME LIST NAMES REAL RECORDS, AND LEADS THE GRID.
   *
   * It is the one ordering here that is hand-written rather than derived, so
   * it is the one that can rot without anything noticing: rename a record and
   * its entry silently stops matching, dropping that character out of the top
   * of the grid and into the appearance-count tail. Nothing throws — the page
   * just quietly stops leading with Iron Man.
   */
  it("C23 the researched order leads the grid, and its tail is by film count", () => {
    const ids = new Set(allCharacters.map((c) => c.id));
    /* The six every source agrees on, in the order they agree on. Changing
       this is a research decision, so it should be a deliberate diff. */
    expect(shownCharacters.slice(0, 6).map((c) => c.id)).toEqual([
      "spider-man",
      "iron-man",
      "captain-america",
      "thor",
      "hulk",
      "wolverine",
    ]);
    /* Every name above the tail must exist. A missing id means a rename
       silently dropped someone out of the top and into the tail — nothing
       throws, the page just quietly stops leading with Spider-Man. */
    for (const c of shownCharacters.slice(0, 67)) expect(ids.has(c.id)).toBe(true);
    /* And the tail really is sorted by appearances, not left in corpus order. */
    const tail = shownCharacters.slice(67, 95).map((c) => c.appearances.length);
    expect([...tail].sort((a, b) => b - a)).toEqual(tail);
  });

  /**
   * C24 NO TWO RECORDS SHARE AN ID — which nothing was checking.
   *
   * A second `modok` record was written and shipped: it built, it passed every
   * other guard, and the grid rendered him twice. `characterOf` keeps only the
   * last one, so the duplicate is invisible in most code paths and visible in
   * exactly the place it matters, the page a reader is looking at.
   *
   * C18 catches a shared ALIAS and did not catch this, because a duplicate id
   * is a different failure: the ids collide rather than the names. Six hundred
   * lines apart in one file is far enough that a grep for the name can miss it
   * — which is how it happened.
   */
  it("C24 no two character records share an id", () => {
    const seen = new Map<string, number>();
    for (const c of authored) seen.set(c.id, (seen.get(c.id) ?? 0) + 1);
    expect([...seen].filter(([, n]) => n > 1).map(([id]) => id)).toEqual([]);
  });

  /**
   * C25 THE SYMBIOTE CLASSIFICATION ONLY EVER SITS ON A SYMBIOTE.
   *
   * It is Marvel's own four-way split by ORIGIN, so it is a fact about a
   * symbiote and meaningless on anyone else — the same rule `mutantClass`
   * follows, and the same failure it would be to put an Omega rank on a Kree.
   *
   * Knull is the case worth naming: his species reads "Symbiote god" and he is
   * deliberately NULL, because he forged the strains rather than being one.
   */
  it("C25 symbiote origin is set only on symbiotes, never on Knull", () => {
    for (const c of allCharacters) {
      if (c.symbioteClass === null) continue;
      expect(String(c.species)).toContain("Symbiote");
      expect(c.id).not.toBe("knull");
    }
    /* Every symbiote that is not the god has one, so the field cannot be
       quietly dropped from a record without this failing. */
    const strains = allCharacters.filter(
      (c) => String(c.species).includes("Symbiote") && c.id !== "knull",
    );
    expect(strains.length).toBeGreaterThan(0);
    for (const c of strains) expect(c.symbioteClass).not.toBeNull();

    /* The published lineage: Venom, then Carnage from Venom, then Toxin from
       Carnage. All three are natural descent; the Life Foundation five are
       lab-harvested and Anti-Venom is an inversion. */
    const of = (id: string) =>
      allCharacters.find((c) => c.id === id)?.symbioteClass;
    expect(of("venom")).toBe("lineage");
    expect(of("carnage")).toBe("lineage");
    expect(of("toxin")).toBe("lineage");
    expect(of("riot")).toBe("spawn");
    expect(of("anti-venom")).toBe("anomaly");
  });
});
