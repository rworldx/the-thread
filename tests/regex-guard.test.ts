import { readFileSync, readdirSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Guards against the defect that made B19's season filter silently dead.
 *
 * `/^(الموسم|المواسم)\b/` never matched anything. JavaScript defines `\b` over
 * ASCII `[A-Za-z0-9_]`, so between an Arabic letter and a space there is no
 * boundary to find. It failed OPEN — matched nothing, threw nothing, and left
 * the rule it belonged to looking correct.
 *
 * The precise hazard, since it is narrower than "regexes and Arabic":
 *
 *   \b \B \w \W   ASCII-ONLY. These are the dangerous ones, and the `u` flag
 *                 does NOT fix them — only `\p{…}` escapes are Unicode-aware.
 *   \s            Unicode-aware by spec (includes \p{Space_Separator}, NBSP,
 *                 U+2000–200A). Safe as-is.
 *   \d            ASCII 0–9 only. Correct for this project — §6 fixes Western
 *                 Arabic numerals — but it will not match ٠-٩.
 *
 * So: use `(?=\s|$)` for a boundary, or `\p{L}` with the `u` flag. Where
 * ASCII really is the intent (a TMDB path, a CSS selector), say so with an
 * `ascii-ok:` comment on the line or the one above it, and this test allows it.
 */

/**
 * Includes tests/ and e2e/ — the directories where failing open is WORST.
 *
 * A `\b` that never matches inside `expect(x).not.toMatch(...)` makes the
 * assertion permanently green regardless of what the page renders. An excluded
 * test directory is how a decorative test guarding a stated product rule
 * survives review.
 */
const ROOTS = ["lib", "scripts", "content", "app", "tests", "e2e"];
const HAZARD = /\\[bBwW]/;

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = `${dir}/${entry}`;
    if (statSync(p).isDirectory()) sourceFiles(p, out);
    else if (/\.(ts|tsx|mjs)$/.test(entry)) out.push(p);
  }
  return out;
}

/** Blank out comments and strings so their contents cannot be mistaken for code. */
function stripNonCode(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/\/\/[^\n]*/g, (m) => m.replace(/[^\n]/g, " "))
    // ascii-ok: quote and backslash delimiters in source are ASCII by definition.
    // (This line self-reports because blanking strings mangles a regex that
    // contains quote characters — the parser eating its own input.)
    .replace(/(["'`])(?:\\.|(?!\1)[^\\\n])*\1/g, (m) => m.replace(/[^\n]/g, " "));
}

/** Crude but adequate: a `/…/flags` literal not preceded by an identifier or `/`. */
const REGEX_LITERAL =
  /(?<![\w)\]/*])\/((?:[^/\\\n[]|\\.|\[(?:[^\]\\]|\\.)*\])+)\/([dgimsuvy]*)/g;

interface Hit {
  file: string;
  line: number;
  source: string;
}

function findHazards(): Hit[] {
  const hits: Hit[] = [];
  for (const root of ROOTS) {
    for (const file of sourceFiles(root)) {
      const raw = readFileSync(file, "utf8");
      const code = stripNonCode(raw);
      const lines = raw.split("\n");

      for (const m of code.matchAll(REGEX_LITERAL)) {
        if (!HAZARD.test(m[1]!)) continue;
        const line = code.slice(0, m.index).split("\n").length;
        // An explicit opt-out on this line or within the three above, so the
        // justification can be a short comment block rather than one cramped line.
        const window = lines.slice(Math.max(0, line - 4), line).join("\n");
        if (/ascii-ok:/.test(window)) continue;
        hits.push({ file, line, source: `/${m[1]}/${m[2]}` });
      }
    }
  }
  return hits;
}

describe("H. regex hazards", () => {
  it("H1 no shipping regex uses \\b, \\w, \\B or \\W without an ascii-ok note", () => {
    const hits = findHazards();
    const report = hits.map((h) => `${h.file}:${h.line}  ${h.source}`);
    expect(report, "ASCII-only classes fail open on non-Latin script").toEqual([]);
  });

  it("H2 the guard actually detects the original bug", () => {
    // If this ever stops failing, the detector has drifted and H1 is decorative.
    const sample = `const isSeasonMarker = (s) => /^(الموسم|المواسم)\\b/.test(s);`;
    const code = stripNonCode(sample);
    const found = [...code.matchAll(REGEX_LITERAL)].filter((m) => HAZARD.test(m[1]!));
    expect(found).toHaveLength(1);
  });

  it("H3 the ascii-ok escape hatch works", () => {
    const sample = [
      "// ascii-ok: TMDB paths are ASCII by construction",
      "const p = /^[\\w-]+$/;",
    ].join("\n");
    const code = stripNonCode(sample);
    const lines = sample.split("\n");
    const found = [...code.matchAll(REGEX_LITERAL)]
      .filter((m) => HAZARD.test(m[1]!))
      .filter((m) => {
        const line = code.slice(0, m.index).split("\n").length;
        return !/ascii-ok:/.test(lines[line - 2] ?? "");
      });
    expect(found).toEqual([]);
  });

  it("H4 \\s is Unicode-aware, so it is not flagged", () => {
    // Documents the distinction rather than leaving it folklore: over-flagging
    // \s would push people to disable the rule.
    expect(/\s/.test(" ")).toBe(true); // NBSP
    expect(/\s/.test(" ")).toBe(true); // thin space
    // …whereas \b is ASCII-only, which is the whole problem.
    // ascii-ok: this IS the bug, kept deliberately so the contrast is visible.
    expect(/^الموسم\b/.test("الموسم الأول")).toBe(false);
    expect(/^الموسم(?=\s|$)/u.test("الموسم الأول")).toBe(true);
  });
});

describe("H. import hygiene", () => {
  it("H5 nothing under app/ imports formatRuntime — only formatRuntimeIntl", () => {
    /**
     * `formatRuntime` is English-only: no plural rules, and no way to express
     * Arabic units. It is documented as never rendered to a user, and a doc
     * comment is not a guarantee — the same reasoning as B20 giving spoilerSafe
     * one home.
     *
     * `\bformatRuntime\b` does not match `formatRuntimeIntl`: `I` is a word
     * character, so there is no boundary after the shorter name.
     */
    const offenders: string[] = [];
    for (const file of sourceFiles("app")) {
      // ascii-ok: matching a JavaScript identifier, which is ASCII here.
      if (/\bformatRuntime\b/.test(readFileSync(file, "utf8"))) offenders.push(file);
    }
    expect(offenders, "use formatRuntimeIntl — it goes through the message layer").toEqual([]);
  });
});
