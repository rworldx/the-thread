import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LOCALES } from "@/lib/locales";
import { allCharacters, characterOf } from "@/lib/characters";
import { titles, posterOf } from "@/content/build";
import { Poster } from "@/app/components/poster";
import { Avatar } from "@/app/components/avatar";
import { Portrait } from "@/app/components/portrait";
import { Collapsible } from "@/app/components/collapsible";
import { ArrowIcon } from "@/app/components/icons";
import { BackLink } from "@/app/components/back-link";
import type { RelationKind } from "@/content/character-schema";

/**
 * ONE CHARACTER.
 *
 * The comparison worth holding while reading this: it is a photographer page,
 * not a database record. Portrait, name, and then a body of work presented as
 * images. If it reads like a row in a table, it is wrong.
 *
 * The appearances list is where the multiverse becomes visible, because it
 * carries WHO PLAYED THEM in each title. Three Peter Parkers and two Wolverines
 * stop being trivia and become something you can see.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allCharacters.map((c) => ({ locale, id: c.id })),
  );
}

type Params = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale, id } = await params;
  const c = characterOf(id);
  if (!c) return { title: "Not found" };
  const ar = locale === "ar";
  return {
    title: ar ? c.nameAr : c.nameEn,
    description: ar ? c.origin.ar : c.origin.en,
  };
}

/**
 * `host` sits beside `variant` because they answer the same question — "is this
 * the same being as that one?" — with opposite answers, and a reader looking at
 * Jean Grey needs the Phoenix Force near the top, not below her team-mates.
 */
const KIND_ORDER: RelationKind[] = ["variant", "host", "ally", "enemy", "family", "team"];

/**
 * next-intl reads `.` as a namespace separator, so "S.H.I.E.L.D." cannot be a
 * key. Slugified, and the English value stays the source of truth in the
 * corpus: a value with no entry fails the build loudly rather than rendering
 * raw English on an Arabic page.
 */
const slug = (x: string) =>
  x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function CharacterPage({ params }: Params) {
  const { locale, id } = await params;
  const c = characterOf(id);
  if (!c) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const ar = locale === "ar";

  const byId = new Map(titles.map((x) => [x.id, x]));
  /** Who played them, per title. Several entries for one title is the point. */
  const playedIn = new Map<string, string[]>();
  for (const p of c.portrayals) {
    playedIn.set(p.titleId, [...(playedIn.get(p.titleId) ?? []), p.actor]);
  }

  /** Slash forms are join keys, not names. So is the character's own name. */
  const displayAliases = c.aliases.filter(
    (a) => !a.includes("/") && a !== c.nameEn,
  );

  /**
   * Distinct actors, most credits first. Deduplicated because one credit can
   * name the character twice ("Peter Parker / Spider-Man") and because a run of
   * films is one performance, not eight.
   */
  const faces = [...
    c.portrayals.reduce((acc, p) => {
      const prev = acc.get(p.actor);
      acc.set(p.actor, {
        actor: p.actor,
        photo: prev?.photo ?? p.actorPhoto,
        count: (prev?.count ?? 0) + 1,
      });
      return acc;
    }, new Map<string, { actor: string; photo: string | null; count: number }>()).values(),
  ].sort((a, b) => b.count - a.count);

  const grouped = KIND_ORDER.map((kind) => ({
    kind,
    items: c.related
      .filter((r) => r.kind === kind)
      .map((r) => characterOf(r.id))
      .filter((x): x is NonNullable<typeof x> => Boolean(x)),
  })).filter((g) => g.items.length > 0);

  return (
    <main className="character-page">
      <p className="back-link">
        <BackLink href={`/${locale}/characters`}>
          <ArrowIcon back /> {t("characters.backToAll")}
        </BackLink>
      </p>

      <header className="char-hero">
        {/* The ONE priority image on this page, and it is the CHARACTER. */}
        <Avatar src={c.image} name={ar ? c.nameAr : c.nameEn} priority />

        <div className="char-hero-body">
          <h1>{ar ? c.nameAr : c.nameEn}</h1>
          <p className="char-hero-alt">
            <bdi lang={ar ? "en" : "ar"}>{ar ? c.nameEn : c.nameAr}</bdi>
          </p>

          <dl className="char-facts">
            {/* Species and affiliation are a FINITE set, so they go through a
                lookup rather than rendering raw English on an Arabic page. The
                key is the English value, which keeps the corpus readable and
                means a new value fails I2 loudly instead of leaking. */}
            {/**
             * THE ROLE, which this page did not print at all.
             *
             * `category` is on every record and was rendering nowhere — the
             * corpus knew a character was an anti-villain and the page could
             * not say so. It goes first because "is this a hero" is the
             * question a reader has before "what species is this".
             */}
            <div>
              <dt>{t("characters.role")}</dt>
              <dd>{t(`characters.category_.${c.category}`)}</dd>
            </div>
            {c.species && (
              <div>
                <dt>{t("characters.species")}</dt>
                <dd>{t(`characters.species_.${slug(c.species)}`)}</dd>
              </div>
            )}
            {c.affiliation.length > 0 && (
              <div>
                <dt>{t("characters.affiliation")}</dt>
                <dd>
                  {c.affiliation
                    .map((a) => t(`characters.affiliation_.${slug(a)}`))
                    .join(ar ? "، " : ", ")}
                </dd>
              </div>
            )}
            {/* DISPLAY aliases only. The list doubles as the join key against
                TMDB credits, so it holds slash forms like
                "Peter Parker / Spider-Man" that exist to match a credit string
                and read as machinery on a page. */}
            {displayAliases.length > 0 && (
              <div>
                <dt>{t("characters.aliases")}</dt>
                <dd>
                  <bdi lang="en">{displayAliases.slice(0, 4).join(", ")}</bdi>
                </dd>
              </div>
            )}
          </dl>

          {/* The rank, and only for someone who has one. It is the published
              in-universe classification, which the note says out loud so it
              does not read as a power score invented for this site. */}
          {c.mutantClass && (
            <p className="mutant-badge" data-class={c.mutantClass}>
              <span className="mutant-badge-label">{t("characters.mutantClass")}</span>
              <strong>{c.mutantClass}</strong>
            </p>
          )}
          {/* The same treatment for symbiotes, and for the same reason: it is
              Marvel's own classification of how one came to exist, not a power
              score. Translated rather than printed raw — unlike the mutant
              ranks, these are words rather than Greek letters. */}
          {c.symbioteClass && (
            <p className="mutant-badge" data-class={c.symbioteClass}>
              <span className="mutant-badge-label">
                {t("characters.symbioteClass")}
              </span>
              <strong>{t(`characters.symbioteClass_.${c.symbioteClass}`)}</strong>
            </p>
          )}
        </div>
      </header>

      <section className="char-section" aria-labelledby="powers-heading">
        <h2 id="powers-heading">{t("characters.powers")}</h2>
        <ul className="power-chips" role="list">
          {c.powers.map((p) => (
            <li key={p.en} className="power-chip">
              {ar ? p.ar : p.en}
            </li>
          ))}
        </ul>
      </section>

      <section className="char-section" aria-labelledby="origin-heading">
        <h2 id="origin-heading">{t("characters.origin")}</h2>
        <p className="char-origin">{ar ? c.origin.ar : c.origin.en}</p>
      </section>

      <section className="char-section" aria-labelledby="appears-heading">
        <h2 id="appears-heading">{t("characters.appearsIn")}</h2>
        {/**
         * NOT YET ON SCREEN is an answer, and an empty list is not.
         *
         * Twenty-one of these people have never been credited in any of the
         * 167 titles here — Eternity, the Living Tribunal, Mister Sinister,
         * the Beyonder. They have pages because a reader looking one up
         * deserves better than "no results", and this is the line that makes
         * the page honest rather than broken-looking: the count is zero
         * because they have not been cast, not because the data is missing.
         */}
        {c.appearances.length === 0 ? (
          <p className="char-offscreen">{t("characters.notOnScreen", { n: titles.length })}</p>
        ) : (
          <p className="char-count tabular">
            {t("characters.appearanceCount", { n: c.appearances.length })}
          </p>
        )}
        {/* An ORDERED list, because release order is the information. Ten
            shown, the rest behind a disclosure — the same rule the cast and the
            trailers follow, and Iron Man is in twenty-eight. */}
        <Collapsible
          hidden={c.appearances.length - 10}
          label={t("title.showMore", { n: c.appearances.length - 10 })}
        >
        <ol className="appearance-grid" role="list">
          {c.appearances.map((titleId) => {
            const title = byId.get(titleId);
            if (!title) return null;
            const actors = playedIn.get(titleId) ?? [];
            return (
              <li key={titleId}>
                <Link href={`/${locale}/path/${titleId}`} className="appearance">
                  <Poster
                    title={title}
                    posterPath={posterOf(titleId)}
                    size="grid"
                    locale={locale}
                  />
                  <span className="appearance-title">
                    <bdi lang="en">{title.titleEn}</bdi>
                  </span>
                  <span className="appearance-year tabular">
                    {title.releaseDate.slice(0, 4)}
                  </span>
                  {/* Several actors for one title is a variant, and it is the
                      reason this page exists rather than a list of titles. */}
                  {actors.map((a) => (
                    <span key={a} className="appearance-actor">
                      {t("characters.playedBy", { actor: a })}
                    </span>
                  ))}
                </Link>
              </li>
            );
          })}
        </ol>
        </Collapsible>
        <p className="char-note">{t("characters.artNote")}</p>
      </section>

      {/* THE OTHER PICTURES OF THIS CHARACTER.
          Not more artwork: the FACES. Every distinct actor who has played them,
          with the title where. For Spider-Man that is three men; for Wolverine
          it is a voice actor and Hugh Jackman. A single avatar cannot say that,
          and it is the most interesting thing on the page. */}
      {faces.length > 1 && (
        <section className="char-section" aria-labelledby="faces-heading">
          <h2 id="faces-heading">{t("characters.playedByHeading")}</h2>
          <ul className="portrayal-grid" role="list">
            {faces.map((f) => (
              <li key={f.actor}>
                <Portrait src={f.photo} alt="" />
                <span className="portrayal-actor">{f.actor}</span>
                <span className="portrayal-count tabular">
                  {t("characters.appearanceCount", { n: f.count })}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {grouped.length > 0 && (
        <section className="char-section" aria-labelledby="related-heading">
          <h2 id="related-heading">{t("characters.related")}</h2>
          {grouped.map((g) => (
            <div key={g.kind} className="relation-group">
              <h3>{t(`characters.kind.${g.kind}`)}</h3>
              <ul className="relation-list" role="list">
                {g.items.map((r) => (
                  <li key={r.id}>
                    <Link href={`/${locale}/characters/${r.id}`} className="relation">
                      <Avatar src={r.image} name={ar ? r.nameAr : r.nameEn} />
                      <span>{ar ? r.nameAr : r.nameEn}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
