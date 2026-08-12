import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { titles, posterOf, ratingsOf, tintOf } from "@/content/build";
import { pickWall, franchiseOf, type WallItem } from "@/lib/wall";
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
   * 24 POSTERS FOR THE WALL. The rules, and why each exists, are in lib/wall.ts.
   *
   * TMDB-hosted posters only. One title supplies its own absolute poster URL,
   * and the mosaic prefixes a TMDB size onto whatever it is given — which
   * produced `image.tmdb.org/t/p/w185https://m.media-amazon.com/...` and a 404
   * in the server log. The wall is texture behind a scrim, so skipping one of
   * 216 costs nothing; branching on the URL shape here would put the same
   * conditional in a third place instead.
   */
  const pool: WallItem[] = titles.flatMap((x) => {
    const p = posterOf(x.id);
    if (p === null || p.startsWith("http")) return [];
    return [{
      id: x.id,
      universe: x.universe,
      releaseDate: x.releaseDate,
      votes: ratingsOf(x.id)?.tmdb?.votes ?? 0,
      posterPath: p,
      tint: tintOf(x.id) ?? "#000000",
    }];
  });

  /**
   * THE WALL IS CHOSEN, NOT RANKED.
   *
   * Every earlier version derived these — vote count, universe quotas, newest
   * of each — and every one of them answered a question about POPULARITY when
   * the question is about ARTWORK. Vote count cannot see that Iron Fist has a
   * beautiful poster and a small audience, and no amount of tuning a ranking
   * turns it into an eye.
   *
   * So these twenty-four are picked. Where a title was named as a family
   * rather than a specific film, the one with the poster that sits best in
   * this palette was taken:
   *
   *   Venom (2018)          darkest and coolest of the three, anchors the low end
   *   Daredevil S1          near-black red; the darkest tile on the wall
   *   The Punisher S1       near-black, and the only true monochrome here
   *   Infinity War          warm red, where The Avengers is a cool blue-grey
   *                         that fights the warm middle of this set
   *   The Winter Soldier    cool grey-green, the best-composed of the three
   *   Spider-Man 2          warm red that pairs with Logan; Spider-Man 3 is a
   *                         cold blue that strands next to nothing
   *
   * The last six are mine, for the palette and for the two universes the named
   * list left uncovered: Blade for legacy at the dark end, X-Men: The Animated
   * Series for animation at the light end, Black Panther for its blue, and
   * Moon Knight, Legion and Deadpool as the pale anchors the gradient needs to
   * climb to — a wall of twenty-four dark posters has nowhere to go.
   *
   * The derivation below still runs and is not dead: if a title here is ever
   * renamed or loses its poster, the ranking quietly fills the gap rather than
   * shipping a wall of twenty-three.
   */
  const PINNED = [
    // named
    "spider-man-brand-new-day",
    "avengers-doomsday",
    "wonder-man-s1",
    "the-amazing-spider-man",
    "cloak-and-dagger",
    "venom",
    "daredevil-s1",
    "the-punisher-s1",
    "avengers-infinity-war",
    "captain-america-the-winter-soldier",
    "thor-the-dark-world",
    "doctor-strange",
    "spider-man-2",
    "helstrom",
    "luke-cage-s1",
    "iron-fist-s1",
    "jessica-jones-s1",
    "logan",
    // chosen, for the palette and for legacy and animation
    "blade",
    "x-men-the-animated-series",
    "black-panther",
    "moon-knight-s1",
    "legion",
    "deadpool",
  ];

  /** Asked for by name to be off the wall. */
  const EXCLUDED = ["the-amazing-spider-man-2"];

  /**
   * THE SHOP WINDOW — positions 9 to 16, the only tiles seen whole.
   *
   * Two upcoming films lead it, so the first thing fully visible says the site
   * runs to the end of what is announced. Then the six with the strongest
   * artwork. Wonder Man loses its place here to Doctor Strange purely on the
   * poster, and keeps its tile just below the band.
   */
  const BAND = [
    "spider-man-brand-new-day",
    "avengers-doomsday",
    "black-panther",
    "avengers-infinity-war",
    "spider-man-2",
    "logan",
    "captain-america-the-winter-soldier",
    "doctor-strange",
  ];

  const franchise = new Map(titles.map((x) => [x.id, franchiseOf(x.titleEn)]));
  const mosaic: MosaicTile[] = pickWall(
    pool,
    PINNED,
    24,
    (x) => franchise.get(x.id) ?? x.id,
    [],
    EXCLUDED,
    BAND,
  ).map((x) => ({ id: x.id, posterPath: x.posterPath }));

  /**
   * A RAIL OF PORTRAITS, ranked by appearances — a real ranking, but NOT STAN LEE, even though he outranks everyone.
   *
   * This rail ranks by appearance count, and by that measure Stan Lee is the
   * single biggest character in Marvel — he is in more of these than Iron Man.
   * He is also not a character. He is the man who made them, appearing as
   * himself under a different name every time, and putting him first on a page
   * that asks "who is in all this" answers a question nobody was asking.
   *
   * He keeps his record and all his cameos; he is simply not the face that
   * greets a first-time visitor.
   */
  /**
   * AND NOT AUNT MAY, for a different reason than Stan Lee.
   *
   * She is a genuine character, and by appearance count she outranks Ant-Man
   * and Hawkeye — she is in every Spider-Man film there is. But this rail is
   * the site's answer to "who is in all this", and a reader scanning twelve
   * faces for somebody to follow is looking for the people who fight, not the
   * people they come home to.
   *
   * The line is drawn at AFFILIATION rather than at the `supporting` category,
   * which would have been the obvious rule and is the wrong one: Nick Fury is
   * `supporting` too, and he holds the Avengers together. Fury carries
   * S.H.I.E.L.D. and the Avengers; May Parker carries none, because she
   * belongs to no side of it. That keeps Fury and drops her, which is exactly
   * the split intended, and it needs no name written into the code.
   *
   * She keeps her record and every appearance; the characters page still
   * ranks her where her count puts her.
   */
  const faces = [...shownCharacters]
    .filter((c) => c.creditedActor === null)
    .filter((c) => c.category !== "supporting" || c.affiliation.length > 0)
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
          {/* This pointed at /rights, which is a different page about who
              OWNS what. The heading says Every universe, so the link has to
              go to the universes. */}
          <Link className="section-link" href={`/${locale}/universes`}>
            {t("universes.backToAll")}
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
