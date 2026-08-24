/**
 * HOW STRONG IS EVERYONE — the ranking the /characters sort runs on.
 *
 * DERIVED, NOT TYPED, for the same reason appearances are. A `powerRank` field
 * on 670 records would be 670 numbers to keep in step with each other: insert
 * one character at rank 200 and every number below it is wrong. Here the order
 * falls out of what the corpus already knows — species, mutant class,
 * affiliations — plus a hand-ordered head per tier where twelve sources were
 * read and agree.
 *
 * THE RANK IS A TOTAL ORDER AND THE TIER IS THE CLAIM. A sort needs every
 * character to have a distinct position, so this produces 1..N with no ties.
 * That is not the same as asserting #340 beats #341: inside a tier, past the
 * ranked head, the order is alphabetical and means nothing. The tier is what
 * this file is willing to defend, which is why it is exported alongside.
 *
 * Two documents are generated from this — docs/POWER-TIERS.md and
 * -PEAK.md — by scripts/gen-power-tiers.ts.
 */

import { allCharacters } from "@/lib/characters";
import type { Character } from "@/content/character-schema";

interface Tier {
  n: number;
  title: string;
  gloss: string;
  /** Ordered ids, strongest first. Only the researched head uses this. */
  ranked?: string[];
  /** Everyone else falls in here, alphabetically. */
  match?: (c: Character) => boolean;
}

/* `species` is nullable on the schema; an unset one matches no tier by name
   and falls through to the category rules at the bottom. */
const sp =
  (...names: string[]) =>
  (c: Character) =>
    c.species !== null && names.includes(c.species);
const aff =
  (...names: string[]) =>
  (c: Character) =>
    c.affiliation.some((a) => names.includes(a));

/**
 * Ordered strongest to weakest. A character lands in the FIRST tier that takes
 * them, so the specific tests must come before the broad ones.
 */
const TIERS: Tier[] = [
  {
    n: 0,
    title: "Outside creation",
    gloss:
      "Not combatants. The reason there is anything to fight over. No source ranks anything above these two — and the sources say they are ONE BEING, the One Below All being the One Above All's own dark aspect, which is why nothing can sit between them.",
    ranked: ["the-one-above-all", "the-one-below-all"],
  },
  {
    n: 1,
    title: "Above the multiverse",
    gloss:
      "Each has ended, judged or rewritten a cosmos. The Living Tribunal leads: every source ranks him second only to the One Above All. The Beyonders killed him, and they did it from outside the hierarchy he is second in.",
    ranked: [
      /**
       * THE LIVING TRIBUNAL WAS FIFTH, AND THE KILL IS WHY. This file used to
       * lead the tier with the Beyonders "on the plainest feat available:
       * they killed the Living Tribunal", and that rule read well and put a
       * being every source calls the second-most-powerful in Marvel below
       * three others.
       *
       * The sources that rank him second are POST-2015. They know about
       * Secret Wars. They rank him second anyway, and the reason is in the
       * same articles: the Beyonders "aren't even a part of the food chain" —
       * they live outside the multiverse, they came in as a race during a
       * multiversal collapse, and he died defending the hierarchy he is
       * second in. Order and Chaos had to FUSE with the In-Betweener to
       * manage the same thing.
       *
       * AND WHY HE IS THIRD RATHER THAN SECOND, which is the obvious next
       * question. "Second only to the One Above All" is the Tribunal's
       * classic lore and it was written before the One Below All existed at
       * all — Immortal Hulk, 2018. The two are not two: the sources call the
       * One Below All "the evil alter-ego of the One-Above-All", "equally as
       * powerful because they are one and the same", and separately name it
       * "the only one superior to the Living Tribunal", who beside it is
       * "literally but a fraction". So the old phrase and the new placement
       * agree. Nothing sits between the Tribunal and the One Above All,
       * because the thing above him IS the One Above All.
       *
       * Being killed by something from outside the system is not the same as
       * being outranked inside it. The kill stays in the record — it is why
       * the Beyonders and Logos are second and third rather than lower — but
       * it no longer outweighs a placement every source agrees on.
       */
      "the-living-tribunal",
      "the-beyonders",
      /**
       * LOGOS KILLED THE LIVING TRIBUNAL, which is the exact feat the sentence
       * above ranks the Beyonders first for — and he was 73rd, in tier 3, on a
       * record reading "Speaks for jurisdiction / Knows which court applies /
       * Rarely intervenes". Master Order and Lord Chaos fused with the
       * In-Betweener, killed the Tribunal, murdered the last of the Celestials
       * and tried to install itself as the law of the multiverse.
       *
       * Below the Beyonders rather than above because Galactus unmade him and
       * the fusion did not hold. Order and Chaos stay in tier 2 as themselves:
       * this corpus keeps a separate record for the fused being, so the feat
       * belongs to the record that performed it.
       */
      "logos",
      "the-beyonder",
      "first-firmament",
      "protege",
      "nemesis",
    ],
  },
  {
    n: 2,
    title: "The universe, personified",
    gloss:
      "Concepts with a will. Eternity and Infinity are twins and the sources split on which leads; the pairing is the honest answer.",
    ranked: [
      "eternity",
      "infinity",
      "oblivion",
      "death",
      "master-order",
      "lord-chaos",
      "the-in-betweener",
      "queen-of-nevers",
      "phoenix",
      "mistress-love",
      "sire-hate",
    ],
    match: sp("Abstract Entity", "Abstract entity"),
  },
  {
    n: 3,
    title: "Beings with a cosmic office",
    gloss:
      "Power that comes with a job — devouring, judging, holding a dimension. Ranked above gods and below the abstracts they answer to.",
    ranked: [
      "knull",
      "chaos-king",
      "galactus",
      /* TIAMUT ABOVE ARISHEM, reversing the order they were written in. The
         Dreaming Celestial BEAT ARISHEM IN SINGLE COMBAT — it took the rest
         of the Host to subdue him afterwards — and he is feared by Galactus
         and could not be perceived by the Watcher when he woke. Arishem leads
         the Host, which is an office; Tiamut won the fight. */
      "tiamut",
      /* THE WATCHERS AS A RACE, which is a different claim from Uatu alone.
         The sources rate him beside Odin and Zeus and the RACE beside the
         Celestials, so the two records sit two tiers apart on purpose: he is
         103rd with the sky-fathers and they are here with the Host. */
      "the-watchers",
      "arishem",
      "exitar",
      "the-progenitor",
      /**
       * MOLECULE MAN AND FRANKLIN RICHARDS COME UP HERE, and it is the last
       * class grant this file had left. Every Celestial outranked Franklin on
       * `species: Celestial` alone — including ZGREB THE ASPIRANT, whose
       * record reads "Aspires to the Host / Not yet fully risen" and scores
       * MINUS FORTY, two places above a boy whose record reads "Creates
       * universes" and scores 360, the highest number on the page.
       *
       * Franklin is the one mortal Marvel has repeatedly called a Celestial in
       * waiting, and Reece holds a multiverse together. Being born inside the
       * universe is a fact about their origin, not a ceiling on what they do.
       *
       * Their own order is left as the documents state it — unresolved, Reece
       * on the higher ceiling and Franklin on the wider range — so they move
       * together and stay adjacent.
       */
      "molecule-man",
      "franklin-richards",
      "chthon",
      "set",
      "shuma-gorath",
      "cyttorak",
      /* ZOM ABOVE DORMAMMU. Two independent sources and the dossier all say
         he "far exceeds even Umar, and thus Dormammu", and the Living
         Tribunal turned up in person to deal with him — having ignored
         Thanos wearing the Infinity Gauntlet. He was ranked 86th, below
         Umar, on a record that scored 2. */
      "zom",
      "dormammu",
      /**
       * INFINITY ULTRON IS NAMED HERE BECAUSE HIS SPECIES WOULD BURY HIM.
       * He is `Synthezoid` — Ultron's mind in Vision's body — and that word
       * lands in tier 7, "Enhanced", among super-soldiers and androids. He
       * holds all six Infinity Stones, bisected Thanos before the Titan could
       * react, erased Asgard with a single beam, and fought the WATCHER
       * across realities, who is 57th in this same tier.
       *
       * "Cosmic office" bends to fit him — the Stones are not a job. But this
       * tier is where cosmic-scale authority over space, time and reality
       * lives, and the alternative put him below thirteen Celestial
       * functionaries he could switch off.
       */
      "infinity-ultron",
    ],
    match: (c) =>
      /**
       * A CELESTIAL WHOSE RECORD CLAIMS NOTHING IS NOT HOLDING A COSMIC
       * OFFICE. The species alone was admitting Zgreb the Aspirant — "Aspires
       * to the Host / Not yet fully risen", scoring MINUS FORTY — above every
       * reality-warper in tier 4, so Scarlet Witch, Legion and Captain
       * Universe all sat below a Celestial who has not risen yet.
       *
       * Reality manipulation ignores durability: somebody who edits what is
       * true does not have to out-punch a two-thousand-foot suit of armour. So
       * the grant now asks the record to say something, and the six it stops
       * carrying fall to tier 4 and are ordered there by their own claims. The
       * named Celestials — Arishem, Exitar, Tiamut, the Progenitor — are in
       * this tier's head and unaffected.
       */
      /**
       * AND THE SAME QUESTION, ASKED HARDER, OF EVERYONE ELSE IN THE TAIL.
       *
       * The Celestial gate above asks the record to say SOMETHING. That was
       * enough to keep Zgreb out and it was never enough for this tier as a
       * whole, because tier 3 sits above tier 4, and tier 4 is full of people
       * who rewrite reality. Hoggoth, on a record scoring THIRTY-TWO,
       * outranked Legion on 346 and Mad Jim Jaspers on 510. An office is not
       * a power level either.
       *
       * So the tail is asked for a COSMIC-SCALE claim rather than a non-zero
       * one: one word from the reality band, which is what the band is worth.
       * The sixteen in the head are untouched — a hand-rank always wins — so
       * Galactus, Knull, Dormammu and the rest keep their places above every
       * warper, which is the part of the old order worth keeping.
       *
       * THE SIX IT STOPS CARRYING FALL TO TIER 5, not tier 4, and land better
       * than they sat: Oshtur, Agamotto, Hoggoth and Gaea are ELDER GODS, and
       * tier 5 is "gods, omegas, and the top of the physical scale". The tier
       * they were in describes a job none of the four holds.
       */
      ((c.species === "Celestial" && claimScore(c) > 0) ||
        sp(
          "Elder God",
          "Cosmic Being",
          "Cosmic entity",
          "Cosmic Force",
          /* "WATCHER" IS GONE FROM HERE, and it was a rule with exactly one
             member -- the same shape as "Alien dragon", which existed only
             for Lockheed. It put Uatu 68th, THIRTY-THREE PLACES ABOVE ODIN,
             on a claim score barely half of Odin's, and the sources put him
             LEVEL with the sky-fathers rather than above them. He is named
             into tier 5 beside them instead. */
          "Symbiote god",
          "Psychic Entity",
        )(c) ||
        /* The affiliation has to ask the same question the species now asks,
           or it simply lets the unrisen back in through the other door. */
        (aff("Cosmic entities", "Celestials")(c) &&
          (c.species !== "Celestial" || claimScore(c) > 0))) &&
      claimScore(c) >= 120,
  },
  {
    n: 4,
    title: "Mortals who rewrite reality",
    gloss:
      "Born inside the universe and able to edit it. The two biggest names this tier used to hold — Molecule Man and Franklin Richards — sit a tier up now: being born inside the universe turned out to be a fact about their origin rather than a ceiling on what they do.",
    /**
     * THE PUBLISHED OMEGA LIST IS NOT A POWER RANKING, and this tier learned
     * that the hard way. `mutantClass` follows Marvel's own list on purpose —
     * C12 exists because five names were once added to it off a fan roster and
     * had to come back off. That rule is right for the FIELD and wrong as the
     * only way in here: it left Nate Grey at 253 and Matthew Malloy at 509,
     * behind an alligator, because a list they are absent from is not evidence
     * that they cannot warp reality. Nate reshaped the world in Age of X-Man.
     * Malloy was so far past control that Xavier erased him rather than fight.
     *
     * So they are named. The field still says what Marvel published; the
     * ranking says what they did.
     */
    ranked: [
      "captain-universe",
      "onslaught",
      "legion",
      "scarlet-witch",
      /* JEAN ABOVE RACHEL, which she was not. Rachel was named into this tier
         as a Phoenix host and Jean was left in tier 5 on the omega rule, so
         the daughter outranked the mother and the X-Men chip opened on Rachel.
         Jean is the Phoenix host the others are measured against, and her own
         record is the one that says "No known upper limit". */
      "jean-grey",
      "mad-jim-jaspers",
      "nate-grey",
      "proteus",
      "matthew-malloy",
      "marquis-of-death",
      "jamie-braddock",
      "rachel-summers",
      /* MISTER M IS NOT NAMED HERE ANY MORE, and his own record is what
         removed him. This tier is mortals who rewrite REALITY. His six
         bullets say matter and only matter -- "controls all matter at the
         subatomic level", "turns matter to energy, and back", and an origin
         that spends the power "mostly to repair other mutants". That is
         Magneto's argument at a smaller scale than Magneto's, and this tier
         has already ruled on it once: MOLECULE MAN, the purest matter claim
         in the corpus, was moved OUT of here rather than kept.
         So he fell to 183, where his claim score of 204 sits him between
         Starfox at 226 and the Gardener at 168 -- ordered by what he says
         he can do, with nothing lent to him. Eighty-three places is a long
         fall, and every one of them was borrowed. */
    ],
    /**
     * NO BLANKET OMEGA RULE, and removing it is the largest correction this
     * file has taken. Every omega was landing here, above tier 5, so MAGGOTT —
     * whose power is two slugs that do his digesting — outranked Thor, and
     * Forge, who invents by instinct, outranked the Hulk.
     *
     * Omega is not a fight ranking and never was. The schema says so in its
     * own note: it means one power with no discernible upper limit, not a
     * character who beats gods. Iceman is omega and Wolverine is beta, and
     * nobody thinks Iceman wins that fight.
     *
     * So this tier is now exactly what its title says — the ones who rewrite
     * reality, named — and the remaining omegas are admitted to tier 5, where
     * they sit among the gods rather than above them.
     */
  },
  {
    n: 5,
    title: "Gods, omegas, and the top of the physical scale",
    gloss:
      "No cosmic office and no reality warping — just more raw power than anything below can survive. The omega-level mutants who are not reality-warpers sit here, beside the gods rather than above them.",
    /* THE CELESTIALS TIER 3 STOPPED CARRYING LAND HERE. They were sent to
       tier 4 first, which was wrong twice over: that tier means "rewrites
       reality", and Gammenon the Gatherer does not, so a Celestial with an
       empty record still outranked Odin and Thor on ancestry.

       This tier's title is already the answer — "the top of the physical
       scale". Refusing the office is not the same as being a bystander: a
       silent Celestial is still two thousand feet of living armour, and that
       is a physical claim, not a cosmic one. */
    ranked: [
      /**
       * THOR ABOVE ODIN, which this file has already argued for once without
       * noticing it applied here. Two days ago I put Doctor Strange over the
       * Ancient One and gave the reason as "Thor is ranked above ODIN in the
       * peak list" -- being taught or fathered by someone is not a ceiling.
       * The peak list said it. The base ranking still had Odin ten places up.
       *
       * The sources say it in both continuities. In Ragnarok ODIN HIMSELF
       * tells Thor he is the stronger of the two. In the comics Thor is
       * "physically stronger and more robust than Odin in every way", and
       * that is a claim about base form, not about Rune King Thor, who is a
       * peak and is ranked as one.
       *
       * What this costs is that Thor passes Thanos and the Silver Surfer on
       * the way, and both are defensible: he took the full Gauntlet's owner
       * to within one swing, and he and the Surfer have fought to a draw.
       */
      "thor",
      "odin",
      /**
       * THE SURFER UP TO THIRD, from eighth, where he was below FIVE characters
       * he outscores. Mangog claims 59 and sat two places above him; Sentry
       * 126, Surtur 177, the Watcher 220, Zeus 296 -- and Norrin claims 306.
       * Only Thor and Odin were ahead of him on their own records, and they
       * still are.
       *
       * The dossier calls him "the most famous and most powerful herald" and
       * says he wields the Power Cosmic "with more precision than anyone but
       * Galactus himself". Beams that shatter a planet or tint a flower, black
       * holes, cosmic awareness that peels back time, and power negation. The
       * hand-rank was written when the heralds were nine identical three-line
       * records and it never moved after they were rewritten.
       */
      "silver-surfer",
      "surtur",
      "zeus",
      /**
       * THE WATCHER SITS WITH THEM, which is where the sources put him:
       * "power rated comparable to sky-fathers like Odin and Zeus, and
       * collectively to the Celestials". Collectively is the Watchers as a
       * RACE; Uatu alone is a sky-father's peer.
       *
       * He was 68th, in the tier defined by beings who ACT on a cosmic scale
       * -- Galactus devours, Arishem judges, Dormammu rules a dimension --
       * and his defining trait is that he does not. This file already settled
       * that seeing is not doing, when Heimdall was scoring 70 for looking at
       * the nine realms. It applied the rule to the score and never to the
       * tier.
       *
       * Below Odin and Zeus rather than between them: he can hide a planet
       * from Galactus and he has sworn not to, and an oath he keeps for
       * millennia is a fact about what he brings to a fight.
       */
      "the-watcher",
      "sentry",
      /* Shalla-Bal directly behind him, because the two records carry
         IDENTICAL data — same species, same two affiliations — and came out 81
         places apart: Norrin was pinned here by being named, and she floated
         to tier 3 on the "Cosmic entities" affiliation they both hold. Being
         named in a head should never be what decides a character's tier when
         an identical record is not. */
      "shalla-bal",
      "thanos",
      "hela",
      /**
       * ADAM WARLOCK MOVED UP FOURTEEN, from 120th, where he sat below
       * Gladiator, Iceman and Quentin Quire. He carries an INFINITY STONE in
       * his forehead, casts quantum magic without needing it, resists having
       * reality and time bent around him, and returns from every death
       * stronger than he went in. He has briefly worn the Gauntlet.
       *
       * He scores 370, the highest number in this tier, and the hand-rank was
       * the only thing holding him down — written when his record read
       * "Quantum magic / Flight / Reborn from a cocoon" and scored 30.
       *
       * Below Thor and Thanos, above Hercules and the Hulk: the Soul Gem
       * takes what a punch cannot reach.
       */
      "adam-warlock",
      /* HERCULES WAS UNRANKED and therefore placed by score, which landed him
         132nd — below all eight Heralds of Galactus and below Hyperion, on a
         record that says "Strength to match Thor" twenty-six places under
         Thor. Marvel's own handbook has them as near-equals, Herc marginally
         ahead on pure lifting and far behind on range. Adjacent is the honest
         answer and it needs a name in the head to say so. */
      "hercules",
      /* MANGOG DOWN TO HERE, from sixth. He claims 59, the lowest number in
         the top 130, and he was ranked above the Silver Surfer at 306, Thanos
         at 365 and Adam Warlock at 370. He is the hatred of a billion billion
         beings and he is also a creature Thor has put down more than once.
         Below Hercules, who outscores him four to one. */
      "mangog",
      /* Named because their species is a dead end: Bill is a Korbinite and
         Gladiator a Strontian, races of one, so no rule could ever find them.
         Bill carries Stormbreaker and fought Thor to a draw; Gladiator has
         held off the entire X-Men roster. Both were ranked below Cyclops. */
      /**
       * THE OMEGAS WHO BELONG HERE, NAMED — because the class alone was
       * admitting all of them and that put MAGGOTT at 138, ahead of Doctor
       * Strange, Doom and the Maker. His power is two slugs that do his
       * digesting, with no discernible upper limit, and that phrase is a
       * statement about an X-gene rather than about a fight. Omega has never
       * meant "beats a sorcerer"; it means one power nobody has found the top
       * of. Forge invents by instinct and Elixir heals with a touch, and
       * neither of them is walking through Kamar-Taj.
       *
       * The ones listed here move worlds, minds or weather. The rest fall to
       * tier 6 and are ordered there by what their own records claim.
       */
      "storm",
      /* NOT Jean Grey — she is named in tier 4 already, and listing her twice
         put her in the order twice. C28 counted 675 characters in a corpus of
         674 and said so, which is exactly what it is for. */
      "professor-x",
      "magneto",
      /**
       * GHOST RIDER ABOVE THE BRICKS, and this file wrote the reason itself
       * forty lines down before ranking him under every one of them: "his
       * Penance Stare ignores durability entirely, WHICH IS THE ONE THING
       * EVERY BRICK IN THIS TIER RELIES ON." Then he went below the Hulk, Red
       * Hulk and the Maestro, whose whole case is durability.
       *
       * What he did, since Rashid asked twice: he took the throne of Hell from
       * Mephisto, beat Satan, Blackheart and Null, and put a weakened GALACTUS
       * into a coma with the Stare. Zarathos unleashed is written as able to
       * burn the planet. He is not Cosmic Ghost Rider and does not need to be.
       */
      "ghost-rider",
      /**
       * THE HULK MOVED UP PAST THE OMEGAS, from 121st. The base-form rule is
       * why he is not higher still — Savage Hulk is what the corpus holds and
       * World-Breaker is a state he reaches — but that rule explains why he
       * sits below Odin and Thanos. It never explained Quentin Quire, a
       * teenage telepath, and Hope Summers, who copies whatever is nearby,
       * ranked above him.
       *
       * This file's own position on the omega list is that it is not a fight
       * ranking: "Iceman is omega and Wolverine is beta, and nobody thinks
       * Iceman wins that fight." The Hulk sitting below five omegas was that
       * same mistake, unnoticed because it was made inside a ranked head.
       *
       * Xavier and Magneto stay above him, and that is a claim, not an
       * oversight: a telepath and a magnetokinetic both have an answer to a
       * body, and the sources are near-unanimous that they beat him.
       */
      "hulk",
      /* RED HULK BESIDE HIM, because he is the one gamma character who trades
         with Banner rather than trailing him — he fought the Hulk to a
         standstill and put Thor down in his debut. He sat in tier 7 at 308,
         below a curse and a cloud of electricity that he beats. */
      "thaddeus-ross",
      /* MAESTRO BESIDE THE OTHER TWO. `Enhanced human` alone lands in tier 7,
         which is where Songbird is; he is the Hulk a century on, ten times
         stronger than Professor Hulk on a lifetime of absorbed fallout, and
         he kept Banner's intelligence. Below Banner rather than above only
         because Banner beat him in the story that introduced him. */
      "maestro",
      /**
       * THE SUPERMAN-SHAPED BAND MOVES ABOVE THE OMEGAS, which is the same
       * correction the Hulk already got and for the same stated reason. This
       * file's line on the omega list is that it is not a fight ranking:
       * "Iceman is omega and Wolverine is beta, and nobody thinks Iceman wins
       * that fight." Beta Ray Bill fights Thor to a draw and was ranked below
       * Hope Summers. Gladiator has traded blows with Thor and the Hulk and
       * was below Quentin Quire, a teenage telepath.
       *
       * Bill first: he is Thor's equal and carries Stormbreaker. Hyperion is
       * the strength of a small sun. Gladiator is as strong as he is certain.
       * Then the three whose power is worn rather than born, in the order of
       * what they wear: an antimatter reactor, the Quantum Bands, the whole
       * Nova Force.
       */
      /**
       * FOUR COME UP FROM TIER 6, which is the other half of the job and the
       * half I left undone. Gating the two empty Celestials out of tier 5 was
       * only ever going to fix the bottom of the boundary; Rashid pointed out
       * that the top of tier 6 was still stuck under it.
       *
       * Doctor Strange is the SORCERER SUPREME, nullifies another's power
       * inside his own domain and has cosmic awareness at his peak. Ghost
       * Rider took the throne of Hell from Mephisto and his Penance Stare
       * ignores durability entirely, which is the one thing every brick in
       * this tier relies on. Kang makes timelines and dies into a new body.
       * Khonshu is a god who lends an avatar enough to fell the Juggernaut.
       *
       * All four score higher than most of the tier they are joining. They go
       * below the gods and the Hulks and above the flying bricks: none of them
       * out-punches Thor, and all four beat the ones who only punch.
       */
      /**
       * THE STUDENT ABOVE THE TEACHER, reversing what I wrote an hour ago.
       * I had put the Ancient One over Strange because she trained him, and
       * Rashid pointed out that this file already disagrees with itself on
       * that: Thor is ranked above ODIN in the peak list, and Loki, who
       * learned his magic from Frigga, becomes the God of Stories. Being
       * taught by someone is not a ceiling. Surpassing the teacher is the
       * arc, and in Strange's case it is the whole character.
       *
       * DOOM COMES UP WITH THEM, and his was the widest gap on the page. He
       * is PEAK #9 in this corpus -- God Emperor Doom, wearing the power of
       * the Beyonders -- and his base rank was 139th, below a Herald of
       * Galactus. He matches Richards' intellect, has held the Sorcerer
       * Supreme mantle himself, and has beaten Strange.
       */
      "doctor-strange",
      "doctor-doom",
      "the-ancient-one",
      "kang",
      "khonshu",
      "beta-ray-bill",
      "hyperion",
      "gladiator",
      "blue-marvel",
      "quasar",
      "richard-rider",
      "iceman",
      "vulcan",
      "exodus",
      "quentin-quire",
      "hope-summers",
      /**
       * COSMIC POWER WORN BY A HUMAN BODY, which "Enhanced human" and
       * "Artificial being" describe about as well as "mammal" describes a
       * whale. Adam Warlock came out at 295, Quasar at 267, Richard Rider at
       * 405 and Blue Marvel at 474 — a man whose body is an antimatter
       * reactor, ranked below three hundred people.
       *
       * Rider before Sam Alexander deliberately: Rich has carried the entire
       * Nova Force and the Worldmind, and Sam's own record says the helmet
       * does most of it.
       */
    ],
    match: (c) =>
      /**
       * ASGARDIAN, FROST GIANT AND ETERNAL ARE RACES, NOT POWER LEVELS, and
       * treating them as tier-5 admission put Heimdall and Frigga above Doctor
       * Strange, and Valkyrie above Doctor Doom. The Asgardians who belong up
       * here are named in the head — Odin, Thor, Hela — and the rest are
       * warriors, which tier 6 already describes.
       *
       * ELDERS OF THE UNIVERSE STAY. They are not warriors either, but Marvel's
       * own glossary files them with the cosmic beings: survivors of the
       * universe's oldest races, wielding the Power Primordial, older than the
       * gods below them. That is a claim about what they are rather than how
       * they fight, and it is the same claim this tier is making.
       */
      /* TITAN IS A HOMEWORLD, NOT A POWER LEVEL. The rule was written for
         Thanos, who is named in the head above, and his four lieutenants
         inherited it: the whole Black Order came out at 148-154, ahead of
         Doctor Strange, Doom, Apocalypse, Kang and the Ancient One. Strange
         beat Ebony Maw on his own and the Hulkbuster handled Cull Obsidian.
         They are elite soldiers, which is what tier 6 describes. */
      /* ELDERS OF THE UNIVERSE MOVE DOWN, reversing an earlier call. They were
         kept here on Marvel's glossary, which files them with the cosmic
         beings — true of what they ARE, and this tier is read as what someone
         can DO. The Collector and the Grandmaster outranking the Sorcerer
         Supreme is the form that claim took, and it is not one I will defend:
         they are ancient and they are schemers, and Strange beats either. */
      /* "God" GOES THE WAY OF ASGARDIAN AND TITAN, and for the fourth time.
         Two records carry it: Khonshu, already named into tier 6, and Love —
         Gorr's daughter, a god by Eternity's grant, one film old, holding
         Stormbreaker's charge. Ranked 140th, ahead of Valkyrie and every
         sorcerer. A word in a species field is not a feat. The gods who
         belong in this tier are named in its head. */
      /* THE CELESTIALS TIER 3 STOPPED CARRYING LAND HERE — this is the clause
         the note above the gloss is describing. Without it they fell through
         every tier to 8, "humans who turn up anyway", which is a worse error
         than the one the gate was fixing. */
      /* AND THE SAME QUESTION AT THIS BOUNDARY. Rashid opened the 5/6 line
         and the comparison found one thing that cannot be defended under any
         reading: ZGREB THE ASPIRANT, whose record is "Aspires to the Host /
         Not yet fully risen" and scores ZERO, outranked DOCTOR STRANGE. The
         Aspirants sat beside him on the same nothing.

         Hoggoth and Antiphon stay, and that is deliberate rather than an
         oversight: the Vishanti are the gods a Sorcerer Supreme INVOKES, so
         Hoggoth above Strange is arguable, and Antiphon is a Proemial God.
         Scoring low is not the same as claiming nothing. */
      (c.species === "Celestial" && claimScore(c) > 0) ||
      /**
       * AND THE TAIL TAKES THE SAME TEST, which is the half of Rashid's point
       * the promotions do not reach. Hoggoth scores 32 and Antiphon 74, and
       * they were sitting above a tier 6 head where Selene scores 209 and the
       * Maker 189. A species word saying "god" is not a power level, which is
       * the sentence this file has now written five times.
       *
       * The bar is tier 3's bar: one cosmic-scale claim. It moves five, all
       * Elder Gods and Proemial Gods with quiet records, into Alpha class --
       * and leaves the Heralds, who all carry the Power Cosmic, where they
       * are. Tier 5's floor becomes 120.
       */
      (sp(
        "Olympian",
        "Fire demon",
        /* THE LANDING GROUND FOR THE TIER-3 GATE. Tier 3 spells it "Elder
           God" and this list spelled it "Elder god", so the four it stops
           carrying — Gaea, Oshtur, Agamotto, Hoggoth — fell straight past
           this tier into Alpha class, and Antiphon, who has no magic to catch
           him, fell to "humans who turn up anyway". Two words, one capital
           letter, five tiers. */
        "Elder God",
        "Cosmic Being",
        /* "ALIEN DRAGON" MOVED TO TIER 7, because it is one character and he
           is Lockheed — a purple dragon the size of a cat who breathes fire
           and follows Kitty Pryde around. The word was doing the job
           "Celestial" and "Eternal" did before the gate: it sounds like a
           power level and is a species, and a rule with exactly one member is
           a hand-placement wearing a rule's clothes. It put him 133rd, one
           place below Hercules and above every Celestial.

           Deleting it outright sent him to tier 8, "humans who turn up
           anyway", between Nick Fury and Doctor Octopus — the opposite error
           and a worse one. Tier 7's own gloss says "aliens, and anyone whose
           power is bolted on", which is a flying alien who breathes fire
           exactly. */
        "Zenn-Lavian",
        "Elder god",
        /* "Gods" is 28 characters and most of them are Heimdall — a god by
         species and a sentry by job. The ones who belong are named above. */
      )(c) &&
        claimScore(c) >= 120) ||
      aff("Heralds of Galactus")(c),
  },
  {
    n: 6,
    title: "Alpha class",
    gloss:
      "The strongest tier a person can reach without leaving the scale. Sorcerers, alpha mutants, symbiotes, Inhumans — and the ones whose power is a machine.",
    /**
     * THE CORPUS HAS NO FIELD FOR "CONQUERED THE TIMELINE WITH A MACHINE",
     * and this tier is where that shows.
     *
     * Kang came out at 610 of 670, below Hawkeye, because he is `species:
     * Human` with no mutant class, no magic and no affiliation — so every rule
     * above him missed and he fell to "humans who turn up anyway". He Who
     * Remains and Ultron landed the same way. Doom escaped only by accident:
     * he carries `magicSchools`, added months ago for a different argument,
     * and that one field is the whole reason he ranks 194 instead of 600.
     *
     * A ranking that puts the man who rules the multiverse below the man with
     * the bow is not making a judgement, it is reporting a gap in its own
     * inputs. Naming them here is the same hand-placement the ranked heads
     * already use, and it is honest about what it is: technology and time
     * travel are power, and nothing else in this file can see them.
     */
    /**
     * THIS TIER NEEDED A HEAD MORE THAN ANY OTHER, because it is where every
     * notable character who is not a god or a cosmic entity ends up — and
     * alphabetical order inside it kept producing claims. The Ancient One
     * ranked 234th, below Wong's teacher-of-Wong, because her name starts with
     * "The"; Agatha Harkness ranked 164th on the strength of an "A".
     *
     * Ordered by what they have actually done: the Sorcerer Supreme, the woman
     * who taught him and held Dormammu off for centuries, then the two men who
     * beat gods with study, then the first mutant, then the psychics who have
     * emptied minds by the million.
     */
    ranked: [
      /* THE MAKER SITS WITH DOOM, who is the same idea from the other side: an
         intellect that decided it should be in charge. He came out 280th in
         "Enhanced" on `species: Human mutate` — a man whose own record says he
         builds and unbuilds universes, ranked below three hundred people. */
      "the-maker",
      "apocalypse",
      /* A Spirit of Vengeance is not an "Enhanced human", which is where
         `species: Human host` had left him at 289 — behind Blade in kind if
         not in number, and behind two hundred people who can be killed. The
         Penance Stare works on gods, and his own record says the quiet part:
         "Cannot be destroyed". */
      "cassandra-nova",
      "shadow-king",
      /**
       * THREE MOVED, once all thirty-two records finally said what the
       * characters do.
       *
       * JUGGERNAUT WAS 168th, below Sylvie, Magik and Agatha Harkness. He
       * lifts a thousand tons, shatters mountains, tanks blows from the Hulk,
       * needs no air or food or rest, and once moving is not stopped. He sits
       * under the two telepaths who can reach past his helmet and over
       * everyone who would simply have to survive him.
       *
       * INVISIBLE WOMAN WAS 153rd on two bullets. The dossier's phrasing is
       * the consensus one: she is the most powerful of the Fantastic Four.
       * Fields nothing has broken, domes miles across, and the one attack in
       * this tier that kills by expanding inside a skull.
       *
       * RONAN WAS LAST OF THE HEAD. The Universal Weapon makes and unmakes
       * matter at the molecular level, drains a region of energy, and bends
       * gravity and time-motion. That is not a hammer.
       */
      "juggernaut",
      "invisible-woman",
      "selene",
      /* Same family, same fault: a clone of Jean Grey with her telepathy and
         a demon army, stranded at 393 for having no published class. */
      "madelyne-pryor",
      /* Carol goes Binary. Monica becomes any part of the spectrum. Sue is
         the strongest of the Fantastic Four and was ranked last of them, at
         501, because "Invisibility / Force fields" reads small and is not —
         she has held a force field against a Celestial. */
      "captain-marvel",
      /* REED DIRECTLY BEHIND SUE, and both of them in front of the rest of the
         team. He was 283rd while the Maker — the same man with the same powers
         and fewer scruples — sat at 146, which is a gap in willingness rather
         than in capability, and a power ranking should not pay him for
         restraint. He stays behind Sue because she is the strongest of the
         four, which is Rashid's call and the one everyone who reads the comics
         makes. */
      "mister-fantastic",
      "monica-rambeau",
      "sam-alexander",
      "he-who-remains",
      "loki",
      "clea",
      "agatha-harkness",
      "doctor-voodoo",
      "ronan",
      "mister-sinister",
      "ultron",
      "sylvie",
      "magik",
      /* Guards the Nexus of All Realities and cannot be killed by force. */
      "man-thing",
      /* JUGGERNAUT, whose power is not a mutation at all. Cyttorak is a god
         and Cain is what a god does to a man who picks up his gem — which
         puts him with the avatars and the sorcerers rather than in "enhanced"
         at 469, below half the X-Men he walks through. */
      /* An android built around an Infinity Stone is not "enhanced". */
      "vision",
      /**
       * FOUND BY AUDIT RATHER THAN BY BEING ASKED — the same strandings, one
       * layer down. Namor rules an ocean and is routinely argued as one of the
       * strongest mutants alive, and sat at 279. Amadeus Cho took the gamma
       * off Bruce Banner and is Hulk-tier when he uses it. Ronan held an
       * Infinity Stone. America Chavez punches holes between universes. Xorn
       * has a star inside his head.
       */
      "namor",
      "amadeus-cho",
      /* AMERICA CHAVEZ COMES OFF THIS HEAD. I named her here on the strength
         of "punches holes between universes", reading it as reality-scale when
         it is a door — and her own record finishes the thought: "Cannot
         control it yet". Star-powered strength is real and it is not a tier of
         its own; her score can carry her. */
      "xorn",
    ],
    match: (c) =>
      /**
       * "SUPERHUMAN, AND BOUNDED" IS TIER 7's OWN GLOSS, and a healing factor
       * that survives anything is not bounded. Rashid asked why Wolverine and
       * Deadpool sit at 282 and 289: the per-class cap costs Wolverine one of
       * his six bullets, but the real answer was the tier, and the tier was
       * reading `mutantClass` -- beta, so tier 7, whatever the record says.
       *
       * This file already rejected the omega list as a fight ranking, in the
       * note that moved the Hulk above five omegas: "Iceman is omega and
       * Wolverine is beta, and nobody thinks Iceman wins that fight." It
       * rejected the list going UP and kept obeying it going DOWN.
       *
       * So the record is asked instead, and narrowly: a claim that the
       * character cannot be put down at all. Six in tier 7 make it --
       * Wolverine, Deadpool, X-23, She-Hulk, Corvus Glaive, Darwin -- and a
       * score cut would have moved twenty and imported the scorer's noise
       * into the tier structure, which is the thing this file keeps having to
       * undo.
       * ascii-ok: reads `powers[].en`, English by construction.
       */
      /\b(cannot be killed|cannot be destroyed|unkillable|heals? from anything|comes back every time)\b/i.test(
        c.powers.map((x) => x.en).join(" "),
      ) ||
      c.mutantClass === "alpha" ||
      /* An omega nobody named above: still the top of what a mutant reaches,
         still not a god. */
      c.mutantClass === "omega" ||
      (c.magicSchools?.length ?? 0) > 0 ||
      Boolean(c.symbioteClass) ||
      sp(
        "Asgardian",
        "Frost Giant",
        /* THE LANDING GROUND FOR TIER 5's GATE, and the second time this exact
           hole has been dug. Gaea, Oshtur, Agamotto and Hoggoth have magic to
           catch them here; Antiphon does not, and fell straight past into
           "humans who turn up anyway" at 597th. A gate needs a floor under it
           or it is a trapdoor. */
        "Elder God",
        "Cosmic Being",
        /* "Eternal" is gated below, with the Elders and Inhumans. */
        /* "Titan" IS GONE, and nobody lost a tier by it. It was carrying six
           records: Thanos and Starfox, who are Eternals OF Titan and are
           filed that way now, and the four of the Black Order, who are not
           Titanians at all and never were. A homeworld is not a species and
           was doing the work of one. */
        "Demon",
        "Witch",
        "Faltine",
        "Inheritor",
        /* "Inhuman" is gated below, with the Elders, rather than granted here. */
        "Symbiote",
        "Symbiote host",
        "Technarch",
        "Energy being",
        "Cursed being",
        "Mutant island",
        "Artifact",
        "Strontian",
      )(c) ||
      aff("Magic", "Vishanti", "Masters of the Mystic Arts")(c) ||
      /**
       * THE SAME TEST THE CELESTIALS TAKE. Four species words — Celestial,
       * Elder of the Universe, Eternal and Inhuman — were the last class
       * grants big enough to carry a character on ancestry alone, and each
       * was carrying people whose records claim nothing: the Caregiver tends
       * the dying, the Contemplator thinks, Lockjaw is a very large dog,
       * Sprite is a child who tells stories. They sat ABOVE the top of tier
       * 7, where Iron Fist, the Spot and Lila Cheney score 116 to 175.
       *
       * A tier meaning "the strongest a person reaches" should not be entered
       * by a species word alone. The gate does not demote anyone who can do
       * something — it asks the record to say what. Ikaris flies and shoots
       * cosmic beams and stays; Medusa's hair lifts a car once the record
       * says so; the ones who fall are the ones with nothing written down.
       */
      ((c.species === "Elder of the Universe" ||
        c.species === "Eternal" ||
        c.species === "Inhuman" ||
        aff("Elders of the Universe")(c)) &&
        claimScore(c) > 0),
  },
  {
    n: 7,
    title: "Enhanced",
    gloss:
      "Beta and gamma mutants, mutates, super-soldiers, androids, aliens, and anyone whose power is bolted on. Superhuman, and bounded.",
    /* UPLIFTED ANIMALS LOST THE SPECIES GRANT, because it was carrying Lylla,
       Teefs and Floor — whose records list mechanical hands, wheels and spider
       legs, and who score below zero — above Iron Man and the Kingpin. Cosmo
       keeps the tier by name: telepathy and telekinesis are not bolted on. */
    /* AN INTELLIGENCE IS NOT A BODY. "Artificial intelligence" was admitting
       Miss Minutes — a cartoon clock on a screen — and Arnim Zola, a mind on
       magnetic tape, above Iron Man and the Punisher. The two AIs that do act
       on the world are named; the rest fall to tier 8. */
    /* COSMO CAME OFF THIS HEAD. Naming her here pinned her to the TOP of tier
       7 and made a telepathic dog the second-strongest Guardian, ahead of Drax
       and Groot. Her telepathy is real and her own score can carry it.

       "Uplifted raccoon" comes back, and it is Rocket alone: he is
       cybernetically rebuilt and fights for a living, which is not true of the
       otter and the walrus that lost the grant with him. */
    /* STAKAR OGORD IS STARHAWK, which nothing in his record could reach: his
       species reads `Human`, so every rule dropped him into tier 8 with the
       people who have no powers, and he sat 631st -- one place below HOWARD
       STARK, an engineer, and below four civilians whose records I had just
       rewritten. He projects light as force, flies, survives open space and
       remembers every cycle of his own rebirth. Named, the way Beta Ray Bill
       and Gladiator are named a few tiers up, and for the same reason: a
       species of one that no rule will ever find. */
    ranked: ["supreme-intelligence", "mainframe", "stakar-ogord"],
    match: (c) =>
      /* COSMO IS NOT A HUMAN WHO TURNS UP ANYWAY. `Uplifted animal` lost its
         grant because it was carrying Lylla, Teefs and Floor, whose records
         list mechanical hands, wheels and spider legs. Cosmo's now says she
         stops a colliding ship with her mind, and tier 8 means "no powers at
         all". The gate the Celestials, Elders, Eternals and Inhumans take
         separates her from the other three without giving the word back. */
      (c.species === "Uplifted animal" && claimScore(c) > 0) ||
      c.mutantClass !== null ||
      /**
       * ARMOUR IS POWER, and `species: Human` cannot see it. Iron Man came out
       * 574th, War Machine 607th and Ironheart 571st — below Lylla and Teefs,
       * who are an otter and a walrus. The suit has fought Thanos.
       * ascii-ok: reads `powers[].en`, which is English by construction.
       */
      /* Yellowjacket was in this tier and Ant-Man was not, on identical
         technology, because his bullet says "Shrinking armour" and Scott's
         says "Changes size". The rule was reading the writer's word choice.
         Pym particles and a flight rig are equipment the same way armour is.

         AND SO ARE FOUR ARMS WIRED INTO A SPINE. Doctor Octopus was 605th, in
         "humans who turn up anyway, no powers at all", because his species is
         Human -- while this tier's own gloss reads "anyone whose power is
         BOLTED ON", which he is the literal case of. Mysterio's drones and
         Shocker's gauntlets are the same argument. `gauntlets` plural on
         purpose: the singular one is Thanos's.
         ascii-ok: reads `powers[].en`, English by construction. */
      /\b(armour|armor|exoskeleton|repulsor|powered suit|built her own suit|changes size|pym particle|grows and shrinks|flight rig|winged|sp\/\/dr|mech\b|pilots the|mechanical arm|arms that lift|gauntlets\b|glider|illusion technology|drones that)/i.test(
        c.powers.map((x) => x.en).join(" "),
      ) ||
      sp(
        "Mutant",
        "Mutant hybrid",
        "Mutate",
        "Human mutate",
        "Gamma mutate",
        "Enhanced human",
        "Synthezoid",
        "Artificial being",
        "Machine",
        "Cyborg",
        "Clone",
        "Vampire",
        "Dhampir",
        "Werewolf",
        /* The last stop for `species: God`. Khonshu is named into tier 6; the
           only other record carrying the word is Love, who is a child with
           one film, and 190th put her above Wolverine and Captain America. */
        "God",
        "Human hybrid",
        "Human-Kree hybrid",
        "Human host",
        "Human avatar",
        "Empath",
        "Atlantean",
        "Talokanil",
        "Flora colossus",
        "Plant elemental",
        "Alligator",
        "Frog",
        "Sabretooth tiger",
        "Insectivorid",
        "Dark elf",
        "Dwarf",
        "Kronan",
        "Alien dragon",
        /* Where tier 6 sends the Elders and Inhumans whose records are quiet,
           and where tier 5 now sends the two Celestials who claim nothing.
           Tier 8 caught them otherwise, and "humans who turn up anyway" is
           the wrong floor for two thousand feet of living armour however
           little it has done. */
        "Celestial",
        "Elder of the Universe",
        "Eternal",
        "Inhuman",
        "Uplifted raccoon",
        "Alien",
        "Kree",
        "Skrull",
        "Shi'ar",
        "Xandarian",
        "Centaurian",
        "Luphomoid",
        "Zehoberei",
        "Kylosian",
        "Korbinite",
        "Birjian",
        "Mephitisoid",
        "Mojoworlder",
        "Pluvian",
        "Lem",
        "Djinn-blooded",
      )(c),
  },
  {
    n: 8,
    title: "Humans who turn up anyway",
    gloss:
      "No powers at all. A suit, a bow, a plan or a badge — and a place on a team that has all three.",
    /**
     * THE ONES WHO FIGHT FOR A LIVING, ordered, because the scorer cannot tell
     * a fighter from a man who sells weapons. Justin Hammer was 583rd on the
     * strength of an origin paragraph about arms contracts, ahead of Black
     * Widow at 592 and Hawkeye at 601 — two founding Avengers whose bullets
     * are three plain words each. Everett Ross outranked both for "Flies
     * anything", which is a pilot's licence.
     *
     * Nothing in a record distinguishes "trained to kill" from "knows people
     * who are", so this is named rather than derived.
     */
    /**
     * ORDERED BY WHAT THEY CAN DO, not by billing. The first pass put Black
     * Widow and Hawkeye at the top because they are Avengers and Nick Fury
     * third because he runs the place — which is fame, not capability. The
     * Punisher sat SEVENTH, below Kate Bishop, on the strongest record in the
     * group: Marine special forces, weapons mastery, heavy weapons, tactics.
     * He is a one-man army who has killed superhumans, and this is the tier
     * for people who turn up with equipment and training against gods.
     *
     * Fury and Hill fall to the bottom. Both are formidable and neither is a
     * frontline fighter; a director's job is to send other people.
     *
     * The Red Guardian stays directly behind Yelena, which is where Rashid put
     * him — see the note on his own line below.
     */
    ranked: [
      "punisher",
      /* KINGPIN SECOND, and he was not on this list at all — he sat at 589,
         below every one of them, on a record that spent two of its three lines
         on his business interests. He is the one man in the tier who wins by
         being physically larger than the problem: he has beaten Daredevil with
         his hands and taken punishment that would end anyone else here. */
      "kingpin",
      "bullseye",
      "elektra",
      "black-widow",
      "hawkeye",
      "okoye",
      "yelena-belova",
      /**
       * RED GUARDIAN IS PINNED HERE ON PURPOSE, against his own species.
       *
       * He carries the Soviet serum, which is why every rule put him in tier 7
       * at 334 — third on the Thunderbolts chip, ahead of Ghost, Taskmaster
       * and Yelena. Rashid's call, and it is a reading of the character rather
       * than of the file: he is out of shape, twenty years past it, tells the
       * story differently every time and loses most of what he starts. The
       * serum is on the record and the record is right; what he does with it
       * is the thing being ranked.
       */
      "red-guardian",
      "kate-bishop",
      /**
       * THE HEAD GOES TO THIRTY, because twelve was not enough to cover the
       * people the scorer cannot see. Every record in this tier was rewritten
       * first -- sixty-eight of the seventy-eight had three bullets or fewer,
       * which is the least-written corner of the corpus, and no ordering of
       * bad inputs was going to be right.
       *
       * Rewriting them proved the point rather than fixing it. OKOYE CAME OUT
       * AT 101, the highest score in the tier, because a vibranium spear and
       * an army score well; HOWARD STARK at 96 and WILLIAM STRYKER at 95 came
       * second and third, because building weapons and running a programme
       * score the same way. A score sort would open this tier with an
       * engineer and an administrator.
       *
       * And BULLSEYE STILL SCORES 14 with six bullets, because the vocabulary
       * has no word for aim. "Never misses. Not once, with anything" is worth
       * nothing to the scorer and is the whole of what makes him lethal. He is
       * third here on the record and 632nd on the number.
       *
       * So the order is what they bring to a fight they have no powers for:
       * the ones who have killed people who did have powers, then the trained
       * fighters, then the commanders who still get in it, then the ones who
       * send other people. Fury and Hill stay last of the fighters for the
       * reason already given -- a director's job is to send somebody else.
       */
      "crossbones",
      "mbaku",
      "ayo",
      "nakia",
      "aneka",
      "davos",
      "black-cat",
      "silver-sable",
      "ka-zar",
      /* He talked Thanos out of the snap, which is not a fight and is the
         single largest thing anyone in this tier has done. */
      "star-lord-tchalla",
      "peggy-carter",
      "phil-coulson",
      "nick-fury",
      "maria-hill",
      /* THE ONES WHO NEVER THROW A PUNCH AND RUN THE PROBLEM ANYWAY. Zemo
         broke the Avengers with a notebook and no powers at all; Dreykov owns
         an army of assassins he never fights beside; Stryker has a government
         budget; the Mole Man commands things rather than being one. They rank
         below every fighter and above everyone whose plan is smaller. */
      "zemo",
      "dreykov",
      "william-stryker",
      "mole-man",
      "everett-ross",
      "shuri",
    ],
    /* Belonging to an organisation counts. Filing Nick Fury with the aunts and
       reporters was the tell that `category` alone was the wrong test: he is
       "supporting" because he is nobody's protagonist, which says nothing at
       all about whether he turns up to the fight. */
    match: (c) => c.category !== "supporting" || c.affiliation.length > 0,
  },
  {
    n: 9,
    title: "The ones with nothing but nerve",
    gloss:
      "Reporters, aunts, girlfriends, police captains. They have no business in a fight and are in every one of these stories anyway.",
    /* MISS MINUTES IS NAMED HERE BECAUSE NO RULE WOULD PUT HER HERE. Tier 9
       admits `category: supporting` with no affiliation, and she is filed as a
       villain — so she sat at 590, above Cassie Lang, who grows to the size of
       a building, and Peni Parker, who pilots a mech. She is a cartoon clock
       on a screen. Everything she does, she does by talking somebody into it,
       which is exactly what this tier is for. */
    /**
     * ALL FOURTEEN ARE NAMED, and the reason is that the tail could not order
     * them at all: SEVEN OF THEM SCORE EXACTLY MINUS FORTY. May Parker, Stan
     * Lee, Morgan Stark, Michelle Jones, Lylla, Teefs and Floor were sorted by
     * nothing but the order the array happened to be in. A tie is not a
     * ranking, and in a tier of fourteen it was half the tier.
     *
     * THE AXIS IS NOT POWER, because none of them has any and the score knows
     * it -- the numbers run 32 down to -40, and the negatives are the penalty
     * for being `supporting` rather than a measurement of anything. The tier's
     * own gloss states the axis instead: "they have no business in a fight and
     * are in every one of these stories anyway." So they are ordered by WHAT
     * THEY DO WITH NOTHING -- by how much of the story breaks without them.
     *
     *   Christine Palmer  a hard skill, used inside the impossible. She has
     *                     restarted the Sorcerer Supreme's heart on a gurney
     *                     and kept working while the room did not. The only
     *                     person here who saves anyone by training.
     *   Sharon Davis      walked the Witches' Road as a non-witch, was
     *                     "surprisingly handy in the first trial", and the
     *                     second one killed her. This tier's definition
     *                     performed literally, with the price paid.
     *   Miss Minutes      no body and no power, and she moves the people who
     *                     could delete her. Agency with nothing behind it.
     *   Darcy Lewis       a doctorate and a taser, and she has used both on a
     *                     god. The one who says the obvious thing nobody with
     *                     powers had thought of.
     *   Harley Keener     armed Iron Man out of a garage when Iron Man had
     *                     nothing, and was not impressed by him.
     *   Michelle Jones    worked out who he was by watching. Nobody told her.
     *   May Parker        took the villains in, and it killed her. The whole
     *                     of that film's argument is hers.
     *   Morgan Stark      the reason he would not do it, and then the reason
     *                     he did. Four years old and the hinge of the ending.
     *   Ben Parker        one sentence, and it outlives him by sixty years.
     *   Trevor Slattery   nerve of a stupider kind: no idea what he is part
     *                     of, and in the room anyway.
     *   Lylla             the reason Rocket knows what a friend is.
     *   Teefs             wheels he did not ask for, and he stayed.
     *   Floor             one word, used for everything.
     *   Stan Lee          last on purpose. He is outside the story rather than
     *                     beneath it, and he is the reason there is one.
     *
     * `aunt-may` and not `may-parker`: I guessed the id and the guard above
     * caught it, which is the whole reason that guard exists.
     */
    /**
     * SIX COME DOWN FROM TIER 8, and they are the six that tier's own gloss
     * cannot describe: "a suit, a bow, a plan or a badge". A newspaper
     * publisher has none of those. They were in tier 8 because its rule is
     * `category !== "supporting" || affiliation.length > 0`, written to rescue
     * NICK FURY from being filed with the aunts -- and belonging to the Daily
     * Bugle payroll is not the same kind of belonging as running S.H.I.E.L.D.
     *
     * They were also unorderable there. All six scored exactly MINUS FORTY and
     * still do: they have no bullet the scorer can read, because "runs the
     * newsroom" and "never prints a retraction" are not powers and enriching
     * them further would only be padding. The tier 9 axis does not need the
     * scorer, which is the point of it.
     *
     * The original fourteen keep their order exactly. This is an insertion,
     * not a re-ranking.
     */
    ranked: [
      "christine-palmer",
      "sharon-davis",
      "miss-minutes",
      "darcy-lewis",
      /* BESIDE DARCY, because they are the same two scientists out of the same
         films and the boundary was splitting them: she had no affiliation and
         landed here, he had one and closed tier 8. He models the Bifrost and
         she says the obvious thing, and neither of them is carrying a badge. */
      "erik-selvig",
      /* He built most of what the TVA runs on, wrote its handbook, and
         understands the Loom. The most capable person in this tier by a
         distance, and he explains time with a cake. */
      "ouroboros",
      "harley-keener",
      /* THE ONE CIVILIAN HERE WHO MAKES SUPERVILLAINS. He funded the Scorpion,
         printed the story that outed Peter Parker, and has never run a
         correction. Nobody else in this tier changes as many outcomes, and he
         does all of it with a printing press. */
      "j-jonah-jameson",
      "michelle-jones",
      "mary-jane-watson",
      /* The man who said no to the one above him for forty years, knew, and
         printed nothing. */
      "robbie-robertson",
      "aunt-may",
      "morgan-stark",
      "ben-parker",
      "glory-grant",
      "randy-robertson",
      "trevor-slattery",
      "lylla",
      "teefs",
      "floor",
      "stan-lee",
    ],
    match: () => true,
  },
];

/**
 * PEAK FORMS — docs/POWER-TIERS-PEAK.md, a second and different question.
 *
 * The tiers above ask "how strong is this character when you meet them". This
 * asks "how strong have they ever been", which reorders the top violently and
 * barely touches the bottom: Thanos picks up the Gauntlet, Thor becomes Rune
 * King, Jean becomes the White Phoenix, and a man with a bow is still a man
 * with a bow.
 *
 * THAT ASYMMETRY IS THE POINT, and it is why this is a separate head over the
 * same derived tail rather than a whole second ranking. A "peak" list that
 * reorders all 670 is claiming a peak feat for 600 characters who do not have
 * one.
 *
 * The two hardest calls, both stated rather than hidden:
 *
 *   GOD EMPEROR DOOM ABOVE THE LIVING TRIBUNAL. Doom held the power of a
 *   thousand Beyonders, murdered a Phoenix-powered Cyclops and beat an
 *   Infinity Gauntlet. The Beyonders as a race killed the Tribunal, so the
 *   power that killed it ranks above it. Reasonable people put the Tribunal
 *   first because its office is permanent and Doom's throne was borrowed.
 *
 *   A CHARACTER'S PEAK IS WHAT THEY WIELDED, NOT WHAT RODE THEM. Jean's
 *   White Phoenix counts because she mastered the Force; Wanda's chaos magic
 *   counts because she casts it. The Hulk as a vessel for the One Below All
 *   does NOT, and he is ranked as the Breaker of Worlds instead — otherwise
 *   the rule proves too much, since Xavier would be ranked as Onslaught and
 *   half this list would collapse into the four entities doing the riding,
 *   each of which already has its own record here.
 *
 *   GALACTUS ABOVE KNULL. Both have killed Celestials, and the sources that
 *   compare them directly give Galactus the higher raw output. Knull's edge is
 *   a weapon rather than a power.
 */
export const PEAK_HEAD: string[] = [
  "the-one-above-all",
  "the-one-below-all",
  "the-fulcrum",
  "first-firmament",
  "the-beyonders",
  "molecule-man",
  "the-beyonder",
  /* Thanos moved up on the Heart of the Universe, which the sources call a
     FRAGMENT OF THE ONE ABOVE ALL'S OWN POWER — a higher ceiling than the
     Infinity Gauntlet he is usually ranked on, and higher than God Emperor
     Doom, whose thousand Beyonders were borrowed and lost. */
  "thanos",
  "doctor-doom",
  /* FRANKLIN AHEAD OF WARLOCK, which is the one place I disagree with the
     26-name draft. Warlock's peak is the Infinity Gauntlet — the same object
     Thanos is already ranked on two places above — and ranking two characters
     on one borrowed artifact stacks the list with the artifact rather than
     with them. Franklin's ceiling is his own, and he beat God Emperor Doom. */
  "franklin-richards",
  "adam-warlock",
  "the-living-tribunal",
  "protege",
  "master-weaver",
  "great-web",
  "eternity",
  "infinity",
  "oblivion",
  "death",
  "queen-of-nevers",
  "chaos-king",
  "master-order",
  "lord-chaos",
  "the-in-betweener",
  "powers-that-be",
  "natural-order",
  "nemesis",
  "abraxas",
  "griever",
  "phoenix",
  "jean-grey",
  /* Echo has hosted the Phoenix Force, which is a PEAK claim and not a base
     one: her own power is mimicry and her base rank reflects that. A host is a
     host, and this list is where hosting counts. */
  "echo",
  "scarlet-witch",
  "legion",
  "onslaught",
  "galactus",
  "knull",
  "thor",
  /* Hulk above Odin, per Rashid. Ranked as the Breaker of Worlds — see the
     note on One-Below-All in the comment above PEAK_HEAD. */
  "hulk",
  "gorr",
  "odin",
  "surtur",
  "silver-surfer",
  "doctor-strange",
  "sentry",
  "captain-universe",
  /**
   * LOKI MOVED UP THIRTEEN, from below Hercules and Hela.
   *
   * Two peaks, and the list was pricing neither. The God of Stories rewrote
   * himself into the narrative of reality, and the Loki at the end of the
   * second season sits at the End of Time holding EVERY BRANCH of the
   * multiverse together — not the one pruned line He Who Remains kept, but
   * all of them, as the load-bearing structure.
   *
   * Above the dimension-rulers on that: Mephisto, Dormammu and Cyttorak each
   * hold one realm, and Hela one death. Below Galactus and Knull, who make
   * and unmake rather than sustain, and below the Uni-Power directly above
   * him, which acts.
   */
  "loki",
  "the-progenitor",
  "arishem",
  "exitar",
  "chthon",
  "shuma-gorath",
  "cyttorak",
  "dormammu",
  "mephisto",
  "zeus",
  "hercules",
  "apocalypse",
  "cosmic-ghost-rider",
  "hela",

  "ghost-rider",
  "professor-x",
  /* Binary above Magneto: Carol at her peak is channelling a white hole,
     which is a larger claim than magnetism however well it is used. */
  "captain-marvel",
  "magneto",
  "iceman",
  "kang",
];

/**
 * WHAT A RECORD SAYS IT CAN DO — the within-tier order.
 *
 * Alphabetical was the placeholder and it kept making claims: Alligator Loki
 * ahead of President Loki, the Ancient One at 234 for starting with "The".
 * Inside a tier the honest answer is not "we don't know" — the corpus has been
 * telling us all along, in the three power bullets and the origin paragraph
 * every character carries. Alligator Loki's read "Is an alligator / Wears the
 * horns / Nobody checks". Classic Loki's read "Illusions on an enormous
 * scale". That is the difference, written down, and nothing was reading it.
 *
 * So each record is scored on the SCALE of what it claims, plus what the
 * structured fields already know. Bigger scale sorts first; the name breaks
 * exact ties so the order stays stable.
 *
 * THIS IS A HEURISTIC AND IT IS BOUNDED BY THE TIER. It cannot move anyone
 * across a tier boundary, and it never overrides a hand-ranked head — it only
 * decides the part that was previously alphabetical, where the alternative is
 * the alphabet. Where it is obviously wrong for a specific pair, OUTRANKS
 * still wins.
 */
/* ascii-ok: every pattern here is matched against `powers[].en` and
   `origin.en` — the ENGLISH text, which is Latin by construction. The Arabic
   fields are never scored, so \b behaving as ASCII-only is correct rather
   than merely tolerable. */
const SCALE: [RegExp, number][] = [
  /**
   * AN OPEN-ENDED CLAIM IS THE BIGGEST CLAIM A RECORD CAN MAKE, and it was
   * worth nothing. Jean Grey's bullets read "Telepathy / Telekinesis / No
   * known upper limit" and scored 28 — telepathy and telekinesis and then
   * silence on the sentence that matters. Thirteen records say something of
   * this kind and none of them were heard.
   *
   * Deliberately below world-scale rather than above it: "no upper limit" is
   * a writer declining to name a ceiling, which is a weaker statement than
   * "moves planets", where somebody has.
   * ascii-ok: English `powers[].en` only.
   */
  // ascii-ok: English `powers[].en` only.
  [
    /\b(no known upper limit|no upper limit|without limit|limitless|beyond measure|grows without limit)/i,
    60,
  ],
  /* Unkillable is durability, not output — real, and worth less. */
  // ascii-ok: English only.
  [
    /\b(cannot be killed|cannot be destroyed|unkillable|did not stay dead|will not stay dead|comes back\b|adapts to anything|rebuilds himself|reassembles|comes back from)/i,
    25,
  ],
  /* Reality itself. ascii-ok: scores English `powers[].en` only. */
  [
    /\b(realit|universe|universal|multiverse|cosmos|cosmic|existence|creation|omnipot|omniscien|embodies|embodiment|personif|timeline|time itself|time travel|manipulates time|stops time|rewinds time|controls time|all things|infinit)/i,
    120,
  ],
  /* Worlds and stars. "antimatter" is here rather than with the ordinary
     superhuman words because it is not an ordinary superhuman word: Blue
     Marvel's body is an antimatter reactor and the reaction is repeatedly
     written as planet-ending. ascii-ok: English only. */
  [
    /\b(planets?\b|planetary|worlds?\b|stars?\b|suns?\b|galax|continent|ocean|weather|storms?\b|nine realms|devour|antimatter|anti-matter)/i,
    70,
  ],
  /* An Infinity Stone is a piece of the universe. ascii-ok: English only. */
  [
    /\b(infinity stone|mind stone|power stone|reality stone|soul stone|time stone|space stone|infinity gem)/i,
    40,
  ],
  /**
   * "STRENGTH TO MATCH X" IS A FIVE-RECORD IDIOM in this corpus and the
   * scorer read none of it — Hercules, Stunner, Xemnu, the Absorbing Man and
   * Frenzy all measure themselves against a named powerhouse, and all five
   * were scored for the bare word "strength". Matching Thor is a larger claim
   * than having strength, and this is the difference.
   * ascii-ok: English `powers[].en` only.
   */
  /**
   * INTELLIGENCE IS A POWER, AND IT WAS FILED UNDER EQUIPMENT. `genius`,
   * `scientist`, `engineer`, `inventor` and `brilliant` all sat in the
   * training band at SIX — the same as owning a sword — so "The smartest man
   * alive" was worth exactly what "marksman" is worth.
   *
   * The incoherence showed as an asymmetry: Doom and Mister Fantastic are
   * hand-ranked into tier 6, so their minds never had to be scored at all,
   * while Iron Man is placed by his record and was paid six points for being
   * a genius engineer. The corpus was treating intelligence as a power when
   * it ranked two of them and as a hobby when it scored the third.
   *
   * Only the SUPERLATIVE moves, the same rule the fighters got: being a
   * scientist is training, being the smartest man alive is not. Reed builds
   * gates between universes with it and Tony builds a suit in a cave.
   * ascii-ok: English `powers[].en` only.
   */
  [
    /\b(smartest|super[- ]genius|greatest mind|invents? (his|her|their) way out|invents? any|builds? anything)/i,
    25,
  ],
  /**
   * AND SO IS A FULL HEALING FACTOR. "Heals fast" and "Heals from anything"
   * scored the same fourteen, which is how Captain America — who in the
   * sources has NO healing factor, only a serum that speeds recovery — came
   * out above Deadpool, who cannot be killed. Regrowing from nothing is a
   * different claim from bruising less.
   * ascii-ok: English `powers[].en` only.
   */
  [
    /\b(heals? from anything|regrows? (lost )?(limbs?|organs?)|regenerates? from|survives? decapitation)/i,
    25,
  ],
  /* The Hercules idiom. ascii-ok: English `powers[].en` only. */
  [/\bstrength to match\b/i, 25],
  /* AND THE OTHER HALF OF THE SAME IDIOM. "Strength to match" was added for
     Hercules; "Rivals Galactus and Dormammu" and "Stronger than Oshtur and
     Hoggoth both" are Agamotto measuring himself the same way and scoring
     nothing for it, because the scorer reads no names. `rivals` and not
     `rival`, or it pays Justin Hammer for being a rival contractor.
     ascii-ok: English `powers[].en` only. */
  [
    /\b(rivals|holds? (his|her|its) own against|a match for|stronger than|as strong as|far exceeds?|exceeds?|surpass|outclass)\b/i,
    25,
  ],
  /**
   * Gods, ages, souls.
   *
   * `hell\b` NEVER MATCHED "HELLFIRE", which is how every character whose
   * power is literally hellfire came to score nothing for it: Daimon Helstrom
   * ("Hellfire in the blood") finished on zero, Demogoblin on 2, and Ghost
   * Rider's own first bullet was worth nothing to him. A word boundary after
   * "hell" excludes the compound that every one of them actually uses.
   * ascii-ok: English only.
   */
  [
    /\b(god|divine|immortal|ageless|millenni|thousand years|eternal|resurrect|soul|underworld|hellfire|hellmark|hell\b|death|penance stare)/i,
    40,
  ],
  /**
   * A VERB OF DESTRUCTION, which this vocabulary did not have. It could read
   * the NOUN a power reaches — "city" scored 25 as a place with an army in it
   * — and had no way to tell holding a city from levelling one. Black Bolt's
   * record reads "A whisper levels a city" and scored 39, below Triton, who
   * breathes water.
   *
   * Weighted with the armies rather than with strength, because destroying is
   * an act on a scale and the scale word beside it is already being read: the
   * two compound, which is the correct shape. A scream that shatters is worth
   * less than a scream that shatters a planet, and now it is.
   * ascii-ok: English `powers[].en` only.
   */
  [
    /\b(levels?\s+(a|an|the)|razes|flattens|annihilat|obliterat|vaporiz|wipes out|shatters|tears apart|destroys|destroy\b|destroying|destruction)/i,
    25,
  ],
  /**
   * MIND CONTROL, which scored ZERO. "telepath" was in the vocabulary and
   * "controls minds" was not, so Druig — who ends wars with a word and turned
   * a whole city on itself — scored 6, entirely from his origin line, and
   * ranked below Karnak. Taking someone's will is not a lesser power than
   * reading their thoughts.
   *
   * Anchored to the mind on purpose. A bare /control/ would have scored
   * America Chavez for "Cannot control it yet", which is the opposite claim.
   * ascii-ok: English `powers[].en` only.
   */
  [
    /\b(mind control|controls? minds?|controls? (anyone|anybody|people|a crowd)|takes? (a|the|over a) mind\b|bends? .{0,20}\bwill\b|possesses a body)/i,
    25,
  ],
  /**
   * COMMAND OVER THE ELEMENTS, which put Crystal on 14 — the same as flight —
   * for "Controls the elements / Earth, air, fire, water". Written as the
   * command rather than the noun on purpose: a bare /element/ would have paid
   * Star-Lord for his element blasters, which are guns, and a bare /earth/
   * would have paid the nine records that just mean the planet.
   * ascii-ok: English `powers[].en` only.
   */
  [/\b(controls the elements|elemental control|any element)/i, 25],
  /* A BUBBLE OF STOPPED TIME IS NOT CONTROL OF TIME. Putting "freezes time"
     with the reality words paid Tempus the full 120 and moved her to 282nd,
     above Wolverine and Captain America, for a localised defensive power. It
     is scope, not authorship, which is what this band is for.
     ascii-ok: English `powers[].en` only. */
  [/\bfreezes? time/i, 25],
  /* Armies, cities, dimensions. ascii-ok: English only. */
  [
    /\b(army|armies|legion|horde|city|dimension|portal|realm|kingdom|throne|conquer|rules?\b|commands\b)/i,
    25,
  ],
  /**
   * ORDINARY SUPERHUMAN — and this list read NOUNS, not VERBS, which is why
   * fifty-nine characters in tier 7 scored exactly zero while their records
   * described real powers. "Telepathy" was in it and "Possesses another's
   * body" was not. "Shapeshift" was in it and "Becomes a wolf", "Becomes
   * sand", "Turns into a shark" were not. Silk spins silk from her fingers,
   * Kilgrave says a thing and it is done, Jane Foster wields Mjolnir, and the
   * scorer read all three as nothing.
   *
   * The bias was invisible because the words that WERE here are the ones a
   * handbook uses. A record written like a sentence rather than a stat block
   * paid for it.
   *
   * THE SAME BIAS IN MINIATURE: the stems were "healing" and "flight", the
   * NOUNS, so forty-seven bullets across the corpus said "Heals from
   * anything" or "Flies faster than sound" and were read as nothing.
   * Wolverine, Deadpool, Thor and Captain America all list regeneration in a
   * verb and none of them was paid for it. Two bullets now over-score
   * slightly — Beak "Cannot really fly" and Jessica Jones "Leaps rather than
   * flies" — which is the cheaper error at fourteen points apiece.
   * ascii-ok: English only.
   */
  [
    /\b(strength|durab|regenerat|healing|heals\b|heal\b|powered armou?r|armou?r-borne|flies\b|flying\b|telepath|ignites|combust|disintegrat|pulls? things apart|pulls? apart|rips? apart|remotely|technopath|drives any|rebuilds any|any vehicle|tattoo|formula|animals?\b|beasts?\b|split in two|splits? into|rebuilt as a machine|a living machine|telekine|psychic|energy|matter|magic|sorcer|witchcraft|witches|hex\b|coven|astral|spectrum|illusion|teleport|becomes? (a |an |the )?[a-z]|mjolnir|stormbreaker|spider[- ]powers|plasma|regrow|living rock|body of living|stone or steel|plated in steel|swaps? bodies|swaps? minds|physiolog|turns? into|copies|mimics?|duplicat|clones?\b|possess|silk|web-line|web-shooter|webbing|webs\b|poison|toxin|venomous|enormous size|giant|embiggen|grows to|constructs?\b|shakes the ground|earthquake|seismic|tremor|stretch|pheromone|\bgas\b|vibrat|absorbs?\b|shapeshift|flight|speed|claws|symbiote|venom|gamma|adamantium|wall-craw|spider-sense|agility|reflex|senses|invisib|force field|flame|fire|heat|burn|frost|ice|lightning|thunder|electric|discharge|acid|sonic|radiation|invulnerab|rock body|phases?|enhanced|\btons?\b|the herb|super-soldier|serum|changes size|shrink|pym particle|mechanical arm|tentacle|cybernetic|prosthe|adamantium armour|goblin gear|illusion technology|density|intangib|beam|blast|solar|laser|stingers|ten rings|shockwave|darkforce|lightforce|indestructible|dagger|cuts anything|cuts through anything|adapts? to|chi\b|bulletproof|unbreakable|acrobat|empath|puts anyone to sleep|feels what you feel|nearly unkillable|drains?\b|siphons?\b|life force|life energy|magnetis|magnetic|magnetokine|psychometr)/i,
    14,
  ],
  /**
   * THE SUPERLATIVE OF A SKILL IS NOT THE SKILL. "Trained" and "master" scored
   * 6 and there was no way to say BEST — so Thena, unmatched as a fighter
   * among a people seven thousand years old, was scored the same as anyone who
   * had been to a dojo. Weighted with the powers rather than the training,
   * because that is the claim being made.
   *
   * `warrior` is deliberately absent: it caught "Gathered the Web Warriors"
   * and "Leads Talokan's warriors", which are rosters, not fighting.
   * ascii-ok: English `powers[].en` only.
   */
  /* `strongest`, `toughest` and `fastest` belong with `greatest` and
     `finest` and were simply missing. Cull Obsidian's own record says "The
     strongest of the Black Order" and he was ranking LAST of the four;
     Gilgamesh says "The strongest Eternal" and was paid nothing for it.
     ascii-ok: English `powers[].en` only. */
  [
    /\b(unmatched|greatest|deadliest|peerless|finest|strongest|toughest|fastest|most powerful|mightiest)\b/i,
    14,
  ],
  /* Training and equipment. ascii-ok: English only. */
  [
    /\b(sword|blade|marksman|master|expert|trained|tactic|genius|strateg|armour|armor|suit|gun|bow|training|weapons?|arsenal|combat|spear|staff|axe|hammer|shield|knife|sai|fists|chains|soldier|marine|military|sniper|assassin|agent|espionage|intelligence|physicist|scientist|engineer|inventor|brilliant|surgeon|doctor|cia\b|operative|counter terror|pilot|deputy director)/i,
    6,
  ],
];

const CLASS_WEIGHT: Record<string, number> = {
  omega: 90,
  alpha: 45,
  beta: 20,
  gamma: 20,
  delta: 10,
  epsilon: 4,
};
const SYMBIOTE_WEIGHT: Record<string, number> = {
  gestalt: 45,
  ancient: 40,
  lineage: 25,
  spawn: 18,
  anomaly: 18,
};

/**
 * ABILITIES COUNT FULLY, THE ORIGIN PARAGRAPH COUNTS A LITTLE.
 *
 * Scoring both equally put Spider-UK, Spider-Byte and Nocturne at the top of
 * their tier, because their origins all mention the multiverse — they TRAVEL
 * between realities, which the pattern cannot tell from bending one. The three
 * power bullets are a deliberate claim about what someone can do; the origin
 * is prose, and prose mentions big things in passing.
 */
/**
 * AN ORGANISATION NAMED AFTER A BIG THING IS NOT A BIG THING. Alexander
 * Pierce scored 70 — full world-scale — for "Runs the World Security Council",
 * which is a committee. Scrubbed before scoring rather than weakened in the
 * pattern, because "world" is doing real work elsewhere: Galactus devours them
 * and Shalla-Bal finds the next one.
 */
/* Phrases that contain a scoring word but do not mean it. "Infinity
   Gauntlet" is an OBJECT — it was paying Mistress Love and Sire Hate the full
   reality-class 120 for having been mustered against Thanos, which is a thing
   that happened to them rather than a thing they do. The Infinity STONES keep
   their own pattern and their own 40.

   "INFINITY FORMULA" IS THE SAME TRAP with a different noun. It is the serum
   that slowed Nick Fury's ageing -- a man with an eyepatch and a handgun --
   and it was paying him 134 of his 186 points, more than Zeus scores for
   being Zeus. The word "Infinity" is doing all of it and none of it is his.

   "MAGNETIC TAPE" is Arnim Zola's brain, stored on a reel. The vocabulary
   learned magnetism for Magneto's sake and immediately paid a Nazi geneticist
   for the storage medium his mind is written on. The pattern itself is
   `magnetis|magnetic|magnetokine` rather than a bare `magnet`, because that
   matched the NAME -- Frenzy was scoring for "Fought for Magneto first".

   "ROCK STAR" is Lila Cheney's day job. `rock` is in the vocabulary for
   Rockslide and Onyxx, who are made of it, and it was paying an intergalactic
   singer SEVENTY POINTS -- more than a third of her total -- for owning a
   guitar. Found only because rewriting her record made the score DROP and the
   drop turned out to be correct.

   IT WAS NOT ONLY HER. "Basketball star first" was paying SPIDER-GIRL seventy
   points, on a three-bullet record, for having been good at a sport. So the
   pattern generalised from `rock star` to the celebrity senses of the word,
   and `star` still scores everywhere it means the burning kind -- Starhawk
   projects light, Galactus consumes stars.

   "ELDER OF THE UNIVERSE" IS A JOB TITLE, and it was being read as a claim to
   command the universe: 160 points, which made THE JUDICATOR -- the Elder
   whose own dossier says his documented feats are thin -- outscore the
   Collector three to one on a shorter record. The Collector's own line reads
   "An Elder, among the first to evolve" and scores nothing, which is the
   correct treatment of both.
   ascii-ok: English `powers[].en` only. */
const PROPER_NOUNS =
  /world security council|nexus of all realities|infinity gauntlet|infinity formula|magnetic tape|(?:rock|pop|film|movie|basketball|sports?|reality|tv) star|elders? of the universe/gi;

export function scaleScore(c: Character): number {
  /**
   * EACH DISTINCT POWER COUNTS, up to three per class. Scoring a class once
   * made "Proportionate strength / Wall-crawling / Spider-sense" worth exactly
   * as much as "Enhanced strength" alone, so Spider-Man ranked 61 places below
   * the Winter Soldier. A character with three different abilities has three
   * different abilities; the cap stops a florid paragraph outscoring a god.
   */
  const score = (text: string) =>
    SCALE.reduce((n, [re, w]) => {
      const hits = [...text.matchAll(new RegExp(re.source, "gi"))].length;
      return n + w * Math.min(hits, 3);
    }, 0);
  const clean = (x: string) => x.replace(PROPER_NOUNS, " ");
  /**
   * SEEING IS NOT DOING, and the scorer could not tell them apart. Heimdall's
   * "Sees the nine realms" scored a full 70 — world-scale, the same as moving
   * planets — for looking at them, and the Watcher's "Sees every timeline"
   * scored 120 for a being sworn never to act. Madame Web, Blindfold and
   * Karnak were all being paid for perception.
   *
   * So each bullet is scored on its own and a bullet that opens with a verb of
   * PERCEPTION keeps a quarter of what it earns. A quarter rather than zero
   * because knowing is worth something: Karnak sees the flaw and then hits it.
   */
  // ascii-ok: matched against `powers[].en`, English by construction.
  const PERCEIVES = /^(sees|watches|observes|reads|senses|knows)\b/i;
  /**
   * TRAVEL IS NOT CONTROL, and the reality pattern could not tell them apart.
   * "Punches holes between universes" scored the full 120 — the same as
   * rewriting one — so America Chavez, whose own record adds "Cannot control
   * it yet", outranked every sorcerer on the page. Spider-UK led the
   * Spider-Society on the same word. A door to somewhere is worth half of
   * being able to change what is on the other side.
   *
   * IT ONLY KNEW ONE PHRASING, which is how the Inheritors got in. All eight
   * of them carry the identical bullet "Crosses realities to hunt" — travel,
   * plainly — and the pattern was looking for "between realities", so each
   * scored the full 120 for a door and outranked Wiccan, Krakoa, Emma Frost,
   * Psylocke and Black Bolt. They are Spider-Man villains who hunt across the
   * web, not reality-warpers.
   * ascii-ok: matched against `powers[].en`, English by construction.
   */
  const TRAVELS =
    /\b(between (universes|realities|dimensions|worlds)|walks between|steps between|moves between|travels between|slips between|crosses (realities|universes|dimensions|worlds|interstellar)|portals?)\b/i;
  /**
   * A WEAKNESS IS NOT A POWER, and the scorer had no idea. This is the third
   * time the same shape of bug has turned up — seeing is not doing, travel is
   * not control, and now being hurt is not being able.
   *
   * It surfaced on the symbiotes. Not one of their records named the fire and
   * sound that famously tear them apart, and yet Dylan Brock's record says
   * "Fire and sound do not touch him" — the corpus stating the EXCEPTION to a
   * rule it never states. Writing the rule in exposed the scoring hole: "Fire
   * and sound tear it apart" contains two power words and would have PAID
   * every symbiote fourteen points for its own vulnerability.
   *
   * Zero rather than a discount, unlike perception and travel, because those
   * two are worth something and this is worth nothing. "Cannot be held" is
   * deliberately absent: it is Hydro-Man being ungraspable and Proteus
   * burning out his host, the same four words meaning opposite things.
   * ascii-ok: matched against `powers[].en`, English by construction.
   */
  const LIMITS =
    /^(cannot survive|cannot control|cannot speak)|\b(vulnerable to|tears? (it|him|her|them) apart|weakens? (him|her|it|for it)|overheats|spent for hours)/i;
  const abilities = c.powers
    .map((p) => clean(p.en).trim())
    .reduce(
      /* A quarter, the same discount perception takes, and for the same
         reason: neither one alters the thing it reaches. Half left America
         Chavez at 286 on "Punches holes between universes" — sixty points for
         a door, more than Spider-Man's entire power set — while her own record
         finishes the sentence with "Cannot control it yet". */
      (n, b) =>
        n +
        (LIMITS.test(b)
          ? 0
          : score(b) * (PERCEIVES.test(b) || TRAVELS.test(b) ? 0.25 : 1)),
      0,
    );
  let n = abilities + score(clean(c.origin.en)) / 4;
  n += CLASS_WEIGHT[c.mutantClass ?? ""] ?? 0;
  n += SYMBIOTE_WEIGHT[c.symbioteClass ?? ""] ?? 0;
  /**
   * THE SUPPORTING PENALTY ONLY APPLIES TO THE POWERLESS, which it did not,
   * and Wong paid for it: "Sorcery / Keeper of the library" scored 14 and then
   * lost 40 for being `category: supporting`, finishing on -20 — behind
   * ALLIGATOR LOKI, who scores zero and is an alligator.
   *
   * `supporting` means nobody's protagonist. It is the same field that put
   * Nick Fury among the bystanders, and it says nothing about whether someone
   * has powers. So it now costs nothing to anyone whose ABILITIES scored:
   * Ben Parker and Darcy Lewis still pay it, because theirs is zero.
   */
  /* AND NOT TO ANYONE THE CORPUS SAYS HAS POWERS IN A FIELD. The Centivars
     carry `magicSchools: ["eldritch"]` and three bullets that name no spell,
     so they scored zero, took the full penalty and finished on MINUS FORTY —
     the floor of the corpus, below characters with no powers at all. The
     `abilities === 0` guard was already the right idea; it was only reading
     the prose. A structured field asserting magic is the same assertion. */
  /* AND NOT TO THE ABSTRACTS EITHER. `category: supporting` means nobody's
     protagonist, and Death, Infinity, Eon, Logos, Kubik, the Preordained and
     the Master Weaver all carry it — so the penalty written for Aunt May was
     landing on a being who embodies all ending. Their ranks are fixed by the
     tier heads, which is the only reason it never showed. A species naming an
     abstract or a cosmic office is the corpus asserting enormous power in a
     structured field, the same argument the magic schools make. */
  const COSMIC = new Set([
    "Abstract Entity",
    "Abstract entity",
    "Cosmic Being",
    "Cosmic entity",
    "Cosmic Force",
    "Celestial",
    "Elder God",
    "Elder god",
    "Elder of the Universe",
    "Watcher",
    "Psychic Entity",
    "Symbiote god",
  ]);
  const recorded =
    Boolean(c.magicSchools?.length || c.mutantClass || c.symbioteClass) ||
    COSMIC.has(c.species ?? "");
  if (c.category === "supporting" && abilities === 0 && !recorded) n -= 40;
  return n;
}

/**
 * WHAT THE RECORD ITSELF CLAIMS — the number the class gates ask for.
 *
 * The gates were written as `scaleScore(c) > 0`, meaning "the record has to
 * say something". That was never quite what they measured: scaleScore also
 * carries the mutant-class weight and the supporting penalty, so a change to
 * either MOVES CHARACTERS BETWEEN TIERS without anyone touching a tier.
 *
 * It happened. Exempting the abstracts from the powerless penalty lifted four
 * Celestials from minus twenty-two to plus eighteen, which silently carried
 * Devron, Gammenon, Ziran and Scathan back through the tier-3 gate they had
 * been placed outside of. The outcome was defensible — those four have real
 * offices and Zgreb, who has none, correctly stayed out — but it was luck,
 * not design.
 *
 * So the gates read this instead: the abilities alone, with no penalty and no
 * class weight, which is exactly the question the gates are asking.
 */
export function claimScore(c: Character): number {
  const bare = {
    ...c,
    category: "hero" as const,
    mutantClass: null,
    symbioteClass: null,
  };
  return scaleScore(bare as Character);
}

/**
 * WHEN THE ALPHABET MAKES A CLAIM — the one escape hatch from alphabetical.
 *
 * Inside a tier the order is alphabetical and is meant to mean nothing. That
 * holds right up until two characters share a name, and then it means
 * something loudly and wrongly: the six Loki variants are all Frost Giants, so
 * they all land in tier 5, and the alphabet handed the tier to BOASTFUL LOKI —
 * whose entire character is that he lies about feats he never performed — at
 * 123, with Kid Loki at 136 and Loki himself at 139.
 *
 * Nobody reading the sort would take that as "we don't know". They would take
 * it as the site claiming a child beats the god he is a copy of.
 *
 * A general rule was tried first and does not work: the corpus HAS variant
 * edges, but they are symmetric, so nothing marks which one is the original —
 * and "a variant never outranks its base" is false anyway, since Onslaught
 * came out of Professor X and the Cosmic Ghost Rider out of the Punisher, and
 * both dwarf what they came from.
 *
 * So: an explicit order, applied to the slots those characters already hold.
 * Everyone else keeps their position exactly. A group must sit in ONE tier,
 * because reordering across a tier boundary would make rank contradict tier,
 * which is the thing C28 exists to prevent.
 */
export const OUTRANKS: string[][] = [
  /* TWO GROUPS, NOT ONE, and the tier guard is what found that. Loki and
     Sylvie carry the "Gods" affiliation and stay in tier 5; the lesser
     variants carry nothing and fall to 6 — which is the correct answer and
     not one I would have thought to write.

     The god, then the one who killed He Who Remains. */
  ["loki", "sylvie"],
  /* Then the one who cast an illusion big enough to hide a city, a thug, a
     child, and a liar whose whole character is feats he never performed. */
  ["classic-loki", "president-loki", "kid-loki", "boastful-loki"],
  /* Three suits, and the scorer reads the newest record as the best one
     because Riri's bullets are wordier than Tony's. Decades of iteration and
     military hardware beat a first build, whatever the prose count says. */
  ["iron-man", "war-machine", "ironheart"],
  /* Both score nothing and both are powerless, so the order between them was
     the alphabet. One of them runs the intelligence service. */
  ["nick-fury", "betty-ross"],
  /* Intangibility beats a shield. Enriching Ghost's record closed the gap to
     three points and no further, because the scorer counts abilities and
     cannot weigh "walks through you" against "carries a shield". */
  ["ghost", "john-walker"],
  /**
   * THE GUARDIANS, reordered once all eleven records finally said what the
   * characters do. The old order was written when most of them had three
   * bullets, and it shows: Groot came SIXTH on "Grows and reshapes /
   * Regenerates / Great strength", and Phyla-Vell was left out of the group
   * entirely to "trail it" on a record that read "Kree physiology / Raised in
   * a cage / Newest of the team".
   *
   * Phyla-Vell first: the Quantum Bands, a sword of solid light, cosmic
   * awareness and an absorb-and-return that makes shooting her a mistake.
   * Then Groot, who lifts a hundred tons, commands every plant on a world and
   * grows back entire from a twig. Then Gamora, then Drax, the two built by
   * Thanos to kill things. Star-Lord channels a star, but late and briefly.
   * Mantis stuns Thor with a nerve strike. Nebula and Rocket are an assassin
   * and an engineer. Cosmo is a dog who stops a ship. Kraglin has a whistle.
   *
   * Adam Warlock leads from tier 5 and is not in this group.
   */
  [
    "phyla-vell",
    "groot",
    "gamora",
    "drax",
    "star-lord",
    "mantis",
    "nebula",
    "rocket",
    "cosmo",
    "kraglin",
  ],
  /**
   * THE TEN ETERNALS, in the order Part 3 settles.
   *
   * Their records were differentiated once already, to break the block they
   * had sorted into. Part 3 then arrived with the feats -- Sersi turning an
   * EMERGING CELESTIAL to stone, Druig putting one to SLEEP, Sprite rewriting
   * reality -- and adding those made the scores worse, not better, because
   * the six bullet slots went to deeds and the keyword-heavy lines came out.
   * Ikaris ended up EIGHTH of ten on a record whose second line reads "The
   * most powerful of the ten".
   *
   * So it is stated. Sersi first: "the greatest transmuter among all the
   * Eternals", and she turned a rising Celestial to stone, which is the
   * largest single act any of them performs alone. Then Ikaris, who spreads
   * his cosmic energy across everything rather than specialising and whom the
   * dossier calls the best-rounded. Thena, the fiercest of them, then
   * Gilgamesh, the physically strongest, then Sprite -- whose own
   * transmutation is "second only to Sersi" and whose reality rewrite was
   * borrowed from a Uni-Mind and a Celestial, so it is not his to be ranked
   * on. Druig, who put Tiamut down. Then Phastos and Kingo, who both mostly
   * decline to use what they have, Ajak the healer, and Makkari, who traded
   * flight and every psionic away for speed.
   */
  [
    "sersi",
    "ikaris",
    "thena",
    "gilgamesh",
    "sprite",
    "druig",
    "phastos",
    "kingo",
    "ajak",
    "makkari",
  ],
  /**
   * THE HERALDS OF GALACTUS, in the order the sources settle rather than the
   * one the word count produces.
   *
   * Differentiating their records fixed the block and broke the order:
   * FIRELORD came out first of the nine on 562, because "cosmic flame as hot
   * as a living sun" stacks three scoring words, and STARDUST came out eighth
   * on 219 despite being rated a UNIVERSAL THREAT by the Nova Corps and
   * fighting Beta Ray Bill on even terms. The scorer counts words; it cannot
   * weigh "slices a planet in half" against "hot as a sun".
   *
   * Morg leads: he beat the Silver Surfer AND several former heralds at once,
   * and Galactus himself had to step in. Then Stardust. Then Terrax, whose
   * axe cut a planet in two, then Firelord, who fought Thor to a standstill,
   * then Frankie Raye, whose fire kills stars. Red Shift cuts holes in space
   * and needed a black hole to stop. The Fallen One is powered by dark energy
   * and was a threat to Galactus, and was also killed by two Proemial Gods.
   * Air-Walker has been destroyed and rebuilt repeatedly. Praeter was a
   * pastor for one appearance.
   *
   * Norrin Radd and Shalla-Bal are hand-ranked above this group and are not
   * in it: the dossier calls Norrin the acknowledged master and nothing here
   * disputes that.
   */
  [
    "morg",
    "stardust",
    "terrax",
    "firelord",
    "frankie-raye",
    "red-shift",
    "the-fallen-one",
    "air-walker",
    "praeter",
  ],
  /**
   * THE SPIDER-SOCIETY, thirty-three of them, ordered.
   *
   * This is the group the scorer handles worst, and for a structural reason:
   * thirty-four characters with near-identical powers, so the ranking turned on
   * how each record happens to be WORDED. Spider-UK, Spider-Byte and Spinstress
   * led the chip because their origins talk about walking between realities;
   * Silk, Kaine, Ben Reilly, Spider-Punk and Spider-Man 2099 scored ZERO,
   * because "Bitten by the same spider" and "Marks his kills" contain no word
   * the patterns know. Spider-Man himself was ninth.
   *
   * So the order is stated. Miles first — he has everything Peter has plus the
   * venom strike and invisibility, which is the usual verdict. Then Peter, the
   * benchmark. Then the ones who are measurably more than baseline: Miguel's
   * talons and accelerated vision, Billy's Captain Britain powers, Cindy's
   * superior spider-sense, Kaine's healing. The three live-action Peters sit
   * together in the middle, since they are one character performed three ways.
   * Madame Web is last of the tier: precognition is not a fight.
   */
  [
    "miles-morales",
    "spider-man",
    /* BRAND NEW DAY SPLIT THE TRIO. This group's own note said the three
       live-action Peters "sit together in the middle, since they are one
       character performed three ways", and that stopped being true in July:
       a secondary mutation gives this one organic webbing that never runs
       out, radar-like senses that read a room before it moves, and strength
       past his own old limits. He is measurably more than baseline now, so
       he sits with the ones who are, and the other two stay where they were
       as each other's equals. */
    "spider-man-tom",
    "spider-man-2099",
    "spider-uk",
    "silk",
    "kaine",
    "ben-reilly",
    "spider-woman",
    "gwen-stacy",
    "spider-punk",
    "anya-corazon",
    "julia-carpenter",
    "mattie-franklin",
    "spider-man-tobey",
    "spider-man-andrew",
    "mayday-parker",
    "spider-boy",
    "spider-man-noir",
    "pavitr-prabhakar",
    "spider-man-2211",
    "peni-parker",
    "charlotte-witter",
    "bride-of-nine-spiders",
    "spider-smasher",
    "web-slinger",
    "spider-rex",
    "spinstress",
    "spider-byte",
    "old-man-spider",
    "web-weaver",
    "sun-spider",
    "madame-web",
  ],
  /* THE DEFENDERS, researched. Iron Fist first is the ranking ScreenRant's
     survey of the Netflix corner gives, and the reasoning holds: the Fist is
     the only power among them that scales — it shatters steel, heals its owner
     and kills the electricity in a building. Luke is the most durable and
     Jessica the strongest by raw lift, and one source ranks HER first on
     exactly that; she is third here because she is the least trained of the
     three and cannot hurt Luke at all. Daredevil has no superhuman strength.
     The Punisher has no powers and sits a tier below, unnamed. */
  ["iron-fist", "luke-cage", "jessica-jones", "daredevil"],
];

/** Ordered strongest to weakest, every character exactly once. */
export const powerOrder: { c: Character; tier: number; ranked: boolean }[] =
  (() => {
    const byId = new Map(allCharacters.map((c) => [c.id, c]));
    const placed = new Set<string>();
    for (const t of TIERS) {
      for (const id of t.ranked ?? []) {
        if (!byId.has(id))
          throw new Error(
            `tier ${t.n} names "${id}", which is not a character`,
          );
        placed.add(id);
      }
    }
    const out: { c: Character; tier: number; ranked: boolean }[] = [];
    const seen = new Set<string>();
    for (const t of TIERS) {
      for (const id of t.ranked ?? []) {
        out.push({ c: byId.get(id)!, tier: t.n, ranked: true });
        seen.add(id);
      }
      const rest = allCharacters
        .filter(
          (c) =>
            !placed.has(c.id) && !seen.has(c.id) && (t.match?.(c) ?? false),
        )
        .sort(
          (a, b) =>
            scaleScore(b) - scaleScore(a) ||
            a.nameEn.localeCompare(b.nameEn, "en"),
        );
      for (const c of rest) {
        out.push({ c, tier: t.n, ranked: false });
        seen.add(c.id);
      }
    }
    const missed = allCharacters.filter((c) => !seen.has(c.id));
    if (missed.length)
      throw new Error(`unplaced: ${missed.map((c) => c.id).join(", ")}`);

    /* Reseat each group into the slots its own members already occupy. */
    for (const group of OUTRANKS) {
      const slots = group
        .map((id) => out.findIndex((x) => x.c.id === id))
        .sort((a, b) => a - b);
      if (slots.some((i) => i === -1)) {
        throw new Error(
          `OUTRANKS names an id that is not ranked: ${group.join(", ")}`,
        );
      }
      const tiers = new Set(slots.map((i) => out[i]!.tier));
      if (tiers.size > 1) {
        throw new Error(
          `OUTRANKS group [${group.join(", ")}] spans tiers ${[...tiers].join(", ")}. ` +
            `Reordering across a tier boundary would make rank contradict tier.`,
        );
      }
      const rows = group.map((id) => out.find((x) => x.c.id === id)!);
      slots.forEach((slot, i) => {
        out[slot] = rows[i]!;
      });
    }
    return out;
  })();

const rankById = new Map(powerOrder.map((x, i) => [x.c.id, i + 1]));
const tierById = new Map(powerOrder.map((x) => [x.c.id, x.tier]));

/** 1 is strongest. Every character has one, and no two share it. */
export function powerRankOf(id: string): number {
  const r = rankById.get(id);
  if (r === undefined) throw new Error(`no power rank for "${id}"`);
  return r;
}

/** 0 is strongest. The part of the ranking that is a claim rather than a sort. */
export function powerTierOf(id: string): number {
  const t = tierById.get(id);
  if (t === undefined) throw new Error(`no power tier for "${id}"`);
  return t;
}

export { TIERS as POWER_TIERS };
