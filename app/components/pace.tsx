"use client";

import { useTranslations } from "next-intl";
import { useHydrated, useWatched } from "@/lib/progress";

/**
 * WHAT IS LEFT, AND WHAT THAT COSTS PER WEEK.
 *
 * The path page has always been able to say what a journey costs in total —
 * "93 titles · 371h" — and that number is honest and slightly paralysing. It is
 * the price of the whole thing, which is not the question somebody halfway
 * through is asking. They want to know what is LEFT, and whether they will
 * make it.
 *
 * So this is the same arithmetic, done against the watched set and against the
 * target's release date: hours remaining, and the pace that clears them before
 * the thing you are waiting for arrives. A viewer with 227 hours and 17 weeks
 * needs 13 hours a week, and being told that is the difference between a list
 * and a plan.
 *
 * IT GOES IN THE THREAD'S OWN `progress` SLOT, which has existed unused since
 * the component was written: "ties progress to the signature element rather
 * than bolting a separate bar onto the page". That was the right instinct and
 * nothing had ever filled it.
 *
 * RENDERS NOTHING UNTIL HYDRATED, and nothing at all until something is ticked.
 * The server does not know who you are, and a pace of "0 watched, 371 hours to
 * go" is not encouragement, it is an invoice.
 */
export function Pace({
  path,
  releaseDate,
}: {
  /** Every title on the path, in order, with its runtime in minutes. */
  path: { id: string; runtimeMin: number | null }[];
  /** The target's release date. Only a FUTURE one produces a deadline. */
  releaseDate: string;
}) {
  const t = useTranslations("pace");
  const watched = useWatched();
  const hydrated = useHydrated();

  if (!hydrated) return null;

  const done = path.filter((x) => watched.has(x.id));
  if (done.length === 0) return null;

  const left = path.filter((x) => !watched.has(x.id));
  /* The target itself is on the path and is the thing being counted toward, so
     finishing "everything left" includes watching it. That is correct: the
     deadline is the premiere, and the premiere is when you watch it. */
  const minutesLeft = left.reduce((n, x) => n + (x.runtimeMin ?? 0), 0);
  const hoursLeft = Math.round(minutesLeft / 60);
  const pct = Math.round((done.length / path.length) * 100);

  /**
   * A DEADLINE ONLY IF THERE IS ONE. Most targets came out years ago, and
   * inventing urgency about Iron Man would be a lie the rest of the site does
   * not tell. `releaseDate` is often a bare year, which Date parses as the 1st
   * of January — fine here, because a year-precision date this far out is only
   * ever used to answer "is this still coming".
   */
  const ms = new Date(releaseDate).getTime() - Date.now();
  const weeks = Number.isNaN(ms) ? 0 : Math.ceil(ms / (7 * 24 * 60 * 60 * 1000));
  const hasDeadline = weeks > 0;
  const perWeek = hasDeadline ? Math.ceil(minutesLeft / 60 / weeks) : 0;

  return (
    <p className="pace" aria-live="polite">
      <span className="pace-bar" aria-hidden="true">
        <span className="pace-fill" style={{ inlineSize: `${pct}%` }} />
      </span>
      <span className="pace-figures">
        <span>
          <b className="tabular">{pct}%</b> {t("done")}
        </span>
        <span>
          <b className="tabular">{left.length}</b> {t("titlesLeft")}
        </span>
        <span>
          <b className="tabular">{hoursLeft}</b> {t("hoursLeft")}
        </span>
        {hasDeadline && (
          <span className="pace-target">
            <b className="tabular">{perWeek}</b> {t("perWeek", { weeks })}
          </span>
        )}
      </span>
    </p>
  );
}
