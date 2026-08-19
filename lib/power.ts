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
const aff = (...names: string[]) => (c: Character) =>
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
      "Not combatants. The reason there is anything to fight over. No source ranks anything above these two.",
    ranked: ["the-one-above-all", "the-one-below-all"],
  },
  {
    n: 1,
    title: "Above the multiverse",
    gloss:
      "Each has ended, judged or rewritten a cosmos. The Beyonders lead on the plainest feat available: they killed the Living Tribunal.",
    ranked: [
      "the-beyonders",
      "the-living-tribunal",
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
      "arishem",
      "exitar",
      "the-progenitor",
      "tiamut",
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
      "dormammu",
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
      (c.species === "Celestial" && scaleScore(c) > 0) ||
      sp(
        "Elder God",
        "Cosmic Being",
        "Cosmic entity",
        "Cosmic Force",
        "Watcher",
        "Symbiote god",
        "Psychic Entity",
      )(c) ||
      /* The affiliation has to ask the same question the species now asks, or
         it simply lets the unrisen back in through the other door. */
      (aff("Cosmic entities", "Celestials")(c) &&
        (c.species !== "Celestial" || scaleScore(c) > 0)),
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
      "mister-m",
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
    /* THE CELESTIALS TIER 3 STOPPED CARRYING LAND HERE, not in tier 8 with the
       reporters. Refusing the office is not the same as saying Gammenon the
       Gatherer is a bystander: he is still a Celestial, and the bottom of the
       reality band is the honest place for one whose record claims nothing. */
    match: (c) => c.species === "Celestial",
  },
  {
    n: 5,
    title: "Gods, omegas, and the top of the physical scale",
    gloss:
      "No cosmic office and no reality warping — just more raw power than anything below can survive. The omega-level mutants who are not reality-warpers sit here, beside the gods rather than above them.",
    ranked: [
      "odin",
      "surtur",
      "zeus",
      "mangog",
      "sentry",
      "silver-surfer",
      /* Shalla-Bal directly behind him, because the two records carry
         IDENTICAL data — same species, same two affiliations — and came out 81
         places apart: Norrin was pinned here by being named, and she floated
         to tier 3 on the "Cosmic entities" affiliation they both hold. Being
         named in a head should never be what decides a character's tier when
         an identical record is not. */
      "shalla-bal",
      "thanos",
      "hela",
      "thor",
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
      "iceman",
      "vulcan",
      "exodus",
      "quentin-quire",
      "hope-summers",
      "beta-ray-bill",
      "gladiator",
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
      "adam-warlock",
      "quasar",
      "richard-rider",
      "blue-marvel",
      /* The Hulk is here rather than higher ONLY because of the base-form
         rule. Savage Hulk is what the corpus holds; World-Breaker, who tore
         a continent, is a state he reaches and not a form he keeps. */
      "hulk",
      /* RED HULK BESIDE HIM, because he is the one gamma character who trades
         with Banner rather than trailing him — he fought the Hulk to a
         standstill and put Thor down in his debut. He sat in tier 7 at 308,
         below a curse and a cloud of electricity that he beats. */
      "thaddeus-ross",
      "hyperion",
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
      sp(
        "Olympian",
        "Fire demon",
        "Alien dragon",
        "Zenn-Lavian",
        "Elder god",
      /* "Gods" is 28 characters and most of them are Heimdall — a god by
         species and a sentry by job. The ones who belong are named above. */
      )(c) ||
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
      "doctor-strange",
      "the-ancient-one",
      "doctor-doom",
      /* THE MAKER SITS WITH DOOM, who is the same idea from the other side: an
         intellect that decided it should be in charge. He came out 280th in
         "Enhanced" on `species: Human mutate` — a man whose own record says he
         builds and unbuilds universes, ranked below three hundred people. */
      "the-maker",
      "kang",
      "apocalypse",
      /* A Spirit of Vengeance is not an "Enhanced human", which is where
         `species: Human host` had left him at 289 — behind Blade in kind if
         not in number, and behind two hundred people who can be killed. The
         Penance Stare works on gods, and his own record says the quiet part:
         "Cannot be destroyed". */
      "ghost-rider",
      "cassandra-nova",
      "shadow-king",
      "selene",
      /* Same family, same fault: a clone of Jean Grey with her telepathy and
         a demon army, stranded at 393 for having no published class. */
      "madelyne-pryor",
      /* Carol goes Binary. Monica becomes any part of the spectrum. Sue is
         the strongest of the Fantastic Four and was ranked last of them, at
         501, because "Invisibility / Force fields" reads small and is not —
         she has held a force field against a Celestial. */
      "captain-marvel",
      "invisible-woman",
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
      "mister-sinister",
      "ultron",
      "sylvie",
      "magik",
      "khonshu",
      /* Guards the Nexus of All Realities and cannot be killed by force. */
      "man-thing",
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
      "ronan",
      /* AMERICA CHAVEZ COMES OFF THIS HEAD. I named her here on the strength
         of "punches holes between universes", reading it as reality-scale when
         it is a door — and her own record finishes the thought: "Cannot
         control it yet". Star-powered strength is real and it is not a tier of
         its own; her score can carry her. */
      "xorn",
    ],
    match: (c) =>
      c.mutantClass === "alpha" ||
      /* An omega nobody named above: still the top of what a mutant reaches,
         still not a god. */
      c.mutantClass === "omega" ||
      (c.magicSchools?.length ?? 0) > 0 ||
      Boolean(c.symbioteClass) ||
      sp(
        "Asgardian",
        "Frost Giant",
        "Eternal",
        "Titan",
        "Elder of the Universe",
        "Demon",
        "Witch",
        "Faltine",
        "Inheritor",
        "Inhuman",
        "Symbiote",
        "Symbiote host",
        "Technarch",
        "Energy being",
        "Cursed being",
        "Mutant island",
        "Artifact",
        "Strontian",
      )(c) ||
      aff("Magic", "Vishanti", "Masters of the Mystic Arts", "Elders of the Universe")(c),
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
    ranked: ["supreme-intelligence", "mainframe"],
    match: (c) =>
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
         ascii-ok: reads `powers[].en`, English by construction. */
      /\b(armour|armor|exoskeleton|repulsor|powered suit|built her own suit|changes size|pym particle|grows and shrinks|flight rig|winged|sp\/\/dr|mech\b|pilots the)/i.test(
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
      "black-widow",
      "hawkeye",
      "okoye",
      "elektra",
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
      "peggy-carter",
      "nick-fury",
      "maria-hill",
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
    ranked: ["miss-minutes"],
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
  /* The God of Stories rewrote himself into the narrative, which is a bigger
     peak than any version of Loki that only fights. */
  "loki",
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
  [/\b(no known upper limit|no upper limit|without limit|limitless|beyond measure|grows without limit)/i, 60],
  /* Unkillable is durability, not output — real, and worth less. */
  // ascii-ok: English only.
  [/\b(cannot be killed|cannot be destroyed|unkillable|adapts to anything|rebuilds himself|reassembles|comes back from)/i, 25],
  /* Reality itself. ascii-ok: scores English `powers[].en` only. */
  [/\b(realit|universe|universal|multiverse|cosmos|cosmic|existence|creation|omnipot|omniscien|timeline|time itself|all things|infinit)/i, 120],
  /* Worlds and stars. ascii-ok: English only. */
  [/\b(planets?\b|planetary|worlds?\b|stars?\b|suns?\b|galax|continent|ocean|weather|storms?\b|nine realms|devour)/i, 70],
  /* An Infinity Stone is a piece of the universe. ascii-ok: English only. */
  [/\b(infinity stone|mind stone|power stone|reality stone|soul stone|time stone|space stone|infinity gem)/i, 40],
  /* Gods, ages, souls. ascii-ok: English only. */
  [/\b(god|divine|immortal|ageless|millenni|thousand years|eternal|resurrect|soul|underworld|hell\b|death|penance stare)/i, 40],
  /* Armies, cities, dimensions. ascii-ok: English only. */
  [/\b(army|armies|legion|horde|city|dimension|portal|realm|kingdom|throne|conquer|rules?\b|commands\b)/i, 25],
  /* Ordinary superhuman. ascii-ok: English only. */
  [/\b(strength|durab|regenerat|healing|telepath|telekine|psychic|energy|matter|magic|sorcer|illusion|shapeshift|flight|speed|claws|symbiote|venom|gamma|adamantium|wall-craw|spider-sense|agility|reflex|senses|invisib|force field|flame|fire|heat|burn|frost|ice|lightning|thunder|electric|discharge|acid|sonic|radiation|invulnerab|rock body|phases?|enhanced|the herb|super-soldier|serum|changes size|shrink|pym particle|mechanical arm|tentacle|cybernetic|prosthe|adamantium armour|goblin gear|illusion technology|density|intangib|beam|blast|solar|laser|stingers|ten rings|shockwave|darkforce|lightforce|indestructible|dagger|chi\b|bulletproof|unbreakable|acrobat|empath|puts anyone to sleep|feels what you feel|nearly unkillable)/i, 14],
  /* Training and equipment. ascii-ok: English only. */
  [/\b(sword|blade|marksman|master|expert|trained|tactic|genius|strateg|armour|armor|suit|gun|bow|training|weapons?|arsenal|combat|spear|staff|axe|hammer|shield|knife|sai|fists|chains|soldier|marine|military|sniper|assassin|agent|espionage|intelligence|physicist|scientist|engineer|inventor|brilliant|surgeon|doctor|cia\b|operative|counter terror|pilot|deputy director)/i, 6],
];

const CLASS_WEIGHT: Record<string, number> = {
  omega: 90, alpha: 45, beta: 20, gamma: 20, delta: 10, epsilon: 4,
};
const SYMBIOTE_WEIGHT: Record<string, number> = {
  gestalt: 45, ancient: 40, lineage: 25, spawn: 18, anomaly: 18,
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
const PROPER_NOUNS = /world security council|nexus of all realities/gi;

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
   * ascii-ok: matched against `powers[].en`, English by construction.
   */
  const TRAVELS = /\b(between (universes|realities|dimensions|worlds)|walks between|portals?)\b/i;
  const abilities = c.powers
    .map((p) => clean(p.en).trim())
    .reduce(
      /* A quarter, the same discount perception takes, and for the same
         reason: neither one alters the thing it reaches. Half left America
         Chavez at 286 on "Punches holes between universes" — sixty points for
         a door, more than Spider-Man's entire power set — while her own record
         finishes the sentence with "Cannot control it yet". */
      (n, b) => n + score(b) * (PERCEIVES.test(b) || TRAVELS.test(b) ? 0.25 : 1),
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
  if (c.category === "supporting" && abilities === 0) n -= 40;
  return n;
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
  /* THE GUARDIANS, in the order a fight would settle rather than the order a
     bullet count does. Drax is called the Destroyer, is superhumanly strong
     and nearly indestructible, and came out seventh behind a pilot and two
     trained assassins — because the scorer counts abilities and cannot weigh
     "nearly indestructible" against "ace pilot". Adam Warlock leads from
     tier 5 and is not in this group; Kraglin, Phyla-Vell and Cosmo trail it. */
  ["drax", "star-lord", "nebula", "gamora", "rocket", "groot", "mantis"],
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
    "spider-man-tom",
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
export const powerOrder: { c: Character; tier: number; ranked: boolean }[] = (() => {
  const byId = new Map(allCharacters.map((c) => [c.id, c]));
  const placed = new Set<string>();
  for (const t of TIERS) {
    for (const id of t.ranked ?? []) {
      if (!byId.has(id)) throw new Error(`tier ${t.n} names "${id}", which is not a character`);
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
      .filter((c) => !placed.has(c.id) && !seen.has(c.id) && (t.match?.(c) ?? false))
      .sort(
        (a, b) => scaleScore(b) - scaleScore(a) || a.nameEn.localeCompare(b.nameEn, "en"),
      );
    for (const c of rest) {
      out.push({ c, tier: t.n, ranked: false });
      seen.add(c.id);
    }
  }
  const missed = allCharacters.filter((c) => !seen.has(c.id));
  if (missed.length) throw new Error(`unplaced: ${missed.map((c) => c.id).join(", ")}`);

  /* Reseat each group into the slots its own members already occupy. */
  for (const group of OUTRANKS) {
    const slots = group
      .map((id) => out.findIndex((x) => x.c.id === id))
      .sort((a, b) => a - b);
    if (slots.some((i) => i === -1)) {
      throw new Error(`OUTRANKS names an id that is not ranked: ${group.join(", ")}`);
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
