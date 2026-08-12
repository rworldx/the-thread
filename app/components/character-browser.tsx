"use client";

import { useMemo } from "react";
import { useUrlState } from "@/lib/use-url-state";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { normalise, squash } from "@/lib/search";
import { Avatar, SplitAvatar } from "@/app/components/avatar";
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
  symbioteClass: string | null;
  magicSchool: string | null;
  universe: string[];
  /** Distinct performers, so "Tobey" and "Jackman" are searchable terms. */
  actors: string[];
  /** Appears in a Sony Spider-Verse title or an MCU Spider-Man film. */
  spiderVerse: boolean;
  /** Set only on a PERFORMANCE record: the character it performs, and the
      actor's photo, so the two teams below can show a split avatar. */
  performerOf: string | null;
  /** The performed character's artwork. This record's own `image` is the
      actor, so the split takes its two halves from different places. */
  baseImage: string | null;
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

/**
 * A CHIP CAN HAVE A PARENT, and children only appear once the parent is on.
 *
 * "Mutant" is a useful answer and "Omega" is a better one, but showing both
 * at once puts thirty chips on a page whose whole job is narrowing. So the
 * level chips live under their parent and unfold when it is chosen: press
 * Mutant and the classes appear, press Symbiote and the four origins do.
 *
 * The parent chip stays selectable throughout, because "all mutants" is still
 * the most common thing anyone wants.
 */
/**
 * ORDER IS ROLE, THEN KIND, THEN TEAM, and that is a change.
 *
 * Team used to come second. But "what is this person" narrows harder and more
 * naturally than "whose side are they on" — a reader who wants mutants wants
 * mutants, while a reader who wants the Avengers usually already has a name in
 * mind and would search it. Kind also owns the child bands, so putting it
 * mid-page keeps the unfolding near the top rather than below fifty chips.
 */
const GROUPS: { group: string; chips: { id: string; match: Rule; parent?: string }[] }[] = [
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
    group: "kind",
    /**
     * ORDERED FROM WHAT PEOPLE LOOK FOR TO WHAT THEY STUMBLE ON.
     *
     * Mutants, humans and super-soldiers first because those are the three
     * questions a reader actually arrives with. Then the non-human peoples,
     * then the powers, then the tiers above the story. Celestials are NOT here
     * any more: they are a kind of cosmic entity, so they sit under it as a
     * child alongside Abstracts, Elders and Heralds, which is what Rashid
     * pointed out and what the corpus already believed.
     */
    chips: [
      { id: "mutant", match: is("Mutant", "Mutant hybrid") },
      { id: "mutant-omega", parent: "mutant", match: (c) => c.mutantClass === "omega" },
      { id: "mutant-alpha", parent: "mutant", match: (c) => c.mutantClass === "alpha" },
      { id: "mutant-beta", parent: "mutant", match: (c) => c.mutantClass === "beta" },
      { id: "mutant-gamma", parent: "mutant", match: (c) => c.mutantClass === "gamma" },
      {
        id: "human",
        match: (c) =>
          c.species === "Human" &&
          c.mutantClass === null &&
          !aff("Magic")(c) &&
          !aff("Masters of the Mystic Arts")(c),
      },
      { id: "super-soldier", match: is("Enhanced human") },
      { id: "hulks", match: aff("Hulks") },
      { id: "inhuman", match: (c) => is("Inhuman")(c) || aff("Inhumans")(c) },
      { id: "eternal", match: is("Eternal") },
      {
        id: "asgardian",
        /* Species OR affiliation. Throg is a frog with a splinter of Mjolnir
           and Alligator Loki is an alligator in horns — both of Asgard, and
           neither has an Asgardian body. Belonging is the question here. */
        match: (c) => is("Asgardian", "Frost Giant")(c) || aff("Asgard")(c),
      },
      { id: "kree", match: (c) => is("Kree")(c) || aff("Kree")(c) },
      { id: "skrull", match: (c) => is("Skrull")(c) || aff("Skrull")(c) },
      { id: "shiar", match: (c) => is("Shi'ar", "Strontian")(c) || aff("Shi'ar")(c) },
      { id: "clandestine", match: aff("ClanDestine") },
      /* HOSTS COUNT. A separate "Venom family" chip was a duplicate of this
         one, and the only thing it added was people this chip was missing by
         reading species alone — Agent Venom carrying the Venom symbiote is a
         symbiote answer to "show me the symbiotes". */
      { id: "symbiote", match: is("Symbiote", "Symbiote god", "Symbiote host") },
      { id: "symbiote-lineage", parent: "symbiote", match: (c) => c.symbioteClass === "lineage" },
      { id: "symbiote-spawn", parent: "symbiote", match: (c) => c.symbioteClass === "spawn" },
      { id: "symbiote-anomaly", parent: "symbiote", match: (c) => c.symbioteClass === "anomaly" },
      { id: "symbiote-ancient", parent: "symbiote", match: (c) => c.symbioteClass === "ancient" },
      {
        id: "magician",
        /* "Magic" is an affiliation because magic is a ROLE here, not a
           species. Wanda is an Enhanced human, Loki and Sylvie are Frost
           Giants, and no species rule reaches all three. */
        match: (c) =>
          aff("Magic")(c) ||
          aff("Masters of the Mystic Arts")(c) ||
          is("Witch", "Demon", "Human avatar")(c),
      },
      /**
       * BY WHAT THEY PRACTISE, not by what they are.
       *
       * These were Sorcerers / Elder Gods / Demons, which sorts magic users by
       * SPECIES and puts Loki and Agatha in the same "neither" bucket while
       * separating Strange from Mordo, who draw on the identical source.
       * Reading `magicSchool` asks the question a reader means.
       */
      { id: "magic-eldritch", parent: "magician", match: (c) => c.magicSchool === "eldritch" },
      { id: "magic-asgardian", parent: "magician", match: (c) => c.magicSchool === "asgardian" },
      { id: "magic-chaos", parent: "magician", match: (c) => c.magicSchool === "chaos" },
      { id: "magic-dark", parent: "magician", match: (c) => c.magicSchool === "dark" },
      { id: "magic-elder", parent: "magician", match: (c) => c.magicSchool === "elder" },
      { id: "magic-green", parent: "magician", match: (c) => c.magicSchool === "green" },
      { id: "god", match: (c) => aff("Gods")(c) || is("Olympian")(c) },
      {
        id: "cosmic",
        match: (c) =>
          is("Abstract entity", "Abstract Entity", "Cosmic entity", "Cosmic Being", "Watcher")(c) ||
          aff("Cosmic entities")(c) ||
          aff("Celestials")(c) ||
          /* The children have to be inside the parent. Heralds and Elders each
             had a chip UNDER Cosmic entities while failing to match Cosmic
             entities itself, so pressing the parent hid the very people the
             child chips listed. */
          aff("Heralds of Galactus")(c) ||
          aff("Elders of the Universe")(c),
      },
      { id: "abstract", parent: "cosmic", match: is("Abstract entity", "Abstract Entity") },
      { id: "celestial", parent: "cosmic", match: (c) => is("Celestial")(c) || aff("Celestials")(c) },
      { id: "elder-universe", parent: "cosmic", match: aff("Elders of the Universe") },
      { id: "herald", parent: "cosmic", match: aff("Heralds of Galactus") },
    ],
  },
  {
    group: "team",
    /**
     * MCU ROSTERS FIRST, then the mutant institutions, then the rest. A reader
     * naming a team is usually naming one they saw in a film, and those nine
     * are fixed sets Rashid asked not to be touched — so they lead, in the
     * order the films introduced them.
     */
    chips: [
      { id: "avengers", match: aff("Avengers") },
      { id: "guardians", match: aff("Guardians of the Galaxy") },
      { id: "defenders", match: aff("Defenders") },
      { id: "fantastic-four", match: aff("Fantastic Four") },
      { id: "thunderbolts", match: aff("Thunderbolts") },
      { id: "young-avengers", match: aff("Young Avengers") },
      { id: "midnight-sons", match: aff("Midnight Sons") },
      { id: "revengers", match: aff("Revengers") },
      { id: "team-cap", match: aff("Team Captain America") },
      { id: "team-iron-man", match: aff("Team Iron Man") },
      { id: "x-men", match: aff("X-Men") },
      { id: "x-force", match: aff("X-Force") },
      { id: "x-factor", match: aff("X-Factor") },
      { id: "new-mutants", match: aff("New Mutants") },
      { id: "generation-x", match: aff("Generation X") },
      { id: "weapon-x", match: aff("Weapon X") },
      { id: "brotherhood", match: aff("Brotherhood") },
      { id: "acolytes", match: aff("Acolytes") },
      { id: "marauders", match: aff("Marauders") },
      { id: "hellions", match: aff("Hellions") },
      { id: "hellfire", match: aff("Hellfire Club") },
      { id: "morlocks", match: aff("Morlocks") },
      { id: "spider-verse", match: (c) => c.spiderVerse },
      { id: "spider-society", match: aff("Spider-Society") },
      { id: "sinister-six", match: aff("Sinister Six") },
      { id: "inheritors", match: aff("Inheritors") },
      { id: "wakandan", match: aff("Wakandans") },
      { id: "agents", match: aff("S.H.I.E.L.D.") },
      { id: "loki-variants", match: aff("Loki variants") },
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
    /**
     * THE TWO TEAMS THAT HOLD BOTH A SPIDER-MAN AND A PERFORMANCE OF HIM.
     *
     * Avengers and Team Iron Man each list `spider-man` and the Tom Holland
     * record, so both render and the row shows two near-identical Spider-Men.
     * The project pages already solved this: the performance REPLACES the
     * character it performs and the avatar is split, half art and half actor.
     *
     * Only these two, deliberately. Everywhere else the two records stay
     * separate, because a reader browsing all characters is looking for the
     * character and a reader browsing a Spider chip wants every Peter listed.
     */
    const merged =
      chip === "avengers" || chip === "team-iron-man"
        ? (() => {
            const replaced = new Set(
              kept.flatMap((c) => (c.performerOf ? [c.performerOf] : [])),
            );
            return kept.filter((c) => !replaced.has(c.id));
          })()
        : kept;
    if (sort === "fame") return merged;
    return [...merged].sort((a, b) => a.name.localeCompare(b.name, locale));
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
          {/**
           * BANDS, AND A BAND OF CHILDREN IS ITS OWN BAND.
           *
           * The level chips used to sit inline among their siblings, which put
           * "Omega" next to "Inhumans" and made a narrowing look like a peer.
           * When a parent is active its children get their own labelled band
           * underneath, so the hierarchy is visible rather than implied.
           */}
          {GROUPS.map((g) => {
            const parents = g.chips.filter((c) => !c.parent);
            /**
             * THE OPEN PARENT IS THE SELECTION *OR* THE SELECTION'S PARENT.
             *
             * Keying the child band off `parent === chip` alone made it vanish
             * the moment you chose a child: nothing has "mutant-gamma" as its
             * parent, so the band emptied and the row you were standing in
             * disappeared under you. Choosing Gamma means Mutants AND Gamma
             * are both active, and the band has to stay open to say so.
             */
            const openParent = CHIPS.find((c) => c.id === chip)?.parent ?? chip;
            const kids = g.chips.filter((c) => c.parent === openParent);
            return (
              <div key={g.group} className="chip-band-group">
                <div className="chip-band">
                  <span className="chip-band-label" aria-hidden="true">
                    {t(`chipGroup.${g.group}`)}
                  </span>
                  {/**
                   * A NATIVE <details> ON SMALL SCREENS ONLY.
                   *
                   * Fifty chips is a wall on a phone and a useful map on a
                   * desktop. CSS opens and locks this at 48rem, so a wide
                   * screen sees the row exactly as before and never a
                   * disclosure — no JS, no breakpoint state, no hydration.
                   */}
                  <details className="chip-fold" open>
                    <summary className="chip-fold-summary">
                      {t(`chip.${chip}`)}
                    </summary>
                    <div className="chip-band-row">
                      {parents.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          role="radio"
                          /* A parent reads as chosen while one of its children
                             is, because it still is. */
                          aria-checked={chip === c.id || openParent === c.id}
                          className="chip"
                          onClick={() => setChip(c.id)}
                        >
                          {t(`chip.${c.id}`)}
                        </button>
                      ))}
                    </div>
                  </details>
                </div>
                {kids.length > 0 && (
                  <div className="chip-band chip-band-child">
                    {/* The PARENT names this band, not the selection. Keying
                        it to `chip` printed "chipGroup.mutant-alpha", which
                        has no message and rendered as the raw key. */}
                    <span className="chip-band-label" aria-hidden="true">
                      {t(`chipGroup.${openParent}`)}
                    </span>
                    <div className="chip-band-row">
                      {kids.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          role="radio"
                          aria-checked={chip === c.id}
                          className="chip chip-child"
                          onClick={() => setChip(c.id)}
                        >
                          {t(`chip.${c.id}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
                {c.performerOf && c.baseImage ? (
                  <SplitAvatar
                    characterSrc={c.baseImage}
                    actorSrc={c.image}
                    name={c.name}
                  />
                ) : (
                  <Avatar src={c.image} name={c.name} />
                )}
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
