/**
 * THE RIGHTS TIMELINE.
 *
 * This is the answer to "why is a Marvel watch order hard", and it is not a
 * story about films. It is a story about who owned which characters in which
 * decade, and every confusing thing in the order comes from it.
 *
 * Each row was verified by search during the build rather than recalled. Where
 * a figure is reported rather than confirmed, the copy says "reported".
 */

export interface RightsEntry {
  /** ISO year, or a range written as a single label where the deal was gradual. */
  year: string;
  en: string;
  ar: string;
  /** The universe this row explains, where it maps to one. Drives the accent. */
  universe?: string;
  /**
   * A STUDIO THAT IS NOT A UNIVERSE.
   *
   * The mark used to be read off `universe`, which meant only the companies
   * this site has a section for could have one — so Universal, whose
   * distribution deal is the single reason there has never been a second solo
   * Hulk film, appeared as an unmarked paragraph. The row was about a company
   * and did not show it.
   */
  logo?: string;
}

/**
 * THE LOGO OF WHOEVER THE ROW IS ABOUT.
 *
 * The rights history is the most important page on this site and it was eleven
 * paragraphs of prose — the kind of thing a reader scrolls past. A mark beside
 * each row turns a wall of text into a sequence of recognisable companies, and
 * "Disney bought Fox" lands in a way the sentence alone does not.
 *
 * SVG from Wikimedia Commons, which is where these live as freely licensed
 * files, on a host this project already allows for character art. Not every row
 * is about a company — some are about a deal — and those simply have no mark.
 */
const C = "https://upload.wikimedia.org/wikipedia/commons";
export const RIGHTS_LOGOS: Record<string, { src: string; label: string }> = {
  marvel: { src: `${C}/b/b9/Marvel_Logo.svg`, label: "Marvel" },
  mcu: { src: `${C}/1/10/Marvel_Studios_2016_logo.svg`, label: "Marvel Studios" },
  sony: { src: `${C}/8/8d/Sony_Pictures_Inc._logo.svg`, label: "Sony Pictures" },
  /**
   * The HORIZONTAL lockup, not the shield. The 2020 file is the tall stacked
   * mark, and a tall mark centred in a wide plate reads as a stamp sitting in
   * a field of white — it was the smallest thing in a row of logos meant to
   * scan as equals. Same brand, same year, the lockup built to sit in a line.
   *
   * Sony keeps its tall mark, because every horizontal Sony file on Commons
   * belongs to a sub-label — Animation, Classics, Core — and none of those is
   * the company that holds the Spider-Man licence. A better-shaped logo of the
   * wrong division is worse than a correct one that sits small.
   */
  fox: { src: `${C}/0/08/20th_Century_Studios_%282021%29.svg`, label: "20th Century Studios" },
  defenders: { src: `${C}/0/08/Netflix_2015_logo.svg`, label: "Netflix" },
  disney: { src: `${C}/3/3e/Disney%2B_logo.svg`, label: "Disney+" },
  universal: { src: `${C}/b/b6/Universal_Pictures_logo.svg`, label: "Universal Pictures" },
  paramount: { src: `${C}/8/81/Paramount_Pictures_2011.svg`, label: "Paramount Pictures" },
};

/**
 * The mark for a row. An explicit `logo` wins, because a row can be about a
 * company this site has no section for; otherwise it follows the universe.
 */
export function logoFor(row: {
  universe?: string;
  logo?: string;
}): { src: string; label: string } | null {
  if (row.logo) return RIGHTS_LOGOS[row.logo] ?? null;
  const universe = row.universe;
  if (!universe) return null;
  if (universe === "legacy" || universe === "marvel-tv") return RIGHTS_LOGOS.marvel!;
  if (universe === "animation") return null;
  return RIGHTS_LOGOS[universe] ?? null;
}

export const rightsTimeline: RightsEntry[] = [
  {
    year: "1996",
    en: "Marvel Entertainment files for bankruptcy protection. It starts selling film rights to its characters to raise cash, each deal carrying a reversion clause: make a film within a set number of years or the rights come back.",
    ar: "تتقدّم مارفل إنترتينمنت بطلب حماية من الإفلاس، وتبدأ ببيع حقوق شخصياتها السينمائية لجمع السيولة، وفي كل صفقة شرط استرداد: أنتِج فيلمًا خلال سنوات محددة أو تعود الحقوق.",
  },
  {
    year: "1996",
    en: "New Line takes Blade. Fox takes X-Men, Fantastic Four and Daredevil. Universal takes Hulk and Namor. Lionsgate takes Punisher, Black Widow and Man-Thing. Sony takes Ghost Rider.",
    ar: "نيو لاين تأخذ بليد. فوكس تأخذ إكس مِن والأربعة الرائعين وديرديفل. يونيفرسال تأخذ هالك ونيمور. لايونزغيت تأخذ المعاقب والأرملة السوداء ومان ثينغ. سوني تأخذ غوست رايدر.",
  },
  {
    year: "1998",
    en: "Blade opens and makes money. It is the first Marvel film that works, and it is the reason anyone financed the rest.",
    ar: "يُعرض «بليد» ويحقق أرباحًا. هو أول فيلم مارفل ينجح، وهو سبب تمويل كل ما جاء بعده.",
    universe: "legacy",
  },
  {
    year: "1999",
    en: "The Spider-Man litigation ends and Marvel licenses him to Sony for a reported seven to ten million dollars. The licence covers roughly nine hundred related characters, which is why Venom, Kraven and every Spider-Man villain belong to Sony rather than to Marvel.",
    ar: "تنتهي نزاعات سبايدر مان القضائية، فترخّصه مارفل لسوني بمبلغ يُذكر أنه بين سبعة وعشرة ملايين دولار. ويغطي الترخيص نحو تسعمئة شخصية مرتبطة به، ولهذا ينتمي فينوم وكرايفن وكل أشرار سبايدر مان إلى سوني لا إلى مارفل.",
    universe: "sony",
  },
  {
    year: "2000",
    en: "Fox releases X-Men. The mutants become a film franchise on a separate track from everything Marvel will later build, and they stay there for nineteen years.",
    ar: "تُصدر فوكس «إكس مِن». يتحوّل المتحوّلون إلى سلسلة أفلام على مسار منفصل عن كل ما ستبنيه مارفل لاحقًا، ويظلّون عليه تسعة عشر عامًا.",
    universe: "fox",
  },
  {
    year: "2003",
    en: "The Hulk film rights revert to Marvel. Universal keeps distribution rights, which it still holds. That is the actual reason there has never been a second solo Hulk film.",
    logo: "universal",
    ar: "تعود حقوق أفلام هالك إلى مارفل، وتحتفظ يونيفرسال بحقوق التوزيع التي ما زالت بيدها. وهذا هو السبب الحقيقي لعدم وجود فيلم منفرد ثانٍ لهالك.",
  },
  {
    year: "2005",
    en: "Marvel raises finance against the characters nobody had licensed, and starts Marvel Studios to make films itself. The collateral list is why the MCU begins with Iron Man rather than with Spider-Man or the X-Men.",
    ar: "تحصل مارفل على تمويل مقابل الشخصيات التي لم يرخّصها أحد، وتؤسس مارفل ستوديوز لتصنع أفلامها بنفسها. قائمة الضمانات تلك هي سبب بدء الكون السينمائي بالرجل الحديدي لا بسبايدر مان أو إكس مِن.",
  },
  {
    year: "2008",
    en: "Iron Man opens. The Incredible Hulk follows the same year, distributed by Universal, which is why it sits slightly apart from everything after it.",
    ar: "يُعرض «الرجل الحديدي». ويتبعه «هالك المذهل» في العام نفسه بتوزيع يونيفرسال، ولهذا يقف قليلًا على حدة عن كل ما تلاه.",
    universe: "mcu",
  },
  {
    year: "2009",
    en: "Disney buys Marvel Entertainment for four billion dollars. It does not buy back any of the licences, so nothing about the split changes yet.",
    ar: "تشتري ديزني مارفل إنترتينمنت بأربعة مليارات دولار. ولا تستعيد أيًّا من التراخيص، فلا يتغير شيء في الانقسام بعد.",
  },
  {
    year: "2013",
    en: "Distribution of the Iron Man, Thor and Captain America films returns from Paramount to Disney.",
    logo: "paramount",
    ar: "يعود توزيع أفلام الرجل الحديدي وثور وكابتن أمريكا من باراماونت إلى ديزني.",
  },
  {
    year: "2015",
    en: "Sony and Marvel Studios agree to share Spider-Man. He enters the MCU in Civil War while Sony keeps the character and the wider licence, which is why he can be in both places at once.",
    ar: "تتفق سوني ومارفل ستوديوز على تقاسم سبايدر مان. يدخل الكون السينمائي في «الحرب الأهلية» بينما تحتفظ سوني بالشخصية وبالترخيص الأوسع، ولهذا يمكن أن يكون في المكانين معًا.",
    universe: "sony",
  },
  {
    year: "2015",
    en: "Marvel Television starts making series for ABC, Freeform, Hulu and Netflix. It is a different company under a different executive from the studio making the films.",
    ar: "تبدأ مارفل تلفيجن إنتاج مسلسلات لقنوات ABC وفريفورم وهولو ونتفليكس. وهي شركة مختلفة بإدارة مختلفة عن الاستوديو الذي يصنع الأفلام.",
    universe: "marvel-tv",
  },
  {
    year: "2019",
    en: "Disney completes its acquisition of 20th Century Fox. X-Men, Deadpool and the Fantastic Four come home after two decades away.",
    ar: "تُتمّ ديزني استحواذها على تونتيث سينتشري فوكس. يعود إكس مِن وديدبول والأربعة الرائعون إلى الديار بعد عقدين من الغياب.",
    universe: "fox",
  },
  {
    year: "2019",
    en: "Marvel Television is absorbed into Marvel Studios and its shows lose canon status. That is why Agents of S.H.I.E.L.D. and the rest sit in their own universe here rather than beside Endgame.",
    ar: "تُدمج مارفل تلفيجن في مارفل ستوديوز، وتفقد مسلسلاتها صفتها الرسمية في القصة. ولهذا يقف «عملاء شيلد» وبقيتها في كونها الخاص هنا لا إلى جانب «نهاية اللعبة».",
    universe: "marvel-tv",
  },
  {
    year: "2022",
    en: "The Netflix series revert to Disney and move to Disney+. Daredevil returns to the films two years later.",
    ar: "تعود مسلسلات نتفليكس إلى ديزني وتنتقل إلى ديزني بلس. ويعود ديرديفل إلى الأفلام بعد عامين.",
    universe: "defenders",
  },
  {
    year: "2024",
    en: "Deadpool & Wolverine opens. It is the first film with Fox characters made by Marvel Studios, and it reaches back across two decades of a rival studio's continuity to do it.",
    ar: "يُعرض «ديدبول وولفرين». هو أول فيلم بشخصيات فوكس من إنتاج مارفل ستوديوز، ويعود ليصل عقدين من سياق استوديو منافس ليحقق ذلك.",
    universe: "mcu",
  },
];
