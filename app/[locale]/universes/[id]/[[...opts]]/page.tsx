import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { posterOf, ratingsOf, titles } from "@/content/build";
import {
  collectionRoutes,
  hasStoryOrder,
  isCollection,
  membersOf,
  orderedMembers,
  type Collection,
  type Order,
  type View,
} from "@/lib/collections";
import { isReleased } from "@/lib/saga";
import { formatRuntimeIntl } from "@/lib/runtime";
import { seasonLabel, totalRuntime } from "@/lib/describe";
import { uiMessages, type UiMessages } from "@/lib/ui-messages";
import { LOCALES } from "@/lib/locales";
import { Poster } from "@/app/components/poster";
import { SagaTimeline } from "@/app/components/saga-timeline";
import { ArrowIcon } from "@/app/components/icons";
import { BackLink } from "@/app/components/back-link";
import type { TitleSource } from "@/content/schema";

/**
 * ONE COLLECTION, TWO ORDERS, TWO VIEWS.
 *
 * Four pages per door and eight doors, and every one of them prerendered. The
 * order and the view are SEGMENTS rather than query parameters, because
 * `searchParams` silently opts a route out of static generation — the first
 * version of the universe page emitted no HTML at all while the build still
 * reported success.
 *
 * URL shape, with both segments optional so the bare door works:
 *
 *   /universes/mcu                     release, posters
 *   /universes/mcu/story               story, posters
 *   /universes/mcu/release/timeline    release, timeline
 *
 * RELEASE IS ALWAYS THE DEFAULT, and that is a content decision rather than an
 * alphabetical accident: a chronological order puts post-credit scenes before
 * the films they set up, so the ordering itself delivers the spoiler. Anyone
 * who switches is told exactly that, once, in a notice they cannot miss.
 *
 * STORY ORDER ONLY WHERE THE FACTS EXIST. Four of the eight have a complete
 * `storyYear` or `storyRank`; the other four do not, and for those the toggle
 * is absent rather than half-populated. A list where a third of the titles have
 * no rank puts them in a lump at one end and looks like an answer.
 */

/** First release to last, computed once — the corpus is the only authority. */
const SPAN_YEARS = (() => {
  const ys = titles
    .map((t) => Number(String(t.releaseDate).slice(0, 4)))
    .filter((y) => Number.isFinite(y) && y > 0);
  return Math.max(...ys) - Math.min(...ys);
})();

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    collectionRoutes().flatMap(({ id, order, view }) => {
      const opts: string[][] = [[order, view]];
      /* The short forms, so a hand-typed or shared URL resolves. `release` +
         `posters` is also reachable as the bare `/universes/mcu`. */
      if (view === "posters") opts.push([order]);
      if (view === "posters" && order === "release") opts.push([]);
      return opts.map((o) => ({ locale, id, opts: o }));
    }),
  );
}

type Params = { params: Promise<{ locale: string; id: string; opts?: string[] }> };

function readOpts(opts: string[] | undefined): { order: Order; view: View } {
  const given = opts ?? [];
  return {
    order: given.includes("story") ? "story" : "release",
    view: given.includes("timeline") ? "timeline" : "posters",
  };
}

export async function generateMetadata({ params }: Params) {
  const { locale, id } = await params;
  if (!isCollection(id)) return { title: "Not found" };
  const t = await getTranslations({ locale });
  return { title: t("universes.name" + `.${id}`) };
}

export default async function CollectionPage({ params }: Params) {
  const { locale, id, opts } = await params;
  if (!isCollection(id)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const msg = uiMessages(t);

  const { view } = readOpts(opts);
  /* A story URL for a collection with no story data falls back rather than
     404ing: the data can arrive later and the link should keep working. */
  const order: Order = readOpts(opts).order === "story" && hasStoryOrder(id) ? "story" : "release";
  const list = orderedMembers(id, order);
  const base = `/${locale}/universes/${id}`;
  const href = (o: Order, v: View) => (o === "release" && v === "posters" ? base : `${base}/${o}/${v}`);

  return (
    <main>
      {/* NOT ON THE MCU PAGE. The MCU is its own item in the top bar and is
          deliberately not listed on /universes — "the other universes" is what
          that index is — so an arrow back to a page it was never on is a lie
          about where the reader came from. */}
      {id !== "mcu" && (
        <p>
          <BackLink href={`/${locale}/universes`}>
            <ArrowIcon back /> {t("universes.backToAll")}
          </BackLink>
        </p>
      )}

      <header className="page-head">
        <h1>{t(`universes.name.${id}`)}</h1>
        {/* THE NUMBERS ARE PASSED, NOT WRITTEN. This line said "167 of them" and
            "twenty-seven years" while the corpus held 170 across 41 — copy that
            was true once and quietly went wrong three separate times as titles
            were added. A count in prose is a second source of truth; the only
            fix that lasts is to hand it the real one. */}
        <p className="page-lede">
          {t(`universes.bridge.${id}`, { n: titles.length, years: SPAN_YEARS })}
        </p>
        <p className="page-meta">
          <bdi>
            {t("universe.count", { n: list.length, runtime: totalRuntime(list, msg) })}
          </bdi>
        </p>
      </header>

      <div className="collection-controls">
        {/**
         * TWO CONTROLS, TWO QUESTIONS. "In what order" and "shown how" are
         * independent, so they are two groups rather than four buttons in a
         * row — picking Timeline must not silently reset the order.
         */}
        {hasStoryOrder(id) && (
          <nav className="seg" aria-label={t("universes.orderLabel")}>
            <Link href={href("release", view)} aria-current={order === "release" ? "page" : undefined}>
              {t("universe.releaseToggle")}
            </Link>
            <Link href={href("story", view)} aria-current={order === "story" ? "page" : undefined}>
              {t("universe.storyToggle")}
            </Link>
          </nav>
        )}
        <nav className="seg" aria-label={t("universes.viewLabel")}>
          <Link href={href(order, "posters")} aria-current={view === "posters" ? "page" : undefined}>
            {t("universes.viewPosters")}
          </Link>
          <Link href={href(order, "timeline")} aria-current={view === "timeline" ? "page" : undefined}>
            {t("universes.viewTimeline")}
          </Link>
        </nav>
      </div>

      {/**
       * THE SPOILER NOTICE, and it only appears on the order that earns it.
       *
       * Story order is not a neutral re-sort. It puts Captain Marvel in 1995
       * and the first Iron Man after it, which means a viewer meets the
       * post-credits reveal before the film it was written to sell. Saying so
       * once, in a `note` role, is the difference between a feature and a
       * trap. It is NOT a dismissible banner: a warning you can turn off is a
       * warning nobody who needed it will read.
       */}
      {order === "story" && (
        <p className="spoiler-notice" role="note">
          <strong>{t("universes.spoilerTitle")}</strong> {t("universes.spoilerBody")}
        </p>
      )}

      {/**
       * THE MCU'S RELEASE TIMELINE IS THE SAGA TIMELINE.
       *
       * This is what /order used to be, and folding it in here rather than
       * keeping a second page for it is the whole point of the change: the MCU
       * is one of the eight collections and it gets the same two orders and the
       * same two views as the other seven. It just happens to have something
       * none of the others do — published sagas and phases — so its release
       * timeline draws those as markers on the spine.
       *
       * It also carries the watched checkboxes and the progress fill up the
       * rail. That feature has silently lost its only page once before, when
       * release order stopped being a thread, and it is not losing it again to
       * a route deletion.
       *
       * Story order gets the plain timeline, because a chronological list cuts
       * straight across the phase boundaries: phase markers on a list that
       * jumps 1943 → 1964 → 1995 → 2010 would be drawing the wrong structure.
       */}
      {view === "timeline" ? (
        id === "mcu" && order === "release" ? (
          <SagaTimeline locale={locale} msg={msg} />
        ) : (
          <CollectionTimeline list={list} order={order} locale={locale} m={msg} />
        )
      ) : (
        <PosterGrid list={list} locale={locale} m={msg} />
      )}
    </main>
  );
}

/**
 * THE POSTER VIEW — the default, because the posters are the product.
 *
 * An ordered list, and the number is printed: the whole value of this page over
 * /projects is that position 1 comes before position 2, and a grid with no
 * numbers throws that away.
 */
function PosterGrid({
  list,
  locale,
  m,
}: {
  list: TitleSource[];
  locale: string;
  m: UiMessages;
}) {
  return (
    <ol className="collection-grid" role="list">
      {list.map((x, i) => {
        const rating = isReleased(x) ? ratingsOf(x.id).imdb : null;
        return (
          <li key={x.id}>
            <Link className="project-tile" href={`/${locale}/path/${x.id}`}>
              <span className="project-art poster-scrim">
                <Poster title={x} posterPath={posterOf(x.id)} size="grid" locale={locale} />
                <span className="tile-index tabular" aria-hidden="true">
                  {i + 1}
                </span>
                {rating && (
                  <span className="project-score tabular">{rating.score.toFixed(1)}</span>
                )}
              </span>
              <span className="project-title">
                <bdi lang="en">{x.titleEn}</bdi>
              </span>
              <span className="project-meta">
                <span className="tabular">{x.releaseDate.slice(0, 4)}</span>
                {x.runtimeMin !== null && (
                  <span className="runtime">
                    <bdi>{formatRuntimeIntl(x.runtimeMin, m)}</bdi>
                  </span>
                )}
                {!isReleased(x) && <span className="saga-soon">{m.upcoming}</span>}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * THE TIMELINE VIEW — the same list, on the spine.
 *
 * One rail for the whole page, one title left and one right, and the YEAR is
 * the marker. In story order the year printed is the in-universe one, because
 * printing the release year on a story-ordered list would make it look
 * scrambled: The First Avenger sitting second with "2011" beside it reads as a
 * bug rather than as 1943.
 */
function CollectionTimeline({
  list,
  order,
  locale,
  m,
}: {
  list: TitleSource[];
  order: Order;
  locale: string;
  m: UiMessages;
}) {
  const yearOf = (t: TitleSource) =>
    order === "story" && t.storyYear !== null
      ? t.storyYear < 0
        ? `${Math.abs(t.storyYear)} ${m.bce}`
        : String(t.storyYear)
      : t.releaseDate.slice(0, 4);

  return (
    <div className="saga-wrap">
      <svg
        className="thread-rail saga-rail"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        viewBox="0 0 4 100"
      >
        <line className="thread-track" x1="2" y1="0" x2="2" y2="100" />
      </svg>

      <ol className="phase-titles" role="list">
        {list.map((x, i) => {
          const released = isReleased(x);
          const rating = released ? ratingsOf(x.id).imdb : null;
          const seasons = seasonLabel(x, m);
          const year = yearOf(x);
          return (
            <li
              key={x.id}
              className="saga-row reveal-step"
              data-step={Math.min(i, 5)}
              data-unreleased={released ? undefined : "true"}
            >
              {(i === 0 || yearOf(list[i - 1]!) !== year) && (
                <span className="saga-year tabular" aria-hidden="true">
                  {year}
                </span>
              )}
              <div className="panel-card">
                <Poster title={x} posterPath={posterOf(x.id)} size="panel" locale={locale} />
                <div className="panel-card-body">
                  <span className="panel-title">
                    <a href={`/${locale}/path/${x.id}`}>
                      <bdi lang="en">{x.titleEn}</bdi>
                    </a>
                  </span>
                  <span className="panel-title-ar">
                    <bdi lang="ar">{x.titleAr}</bdi>
                  </span>
                  <p className="panel-meta">
                    <span className="tabular">{year}</span>
                    {seasons && <span>{seasons}</span>}
                    {x.runtimeMin !== null && (
                      <span className="runtime">
                        <bdi>{formatRuntimeIntl(x.runtimeMin, m)}</bdi>
                      </span>
                    )}
                    {rating && (
                      <span className="saga-score tabular">
                        {"★"} {rating.score.toFixed(1)}
                      </span>
                    )}
                    {!released && <span className="saga-soon">{m.upcoming}</span>}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
