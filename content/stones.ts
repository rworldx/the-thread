/**
 * THE SIX INFINITY STONES, and the film each one walks into.
 *
 * A beginner watching the Infinity Saga is being handed six objects across
 * eleven years and is expected to remember that the blue cube, the glowing
 * sceptre, the red smoke, the orb, the necklace and the orange rock are the
 * same kind of thing. Nothing on screen says so until the gauntlet, by which
 * point the question has stopped being answerable.
 *
 * So each stone is attached to the film that FIRST SHOWS IT, and the record
 * carries the one fact that makes it recognisable: what it looks like and what
 * the film calls it. "Space Stone" is a name nobody says on screen; "the
 * Tesseract" is the blue cube in the box, and those are the same object.
 *
 * FIRST APPEARANCE ONLY. The Tesseract is in four films and the Mind Stone in
 * six; listing every appearance would make this a concordance rather than an
 * introduction. `firstIn` is the film where a viewer meets it, which is the
 * only one where the explanation helps.
 *
 * The artwork is the MCU wiki's own render, on the host this site already uses
 * for character portraits, and it is checked by `npm run verify:assets` like
 * every other external URL here.
 */

export interface Stone {
  id: string;
  nameEn: string;
  nameAr: string;
  /** The title that first puts it on screen. */
  firstIn: string;
  /** What it looks like and what the film calls it — the recognisable fact. */
  vesselEn: string;
  vesselAr: string;
  /** What it does, in one clause. */
  powerEn: string;
  powerAr: string;
  image: string;
}

const WIKI = "https://static.wikia.nocookie.net/marvelcinematicuniverse/images";

export const stones: Stone[] = [
  {
    id: "space",
    nameEn: "The Space Stone",
    nameAr: "حجر المكان",
    firstIn: "captain-america-the-first-avenger",
    vesselEn: "A blue cube, called the Tesseract.",
    vesselAr: "مكعّب أزرق يُسمّى «التِسّيراكت».",
    powerEn: "Opens a door anywhere, to anywhere.",
    powerAr: "يفتح بابًا من أي مكان إلى أي مكان.",
    image: `${WIKI}/0/0a/Space_Stone_VFX.png/revision/latest?cb=20220811185744`,
  },
  {
    id: "mind",
    nameEn: "The Mind Stone",
    nameAr: "حجر العقل",
    firstIn: "the-avengers",
    vesselEn: "A yellow gem in the head of Loki's sceptre.",
    vesselAr: "جوهرة صفراء في رأس صولجان لوكي.",
    powerEn: "Reaches into a mind and changes it.",
    powerAr: "يصل إلى العقل فيغيّره.",
    image: `${WIKI}/e/e4/Mind_Stone_VFX.png/revision/latest?cb=20220811185608`,
  },
  {
    id: "reality",
    nameEn: "The Reality Stone",
    nameAr: "حجر الواقع",
    firstIn: "thor-the-dark-world",
    vesselEn: "A red liquid, called the Aether.",
    vesselAr: "سائل أحمر يُسمّى «الأيثر».",
    powerEn: "Makes what is not so, so.",
    powerAr: "يجعل ما ليس كائنًا كائنًا.",
    image: `${WIKI}/9/9b/Reality_Stone_VFX.png/revision/latest?cb=20220811185450`,
  },
  {
    id: "power",
    nameEn: "The Power Stone",
    nameAr: "حجر القوة",
    firstIn: "guardians-of-the-galaxy",
    vesselEn: "A purple stone inside a metal sphere, the Orb.",
    vesselAr: "حجر بنفسجي داخل كرة معدنية تُسمّى «الجُرم».",
    powerEn: "Destroys anything it touches, including whoever holds it.",
    powerAr: "يدمّر كل ما يمسّه، بمن فيهم حامله.",
    image: `${WIKI}/d/d7/Power_Stone_VFX.png/revision/latest?cb=20220811185251`,
  },
  {
    id: "time",
    nameEn: "The Time Stone",
    nameAr: "حجر الزمن",
    firstIn: "doctor-strange",
    vesselEn: "A green stone in a pendant, the Eye of Agamotto.",
    vesselAr: "حجر أخضر في قلادة تُسمّى «عين أغاموتو».",
    powerEn: "Runs time forward or back, or loops it.",
    powerAr: "يُجري الزمن إلى الأمام أو الخلف، أو يُدوّره.",
    image: `${WIKI}/f/f0/Time_Stone_VFX.png/revision/latest?cb=20220811185708`,
  },
  {
    id: "soul",
    nameEn: "The Soul Stone",
    nameAr: "حجر الروح",
    firstIn: "avengers-infinity-war",
    vesselEn: "An orange stone on Vormir, and the only one with a price.",
    vesselAr: "حجر برتقالي في فورمير، وهو الوحيد الذي له ثمن.",
    powerEn: "Commands the soul — and is not given, only paid for.",
    powerAr: "يتحكّم في الروح، ولا يُوهب بل يُدفع ثمنه.",
    image: `${WIKI}/1/17/Soul_Stone_VFX.png/revision/latest?cb=20220811190632`,
  },
];

/** The stone a title introduces, or null. Six titles have one; 161 do not. */
export function stoneIntroducedBy(titleId: string): Stone | null {
  return stones.find((s) => s.firstIn === titleId) ?? null;
}
