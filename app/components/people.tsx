import Image from "next/image";
import { remoteSrc } from "@/image-loader";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { allCharacters } from "@/lib/characters";

/**
 * THE TWO PEOPLE, and which is which.
 *
 * A studio is not a building. Stan Lee co-created most of what is on this site
 * and is the larger image because he is the larger claim; Kevin Feige has run
 * the films since 2007 and is the reason they connect at all.
 *
 * The photographs come from TMDB's person records, which the site already
 * hotlinks for the cast, so this adds no host and no key.
 *
 * FULL RESOLUTION, for these two only. Everywhere else the site takes the
 * smallest source that covers the render — that is the whole poster strategy.
 * Here the images render at up to 19rem on a 2× screen, which is 608 device
 * pixels, and w342 was being upscaled: soft, and visibly so, on the two faces
 * the page is about. `original` is TWO requests on ONE page, and it is the
 * difference between a portrait and a thumbnail.
 */

const TMDB = "https://image.tmdb.org/t/p";

/**
 * TMDB profile paths, FETCHED not guessed.
 *
 * The first version of this file carried two paths I had written from memory,
 * and both 404'd. They looked exactly like real TMDB hashes, the page rendered,
 * and the only thing that caught it was requesting the URLs. These two came
 * back from `/search/person`: Stan Lee is person 7624, Kevin Feige is 10850.
 * Both are now checked on every run of `npm run verify:assets`.
 */
const PEOPLE = [
  {
    id: "stan-lee",
    photo: "/kKeyWoFtTqOPsbmwylNHmuB3En9.jpg",
    lead: true,
    /**
     * THE CHARACTERS, AS LINKS, and the ids are checked against the corpus
     * below rather than trusted.
     *
     * "Best known for" was a comma-separated sentence, which is the one place
     * on this site where a character's name appears and does not take you to
     * that character. These are the co-creations the corpus actually holds; a
     * name with no record simply does not render, so this cannot rot into a
     * list of links to 404s.
     */
    creations: [
      "spider-man",
      "iron-man",
      "thor",
      "hulk",
      "black-panther",
      "doctor-strange",
      "professor-x",
      "magneto",
      "mister-fantastic",
      "daredevil",
    ],
  },
  { id: "kevin-feige", photo: "/vbCNOAGNqox21Q462rY4w2WL9Eo.jpg", lead: false, creations: [] },
] as const;

export async function People({ locale }: { locale: string }) {
  const t = await getTranslations("people");
  const byId = new Map(allCharacters.map((c) => [c.id, c]));
  const ar = locale === "ar";

  return (
    <section className="people" aria-labelledby="people-heading">
      <h2 id="people-heading">{t("heading")}</h2>
      <ul className="people-list" role="list">
        {PEOPLE.map((p) => {
          const made = p.creations.map((id) => byId.get(id)).filter((c) => c !== undefined);
          return (
            <li key={p.id} data-lead={p.lead ? "true" : undefined}>
              <span className="person-photo">
                <Image
                  /* Never transformed — see `image-loader.ts`. `original` is
                     larger than this box ever needs, so the width is asked of
                     TMDB directly. */
                  src={remoteSrc(`${TMDB}/original${p.photo}`, 342)}
                  unoptimized
                  alt=""
                  width={600}
                  height={900}
                  sizes="(max-width: 48rem) 92vw, 304px"
                  loading="lazy"
                />
              </span>

              <div className="person-body">
                <span className="person-role">{t(`${p.id}.role`)}</span>
                <span className="person-name">{t(`${p.id}.name`)}</span>
                {/* The dates, set apart from the prose. For one of them the
                    second number is the fact the page has to state plainly. */}
                <span className="person-dates tabular">
                  <bdi>{t(`${p.id}.dates`)}</bdi>
                </span>
                <span className="person-line">{t(`${p.id}.line`)}</span>

                <p className="person-about">{t(`${p.id}.about`)}</p>

                {made.length > 0 && (
                  <div className="person-creations">
                    <h3>{t("createdLabel")}</h3>
                    {/* Chips, and every one of them goes somewhere. */}
                    <ul className="chip-row" role="list">
                      {made.map((c) => (
                        <li key={c.id}>
                          <Link className="chip" href={`/${locale}/characters/${c.id}`}>
                            {ar ? c.nameAr : c.nameEn}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="person-creations-note">{t(`${p.id}.created`)}</p>
                  </div>
                )}

                <dl className="person-facts">
                  <div>
                    <dt>{t(`${p.id}.extraLabel`)}</dt>
                    <dd>{t(`${p.id}.extra`)}</dd>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
