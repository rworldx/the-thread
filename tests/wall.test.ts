import { describe, expect, it } from "vitest";
import { titles, posterOf, ratingsOf, episodesOf } from "@/content/build";
import { pickWall, franchiseOf, spaceOut, type WallItem } from "@/lib/wall";

const PINNED = ["the-amazing-spider-man", "wonder-man-s1", "avengers-doomsday"];
const COUNT = 24;

const pool: WallItem[] = titles.flatMap((x) => {
  const p = posterOf(x.id);
  if (p === null || p.startsWith("http")) return [];
  return [
    {
      id: x.id,
      universe: x.universe,
      releaseDate: x.releaseDate,
      votes: ratingsOf(x.id)?.tmdb?.votes ?? 0,
      show: episodesOf(x.id).length > 0 || x.type === "series" || x.type === "season",
      posterPath: p,
    },
  ];
});

const franchise = new Map(titles.map((x) => [x.id, franchiseOf(x.titleEn)]));
const keyOf = (x: WallItem) => franchise.get(x.id) ?? x.id;
const wall = pickWall(pool, PINNED, COUNT, keyOf);

describe("W1 the poster wall", () => {
  it("holds exactly the tiles asked for, with no repeats", () => {
    expect(wall).toHaveLength(COUNT);
    expect(new Set(wall.map((x) => x.id)).size).toBe(COUNT);
  });

  /** The wall is the only place the site claims breadth before a click. */
  it("shows at least one title from every universe", () => {
    const all = new Set(pool.map((x) => x.universe));
    const shown = new Set(wall.map((x) => x.universe));
    expect([...all].filter((u) => !shown.has(u))).toEqual([]);
  });

  it("keeps every pinned title regardless of vote count", () => {
    for (const id of PINNED) {
      expect(pool.some((x) => x.id === id), `${id} missing from pool`).toBe(true);
      expect(wall.some((x) => x.id === id), `${id} missing from wall`).toBe(true);
    }
  });

  /** So the wall says "we go up to here" without a date written anywhere. */
  it("includes the newest film and the newest show", () => {
    for (const show of [false, true]) {
      const newest = pool
        .filter((x) => x.show === show)
        .reduce((a, b) => (b.releaseDate > a.releaseDate ? b : a));
      expect(wall.some((x) => x.id === newest.id), `newest ${show ? "show" : "film"}`).toBe(true);
    }
  });

  /** Two Avengers posters side by side read as a repeat, not a range. */
  it("never places two of the same franchise next to each other", () => {
    const clashes = wall
      .map((x, i) => (i > 0 && keyOf(x) === keyOf(wall[i - 1]!) ? keyOf(x) : null))
      .filter(Boolean);
    expect(clashes).toEqual([]);
  });

  it("does not reshuffle when an obscure title is added", () => {
    const extra: WallItem = {
      id: "some-1970s-cartoon",
      universe: "animation",
      releaseDate: "1978-01-01",
      votes: 3,
      show: true,
      posterPath: "/x.jpg",
    };
    const after = pickWall([...pool, extra], PINNED, COUNT, keyOf);
    expect(after.map((x) => x.id)).toEqual(wall.map((x) => x.id));
  });
});

describe("franchiseOf", () => {
  it("collapses sequels and volumes onto one key", () => {
    expect(franchiseOf("The Avengers")).toBe("avengers");
    expect(franchiseOf("Avengers: Endgame")).toBe("avengers");
    expect(franchiseOf("Iron Man 3")).toBe("iron man");
    expect(franchiseOf("Guardians of the Galaxy Vol. 2")).toBe("guardians of the galaxy");
  });

  it("keeps genuinely different things apart", () => {
    expect(franchiseOf("Black Panther")).not.toBe(franchiseOf("Black Widow"));
  });
});

describe("spaceOut", () => {
  /** It must degrade rather than loop or drop when separation is impossible. */
  it("keeps every item even when they all share a key", () => {
    const same = ["a", "a", "a"];
    expect(spaceOut(same, (x) => x).sort()).toEqual(same);
  });
});
