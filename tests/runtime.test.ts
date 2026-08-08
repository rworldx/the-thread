import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { formatRuntime, formatRuntimeIntl, runtimeOf, schedule, totalNights } from "@/lib/runtime";
import { node } from "./__fixtures__/graphs";

const mins = (...ns: number[]) => ns.map((n, i) => node(`t${i}`, { runtimeMin: n }));

describe("E. runtime and scheduling", () => {
  it("E1 runtimeOf([]) is 0", () => {
    expect(runtimeOf([])).toBe(0);
  });

  it("E2 runtimeOf sums runtimeMin", () => {
    expect(runtimeOf(mins(126, 112, 108))).toBe(346);
  });

  it("E2b runtimeOf throws on a null runtime rather than silently treating it as 0", () => {
    expect(() => runtimeOf([node("x", { runtimeMin: null })])).toThrow(/x/);
  });

  it("E3 formatRuntime zero-pads the minutes", () => {
    expect(formatRuntime(126)).toBe("2h 06m");
  });

  it("E4 under an hour drops the hours entirely", () => {
    expect(formatRuntime(45)).toBe("45m");
    expect(formatRuntime(1)).toBe("1m");
  });

  it("E5 a whole number of hours drops the minutes entirely", () => {
    expect(formatRuntime(120)).toBe("2h");
    expect(formatRuntime(60)).toBe("1h");
  });

  it("E5b zero is 0m, not an empty string", () => {
    expect(formatRuntime(0)).toBe("0m");
  });

  it("E6 formatRuntime is English-only and never rendered to a user", () => {
    // It has no plural rules and cannot express Arabic units. The rendered form
    // goes through formatRuntimeIntl and the message layer — see E11.
    expect(formatRuntime(126)).toBe("2h 06m");
  });

  it("E11 formatRuntimeIntl binds each number to its own unit", () => {
    // "1س 44د" reordered in RTL and read as 44 hours and 1 minute: a bare letter
    // unit does not bind to its number, so bidi is free to move the clauses.
    const seen: string[] = [];
    const m = {
      hoursMinutes: (h: number, mm: string) => {
        seen.push(`h=${h} mm=${mm}`);
        return `${h}|${mm}`;
      },
      hoursOnly: (h: number) => `h${h}`,
      minutesOnly: (mi: number) => `m${mi}`,
    };
    expect(formatRuntimeIntl(126, m)).toBe("2|06");
    expect(formatRuntimeIntl(120, m)).toBe("h2");
    expect(formatRuntimeIntl(45, m)).toBe("m45");
    expect(formatRuntimeIntl(0, m)).toBe("m0");
    expect(seen).toEqual(["h=2 mm=06"]);
  });

  it("E11b the Arabic messages produce bound, ordered clauses", async () => {
    const IntlMessageFormat = (await import("intl-messageformat")).default;
    const ar = JSON.parse(
      readFileSync(new URL("../messages/ar.json", import.meta.url).pathname, "utf8"),
    );
    const out = new IntlMessageFormat(ar.runtime.hoursMinutes, "ar").format({
      h: 1,
      m: 44,
      mm: "44",
    }) as string;
    // Full unit words, an explicit conjunction, and the hour clause first.
    expect(out).toContain("ساعة");
    expect(out).toContain("دقيقة");
    expect(out.indexOf("ساعة")).toBeLessThan(out.indexOf("دقيقة"));
    // Western digits, per brief §6.
    expect(out).not.toMatch(/[٠-٩]/);
  });

  it("E12 an evening reports the nights it actually needs", () => {
    // A boolean conflated "slightly long film" with "this needs six weeks",
    // which made the flag useless on exactly the rows where the number matters.
    expect(schedule(mins(120), 150)[0]!.nights).toBe(1);
    expect(schedule(mins(300), 150)[0]!.nights).toBe(2);
    // A collapsed series node: ~99 hours at 2.5h a night.
    expect(schedule(mins(5940), 150)[0]!.nights).toBe(40);
  });

  it("E12b totalNights counts a long node as the nights it needs, not as one", () => {
    // 90 + 90 is 180, which does not fit a 150-minute night, so the two films
    // take an evening each; the series node takes forty.
    const plan = schedule(mins(90, 90, 5940), 150);
    expect(plan.length, "three evenings by count").toBe(3);
    expect(totalNights(plan), "but forty-two real nights").toBe(42);
  });

  it("E7 schedule packs titles into evenings without splitting a title", () => {
    const plan = schedule(mins(90, 90, 90), 200);
    expect(plan).toHaveLength(2);
    expect(plan[0]!.titles.map((t) => t.runtimeMin)).toEqual([90, 90]);
    expect(plan[1]!.titles.map((t) => t.runtimeMin)).toEqual([90]);
  });

  it("E7b schedule preserves the given order — it is a watch order, not a bin-pack", () => {
    const plan = schedule(mins(50, 160, 50), 120);
    expect(plan.flatMap((e) => e.titles.map((t) => t.id))).toEqual(["t0", "t1", "t2"]);
  });

  it("E8 a title longer than the nightly budget gets its own evening and is flagged", () => {
    const plan = schedule(mins(200), 120);
    expect(plan).toHaveLength(1);
    expect(plan[0]!.overBudget).toBe(true);
    expect(plan[0]!.titles).toHaveLength(1);
  });

  it("E8b an over-budget title never absorbs a neighbour into its evening", () => {
    const plan = schedule(mins(200, 30), 120);
    expect(plan[0]!.titles.map((t) => t.id)).toEqual(["t0"]);
    expect(plan[1]!.titles.map((t) => t.id)).toEqual(["t1"]);
  });

  it("E9 evening count is computed once, so the headline cannot disagree with the list", () => {
    const plan = schedule(mins(90, 90, 90, 90, 90), 120);
    expect(plan.length).toBe(5);
    expect(plan.every((e) => e.titles.length > 0)).toBe(true);
  });

  it("E9b every input title lands in exactly one evening", () => {
    const input = mins(45, 130, 22, 98, 175, 60);
    const plan = schedule(input, 120);
    const placed = plan.flatMap((e) => e.titles.map((t) => t.id));
    expect(placed).toHaveLength(input.length);
    expect(new Set(placed).size).toBe(input.length);
  });

  it("E9c each evening reports its own total", () => {
    const plan = schedule(mins(50, 50, 50), 120);
    expect(plan[0]!.totalMin).toBe(100);
    expect(plan[1]!.totalMin).toBe(50);
  });

  it("E10 a zero or negative nightly budget is a caller bug", () => {
    expect(() => schedule(mins(90), 0)).toThrow();
    expect(() => schedule(mins(90), -30)).toThrow();
  });

  it("E10b scheduling nothing yields no evenings", () => {
    expect(schedule([], 120)).toEqual([]);
  });
});
