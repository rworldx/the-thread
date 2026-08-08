"use client";

import { useMemo } from "react";
import { useUrlState } from "@/lib/use-url-state";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { normalise, squash } from "@/lib/search";
import { Avatar } from "@/app/components/avatar";
import type { MutantClass } from "@/content/character-schema";

/**
 * The grid, its chips and its search, in one client leaf.
 *
 * 84 records is small enough to filter in the browser, which means a chip is
 * instant with no navigation and no request. It also means the filter can be
 * choreographed rather than abrupt: the grid keeps its scroll position and the
 * cells that survive stay put, because they are keyed by id.
 *
 * The search reuses `normalise` from the title search, so Arabic behaves the
 * same way in both places: diacritics stripped, hamza and ta-marbuta folded. A
 * reader typing "وولفرين" and one typing "Logan" both land on Wolverine,
 * because aliases are part of the haystack.
 */

export interface CharacterCard {
  id: string;
  name: string;
  nameEn: string;
  aliases: string[];
  image: string | null;
  category: string;
  affiliation: string[];
  species: string | null;
  mutantClass: MutantClass | null;
  universe: string[];
  /** Distinct performers, so "Tobey" and "Jackman" are searchable terms. */
  actors: string[];
  /** Appears in a Sony Spider-Verse title or an MCU Spider-Man film. */
  spiderVerse: boolean;
  appearances: number;
}

/**
 * THIRTY CHIPS, IN THREE GROUPS — because thirty in one row is a wall.
 *
 * The list grew from nine to thirty on request, and a flat run of thirty
 * identical pills is not a filter, it is a search problem with buttons. They
 * split along the three questions a reader is actually asking, and the group
 * label says which question each row answers:
 *
 *   ROLE     which side are they on
 *   TEAM     who do they stand next to
 *   KIND     what ARE they
 *
 * EVERY CHIP IS DERIVED FROM A FIELD, never from a hand-listed set of ids. A
 * chip that names its members is a second source of truth for membership, and
 * it goes stale the moment a character is added — which is exactly what
 * happened to the affiliations these read from, twice, in one afternoon. The
 * cost of the rule is that adding a team means adding an affiliation to the
 * corpus. That is the right place for it.
 *
 * `mutant` reads SPECIES, not `mutantClass`. It used to read the class, which
 * silently excluded every mutant Marvel has never published a rank for — the
 * chip said 13 when the corpus held 38.
 */
type Rule = (c: CharacterCard) => boolean;
const aff = (name: string): Rule => (c) => c.affiliation.includes(name);
const is = (...names: string[]): Rule => (c) => c.species !== null && names.includes(c.species);

const GROUPS: { group: string; chips: { id: string; match: Rule }[] }[] = [
  {
    group: "role",
    chips: [
      { id: "all", match: () => true },
      { id: "hero", match: (c) => c.category === "hero" },
      { id: "villain", match: (c) => c.category === "villain" },
      { id: "antihero", match: (c) => c.category === "antihero" },
      { id: "antivillain", match: (c) => c.category === "antivillain" },
    ],
  },
  {
    group: "team",
    chips: [
      { id: "avengers", match: aff("Avengers") },
      { id: "x-men", match: aff("X-Men") },
      { id: "x-force", match: aff("X-Force") },
      { id: "guardians", match: aff("Guardians of the Galaxy") },
      { id: "defenders", match: aff("Defenders") },
      { id: "fantastic-four", match: aff("Fantastic Four") },
      { id: "thunderbolts", match: aff("Thunderbolts") },
      { id: "young-avengers", match: aff("Young Avengers") },
      { id: "midnight-sons", match: aff("Midnight Sons") },
      { id: "revengers", match: aff("Revengers") },
      { id: "team-cap", match: aff("Team Captain America") },
      { id: "team-iron-man", match: aff("Team Iron Man") },
      { id: "wakandan", match: aff("Wakandan heroes") },
      /* Three groupings a reader asks for by name and the data already holds:
         who works for S.H.I.E.L.D., every Loki, and the Spider-Society. */
      { id: "agents", match: aff("S.H.I.E.L.D.") },
      { id: "loki-variants", match: aff("Loki variants") },
      { id: "spider-society", match: aff("Spider-Society") },
      /* Computed from appearances upstream — see the note in the page. A
         rights tag put Kingpin and Ned Leeds outside a category they are
         obviously in. */
      { id: "spider-verse", match: (c) => c.spiderVerse },
    ],
  },
  {
    group: "kind",
    chips: [
      { id: "mutant", match: is("Mutant", "Mutant hybrid") },
      { id: "inhuman", match: is("Inhuman") },
      { id: "eternal", match: is("Eternal") },
      { id: "celestial", match: is("Celestial") },
      /* HOSTS COUNT. A separate "Venom family" chip was a duplicate of this
         one, and the only thing it added was people this chip was missing by
         reading species alone — Agent Venom carrying the Venom symbiote is a
         symbiote answer to "show me the symbiotes". */
      { id: "symbiote", match: is("Symbiote", "Symbiote god", "Symbiote host") },
      { id: "hulks", match: aff("Hulks") },
      {
        id: "asgardian",
        /* Species OR affiliation. Throg is a frog with a splinter of Mjolnir
           and Alligator Loki is an alligator in horns — both of Asgard, and
           neither has an Asgardian body. Belonging is the question here. */
        match: (c) => is("Asgardian", "Frost Giant")(c) || aff("Asgard")(c),
      },
      { id: "god", match: (c) => aff("Gods")(c) || is("Olympian")(c) },
      { id: "super-soldier", match: is("Enhanced human") },
      {
        id: "magician",
        /* "Magic" is an affiliation because magic is a ROLE here, not a
           species. Wanda is an Enhanced human, Loki and Sylvie are Frost
           Giants, and no species rule reaches all three — which is how the
           three most obvious magic users in the MCU were missing from a chip
           called Magicians. */
        match: (c) =>
          aff("Magic")(c) ||
          aff("Masters of the Mystic Arts")(c) ||
          is("Witch", "Demon", "Human avatar")(c),
      },
      {
        id: "cosmic",
        match: (c) => is("Abstract entity", "Cosmic entity", "Watcher")(c) || aff("Cosmic entities")(c),
      },
    ],
  },
];

const CHIPS = GROUPS.flatMap((g) => g.chips);

/** Module-level, so the hook's mount effect runs once per mount. */
const CHAR_DEFAULTS: { chip: string; q: string; sort: string } = {
  chip: "all",
  q: "",
  sort: "fame",
};

export function CharacterBrowser({
  index,
  locale,
}: {
  index: CharacterCard[];
  locale: string;
}) {
  const t = useTranslations("characters");
  /* In the URL, so back restores it. See `lib/use-url-state.ts`. */
  const [{ chip, q: query, sort }, set] = useUrlState(CHAR_DEFAULTS);
  const setChip = (v: string) => set({ chip: v });
  const setQuery = (v: string) => set({ q: v });
  const setSort = (v: string) => set({ sort: v });

  /**
   * NAMES, AND ALSO WHAT SOMEBODY IS.
   *
   * The haystack was names and aliases only, so "agent" found Phil Coulson —
   * whose alias is literally "Agent Coulson" — and missed Black Widow, Hawkeye
   * and Maria Hill, who are the actual S.H.I.E.L.D. agents. A search that
   * answers a question about a NAME when the reader asked about a ROLE is
   * answering the wrong question.
   *
   * Affiliation, species and role join the index, so "shield", "asgardian",
   * "mutant", "villain" and "avengers" all work now.
   *
   * SYNONYMS, because the corpus stores the organisation and readers type the
   * job. Nobody searches "S.H.I.E.L.D." — they search "agent". The map is
   * deliberately tiny: it exists for the handful of cases where the word people
   * use is not the word the data holds, not as a place to bolt on keywords.
   */
  const haystack = useMemo(() => {
    /**
     * SEARCHABLE, BUT NOT AN ALIAS — and the difference matters here.
     *
     * "MJ" belongs to two people. It is Michelle Jones's actual alias in the
     * MCU, where the credit reads "MJ", and it is what everybody has called
     * Mary Jane Watson since 1966. A reader typing it means "show me both".
     *
     * But `aliases` is not a search field. It is the join key the appearance
     * matcher runs on, so putting "MJ" on Mary Jane would credit her in every
     * MCU film that credits Michelle — the Falcon bug the C18 guard exists to
     * catch. So the term lives HERE, in the haystack only: it finds her, and
     * it cannot put her in a film she is not in.
     *
     * Keep this map tiny. It is for names people use that the corpus cannot
     * safely hold, not a keyword bag.
     */
    const ALSO_FIND: Record<string, string> = { "mary-jane-watson": "mj" };
    const SYNONYMS: Record<string, string> = {
      "S.H.I.E.L.D.": "agent agents shield",
      "Masters of the Mystic Arts": "sorcerer wizard magic",
      Magic: "sorcerer wizard witch",
      Asgard: "asgardian god",
      Gods: "god goddess",
      Hulks: "gamma",
      Inhumans: "inhuman",
      Eternals: "eternal",
      Symbiotes: "symbiote",
      Celestials: "celestial",
      "Cosmic entities": "cosmic abstract entity",
    };
    return new Map(
      index.map((c) => [
        c.id,
        normalise(
          [
            c.name,
            c.nameEn,
            ...c.aliases,
            ...c.affiliation,
            ...c.affiliation.map((a) => SYNONYMS[a] ?? ""),
            c.species ?? "",
            c.category,
            ...c.actors,
            ALSO_FIND[c.id] ?? "",
            /* Squashed too, so "spiderman" and "msmarvel" both land. */
            squash(c.name),
            squash(c.nameEn),
          ].join(" "),
        ),
      ]),
    );
  }, [index]);

  const shown = useMemo(() => {
    /* `CHIPS` is built by flatMap, so its element type is no longer a tuple
       and `CHIPS[0]` is `T | undefined`. The fallback is "no filter", which is
       what "all" means, rather than a non-null assertion. */
    const rule = CHIPS.find((x) => x.id === chip)?.match ?? (() => true);
    const q = normalise(query);
    const kept = index.filter(
      (c) => rule(c) && (q === "" || (haystack.get(c.id) ?? "").includes(q) ||
        (haystack.get(c.id) ?? "").includes(squash(query))),
    );
    if (sort === "fame") return kept;
    return [...kept].sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [index, chip, query, haystack, sort, locale]);

  return (
    <>
      <div className="char-controls">
        {/* A real label, above its input. Never a placeholder doing that job. */}
        <label className="char-search">
          <span className="char-search-label">{t("searchLabel")}</span>
          <input
            type="search"
            className="search-input"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>

        {/* Two states, so a segmented control rather than a select: both
            options are visible and switching is one tap, not three. */}
        <div className="char-sort" role="radiogroup" aria-label={t("sortLabel")}>
          {(["fame", "az"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={sort === mode}
              className="chip"
              onClick={() => setSort(mode)}
            >
              {t(`sort.${mode}`)}
            </button>
          ))}
        </div>

        {/**
         * ONE radiogroup across all three rows, not three.
         *
         * Visually these are three labelled bands, but they are still a single
         * choice — picking Avengers unpicks Heroes. Three radiogroups would
         * tell a screen reader there are three independent choices here, which
         * is not what the filter does. The band labels are `presentation`
         * headings inside the one group.
         */}
        <div className="char-chips" role="radiogroup" aria-label={t("heading")}>
          {GROUPS.map((g) => (
            <div key={g.group} className="chip-band">
              <span className="chip-band-label" aria-hidden="true">
                {t(`chipGroup.${g.group}`)}
              </span>
              <div className="chip-band-row">
                {g.chips.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={chip === c.id}
                    className="chip"
                    onClick={() => setChip(c.id)}
                  >
                    {t(`chip.${c.id}`)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="char-count tabular" role="status" aria-live="polite">
          {t("count", { n: shown.length })}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="char-empty">{t("empty", { query })}</p>
      ) : (
        <ul className="char-grid" role="list">
          {shown.map((c) => (
            <li key={c.id}>
              <Link className="char-tile" href={`/${locale}/characters/${c.id}`}>
                <Avatar src={c.image} name={c.name} />
                <span className="char-tile-body">
                  <span className="char-tile-name">{c.name}</span>
                  <span className="char-tile-meta tabular">{c.appearances}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
