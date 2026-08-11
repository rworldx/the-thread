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
