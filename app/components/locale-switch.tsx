"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LOCALES, isLocale, type Locale } from "@/lib/locales";

/**
 * EN / ع, on the current page.
 *
 * This was simply MISSING. The header carried a theme switch and a spoiler
 * toggle and no way to change language at all, on a site whose entire
 * differentiator is that it is bilingual. Someone landing on `/en` had to edit
 * the URL by hand to reach the Arabic they came for.
 *
 * A LINK, not a button with a router call. Every route is prerendered in both
 * locales, so the Arabic twin of the current page is a real URL that already
 * exists: `/en/characters/wolverine` swaps to `/ar/characters/wolverine`. A
 * link gets middle-click, open-in-new-tab, copy-link-address and the browser's
 * own prefetch for free, and it still works with no JavaScript.
 *
 * `usePathname` is the only reason this is a client component. It cannot be
 * done on the server because the layout does not know which route rendered it.
 */
export function LocaleSwitch({ locale }: { locale: string }) {
  const t = useTranslations("locale");
  const pathname = usePathname();

  const other: Locale = LOCALES.find((l) => l !== locale) ?? "en";

  /**
   * Swap the FIRST segment only. Replacing every occurrence would rewrite an id
   * that happens to contain the locale, and `/en/path/agent-carter` is exactly
   * the shape where that bites.
   */
  const segments = (pathname ?? `/${locale}`).split("/");
  if (isLocale(segments[1] ?? "")) segments[1] = other;
  const href = segments.join("/") || `/${other}`;

  return (
    <Link
      className="locale-switch"
      href={href}
      lang={other}
      hrefLang={other}
      aria-label={t("switchTo")}
    >
      {/* The label is the language you would GET, written in that language.
          "AR" set in Latin on an English page tells an Arabic reader nothing;
          "ع" is legible to exactly the person who wants it. */}
      {other === "ar" ? "ع" : "EN"}
    </Link>
  );
}
