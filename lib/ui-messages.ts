import type { DescribeMessages } from "./describe";

/**
 * One place that builds the message bundle every page needs.
 *
 * Repeating this in each route is how one page ends up on `formatRuntime` while
 * the others are on `formatRuntimeIntl`, or how a new page forgets `seasonCount`
 * and silently drops "7 seasons" from its rows. Step 6 adds three more page
 * types; they all take this.
 */

/**
 * The shape `next-intl`'s `getTranslations()` returns, narrowed to what we use.
 * The value type has to match next-intl's own — `unknown` is wider and will not
 * accept its translator.
 */
type Translator = (key: string, values?: Record<string, string | number | Date>) => string;

export interface UiMessages extends DescribeMessages {
  optional: string;
  signature: string;
  /** Shown on a title that has not come out yet. */
  upcoming: string;
  /** "BCE" — for the ancient end of a story-ordered timeline. */
  bce: string;
}

export function uiMessages(t: Translator): UiMessages {
  return {
    titleCount: (n) => t("runtime.titleCount", { n }),
    seasonSuffix: (n) => t("runtime.seasonSuffix", { n }),
    seasonCount: (n) => t("title.seasonCount", { n }),
    costSynced: (runtime, titles, seasons) => t("runtime.costSynced", { runtime, titles, seasons }),
    costUnsynced: (titles, seasons) => t("runtime.costUnsynced", { titles, seasons }),
    notSynced: (missing, total) => t("runtime.notSynced", { missing, total }),
    approx: (runtime, missing) => t("runtime.approx", { runtime, missing }),
    approxUnmeasured: (runtime, missing) =>
      t("runtime.approxUnmeasured", { runtime, missing }),
    approxMixed: (runtime, unreleased, unmeasured) =>
      t("runtime.approxMixed", { runtime, unreleased, unmeasured }),
    hoursMinutes: (h, mm, m) => t("runtime.hoursMinutes", { h, mm, m }),
    hoursOnly: (h) => t("runtime.hoursOnly", { h }),
    minutesOnly: (m) => t("runtime.minutesOnly", { m }),
    optional: t("title.optional"),
    signature: t("editorNote.signature"),
    upcoming: t("saga.upcoming"),
    bce: t("saga.bce"),
  };
}
