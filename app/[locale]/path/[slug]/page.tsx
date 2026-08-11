import Image from "next/image";
import { remoteSrc } from "@/image-loader";
import Link from "next/link";
import { collectionOf } from "@/lib/collections";
import { notFound } from "next/navigation";
import { titles, byId } from "@/content/build";
import { pathTo, recommendationsFor, UnknownTitleError } from "@/lib/graph";
import { formatRuntimeIntl } from "@/lib/runtime";
import { formatCost, seasonLabel, totalRuntime } from "@/lib/describe";
import { mentionsOf } from "@/lib/mentions";
import type { TitleSource } from "@/content/schema";
import { EditorNote, PanelTitle, Thread, ThreadPanel } from "@/app/components/thread";
import { LOCALES } from "@/lib/locales";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { DescribeMessages } from "@/lib/describe";
import { uiMessages, type UiMessages } from "@/lib/ui-messages";
import { Poster } from "@/app/components/poster";
import { SpoilerContext } from "@/app/components/shield";
import { WhereToWatch } from "@/app/components/where-to-watch";
import { ArrowIcon } from "@/app/components/icons";
import {
  posterOf,
  providersGlobalOf,
  ratingsOf,
  postersOf,
  castOf,
  authorsOf,
  videosOf,
  episodesOf,
} from "@/content/build";
import { charactersIn, characterOf } from "@/lib/characters";
import { Trailers } from "@/app/components/trailers";
import { Ratings } from "@/app/components/ratings";
import { Gallery } from "@/app/components/gallery";
import { Portrait } from "@/app/components/portrait";
import { Avatar, SplitAvatar } from "@/app/components/avatar";
import { Collapsible } from "@/app/components/collapsible";
import { stoneIntroducedBy } from "@/content/stones";

/**
 * THE TITLE PAGE — and the path IS the title page.
 *
 * The brief specified /title and /path as separate routes. That was wrong: when
 * someone asks about a title, the path is the answer, and splitting them makes
 * a user navigate to get the thing they came for. One route.
 *
 * Order on the page is the thesis:
 *   hero     poster (the ONE priority image), title, year, universe, runtime
 *   answer   "Watch these N first — ~Xh", immediately, before anything else
 *   thread   the path
 *   extras   recommendations, priced
 *
 * All 130 × 2 locales are precomputed. The graph is finite; nothing resolves at
 * request time and no TMDB call happens in production.
 */

/** How many cast credits show before the disclosure. Ten is a cast list; forty
    is a wall between the reader and the rest of the page. */
/* Ten, matching the cast rail. Past that it is an archive, not a list. */
const EPISODES_SHOWN = 10;
const CAST_SHOWN = 10;

export const dynamicParams = false;

export function generateStaticParams() {
  // locale × slug. Adding "ar" to LOCALES doubles this array and nothing else.
  return LOCALES.flatMap((locale) => titles.map((t) => ({ locale, slug: t.id })));
}

/** Next 15: `params` is a Promise and must be awaited. Reading it synchronously
 *  yields undefined, which here means every page quietly renders as notFound(). */
type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  const node = byId.get(slug);
  if (!node) return { title: "Not found" };
  const t = await getTranslations({ locale, namespace: "path" });
  return {
    title: t("metaTitle", { title: node.titleEn }),
    description: t("metaDescription", { title: node.titleEn }),
  };
}

function Row({
  t,
  n,
  target,
  locale,
  m,
}: {
  t: TitleSource;
  n: number;
  target?: boolean;
  locale: string;
  m: UiMessages;
}) {
  const seasons = seasonLabel(t, m);
  return (
    <ThreadPanel
      value={n}
      target={target}
      optional={t.optional}
      offUniverse={t.universe !== "mcu"}
    >
      <div className="panel-card">
        <Poster title={t} posterPath={posterOf(t.id)} size="panel" locale={locale} />
        <div className="panel-card-body">
          <PanelTitle href={`/${locale}/path/${t.id}`} en={t.titleEn} ar={t.titleAr} index={n} />
      <span className="panel-meta">
        <span className="tabular">{t.releaseDate.slice(0, 4)}</span>
        <span>{t.universe}</span>
        {/* A collapsed range must carry its size everywhere it appears. Seven
            seasons rendered as one bare line beside Blade misprices the list. */}
        {seasons && <span>{seasons}</span>}
        {/* Through the message layer, and bidi-isolated. "1س 44د" reordered in
            RTL to read as 44 hours and 1 minute: a bare letter unit does not
            bind to its number, so the algorithm is free to move the clauses. */}
        {/* NOT `tabular`. That class is --font-mono (IBM Plex Mono), which has
            no Arabic coverage — "ساعة واحدة و44 دقيقة" would render its digits
            in Plex and its words in a fallback, on every row of every AR page.
            Tabular exists to align digit columns, and a wrapping flex row has no
            column to align. The year keeps it; the runtime is a phrase now. */}
        {t.runtimeMin !== null && (
          <span className="runtime">
            <bdi>{formatRuntimeIntl(t.runtimeMin, m)}</bdi>
          </span>
        )}
        {t.optional && <span>{m.optional}</span>}
          </span>
        </div>
      </div>
      {t.editorNote && (
        <EditorNote
          en={t.editorNote.en}
          ar={t.editorNote.ar}
          signature={m.signature}
          mentions={mentionsOf(t.editorNote.mentions)}
          locale={locale}
        />
      )}
    </ThreadPanel>
  );
}

export default async function PathPage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  /**
   * ICU plurals, not `n === 1 ? "title" : "titles"`. Arabic has six plural
   * categories — zero, one, two, few, many, other — and a ternary is wrong
   * there in a way it never is in English.
   */
  const msg: UiMessages = uiMessages(t);

  let minimum: TitleSource[];
  let full: TitleSource[];
  try {
    minimum = pathTo(titles, slug, "minimum");
    full = pathTo(titles, slug, "full");
  } catch (e) {
    if (e instanceof UnknownTitleError) notFound();
    throw e;
  }

  const target = minimum.at(-1)!;
  const ratings = ratingsOf(target.id);
  const videos = videosOf(target.id);
  const gallery = postersOf(target.id);
  const cast = castOf(target.id);
  const authors = authorsOf(target.id);
  const stone = stoneIntroducedBy(target.id);
  /**
   * ONE SPIDER-MAN PER PROJECT, not two.
   *
   * Homecoming credits Peter Parker once, and the corpus holds him twice: the
   * character, and the Tom Holland performance of him. Listing both puts two
   * near-identical Spider-Men side by side on a page whose only job is telling
   * a reader who is in this — which is the opposite of helping.
   *
   * So where a performance is present, it REPLACES the character it is a
   * performance of, and the avatar is split: the character on one side, the
   * actor on the other. Nothing is lost, because the merged entry links to the
   * performance and the performance names its base.
   *
   * No Way Home is the case that makes it worth doing. Three performances are
   * in it, so it shows three, and the plain Spider-Man does not appear a
   * fourth time to confuse the count.
   */
  const present = charactersIn(target.id);
  const replaced = new Set(
    present.flatMap((c) => (c.performerOf ? [c.performerOf.character] : [])),
  );
  const inThis = present.filter((c) => !replaced.has(c.id));

  const episodes = episodesOf(target.id);
  // Everything `full` adds that `minimum` did not already require.
  const minIds = new Set(minimum.map((t) => t.id));
  const recommended = full.filter((t) => !minIds.has(t.id));
  // The same set, grouped by what suggests each one and priced. Test D18b
  // asserts these two views account for exactly the same titles.
  const recommendations = recommendationsFor(titles, slug);
  /** Everything before the destination — the number the answer line quotes. */
  const before = minimum.slice(0, -1);

  return (
    <main>

      <header className="title-hero">
        {/* The ONE priority image on this page — the LCP element (§14.5).
            Everything else is native lazy; eight preloads make LCP worse. */}
        <Poster
          title={target}
          posterPath={posterOf(target.id)}
          size="hero"
          priority
          locale={locale}
        />

        <div className="title-hero-body">
          <h1>
            {/* rich() needs TAG syntax in the message — `<title></title>`, not
                `{title}`. A function passed to a simple placeholder is handed
                straight to React, which cannot render it. */}
            {t.rich("path.heading", {
              title: () => <bdi lang="en">{target.titleEn}</bdi>,
            })}
          </h1>
          <p className="panel-title-ar">
            <bdi lang="ar">{target.titleAr}</bdi>
          </p>

          <p className="panel-meta">
            <span className="tabular">{target.releaseDate.slice(0, 4)}</span>
            <Link href={`/${locale}/universes/${collectionOf(target)}`}>
              {t(`universe.name.${target.universe}`)}
            </Link>
            {seasonLabel(target, msg) && <span>{seasonLabel(target, msg)}</span>}
            {target.runtimeMin !== null && (
              <span className="runtime">
                <bdi>{formatRuntimeIntl(target.runtimeMin, msg)}</bdi>
              </span>
            )}
          </p>

          {/* THE SCORES, one row, each labelled with WHOSE it is.
              IMDb and Rotten Tomatoes come from OMDb keyed on the IMDb id;
              TMDB's own is a different population and never wears another
              service's name. There is no Letterboxd number because Letterboxd
              has no public API, and printing a scraped one as fact is what this
              corpus refuses to do everywhere else. */}
          {/* WHO MADE IT, above the answer, because it is part of what the
              title IS rather than a credit to scroll for. A film shows its
              director; a series shows its creators, and the label says which,
              because direction on a series is per episode and one name would
              be a claim nobody made. */}

          <Ratings ratings={ratings} />

          {/* THE ANSWER. Above everything else, because it is the reason the
              page exists — not a section someone scrolls to find. */}
          {/* The answer is a claim and a price, and they are two lines rather
              than one dotted string. As one line at this measure it wrapped to
              "Watch these 33 titles first ·" and stranded the separator at the
              end of the line, which is what a middle dot used as glue does when
              the box is narrower than the sentence. */}
          <p className="title-answer">
            {before.length === 0 ? (
              <strong>{t("title.watchFirstNone")}</strong>
            ) : (
              <>
                {/**
                 * THE ANSWER POINTS AT THE LIST THAT IS THE ANSWER.
                 *
                 * "Watch 33 titles first" is the page's whole verdict, and it
                 * named a number without saying WHICH — the titles are eight
                 * sections further down, and on a phone that is a lot of
                 * scrolling past cast and episodes to find out.
                 *
                 * A same-page anchor, not a button: it works with no
                 * JavaScript, it can be opened in a new tab, and the URL it
                 * produces is shareable. The smooth scroll is CSS on the
                 * document, so it honours `prefers-reduced-motion` for free.
                 */}
                <a className="title-answer-jump" href="#order-heading">
                  <strong>{t("title.watchFirst", { n: before.length })}</strong>
                </a>
                <bdi className="title-answer-cost">{totalRuntime(before, msg)}</bdi>
              </>
            )}
          </p>

          {target.spoilerSafe && (
            <p className="spoiler-safe">{target.spoilerSafe[locale === "ar" ? "ar" : "en"]}</p>
          )}
          {/* The connective tissue. Not in this page's HTML at all — it is
              fetched from /context.json only when somebody asks. */}
          <SpoilerContext
            id={target.id}
            locale={locale}
            available={Boolean(target.context?.[locale === "ar" ? "ar" : "en"])}
          />
        </div>
      </header>

      {/* EVERY official teaser and trailer, small, in campaign order, each a
          direct link to YouTube. Nothing is embedded, so nothing third-party
          loads unless a reader actually goes there. */}
      <section className="title-section" aria-labelledby="trailer-heading">
        <h2 id="trailer-heading">{t("title.trailer")}</h2>
        <Trailers videos={videos} />
      </section>

      {/**
       * THE STONE THIS FILM INTRODUCES.
       *
       * Six of the 167 titles have one. A viewer is handed six objects across
       * eleven years and expected to work out that the blue cube, the sceptre,
       * the red smoke, the orb, the necklace and the orange rock are the same
       * kind of thing — and nothing on screen says so until the gauntlet.
       */}
      {stone && (
        <section className="title-section stone-panel" aria-labelledby="stone-heading">
          <h2 id="stone-heading">{t("title.stoneHeading")}</h2>
          <div className="stone">
            {/**
             * `next/image`, NOT a plain `<img>`, and the reason is the CDN.
             *
             * A plain tag makes the BROWSER fetch it, which sends a `Referer`
             * of this site — and Wikia's CDN rejects hotlinks, intermittently,
             * with a 404. The stone rendered on one load and vanished on the
             * next, which is exactly the "the images don't show" report.
             *
             * The character portraits come from the same host and never had
             * this problem, because they go through `next/image`: the fetch
             * happens on the server, with no referer to reject. Same fix.
             */}
            <Image
              className="stone-art"
              /* Wikia refuses hotlinks, so this one is proxied — by weserv,
                 not by Vercel. See `image-loader.ts`. */
              src={remoteSrc(stone.image, 342)}
              unoptimized
              alt=""
              width={300}
              height={300}
              sizes="(max-width: 48rem) 26vw, 160px"
              loading="lazy"
            />
            <div className="stone-body">
              <p className="stone-name">{locale === "ar" ? stone.nameAr : stone.nameEn}</p>
              <p className="stone-vessel">{locale === "ar" ? stone.vesselAr : stone.vesselEn}</p>
              <p className="stone-power">{locale === "ar" ? stone.powerAr : stone.powerEn}</p>
            </div>
          </div>
        </section>
      )}

      {cast.length > 0 && (
        <section className="title-section" aria-labelledby="cast-heading">
          <h2 id="cast-heading">{t("title.cast")}</h2>

          {/**
           * THE DIRECTOR SITS WITH THE CAST, ABOVE IT, BEHIND A RULE.
           *
           * It was up in the hero, which put it a long way from the only other
           * list of people on the page. These are all the people who made the
           * thing; the split says which of them made it and which are in it,
           * without turning one credit into its own section.
           */}
          {authors.names.length > 0 && (
            <div className="authorship">
              <span className="authorship-role">
                {t(`title.${authors.role === "creator" ? "createdBy" : "directedBy"}`)}
              </span>
              <ul className="author-list" role="list">
                {authors.names.map((name, i) => (
                  <li key={name}>
                    <Portrait src={authors.photos[i] ?? null} alt="" />
                    <span className="author-name">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h3 className="cast-subhead">{t("title.starring")}</h3>
          {/* Ten, then the rest behind a disclosure. Every credit is still in
              the markup — see the component for why that matters. */}
          <Collapsible hidden={cast.length - CAST_SHOWN} label={t("title.showMore", { n: cast.length - CAST_SHOWN })}>
            <ul className="cast-rail" role="list" data-shown={CAST_SHOWN}>
              {cast.map((c) => (
                <li key={`${c.actor}-${c.character}`} className="cast-credit">
                  <Portrait src={c.actorPhoto} alt="" />
                  <span className="cast-actor">{c.actor}</span>
                  <span className="cast-character">{c.character}</span>
                </li>
              ))}
            </ul>
          </Collapsible>
        </section>
      )}

      {/**
       * THE EPISODES — a still and a name each, which is what a season IS.
       *
       * The page said "9 episodes, 5h 47m" and stopped. That is a receipt, not
       * a look at the thing: it tells you what a season costs and nothing about
       * what is in it. Every streaming service shows this list because it is
       * the only view that answers "what am I actually about to watch".
       *
       * NO SYNOPSES, deliberately. An episode overview is a spoiler with a
       * title on it, and this whole site is built on refusing those — the
       * title lines are spoiler-safe by rule and the shield exists for the rest.
       * A still and a name say what an episode is without saying what happens.
       *
       * Collapsed past ten, the same as the cast and the trailers, because a
       * seven-season node would otherwise bury everything under it.
       */}
      {episodes.length > 0 && (
        <section className="title-section" aria-labelledby="eps-heading">
          <h2 id="eps-heading">{t("title.episodes", { n: episodes.length })}</h2>
          {/* Ten, then the rest behind the same disclosure the cast uses —
              every episode stays in the markup, and CSS hides the overflow. */}
          <Collapsible
            hidden={episodes.length - EPISODES_SHOWN}
            label={t("title.showMore", { n: episodes.length - EPISODES_SHOWN })}
          >
            <ol className="episode-grid" role="list" data-shown={EPISODES_SHOWN}>
              {episodes.map((ep) => (
                <li key={`${ep.season}x${ep.number}`}>
                  <span className="episode-still">
                    {ep.still ? (
                      /**
                       * `unoptimized`, like every other image here — this one
                       * was missed when the rest moved off Vercel's optimiser,
                       * so all 1,934 episode stills kept requesting a quota
                       * that was already spent and rendered as nothing.
                       *
                       * And NOT through `remoteSrc`: that maps a TMDB path
                       * onto the POSTER width ladder, which would ask for
                       * w342. Stills are published at w92/w185/w300/original
                       * and a poster width 404s on them. w300 is already the
                       * right size, so the URL is used as written.
                       */
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${ep.still}`}
                        unoptimized
                        alt=""
                        width={300}
                        height={169}
                        sizes="(max-width: 48rem) 45vw, 220px"
                        loading="lazy"
                      />
                    ) : (
                      <span className="episode-still-empty" aria-hidden="true" />
                    )}
                    <span className="episode-number tabular">
                      {ep.season}×{ep.number}
                    </span>
                  </span>
                  <span className="episode-name">{ep.name}</span>
                  {/* Minutes, and only where TMDB actually has them. A missing
                      runtime prints nothing rather than the show average, which
                      would look like a fact and be a guess.

                      NOT `tabular` — see the note on the runtime above. That
                      class is Plex Mono, which has no Arabic coverage, and a
                      formatted runtime is a phrase, not a digit column. */}
                  {ep.runtime !== null && (
                    <span className="episode-runtime">
                      <bdi>{formatRuntimeIntl(ep.runtime, msg)}</bdi>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Collapsible>
        </section>
      )}

      {/* Characters, linked. The title page and the character page read the
          same relation from two directions, and C16 asserts they agree. */}
      {inThis.length > 0 && (
        <section className="title-section" aria-labelledby="chars-heading">
          <h2 id="chars-heading">{t("characters.inThisTitle")}</h2>
          {/* Circular, overlapping, and each one lifts clear of the row on
              hover. A rank of faces reads as a cast in a way a row of text
              chips never did. */}
          <ul className="face-stack" role="list">
            {inThis.map((c) => (
              <li key={c.id}>
                <Link className="face-stack-item" href={`/${locale}/characters/${c.id}`}>
                  {/* THE ONE PLACE THE SPLIT BELONGS. On a project page the question
                      is "who is in this", and for No Way Home the answer is three
                      Peter Parkers whose names are near-identical. A half-and-half
                      frame separates them at a glance, which is the only place that
                      distinction has to be made instantly. */}
                  {c.performerOf ? (
                    <SplitAvatar
                      characterSrc={characterOf(c.performerOf.character)?.image ?? null}
                      actorSrc={c.image}
                      name={locale === "ar" ? c.nameAr : c.nameEn}
                    />
                  ) : (
                    <Avatar src={c.image} name={locale === "ar" ? c.nameAr : c.nameEn} />
                  )}
                  <span className="face-stack-name">
                    {locale === "ar" ? c.nameAr : c.nameEn}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {gallery.length > 1 && (
        <section className="title-section" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading">{t("title.gallery")}</h2>
          {/* Prose containing a number, not a data field: it reads
              "8 ملصقات" in Arabic. R21 again, third instance. */}
          <p className="section-lede section-count">
            {t("title.galleryCount", { n: gallery.length })}
          </p>
          <Gallery posters={gallery} title={target.titleEn} />
        </section>
      )}

      <WhereToWatch providers={providersGlobalOf(target.id)} />

      <h2 id="order-heading">{t("path.orderHeading")}</h2>
      {/* Bidi-isolated: an unisolated "34 titles · 75h 26m" in an RTL paragraph
          reorders to "titles · 75h 26m 34", because the leading number is a
          weak-direction run pulled to the paragraph's start edge. */}
      <p>
        <bdi>
          {t("path.titleCount", { n: minimum.length })} · {totalRuntime(minimum, msg)}
        </bdi>
      </p>

      {minimum.length === 1 && (
        <p>{t("path.nothingFirst")}</p>
      )}

      <Thread>
        {minimum.map((item, i) => (
          <Row
            key={item.id}
            t={item}
            n={i + 1}
            target={i === minimum.length - 1}
            locale={locale}
            m={msg}
          />
        ))}
      </Thread>

      {recommended.length > 0 && (
        <>
          <h2>{t("path.recommendedHeading")}</h2>
          {/* The MARGINAL cost is the headline, because that is the number a
              user actually decides on. The grand total is secondary. */}
          <p>
            <bdi>
              {t("path.moreCount", { n: recommended.length })} ·{" "}
              {totalRuntime(recommended, msg)}
            </bdi>{" "}
            {t("path.notRequired")}
          </p>
          <p>
            <bdi>
              {t("path.fullExperience", {
                n: full.length,
                runtime: totalRuntime(full, msg),
              })}
            </bdi>
          </p>

          {/* Never a flat list. One recommendation can cost a hundred hours and
              another can cost nothing, and a bullet each makes them look equal.

              The class is load-bearing for the tests: R13 used to find its
              subject by scanning every <li> on the page, which worked until the
              editor's note grew a list of the titles it mentions and one of
              those chips started matching first. */}
          <ul className="rec-list">
            {recommendations.map(({ rec, via, cost }) => (
              <li key={rec.id}>
                <Link href={`/${locale}/path/${rec.id}`}>
                  <bdi lang="en">{rec.titleEn}</bdi>
                </Link>{" "}
                {/* Same bidi isolation as the thread panels — a `dir` here would
                    flip start/end for this element and break in the AR locale. */}
                <bdi lang="ar">{rec.titleAr}</bdi> · {rec.releaseDate.slice(0, 4)} ·{" "}
                {rec.universe}
                {seasonLabel(rec, msg) && ` · ${seasonLabel(rec, msg)}`}
                {rec.optional && ` · ${t("title.optional")}`}
                {via.id !== target.id && <> · {t("path.suggestedBy", { title: via.titleEn })}</>}
                {cost.length > 0 && (
                  <p>
                    {/* Runtime leads. "1 title" for Agents of S.H.I.E.L.D. reads
                        cheaper than "2 titles" for the Blade films while costing
                        about 25× the hours — the count is the wrong headline. */}
                    ↳{" "}
                    {t("path.needsFirst", {
                      list: cost
                        .map((c) => {
                          const s = seasonLabel(c, msg);
                          return s ? `${c.titleEn} (${s})` : c.titleEn;
                        })
                        .join("، ".trim() === "" ? ", " : ", "),
                      cost: formatCost(cost, msg),
                    })}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
