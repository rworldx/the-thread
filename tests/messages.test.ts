import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import { COLLECTIONS } from "@/lib/collections";
import { Universe } from "@/content/schema";
import { CharacterCategory, RelationKind } from "@/content/character-schema";
import { allCharacters } from "@/lib/characters";
import { titles, videosOf } from "@/content/build";
import { sagaGroups } from "@/lib/saga";

/**
 * I. EVERY KEY THE CODE CAN ASK FOR, IN BOTH LOCALES.
 *
 * THE CHECK THAT WAS MISSING, and the reason it was missing is instructive.
 * The sweep I ran compared en.json against ar.json — symmetric, no gaps, no
 * empties — and then looked for keys nothing uses. Both directions were about
 * the two FILES. Neither asked the only question that matters to a reader:
 * does every key the CODE requests actually exist?
 *
 * A key missing from both locales is symmetric. It passes a file diff cleanly
 * and renders as the raw dotted string on the page.
 *
 * Most keys are literals, and a literal that does not exist throws
 * MISSING_MESSAGE at build time, so the build catches those. The dangerous ones
 * are BUILT FROM DATA:
 *
 *   t(`universes.name.${id}`)          one per collection
 *   t(`characters.species_.${slug}`)   one per species in the corpus
 *   t(`characters.affiliation_.${a}`)  one per affiliation
 *
 * Those only throw on the page that happens to render that value. Add a
 * collection, a species or an affiliation and nothing complains until someone
 * opens the one page where it appears — and on a static build, the page still
 * gets generated, so even the build can stay green.
 *
 * So this enumerates the domains from the DATA, not from a list kept by hand,
 * and asserts the message exists in both locales. Add a species to the corpus
 * and this goes red immediately rather than eventually.
 */

type Msgs = Record<string, unknown>;

/** Walks a dotted path. Returns undefined for anything missing or non-string. */
function lookup(msgs: Msgs, key: string): string | undefined {
  let node: unknown = msgs;
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : undefined;
}

/**
 * The same slug the components use for a free-text field. Kept here rather than
 * imported so that a change to the slugging in one place shows up as a failure
 * rather than being silently mirrored.
 */
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Every dynamically-built key family, with its domain derived from the data. */
function dynamicKeys(): string[] {
  const keys: string[] = [];

  for (const id of COLLECTIONS) {
    keys.push(`universes.name.${id}`, `universes.bridge.${id}`);
  }
  for (const u of Universe.options) keys.push(`universe.name.${u}`);
  for (const s of sagaGroups(titles)) keys.push(`saga.${s.saga}`);

  const species = new Set(
    allCharacters.map((c) => c.species).filter((s): s is string => s !== null),
  );
  for (const s of species) keys.push(`characters.species_.${slug(s)}`);

  const affiliations = new Set(allCharacters.flatMap((c) => c.affiliation));
  for (const a of affiliations) keys.push(`characters.affiliation_.${slug(a)}`);

  for (const c of CharacterCategory.options) keys.push(`characters.category_.${c}`);

  /** Relation kinds, which head the groups on a character page. */
  for (const k of RelationKind.options) keys.push(`characters.kind.${k}`);

  /** Video types come from TMDB, so the domain is whatever the sync returned. */
  const videoTypes = new Set(
    titles.flatMap((t) => videosOf(t.id).map((v) => v.type.toLowerCase())),
  );
  for (const v of videoTypes) keys.push(`title.videoType.${v}`);

  for (const n of [1, 2, 3, 4, 5]) {
    keys.push(`what.ch${n}Year`, `what.ch${n}Title`, `what.ch${n}Body`);
  }

  return keys;
}

describe("I. messages", () => {
  it("I10 every data-derived key resolves in BOTH locales", () => {
    const missing: string[] = [];
    for (const key of dynamicKeys()) {
      if (lookup(en as Msgs, key) === undefined) missing.push(`en: ${key}`);
      if (lookup(ar as Msgs, key) === undefined) missing.push(`ar: ${key}`);
    }
    expect(missing, "keys the code builds but no locale defines").toEqual([]);
  });

  it("I11 the two locales have identical key sets", () => {
    const flat = (o: unknown, prefix = ""): string[] =>
      typeof o === "object" && o !== null
        ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) =>
            typeof v === "object" && v !== null ? flat(v, `${prefix}${k}.`) : [`${prefix}${k}`],
          )
        : [];
    const e = flat(en).sort();
    const a = flat(ar).sort();
    expect(a).toEqual(e);
  });

  it("I12 no message is empty, and no Arabic value is left in English", () => {
    const flat = (o: unknown, prefix = ""): [string, string][] =>
      typeof o === "object" && o !== null
        ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) =>
            typeof v === "object" && v !== null
              ? flat(v, `${prefix}${k}.`)
              : ([[`${prefix}${k}`, String(v)]] as [string, string][]),
          )
        : [];

    for (const [k, v] of [...flat(en), ...flat(ar)]) {
      expect(v.trim().length, `${k} is empty`).toBeGreaterThan(0);
    }

    /**
     * An Arabic value with no Arabic character in it is untranslated — unless
     * it is pure interpolation (`{name}`), a number, or a proper noun the
     * Arabic page also prints in Latin.
     */
    const arEntries = flat(ar);
    const enMap = new Map(flat(en));
    for (const [k, v] of arEntries) {
      /**
       * ICU MESSAGES ARE EXEMPT, and getting this wrong made the check useless.
       *
       * `{n, plural, zero {لا عناوين} one {عنوان واحد} ...}` is correctly
       * translated Arabic. Stripping `{...}` non-greedily eats the inner case
       * bodies — the Arabic — first, and leaves the ICU keywords `plural`,
       * `zero`, `one`, `few`, `many`, `other` behind as bare Latin. The check
       * then failed on every plural in the file.
       *
       * A message with ICU syntax in it cannot be judged this way, so it is
       * skipped. Plain strings are the ones that can actually be left in
       * English by accident, and those are still checked.
       */
      // ascii-ok: ICU syntax keywords are ASCII by specification — `plural`,
      // `select`, `selectordinal`. The Arabic is in the CASE BODIES, which is
      // exactly what this must not look at.
      if (/\{\s*\w+\s*,/.test(v)) continue;
      const stripped = v.replace(/\{[^{}]*\}/g, "").trim();
      if (stripped === "") continue; // pure interpolation
      if (!/[A-Za-z]/.test(stripped)) continue; // no Latin at all, fine
      if (/[؀-ۿ]/.test(stripped)) continue; // has Arabic, fine
      // Left: an all-Latin Arabic value. Allowed only if English says the same
      // thing and it is a name we do not translate.
      const ALLOWED = new Set(["nav.mcu", "characters.chip.x-men"]);
      expect(ALLOWED.has(k), `${k} is untranslated: ${JSON.stringify(v)} (en: ${enMap.get(k)})`).toBe(
        true,
      );
    }
  });
});
