import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeParams } from "@/lib/locales";
import { ArrowIcon } from "@/app/components/icons";
import { rightsTimeline, logoFor } from "@/content/rights";
import { People } from "@/app/components/people";
import { collectionForUniverse } from "@/lib/collections";

/**
 * "First we should understand what is Marvel" — the opening ask.
 *
 * The page has a job beyond history: the RIGHTS SPLIT is the reason this site
 * needs six universes rather than one list, so the split is the payoff rather
 * than a footnote. Comics → a studio with no characters left → a decade of
 * licensing them back.
 *
 * Horizontal scroll journey on desktop, vertical stack below. Gated on
 * `pointer: fine` AND ≥1024 (§13.8): scroll-jacking a touchscreen fights the
 * browser's own gesture handling and feels broken.
 *
 * The horizontal behaviour is pure CSS scroll-snap — no scroll hijacking, no
 * library, and no JavaScript that a CSP could block. The DOM is a single
 * ordered list either way, so the order survives with no CSS at all.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return localeParams();
}

const CHAPTERS = [1, 2, 3, 4, 5] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "what" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function WhatIsMarvel({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="what">

      <h1>{t("what.title")}</h1>
      <p className="what-intro">{t("what.intro")}</p>

      {/* An <ol> because it IS a sequence — the chapters only make sense in
          order, and that has to survive with no stylesheet. */}
      <ol className="what-journey" role="list">
        {CHAPTERS.map((n) => (
          <li key={n} className="what-chapter">
            <p className="what-year tabular">{t(`what.ch${n}Year`)}</p>
            <h2>{t(`what.ch${n}Title`)}</h2>
            <p>{t(`what.ch${n}Body`)}</p>
          </li>
        ))}
      </ol>

      {/* The payoff. The split is not trivia — it is the reason the site is
          shaped the way it is. */}
      {/* THE PEOPLE. Two of them, and the site says which is which: the man who
          co-created most of this on the page, and the man who has run the films
          since 2007. A studio is not a building. */}
      <People locale={locale} />

      {/* THE RIGHTS, folded in from what used to be its own route. "Rights" was
          a word only someone already deep in this would search for;
          "what is Marvel" is the question people actually ask, and the answer
          IS the rights history. One page, one argument. */}
      <section className="what-rights" aria-labelledby="rights-heading">
        <h2 id="rights-heading">{t("rights.heading")}</h2>
        <p className="section-lede">{t("rights.lede")}</p>
        <ol className="rights-timeline" role="list">
          {rightsTimeline.map((row, i) => (
            <li key={`${row.year}-${i}`} className="rights-row reveal">
              <p className="rights-year tabular">{row.year}</p>
              {/* The mark of whoever the row is about, so eleven paragraphs
                  read as a sequence of companies rather than as prose. */}
              {logoFor(row) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="rights-logo"
                  src={logoFor(row)!.src}
                  alt={logoFor(row)!.label}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <p className="rights-body">{locale === "ar" ? row.ar : row.en}</p>
              {row.universe && (
                <p className="rights-link">
                  <Link href={`/${locale}/universes/${collectionForUniverse(row.universe)}`}>
                    {t(`universe.name.${row.universe}`)}
                    <ArrowIcon />
                  </Link>
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="what-payoff">
        <h2>{t("what.payoffHeading")}</h2>
        <p>{t("what.payoff")}</p>
        <Link className="door-cta" href={`/${locale}/universes/mcu`}>
          {t("what.payoffCta")}{" "}
          <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
