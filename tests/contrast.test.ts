import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * WCAG 2.2 AA (ISO/IEC 40500) contrast, computed from the tokens that actually
 * ship rather than from a claim in a document.
 *
 * The brief asserted that --red-600 clears 4.5:1 against the dark background.
 * It does not. The design still works, because red is never text here, but the
 * reasoning had to be corrected and then pinned so nobody re-derives it from
 * the same wrong premise.
 *
 * The token NAMES changed in the design pass (--paper became --surface, and the
 * neutrals went from warm to zinc). The names here were updated to follow them.
 * No expected ratio was moved to accommodate a colour: where a value changed,
 * the assertion below says what the new one is and why that is acceptable.
 */

const raw = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
/** Comments stripped: a rule that says "never `outline: none`" must not read as one. */
const css = raw.replace(/\/\*[\s\S]*?\*\//g, "");

/** Pull a hex token out of globals.css so the test and the stylesheet cannot drift. */
function token(name: string, scope?: RegExp): string {
  const haystack = scope ? (css.match(scope)?.[0] ?? "") : css;
  const m = haystack.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token ${name} not found in globals.css`);
  return m[1]!;
}

function luminance(hex: string): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = channel(parseInt(hex.slice(1, 3), 16));
  const g = channel(parseInt(hex.slice(3, 5), 16));
  const b = channel(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

/**
 * The scopes flipped with the theme. DARK is now the DEFAULT and lives in the
 * `@theme` block; LIGHT is the override and lives in `:root[data-theme="light"]`.
 * Reading them by scope rather than by name keeps this test measuring what
 * actually ships in each theme.
 */
const DARK = /@theme \{[\s\S]*?\n\}/;
const LIGHT = /:root\[data-theme="light"\] \{[\s\S]*?\n\}/;

const dark = {
  surface: token("--color-surface", DARK),
  surface2: token("--color-surface-2", DARK),
  elevated: token("--color-elevated", DARK),
  ink: token("--color-ink", DARK),
  inkSoft: token("--color-ink-soft", DARK),
  branch: token("--color-branch", DARK),
  red: token("--color-red", DARK),
  redInk: token("--color-red-ink", DARK),
  track: token("--color-red-200", DARK),
};
const light = {
  surface: token("--color-surface", LIGHT),
  surface2: token("--color-surface-2", LIGHT),
  elevated: token("--color-elevated", LIGHT),
  ink: token("--color-ink", LIGHT),
  inkSoft: token("--color-ink-soft", LIGHT),
  branch: token("--color-branch", LIGHT),
  red: token("--color-red", LIGHT),
  redInk: token("--color-red-ink", LIGHT),
  track: token("--color-red-200", LIGHT),
};

describe("G. contrast — WCAG 2.2 AA, computed from globals.css", () => {
  it("G1 body text clears 4.5:1 in light", () => {
    expect(ratio(light.ink, light.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it("G2 body text clears 4.5:1 in dark", () => {
    expect(ratio(dark.ink, dark.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it("G3 the thread clears 3:1 against both backgrounds (1.4.11 non-text)", () => {
    expect(ratio(light.red, light.surface)).toBeGreaterThanOrEqual(3);
    expect(ratio(dark.red, dark.surface)).toBeGreaterThanOrEqual(3);
  });

  it("G4 --red-ink is never a downgrade on --red, in either theme", () => {
    /**
     * THIS ASSERTION HAS NOW CHANGED TWICE, and the history is the point.
     *
     * v1: red measured 4.41:1 on the warm light ground and 4.04:1 on dark, so
     *     the rule was "red fails AA in both themes, therefore it is a graphic".
     * v2: the ground went cool and lighter (#FAFAFA), red passed in light and
     *     still failed in dark, so the rule narrowed to the binding theme.
     * v3: dark became the DEFAULT and took a lighter red (#E23636) chosen to
     *     sit on a near-black ground. It measures 4.54:1 there. Red now clears
     *     AA in BOTH themes and the old premise is simply false.
     *
     * Rewriting it to "red passes" would be a test that asserts nothing. The
     * invariant that survived all three is this: --red-ink exists so red can
     * carry words, and it must never be LESS legible than --red, or the token
     * meant for text would be the worse choice for text. That can break
     * silently the next time either value is tuned; the old one cannot.
     */
    expect(ratio(dark.redInk, dark.surface)).toBeGreaterThanOrEqual(
      ratio(dark.red, dark.surface),
    );
    expect(ratio(light.redInk, light.surface)).toBeGreaterThanOrEqual(
      ratio(light.red, light.surface),
    );
  });

  it("G4b the branch encoding clears 3:1 in BOTH themes (1.4.11)", () => {
    /**
     * Blue is the only non-red colour on the site and it carries information:
     * this title is not Marvel Studios. That makes it a non-text element
     * conveying meaning, which needs 3:1.
     *
     * The old #1E40AF measured 2.28:1 against the dark ground and had never
     * been checked there — the branch node was, in dark mode, a shape you could
     * barely see carrying the one piece of information the fork exists to give.
     */
    expect(ratio(light.branch, light.surface)).toBeGreaterThanOrEqual(3);
    expect(ratio(dark.branch, dark.surface)).toBeGreaterThanOrEqual(3);
  });

  it("G4c metadata at 62% ink still clears 4.5:1 — it is text, not decoration", () => {
    // Years, runtimes and counts are set at 62% to sit under the titles. A
    // muted grey that drops below AA is the single most common way a design
    // like this becomes hard to read, so the softened ink is a resolved hex
    // rather than an opacity, precisely so it can be measured.
    expect(ratio(light.inkSoft, light.surface)).toBeGreaterThanOrEqual(4.5);
    expect(ratio(dark.inkSoft, dark.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it("G5 --red-ink is the token for red TEXT, and clears 4.5:1 in both themes", () => {
    expect(ratio(light.redInk, light.surface)).toBeGreaterThanOrEqual(4.5);
    expect(ratio(dark.redInk, dark.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it("G6 the focus ring is visible against both backgrounds", () => {
    // The ring is --red-600; 3:1 is the floor for a UI affordance.
    expect(ratio(light.red, light.surface)).toBeGreaterThanOrEqual(3);
    expect(ratio(dark.red, dark.surface)).toBeGreaterThanOrEqual(3);
  });

  it("G14 the rail track stays subordinate to the progress line in BOTH themes", () => {
    // #FECACA is a pale pink on paper and a near-WHITE stripe on #140A0A. Left
    // unchanged in dark it dominated the rail and made the red progress read as
    // the secondary mark, inverting the point of the signature element. Caught
    // by rendering dark for the first time, not by any assertion — hence this.
    const lightTrack = ratio(light.track, light.surface);
    const lightProgress = ratio(light.red, light.surface);
    expect(lightTrack, "light track outshines the progress").toBeLessThan(lightProgress);

    const darkTrack = ratio(dark.track, dark.surface);
    const darkProgress = ratio(dark.red, dark.surface);
    expect(darkTrack, "dark track outshines the progress").toBeLessThan(darkProgress);
  });

  it("G14b the track is still visible — subordinate is not invisible", () => {
    expect(ratio(light.track, light.surface)).toBeGreaterThan(1.1);
    expect(ratio(dark.track, dark.surface)).toBeGreaterThan(1.1);
  });

  it("G15 the editor's note clears AA on the surface it actually uses", () => {
    /**
     * RE-POINTED, not relaxed. The note used to be white on a solid --red-600
     * box, and this test measured that pair. The design pass moved it to the
     * second surface with a hairline, because a sixth red object broke the
     * one-accent lock. A test still measuring white-on-red would be asserting
     * something the page no longer renders, which is worse than no test.
     *
     * Same floor, same 4.5:1, against the pair that ships.
     */
    expect(ratio(light.ink, light.surface2)).toBeGreaterThanOrEqual(4.5);
    expect(ratio(dark.ink, dark.surface2)).toBeGreaterThanOrEqual(4.5);
  });

  it("G16 the one filled red object, the primary CTA, carries white text", () => {
    // The single place red is a background rather than a line. Its label is
    // white and has to clear AA against it, or the one CTA on the site is the
    // one thing on it that cannot be read.
    expect(ratio("#ffffff", light.red)).toBeGreaterThanOrEqual(4.5);
  });

  it("G7 red is legible as a GRAPHIC in both themes, at 3:1", () => {
    /**
     * CHANGED, and deliberately. The previous rule was that red is the same hex
     * in both themes, so the thread reads as one object. That held while light
     * was the default and dark was a variant. With dark as the DEFAULT, the
     * ground moved far enough that #DC2626 sits at 4.12:1 on it, which is fine
     * for a graphic and thin for the site's signature element.
     *
     * So the invariant is now the thing that actually matters — the thread is
     * clearly visible on whatever it is drawn on — and the hue is held by eye
     * across two values a few percent apart rather than by a string comparison.
     */
    expect(ratio(dark.red, dark.surface)).toBeGreaterThanOrEqual(3);
    expect(ratio(light.red, light.surface)).toBeGreaterThanOrEqual(3);
  });

  it("G17 the elevated surface is distinguishable from the ground", () => {
    // Depth is the material in this design. If a card cannot be told from the
    // page behind it, the elevation is decorative and the shadow is doing all
    // the work.
    expect(ratio(dark.elevated, dark.surface)).toBeGreaterThan(1.15);
    expect(ratio(light.elevated, light.surface)).toBeGreaterThan(1.02);
  });
});

describe("G. token hygiene", () => {
  it("G8 the 320px floor is set", () => {
    expect(css).toMatch(/min-width:\s*320px/);
  });

  it("G9 no `outline: none` anywhere", () => {
    expect(css).not.toMatch(/outline:\s*none/);
  });

  it("G10 inputs are at least 16px, so iOS cannot zoom on focus", () => {
    expect(css).toMatch(/font-size:\s*max\(16px/);
  });

  it("G11 the Arabic display face is a single swappable variable", () => {
    expect(css).toMatch(/--font-ar-display:/);
    expect((css.match(/--font-ar-display:/g) ?? []).length).toBe(1);
  });

  it("G12 reduced motion is respected", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
  });

  it("G13 body does not hide horizontal overflow", () => {
    // `overflow-x: hidden` conceals overflow rather than preventing it. With it
    // set, the 320px floor becomes unenforceable, the dev guard finds nothing,
    // and every Playwright scrollWidth assertion passes on a broken layout. It
    // also makes body a scroll container, which breaks position:sticky on
    // descendants — and the sticky top bar arrives in step 5.
    // ascii-ok: matching a CSS selector, which is ASCII by construction.
    const bodyRule = css.match(/\bbody\s*\{[^}]*\}/)?.[0] ?? "";
    expect(bodyRule).not.toMatch(/overflow-x:\s*hidden/);
    expect(bodyRule).not.toMatch(/overflow:\s*hidden/);
  });
});
