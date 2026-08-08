import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeParams } from "@/lib/locales";
import { rightsTimeline } from "@/content/rights";
import { ArrowIcon } from "@/app/components/icons";
import { collectionForUniverse } from "@/lib/collections";

/**
 * WHY THE ORDER IS HARD.
 *
 * Sixteen dated rows, and every one of them explains a shape somewhere else on
 * the site. It is the fifth door, and the only one that answers "why" rather
 * than "what next".
 *
 * An ordered list, because the sequence carries the argument: Marvel sold the
 * characters to survive, spent twenty years earning them back one studio at a
 * time, and everything confusing about a watch order falls out of that.
 */

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rights" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function RightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const ar = locale === "ar";

  return (
    <main className="rights-page">
      <header className="page-head">
        <h1>{t("rights.heading")}</h1>
        <p className="page-lede">{t("rights.lede")}</p>
      </header>

      <ol className="rights-timeline" role="list">
        {rightsTimeline.map((row, i) => (
          <li key={`${row.year}-${i}`} className="rights-row reveal">
            <p className="rights-year tabular">{row.year}</p>
            <p className="rights-body">{ar ? row.ar : row.en}</p>
            {/* The universe this row explains, linked. Every door reaches every
                other door; that is what makes this one space rather than five
                sections. */}
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

      <section className="rights-payoff">
        <p>{t("rights.payoff")}</p>
        <Link className="cta" href={`/${locale}/universes/mcu`}>
          {t("rights.cta")}
          <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
