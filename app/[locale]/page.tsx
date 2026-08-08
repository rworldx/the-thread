import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { titles, posterOf } from "@/content/build";
import { infinitySaga, mcuOrder } from "@/lib/graph";
import { localeParams } from "@/lib/locales";
import { Poster } from "@/app/components/poster";
import { Avatar } from "@/app/components/avatar";
import { Previously } from "@/app/components/previously";
import { HomeSearch } from "@/app/components/home-search";
import { Mosaic, type MosaicTile } from "@/app/components/mosaic";
import { Thread, ThreadPanel, PanelTitle } from "@/app/components/thread";
import { ArrowIcon } from "@/app/components/icons";
import { shownCharacters } from "@/lib/characters";
import { formatRuntimeIntl } from "@/lib/runtime";
import { uiMessages } from "@/lib/ui-messages";
import type { SearchItem } from "@/lib/search";
import { bandFor, HOME_COLLECTIONS, membersOf } from "@/lib/collections";

/**
 * THE HOMEPAGE.
 *
 * The hero is a wall of posters with a choice on it. Two doors, because a
 * newcomer and a returning viewer want opposite things and every competitor
 * makes them share one screen.
 *
 * Below it, one idea per section with real air between them: the thread, the
 * seven universes, the characters, the rights. Each is a door into the same
 * content, and each ends at a title and what to watch before it.
 */

export function generateStaticParams() {
  return localeParams();
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const msg = uiMessages(t);

  const spine = infinitySaga(titles);
  const spineHours = Math.round(spine.reduce((n, x) => n + (x.runtimeMin ?? 0), 0) / 60);
  /** The first four of the MCU proper, which is what the door leads to. */
  const slice = mcuOrder(titles).slice(0, 4);

  /**
   * 24 posters for the mosaic, strided across the whole corpus rather than
   * taken from the front. The first 24 are four Iron Man films and a lot of
   * phase one; a stride across release order gives thirty years of artwork,
   * which is the point of a wall.
   */
  /**
   * TMDB-hosted posters only.
   *
   * One title supplies its own absolute poster URL, and the mosaic prefixes a
   * TMDB size onto whatever it is given — which produced
   * `image.tmdb.org/t/p/w185https://m.media-amazon.com/...` and a 404 in the
   * server log. The mosaic is texture behind a scrim, so skipping one of 166
   * costs nothing; branching on the URL shape here would put the same
   * conditional in a third place instead.
   */
  const withPosters = titles.filter((x) => {
    const p = posterOf(x.id);
    return p !== null && !p.startsWith("http");
  });
  const stride = Math.max(1, Math.floor(withPosters.length / 24));
  const mosaic: MosaicTile[] = withPosters
    .filter((_, i) => i % stride === 0)
    .slice(0, 24)
    .map((x) => ({ id: x.id, posterPath: posterOf(x.id)! }));

  /** A rail of portraits, ranked by appearances, which is a real ranking. */
  const faces = [...shownCharacters]
    .sort((a, b) => b.appearances.length - a.appearances.length)
    .slice(0, 12);

  const recapIndex: SearchItem[] = spine.map((x) => ({
    id: x.id,
    titleEn: x.titleEn,
    titleAr: x.titleAr,
    year: x.releaseDate.slice(0, 4),
    universe: x.universe,
    pathLength: 0,
    minutes: x.runtimeMin,
  }));
  const lines = Object.fromEntries(
    spine
      .filter((x) => x.spoilerSafe)
      .map((x) => [x.id, x.spoilerSafe![locale === "ar" ? "ar" : "en"]]),
  );

  return (
    <main className="home">
      <Previously index={recapIndex} locale={locale} lines={lines} />

      <section className="hero">
        <Mosaic titles={mosaic} />

        <div className="hero-content">
          {/**
           * TWO SENTENCES, TWO LINES, IN BOTH LANGUAGES.
           *
           * This was one string relying on the measure to break it. English
           * wrapped after "Two doors." at 14ch; Arabic is shorter set and fit
           * on one line at its own 18ch measure, so the two pages had
           * different compositions of the same headline. Tuning a `ch` value
           * per script is a guess that breaks again the next time the copy
           * changes.
           *
           * The break is structural now: each sentence is its own block, so
           * both scripts break in the same place for the same reason.
           */}
          <h1 className="hero-display">
            <span>{t("home.doorsHeadingA")}</span>
            <span>{t("home.doorsHeadingB")}</span>
          </h1>

          <div className="doors">
            <section className="door">
              <h2>{t("home.newTitle")}</h2>
              <p className="door-body door-count">
                <bdi>{t("home.newBody", { n: spine.length, hours: spineHours })}</bdi>
              </p>
              <Link className="cta" href={`/${locale}/universes/mcu/release/timeline`}>
                {t("home.newCta")}
                <ArrowIcon />
              </Link>
            </section>

            <section className="door">
              <h2>{t("home.knowTitle")}</h2>
              <HomeSearch locale={locale} />
            </section>
          </div>
        </div>
      </section>

      {/**
       * ONE marquee on the page. It gives the seam between the hero and the
       * content some motion without animating any content.
       *
       * TWO IDENTICAL GROUPS, and that is what makes the loop seamless.
       *
       * It used to be one flat run of eight spans with a `gap`, animated from
       * 0 to -50%. That cannot loop cleanly for two separate reasons. With N
       * items and a gap g the track is Nw + (N-1)g, so half of it is
       * 4w + 3.5g — half a gap short of where item five actually sits, and the
       * strip stutters by that much every cycle. Worse, four copies are about
       * 900px, so on any screen wider than that the second half had not
       * arrived yet and a band of EMPTY GROUND scrolled through.
       *
       * Two groups, each at least a full viewport wide, each carrying its own
       * trailing space rather than relying on `gap` between them, makes the
       * track exactly 200% and -50% exactly one group. It never runs out, in
       * either script, at any width.
       */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              {Array.from({ length: 32 }, (_, i) => (
                <span key={i}>{t("site.name")}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="home-section reveal" aria-labelledby="thread-heading">
        <div className="section-head">
          <h2 id="thread-heading">{t("order.mcu")}</h2>
          <Link className="section-link" href={`/${locale}/universes/mcu/release/timeline`}>
            {t("home.seeThread")}
            <ArrowIcon />
          </Link>
        </div>
        <p className="section-lede">{t("order.mcuBlurb")}</p>

        <Thread>
          {slice.map((x, i) => (
            <ThreadPanel key={x.id} value={i + 1}>
              {/**
               * THE POSTER, like every other list of titles on this site.
               *
               * These four were the only place a title appeared as a bare row
               * of type — a number, two names and a runtime — while the
               * timeline, the collections, the projects grid and the character
               * pages all lead with the artwork. The whole argument of the site
               * is that the posters are the product, and the homepage was the
               * one page not making it.
               *
               * `panel-card` is the same wrapper the timeline uses, so this is
               * the existing component rather than a fifth way of drawing a
               * title.
               */}
              <div className="panel-card">
                <Poster
                  title={x}
                  posterPath={posterOf(x.id)}
                  size="panel"
                  locale={locale}
                />
                <div className="panel-card-body">
                  <PanelTitle
                    href={`/${locale}/path/${x.id}`}
                    en={x.titleEn}
                    ar={x.titleAr}
                    index={i + 1}
                  />
                  <p className="panel-meta">
                    <span className="tabular">{x.releaseDate.slice(0, 4)}</span>
                    {x.runtimeMin !== null && (
                      <span className="runtime">
                        <bdi>{formatRuntimeIntl(x.runtimeMin, msg)}</bdi>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </ThreadPanel>
          ))}
        </Thread>
      </section>

      <section className="home-section reveal" aria-labelledby="universes-heading">
        <div className="section-head">
          <h2 id="universes-heading">{t("home.universesHeading")}</h2>
          <Link className="section-link" href={`/${locale}/rights`}>
            {t("rights.cta")}
            <ArrowIcon />
          </Link>
        </div>
        {/**
         * THE SAME EIGHT DOORS AS /universes, minus Everything.
         *
         * This read the seven RIGHTS buckets, so the homepage showed one
         * combined "Fox: X-Men and Fantastic Four" tile while /universes showed
         * two separate doors for them, and folded the Defenders into Marvel
         * Television in one place and not the other. Two pages disagreeing
         * about how many universes there are is the exact confusion the
         * collections list exists to end. Both read HOME_COLLECTIONS now.
         *
         * It wraps. There is no `overflow-x` and never was one, despite what
         * the name says: all of them are visible without a gesture.
         */}
        <ul className="universe-rail" role="list">
          {HOME_COLLECTIONS.map((id) => {
            const own = membersOf(id);
            return (
              <li key={id}>
                <Link
                  className="universe-slide poster-scrim"
                  href={`/${locale}/universes/${id}`}
                >
                  {/**
                   * FOUR POSTERS, NOT ONE.
                   *
                   * The tile showed a single lead poster, which said "here is a
                   * film" where it meant "here is a body of work" — and the tile
                   * next to it, for a different universe, looked identical in
                   * kind. A strip of real artwork from inside the collection is
                   * the difference: you should be able to tell the X-Men tile
                   * from the animation tile with the type covered up.
                   *
                   * FOUR rather than the six /universes uses, because these
                   * tiles are half the width. Six here would be slivers.
                   */}
                  <span className="universe-slide-band" aria-hidden="true">
                    {bandFor(id, 4).map((p) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={p}
                        src={`https://image.tmdb.org/t/p/w342${p}`}
                        srcSet={`https://image.tmdb.org/t/p/w342${p} 1x, https://image.tmdb.org/t/p/w500${p} 2x`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </span>
                  <span className="universe-slide-body">
                    <span className="universe-slide-name">
                      {t(`universes.name.${id}`)}
                    </span>
                    <span className="universe-slide-count">
                      <bdi>{t("projects.count", { n: own.length })}</bdi>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* CHARACTERS — the door the previous build did not have. A person is a
          way into the canon that a title is not. */}
      <section className="home-section reveal" aria-labelledby="faces-heading">
        <div className="section-head">
          <h2 id="faces-heading">{t("characters.heading")}</h2>
          <Link className="section-link" href={`/${locale}/characters`}>
            {t("characters.backToAll")}
            <ArrowIcon />
          </Link>
        </div>
        <p className="section-lede">{t("characters.lede")}</p>
        <ul className="face-rail" role="list">
          {faces.map((c) => (
            <li key={c.id}>
              <Link className="char-tile" href={`/${locale}/characters/${c.id}`}>
                <Avatar
                  src={c.image}
                  name={locale === "ar" ? c.nameAr : c.nameEn}
                />
                <span className="char-tile-body">
                  <span className="char-tile-name">
                    {locale === "ar" ? c.nameAr : c.nameEn}
                  </span>
                  <span className="char-tile-meta tabular">{c.appearances.length}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
