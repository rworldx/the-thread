import { describe, expect, it } from "vitest";
import { titles, posterOf, ratingsOf, tintOf } from "@/content/build";
import { pickWall, franchiseOf, colourGap, applySwaps, type WallItem } from "@/lib/wall";

const PINNED = [
  "the-amazing-spider-man",
  "wonder-man-s1",
  "avengers-doomsday",
  "legion",
  "cloak-and-dagger",
];
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
      posterPath: p,
      tint: tintOf(x.id) ?? "#000000",
    },
  ];
});

const franchise = new Map(titles.map((x) => [x.id, franchiseOf(x.titleEn)]));
const keyOf = (x: WallItem) => franchise.get(x.id) ?? x.id;
const EXCLUDED = ["the-amazing-spider-man-2"];
const wall = pickWall(pool, PINNED, COUNT, keyOf, [], EXCLUDED);

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
      posterPath: "/x.jpg",
      tint: "#123456",
    };
    const after = pickWall([...pool, extra], PINNED, COUNT, keyOf, [], EXCLUDED);
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

describe("applySwaps", () => {
  /** A swap that quietly matches nothing is how a hand-tuned order rots. */
  it("throws rather than no-opping when a title has left the wall", () => {
    expect(() => applySwaps(wall, [["the-avengers", "not-a-real-title"]])).toThrow(
      /not-a-real-title/,
    );
  });

  it("exchanges the two positions and keeps everything else in place", () => {
    const swapped = applySwaps(wall, [[wall[0]!.id, wall[5]!.id]]);
    expect(swapped[0]!.id).toBe(wall[5]!.id);
    expect(swapped[5]!.id).toBe(wall[0]!.id);
    expect(swapped.map((x) => x.id).sort()).toEqual(wall.map((x) => x.id).sort());
  });
});

describe("the wall as a composition", () => {
  it("keeps an excluded title off entirely", () => {
    expect(wall.some((x) => x.id === "the-amazing-spider-man-2")).toBe(false);
  });

  /**
   * The point of the colour walk: neighbours should agree. Compared against
   * the same 24 in vote order, which is the arrangement it replaced.
   */
  it("places posters beside ones they sit well with", () => {
    const mean = (xs: WallItem[]) =>
      xs.slice(1).reduce((n, x, i) => n + colourGap(x.tint, xs[i]!.tint), 0) / (xs.length - 1);
    const byVotes = [...wall].sort((a, b) => b.votes - a.votes);
    expect(mean(wall)).toBeLessThan(mean(byVotes));
  });
});
