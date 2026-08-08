"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { daysSinceSeen, markSeen, useHydrated, useWatched } from "@/lib/progress";
import type { SearchItem } from "@/lib/search";

/**
 * "PREVIOUSLY…" — the third signature (§4.3).
 *
 * When somebody comes back after a week with progress recorded, the homepage
 * opens on a comic recap: what they last watched, its spoiler-safe line, and the
 * next node on the thread. Nobody in this space does this, and it is the reason
 * a person returns rather than bookmarking a list once and never coming back.
 *
 * It is emotional rather than technical, which is exactly why it is easy to let
 * slip to the end of a step and then cut.
 *
 * Renders nothing until hydrated — the server has no idea who you are, and
 * guessing would be a mismatch.
 */

const RETURN_AFTER_DAYS = 7;

export function Previously({
  index,
  locale,
  lines,
}: {
  /** Ordered spine, so "next" means the next node on the thread. */
  index: SearchItem[];
  locale: string;
  /** Spoiler-SAFE lines only. The shielded context never appears here. */
  lines: Record<string, string>;
}) {
  const t = useTranslations("previously");
  const watched = useWatched();
  const hydrated = useHydrated();
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysSinceSeen());
    markSeen();
  }, []);

  if (!hydrated || watched.size === 0) return null;
  if (days === null || days < RETURN_AFTER_DAYS) return null;

  // The furthest point reached, not the most recently ticked — a viewer means
  // "where am I up to", not "what did I last click".
  let lastIndex = -1;
  index.forEach((item, i) => {
    if (watched.has(item.id)) lastIndex = i;
  });
  if (lastIndex < 0) return null;

  const last = index[lastIndex]!;
  const next = index.slice(lastIndex + 1).find((item) => !watched.has(item.id)) ?? null;

  return (
    <aside className="previously" aria-labelledby="previously-heading">
      <h2 id="previously-heading" className="previously-heading">
        {t("heading")}
      </h2>
      <p className="previously-days">{t("away", { days })}</p>

      <p className="previously-last">
        {t("youStopped")}{" "}
        <a href={`/${locale}/path/${last.id}`}>
          <bdi lang="en">{last.titleEn}</bdi>
        </a>
      </p>
      {lines[last.id] && <p className="previously-recap">{lines[last.id]}</p>}

      {next && (
        <p className="previously-next">
          {t("nextUp")}{" "}
          <a href={`/${locale}/path/${next.id}`} className="previously-next-link">
            <bdi lang="en">{next.titleEn}</bdi>
          </a>
        </p>
      )}
    </aside>
  );
}
