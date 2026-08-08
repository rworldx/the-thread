import { describe, expect, it } from "vitest";
import { Title, TitleSource, TitleSourceStrict, TitleStrict } from "@/content/schema";
import { node } from "./__fixtures__/graphs";

/** A well-formed built node — everything sync would have filled in. */
const built = (over: Record<string, unknown> = {}) => ({
  ...node("iron-man"),
  releaseDate: "2008-05-02",
  runtimeMin: 126,
  spoilerSafe: { en: "A weapons manufacturer builds a suit.", ar: "صانع أسلحة يبني بذلة." },
  posterPath: "/abc123.jpg",
  posterTint: "#4A1D1D",
  blurDataURL: null,
  ...over,
});

describe("A. schema — per-node shape", () => {
  it("A1 accepts a minimal valid node and applies defaults", () => {
    const parsed = TitleSource.parse({
      id: "iron-man",
      titleEn: "Iron Man",
      titleAr: "الرجل الحديدي",
      type: "film",
      universe: "mcu",
      releaseDate: "2008",
    });
    expect(parsed.saga).toBe("none");
    expect(parsed.requires).toEqual([]);
    expect(parsed.enriches).toEqual([]);
    expect(parsed.seasons).toEqual([]);
    expect(parsed.optional).toBe(false);
    expect(parsed.essential).toBe(false);
    expect(parsed.phase).toBeNull();
    expect(parsed.spoilerSafe).toBeNull();
    expect(parsed.runtimeMin).toBeNull();
  });

  it.each(["Iron Man", "iron_man", "iron--man", "-iron", "iron-", "Iron-Man", "iron man"])(
    "A2 rejects non-kebab id %o",
    (id) => {
      expect(TitleSource.safeParse({ ...node("a"), id }).success).toBe(false);
    },
  );

  it.each(["2008", "2008-05", "2008-05-02"])("A3 accepts reduced-precision ISO date %o", (d) => {
    expect(TitleSource.safeParse({ ...node("a"), releaseDate: d }).success).toBe(true);
  });

  it.each(["May 2008", "05/02/2008", "2008-13-01", "2008-05-32", "08-05-02", ""])(
    "A4 rejects non-ISO date %o",
    (d) => {
      const r = TitleSource.safeParse({ ...node("a"), releaseDate: d });
      const t = Title.safeParse(built({ releaseDate: d }));
      expect(r.success && t.success).toBe(false);
    },
  );

  it("A5 Title rejects reduced precision — release order needs a real date", () => {
    expect(Title.safeParse(built({ releaseDate: "2008" })).success).toBe(false);
    expect(Title.safeParse(built({ releaseDate: "2008-05" })).success).toBe(false);
    expect(Title.safeParse(built()).success).toBe(true);
  });

  it("A5b Title rejects a date that passes the regex but is not a real day", () => {
    expect(Title.safeParse(built({ releaseDate: "2023-02-30" })).success).toBe(false);
  });

  it("A6 Title rejects a null runtimeMin — the sync gate is real, not advisory", () => {
    expect(Title.safeParse(built({ runtimeMin: null })).success).toBe(false);
    expect(Title.safeParse(built({ runtimeMin: 0 })).success).toBe(false);
    expect(Title.safeParse(built({ runtimeMin: 126.5 })).success).toBe(false);
  });

  it("A6b Title rejects a null spoilerSafe — same gate, same reasoning", () => {
    expect(Title.safeParse(built({ spoilerSafe: null })).success).toBe(false);
  });

  it("A7 rejects English-only copy", () => {
    expect(
      TitleSource.safeParse({ ...node("a"), spoilerSafe: { en: "something" } }).success,
    ).toBe(false);
  });

  it("A8 rejects whitespace-only Arabic — the real failure mode", () => {
    expect(
      TitleSource.safeParse({ ...node("a"), spoilerSafe: { en: "ok", ar: "   " } }).success,
    ).toBe(false);
    expect(TitleSource.safeParse({ ...node("a"), titleAr: "  " }).success).toBe(false);
  });

  it("A9 rejects self-reference in requires or enriches", () => {
    expect(TitleSourceStrict.safeParse(node("a", { requires: ["a"] })).success).toBe(false);
    expect(TitleSourceStrict.safeParse(node("a", { enriches: ["a"] })).success).toBe(false);
  });

  it("A10 rejects optional && essential", () => {
    expect(
      TitleSourceStrict.safeParse(node("a", { optional: true, essential: true })).success,
    ).toBe(false);
  });

  it("A11 rejects a season node covering anything other than one season", () => {
    expect(TitleSourceStrict.safeParse(node("a", { type: "season", seasons: [] })).success).toBe(
      false,
    );
    expect(
      TitleSourceStrict.safeParse(node("a", { type: "season", seasons: [1, 2] })).success,
    ).toBe(false);
    expect(
      TitleSourceStrict.safeParse(node("a", { type: "season", seasons: [1], showId: "loki" }))
        .success,
    ).toBe(true);
  });

  it("A12 rejects seasons on a film, special, or short", () => {
    for (const type of ["film", "special", "short"] as const) {
      expect(TitleSourceStrict.safeParse(node("a", { type, seasons: [1] })).success).toBe(false);
    }
  });

  it("A12b requires a series node to declare its seasons", () => {
    expect(TitleSourceStrict.safeParse(node("a", { type: "series", seasons: [] })).success).toBe(
      false,
    );
    expect(
      TitleSourceStrict.safeParse(
        node("a", { type: "series", seasons: [1, 2, 3, 4, 5, 6, 7], showId: "aos" }),
      ).success,
    ).toBe(true);
  });

  it("A12c rejects a duplicate season number", () => {
    expect(
      TitleSourceStrict.safeParse(node("a", { type: "series", seasons: [1, 1] })).success,
    ).toBe(false);
  });

  it("A13 rejects phase outside the MCU", () => {
    expect(TitleSourceStrict.safeParse(node("a", { universe: "sony", phase: 4 })).success).toBe(
      false,
    );
    expect(TitleSourceStrict.safeParse(node("a", { universe: "mcu", phase: 4 })).success).toBe(
      true,
    );
  });

  it("A14 rejects saga outside the MCU", () => {
    expect(
      TitleSourceStrict.safeParse(node("a", { universe: "fox", saga: "infinity" })).success,
    ).toBe(false);
  });

  it("A15 rejects the same id in both requires and enriches", () => {
    expect(
      TitleSourceStrict.safeParse(node("a", { requires: ["b"], enriches: ["b"] })).success,
    ).toBe(false);
  });

  it("A16 rejects a duplicate id within requires", () => {
    expect(TitleSourceStrict.safeParse(node("a", { requires: ["b", "b"] })).success).toBe(false);
  });

  it("A17 posterPath must be a TMDB path, not a URL", () => {
    expect(
      Title.safeParse(built({ posterPath: "https://image.tmdb.org/t/p/w500/abc.jpg" })).success,
    ).toBe(false);
    expect(Title.safeParse(built({ posterPath: "/abc.jpg" })).success).toBe(true);
    expect(Title.safeParse(built({ posterPath: null })).success).toBe(true);
  });

  it("A18 posterTint must be six-digit hex", () => {
    expect(Title.safeParse(built({ posterTint: "#fff" })).success).toBe(false);
    expect(Title.safeParse(built({ posterTint: "4A1D1D" })).success).toBe(false);
    expect(Title.safeParse(built({ posterTint: "#4A1D1D" })).success).toBe(true);
  });

  it("A20 spoilerSafe rejects a pasted synopsis", () => {
    // The structural defence. A TMDB overview seeded into this field is how the
    // spoiler shield got switched off by default for 114 titles — the cap makes
    // that specific mistake impossible rather than merely discouraged.
    const synopsis =
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. " +
      "With the help of remaining allies, the Avengers assemble once more.";
    expect(synopsis.length).toBeGreaterThan(120);
    expect(
      TitleSource.safeParse({ ...node("a"), spoilerSafe: { en: synopsis, ar: synopsis } }).success,
    ).toBe(false);
  });

  it("A20b spoilerSafe accepts a real one-liner", () => {
    expect(
      TitleSource.safeParse({
        ...node("a"),
        spoilerSafe: { en: "Where it all starts.", ar: "من هنا تبدأ الحكاية." },
      }).success,
    ).toBe(true);
  });

  it("A20d a heavily voweled Arabic line is not penalised for its diacritics", () => {
    // 45 visible characters, but far more UTF-16 code units. Under `.length`
    // this would have failed a cap that its English counterpart passed.
    const voweled = "جُنْدِيٌّ خَارِجَ زَمَنِهِ، وَشَبَحٌ لَا يَعْرِفُ أَحَدٌ هُوِيَّتَهُ.";
    expect(voweled.length).toBeGreaterThan(60);
    expect(
      TitleSource.safeParse({
        ...node("a"),
        spoilerSafe: { en: "A soldier out of time.", ar: voweled },
      }).success,
    ).toBe(true);
  });

  it("A20c context has NO length cap — a synopsis belongs there", () => {
    const synopsis = "x".repeat(600);
    expect(
      TitleSource.safeParse({ ...node("a"), context: { en: synopsis, ar: synopsis } }).success,
    ).toBe(true);
  });

  it("A19 a fully-built node passes the strict gate", () => {
    expect(TitleStrict.safeParse(built()).success).toBe(true);
  });
});
