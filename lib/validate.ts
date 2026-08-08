import type { TitleSource } from "@/content/schema";
import { CycleError, topoSort } from "./graph";

/**
 * Cross-node corpus rules. These run in CI and fail the build (brief §2).
 *
 * The validator collects EVERY violation before returning. A build that
 * surfaces one error per run turns a bad content PR into an afternoon of
 * whack-a-mole.
 */

export interface Violation {
  /** Stable machine-readable key. Tests assert on this, not on prose. */
  rule: string;
  message: string;
  /** Every node implicated, so a CI log points straight at the file. */
  ids: string[];
}

type Node = Pick<
  TitleSource,
  | "id" | "universe" | "requires" | "enriches" | "essential" | "editorNote"
  | "seasons" | "showId" | "storyRank" | "releaseDate" | "optional"
  | "titleEn" | "titleAr" | "spoilerSafe"
>;

export function validateCorpus(titles: readonly Node[]): Violation[] {
  const v: Violation[] = [];
  const add = (rule: string, message: string, ids: string[]) => v.push({ rule, message, ids });

  // --- B1 unique ids -------------------------------------------------------
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const t of titles) {
    if (seen.has(t.id)) dupes.add(t.id);
    seen.add(t.id);
  }
  for (const id of dupes) {
    add("duplicate-id", `id "${id}" is declared more than once`, [id]);
  }

  const byId = new Map(titles.map((t) => [t.id, t]));

  // --- B2/B3 referential integrity ----------------------------------------
  for (const t of titles) {
    for (const r of t.requires) {
      if (!byId.has(r)) {
        add("dangling-requires", `"${t.id}" requires "${r}", which does not exist`, [t.id, r]);
      }
    }
    for (const e of t.enriches) {
      if (!byId.has(e)) {
        add("dangling-enriches", `"${t.id}" enriches "${e}", which does not exist`, [t.id, e]);
      }
    }
  }

  // --- B4 one season number per show --------------------------------------
  const seasonSlots = new Map<string, string>();
  for (const t of titles) {
    if (t.showId === null) continue;
    for (const s of t.seasons) {
      const key = `${t.showId}#${s}`;
      const prior = seasonSlots.get(key);
      if (prior !== undefined && prior !== t.id) {
        add(
          "duplicate-season",
          `"${t.showId}" season ${s} is covered by both "${prior}" and "${t.id}"`,
          [prior, t.id],
        );
      } else {
        seasonSlots.set(key, t.id);
      }
    }
  }

  // --- B7/B8 hard cycles ---------------------------------------------------
  // Only meaningful once every edge resolves; a dangling edge is reported above.
  const resolvable = titles.filter((t) => t.requires.every((r) => byId.has(r)));
  try {
    topoSort(resolvable.map(toGraphNode));
  } catch (e) {
    if (e instanceof CycleError) {
      add("cycle", `requires forms a cycle: ${e.cycle.join(" → ")}`, dedupe(e.cycle));
    } else throw e;
  }

  // --- B9 soft cycles ------------------------------------------------------
  // requires ∪ enriches, folded into `requires` so the same detector applies.
  try {
    topoSort(
      titles.map((t) => ({
        ...toGraphNode(t),
        requires: [...t.requires, ...t.enriches].filter((r) => byId.has(r)),
      })),
    );
  } catch (e) {
    if (e instanceof CycleError) {
      add(
        "soft-cycle",
        `requires ∪ enriches forms a cycle: ${e.cycle.join(" → ")}`,
        dedupe(e.cycle),
      );
    } else throw e;
  }

  // --- B10 essential closure ----------------------------------------------
  // An essential title depending on a non-essential one leaves a hole in the
  // "just the spine" order, and the hole is invisible until someone follows it.
  for (const t of titles) {
    if (!t.essential) continue;
    for (const r of t.requires) {
      const dep = byId.get(r);
      if (dep && !dep.essential) {
        add(
          "essential-closure",
          `"${t.id}" is essential but requires "${r}", which is not — the spine has a hole in it`,
          [t.id, r],
        );
      }
    }
  }

  // --- B11 the editor's note rule, as an iff -------------------------------
  // Required exactly when an edge leaves the node's universe, forbidden
  // otherwise. If every sequential edge produced a note, the red caption box
  // would stop meaning "detour ahead" (brief §4.2).
  //
  // The check runs over `requires` ∪ `enriches`. A detour is a detour whether
  // it is mandatory or merely recommended — that is exactly what the caption
  // box announces. Testing `requires` alone would fail a correct corpus the
  // moment a hard prerequisite is softened to a recommendation, which is a
  // normal editorial move.
  for (const t of titles) {
    const crossings = [...new Set([...t.requires, ...t.enriches])]
      .map((r) => byId.get(r))
      .filter((d): d is Node => d !== undefined && d.universe !== t.universe);

    if (crossings.length > 0 && t.editorNote === null) {
      add(
        "missing-editor-note",
        `"${t.id}" points at ${crossings.map((c) => `"${c.id}"`).join(", ")} in another ` +
          `universe and needs an editorNote explaining the detour`,
        [t.id, ...crossings.map((c) => c.id)],
      );
    }
    if (crossings.length === 0 && t.editorNote !== null) {
      add(
        "superfluous-editor-note",
        `"${t.id}" has an editorNote but every edge stays inside its own universe — ` +
          `plain sequence needs no note`,
        [t.id],
      );
    }
  }

  // --- B21 an editor's note may only name titles that exist -----------------
  // The note carries `mentions`, the ids it talks about, and the page renders
  // them as links. An id that has been renamed away would render as a link to a
  // 404 on a route with `dynamicParams: false` — and it would do it silently,
  // because a mention is a string like any other and nothing else reads it.
  //
  // A note pointing at ITSELF is also an error, and a cheaper one to make than
  // it looks: the notes were authored by listing what comes before a title
  // while looking at that title.
  for (const t of titles) {
    for (const id of t.editorNote?.mentions ?? []) {
      if (!byId.has(id)) {
        add(
          "unknown-mention",
          `"${t.id}" has an editorNote mentioning "${id}", which is not a title in the corpus`,
          [t.id],
        );
      } else if (id === t.id) {
        add(
          "self-mention",
          `"${t.id}" has an editorNote mentioning itself`,
          [t.id],
        );
      }
    }
  }

  // --- B18 optional titles may not be hard prerequisites --------------------
  // The thread draws an optional title dashed and the copy says "skippable on a
  // first watch". If something later hard-requires it, a user who takes that
  // cue walks into the dependent unprepared. B10 does not catch this: it only
  // guards the essential spine, and both ends of this trap can sit off it.
  const requiredBy = new Map<string, string[]>();
  for (const t of titles) {
    for (const r of t.requires) {
      if (!requiredBy.has(r)) requiredBy.set(r, []);
      requiredBy.get(r)!.push(t.id);
    }
  }
  for (const t of titles) {
    const dependents = requiredBy.get(t.id) ?? [];
    if (t.optional && dependents.length > 0) {
      add(
        "optional-with-dependents",
        `"${t.id}" is marked optional but ${dependents.map((d) => `"${d}"`).join(", ")} ` +
          `hard-require it — the thread would draw it skippable and then strand anyone ` +
          `who skips it. Soften those edges to \`enriches\`, or drop \`optional\`.`,
        [t.id, ...dependents],
      );
    }
  }

  // --- B16 storyRank coverage is all-or-nothing per universe ---------------
  const universes = new Map<string, Node[]>();
  for (const t of titles) {
    if (!universes.has(t.universe)) universes.set(t.universe, []);
    universes.get(t.universe)!.push(t);
  }
  for (const [universe, group] of universes) {
    // `!= null` on purpose: a hand-written fixture or a JSON round-trip can
    // leave the field `undefined`, and an unranked universe must stay unranked.
    const ranked = group.filter((t) => t.storyRank != null);
    if (ranked.length === 0) continue;

    if (ranked.length !== group.length) {
      const missing = group.filter((t) => t.storyRank == null).map((t) => t.id);
      add(
        "story-rank-coverage",
        `universe "${universe}" is partially ranked — ${missing.length} title(s) have no ` +
          `storyRank, so the story/release toggle cannot be shown`,
        missing,
      );
    }

    const slots = new Map<number, string>();
    for (const t of ranked) {
      const prior = slots.get(t.storyRank!);
      if (prior !== undefined) {
        add(
          "story-rank-duplicate",
          `universe "${universe}" has two titles at storyRank ${t.storyRank}: ` +
            `"${prior}" and "${t.id}"`,
          [prior, t.id],
        );
      } else slots.set(t.storyRank!, t.id);
    }

    // --- B17 a curated order may not contradict a hard dependency ----------
    for (const t of ranked) {
      for (const r of t.requires) {
        const dep = byId.get(r);
        if (dep?.storyRank != null && dep.universe === t.universe && dep.storyRank > t.storyRank!) {
          add(
            "story-rank-contradiction",
            `"${t.id}" (rank ${t.storyRank}) requires "${r}" (rank ${dep.storyRank}) — the ` +
              `curated order puts a prerequisite after the title that needs it`,
            [t.id, r],
          );
        }
      }
    }
  }

  // --- B19 a spoiler-safe line may not name another title ------------------
  // "Leads into Endgame" is a spoiler with a friendly tone, and pointing at
  // another work is the exact failure this always-visible field exists to
  // prevent.
  //
  // Both scripts, both directions. An earlier version compared only `titleEn`,
  // which left every Arabic line unguarded — half the corpus, under a rule
  // written to be mechanical precisely so judgment was not required.
  //
  // Also checks the SUBTITLE, because that is how people actually refer to
  // these: "leads into Endgame" does not contain "Avengers: Endgame", and
  // "يقود إلى نهاية اللعبة" does not contain "المنتقمون: نهاية اللعبة".
  //
  // Two-word minimum throughout. A bare "Thor" or "Logan" is a character at
  // least as often as a work, and banning those would make half the corpus
  // undescribable.
  /**
   * "Season 2" / "الموسم الثاني" is bookkeeping, not a way anyone cites a work.
   *
   * NOT `\b` — JavaScript defines the word boundary over ASCII `[A-Za-z0-9_]`
   * only, so `/^الموسم\b/` never matches: neither the Arabic letter before it
   * nor the space after counts as a word character, so there is no boundary
   * between them. The filter looked correct and was silently dead for Arabic,
   * which is the same failure as B19 comparing titleEn only.
   */
  /**
   * Phrases that DESCRIBE rather than cite.
   *
   * "المسلسل الكرتوني" — "the cartoon series" — is a colon-segment of two
   * titles' Arabic names, so a line reading "back to the famous cartoon series"
   * trips the cross-reference rule. Nobody hears that as naming another work; it
   * is a generic descriptor, exactly like a season marker, and banning it would
   * make the animation block undescribable.
   *
   * Kept deliberately short. Every entry is a hole in B19, so the bar is "a
   * phrase any writer would use generically", not "a phrase that is currently
   * inconvenient". B19f asserts the hole does not swallow a real reference.
   */
  const GENERIC_DESCRIPTORS = [
    "المسلسل الكرتوني",
    "مسلسل الرسوم المتحركة",
    "الرسوم المتحركة",
    "The Animated Series",
  ];

  const isSeasonMarker = (s: string) =>
    /^(seasons?)(?=\s|$)/iu.test(s) || /^(الموسم|المواسم)(?=\s|$)/u.test(s);

  /** A form is not a citation if it IS a generic descriptor, or reduces to one. */
  const isGeneric = (s: string) =>
    GENERIC_DESCRIPTORS.some((g) => s === g || s.replace(/^ال/u, "") === g.replace(/^ال/u, ""));

  const referenceForms = (title: string): string[] => {
    const full = title.trim();
    // Every colon/dash-separated segment, not just the last: "Daredevil: Born
    // Again — Season 2" is quoted as "Born Again", which is neither end.
    const segments = full.split(/[:—–]/).map((p) => p.trim());
    return [full, ...segments].filter(
      (f) => f.split(/\s+/).length >= 2 && !isSeasonMarker(f) && !isGeneric(f),
    );
  };

  const works = titles.flatMap((t) =>
    [...new Set([...referenceForms(t.titleEn), ...referenceForms(t.titleAr)])].map((name) => ({
      id: t.id,
      name,
    })),
  );

  for (const t of titles) {
    if (!t.spoilerSafe) continue;
    for (const w of works) {
      if (w.id === t.id) continue;
      for (const lang of ["en", "ar"] as const) {
        if (t.spoilerSafe[lang].includes(w.name)) {
          add(
            "spoiler-cross-reference",
            `"${t.id}" spoilerSafe (${lang}) names another title, "${w.name}" — a ` +
              `spoiler-safe line describes its own setup and never points at another work`,
            [t.id, w.id],
          );
        }
      }
    }
  }

  return v;
}

/**
 * Rules about the AUTHORED layer specifically, which the merged corpus cannot
 * be checked against — by the time nodes reach `content/build.ts` the fields
 * below are legitimately populated.
 *
 * Called by `scripts/validate-corpus.ts` with `content/titles.ts`, not the merge.
 */
export function validateAuthoring(
  authored: readonly Pick<TitleSource, "id" | "spoilerSafe">[],
): Violation[] {
  const v: Violation[] = [];

  // --- B20 spoilerSafe has exactly one home ---------------------------------
  // `content/copy.ts` owns it. Leaving the field settable in titles.ts too gives
  // it two sources of truth that can disagree — the same shape as titleEn baking
  // in a season range while `seasons` also carried it. The schema keeps the
  // field, because `Title` requires it after the merge; authoring it here is
  // what is forbidden.
  const authoredHere = authored.filter((t) => t.spoilerSafe !== null).map((t) => t.id);
  if (authoredHere.length > 0) {
    v.push({
      rule: "spoiler-safe-two-homes",
      message:
        `${authoredHere.length} node(s) set spoilerSafe in titles.ts. That field is owned by ` +
        `content/copy.ts — two homes means two lines that can disagree.`,
      ids: authoredHere,
    });
  }

  return v;
}

function toGraphNode(t: Node) {
  return {
    id: t.id,
    releaseDate: t.releaseDate,
    requires: t.requires,
    enriches: t.enriches,
    essential: t.essential,
    universe: t.universe,
    storyRank: t.storyRank,
  };
}

function dedupe(ids: string[]): string[] {
  return [...new Set(ids)];
}
