"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

/**
 * THE NAV, WITH THE PAGE YOU ARE ON MARKED.
 *
 * A client leaf for one reason: it needs to know the current path, and the
 * header lives in the layout, which is a server component rendered once per
 * route. `usePathname` is the whole reason this file exists.
 *
 * THE MARK IS `aria-current="page"` FIRST and a red rule second. The rule is
 * what you see; the attribute is what a screen reader announces, and a
 * coloured underline with no attribute behind it tells a sighted reader where
 * they are and tells everybody else nothing. Colour is never the only carrier.
 *
 * MATCHING IS PREFIX-BASED, because these are sections rather than pages:
 * /universes/x-men/story/timeline is still Universes, and a title page reached
 * from Projects is still a title page. The MCU is the one that needs care — it
 * lives UNDER /universes, so Universes has to exclude it explicitly or both
 * would light up at once.
 */

const ITEMS = [
  { key: "mcu", href: (l: string) => `/${l}/universes/mcu` },
  { key: "universes", href: (l: string) => `/${l}/universes` },
  { key: "projects", href: (l: string) => `/${l}/projects` },
  { key: "characters", href: (l: string) => `/${l}/characters` },
  { key: "rights", href: (l: string) => `/${l}/what-is-marvel` },
] as const;

function activeKey(pathname: string, locale: string): string | null {
  const p = pathname.replace(/\/$/, "");
  const mcu = `/${locale}/universes/mcu`;
  if (p === mcu || p.startsWith(`${mcu}/`)) return "mcu";
  if (p.startsWith(`/${locale}/universes`)) return "universes";
  if (p.startsWith(`/${locale}/projects`)) return "projects";
  if (p.startsWith(`/${locale}/characters`)) return "characters";
  if (p.startsWith(`/${locale}/what-is-marvel`)) return "rights";
  /* Title pages belong to no section. Marking one would be a guess about how
     the reader got there, and they can arrive from any of five places. */
  return null;
}

/**
 * THE SAME FIVE LINKS, IN WHICHEVER PLACE THEY FIT.
 *
 * Below about 832px the five titles no longer share a line with the wordmark
 * and the controls — measured, not guessed: the row breaks at 816px in English
 * and the header splits at 760px in Arabic. Wrapping them onto a second line
 * works, but it makes the bar two rows tall on every laptop under 13 inches,
 * which is the shape the settings disclosure was built to avoid in the first
 * place. So under that width they move INTO that disclosure, above the
 * settings, and the bar stays one line at every size.
 *
 * BOTH COPIES ARE IN THE MARKUP and CSS picks one. That is deliberate: the
 * choice is a question about available width, which only CSS can answer, and
 * answering it in JavaScript would mean measuring on every resize and getting
 * the first paint wrong. `display: none` — not `visibility`, not `opacity` —
 * so the hidden copy leaves the accessibility tree entirely and a screen
 * reader is never offered the same five links twice.
 */
function NavLinks({ locale, className }: { locale: string; className: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname() ?? "";
  const active = activeKey(pathname, locale);

  return (
    <nav className={className} aria-label={t("sections")}>
      {ITEMS.map((item) => (
        <Link
          key={item.key}
          href={item.href(locale)}
          aria-current={active === item.key ? "page" : undefined}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
}

/** The bar's own copy, shown from 52rem up. */
export function SiteNav({ locale }: { locale: string }) {
  return <NavLinks locale={locale} className="site-nav" />;
}

/** The disclosure's copy, shown below 52rem, above the three settings. */
export function SettingsNav({ locale }: { locale: string }) {
  return <NavLinks locale={locale} className="settings-nav" />;
}
