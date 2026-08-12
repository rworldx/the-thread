/**
 * Character ARTWORK, fetched at build time and committed.
 *
 *   npm run sync:characters
 *
 * WHY THIS EXISTS AT ALL. The first version used TMDB actor stills, because
 * TMDB has cast and no characters. That is a photograph of Hugh Jackman in a
 * blue t-shirt where a picture of Wolverine belongs. An actor still answers
 * "who played this" and the page is asking "who is this", and those are
 * different questions. Actor photographs are still used, in the cast rail and
 * on the "played by" line, where they answer the question they actually answer.
 *
 * ONE SOURCE: a public, keyless dataset of character artwork, pinned at a
 * tagged release on jsDelivr. The URL is stored, never the bytes, exactly as
 * the posters are.
 *
 * MARVEL'S OWN API WAS THE PREFERRED SOURCE AND IS GONE. developer.marvel.com
 * no longer has a developer surface: /account redirects to the consumer
 * homepage and there is no sign-in left to obtain a key. The branch that read
 * MARVEL public and private key variables has been deleted rather than left
 * dormant, because a code path aimed at a dead service reads as a plan and is
 * really just debt.
 *
 * A character with no match is a REAL STATE, not a bug: the keyless dataset is
 * comics-era and has nothing for Shuri, Sylvie or Killmonger. Those render a
 * designed plate rather than a broken image or, worse, an actor's face
 * pretending to be character art.
 */

import { writeFile } from "node:fs/promises";
import { characters } from "../content/characters";

const SHDB = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
/**
 * Two keyless MediaWiki APIs, tried in order.
 *
 * The MCU wiki covers everything Marvel Studios made. It does not cover Sony's
 * corner, so Miles Morales, Morbius and anyone else who exists only in the
 * Spider-Verse comes up empty there and is found on the general Marvel wiki.
 */
const WIKIS = [
  "https://marvelcinematicuniverse.fandom.com/api.php",
  "https://marvel.fandom.com/api.php",
];

/**
 * HAND-PICKED ARTWORK, which outranks every automatic stage.
 *
 * The two sources below find a real picture for all 232 characters, and "a
 * real picture" is not the same as "the right one". Where a human has looked
 * at the result and chosen better, that choice wins outright — no name search,
 * no article lookup, no fallback.
 *
 * EVERY ONE OF THESE IS REQUESTED by `npm run verify:assets`, on the same
 * footing as everything else. A URL somebody pasted is exactly as capable of
 * being a 404, a hotlink block or an expiring cache entry as one I invented,
 * and two of the first batch were: tvtropes answers 403 to anything without a
 * browser referer, and Google's `encrypted-tbn0` thumbnails are a cache, not a
 * host — those URLs expire.
 */
const IMAGE_OVERRIDES: Record<string, string> = {
  "ms-marvel":
    "https://www.hollywoodreporter.com/wp-content/uploads/2018/12/ms._marvel_38_-_publicity_-_p_2018.jpg",
  echo:
    "https://static.wikia.nocookie.net/p__/images/0/0d/Maya_Lopez_%28Earth-616%29_from_Daredevil_Vol_2_10_cover.jpg/revision/latest?cb=20240109231654&path-prefix=protagonist",
  ultron: "https://upload.wikimedia.org/wikipedia/en/5/5e/Ultron_%28MCU%29.png",
  okoye: "https://i.pinimg.com/originals/65/a0/c0/65a0c0db02e90a95d04e93c9477ceca0.jpg",
  toad: "https://cdn.marvel.com/content/2x/toad.webp",
  "the-living-tribunal":
    "https://images.squarespace-cdn.com/content/v1/58c35f74d1758e424ee76710/1557960737862-DA8TG6YX0QA9OMAATAJM/7c4ce77870905d23eed53669de9ae36c--living-tribunal-comic-books.jpg",
  /**
   * THE PUNISHER IS A SUBSTITUTION. The URL offered was tvtropes, which answers
   * 403 to any request without a browser referer — it would have rendered as a
   * broken image for every reader. The Marvel wiki's own cover art instead,
   * which is the same host most of this corpus already uses.
   *
   * The Beyonder was a substitution too, until a replacement arrived: the
   * first URL was an `encrypted-tbn0` Google thumbnail, 35KB and a cache entry
   * that expires. This one is a real image on a real host.
   */
  /**
   * SENT AS A TVTROPES URL, TWICE, and that host answers 403 to everything
   * that is not a live browser — a matching Referer and a real Safari
   * user-agent both get the same refusal, so it could not be linked and could
   * not even be downloaded and self-hosted. This is the replacement that was
   * sent for it, on a host that actually serves the file.
   */
  punisher: "https://comicvine.gamespot.com/a/uploads/scale_medium/1/15776/9998597-punisher.jpg",
  "the-beyonder": "https://i.pinimg.com/736x/7c/12/73/7c1273e72145647b433b44d43bf870dc.jpg",
  "doctor-voodoo":
    "https://i.pinimg.com/736x/03/0b/ca/030bcaf2391b6b49e777f889926657f1.jpg",
  /* Peter from Deadpool 2 — the one with no powers and type 2 diabetes, whom
     no comics dataset has ever heard of. */
  "peter-wisdom":
    "https://i.pinimg.com/736x/a1/ef/ff/a1efff2544a6575605aff6a8557c23ca.jpg",
  "sam-alexander":
    "https://static.comicvine.com/uploads/original/3/31666/2940089-sam_5.jpg",
  /**
   * A SUBSTITUTION, on the same rule as the Punisher and the Beyonder's first
   * URL. The image offered was `preview.redd.it` with a `width=640` and an
   * `s=` signature — a signed cache entry, not a host, and those expire. The
   * Marvel wiki's own Phoenix Force art instead.
   */
  phoenix: "https://static.wikia.nocookie.net/marveldatabase/images/e/ee/Phoenix_Force_%28Earth-616%29_from_Avengers_Vol_8_32_001.jpg/revision/latest?cb=20210406171416",
  "starfox": "https://static.wikia.nocookie.net/crossgencomicsdatabase/images/2/24/Starfox_Thanos_Vol_2_7.png/revision/latest?cb=20201205021117",
  "jane-foster": "https://static.wikia.nocookie.net/marveldatabase/images/8/8e/Jane_Foster_%28Earth-616%29_from_Mighty_Thor_Vol_2_1_001.jpg/revision/latest/scale-to-width-down/791?cb=20151118210746",
  /**
   * MAYBELLE PARKER IS AUNT MAY. I flagged this as a possible mismatch when it
   * was first offered, on the strength of the filename — a Howard the Duck
   * cover — and I was wrong. Her full name is Maybelle "May" Reilly Parker;
   * the cover is simply where the art comes from.
   */
  /**
   * Madame Web, in COMIC art rather than a film still, as asked.
   *
   * The first URL here was TYPED FROM MEMORY — a plausible filename on the
   * right host that had never existed. It 404'd, and `verify:assets` caught it
   * before it shipped. That is the entire reason that script exists, and it
   * caught me writing the exact bug it was built for.
   */
  /* The Spider-Society, as they look in the Spider-Verse films. */
  "spider-man-noir": "https://static.wikia.nocookie.net/p__/images/e/e7/1733106593483_v2pt7q_2_1~2.jpg/revision/latest?cb=20241202023919&path-prefix=protagonist",
  "spider-punk": "https://static.wikia.nocookie.net/spiderverseseries/images/8/80/Spider-Punk_-_ATSV.png/revision/latest?cb=20230601181414",
  "peni-parker": "https://static.wikia.nocookie.net/marveldatabase/images/6/6a/Edge_of_Spider-Geddon_Vol_1_2_Textless.jpg/revision/latest?cb=20181005044750",
  "spider-ham": "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-spider-ham.webp",
  "spider-man-2099": "https://static.wikia.nocookie.net/spiderverseseries/images/a/ac/Miguel_O%27Hara_-_ATSV.png/revision/latest?cb=20230601181303",
  /**
   * THE MAINSTREAM VERSIONS, because the automatic match found the wrong
   * EARTH. The name search landed on Earth-161, Earth-315, Earth-982 and
   * Earth-4 — alternate-universe covers from Spider-Verse and Spider-Girl
   * books, where everyone on the page wears a spider suit. The art was of the
   * right character and read as "another Spider-Man" to anyone looking at the
   * grid, which is the wrong answer to the only question a portrait asks.
   */
  /* Renaming her to "Spider-Woman (Jessica Drew)" — matching the two Novas —
     made the name search land on SPIDER-GIRL, a different person. The rename
     was right and the search could not follow it. */
  "hobgoblin": "https://static.wikia.nocookie.net/marveldatabase/images/2/2d/Spider-Man_Vol_2_237_Textless.jpg/revision/latest?cb=20171219181335",
  "mary-jane-watson": "https://static.wikia.nocookie.net/marveldatabase/images/d/d3/Mary_Jane_Watson_%28Earth-616%29_from_Amazing_Spider-Man_Vol_5_50.LR_001.jpg/revision/latest?cb=20210315024600",
  "michelle-jones": "https://static.wikia.nocookie.net/p__/images/f/f2/MJ-NWH.png/revision/latest?cb=20220308041822&path-prefix=protagonist",
  "riot": "https://static.wikia.nocookie.net/villains/images/9/97/Riot_%28Earth-616%29_from_Absolute_Carnage_Scream_Vol_1_1_Bagley_Connecting_Variant_cover_001.jpg/revision/latest?cb=20241029173122",
  "morbius": "https://static.wikia.nocookie.net/marveldatabase/images/6/6c/Morbius_Vol_1_1_Textless.jpg/revision/latest?cb=20211102194828",
  /**
   * KRAVEN IS A SUBSTITUTION, on the same rule as the Punisher and the
   * Phoenix. The URL offered was `preview.redd.it` with an `s=` signature — a
   * signed cache entry, not a host, and those expire. The Marvel wiki's own
   * cover instead.
   */
  kraven: "https://static.wikia.nocookie.net/marveldatabase/images/8/83/Amazing_Spider-Man_Vol_5_19_ComicXposure_Exclusive_Virgin_Variant.jpg/revision/latest?cb=20210222060432",
  "spider-woman": "https://static.wikia.nocookie.net/marveldatabase/images/9/9d/Spider-Woman_Vol_7_11_Textless.jpg/revision/latest?cb=20210116123553",
  "julia-carpenter": "https://static.wikia.nocookie.net/marveldatabase/images/7/74/Julia_Carpenter_%28Earth-616%29_from_Prowler_Vol_2_2_001.jpg/revision/latest?cb=20191006044458",
  "anya-corazon": "https://static.wikia.nocookie.net/marveldatabase/images/e/e2/A%C3%B1a_Coraz%C3%B3n_%28Earth-616%29_from_Edge_of_Spider-Verse_Vol_2_1_001.jpg/revision/latest?cb=20220804155915",
  "mattie-franklin": "https://static.wikia.nocookie.net/marveldatabase/images/1/19/Martha_Franklin_%28Earth-616%29_from_Silk_Vol_2_14_001.jpg/revision/latest?cb=20260611235256",
  "ezekiel-sims": "https://static.wikia.nocookie.net/marveldatabase/images/3/39/Ezekiel_Sims_%28Earth-616%29_from_Amazing_Spider-Man_Vol_2_33_cover.jpg/revision/latest?cb=20191219062701",
  "madame-web": "https://static.wikia.nocookie.net/marveldatabase/images/9/9e/Cassandra_Webb_%28Earth-616%29_from_Prowler_Vol_2_1_001.jpg/revision/latest?cb=20220428150725",
  "captain-carter": "https://theronin.org/wp-content/uploads/2021/08/captain-carter_haley-atwell_invaders_mcu_what-if_.jpeg?w=469",
  /* The MCU wiki's Throg is a blurry frame grab. This is the comics cover. */
  throg: "https://static.wikia.nocookie.net/marveldatabase/images/b/be/Thor_Vol_6_18_Textless.jpg/revision/latest?cb=20211206190320",
  "president-loki": "https://static.wikia.nocookie.net/marveldatabase/images/2/2c/Loki_%28TV_series%29_poster_013.jpg/revision/latest?cb=20210712144857",
  "aunt-may": "https://static.wikia.nocookie.net/marveldatabase/images/e/e2/Maybelle_Parker_%28Earth-616%29_from_Howard_the_Duck_Vol_6_1_cover_001.jpg/revision/latest?cb=20220628175232",
  sentinels: "https://static.wikia.nocookie.net/xmenmovies/images/d/d9/Markx.jpg/revision/latest?cb=20140714214324",
  yondu: "https://static.wikia.nocookie.net/marveldatabase/images/6/6d/All-New_Guardians_of_the_Galaxy_Annual_Vol_1_1_Mora_Variant_Textless.jpg/revision/latest?cb=20170623090214",
  ikaris: "https://static.wikia.nocookie.net/disney/images/e/e7/Ikaris_-_Profile.jpg/revision/latest?cb=20220626100045",
  infinity: "https://static.wikia.nocookie.net/marveldatabase/images/a/aa/Infinity_%28Multiverse%29_from_Ultimates_2_Vol_2_100_001.jpg/revision/latest?cb=20190206130229",
  "the-runner": "https://static.wikia.nocookie.net/marvelcomicsfanon/images/8/8f/Runner_61615.jpg/revision/latest?cb=20190319143937",
  oblivion: "https://static.wikia.nocookie.net/marveldatabase/images/0/07/Oblivion_%28Earth-616%29_from_Mighty_Thor_Annual_Vol_1_1_001.jpg/revision/latest/scale-to-width-down/985?cb=20211130020701",
  "molecule-man": "https://static.wikia.nocookie.net/marveldatabase/images/6/67/Owen_Reece_%28Earth-616%29_from_New_Avengers_Vol_3_24_001.jpg/revision/latest?cb=20240516161927",
  knull: "https://cdn.marvel.com/content/2x/venom_2018_4_1.webp",
  "doctor-doom": "https://static.wikia.nocookie.net/heroes-and-villain/images/f/fc/Doctor_Doom.jpg/revision/latest?cb=20220208120207",
  "squirrel-girl": "https://static.wikia.nocookie.net/versus-compendium/images/0/01/Squirrel_Girl.png/revision/latest?cb=20181025135059",
  prowler: "https://static.wikia.nocookie.net/villains/images/8/89/Prowler2.jpg/revision/latest?cb=20190227002026",
  "a-bomb": "https://static.wikia.nocookie.net/marvel-battlelines/images/c/c9/Screenshot_2018-11-15-13-16-45.png/revision/latest?cb=20181116004936",
  "adam-warlock": "https://i.pinimg.com/736x/b6/30/78/b63078241e496fdaf4073646a12da56c.jpg",
  sentry: "https://static.wikia.nocookie.net/characterprofile/images/e/ed/Sentry_Marvel_Comics.jpeg/revision/latest/scale-to-width-down/1200?cb=20250525071708",
  "kate-bishop": "https://static.wikia.nocookie.net/marveldatabase/images/d/df/Katherine_Bishop_%28Earth-616%29_from_Hawkeye_Kate_Bishop_Vol_1_1_cover.jpg/revision/latest?cb=20211130210330",
  "franklin-richards":
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhO0M4Hoz8oYnwDeK0zj7-y48Nxz1qaorHtrH41Dw_LddZDM5RVCKilkgSldOdfBpfNyLLMLMWiXZux40YOFI9VpNFURwbEenzTWwYy9vyyXt1B5DlTIc9AaAQgRpsiBqn1gHp8HLUViw_tgz4uPSTI7_UT01LOLPB03ZV_ndjAgn2tzfVkeox7_khcTu4/s3056/Fantastic%20Four%20v7%20%23%2018%20(1).jpg",
  /**
   * `i.redd.it`, NOT `preview.redd.it`, and the difference is the whole reason
   * the others were refused. The preview host serves signed, expiring cache
   * entries — `?s=<signature>` — and those go away. This is the direct upload
   * host: a bare path, no signature, no expiry.
   */
  /**
   * THE COSMIC BEINGS — every one of these is a CORRECTION, not a preference.
   *
   * The automatic sources found art for all eight and got five of them wrong
   * in the same way: they matched the NAME and not the CHARACTER. Quasar came
   * back as Phyla-Vell, who is a different Quasar entirely and not the one
   * credited. Agamotto came back as the Earth-001 Spider-Verse version, Terrax
   * as Earth-982 and Korvac as Earth X — three alternate realities. Chthon
   * came back as a stone statue of him rather than him.
   *
   * Marvel Database's own page image is not automatically right either: for
   * Wendell Vaughn it returns an Annihilation: NOVA cover, and for Nightmare a
   * Doctor Voodoo cover. Both were replaced from the character galleries.
   */
  /* The Host, from Marvel Database. Their pages live under (First Cosmos)
     and (Multiverse) rather than Earth-616 — a Celestial is not from an
     Earth — which is why an Earth-616 lookup returns nothing for them. */
  exitar:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/73/Exitar_%28Multiverse%29_from_Uncanny_Avengers_Vol_1_16_001.jpg/revision/latest?cb=20230614004008",
  jemiah:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a5/Jemiah_%28First_Cosmos%29_from_Official_Handbook_of_the_Marvel_Universe_Master_Edition_Vol_1_16_001.jpg/revision/latest?cb=20161030073148",
  nezarr:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/39/Nezarr_%28First_Cosmos%29_from_Official_Handbook_of_the_Marvel_Universe_Master_Edition_Vol_1_11_001.jpg/revision/latest?cb=20161030073156",
  gammenon:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c7/Gammenon_%28First_Cosmos%29_from_X-Factor_Vol_1_43_001.jpg/revision/latest?cb=20230819214214",
  hargen:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/da/Hargen_%28Multiverse%29_from_Official_Handbook_of_the_Marvel_Universe_Vol_2_2_001.jpg/revision/latest?cb=20161030073140",
  oneg:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9e/Oneg_%28First_Cosmos%29_from_Official_Handbook_of_the_Marvel_Universe_Master_Edition_Vol_1_1_001.jpg/revision/latest?cb=20161030073221",
  ziran:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/95/Ziran_%28First_Cosmos%29_from_Official_Handbook_of_the_Marvel_Universe_Master_Edition_Vol_1_4_001.jpg/revision/latest?cb=20161029063024",
  scathan:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/72/Scathan_%28Multiverse%29_from_Guardians_of_the_Galaxy_Vol_1_50_001.jpg/revision/latest?cb=20191207184747",
  tefral:
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e3/Tefral_%28First_Cosmos%29_from_Official_Handbook_of_the_Marvel_Universe_Vol_2_2_001.jpg/revision/latest?cb=20161030073230",
  ashema:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7d/Ashema_%28Multiverse%29_from_Heroes_Reborn_Doom_Vol_1_1_0001.jpg/revision/latest?cb=20220722190613",
  devron:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/96/Devron_%28Multiverse%29_from_Marvel_Monsters_Devil_Dinosaur_Vol_1_1_0001.jpg/revision/latest?cb=20180401052700",
  gamiel:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5c/Gamiel_%28Multiverse%29_from_Marvel_Monsters_Devil_Dinosaur_Vol_1_1_0001.jpg/revision/latest?cb=20180401052709",
  zgreb:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d2/Zgreb_%28Multiverse%29_from_Marvel_Legacy_Vol_1_1_001.jpg/revision/latest?cb=20170928011354",
  godhead:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/37/Godhead_%28Earth-616%29_from_Marvel_Year-In-Review_Vol_1_5_001.jpg/revision/latest?cb=20260414073951",
  /* Spider-Man's rogues. Several are catalogued under their real names —
     Alonzo Lincoln, Silvio Manfredi, Frederick Myers, Silvija Sablinova —
     so a codename lookup finds nothing for them. */
  "hammerhead":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/15/Amazing_Spider-Man_Vol_3_17.1_Textless.jpg/revision/latest?cb=20150119193829",
  "hydro-man":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/ee/Classic_Marvel_Figurine_Collection_Vol_1_163_Textless.png/revision/latest?cb=20240421080822",
  "molten-man":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/15/Mark_Raxton_%28Earth-616%29_from_Amazing_Spider-Man_Vol_3_16_001.jpg/revision/latest?cb=20150312234724",
  "silvermane":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b2/Silvio_Manfredi_%28Earth-616%29_from_Silk_Vol_3_3_001.jpg/revision/latest?cb=20250622044037",
  "beetle":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/07/Abner_Jenkins_%28Earth-616%29_from_Thunderbolts_Vol_4_4_001.png/revision/latest?cb=20160901025546",
  "boomerang":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/fb/Web_of_Venom_Vol_1_1_Virgin_Variant.jpg/revision/latest?cb=20260420022347",
  "vermin":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/32/Edward_Whelan_%28Earth-616%29_from_Spider-Gwen_The_Ghost-Spider_Vol_1_5_001.jpg/revision/latest?cb=20240913225111",
  "demogoblin":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/22/Demogoblin_%28Earth-616%29_from_Absolute_Carnage_Lethal_Protectors_Vol_1_2_cover_001.jpg/revision/latest?cb=20190922001604",
  "alistair-smythe":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6c/Alistaire_Smythe_%28Earth-616%29_from_Amazing_Spider-Man_Vol_2_650_0001.jpg/revision/latest?cb=20191129030806",
  "silver-sable":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c2/Silvija_Sablinova_%28Earth-616%29_from_Wolverine_Vol_8_14_001.jpg/revision/latest?cb=20260108161834",
  "calypso":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/de/Calypso_%28Earth-616%29_from_Marvel_Illustrated_The_Odyssey_Vol_1_2_002.jpg/revision/latest?cb=20231118184004",
  /* Mutants. Marvel Database files most of them under their real names —
     Elizabeth Braddock, James Madrox, Teresia Karisik, Xuan Cao Manh,
     Kevin Sidney — so a codename lookup returns nothing. */
  "psylocke":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4f/X-Force_Vol_7_7_Textless.jpg/revision/latest?cb=20240922081512",
  "multiple-man":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/71/X-Factor_Vol_3_47_70th_Frame_Variant_Textless.jpg/revision/latest?cb=20210404124655",
  "marrow":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c2/Marrow_%28Sarah%29_%28Earth-616%29_from_Secret_X-Men_Vol_1_1_Cover.jpg/revision/latest?cb=20220210231006",
  "forge":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/80/X-Force_Vol_7_1_Forge_Virgin_Variant.jpg/revision/latest?cb=20240801205535",
  "sage":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/96/X-Force_Vol_7_6_Sage_Virgin_Variant.jpg/revision/latest?cb=20241202053713",
  "karma":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b5/Marvel%27s_Voices_Pride_Vol_1_1_Souza_Variant_Textless.jpg/revision/latest?cb=20210522181124",
  "husk":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/77/Paige_Guthrie_%28Earth-616%29_from_Astonishing_X-Men_Infinity_Comic_Vol_1_20_001.jpg/revision/latest?cb=20250513085839",
  "siryn":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/75/Theresa_Cassidy_%28Earth-616%29_from_X-Factor_Vol_4_6_001.jpg/revision/latest?cb=20210111225550",
  "sunfire":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d5/X-Men_Vol_6_4_New_Line-Up_Trading_Card_Variant_Textless.jpg/revision/latest?cb=20220128090535",
  "morph":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c0/Kevin_Sidney_%28Earth-616%29_from_Astonishing_X-Men_Infinity_Comic_Vol_1_41_001.jpg/revision/latest?cb=20251024140411",
  "mimic":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4e/Calvin_Rankin_%28Earth-616%29_from_X-Men_Legacy_Vol_1_264_001.jpg/revision/latest?cb=20120328234818",
  "madelyne-pryor":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d3/Dark_X-Men_Vol_2_2_Larroca_Variant_Textless.jpg/revision/latest?cb=20250113033319",
  /* The Inheritors are catalogued under Earth-001, their home reality, not
     Earth-616. Spider-UK is Earth-833 and filed as William Braddock. */
  "omega-red":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/99/Wolverine_Vol_7_11_Unknown_Comic_Books_Exclusive_Virgin_Variant.jpg/revision/latest?cb=20210403195047",
  "silk":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/37/Silk_Vol_3_1_Yoon_Virgin_Variant.jpg/revision/latest?cb=20210327180532",
  "kaine":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/bc/Scarlet_Spider_Vol_2_1_Bagley_Variant_Textless.jpg/revision/latest?cb=20111207185824",
  "morlun":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f5/Morlun_%28Earth-001%29_from_Spider-Man_Vol_4_1_001.jpg/revision/latest?cb=20260324164257",
  "solus":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/ae/Solus_%28Earth-001%29_from_Amazing_Spider-Man_Vol_3_11_0003.jpeg/revision/latest?cb=20141214032444",
  "verna":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/dc/Spider-Force_Vol_1_2_Textless.jpg/revision/latest?cb=20180822075733",
  "daemos":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/90/Daemos_%28Earth-001%29_from_Amazing_Spider-Man_Vol_3_8_0001.png/revision/latest?cb=20141025084417",
  "jennix":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/40/Jennix_%28Earth-001%29_from_Scarlet_Spiders_Vol_1_2_001.jpg/revision/latest?cb=20141229034533",
  "brix":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e7/Brix_%28Earth-001%29_from_Spider-Girls_Vol_1_2_001.jpg/revision/latest?cb=20210430201140",
  "bora":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a3/Bora_%28Earth-001%29_from_Superior_Spider-Man_Vol_1_33_001.png/revision/latest?cb=20140918235552",
  "karn":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/14/Karn_%28Earth-001%29_from_Spider-Geddon_Vol_1_2_001.jpg/revision/latest?cb=20240413203542",
  "spider-uk":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c0/William_Braddock_%28Earth-833%29_from_Amazing_Spider-Man_Vol_3_7_002.jpg/revision/latest?cb=20141012071303",
  /* Symbiotes are filed under "(Symbiote)", their hosts under real names —
     Andrea Benton, Scott Washington, Tanis Nieves, Dmitri Smerdyakov, Lily
     Hollister, Phillip Urich. */
  "lasher":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a6/Extreme_Carnage_Lasher_Vol_1_1_Comic_Kingdom_of_Canada_Exclusive_Virgin_Variant.jpg/revision/latest?cb=20210721011601",
  "phage":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/ed/Extreme_Carnage_Phage_Vol_1_1_Textless.jpg/revision/latest?cb=20211015151651",
  "sleeper":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9e/Venom_Vol_4_20_Codex_Variant_Textless.jpg/revision/latest?cb=20200823015914",
  "mania":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7e/Andrea_Benton_%28Earth-616%29_and_Silence_%28Symbiote%29_%28Earth-616%29_from_Venom_War_Deadpool_Vol_1_2_Cover.jpg/revision/latest?cb=20260205183440",
  "hybrid":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/34/Venom_Vol_4_18_Codex_Variant_Textless.jpg/revision/latest?cb=20190901185734",
  "dylan-brock":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a8/Dylan_Brock_%28Earth-616%29_and_Toxin_%28Symbiote%29_%28Earth-616%29_from_Venom_Vol_6_259_001.jpg/revision/latest?cb=20260627030657",
  "scorn":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/af/Tanis_Nieves_%28Earth-616%29_and_Scorn_%28Symbiote%29_%28Earth-616%29_from_Carnage%2C_U.S.A._Vol_1_5_001.png/revision/latest?cb=20120422120551",
  "chameleon":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/65/Dmitri_Smerdyakov_%28Earth-616%29_from_Giant-Size_Amazing_Spider-Man_Chameleon_Conspiracy_Vol_1_1_cover_001.jpg/revision/latest?cb=20210712021523",
  "menace":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/40/Lily_Hollister_%28Earth-616%29_from_Black_Cat_Vol_1_12_001.jpg/revision/latest?cb=20220320175716",
  "phil-urich":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/00/Phillip_Urich_%28Earth-616%29_from_Red_Goblin_Vol_1_1.jpg/revision/latest?cb=20230610112349",
  /* Elders are filed under their own names, not their titles: Tryco
     Slatterus, Ord Zyonz, Tath Ki, Ecce, Kamo Tharnn, Cort Zo Tinnus,
     Zamanathan Rambunazeth, Rubanna Quormo, Maht Pacle. */
  "the-champion":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/28/Tryco_Slatterus_%28Earth-616%29_from_Thanos_Vol_2_1_001.png/revision/latest?cb=20161201000442",
  "the-gardener":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f7/Ord_Zyonz_%28Earth-616%29_from_All-New_Guardians_of_the_Galaxy_Vol_1_10_001.jpg/revision/latest?cb=20180308010713",
  "the-contemplator":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b3/Tath_Ki_%28Earth-616%29_from_G.O.D.S._Vol_1_1_001.jpg/revision/latest?cb=20231008045113",
  "the-astronomer":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/40/Ecce_%28Earth-616%29_from_Super-Villain_Classics_Vol_1_1_001.jpg/revision/latest?cb=20231219095047",
  "the-possessor":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0f/Kamo_Tharnn_%28Earth-616%29_from_G.O.D.S._Vol_1_1_001.jpg/revision/latest?cb=20231008041749",
  "the-judicator":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/09/Judicator_%28Earth-616%29_from_All-New_Guardians_of_the_Galaxy_Vol_1_10_001.png/revision/latest?cb=20170924035643",
  "the-trader":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4e/Cort_Zo_Tinnus_%28Earth-616%29_from_G.O.D.S._Vol_1_1_001.jpg/revision/latest?cb=20231009231550",
  "the-explorer":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/33/Zamanathan_Rambunazeth_%28Earth-616%29_from_Quasar_Vol_1_48_0001.jpg/revision/latest?cb=20080517200312",
  "the-caregiver":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/94/Rubanna_Quormo_%28Earth-616%29_from_Official_Handbook_of_the_Marvel_Universe_A_to_Z_Update_Vol_1_3_001.jpg/revision/latest?cb=20151128230617",
  "the-obliterator":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a2/Maht_Pacle_%28Earth-616%29_from_Marauders_Vol_2_4_001.jpg/revision/latest?cb=20220731233044",
  /* Abstracts sit under (Multiverse) or (Cosmic Being) rather than an Earth,
     and Nemesis under (First Cosmos) — she predates this universe. */
  "master-order":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1f/Master_Order_%28Earth-616%29_from_G.O.D.S._Vol_1_6_Cosmic_Homage_Variant_cover_001.jpg/revision/latest?cb=20240522133951",
  "lord-chaos":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/bf/Lord_Chaos_%28Earth-616%29_from_G.O.D.S._Vol_1_5_Cosmic_Homage_Variant_cover_001.jpg/revision/latest?cb=20240228175436",
  "the-in-betweener":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/58/G.O.D.S._Vol_1_6_Reis_Variant_Textless.jpg/revision/latest?cb=20251026160219",
  "eon":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e4/Eon_%28Earth-616%29_from_Captain_Marvel_Vol_1_28_0001.jpg/revision/latest?cb=20161011040647",
  "epoch":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/Epoch_%28Earth-616%29_from_Fantastic_Four_Vol_3_544_0001.jpg/revision/latest?cb=20191202032038",
  "entropy":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/22/Entropy_%28Earth-616%29_from_Captain_Marvel_Vol_5_5_001.jpg/revision/latest?cb=20220901143731",
  "kronos":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4b/Kronos_%28Earth-616%29_from_Eternals_Thanos_Rises_Vol_1_1_001.jpg/revision/latest?cb=20220228050646",
  "tenebrous":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/31/Tenebrous_%28Earth-616%29_from_Annihilation_Silver_Surfer_Vol_1_3_002.jpg/revision/latest?cb=20191126061634",
  "the-stranger":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/83/Stranger_%28Cosmic_Being%29_%28Earth-616%29_from_Howard_the_Duck_Vol_6_3_001.jpg/revision/latest?cb=20160102080157",
  "nemesis":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/fb/Nemesis_%28Cosmic_Being%29_%28First_Cosmos%29_from_Avengers_UltraForce_Vol_1_1_001.jpg/revision/latest?cb=20180303090223",
  "protege":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6f/Prot%C3%A9g%C3%A9_%28Earth-691%29_from_Guardians_of_the_Galaxy_Vol_1_15_0001.jpg/revision/latest?cb=20191127024328",
  /* Mystics: Shuma-Gorath under (Multiverse), the Demiurge filed as
     "Demiurge Primordial". */
  "cyttorak":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/85/Cyttorak_%28Earth-616%29_and_Cain_Marko_%28Earth-616%29_from_Juggernaut_Vol_3_4_001.jpg/revision/latest?cb=20210519150308",
  "oshtur":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/cc/Oshtur_%28Earth-616%29_from_Sorcerer_Supreme_Vol_1_4_001.png/revision/latest?cb=20260318124848",
  "hoggoth":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e4/Hoggoth_%28Earth-616%29_from_Sorcerer_Supreme_Vol_1_4_001.png/revision/latest?cb=20260318124702",
  "umar":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/87/Strange_Vol_3_4_Lubera_Variant_Textless.jpg/revision/latest?cb=20220727113619",
  "zom":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5b/Zom_%28Earth-616%29_from_Strange_Tales_Vol_1_156_031.jpg/revision/latest?cb=20211215050707",
  "gaea":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c4/Gaea_%28Earth-616%29_from_Immortal_Thor_Vol_1_8_001.png/revision/latest?cb=20240313174931",
  "set":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/fb/Set_%28Earth-616%29_from_Savage_Avengers_Vol_2_4_0001.jpeg/revision/latest?cb=20221110064408",
  "shuma-gorath":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2c/Invaders_Now%21_Vol_1_4_Textless.jpg/revision/latest?cb=20160517200603",
  "the-demiurge":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/75/Demiurge_Primordial_%28Earth-616%29_from_Immortal_Thor_Vol_1_5_001.jpg/revision/latest?cb=20260124002743",
  /* Heralds: Stardust is filed as Lambda-Zero, the Fallen One under
     (Herald), Praeter under (Mike), Gladiator as Kallark. */
  "air-walker":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/65/Gabriel_Lan_%28Earth-616%29_from_Official_Handbook_of_the_Marvel_Universe_Vol_2_16_001.jpg/revision/latest?cb=20240708083503",
  "morg":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/56/Morg_%28Earth-616%29_from_All-New_Official_Handbook_of_the_Marvel_Universe_A_to_Z_Vol_1_7_0001.jpg/revision/latest?cb=20171230020226",
  "red-shift":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2a/Red_Shift_%28Earth-616%29_from_Annihilation_The_Nova_Corps_Files_Vol_1_1_0001.jpg/revision/latest?cb=20210209175923",
  "beta-ray-bill":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c3/Beta_Ray_Bill_%28Earth-616%29_from_Mortal_Thor_Vol_1_2_Clarke_Variant.jpg/revision/latest?cb=20250926064724",
  "gladiator":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b9/Realm_of_Kings_Imperial_Guard_Vol_1_5_Textless.jpg/revision/latest?cb=20221215064147",
  "hyperion":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9f/Hyperion_Vol_1_1_Textless.jpg/revision/latest?cb=20151023184219",
  "mangog":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/60/Mangog_%28Earth-616%29_from_Marvel_Monsters_Vol_1_1_001.jpg/revision/latest?cb=20221112174158",
  "blue-marvel":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/97/Adam_Brashear_%28Earth-616%29_from_Marvel_Legends_promotional_artwork_001.jpg/revision/latest?cb=20220314224837",
  "onslaught":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/36/Onslaught_%28Earth-616%29_from_Marvel_Masterpieces_%28Trading_Cards%29_1996_Set_001.jpg/revision/latest?cb=20051218191341",
  "stardust":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/46/Lambda-Zero_%28Earth-616%29_from_Annihilation_Silver_Surfer_Vol_1_3_0001.jpg/revision/latest?cb=20191126061545",
  "the-fallen-one":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7c/Fallen_One_%28Herald%29_%28Earth-616%29_from_Thanos_Vol_1_11_001.jpg/revision/latest?cb=20101209183132",
  "praeter":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b7/Praeter_%28Mike%29_%28Earth-616%29_from_Mighty_Thor_Vol_1_6_001.jpg/revision/latest?cb=20111002171207",
  /* Mutants, batch 10. All twelve resolved under real names on the first
     try — Frederick Dukes, Tabitha Smith, Jonothon Starsmore, Armando
     Munoz, Angelica Jones, Amara Aquilla, Kevin MacTaggert, Selene Gallio,
     James Proudstar. Rachel Summers is Earth-811, the future she is from. */
  "blob":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/3c/Frederick_Dukes_%28Earth-616%29_from_Uncanny_X-Men_Vol_6_7_001.jpg/revision/latest?cb=20241214224821",
  "boom-boom":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0d/Tabitha_Smith_%28Earth-616%29_from_X-Men_Vol_7_10_001.jpg/revision/latest?cb=20250203014233",
  "caliban":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5c/Caliban_%28Earth-616%29_from_NYX_Vol_2_3_001.jpg/revision/latest?cb=20240925191733",
  "callisto":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4a/Marauders_Vol_1_7_Textless.jpg/revision/latest?cb=20191120184928",
  "chamber":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c0/Jonothon_Starsmore_%28Earth-616%29_from_Weapon_X-Men_Vol_2_2_Shalvey_Variant_cover.jpg/revision/latest?cb=20241223092234",
  "darwin":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/54/Armando_Mu%C3%B1oz_%28Earth-616%29_from_X-Men_Vol_5_5_001.jpg/revision/latest?cb=20200131035105",
  "firestar":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/55/West_Coast_Avengers_Vol_4_1_Artgerm_Virgin_Variant.jpg/revision/latest?cb=20241128220131",
  "magma":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/35/Avengers_Vol_7_685_New_Mutants_Variant_Textless.jpg/revision/latest?cb=20180330070950",
  "proteus":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b5/X-Men_-_Forever_Vol_1_1_Quiet_Council_Variant_Textless.jpg/revision/latest?cb=20250130001739",
  "rachel-summers":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/X-Force_Vol_7_2_Rachel_Summers_Virgin_Variant.jpg/revision/latest?cb=20240901001722",
  "selene":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a6/Selene_Gallio_%28Earth-616%29_from_Immortal_X-Men_Vol_1_1_001.jpg/revision/latest?cb=20220401041713",
  "warpath":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/05/Uncanny_X-Men_Vol_1_476_Textless.jpg/revision/latest?cb=20210517183725",
  /* Mutants, batch 11. All twelve on the first try. */
  "cypher":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/33/Douglas_Ramsey_%28Earth-616%29_from_X-Men_Vol_7_19_cover_001.jpg/revision/latest?cb=20250702061540",
  "exodus":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/cc/Bennet_du_Paris_%28Earth-616%29_from_Immortal_X-Men_Vol_1_14_001.jpg/revision/latest?cb=20230810143335",
  "fantomex":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/28/Giant-Size_X-Men_Fantomex_Vol_1_1_Gist_Variant_Textless.jpg/revision/latest?cb=20210414094843",
  "hellion":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5a/Julian_Keller_%28Earth-616%29_from_NYX_Vol_2_1_001.jpg/revision/latest?cb=20240725161957",
  "nate-grey":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/86/Uncanny_X-Men_Vol_5_4_Textless.jpg/revision/latest?cb=20180919023849",
  "pixie":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/ba/Way_of_X_Vol_1_1_Unknown_Comic_Books_Exclusive_Pixie_Virgin_Variant.jpg/revision/latest?cb=20210404181229",
  "prodigy":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9b/X-Men_Vol_7_17_Pride_Variant_Textless.jpg/revision/latest?cb=20250523091419",
  "rictor":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a0/Julio_Richter_%28Earth-616%29_from_Excalibur_Vol_4_16_001.jpg/revision/latest?cb=20210113013547",
  "sauron":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f2/Karl_Lykos_%28Earth-616%29_from_X-Men_Unlimited_Infinity_Comic_Vol_1_8_001.jpg/revision/latest?cb=20211018153810",
  "scalphunter":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/88/John_Greycrow_%28Earth-616%29_from_Psylocke_Vol_2_9_001.jpg/revision/latest?cb=20250725193035",
  "stepford-cuckoos":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/99/NYX_Vol_2_4_Cuckoos_Virgin_Variant.jpg/revision/latest?cb=20240823102057",
  "vulcan":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/72/Gabriel_Summers_%28Earth-616%29_from_X-Men_Red_Vol_2_17_001.jpg/revision/latest?cb=20250812152352",
  /* Mutants, batch 12. Quentin Quire is filed as Quintavius Quire. */
  "armor":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b8/Hisako_Ichiki_%28Earth-616%29_from_Secret_X-Men_Vol_1_1_002.jpg/revision/latest?cb=20250327234000",
  "cecilia-reyes":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/47/X-Factor_Vol_5_4_Cecilia_Reyes_Virgin_Variant.jpg/revision/latest?cb=20250104115512",
  "dust":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/da/Sooraya_Qadir_%28Earth-616%29_from_Champions_Vol_3_10_cover_001.png/revision/latest?cb=20191005035218",
  "elixir":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c1/X-Men_-_Forever_Vol_1_2_Quiet_Council_Variant_Textless.jpg/revision/latest?cb=20250130001155",
  "mastermind":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e6/Hellions_Vol_1_9_from_cover_001.jpg/revision/latest?cb=20210215024644",
  "monet-st-croix":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/96/Monet_St._Croix_%28Earth-616%29_from_Giant-Size_X-Men_Storm_Vol_1_1_002.jpg/revision/latest?cb=20200917223338",
  "rockslide":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/ca/Young_X-Men_Vol_1_7_Textless.jpg/revision/latest?cb=20230104124139",
  "surge":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/75/Noriko_Ashida_%28Earth-616%29_from_X-Force_Vol_7_10_001.jpg/revision/latest?cb=20250426104228",
  "synch":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/05/X-Men_Vol_6_7_New_Line-Up_Trading_Card_Variant_Textless.jpg/revision/latest?cb=20211203182822",
  "xorn":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/51/Shen_Xorn_%28Earth-616%29_from_X-Men_Vol_7_1_001.jpg/revision/latest?cb=20240710133152",
  "kwannon":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/15/Psylocke_Vol_2_4_Textless.jpg/revision/latest?cb=20241123063239",
  "quentin-quire":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/18/Quintavius_Quire_%28Earth-616%29_from_X-Men_Vol_7_3_001.jpg/revision/latest?cb=20250521084021",
  /* Batch 13. Maggott is filed as "Maggott (Japheth)", Nocturne under
     Earth-2182 — the reality she is from. */
  "longshot":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/62/Longshot_%28Mojoverse%29_from_X-Men_Blue_Vol_1_13_001.jpg/revision/latest?cb=20180613015218",
  "lockheed":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7d/Lockheed_%28Earth-616%29_from_Marauders_Vol_2_11_Shavrin_Variant_cover_001.jpg/revision/latest?cb=20240917185810",
  "anole":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/84/NYX_Vol_2_3_Textless.jpg/revision/latest?cb=20250314202445",
  "blindfold":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c5/Ruth_Aldine_%28Earth-616%29_from_X-Men_Legacy_Vol_2_4_001.jpg/revision/latest?cb=20210926090224",
  "feral":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/Maria_Callasantos_%28Earth-616%29_from_X-Factor_Vol_5_1_001.jpg/revision/latest?cb=20240922181144",
  "frenzy":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/57/X-Factor_Vol_5_7_Black_History_Month_Variant_Textless.jpg/revision/latest?cb=20260226200926",
  "gateway":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d7/Gateway_%28Earth-616%29_from_House_of_X_Vol_1_1_cover_001.jpg/revision/latest?cb=20190725013509",
  "nocturne":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/da/Nocturne_%28Earth-616%29_from_Vampires_The_Marvel_Undead_001.png/revision/latest?cb=20170410030344",
  "omega-sentinel":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0f/Karima_Shapandar_%28Moira_10_%28A%29%29_from_Fall_of_the_House_of_X_Vol_1_4_001.jpg/revision/latest?cb=20240417210411",
  "wither":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/24/Kevin_Ford_%28Earth-616%29_from_X-Men_Battle_of_the_Atom_%28video_game%29_001.jpg/revision/latest?cb=20171022203242",
  "maggott":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/18/Maggott_%28Japheth%29_%28Earth-616%29_from_Storm_Vol_5_6_001.png.png/revision/latest?cb=20250416065525",
  "kitty-pryde":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/16/Exceptional_X-Men_Vol_1_10_Pride_Variant_Textless.jpg/revision/latest?cb=20250523091103",
  agamotto:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/ae/Agamotto_%28Earth-616%29_from_Sorcerer_Supreme_Vol_1_4_001.png/revision/latest?cb=20260318124429",
  chthon:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5b/Chthon_%28Earth-616%29_from_Darkhold_Omega_Vol_1_1_002.jpg/revision/latest?cb=20220106163854",
  /* Strange Tales 122 — his first clean full-figure appearance. */
  nightmare:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/55/Nightmare_%28Earth-616%29_from_Strange_Tales_Vol_1_122_0001.jpg/revision/latest?cb=20191220014305",
  terrax:
    "https://static.wikia.nocookie.net/marveldatabase/images/2/22/Tyros_%28Earth-616%29_from_Superior_Spider-Man_Vol_2_1_001.jpg/revision/latest?cb=20200505040204",
  /* Earth-691, the 31st century he is actually from — not the Earth X version. */
  korvac:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a1/Michael_Korvac_%28Earth-691%29_from_Iron_Man_Vol_5_15_001.jpg/revision/latest?cb=20211228033211",
  /* Wendell Vaughn in the Quasar suit, from his own gallery. */
  quasar:
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e6/Wendell_Vaughn_%28Earth-616%29_from_Annihilation_Nova_Vol_1_4_0001.jpg/revision/latest?cb=20161001030249",
  /* Her AS Nova, rather than the Fearless Defenders panel of her out of it. */
  "frankie-raye":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/497-nova.jpg",
  toxin: "https://i.redd.it/isk712hqkxq61.jpg",
  "moon-girl":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f0/Fantastic_Four_Vol_6_41_Black_History_Month_Variant_Textless.jpg/revision/latest?cb=20260227052625",
  /* The same portrait "The two people behind it" uses on What is Marvel. */
  "stan-lee": "https://image.tmdb.org/t/p/original/kKeyWoFtTqOPsbmwylNHmuB3En9.jpg",
  "erik-selvig":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6e/Erik_Selvig_%28Earth-616%29_from_Avengers_Standoff_Welcome_to_Pleasant_Hill_Vol_1_1_001.jpg/revision/latest?cb=20160218012151",
  "darcy-lewis":
    "https://static.wikia.nocookie.net/thor/images/3/31/Darcy_lewis.png/revision/latest?cb=20150507115716",
  "everett-ross":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1a/Black_Panther_%28film%29_poster_011_Textless.jpg/revision/latest?cb=20180318195759",
  "the-spot":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e5/Johnathon_Ohnn_%28Earth-616%29_from_Spider-Man_Unlimited_Infinity_Comic_Vol_1_2_001.jpg/revision/latest?cb=20231130202505",
  "red-skull":
    "https://static.wikia.nocookie.net/villains/images/0/0c/Red_skull_infobox.webp/revision/latest?cb=20240417011026",
  "andy-strucker":
    "https://static.wikia.nocookie.net/marvelmovies/images/d/d7/7FFC5FE3-B833-46E7-8640-30C0D2AE95D4.jpeg/revision/latest?cb=20180829043448",
  "super-skrull": "https://upload.wikimedia.org/wikipedia/en/8/87/Super_Skrull.jpg",
  colossus:
    "https://upload.wikimedia.org/wikipedia/en/2/26/Colossus-AvX_Consequences.jpg",
  deadpool:
    "https://static.wikia.nocookie.net/character-stats-and-profiles/images/f/fa/2022-01-22-17-00-08.jpg/revision/latest?cb=20220122140101",
  negasonic:
    "https://static.wikia.nocookie.net/p__/images/5/5b/8CA60400-8761-494F-9FB0-E16156DBC11F.png/revision/latest?cb=20221120120832&path-prefix=protagonist",
  shatterstar: "https://upload.wikimedia.org/wikipedia/en/b/be/Shatterstar.png",
  bedlam:
    "https://comicvine.gamespot.com/a/uploads/scale_medium/11144/111442876/9616112-ccrzcse.jpg",
  vanisher:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a7/Vanisher_%28Earth-616%29_from_Uncanny_X-Men_Vol_5_19_001.png/revision/latest?cb=20190608234221",
  zeitgeist:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/cb/Axel_Cluney_%28Earth-616%29_from_Giant-Size_X-Statix_Vol_1_1_002.png/revision/latest/scale-to-width-down/800?cb=20190715002648",
  "mister-negative":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c8/Mister_Negative_%28Earth-616%29_from_Amazing_Spider-Man_Vol_5_59_001.jpg/revision/latest?cb=20210321042930",
  magik:
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e6/Illyana_Rasputina_%28Earth-616%29_from_Extraordinary_X-Men_Vol_1_19_cover_001.jpg/revision/latest?cb=20170315030840",
  /* The automatic match found `Flash_Thompson.png` on the MCU wiki — Tony
     Revolori as the high-school bully, which is the right PERSON and entirely
     the wrong character. Agent Venom is what he becomes. */
  "agent-venom":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0c/Extreme_Carnage_Alpha_Vol_1_1_616_Comics_and_Jolzar_Collectibles_Exclusive_Variant_Textless.jpg/revision/latest?cb=20210901232245",
  northstar: "https://i.pinimg.com/736x/66/c4/70/66c4704583b875c6933296de905325fc.jpg",
  quicksilver:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/80/Pietro_Maximoff_%28Earth-616%29_from_Scarlet_Witch_%26_Quicksilver_Vol_1_3_Cover_001.jpg/revision/latest/scale-to-width-down/1200?cb=20250517010915",
  "white-tiger":
    "https://static.wikia.nocookie.net/p__/images/d/d8/Ava_Ayala_%28Earth-616%29_from_Mighty_Avengers_Vol_2_6_001.jpg/revision/latest?cb=20170425210855&path-prefix=protagonist",
  /* `utm_*` stripped: analytics the address bar appended, not part of the URL. */
  apocalypse:
    "https://upload.wikimedia.org/wikipedia/en/a/a0/Apocalypse_%28En_Sabah_Nur_-_circa_2009%29.jpg",
  thanos:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6f/Thanos_Vol_4_1_Lim_Virgin_Variant.jpg/revision/latest?cb=20231110201203",
  wolverine:
    "https://www.superherotoystore.com/cdn/shop/articles/4602600-8803586180-44110_688x.jpg?v=1468257272",
  "hank-pym":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0e/Hank_Pym_Quantumania.jpg/revision/latest?cb=20231124223815",
  "janet-van-dyne":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f7/Wasp_Vol_1_1_Nie_Variant_Textless.jpg/revision/latest?cb=20221225122128",
  "ant-man":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7c/Astonishing_Ant-Man_Vol_1_10_Mighty_Men_of_Marvel_Cancelled_Variant_Textless.jpg/revision/latest?cb=20160319233924",
  /**
   * APPLIED AS ASKED, AND THE FILENAME DISAGREES. This was sent for Hope, and
   * the file is called `Janet_van_Dyne_Earth-616_from_Uncanny_Avengers...` —
   * her mother. It is a real Wasp image either way; if it should be Janet's,
   * the two lines swap.
   */
  wasp: "https://oyster.ignimgs.com/wordpress/stg.ign.com/2018/01/Janet_van_Dyne_Earth-616_from_Uncanny_Avengers_Vol_3_10_001.jpg",
  "jessica-jones":
    "https://static.wikia.nocookie.net/heroes-and-villain/images/b/bd/Jessica_Jones.png/revision/latest?cb=20190324230446",
  "luke-cage":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/82/Luke_Cage_Gang_War_Vol_1_1_Textless.jpg/revision/latest/scale-to-width-down/1200?cb=20231126151302",
  /* Sent as `preview.redd.it` with an expiring `&s=` signature. Same upload
     id at the direct host, which has neither. */
  "iron-fist": "https://i.redd.it/ukz9z7cp8lka1.png",
  daredevil:
    "https://static.wikia.nocookie.net/heroes-and-villain/images/a/aa/Daredevil_Vol_6_21_Textless.jpg/revision/latest?cb=20250803023146",
  /* The automatic match found "Zemo Legends" — a Marvel Legends TOY BOX, so
     the portrait was a photograph of packaging. His character poster from The
     Falcon and the Winter Soldier instead. */
  zemo:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d5/TF%26TWS_Textless_Character_Posters_02.jpg/revision/latest?cb=20231021161327",
  /**
   * THE THREE PETERS — the actor in the suit, because that is the whole point
   * of these records. Every other portrait here is character art rather than
   * an actor still; these three are the exception the split exists for, since
   * the only thing separating them IS who is wearing it.
   */
  "spider-man-tom": "https://upload.wikimedia.org/wikipedia/en/0/0f/Tom_Holland_as_Spider-Man.jpg",
  /* Sent as `preview.redd.it` with an expiring `&s=` signature. Same upload
     id, asked of the direct host, which has neither. */
  "spider-man-andrew": "https://i.redd.it/qnd04cbvbefa1.jpg",
  /* Sent through a Yahoo image resizer that wraps the real file in its own
     signed path. Unwrapped to the address the resizer was pointing at. */
  "spider-man-tobey": "https://media.zenfs.com/en/us_magazine_896/8371b7c99efa855c94440f4fbb1ed7fb",
  "black-panther":
    "https://static.wikia.nocookie.net/superhero-films/images/9/9f/Black_Panther_OS_Vol_1_2.png/revision/latest?cb=20190203135803",
  "anti-venom":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5b/Amazing_Spider-Man_Presents_Anti-Venom_-_New_Ways_To_Live_Vol_1_1_Textless.jpg/revision/latest?cb=20160406162532",
  /**
   * The MCU wiki's own profile render. `scale-to-width-down/1200` is part of
   * the path, not a signature: a resize instruction the CDN serves forever.
   */
  "shang-chi":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/40/Shang-Chi_Profile.jpg/revision/latest/scale-to-width-down/1200?cb=20250318203001",
  vision:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/bf/Vision_%28Earth-616%29_from_Vision_and_the_Scarlet_Witch_Vol_3_1_001.jpg/revision/latest?cb=20250919162046",
  /**
   * Wikipedia's own file, with the `utm_*` parameters the address bar had
   * appended stripped off. They are analytics, not part of the address, and a
   * URL committed to a repo should carry neither.
   */
  "black-knight":
    "https://upload.wikimedia.org/wikipedia/en/6/66/Dane_Whitman_as_Black_Knight_%282020%29.jpg",
  /**
   * THE IMAGE THAT WAS SENT, at its permanent address.
   *
   * It arrived as a `preview.redd.it` link ending in `&s=<signature>`, which
   * is a signed cache entry that expires — the host refused for Riot, Morbius
   * and Kraven. But a preview is only a resized copy of a real upload, and
   * both share one id: `t3a1epygj48e1`. Asking `i.redd.it` for that id returns
   * the same picture at full size with no signature and no expiry.
   *
   * So the answer to a signed URL is not always a different picture. It is
   * usually the same picture, at the address that lasts.
   */
  "captain-marvel": "https://i.redd.it/t3a1epygj48e1.jpeg",
  /**
   * A PORTRAIT, because the tile is one and no URL can change that.
   *
   * The image sent for her was 1400×700 — a 2:1 article banner. The portrait
   * tile is 2:3, so `object-fit: cover` had to scale it about three times to
   * fill the height and then show the middle third. That reads as a zoom
   * because it IS one, and it is where the quality went: the crop is an
   * upscale, not a resize.
   *
   * Nothing about the address caused it, so nothing about the address could
   * fix it. The MCU wiki's infobox render is 1158×1436 — taller than wide,
   * larger than the box, cropped by nothing.
   */
  ramonda:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/1a/Ramonda_Infobox.png/revision/latest?cb=20231021151049",
  ayo: "https://static.wikia.nocookie.net/heroes-and-villain/images/1/12/BP_Ayo.jpg/revision/latest?cb=20181220165824",
};

/**
 * EVERY OVERRIDE KEY MUST BE A REAL ID — asserted, because it silently was not.
 *
 * Six hand-picked URLs were added by a script that matched on a key that had
 * been renamed, found nothing, and wrote the file back unchanged. The sync
 * then reported success, because writing no override is not an error to a loop
 * that iterates the overrides it has. Six portraits stayed wrong and the run
 * said it was fine.
 *
 * A key naming nobody is always a mistake — a typo or a rename — and it is the
 * kind that hides, so it fails the run rather than warning.
 */
function assertOverrideKeys(ids: Set<string>): void {
  const orphans = [
    ...Object.keys(IMAGE_OVERRIDES),
    ...Object.keys(PAGE_OVERRIDES),
  ].filter((id) => !ids.has(id));
  if (orphans.length) {
    throw new Error(
      `override keys naming no character: ${orphans.join(", ")}\n` +
        `  a renamed record leaves its override behind, pointing at nobody.`,
    );
  }
}

/**
 * NAME LOOKUP IS A GUESS. AN ARTICLE TITLE IS NOT.
 *
 * Everything above resolves a character by searching on their name and their
 * aliases, and for 140-odd people that lands on the right article. Where it
 * does not, the failure is quiet and it looks exactly like a success — a real
 * image, a 200, a plausible name in `matchedAs`, and the wrong person's face
 * in the grid. Three shipped that way:
 *
 *   Miles Morales   the MCU wiki has a stub called "Miles", for a nephew
 *                   mentioned once in Homecoming and never seen. Our Miles is
 *                   the Spider-Verse one, so he wants the comics article.
 *   Kraglin         resolved to a Legends episode card, not a portrait.
 *   Sebastian Shaw  the dataset's own no-portrait placeholder, above.
 *
 * So these name the ARTICLE, which is unambiguous, and they are consulted
 * before either automatic stage. The list should stay short: an entry here is
 * a statement that the search cannot find this person, not a way to override
 * one it finds correctly.
 */
const PAGE_OVERRIDES: Record<string, { wiki: string; page: string }> = {
  "miles-morales": {
    wiki: "https://marvel.fandom.com/api.php",
    page: "Miles Morales (Earth-1610)",
  },
  kraglin: {
    wiki: "https://marvelcinematicuniverse.fandom.com/api.php",
    page: "Kraglin Obfonteri",
  },
  "sebastian-shaw": {
    wiki: "https://marvel.fandom.com/api.php",
    page: "Sebastian Shaw (Earth-616)",
  },
  /**
   * The abstracts are filed under "(Multiverse)" rather than an Earth number,
   * because they are not on any Earth. Nothing in the name search reaches
   * that suffix, so the last gap in the corpus was one naming convention.
   */
  "the-one-below-all": {
    wiki: "https://marvel.fandom.com/api.php",
    page: "One Below All (Multiverse)",
  },
  "the-one-above-all": {
    wiki: "https://marvel.fandom.com/api.php",
    page: "One Above All (Multiverse)",
  },
  /**
   * TWO NOVAS, AND THE SEARCH FOUND NEITHER.
   *
   * `richard-rider` had resolved to the MCU wiki's "Irani.jpg" — Irani Rael,
   * the Nova Prime from Guardians of the Galaxy, who is a different person
   * with the same job title. It was the WRONG FACE and the URL had also gone
   * dead, which is how verify:assets surfaced it: a network failure on an
   * image that should never have been there in the first place.
   */
  "richard-rider": {
    wiki: "https://marvel.fandom.com/api.php",
    page: "Richard Rider (Earth-616)",
  },
};

export interface CharacterArt {
  /** Absolute URL. Null where no source has this character. */
  image: string | null;
  /** "chosen" is a hand-picked URL, which outranks both automatic sources. */
  source: "shdb" | "mcu-wiki" | "chosen" | null;
  /** What the source called them, so a bad match is visible in review. */
  matchedAs: string | null;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
/** For the mismatch report only: a leading article is not a different person. */
const bare = (s: string) => norm(s).replace(/^the/, "");

interface Hero {
  name: string;
  biography?: { fullName?: string; aliases?: string[]; publisher?: string };
  images?: { md?: string; lg?: string };
}

/**
 * OUR NAME AGAINST THEIR NAME, and nothing else.
 *
 * Two earlier versions of this were wrong in opposite directions and both
 * would have shipped confident pictures of the wrong people.
 *
 * First it flattened names and aliases into one map, so an alias of one
 * character claimed another character's actual name: Thor matched Thunderstrike,
 * Wolverine matched Mimic, Jean Grey matched Namor, Venom matched Doctor
 * Octopus.
 *
 * Then it filtered on `biography.publisher === "Marvel Comics"`, which looked
 * like basic hygiene and was worse. That field is CORRUPT in this dataset for a
 * large slice of records: Thor's publisher reads "Rune King Thor", Hawkeye's
 * reads "Goliath", Jean Grey's reads "Phoenix", Venom's reads "Anti-Venom". The
 * filter therefore removed exactly the canonical entries and left their
 * numbered variants, so Ant-Man resolved to Ant-Man II and Hawkeye to Hawkeye
 * II.
 *
 * So: exact name match, no alias tier, and an explicit table for the handful
 * where the two corpora genuinely use different canonical names. Explicit
 * beats fuzzy when the cost of being wrong is a portrait of somebody else.
 */
const OVERRIDES: Record<string, string> = {
  rocket: "Rocket Raccoon",
  drax: "Drax the Destroyer",
  "gwen-stacy": "Spider-Gwen",
  "the-thing": "Thing",
  "the-mandarin": "Mandarin",
  // Kate Bishop IS the second Hawkeye. Not a mismatch, a different name.
  "kate-bishop": "Hawkeye II",
  "professor-x": "Professor X",
  "winter-soldier": "Winter Soldier",
  "war-machine": "War Machine",
  "black-panther": "Black Panther",
  "scarlet-witch": "Scarlet Witch",
  "doctor-strange": "Doctor Strange",
  "doctor-octopus": "Doctor Octopus",
  "green-goblin": "Green Goblin",
  "silver-surfer": "Silver Surfer",
  "invisible-woman": "Invisible Woman",
  "mister-fantastic": "Mister Fantastic",
  "human-torch": "Human Torch",
  "iron-fist": "Iron Fist",
  "star-lord": "Star-Lord",
  "red-skull": "Red Skull",
  "doctor-doom": "Doctor Doom",
  "ghost-rider": "Ghost Rider",
  "black-widow": "Black Widow",
  "captain-america": "Captain America",
  "iron-man": "Iron Man",
  "ant-man": "Ant-Man",
  hawkeye: "Hawkeye",
  thor: "Thor",
  venom: "Venom",
  "jean-grey": "Jean Grey",
  punisher: "Punisher",
  lizard: "Lizard",
  kang: "Kang",
  "ms-marvel": "Ms Marvel II",
};

/**
 * The nine with no artwork: Pepper Potts, Shuri, Wong, Sylvie, Miles Morales,
 * Morbius, Echo, Killmonger and Agatha Harkness. The dataset is comics-era and
 * they are recent or supporting, so they are genuinely absent rather than
 * mismatched.
 *
 * They render the designed initial plate, and that is where it stays. The one
 * source that had all nine was Marvel's own API, which no longer issues keys.
 * The alternative — borrowing an actor still and letting it pass as character
 * art — is what C17 exists to forbid, and an honest gap beats a dishonest fill.
 */

async function fromShdb(): Promise<Map<string, CharacterArt>> {
  const res = await fetch(SHDB);
  if (!res.ok) throw new Error(`superhero dataset returned ${res.status}`);
  const all = (await res.json()) as Hero[];

  /**
   * DC is excluded, and the tie is broken on OUR OWN ALIASES.
   *
   * Two records are named "Captain Marvel": DC's Billy Batson and Marvel's
   * Carol Danvers. Breaking the tie on `publisher === "Marvel Comics"` looked
   * obviously right and picked BILLY BATSON, because Carol's publisher field
   * reads "Binary" in this dataset while Billy's correctly reads "DC Comics".
   * The grid shipped a picture of Shazam under the name Captain Marvel.
   *
   * The field is only trustworthy in one direction, so it is used only in that
   * direction: a record that says DC is DC. The tie is then broken with
   * information we actually own — the corpus already lists "Carol Danvers" as
   * an alias of Captain Marvel, and nothing in it mentions Billy Batson.
   */
  const byName = new Map<string, Hero[]>();
  for (const h of all) {
    if (h.biography?.publisher === "DC Comics") continue;
    const key = norm(h.name);
    byName.set(key, [...(byName.get(key) ?? []), h]);
  }

  const out = new Map<string, CharacterArt>();
  for (const c of characters) {
    const wanted = OVERRIDES[c.id] ?? c.nameEn;
    const found = byName.get(norm(wanted)) ?? [];
    const ours = new Set([c.nameEn, ...(c.aliases ?? [])].map(norm));
    const hit =
      found.find((h) =>
        [h.biography?.fullName, ...(h.biography?.aliases ?? [])]
          .filter(Boolean)
          .some((x) => ours.has(norm(x!))),
      ) ??
      found.find((h) => h.biography?.publisher === "Marvel Comics") ??
      found[0];
    /**
     * THE DATASET'S OWN PLACEHOLDER IS NOT ARTWORK.
     *
     * A record with no picture still carries an `images.md`, pointing at
     * `no-portrait.jpg` — a grey silhouette. It is a 200, it is a real image,
     * and every structural check passes on it. It shipped as Sebastian Shaw's
     * portrait and the reader saw a blank grey man.
     *
     * Treated as a miss, so he falls through to the wikis, where there is a
     * real one. This is the same principle as C17: an honest gap beats a
     * dishonest fill, and a placeholder from someone else's CDN is still a
     * dishonest fill.
     */
    const image = hit?.images?.md ?? null;
    const real = image !== null && !image.includes("no-portrait");
    out.set(c.id, {
      image: real ? image : null,
      source: real ? "shdb" : null,
      matchedAs: real ? (hit?.name ?? null) : null,
    });
  }
  return out;
}

/**
 * SECOND SOURCE, for the ones the comics dataset has never heard of.
 *
 * That dataset is comics-era, so it covers Wolverine and Magneto and has
 * nothing for Shuri, Okoye, Killmonger, Valkyrie, the Ancient One or any of
 * the thirty people credited in Endgame who exist only on film. Those are
 * exactly the characters a reader of THIS site is most likely to look up.
 *
 * The MCU wiki runs a public MediaWiki API with `pageimages`, keyless, and its
 * infobox image is a character portrait rather than a press photo of an actor.
 * Same posture as everything else here: the URL is stored, never the bytes.
 *
 * Comics art wins where both have it, so the corpus stays visually coherent
 * rather than alternating between drawn and photographic.
 */
async function fromFandom(names: string[], api: string): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  /** 20 titles per call is the API's documented ceiling for anonymous use. */
  for (let i = 0; i < names.length; i += 20) {
    const batch = names.slice(i, i + 20);
    const url =
      `${api}?action=query&prop=pageimages&piprop=original&format=json` +
      `&redirects=1&titles=${encodeURIComponent(batch.join("|"))}`;
    const res = await fetch(url);
    if (!res.ok) {
      fandomErrors.push(`batch ${i / 20}: HTTP ${res.status}`);
      continue;
    }
    const j = (await res.json()) as {
      query?: {
        pages?: Record<string, { title?: string; original?: { source?: string } }>;
        /** A redirect means we asked for "Wong" and landed on "Wong (Earth-199999)". */
        normalized?: { from: string; to: string }[];
        redirects?: { from: string; to: string }[];
      };
    };
    /** Map the resolved title back to what we asked for. */
    const back = new Map<string, string>();
    for (const r of [...(j.query?.normalized ?? []), ...(j.query?.redirects ?? [])]) {
      back.set(r.to, back.get(r.from) ?? r.from);
    }
    for (const page of Object.values(j.query?.pages ?? {})) {
      const src = page.original?.source;
      if (!src || !page.title) continue;
      const asked = back.get(page.title) ?? page.title;
      out.set(asked, src);
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  return out;
}

const fandomErrors: string[] = [];

async function main() {
  console.log("  source: public keyless dataset of character artwork\n");
  const art = await fromShdb();

  assertOverrideKeys(new Set(characters.map((c) => c.id)));

  /** Hand-picked art outranks everything, including the page overrides. */
  for (const [id, url] of Object.entries(IMAGE_OVERRIDES)) {
    art.set(id, { image: url, source: "chosen", matchedAs: "hand-picked" });
  }

  /**
   * The named articles first, so neither automatic stage can overwrite a
   * correction with the guess it was written to replace.
   */
  for (const wiki of new Set(Object.values(PAGE_OVERRIDES).map((o) => o.wiki))) {
    const ids = Object.entries(PAGE_OVERRIDES).filter(([, o]) => o.wiki === wiki);
    const found = await fromFandom(
      ids.map(([, o]) => o.page),
      wiki,
    );
    for (const [id, o] of ids) {
      const src = found.get(o.page);
      if (src) art.set(id, { image: src, source: "mcu-wiki", matchedAs: o.page });
      else fandomErrors.push(`page override missed: ${id} → ${o.page}`);
    }
  }

  /**
   * Fill the gaps from the wiki. Comics art wins where both have it: mixing
   * drawn portraits and film stills at random would make the grid look like two
   * sites stitched together.
   */
  for (const api of WIKIS) {
    const gaps = characters.filter((c) => !art.get(c.id)?.image);
    if (gaps.length === 0) break;
    /**
     * The canonical name first, then each alias. "Sylvie" is a disambiguation
     * page; "Sylvie Laufeydottir" is the article, and the corpus already lists
     * it because that is how TMDB credits her.
     */
    const asked = gaps.flatMap((c) => [c.nameEn, ...(c.aliases ?? [])]);
    const found = await fromFandom(asked, api);
    for (const c of gaps) {
      const src = [c.nameEn, ...(c.aliases ?? [])].map((n) => found.get(n)).find(Boolean);
      if (src) art.set(c.id, { image: src, source: "mcu-wiki", matchedAs: c.nameEn });
    }
  }

  const out: Record<string, CharacterArt> = {};
  for (const c of characters) out[c.id] = art.get(c.id) ?? { image: null, source: null, matchedAs: null };

  await writeFile(
    new URL("../content/character-art.generated.json", import.meta.url),
    JSON.stringify(out, null, 2) + "\n",
  );

  const withArt = Object.values(out).filter((x) => x.image);
  const without = Object.entries(out)
    .filter(([, x]) => !x.image)
    .map(([id]) => id);
  console.log(`\n  artwork     ${withArt.length}/${characters.length}`);
  if (without.length) {
    console.log(`  no artwork  ${without.length} — ${without.join(", ")}`);
    console.log("              these render the designed plate, which is a state, not a bug");
  }

  /**
   * A mismatch is the failure mode that ships silently: the run succeeds, the
   * page renders, and the picture is of somebody else. Printing what each name
   * resolved to makes it reviewable in the diff.
   */
  const odd = Object.entries(out).filter(
    ([id, x]) => x.matchedAs && bare(x.matchedAs) !== bare(characters.find((c) => c.id === id)!.nameEn),
  );
  if (odd.length) {
    console.log(`\n  matched under a different name — check these ${odd.length}:`);
    for (const [id, x] of odd) console.log(`    ${id.padEnd(24)} → ${x.matchedAs}`);
  }
  const bySource = new Map<string, number>();
  for (const v of Object.values(out)) {
    if (v.source) bySource.set(v.source, (bySource.get(v.source) ?? 0) + 1);
  }
  console.log("");
  for (const [src, n] of [...bySource].sort()) console.log(`  from ${src.padEnd(10)} ${n}`);
  if (fandomErrors.length) console.log(`  wiki errors ${fandomErrors.length}`);
  console.log("\n  wrote content/character-art.generated.json — commit it.\n");
}

await main();
