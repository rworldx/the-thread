import { z } from "zod";

/**
 * The content layer is TWO schemas, not one.
 *
 *   TitleSource  — what a human writes by hand. Anything we cannot know without
 *                  TMDB (runtime, exact release date, poster, plot copy) is
 *                  nullable.
 *   Title        — what the build consumes, after `scripts/sync-tmdb.ts` has
 *                  filled those fields in. Nothing nullable that the UI needs.
 *
 * The split exists so we never invent a fact. A missing number stays `null` and
 * fails the build at the Title gate, loudly, instead of silently shipping a
 * wrong "2h 06m" to someone trying to plan six evenings — or worse, a
 * confidently wrong plot summary. Same reasoning both times.
 *
 * GRANULARITY: one node per LINE in the source document. The source already
 * made this call — it lists Loki season 1 and season 2 separately because they
 * sit at different points in the order, and lists Agents of S.H.I.E.L.D.
 * seasons 1–7 as a single line because nobody navigates that show by season.
 * `seasons` records which TMDB seasons a node covers, so a collapsed run still
 * sums its runtime correctly.
 */

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/** Stable, human-readable, URL-safe. This is the route segment — see F3. */
export const Id = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "id must be kebab-case: a-z, 0-9, single hyphens",
  );

/**
 * ISO 8601 with reduced precision permitted while authoring.
 * `2008`, `2008-05`, and `2008-05-02` are all valid ISO 8601.
 * The Title gate narrows this to full precision — release order cannot be
 * derived from a year alone (Iron Man and The Incredible Hulk are both 2008,
 * and the order between them matters).
 */
export const IsoDatePartial = z
  .string()
  .regex(
    /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/,
    "ISO 8601: YYYY, YYYY-MM, or YYYY-MM-DD",
  );

export const IsoDateFull = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "ISO 8601 full precision required after sync: YYYY-MM-DD",
  )
  .refine((s) => {
    const d = new Date(s);
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
  }, "not a real calendar date");

export const HexColor = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "six-digit hex, e.g. #4A1D1D");

/** Every user-facing string is bilingual. There is no English-only copy. */
export const Bilingual = z.object({
  en: z.string().trim().min(1),
  ar: z.string().trim().min(1),
});

/**
 * Arabic combining marks — fatha, damma, kasra, shadda, sukun, the tanwin, and
 * the superscript alef. Each is its own UTF-16 code unit, so `.length` counts a
 * fully-voweled word as far longer than it looks.
 */
const ARABIC_DIACRITICS = /[\u064B-\u0655\u0670]/gu;

/**
 * Visible length: what a reader sees, not what UTF-16 stores.
 *
 * The cap has to mean the same thing in both languages. Measuring `.length`
 * would charge Arabic for its diacritics, so a line that is visually SHORTER
 * than its English counterpart could fail while the English passed. The current
 * drafts are lightly voweled; a native review pass will not be.
 */
export function visibleLength(s: string): number {
  return [...s.normalize("NFC").replace(ARABIC_DIACRITICS, "")].length;
}

/**
 * A one-liner, not a synopsis. The 120-character cap is the structural defence
 * against a TMDB overview being pasted into `spoilerSafe` — which is exactly
 * how the spoiler shield got switched off by default once already.
 */
const oneLiner = (s: z.ZodString) =>
  s.refine(
    (v) => visibleLength(v) <= 120,
    "spoilerSafe is a one-liner, not a synopsis",
  );

export const ShortBilingual = z.object({
  en: oneLiner(z.string().trim().min(1)),
  ar: oneLiner(z.string().trim().min(1)),
});

export const TitleType = z.enum([
  "film",
  "series",
  "season",
  "special",
  "short",
  "animation",
]);
/**
 * A universe is WHO OWNED THE CHARACTER WHEN THE THING WAS MADE.
 *
 * That is not trivia and it is not a genre split: it is the reason a watch
 * order is hard at all, and it is the only grouping that explains why No Way
 * Home needs homework.
 *
 * `marvel-tv` exists because filing Agents of S.H.I.E.L.D. beside Endgame was a
 * category error, not a taste question. Those shows were made by Marvel
 * TELEVISION, a different company under a different executive, for ABC,
 * Freeform and Hulu. Marvel Television was absorbed into Marvel Studios in late
 * 2019 and their canon status went with it. A beginner told they are MCU is
 * told something false about what they need to watch.
 *
 * The order here is the order the universes render in.
 */
export const Universe = z.enum([
  "mcu",
  "sony",
  "fox",
  "defenders",
  "marvel-tv",
  "legacy",
  "animation",
]);
export const Saga = z.enum(["infinity", "multiverse", "none"]);
export const TmdbType = z.enum(["movie", "tv"]);

/** Episodic types may carry seasons; these may not. */
const NON_EPISODIC = new Set(["film", "special", "short"]);

// ---------------------------------------------------------------------------
// The authored node
// ---------------------------------------------------------------------------

export const TitleSource = z.object({
  id: Id,
  titleEn: z.string().trim().min(1),
  titleAr: z.string().trim().min(1),

  type: TitleType,
  universe: Universe,
  saga: Saga.default("none"),
  phase: z.number().int().min(1).max(6).nullable().default(null),

  releaseDate: IsoDatePartial,

  /**
   * In-universe YEAR. CUT FROM v1 — a global story order needs ~130 researched
   * facts that exist on no API, and a half-null story toggle is worse than no
   * story toggle. The field stays here, nullable and unused, so v1.1 can fill
   * it without a migration. Nothing reads it.
   */
  storyYear: z.number().int().nullable().default(null),

  /**
   * The author's CURATED sequence position within this node's universe.
   *
   * Distinct from both `storyYear` (a researched fact) and `requires` (a hard
   * dependency). The Fox X-Men films are the case this exists for: the source
   * document lists them First Class → Origins: Wolverine → X-Men → X2, which is
   * a reading order by events, not by release. First Class is not a
   * *prerequisite* of Origins — encoding it as `requires` would be a lie that
   * pollutes every `pathTo` result — but it does come first.
   *
   * Coverage is all-or-nothing per universe (rule B16), so the story/release
   * toggle only appears where the whole block is ranked. That is the same
   * "never ship a half-null toggle" rule, scoped to a universe instead of the
   * whole site.
   */
  storyRank: z.number().int().positive().nullable().default(null),

  // --- filled by scripts/sync-tmdb.ts, never by hand -----------------------
  /** For an episodic node: the sum of every episode across `seasons`. */
  runtimeMin: z.number().int().positive().nullable().default(null),

  /**
   * A RUNTIME WE KNOW AND NO SERVICE CARRIES — stated, not fetched.
   *
   * `runtimeMin` is machine-fetched and F7 forbids the authored corpus from
   * carrying it, which is the right rule: a hand-typed figure beside a synced
   * one drifts the moment the sync updates. But TMDB has no runtime at all for
   * the 2009 Elektra short, so the site described a released film as having no
   * measurable length — and then, worse, as "not yet released".
   *
   * This is a SEPARATE field with a separate name, so nothing about F7
   * changes: the corpus still never carries the fetched value. It carries a
   * fallback, used only where the fetch came back empty, and every use of it
   * is a deliberate line in a diff.
   */
  runtimeFallbackMin: z.number().int().positive().nullable().default(null),
  tmdbId: z.number().int().positive().nullable().default(null),
  /**
   * Hand-set ONLY where TMDB has no record and IMDb does. One title uses it.
   * Everything else gets its IMDb id from the TMDB sync, and a hand-written one
   * would be a second source of truth for a fact a script already fetches.
   */
  imdbId: z.string().regex(/^tt\d+$/).nullable().default(null),
  /**
   * An ABSOLUTE poster URL, hand-set only where no service the sync uses has
   * one. Exactly one title needs it: a 2009 independent short that TMDB has
   * never indexed, so `posterPath` is null forever and the designed plate was
   * the only alternative.
   *
   * Everything else gets a TMDB PATH from the sync. A URL here is a second
   * source of truth for a fact a script normally fetches, which is why the
   * shape is different enough that nobody mistakes one for the other.
   */
  posterUrl: z.string().url().nullable().default(null),
  /** Which TMDB endpoint this node resolves against. */
  tmdbType: TmdbType.nullable().default(null),

  // --- episodic bookkeeping ------------------------------------------------
  /**
   * Which TMDB season numbers this node covers.
   * `[]` for a film. `[1]` for "Loki: season 1".
   * `[1,2,3,4,5,6,7]` for the single "Agents of S.H.I.E.L.D. season 1–7" node.
   */
  seasons: z.array(z.number().int().positive()).default([]),
  /** Grouping key so the UI can gather Loki S1 + S2 under one show. Not a node ref. */
  showId: z.string().nullable().default(null),

  // --- THE GRAPH — this is the product ------------------------------------
  /** Hard edge: you will be lost without it. Drives `pathTo`. */
  requires: z.array(Id).default([]),
  /** Soft edge: better with it. Surfaces as "+ Recommended". */
  enriches: z.array(Id).default([]),
  /** Skippable on a first watch. Thread renders dashed. */
  optional: z.boolean().default(false),
  /** On the spine. Drives the "essentials" order. */
  essential: z.boolean().default(false),

  // --- editorial -----------------------------------------------------------
  /**
   * The comic caption box. Required if and only if this node has a `requires`
   * edge crossing a universe boundary — see `lib/validate.ts` rule B11.
   * Same-universe sequence (Endgame after Infinity War) gets no note; if every
   * edge produced one, the red box would become wallpaper and stop meaning
   * "detour ahead", which is the whole job of §4.2.
   */
  /**
   * THE NOTE, AND THE TITLES IT NAMES.
   *
   * A note reads "Before this one: the Deadpool films and Logan", which is
   * perfectly clear if you already know what those are — and this site exists
   * for the reader who does not. Prose cannot be clicked, so the note carries
   * the ids it refers to and the page renders them as real links beside it.
   *
   * `mentions` is a LIST OF IDS rather than markup inside the string, for two
   * reasons: the note exists in two languages and the ids would have to be
   * duplicated into both, and a link written into an Arabic sentence would put
   * the reader's cursor inside a bidi run for no benefit. The ids are checked
   * against the corpus by B21, so a rename cannot leave a note pointing at
   * nothing.
   */
  editorNote: Bilingual.extend({
    mentions: z.array(Id).default([]),
  })
    .nullable()
    .default(null),

  /**
   * One line, shown ALWAYS — shield up or down, to everyone.
   *
   * NEVER seeded from TMDB. An `overview` is a marketing synopsis that gives
   * away the premise turn, and putting one here defeats the spoiler shield by
   * default. This field is hand-authored, in the site's own voice, and it is
   * short: "Where it all starts." Under 120 characters, enforced by test.
   */
  spoilerSafe: ShortBilingual.nullable().default(null),

  /**
   * Connective tissue, masked by the spoiler shield until tapped.
   * This is where the TMDB overview goes — a synopsis is exactly the kind of
   * thing the shield exists to hide. Optional at every stage.
   *
   * PARTIAL on purpose, and only here on the source. The Arabic review rewrote
   * 14 Arabic lines; 5 of them replace a machine-translated `ar-SA` seed whose
   * English overview is still perfectly good, and the other 9 belong to titles
   * TMDB gave no overview for in either language. A whole-object override would
   * force a choice between blanking the English on the first group and
   * inventing English on the second. Neither is acceptable, so an override may
   * name one language and let the other keep syncing — merged field-by-field in
   * `build.ts`. `Bilingual` stays the shape everywhere downstream.
   */
  context: Bilingual.partial()
    .refine((v) => v.en !== undefined || v.ar !== undefined, {
      message:
        "an empty context override does nothing — omit the field instead",
    })
    .nullable()
    .default(null),
});

export type TitleSource = z.infer<typeof TitleSource>;

// ---------------------------------------------------------------------------
// The built node — what every page actually renders from
// ---------------------------------------------------------------------------

export const Title = TitleSource.extend({
  releaseDate: IsoDateFull,
  runtimeMin: z.number().int().positive(),
  spoilerSafe: ShortBilingual,

  tmdbId: z.number().int().positive().nullable(),
  tmdbType: TmdbType.nullable(),

  /** TMDB path only — `/abc.jpg`. We store the path, never the bytes (§14.2). */
  posterPath: z
    .string()
    // ascii-ok: TMDB poster paths are base-62 hashes by construction.
    .regex(/^\/[\w-]+\.(jpg|png)$/, "a TMDB poster path, not a URL")
    .nullable(),
  /** Dominant colour, six bytes. Reserves the box without a 400-byte base64. */
  posterTint: HexColor,
  /** Only populated for the handful of nodes that are an LCP element somewhere. */
  blurDataURL: z.string().startsWith("data:image/").nullable().default(null),
});

export type Title = z.infer<typeof Title>;

// ---------------------------------------------------------------------------
// Per-node invariants (shape only — cross-node checks live in lib/validate.ts)
// ---------------------------------------------------------------------------

/**
 * Rules a single node satisfies on its own. Cross-node rules (referential
 * integrity, cycles, essential closure, the cross-universe note rule) need the
 * whole corpus and live in `lib/validate.ts`, because zod cannot see siblings
 * from inside a refinement.
 */
export function applyNodeInvariants<S extends z.ZodTypeAny>(schema: S) {
  return schema.superRefine((t: TitleSource, ctx: z.RefinementCtx) => {
    const fail = (message: string, path: (string | number)[]) =>
      ctx.addIssue({ code: z.ZodIssueCode.custom, message, path });

    if (t.requires.includes(t.id))
      fail("a title cannot be its own prerequisite", ["requires"]);
    if (t.enriches.includes(t.id))
      fail("a title cannot be its own prerequisite", ["enriches"]);

    if (t.optional && t.essential) {
      fail("a title cannot be both optional and essential", ["essential"]);
    }

    if (new Set(t.requires).size !== t.requires.length) {
      fail("duplicate id in requires", ["requires"]);
    }
    if (new Set(t.enriches).size !== t.enriches.length) {
      fail("duplicate id in enriches", ["enriches"]);
    }
    for (const e of t.enriches) {
      if (t.requires.includes(e)) {
        fail(
          `"${e}" is in both requires and enriches — an edge is hard or soft, never both`,
          ["enriches"],
        );
      }
    }

    if (t.phase !== null && t.universe !== "mcu") {
      fail("phase is an MCU concept — leave it null outside the MCU", [
        "phase",
      ]);
    }
    if (t.saga !== "none" && t.universe !== "mcu") {
      fail("saga is an MCU concept — leave it 'none' outside the MCU", [
        "saga",
      ]);
    }

    if (NON_EPISODIC.has(t.type) && t.seasons.length > 0) {
      fail(`a ${t.type} has no seasons`, ["seasons"]);
    }
    if (t.type === "season" && t.seasons.length !== 1) {
      fail("a season node covers exactly one season", ["seasons"]);
    }
    if (t.type === "series" && t.seasons.length === 0) {
      fail("a series node must declare which seasons it covers", ["seasons"]);
    }
    if (new Set(t.seasons).size !== t.seasons.length) {
      fail("duplicate season number", ["seasons"]);
    }
    if (t.showId !== null && t.seasons.length === 0) {
      fail("showId groups episodic nodes; this node has no seasons", [
        "showId",
      ]);
    }
  });
}

export const TitleSourceStrict = applyNodeInvariants(TitleSource);
export const TitleStrict = applyNodeInvariants(Title);
