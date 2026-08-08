import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { bandFor, INDEXED_COLLECTIONS, membersOf, spanOf, hasStoryOrder } from "@/lib/collections";
import { totalRuntime } from "@/lib/describe";
import { uiMessages } from "@/lib/ui-messages";
import { localeParams } from "@/lib/locales";
import { titles } from "@/content/build";

/** First release to last — the corpus is the only authority on both. */
const SPAN_YEARS = (() => {
  const ys = titles
    .map((t) => Number(String(t.releaseDate).slice(0, 4)))
    .filter((y) => Number.isFinite(y) && y > 0);
  return Math.max(...ys) - Math.min(...ys);
})();

/**
 * THE EIGHT DOORS, each behind its own hero.
 *
 * This page did not exist, which is why "where is the universes page?" was a
 * fair question: /universes/mcu resolved and /universes did not, so the only
 * way in was a link from somewhere else. An index whose children are reachable
 * and which is not itself is a navigation dead end.
 *
 * A HERO PER COLLECTION, not a list of names. The argument of this site is
 * that the posters are the product, so each door is a band of real artwork from
 * inside it with the name set over the top — you should be able to tell the
 * X-Men door from the animation door with the type covered up. The art is drawn
 * from the collection's own titles, spread across its span rather than taken
 * from the front, so the 1998 films are represented in Legacy and not just the
 * newest three.
 *
 * NO CAROUSEL. Eight items is a list you scroll past, not a rail you drag
 * through, and a horizontal scroller here would hide half the site's navigation
 * behind a gesture.
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
  const t = await getTranslations({ locale, namespace: "universes" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}


export default async function UniversesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const msg = uiMessages(t);

  return (
    <main>
      <header className="page-head">
        <h1>{t("universes.heading")}</h1>
        <p className="page-lede">{t("universes.lede")}</p>
      </header>

      {/* An ORDERED list, and the MCU is deliberately NOT in it: it has its own
          place in the nav, and everything at once is a button on /projects.
          Both still have identical pages — see INDEXED_COLLECTIONS. */}
      <ol className="gateway-list" role="list">
        {INDEXED_COLLECTIONS.map((id) => {
          const span = spanOf(id);
          const band = bandFor(id);
          return (
            <li key={id}>
              <Link className="gateway" href={`/${locale}/universes/${id}`}>
                <span className="gateway-band poster-scrim" aria-hidden="true">
                  {band.map((p) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={p}
                      src={`https://image.tmdb.org/t/p/w342${p}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </span>
                <span className="gateway-body">
                  <span className="gateway-name">{t(`universes.name.${id}`)}</span>
                  {/* THE SAME PARAMS AS THE DETAIL PAGE. "all" carries {n} and {years},
                      and this call site did not pass them — so the index
                      printed the braces raw. A parameterised string has to be
                      given its numbers EVERYWHERE it renders, which is the
                      cost of not hardcoding them. */}
                  <span className="gateway-lede">
                    {t(`universes.bridge.${id}`, {
                      n: titles.length,
                      years: SPAN_YEARS,
                    })}
                  </span>
                  <span className="gateway-meta">
                    <bdi>
                      {t("universe.count", {
                        n: span.count,
                        runtime: totalRuntime(membersOf(id), msg),
                      })}
                    </bdi>
                    <span className="gateway-span tabular">
                      <bdi>
                        {span.from}
                        {"–"}
                        {span.to}
                      </bdi>
                    </span>
                    {/* Said on the door rather than discovered behind it: four
                        of the eight have a real story order and four do not,
                        and that is worth knowing before you click. */}
                    {hasStoryOrder(id) && (
                      <span className="gateway-badge">{t("universes.hasStory")}</span>
                    )}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
