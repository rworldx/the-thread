import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { directionOf, isLocale, localeParams } from "@/lib/locales";
import { arReviewed } from "@/content/copy";
import { Search } from "@/app/components/search";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fontVariables } from "../fonts";
import { OverflowGuard } from "../overflow-guard";
import "../globals.css";
// Generated per-title dominant colours (§14.4). A stylesheet rather than inline
// styles, because a CSP without `unsafe-inline` blocks style attributes.
import "../poster-tints.css";
import { SiteNav } from "@/app/components/site-nav";
import { HeadSettings } from "@/app/components/head-settings";
import { ThreadMark } from "@/app/components/thread-mark";
import { SettingsDismiss } from "@/app/components/settings-dismiss";

/**
 * One export, not two — Next forbids `metadata` and `generateMetadata` in the
 * same segment.
 *
 * `/ar` renders so the RTL layout can be looked at, but must not be INDEXED
 * while its copy is 130 unreviewed drafts. Rendering and publishing are
 * different questions; `scripts/check-publishable.ts` is the other half of the
 * gate.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    /**
     * `metadataBase` IS WHAT MAKES THE CARD WORK AT ALL.
     *
     * Open Graph requires ABSOLUTE urls. Without a base, Next emits
     * `/en/opengraph-image.png` and every client that reads it — WhatsApp,
     * iMessage, Slack, Discord — resolves it against nothing and shows a grey
     * rectangle. Vercel supplies the deployment host in `VERCEL_URL`; the
     * localhost fallback keeps dev honest rather than pretending to be
     * production.
     */
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ??
        (process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"),
    ),
    title: { default: t("name"), template: `%s · ${t("name")}` },
    description: t("tagline"),
    /* The image itself is NOT listed here. `app/[locale]/opengraph-image.tsx`
       is a file convention: Next attaches it, with its real dimensions and
       type, to every page under this segment. Repeating it by hand would be a
       second source of truth for one fact. */
    openGraph: {
      type: "website",
      siteName: t("name"),
      title: t("name"),
      description: t("tagline"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("name"),
      description: t("tagline"),
    },
    ...(locale === "ar" && !arReviewed
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Never `maximumScale` or `userScalable: false` — both break WCAG 1.4.4 and
  // strand anyone who zooms.
  colorScheme: "light dark",
};

/**
 * This IS the root layout — there is no `app/layout.tsx`. Every route lives
 * under `[locale]`, so the topmost layout is the one that knows the locale, and
 * `lang`/`dir` are read from the segment rather than hardcoded.
 *
 * `LOCALES` currently holds only `en`. Step 7 adds `ar` there; nothing in this
 * file changes, because the stylesheet already keys off `:lang(ar)` and
 * `[dir="rtl"]`, and `directionOf` already knows Arabic is RTL.
 */
export function generateStaticParams() {
  return localeParams();
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  // Keeps all 264 pages statically rendered. Without it, reading a translation
  // opts the whole tree into dynamic rendering.
  setRequestLocale(locale);
  const t = await getTranslations("site");
  const tn = await getTranslations("nav");

  return (
    <html
      lang={locale}
      dir={directionOf(locale)}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        {/* Saves 100–200ms on the first poster once sync has run (§14.2). */}
        <link rel="preconnect" href="https://image.tmdb.org" crossOrigin="" />
      </head>
      <body>
        <NextIntlClientProvider>
          <OverflowGuard />
          <SettingsDismiss />
          <header className="site-head">
            {/* The mark leads the wordmark, and it is `aria-hidden` — the
                link's accessible name is the words beside it, and hearing
                "The Thread" twice is noise. */}
            <Link href={`/${locale}`} className="site-name">
              <ThreadMark size={26} />
              <span>{t("name")}</span>
            </Link>
            {/* FIVE DOORS, and they are peers rather than one primary and
                four secondaries. The MCU by itself, everything else by
                universe, every project by filter, characters by person, and
                the history. Every one of them ends in the same place: a title,
                and what to watch before it.

                UNIVERSES WAS MISSING from this bar. The page existed, the
                footer linked to it, and the one row a reader actually uses to
                get around did not — which made "where is the universes page?"
                a question about the nav rather than about the page. */}
            <SiteNav locale={locale} />
            {/* The controls cluster, hairlined off the navigation, so the bar
                reads as "where you can go" and then "how you see it". */}
            {/* Search stays in the open — it is the control people reach for
                most. Everything you set once lives in the disclosure. */}
            <div className="head-tools">
              <Search locale={locale} />
              <HeadSettings locale={locale} />
            </div>
          </header>
          {children}
          <footer>
            {/* Three columns and one legal line, replacing three stacked
                paragraphs of small print. The type credit is gone: the licence
                does not ask for it and no reader wants it. What belongs at the
                bottom of a page is where to go next and what this is. */}
            <div className="footer-grid">
              <div>
                <p className="footer-mark">
                  <ThreadMark size={30} />
                  <span>{t("name")}</span>
                </p>
                <p className="footer-line">{t("tagline")}</p>
              </div>
              <div className="footer-col">
                <h2>{tn("browse")}</h2>
                <ul>
                  <li>
                    <Link href={`/${locale}/universes/mcu`}>{tn("mcu")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/projects`}>{tn("projects")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/characters`}>{tn("characters")}</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h2>{tn("about")}</h2>
                <ul>
                  <li>
                    <Link href={`/${locale}/what-is-marvel`}>{tn("whatIsMarvel")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/universes`}>{tn("universes")}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <p className="footer-legal">{t("disclaimer")}</p>

            {/**
             * THE ONE FIRST-PERSON LINE on the whole site.
             *
             * Everything above it is a record written in the third person. This
             * says a person made it, so it is set in a hand rather than in a
             * weight of the same grotesk as the disclaimer above it — the only
             * script face in the type system, used once.
             */}
            <p className="signature">
              <span className="signature-lead">{t("designedByLead")}</span>
              <span className="signature-name">Rashid</span>
            </p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
