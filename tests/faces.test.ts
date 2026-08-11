import { describe, expect, it } from "vitest";
import { shownCharacters } from "@/lib/characters";

/**
 * Must mirror the `faces` rail in app/[locale]/page.tsx. Twelve portraits are
 * the site's answer to "who is in all this", so who is NOT on it is a real
 * editorial decision and worth holding still.
 */
const faces = [...shownCharacters]
  .filter((c) => c.creditedActor === null)
  .filter((c) => c.category !== "supporting" || c.affiliation.length > 0)
  .sort((a, b) => b.appearances.length - a.appearances.length)
  .slice(0, 12);

describe("F23 the homepage faces rail", () => {
  it("shows twelve distinct characters", () => {
    expect(faces).toHaveLength(12);
    expect(new Set(faces.map((c) => c.id)).size).toBe(12);
  });

  /** He outranks Iron Man on appearances, and is not a character. */
  it("leaves Stan Lee off", () => {
    expect(faces.some((c) => c.id === "stan-lee")).toBe(false);
  });

  /**
   * The rule is affiliation, not the `supporting` category — which is what
   * keeps Nick Fury while dropping May Parker. Asserting both directions,
   * because a rule that only drops is easy to get right by accident.
   */
  it("drops unaffiliated supporting characters but keeps affiliated ones", () => {
    expect(faces.some((c) => c.id === "aunt-may")).toBe(false);
    expect(faces.some((c) => c.id === "nick-fury")).toBe(true);
  });

  it("still ranks by appearance count", () => {
    const counts = faces.map((c) => c.appearances.length);
    expect([...counts].sort((a, b) => b - a)).toEqual(counts);
  });

  /** Everyone dropped keeps their record; this rail is a view, not a filter. */
  it("does not remove anybody from the corpus", () => {
    for (const id of ["aunt-may", "stan-lee"]) {
      expect(shownCharacters.some((c) => c.id === id), id).toBe(true);
    }
  });
});
