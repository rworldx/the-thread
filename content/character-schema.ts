import { z } from "zod";
import { Bilingual, Id, Universe } from "./schema";

/**
 * THE CHARACTER CORPUS — the part with no API behind it.
 *
 * TMDB has cast, not characters. Marvel's own API has characters but no powers
 * and no mutant classification. Powers, origin and rank are editorial work, the
 * same shape as the 147 spoiler-safe lines, and they are held to the same rule:
 * a missing fact fails the build rather than getting filled in by inference.
 *
 * APPEARANCES ARE DERIVED, NEVER TYPED. A character appears in a title if that
 * title's TMDB cast credits name them. Hand-listing both sides guarantees they
 * drift, which is the two-sources-of-truth failure this project has already hit
 * twice (`titleEn` versus `seasons`, `spoilerSafe` in two files). The matching
 * lives in lib/characters.ts and runs off `aliases`.
 */

export const CharacterCategory = z.enum([
  "hero",
  "villain",
  "antihero",
  /**
   * ANTI-VILLAIN, which is not a synonym for anti-hero and not a way of being
   * soft on anyone. An anti-hero does good by bad means; an anti-villain does
   * harm for reasons that are recognisably decent. Ikaris and He Who Remains
   * are the clearest cases in the corpus — both are opposed by the protagonists
   * and neither is wrong about the stakes, and filing them as plain villains
   * would say something about them that the films do not.
   */
  "antivillain",
  "supporting",
]);

/**
 * The real in-universe classification, not a power level invented for this
 * site. House of X #1 defined it — a mutant whose dominant power reaches an
 * undefinable upper limit of its own classification — and named fourteen.
 *
 * THE LIST HAS GROWN SINCE AND THIS COMMENT USED TO BE WRONG ABOUT IT. It
 * said Charles Xavier was "conspicuously not" on the list and that the
 * absence was worth carrying. True of House of X #1; false since the 2025
 * additions, which put Xavier, Maggott and Forge on it. The compilation now
 * runs to 36 names, most of them Arakkii mutants this corpus does not hold.
 *
 * Forge is the odd one: House of X used him as the COUNTEREXAMPLE, and he
 * qualifies only through a machine he built. Recorded, not smoothed over.
 *
 * Null for anyone who is not a mutant, and for mutants with no published rank.
 */
/**
 * SIX LEVELS, ORDERED MOST POWERFUL TO LEAST, and the order of this enum IS
 * that ranking rather than an alphabetical accident:
 *
 *   omega    An undefinable upper limit within the power's own class. This is
 *            the only one Marvel formally defined (House of X #1), and it is
 *            a statement about ONE power, not about overall strength.
 *   alpha    The common superhuman tier: strong, bounded, useful.
 *   beta     Practical but minimally so.
 *   gamma    Powerful and visibly mutated, at a physical cost.
 *   delta    Useful but limited. Roughly half of all mutants sit here, which
 *            makes it the statistical baseline and the least interesting.
 *   epsilon  Little or no ability, and a mutation that makes life harder.
 *
 * ONLY ALPHA, BETA AND OMEGA ARE REALLY EARTH-616. Gamma appears in Earth-295
 * and delta and epsilon come from secondary and adjacent material, which is
 * why the corpus holds one gamma and no deltas or epsilons: the levels exist
 * so the enum can express them, not so anybody is obliged to fill them.
 */
export const MutantClass = z.enum([
  "omega",
  "alpha",
  "beta",
  "gamma",
  "delta",
  "epsilon",
]);

/**
 * A typed edge between characters. Untyped, the related list renders as an
 * undifferentiated blob; typed, it is the difference between "fought" and
 * "is". `variant` matters more here than anywhere else — three Peter Parkers,
 * two Wolverines — and it is the multiverse nobody else models.
 */
export const RelationKind = z.enum([
  "ally",
  "enemy",
  "family",
  /**
   * A MULTIVERSE COUNTERPART. Three Peter Parkers, two Wolverines — the same
   * person in different universes. NOT the same person wearing two names:
   * Marc Spector and Mr. Knight are one record with two aliases, and so are
   * Banner and the Hulk, and Reynolds and the Void.
   */
  "variant",
  "team",
  /**
   * HOST. One being carrying another, which is neither of the two things above
   * and was being recorded as `variant` for want of anything better.
   *
   * The Phoenix Force is not a version of Jean Grey. It predates her, outlives
   * her, and has ridden Rachel Summers, Hope Summers, Cyclops and Emma Frost —
   * two beings, correctly two records, and the edge between them is
   * possession. Khonshu and Moon Knight are the same shape: a god and the
   * human he speaks through, recorded as `ally`, which says nothing about the
   * arrangement.
   *
   * The distinction matters on a site whose whole job is telling a beginner
   * what they are looking at. "Variant" would say Jean IS the Phoenix, which
   * is exactly the confusion this is meant to clear up.
   */
  "host",
]);

/**
 * HOW A SYMBIOTE CAME TO EXIST — and NOT, it turns out, Marvel's own system.
 *
 * This comment used to claim these were "Marvel's own four categories" and a
 * "published in-universe classification". Checked, and that is wrong: unlike
 * the Omega level, which House of X #1 formally defines, Marvel has never
 * published a symbiote class system. The origins below are real and sourced —
 * the Life Foundation five WERE forcibly spawned, Toxin IS the thousandth of
 * its line — but grouping them into five named classes is this site's
 * editorial framing, and the schema should say so rather than borrow an
 * authority it does not have.
 *
 * It is about ORIGIN rather than power, which is why Toxin and Riot are
 * different kinds of thing even
 * though both descend from Venom.
 *
 *   lineage  Natural generational descent. Venom, then Carnage from Venom,
 *            then Toxin from Carnage — each generation stronger and less
 *            vulnerable to fire and sound than the one before it.
 *   spawn    Seedlings harvested in a lab rather than born. The Life
 *            Foundation five, forced out of Venom by scientists, which is why
 *            they lack the evolutionary upgrades a true offspring gets.
 *   anomaly  Made by accident, mutation or magic, with the base biology
 *            changed. Anti-Venom, charged out of leftover Venom cells by
 *            Mr. Negative's light, is immune to fire and sound and burns other
 *            symbiotes away on contact.
 *   ancient  Primordial strains Knull forged before the hive existed —
 *            All-Black the Necrosword and the symbiote dragons.
 *
 * Null for everyone who is not a symbiote, and for Knull, who is the god that
 * made them rather than one of them.
 */
/**
 * WHICH MAGIC, not which kind of being.
 *
 * The chips used to split magic users into Sorcerers, Elder Gods and Demons,
 * which sorts them by WHAT THEY ARE. Rashid pointed out the more useful
 * question is what they actually practise, and he is right: Loki and Agatha
 * are both "not sorcerers" and have nothing else in common, while Strange and
 * Mordo are opposites who draw on the identical source.
 *
 *   eldritch   The Masters of the Mystic Arts: borrowed dimensional energy,
 *              sling rings, the Eye. Learned from books at Kamar-Taj.
 *   asgardian  Seidr. Inherited rather than studied, and Frigga taught it to
 *              Loki because Odin would not.
 *   chaos      Not learned at all and not borrowed. Wanda and Agatha, and the
 *              Darkhold that Chthon wrote it into.
 *   dark-dimension  Dormammu's realm and its heirs: Umar, Clea. Purple, and a
 *                   specific place rather than a mood.
 *   infernal        The hells. Mephisto, Blackheart, demons who deal.
 *   witchcraft      Covens and the Salem line. Agatha, who covets chaos magic
 *                   precisely because she does not have it.
 *   necromancy      Death magic. Selene has stayed alive for millennia by
 *                   taking the life out of other people.
 *   blood           Paid for in the caster's own. Nico's Staff of One never
 *                   repeats a spell.
 *   voodoo          The Loa. Doctor Voodoo commands spirits rather than
 *                   dimensional energy, which is its own branch entirely.
 *   elder      What the Elder Gods are made of, older than any practice.
 *   green      Gaea's magic, of the living earth rather than any dimension.
 *
 * "Dark" WAS ONE OF THESE AND HELD TWENTY PEOPLE, which made it a bucket
 * rather than a school. Rashid's objection was exact: not everything purple is
 * the same magic. Dormammu's Dark Dimension, Mephisto's hell, Agatha's coven
 * witchcraft and Selene's life-draining are four different practices that
 * happened to share a colour, so they are four entries now.
 *
 * NOT a power ranking: an
 * eldritch sorcerer is not weaker than a chaos witch, they are doing
 * different things. And NOT for energies that merely look occult — the
 * Darkforce that Cloak and Mister Negative channel is a dimension of physics,
 * not a craft anybody studies.
 */
export const MagicSchool = z.enum([
  "eldritch",
  "asgardian",
  "chaos",
  "dark-dimension",
  "infernal",
  "witchcraft",
  "necromancy",
  "blood",
  "voodoo",
  "elder",
  "green",
]);

export const SymbioteClass = z.enum([
  "lineage",
  "spawn",
  "anomaly",
  "ancient",
  /**
   * GESTALT. Four of the Life Foundation five were merged into one creature,
   * Hybrid, which is neither a descendant nor a harvest: it is several
   * symbiotes forced into a single mind that does not agree with itself. Spawn
   * described where its parts came from and said nothing about what it became.
   */
  "gestalt",
]);

/**
 * WHY THIS VERSION IS DIFFERENT — the missing half of a `variant` edge.
 *
 * The edge said two characters are alternate versions of each other and
 * nothing about the cause, which flattens three genuinely different things:
 *
 *   timeline-branch     Same reality, history split. The Loki who takes the
 *                       Tesseract in Endgame is this: Earth-199999 both
 *                       before and after, one branch later.
 *   alternate-universe  A different reality entirely. Three Peter Parkers
 *                       from three Earths.
 *   reality-divergence  The reality itself was rewritten or overwritten
 *                       rather than branched.
 *   clone               Grown from another person rather than diverged from
 *                       them. Madelyne Pryor, Kaine, X-23.
 *   other               A real edge whose cause is not one of the above, or
 *                       is not established on screen.
 *
 * NEVER ASSUME A VARIANT CAME FROM ANOTHER UNIVERSE. Half of them did not.
 */
export const VariantOrigin = z.enum([
  "timeline-branch",
  "alternate-universe",
  "reality-divergence",
  "clone",
  "other",
]);

export const Relation = z.object({
  id: Id,
  kind: RelationKind,
  /** Only meaningful on a `variant` edge; ignored elsewhere. */
  variantOrigin: VariantOrigin.optional(),
});

/** A power is a short phrase, never a paragraph. It renders as a chip. */
const PowerPhrase = z
  .string()
  .trim()
  .min(1)
  .max(48, "a power is a chip, not a sentence");

export const Power = z.object({
  en: PowerPhrase,
  ar: PowerPhrase,
});

/**
 * The origin is SPOILER-SAFE, by the same rule the title lines follow: it
 * describes where someone starts, never where they end up. Two to three
 * sentences.
 */
const OriginText = z
  .string()
  .trim()
  .min(20)
  .max(340, "an origin is a paragraph, not a synopsis");

export const CharacterSource = z.object({
  id: Id,
  nameEn: z.string().trim().min(1),
  nameAr: z.string().trim().min(1),

  /**
   * Every name this person is credited or searched under. This is BOTH the
   * search surface (so "Logan" finds Wolverine) and the join key against TMDB
   * cast credits, which come through as "Logan / Wolverine" or "Tony Stark".
   */
  aliases: z.array(z.string().trim().min(1)).default([]),

  category: CharacterCategory,
  /** "X-Men", "Avengers", "Defenders". Free text, used as filter chips. */
  affiliation: z.array(z.string().trim().min(1)).default([]),
  /** A character can span several. Wolverine is fox AND mcu. */
  universe: z.array(Universe).min(1),
  species: z.string().trim().min(1).nullable().default(null),
  mutantClass: MutantClass.nullable().default(null),
  symbioteClass: SymbioteClass.nullable().default(null),
  /**
   * SCHOOLS, PLURAL, because practices overlap and being one thing does not
   * stop you studying another. Agamotto is an Elder God who founded eldritch
   * sorcery. Chthon is an Elder God who wrote chaos magic into a book. A
   * single value made those two facts compete for one slot and the more
   * interesting one always lost.
   *
   * Empty for everyone who does not practise magic.
   */
  magicSchools: z.array(MagicSchool).default([]),

  /**
   * WHICH REALITY, and NOT the same thing as `universe` above.
   *
   * `universe` in this corpus has always meant the RIGHTS bucket — mcu, sony,
   * fox, defenders, marvel-tv, legacy, animation — which is who owned the
   * character, not where they live. That is a genuine naming collision with
   * how Marvel uses the word, and renaming a field the whole site reads from
   * is not something to do quietly, so the reality gets its own field.
   *
   *   universe  WHO owned it        "sony"
   *   reality   WHERE it happens    "Earth-1610"
   *
   * NULL WHEN UNESTABLISHED, and that is the common case. Deadpool & Wolverine
   * never gives an Earth number for most of its cameos, so inventing one would
   * be putting a fact on a page that no source supports.
   */
  reality: z.string().trim().min(1).nullable().default(null),
  /** The chronological path within that reality, where a story names one. */
  timeline: z.string().trim().min(1).nullable().default(null),
  /** Where that timeline split from another, where a story names it. */
  timelineBranch: z.string().trim().min(1).nullable().default(null),

  powers: z.array(Power).min(1).max(6),
  origin: Bilingual,
  related: z.array(Relation).default([]),

  /**
   * APPEARANCES THE CREDITS DO NOT CARRY — the one escape hatch, kept narrow.
   *
   * Everything else here is derived from TMDB cast credits precisely so nobody
   * has to remember to update two files. But a credit list is not the same as
   * a film: Galactus is in Rise of the Silver Surfer as the cloud and TMDB
   * credits no actor for him, because no actor played him. He is unmistakably
   * in the film. Deriving from credits cannot find that, and no fix to the
   * matcher ever will, because there is nothing there to match.
   *
   * So this is for appearances that are REAL and UNCREDITED, and nothing else.
   * It is not a place to hand-list appearances the matcher could have found —
   * those are matcher bugs, and hiding them here is how the derived corpus
   * quietly turns back into a typed one.
   */
  alsoIn: z.array(z.string().trim().min(1)).default([]),

  /**
   * CREDITED AS A DIFFERENT NAME EVERY TIME — join on the actor instead.
   *
   * Stan Lee is in 28 titles here and the character name is different in all
   * of them: "Stan the Man", "Xandarian Ladies' Man", "Bus Driver", "Hot Dog
   * Vendor", "Rejected Wedding Guest". No alias list can match that, and
   * hand-listing 28 films would be the two-sources-of-truth failure this
   * corpus refuses everywhere else — the next cameo would silently be missing.
   *
   * The actor IS the constant, and the cast data already carries it. So the
   * record names a performer and takes every title crediting them, derived the
   * same way everything else here is.
   *
   * This is for people who appear AS THEMSELVES under many names. It is not a
   * shortcut around writing aliases for an ordinary character.
   */
  creditedActor: z.string().trim().min(1).nullable().default(null),

  /**
   * A PERFORMANCE, NOT A PERSON — the one record shape that is not a character.
   *
   * All three live-action Spider-Men are Peter Parker. No alias can separate
   * them, because every credit for all three reads "Peter Parker" and the
   * matcher would give any record carrying that alias every Spider-Man film
   * ever made. That is the Falcon bug the C18 guard exists to catch, and it is
   * why three records looked impossible.
   *
   * The way through is that the join key does not have to be the NAME. TMDB
   * credits carry the actor too, and an actor IS unique across these films.
   * So a record can say "I am the Peter Parker that Tom Holland played", and
   * its appearances derive from exactly the credits where BOTH match.
   *
   * Nothing is hand-listed. These records have no aliases at all, so they take
   * part in no name matching and cannot steal a credit from anyone. Their
   * films, their co-stars and their relations all fall out of the same cast
   * data the rest of the corpus runs on — filtered by one more column.
   */
  performerOf: z
    .object({
      /** The character record this is a performance OF. */
      character: Id,
      /** The performer, spelled exactly as TMDB credits them. */
      actor: z.string().trim().min(1),
    })
    .nullable()
    .default(null),
});

export type CharacterSource = z.infer<typeof CharacterSource>;
/**
 * The AUTHORED shape, which is not the parsed one: `.default()` makes a field
 * optional on the way in and guaranteed on the way out. Typing the corpus as
 * the output type would demand `mutantClass: null` on all eighty non-mutants.
 */
export type CharacterDraft = z.input<typeof CharacterSource>;
export type Relation = z.infer<typeof Relation>;
export type RelationKind = z.infer<typeof RelationKind>;
export type VariantOrigin = z.infer<typeof VariantOrigin>;
export type MutantClass = z.infer<typeof MutantClass>;
export type SymbioteClass = z.infer<typeof SymbioteClass>;
export type MagicSchool = z.infer<typeof MagicSchool>;
export type CharacterCategory = z.infer<typeof CharacterCategory>;

/** The shipped shape: authored fields plus everything derived from the cast. */
export interface Character extends CharacterSource {
  /** Title ids, release order. Derived from TMDB cast credits, never typed. */
  appearances: string[];
  /** Who played them, per title. This is where variants become visible. */
  portrayals: { titleId: string; actor: string; actorPhoto: string | null }[];
  /** Character ARTWORK, or null where no source has any. Never an actor. */
  image: string | null;
  /** Where that artwork came from, so the page can attribute it. */
  artSource: "marvel" | "shdb" | "mcu-wiki" | "chosen" | null;
  /** The most-credited actor's photo. For "played by", never for the avatar. */
  leadActorPhoto: string | null;
}
