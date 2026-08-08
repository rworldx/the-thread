import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeParams } from "@/lib/locales";
import { shownCharacters } from "@/lib/characters";
import { CharacterBrowser } from "@/app/components/character-browser";

/**
 * THE SPIDER-VERSE CHIP IS THE RIGHTS TAG, and nothing cleverer.
 *
 * Two wider rules were tried and both over-reached. Sweeping in every MCU
 * Spider-Man film dragged in Iron Man, Doctor Strange and half the Avengers.
 * Sweeping in the Sony COLLECTION was better but still wrong by six — Echo,
 * Vulture, Wiccan and Werewolf by Night arrived because they happen to appear
 * in a title Sony holds, which is a fact about a film, not about them.
 *
 * So membership is the `sony` universe tag: who Sony actually owns. Anyone who
 * belongs and is missing gets the tag on their record, where it is a stated
 * fact somebody chose, rather than a side effect of a rule nobody can predict.
 */

/**
 * THE CHARACTER GRID — a fourth door into the same content.
 *
 * Orders, universes, characters, search and rights are peers, not one primary
 * and four secondaries. Every one of them ends at the same place: a title, and
 * what to watch before it.
 *
 * The filtering and the search are client-side over an index passed down from
 * here. 84 records is nothing to ship and it means a chip is instant, with no
 * navigation and no request.
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
  const t = await getTranslations({ locale, namespace: "characters" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { n: shownCharacters.length }),
  };
}

export default async function CharactersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("characters");
  const ar = locale === "ar";

  /** Only what the grid renders. Origins and relations stay off this page. */
  const index = shownCharacters.map((c) => ({
    id: c.id,
    name: ar ? c.nameAr : c.nameEn,
    nameEn: c.nameEn,
    aliases: c.aliases,
    image: c.image,
    category: c.category,
    affiliation: c.affiliation,
    species: c.species,
    mutantClass: c.mutantClass,
    universe: c.universe,
    appearances: c.appearances.length,
    /**
     * WHO PLAYED THEM, because that is how people ask.
     *
     * Nobody searching for the Raimi films types "Spider-Man". They type
     * "Tobey" — and the three live-action Peters are only ever distinguished
     * by actor, never by name, since all three are Peter Parker. Same for
     * Wolverine and "Jackman", Iron Man and "Downey".
     *
     * Distinct actors only. Spider-Man has 24 appearances and 10 performers;
     * shipping one entry per credit would put "Tom Holland" in the string
     * seven times for no gain.
     */
    actors: [...new Set(c.portrayals.map((p) => p.actor))],
    /**
     * The OTHER half, for the three performance records. `image` on those is
     * the actor; this is the character they are a performance of, so the grid
     * can show the same split frame the character page does. Null everywhere
     * else, which is what makes the split an exception rather than a mode.
     */
    spiderVerse: c.universe.includes("sony"),
  }));

  return (
    <main className="characters-page">
      <header className="page-head">
        <h1>{t("heading")}</h1>
        <p className="page-lede">{t("lede")}</p>
      </header>
      {/**
       * SUSPENSE, because the browser below reads `useSearchParams`.
       *
       * The filters live in the URL so the back button restores them, and
       * reading the query string forces this subtree out of the static prerender
       * — Next fails the build rather than silently shipping a client-only page.
       * The boundary is the answer: everything above it stays static HTML, and
       * only the grid waits for the URL.
       *
       * The fallback is deliberately nothing. The grid renders on the first
       * client frame, and a skeleton that flashes for one frame is worse than
       * no skeleton at all.
       */}
        <CharacterBrowser index={index} locale={locale} />
    </main>
  );
}
