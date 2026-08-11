import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeParams } from "@/lib/locales";
import { titles, posterOf, ratingsOf, genresOf , episodesOf } from "@/content/build";
import { releaseOrder } from "@/lib/graph";
import { formatRuntimeIntl } from "@/lib/runtime";
import { uiMessages } from "@/lib/ui-messages";
import { ProjectBrowser, type ProjectCard } from "@/app/components/project-browser";
import { ArrowIcon } from "@/app/components/icons";

/**
 * EVERY PROJECT, in release order, with four ways to cut it down.
 *
 * This route was `/universes`, and that was the wrong noun for a top-level
 * item: someone clicking it wants the things, not the seven buckets they sort
 * into. The buckets still explain something, on the rights page and on each
 * title, which is where they belong.
 *
 * CATEGORY IS NOT UNIVERSE, and the two are deliberately different fields. A
 * universe is who held the rights. A category is how someone thinks about what
 * they are about to watch, and those diverge: the Spider-Verse is three eras
 * under one studio, Fox held the X-Men and the Fantastic Four as two entirely
 * separate things, and "animated" cuts across every one of them.
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
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("metaTitle"), description: t("metaDescription", { n: titles.length }) };
}

/** The reader-facing grouping, derived rather than authored on every title. */
function categoryOf(t: { id: string; universe: string; type: string }): string {
  if (t.type === "animation") return "animated";
  if (t.universe === "sony") return "spider-verse";
  if (t.universe === "fox") {
    return t.id.startsWith("fantastic-four") ? "fantastic-four" : "x-men";
  }
  return t.universe;
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const msg = uiMessages(t);

  const index: ProjectCard[] = releaseOrder(titles).map((x) => ({
    id: x.id,
    titleEn: x.titleEn,
    titleAr: x.titleAr,
    year: x.releaseDate.slice(0, 4),
    universe: x.universe,
    category: categoryOf(x),
    type: x.type,
    episodic: episodesOf(x.id).length > 0,
    genres: genresOf(x.id),
    score: ratingsOf(x.id).imdb?.score ?? null,
    poster: posterOf(x.id),
    runtime: x.runtimeMin !== null ? formatRuntimeIntl(x.runtimeMin, msg) : null,
  }));

  return (
    <main className="projects-page">
      <header className="page-head">
        <h1>{t("projects.heading")}</h1>
        <p className="page-lede">{t("projects.lede")}</p>
        {/**
         * EVERY PROJECT ON ONE TIMELINE, from the page that holds every
         * project.
         *
         * This is the `all` collection, and it is reached from here rather than
         * from the universes index on purpose: "show me all of this on a
         * timeline" is a question you ask while looking at all of it, not while
         * choosing between universes. It is the same four pages every other
         * collection has — two orders, two views — behind one button.
         */}
        <p className="page-actions">
          <Link className="cta" href={`/${locale}/universes/all/release/timeline`}>
            {t("projects.timelineCta")}
            <ArrowIcon />
          </Link>
        </p>
      </header>
      <ProjectBrowser index={index} locale={locale} />
    </main>
  );
}
