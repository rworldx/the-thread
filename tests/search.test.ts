import { describe, expect, it } from "vitest";
import { titles } from "@/content/build";
import { shownCharacters } from "@/lib/characters";
import index from "@/content/search-index.json";
import { editDistance, normalise, search, suggestion, tokenise, type SearchItem } from "@/lib/search";

const ITEMS = index as SearchItem[];
const ids = (q: string, n = 5) => search(q, ITEMS, n).map((r) => r.item.id);

describe("S. search", () => {
  it("S1 the index covers the whole corpus and carries the cost", () => {
    /**
     * AGAINST THE CORPUS, not a number typed in once.
     *
     * This said `toHaveLength(167)` under a name promising it covered the
     * whole corpus, so when six titles were added the index silently fell
     * behind and this guard kept passing — it was pinned to the stale figure
     * rather than to the thing it claimed to check. A literal in a test is a
     * second source of truth exactly the way a literal in copy is.
     */
/* TWO KINDS NOW, and each is checked against its own source. The top bar is
       the site's only global search, so it holds titles AND characters — but a
       character row is not a title row and a single length assertion would let
       one silently cover for the other. */
    const titleRows = ITEMS.filter((i) => i.kind !== "character");
    const characterRows = ITEMS.filter((i) => i.kind === "character");

    expect(titleRows).toHaveLength(titles.length);
    const indexedTitles = new Set(titleRows.map((i) => i.id));
    expect(titles.filter((t) => !indexedTitles.has(t.id)).map((t) => t.id)).toEqual([]);

    expect(characterRows).toHaveLength(shownCharacters.length);
    const indexedChars = new Set(characterRows.map((i) => i.id));
    expect(
      shownCharacters.filter((c) => !indexedChars.has(c.id)).map((c) => c.id),
    ).toEqual([]);
    for (const item of titleRows) {
      expect(item.pathLength).toBeGreaterThanOrEqual(0);
      expect(item.titleAr, `${item.id}`).toMatch(/[؀-ۿ]/u);
    }
    // The cost is the whole differentiator — a search returning only titles is
    // one anyone can build.
    const dw = ITEMS.find((i) => i.id === "deadpool-and-wolverine")!;
    expect(dw.pathLength).toBe(33);
    expect(dw.minutes).toBeGreaterThan(4000);
    expect(ITEMS.find((i) => i.id === "iron-man")!.pathLength).toBe(0);
  });

  it("S2 normalisation strips Arabic diacritics and tatweel", () => {
    expect(normalise("سُبَايْدَر مَان")).toBe(normalise("سبايدر مان"));
    expect(normalise("سبــــايدر")).toBe(normalise("سبايدر"));
  });

  it("S3 orthographic folds — readers type these interchangeably", () => {
    expect(normalise("أفلام")).toBe(normalise("افلام"));
    expect(normalise("إكس")).toBe(normalise("اكس"));
    expect(normalise("ساعة")).toBe(normalise("ساعه"));
    expect(normalise("مبنى")).toBe(normalise("مبني"));
  });

  it("S4 a voweled query finds an unvoweled title", () => {
    expect(ids("سُبَايْدَر")).toContain("spider-man");
    expect(ids("الرجل الحديدي")).toContain("iron-man");
  });

  it("S5 the brief's exact case: venum finds Venom", () => {
    const [top] = search("venum", ITEMS, 1);
    expect(top!.item.id).toBe("venom");
    expect(top!.fuzzy, "should arrive by edit distance, not exact match").toBe(true);
    expect(suggestion("venum", ITEMS)!.id).toBe("venom");
  });

  it("S5b an exact match is never marked fuzzy", () => {
    const [top] = search("venom", ITEMS, 1);
    expect(top!.fuzzy).toBe(false);
    expect(suggestion("venom", ITEMS), "no suggestion when the match is clean").toBeNull();
  });

  it("S6 edit distance bails out early and stays correct", () => {
    expect(editDistance("venom", "venum")).toBe(1);
    expect(editDistance("kitten", "sitting", 3)).toBe(3);
    // Past the cap it returns max+1 rather than the true distance.
    expect(editDistance("abc", "xyzxyzxyz", 2)).toBeGreaterThan(2);
    expect(editDistance("same", "same")).toBe(0);
  });

  it("S7 a shorter title outranks a longer one for the same query", () => {
    expect(ids("venom")[0]).toBe("venom");
    expect(ids("iron man")[0]).toBe("iron-man");
  });

  it("S8 every token must contribute — a two-word query narrows", () => {
    // "spider man" must not match a title that merely contains "man".
    const r = ids("spider man", 20);
    expect(r).toContain("spider-man");
    expect(r).not.toContain("ant-man");
    expect(r).not.toContain("moon-knight-s1");
  });

  it("S9 an empty or whitespace query returns nothing, not everything", () => {
    expect(search("", ITEMS)).toEqual([]);
    expect(search("   ", ITEMS)).toEqual([]);
    expect(tokenise("  ")).toEqual([]);
  });

  it("S10 nonsense returns nothing rather than a random title", () => {
    expect(search("qqqqzzzz", ITEMS)).toEqual([]);
  });

  it("S11 results are capped and deterministic", () => {
    expect(search("man", ITEMS, 3)).toHaveLength(3);
    expect(ids("spider")).toEqual(ids("spider"));
  });

  it("S12 no ASCII-only class is used on Arabic — the normaliser is Unicode", () => {
    // \w would silently do nothing to Arabic; \p{L} is the correct tool.
    // This asserts behaviour rather than source: a fully Arabic string must
    // survive normalisation with its letters intact.
    expect(normalise("إكس مِن").length).toBeGreaterThan(3);
    expect(normalise("إكس مِن")).not.toBe("");
  });
});
