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

const SHDB =
  "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
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
  /* A race has no page image, and C17b requires every character to have art.
     The Original Sin #8 textless cover is the Watcher council itself. */
  "captain-marvel-maria":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/27/Maria_Rambeau_Infobox.jpg/revision/latest?cb=20231025002315",
  "sharon-davis":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d3/Sharon_Davis_Infobox.jpg/revision/latest?cb=20240913184259",
  "the-watchers":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/39/Watchers_from_Original_Sin_Vol_1_8_Textless_cover_001.jpg/revision/latest?cb=20170905063428",
  /* PINNED BECAUSE THE LOOKUP DRIFTED. Speed's portrait had been the MCU
     wiki's `Tommy_Maximoff.png` since this repo started. That file was
     DELETED upstream and the page image replaced with an infobox still of a
     man in his thirties, so the next `sync:characters` swapped it in and I
     shipped it without looking. It was caught on the site.

     Nothing was hand-picked here and nothing was wrong with the sync: an
     un-pinned character takes whatever the wiki currently shows, and wikis
     change. This is Thomas Shepherd from Scarlet Witch & Quicksilver #3 --
     the comics Speed, white hair and green goggles, and pinned. */
  speed:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b7/Thomas_Shepherd_%28Earth-616%29_from_Scarlet_Witch_%26_Quicksilver_Vol_1_3_Cover_001.jpg/revision/latest?cb=20240504163646",
  /* Wendell Vaughn with the Quantum Bands lit, hand-picked. Hosted on
     the fanon wiki but the art is the standard black-and-gold design, and the
     host is the fandom CDN that most of this list already uses. */
  quasar:
    "https://static.wikia.nocookie.net/marvelcomicsfanon/images/b/b9/Quasar-0.jpg/revision/latest?cb=20190928225233",
  /* THE PICTURE RASHID PICKED, ON THE HOST THAT ACTUALLY RENDERS.
     I first stored the preview.redd.it link he sent and checked it with curl,
     which returned 206, and called that verified. It was not: `preview.redd.it`
     is absent from BOTH the remotePatterns allowlist and the CSP img-src, so
     the browser refused it and the tile came up empty. A 206 from curl proves
     the bytes exist, not that the page may fetch them.

     `i.redd.it` is already allowlisted, and the filename is a reddit media id,
     so the same image is there without the expiring `s=` signature and at
     higher quality: 1.1MB against 680KB, same 1988x2933. No new host, nothing
     to rot. */
  "the-maker": "https://i.redd.it/1s6rqf92bayc1.jpeg",
  /* The wiki's lead for her is the Infinity #1 Generals variant -- a group
     shot of the whole Black Order, which would have recreated the
     four-records-off-one-panel problem fixed two commits ago. This is solo. */
  supergiant:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7e/Supergiant_%28Earth-616%29_from_Marvel_War_of_Heroes_001.jpg/revision/latest?cb=20140305022027",
  maestro:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/aa/Maestro_Future_Imperfect_-_Marvel_Tales_Vol_1_1_Virgin_Variant.jpg/revision/latest?cb=20200924140549",
  /* FOUR RECORDS OFF ONE PANEL. Oshtur, Agamotto, Hoggoth and the Vishanti
     were all crops of the SAME image — Sorcerer Supreme Vol 1 #4, the panel
     where the trio is introduced. Different files, so a duplicate-URL check
     saw nothing; Oshtur's is the centre figure of the group shot the Vishanti
     record shows in full, with the same speech balloon visible in both.
     The group panel stays where it is correct, on the group. */
  "infinity-ultron":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/e/e7/Infinity_Ultron_-_Age_of_Ultron_Infobox.png/revision/latest?cb=20231021045211",
  /* THE ETERNALS BACK ON FILM, reversing my own change from two days ago.
     Comic art was chosen first; seeing it on
     the page he wanted the film after all, which is the answer that only
     arrives by looking at it.

     Matched to IKARIS, who is not in this list and must not move: his is the
     Disney wiki's "- Profile", a clean close-up. Sersi, Ajak and Makkari have
     one of those too. The other five take the film's own character posters,
     which are the same kind of shot — tight on the face, no text. */
  sersi:
    "https://static.wikia.nocookie.net/disney/images/2/27/Sersi_-_Profile.jpg/revision/latest?cb=20220810095305",
  ajak: "https://static.wikia.nocookie.net/disney/images/3/30/Ajak_-_Profile.jpg/revision/latest?cb=20211028201306",
  makkari:
    "https://static.wikia.nocookie.net/disney/images/1/10/Makkari_-_Profile.webp/revision/latest?cb=20220611235508",
  /* THE OTHER FIVE ETERNALS, off the film's character posters, which were
     did not like. The posters were fine images and the wrong kind: they read
     as marketing beside Ikaris's clean portrait.

     The MCU wiki's alternatives all turned out to be crops of one AR asset
     with the character's NAME set vertically down the frame, which is worse
     at tile size than the posters were. These are the Hero Wiki's MCU
     portraits — 3000x4500 apiece, one style across all five, no text. */
  kingo:
    "https://static.wikia.nocookie.net/p__/images/8/80/Kingo-MCU.jpg/revision/latest?cb=20220706020730&path-prefix=protagonist",
  druig:
    "https://static.wikia.nocookie.net/p__/images/5/5e/Druig-MCU.jpg/revision/latest?cb=20220706020833&path-prefix=protagonist",
  gilgamesh:
    "https://static.wikia.nocookie.net/p__/images/8/86/Gilgamesh-MCU.jpg/revision/latest?cb=20220706020923&path-prefix=protagonist",
  phastos:
    "https://static.wikia.nocookie.net/p__/images/8/80/Phastos-MCU.jpg/revision/latest?cb=20220706020748&path-prefix=protagonist",
  sprite:
    "https://static.wikia.nocookie.net/p__/images/2/24/Sprite-MCU.jpg/revision/latest?cb=20220501070220&path-prefix=protagonist",
  /* Thena was on a "First Look" promo and was in neither list,
     but a matching Profile exists and she is the last of the ten still off
     the set. */
  thena:
    "https://static.wikia.nocookie.net/disney/images/2/2f/Thena_-_Profile.png/revision/latest?cb=20230115202922",

  /* THE FANTASTIC FOUR AS A SET. All four were on the superhero-api renders,
     and the wiki's own lead image is a different artist and crop for each —
     fine alone, incoherent in a row, and this team is always seen in a row.
     These are the four Alex Ross Timeless variants from Fantastic Four Vol 6
     #24: one issue, one artist, four portraits that belong together.

     Franklin is deliberately not here. His is fine. */
  "mister-fantastic":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b5/Fantastic_Four_Vol_6_24_Mister_Fantastic_Timeless_Variant.jpg/revision/latest?cb=20200929194348",
  "invisible-woman":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9f/Fantastic_Four_Vol_6_24_Invisible_Woman_Timeless_Variant.jpg/revision/latest?cb=20200929194328",
  "the-thing":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1f/Fantastic_Four_Vol_6_24_The_Thing_Timeless_Variant.jpg/revision/latest?cb=20200929194401",
  "human-torch":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b8/Fantastic_Four_Vol_6_24_Human_Torch_Timeless_Variant.jpg/revision/latest?cb=20200929194308",
  /* FOUR MORE OFF THE SUPERHERO-API, which the name lookup reaches for when
     the wiki has nothing, and which serves low-res renders. All four are
     first-rank characters and were the worst portraits on the page. */
  /* The wiki article is "STEVEN Rogers (Earth-616)" — "Steve Rogers" is a
     redirect with no lead image, which is how he ended up on the fallback.
     Searching by name instead lands in the Secret Empire run, where Cap is
     HYDRA, which is not the picture a browser of this site is looking for. */
  "captain-america":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b1/Captain_America_Vol_6_2_Textless.jpg/revision/latest?cb=20110719042719",
  magneto:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9e/Max_Eisenhardt_%28Earth-616%29_from_X-Men_Vol_7_1_001.jpg/revision/latest?cb=20240710102753",
  /* The House of X flower variant, textless — Xavier in the Cerebro helmet,
     which is the version of him this corpus ranks. */
  "professor-x":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/44/House_of_X_Vol_1_1_Flower_Variant_Textless.jpg/revision/latest?cb=20200514075425",
  crystal:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/97/War_of_Kings_Warriors_Vol_1_2_Textless.jpg/revision/latest?cb=20100204183714",
  /* The name lookup found him on the superhero-api, which serves a low-res
     render. This is the Jim Lee variant for Red Hulk Vol 1 #1, textless, and
     it is Thaddeus Ross rather than Robert Maverick — the wiki's own "Red
     Hulk" article leads with Maverick, who is a different man. */
  "thaddeus-ross":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f1/Red_Hulk_Vol_1_1_Lee_Variant_Textless.jpg/revision/latest?cb=20250623193825",
  "master-mold":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/08/Master_Mold_%28Earth-616%29%2C_Brian_Braddock_%28Earth-616%29%2C_and_Jim_Hammond_%28Earth-616%29_from_Secret_Avengers_Vol_1_36_0001.jpg/revision/latest?cb=20131104210811",
  bastion:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6d/Sebastion_Gilberti_%28Earth-616%29_from_X-Men_Blue_Vol_1_3_001.jpg/revision/latest?cb=20180605022436",
  egghead:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/42/Elihas_Starr_%28Earth-616%29_from_Ant-Man_Annual_Vol_1_1_001.jpg/revision/latest?cb=20150723192140",
  enchantress:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/Immortal_Thor_Vol_1_17_Go_Variant_Textless.jpg/revision/latest?cb=20241123063641",
  songbird:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/50/Thunderbolts_Doomstrike_Vol_1_1_Tao_Virgin_Variant.jpg/revision/latest?cb=20250221195650",
  rhino:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/18/Aleksei_Sytsevich_%28Earth-616%29_from_Miles_Morales_Spider-Man_Vol_1_1_001.jpg/revision/latest?cb=20191010044711",
  triton:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/dc/Triton_%28Earth-616%29_from_Civil_War_II_Vol_1_1_001.jpg/revision/latest?cb=20160601210850",
  dagger:
    "https://static.wikia.nocookie.net/marvelcrossroads/images/c/c2/Dagger_%28Marvel_Resuited%29.jpg/revision/latest?cb=20200430220411",
  cloak:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d7/Cloak_from_Marvel_Snap_004.jpg/revision/latest?cb=20251104201535",
  "amadeus-cho":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/97/Totally_Awesome_Hulk_Vol_1_1_Cho_Variant_Textless.jpg/revision/latest/scale-to-width-down/732?cb=20150917021939",
  "ka-zar":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/05/Kevin_Plunder_%28Earth-616%29_from_Avengers_Vol_8_50_004.jpg/revision/latest?cb=20230103031755",
  zabu: "https://static.wikia.nocookie.net/marveldatabase/images/1/10/Zabu_%28Earth-616%29_from_Empyre_Avengers_Vol_1_1_001.jpg/revision/latest?cb=20210131203513",
  /* The Earth-828 Surfer on her board. The wiki lookup finds an MCU-wiki
     infobox for her, but this is the one that reads as the character. */
  "shalla-bal":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5e/Shalla-Bal_%28Earth-828%29_from_The_Fantastic_Four_First_Steps_promotional_material_002.jpg/revision/latest?cb=20250711075836",
  "ms-marvel":
    "https://www.hollywoodreporter.com/wp-content/uploads/2018/12/ms._marvel_38_-_publicity_-_p_2018.jpg",
  echo: "https://static.wikia.nocookie.net/p__/images/0/0d/Maya_Lopez_%28Earth-616%29_from_Daredevil_Vol_2_10_cover.jpg/revision/latest?cb=20240109231654&path-prefix=protagonist",
  ultron: "https://upload.wikimedia.org/wikipedia/en/5/5e/Ultron_%28MCU%29.png",
  okoye:
    "https://i.pinimg.com/originals/65/a0/c0/65a0c0db02e90a95d04e93c9477ceca0.jpg",
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
  punisher:
    "https://comicvine.gamespot.com/a/uploads/scale_medium/1/15776/9998597-punisher.jpg",
  "the-beyonder":
    "https://i.pinimg.com/736x/7c/12/73/7c1273e72145647b433b44d43bf870dc.jpg",
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
  phoenix:
    "https://static.wikia.nocookie.net/marveldatabase/images/e/ee/Phoenix_Force_%28Earth-616%29_from_Avengers_Vol_8_32_001.jpg/revision/latest?cb=20210406171416",
  starfox:
    "https://static.wikia.nocookie.net/crossgencomicsdatabase/images/2/24/Starfox_Thanos_Vol_2_7.png/revision/latest?cb=20201205021117",
  "jane-foster":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/8e/Jane_Foster_%28Earth-616%29_from_Mighty_Thor_Vol_2_1_001.jpg/revision/latest/scale-to-width-down/791?cb=20151118210746",
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
  "spider-man-noir":
    "https://static.wikia.nocookie.net/p__/images/e/e7/1733106593483_v2pt7q_2_1~2.jpg/revision/latest?cb=20241202023919&path-prefix=protagonist",
  "spider-punk":
    "https://static.wikia.nocookie.net/spiderverseseries/images/8/80/Spider-Punk_-_ATSV.png/revision/latest?cb=20230601181414",
  "peni-parker":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6a/Edge_of_Spider-Geddon_Vol_1_2_Textless.jpg/revision/latest?cb=20181005044750",
  "spider-ham":
    "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-spider-ham.webp",
  "spider-man-2099":
    "https://static.wikia.nocookie.net/spiderverseseries/images/a/ac/Miguel_O%27Hara_-_ATSV.png/revision/latest?cb=20230601181303",
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
  hobgoblin:
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2d/Spider-Man_Vol_2_237_Textless.jpg/revision/latest?cb=20171219181335",
  "mary-jane-watson":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d3/Mary_Jane_Watson_%28Earth-616%29_from_Amazing_Spider-Man_Vol_5_50.LR_001.jpg/revision/latest?cb=20210315024600",
  "michelle-jones":
    "https://static.wikia.nocookie.net/p__/images/f/f2/MJ-NWH.png/revision/latest?cb=20220308041822&path-prefix=protagonist",
  riot: "https://static.wikia.nocookie.net/villains/images/9/97/Riot_%28Earth-616%29_from_Absolute_Carnage_Scream_Vol_1_1_Bagley_Connecting_Variant_cover_001.jpg/revision/latest?cb=20241029173122",
  morbius:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6c/Morbius_Vol_1_1_Textless.jpg/revision/latest?cb=20211102194828",
  /**
   * KRAVEN IS A SUBSTITUTION, on the same rule as the Punisher and the
   * Phoenix. The URL offered was `preview.redd.it` with an `s=` signature — a
   * signed cache entry, not a host, and those expire. The Marvel wiki's own
   * cover instead.
   */
  /* Supplied. The 2017 design: lion mane, leopard print, rifle, standing over
     Venom. Tracking parameters stripped from the URL -- they are analytics,
     not part of the file. It is only 255x391, which is small for the grid and
     is the size Wikipedia hosts; there is no larger copy on that host. */
  kraven:
    "https://upload.wikimedia.org/wikipedia/en/2/21/Kraven_the_Hunter_%282017_Design%29.webp",
  "spider-woman":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9d/Spider-Woman_Vol_7_11_Textless.jpg/revision/latest?cb=20210116123553",
  "julia-carpenter":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/74/Julia_Carpenter_%28Earth-616%29_from_Prowler_Vol_2_2_001.jpg/revision/latest?cb=20191006044458",
  "anya-corazon":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e2/A%C3%B1a_Coraz%C3%B3n_%28Earth-616%29_from_Edge_of_Spider-Verse_Vol_2_1_001.jpg/revision/latest?cb=20220804155915",
  "mattie-franklin":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/19/Martha_Franklin_%28Earth-616%29_from_Silk_Vol_2_14_001.jpg/revision/latest?cb=20260611235256",
  "ezekiel-sims":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/39/Ezekiel_Sims_%28Earth-616%29_from_Amazing_Spider-Man_Vol_2_33_cover.jpg/revision/latest?cb=20191219062701",
  "madame-web":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9e/Cassandra_Webb_%28Earth-616%29_from_Prowler_Vol_2_1_001.jpg/revision/latest?cb=20220428150725",
  "captain-carter":
    "https://theronin.org/wp-content/uploads/2021/08/captain-carter_haley-atwell_invaders_mcu_what-if_.jpeg?w=469",
  /* The MCU wiki's Throg is a blurry frame grab. This is the comics cover. */
  throg:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/be/Thor_Vol_6_18_Textless.jpg/revision/latest?cb=20211206190320",
  "president-loki":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2c/Loki_%28TV_series%29_poster_013.jpg/revision/latest?cb=20210712144857",
  "aunt-may":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e2/Maybelle_Parker_%28Earth-616%29_from_Howard_the_Duck_Vol_6_1_cover_001.jpg/revision/latest?cb=20220628175232",
  sentinels:
    "https://static.wikia.nocookie.net/xmenmovies/images/d/d9/Markx.jpg/revision/latest?cb=20140714214324",
  yondu:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6d/All-New_Guardians_of_the_Galaxy_Annual_Vol_1_1_Mora_Variant_Textless.jpg/revision/latest?cb=20170623090214",
  ikaris:
    "https://static.wikia.nocookie.net/disney/images/e/e7/Ikaris_-_Profile.jpg/revision/latest?cb=20220626100045",
  infinity:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/aa/Infinity_%28Multiverse%29_from_Ultimates_2_Vol_2_100_001.jpg/revision/latest?cb=20190206130229",
  "the-runner":
    "https://static.wikia.nocookie.net/marvelcomicsfanon/images/8/8f/Runner_61615.jpg/revision/latest?cb=20190319143937",
  oblivion:
    "https://static.wikia.nocookie.net/marveldatabase/images/0/07/Oblivion_%28Earth-616%29_from_Mighty_Thor_Annual_Vol_1_1_001.jpg/revision/latest/scale-to-width-down/985?cb=20211130020701",
  "molecule-man":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/67/Owen_Reece_%28Earth-616%29_from_New_Avengers_Vol_3_24_001.jpg/revision/latest?cb=20240516161927",
  knull: "https://cdn.marvel.com/content/2x/venom_2018_4_1.webp",
  "doctor-doom":
    "https://static.wikia.nocookie.net/heroes-and-villain/images/f/fc/Doctor_Doom.jpg/revision/latest?cb=20220208120207",
  "squirrel-girl":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/30/Unbeatable_Squirrel_Girl_Vol_2_7_Classic_Variant_Textless.jpg/revision/latest?cb=20160119180039",
  prowler:
    "https://static.wikia.nocookie.net/villains/images/8/89/Prowler2.jpg/revision/latest?cb=20190227002026",
  "a-bomb":
    "https://static.wikia.nocookie.net/marvel-battlelines/images/c/c9/Screenshot_2018-11-15-13-16-45.png/revision/latest?cb=20181116004936",
  "adam-warlock":
    "https://i.pinimg.com/736x/b6/30/78/b63078241e496fdaf4073646a12da56c.jpg",
  sentry:
    "https://static.wikia.nocookie.net/characterprofile/images/e/ed/Sentry_Marvel_Comics.jpeg/revision/latest/scale-to-width-down/1200?cb=20250525071708",
  "kate-bishop":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/df/Katherine_Bishop_%28Earth-616%29_from_Hawkeye_Kate_Bishop_Vol_1_1_cover.jpg/revision/latest?cb=20211130210330",
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
  oneg: "https://static.wikia.nocookie.net/marveldatabase/images/9/9e/Oneg_%28First_Cosmos%29_from_Official_Handbook_of_the_Marvel_Universe_Master_Edition_Vol_1_1_001.jpg/revision/latest?cb=20161030073221",
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
  hammerhead:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/15/Amazing_Spider-Man_Vol_3_17.1_Textless.jpg/revision/latest?cb=20150119193829",
  "hydro-man":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/ee/Classic_Marvel_Figurine_Collection_Vol_1_163_Textless.png/revision/latest?cb=20240421080822",
  /* Supplied. Switched from `scale_medium` to `original` on the same file --
     same picture, 400x549 instead of the thumbnail. Comic Vine keeps both and
     the host is already allowlisted in remotePatterns and the CSP. */
  "molten-man":
    "https://comicvine.gamespot.com/a/uploads/original/0/40/79267-88077-molten-man.jpg",
  silvermane:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b2/Silvio_Manfredi_%28Earth-616%29_from_Silk_Vol_3_3_001.jpg/revision/latest?cb=20250622044037",
  beetle:
    "https://static.wikia.nocookie.net/marveldatabase/images/0/07/Abner_Jenkins_%28Earth-616%29_from_Thunderbolts_Vol_4_4_001.png/revision/latest?cb=20160901025546",
  /* NOT the Venom cover. The wiki's own page image for Frederick Myers
     (Earth-616) is `Web_of_Venom_Vol_1_1_Virgin_Variant.jpg`, a Venom cover
     with no Boomerang anywhere on it, and the bulk pin FROZE it -- because
     the check I ran compared `matchedAs` against the NAME and never looked at
     the picture. Someone did. This is his Official Handbook
     entry: purple and blue, boomerang chevrons, winged headpiece. */
  boomerang:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c1/Frederick_Myers_%28Earth-616%29_from_Official_Handbook_of_the_Marvel_Universe_A_to_Z_Update_Vol_1_5_0001.jpg/revision/latest?cb=20160821032812",
  vermin:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/32/Edward_Whelan_%28Earth-616%29_from_Spider-Gwen_The_Ghost-Spider_Vol_1_5_001.jpg/revision/latest?cb=20240913225111",
  demogoblin:
    "https://static.wikia.nocookie.net/marveldatabase/images/2/22/Demogoblin_%28Earth-616%29_from_Absolute_Carnage_Lethal_Protectors_Vol_1_2_cover_001.jpg/revision/latest?cb=20190922001604",
  "alistair-smythe":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6c/Alistaire_Smythe_%28Earth-616%29_from_Amazing_Spider-Man_Vol_2_650_0001.jpg/revision/latest?cb=20191129030806",
  "silver-sable":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c2/Silvija_Sablinova_%28Earth-616%29_from_Wolverine_Vol_8_14_001.jpg/revision/latest?cb=20260108161834",
  calypso:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/de/Calypso_%28Earth-616%29_from_Marvel_Illustrated_The_Odyssey_Vol_1_2_002.jpg/revision/latest?cb=20231118184004",
  /* Mutants. Marvel Database files most of them under their real names —
     Elizabeth Braddock, James Madrox, Teresia Karisik, Xuan Cao Manh,
     Kevin Sidney — so a codename lookup returns nothing. */
  psylocke:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4f/X-Force_Vol_7_7_Textless.jpg/revision/latest?cb=20240922081512",
  "multiple-man":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/71/X-Factor_Vol_3_47_70th_Frame_Variant_Textless.jpg/revision/latest?cb=20210404124655",
  marrow:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c2/Marrow_%28Sarah%29_%28Earth-616%29_from_Secret_X-Men_Vol_1_1_Cover.jpg/revision/latest?cb=20220210231006",
  forge:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/80/X-Force_Vol_7_1_Forge_Virgin_Variant.jpg/revision/latest?cb=20240801205535",
  sage: "https://static.wikia.nocookie.net/marveldatabase/images/9/96/X-Force_Vol_7_6_Sage_Virgin_Variant.jpg/revision/latest?cb=20241202053713",
  karma:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b5/Marvel%27s_Voices_Pride_Vol_1_1_Souza_Variant_Textless.jpg/revision/latest?cb=20210522181124",
  husk: "https://static.wikia.nocookie.net/marveldatabase/images/7/77/Paige_Guthrie_%28Earth-616%29_from_Astonishing_X-Men_Infinity_Comic_Vol_1_20_001.jpg/revision/latest?cb=20250513085839",
  siryn:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/75/Theresa_Cassidy_%28Earth-616%29_from_X-Factor_Vol_4_6_001.jpg/revision/latest?cb=20210111225550",
  sunfire:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d5/X-Men_Vol_6_4_New_Line-Up_Trading_Card_Variant_Textless.jpg/revision/latest?cb=20220128090535",
  morph:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c0/Kevin_Sidney_%28Earth-616%29_from_Astonishing_X-Men_Infinity_Comic_Vol_1_41_001.jpg/revision/latest?cb=20251024140411",
  mimic:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4e/Calvin_Rankin_%28Earth-616%29_from_X-Men_Legacy_Vol_1_264_001.jpg/revision/latest?cb=20120328234818",
  "madelyne-pryor":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d3/Dark_X-Men_Vol_2_2_Larroca_Variant_Textless.jpg/revision/latest?cb=20250113033319",
  /* The Inheritors are catalogued under Earth-001, their home reality, not
     Earth-616. Spider-UK is Earth-833 and filed as William Braddock. */
  "omega-red":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/99/Wolverine_Vol_7_11_Unknown_Comic_Books_Exclusive_Virgin_Variant.jpg/revision/latest?cb=20210403195047",
  silk: "https://static.wikia.nocookie.net/marveldatabase/images/3/37/Silk_Vol_3_1_Yoon_Virgin_Variant.jpg/revision/latest?cb=20210327180532",
  kaine:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/bc/Scarlet_Spider_Vol_2_1_Bagley_Variant_Textless.jpg/revision/latest?cb=20111207185824",
  morlun:
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f5/Morlun_%28Earth-001%29_from_Spider-Man_Vol_4_1_001.jpg/revision/latest?cb=20260324164257",
  solus:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/ae/Solus_%28Earth-001%29_from_Amazing_Spider-Man_Vol_3_11_0003.jpeg/revision/latest?cb=20141214032444",
  verna:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/dc/Spider-Force_Vol_1_2_Textless.jpg/revision/latest?cb=20180822075733",
  daemos:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/90/Daemos_%28Earth-001%29_from_Amazing_Spider-Man_Vol_3_8_0001.png/revision/latest?cb=20141025084417",
  jennix:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/40/Jennix_%28Earth-001%29_from_Scarlet_Spiders_Vol_1_2_001.jpg/revision/latest?cb=20141229034533",
  brix: "https://static.wikia.nocookie.net/marveldatabase/images/e/e7/Brix_%28Earth-001%29_from_Spider-Girls_Vol_1_2_001.jpg/revision/latest?cb=20210430201140",
  bora: "https://static.wikia.nocookie.net/marveldatabase/images/a/a3/Bora_%28Earth-001%29_from_Superior_Spider-Man_Vol_1_33_001.png/revision/latest?cb=20140918235552",
  karn: "https://static.wikia.nocookie.net/marveldatabase/images/1/14/Karn_%28Earth-001%29_from_Spider-Geddon_Vol_1_2_001.jpg/revision/latest?cb=20240413203542",
  "spider-uk":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c0/William_Braddock_%28Earth-833%29_from_Amazing_Spider-Man_Vol_3_7_002.jpg/revision/latest?cb=20141012071303",
  /* Symbiotes are filed under "(Symbiote)", their hosts under real names —
     Andrea Benton, Scott Washington, Tanis Nieves, Dmitri Smerdyakov, Lily
     Hollister, Phillip Urich. */
  lasher:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a6/Extreme_Carnage_Lasher_Vol_1_1_Comic_Kingdom_of_Canada_Exclusive_Virgin_Variant.jpg/revision/latest?cb=20210721011601",
  phage:
    "https://static.wikia.nocookie.net/marveldatabase/images/e/ed/Extreme_Carnage_Phage_Vol_1_1_Textless.jpg/revision/latest?cb=20211015151651",
  sleeper:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9e/Venom_Vol_4_20_Codex_Variant_Textless.jpg/revision/latest?cb=20200823015914",
  mania:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7e/Andrea_Benton_%28Earth-616%29_and_Silence_%28Symbiote%29_%28Earth-616%29_from_Venom_War_Deadpool_Vol_1_2_Cover.jpg/revision/latest?cb=20260205183440",
  hybrid:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/34/Venom_Vol_4_18_Codex_Variant_Textless.jpg/revision/latest?cb=20190901185734",
  "dylan-brock":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a8/Dylan_Brock_%28Earth-616%29_and_Toxin_%28Symbiote%29_%28Earth-616%29_from_Venom_Vol_6_259_001.jpg/revision/latest?cb=20260627030657",
  scorn:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/af/Tanis_Nieves_%28Earth-616%29_and_Scorn_%28Symbiote%29_%28Earth-616%29_from_Carnage%2C_U.S.A._Vol_1_5_001.png/revision/latest?cb=20120422120551",
  chameleon:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/65/Dmitri_Smerdyakov_%28Earth-616%29_from_Giant-Size_Amazing_Spider-Man_Chameleon_Conspiracy_Vol_1_1_cover_001.jpg/revision/latest?cb=20210712021523",
  menace:
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
  eon: "https://static.wikia.nocookie.net/marveldatabase/images/e/e4/Eon_%28Earth-616%29_from_Captain_Marvel_Vol_1_28_0001.jpg/revision/latest?cb=20161011040647",
  epoch:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/Epoch_%28Earth-616%29_from_Fantastic_Four_Vol_3_544_0001.jpg/revision/latest?cb=20191202032038",
  entropy:
    "https://static.wikia.nocookie.net/marveldatabase/images/2/22/Entropy_%28Earth-616%29_from_Captain_Marvel_Vol_5_5_001.jpg/revision/latest?cb=20220901143731",
  kronos:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4b/Kronos_%28Earth-616%29_from_Eternals_Thanos_Rises_Vol_1_1_001.jpg/revision/latest?cb=20220228050646",
  tenebrous:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/31/Tenebrous_%28Earth-616%29_from_Annihilation_Silver_Surfer_Vol_1_3_002.jpg/revision/latest?cb=20191126061634",
  "the-stranger":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/83/Stranger_%28Cosmic_Being%29_%28Earth-616%29_from_Howard_the_Duck_Vol_6_3_001.jpg/revision/latest?cb=20160102080157",
  nemesis:
    "https://static.wikia.nocookie.net/marveldatabase/images/f/fb/Nemesis_%28Cosmic_Being%29_%28First_Cosmos%29_from_Avengers_UltraForce_Vol_1_1_001.jpg/revision/latest?cb=20180303090223",
  protege:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6f/Prot%C3%A9g%C3%A9_%28Earth-691%29_from_Guardians_of_the_Galaxy_Vol_1_15_0001.jpg/revision/latest?cb=20191127024328",
  /* Mystics: Shuma-Gorath under (Multiverse), the Demiurge filed as
     "Demiurge Primordial". */
  /* FOUR RECORDS OFF ONE PANEL. Oshtur, Agamotto, Hoggoth and the Vishanti
     were all crops of the SAME image — Sorcerer Supreme Vol 1 #4, the panel
     where the trio is introduced. Different files, so a duplicate-URL check
     saw nothing: Oshtur's was the centre figure of the group shot the
     Vishanti record shows in full, with the same speech balloon in both.
     The group panel stays where it is correct, on the group. */
  oshtur:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/80/Oshtur_%28Earth-616%29_from_Mystic_Arcana_Sister_Grimm_Vol_1_1_001.jpg/revision/latest?cb=20190728002830",
  hoggoth:
    "https://static.wikia.nocookie.net/marveldatabase/images/0/07/Hoggoth_%28Earth-616%29_from_Doctor_Strange_Vol_4_383_001.jpg/revision/latest?cb=20190826051817",
  agamotto:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b5/Agamotto_%28Earth-616%29_from_Marvel_Legacy_Vol_1_1_Deodato_Wraparound_Variant_Textless.jpg/revision/latest?cb=20181021191219",
  cyttorak:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/85/Cyttorak_%28Earth-616%29_and_Cain_Marko_%28Earth-616%29_from_Juggernaut_Vol_3_4_001.jpg/revision/latest?cb=20210519150308",
  umar: "https://static.wikia.nocookie.net/marveldatabase/images/8/87/Strange_Vol_3_4_Lubera_Variant_Textless.jpg/revision/latest?cb=20220727113619",
  zom: "https://static.wikia.nocookie.net/marveldatabase/images/5/5b/Zom_%28Earth-616%29_from_Strange_Tales_Vol_1_156_031.jpg/revision/latest?cb=20211215050707",
  /* Supplied. It is the Earth-807128 Gaea out of Fantastic Force rather than
     the Immortal Thor plate that was here, and it is the better portrait:
     the face is clear and it is shaped for the grid. Same Elder Goddess,
     drawn in another reality, which the corpus already accepts elsewhere. */
  gaea: "https://static.wikia.nocookie.net/marveldatabase/images/f/f1/Gaea_%28Earth-807128%29_from_Fantastic_Force_Vol_2_3_0001.jpg/revision/latest?cb=20101215121333",
  set: "https://static.wikia.nocookie.net/marveldatabase/images/f/fb/Set_%28Earth-616%29_from_Savage_Avengers_Vol_2_4_0001.jpeg/revision/latest?cb=20221110064408",
  "shuma-gorath":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2c/Invaders_Now%21_Vol_1_4_Textless.jpg/revision/latest?cb=20160517200603",
  "the-demiurge":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/75/Demiurge_Primordial_%28Earth-616%29_from_Immortal_Thor_Vol_1_5_001.jpg/revision/latest?cb=20260124002743",
  /* Heralds: Stardust is filed as Lambda-Zero, the Fallen One under
     (Herald), Praeter under (Mike), Gladiator as Kallark. */
  "air-walker":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/65/Gabriel_Lan_%28Earth-616%29_from_Official_Handbook_of_the_Marvel_Universe_Vol_2_16_001.jpg/revision/latest?cb=20240708083503",
  morg: "https://static.wikia.nocookie.net/marveldatabase/images/5/56/Morg_%28Earth-616%29_from_All-New_Official_Handbook_of_the_Marvel_Universe_A_to_Z_Vol_1_7_0001.jpg/revision/latest?cb=20171230020226",
  "red-shift":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2a/Red_Shift_%28Earth-616%29_from_Annihilation_The_Nova_Corps_Files_Vol_1_1_0001.jpg/revision/latest?cb=20210209175923",
  "beta-ray-bill":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c3/Beta_Ray_Bill_%28Earth-616%29_from_Mortal_Thor_Vol_1_2_Clarke_Variant.jpg/revision/latest?cb=20250926064724",
  gladiator:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b9/Realm_of_Kings_Imperial_Guard_Vol_1_5_Textless.jpg/revision/latest?cb=20221215064147",
  hyperion:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9f/Hyperion_Vol_1_1_Textless.jpg/revision/latest?cb=20151023184219",
  mangog:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/60/Mangog_%28Earth-616%29_from_Marvel_Monsters_Vol_1_1_001.jpg/revision/latest?cb=20221112174158",
  "blue-marvel":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/97/Adam_Brashear_%28Earth-616%29_from_Marvel_Legends_promotional_artwork_001.jpg/revision/latest?cb=20220314224837",
  onslaught:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/36/Onslaught_%28Earth-616%29_from_Marvel_Masterpieces_%28Trading_Cards%29_1996_Set_001.jpg/revision/latest?cb=20051218191341",
  stardust:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/46/Lambda-Zero_%28Earth-616%29_from_Annihilation_Silver_Surfer_Vol_1_3_0001.jpg/revision/latest?cb=20191126061545",
  "the-fallen-one":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7c/Fallen_One_%28Herald%29_%28Earth-616%29_from_Thanos_Vol_1_11_001.jpg/revision/latest?cb=20101209183132",
  praeter:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b7/Praeter_%28Mike%29_%28Earth-616%29_from_Mighty_Thor_Vol_1_6_001.jpg/revision/latest?cb=20111002171207",
  /* Mutants, batch 10. All twelve resolved under real names on the first
     try — Frederick Dukes, Tabitha Smith, Jonothon Starsmore, Armando
     Munoz, Angelica Jones, Amara Aquilla, Kevin MacTaggert, Selene Gallio,
     James Proudstar. Rachel Summers is Earth-811, the future she is from. */
  blob: "https://static.wikia.nocookie.net/marveldatabase/images/3/3c/Frederick_Dukes_%28Earth-616%29_from_Uncanny_X-Men_Vol_6_7_001.jpg/revision/latest?cb=20241214224821",
  "boom-boom":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0d/Tabitha_Smith_%28Earth-616%29_from_X-Men_Vol_7_10_001.jpg/revision/latest?cb=20250203014233",
  caliban:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5c/Caliban_%28Earth-616%29_from_NYX_Vol_2_3_001.jpg/revision/latest?cb=20240925191733",
  callisto:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4a/Marauders_Vol_1_7_Textless.jpg/revision/latest?cb=20191120184928",
  chamber:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c0/Jonothon_Starsmore_%28Earth-616%29_from_Weapon_X-Men_Vol_2_2_Shalvey_Variant_cover.jpg/revision/latest?cb=20241223092234",
  darwin:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/54/Armando_Mu%C3%B1oz_%28Earth-616%29_from_X-Men_Vol_5_5_001.jpg/revision/latest?cb=20200131035105",
  firestar:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/55/West_Coast_Avengers_Vol_4_1_Artgerm_Virgin_Variant.jpg/revision/latest?cb=20241128220131",
  magma:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/35/Avengers_Vol_7_685_New_Mutants_Variant_Textless.jpg/revision/latest?cb=20180330070950",
  proteus:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b5/X-Men_-_Forever_Vol_1_1_Quiet_Council_Variant_Textless.jpg/revision/latest?cb=20250130001739",
  "rachel-summers":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/X-Force_Vol_7_2_Rachel_Summers_Virgin_Variant.jpg/revision/latest?cb=20240901001722",
  selene:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a6/Selene_Gallio_%28Earth-616%29_from_Immortal_X-Men_Vol_1_1_001.jpg/revision/latest?cb=20220401041713",
  warpath:
    "https://static.wikia.nocookie.net/marveldatabase/images/0/05/Uncanny_X-Men_Vol_1_476_Textless.jpg/revision/latest?cb=20210517183725",
  /* Mutants, batch 11. All twelve on the first try. */
  cypher:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/33/Douglas_Ramsey_%28Earth-616%29_from_X-Men_Vol_7_19_cover_001.jpg/revision/latest?cb=20250702061540",
  exodus:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/cc/Bennet_du_Paris_%28Earth-616%29_from_Immortal_X-Men_Vol_1_14_001.jpg/revision/latest?cb=20230810143335",
  fantomex:
    "https://static.wikia.nocookie.net/marveldatabase/images/2/28/Giant-Size_X-Men_Fantomex_Vol_1_1_Gist_Variant_Textless.jpg/revision/latest?cb=20210414094843",
  hellion:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5a/Julian_Keller_%28Earth-616%29_from_NYX_Vol_2_1_001.jpg/revision/latest?cb=20240725161957",
  "nate-grey":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/86/Uncanny_X-Men_Vol_5_4_Textless.jpg/revision/latest?cb=20180919023849",
  pixie:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/ba/Way_of_X_Vol_1_1_Unknown_Comic_Books_Exclusive_Pixie_Virgin_Variant.jpg/revision/latest?cb=20210404181229",
  prodigy:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9b/X-Men_Vol_7_17_Pride_Variant_Textless.jpg/revision/latest?cb=20250523091419",
  rictor:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a0/Julio_Richter_%28Earth-616%29_from_Excalibur_Vol_4_16_001.jpg/revision/latest?cb=20210113013547",
  sauron:
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f2/Karl_Lykos_%28Earth-616%29_from_X-Men_Unlimited_Infinity_Comic_Vol_1_8_001.jpg/revision/latest?cb=20211018153810",
  scalphunter:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/88/John_Greycrow_%28Earth-616%29_from_Psylocke_Vol_2_9_001.jpg/revision/latest?cb=20250725193035",
  "stepford-cuckoos":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/99/NYX_Vol_2_4_Cuckoos_Virgin_Variant.jpg/revision/latest?cb=20240823102057",
  vulcan:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/72/Gabriel_Summers_%28Earth-616%29_from_X-Men_Red_Vol_2_17_001.jpg/revision/latest?cb=20250812152352",
  /* Mutants, batch 12. Quentin Quire is filed as Quintavius Quire. */
  armor:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b8/Hisako_Ichiki_%28Earth-616%29_from_Secret_X-Men_Vol_1_1_002.jpg/revision/latest?cb=20250327234000",
  "cecilia-reyes":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/47/X-Factor_Vol_5_4_Cecilia_Reyes_Virgin_Variant.jpg/revision/latest?cb=20250104115512",
  dust: "https://static.wikia.nocookie.net/marveldatabase/images/d/da/Sooraya_Qadir_%28Earth-616%29_from_Champions_Vol_3_10_cover_001.png/revision/latest?cb=20191005035218",
  elixir:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c1/X-Men_-_Forever_Vol_1_2_Quiet_Council_Variant_Textless.jpg/revision/latest?cb=20250130001155",
  mastermind:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/bd/Hellions_Vol_1_9_Textless.jpg/revision/latest?cb=20260813001743",
  "monet-st-croix":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/96/Monet_St._Croix_%28Earth-616%29_from_Giant-Size_X-Men_Storm_Vol_1_1_002.jpg/revision/latest?cb=20200917223338",
  rockslide:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/ca/Young_X-Men_Vol_1_7_Textless.jpg/revision/latest?cb=20230104124139",
  surge:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/75/Noriko_Ashida_%28Earth-616%29_from_X-Force_Vol_7_10_001.jpg/revision/latest?cb=20250426104228",
  synch:
    "https://static.wikia.nocookie.net/marveldatabase/images/0/05/X-Men_Vol_6_7_New_Line-Up_Trading_Card_Variant_Textless.jpg/revision/latest?cb=20211203182822",
  xorn: "https://static.wikia.nocookie.net/marveldatabase/images/5/51/Shen_Xorn_%28Earth-616%29_from_X-Men_Vol_7_1_001.jpg/revision/latest?cb=20240710133152",
  kwannon:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/15/Psylocke_Vol_2_4_Textless.jpg/revision/latest?cb=20241123063239",
  "quentin-quire":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/18/Quintavius_Quire_%28Earth-616%29_from_X-Men_Vol_7_3_001.jpg/revision/latest?cb=20250521084021",
  /* Batch 13. Maggott is filed as "Maggott (Japheth)", Nocturne under
     Earth-2182 — the reality she is from. */
  longshot:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/62/Longshot_%28Mojoverse%29_from_X-Men_Blue_Vol_1_13_001.jpg/revision/latest?cb=20180613015218",
  lockheed:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7d/Lockheed_%28Earth-616%29_from_Marauders_Vol_2_11_Shavrin_Variant_cover_001.jpg/revision/latest?cb=20240917185810",
  anole:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/84/NYX_Vol_2_3_Textless.jpg/revision/latest?cb=20250314202445",
  blindfold:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c5/Ruth_Aldine_%28Earth-616%29_from_X-Men_Legacy_Vol_2_4_001.jpg/revision/latest?cb=20210926090224",
  feral:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/Maria_Callasantos_%28Earth-616%29_from_X-Factor_Vol_5_1_001.jpg/revision/latest?cb=20240922181144",
  frenzy:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/57/X-Factor_Vol_5_7_Black_History_Month_Variant_Textless.jpg/revision/latest?cb=20260226200926",
  gateway:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d7/Gateway_%28Earth-616%29_from_House_of_X_Vol_1_1_cover_001.jpg/revision/latest?cb=20190725013509",
  nocturne:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/da/Nocturne_%28Earth-616%29_from_Vampires_The_Marvel_Undead_001.png/revision/latest?cb=20170410030344",
  "omega-sentinel":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0f/Karima_Shapandar_%28Moira_10_%28A%29%29_from_Fall_of_the_House_of_X_Vol_1_4_001.jpg/revision/latest?cb=20240417210411",
  wither:
    "https://static.wikia.nocookie.net/marveldatabase/images/2/24/Kevin_Ford_%28Earth-616%29_from_X-Men_Battle_of_the_Atom_%28video_game%29_001.jpg/revision/latest?cb=20171022203242",
  maggott:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/18/Maggott_%28Japheth%29_%28Earth-616%29_from_Storm_Vol_5_6_001.png.png/revision/latest?cb=20250416065525",
  "kitty-pryde":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/16/Exceptional_X-Men_Vol_1_10_Pride_Variant_Textless.jpg/revision/latest?cb=20250523091103",
  /* Batch 14 — the ones the loose gap-check hid. Bishop is Earth-1191,
     the future he came back from. */
  bishop:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/8d/Lucas_Bishop_%28Earth-1191%29_from_Timeslide_Vol_1_1_002.jpg/revision/latest?cb=20241228152902",
  skin: "https://static.wikia.nocookie.net/marveldatabase/images/1/17/Angelo_Espinosa_%28Earth-616%29_from_Astonishing_X-Men_Infinity_Comic_Vol_1_29_001.png/revision/latest?cb=20250828001953",
  oya: "https://static.wikia.nocookie.net/marveldatabase/images/2/2b/X-Men_Vol_7_11_Black_History_Month_Variant_Textless.jpg/revision/latest?cb=20260108204154",
  cipher:
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0b/Alisa_Tager_%28Earth-616%29_from_Young_X-Men_Vol_1_10_003.jpg/revision/latest?cb=20170320170324",
  jackal:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/93/Miles_Warren_%28Earth-616%29_from_Spider-Island_Deadly_Foes_Vol_1_1_001.jpg/revision/latest?cb=20120117113235",
  "the-rose":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9f/Devil%27s_Reign_Spider-Man_Vol_1_1_Carlos_Variant_Textless.jpg/revision/latest?cb=20230604042814",
  "robbie-robertson":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5e/Joseph_Robertson_%28Earth-616%29_from_Amazing_Spider-Man_Vol_5_64_001.jpg/revision/latest?cb=20210421234837",
  /* Batch 15. Jameson is filed as "John Jonah Jameson" without the Jr.,
     Mayday under Earth-982 and Pavitr under Earth-50101. */
  "yuri-watanabe":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2c/Yuriko_Watanabe_%28Earth-616%29_from_Superior_Spider-Man_Vol_1_16_001.jpg/revision/latest?cb=20131021051455",
  "glory-grant":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9a/Gloria_Grant_%28Earth-616%29_from_Iron_Man_Vol_5_1_001.jpg/revision/latest?cb=20200919215240",
  "randy-robertson":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0f/Randolph_Robertson_%28Earth-616%29_from_Amazing_Spider-Man_Vol_7_1_001.jpg/revision/latest?cb=20250413090624",
  "mayday-parker":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/62/Amazing_Spider-Girl_Vol_1_1_Textless.jpg/revision/latest?cb=20250811092457",
  "pavitr-prabhakar":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d2/Pavitr_Prabhakar_%28Earth-50101%29_from_Spider-Man_India_Vol_2_5_New_Costume_Variant_001.jpg/revision/latest?cb=20240220050600",
  overdrive:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b8/James_Beverley_%28Earth-616%29_from_Amazing_Spider-Man_Vol_2_564_001.jpg/revision/latest?cb=20120203213657",
  swarm:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/72/Fritz_von_Meyer_%28Earth-616%29_from_Runaways_Vol_2_7_001.jpg/revision/latest?cb=20230226150930",
  grizzly:
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e6/Maxwell_Markham_%28Earth-616%29_from_Iron_Man_Vol_7_2_001.jpg/revision/latest?cb=20260301011805",
  tarantula:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6f/Anton_Miguel_Rodriquez_%28Earth-616%29_from_Sinister_War_Vol_1_2_001.jpg/revision/latest?cb=20231117151828",
  scarecrow:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7c/Ebenezer_Laughton_%28Earth-616%29_from_Danny_Ketch_Ghost_Rider_Vol_1_2_001.jpg/revision/latest?cb=20231001203711",
  "j-jonah-jameson":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/96/John_Jonah_Jameson_%28Earth-616%29_from_Marvel_Knights_Spider-Man_Vol_1_4_001.jpg/revision/latest?cb=20161214062419",
  /* Batch 16. The Marquis of Death is Clyde Wyncham Jr. on Earth-807128,
     Malloy Earth-14923, Cosmic Ghost Rider Francis Castle on TRN666. */
  griever:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/98/Fantastic_Four_Vol_6_1_ComicXposure_Exclusive_Villain_Virgin_Variant.jpg/revision/latest?cb=20180722143612",
  "mad-jim-jaspers":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/ef/James_Jaspers_%28Earth-616%29_from_X-Men_Die_by_the_Sword_Vol_1_3_001.jpg/revision/latest?cb=20191230234518",
  abraxas:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/da/Abraxas_%28Multiverse%29_from_Storm_Vol_5_9_001.jpg/revision/latest?cb=20250608013134",
  "chaos-king":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/33/Amatsu-Mikaboshi_%28Earth-616%29_from_Chaos_War_Vol_1_4_0001.jpg/revision/latest?cb=20160628224150",
  "mister-m":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/87/District_X_Vol_1_4_Textless.jpg/revision/latest?cb=20070922144250",
  thane:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/90/Thane_%28Earth-616%29_from_Thanos_A_God_Up_There_Listening_Infinite_Comic_Vol_1_1_001.jpg/revision/latest?cb=20200717200411",
  sasquatch:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b6/Walter_Langkowski_%28Earth-616%29_from_Alpha_Flight_Vol_5_5_001.jpg/revision/latest?cb=20240210141512",
  namora:
    "https://static.wikia.nocookie.net/marveldatabase/images/2/24/Atlas_Vol_1_1_Women_of_Marvel_Variant_Textless.jpg/revision/latest?cb=20100219131014",
  namorita:
    "https://static.wikia.nocookie.net/marveldatabase/images/f/fb/Namorita_Prentiss_%28Earth-616%29_from_Civil_War_Unmasked_Vol_1_1_001.jpg/revision/latest?cb=20260513075658",
  "marquis-of-death":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/3b/Clyde_Wyncham_Jr._%28Earth-807128%29_from_Fantastic_Four_Vol_3_566_001.jpg/revision/latest?cb=20201011175347",
  "matthew-malloy":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d6/Matthew_Malloy_%28Earth-14923%29_from_Uncanny_X-Men_Vol_3_24_0002.png/revision/latest?cb=20140731195103",
  "cosmic-ghost-rider":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/61/Cosmic_Ghost_Rider_Vol_1_5_Campbell_Variant_Textless.jpg/revision/latest?cb=20180822094725",
  /* Batch 17. Each variant is filed under its own reality — Earth-31913,
     Earth-66, Earth-71490, Earth-90266, Earth-20023, Earth-22191. */
  "spider-boy":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/71/Edge_of_Spider-Verse_Vol_3_3_Golden_Apple_Comics_Exclusive_Virgin_Variant.jpg/revision/latest?cb=20230621175721",
  "web-slinger":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/41/Spider-Verse_Vol_3_4_Textless.jpg/revision/latest?cb=20200129124446",
  "spider-rex":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c5/Edge_of_Spider-Verse_Vol_2_1_Spider-Rex_Variant_Textless.jpg/revision/latest?cb=20240525095212",
  spinstress:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/ae/Amazing_Spider-Man_Vol_5_75_Lee_Virgin_Variant.jpg/revision/latest?cb=20220405001421",
  "web-weaver":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9a/Edge_of_Spider-Verse_Vol_2_5_Anka_Variant_Textless.jpg/revision/latest?cb=20221008073944",
  "spider-smasher":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/0e/Miles_Morales_Spider-Man_Vol_1_38_Spoiler_Variant_Textless.jpg/revision/latest?cb=20230621183015",
  "old-man-spider":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2d/Peter_Parker_%28Earth-90266%29_from_What_If%3F_Newer_Fantastic_Four_Vol_1_1_001.jpg/revision/latest?cb=20130214000735",
  "sun-spider":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/2a/Charlotte_Webber_%28Earth-20023%29_from_Edge_of_Spider-Verse_Vol_2_4_001.jpg/revision/latest?cb=20220924103428",
  "charlotte-witter":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/bc/Charlotte_Witter_%28Earth-616%29_from_Marvel_Comics_Presents_Vol_3_8_001.png/revision/latest?cb=20190821181658",
  "spider-byte":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f1/Margo_Kess_%28Earth-22191%29_from_Edge_of_Spider-Verse_Vol_4_1_001.jpg/revision/latest?cb=20240229105530",
  "bride-of-nine-spiders":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/71/Bride_of_Nine_World-Breakers_%28Temporal_Paradox%29_%28Earth-6160%29_from_Ultimates_Vol_3_12_001.jpg/revision/latest?cb=20260112185324",
  /* Batch 18. Angel Dust is filed as "Angel Dust (Christine)". */
  arclight:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/ca/Philippa_Sontag_%28Earth-616%29_from_X-Men_Blue_Vol_1_14_001.jpg/revision/latest?cb=20180611145850",
  beak: "https://static.wikia.nocookie.net/marveldatabase/images/d/db/Barnell_Bohusk_%28Earth-616%29_from_X-Men_Unlimited_Infinity_Comic_Vol_1_43_002.jpg/revision/latest?cb=20220909001115",
  ink: "https://static.wikia.nocookie.net/marveldatabase/images/d/d8/Eric_Gitter_%28Earth-616%29_from_X-Men_Gold_Vol_2_23_001.jpg/revision/latest?cb=20210524073105",
  anarchist:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7a/Tike_Alicar_%28Earth-616%29_from_Giant-Size_X-Statix_Vol_1_1_001.png/revision/latest?cb=20190715013927",
  maverick:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/40/Christoph_Nord_%28Earth-616%29_from_Wolverine_Vol_7_9_001.jpg/revision/latest?cb=20210301203317",
  hepzibah:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c4/Hepzibah_%28Earth-616%29_from_Mr._and_Mrs._X_Vol_1_4_001.jpg/revision/latest?cb=20181021225424",
  goldballs:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/79/X-Men_-_Forever_Vol_1_4_Quiet_Council_Variant_Textless.jpg/revision/latest?cb=20250129235615",
  "glob-herman":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e9/Robert_Herman_%28Earth-616%29_from_New_Mutants_Vol_4_11_001.jpg/revision/latest?cb=20200821025306",
  "lady-deathstrike":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/61/Death_of_Wolverine_The_Logan_Legacy_Vol_1_4_Textless.jpg/revision/latest?cb=20140819215859",
  "fabian-cortez":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/64/Fabian_Cortez_%28Earth-616%29_from_S.W.O.R.D._Vol_2_5_Cover.jpg/revision/latest?cb=20210421164643",
  "jamie-braddock":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d9/James_Braddock_Jr._%28Earth-616%29_from_Planet-Size_X-Men_Vol_1_1_001.jpg/revision/latest?cb=20210623002005",
  "angel-dust":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/27/Angel_Dust_%28Earth-616%29_from_Morlocks_Vol_1_1_001.jpg/revision/latest?cb=20130805013835",
  /* Batch 19. Mister Fear is filed as Lawrence Cranston, not Larry. */
  "the-owl":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1c/Leland_Owlsley_%28Earth-616%29_from_Jackpot_and_Black_Cat_Vol_1_4_001.jpg/revision/latest?cb=20240629142157",
  "black-tarantula":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5d/Carlos_LaMuerto_%28Earth-616%29_from_Spider-Gwen_The_Ghost-Spider_Vol_1_3_001.jpg/revision/latest?cb=20240804202222",
  "crime-master":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/09/Nicholas_Lewis_Jr._%28Earth-616%29_from_Marvel_Team-Up_Vol_1_40_001.jpg/revision/latest?cb=20230711163927",
  stunner:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/69/Superior_Spider-Man_Vol_1_21_Textless.jpg/revision/latest?cb=20130815194003",
  "white-rabbit":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/13/Tony_Stark_Iron_Man_Vol_1_10_Spider-Man_Villains_Variant_Textless.jpg/revision/latest?cb=20210112085810",
  screwball:
    "https://static.wikia.nocookie.net/marveldatabase/images/0/04/Screwball_%28Earth-616%29_from_Amazing_Mary_Jane_Vol_1_3_001.jpg/revision/latest?cb=20260112200513",
  "big-wheel":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/80/Jackson_Weele_%28Earth-616%29_from_Iron_Man_Vol_5_16_002.jpg/revision/latest?cb=20220227214413",
  "rocket-racer":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5a/Robert_Farrell_%28Earth-616%29_from_Amazing_Spider-Man_Vol_6_44_Black_History_Month_Variant_cover_001.jpg/revision/latest?cb=20240413142130",
  "speed-demon":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/27/Superior_Foes_of_Spider-Man_Vol_1_3_Bagley_Variant_Textless.jpg/revision/latest?cb=20130813234347",
  gibbon:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/dc/Amazing_Spider-Man_Vol_5_18.HU_Textless.jpg/revision/latest?cb=20190125201957",
  "mister-hyde":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/67/Calvin_Zabo_%28Earth-616%29_from_Avengers_Vol_9_26.jpeg/revision/latest?cb=20250608095846",
  "mister-fear":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f5/Lawrence_Cranston_%28Earth-616%29_from_Spider-Gwen_The_Ghost-Spider_Vol_1_8_001.jpg/revision/latest?cb=20241209004846",
  /* Batch 20. Jetstream is filed under his full name, Haroun ibn Sallah
     al-Rashid. */
  abyss:
    "https://static.wikia.nocookie.net/marveldatabase/images/0/08/Nils_Styger_%28Earth-616%29_from_Dark_X-Men_Vol_2_4_001.jpg/revision/latest?cb=20240714142834",
  "adam-x":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/03/Adam_Neramani_%28Earth-616%29_from_X-Men_Legends_Vol_1_2_0001.jpg/revision/latest?cb=20210402143501",
  "el-aguila":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e3/Alejandro_Montoya_%28Earth-616%29_from_Marvel_Comics_Presents_Vol_1_9_001.jpg/revision/latest?cb=20240124204145",
  alchemy:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d5/Thomas_Jones_%28Earth-616%29_from_Death_of_X_Vol_1_4_001.jpg/revision/latest?cb=20161123184741",
  box: "https://static.wikia.nocookie.net/marveldatabase/images/7/76/Madison_Jeffries_%28Earth-616%29_from_Sabretooth_Vol_4_4_001.jpg/revision/latest?cb=20220903232912",
  "eye-boy":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f1/Trevor_Hawkins_%28Earth-616%29_from_X-Factor_Vol_4_6_001.jpg/revision/latest?cb=20210106172350",
  "fever-pitch":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d3/Fever_Pitch_%28Earth-616%29_from_X-Force_Vol_3_13_0001.jpg/revision/latest?cb=20131226170533",
  gentle:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/61/X-Men_Red_Vol_1_6_Textless.jpg/revision/latest?cb=20180419074741",
  graymalkin:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1f/Jonas_Graymalkin_%28Earth-616%29_from_Young_X-Men_Vol_1_10_cover.jpg/revision/latest?cb=20100504163222",
  hijack:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7e/Hijack_%28Earth-616%29_from_X-Men_Legacy_Annual_Vol_1_1_001.jpg/revision/latest?cb=20090918020802",
  jetstream:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6d/Haroum_ibn_Sallah_al-Rashid_%28Earth-616%29_from_New_Mutants_Vol_3_7.png/revision/latest?cb=20141103172342",
  /* Batch 21. */
  krakoa:
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f7/Krakoa_%28Earth-616%29_from_X-Men_Vol_6_35_001.jpg/revision/latest?cb=20240606005137",
  "lila-cheney":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/ba/Lila_Cheney_%28Earth-616%29_from_Dazzler_Vol_3_3_001.jpg/revision/latest?cb=20241201203131",
  "living-monolith":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/89/Ahmet_Abdol_%28Earth-616%29_from_Uncanny_X-Men_Vol_1_376_001.jpg/revision/latest?cb=20260214031915",
  loa: "https://static.wikia.nocookie.net/marveldatabase/images/a/a7/Alani_Ryan_%28Earth-616%29_from_Fear_Itself_The_Deep_Vol_1_3_002.jpg/revision/latest?cb=20210425114523",
  mondo:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/3b/Mondo_%28Earth-616%29_from_New_Mutants_Vol_4_1_001.jpg/revision/latest?cb=20191106231552",
  "nature-girl":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e8/Lin_Li_%28Earth-616%29_from_X-Men_Heir_of_Apocalypse_Vol_1_1_001.jpg/revision/latest?cb=20240613092339",
  petra:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1a/Petra_%28Earth-616%29_from_X-Men_Deadly_Genesis_Vol_1_4_0001.png/revision/latest?cb=20190407082142",
  random:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c5/Marshall_Stone_III_%28Earth-616%29_from_X-Force_Vol_6_12_001.jpg/revision/latest?cb=20200911033832",
  tempo:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/ad/Marauders_Vol_2_4_Textless.jpg/revision/latest?cb=20220319231800",
  unus: "https://static.wikia.nocookie.net/marveldatabase/images/3/35/Gunther_Bain_%28Earth-616%29_from_Excalibur_Vol_3_2_001.jpg/revision/latest?cb=20220629024846",
  /* Batch 22 — the last of the mutant roster. */
  onyxx:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9a/Sidney_Green_%28Earth-616%29_from_X-Men_Earth%27s_Mutant_Heroes_Vol_1_1_0001.jpg/revision/latest?cb=20161123234139",
  "stacy-x":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/58/Miranda_Leevald_%28Earth-616%29_from_Way_of_X_Vol_1_3_003.jpg/revision/latest?cb=20210625024009",
  tempus:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7f/X-Men_-_Forever_Vol_1_3_Quiet_Council_Variant_Textless.jpg/revision/latest?cb=20250130000604",
  trance:
    "https://static.wikia.nocookie.net/marveldatabase/images/c/cd/Hope_Abbott_%28Earth-616%29_from_X-Men_Legacy_Vol_1_228_001.jpg/revision/latest?cb=20180909020747",
  triage:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/8a/Christopher_Muse_%28Earth-616%29_from_X-Men_Unlimited_Infinity_Comic_Vol_1_44_001.jpg/revision/latest?cb=20220909020256",
  transonic:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1b/Laurie_Tromette_%28Earth-616%29_from_Generation_Hope_Vol_1_11_002.jpg/revision/latest?cb=20170611001804",
  tarot:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1d/Marie-Ange_Colbert_%28Earth-616%29_from_Spider-Man_Deadpool_Vol_1_11_0002.png/revision/latest?cb=20161212152706",
  velocidad:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a0/Gabriel_Cohuelo_%28Earth-616%29_from_Generation_Hope_Vol_1_13_001.jpg/revision/latest?cb=20210228201759",
  wallflower:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/41/Laurie_Collins_%28Earth-616%29_from_X-Factor_Vol_4_001.jpg/revision/latest?cb=20210116191348",
  "wind-dancer":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/31/Sofia_Mantega_%28Earth-616%29_from_Dazzler_Vol_3_3_001.jpg/revision/latest?cb=20241201204129",
  yukio:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/de/Yukio_%28Earth-616%29_from_Exceptional_X-Men_Vol_1_5_001.jpg/revision/latest?cb=20250115200506",
  "whiz-kid":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/cd/Whiz_Kid_%28Earth-616%29_from_Avengers_The_Initiative_Annual_Vol_1_1_001.jpg/revision/latest?cb=20220725191215",
  wraith:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6a/Hector_Rendoza_%28Earth-616%29_from_X-Men_Earth%27s_Mutant_Heroes_Vol_1_1.png/revision/latest?cb=20140129191726",
  "ziggy-karst":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b4/Ziggy_Karst_%28Earth-616%29_from_Nightcrawler_Vol_4_5_001.png/revision/latest?cb=20141116061509",
  /* Batch 23 — the last of the Spider-Verse roster. */
  "spider-man-2211":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6e/Max_Borne_%28Earth-9500%29_from_Friendly_Neighborhood_Spider-Man_Vol_1_9_0001.jpg/revision/latest?cb=20191203043715",
  "will-o-the-wisp":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c2/Jackson_Arvad_%28Earth-616%29_from_Sensational_Spider-Man_Vol_2_31_0002.jpg/revision/latest?cb=20120124020956",
  kangaroo:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9a/Frank_Oliver_%28Earth-616%29_from_Official_Handbook_of_the_Marvel_Universe_Master_Edition_Vol_1_18_0001.png/revision/latest?cb=20170409215614",
  massacre:
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e6/Superior_Spider-Man_Vol_1_4_Textless.jpg/revision/latest?cb=20121115183819",
  "spencer-smythe":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/82/Spencer_Smythe_%28Earth-616%29_from_Spine-Tingling_Spider-Man_Infinity_Comic_Vol_1_2_001.png/revision/latest?cb=20240120004915",
  raze: "https://static.wikia.nocookie.net/marveldatabase/images/0/02/Claire_Dixon_%28Earth-616%29_from_Carnage_Vol_2_11_001.jpg/revision/latest?cb=20160905211108",
  "void-knight":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a9/Norrin_Radd_%28Earth-36%29_from_Startling_Stories_Thing_-_Night_Falls_on_Yancy_Street_Vol_1_1_0001.jpg/revision/latest?cb=20130530150839",
  "jack-o-lantern":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/85/Jason_Macendale_Jr._%28Earth-616%29_from_Daredevil_Black_Armor_Vol_1_2_001.jpg/revision/latest?cb=20250915111656",
  "madame-masque":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b7/Whitney_Frost_%28Earth-616%29_from_Iron_Man_Vol_7_3_Bengal_Varinat_cover_001.jpg/revision/latest?cb=20260314030354",
  /* The five I wrongly reported as having no art, found once I searched
     for their real names instead of guessing them: Nathaniel Carver,
     Benjamin Hammil, Mark Hallett, Iara Dos Santos. Plus the Technarch. */
  hindsight:
    "https://static.wikia.nocookie.net/marveldatabase/images/3/39/Nathaniel_Carver_%28Earth-616%29_from_Generation_X_Vol_2_3_001.jpg/revision/latest?cb=20170617034025",
  match:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/de/Benjamin_Hammil_%28Earth-616%29_from_New_X-Men_Academy_X_Yearbook_Vol_1_1_0002.jpg/revision/latest?cb=20191127052949",
  sunder:
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b9/Mark_Hallett_%28Earth-616%29_from_Uncanny_X-Men_Vol_1_254.png/revision/latest?cb=20180603015643",
  "shark-girl":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/96/X-Men_Red_Vol_2_16_Comunidades_Variant_Textless.jpg/revision/latest?cb=20240909113116",
  "warlock-technarch":
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5b/New_Mutants_Vol_4_2_Adams_Variant_Textless.jpg/revision/latest?cb=20200514003124",
  /* Batch 24 — the top of the cosmic hierarchy. Mistress Love, Sire Hate
     and the Fulcrum are filed under Earth-616 rather than (Multiverse). */
  "queen-of-nevers":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/48/Silver_Surfer_Vol_7_2_Textless.jpg/revision/latest?cb=20140116222853",
  "captain-universe":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1a/Avengers_Vol_5_6_Textless.jpg/revision/latest?cb=20121115175227",
  "the-progenitor":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/03/Progenitor_%28Celestial%29_%28Multiverse%29_from_A.X.E._Judgment_Day_Vol_1_2_002.jpg/revision/latest?cb=20221006173948",
  logos:
    "https://static.wikia.nocookie.net/marveldatabase/images/8/89/Logos_%28Cosmic_Being%29_%28Earth-616%29_from_Ultimates_2_Vol_2_3_001.jpg/revision/latest?cb=20170120085252",
  "aegis-cosmic":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/ec/Aegis_%28Proemial_God%29_%28Earth-616%29_from_Annihilation_Silver_Surfer_Vol_1_3_0001.jpg/revision/latest?cb=20200703210320",
  antiphon:
    "https://static.wikia.nocookie.net/marveldatabase/images/7/7c/Antiphon_%28Earth-616%29_from_Annihilation_Heralds_of_Galactus_Vol_1_2_0001.jpg/revision/latest?cb=20191202045739",
  "first-firmament":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/32/First_Cosmos_from_Ultimates_2_Vol_2_6_001.jpg/revision/latest?cb=20211206015406",
  "the-beyonders":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/75/Beyonders_from_New_Avengers_Vol_3_29_001.jpg/revision/latest?cb=20150128180552",
  "mistress-love":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1e/Mistress_Love_%28Earth-616%29_from_Iron_Man_Vol_5_15_001.jpg/revision/latest?cb=20211228034133",
  "sire-hate":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/89/Sire_Hate_%28Earth-616%29_from_Iron_Man_Vol_5_15_001.jpg/revision/latest?cb=20211228034147",
  "the-fulcrum":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/19/Fulcrum_%28Earth-616%29_from_Eternals_Vol_4_9_0001.png/revision/latest?cb=20130924135423",
  /* Wallop is filed as Walter Destine — he is a ClanDestine, not a mutant. */
  wallop:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1b/Walter_Destine_%28Earth-616%29_from_ClanDestine_Vol_1_8_001.jpeg/revision/latest?cb=20210628174734",
  /* Batch 25 — the collectives. The G.O.D.S. abstracts are filed under
     Earth-616 rather than (Multiverse), which is why the first pass missed
     all four of them. */
  "the-centivars":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/44/G.O.D.S._Vol_1_6_Hans_Variant_Textless.jpg/revision/latest?cb=20251026155941",
  kubik:
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f1/Kubik_%28Earth-616%29_from_Official_Handbook_of_the_Marvel_Universe_Update_%2789_Vol_1_4_001.jpg/revision/latest?cb=20160822032522",
  "shaper-of-worlds":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/04/Shaper_of_Worlds_%28Earth-616%29_from_Incredible_Hulk_Vol_1_155_001.jpg/revision/latest?cb=20210617015245",
  "great-web":
    "https://static.wikia.nocookie.net/marveldatabase/images/7/74/Vault_of_Spiders_Vol_1_2_Textless.jpg/revision/latest?cb=20180822083236",
  "master-weaver":
    "https://static.wikia.nocookie.net/marveldatabase/images/c/c1/Karn_%28Temporal_Paradox%29_%28Earth-001%29_from_Superior_Spider-Man_Vol_1_33_001.jpg/revision/latest?cb=20240413201814",
  "undying-ones":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/60/Stephen_Strange_%28Earth-616%29%2C_Namor_McKenzie_%28Earth-616%29%2C_and_Undying_Ones_from_Sub-Mariner_Vol_2_22_001.jpg/revision/latest?cb=20241115075432",
  "many-angled-ones":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d0/Many-Angled_Ones_from_Thanos_Imperative_Vol_1_6_001.jpg/revision/latest?cb=20210528060529",
  "cosmic-cube":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/13/Avengers_Standoff_Welcome_to_Pleasant_Hill_Vol_1_1_Textless.jpg/revision/latest?cb=20151117195132",
  "powers-that-be":
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a8/The-Powers-That-Be_%28Earth-616%29_from_Vision_and_the_Scarlet_Witch_Vol_3_1_001.jpg/revision/latest?cb=20250919161905",
  "natural-order":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f6/The-Natural-Order-of-Things_%28Earth-616%29_from_G.O.D.S._Vol_1_2_001.jpg/revision/latest?cb=20231108171541",
  continuum:
    "https://static.wikia.nocookie.net/marveldatabase/images/4/40/Continuum_%28Earth-616%29_from_G.O.D.S._Vol_1_8_Noto_Variant_cover_001.jpg/revision/latest?cb=20241009115951",
  "the-avatar":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/45/G.O.D.S._Vol_1_1_Virgin_Variant.jpg/revision/latest?cb=20231005190950",
  "the-vishanti":
    "https://static.wikia.nocookie.net/marveldatabase/images/b/b8/Vishanti_%28Earth-616%29_from_Sorcerer_Supreme_Vol_1_4_001.png/revision/latest?cb=20260318050230",
  "the-preordained":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/8e/Preordained_%28Earth-616%29_from_G.O.D.S._Vol_1_6_001.jpg/revision/latest?cb=20240330220442",
  "the-aspirants":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/8b/Aspirants_from_Marvel_Boy_Vol_2_5_001.jpg/revision/latest?cb=20170427040258",
  /* Kosmos, found on the Fictional Battle Omniverse wiki after Marvel
     Database turned out to have only the DIMENSION of that name. */
  kosmos:
    "https://static.wikia.nocookie.net/fictional-battle-omniverse/images/5/5d/Kosmos_Marvel_Comics.jpg/revision/latest?cb=20170425140014",
  clea: "https://static.wikia.nocookie.net/marveldatabase/images/5/5f/Sorcerer_Supreme_Vol_1_5_Fanyang_Variant_Textless.jpg/revision/latest?cb=20260427073207",
  /* Wakanda. Nakia is filed as Nakia Shauku. */
  zuri: "https://static.wikia.nocookie.net/marveldatabase/images/5/50/Zuri_%28Earth-616%29_from_Black_Panther_Vol_3_1_001.jpg/revision/latest?cb=20161122202136",
  /* Supplied. Daniel Kaluuya on the Black Panther character poster: the
     border tribe cloak and the beaded markings. Replaces a Fantastic Four
     panel of the Earth-616 W'Kabi, who is a different man in a different
     medium. Pinned at `scale-to-width-down/1200` on purpose -- the original
     is 6341x9000, which is a print poster and not a portrait tile. */
  wkabi:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9c/Black_Panther_%28film%29_poster_013_Textless.jpg/revision/latest/scale-to-width-down/1200?cb=20180318193508",
  njobu:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/62/N%27Jobu_%28Earth-199999%29_from_Black_Panther_%28film%29_001.png/revision/latest?cb=20190116201608",
  tchaka:
    "https://static.wikia.nocookie.net/marveldatabase/images/9/9c/T%27Chaka_%28Earth-616%29_from_Rise_of_the_Black_Panther_Vol_1_1_001.jpg/revision/latest?cb=20200710030331",
  aneka:
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e9/Aneka_%28Earth-616%29_from_Thunderbolts_Doomstrike_Vol_1_3_001.jpg/revision/latest?cb=20250506193701",
  nakia:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5c/Nakia_Shauku_%28Earth-616%29_from_Black_Panther_Vol_3_23_002.jpg/revision/latest?cb=20221025173801",
  attuma:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a0/Attuma_%28Earth-616%29_from_Namor_Vol_2_2_001.jpg/revision/latest?cb=20240828094112",
  /* The Hulk's rogues. The Leader is filed as Samuel Sterns, the Absorbing
     Man as Carl Creel, Wendigo under (Race) because it is a curse rather
     than a person. */
  /* The green skull, not the man. The first pick here was a small panel of
     Sterns before the change — accurate to the name and useless as a face,
     because nobody recognises the Leader without the head. */
  "the-leader":
    "https://static.wikia.nocookie.net/hulk/images/9/9d/The_leader.png/revision/latest?cb=20111212040715",
  "absorbing-man":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/08/Carl_Creel_%28Earth-616%29_from_Gamma_Flight_Vol_1_1_cover_001.jpg/revision/latest?cb=20210713213623",
  "bi-beast":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/8a/Bi-Beast_%28Earth-616%29_from_Thor_Vol_1_315_001.png/revision/latest?cb=20170623160635",
  zzzax:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1e/Zzzax_%28Earth-616%29_from_Hulk_Vol_2_36_001.jpg/revision/latest?cb=20230625040346",
  "brian-banner":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/02/Brian_Banner_%28Earth-616%29_from_Immortal_She-Hulk_Vol_1_1_001.jpg/revision/latest?cb=20200925205931",
  xemnu:
    "https://static.wikia.nocookie.net/marveldatabase/images/a/a7/Immortal_Hulk_Vol_1_30_Textless.jpg/revision/latest?cb=20200202052805",
  "u-foes":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/13/U-Foes_%28Earth-616%29_from_Amazing_Spider-Man_Vol_5_75_001.jpg/revision/latest?cb=20211020033316",
  flux: "https://static.wikia.nocookie.net/marveldatabase/images/a/af/Benjamin_Tibbetts_%28Earth-616%29_from_World_War_Hulk_Gamma_Corps_Vol_1_1_0001.jpg/revision/latest?cb=20191208040547",
  wendigo:
    "https://static.wikia.nocookie.net/marveldatabase/images/6/6e/Thaddeus_Ross_%28Earth-616%29_and_Wendigo_%28Race%29_from_King-Size_Hulk_Vol_1_1_001.jpg/revision/latest?cb=20170529053339",
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
  /* Her AS Nova, rather than the Fearless Defenders panel of her out of it. */
  "frankie-raye":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/497-nova.jpg",
  toxin: "https://i.redd.it/isk712hqkxq61.jpg",
  "moon-girl":
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f0/Fantastic_Four_Vol_6_41_Black_History_Month_Variant_Textless.jpg/revision/latest?cb=20260227052625",
  /* The same portrait "The two people behind it" uses on What is Marvel. */
  "stan-lee":
    "https://image.tmdb.org/t/p/original/kKeyWoFtTqOPsbmwylNHmuB3En9.jpg",
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
  "super-skrull":
    "https://upload.wikimedia.org/wikipedia/en/8/87/Super_Skrull.jpg",
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
  northstar:
    "https://i.pinimg.com/736x/66/c4/70/66c4704583b875c6933296de905325fc.jpg",
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
  /* HOPE, NOT JANET. This record is Hope van Dyne and it was carrying
     `Janet_van_Dyne_Earth-616...`, her mother, who has her own record two
     places away. The wrong person entirely, and the filename said so. */
  wasp: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/22/Wasp_Quantumania.jpg/revision/latest?cb=20231124223547",
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
  zemo: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d5/TF%26TWS_Textless_Character_Posters_02.jpg/revision/latest?cb=20231021161327",
  /**
   * THE THREE PETERS — the actor in the suit, because that is the whole point
   * of these records. Every other portrait here is character art rather than
   * an actor still; these three are the exception the split exists for, since
   * the only thing separating them IS who is wearing it.
   */
  "spider-man-tom":
    "https://upload.wikimedia.org/wikipedia/en/0/0f/Tom_Holland_as_Spider-Man.jpg",
  /* Sent as `preview.redd.it` with an expiring `&s=` signature. Same upload
     id, asked of the direct host, which has neither. */
  "spider-man-andrew": "https://i.redd.it/qnd04cbvbefa1.jpg",
  /* Sent through a Yahoo image resizer that wraps the real file in its own
     signed path. Unwrapped to the address the resizer was pointing at. */
  "spider-man-tobey":
    "https://media.zenfs.com/en/us_magazine_896/8371b7c99efa855c94440f4fbb1ed7fb",
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

  /**
   * THE REST OF THE CORPUS, PINNED. Everything below this line was resolving
   * live from the MCU wiki or the Superhero Database on every sync, which
   * means the portrait was whatever those pages happened to show that day.
   *
   * That is not hypothetical. Speed's portrait drifted exactly this way:
   * upstream DELETED the file, the wiki replaced the page image with a photo
   * of a man in his thirties, and the next sync swapped it in silently. It
   * took someone noticing the face was wrong to catch it, eleven syncs later.
   *
   * Every URL here is the one the site is already serving, so this freezes
   * the current state rather than changing it -- and every one was checked
   * against its record's name and aliases before being written down. Two
   * looked wrong and were not: the wiki files the One Above All and the One
   * Below All under "(Multiverse)".
   *
   * A portrait that is wrong is now a thing you fix HERE, once, instead of a
   * thing that comes back on the next sync.
   */
  abomination:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/4-abomination.jpg",
  "agatha-harkness":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a5/Agatha_Harkness_Infobox.jpg/revision/latest?cb=20250404171313",
  agony:
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f8/Extreme_Carnage_Agony_Vol_1_1_Textless.jpg/revision/latest?cb=20220919223451",
  ajax: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/13-ajax.jpg",
  "aldrich-killian":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/c0/Aldrich_Killian_Infobox.jpeg/revision/latest?cb=20210418203927",
  "alex-wilder":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/3c/Alex_Wilder_Infobox.jpg/revision/latest?cb=20231020204253",
  "alexander-pierce":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/3e/Alexander_Pierce_profile.png/revision/latest?cb=20231022031139",
  alioth:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/92/Alioth_Loki.jpg/revision/latest?cb=20210710221953",
  "alligator-loki":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0e/Alligator_Loki_Official.jpg/revision/latest?cb=20231020213936",
  "america-chavez":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a8/America_Chavez.png/revision/latest?cb=20231021153752",
  "ana-helstrom":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d2/Ana_Helstrom_profile.png/revision/latest?cb=20230331153926",
  angel:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/24-angel.jpg",
  annihilus:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/29-annihilus.jpg",
  arishem:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/7e/Arishem.png/revision/latest?cb=20230926005618",
  "arnim-zola":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/67/Arnim_Zola.png/revision/latest?cb=20141127015752",
  aurora:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/56-aurora.jpg",
  ayesha:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/87/Ayesha_profile_%281%29.png/revision/latest?cb=20210506194507",
  azazel:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/57-azazel.jpg",
  banshee:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/61-banshee.jpg",
  beast:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/75-beast.jpg",
  "ben-parker":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/e4/Benjamin_Parker_%28Earth-616%29_from_Official_Handbook_of_the_Marvel_Universe_Book_of_the_Dead_2004_Vol_1_1_0001.png/revision/latest?cb=20170410023208",
  "ben-reilly":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/577-scarlet-spider.jpg",
  "betty-ross":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/86/Betty_Ross.jpg/revision/latest?cb=20160101141249",
  "black-bolt":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/96-black-bolt.jpg",
  "black-cat":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/99-black-cat.jpg",
  "black-widow":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/107-black-widow.jpg",
  blackheart:
    "https://static.wikia.nocookie.net/marveldatabase/images/5/5a/Blackheart_%28Earth-9411%29_from_Marvel_Heroes_%28UK%29_Vol_1_14_001.jpg/revision/latest?cb=20200713142648",
  blade:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/112-blade.jpg",
  blink:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/115-blink.jpg",
  "boastful-loki":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/43/Boastful_Loki_Official.jpg/revision/latest?cb=20231020213919",
  "bolivar-trask":
    "https://static.wikia.nocookie.net/marveldatabase/images/0/09/Bolivar_Trask_%28Earth-161%29_from_X-Men_Forever_Vol_2_9_001.jpg/revision/latest?cb=20091016020444",
  bullseye:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/141-bullseye.jpg",
  cable:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/145-cable.jpg",
  cannonball:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/148-cannonball.jpg",
  carnage:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/162-carnage.jpg",
  "cassandra-nova":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/ac/Cassandra_Nova.png/revision/latest?cb=20240628203222",
  "cassie-lang":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/4b/Cassie_Lang_Infobox.jpg/revision/latest?cb=20231124223701",
  "chase-stein":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/66/Chase_Stein_S3_-_Poster.jpg/revision/latest?cb=20231020204109",
  "christine-palmer":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/4f/Christine_Palmer_in_DSitMoM.jpg/revision/latest?cb=20250228204813",
  "classic-loki":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/29/Classic_Loki_Character_Poster.jpg/revision/latest?cb=20231020213825",
  "corvus-glaive":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0f/Corvus_Glaive_Infobox.png/revision/latest?cb=20180604193419",
  cosmo:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/80/Cosmo_Vol3_Infobox.jpg/revision/latest?cb=20231113215156",
  crossbones:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/88/Crossbones_Infobox.jpg/revision/latest?cb=20160229172341",
  "cull-obsidian":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/f5/Cull_Obsidian.JPG/revision/latest?cb=20210525191742",
  cyclops:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/196-cyclops.jpg",
  "daimon-helstrom":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/e/e6/Daimon_Helstrom_profile.png/revision/latest?cb=20230331153919",
  "dar-benn":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/bb/Dar-Benn_Promo.jpg/revision/latest?cb=20231201092608",
  davos:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b3/Davos.jpg/revision/latest?cb=20190531095929",
  dazzler:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/211-dazzler.jpg",
  /* His record is `universe: ["legacy"]` and the old picture was Earth-1610,
     the Ultimate version -- a different Frost. This is the Earth-616 handbook
     plate: white hair, goatee, long coat, and shaped for the grid at
     502x1179. Downloaded and looked at first. */
  "deacon-frost":
    "https://static.wikia.nocookie.net/marveldatabase/images/1/15/Deacon_Frost_%28Earth-616%29_from_All-New_Official_Handbook_of_the_Marvel_Universe_A_to_Z_Vol_1_4_0001.jpg/revision/latest?cb=20160523151306",
  death:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/07/Death_Infobox.png/revision/latest?cb=20241102024102",
  "doctor-octopus":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/225-doctor-octopus.jpg",
  "doctor-strange":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/226-doctor-strange.jpg",
  domino:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/227-domino.jpg",
  dormammu:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/232-dormammu.jpg",
  drax: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/234-drax-the-destroyer.jpg",
  dreykov:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/87/Dreykov.png/revision/latest?cb=20250520123750",
  "ebony-maw":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/67/Ebony_Maw_Infobox.jpg/revision/latest?cb=20210525202154",
  eclipse:
    "https://static.wikia.nocookie.net/marveldatabase/images/d/d3/Eclipse_%28Earth-616%29_from_Ironheart_Vol_1_7_001.png/revision/latest?cb=20190615162656",
  ego: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/235-ego.jpg",
  eitri:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/ac/Eitri.png/revision/latest?cb=20220205165648",
  electro:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/237-electro.jpg",
  elektra:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/238-elektra.jpg",
  "eli-bradley":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/fd/Eli_Bradley_Headshot.png/revision/latest?cb=20210423141633",
  "elsa-bloodstone":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b0/Elsa_Bloodstone.jpg/revision/latest?cb=20231020152003",
  "emma-frost":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/241-emma-frost.jpg",
  eson: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b7/Esonsearcher.png/revision/latest?cb=20141126104220",
  eternity:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b8/Eternity_Infobox.jpg/revision/latest?cb=20241027222001",
  falcon:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/251-falcon.jpg",
  firelord:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/258-firelord.jpg",
  floor:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/8f/Floor.png/revision/latest?cb=20230802150408",
  frigga:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/65/Frigga_Profile.png/revision/latest?cb=20210513163108",
  galactus:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/273-galactus.jpg",
  gambit:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/274-gambit.jpg",
  gamora:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/275-gamora.jpg",
  "gert-yorkes":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0e/Gert_Yorkes_S3_-_Poster.jpg/revision/latest?cb=20231020204151",
  ghost:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/4f/Ghost_Infobox.jpg/revision/latest?cb=20260313234608",
  "ghost-rider":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/280-ghost-rider.jpg",
  gorgon:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/79/Gorgo_Profile.png/revision/latest?cb=20170814180628",
  gorr: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/71/Gorr_Infobox.png/revision/latest?cb=20231021012723",
  grandmaster:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/92/Thor_Ragnarok_Textless_Character_Posters_06.jpg/revision/latest?cb=20231021034059",
  "green-goblin":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/299-green-goblin.jpg",
  groot:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/303-groot.jpg",
  "gwen-stacy":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/619-spider-gwen.jpg",
  "happy-hogan":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/89/Happy_Hogan_Infobox.png/revision/latest?cb=20240807203350",
  "harley-keener":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/c2/Harley_Keener.png/revision/latest?cb=20221203155727",
  "harold-meachum":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0a/Harold_Meachum.png/revision/latest?cb=20170324174103",
  "harry-osborn":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2d/Harry_Osborn_YFNSM_Infobox.jpeg/revision/latest?cb=20260630184926",
  havok:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/311-havok.jpg",
  hawkeye:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/313-hawkeye.jpg",
  "he-who-remains":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/be/He_Who_Remains_Infobox.jpg/revision/latest?cb=20240201135929",
  heimdall:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/e/ea/Heimdall_Infobox.jpg/revision/latest?cb=20250203022212",
  hela: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/321-hela.jpg",
  hercules:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/325-hercules.jpg",
  "high-evolutionary":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/c2/High_Evolutionary_Infobox.png/revision/latest?cb=20230904031119",
  "hope-summers":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/330-hope-summers.jpg",
  "howard-stark":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/f6/Howard_Stark_Infobox.png/revision/latest?cb=20191004205535",
  "howard-the-duck":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d0/Howard_duck.png/revision/latest?cb=20230707222901",
  hulk: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/332-hulk.jpg",
  iceman:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/339-iceman.jpg",
  "iron-man":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/346-iron-man.jpg",
  ironheart:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/48/Ironheart_Infobox.jpg/revision/latest?cb=20250516014201",
  "ivan-vanko":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/cb/Whiplash_Profile.png/revision/latest?cb=20240227160708",
  "jean-grey":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/356-jean-grey.jpg",
  "john-walker":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/ba/U.S._Agent_Infobox.png/revision/latest?cb=20260313234727",
  jubilee:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/372-jubilee.jpg",
  juggernaut:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/374-juggernaut.jpg",
  "justin-hammer":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b1/Iron_man_2_50.jpg/revision/latest?cb=20141204045154",
  kaecilius:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/f2/Kaecilius.png/revision/latest?cb=20250211065758",
  kang: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/379-kang.jpg",
  karnak:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/8e/Karnak.jpg/revision/latest?cb=20170814180234",
  "karolina-dean":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/f1/Karolina.jpg/revision/latest?cb=20161204194534",
  khonshu:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0a/Khonshu.png/revision/latest?cb=20220710113106",
  "kid-loki":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a6/Kid_Loki-official.jpg/revision/latest?cb=20231020213859",
  kilgrave:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/da/Kilgrave-Profile-JJ.jpg/revision/latest?cb=20191114200307",
  killmonger:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/9d/Black_Panther_Textless_Character_Poster_03.jpg/revision/latest?cb=20231024003905",
  kingpin:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/391-kingpin.jpg",
  korg: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/80/Korg_-_Infobox.jpg/revision/latest?cb=20231021012818",
  kraglin:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/4e/Kraglin_Obfonteri_Infobox.jpg/revision/latest?cb=20241128003917",
  krugarr:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/33/Krugarr-0.jpg/revision/latest?cb=20170808145705",
  "lauren-strucker":
    "https://static.wikia.nocookie.net/marveldatabase/images/d/df/Lauren_Strucker_%28Earth-17372%29_from_The_Gifted_%28TV_series%29_promotional_art_001.jpg/revision/latest?cb=20171018015221",
  legion:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/403-legion.jpg",
  lizard:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/412-lizard.jpg",
  lockjaw:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/9d/Lockjaw.JPG/revision/latest?cb=20231023140237",
  loki: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/414-loki.jpg",
  love: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/ab/LoveTLAT.png/revision/latest?cb=20220909151103",
  lylla:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/64/Lylla_on_floor_infobox.png/revision/latest?cb=20230722010732",
  mainframe:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/95/Mainframe.jpg/revision/latest?cb=20230516023646",
  malekith:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b1/Malekith-TextlessPoster1.jpg/revision/latest?cb=20231022145132",
  "man-thing":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/428-man-thing.jpg",
  mantis:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/431-mantis.jpg",
  "maria-hill":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/f4/Maria_Hill_Infobox.jpg/revision/latest?cb=20250203210426",
  martinex:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/58/Martinex.jpg/revision/latest?cb=20230516023625",
  maximus:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/24/Maximus.jpg/revision/latest?cb=20191120220617",
  mayhem:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/81/Mayhem_HS.jpg/revision/latest?cb=20231020211248",
  mbaku:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/e/e4/M%27Baku_Infobox.png/revision/latest?cb=20231021150505",
  medusa:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/441-medusa.jpg",
  mephisto:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/443-mephisto.jpg",
  miek: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/ad/Tlat_miek.png/revision/latest?cb=20230710000319",
  "miles-morales":
    "https://static.wikia.nocookie.net/marveldatabase/images/3/39/Miles_Morales_Spider-Man_Vol_3_1_Textless.jpg/revision/latest?cb=20260421170022",
  mirage:
    "https://static.wikia.nocookie.net/marveldatabase/images/1/1e/Danielle_Moonstar_%28Earth-616%29_from_Uncanny_X-Men_Vol_5_21_001.png/revision/latest?cb=20190718001414",
  "miss-minutes":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/29/Miss_Minutes_Profile.png/revision/latest?cb=20260728164648",
  "mister-sinister":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/460-mister-sinister.jpg",
  mobius:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2d/Mobius_M._Mobius.png/revision/latest?cb=20231020213732",
  modok:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/463-modok.jpg",
  "mole-man":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/32/Mole_Man_Infobox.png/revision/latest?cb=20250717183400",
  "molly-hernandez":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/e/ef/Molly_Hernandez_S3_-_Poster.jpg/revision/latest?cb=20231020204048",
  "monica-rambeau":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/dc/Monica_Rambeau_Profile.png/revision/latest?cb=20240120054741",
  "moon-knight":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/470-moon-knight.jpg",
  mordo:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/98/Karl_Mordo.png/revision/latest?cb=20231020202643",
  "morgan-stark":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/24/Morgan_H._Stark.png/revision/latest?cb=20190726133152",
  muse: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/16/Muse_Infobox.png/revision/latest?cb=20251024023930",
  mysterio:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/479-mysterio.jpg",
  mystique:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/480-mystique.jpg",
  namor:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/481-namor.jpg",
  nebula:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/487-nebula.jpg",
  "ned-leeds":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/88/Ned_Leeds_Infobox.jpg/revision/latest?cb=20260617111633",
  "nick-fury":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/489-nick-fury.jpg",
  "nico-minoru":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/60/Nico_Minoru_S3_-_Poster.jpg/revision/latest?cb=20231020204233",
  nightcrawler:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/490-nightcrawler.jpg",
  nobu: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/1e/NobuResurrected.png/revision/latest?cb=20211016194026",
  "obadiah-stane":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/347-iron-monger.jpg",
  odin: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/498-odin.jpg",
  ouroboros:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/f1/Ouroboros_Infobox.jpg/revision/latest?cb=20231013213311",
  "peggy-carter":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/6b/Peggy_Carter_Infobox.png/revision/latest?cb=20250209154948",
  "pepper-potts":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d4/Rescue_Infobox.png/revision/latest?cb=20231025192612",
  "phil-coulson":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/98/Phil_Coulson_Infobox.jpg/revision/latest?cb=20250203215516",
  "phyla-vell":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/62/Phyla_Infobox.png/revision/latest?cb=20230809030044",
  polaris:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/523-polaris.jpg",
  "proxima-midnight":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/c6/Proxima02.jpg/revision/latest?cb=20260507225713",
  pyro: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/532-pyro.jpg",
  "red-guardian":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a0/Red_Guardian_Infobox.jpg/revision/latest?cb=20260313235054",
  "rhomann-dey":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/e/e2/Rhomann.jpg/revision/latest?cb=20140716220810",
  "richard-rider":
    "https://static.wikia.nocookie.net/marveldatabase/images/9/99/Imperial_Vol_1_3_Just_Spectacular_Collection_Virgin_Variant.jpg/revision/latest?cb=20250825201846",
  rocket:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/566-rocket-raccoon.jpg",
  rogue:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/567-rogue.jpg",
  ronan:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0f/Ronan_the_Accuser_Infobox.jpg/revision/latest?cb=20241127020215",
  sabretooth:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/570-sabretooth.jpg",
  sandman:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/572-sandman.jpg",
  "scarlet-witch":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/579-scarlet-witch.jpg",
  scorpion:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/581-scorpion.jpg",
  scream:
    "https://static.wikia.nocookie.net/marveldatabase/images/f/f5/Absolute_Carnage_Scream_Vol_1_1_Textless.jpg/revision/latest?cb=20190523183515",
  "sebastian-shaw":
    "https://static.wikia.nocookie.net/marveldatabase/images/e/ec/Immortal_X-Men_Vol_1_6_Textless.jpg/revision/latest?cb=20220515111421",
  "shadow-king":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/584-shadow-king.jpg",
  "she-hulk":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/589-she-hulk.jpg",
  shocker:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/591-shocker.jpg",
  shuri:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/93/Black_Panther_Infobox.jpg/revision/latest?cb=20240802145610",
  sif: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/594-sif.jpg",
  "silver-samurai":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/83/Shingen_Harada_II_%28Earth-616%29_from_All-New_X-Men_Vol_1_13_001.jpg/revision/latest?cb=20190925001754",
  "silver-surfer":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/598-silver-surfer.jpg",
  skaar:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/605-skaar.jpg",
  "spider-man":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg",
  "stakar-ogord":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/c1/Stakar_Ogord.jpg/revision/latest?cb=20250119215739",
  "star-lord":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/630-star-lord.jpg",
  "star-lord-tchalla":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/06/Star-Lord_-_Ravager_T%27Challa_Infobox.png/revision/latest?cb=20231021044901",
  storm:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/638-storm.jpg",
  sunspot:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/640-sunspot.jpg",
  /* Supplied. The Earth-691 Guardians 3000 plate: the green head in the tank
     with the tendrils, which is the image everyone pictures. The record is
     `universe: ["mcu"]`, where the Intelligence wears a borrowed human face,
     so this is the comics depiction of the same entity rather than the MCU
     one -- the same call already made for Gaea, and recorded here so it is a
     decision rather than a drift. */
  "supreme-intelligence":
    "https://static.wikia.nocookie.net/marveldatabase/images/2/26/Supreme_Intelligence_%28Earth-691%29_from_Guardians_3000_Vol_1_1_0001.png/revision/latest?cb=20141123081747",
  surtur:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/e/e7/Surtur_Profile.png/revision/latest?cb=20180208221832",
  "syd-barrett":
    "https://static.wikia.nocookie.net/marveldatabase/images/8/8a/Sydney_Barrett_%28Earth-TRN1067%29_from_Legion_%28TV_series%29_Season_2_7.jpg/revision/latest?cb=20251215001400",
  sylvie:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a3/The_Variant_Loki.png/revision/latest?cb=20231020213758",
  talos:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a1/Talos_Infobox.png/revision/latest?cb=20250204001702",
  taskmaster:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/653-taskmaster.jpg",
  teefs:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d0/Teefs.jpg/revision/latest?cb=20230517175832",
  "the-ancient-one":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/dc/Ancient_One.png/revision/latest?cb=20231020202432",
  "the-collector":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0d/Collector_Infobox.jpg/revision/latest?cb=20231022154628",
  "the-destroyer":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/3a/Destroyer.png/revision/latest?cb=20240322032224",
  "the-mandarin":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/430-mandarin.jpg",
  "the-one-above-all":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/One_Above_All_%28Multiverse%29_from_Storm_Vol_5_8_001.jpg/revision/latest?cb=20250508024307",
  "the-one-below-all":
    "https://static.wikia.nocookie.net/marveldatabase/images/4/4b/Immortal_Hulk_Vol_1_12_Textless.jpg/revision/latest?cb=20181021045341",
  "the-watcher":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/e/e5/Uatu_the_Watcher.png/revision/latest?cb=20241230223134",
  thor: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/659-thor.jpg",
  thunderbird:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/661-thunderbird.jpg",
  tiamut:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/81/Tiamut_Eternals.png/revision/latest?cb=20220124131019",
  tombstone:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/cb/Tombstone_Infobox.jpg/revision/latest?cb=20260808030126",
  "trevor-slattery":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/22/TrevorSlatteryShangChi.jpeg/revision/latest?cb=20231210194425",
  valentina:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/25/Valentina_Allegra_de_Fontaine_Infobox.png/revision/latest?cb=20250828180751",
  valkyrie:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d8/Valkyrie_in_LoveAndThunder_Poster.png/revision/latest?cb=20231021012751",
  venom:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/687-venom.jpg",
  /* NOT AIDA. The pinned image was `Aida_Infobox.jpg` -- Mallory Jansen from
     Agents of S.H.I.E.L.D., who is a different Madame Hydra entirely. This
     record is `universe: ["fox"]`, the toxicologist Svetlana Khodchenkova
     plays in The Wolverine, and the marvel-movies wiki's own page image for
     "Viper" is the Jansen photo too, so the lookup could not have got it
     right. Downloaded and checked before pinning. */
  viper:
    "https://static.wikia.nocookie.net/marvelmovies/images/a/a9/Viper-3.jpg/revision/latest?cb=20130702123124",
  vulture:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/701-vulture.jpg",
  "war-machine":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/703-war-machine.jpg",
  "werewolf-by-night":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/bb/Werewolf_by_Night.png/revision/latest?cb=20250407225448",
  "white-vision":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/60/White_Vision_Infobox.jpg/revision/latest?cb=20260815234105",
  wiccan:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/83/Wiccan_Infobox.png/revision/latest?cb=20241018202830",
  "william-stryker":
    "https://static.wikia.nocookie.net/marveldatabase/images/6/69/William_Stryker_%28Earth-65%29_from_Spider-Gwen_Vol_2_20_001.png/revision/latest?cb=20171008132759",
  "winter-soldier":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/714-winter-soldier.jpg",
  wolfsbane:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/716-wolfsbane.jpg",
  "wonder-man":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/719-wonder-man.jpg",
  wong: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/00/Wong_in_She-Hulk.jpg/revision/latest?cb=20240802144541",
  "x-23":
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/723-x-23.jpg",
  "yelena-belova":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/8e/Yelena_Belova_Infobox.jpg/revision/latest?cb=20250425194545",
  yellowjacket:
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/726-yellowjacket.jpg",
  "yon-rogg":
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/23/Yon-Rogg_Textless_Poster.jpg/revision/latest?cb=20231025001232",
  zeus: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2c/Zeus_Infobox.jpg/revision/latest?cb=20231021012844",
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
async function fromFandom(
  names: string[],
  api: string,
): Promise<Map<string, string>> {
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
        pages?: Record<
          string,
          { title?: string; original?: { source?: string } }
        >;
        /** A redirect means we asked for "Wong" and landed on "Wong (Earth-199999)". */
        normalized?: { from: string; to: string }[];
        redirects?: { from: string; to: string }[];
      };
    };
    /** Map the resolved title back to what we asked for. */
    const back = new Map<string, string>();
    for (const r of [
      ...(j.query?.normalized ?? []),
      ...(j.query?.redirects ?? []),
    ]) {
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
  for (const wiki of new Set(
    Object.values(PAGE_OVERRIDES).map((o) => o.wiki),
  )) {
    const ids = Object.entries(PAGE_OVERRIDES).filter(
      ([, o]) => o.wiki === wiki,
    );
    const found = await fromFandom(
      ids.map(([, o]) => o.page),
      wiki,
    );
    for (const [id, o] of ids) {
      const src = found.get(o.page);
      if (src)
        art.set(id, { image: src, source: "mcu-wiki", matchedAs: o.page });
      else fandomErrors.push(`page override missed: ${id} → ${o.page}`);
    }
  }

  /**
   * AND HAND-PICKED ART WINS AGAIN, because the line above claiming it
   * "outranks everything, including the page overrides" was not true: the
   * page-override stage runs after it and was overwriting six pins.
   *
   * A page override says "use whatever image this article shows today", which
   * is the drift itself, not a fix for it. A URL is a fix for it. Applied
   * before the stage as well, so the gap-fill still skips anything pinned.
   */
  for (const [id, url] of Object.entries(IMAGE_OVERRIDES)) {
    art.set(id, { image: url, source: "chosen", matchedAs: "hand-picked" });
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
      const src = [c.nameEn, ...(c.aliases ?? [])]
        .map((n) => found.get(n))
        .find(Boolean);
      if (src)
        art.set(c.id, { image: src, source: "mcu-wiki", matchedAs: c.nameEn });
    }
  }

  const out: Record<string, CharacterArt> = {};
  for (const c of characters)
    out[c.id] = art.get(c.id) ?? { image: null, source: null, matchedAs: null };

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
    console.log(
      "              these render the designed plate, which is a state, not a bug",
    );
  }

  /**
   * A mismatch is the failure mode that ships silently: the run succeeds, the
   * page renders, and the picture is of somebody else. Printing what each name
   * resolved to makes it reviewable in the diff.
   */
  const odd = Object.entries(out).filter(
    ([id, x]) =>
      x.matchedAs &&
      bare(x.matchedAs) !== bare(characters.find((c) => c.id === id)!.nameEn),
  );
  if (odd.length) {
    console.log(
      `\n  matched under a different name — check these ${odd.length}:`,
    );
    for (const [id, x] of odd)
      console.log(`    ${id.padEnd(24)} → ${x.matchedAs}`);
  }
  const bySource = new Map<string, number>();
  for (const v of Object.values(out)) {
    if (v.source) bySource.set(v.source, (bySource.get(v.source) ?? 0) + 1);
  }
  console.log("");
  for (const [src, n] of [...bySource].sort())
    console.log(`  from ${src.padEnd(10)} ${n}`);
  if (fandomErrors.length) console.log(`  wiki errors ${fandomErrors.length}`);
  console.log("\n  wrote content/character-art.generated.json — commit it.\n");
}

await main();
