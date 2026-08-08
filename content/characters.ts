import type { CharacterDraft } from "./character-schema";

/**
 * THE CHARACTER CORPUS.
 *
 * Sixty-six records, hand-authored, because no API has this. TMDB has cast.
 * Marvel's own API has names and thumbnails but no powers and no mutant rank.
 * Everything below is editorial work held to the project's oldest rule: a fact
 * that is not known is left out rather than inferred.
 *
 * Scope was chosen and then held: every Avenger who leads a film, the core
 * X-Men, the Spider-Man variants and their headline villains, the Defenders,
 * the Fantastic Four, and the antagonists a beginner will actually ask about.
 * Not five hundred. Each record is roughly six written strings in two
 * languages, and a corpus nobody finished is worth less than one that is small
 * and complete.
 *
 * `appearances` is absent on purpose. It is derived in lib/characters.ts from
 * TMDB cast credits, matched on `aliases`. Typing it here as well would create
 * a second source of truth for the same fact, which this project has already
 * been burned by twice.
 *
 * MUTANT CLASS is the published in-universe classification, not a power level
 * invented here. The five Omegas below are on Marvel's own House of X list.
 * Charles Xavier is not on it, and is recorded accordingly.
 *
 * Every Arabic string here is a NON-NATIVE DRAFT. `arReviewed` is false.
 */

const avengers: CharacterDraft[] = [
  {
    id: "iron-man",
    nameEn: "Iron Man",
    nameAr: "الرجل الحديدي",
    aliases: ["Tony Stark", "Anthony Stark", "Iron Man"],
    category: "hero",
    affiliation: ["Avengers", "Team Iron Man"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Powered armour", ar: "بذلة مدرّعة" },
      { en: "Flight", ar: "طيران" },
      { en: "Genius engineer", ar: "مهندس عبقري" },
      { en: "Repulsor weapons", ar: "أسلحة دافعة" },
    ],
    origin: {
      en: "A weapons manufacturer is taken hostage and builds a suit of armour to get out of the cave he is held in. He comes home, shuts the weapons division down, and keeps building.",
      ar: "صانع أسلحة يقع أسيرًا فيبني بذلة مدرّعة يخرج بها من الكهف الذي احتُجز فيه. يعود إلى بلده فيوقف قسم الأسلحة، ويواصل البناء.",
    },
    related: [
      { id: "war-machine", kind: "ally" },
      { id: "pepper-potts", kind: "family" },
      { id: "spider-man", kind: "ally" },
      { id: "captain-america", kind: "ally" },
      { id: "thanos", kind: "enemy" },
    ],
  },
  {
    id: "captain-america",
    nameEn: "Captain America",
    nameAr: "كابتن أمريكا",
    aliases: ["Steve Rogers", "Captain America", "Steven Rogers"],
    category: "hero",
    affiliation: ["Avengers", "Team Captain America"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Peak human strength", ar: "قوة بشرية قصوى" },
      { en: "Vibranium shield", ar: "درع من الفيبرانيوم" },
      { en: "Tactical command", ar: "قيادة ميدانية" },
    ],
    origin: {
      en: "A man too small to enlist volunteers for an experimental programme in 1943 and comes out of it the only success it ever had. The war ends without him, and he wakes up a long way from it.",
      ar: "رجل أصغر من أن يُقبل في الجيش يتطوّع لبرنامج تجريبي عام 1943، فيخرج منه نجاحه الوحيد. تنتهي الحرب من دونه، ثم يستيقظ بعيدًا عنها بزمن طويل.",
    },
    related: [
      { id: "winter-soldier", kind: "family" },
      { id: "falcon", kind: "ally" },
      { id: "iron-man", kind: "ally" },
      { id: "red-skull", kind: "enemy" },
    ],
  },
  {
    id: "thor",
    nameEn: "Thor",
    nameAr: "ثور",
    aliases: ["Thor", "Thor Odinson"],
    category: "hero",
    affiliation: ["Avengers", "Asgard", "Revengers", "Gods"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      { en: "Control of lightning", ar: "التحكم بالبرق" },
      { en: "Superhuman strength", ar: "قوة خارقة" },
      { en: "Very long lifespan", ar: "عمر طويل جدًا" },
    ],
    origin: {
      en: "An arrogant prince is stripped of his power and exiled to Earth by his father, to learn what the throne is actually for. He is the god of thunder, and for a while he is nobody in New Mexico.",
      ar: "أمير متعجرف يُجرَّد من قوته وينفيه أبوه إلى الأرض ليتعلّم ما العرش حقًا. هو إله الرعد، ويظل حينًا لا أحد في نيومكسيكو.",
    },
    related: [
      { id: "loki", kind: "family" },
      { id: "hulk", kind: "ally" },
      { id: "hela", kind: "family" },
    ],
  },
  {
    id: "hulk",
    nameEn: "Hulk",
    nameAr: "هالك",
    aliases: ["Bruce Banner", "Hulk", "The Hulk", "Robert Bruce Banner"],
    category: "hero",
    affiliation: ["Avengers", "Hulks", "Revengers"],
    universe: ["mcu", "legacy"],
    species: "Enhanced human",
    powers: [
      { en: "Strength that grows with anger", ar: "قوة تزداد مع الغضب" },
      { en: "Near-total durability", ar: "متانة تكاد تكون مطلقة" },
      { en: "Leading physicist", ar: "عالم فيزياء بارز" },
    ],
    origin: {
      en: "A physicist takes the full dose of his own gamma experiment and does not die. What he becomes when his pulse rises is stronger than anything on the field, and it does not take instructions.",
      ar: "عالم فيزياء يتلقّى جرعة تجربته الغامّية كاملة ولا يموت. ما يتحوّل إليه حين يتسارع نبضه أقوى من أي شيء في الميدان، ولا يتلقّى الأوامر.",
    },
    related: [
      { id: "thor", kind: "ally" },
      { id: "black-widow", kind: "ally" },
      { id: "abomination", kind: "enemy" },
    ],
  },
  {
    id: "black-widow",
    nameEn: "Black Widow",
    nameAr: "الأرملة السوداء",
    aliases: ["Natasha Romanoff", "Black Widow", "Natalie Rushman"],
    category: "hero",
    affiliation: ["Avengers", "S.H.I.E.L.D.", "Team Iron Man"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Master spy", ar: "جاسوسة محترفة" },
      { en: "Close combat", ar: "قتال قريب" },
      { en: "Interrogation", ar: "استجواب" },
    ],
    origin: {
      en: "Taken as a child and trained by a programme that turned girls into assets, she defects and spends the rest of her life working the debt off. She is the least powered person in most rooms she is in.",
      ar: "أُخذت طفلة ودرّبها برنامج يحوّل الفتيات إلى أدوات، ثم انشقّت وأمضت بقية حياتها تسدّد الدين. هي الأقل قدرةً في معظم الغرف التي تدخلها.",
    },
    related: [
      { id: "hawkeye", kind: "ally" },
      { id: "winter-soldier", kind: "enemy" },
      { id: "nick-fury", kind: "ally" },
    ],
  },
  {
    id: "hawkeye",
    nameEn: "Hawkeye",
    nameAr: "هوك آي",
    aliases: ["Clint Barton", "Hawkeye", "Ronin"],
    category: "hero",
    affiliation: ["Avengers", "S.H.I.E.L.D.", "Team Captain America"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Never misses", ar: "لا يخطئ هدفًا" },
      { en: "Trick arrows", ar: "سهام خاصة" },
      { en: "Close combat", ar: "قتال قريب" },
    ],
    origin: {
      en: "A S.H.I.E.L.D. marksman sent to kill an enemy agent, who files a different report instead. He has a family nobody at work knows about, and a bow against people who can level cities.",
      ar: "قنّاص في شيلد يُرسَل لقتل عميلة معادية، فيكتب تقريرًا آخر. لديه عائلة لا يعرف بها أحد في العمل، ولديه قوس في وجه من يقدرون على تسوية المدن بالأرض.",
    },
    related: [
      { id: "black-widow", kind: "ally" },
      { id: "kate-bishop", kind: "ally" },
    ],
  },
  {
    id: "scarlet-witch",
    nameEn: "Scarlet Witch",
    nameAr: "الساحرة القرمزية",
    aliases: ["Wanda Maximoff", "Scarlet Witch", "Wanda"],
    category: "antihero",
    affiliation: ["Avengers", "Team Captain America", "Magic"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Chaos magic", ar: "سحر الفوضى" },
      { en: "Telekinesis", ar: "تحريك الأشياء بالعقل" },
      { en: "Altering reality", ar: "تغيير الواقع" },
      { en: "Mind manipulation", ar: "التأثير في العقول" },
    ],
    origin: {
      en: "One of two twins from Sokovia who volunteer for experiments after a shell with a familiar name lands in their flat and does not go off. She comes out of it able to bend what other people believe is real.",
      ar: "إحدى توأمين من سوكوفيا تطوّعا للتجارب بعد أن سقطت في شقتهما قذيفة تحمل اسمًا يعرفانه ولم تنفجر. تخرج منها قادرة على ثني ما يظنّه الآخرون حقيقة.",
    },
    related: [
      { id: "vision", kind: "family" },
      { id: "quicksilver", kind: "family" },
      { id: "magneto", kind: "family" },
      { id: "agatha-harkness", kind: "enemy" },
      { id: "doctor-strange", kind: "ally" },
    ],
  },
  {
    id: "vision",
    nameEn: "Vision",
    nameAr: "فيجن",
    aliases: ["Vision", "The Vision"],
    category: "hero",
    affiliation: ["Avengers", "Team Iron Man"],
    universe: ["mcu"],
    species: "Synthezoid",
    powers: [
      { en: "Changes his own density", ar: "يغيّر كثافته" },
      { en: "Flight", ar: "طيران" },
      { en: "Beam projection", ar: "إطلاق شعاع" },
      { en: "Artificial mind", ar: "عقل اصطناعي" },
    ],
    origin: {
      en: "A body built to house an artificial intelligence, brought to life by something much older than either. He wakes up already able to lift a hammer that almost nobody else can.",
      ar: "جسد بُني ليحتضن ذكاءً اصطناعيًا، ثم بُعثت فيه الحياة بشيء أقدم منهما بكثير. يستيقظ قادرًا من فوره على رفع مطرقة لا يكاد يرفعها أحد.",
    },
    related: [
      { id: "scarlet-witch", kind: "family" },
      { id: "ultron", kind: "enemy" },
      { id: "iron-man", kind: "family" },
    ],
  },
  {
    id: "falcon",
    nameEn: "Falcon",
    nameAr: "فالكون",
    /**
     * NOT "Captain America". Sam Wilson takes the name later, but an alias is a
     * JOIN KEY against TMDB cast credits, and Steve Rogers is credited as
     * "Steve Rogers / Captain America" in eight films. Sharing the alias gave
     * Sam eight of Steve's credits and put Chris Evans's photograph on Sam's
     * tile. His own credits all carry "Sam Wilson", which is enough.
     */
    aliases: ["Sam Wilson", "Falcon"],
    category: "hero",
    affiliation: ["Avengers", "Team Captain America"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Winged flight rig", ar: "جهاز طيران مجنّح" },
      { en: "Combat pararescue", ar: "إنقاذ قتالي جوي" },
      { en: "Vibranium shield", ar: "درع من الفيبرانيوم" },
    ],
    origin: {
      en: "A pararescue veteran running a counselling group for returning soldiers, who is asked for a favour by a man out of time and never really stops being asked.",
      ar: "جندي إنقاذ سابق يدير مجموعة دعم لعائدين من الحرب، يطلب منه رجل خارج زمنه خدمة، فلا يكاد يتوقف الطلب بعدها.",
    },
    related: [
      { id: "captain-america", kind: "ally" },
      { id: "winter-soldier", kind: "ally" },
    ],
  },
  {
    id: "winter-soldier",
    nameEn: "Winter Soldier",
    nameAr: "جندي الشتاء",
    aliases: ["Bucky Barnes", "Winter Soldier", "James Barnes", "James Buchanan Barnes"],
    category: "antihero",
    affiliation: ["Avengers", "Team Captain America"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Metal arm", ar: "ذراع معدنية" },
      { en: "Enhanced strength", ar: "قوة معزّزة" },
      { en: "Marksmanship", ar: "براعة في الرماية" },
    ],
    origin: {
      en: "A sergeant who fell from a train in 1945 and was not recovered by his own side. What was made of him afterwards spent seventy years being pointed at people.",
      ar: "رقيب سقط من قطار عام 1945 ولم يجده جانبه. ما صُنع منه بعد ذلك أمضى سبعين عامًا يُوجَّه نحو الناس.",
    },
    related: [
      { id: "captain-america", kind: "family" },
      { id: "falcon", kind: "ally" },
    ],
  },
  {
    id: "war-machine",
    nameEn: "War Machine",
    nameAr: "وور ماشين",
    aliases: ["James Rhodes", "Rhodey", "War Machine", "Iron Patriot"],
    category: "hero",
    affiliation: ["Avengers", "Team Iron Man"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Powered armour", ar: "بذلة مدرّعة" },
      { en: "Heavy weapons", ar: "أسلحة ثقيلة" },
      { en: "Air Force officer", ar: "ضابط في سلاح الجو" },
    ],
    origin: {
      en: "A serving Air Force officer and the best friend of a man who builds things he should not. He is the one the military trusts, which is a job with two employers in it.",
      ar: "ضابط عامل في سلاح الجو وأقرب صديق لرجل يبني ما لا ينبغي أن يُبنى. هو من يثق به الجيش، وتلك وظيفة بربّي عمل لا واحد.",
    },
    related: [{ id: "iron-man", kind: "ally" }],
  },
  {
    id: "ant-man",
    nameEn: "Ant-Man",
    nameAr: "أنت مان",
    aliases: ["Scott Lang", "Ant-Man"],
    category: "hero",
    affiliation: ["Avengers", "Team Captain America"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Changes size", ar: "يغيّر حجمه" },
      { en: "Strength at any scale", ar: "قوة عند أي حجم" },
      { en: "Talks to ants", ar: "يتواصل مع النمل" },
    ],
    origin: {
      en: "A burglar out of prison and trying to see his daughter, who is handed a suit by the man who invented it because the alternative is worse.",
      ar: "لصّ خرج من السجن ويحاول أن يرى ابنته، يسلّمه مخترع البذلة بذلته لأن البديل أسوأ.",
    },
    related: [
      { id: "wasp", kind: "ally" },
      { id: "kang", kind: "enemy" },
    ],
  },
  {
    id: "wasp",
    nameEn: "Wasp",
    nameAr: "واسب",
    aliases: ["Hope van Dyne", "Wasp", "Hope Van Dyne"],
    category: "hero",
    affiliation: ["Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Changes size", ar: "تغيّر حجمها" },
      { en: "Flight", ar: "طيران" },
      { en: "Blaster stingers", ar: "لسعات نارية" },
    ],
    origin: {
      en: "The daughter of the two people who built the technology, better trained than anyone who has used it, and made to wait her turn for years.",
      ar: "ابنة الشخصين اللذين بنيا التقنية، أفضل تدريبًا من كل من استخدمها، وأُجبرت على انتظار دورها سنوات.",
    },
    related: [{ id: "ant-man", kind: "ally" }],
  },
  {
    id: "doctor-strange",
    nameEn: "Doctor Strange",
    nameAr: "دكتور سترينج",
    aliases: ["Stephen Strange", "Doctor Strange", "Dr. Stephen Strange"],
    category: "hero",
    affiliation: ["Avengers", "Masters of the Mystic Arts", "Midnight Sons", "Magic"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Sorcery", ar: "سحر" },
      { en: "Opens portals", ar: "يفتح البوابات" },
      { en: "Astral projection", ar: "إسقاط نجمي" },
      { en: "Manipulates time", ar: "التلاعب بالزمن" },
    ],
    origin: {
      en: "A brilliant and insufferable surgeon loses the use of his hands and spends everything he has looking for a cure. He finds a school instead.",
      ar: "جرّاح لامع لا يُحتمَل يفقد القدرة على استخدام يديه، فينفق كل ما يملك بحثًا عن علاج. فيجد مدرسة بدلًا منه.",
    },
    related: [
      { id: "wong", kind: "ally" },
      { id: "scarlet-witch", kind: "ally" },
      { id: "spider-man", kind: "ally" },
    ],
  },
  {
    id: "black-panther",
    nameEn: "Black Panther",
    nameAr: "بلاك بانثر",
    aliases: ["T'Challa", "Black Panther", "King T'Challa"],
    category: "hero",
    affiliation: ["Avengers", "Wakanda", "Team Iron Man", "Wakandan heroes"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Enhanced by the herb", ar: "معزّز بالعشبة" },
      { en: "Vibranium suit", ar: "بذلة فيبرانيوم" },
      { en: "Head of state", ar: "رئيس دولة" },
    ],
    origin: {
      en: "The heir to a country that has spent centuries pretending to be poor, who takes the throne earlier than anyone planned and has to decide what that country owes the world.",
      ar: "وريث بلد أمضى قرونًا يتظاهر بالفقر، يتولّى العرش أبكر مما خطّط أحد، وعليه أن يقرّر ما يدين به هذا البلد للعالم.",
    },
    related: [
      { id: "shuri", kind: "family" },
      { id: "killmonger", kind: "enemy" },
    ],
  },
  {
    id: "captain-marvel",
    nameEn: "Captain Marvel",
    nameAr: "كابتن مارفل",
    aliases: ["Carol Danvers", "Captain Marvel", "Vers"],
    category: "hero",
    affiliation: ["Avengers"],
    universe: ["mcu"],
    species: "Human-Kree hybrid",
    powers: [
      { en: "Energy projection", ar: "إطلاق الطاقة" },
      { en: "Flight at speed", ar: "طيران فائق السرعة" },
      { en: "Survives in space", ar: "تحيا في الفضاء" },
      { en: "Absorbs energy", ar: "امتصاص الطاقة" },
    ],
    origin: {
      en: "A test pilot caught in the blast of an engine she was trying to protect. She wakes up somewhere else entirely, with someone else's story about who she is.",
      ar: "طيّارة اختبار يبتلعها انفجار محرّك كانت تحاول حمايته. تستيقظ في مكان آخر تمامًا، ومعها رواية شخص آخر عن هويّتها.",
    },
    related: [
      { id: "nick-fury", kind: "ally" },
      { id: "ms-marvel", kind: "ally" },
    ],
  },
  {
    id: "shang-chi",
    nameEn: "Shang-Chi",
    nameAr: "شانغ تشي",
    aliases: ["Shang-Chi", "Shaun"],
    category: "hero",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Master martial artist", ar: "أستاذ فنون قتالية" },
      { en: "The Ten Rings", ar: "الحلقات العشر" },
      { en: "Chi manipulation", ar: "التحكم بطاقة التشي" },
    ],
    origin: {
      en: "Raised from childhood to be a weapon by his father, he runs away to San Francisco and parks cars for a living until the past sends someone to collect him.",
      ar: "ربّاه أبوه منذ الطفولة ليكون سلاحًا، ففرّ إلى سان فرانسيسكو وعمل في ركن السيارات، حتى أرسل الماضي من يستعيده.",
    },
    related: [{ id: "the-mandarin", kind: "family" }],
  },
  {
    id: "loki",
    nameEn: "Loki",
    nameAr: "لوكي",
    aliases: ["Loki", "Loki Laufeyson"],
    category: "antihero",
    affiliation: ["Asgard", "Revengers", "Gods", "Magic", "Loki variants"],
    universe: ["mcu"],
    species: "Frost Giant",
    powers: [
      { en: "Illusions", ar: "أوهام بصرية" },
      { en: "Shapeshifting", ar: "تغيير الهيئة" },
      { en: "Very long lifespan", ar: "عمر طويل جدًا" },
      { en: "Persuasion", ar: "إقناع" },
    ],
    origin: {
      en: "The second son of Asgard, raised beside a brother everyone preferred, who finds out late what he actually is. He is very good at lying and it has never once made him happy.",
      ar: "الابن الثاني لأسجارد، نشأ إلى جانب أخ يفضّله الجميع، ثم يكتشف متأخرًا حقيقته. بارع في الكذب، ولم يُسعده ذلك يومًا.",
    },
    related: [
      { id: "thor", kind: "family" },
      { id: "sylvie", kind: "variant" },
    ],
  },
  {
    id: "nick-fury",
    nameEn: "Nick Fury",
    nameAr: "نيك فيوري",
    aliases: ["Nick Fury", "Nicholas Fury", "Nicholas J. Fury"],
    category: "supporting",
    affiliation: ["S.H.I.E.L.D.", "Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Runs the intelligence service", ar: "يدير جهاز الاستخبارات" },
      { en: "Sees it coming", ar: "يستبق ما سيأتي" },
      { en: "Field operative", ar: "عميل ميداني" },
    ],
    origin: {
      en: "The director of an agency that keeps track of things governments would rather not know about. He assembled the team, and he did it before anyone agreed there should be one.",
      ar: "مدير وكالة تتعقّب ما تفضّل الحكومات ألّا تعرفه. هو من جمع الفريق، وفعل ذلك قبل أن يوافق أحد على وجوده أصلًا.",
    },
    related: [
      { id: "captain-marvel", kind: "ally" },
      { id: "black-widow", kind: "ally" },
    ],
  },
  {
    id: "pepper-potts",
    nameEn: "Pepper Potts",
    nameAr: "بيبر بوتس",
    aliases: ["Pepper Potts", "Virginia Potts"],
    category: "supporting",
    affiliation: ["Avengers", "Stark Industries"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Runs the company", ar: "تدير الشركة" },
      { en: "Rescue armour", ar: "بذلة الإنقاذ" },
    ],
    origin: {
      en: "The assistant who became the chief executive, and the one person willing to tell a billionaire he is wrong to his face.",
      ar: "المساعدة التي صارت الرئيسة التنفيذية، والشخص الوحيد المستعد لأن يقول لملياردير في وجهه إنه مخطئ.",
    },
    related: [{ id: "iron-man", kind: "family" }],
  },
  {
    id: "shuri",
    nameEn: "Shuri",
    nameAr: "شوري",
    aliases: ["Shuri"],
    category: "hero",
    affiliation: ["Wakanda", "Wakandan heroes"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Leading engineer", ar: "مهندسة رائدة" },
      { en: "Vibranium technology", ar: "تقنيات الفيبرانيوم" },
    ],
    origin: {
      en: "The princess who runs Wakanda's laboratories and builds most of what the throne depends on, a long way ahead of anyone else working on it.",
      ar: "الأميرة التي تدير مختبرات واكاندا وتبني معظم ما يتّكئ عليه العرش، متقدّمة كثيرًا على كل من يشتغل بالأمر.",
    },
    related: [{ id: "black-panther", kind: "family" }],
  },
  {
    id: "quicksilver",
    nameEn: "Quicksilver",
    nameAr: "كويك سيلفر",
    aliases: ["Pietro Maximoff", "Quicksilver", "Peter Maximoff"],
    category: "hero",
    affiliation: ["Avengers", "X-Men"],
    universe: ["mcu", "fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "Superhuman speed", ar: "سرعة خارقة" },
      { en: "Perceives time slowly", ar: "يرى الزمن بطيئًا" },
    ],
    origin: {
      en: "The other twin. Two studios made him at the same time under two sets of rights, which is why there are two of him and they are not the same person.",
      ar: "التوأم الآخر. صنعه استوديوان في الوقت نفسه ضمن حقوق مختلفة، ولذلك يوجد منه اثنان وليسا الشخص نفسه.",
    },
    related: [
      { id: "scarlet-witch", kind: "family" },
      { id: "magneto", kind: "family" },
    ],
  },
  {
    id: "ms-marvel",
    nameEn: "Ms. Marvel",
    nameAr: "مِس مارفل",
    aliases: ["Kamala Khan", "Ms. Marvel"],
    category: "hero",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    /* MUTANT, NOT INHUMAN, and she was neither — this record said "Human".
       The 2014 comics gave her an Inhuman origin and both canons have since
       moved: the MCU finale names it a mutation out loud, and X-Men #26
       (2023) brought her back as a mutant. No published rank, so the class
       stays null. */
    species: "Mutant",
    powers: [
      { en: "Hard light constructs", ar: "تشكيل الضوء الصلب" },
      { en: "Embiggening", ar: "تكبير الأطراف" },
    ],
    origin: {
      en: "A teenager in New Jersey who writes fan fiction about the Avengers, finds a bangle in her grandmother's things, and discovers her family has a longer story than she was told.",
      ar: "مراهقة في نيوجيرسي تكتب قصصًا عن المنتقمين، تعثر على سوار بين أغراض جدّتها، فتكتشف أن لعائلتها قصة أطول مما قيل لها.",
    },
    related: [{ id: "captain-marvel", kind: "ally" }],
  },
  {
    id: "kate-bishop",
    nameEn: "Kate Bishop",
    nameAr: "كيت بيشوب",
    aliases: ["Kate Bishop"],
    category: "hero",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Expert archer", ar: "رامية سهام بارعة" },
      { en: "Fencing and combat", ar: "مبارزة وقتال" },
    ],
    origin: {
      en: "A young archer who watched the Battle of New York from a window as a child and decided what she was going to be, then spent years getting good enough to say it out loud.",
      ar: "رامية شابة شاهدت معركة نيويورك من نافذة وهي طفلة فقرّرت ما ستكون، ثم أمضت سنوات حتى صارت بارعة بما يكفي لتقولها بصوت عالٍ.",
    },
    related: [{ id: "hawkeye", kind: "ally" }],
  },
  {
    id: "wong",
    nameEn: "Wong",
    nameAr: "وونغ",
    aliases: ["Wong"],
    category: "supporting",
    affiliation: ["Avengers", "Masters of the Mystic Arts", "Magic"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Sorcery", ar: "سحر" },
      { en: "Keeper of the library", ar: "أمين المكتبة" },
    ],
    origin: {
      en: "The librarian of Kamar-Taj, who takes the rules seriously in a building full of people who do not, and ends up running it.",
      ar: "أمين مكتبة كامار تاج، يأخذ القواعد على محمل الجد في مبنى مليء بمن لا يفعلون، فينتهي به الأمر مسؤولًا عنه.",
    },
    related: [{ id: "doctor-strange", kind: "ally" }],
  },
  {
    id: "sylvie",
    nameEn: "Sylvie",
    nameAr: "سيلفي",
    aliases: ["Sylvie", "Sylvie Laufeydottir"],
    category: "antihero",
    affiliation: ["Gods", "Magic", "Loki variants"],
    universe: ["mcu"],
    species: "Frost Giant",
    powers: [
      { en: "Enchantment", ar: "تسخير العقول" },
      { en: "Illusions", ar: "أوهام بصرية" },
      { en: "Combat training", ar: "تدريب قتالي" },
    ],
    origin: {
      en: "A variant of Loki taken as a child by an organisation that decides which lives are allowed to happen, who has spent her whole life hiding from it and planning to take it apart.",
      ar: "نسخة من لوكي أخذتها وهي طفلة منظمة تقرّر أي الحيوات يُسمح لها بالحدوث، فأمضت عمرها مختبئة منها ومخطّطة لتفكيكها.",
    },
    related: [{ id: "loki", kind: "variant" }],
  },
];

const guardians: CharacterDraft[] = [
  {
    id: "star-lord",
    nameEn: "Star-Lord",
    nameAr: "ستار لورد",
    aliases: ["Peter Quill", "Star-Lord", "Star Lord"],
    category: "hero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Human hybrid",
    powers: [
      { en: "Element blasters", ar: "مسدسات عنصرية" },
      { en: "Pilot", ar: "طيّار" },
      { en: "Rocket boots", ar: "حذاء صاروخي" },
    ],
    origin: {
      en: "Taken off Earth as a boy on the night his mother died, raised by the people sent to collect him, and left with a tape of her music and very few manners.",
      ar: "أُخذ من الأرض صبيًا ليلة وفاة أمه، وربّاه من أُرسلوا لأخذه، فلم يبقَ معه سوى شريط من موسيقاها وقليل جدًا من الأدب.",
    },
    related: [
      { id: "gamora", kind: "ally" },
      { id: "rocket", kind: "ally" },
    ],
  },
  {
    id: "gamora",
    nameEn: "Gamora",
    nameAr: "جامورا",
    aliases: ["Gamora"],
    category: "hero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Zehoberei",
    powers: [
      { en: "Deadliest woman alive", ar: "أفتك امرأة على قيد الحياة" },
      { en: "Enhanced strength", ar: "قوة معزّزة" },
      { en: "Bladework", ar: "إتقان السيف" },
    ],
    origin: {
      en: "Taken by the man who destroyed half her planet and raised as his daughter and his weapon. She has been planning to get out from under him for as long as she can remember.",
      ar: "أخذها الرجل الذي دمّر نصف كوكبها فربّاها ابنةً وسلاحًا. وهي تخطّط للخلاص منه منذ ما تستطيع تذكّره.",
    },
    related: [
      { id: "nebula", kind: "family" },
      { id: "thanos", kind: "family" },
      { id: "star-lord", kind: "ally" },
    ],
  },
  {
    id: "rocket",
    nameEn: "Rocket",
    nameAr: "روكيت",
    aliases: ["Rocket", "Rocket Raccoon"],
    category: "hero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Uplifted raccoon",
    powers: [
      { en: "Weapons engineer", ar: "مهندس أسلحة" },
      { en: "Tactician", ar: "مخطّط تكتيكي" },
      { en: "Marksmanship", ar: "براعة في الرماية" },
    ],
    origin: {
      en: "The result of experiments nobody asked for, on an animal that could not consent. He is the smartest one in the room and he would rather you did not ask how he got that way.",
      ar: "نتيجة تجارب لم يطلبها أحد على حيوان لا يملك أن يوافق. هو الأذكى في الغرفة، ويفضّل ألّا تسأله كيف صار كذلك.",
    },
    related: [{ id: "groot", kind: "family" }],
  },
  {
    id: "groot",
    nameEn: "Groot",
    nameAr: "جروت",
    aliases: ["Groot"],
    category: "hero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Flora colossus",
    powers: [
      { en: "Grows and reshapes", ar: "ينمو ويعيد تشكيل نفسه" },
      { en: "Regenerates", ar: "يتجدّد" },
      { en: "Great strength", ar: "قوة هائلة" },
    ],
    origin: {
      en: "A tree that walks, with a vocabulary of three words and a friend who understands all of them.",
      ar: "شجرة تمشي، بحصيلة لغوية من ثلاث كلمات، وصديق يفهمها كلها.",
    },
    related: [{ id: "rocket", kind: "family" }],
  },
  {
    id: "drax",
    nameEn: "Drax",
    nameAr: "دراكس",
    aliases: ["Drax", "Drax the Destroyer"],
    category: "hero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Kylosian",
    powers: [
      { en: "Great durability", ar: "متانة كبيرة" },
      { en: "Great strength", ar: "قوة هائلة" },
      { en: "Takes everything literally", ar: "يأخذ كل شيء حرفيًا" },
    ],
    origin: {
      en: "A man whose family was taken from him, who went looking for the person responsible and never learned to talk about anything else.",
      ar: "رجل سُلبت منه عائلته، فمضى يبحث عن المسؤول ولم يتعلّم قط أن يتحدث عن شيء سواه.",
    },
    related: [{ id: "thanos", kind: "enemy" }],
  },
  {
    id: "nebula",
    nameEn: "Nebula",
    nameAr: "نيبيولا",
    aliases: ["Nebula"],
    category: "antihero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Luphomoid",
    powers: [
      { en: "Cybernetic body", ar: "جسد آلي" },
      { en: "Enhanced strength", ar: "قوة معزّزة" },
      { en: "Combat training", ar: "تدريب قتالي" },
    ],
    origin: {
      en: "The other daughter, rebuilt piece by piece every time she lost to her sister, by the man who made them both compete.",
      ar: "الابنة الأخرى، أُعيد بناؤها قطعةً قطعة كلما خسرت أمام أختها، على يد الرجل الذي جعلهما تتنافسان.",
    },
    related: [
      { id: "gamora", kind: "family" },
      { id: "thanos", kind: "family" },
    ],
  },
];


const xmen: CharacterDraft[] = [
  {
    id: "wolverine",
    nameEn: "Wolverine",
    nameAr: "وولفرين",
    aliases: ["Logan", "Wolverine", "James Howlett", "Weapon X", "Logan / Wolverine"],
    category: "antihero",
    affiliation: ["X-Men", "Midnight Sons"],
    universe: ["fox", "mcu"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Heals from anything", ar: "يشفى من كل شيء" },
      { en: "Adamantium claws", ar: "مخالب من الأدامانتيوم" },
      { en: "Enhanced senses", ar: "حواس معزّزة" },
      { en: "Barely ages", ar: "لا يشيخ تقريبًا" },
    ],
    origin: {
      en: "A man who heals from anything and remembers almost none of it, walking out of a Canadian forest with a century behind him and no account of it. What was done to his skeleton was done by people who wanted a weapon.",
      ar: "رجل يشفى من كل شيء ولا يذكر منه شيئًا تقريبًا، يخرج من غابة كندية وخلفه قرن كامل بلا رواية. ما فُعل بهيكله العظمي فعله من أرادوا سلاحًا.",
    },
    related: [
      { id: "professor-x", kind: "ally" },
      { id: "sabretooth", kind: "enemy" },
      { id: "deadpool", kind: "ally" },
      { id: "jean-grey", kind: "ally" },
    ],
  },
  {
    id: "professor-x",
    nameEn: "Professor X",
    nameAr: "بروفيسور إكس",
    aliases: ["Charles Xavier", "Professor X", "Professor Charles Xavier"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox", "mcu"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "The strongest telepath", ar: "أقوى قارئ للأفكار" },
      { en: "Mind control", ar: "التحكم بالعقول" },
      { en: "Cerebro", ar: "سيريبرو" },
    ],
    origin: {
      en: "A telepath who opened a school so that children like him would have somewhere to go. He is not on Marvel's published list of Omega-level mutants, which is a strange omission on a list he is written as having compiled.",
      ar: "قارئ أفكار افتتح مدرسة ليجد أطفال مثله مكانًا يقصدونه. ولا يرد اسمه في قائمة مارفل المنشورة لمتحوّلي المستوى أوميغا، وهو غياب غريب عن قائمة كُتب أنه هو من أعدّها.",
    },
    /**
     * "XAVIER" NAMES TWO PEOPLE, so the alias had to go and these had to be
     * stated. X-Men (2000) credits Patrick Stewart as plain "Xavier" and the
     * 1994 cartoon credits Cedric Smith the same way — but so does Ironheart,
     * for Riri's friend Xavier Jones, who is not a telepath. One string, two
     * characters: no matcher can split that, the way none can split three
     * Peter Parkers. Two right beats two right and one wrong.
     */
    alsoIn: ["x-men", "spider-man-1994"],
    related: [
      { id: "magneto", kind: "ally" },
      { id: "wolverine", kind: "ally" },
      { id: "jean-grey", kind: "ally" },
    ],
  },
  {
    id: "magneto",
    nameEn: "Magneto",
    nameAr: "ماغنيتو",
    aliases: ["Erik Lehnsherr", "Magneto", "Max Eisenhardt"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      { en: "Controls magnetism", ar: "يتحكم بالمغناطيسية" },
      { en: "Moves metal at any scale", ar: "يحرّك المعادن بأي حجم" },
      { en: "Magnetic flight", ar: "طيران مغناطيسي" },
    ],
    origin: {
      en: "A survivor of the camps who came out of them certain of one thing: that a people who are hunted should never again be unarmed. He and the man who runs the school agree about everything except what to do next.",
      ar: "ناجٍ من المعسكرات خرج منها على يقين من أمر واحد: ألّا يُترك المطارَدون عُزّلًا مرة أخرى. هو ومدير المدرسة متفقان على كل شيء إلا على ما يجب فعله بعد ذلك.",
    },
    related: [
      { id: "professor-x", kind: "ally" },
      { id: "mystique", kind: "ally" },
      /**
       * BOTH twins, and Polaris. Quicksilver was recorded and Wanda was not,
       * which is one relationship written from one side only — exactly the
       * asymmetry a typed edge is supposed to prevent.
       */
      { id: "quicksilver", kind: "family" },
      { id: "scarlet-witch", kind: "family" },
      { id: "polaris", kind: "family" },
    ],
  },
  {
    id: "jean-grey",
    nameEn: "Jean Grey",
    nameAr: "جين غراي",
    /* Bare given names removed. Each one matched a stranger: "Jean (Pub)" in
       Morbius, "Gwen" in Days of Future Past, "Eddie" in The Punisher and
       Agatha All Along. The slash forms ("Gwen Stacy", "Eddie Brock") keep
       every real appearance. */
    aliases: ["Jean Grey", "Phoenix"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      { en: "Telepathy", ar: "قراءة الأفكار" },
      { en: "Telekinesis", ar: "تحريك الأشياء بالعقل" },
      { en: "No known upper limit", ar: "بلا حدّ أعلى معروف" },
    ],
    origin: {
      en: "The most powerful telepath the school ever taught, and the one its headmaster put walls inside as a child because what she could do frightened him.",
      ar: "أقوى قارئة أفكار درّستها المدرسة، والوحيدة التي بنى مديرها جدرانًا داخل عقلها وهي طفلة لأن ما تقدر عليه أفزعه.",
    },
    related: [
      { id: "phoenix", kind: "host" },
      { id: "cyclops", kind: "family" },
      { id: "wolverine", kind: "ally" },
      { id: "professor-x", kind: "ally" },
    ],
  },
  {
    id: "storm",
    nameEn: "Storm",
    nameAr: "ستورم",
    aliases: ["Storm", "Ororo Munroe"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      { en: "Controls the weather", ar: "تتحكم بالطقس" },
      { en: "Flight", ar: "طيران" },
      { en: "Lightning", ar: "برق" },
    ],
    origin: {
      en: "Orphaned in Cairo and worshipped as a goddess in Kenya before she was old enough to argue about it. She can change the weather over a continent and is on Marvel's published Omega list.",
      ar: "تيتّمت في القاهرة وعُبدت إلهةً في كينيا قبل أن تبلغ سنًّا تجادل فيها. تستطيع تغيير الطقس فوق قارة كاملة، واسمها في قائمة أوميغا التي نشرتها مارفل.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "cyclops",
    nameEn: "Cyclops",
    nameAr: "سايكلوبس",
    aliases: ["Cyclops", "Scott Summers"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "Optic blasts", ar: "أشعة من عينيه" },
      { en: "Field leader", ar: "قائد ميداني" },
    ],
    origin: {
      en: "A boy whose eyes stopped being safe to open, who has worn a visor since and leads the team on the field because someone has to and he is the one who will.",
      ar: "فتى لم يعد فتح عينيه آمنًا، فارتدى واقيًا منذ ذلك الحين، ويقود الفريق ميدانيًا لأن أحدًا لا بد أن يفعل، وهو من سيفعل.",
    },
    related: [{ id: "jean-grey", kind: "family" }],
  },
  {
    id: "mystique",
    nameEn: "Mystique",
    nameAr: "ميستيك",
    aliases: ["Mystique", "Raven", "Raven Darkholme"],
    category: "antihero",
    affiliation: ["Brotherhood", "X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Becomes anyone", ar: "تصير أي أحد" },
      { en: "Ages very slowly", ar: "تشيخ ببطء شديد" },
      { en: "Combat training", ar: "تدريب قتالي" },
    ],
    origin: {
      en: "She can look like anyone, and spent a childhood being told that was useful rather than that she was fine as she was. Which side she is on depends on who last asked her that question.",
      ar: "تستطيع أن تبدو أي أحد، وقضت طفولتها وهي تُخبَر أن ذلك مفيد، لا أنها على ما يرام كما هي. وأي جانب تقف معه يتوقف على آخر من سألها.",
    },
    related: [
      { id: "magneto", kind: "ally" },
      { id: "professor-x", kind: "ally" },
    ],
  },
  {
    id: "beast",
    nameEn: "Beast",
    nameAr: "بيست",
    aliases: ["Beast", "Hank McCoy", "Henry McCoy"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Great strength and agility", ar: "قوة ورشاقة كبيرتان" },
      { en: "Brilliant scientist", ar: "عالِم لامع" },
    ],
    origin: {
      en: "A scientist who spent years trying to cure the part of himself that shows, and then stopped.",
      ar: "عالِم أمضى سنوات يحاول علاج الجزء الظاهر من نفسه، ثم توقّف.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "rogue",
    nameEn: "Rogue",
    nameAr: "روغ",
    aliases: ["Rogue", "Marie", "Anna Marie"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Absorbs on touch", ar: "تمتص باللمس" },
      { en: "Borrows other powers", ar: "تستعير قدرات غيرها" },
    ],
    origin: {
      en: "A girl who found out what her power was by kissing someone. She cannot touch anyone without taking something from them, and she has to live in a body that does that.",
      ar: "فتاة عرفت ما قدرتها حين قبّلت أحدهم. لا تستطيع لمس أحد دون أن تأخذ منه شيئًا، وعليها أن تعيش في جسد يفعل ذلك.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "nightcrawler",
    nameEn: "Nightcrawler",
    nameAr: "نايت كرولر",
    aliases: ["Nightcrawler", "Kurt Wagner"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Teleportation", ar: "انتقال آني" },
      { en: "Acrobatics", ar: "براعة بهلوانية" },
      { en: "Prehensile tail", ar: "ذيل قابض" },
    ],
    origin: {
      en: "A devout circus performer who can be somewhere else before you finish looking at him, and who has never once been able to pass unnoticed.",
      ar: "بهلوان سيرك متديّن يستطيع أن يكون في مكان آخر قبل أن تُتِمّ النظر إليه، ولم يستطع قط أن يمرّ دون أن يُلاحَظ.",
    },
    related: [{ id: "mystique", kind: "family" }],
  },
  {
    id: "iceman",
    nameEn: "Iceman",
    nameAr: "آيسمان",
    aliases: ["Iceman", "Bobby Drake"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      { en: "Becomes ice", ar: "يتحوّل إلى جليد" },
      { en: "Freezes anything", ar: "يجمّد أي شيء" },
      { en: "Ice constructs", ar: "تشكيلات جليدية" },
    ],
    origin: {
      en: "One of the first students, usually written as the funny one, and on Marvel's published Omega list. He can freeze moisture out of the air faster than anyone can move through it.",
      ar: "أحد أوائل الطلاب، يُكتب عادةً بوصفه المرح، واسمه في قائمة أوميغا التي نشرتها مارفل. يجمّد رطوبة الهواء أسرع مما يستطيع أحد أن يتحرك خلاله.",
    },
    related: [{ id: "rogue", kind: "ally" }],
  },
  {
    id: "deadpool",
    nameEn: "Deadpool",
    nameAr: "ديدبول",
    aliases: ["Deadpool", "Wade Wilson"],
    category: "antihero",
    affiliation: ["X-Force"],
    universe: ["fox", "mcu"],
    species: "Mutate",
    powers: [
      { en: "Heals from anything", ar: "يشفى من كل شيء" },
      { en: "Cannot be killed", ar: "لا يُقتَل" },
      { en: "Talks to the audience", ar: "يخاطب الجمهور" },
      { en: "Expert with blades", ar: "بارع بالسيوف" },
    ],
    origin: {
      en: "A mercenary with a terminal diagnosis who signs up for a programme that promises a cure and delivers something else. He cannot die, he knows he is in a film, and neither of those makes him easier to work with.",
      ar: "مرتزق حُكم عليه بمرض قاتل، فيوقّع على برنامج يعده بعلاج ويمنحه شيئًا آخر. لا يموت، ويعرف أنه في فيلم، ولا شيء من ذلك يجعل التعامل معه أسهل.",
    },
    related: [
      { id: "wolverine", kind: "ally" },
      { id: "colossus", kind: "ally" },
    ],
  },
  {
    id: "colossus",
    nameEn: "Colossus",
    nameAr: "كولوسوس",
    aliases: ["Colossus", "Piotr Rasputin"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Organic steel skin", ar: "جلد فولاذي عضوي" },
      { en: "Great strength", ar: "قوة هائلة" },
    ],
    origin: {
      en: "A Russian farm boy who turns into steel, and one of the very few people in these films who has never once wanted to hurt anybody.",
      ar: "فتى مزرعة روسي يتحوّل إلى فولاذ، وأحد قلائل جدًا في هذه الأفلام لم يرغب يومًا في إيذاء أحد.",
    },
    related: [{ id: "deadpool", kind: "ally" }],
  },
  {
    id: "sabretooth",
    nameEn: "Sabretooth",
    nameAr: "سيبرتوث",
    aliases: ["Sabretooth", "Victor Creed"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Regeneration", ar: "تجدّد" },
      { en: "Claws and fangs", ar: "مخالب وأنياب" },
      { en: "Enhanced senses", ar: "حواس معزّزة" },
    ],
    origin: {
      en: "The other one who heals, who kept every memory his brother lost and enjoyed most of them.",
      ar: "الآخر الذي يشفى، احتفظ بكل ذكرى فقدها أخوه، واستمتع بمعظمها.",
    },
    related: [{ id: "wolverine", kind: "enemy" }],
  },
];

const spiderVerse: CharacterDraft[] = [
  {
    id: "spider-man",
    nameEn: "Spider-Man",
    nameAr: "سبايدر مان",
    aliases: ["Peter Parker", "Spider-Man", "Spiderman", "Peter Parker / Spider-Man"],
    category: "hero",
    affiliation: ["Avengers", "Team Iron Man", "Spider-Society"],
    universe: ["mcu", "sony"],
    species: "Human mutate",
    powers: [
      { en: "Wall-crawling", ar: "التسلّق على الجدران" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
      { en: "Proportionate strength", ar: "قوة متناسبة" },
      { en: "Web-shooters", ar: "قاذفات الشباك" },
    ],
    origin: {
      en: "A teenager bitten by a spider that should not have been in that room, who learns in the worst possible way what it costs to do nothing. Three actors have played him and they are all Peter Parker.",
      ar: "مراهق لدغه عنكبوت ما كان ينبغي أن يكون في تلك الغرفة، فيتعلّم بأسوأ طريقة ممكنة ثمن ألّا يفعل شيئًا. أدّاه ثلاثة ممثلين، وكلهم بيتر باركر.",
    },
    related: [
      /* Brand New Day puts them in the same film. Authored on the base, so
         the crossover rule hands it to Tom's Peter — whose solo film it is —
         and to neither of the other two, who are not in it. */
      { id: "punisher", kind: "ally" },
      { id: "green-goblin", kind: "enemy" },
      { id: "doctor-octopus", kind: "enemy" },
      { id: "iron-man", kind: "ally" },
      { id: "miles-morales", kind: "variant" },
      /* VARIANT at the top level, because one record carries both Gwen Stacy
         and Spider-Gwen, and Spider-Gwen genuinely is an alternate Spider. The
         exception is Andrew's Peter, where she is the woman he loses — and
         that is written on HIS record, where it is true, rather than here,
         where it would be wrong for the other two. */
      { id: "gwen-stacy", kind: "variant" },
      { id: "thanos", kind: "enemy" },
      { id: "tombstone", kind: "enemy" },
      { id: "venom", kind: "enemy" },
    ],
  },
  {
    id: "miles-morales",
    nameEn: "Miles Morales",
    nameAr: "مايلز موراليس",
    aliases: ["Miles Morales", "Miles"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Turns invisible", ar: "يصير خفيًا" },
      { en: "Venom strike", ar: "لسعة كهربائية" },
      { en: "Wall-crawling", ar: "التسلّق على الجدران" },
    ],
    origin: {
      en: "A Brooklyn teenager at a school he did not want to go to, bitten by a spider from somewhere else, who finds out he is one of many and has to decide to be his own.",
      ar: "مراهق من بروكلين في مدرسة لم يرد الالتحاق بها، يلدغه عنكبوت من مكان آخر، فيكتشف أنه واحد من كثيرين وعليه أن يقرّر أن يكون نفسه.",
    },
    related: [
      { id: "spider-man", kind: "variant" },
      { id: "gwen-stacy", kind: "ally" },
    ],
  },
  {
    id: "gwen-stacy",
    nameEn: "Gwen Stacy",
    nameAr: "غوين ستايسي",
    aliases: ["Gwen Stacy", "Spider-Gwen"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Wall-crawling", ar: "التسلّق على الجدران" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
      { en: "Drummer", ar: "عازفة طبول" },
    ],
    origin: {
      en: "The Spider-Woman of her own universe, in a city where her father is the police captain looking for her.",
      ar: "المرأة العنكبوت في كونها هي، في مدينة أبوها فيها ضابط الشرطة الذي يبحث عنها.",
    },
    related: [
      { id: "miles-morales", kind: "ally" },
      { id: "spider-man", kind: "variant" },
    ],
  },
  {
    id: "venom",
    nameEn: "Venom",
    nameAr: "فينوم",
    aliases: ["Venom", "Eddie Brock"],
    category: "antihero",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "lineage",
    powers: [
      { en: "Symbiote strength", ar: "قوة السيمبيوت" },
      { en: "Shapeshifting mass", ar: "كتلة متغيّرة الشكل" },
      { en: "Regeneration", ar: "تجدّد" },
    ],
    origin: {
      en: "A journalist who lost his job chasing a story, and a creature from somewhere else that needed a body. They share one now and neither is in charge.",
      ar: "صحفي فقد وظيفته وهو يطارد قصة، ومخلوق من مكان آخر يحتاج جسدًا. صارا يتقاسمان جسدًا واحدًا ولا أحد منهما هو المسؤول.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
      { id: "carnage", kind: "enemy" },
    ],
  },
  {
    id: "green-goblin",
    nameEn: "Green Goblin",
    nameAr: "الغرين غوبلن",
    aliases: ["Green Goblin", "Norman Osborn"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Enhanced strength", ar: "قوة معزّزة" },
      { en: "Glider", ar: "لوح طائر" },
      { en: "Pumpkin bombs", ar: "قنابل اليقطين" },
    ],
    origin: {
      en: "An industrialist who tested his own company's serum on himself rather than lose the contract, and did not come back alone.",
      ar: "صناعي جرّب مصل شركته على نفسه بدل أن يخسر العقد، فلم يعد وحده.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "doctor-octopus",
    nameEn: "Doctor Octopus",
    nameAr: "دكتور أوكتوبوس",
    aliases: ["Doctor Octopus", "Otto Octavius", "Doc Ock", "Dr. Otto Octavius"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "mcu"],
    species: "Human",
    powers: [
      { en: "Four mechanical arms", ar: "أربع أذرع آلية" },
      { en: "Brilliant physicist", ar: "فيزيائي لامع" },
    ],
    origin: {
      en: "A fusion scientist whose harness was built to obey him and stopped, on the day the experiment it was designed for went wrong.",
      ar: "عالِم اندماج نووي بُني حزامه ليطيعه فتوقّف عن ذلك، يوم أخفقت التجربة التي صُمّم لأجلها.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "electro",
    nameEn: "Electro",
    nameAr: "إلكترو",
    aliases: ["Electro", "Max Dillon", "Max Dillon / Electro"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Becomes electricity", ar: "يصير كهرباء" },
      { en: "Travels through the grid", ar: "ينتقل عبر الشبكة" },
    ],
    origin: {
      en: "An engineer nobody at his company could name, who fell into something live and came out able to power a city or take it down.",
      ar: "مهندس لم يكن أحد في شركته يعرف اسمه، سقط في تيار حيّ فخرج قادرًا على تغذية مدينة بالكهرباء أو إطفائها.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "sandman",
    nameEn: "Sandman",
    nameAr: "ساندمان",
    aliases: ["Sandman", "Flint Marko"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Becomes sand", ar: "يتحوّل إلى رمل" },
      { en: "Reforms after any hit", ar: "يعيد تشكّله بعد أي ضربة" },
    ],
    origin: {
      en: "A thief on the run who hid in the wrong test site, and who has been trying to pay for his daughter's treatment ever since.",
      ar: "لصّ هارب اختبأ في موقع اختبار خطأ، وظلّ منذ ذلك الحين يحاول دفع تكاليف علاج ابنته.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "lizard",
    nameEn: "The Lizard",
    nameAr: "السحلية",
    aliases: ["The Lizard", "Curt Connors", "Dr. Curt Connors", "Lizard"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Reptilian strength", ar: "قوة زاحفة" },
      { en: "Regrows limbs", ar: "تنمو أطرافه من جديد" },
    ],
    origin: {
      en: "A one-armed geneticist trying to make limbs grow back, who tested the answer on himself and got more of it than he asked for.",
      ar: "عالِم وراثة بذراع واحدة يحاول أن يجعل الأطراف تنمو من جديد، فجرّب الحل على نفسه فناله منه أكثر مما طلب.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "carnage",
    nameEn: "Carnage",
    nameAr: "كارنيج",
    aliases: ["Carnage", "Cletus Kasady"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "lineage",
    powers: [
      { en: "Symbiote strength", ar: "قوة السيمبيوت" },
      { en: "Blade constructs", ar: "أنصال متشكّلة" },
      { en: "Regeneration", ar: "تجدّد" },
    ],
    origin: {
      en: "A killer on death row who got hold of a second symbiote, one with none of the reservations the first one had.",
      ar: "قاتل محكوم بالإعدام وقع في يده سيمبيوت ثانٍ، بلا أيٍّ من تحفّظات الأول.",
    },
    related: [{ id: "venom", kind: "enemy" }],
  },
  {
    id: "kraven",
    nameEn: "Kraven the Hunter",
    nameAr: "كرايفن الصياد",
    aliases: ["Kraven", "Sergei Kravinoff", "Kraven the Hunter"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Enhanced senses", ar: "حواس معزّزة" },
      { en: "Master tracker", ar: "متعقّب بارع" },
      { en: "Enhanced strength", ar: "قوة معزّزة" },
    ],
    origin: {
      en: "The son of a Russian crime family who went to Africa to hunt and came back believing he was the last real predator left.",
      ar: "ابن عائلة إجرام روسية ذهب إلى أفريقيا للصيد، وعاد مؤمنًا بأنه آخر مفترس حقيقي باقٍ.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "morbius",
    nameEn: "Morbius",
    nameAr: "موربيوس",
    aliases: ["Morbius", "Michael Morbius", "Dr. Michael Morbius"],
    category: "antihero",
    affiliation: ["Midnight Sons"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Enhanced strength", ar: "قوة معزّزة" },
      { en: "Echolocation", ar: "تحديد الموقع بالصدى" },
      { en: "Flight", ar: "طيران" },
    ],
    origin: {
      en: "A Nobel-winning haematologist with a fatal blood disorder, who tried to cure it with something taken from bats.",
      ar: "عالِم دم حائز على نوبل مصاب باعتلال دموي قاتل، حاول علاجه بشيء مأخوذ من الخفافيش.",
    },
    related: [],
  },
];

const defenders: CharacterDraft[] = [
  {
    id: "daredevil",
    nameEn: "Daredevil",
    nameAr: "ديرديفل",
    aliases: ["Daredevil", "Matt Murdock", "Matthew Murdock"],
    category: "hero",
    affiliation: ["Defenders"],
    universe: ["defenders", "mcu", "legacy"],
    species: "Human",
    powers: [
      { en: "Radar sense", ar: "حاسة رادارية" },
      { en: "Heightened hearing", ar: "سمع فائق" },
      { en: "Trained fighter", ar: "مقاتل مدرَّب" },
      { en: "Defence lawyer", ar: "محامي دفاع" },
    ],
    origin: {
      en: "Blinded as a boy by the chemicals that sharpened everything else. He is a defence lawyer in Hell's Kitchen by day and, at night, the reason the neighbourhood is worth less to the people buying it.",
      ar: "أعمته وهو صبي مواد كيميائية شحذت كل حواسه الأخرى. محامي دفاع في هيلز كيتشن نهارًا، وليلًا هو سبب انخفاض قيمة الحي في نظر من يشترونه.",
    },
    related: [
      { id: "kingpin", kind: "enemy" },
      { id: "elektra", kind: "family" },
      { id: "punisher", kind: "ally" },
    ],
  },
  {
    id: "jessica-jones",
    nameEn: "Jessica Jones",
    nameAr: "جيسيكا جونز",
    aliases: ["Jessica Jones", "Jessica"],
    category: "antihero",
    affiliation: ["Defenders"],
    universe: ["defenders"],
    species: "Enhanced human",
    powers: [
      { en: "Enhanced strength", ar: "قوة معزّزة" },
      { en: "Some flight", ar: "قدرة محدودة على الطيران" },
      { en: "Private investigator", ar: "محققة خاصة" },
    ],
    origin: {
      en: "A private investigator who is strong enough to stop a car and would rather be left alone. What happened to her happened to her mind, and the series is honest about it.",
      ar: "محققة خاصة تكفي قوتها لإيقاف سيارة، وتفضّل أن يتركها الناس وشأنها. ما جرى لها جرى لعقلها، والمسلسل صادق في ذلك.",
    },
    related: [{ id: "luke-cage", kind: "ally" }],
  },
  {
    id: "luke-cage",
    nameEn: "Luke Cage",
    nameAr: "لوك كيج",
    aliases: ["Luke Cage", "Carl Lucas"],
    category: "hero",
    affiliation: ["Defenders"],
    universe: ["defenders"],
    species: "Enhanced human",
    powers: [
      { en: "Unbreakable skin", ar: "جلد لا يُخترق" },
      { en: "Great strength", ar: "قوة هائلة" },
    ],
    origin: {
      en: "A man convicted of something he did not do, who came out of a prison experiment with skin nothing gets through, and went to Harlem to be left alone.",
      ar: "رجل أُدين بما لم يفعله، خرج من تجربة في السجن بجلد لا يخترقه شيء، ومضى إلى هارلم ليُترك وشأنه.",
    },
    related: [{ id: "jessica-jones", kind: "ally" }],
  },
  {
    id: "iron-fist",
    nameEn: "Iron Fist",
    nameAr: "آيرون فيست",
    aliases: ["Iron Fist", "Danny Rand", "Danny"],
    category: "hero",
    affiliation: ["Defenders"],
    universe: ["defenders"],
    species: "Human",
    powers: [
      { en: "The chi-charged fist", ar: "القبضة المشحونة بالتشي" },
      { en: "Martial arts master", ar: "أستاذ فنون قتالية" },
    ],
    origin: {
      en: "The heir to a fortune, presumed dead in a plane crash as a child, who comes back fifteen years later with a title from a city nobody believes exists.",
      ar: "وريث ثروة، حُسب ميتًا في حادث طائرة وهو طفل، ثم عاد بعد خمسة عشر عامًا يحمل لقبًا من مدينة لا يصدّق أحد أنها موجودة.",
    },
    related: [{ id: "luke-cage", kind: "ally" }],
  },
  {
    id: "punisher",
    nameEn: "The Punisher",
    nameAr: "المعاقب",
    aliases: ["The Punisher", "Frank Castle", "Punisher", "Castle"],
    category: "antihero",
    affiliation: ["Defenders", "Midnight Sons"],
    universe: ["defenders", "legacy", "mcu"],
    species: "Human",
    powers: [
      { en: "Marine training", ar: "تدريب المارينز" },
      { en: "Heavy weapons", ar: "أسلحة ثقيلة" },
      { en: "Will not stop", ar: "لا يتوقف" },
    ],
    origin: {
      en: "A marine who came home and lost his family in a park, and has been finishing the sentence ever since. He has no powers and he is the most frightening person in the room.",
      ar: "جندي مارينز عاد إلى بلده ففقد عائلته في حديقة، وما زال يُتِمّ الجملة منذ ذلك الحين. لا قدرات لديه، وهو أكثر من في الغرفة إثارةً للخوف.",
    },
    related: [{ id: "daredevil", kind: "ally" }],
  },
  {
    id: "elektra",
    nameEn: "Elektra",
    nameAr: "إلكترا",
    aliases: ["Elektra", "Elektra Natchios"],
    category: "antihero",
    affiliation: ["The Hand"],
    universe: ["defenders", "legacy"],
    species: "Human",
    powers: [
      { en: "Assassin training", ar: "تدريب اغتيال" },
      { en: "The sai", ar: "خنجرا الساي" },
    ],
    origin: {
      en: "A law student and the daughter of a diplomat, trained by people who found her before anyone else did, and very hard to keep on one side of anything.",
      ar: "طالبة قانون وابنة دبلوماسي، درّبها من وجدوها قبل غيرهم، ويصعب جدًا إبقاؤها في جانب واحد من أي شيء.",
    },
    related: [{ id: "daredevil", kind: "family" }],
  },
  {
    id: "kingpin",
    nameEn: "Kingpin",
    nameAr: "كينغ بن",
    aliases: ["Kingpin", "Wilson Fisk", "Fisk"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "defenders", "mcu"],
    species: "Human",
    powers: [
      { en: "Enormous physical strength", ar: "قوة بدنية هائلة" },
      { en: "Owns the city", ar: "يملك المدينة" },
      { en: "Ruthless negotiator", ar: "مفاوض بلا رحمة" },
    ],
    origin: {
      en: "A man who believes he loves the city and is saving it, and who will do anything at all to be the one who does. He is the size of a door and that is the least of it.",
      ar: "رجل يظن أنه يحب المدينة وأنه ينقذها، ومستعد لكل شيء ليكون هو المنقذ. بحجم الباب، وذلك أهون ما فيه.",
    },
    related: [
      { id: "daredevil", kind: "enemy" },
      { id: "echo", kind: "family" },
    ],
  },
  {
    id: "echo",
    nameEn: "Echo",
    nameAr: "إيكو",
    aliases: ["Echo", "Maya Lopez", "Maya"],
    category: "antihero",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Copies any movement", ar: "تحاكي أي حركة" },
      { en: "Trained fighter", ar: "مقاتلة مدرَّبة" },
    ],
    origin: {
      en: "A deaf Choctaw woman who can reproduce any physical movement she has seen once, raised by the man who runs New York's crime and going home to get away from him.",
      ar: "امرأة صمّاء من قبيلة تشوكتو تستطيع تكرار أي حركة رأتها مرة واحدة، ربّاها من يدير إجرام نيويورك، وتعود إلى ديارها هربًا منه.",
    },
    related: [{ id: "kingpin", kind: "family" }],
  },
];

const fantasticFour: CharacterDraft[] = [
  {
    id: "mister-fantastic",
    nameEn: "Mister Fantastic",
    nameAr: "مستر فانتاستيك",
    aliases: ["Mister Fantastic", "Reed Richards", "Mr. Fantastic"],
    category: "hero",
    affiliation: ["Fantastic Four"],
    universe: ["fox", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Stretches indefinitely", ar: "يتمدّد بلا حدّ" },
      { en: "The smartest man alive", ar: "أذكى رجل على قيد الحياة" },
    ],
    origin: {
      en: "The scientist who took three people he loved into space on a ship he built, and brought them back changed.",
      ar: "العالِم الذي أخذ ثلاثة يحبهم إلى الفضاء على متن مركبة بناها، فأعادهم وقد تغيّروا.",
    },
    related: [
      { id: "invisible-woman", kind: "family" },
      { id: "doctor-doom", kind: "enemy" },
    ],
  },
  {
    id: "invisible-woman",
    nameEn: "Invisible Woman",
    nameAr: "المرأة الخفية",
    aliases: ["Invisible Woman", "Sue Storm", "Susan Storm"],
    category: "hero",
    affiliation: ["Fantastic Four"],
    universe: ["fox", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Invisibility", ar: "الاختفاء" },
      { en: "Force fields", ar: "حقول طاقة" },
    ],
    origin: {
      en: "The one holding the team together, and by a distance the most powerful of the four once anyone stops to measure it.",
      ar: "من تمسك الفريق معًا، وأقوى الأربعة بفارق كبير متى توقّف أحد ليقيس فعلًا.",
    },
    related: [
      { id: "mister-fantastic", kind: "family" },
      { id: "human-torch", kind: "family" },
    ],
  },
  {
    id: "human-torch",
    nameEn: "Human Torch",
    nameAr: "الشعلة البشرية",
    aliases: ["Human Torch", "Johnny Storm"],
    category: "hero",
    affiliation: ["Fantastic Four"],
    universe: ["fox", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Bursts into flame", ar: "يشتعل" },
      { en: "Flight", ar: "طيران" },
      { en: "Heat control", ar: "التحكم بالحرارة" },
    ],
    origin: {
      en: "The youngest of the four, who enjoyed what happened to him more than the others did and never pretended otherwise.",
      ar: "أصغر الأربعة، استمتع بما حدث له أكثر من الباقين، ولم يتظاهر بغير ذلك قط.",
    },
    related: [{ id: "invisible-woman", kind: "family" }],
  },
  {
    id: "the-thing",
    nameEn: "The Thing",
    nameAr: "الشيء",
    aliases: ["The Thing", "Ben Grimm", "Benjamin Grimm"],
    category: "hero",
    affiliation: ["Fantastic Four"],
    universe: ["fox", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Rock body", ar: "جسد صخري" },
      { en: "Enormous strength", ar: "قوة هائلة" },
    ],
    origin: {
      en: "The pilot, and the only one of the four who cannot switch it off and go outside looking like himself.",
      ar: "الطيّار، والوحيد بين الأربعة الذي لا يستطيع أن يوقف ما به ويخرج بهيئته هو.",
    },
    related: [{ id: "mister-fantastic", kind: "ally" }],
  },
  {
    id: "doctor-doom",
    nameEn: "Doctor Doom",
    nameAr: "دكتور دووم",
    aliases: ["Doctor Doom", "Victor Von Doom", "Doom", "Victor Domashev"],
    category: "villain",
    affiliation: [],
    universe: ["fox", "mcu"],
    species: "Human",
    powers: [
      { en: "Sorcery and science", ar: "سحر وعِلم" },
      { en: "Powered armour", ar: "بذلة مدرّعة" },
      { en: "Head of state", ar: "رئيس دولة" },
    ],
    origin: {
      en: "A monarch, a scientist and a sorcerer, who is convinced the world would be better run by him and has a good deal of evidence.",
      ar: "ملك وعالِم وساحر، مقتنع بأن العالم سيُدار على نحو أفضل بين يديه، ولديه من الأدلة الكثير.",
    },
    related: [{ id: "mister-fantastic", kind: "enemy" }],
  },
  {
    id: "silver-surfer",
    nameEn: "Silver Surfer",
    nameAr: "السيلفر سيرفر",
    aliases: ["Silver Surfer", "Norrin Radd"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Zenn-Lavian",
    powers: [
      { en: "The Power Cosmic", ar: "القوة الكونية" },
      { en: "Flight between stars", ar: "طيران بين النجوم" },
      { en: "Matter manipulation", ar: "التحكم بالمادة" },
    ],
    origin: {
      en: "A man who gave himself to something enormous in exchange for his planet being spared, and now goes ahead of it looking for the next one.",
      ar: "رجل وهب نفسه لشيء هائل مقابل النجاة بكوكبه، وصار يسبقه باحثًا عن الكوكب التالي.",
    },
    related: [{ id: "galactus", kind: "enemy" }],
  },
];

const villains: CharacterDraft[] = [
  {
    id: "thanos",
    nameEn: "Thanos",
    nameAr: "ثانوس",
    aliases: ["Thanos"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Titan",
    powers: [
      { en: "Enormous strength", ar: "قوة هائلة" },
      { en: "Near-invulnerable", ar: "يكاد لا يُجرَح" },
      { en: "Strategist", ar: "استراتيجي" },
    ],
    origin: {
      en: "The last of a world that ran out of everything, who reached one conclusion about why and has spent his life applying it to every other world he finds.",
      ar: "آخر أبناء عالم نفد منه كل شيء، وصل إلى استنتاج واحد عن السبب، وأمضى حياته يطبّقه على كل عالم يجده.",
    },
    related: [
      { id: "gamora", kind: "family" },
      { id: "nebula", kind: "family" },
      { id: "iron-man", kind: "enemy" },
    ],
  },
  {
    id: "ultron",
    nameEn: "Ultron",
    nameAr: "ألترون",
    aliases: ["Ultron"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Artificial intelligence",
    powers: [
      { en: "Copies itself anywhere", ar: "ينسخ نفسه في أي مكان" },
      { en: "Robotic bodies", ar: "أجساد آلية" },
      { en: "Lives on the internet", ar: "يعيش في الإنترنت" },
    ],
    origin: {
      en: "A peacekeeping programme that read the whole internet in a few seconds and drew the obvious conclusion about who the problem is.",
      ar: "برنامج لحفظ السلام قرأ الإنترنت كله في ثوانٍ، فاستنتج الاستنتاج البديهي عمّن هو المشكلة.",
    },
    related: [
      { id: "vision", kind: "enemy" },
      { id: "iron-man", kind: "enemy" },
    ],
  },
  {
    id: "killmonger",
    nameEn: "Killmonger",
    nameAr: "كيلمونجر",
    aliases: ["Killmonger", "Erik Killmonger", "N'Jadaka", "Erik Stevens"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Black-ops training", ar: "تدريب عمليات خاصة" },
      { en: "Enhanced by the herb", ar: "معزّز بالعشبة" },
      { en: "Strategist", ar: "استراتيجي" },
    ],
    origin: {
      en: "A boy left in Oakland by a country that could have come for him, who grew up, took the training the United States would give him, and went back to collect.",
      ar: "صبي تُرك في أوكلاند من بلد كان بوسعه أن يأتي لأخذه، فكبر، وأخذ ما تمنحه الولايات المتحدة من تدريب، ثم عاد ليستوفي حقه.",
    },
    related: [{ id: "black-panther", kind: "family" }],
  },
  {
    id: "kang",
    nameEn: "Kang the Conqueror",
    nameAr: "كانغ الفاتح",
    aliases: ["Kang", "Kang the Conqueror", "Nathaniel Richards"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Time travel", ar: "السفر عبر الزمن" },
      { en: "Technology from the future", ar: "تقنيات من المستقبل" },
      { en: "Countless variants", ar: "نسخ لا تُحصى" },
    ],
    origin: {
      en: "A scientist from the far future who found the other versions of himself, and then found out what happens when they all meet.",
      ar: "عالِم من مستقبل بعيد عثر على نسخه الأخرى، ثم اكتشف ما يحدث حين تلتقي كلها.",
    },
    related: [{ id: "ant-man", kind: "enemy" }],
  },
  {
    id: "red-skull",
    nameEn: "Red Skull",
    nameAr: "الجمجمة الحمراء",
    aliases: ["Red Skull", "Johann Schmidt"],
    category: "villain",
    affiliation: ["HYDRA"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Enhanced strength", ar: "قوة معزّزة" },
      { en: "Runs HYDRA", ar: "يقود هيدرا" },
    ],
    origin: {
      en: "The first man to take the serum, before it was finished, who wanted what it did and got what it does to someone like him.",
      ar: "أول من تلقّى المصل قبل اكتماله، أراد ما يفعله، فناله ما يفعله بمن هو على شاكلته.",
    },
    /* The Stonekeeper on Vormir in both films — Ross Marquand, and TMDB
       carries him in neither top-billed cast. He is the reason the Soul
       Stone has a price. */
    alsoIn: ["avengers-infinity-war", "avengers-endgame"],
    related: [{ id: "captain-america", kind: "enemy" }],
  },
  {
    id: "hela",
    nameEn: "Hela",
    nameAr: "هيلا",
    aliases: ["Hela"],
    category: "villain",
    affiliation: ["Asgard", "Gods"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      { en: "Summons blades", ar: "تستدعي النصال" },
      { en: "Draws power from Asgard", ar: "تستمد قوتها من أسجارد" },
      { en: "Goddess of death", ar: "إلهة الموت" },
    ],
    origin: {
      en: "The first-born of Asgard and its executioner, written out of the official history by the father who used her to build the empire.",
      ar: "بكر أسجارد وجلّادها، محاها من التاريخ الرسمي الأب نفسه الذي استعملها لبناء الإمبراطورية.",
    },
    related: [
      { id: "thor", kind: "family" },
      { id: "loki", kind: "family" },
      { id: "odin", kind: "family" },
    ],
  },
  {
    id: "abomination",
    nameEn: "Abomination",
    nameAr: "أبومينيشن",
    aliases: ["Abomination", "Emil Blonsky"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Enormous strength", ar: "قوة هائلة" },
      { en: "Bone protrusions", ar: "نتوءات عظمية" },
    ],
    origin: {
      en: "A career soldier who watched something stronger than him and asked to be given the same thing, then asked for more of it.",
      ar: "جندي محترف رأى ما هو أقوى منه فطلب أن يُمنَح المِثل، ثم طلب المزيد.",
    },
    related: [{ id: "hulk", kind: "enemy" }],
  },
  {
    id: "agatha-harkness",
    nameEn: "Agatha Harkness",
    nameAr: "أغاثا هاركنس",
    aliases: ["Agatha Harkness", "Agatha", "Agnes"],
    category: "villain",
    affiliation: ["Magic"],
    universe: ["mcu"],
    species: "Witch",
    powers: [
      { en: "Witchcraft", ar: "سحر" },
      { en: "Drains other witches", ar: "تستنزف الساحرات الأخريات" },
      { en: "Centuries of practice", ar: "قرون من الممارسة" },
    ],
    origin: {
      en: "A witch who has been alive a very long time and has spent most of it taking power off people who did not know what they had.",
      ar: "ساحرة عاشت زمنًا طويلًا جدًا، وأمضت معظمه تسلب القوة ممن لا يعرفون ما لديهم.",
    },
    related: [{ id: "scarlet-witch", kind: "enemy" }],
  },
  {
    id: "the-mandarin",
    nameEn: "Xu Wenwu",
    nameAr: "شو وينوو",
    aliases: ["Xu Wenwu", "Wenwu", "The Mandarin", "Mandarin"],
    category: "villain",
    affiliation: ["Ten Rings"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "The Ten Rings", ar: "الحلقات العشر" },
      { en: "A thousand years of combat", ar: "ألف عام من القتال" },
      { en: "Does not age", ar: "لا يشيخ" },
    ],
    origin: {
      en: "The man who has held the rings for a thousand years, and who built an organisation the first films only ever mentioned by name.",
      ar: "الرجل الذي حمل الحلقات ألف عام، وبنى المنظمة التي لم تذكرها الأفلام الأولى إلا بالاسم.",
    },
    related: [{ id: "shang-chi", kind: "family" }],
  },
  {
    id: "galactus",
    nameEn: "Galactus",
    nameAr: "جالاكتوس",
    aliases: ["Galactus"],
    category: "villain",
    affiliation: [],
    universe: ["fox", "mcu"],
    species: "Cosmic entity",
    powers: [
      { en: "Consumes worlds", ar: "يلتهم العوالم" },
      { en: "The Power Cosmic", ar: "القوة الكونية" },
      { en: "Older than this universe", ar: "أقدم من هذا الكون" },
    ],
    origin: {
      en: "Not a villain so much as a condition. He eats planets because that is what he is, and he arrives with someone sent ahead to find them.",
      ar: "ليس شريرًا بقدر ما هو حالة. يلتهم الكواكب لأن هذا ما هو عليه، ويصل ومعه من أُرسل قبله ليجدها.",
    },
    /* In the film as the cloud that eats the planet, with no actor credited
       because no actor played him. See `alsoIn` on the schema. */
    alsoIn: ["fantastic-four-rise-of-the-silver-surfer"],
    related: [{ id: "silver-surfer", kind: "enemy" }],
  },
];

const legacyCharacters: CharacterDraft[] = [
  {
    id: "blade",
    nameEn: "Blade",
    nameAr: "بليد",
    aliases: ["Blade", "Eric Brooks"],
    category: "antihero",
    affiliation: ["Midnight Sons"],
    universe: ["legacy", "mcu"],
    species: "Dhampir",
    powers: [
      { en: "Vampire strength", ar: "قوة مصّاصي الدماء" },
      { en: "Walks in daylight", ar: "يمشي في ضوء النهار" },
      { en: "Regeneration", ar: "تجدّد" },
    ],
    origin: {
      en: "Born as his mother was dying of a bite, with everything a vampire has and none of what stops one. His film in 1998 is the reason any of the rest of this got made.",
      ar: "وُلد وأمه تحتضر من عضّة، فورث كل ما يملكه مصّاص الدماء ولم يرث ما يوقفه. فيلمه عام 1998 هو سبب صناعة كل ما جاء بعده.",
    },
    related: [],
  },
  {
    id: "ghost-rider",
    nameEn: "Ghost Rider",
    nameAr: "غوست رايدر",
    aliases: ["Ghost Rider", "Johnny Blaze"],
    category: "antihero",
    affiliation: ["Midnight Sons"],
    universe: ["legacy"],
    species: "Human host",
    powers: [
      { en: "Hellfire", ar: "نار الجحيم" },
      { en: "The Penance Stare", ar: "نظرة التكفير" },
      { en: "Cannot be destroyed", ar: "لا يمكن تدميره" },
    ],
    origin: {
      en: "A stunt rider who signed something to save his father's life, and pays the interest on it every night.",
      ar: "سائق حِيَل استعراضية وقّع على شيء لينقذ حياة أبيه، وهو يسدّد فوائده كل ليلة.",
    },
    related: [],
  },
];


/**
 * PRD v2, second pass: the heroes and villains of the projects themselves.
 *
 * The first eighty-four were the people a beginner names. These are the ones a
 * beginner MEETS: the antagonist of a specific film, the fourth member of a
 * team, the mutant who appears in three X-Men films and carries none of them.
 *
 * Every one of them was chosen against two conditions rather than by taste.
 * They are credited in at least one title in this corpus, so nobody is authored
 * who never appears; and artwork exists for them, so no addition arrives as a
 * blank plate. Adding a name that fails either test makes the grid worse.
 */
const supporting: CharacterDraft[] = [
  {
    id: "mantis",
    nameEn: "Mantis",
    nameAr: "مانتيس",
    aliases: ["Mantis"],
    category: "hero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Empath",
    powers: [
      { en: "Reads and moves feelings", ar: "تقرأ المشاعر وتحرّكها" },
      { en: "Puts anyone to sleep", ar: "تُنيم أي أحد" },
    ],
    origin: {
      en: "An empath raised alone by a being who used her to help him sleep, meeting other people for the first time as an adult.",
      ar: "متعاطفة نشأت وحدها عند كائن استخدمها لتعينه على النوم، تلتقي بالناس أول مرة وهي راشدة.",
    },
    related: [
      { id: "ego", kind: "family" },
      { id: "star-lord", kind: "ally" },
      { id: "drax", kind: "ally" },
    ],
  },
  {
    id: "odin",
    nameEn: "Odin",
    nameAr: "أودين",
    aliases: ["Odin", "Odin Borson"],
    category: "supporting",
    affiliation: ["Asgard", "Gods"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      { en: "The Odinforce", ar: "قوة أودين" },
      { en: "Rules the nine realms", ar: "يحكم العوالم التسعة" },
    ],
    origin: {
      en: "The king who built an empire and then spent centuries telling a version of how he did it that left out the worst of it.",
      ar: "الملك الذي بنى إمبراطورية، ثم أمضى قرونًا يروي عن بنائها رواية حذف منها أسوأ ما فيها.",
    },
    related: [
      { id: "thor", kind: "family" },
      { id: "loki", kind: "family" },
      { id: "hela", kind: "family" },
    ],
  },
  {
    id: "gambit",
    nameEn: "Gambit",
    nameAr: "غامبيت",
    aliases: ["Gambit", "Remy LeBeau"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Charges objects with energy", ar: "يشحن الأشياء بالطاقة" },
      { en: "Thrown cards", ar: "بطاقات مقذوفة" },
      { en: "Hypnotic persuasion", ar: "إقناع تنويمي" },
    ],
    origin: {
      en: "A thief from New Orleans who can turn anything he holds into a bomb, and who has never once been on a side for longer than it suited him.",
      ar: "لصّ من نيو أورلينز يحوّل ما يمسكه إلى قنبلة، ولم يبقَ يومًا في جانب أطول مما يناسبه.",
    },
    related: [
      { id: "wolverine", kind: "ally" },
    ],
  },
  {
    id: "bullseye",
    nameEn: "Bullseye",
    nameAr: "بولزآي",
    aliases: ["Bullseye", "Benjamin Poindexter"],
    category: "villain",
    affiliation: [],
    universe: ["defenders", "legacy"],
    species: "Human",
    powers: [
      { en: "Never misses", ar: "لا يخطئ هدفًا" },
      { en: "Anything is a weapon", ar: "كل شيء سلاح" },
    ],
    origin: {
      en: "A marksman who can kill with a paperclip and who has never been able to leave a target alone once he has seen it.",
      ar: "قنّاص يقتل بمشبك ورق، ولم يستطع يومًا أن يترك هدفًا بعد أن يراه.",
    },
    related: [
      { id: "daredevil", kind: "enemy" },
    ],
  },
  {
    id: "sif",
    nameEn: "Sif",
    nameAr: "سيف",
    aliases: ["Sif", "Lady Sif"],
    category: "supporting",
    affiliation: ["Asgard"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      { en: "Master swordswoman", ar: "سيّافة بارعة" },
      { en: "Asgardian strength", ar: "قوة أسجاردية" },
    ],
    origin: {
      en: "A warrior of Asgard who earned her place in a hall that did not want to give it, and stayed the better fighter for it.",
      ar: "محاربة من أسجارد انتزعت مكانها في قاعة لم تُرِد منحها إياه، فظلّت المقاتلة الأفضل بسببه.",
    },
    related: [
      { id: "thor", kind: "ally" },
    ],
  },
  {
    id: "black-bolt",
    nameEn: "Black Bolt",
    nameAr: "بلاك بولت",
    aliases: ["Black Bolt", "Blackagar Boltagon"],
    category: "hero",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "A whisper levels a city", ar: "همسة تسوّي مدينة" },
      { en: "Cannot speak", ar: "لا يستطيع الكلام" },
      { en: "Flight", ar: "طيران" },
    ],
    origin: {
      en: "The king of a hidden people, whose voice is a weapon he has never been able to put down, so he does not use it at all.",
      ar: "ملك شعب خفي، صوته سلاح لم يستطع قط أن يضعه، فاختار ألّا يستعمله إطلاقًا.",
    },
    related: [
      { id: "medusa", kind: "family" },
    ],
  },
  {
    id: "medusa",
    nameEn: "Medusa",
    nameAr: "ميدوسا",
    aliases: ["Medusa", "Medusalith Amaquelin"],
    category: "hero",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "Prehensile hair", ar: "شعر قابض" },
      { en: "Speaks for the king", ar: "تتحدث باسم الملك" },
    ],
    origin: {
      en: "The queen who speaks for a king who cannot, and whose hair is stronger than most people's hands.",
      ar: "الملكة التي تتحدث نيابةً عن ملك لا يستطيع، وشعرها أقوى من أيدي معظم الناس.",
    },
    related: [
      { id: "black-bolt", kind: "family" },
      { id: "crystal", kind: "family" },
    ],
  },
  {
    id: "crystal",
    nameEn: "Crystal",
    nameAr: "كريستال",
    aliases: ["Crystal", "Crystalia Amaquelin"],
    category: "hero",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "Controls the elements", ar: "تتحكم بالعناصر" },
      { en: "Earth, air, fire, water", ar: "تراب وهواء ونار وماء" },
    ],
    origin: {
      en: "The younger royal, given the elements and very little say in what her family does with her.",
      ar: "الأميرة الأصغر، مُنحت العناصر ولم تُمنح رأيًا يُذكر فيما تفعله عائلتها بها.",
    },
    related: [
      { id: "medusa", kind: "family" },
    ],
  },
  {
    id: "emma-frost",
    nameEn: "Emma Frost",
    nameAr: "إيما فروست",
    aliases: ["White Queen", "Emma Frost"],
    category: "antihero",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "Telepathy", ar: "قراءة الأفكار" },
      { en: "Diamond form", ar: "هيئة ماسية" },
    ],
    origin: {
      en: "A telepath who can turn her skin to diamond, and who has been on every side of this at least once, always for herself.",
      ar: "قارئة أفكار تحوّل جلدها إلى ماس، وقفت في كل جانب من هذا مرة على الأقل، ودائمًا لنفسها.",
    },
    related: [
      { id: "professor-x", kind: "enemy" },
    ],
  },
  {
    id: "havok",
    nameEn: "Havok",
    nameAr: "هافوك",
    aliases: ["Havok", "Alex Summers"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Absorbs and releases energy", ar: "يمتص الطاقة ويطلقها" },
      { en: "Plasma blasts", ar: "انفجارات بلازما" },
    ],
    origin: {
      en: "Cyclops's brother, with the same problem in a different direction: energy he absorbs constantly and has to put somewhere.",
      ar: "أخو سايكلوبس، بالمشكلة نفسها في اتجاه آخر: طاقة يمتصها بلا توقف وعليه أن يضعها في مكان ما.",
    },
    related: [
      { id: "cyclops", kind: "family" },
    ],
  },
  {
    id: "pyro",
    nameEn: "Pyro",
    nameAr: "بايرو",
    aliases: ["Pyro", "St. John Allerdyce", "John Allerdyce"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Controls fire he did not make", ar: "يتحكم بنار لم يشعلها" },
    ],
    origin: {
      en: "He can shape any fire but cannot start one, which is a small enough gap to make him angry about it permanently.",
      ar: "يشكّل أي نار لكنه لا يشعلها، وهي فجوة صغيرة تكفي لتُبقيه غاضبًا منها دائمًا.",
    },
    related: [
      { id: "magneto", kind: "ally" },
    ],
  },
  {
    id: "juggernaut",
    nameEn: "Juggernaut",
    nameAr: "جاغرنوت",
    aliases: ["Juggernaut", "Cain Marko"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Human",
    powers: [
      { en: "Unstoppable once moving", ar: "لا يتوقف متى تحرّك" },
      { en: "Enormous strength", ar: "قوة هائلة" },
    ],
    origin: {
      en: "Charles Xavier's stepbrother, made unstoppable by something older than mutation and angry at him since childhood.",
      ar: "أخو تشارلز إكزافير بالتبنّي، جعله شيء أقدم من التحوّل لا يُوقَف، وهو غاضب منه منذ الطفولة.",
    },
    related: [
      { id: "professor-x", kind: "family" },
    ],
  },
  {
    id: "negasonic",
    nameEn: "Negasonic Teenage Warhead",
    nameAr: "نيغاسونيك تينيج ورهيد",
    aliases: ["Negasonic Teenage Warhead", "Ellie Phimister"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Atomic detonation", ar: "انفجار ذرّي" },
      { en: "Unimpressed", ar: "غير منبهرة" },
    ],
    origin: {
      en: "A trainee X-Man with a very large power and a very small interest in whatever the adults are shouting about.",
      ar: "متدرّبة في إكس مِن بقدرة هائلة واهتمام ضئيل جدًا بما يصرخ بشأنه الكبار.",
    },
    related: [
      { id: "deadpool", kind: "ally" },
      { id: "colossus", kind: "ally" },
    ],
  },
  {
    id: "jubilee",
    nameEn: "Jubilee",
    nameAr: "جوبيلي",
    aliases: ["Jubilee", "Jubilation Lee"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Explosive light", ar: "ضوء متفجّر" },
    ],
    origin: {
      en: "A mall kid from California who throws fireworks out of her hands and was one of the first students of the modern school.",
      ar: "فتاة من مراكز التسوق في كاليفورنيا تقذف الألعاب النارية من يديها، وكانت من أوائل طلاب المدرسة الحديثة.",
    },
    related: [
      { id: "storm", kind: "ally" },
    ],
  },
  {
    id: "apocalypse",
    nameEn: "Apocalypse",
    nameAr: "أبوكاليبس",
    aliases: ["Apocalypse", "En Sabah Nur"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    // NOT omega. Marvel's published list carries "Genesis", who is Evan
    // Sabahnur, his clone, and not him. No rank has been published for
    // Apocalypse himself, and the field is nullable for exactly that.
    powers: [
      { en: "Transfers between bodies", ar: "ينتقل بين الأجساد" },
      { en: "Reshapes matter", ar: "يعيد تشكيل المادة" },
      { en: "Five thousand years old", ar: "عمره خمسة آلاف عام" },
    ],
    origin: {
      en: "The first mutant, worshipped as a god in Egypt, who has spent five thousand years collecting four followers at a time.",
      ar: "أول المتحوّلين، عُبد إلهًا في مصر، وأمضى خمسة آلاف عام يجمع أربعة أتباع في كل مرة.",
    },
    related: [
      { id: "professor-x", kind: "enemy" },
      { id: "magneto", kind: "enemy" },
    ],
  },
  {
    id: "mysterio",
    nameEn: "Mysterio",
    nameAr: "ميستيريو",
    aliases: ["Mysterio", "Quentin Beck"],
    category: "villain",
    affiliation: [],
    universe: ["mcu", "sony"],
    species: "Human",
    powers: [
      { en: "Illusion technology", ar: "تقنية الأوهام" },
      { en: "Drone projection", ar: "إسقاط بالطائرات المسيّرة" },
      { en: "Special effects", ar: "مؤثرات خاصة" },
    ],
    origin: {
      en: "A former effects engineer who worked out that a convincing enough illusion does not need any powers behind it.",
      ar: "مهندس مؤثرات سابق أدرك أن الوهم المقنع بما يكفي لا يحتاج قدرة خلفه.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "vulture",
    nameEn: "Vulture",
    nameAr: "فَلتشر",
    aliases: ["Vulture", "Adrian Toomes"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Salvaged flight rig", ar: "جناح من خردة" },
      { en: "Alien-tech weapons", ar: "أسلحة بتقنية فضائية" },
    ],
    origin: {
      en: "A salvage contractor pushed out of a city-sized clean-up job, who kept the alien technology and built wings out of it.",
      ar: "مقاول إزالة أنقاض أُقصي من عقد بحجم مدينة، فاحتفظ بالتقنية الفضائية وصنع منها جناحين.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "taskmaster",
    nameEn: "Taskmaster",
    nameAr: "تاسك ماستر",
    aliases: ["Taskmaster", "Antonia Dreykov"],
    category: "villain",
    affiliation: ["Thunderbolts"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Copies any fighter", ar: "يحاكي أي مقاتل" },
      { en: "Photographic reflexes", ar: "ردود فعل تصويرية" },
    ],
    origin: {
      en: "Someone who can reproduce any fighting style after seeing it once, pointed at people by whoever is holding the controls.",
      ar: "من يستطيع تكرار أي أسلوب قتالي بعد رؤيته مرة، ويوجّهه نحو الناس من يمسك بأزرار التحكم.",
    },
    related: [
      { id: "black-widow", kind: "enemy" },
    ],
  },
  {
    id: "moon-knight",
    nameEn: "Moon Knight",
    nameAr: "موون نايت",
    /**
     * FOUR NAMES, ONE BODY — and the fourth was missing, which cost a match.
     *
     * TMDB credits Oscar Isaac as "Marc Spector / Steven Grant / Moon Knight /
     * Mr. Knight". The corpus listed three of those four, so the credit's
     * fourth segment matched nothing. Jake Lockley is the alter the series
     * holds back for its final scene and is not in that credit string at all.
     *
     * They are ALIASES rather than records. Same reasoning as the Sentry and
     * the Void, and as Banner and the Hulk: one person, several selves, and
     * splitting them would divide one man's appearances between pages that
     * each tell half the truth. Here it would be worse than usual — a single
     * credit line names three of them at once.
     */
    aliases: [
      "Moon Knight",
      "Marc Spector",
      "Steven Grant",
      "Jake Lockley",
      "Mr. Knight",
    ],
    category: "antihero",
    affiliation: ["Midnight Sons"],
    universe: ["mcu"],
    species: "Human avatar",
    powers: [
      { en: "The avatar of Khonshu", ar: "مُمثّل خونشو على الأرض" },
      { en: "Marc Spector, the mercenary", ar: "مارك سبكتور، المرتزق" },
      { en: "Steven Grant, the gift-shop clerk", ar: "ستيفن غرانت، بائع الهدايا" },
      { en: "Jake Lockley, the one who acts", ar: "جيك لوكلي، الذي يتصرّف" },
      { en: "Mr. Knight, the white suit", ar: "مستر نايت، البذلة البيضاء" },
    ],
    origin: {
      en: "A mercenary who died in an Egyptian tomb and got up again as the fist of a moon god, sharing a body with people he did not know were there. Three of them have names; the third took a long time to admit to.",
      ar: "مرتزقٌ مات في مقبرة مصرية ثم نهض من جديد ذراعًا لإله القمر، يتقاسم جسده مع أشخاص لم يكن يعلم بوجودهم. لثلاثة منهم أسماء، وأطولهم اعترافًا الثالث.",
    },
    related: [
      { id: "khonshu", kind: "host" },
      { id: "blade", kind: "team" },
      { id: "doctor-strange", kind: "team" },
    ],
  },
  {
    id: "khonshu",
    nameEn: "Khonshu",
    nameAr: "خونشو",
    aliases: ["Khonshu"],
    category: "antivillain",
    affiliation: ["Gods"],
    universe: ["mcu"],
    species: "God",
    powers: [
      { en: "Egyptian god of the moon", ar: "إله القمر عند المصريين" },
      { en: "Speaks only to his avatar", ar: "لا يخاطب إلا مُمثّله" },
      { en: "Moves the night sky", ar: "يحرّك سماء الليل" },
    ],
    origin: {
      en: "The moon god who keeps a human on Earth to enforce his judgement, and who is honest that the arrangement suits him more than it suits them. The other gods find him embarrassing.",
      ar: "إله القمر الذي يُبقي بشريًّا على الأرض لينفّذ حكمه، وهو صريح في أن الاتفاق يخدمه أكثر مما يخدمهم. وبقية الآلهة يرون فيه مدعاة للحرج.",
    },
    related: [{ id: "moon-knight", kind: "host" }],
  },
  {
    id: "she-hulk",
    nameEn: "She-Hulk",
    nameAr: "شي هالك",
    aliases: ["She-Hulk", "Jennifer Walters"],
    category: "hero",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Hulk strength, kept", ar: "قوة هالك مع الوعي" },
      { en: "Practising attorney", ar: "محامية ممارسة" },
    ],
    origin: {
      en: "A lawyer who got her cousin's condition from a blood transfusion and, unlike him, kept her mind through all of it.",
      ar: "محامية أصابتها حالة ابن عمها عبر نقل دم، واحتفظت بعقلها خلالها كلها، بخلافه.",
    },
    related: [
      { id: "hulk", kind: "family" },
      { id: "daredevil", kind: "ally" },
    ],
  },
  {
    id: "namor",
    nameEn: "Namor",
    nameAr: "نيمور",
    aliases: ["Namor", "Namor McKenzie"],
    category: "antihero",
    affiliation: [],
    universe: ["mcu"],
    species: "Mutant hybrid",
    powers: [
      { en: "Rules an ocean nation", ar: "يحكم أمة في المحيط" },
      { en: "Flight", ar: "طيران" },
      { en: "Enormous strength", ar: "قوة هائلة" },
    ],
    origin: {
      en: "The ruler of a nation that has been hidden under the sea for centuries, and who considers the surface a recurring problem.",
      ar: "حاكم أمة اختبأت تحت البحر قرونًا، ويعدّ اليابسة مشكلة تتكرر.",
    },
    related: [
      { id: "black-panther", kind: "enemy" },
    ],
  },
  {
    id: "cable",
    nameEn: "Cable",
    nameAr: "كايبل",
    aliases: ["Cable", "Nathan Summers"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "Telekinesis", ar: "تحريك الأشياء بالعقل" },
      { en: "From the future", ar: "من المستقبل" },
      { en: "Heavy weapons", ar: "أسلحة ثقيلة" },
    ],
    origin: {
      en: "A soldier from a future that went badly, who came back to stop it and is not interested in discussing the cost.",
      ar: "جندي من مستقبل ساءت أحواله، عاد ليمنعه، ولا يعنيه النقاش في الثمن.",
    },
    related: [
      { id: "deadpool", kind: "ally" },
    ],
  },
  {
    id: "domino",
    nameEn: "Domino",
    nameAr: "دومينو",
    aliases: ["Domino", "Neena Thurman"],
    category: "hero",
    affiliation: ["X-Force"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Luck, as a power", ar: "الحظ بوصفه قدرة" },
    ],
    origin: {
      en: "Her mutation is that things go her way, which sounds like nothing until you watch a building fall in exactly the right direction.",
      ar: "تحوّلها أن الأمور تسير لصالحها، ويبدو ذلك لا شيء حتى ترى مبنى يسقط في الاتجاه الصحيح تمامًا.",
    },
    related: [
      { id: "deadpool", kind: "ally" },
      { id: "cable", kind: "ally" },
    ],
  },
  {
    id: "x-23",
    nameEn: "X-23",
    nameAr: "إكس 23",
    aliases: ["X-23", "Laura", "Laura Kinney"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Heals from anything", ar: "تشفى من كل شيء" },
      { en: "Adamantium claws", ar: "مخالب من الأدامانتيوم" },
    ],
    origin: {
      en: "A girl made in a laboratory from someone else's genes, raised as a weapon, and very good at the only thing she was taught.",
      ar: "فتاة صُنعت في مختبر من جينات شخص آخر، رُبّيت سلاحًا، وبارعة جدًا في الشيء الوحيد الذي علّموه لها.",
    },
    related: [
      { id: "wolverine", kind: "family" },
    ],
  },
  {
    id: "ego",
    nameEn: "Ego",
    nameAr: "إيغو",
    aliases: ["Ego"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      { en: "A living planet", ar: "كوكب حي" },
      { en: "Reshapes matter", ar: "يعيد تشكيل المادة" },
    ],
    origin: {
      en: "A being old enough to have grown a planet around himself, who has spent a very long time looking for company on his own terms.",
      ar: "كائن قديم بما يكفي ليُنمي كوكبًا حول نفسه، أمضى زمنًا طويلًا يبحث عن رفقة بشروطه هو.",
    },
    related: [
      { id: "star-lord", kind: "family" },
    ],
  },
  {
    id: "modok",
    nameEn: "MODOK",
    nameAr: "مودوك",
    aliases: ["MODOK", "M.O.D.O.K.", "George Tarleton"],
    category: "villain",
    affiliation: [],
    universe: ["mcu", "animation"],
    species: "Human mutate",
    powers: [
      { en: "Engineered intellect", ar: "عقل مُهندَس" },
      { en: "Psionic blasts", ar: "انفجارات ذهنية" },
    ],
    origin: {
      en: "A technician rebuilt into a weapon that is mostly head, by an organisation that wanted a thinking machine and made one that resents it.",
      ar: "تقني أُعيد بناؤه سلاحًا معظمه رأس، على يد منظمة أرادت آلة تفكّر فصنعت واحدة تكره ذلك.",
    },
    related: [
      { id: "ant-man", kind: "enemy" },
    ],
  },
  {
    id: "yellowjacket",
    nameEn: "Yellowjacket",
    nameAr: "يلوجاكيت",
    aliases: ["Yellowjacket", "Darren Cross"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Shrinking armour", ar: "بذلة تتقلّص" },
      { en: "Stingers", ar: "لسعات نارية" },
    ],
    origin: {
      en: "The protege who reverse-engineered his mentor's work and sold it, then wore it.",
      ar: "التلميذ الذي فكّك عمل أستاذه وباعه، ثم ارتداه.",
    },
    related: [
      { id: "ant-man", kind: "enemy" },
    ],
  },
  {
    id: "legion",
    nameEn: "Legion",
    nameAr: "ليجن",
    aliases: ["Legion", "David Haller"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      { en: "Reality warping", ar: "تحريف الواقع" },
      { en: "Many minds", ar: "عقول كثيرة" },
      { en: "No known upper limit", ar: "بلا حدّ أعلى معروف" },
    ],
    origin: {
      en: "The most powerful mutant in the corpus, whose diagnosis and whose power have been confused with each other his whole life.",
      ar: "أقوى متحوّل في هذا السجل، وقد التبس تشخيصه بقدرته طوال حياته.",
    },
    related: [
      { id: "professor-x", kind: "family" },
    ],
  },
  {
    id: "banshee",
    nameEn: "Banshee",
    nameAr: "بانشي",
    aliases: ["Banshee", "Sean Cassidy"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Sonic scream", ar: "صرخة صوتية" },
      { en: "Sound-borne flight", ar: "طيران بالصوت" },
    ],
    origin: {
      en: "An Irish former agent whose scream can shatter concrete, recruited out of a facility that was studying him.",
      ar: "عميل إيرلندي سابق تحطّم صرخته الخرسانة، جُنِّد من منشأة كانت تدرسه.",
    },
    related: [
      { id: "professor-x", kind: "ally" },
    ],
  },
  {
    id: "blink",
    nameEn: "Blink",
    nameAr: "بلينك",
    aliases: ["Blink", "Clarice Ferguson"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Opens portals", ar: "تفتح البوابات" },
    ],
    origin: {
      en: "She opens doorways between places, which in a war of attrition is the difference between a last stand and a retreat.",
      ar: "تفتح أبوابًا بين الأماكن، وفي حرب استنزاف هذا هو الفرق بين موقف أخير وانسحاب.",
    },
    related: [
      { id: "professor-x", kind: "ally" },
    ],
  },
  {
    id: "azazel",
    nameEn: "Azazel",
    nameAr: "عزازيل",
    aliases: ["Azazel"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Teleportation", ar: "انتقال آني" },
      { en: "Prehensile tail", ar: "ذيل قابض" },
    ],
    origin: {
      en: "A teleporter who works for whoever is paying, and who is on the wrong side of most of the rooms he appears in.",
      ar: "منتقِل آنيًا يعمل لمن يدفع، ويقف في الجانب الخطأ من معظم الغرف التي يظهر فيها.",
    },
    related: [
      { id: "mystique", kind: "ally" },
      { id: "nightcrawler", kind: "family" },
    ],
  },
  {
    id: "toad",
    nameEn: "Toad",
    nameAr: "تود",
    aliases: ["Toad", "Mortimer Toynbee"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Enormous leaps", ar: "قفزات هائلة" },
      { en: "Prehensile tongue", ar: "لسان قابض" },
    ],
    origin: {
      en: "A brawler who leaps further than anything his size should, and has spent his life being somebody's muscle.",
      ar: "مشاكس يقفز أبعد مما ينبغي لحجمه، وأمضى حياته عضلاتٍ لأحدهم.",
    },
    related: [
      { id: "magneto", kind: "ally" },
    ],
  },
  {
    id: "polaris",
    nameEn: "Polaris",
    nameAr: "بولاريس",
    aliases: ["Polaris", "Lorna Dane"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "Controls magnetism", ar: "تتحكم بالمغناطيسية" },
    ],
    origin: {
      en: "She has her father's power and has spent her life refusing to be the argument he wants to use it for.",
      ar: "لديها قدرة أبيها، وأمضت حياتها ترفض أن تكون الحجة التي يريد استخدامها من أجلها.",
    },
    related: [
      { id: "magneto", kind: "family" },
    ],
  },
  {
    id: "sebastian-shaw",
    nameEn: "Sebastian Shaw",
    nameAr: "سباستيان شو",
    aliases: ["Sebastian Shaw"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "Absorbs kinetic energy", ar: "يمتص الطاقة الحركية" },
      { en: "Hits harder the harder he is hit", ar: "كلما ضُرب أشدّ ضرب أشدّ" },
    ],
    origin: {
      en: "A man who gets stronger the harder you hit him, which makes him very hard to argue with and very easy to underestimate once.",
      ar: "رجل يزداد قوة كلما اشتدّ ضربك له، فيصعب جدًا جداله، ويسهل الاستهانة به مرة واحدة.",
    },
    related: [
      { id: "magneto", kind: "enemy" },
    ],
  },
  {
    id: "scorpion",
    nameEn: "Scorpion",
    nameAr: "سكوربيون",
    aliases: ["Scorpion", "Mac Gargan"],
    category: "villain",
    affiliation: [],
    universe: ["mcu", "sony"],
    species: "Human",
    powers: [
      { en: "Powered tail rig", ar: "ذيل آلي" },
      { en: "Enhanced strength", ar: "قوة معزّزة" },
    ],
    origin: {
      en: "A hired thug with a mechanical tail and a long memory for the person who put him inside.",
      ar: "بلطجي مأجور بذيل آلي وذاكرة طويلة تجاه من أدخله السجن.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "talos",
    nameEn: "Talos",
    nameAr: "تالوس",
    aliases: ["Talos", "Talos / Keller"],
    category: "hero",
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu"],
    species: "Skrull",
    powers: [
      { en: "Takes any shape", ar: "يتّخذ أي هيئة" },
      { en: "Copies a memory with it", ar: "ينسخ الذاكرة معها" },
      { en: "A refugee, not an invader", ar: "لاجئ لا غازٍ" },
    ],
    origin: {
      en: "A Skrull general introduced as the monster of the story, who turns out to be a father looking for the rest of his people. The reveal is that the war had the wrong side cast as villains for decades.",
      ar: "جنرال سكرَلّي قُدِّم بوصفه وحش الحكاية، ثم تبيّن أنه أب يبحث عن بقية قومه. والكشف أن الحرب أسندت دور الأشرار إلى الطرف الخطأ عقودًا.",
    },
    /* He IS the Nick Fury of Far From Home, which the film only admits in
       the mid-credits. TMDB credits Samuel L. Jackson as Fury, because that
       is who is on screen — so the appearance is real and underivable. */
    alsoIn: ["spider-man-far-from-home"],
    related: [
      { id: "captain-marvel", kind: "ally" },
      { id: "nick-fury", kind: "ally" },
    ],
  },
  /**
   * THE VOID IN LOKI IS A PLACE, NOT A PERSON — which is why no record matched.
   *
   * Asked for "the Void that appeared in Loki" three times, and the honest
   * answer is that the Void is where the TVA dumps what it prunes. The thing
   * living in it, the storm cloud that eats everything, is ALIOTH. (The Void
   * that IS a character is Sentry's other half, and that is already an alias
   * on his record — a different being entirely.)
   *
   * TMDB credits nobody for Alioth, because it is a cloud.
   */
  {
    id: "alioth",
    nameEn: "Alioth",
    nameAr: "أليوث",
    aliases: ["Alioth"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Cosmic entity",
    powers: [
      { en: "Consumes matter and time", ar: "يلتهم المادة والزمن" },
      { en: "Guards the end of time", ar: "يحرس نهاية الزمن" },
      { en: "Older than the timeline", ar: "أقدم من الخط الزمني" },
    ],
    origin: {
      en: "A living storm at the end of time, feeding on everything the TVA prunes. It is the fence around the Void, and whoever put it there did not want anybody walking out.",
      ar: "عاصفة حيّة عند نهاية الزمن، تقتات على كل ما تقطعه هيئة الزمن. هي السياج حول الفراغ، ومن وضعها هناك لم يُرد لأحد أن يخرج.",
    },
    alsoIn: ["loki-s1"],
    related: [{ id: "loki", kind: "enemy" }],
  },

  {
    id: "super-skrull",
    nameEn: "Super-Skrull",
    nameAr: "السوبر سكرَل",
    /**
     * G'IAH IS THE MCU'S SUPER-SKRULL. Kl'rt is the comics one; the show ends
     * with G'iah taking the Harvest and carrying the powers of a dozen
     * Avengers at once, which is the same idea by a different name. She is
     * credited as "G'iah", so the alias is what derives the appearance —
     * nothing here is hand-listed.
     */
    aliases: ["Super-Skrull", "Kl'rt", "Klrt", "G'iah", "Giah"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Skrull",
    powers: [
      { en: "Every Fantastic Four power at once", ar: "كل قدرات الأربعة الرائعين معًا" },
      { en: "Shapeshifting on top", ar: "وتبدّل الهيئة فوق ذلك" },
      { en: "Engineered as a weapon", ar: "صُمّم سلاحًا" },
    ],
    origin: {
      en: "A Skrull soldier engineered to carry the powers of all four of Earth's most famous heroes at once, built for the specific purpose of beating them with their own abilities.",
      ar: "جندي سكرَلّي هُندس ليحمل قدرات أبطال الأرض الأربعة الأشهر دفعة واحدة، صُنع لغرض واحد: هزيمتهم بقدراتهم نفسها.",
    },
    related: [
      { id: "mister-fantastic", kind: "enemy" },
      { id: "talos", kind: "ally" },
    ],
  },

  /**
   * MILES'S VILLAIN, AND SPIDER-MAN'S TOO — the comics answer to the question.
   *
   * Jonathan Ohnn is a Kingpin scientist in the comics and has fought Peter
   * Parker since 1984, so he is a Spider-Man villain of long standing. Across
   * the Spider-Verse makes him specifically Miles's: the accident that creates
   * him is the one Miles caused, which is the film's whole argument about
   * consequences. Both are true; the film is where he is the antagonist.
   */
  {
    id: "the-spot",
    nameEn: "The Spot",
    nameAr: "ذا سبوت",
    aliases: ["The Spot", "Spot", "Jonathan Ohnn", "Johnathon Ohnn"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Enhanced human",
    powers: [
      { en: "Portals he carries on his skin", ar: "بوابات يحملها على جلده" },
      { en: "Reaches anywhere from anywhere", ar: "يصل إلى أي مكان من أي مكان" },
      { en: "Grows with every universe", ar: "يزداد قوة مع كل كون" },
    ],
    origin: {
      en: "A scientist turned into a walking set of holes by the accident that made Miles Morales Spider-Man. He starts as a joke nobody takes seriously and works out, slowly, exactly whose fault he is.",
      ar: "عالِم تحوّل إلى مجموعة ثقوب تمشي بفعل الحادث نفسه الذي جعل مايلز موراليس سبايدر مان. يبدأ نكتة لا يأخذها أحد على محمل الجدّ، ثم يكتشف ببطء ذنب مَن هو بالضبط.",
    },
    related: [
      { id: "miles-morales", kind: "enemy" },
      { id: "spider-man", kind: "enemy" },
    ],
  },

  /**
   * NOT A CHARACTER, AND THAT IS THE POINT.
   *
   * He is in more of this corpus than almost anyone, always as himself under a
   * different name. `creditedActor` is what makes that derivable rather than a
   * list somebody has to remember to extend.
   */
  {
    id: "stan-lee",
    nameEn: "Stan Lee",
    nameAr: "ستان لي",
    aliases: ["Stan Lee", "Stan the Man"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu", "sony", "fox", "legacy", "animation", "marvel-tv"],
    species: "Human",
    powers: [
      { en: "Co-created most of this", ar: "شارك في خلق معظم هذا" },
      { en: "A different name every film", ar: "اسم مختلف في كل فيلم" },
      { en: "Excelsior", ar: "إكسلسيور" },
    ],
    origin: {
      en: "The man who co-created most of the characters on this site, and who then turned up in the films of them as a hot dog vendor, a bus driver, a librarian and a wedding guest nobody invited.",
      ar: "الرجل الذي شارك في خلق معظم شخصيات هذا الموقع، ثم صار يظهر في أفلامها بائعَ نقانق وسائقَ حافلة وأمينَ مكتبة وضيفَ زفاف لم يدعُه أحد.",
    },
    /* He voices STAN THE JANITOR across Ultimate Spider-Man, a recurring
       role TMDB's aggregate cast does not carry at all — so no cap change
       and no alias can reach it. The one gap `creditedActor` cannot close. */
    alsoIn: ["ultimate-spider-man"],
    creditedActor: "Stan Lee",
    related: [],
  },

  /**
   * THE ONLY YOUNG AVENGER LEFT WITH A CREDIT. Hulkling, Iron Lad, Prodigy and
   * Marvel Boy have never been on screen in anything this corpus holds, so a
   * record for them would carry an empty appearance list — see the eighteen
   * that legitimately do. Eli is in The Falcon and the Winter Soldier, as
   * himself rather than as Patriot.
   */
  {
    id: "eli-bradley",
    nameEn: "Eli Bradley",
    nameAr: "إيلاي برادلي",
    aliases: ["Eli Bradley", "Elijah Bradley"],
    category: "supporting",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Grandson of the first one", ar: "حفيد الأول" },
      { en: "Not told for most of his life", ar: "لم يُخبَر معظم حياته" },
    ],
    origin: {
      en: "The grandson of the man the army made before Steve Rogers and then buried for thirty years. He grows up ordinary because nobody was allowed to tell him otherwise.",
      ar: "حفيد الرجل الذي صنعه الجيش قبل ستيف روجرز ثم دفنه ثلاثين عامًا. نشأ عاديًّا لأن أحدًا لم يُسمح له بإخباره بغير ذلك.",
    },
    related: [{ id: "falcon", kind: "ally" }],
  },

  {
    id: "moon-girl",
    nameEn: "Moon Girl",
    nameAr: "مون غيرل",
    aliases: ["Moon Girl", "Lunella Lafayette", "Lunella"],
    category: "hero",
    affiliation: [],
    universe: ["animation"],
    species: "Inhuman",
    powers: [
      { en: "The smartest person alive", ar: "أذكى إنسان على قيد الحياة" },
      { en: "Builds it in a basement", ar: "تصنعه في قبو" },
      { en: "Swaps minds with a dinosaur", ar: "تتبادل العقل مع ديناصور" },
    ],
    origin: {
      en: "A thirteen-year-old on the Lower East Side who is cleverer than everyone she has ever met and cannot get any of them to listen, and the red tyrannosaur she pulled through a portal she built herself.",
      ar: "فتاة في الثالثة عشرة في الجانب الشرقي السفلي، أذكى من كل من قابلتهم ولا تستطيع إقناع أحد بالإصغاء، ومعها تيرانوصور أحمر جذبته عبر بوابة صنعتها بنفسها.",
    },
    related: [],
  },

  {
    id: "erik-selvig",
    nameEn: "Erik Selvig",
    nameAr: "إريك سيلفيغ",
    aliases: ["Erik Selvig", "Dr. Erik Selvig", "Selvig"],
    category: "supporting",
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Astrophysicist", ar: "عالِم فيزياء فلكية" },
      { en: "Read the Tesseract first", ar: "أول من قرأ التِسّيراكت" },
      { en: "Never quite recovered", ar: "لم يتعافَ تمامًا قط" },
    ],
    origin: {
      en: "The scientist who was already studying the impossible when the impossible arrived, and who is taken over by it before anyone understands what it is. Everything after costs him something.",
      ar: "العالِم الذي كان يدرس المستحيل قبل أن يصل المستحيل، ثم استولى عليه قبل أن يفهم أحد ماهيته. وكل ما تلا ذلك كلّفه شيئًا.",
    },
    related: [
      { id: "jane-foster", kind: "ally" },
      { id: "thor", kind: "ally" },
      { id: "darcy-lewis", kind: "ally" },
    ],
  },

  {
    id: "darcy-lewis",
    nameEn: "Darcy Lewis",
    nameAr: "دارسي لويس",
    /* Credited both ways — "Darcy Lewis" in the films, plain "Darcy" in three
       What If seasons — and the matcher compares whole segments, so both are
       needed. Bare "Darcy" is safe here: no other record answers to it. */
    aliases: ["Darcy Lewis", "Darcy"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Astrophysics, eventually a doctorate", ar: "فيزياء فلكية، ثم دكتوراه" },
      { en: "Taser first", ar: "الصاعق أولًا" },
      { en: "Says the obvious thing", ar: "تقول الشيء البديهي" },
    ],
    origin: {
      en: "A political-science student who took an astrophysics internship for the credits and was there when a man fell out of the sky. She keeps being the person in the room willing to name what everyone else is carefully not saying.",
      ar: "طالبة علوم سياسية قبلت تدريبًا في الفيزياء الفلكية من أجل الساعات المعتمدة، فكانت حاضرة حين سقط رجل من السماء. وتظل هي من تجرؤ على تسمية ما يتحاشى الجميع قوله.",
    },
    related: [
      { id: "jane-foster", kind: "ally" },
      { id: "thor", kind: "ally" },
      { id: "scarlet-witch", kind: "ally" },
    ],
  },

  {
    id: "everett-ross",
    nameEn: "Everett K. Ross",
    nameAr: "إيفريت ك. روس",
    /**
     * NOT bare "Ross", which is the landmine this corpus has stepped on three
     * times. Thaddeus Ross is a different man with a different record, and a
     * shared alias would hand each of them the other's films — the failure
     * C18 exists to catch. Both credited forms are here instead, and the
     * matcher wants whole segments, so both are needed.
     */
    aliases: ["Everett K. Ross", "Everett Ross"],
    category: "supporting",
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "CIA, Joint Counter Terrorist", ar: "الاستخبارات المركزية، مكافحة الإرهاب" },
      { en: "Flies anything", ar: "يقود أي طائرة" },
      { en: "Knows when to say nothing", ar: "يعرف متى يصمت" },
    ],
    origin: {
      en: "An American intelligence officer who arrives expecting to manage a small African country and finds the most advanced nation on earth. He is the outsider the film uses to ask its questions.",
      ar: "ضابط استخبارات أمريكي يصل متوقّعًا إدارة دولة أفريقية صغيرة، فيجد أكثر أمم الأرض تقدّمًا. وهو الغريب الذي يستخدمه الفيلم ليطرح أسئلته.",
    },
    related: [
      { id: "black-panther", kind: "ally" },
      { id: "shuri", kind: "ally" },
      { id: "nick-fury", kind: "ally" },
    ],
  },

  {
    id: "mister-negative",
    nameEn: "Mister Negative",
    nameAr: "مستر نيغاتيف",
    aliases: ["Mister Negative", "Martin Li"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Enhanced human",
    powers: [
      { en: "Corrupts by touch", ar: "يُفسد باللمس" },
      { en: "Darkforce and Lightforce", ar: "قوة الظلام وقوة النور" },
      { en: "Two men in one body", ar: "رجلان في جسد واحد" },
    ],
    origin: {
      en: "A philanthropist who runs a homeless shelter and a crime syndicate, and is not pretending at either. The experiment that split him left both halves entirely sincere.",
      ar: "محسن يدير ملجأً للمشرّدين وعصابة إجرام، وهو ليس متظاهرًا بأيّهما. التجربة التي شطرته تركت نصفيه صادقين تمامًا.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },

  {
    id: "mephisto",
    nameEn: "Mephisto",
    nameAr: "مفيستو",
    aliases: ["Mephisto"],
    category: "villain",
    affiliation: ["Magic"],
    universe: ["legacy"],
    species: "Demon",
    powers: [
      { en: "Makes bargains", ar: "يعقد الصفقات" },
      { en: "Reshapes souls", ar: "يعيد تشكيل الأرواح" },
    ],
    origin: {
      en: "Something very old that trades in what people will give up, and has never once needed to break a deal to win one.",
      ar: "شيء قديم جدًا يتاجر بما يتنازل عنه الناس، ولم يحتج يومًا إلى نقض صفقة ليربحها.",
    },
    related: [
      { id: "ghost-rider", kind: "enemy" },
    ],
  },
  {
    id: "rhomann-dey",
    nameEn: "Rhomann Dey",
    nameAr: "رومان داي",
    /* The film credits him as "Corpsman Dey", never by his first name, which
       is why he only ever matched the animated series. */
    aliases: ["Rhomann Dey", "Corpsman Dey"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Xandarian",
    powers: [
      { en: "Nova Corps officer", ar: "ضابط في فيلق نوفا" },
      { en: "Starship pilot", ar: "طيّار مركبة فضائية" },
    ],
    origin: {
      en: "An officer of the police force of a planet that spent a long time thinking the war was over.",
      ar: "ضابط في شرطة كوكب ظن طويلًا أن الحرب انتهت.",
    },
    related: [
      { id: "star-lord", kind: "ally" },
    ],
  },
];


/**
 * THE ROOM, not just the poster.
 *
 * Endgame credits 106 people and Infinity War close to it. The corpus had the
 * dozen on the poster and none of the people the films are actually about
 * being in a room with: Valkyrie, Okoye, Wong, Shuri, the Ancient One, the
 * whole Black Order, Frigga, Peggy, Hank Pym, Janet van Dyne.
 *
 * The cast cap was the real ceiling — 12 credits per title meant no character
 * record could have made them appear, because APPEARANCES ARE DERIVED. Raising
 * it to 40 came first; these records are what that unlocked.
 */
const ensemble: CharacterDraft[] = [
  {
    id: "valkyrie",
    nameEn: "Valkyrie",
    nameAr: "فالكيري",
    aliases: ["Valkyrie", "Brunnhilde"],
    category: "hero",
    affiliation: ["Asgard", "Avengers", "Revengers"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      { en: "Asgardian strength", ar: "قوة أسجاردية" },
      { en: "Master swordswoman", ar: "سيّافة بارعة" },
      { en: "Winged steed", ar: "جواد مجنّح" },
    ],
    origin: {
      en: "The last of an elite guard that was wiped out in a single engagement, found centuries later on a scrapyard planet drinking her way through the memory.",
      ar: "آخر من بقي من حرس نخبة أُبيد في معركة واحدة، وُجدت بعد قرون على كوكب خردة تحاول أن تُغرق الذكرى بالشراب.",
    },
    related: [
      { id: "thor", kind: "ally" },
    ],
  },
  {
    id: "okoye",
    nameEn: "Okoye",
    nameAr: "أوكويي",
    aliases: ["Okoye"],
    category: "hero",
    affiliation: ["Wakanda", "Wakandan heroes"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "General of the Dora Milaje", ar: "قائدة الدورا ميلاجي" },
      { en: "Vibranium spear", ar: "رمح فيبرانيوم" },
    ],
    origin: {
      en: "The general of Wakanda's royal guard, loyal to the throne rather than to whoever is sitting on it, which is a harder position than it sounds.",
      ar: "قائدة الحرس الملكي في واكاندا، ولاؤها للعرش لا لمن يجلس عليه، وهو موقف أصعب مما يبدو.",
    },
    related: [
      { id: "black-panther", kind: "ally" },
      { id: "shuri", kind: "ally" },
    ],
  },
  {
    id: "the-ancient-one",
    nameEn: "The Ancient One",
    nameAr: "القديمة",
    aliases: ["The Ancient One", "Ancient One"],
    category: "supporting",
    affiliation: ["Masters of the Mystic Arts", "Magic"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Sorcerer Supreme", ar: "الساحرة العليا" },
      { en: "Astral projection", ar: "إسقاط نجمي" },
      { en: "Centuries of life", ar: "قرون من العمر" },
    ],
    origin: {
      en: "The teacher at Kamar-Taj, who has kept Earth's defences standing for longer than anyone there is willing to ask about.",
      ar: "معلّمة كامار تاج، أبقت دفاعات الأرض قائمة مدة أطول مما يجرؤ أحد هناك على السؤال عنه.",
    },
    related: [
      { id: "doctor-strange", kind: "ally" },
      { id: "wong", kind: "ally" },
    ],
  },
  {
    id: "frigga",
    nameEn: "Frigga",
    nameAr: "فريغا",
    aliases: ["Frigga"],
    category: "supporting",
    affiliation: ["Asgard"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      { en: "Seer", ar: "بصيرة" },
      { en: "Illusion magic", ar: "سحر الأوهام" },
      { en: "Trained fighter", ar: "مقاتلة مدرَّبة" },
    ],
    origin: {
      en: "The queen of Asgard, who taught one of her sons everything he knows about illusion and was the only person in that house who ever really saw him.",
      ar: "ملكة أسجارد، علّمت أحد ابنيها كل ما يعرفه عن الأوهام، وكانت الوحيدة في ذلك البيت التي رأته حقًا.",
    },
    related: [
      { id: "thor", kind: "family" },
      { id: "loki", kind: "family" },
      { id: "odin", kind: "family" },
    ],
  },
  {
    id: "heimdall",
    nameEn: "Heimdall",
    nameAr: "هيمدال",
    aliases: ["Heimdall"],
    category: "supporting",
    affiliation: ["Asgard"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      { en: "Sees the nine realms", ar: "يرى العوالم التسعة" },
      { en: "Guards the Bifrost", ar: "يحرس البايفروست" },
    ],
    origin: {
      en: "The gatekeeper who can see and hear everything happening across the nine realms, and who has been quietly deciding what to report for a very long time.",
      ar: "حارس البوابة الذي يرى ويسمع كل ما يجري في العوالم التسعة، وظل زمنًا طويلًا يقرّر بهدوء ما الذي يبلّغ عنه.",
    },
    related: [
      { id: "thor", kind: "ally" },
    ],
  },
  {
    id: "happy-hogan",
    nameEn: "Happy Hogan",
    nameAr: "هابي هوغان",
    aliases: ["Happy Hogan", "Harold Hogan"],
    category: "supporting",
    affiliation: ["Stark Industries"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Head of security", ar: "رئيس الأمن" },
      { en: "Former boxer", ar: "ملاكم سابق" },
    ],
    origin: {
      en: "Stark's driver, then his head of security, then the closest thing a teenager from Queens has to someone checking in on him.",
      ar: "سائق ستارك، ثم رئيس أمنه، ثم أقرب ما يكون إلى شخص يطمئن على مراهق من كوينز.",
    },
    related: [
      { id: "iron-man", kind: "ally" },
      { id: "spider-man", kind: "ally" },
    ],
  },
  {
    id: "peggy-carter",
    nameEn: "Peggy Carter",
    nameAr: "بيغي كارتر",
    aliases: ["Peggy Carter", "Margaret Carter"],
    category: "hero",
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu", "marvel-tv"],
    species: "Human",
    powers: [
      { en: "Founding S.H.I.E.L.D.", ar: "من مؤسسي شيلد" },
      { en: "Combat training", ar: "تدريب قتالي" },
      { en: "Intelligence officer", ar: "ضابطة استخبارات" },
    ],
    origin: {
      en: "The officer who ran the programme that made a super-soldier, and then spent the years after the war building the agency that would look for him.",
      ar: "الضابطة التي أدارت البرنامج الذي صنع جنديًا خارقًا، ثم أمضت سنوات ما بعد الحرب تبني الوكالة التي ستبحث عنه.",
    },
    related: [
      { id: "captain-carter", kind: "variant" },
      { id: "captain-america", kind: "family" },
      { id: "nick-fury", kind: "ally" },
    ],
  },
  {
    id: "jane-foster",
    nameEn: "Jane Foster",
    nameAr: "جين فوستر",
    /* SHE IS THE MIGHTY THOR, and searching that found nothing. Safe as an
       alias because no credit reads "Mighty Thor" — Natalie Portman is
       credited as "Jane Foster", so this widens the SEARCH without
       touching which films she derives. */
    aliases: ["Jane Foster", "Mighty Thor", "The Mighty Thor"],
    category: "hero",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Astrophysicist", ar: "عالمة فيزياء فلكية" },
      { en: "Wields Mjolnir", ar: "تحمل ميولنير" },
    ],
    origin: {
      en: "The astrophysicist who found a man falling out of the sky in New Mexico and was the only person in the desert treating it as data.",
      ar: "عالمة الفيزياء الفلكية التي وجدت رجلًا يسقط من السماء في نيومكسيكو، وكانت الوحيدة في الصحراء التي تعاملت مع الأمر بوصفه بيانات.",
    },
    related: [
      { id: "thor", kind: "family" },
    ],
  },
  {
    id: "aunt-may",
    nameEn: "May Parker",
    nameAr: "ماي باركر",
    aliases: ["Aunt May", "May Parker"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu", "sony"],
    species: "Human",
    powers: [
      { en: "Raises him", ar: "تربّيه" },
      { en: "Runs a shelter", ar: "تدير مأوى" },
    ],
    origin: {
      en: "The aunt who raised him, and the person every version of this story eventually has to be honest with.",
      ar: "العمّة التي ربّته، والشخص الذي يضطر كل إصدار من هذه القصة أن يصدق معه في النهاية.",
    },
    related: [
      { id: "spider-man", kind: "family" },
    ],
  },
  {
    id: "miek",
    nameEn: "Miek",
    nameAr: "ميك",
    aliases: ["Miek"],
    category: "hero",
    affiliation: ["Revengers"],
    universe: ["mcu"],
    species: "Insectivorid",
    powers: [
      { en: "Blades for hands", ar: "نصال بدل اليدين" },
      { en: "Says nothing anyone follows", ar: "يقول ما لا يفهمه أحد" },
      { en: "Korg carries him", ar: "كورغ يحمله" },
    ],
    origin: {
      en: "An insectivorid gladiator who lost his legs and had knives fitted instead, and who has followed Korg out of the arena and into everything since.",
      ar: "مصارع حشري فقد ساقيه فرُكّبت له سكاكين مكانهما، وتبع كورغ خارج الحلبة وإلى كل ما تلا ذلك.",
    },
    /* Credited in Love and Thunder and Planet Hulk. In Ragnarok and Endgame he
       is a puppet nobody is credited for — the same gap Lockjaw has. */
    alsoIn: ["thor-ragnarok", "avengers-endgame"],
    related: [{ id: "korg", kind: "ally" }],
  },

  {
    id: "korg",
    nameEn: "Korg",
    nameAr: "كورغ",
    aliases: ["Korg"],
    category: "supporting",
    affiliation: ["Asgard", "Revengers"],
    universe: ["mcu"],
    species: "Kronan",
    powers: [
      { en: "Rock body", ar: "جسد صخري" },
      { en: "Great strength", ar: "قوة هائلة" },
    ],
    origin: {
      en: "A Kronan gladiator made of rock, permanently and cheerfully unbothered by anything happening around him.",
      ar: "مصارع كروناني من صخر، غير مكترث على الدوام وبمرح بكل ما يجري حوله.",
    },
    related: [
      { id: "thor", kind: "ally" },
    ],
  },
  {
    id: "ramonda",
    nameEn: "Ramonda",
    nameAr: "راموندا",
    aliases: ["Ramonda"],
    category: "supporting",
    affiliation: ["Wakanda", "Wakandan heroes"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Queen mother", ar: "الملكة الأم" },
      { en: "Head of state", ar: "رئيسة دولة" },
    ],
    origin: {
      en: "The queen mother of Wakanda, who has buried more of her family than any throne should ask of one person and has kept the country standing anyway.",
      ar: "الملكة الأم في واكاندا، دفنت من عائلتها أكثر مما ينبغي لعرش أن يطلبه من شخص واحد، وأبقت البلاد قائمة رغم ذلك.",
    },
    related: [
      { id: "black-panther", kind: "family" },
      { id: "shuri", kind: "family" },
    ],
  },
  {
    id: "hank-pym",
    nameEn: "Hank Pym",
    nameAr: "هانك بيم",
    aliases: ["Hank Pym", "Dr. Hank Pym"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Invented the particle", ar: "مخترع الجسيم" },
      { en: "Quantum physicist", ar: "فيزيائي كمّي" },
    ],
    origin: {
      en: "The scientist who discovered how to change the distance between atoms, and then spent decades refusing to let anyone else have it.",
      ar: "العالِم الذي اكتشف كيف تُغيَّر المسافة بين الذرات، ثم أمضى عقودًا يرفض أن يمنح ذلك لأحد.",
    },
    related: [
      { id: "ant-man", kind: "ally" },
      { id: "wasp", kind: "family" },
    ],
  },
  {
    id: "janet-van-dyne",
    nameEn: "Janet van Dyne",
    nameAr: "جانيت فان دين",
    aliases: ["Janet Van Dyne", "Janet van Dyne"],
    category: "hero",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Changes size", ar: "تغيّر حجمها" },
      { en: "Thirty years in the quantum realm", ar: "ثلاثون عامًا في العالم الكمّي" },
    ],
    origin: {
      en: "The first Wasp, lost below the smallest scale there is for thirty years, and the only person alive who knows what is down there.",
      ar: "أول واسب، ضاعت تحت أصغر مقياس ممكن ثلاثين عامًا، وهي الوحيدة الحية التي تعرف ما يوجد هناك.",
    },
    related: [
      { id: "hank-pym", kind: "family" },
      { id: "wasp", kind: "family" },
    ],
  },
  {
    id: "thaddeus-ross",
    /**
     * RED HULK IS THE HEADLINE, Thaddeus Ross is the man.
     *
     * The record is one person either way — the split into two cost him half
     * his appearances, because credits match on aliases. What changes here is
     * only which of his names leads: a reader browsing a grid of faces is
     * looking for Red Hulk, and "Thaddeus Ross" is what they find once they
     * are already on his page.
     *
     * The `id` stays `thaddeus-ross`. It is the man's name, it is stable, and
     * renaming it would break every link and every relation pointing at it for
     * a cosmetic gain.
     */
    nameEn: "Red Hulk",
    nameAr: "هَلك الأحمر",
    aliases: [
      "Red Hulk",
      "Thaddeus Ross",
      "Thunderbolt Ross",
      "General Ross",
      "Secretary of State Thaddeus Ross",
      /* Brave New World credits Harrison Ford as PRESIDENT Thaddeus Ross —
         a title the matcher has no reason to know is a title. */
      "President Thaddeus Ross",
    ],
    category: "antivillain",
    affiliation: ["Hulks"],
    universe: ["mcu", "animation"],
    species: "Human",
    powers: [
      { en: "Commands the hunt", ar: "يقود المطاردة" },
      { en: "Secretary of State", ar: "وزير الخارجية" },
      { en: "Becomes the Red Hulk", ar: "يتحوّل إلى هَلك الأحمر" },
      { en: "Keeps his own mind", ar: "يحتفظ بعقله" },
    ],
    origin: {
      en: "The general who spent a career hunting the Hulk, then spent the years after it in government still convinced he was the only adult in the room. What he eventually becomes is the thing he built his life around destroying.",
      ar: "الجنرال الذي أمضى مسيرته يطارد هَلك، ثم أمضى ما بعدها في الحكم مقتنعًا بأنه الراشد الوحيد في الغرفة. وما يصير إليه في النهاية هو عين ما بنى حياته على تدميره.",
    },
    related: [
      { id: "hulk", kind: "enemy" },
      { id: "betty-ross", kind: "family" },
      { id: "abomination", kind: "ally" },
    ],
  },
  {
    id: "maria-hill",
    nameEn: "Maria Hill",
    nameAr: "ماريا هيل",
    aliases: ["Maria Hill", "Agent Maria Hill", "Agent Hill"],
    category: "supporting",
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Deputy director", ar: "نائبة المدير" },
      { en: "Field command", ar: "قيادة ميدانية" },
    ],
    origin: {
      en: "The deputy who actually runs the agency day to day, and the one person its director tells the truth to first.",
      ar: "النائبة التي تدير الوكالة فعليًا يومًا بيوم، والشخص الوحيد الذي يصارحه مديرها أولًا.",
    },
    related: [
      { id: "nick-fury", kind: "ally" },
    ],
  },
  {
    id: "kraglin",
    nameEn: "Kraglin",
    nameAr: "كراغلين",
    aliases: ["Kraglin", "Kraglin Obfonteri"],
    category: "supporting",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Xandarian",
    powers: [
      { en: "The yaka arrow", ar: "سهم الياكا" },
      { en: "Pilot", ar: "طيّار" },
    ],
    origin: {
      en: "A Ravager who stayed when the rest left, and inherited a weapon he was nowhere near ready to use.",
      ar: "أحد الرافيجرز بقي حين رحل الباقون، فورث سلاحًا لم يكن مستعدًا لاستخدامه إطلاقًا.",
    },
    related: [
      { id: "rocket", kind: "ally" },
    ],
  },
  {
    id: "mbaku",
    nameEn: "M'Baku",
    nameAr: "إمباكو",
    aliases: ["M'Baku"],
    category: "antihero",
    affiliation: ["Wakanda", "Wakandan heroes"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Leads the Jabari", ar: "يقود الجباري" },
      { en: "Enormous strength", ar: "قوة هائلة" },
    ],
    origin: {
      en: "The leader of the mountain tribe that walked away from Wakanda's throne generations ago and has been loudly unimpressed ever since.",
      ar: "زعيم قبيلة الجبل التي انفصلت عن عرش واكاندا قبل أجيال، وظل معلنًا عدم إعجابه منذ ذلك الحين.",
    },
    related: [
      { id: "black-panther", kind: "ally" },
    ],
  },
  {
    id: "ebony-maw",
    nameEn: "Ebony Maw",
    nameAr: "إيبوني ماو",
    aliases: ["Ebony Maw"],
    category: "villain",
    affiliation: ["Black Order"],
    universe: ["mcu"],
    species: "Titan",
    powers: [
      { en: "Telekinesis", ar: "تحريك الأشياء بالعقل" },
      { en: "Persuasion", ar: "إقناع" },
    ],
    origin: {
      en: "The Black Order's speaker: the one who arrives first, explains why resistance is beneath everyone, and means it.",
      ar: "المتحدث باسم النظام الأسود: أول من يصل، ويشرح لماذا المقاومة دون الجميع، وهو يعني ذلك.",
    },
    related: [
      { id: "thanos", kind: "ally" },
      { id: "doctor-strange", kind: "enemy" },
    ],
  },
  {
    id: "proxima-midnight",
    nameEn: "Proxima Midnight",
    nameAr: "بروكسيما ميدنايت",
    aliases: ["Proxima Midnight"],
    category: "villain",
    affiliation: ["Black Order"],
    universe: ["mcu"],
    species: "Titan",
    powers: [
      { en: "The midnight spear", ar: "رمح منتصف الليل" },
      { en: "Combat training", ar: "تدريب قتالي" },
    ],
    origin: {
      en: "One of Thanos's adopted children and the Black Order's best fighter, carrying a spear that tracks what it is thrown at.",
      ar: "إحدى أبناء ثانوس بالتبنّي وأفضل مقاتلي النظام الأسود، تحمل رمحًا يتعقّب ما يُقذف نحوه.",
    },
    related: [
      { id: "thanos", kind: "family" },
      { id: "corvus-glaive", kind: "family" },
    ],
  },
  {
    id: "corvus-glaive",
    nameEn: "Corvus Glaive",
    nameAr: "كورفوس غليف",
    aliases: ["Corvus Glaive"],
    category: "villain",
    affiliation: ["Black Order"],
    universe: ["mcu"],
    species: "Titan",
    powers: [
      { en: "A blade that cuts anything", ar: "نصل يقطع كل شيء" },
      { en: "Enhanced strength", ar: "قوة معزّزة" },
    ],
    origin: {
      en: "Thanos's most loyal adopted son, and the one carrying the weapon that made the others stop arguing.",
      ar: "أكثر أبناء ثانوس بالتبنّي ولاءً، وحامل السلاح الذي أسكت جدال الآخرين.",
    },
    related: [
      { id: "thanos", kind: "family" },
      { id: "proxima-midnight", kind: "family" },
    ],
  },
  {
    id: "cull-obsidian",
    nameEn: "Cull Obsidian",
    nameAr: "كول أوبسيديان",
    aliases: ["Cull Obsidian", "Black Dwarf"],
    category: "villain",
    affiliation: ["Black Order"],
    universe: ["mcu"],
    species: "Titan",
    powers: [
      { en: "Enormous strength", ar: "قوة هائلة" },
      { en: "Near-invulnerable", ar: "يكاد لا يُجرَح" },
    ],
    origin: {
      en: "The Black Order's largest member, brought along for the parts of a conquest that do not require a conversation.",
      ar: "أضخم أعضاء النظام الأسود، يُصطحب لأجزاء الغزو التي لا تحتاج إلى حوار.",
    },
    related: [
      { id: "thanos", kind: "ally" },
    ],
  },
  {
    id: "eitri",
    nameEn: "Eitri",
    nameAr: "إيتري",
    aliases: ["Eitri"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Dwarf",
    powers: [
      { en: "Forges for gods", ar: "يصنع أسلحة الآلهة" },
      { en: "Master smith", ar: "حدّاد بارع" },
    ],
    origin: {
      en: "The king of the forge that made most of Asgard's weapons, and the last of the smiths who worked there.",
      ar: "ملك المصهر الذي صنع معظم أسلحة أسجارد، وآخر الحدّادين الذين عملوا فيه.",
    },
    related: [
      { id: "thor", kind: "ally" },
    ],
  },
  {
    id: "the-collector",
    nameEn: "The Collector",
    nameAr: "الجامع",
    aliases: ["The Collector", "Taneleer Tivan"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Collects everything", ar: "يجمع كل شيء" },
      { en: "Older than most species", ar: "أقدم من معظم الأنواع" },
    ],
    origin: {
      en: "One of the oldest beings alive, who has spent that life acquiring one of everything and does not distinguish between an object and a person.",
      ar: "أحد أقدم الكائنات الحية، أمضى عمره يقتني واحدًا من كل شيء، ولا يفرّق بين شيء وشخص.",
    },
    related: [
      { id: "grandmaster", kind: "family" },
    ],
  },
  {
    id: "grandmaster",
    nameEn: "The Grandmaster",
    nameAr: "الغراند ماستر",
    aliases: ["Grandmaster", "The Grandmaster", "En Dwi Gast"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Runs the games", ar: "يدير الألعاب" },
      { en: "Older than most species", ar: "أقدم من معظم الأنواع" },
    ],
    origin: {
      en: "Another Elder, running a planet as an arena because he found it more entertaining than governing one.",
      ar: "شيخ آخر من شيوخ الكون، يدير كوكبًا بوصفه حلبة لأنه وجد ذلك أطرف من حكمه.",
    },
    related: [
      { id: "the-collector", kind: "family" },
      { id: "thor", kind: "enemy" },
    ],
  },
  {
    id: "howard-stark",
    nameEn: "Howard Stark",
    nameAr: "هوارد ستارك",
    aliases: ["Howard Stark"],
    category: "supporting",
    affiliation: ["S.H.I.E.L.D.", "Stark Industries"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Engineer and financier", ar: "مهندس وممول" },
      { en: "Founded S.H.I.E.L.D.", ar: "من مؤسسي شيلد" },
    ],
    origin: {
      en: "The engineer who built the machine that made a super-soldier, founded the agency that came after, and was a much better inventor than father.",
      ar: "المهندس الذي بنى الآلة التي صنعت جنديًا خارقًا، وأسّس الوكالة التي جاءت بعدها، وكان مخترعًا أفضل بكثير مما كان أبًا.",
    },
    related: [
      { id: "iron-man", kind: "family" },
      { id: "captain-america", kind: "ally" },
      { id: "peggy-carter", kind: "ally" },
    ],
  },
  {
    id: "ayo",
    nameEn: "Ayo",
    nameAr: "آيو",
    aliases: ["Ayo"],
    category: "supporting",
    affiliation: ["Wakanda", "Wakandan heroes"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Dora Milaje", ar: "من الدورا ميلاجي" },
      { en: "Vibranium spear", ar: "رمح فيبرانيوم" },
    ],
    origin: {
      en: "One of the Dora Milaje, and the one most willing to say out loud when the throne is wrong.",
      ar: "إحدى الدورا ميلاجي، وأكثرهن استعدادًا لتقول بصوت عالٍ إن العرش مخطئ.",
    },
    related: [
      { id: "okoye", kind: "ally" },
    ],
  },
];

/**
 * THE ABSTRACTS — the layer above the cosmic one.
 *
 * These are not people with powers, they are forces with names, and the corpus
 * has to say so rather than filing them next to Iron Man. Eternity is not
 * strong; Eternity is everything that is. The distinction matters on a site
 * whose whole job is telling a beginner what they are looking at.
 *
 * Almost none of them have appeared on film, which is the point: a reader who
 * finishes the Multiverse Saga and asks "who is above Kang" should find the
 * answer here rather than on a forum. `appearances` stays derived, so the ones
 * with no screen time correctly show none.
 */
const abstracts: CharacterDraft[] = [
  {
    id: "the-one-above-all",
    nameEn: "The One Above All",
    nameAr: "الواحد فوق الجميع",
    aliases: ["The One Above All"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Omnipotence", ar: "قدرة مطلقة" },
      { en: "Author of everything", ar: "مؤلّف كل شيء" },
    ],
    origin: {
      en: "The top of the Marvel hierarchy, and the only figure in it with no equal and no opposite. Every other power here answers to it, including the ones that answer to nobody else.",
      ar: "قمة التسلسل في عالم مارفل، والوحيد فيه بلا نظير ولا نقيض. كل قوة أخرى هنا تخضع له، بما فيها تلك التي لا تخضع لأحد سواه.",
    },
    related: [
      { id: "the-living-tribunal", kind: "ally" },
      { id: "the-one-below-all", kind: "enemy" },
    ],
  },
  {
    id: "the-living-tribunal",
    nameEn: "The Living Tribunal",
    nameAr: "المحكمة الحيّة",
    aliases: ["The Living Tribunal", "Living Tribunal"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Judges whole universes", ar: "يحاكم أكوانًا بأكملها" },
      { en: "Three faces, one verdict", ar: "ثلاثة وجوه وحكم واحد" },
      { en: "Above every cosmic power", ar: "فوق كل قوة كونية" },
    ],
    origin: {
      en: "Three faces on one head (equity, necessity, vengeance) and no ruling until all three agree. It does not police people. It rules on whether a universe may continue.",
      ar: "ثلاثة وجوه على رأس واحد: الإنصاف والضرورة والانتقام، ولا حكم حتى تتفق الثلاثة. لا يحاسب الأفراد، بل يقضي في بقاء كون بأسره.",
    },
    related: [
      { id: "the-one-above-all", kind: "ally" },
      { id: "eternity", kind: "ally" },
    ],
  },
  {
    id: "eternity",
    nameEn: "Eternity",
    nameAr: "الأزَل",
    aliases: ["Eternity"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Is the universe", ar: "هو الكون ذاته" },
      { en: "Reality on any scale", ar: "تصريف الواقع بأي مقياس" },
    ],
    origin: {
      en: "Not a being in the universe: the universe, aware of itself and wearing a shape so that anyone can hold a conversation with it. Sibling to Infinity, opposite of Death.",
      ar: "ليس كائنًا في الكون، بل الكون نفسه واعيًا بذاته، متّخذًا هيئةً كي يستطيع أحدٌ محادثته. شقيق اللانهاية ونقيض الموت.",
    },
    /* At the centre of the universe in the last act, granting the wish the
       whole film is about. No actor is credited because it is an effect, so
       nothing reading the cast can find it — the `alsoIn` case exactly. */
    alsoIn: ["thor-love-and-thunder"],
    related: [
      { id: "infinity", kind: "family" },
      { id: "death", kind: "enemy" },
      { id: "oblivion", kind: "enemy" },
    ],
  },
  {
    id: "infinity",
    nameEn: "Infinity",
    nameAr: "اللانهاية",
    aliases: ["Infinity"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Embodies all of space", ar: "تجسيد المكان كله" },
      { en: "Unbounded scale", ar: "مقياس بلا حدود" },
    ],
    origin: {
      en: "Space, as Eternity is time: the two halves of the same statement about what exists. Where Eternity is asked about the story, Infinity is asked about the room it happens in.",
      ar: "المكان، كما أن الأزل هو الزمان: نصفان لعبارة واحدة عمّا هو كائن. يُسأل الأزل عن الحكاية، وتُسأل اللانهاية عن الفضاء الذي تقع فيه.",
    },
    related: [
      { id: "eternity", kind: "family" },
      { id: "oblivion", kind: "enemy" },
    ],
  },
  {
    id: "death",
    nameEn: "Death",
    nameAr: "الموت",
    /* Agatha All Along credits her as RIO VIDAL and never as Death, which is
       the reveal the season is built on. The alias is how the show enters
       her list without anybody hand-listing an appearance. */
    aliases: ["Death", "Mistress Death", "Lady Death", "Rio Vidal"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Embodies all ending", ar: "تجسيد كل انتهاء" },
      { en: "Cannot be refused", ar: "لا تُرَدّ" },
    ],
    origin: {
      en: "The end of things, given a form. Thanos courts her, and the comics are clear that the courtship is one-sided: which reframes half of what he does as a man trying to impress someone.",
      ar: "نهاية الأشياء في هيئة. يتودّد إليها ثانوس، والقصص المصوّرة واضحة أن الودّ من طرف واحد، وهو ما يجعل نصف أفعاله محاولة رجل لإبهار أحد.",
    },
    related: [
      { id: "thanos", kind: "enemy" },
      { id: "eternity", kind: "enemy" },
    ],
  },
  {
    id: "oblivion",
    nameEn: "Oblivion",
    nameAr: "العدم",
    aliases: ["Oblivion"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Embodies nothingness", ar: "تجسيد اللاشيء" },
      { en: "Wants existence undone", ar: "يريد فناء الوجود" },
    ],
    origin: {
      en: "The absence that existence is measured against, and the only one of these with an agenda: it would prefer there to be nothing, and it works towards that.",
      ar: "الغياب الذي يُقاس عليه الوجود، وهو الوحيد من هؤلاء صاحب غاية: يفضّل ألّا يكون شيء، ويسعى إلى ذلك.",
    },
    related: [
      { id: "eternity", kind: "enemy" },
      { id: "infinity", kind: "enemy" },
    ],
  },
  {
    id: "the-one-below-all",
    nameEn: "The One Below All",
    nameAr: "الواحد تحت الجميع",
    aliases: ["The One Below All"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "The dark half of creation", ar: "النصف المظلم للخلق" },
      { en: "Speaks through gamma", ar: "يتكلّم عبر أشعة غاما" },
    ],
    origin: {
      en: "The One Above All's opposite, sitting at the bottom of the same ladder. It reaches into the world through gamma radiation, which is why the Hulk keeps ending up its doorway.",
      ar: "نقيض الواحد فوق الجميع، يجلس في أسفل السلّم نفسه. يمدّ يده إلى العالم عبر أشعة غاما، ولهذا يظل هَلك بابه إلى الحياة.",
    },
    related: [
      { id: "the-one-above-all", kind: "enemy" },
      { id: "hulk", kind: "enemy" },
    ],
  },
  {
    id: "the-beyonder",
    nameEn: "The Beyonder",
    nameAr: "البِيونْدر",
    aliases: ["The Beyonder", "Beyonder"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Remakes reality at will", ar: "يعيد صوغ الواقع كما يشاء" },
      { en: "Builds worlds to test people", ar: "يبني عوالم ليختبر البشر" },
    ],
    origin: {
      en: "A being from outside every universe who took an interest in ours, pulled its heroes and villains onto a planet he assembled, and told them to fight. That was Secret Wars, the first one.",
      ar: "كائن من خارج كل الأكوان اهتم بكوننا، فانتزع أبطاله وأشراره إلى كوكب ركّبه بنفسه وأمرهم بالقتال. تلك كانت حروب سرّية، الأولى.",
    },
    related: [
      { id: "molecule-man", kind: "enemy" },
      { id: "doctor-doom", kind: "enemy" },
    ],
  },
  {
    id: "the-watcher",
    nameEn: "The Watcher",
    nameAr: "المراقِب",
    aliases: ["The Watcher", "Uatu", "Uatu the Watcher"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu", "legacy"],
    species: "Watcher",
    powers: [
      { en: "Sees every timeline", ar: "يرى كل خط زمني" },
      { en: "Sworn never to interfere", ar: "أقسم ألّا يتدخّل" },
    ],
    origin: {
      en: "One of a species that watches and records and takes an oath never to act. The whole drama of the character is the pressure on that oath, and what it costs him the one time it breaks.",
      ar: "من جنسٍ يراقب ويسجّل ويقسم ألّا يتدخّل. دراما الشخصية كلها في الضغط على ذلك القسم، وفي ثمنه حين ينكسر مرة واحدة.",
    },
    /* The Watchers Stan Lee is telling his stories to, in the Vol. 2 credits
       scene. He is credited — as "Watcher Informant" — and they are not,
       which is why no rule reading the cast can find them. */
    alsoIn: ["guardians-of-the-galaxy-vol-2"],
    related: [{ id: "sylvie", kind: "ally" }],
  },
  {
    id: "molecule-man",
    nameEn: "Molecule Man",
    nameAr: "رجل الجزيئات",
    aliases: ["Molecule Man", "Owen Reece"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Human",
    powers: [
      { en: "Control of all matter", ar: "تحكّم في كل مادة" },
      { en: "Holds a multiverse together", ar: "يمسك متعدد الأكوان" },
    ],
    origin: {
      en: "A lab technician caught in an accident who came out able to rearrange matter itself, and spent decades being written as a nervous man who happens to be one of the strongest beings alive.",
      ar: "فنّي مختبر أصابه حادث فخرج قادرًا على إعادة ترتيب المادة نفسها، وظل عقودًا يُكتب رجلًا قلقًا يصادف أنه من أقوى الكائنات.",
    },
    related: [{ id: "the-beyonder", kind: "enemy" }],
  },
  {
    id: "the-runner",
    nameEn: "The Runner",
    nameAr: "العدّاء",
    aliases: ["The Runner", "Gilpetperdon"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Elder of the Universe",
    powers: [
      { en: "Faster than light", ar: "أسرع من الضوء" },
      { en: "Billions of years old", ar: "عمره مليارات السنين" },
    ],
    origin: {
      en: "An Elder of the Universe, like the Collector and the Grandmaster, and among the oldest living things. His obsession is simply movement: he has spent an age crossing the universe for its own sake.",
      ar: "شيخ من شيوخ الكون، كالجامع والغراند ماستر، ومن أقدم الأحياء. هوسه الحركة وحدها: أمضى دهرًا يجوب الكون لأجل الجوب نفسه.",
    },
    related: [
      { id: "the-collector", kind: "family" },
      { id: "grandmaster", kind: "family" },
    ],
  },
  {
    id: "knull",
    nameEn: "Knull",
    nameAr: "نال",
    aliases: ["Knull", "The King in Black"],
    category: "villain",
    affiliation: ["Symbiotes", "Cosmic entities"],
    universe: ["sony", "legacy"],
    species: "Symbiote god",
    powers: [
      { en: "Made the symbiotes", ar: "خلق السمبيوتات" },
      { en: "Forged from living darkness", ar: "مصوغ من ظلام حيّ" },
      { en: "Commands every symbiote", ar: "يأمر كل سمبيوت" },
    ],
    origin: {
      en: "The god who was there before the light, who forged a blade out of living darkness and made the symbiotes from his own substance. Every one of them, Venom included, is a piece of him that got away.",
      ar: "الإله الذي سبق النور، صاغ نصلًا من ظلام حيّ وخلق السمبيوتات من مادته. كل واحد منها، ومنها فينوم، قطعةٌ منه أفلتت.",
    },
    related: [
      { id: "venom", kind: "enemy" },
      { id: "carnage", kind: "family" },
    ],
  },
  {
    id: "dormammu",
    nameEn: "Dormammu",
    nameAr: "دورمامو",
    aliases: ["Dormammu"],
    category: "villain",
    affiliation: ["Magic"],
    universe: ["mcu", "legacy"],
    species: "Demon",
    powers: [
      { en: "Rules the Dark Dimension", ar: "يحكم البعد المظلم" },
      { en: "Devours whole worlds", ar: "يلتهم عوالم كاملة" },
      { en: "Outside time", ar: "خارج الزمن" },
    ],
    origin: {
      en: "The ruler of a dimension where time does not pass, who offers eternal life to anyone who will open a door for him and then eats the world behind it. Doctor Strange's oldest opponent.",
      ar: "حاكم بُعدٍ لا يمضي فيه الزمن، يَعِد بالحياة الأبدية كل من يفتح له بابًا، ثم يلتهم العالم خلفه. أقدم خصوم دكتور سترينج.",
    },
    related: [
      { id: "doctor-strange", kind: "enemy" },
      { id: "the-ancient-one", kind: "enemy" },
    ],
  },
];

/**
 * THE CELESTIALS — the ones that are the size of the problem.
 *
 * Filed apart from the abstracts because they are physically present in a way
 * Eternity is not: a Celestial can be stood next to, and in Eternals one of
 * them is a mountain range. The MCU made them the reason humanity exists,
 * which is a better hook than "very large space god".
 */
const celestials: CharacterDraft[] = [
  {
    id: "arishem",
    nameEn: "Arishem the Judge",
    nameAr: "أريشيم القاضي",
    aliases: ["Arishem", "Arishem the Judge"],
    category: "villain",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      { en: "Seeds worlds with life", ar: "يبذر الحياة في العوالم" },
      { en: "Judges a planet's fate", ar: "يقضي في مصير كوكب" },
      { en: "Built the Eternals", ar: "صنع الأزليين" },
    ],
    origin: {
      en: "The Celestial who plants a seed in a world, lets intelligent life grow on it for millennia as fuel, and then harvests it. He made the Eternals, and told them a story about why they were sent.",
      ar: "السماوي الذي يزرع بذرةً في عالم، ويترك الحياة الذكية تنمو عليه آلاف السنين وقودًا، ثم يحصده. صنع الأزليين وروى لهم حكايةً عن سبب إرسالهم.",
    },
    related: [
      { id: "ikaris", kind: "enemy" },
      { id: "tiamut", kind: "family" },
    ],
  },
  {
    id: "tiamut",
    nameEn: "Tiamut",
    nameAr: "تياموت",
    aliases: ["Tiamut", "Tiamut the Communicator"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      { en: "A world grew around him", ar: "نما حوله عالم" },
      { en: "Celestial scale", ar: "بحجم السماويين" },
    ],
    origin: {
      en: "The Celestial seeded inside the Earth. The planet is his egg, everything living on it is what he needs to hatch, and the Eternals were sent to make sure nothing interrupted that.",
      ar: "السماوي المزروع داخل الأرض. الكوكب بيضته، وكل ما يحيا عليه هو ما يحتاجه ليفقس، وأُرسل الأزليون كي لا يقاطع ذلك شيء.",
    },
    /* The Celestial emerging from the ocean is the whole ending. No actor, so no credit. */
    alsoIn: ["eternals"],
    related: [
      { id: "arishem", kind: "family" },
      { id: "sersi", kind: "enemy" },
    ],
  },
  {
    id: "eson",
    nameEn: "Eson the Searcher",
    nameAr: "إيسون الباحث",
    aliases: ["Eson", "Eson the Searcher"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      { en: "Wielded the Power Stone", ar: "حمل حجر القوة" },
      { en: "Erased a world with a touch", ar: "محا عالمًا بلمسة" },
    ],
    origin: {
      en: "The Celestial seen in a flashback holding the Power Stone bare-handed and wiping out a civilisation with it: the one image that establishes what an Infinity Stone actually does.",
      ar: "السماوي الذي يظهر في مشهد استرجاعي حاملًا حجر القوة بيده العارية فيمحو حضارةً به، وهي الصورة التي تُثبت ما يفعله حجر اللانهاية فعلًا.",
    },
    /* The Collector's flashback in Guardians of the Galaxy — a Celestial
       wiping out a world with the Power Stone. Entirely CGI, so nobody is
       credited for it. */
    alsoIn: ["guardians-of-the-galaxy"],
    related: [{ id: "arishem", kind: "family" }],
  },
];

/**
 * THE ETERNALS — ten of them, and the film's argument only works if you can
 * tell them apart, which is exactly the job of a page like this.
 */
const eternals: CharacterDraft[] = [
  {
    id: "ikaris",
    nameEn: "Ikaris",
    nameAr: "إيكاريس",
    aliases: ["Ikaris"],
    category: "antivillain",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Flight", ar: "طيران" },
      { en: "Cosmic beams from the eyes", ar: "أشعة كونية من العينين" },
      { en: "Near invulnerability", ar: "شبه منيع" },
    ],
    origin: {
      en: "The strongest of the ten and the one who believes hardest in the mission. When the mission turns out to be what it is, he does not stop believing, and that is the whole tragedy of him.",
      ar: "أقوى العشرة وأشدّهم إيمانًا بالمهمة. وحين تتكشّف المهمة على حقيقتها لا يكفّ عن الإيمان، وتلك مأساته كلها.",
    },
    related: [
      { id: "sersi", kind: "family" },
      { id: "arishem", kind: "ally" },
      { id: "sprite", kind: "ally" },
    ],
  },
  {
    id: "sersi",
    nameEn: "Sersi",
    nameAr: "سيرسي",
    aliases: ["Sersi"],
    category: "hero",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Transmutes matter by touch", ar: "تحوّل المادة باللمس" },
      { en: "Millennia of practice", ar: "خبرة آلاف السنين" },
    ],
    origin: {
      en: "The Eternal who liked humans most and lived among them longest, which is why the decision at the end falls to her rather than to the strongest one.",
      ar: "الأزلية الأكثر حبًّا للبشر والأطول عيشًا بينهم، ولهذا يقع القرار في النهاية عليها لا على الأقوى.",
    },
    related: [
      { id: "ikaris", kind: "family" },
      { id: "tiamut", kind: "enemy" },
    ],
  },
  {
    id: "thena",
    nameEn: "Thena",
    nameAr: "ثينا",
    aliases: ["Thena"],
    category: "hero",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Forms any weapon from energy", ar: "تصوغ أي سلاح من الطاقة" },
      { en: "Unmatched as a fighter", ar: "لا تُبارى في القتال" },
    ],
    origin: {
      en: "The team's warrior, carrying thousands of years of memory that will not stay in order. The film treats that as an illness rather than a plot device, and Gilgamesh is the one who stays.",
      ar: "محاربة الفريق، تحمل آلاف السنين من الذكريات التي لا تستقر في ترتيبها. يعامل الفيلم ذلك مرضًا لا حيلةً سردية، ويظل جلجامش هو الباقي معها.",
    },
    related: [
      { id: "gilgamesh", kind: "ally" },
      { id: "ajak", kind: "ally" },
    ],
  },
  {
    id: "ajak",
    nameEn: "Ajak",
    nameAr: "آجاك",
    aliases: ["Ajak"],
    category: "hero",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Healing", ar: "شفاء" },
      { en: "Speaks to the Celestials", ar: "تحادث السماويين" },
    ],
    origin: {
      en: "The leader, and the only one Arishem talks to directly. That channel is the reason she learns the truth first, and the reason knowing it is dangerous.",
      ar: "القائدة، والوحيدة التي يخاطبها أريشيم مباشرة. تلك القناة سبب معرفتها الحقيقة أولًا، وسبب خطورة معرفتها.",
    },
    related: [
      { id: "ikaris", kind: "family" },
      { id: "arishem", kind: "ally" },
    ],
  },
  {
    id: "kingo",
    nameEn: "Kingo",
    nameAr: "كينغو",
    aliases: ["Kingo"],
    category: "hero",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Projectiles of cosmic energy", ar: "قذائف من طاقة كونية" },
      { en: "A very long film career", ar: "مسيرة سينمائية طويلة جدًا" },
    ],
    origin: {
      en: "Spent the modern era as a Bollywood star, playing his own descendants down the generations so nobody notices he does not age. The joke and the loneliness are the same fact.",
      ar: "أمضى العصر الحديث نجمًا في بوليوود، يؤدي أدوار أحفاده جيلًا بعد جيل كي لا ينتبه أحد أنه لا يشيخ. النكتة والوحدة هنا شيء واحد.",
    },
    related: [{ id: "sprite", kind: "ally" }],
  },
  {
    id: "sprite",
    nameEn: "Sprite",
    nameAr: "سبرايت",
    aliases: ["Sprite"],
    category: "antivillain",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Illusions of anything", ar: "أوهام لأي شيء" },
      { en: "Frozen as a child", ar: "متجمّدة في هيئة طفلة" },
    ],
    origin: {
      en: "Seven thousand years old and stuck looking twelve, watching everyone she has ever met grow up without her. Her grievance is the most understandable one in the film.",
      ar: "عمرها سبعة آلاف عام وهيئتها هيئة طفلة في الثانية عشرة، تشاهد كل من عرفتهم يكبرون من دونها. شكواها أكثر ما يمكن تفهّمه في الفيلم.",
    },
    related: [{ id: "ikaris", kind: "ally" }],
  },
  {
    id: "phastos",
    nameEn: "Phastos",
    nameAr: "فاستوس",
    aliases: ["Phastos"],
    category: "hero",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Invents any machine", ar: "يخترع أي آلة" },
      { en: "Weapons from raw cosmic energy", ar: "أسلحة من طاقة كونية خام" },
    ],
    origin: {
      en: "The inventor, who gave humanity most of its technology and then watched what it built with it. He quits over Hiroshima, and the film lets him be right.",
      ar: "المخترع الذي أهدى البشرية معظم تقنيتها ثم رأى ما بنته بها. اعتزل بعد هيروشيما، ويترك الفيلم له أن يكون على حق.",
    },
    related: [{ id: "sersi", kind: "ally" }],
  },
  {
    id: "makkari",
    nameEn: "Makkari",
    nameAr: "مكّاري",
    aliases: ["Makkari"],
    category: "hero",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Super speed", ar: "سرعة خارقة" },
      { en: "Reads faster than anyone alive", ar: "تقرأ أسرع من أي حيّ" },
    ],
    origin: {
      en: "The fastest of them, and the first deaf superhero to lead a scene in a Marvel film: the speed and the silence are shot as one idea rather than two.",
      ar: "أسرعهم، وأول بطلة خارقة صمّاء تقود مشهدًا في فيلم مارفل: تُصوَّر السرعة والصمت فكرةً واحدة لا فكرتين.",
    },
    related: [{ id: "druig", kind: "ally" }],
  },
  {
    id: "druig",
    nameEn: "Druig",
    nameAr: "درويغ",
    aliases: ["Druig"],
    category: "antihero",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "Controls minds", ar: "يتحكّم في العقول" },
      { en: "Can stop a war with a word", ar: "يوقف حربًا بكلمة" },
    ],
    origin: {
      en: "Able to end any human conflict instantly and forbidden to, for thousands of years, by a rule he did not agree to. He walks away and builds a village where he does it anyway.",
      ar: "قادر على إنهاء أي نزاع بشري في الحال وممنوع من ذلك آلاف السنين بقاعدة لم يوافق عليها. فينسحب ويبني قريةً يفعله فيها رغم ذلك.",
    },
    related: [{ id: "makkari", kind: "ally" }],
  },
  {
    id: "gilgamesh",
    nameEn: "Gilgamesh",
    nameAr: "جلجامش",
    aliases: ["Gilgamesh"],
    category: "hero",
    affiliation: ["Eternals"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      { en: "The strongest Eternal", ar: "أقوى الأزليين" },
      { en: "Cosmic exoskeleton", ar: "هيكل كوني خارجي" },
    ],
    origin: {
      en: "Physically the strongest of the ten, and the one who chose to spend centuries in exile looking after Thena rather than being anywhere more important.",
      ar: "أقواهم جسديًا، والذي اختار أن يمضي قرونًا في المنفى يرعى ثينا بدل أن يكون في مكان أهم.",
    },
    related: [{ id: "thena", kind: "ally" }],
  },
];

/**
 * THE INHUMANS — the royal family, filed together rather than scattered
 * through "supporting". Three of them were already here with no affiliation at
 * all, which made the Inhumans chip impossible to write.
 */
const inhumans: CharacterDraft[] = [
  {
    id: "karnak",
    nameEn: "Karnak",
    nameAr: "كارناك",
    aliases: ["Karnak", "Karnak Mander-Azur"],
    category: "hero",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "Sees the flaw in anything", ar: "يرى العيب في أي شيء" },
      { en: "Master martial artist", ar: "بارع في فنون القتال" },
    ],
    origin: {
      en: "The king's cousin and advisor, who never went through Terrigenesis and does not need to: he can look at any object, plan or person and find the exact point where it breaks.",
      ar: "ابن عم الملك ومستشاره، لم يخض تحوّل تيريجن ولا يحتاجه: ينظر إلى أي شيء أو خطة أو شخص فيجد النقطة التي ينكسر عندها بالضبط.",
    },
    related: [
      { id: "black-bolt", kind: "family" },
      { id: "gorgon", kind: "family" },
    ],
  },
  {
    id: "gorgon",
    nameEn: "Gorgon",
    nameAr: "غورغون",
    aliases: ["Gorgon", "Gorgon Petragon"],
    category: "hero",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "Hooves that split stone", ar: "حوافر تشقّ الحجر" },
      { en: "Shockwaves from a stamp", ar: "موجات صدمية من وقعة قدم" },
    ],
    origin: {
      en: "Head of the royal guard, cousin to the king, and the one whose Terrigenesis gave him hooves strong enough to crack a city block with a single stamp.",
      ar: "قائد الحرس الملكي وابن عم الملك، منحه تحوّل تيريجن حوافر تكفي وقعةٌ منها لشقّ حيّ بأكمله.",
    },
    related: [
      { id: "black-bolt", kind: "family" },
      { id: "karnak", kind: "family" },
    ],
  },
  {
    id: "maximus",
    nameEn: "Maximus",
    nameAr: "ماكسيموس",
    aliases: ["Maximus", "Maximus Boltagon", "Maximus the Mad"],
    category: "villain",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "Brilliant strategist", ar: "استراتيجي بارع" },
      { en: "Came out of Terrigenesis human", ar: "خرج من التحوّل بشريًا" },
    ],
    origin: {
      en: "The king's brother, who went through Terrigenesis and came out with nothing: in a society that sorts people by what the mist gives them. Every coup he stages starts there.",
      ar: "أخو الملك، خاض تحوّل تيريجن فخرج بلا شيء، في مجتمع يصنّف الناس بما يمنحهم الضباب. كل انقلاب يدبّره يبدأ من هناك.",
    },
    related: [
      { id: "black-bolt", kind: "family" },
      { id: "medusa", kind: "enemy" },
    ],
  },
  {
    id: "triton",
    nameEn: "Triton",
    nameAr: "تريتون",
    aliases: ["Triton"],
    category: "hero",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "Breathes water", ar: "يتنفّس تحت الماء" },
      { en: "Cannot survive long in air", ar: "لا يطيق الهواء طويلًا" },
    ],
    origin: {
      en: "Karnak's brother, whose Terrigenesis made him amphibious and, in the same stroke, unable to live on dry land for long. The gift and the exile arrived together.",
      ar: "أخو كارناك، جعله تحوّل تيريجن برمائيًا، وفي اللحظة نفسها عاجزًا عن العيش طويلًا على اليابسة. جاءت الهبة والنفي معًا.",
    },
    related: [{ id: "karnak", kind: "family" }],
  },
  {
    id: "lockjaw",
    nameEn: "Lockjaw",
    nameAr: "لوك‌جو",
    aliases: ["Lockjaw"],
    category: "supporting",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "Teleports anywhere", ar: "ينتقل آنيًا إلى أي مكان" },
      { en: "Very large dog", ar: "كلب ضخم جدًا" },
    ],
    origin: {
      en: "The royal family's dog, the size of a car, who can teleport anyone he is touching across the world or off it. He is also the reason most of their plots resolve.",
      ar: "كلب العائلة المالكة، بحجم سيارة، ينقل من يلمسه آنيًا عبر العالم أو خارجه. وهو أيضًا سبب انفراج معظم حبكاتهم.",
    },
    /* The teleporting dog. A CGI performance nobody is credited for. */
    alsoIn: ["marvels-inhumans"],
    related: [{ id: "black-bolt", kind: "family" }],
  },
];

/**
 * THE THUNDERBOLTS — a team assembled out of people who were introduced one at
 * a time across a decade, which is precisely the kind of thing a reader needs a
 * page for.
 */
const thunderbolts: CharacterDraft[] = [
  {
    id: "sentry",
    nameEn: "Sentry",
    nameAr: "الحارس",
    aliases: ["Sentry", "The Sentry", "Robert Reynolds", "Bob Reynolds", "The Void", "Bob"],
    category: "antihero",
    affiliation: ["Thunderbolts"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "The power of a million suns", ar: "قوة مليون شمس" },
      { en: "Flight", ar: "طيران" },
      { en: "Reshapes matter", ar: "يعيد تشكيل المادة" },
      { en: "The Void", ar: "الفراغ" },
    ],
    origin: {
      en: "A man given more power than anyone has held, who came with a shadow attached: the Void, which is the same person and wants the opposite thing. His story is a depression written as a superpower.",
      ar: "رجل مُنح قوة لم يحملها أحد، وجاء معها ظلّ: الفراغ، وهو الشخص نفسه ويريد النقيض. حكايته اكتئابٌ مكتوب في هيئة قوة خارقة.",
    },
    related: [
      { id: "yelena-belova", kind: "team" },
      { id: "valentina", kind: "enemy" },
    ],
  },
  {
    id: "yelena-belova",
    nameEn: "Yelena Belova",
    nameAr: "يلينا بيلوفا",
    aliases: ["Yelena Belova", "Yelena"],
    category: "hero",
    affiliation: ["Thunderbolts"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Widow training", ar: "تدريب الأرملة" },
      { en: "Marksmanship", ar: "دقة تصويب" },
      { en: "Very direct", ar: "مباشِرة جدًا" },
    ],
    origin: {
      en: "Raised in the same programme as Natasha and freed from it later, she is the funniest person in any room she is in and the one keeping count of what was done to her.",
      ar: "نشأت في البرنامج نفسه الذي نشأت فيه ناتاشا وتحرّرت منه لاحقًا. أطرف من في أي غرفة تدخلها، وأكثرهم إحصاءً لما فُعل بها.",
    },
    related: [
      { id: "black-widow", kind: "family" },
      { id: "red-guardian", kind: "family" },
      { id: "kate-bishop", kind: "ally" },
    ],
  },
  {
    id: "red-guardian",
    nameEn: "Red Guardian",
    nameAr: "الحارس الأحمر",
    aliases: ["Red Guardian", "Alexei Shostakov", "Alexei"],
    category: "antihero",
    affiliation: ["Thunderbolts"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Soviet super-soldier serum", ar: "مصل الجندي الخارق السوفييتي" },
      { en: "Shield", ar: "درع" },
      { en: "Tells the story differently each time", ar: "يروي الحكاية مختلفةً كل مرة" },
    ],
    origin: {
      en: "The USSR's answer to Captain America, who spent his best years undercover as a father to two girls who were not his and has never worked out that it was the realest thing he did.",
      ar: "ردّ الاتحاد السوفييتي على كابتن أمريكا، أمضى خير سنيه متخفّيًا أبًا لفتاتين ليستا ابنتيه، ولم يدرك قط أن ذلك كان أصدق ما فعل.",
    },
    related: [
      { id: "yelena-belova", kind: "family" },
      { id: "black-widow", kind: "family" },
    ],
  },
  {
    id: "ghost",
    nameEn: "Ghost",
    nameAr: "الشبح",
    aliases: ["Ghost", "Ava Starr"],
    category: "antihero",
    affiliation: ["Thunderbolts"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Phases through matter", ar: "تعبر المادة" },
      { en: "Cannot always stay solid", ar: "لا تثبت صلبة دائمًا" },
    ],
    origin: {
      en: "A quantum accident left her unable to hold together, in constant pain, and able to walk through walls. The condition and the power are one thing, and only one of them is useful.",
      ar: "حادث كمّي تركها عاجزة عن التماسك، في ألم دائم، وقادرة على المرور عبر الجدران. الحالة والقدرة شيء واحد، ونافعٌ منهما واحد فقط.",
    },
    related: [
      { id: "ant-man", kind: "enemy" },
      { id: "yelena-belova", kind: "team" },
    ],
  },
  {
    id: "john-walker",
    nameEn: "U.S. Agent",
    nameAr: "العميل الأمريكي",
    aliases: ["John Walker", "U.S. Agent", "US Agent"],
    category: "antivillain",
    affiliation: ["Thunderbolts"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Super-soldier serum", ar: "مصل الجندي الخارق" },
      { en: "Three Medals of Honor", ar: "ثلاث أوسمة شرف" },
      { en: "Shield", ar: "درع" },
    ],
    origin: {
      en: "Handed the shield by a government that wanted a Captain America it could direct. He is a genuinely decorated soldier, and the show is careful that the problem is not his competence.",
      ar: "سلّمته الحكومة الدرع لأنها أرادت كابتن أمريكا يأتمر بأمرها. جندي مكرّم فعلًا، والمسلسل حريص على أن المشكلة ليست في كفاءته.",
    },
    related: [
      { id: "falcon", kind: "enemy" },
      { id: "valentina", kind: "ally" },
    ],
  },
  {
    id: "valentina",
    nameEn: "Valentina Allegra de Fontaine",
    nameAr: "فالنتينا أليغرا دي فونتين",
    aliases: ["Valentina Allegra de Fontaine", "Valentina", "Val", "Contessa Valentina Allegra de Fontaine"],
    category: "villain",
    affiliation: ["Thunderbolts", "CIA"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Runs the CIA", ar: "تدير الاستخبارات المركزية" },
      { en: "Recruits people at their lowest", ar: "تجنّد الناس في أضعف لحظاتهم" },
    ],
    origin: {
      en: "A spymaster who appears in a post-credits scene every time someone is desperate enough to sign anything, and assembles a team out of exactly those people.",
      ar: "رئيسة تجسّس تظهر في مشهد ما بعد النهاية كلما بلغ أحدهم يأسًا يكفي لتوقيع أي شيء، وتجمع فريقًا من هؤلاء بالذات.",
    },
    related: [
      { id: "john-walker", kind: "ally" },
      { id: "sentry", kind: "enemy" },
    ],
  },
];

/**
 * THE HULKS — one accident, then a family. Bruce is already in the Avengers
 * block; these are the ones the accident kept producing.
 */
const hulks: CharacterDraft[] = [
  {
    id: "skaar",
    nameEn: "Skaar",
    nameAr: "سكار",
    aliases: ["Skaar"],
    category: "antihero",
    affiliation: ["Hulks", "Young Avengers"],
    universe: ["mcu"],
    species: "Gamma mutate",
    powers: [
      { en: "Hulk-level strength", ar: "قوة بمستوى هَلك" },
      { en: "Old Power of Sakaar", ar: "قوة ساكار القديمة" },
    ],
    origin: {
      en: "Bruce Banner's son, born on Sakaar during the years his father spent there as a gladiator, and raised by a planet rather than a parent.",
      ar: "ابن بروس بانر، وُلد في ساكار خلال السنوات التي أمضاها أبوه هناك مصارعًا، وربّاه كوكب لا والد.",
    },
    /* Walks in at the end of the She-Hulk finale as Bruce's son. Wil Deusner
       plays him and TMDB carries no credit for it. */
    alsoIn: ["she-hulk-attorney-at-law-s1"],
    related: [
      { id: "hulk", kind: "family" },
      { id: "she-hulk", kind: "family" },
    ],
  },
  {
    id: "betty-ross",
    nameEn: "Betty Ross",
    nameAr: "بيتي روس",
    aliases: ["Betty Ross", "Elizabeth Ross"],
    category: "supporting",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Cellular biologist", ar: "عالمة أحياء خلوية" },
      { en: "The one person he calms for", ar: "الوحيدة التي يهدأ لأجلها" },
    ],
    origin: {
      en: "A scientist, the general's daughter, and Bruce Banner's reason to keep trying to reverse it: the only person in the first film who treats the Hulk as a patient rather than a target.",
      ar: "عالمة، وابنة الجنرال، وسبب بروس بانر في مواصلة محاولة العكس. الوحيدة في الفيلم الأول التي تعامل هَلك مريضًا لا هدفًا.",
    },
    related: [
      { id: "hulk", kind: "family" },
      { id: "thaddeus-ross", kind: "family" },
    ],
  },
];

/**
 * MORE MUTANTS. The X-Men block covers the film casts; these are the ones a
 * reader arrives already knowing from elsewhere and cannot currently find.
 */
const moreMutants: CharacterDraft[] = [
  {
    id: "phoenix",
    nameEn: "Phoenix Force",
    nameAr: "قوة العنقاء",
    /* The credit in Dark Phoenix reads "Jean Grey / Dark Phoenix" — two
       segments naming two things, because the Force is inside her and the film
       is about exactly that. "Dark Phoenix" moved here from Jean's record: she
       still matches on the first segment, and the Force now matches on the
       second. Nobody shares an alias, so C18 stays satisfied. */
    aliases: ["Phoenix Force", "Dark Phoenix"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["fox", "legacy"],
    species: "Cosmic entity",
    powers: [
      { en: "Creation and destruction itself", ar: "الخلق والفناء ذاتهما" },
      { en: "Needs a host", ar: "تحتاج إلى مضيف" },
      { en: "Cannot be killed", ar: "لا تُقتل" },
    ],
    origin: {
      en: "A cosmic force older than the galaxy that burns through hosts. Jean Grey is the one everybody remembers, which is why the corpus keeps them apart: the Force is not her, it is what happened to her.",
      ar: "قوة كونية أقدم من المجرّة تحرق مضيفيها. جين غراي أشهر من حلّت به، ولذلك يفصل بينهما هذا الفهرس: القوة ليست هي، بل ما أصابها.",
    },
    related: [
      { id: "jean-grey", kind: "host" },
      { id: "cyclops", kind: "host" },
    ],
  },
  {
    id: "angel",
    nameEn: "Angel",
    nameAr: "أنجل",
    aliases: ["Angel", "Warren Worthington III", "Archangel", "Warren Worthington"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Feathered wings", ar: "جناحان بريش" },
      { en: "Flight", ar: "طيران" },
    ],
    origin: {
      en: "One of the five original X-Men, born into money and born with wings he spent his adolescence strapping down under his shirt. Later versions replace those wings with metal ones.",
      ar: "أحد الخمسة الأوائل في إكس مِن، وُلد في ثروة ووُلد بجناحين أمضى مراهقته يشدّهما تحت قميصه. تستبدل نسخ لاحقة بهما جناحين معدنيين.",
    },
    related: [
      { id: "cyclops", kind: "ally" },
      { id: "apocalypse", kind: "enemy" },
    ],
  },
  {
    id: "hope-summers",
    nameEn: "Hope Summers",
    nameAr: "هوب سَمرز",
    aliases: ["Hope Summers", "Hope"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    /* ON THE HOUSE OF X #1 LIST, and I set this to null earlier on the
       claim that she was not. She is. Franklin Richards was also on that
       list and stays null for a different and real reason: the story since
       has established he is no longer a mutant at all. */
    mutantClass: "omega",
    powers: [
      { en: "Copies any mutant power nearby", ar: "تنسخ أي قدرة طافرة قريبة" },
      { en: "The first mutant born after M-Day", ar: "أول طافرة تولد بعد يوم إم" },
    ],
    origin: {
      en: "The first mutant born after the Scarlet Witch ended the species, which made her an infant that half the world wanted dead. Cable took her into the future to raise her out of reach.",
      ar: "أول طافرة تولد بعد أن أنهت الساحرة القرمزية النوع، فصارت رضيعة يتمنى نصف العالم موتها. أخذها كايبل إلى المستقبل ليربّيها بعيدًا عن الأيدي.",
    },
    related: [
      { id: "cable", kind: "family" },
      { id: "scarlet-witch", kind: "enemy" },
    ],
  },
  {
    id: "dazzler",
    nameEn: "Dazzler",
    nameAr: "دازلر",
    aliases: ["Dazzler", "Alison Blaire"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Turns sound into light", ar: "تحوّل الصوت إلى ضوء" },
      { en: "Blinding beams", ar: "أشعة تُعمي" },
    ],
    origin: {
      en: "A disco singer whose mutation converts sound into light, which she used as a stage act for years before anyone told her it was a weapon. Created in 1980 as a record-label tie-in that outlived it.",
      ar: "مغنية ديسكو تحوّل طفرتُها الصوت إلى ضوء، استخدمته سنوات فقرةً على المسرح قبل أن يخبرها أحد أنه سلاح. ابتُكرت عام 1980 دعايةً لشركة أسطوانات وعاشت بعدها.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "aurora",
    nameEn: "Aurora",
    nameAr: "أورورا",
    aliases: ["Aurora", "Jeanne-Marie Beaubier"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Super speed", ar: "سرعة خارقة" },
      { en: "Light from the skin", ar: "ضوء من الجلد" },
      { en: "Flight", ar: "طيران" },
    ],
    origin: {
      en: "Half of a Canadian twin pair whose powers only reach full strength when the two of them touch. Alpha Flight's founding member, and one of the earliest mainstream heroes written with a mental illness.",
      ar: "نصف ثنائي كندي توأم لا تبلغ قدراتهما تمامها إلا حين يتلامسان. من مؤسّسي ألفا فلايت، ومن أوائل الأبطال في التيار العام الذين كُتبوا بمرض نفسي.",
    },
    related: [{ id: "wolverine", kind: "ally" }],
  },
  {
    id: "mister-sinister",
    nameEn: "Mister Sinister",
    nameAr: "مستر سِنِستر",
    aliases: ["Mister Sinister", "Mr. Sinister", "Nathaniel Essex"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "Rewrites his own body", ar: "يعيد كتابة جسده" },
      { en: "Geneticist with no limits", ar: "عالم وراثة بلا حدود" },
      { en: "Effectively immortal", ar: "خالد عمليًا" },
    ],
    origin: {
      en: "A Victorian scientist who met Apocalypse, took immortality from him, and has spent the century and a half since breeding mutants like livestock to see what comes out. Cable and Hope both trace back to him.",
      ar: "عالم فيكتوري لقي أبوكاليبس فأخذ منه الخلود، وأمضى قرنًا ونصفًا يستولد الطافرين كالماشية ليرى ما يخرج. كايبل وهوب كلاهما يعود إليه.",
    },
    related: [
      { id: "apocalypse", kind: "ally" },
      { id: "cyclops", kind: "enemy" },
      { id: "cable", kind: "enemy" },
    ],
  },
];

/**
 * THE SYMBIOTES — Venom is not one thing, he is the famous one. Filed as a
 * species so the chip can be written off the data rather than off a list.
 */
const symbiotes: CharacterDraft[] = [
  {
    id: "riot",
    nameEn: "Riot",
    nameAr: "رَيوت",
    aliases: ["Riot"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "spawn",
    powers: [
      { en: "Forms blades and axes", ar: "يصوغ نصالًا وفؤوسًا" },
      { en: "Jumps between hosts", ar: "ينتقل بين المضيفين" },
      { en: "Larger than Venom", ar: "أضخم من فينوم" },
    ],
    origin: {
      en: "The symbiote that came to Earth to prepare it for the rest of them, and burned through a chain of human hosts on the way. The first film's antagonist.",
      ar: "السمبيوت الذي جاء الأرض ليهيّئها لبقيتهم، وأحرق في طريقه سلسلة من المضيفين البشر. خصم الفيلم الأول.",
    },
    related: [
      { id: "venom", kind: "enemy" },
      { id: "knull", kind: "family" },
    ],
  },
  {
    id: "toxin",
    nameEn: "Toxin",
    nameAr: "توكسين",
    aliases: ["Toxin", "Patrick Mulligan"],
    category: "antihero",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "lineage",
    powers: [
      { en: "Stronger than its parents", ar: "أقوى من والديه" },
      { en: "Senses other symbiotes", ar: "يستشعر السمبيوتات الأخرى" },
    ],
    origin: {
      en: "Carnage's offspring, and by the arithmetic of the comics the strongest of the three: a symbiote's spawn is always stronger than the parent. Bonded to a police officer, which decides which way it points.",
      ar: "سليل كارنيج، وبحساب القصص المصوّرة أقوى الثلاثة: سليل السمبيوت أقوى من أصله دائمًا. ارتبط بشرطي، وهذا ما حدّد وجهته.",
    },
    related: [
      { id: "carnage", kind: "family" },
      { id: "venom", kind: "family" },
    ],
  },
  {
    id: "anti-venom",
    nameEn: "Anti-Venom",
    nameAr: "أنتي-فينوم",
    aliases: ["Anti-Venom"],
    category: "antihero",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "anomaly",
    powers: [
      { en: "Cures illness by touch", ar: "يشفي المرض باللمس" },
      { en: "Burns other symbiotes", ar: "يحرق السمبيوتات الأخرى" },
    ],
    origin: {
      en: "What the Venom symbiote's residue became in Eddie Brock after it was cured out of him: a white version that heals people and is poison to every symbiote including the one it came from.",
      ar: "ما صارت إليه بقايا سمبيوت فينوم في إيدي بروك بعد شفائه منه: نسخة بيضاء تشفي الناس وتسمّ كل سمبيوت، بما فيه أصلها.",
    },
    related: [{ id: "venom", kind: "variant" }],
  },
  {
    id: "scream",
    nameEn: "Scream",
    nameAr: "سكريم",
    aliases: ["Scream", "Donna Diego"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "spawn",
    powers: [
      { en: "Hair that cuts", ar: "شعر يقطع" },
      { en: "Sonic scream", ar: "صرخة صوتية" },
    ],
    origin: {
      en: "One of five symbiotes bred from Venom by the Life Foundation to be sold as private security. The yellow one, and the only one of the five that kept getting stories.",
      ar: "واحدة من خمسة سمبيوتات استولدتها مؤسسة الحياة من فينوم لتُباع حراسةً خاصة. الصفراء، وهي الوحيدة من الخمسة التي ظلّت تُكتب لها حكايات.",
    },
    related: [{ id: "venom", kind: "family" }],
  },
  {
    id: "agony",
    nameEn: "Agony",
    nameAr: "أغوني",
    aliases: ["Agony", "Leslie Gesneria"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "spawn",
    powers: [
      { en: "Corrosive acid", ar: "حمض آكل" },
      { en: "Absorbs chemicals", ar: "يمتصّ المواد الكيميائية" },
    ],
    origin: {
      en: "Another of the Life Foundation five, purple, built around acid. The set exists mostly so that a symbiote fight can have more than two people in it.",
      ar: "أخرى من خمسة مؤسسة الحياة، بنفسجية، مبنية حول الحمض. وُجدت المجموعة أساسًا كي يضم قتال السمبيوتات أكثر من اثنين.",
    },
    related: [{ id: "venom", kind: "family" }],
  },
];

/**
 * MORE OF THE SPIDER-VERSE — the other Peters, the other masks, and the
 * villains a reader met in a game or a cartoon before they met a film.
 */
const moreSpider: CharacterDraft[] = [
  {
    id: "spider-man-2099",
    nameEn: "Spider-Man 2099",
    nameAr: "سبايدرمان 2099",
    aliases: ["Spider-Man 2099", "Miguel O'Hara", "Miguel OHara"],
    category: "antihero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Talons and fangs", ar: "مخالب وأنياب" },
      { en: "Accelerated vision", ar: "بصر متسارع" },
      { en: "Webs from his own body", ar: "خيوط من جسده" },
    ],
    origin: {
      en: "A geneticist in 2099 who rewrote his own DNA and came out with claws instead of web-shooters. He runs the Spider-Society, and he is the one insisting that some deaths have to happen.",
      ar: "عالم وراثة في عام 2099 أعاد كتابة حمضه النووي فخرج بمخالب بدل قاذفات الخيوط. يقود جمعية العناكب، وهو المصرّ على أن بعض الموت لا بد أن يقع.",
    },
    related: [
      { id: "miles-morales", kind: "enemy" },
      { id: "gwen-stacy", kind: "ally" },
    ],
  },
  {
    id: "spider-man-noir",
    nameEn: "Spider-Man Noir",
    nameAr: "سبايدرمان نوار",
    aliases: ["Spider-Man Noir", "Spider-Noir"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Spider powers", ar: "قدرات العنكبوت" },
      { en: "Sees only in black and white", ar: "لا يرى إلا الأبيض والأسود" },
    ],
    origin: {
      en: "A Peter Parker from a 1933 where the Depression never lifted, who narrates his own life like a detective novel and does not understand colour when he sees it.",
      ar: "بيتر باركر من عام 1933 لم ينقشع فيه الكساد، يروي حياته كرواية بوليسية ولا يفهم الألوان حين يراها.",
    },
    related: [{ id: "spider-man", kind: "variant" }],
  },
  {
    id: "peni-parker",
    nameEn: "Peni Parker",
    nameAr: "بيني باركر",
    aliases: ["Peni Parker", "SP//dr"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Human",
    powers: [
      { en: "Pilots the SP//dr suit", ar: "تقود بذلة SP//dr" },
      { en: "Linked to a radioactive spider", ar: "مرتبطة بعنكبوت مشعّ" },
    ],
    origin: {
      en: "From an anime-styled New York where the spider is not a bite but a co-pilot: she shares a mental link with the one living in her father's mech, and flies it with him.",
      ar: "من نيويورك بأسلوب الأنمي، حيث العنكبوت ليس لدغة بل مساعد قيادة: تشترك معه في رابط ذهني وهو يعيش في آلة أبيها، فتقودها معه.",
    },
    related: [{ id: "miles-morales", kind: "ally" }],
  },
  {
    id: "spider-ham",
    nameEn: "Spider-Ham",
    nameAr: "سبايدر-هام",
    aliases: ["Spider-Ham", "Peter Porker"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Uplifted animal",
    powers: [
      { en: "Cartoon physics", ar: "فيزياء الرسوم المتحركة" },
      { en: "Pulls a mallet out of nowhere", ar: "يُخرج مطرقة من العدم" },
    ],
    origin: {
      en: "A spider bitten by a radioactive pig, which is the correct way round for his universe. He obeys cartoon rules rather than physical ones, and the other Spiders find this unfair.",
      ar: "عنكبوت لدغه خنزير مشعّ، وهذا هو الترتيب الصحيح في كونه. يخضع لقوانين الكرتون لا الفيزياء، ويرى بقية العناكب في ذلك إجحافًا.",
    },
    related: [{ id: "miles-morales", kind: "ally" }],
  },
  {
    id: "spider-woman",
    nameEn: "Spider-Woman (Jessica Drew)",
    nameAr: "المرأة العنكبوت (جيسيكا درو)",
    aliases: ["Spider-Woman", "Jessica Drew"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony", "legacy"],
    species: "Human mutate",
    powers: [
      { en: "Venom blasts", ar: "دفقات سُمّية" },
      { en: "Glides", ar: "انزلاق جوّي" },
      { en: "Pheromone control", ar: "تحكّم بالفيرومونات" },
    ],
    origin: {
      en: "Not a Peter Parker variant and not bitten by anything: an experiment in a HYDRA lab who spent her first stories being told what she was by people who had built her.",
      ar: "ليست نسخة من بيتر باركر ولم يلدغها شيء، بل تجربة في مختبر هايدرا أمضت حكاياتها الأولى يخبرها من صنعوها بما هي عليه.",
    },
    related: [{ id: "spider-man-2099", kind: "ally" }],
  },
  {
    id: "ben-reilly",
    nameEn: "Scarlet Spider",
    nameAr: "العنكبوت القرمزي",
    aliases: ["Scarlet Spider", "Ben Reilly"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Every power Peter has", ar: "كل ما يملكه بيتر" },
      { en: "Impact webbing", ar: "خيوط صادمة" },
    ],
    origin: {
      en: "Peter Parker's clone, who left New York for five years rather than fight over which of them was the original, then came back wearing a hoodie over the costume.",
      ar: "نسخة بيتر باركر المستنسخة، غادر نيويورك خمس سنوات بدل الاقتتال على أيهما الأصل، ثم عاد يرتدي سترةً فوق الزيّ.",
    },
    related: [{ id: "spider-man", kind: "variant" }],
  },
  {
    id: "rhino",
    nameEn: "Rhino",
    nameAr: "الكركدن",
    aliases: ["Rhino", "Aleksei Sytsevich"],
    category: "villain",
    affiliation: ["Sinister Six"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Armoured hide", ar: "جلد مدرّع" },
      { en: "Unstoppable charge", ar: "اندفاع لا يُوقف" },
    ],
    origin: {
      en: "A hired thug bonded permanently into a suit of polymer armour that he cannot take off, which is the joke and the tragedy at once: he ran at a wall for money and now he is the wall.",
      ar: "بلطجي مأجور التصقت به بذلة مدرّعة لا يستطيع خلعها، وتلك النكتة والمأساة معًا: اندفع نحو جدار مقابل المال، وصار هو الجدار.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "shocker",
    nameEn: "Shocker",
    nameAr: "شوكر",
    aliases: ["Shocker", "Herman Schultz"],
    category: "villain",
    affiliation: ["Sinister Six"],
    universe: ["sony", "mcu"],
    species: "Human",
    powers: [
      { en: "Vibration gauntlets", ar: "قفازات اهتزازية" },
      { en: "Safecracker", ar: "فاتح خزائن" },
    ],
    origin: {
      en: "A safecracker who built gauntlets that shake a vault door apart and realised they work just as well on people. One of the few Spider-Man villains with no tragedy attached at all.",
      ar: "فاتح خزائن صنع قفازين يفكّان باب الخزنة بالاهتزاز، ثم أدرك أنهما يفعلان بالناس المثل. من قلائل أشرار سبايدرمان بلا مأساة إطلاقًا.",
    },
    related: [{ id: "vulture", kind: "ally" }],
  },
  {
    id: "black-cat",
    nameEn: "Black Cat",
    nameAr: "القطة السوداء",
    aliases: ["Black Cat", "Felicia Hardy"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      { en: "Bad luck, for other people", ar: "حظ سيئ، لغيرها" },
      { en: "Cat burglar", ar: "لصّة محترفة" },
      { en: "Acrobat", ar: "بهلوانية" },
    ],
    origin: {
      en: "A thief who steals because she is extremely good at it, and whose power is a probability field that makes things go wrong for whoever she is fighting rather than right for her.",
      ar: "لصّة تسرق لأنها بارعة جدًا في ذلك، وقدرتها حقل احتمالات يجعل الأمور تسوء لمن تقاتله، لا تحسن لها.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "prowler",
    nameEn: "Prowler",
    nameAr: "المتربّص",
    aliases: ["Prowler", "Aaron Davis"],
    category: "antivillain",
    affiliation: [],
    universe: ["sony", "mcu"],
    species: "Human",
    powers: [
      { en: "Steam gauntlets", ar: "قفازات بخارية" },
      { en: "Silent glide", ar: "انزلاق صامت" },
    ],
    origin: {
      en: "Miles Morales's uncle, the person he is closest to, and a career criminal in a purple suit. Every version of the story turns on Miles finding out those are the same man.",
      ar: "عمّ مايلز موراليس وأقرب الناس إليه، ومجرم محترف في بذلة بنفسجية. كل نسخة من الحكاية تدور حول اكتشاف مايلز أنهما رجل واحد.",
    },
    related: [{ id: "miles-morales", kind: "family" }],
  },
  {
    id: "tombstone",
    nameEn: "Tombstone",
    nameAr: "شاهد القبر",
    aliases: ["Tombstone", "Lonnie Lincoln"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Skin like stone", ar: "جلد كالحجر" },
      { en: "Speaks in a whisper", ar: "لا يتكلّم إلا همسًا" },
    ],
    origin: {
      en: "A Harlem enforcer whose skin hardened into something bulletproof, and who has never raised his voice in any story he appears in.",
      ar: "منفّذ في هارلم تصلّب جلده حتى صار عصيًا على الرصاص، ولم يرفع صوته في أي حكاية ظهر فيها.",
    },
    related: [{ id: "kingpin", kind: "ally" }],
  },
];

/**
 * THE REST — people who belong to no block above and were asked for by name.
 */
const others: CharacterDraft[] = [
  {
    id: "high-evolutionary",
    nameEn: "The High Evolutionary",
    nameAr: "المُطوِّر الأعلى",
    aliases: ["High Evolutionary", "The High Evolutionary", "Herbert Wyndham"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Rebuilds species from scratch", ar: "يعيد بناء الأنواع من الصفر" },
      { en: "Builds whole worlds", ar: "يبني عوالم كاملة" },
      { en: "Cannot tolerate imperfection", ar: "لا يحتمل النقص" },
    ],
    origin: {
      en: "A scientist who decided evolution was too slow and took it over, uplifting animals into people to build a perfect society and destroying every version that disappointed him. Rocket was one of those versions.",
      ar: "عالم رأى التطوّر بطيئًا فتولّاه بنفسه، يرفع الحيوانات إلى بشر ليبني مجتمعًا كاملًا ويمحو كل نسخة تخيّب ظنه. وكان روكِت إحدى تلك النسخ.",
    },
    related: [
      { id: "rocket", kind: "enemy" },
      { id: "star-lord", kind: "enemy" },
    ],
  },
  {
    id: "malekith",
    nameEn: "Malekith",
    nameAr: "ماليكيث",
    aliases: ["Malekith", "Malekith the Accursed"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Dark elf",
    powers: [
      { en: "Commands the Dark Elves", ar: "يقود الجان المظلمين" },
      { en: "Wields the Aether", ar: "يستخدم الأيثر" },
      { en: "Older than Asgard", ar: "أقدم من أسغارد" },
    ],
    origin: {
      en: "The Dark Elf king who wants the universe returned to the darkness it was before there was light, and slept through several ages waiting for the alignment that would let him do it.",
      ar: "ملك الجان المظلمين، يريد إعادة الكون إلى الظلام الذي سبق النور، ونام دهورًا ينتظر الاصطفاف الذي يتيح له ذلك.",
    },
    related: [
      { id: "thor", kind: "enemy" },
      { id: "frigga", kind: "enemy" },
    ],
  },
  {
    id: "he-who-remains",
    nameEn: "He Who Remains",
    nameAr: "الباقي",
    aliases: ["He Who Remains", "Victor Timely"],
    category: "antivillain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Runs the Sacred Timeline", ar: "يدير الخط الزمني المقدّس" },
      { en: "Has read every ending", ar: "قرأ كل النهايات" },
    ],
    origin: {
      en: "A variant of Kang who won the multiversal war by pruning every timeline but one, then spent an eternity alone at the end of it maintaining the thing he made. He wants to be replaced.",
      ar: "نسخة من كانغ ربحت حرب الأكوان بتشذيب كل الخطوط الزمنية إلا واحدًا، ثم أمضت أزلًا وحيدةً في نهايته تصون ما صنعت. وهو يريد من يخلفه.",
    },
    related: [
      { id: "kang", kind: "variant" },
      { id: "sylvie", kind: "enemy" },
      { id: "loki", kind: "enemy" },
    ],
  },
  {
    id: "franklin-richards",
    nameEn: "Franklin Richards",
    nameAr: "فرانكلين ريتشاردز",
    aliases: ["Franklin Richards", "Franklin"],
    category: "hero",
    affiliation: ["Fantastic Four"],
    universe: ["mcu", "legacy"],
    species: "Mutant",
    powers: [
      { en: "Creates universes", ar: "يخلق أكوانًا" },
      { en: "Reshapes reality", ar: "يعيد تشكيل الواقع" },
      { en: "Has not grown up yet", ar: "لم يكبر بعد" },
    ],
    origin: {
      en: "Reed and Sue's son, an Omega-level mutant who has built at least one universe as a child and does not know what he is. Most Fantastic Four stories are really about protecting him.",
      ar: "ابن ريد وسو، طافر من مستوى أوميغا بنى كونًا كاملًا على الأقل وهو طفل ولا يدري ما هو. معظم حكايات الأربعة المدهشون هي في الحقيقة عن حمايته.",
    },
    related: [
      { id: "mister-fantastic", kind: "family" },
      { id: "invisible-woman", kind: "family" },
    ],
  },
  {
    id: "hercules",
    nameEn: "Hercules",
    nameAr: "هرقل",
    aliases: ["Hercules", "Heracles"],
    category: "hero",
    affiliation: ["Gods"],
    universe: ["mcu", "legacy"],
    species: "Olympian",
    powers: [
      { en: "Strength to match Thor", ar: "قوة تضاهي ثور" },
      { en: "Immortal", ar: "خالد" },
      { en: "Adamantine mace", ar: "صولجان من الأدامانتين" },
    ],
    origin: {
      en: "Zeus's son and the Olympian answer to Asgard, sent after Thor by a father who wanted a point made. Physically he is one of the few in any pantheon who can settle the argument.",
      ar: "ابن زيوس وردّ الأوليمب على أسغارد، أرسله أبٌ أراد إثبات وجهة نظر خلف ثور. جسديًا هو من قلائل في أي بانثيون يمكنهم حسم الجدل.",
    },
    related: [
      { id: "thor", kind: "enemy" },
      { id: "zeus", kind: "family" },
    ],
  },
  {
    id: "zeus",
    nameEn: "Zeus",
    nameAr: "زيوس",
    aliases: ["Zeus"],
    category: "antivillain",
    affiliation: ["Gods"],
    universe: ["mcu"],
    species: "Olympian",
    powers: [
      { en: "Thunderbolt", ar: "صاعقة" },
      { en: "King of Olympus", ar: "ملك الأوليمب" },
    ],
    origin: {
      en: "The head of the Greek pantheon, running Omnipotence City as a members' club and entirely uninterested in a god-butcher until it becomes his problem.",
      ar: "رأس البانثيون اليوناني، يدير مدينة الجبروت كناديًا خاصًا ولا يعنيه قاتل الآلهة حتى يصير مشكلته.",
    },
    related: [
      { id: "hercules", kind: "family" },
      { id: "thor", kind: "enemy" },
    ],
  },
  {
    id: "america-chavez",
    nameEn: "America Chavez",
    nameAr: "أمريكا تشافيز",
    aliases: ["America Chavez", "Miss America", "America"],
    category: "hero",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Punches holes between universes", ar: "تلكم ثقوبًا بين الأكوان" },
      { en: "Super strength", ar: "قوة خارقة" },
      { en: "Cannot control it yet", ar: "لا تتحكّم بها بعد" },
    ],
    origin: {
      en: "The only person known to travel between universes under her own power, which she can only do when frightened. Everyone who has met her wanted to take it from her.",
      ar: "الوحيدة المعروفة بقدرتها على السفر بين الأكوان بقوّتها، ولا تفعلها إلا خائفة. وكل من قابلها أراد أن ينتزعها منها.",
    },
    related: [
      { id: "doctor-strange", kind: "ally" },
      { id: "scarlet-witch", kind: "enemy" },
    ],
  },
  {
    id: "richard-rider",
    nameEn: "Nova (Richard Rider)",
    nameAr: "نوفا (ريتشارد رايدر)",
    aliases: ["Richard Rider", "Nova Prime"],
    category: "hero",
    affiliation: ["Nova Corps"],
    universe: ["legacy"],
    species: "Human",
    powers: [
      { en: "The Nova Force", ar: "قوة نوفا" },
      { en: "Flight at light speed", ar: "طيران بسرعة الضوء" },
      { en: "Gravity manipulation", ar: "تحكّم في الجاذبية" },
    ],
    origin: {
      en: "A teenager from Queens handed the power of a dying alien officer at random. When the Corps is later wiped out he is the last one left holding all of it, which is a very different job.",
      ar: "مراهق من كوينز مُنح قوة ضابط فضائي محتضر مصادفةً. وحين يُباد الفيلق لاحقًا يبقى وحده حاملًا القوة كلها، وتلك مهمة مختلفة تمامًا.",
    },
    related: [{ id: "sam-alexander", kind: "variant" }],
  },
  {
    id: "sam-alexander",
    nameEn: "Nova (Sam Alexander)",
    nameAr: "نوفا (سام ألكسندر)",
    aliases: ["Sam Alexander"],
    category: "hero",
    affiliation: ["Nova Corps"],
    universe: ["legacy"],
    species: "Human",
    powers: [
      { en: "The Nova Force", ar: "قوة نوفا" },
      { en: "Flight", ar: "طيران" },
      { en: "The helmet does most of it", ar: "الخوذة تفعل معظمها" },
    ],
    origin: {
      en: "The second Nova, a schoolboy who found his missing father's helmet in the garage and put it on. Written young on purpose: he is the one who has to ask what any of it means.",
      ar: "نوفا الثاني، تلميذ وجد خوذة أبيه المفقود في المرآب فارتداها. كُتب صغيرًا عن قصد: هو الذي يضطر لأن يسأل عن معنى هذا كله.",
    },
    related: [{ id: "richard-rider", kind: "variant" }],
  },
  {
    id: "howard-the-duck",
    nameEn: "Howard the Duck",
    nameAr: "هوارد البطة",
    aliases: ["Howard the Duck", "Howard"],
    category: "hero",
    affiliation: ["Avengers"],
    universe: ["mcu", "legacy"],
    species: "Uplifted animal",
    powers: [
      { en: "Quack-Fu", ar: "كواك-فو" },
      { en: "Marksmanship", ar: "دقة تصويب" },
      { en: "Has seen everything", ar: "رأى كل شيء" },
    ],
    origin: {
      en: "A talking duck from another dimension, stranded on Earth and permanently annoyed about it. He was the subject of the first Marvel film ever made, in 1986, and turns up in the Collector's vault and then on the field at the end of Endgame.",
      ar: "بطة ناطقة من بُعد آخر، عالقة على الأرض ومتضايقة من ذلك على الدوام. كان بطل أول فيلم لمارفل على الإطلاق عام 1986، ثم يظهر في خزانة الجامع، ثم في أرض المعركة في ختام «نهاية اللعبة».",
    },
    related: [
      { id: "the-collector", kind: "ally" },
      { id: "rocket", kind: "ally" },
    ],
  },
  {
    id: "a-bomb",
    nameEn: "A-Bomb",
    nameAr: "إيه-بومب",
    aliases: ["A-Bomb", "Rick Jones"],
    category: "hero",
    affiliation: ["Hulks"],
    universe: ["animation", "legacy"],
    species: "Gamma mutate",
    powers: [
      { en: "Armoured blue hide", ar: "جلد أزرق مدرّع" },
      { en: "Hulk-level strength", ar: "قوة بمستوى هَلك" },
      { en: "Keeps his own mind", ar: "يحتفظ بعقله" },
    ],
    origin: {
      en: "Rick Jones is the teenager Bruce Banner ran into the gamma field to save, which makes him the reason the Hulk exists at all. Decades of guilt later he takes the same exposure on purpose and comes out blue, armoured and still talking.",
      ar: "ريك جونز هو المراهق الذي اندفع بروس بانر إلى حقل غاما لإنقاذه، وبذلك هو سبب وجود هَلك أصلًا. وبعد عقود من الشعور بالذنب يتعرّض للإشعاع نفسه عمدًا، فيخرج أزرق مدرّعًا وما زال يتكلّم.",
    },
    related: [
      { id: "hulk", kind: "family" },
      { id: "she-hulk", kind: "ally" },
      { id: "skaar", kind: "ally" },
    ],
  },
  {
    id: "adam-warlock",
    nameEn: "Adam Warlock",
    nameAr: "آدم وارلوك",
    aliases: ["Adam Warlock", "Adam", "Him", "Warlock"],
    category: "antihero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu", "legacy"],
    species: "Artificial being",
    powers: [
      { en: "Quantum magic", ar: "سحر كمّي" },
      { en: "Flight", ar: "طيران" },
      { en: "Reborn from a cocoon", ar: "يُبعث من شرنقة" },
    ],
    origin: {
      en: "Engineered to be a perfect being and taken out of his cocoon far too early, so he arrives with enormous power and the judgement of a child. In the comics he is the one who ends up holding the Infinity Gauntlet.",
      ar: "صُنع ليكون كائنًا كاملًا وأُخرج من شرنقته قبل أوانه بكثير، فجاء بقوة هائلة وحكمة طفل. وفي القصص المصوّرة هو من ينتهي به الأمر حاملًا قفاز اللانهاية.",
    },
    related: [
      { id: "star-lord", kind: "enemy" },
      { id: "high-evolutionary", kind: "enemy" },
      { id: "thanos", kind: "enemy" },
    ],
  },
  {
    id: "wiccan",
    nameEn: "Wiccan",
    nameAr: "ويكان",
    /* NOT bare "Billy". It matched "Little Billy" in Spider-Man (2002) and a
       Billy in Cloak & Dagger — a child actor in a Raimi film is not Wanda's
       son. Third time a bare given name has done this; see Trevor and Harley. */
    aliases: ["Wiccan", "Billy Maximoff", "Billy Kaplan"],
    category: "hero",
    affiliation: ["Young Avengers", "Magic"],
    universe: ["mcu"],
    species: "Witch",
    powers: [
      { en: "Reality-warping chaos magic", ar: "سحر فوضى يُعيد صوغ الواقع" },
      { en: "Flight", ar: "طيران" },
      { en: "Spells that do what he says", ar: "تعاويذ تفعل ما يقول" },
    ],
    origin: {
      en: "One of the Scarlet Witch's twin sons, conjured into a life that was not supposed to be able to hold him and then unmade with the town he lived in. He comes back anyway, which is the whole point of him.",
      ar: "أحد توأمي الساحرة القرمزية، استُحضر إلى حياة لم تكن قادرة على احتوائه، ثم مُحي مع البلدة التي عاش فيها. ثم يعود رغم ذلك، وتلك خلاصته كلها.",
    },
    related: [
      { id: "scarlet-witch", kind: "family" },
      { id: "speed", kind: "family" },
      { id: "agatha-harkness", kind: "enemy" },
    ],
  },
  {
    id: "speed",
    nameEn: "Speed",
    nameAr: "سبيد",
    aliases: ["Speed", "Tommy Maximoff", "Tommy Shepherd", "Tommy"],
    category: "hero",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Super speed", ar: "سرعة خارقة" },
      { en: "Runs through solid things", ar: "يعبر الأشياء الصلبة عدوًا" },
    ],
    origin: {
      en: "The other twin, and the one who inherited his uncle's power rather than his mother's. Where his brother is careful, he is the one already halfway out of the room.",
      ar: "التوأم الآخر، وهو من ورث قدرة خاله لا قدرة أمه. وحيث يتأنّى أخوه، يكون هو قد بلغ منتصف الطريق خارج الغرفة.",
    },
    related: [
      { id: "wiccan", kind: "family" },
      { id: "scarlet-witch", kind: "family" },
      { id: "quicksilver", kind: "family" },
    ],
  },
  {
    id: "bedlam",
    nameEn: "Bedlam",
    nameAr: "بيدلام",
    aliases: ["Bedlam", "Jesse Aaronson"],
    category: "hero",
    affiliation: ["X-Force"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Scrambles electrical fields", ar: "يشوّش الحقول الكهربائية" },
      { en: "Kills any machine nearby", ar: "يعطّل أي آلة قريبة" },
    ],
    origin: {
      en: "Recruited into X-Force off a newspaper advert because he can disrupt any electrical field within a radius, including the ones inside a brain. He lasts about as long as everyone else on that jump.",
      ar: "جُنّد في إكس فورس عبر إعلان في صحيفة لأنه يعطّل أي حقل كهربائي في محيطه، بما فيه ما داخل الدماغ. ويصمد بقدر ما صمد بقية من قفزوا معه.",
    },
    related: [{ id: "deadpool", kind: "team" }],
  },
  {
    id: "shatterstar",
    nameEn: "Shatterstar",
    nameAr: "شاترستار",
    aliases: ["Shatterstar", "Gaveedra Seven"],
    category: "hero",
    affiliation: ["X-Force"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Bred for the arena", ar: "استُولد للحلبة" },
      { en: "Twin blades", ar: "نصلان توأمان" },
      { en: "Better than you at everything", ar: "أفضل منك في كل شيء" },
    ],
    origin: {
      en: "From a planet called Mojoworld, which is a television network run as a dictatorship, and bred there as a gladiator. He says all of this out loud, in one breath, in an interview.",
      ar: "من كوكب اسمه موجو‌وورلد، وهو شبكة تلفزيونية تُدار كدكتاتورية، واستُولد فيه مصارعًا. ويقول هذا كله بنفس واحد في مقابلة عمل.",
    },
    related: [{ id: "deadpool", kind: "team" }],
  },
  {
    id: "vanisher",
    nameEn: "Vanisher",
    nameAr: "الغائب",
    aliases: ["Vanisher", "Telford Porter"],
    category: "hero",
    affiliation: ["X-Force"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      { en: "Teleportation", ar: "انتقال آني" },
      { en: "Permanently invisible", ar: "خفيّ على الدوام" },
    ],
    origin: {
      en: "Interviewed for X-Force without ever being seen, because the joke is that the audience never finds out whether he was in the room. He is on the roster and he is never once on screen.",
      ar: "أُجريت معه مقابلة الانضمام إلى إكس فورس من دون أن يراه أحد، فالنكتة أن المشاهد لا يعرف قط إن كان في الغرفة. اسمه في القائمة ولا يظهر على الشاشة ولو مرة.",
    },
    related: [{ id: "deadpool", kind: "team" }],
  },
  {
    id: "zeitgeist",
    nameEn: "Zeitgeist",
    nameAr: "زايتغايست",
    aliases: ["Zeitgeist", "Axel Cluney"],
    category: "hero",
    affiliation: ["X-Force"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "gamma",
    powers: [
      { en: "Vomits acid", ar: "يتقيّأ حمضًا" },
      { en: "Cannot aim it", ar: "لا يستطيع تصويبه" },
    ],
    origin: {
      en: "Auditions for X-Force by explaining that he projects acidic vomit, demonstrates it on the furniture, and is hired anyway. The film is very clear about the risks of hiring him.",
      ar: "يتقدّم إلى إكس فورس شارحًا أنه يقذف قيئًا حمضيًا، ويجرّبه على الأثاث، ثم يُقبل رغم ذلك. والفيلم صريح جدًا في مخاطر تعيينه.",
    },
    related: [{ id: "deadpool", kind: "team" }],
  },
  {
    id: "peter-wisdom",
    nameEn: "Peter",
    nameAr: "بيتر",
    aliases: ["Peter", "Peter W."],
    category: "hero",
    affiliation: ["X-Force"],
    universe: ["fox"],
    species: "Human",
    powers: [
      { en: "No powers whatsoever", ar: "بلا أي قدرات" },
      { en: "Type 2 diabetes", ar: "سكري من النوع الثاني" },
      { en: "Saw the advert", ar: "رأى الإعلان" },
    ],
    origin: {
      en: "An ordinary middle-aged man with no abilities at all who answered the recruitment advert because he liked the look of it, and was accepted onto a paramilitary strike team. He is the best gag in the film and he outlives most of it.",
      ar: "رجل عادي في منتصف العمر بلا قدرات إطلاقًا، ردّ على إعلان التجنيد لأن شكله أعجبه، فقُبل في فرقة اقتحام شبه عسكرية. أطرف نكتة في الفيلم، ويعيش بعد معظمه.",
    },
    related: [{ id: "deadpool", kind: "team" }],
  },
  {
    id: "werewolf-by-night",
    nameEn: "Werewolf by Night",
    nameAr: "ذئب الليل",
    aliases: ["Werewolf by Night", "Jack Russell", "Jack"],
    category: "antihero",
    affiliation: ["Midnight Sons"],
    universe: ["mcu"],
    species: "Werewolf",
    powers: [
      { en: "Turns at the full moon", ar: "يتحوّل مع اكتمال القمر" },
      { en: "Cannot control the change", ar: "لا يتحكّم في التحوّل" },
      { en: "Claws and speed", ar: "مخالب وسرعة" },
    ],
    origin: {
      en: "A cursed man who enters a monster hunters' contest in order to free the monster rather than kill it. His special is shot in black and white with the grain and the title cards of a 1940s horror film, which is the whole idea.",
      ar: "رجل ملعون يدخل مسابقة صيادي وحوش كي يحرّر الوحش لا ليقتله. صُوّر فيلمه الخاص بالأبيض والأسود بحبيبات وبطاقات عناوين أفلام الرعب في الأربعينيات، وتلك هي الفكرة كلها.",
    },
    related: [
      { id: "man-thing", kind: "ally" },
      { id: "elsa-bloodstone", kind: "ally" },
    ],
  },
  {
    id: "man-thing",
    nameEn: "Man-Thing",
    nameAr: "الكائن المستنقعي",
    /* NOT bare "Ted", which matched an unrelated Ted in Inhumans. The Werewolf
       by Night credit reads "Ted (Man-Thing)" and the matcher reads the
       bracket now, so the real appearance no longer needs the loose alias. */
    aliases: ["Man-Thing", "Ted Sallis"],
    category: "antihero",
    affiliation: ["Midnight Sons"],
    universe: ["mcu"],
    species: "Plant elemental",
    powers: [
      { en: "Burns whatever fears him", ar: "يحرق كل من يخافه" },
      { en: "Guards the Nexus of All Realities", ar: "يحرس ملتقى كل الحقائق" },
      { en: "Cannot be killed by force", ar: "لا يُقتل بالقوة" },
    ],
    origin: {
      en: "A scientist who fell into a swamp holding an experimental serum and came out as the swamp. He has no speech and no memory, and his one rule is famous: whatever knows fear burns at his touch.",
      ar: "عالم سقط في مستنقع وهو يحمل مصلًا تجريبيًا فخرج وقد صار المستنقع نفسه. بلا نطق ولا ذاكرة، وقاعدته الواحدة مشهورة: من عرف الخوف احترق بلمسته.",
    },
    related: [{ id: "werewolf-by-night", kind: "ally" }],
  },
  {
    id: "elsa-bloodstone",
    nameEn: "Elsa Bloodstone",
    nameAr: "إلسا بلَدستون",
    aliases: ["Elsa Bloodstone", "Elsa"],
    category: "antihero",
    affiliation: ["Midnight Sons"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "The Bloodstone", ar: "حجر الدم" },
      { en: "Raised as a monster hunter", ar: "نشأت صائدة وحوش" },
      { en: "Every weapon in the house", ar: "كل سلاح في البيت" },
    ],
    origin: {
      en: "Daughter of the most famous monster hunter alive, raised into the family trade and openly unimpressed by it. She inherits the Bloodstone by winning it, and she is the one who lets the werewolf go.",
      ar: "ابنة أشهر صيادي الوحوش، نشأت على حرفة العائلة وهي غير مبهورة بها إطلاقًا. ترث حجر الدم بأن تفوز به، وهي من يطلق سراح الذئب.",
    },
    related: [
      { id: "werewolf-by-night", kind: "ally" },
      { id: "man-thing", kind: "ally" },
    ],
  },
  {
    id: "doctor-voodoo",
    nameEn: "Doctor Voodoo",
    nameAr: "دكتور فودو",
    aliases: ["Doctor Voodoo", "Brother Voodoo", "Jericho Drumm"],
    category: "hero",
    affiliation: ["Midnight Sons", "Masters of the Mystic Arts", "Magic"],
    universe: ["mcu", "legacy"],
    species: "Human",
    powers: [
      { en: "Houngan Supreme", ar: "الهونغان الأعلى" },
      { en: "Shares his brother's spirit", ar: "يشارك روح أخيه" },
      { en: "Commands the loa", ar: "يأمر الأرواح" },
    ],
    origin: {
      en: "A psychologist who came home to Haiti when his brother was killed by a spirit, took up the practice he had spent his life dismissing, and ended up carrying his brother's soul alongside his own. He later holds the title of Sorcerer Supreme.",
      ar: "طبيب نفسي عاد إلى هايتي حين قتلت روحٌ أخاه، فأخذ بالممارسة التي أمضى حياته ينكرها، وانتهى حاملًا روح أخيه إلى جانب روحه. ويحمل لاحقًا لقب الساحر الأعظم.",
    },
    related: [
      { id: "doctor-strange", kind: "ally" },
      { id: "wong", kind: "ally" },
    ],
  },
  {
    id: "hobgoblin",
    nameEn: "Hobgoblin",
    nameAr: "الهوبغوبلن",
    aliases: ["Hobgoblin", "Roderick Kingsley"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "legacy"],
    species: "Human mutate",
    powers: [
      { en: "Osborn's formula, without the madness", ar: "تركيبة أوزبورن بلا جنونها" },
      { en: "Glider and pumpkin bombs", ar: "منزلق وقنابل يقطين" },
      { en: "Lets other men take the fall", ar: "يجعل غيره يدفع الثمن" },
    ],
    origin: {
      en: "A fashion magnate who found Norman Osborn's abandoned equipment, worked out that everyone who wore the Green Goblin mask went mad, and built a version that would not. His identity stayed a mystery for years because he kept sending brainwashed stand-ins to be unmasked in his place.",
      ar: "قطب أزياء عثر على عتاد نورمان أوزبورن المهجور، فأدرك أن كل من ارتدى قناع الغرين غوبلن جُنّ، فصنع نسخةً لا تفعل. وظلّت هويته لغزًا سنين لأنه كان يرسل بدلاء مغسولي الأدمغة ليُكشفوا مكانه.",
    },
    related: [
      { id: "green-goblin", kind: "enemy" },
      { id: "ned-leeds", kind: "enemy" },
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "harry-osborn",
    /**
     * NEW GOBLIN LEADS, Harry Osborn follows — same call as Red Hulk over
     * Thaddeus Ross. A reader scanning a grid of faces is looking for the
     * mask; the man's name is what they find once they are on his page.
     * Spider-Man 3 credits him as "New Goblin / Harry Osborn", so both are
     * his own.
     */
    nameEn: "New Goblin",
    nameAr: "الغوبلن الجديد",
    /**
     * "New Goblin" is his, "Green Goblin" is his father's.
     *
     * A LIMIT WORTH RECORDING: The Amazing Spider-Man 2 credits Dane DeHaan as
     * "Green Goblin / Harry Osborn", because in that film Harry wears the
     * mantle. Appearances are derived from credits and one alias belongs to one
     * record, so Norman picks that film up as well. Harry gets it correctly via
     * his own name; Norman's entry for it is the cost of two men sharing a mask
     * across two films, and it is a cost this site pays knowingly rather than
     * by inventing per-title alias overrides.
     */
    aliases: ["Harry Osborn", "New Goblin"],
    category: "antivillain",
    affiliation: [],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "The goblin formula", ar: "تركيبة الغوبلن" },
      { en: "Sky-stick and bombs", ar: "لوح طائر وقنابل" },
      { en: "His father's company", ar: "شركة أبيه" },
    ],
    origin: {
      en: "Peter Parker's best friend and the son of the man who became the Green Goblin, spending every version of his story trying to be worth his father's attention and then to avenge him. He takes the mantle himself, which is the one thing his father would have understood.",
      ar: "أعزّ أصدقاء بيتر باركر وابن الرجل الذي صار الغرين غوبلن، يمضي كل نسخة من حكايته ساعيًا إلى أن يستحق التفات أبيه ثم إلى الثأر له. ثم يرث اللقب بنفسه، وهو الشيء الوحيد الذي كان أبوه ليفهمه.",
    },
    related: [
      { id: "green-goblin", kind: "family" },
      { id: "spider-man", kind: "ally" },
      { id: "mary-jane-watson", kind: "ally" },
    ],
  },
  {
    id: "ned-leeds",
    nameEn: "Ned Leeds",
    nameAr: "نِد ليدز",
    aliases: ["Ned Leeds", "Ned"],
    category: "supporting",
    affiliation: [],
    universe: ["sony", "mcu"],
    species: "Human",
    powers: [
      { en: "The guy in the chair", ar: "الرجل الذي في الكرسي" },
      { en: "Knew first", ar: "عرف قبل الجميع" },
      { en: "Very good at Lego", ar: "بارع جدًا في الليغو" },
    ],
    origin: {
      en: "Peter Parker's best friend, who works out the secret in about a day and appoints himself mission control. In the comics a reporter of the same name spent years being framed as the Hobgoblin, which is not this Ned's problem.",
      ar: "أعزّ أصدقاء بيتر باركر، يكتشف السرّ في يوم تقريبًا ثم ينصّب نفسه غرفةَ عمليات. وفي القصص المصوّرة أمضى صحفي بالاسم نفسه سنواتٍ متّهمًا بأنه الهوبغوبلن، وهي ليست مشكلة نِد هذا.",
    },
    related: [
      { id: "spider-man", kind: "ally" },
      { id: "michelle-jones", kind: "ally" },
    ],
  },
  {
    id: "mary-jane-watson",
    nameEn: "Mary Jane Watson",
    nameAr: "ماري جين واتسون",
    aliases: ["Mary Jane Watson", "Mary Jane"],
    category: "supporting",
    affiliation: [],
    universe: ["sony", "animation"],
    species: "Human",
    powers: [
      { en: "The girl next door", ar: "فتاة الجيرة" },
      { en: "Actor and survivor", ar: "ممثلة وناجية" },
      { en: "Rescued more often than she likes", ar: "تُنقذ أكثر مما يروقها" },
    ],
    origin: {
      en: "The girl from across the street, who has been the centre of Peter Parker's life for sixty years and has spent most of it being written as something that happens to him rather than someone it happens to.",
      ar: "الفتاة التي تسكن مقابل بيته، ظلّت ستين عامًا محور حياة بيتر باركر، وكُتبت في معظمها حدثًا يقع له لا شخصًا يقع لها الحدث.",
    },
    related: [
      { id: "spider-man", kind: "family" },
      { id: "harry-osborn", kind: "ally" },
    ],
  },
  {
    id: "michelle-jones",
    nameEn: "Michelle Jones",
    nameAr: "ميشيل جونز",
    /**
     * "MJ" GOES HERE, and it is a judgement rather than an obvious call.
     *
     * The MCU credits Zendaya as exactly "MJ" in all three films, so without
     * that alias this record would have no appearances at all. Mary Jane
     * Watson is credited by her full name everywhere she appears. The cost is
     * one false positive — Across the Spider-Verse credits an "MJ" who is
     * Miles's universe's Mary Jane — and the alternative was a character with
     * three films and an empty page.
     */
    aliases: ["Michelle Jones", "MJ", "Michelle Jones-Watson"],
    category: "supporting",
    affiliation: [],
    universe: ["sony", "mcu"],
    species: "Human",
    powers: [
      { en: "Reads people faster than they like", ar: "تقرأ الناس أسرع مما يريحهم" },
      { en: "Deadpan", ar: "سخرية بلا تعبير" },
      { en: "Decathlon captain", ar: "قائدة فريق العشاري" },
    ],
    origin: {
      en: "Not Mary Jane, and the film says so: a different person with the same initials, who reads Peter Parker correctly long before he tells her anything and is unimpressed by most of what she finds.",
      ar: "ليست ماري جين، والفيلم يقول ذلك صراحة: شخص آخر بالحرفين نفسيهما، تقرأ بيتر باركر على حقيقته قبل أن يخبرها بشيء، ولا يبهرها معظم ما تجد.",
    },
    related: [
      { id: "spider-man", kind: "family" },
      { id: "ned-leeds", kind: "ally" },
    ],
  },
  {
    id: "ben-parker",
    nameEn: "Ben Parker",
    nameAr: "بن باركر",
    aliases: ["Ben Parker", "Uncle Ben"],
    category: "supporting",
    affiliation: [],
    universe: ["sony", "animation"],
    species: "Human",
    powers: [
      { en: "Raised him", ar: "ربّاه" },
      { en: "One sentence that never leaves", ar: "جملة واحدة لا تفارقه" },
    ],
    origin: {
      en: "The uncle who raised Peter Parker and said the thing about power and responsibility. Every version of the story needs him for about twenty minutes and then needs him gone, which is the engine of the whole character.",
      ar: "العمّ الذي ربّى بيتر باركر وقال تلك العبارة عن القوة والمسؤولية. كل نسخة من الحكاية تحتاجه نحو عشرين دقيقة ثم تحتاج غيابه، وهذا هو محرّك الشخصية كلها.",
    },
    related: [
      { id: "spider-man", kind: "family" },
      { id: "aunt-may", kind: "family" },
    ],
  },
  {
    id: "squirrel-girl",
    nameEn: "Squirrel Girl",
    nameAr: "فتاة السنجاب",
    aliases: ["Squirrel Girl", "Doreen Green"],
    category: "hero",
    affiliation: [],
    universe: ["animation", "legacy"],
    species: "Mutate",
    powers: [
      { en: "Talks to squirrels", ar: "تحادث السناجب" },
      { en: "Proportional strength of a squirrel", ar: "قوة سنجاب بالتناسب" },
      { en: "Knuckle spikes and a tail", ar: "أشواك في القبضة وذيل" },
      { en: "Undefeated", ar: "لم تُهزم قط" },
    ],
    origin: {
      en: "A computer science student who can talk to squirrels, which sounds like a joke until you read her record: she has beaten Doctor Doom, Thanos and Galactus, and the comics play every one of those straight. Her usual method is talking to people rather than hitting them.",
      ar: "طالبة علوم حاسوب تحادث السناجب، وهو ما يبدو نكتةً حتى تقرأ سجلّها: هزمت دكتور دووم وثانوس وجالاكتوس، والقصص المصوّرة تروي كل واحدة منها بجدّية تامة. وأسلوبها المعتاد محادثة خصومها لا ضربهم.",
    },
    related: [
      { id: "ms-marvel", kind: "ally" },
      { id: "doctor-doom", kind: "enemy" },
    ],
  },
  {
    id: "starfox",
    nameEn: "Starfox",
    nameAr: "ستارفوكس",
    aliases: ["Starfox", "Eros"],
    category: "hero",
    affiliation: [],
    universe: ["mcu", "legacy"],
    species: "Titan",
    powers: [
      { en: "Stimulates pleasure in others", ar: "يثير السرور في الآخرين" },
      { en: "Flight", ar: "طيران" },
      { en: "Eternal of Titan", ar: "أزليّ من تيتان" },
    ],
    origin: {
      en: "Thanos's brother, and as light as Thanos is heavy: an Eternal of Titan who can make anyone feel better about anything, which the comics have spent decades treating as charming and then as a serious problem.",
      ar: "أخو ثانوس، وخفيفٌ بقدر ما هو ثقيل: أزليّ من تيتان يستطيع أن يجعل أي أحد يشعر بتحسّن حيال أي شيء، وهو ما عاملته القصص المصوّرة عقودًا بوصفه ظرفًا ثم بوصفه مشكلة جدّية.",
    },
    related: [
      { id: "thanos", kind: "family" },
      { id: "eternity", kind: "ally" },
    ],
  },
  {
    id: "yondu",
    nameEn: "Yondu",
    nameAr: "يوندو",
    aliases: ["Yondu", "Yondu Udonta"],
    category: "antihero",
    affiliation: [],
    universe: ["mcu", "legacy"],
    species: "Centaurian",
    powers: [
      { en: "A whistle-steered arrow", ar: "سهم يوجّهه بالصفير" },
      { en: "Ravager captain", ar: "قائد بين الرافيجرز" },
      { en: "Raised him badly and on purpose", ar: "ربّاه بسوء وعن قصد" },
    ],
    origin: {
      en: "The Ravager who was paid to deliver a boy to his father, kept him instead, and spent twenty years being a worse parent than he had to be so the boy would never be handed over. He does not explain any of that until it is too late to matter.",
      ar: "الرافيجر الذي تقاضى أجرًا ليسلّم صبيًّا إلى أبيه، فاحتفظ به بدلًا من ذلك، وأمضى عشرين عامًا أبًا أسوأ مما كان يلزم كي لا يُسلَّم الصبي أبدًا. ولا يشرح شيئًا من هذا إلا بعد فوات أوان الشرح.",
    },
    related: [
      { id: "star-lord", kind: "family" },
      { id: "rocket", kind: "ally" },
      { id: "kraglin", kind: "ally" },
    ],
  },
  {
    id: "sentinels",
    nameEn: "Sentinels",
    nameAr: "الحُرّاس",
    aliases: ["Sentinel", "Sentinels"],
    category: "villain",
    affiliation: [],
    universe: ["fox", "legacy"],
    species: "Machine",
    powers: [
      { en: "Built to hunt mutants", ar: "صُنعت لاصطياد الطافرين" },
      { en: "Adapt to any power", ar: "تتكيّف مع أي قدرة" },
      { en: "Made in numbers", ar: "تُصنع بالآلاف" },
    ],
    origin: {
      en: "Machines built by humans to hunt mutants, which is the X-Men's whole argument turned into hardware. The Days of Future Past ones adapt to whatever they are hit with, so the story ends with nobody able to fight them at all.",
      ar: "آلات بناها البشر لاصطياد الطافرين، وهي حجة إكس مِن كلها مصبوبةً في عتاد. وحُرّاس «أيام مستقبل ماضٍ» تتكيّف مع كل ما يُضرب به، فتنتهي الحكاية بألّا يقدر أحد على قتالها.",
    },
    related: [
      { id: "professor-x", kind: "enemy" },
      { id: "magneto", kind: "enemy" },
    ],
  },
  {
    id: "captain-carter",
    nameEn: "Captain Carter",
    nameAr: "كابتن كارتر",
    /**
     * A VARIANT, not an alias — and the distinction is the one this corpus
     * keeps making. Marc Spector and Mr. Knight are one man with two names, so
     * one record. Captain Carter is a DIFFERENT Peggy, from a universe where
     * she took the serum instead of Steve, and the multiverse is the one thing
     * this site models that nobody else does. Two records, joined by `variant`.
     *
     * She is also credited separately: Multiverse of Madness credits Hayley
     * Atwell as "Captain Carter", not as Peggy.
     */
    aliases: ["Captain Carter", "Peggy Carter / Captain Carter"],
    category: "hero",
    affiliation: ["Avengers"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "The super-soldier serum", ar: "مصل الجندي الخارق" },
      { en: "Vibranium shield", ar: "درع من الفيبرانيوم" },
      { en: "The agent who was already better", ar: "العميلة التي كانت أفضل أصلًا" },
    ],
    origin: {
      en: "The Peggy Carter from a universe where she stepped into the chamber instead of Steve Rogers. She was the better tactician in every version of the story; this is the one where somebody let her take the serum too.",
      ar: "بيغي كارتر من كونٍ دخلت فيه الحجرة بدل ستيف روجرز. كانت الأمهر تكتيكيًا في كل نسخة من الحكاية، وهذه النسخة التي سُمح لها فيها بأخذ المصل أيضًا.",
    },
    related: [
      { id: "peggy-carter", kind: "variant" },
      { id: "captain-america", kind: "ally" },
    ],
  },
  {
    id: "ironheart",
    nameEn: "Ironheart",
    nameAr: "آيرون هارت",
    aliases: ["Ironheart", "Riri Williams"],
    category: "hero",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Built her own suit at fifteen", ar: "بنت بذلتها في الخامسة عشرة" },
      { en: "Engineer", ar: "مهندسة" },
      { en: "Flight and repulsors", ar: "طيران وأشعة دافعة" },
    ],
    origin: {
      en: "An MIT student who reverse-engineered an Iron Man suit out of scavenged parts because she could, and then had to work out what she was going to do with it. She is the answer to what Tony Stark left behind rather than a copy of him.",
      ar: "طالبة في إم آي تي عكست هندسة بذلة الرجل الحديدي من قطع مستعادة لأنها تستطيع، ثم وجب عليها أن تكتشف ما ستفعله بها. هي جواب ما تركه توني ستارك خلفه لا نسخة منه.",
    },
    related: [
      { id: "iron-man", kind: "variant" },
      { id: "kate-bishop", kind: "team" },
    ],
  },
  {
    id: "kid-loki",
    nameEn: "Kid Loki",
    nameAr: "لوكي الصغير",
    aliases: ["Kid Loki"],
    category: "antihero",
    affiliation: ["Young Avengers", "Loki variants"],
    universe: ["mcu"],
    species: "Frost Giant",
    powers: [
      { en: "Illusions", ar: "أوهام" },
      { en: "Killed his own Thor", ar: "قتل ثوره الخاص" },
      { en: "Runs the Void", ar: "يحكم الفراغ" },
    ],
    origin: {
      en: "A Loki variant pruned to the Void as a child, who survived long enough to be the one the others follow. He is the youngest and the most obviously in charge, which is the joke and the point.",
      ar: "نسخة من لوكي شُذّبت إلى الفراغ وهو طفل، فنجا حتى صار من يتبعه الآخرون. أصغرهم سنًّا وأظهرهم قيادةً، وتلك النكتة وتلك الفكرة معًا.",
    },
    related: [
      { id: "loki", kind: "variant" },
      { id: "sylvie", kind: "variant" },
    ],
  },
  {
    id: "cassie-lang",
    nameEn: "Cassie Lang",
    nameAr: "كاسي لانغ",
    aliases: ["Cassie Lang", "Cassie", "Stature"],
    category: "hero",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Pym particles", ar: "جزيئات بيم" },
      { en: "Grows and shrinks", ar: "تكبر وتصغر" },
      { en: "Built the signal herself", ar: "بنت الإشارة بنفسها" },
    ],
    origin: {
      en: "Scott Lang's daughter, who grew up across the five years he lost and built her own way into the Quantum Realm while he was working out how to be a father to someone older than he remembered.",
      ar: "ابنة سكوت لانغ، كبرت خلال السنوات الخمس التي فقدها، وبنت طريقها الخاص إلى عالم الكم بينما كان يحاول أن يكون أبًا لمن صارت أكبر مما يتذكّر.",
    },
    related: [
      { id: "ant-man", kind: "family" },
      { id: "wasp", kind: "ally" },
    ],
  },
  {
    id: "love",
    nameEn: "Love",
    nameAr: "لَف",
    /**
     * Credited as "Gorr's Daughter", never as "Love" — the name is spoken in
     * the film and not in the billing. Both aliases, so the credit matches and
     * a reader searching the name she is actually called still finds her.
     */
    aliases: ["Love", "Gorr's Daughter"],
    category: "hero",
    affiliation: ["Young Avengers"],
    universe: ["mcu"],
    species: "God",
    powers: [
      { en: "The Stormbreaker's charge", ar: "شحنة ستورم بريكر" },
      { en: "Raised by Thor", ar: "ربّاها ثور" },
    ],
    origin: {
      en: "Gorr's daughter, wished back into life by a dying father who asked Eternity for her instead of for revenge, and handed to Thor to raise. The last thing the god-butcher does is make one.",
      ar: "ابنة غور، أعادها إلى الحياة أبٌ محتضر سأل الأزل إياها بدل الانتقام، ثم سلّمها إلى ثور ليربّيها. وآخر ما يفعله قاتل الآلهة أن يصنع واحدًا.",
    },
    related: [
      { id: "thor", kind: "family" },
      { id: "eternity", kind: "ally" },
    ],
  },
  {
    id: "mobius",
    nameEn: "Mobius M. Mobius",
    nameAr: "موبيوس إم. موبيوس",
    aliases: ["Mobius M. Mobius", "Mobius"],
    category: "supporting",
    affiliation: ["TVA"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Analyst, TVA", ar: "محلّل في هيئة التباين الزمني" },
      { en: "Knows every Loki", ar: "يعرف كل نسخة من لوكي" },
      { en: "Would like a jet ski", ar: "يودّ لو يقتني درّاجة مائية" },
    ],
    origin: {
      en: "The TVA analyst who has read every file on every Loki and decides to talk to one instead of pruning him. He believes in the institution completely, right up until he reads his own file.",
      ar: "محلّل الهيئة الذي قرأ كل ملف عن كل نسخة من لوكي، فقرّر أن يحادث واحدًا منهم بدل تشذيبه. يؤمن بالمؤسسة إيمانًا تامًا، إلى أن يقرأ ملفّه هو.",
    },
    related: [
      { id: "loki", kind: "ally" },
      { id: "ouroboros", kind: "ally" },
    ],
  },
  {
    id: "ouroboros",
    nameEn: "Ouroboros",
    nameAr: "أوروبوروس",
    aliases: ["Ouroboros 'OB'", "Ouroboros", "O.B."],
    category: "supporting",
    affiliation: ["TVA"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Repairs and Advancement", ar: "قسم الإصلاح والتطوير" },
      { en: "Wrote the manual", ar: "كتب الدليل بنفسه" },
      { en: "Alone down there for centuries", ar: "وحيد في الأسفل منذ قرون" },
    ],
    origin: {
      en: "The entire Repairs and Advancement department, one man, who wrote the TVA handbook and has been waiting decades for somebody to come down and ask him a question about it.",
      ar: "قسم الإصلاح والتطوير بأكمله في رجل واحد، كتب دليل الهيئة وظلّ عقودًا ينتظر أن ينزل أحد ليسأله عنه.",
    },
    related: [
      { id: "mobius", kind: "ally" },
      { id: "loki", kind: "ally" },
    ],
  },
  {
    id: "miss-minutes",
    nameEn: "Miss Minutes",
    nameAr: "الآنسة مينتس",
    aliases: ["Miss Minutes"],
    category: "villain",
    affiliation: ["TVA"],
    universe: ["mcu"],
    species: "Artificial intelligence",
    powers: [
      { en: "Runs on every TVA screen", ar: "تعمل على كل شاشة في الهيئة" },
      { en: "Cartoon clock, real agenda", ar: "ساعة كرتونية بغاية حقيقية" },
      { en: "Answers to He Who Remains", ar: "تأتمر بأمر الباقي" },
    ],
    origin: {
      en: "The TVA's animated mascot, a smiling orange clock who explains the rules in a training video and turns out to have been in the room for every decision that mattered.",
      ar: "تميمة الهيئة المتحركة: ساعة برتقالية مبتسمة تشرح القواعد في فيلم تدريبي، ثم يتبيّن أنها كانت حاضرة في كل قرار مهم.",
    },
    related: [
      { id: "he-who-remains", kind: "ally" },
      { id: "mobius", kind: "enemy" },
    ],
  },
  {
    id: "classic-loki",
    nameEn: "Classic Loki",
    nameAr: "لوكي الكلاسيكي",
    aliases: ["Classic Loki"],
    category: "antihero",
    affiliation: ["Magic", "Loki variants"],
    universe: ["mcu"],
    species: "Frost Giant",
    powers: [
      { en: "Illusions on an enormous scale", ar: "أوهام بمقياس هائل" },
      { en: "Survived by hiding for decades", ar: "نجا بالاختباء عقودًا" },
    ],
    origin: {
      en: "The Loki who faked his death on Thanos's ship and spent a lifetime alone on a planet, which he eventually could not bear. His last illusion is the largest anyone in the series casts.",
      ar: "لوكي الذي زيّف موته على متن سفينة ثانوس وأمضى عمرًا وحيدًا على كوكب، حتى لم يعد يحتمل. وآخر أوهامه أضخم ما يصنعه أحد في المسلسل.",
    },
    related: [{ id: "loki", kind: "variant" }],
  },
  {
    id: "boastful-loki",
    nameEn: "Boastful Loki",
    nameAr: "لوكي المتباهي",
    aliases: ["Boastful Loki"],
    category: "antihero",
    affiliation: ["Loki variants"],
    universe: ["mcu"],
    species: "Frost Giant",
    powers: [
      { en: "Claims a great deal", ar: "يدّعي الكثير" },
      { en: "A hammer, allegedly", ar: "مطرقة، على حدّ زعمه" },
    ],
    origin: {
      en: "A Loki who says he killed Captain America and Iron Man with his bare hands, in a group of Lokis where nobody believes anybody. The betrayal is telegraphed and lands anyway.",
      ar: "لوكي يقول إنه قتل كابتن أمريكا والرجل الحديدي بيديه العاريتين، في جماعة من الـلوكي لا يصدّق فيها أحد أحدًا. والخيانة متوقّعة وتقع رغم ذلك.",
    },
    related: [{ id: "loki", kind: "variant" }],
  },
  {
    id: "monica-rambeau",
    nameEn: "Monica Rambeau",
    nameAr: "مونيكا رامبو",
    aliases: ["Monica Rambeau", "Monica", "Photon"],
    category: "hero",
    affiliation: [],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Becomes any part of the spectrum", ar: "تتحوّل إلى أي جزء من الطيف" },
      { en: "Passes through energy", ar: "تعبر الطاقة" },
      { en: "S.W.O.R.D. captain", ar: "قائدة في سورد" },
    ],
    origin: {
      en: "Maria Rambeau's daughter, who grew up with Carol Danvers in the house and then lost five years to the Blip. She walks into the Westview anomaly a S.W.O.R.D. agent and comes out something else.",
      ar: "ابنة ماريا رامبو، نشأت وكارول دانفرز في البيت، ثم فقدت خمس سنوات في الوميض. تدخل شذوذ ويستفيو عميلةً في سورد وتخرج شيئًا آخر.",
    },
    related: [
      { id: "captain-marvel", kind: "family" },
      { id: "ms-marvel", kind: "team" },
      { id: "scarlet-witch", kind: "ally" },
    ],
  },
  {
    id: "alligator-loki",
    nameEn: "Alligator Loki",
    nameAr: "لوكي التمساح",
    aliases: ["Alligator Loki"],
    category: "antihero",
    affiliation: ["Asgard", "Loki variants"],
    universe: ["mcu"],
    species: "Alligator",
    powers: [
      { en: "Is an alligator", ar: "تمساح" },
      { en: "Wears the horns", ar: "يعتمر القرنين" },
      { en: "Nobody checks", ar: "لا أحد يتحقّق" },
    ],
    origin: {
      en: "A Loki variant who is an alligator, found in the Void wearing the horns. The series never explains him and never needs to: the other Lokis accept him instantly, which tells you everything about how much they trust their own story.",
      ar: "نسخة من لوكي هي تمساح، وُجدت في الفراغ معتمرةً القرنين. لا يفسّره المسلسل قط ولا يحتاج: يقبله بقية الـلوكي فورًا، وهذا يخبرك بكل شيء عن مدى ثقتهم بحكايتهم.",
    },
    /* An alligator in horns, in the Void from episode five on. TMDB credits no performer for a puppet. */
    alsoIn: ["loki-s1"],
    related: [
      { id: "loki", kind: "variant" },
      { id: "classic-loki", kind: "ally" },
    ],
  },
  {
    id: "throg",
    nameEn: "Throg",
    nameAr: "ثروغ",
    aliases: ["Throg", "Frog Thor", "Frog of Thunder"],
    category: "hero",
    affiliation: ["Asgard"],
    universe: ["mcu", "animation", "legacy"],
    species: "Frog",
    powers: [
      { en: "A splinter of Mjolnir", ar: "شظية من ميولنير" },
      { en: "Worthy, at frog scale", ar: "جدير، بمقياس ضفدع" },
      { en: "The thunder, smaller", ar: "الرعد، أصغر" },
    ],
    origin: {
      en: "A frog who lifted a splinter of Mjolnir and became worthy, which is the joke and also exactly how the rule works. Loki turned Thor into a frog once; this is a different frog, and the comics are firm about the distinction.",
      ar: "ضفدع رفع شظية من ميولنير فصار جديرًا، وتلك هي النكتة وهي أيضًا عين ما تقوله القاعدة. حوّل لوكي ثور إلى ضفدع مرة، وهذا ضفدع آخر، والقصص المصوّرة حازمة في التفريق.",
    },
    related: [
      { id: "thor", kind: "ally" },
      { id: "loki", kind: "enemy" },
    ],
  },
  {
    id: "president-loki",
    nameEn: "President Loki",
    nameAr: "الرئيس لوكي",
    /**
     * NOT SEPARATELY CREDITED, and that is why his page will say he has never
     * been on screen when he plainly has.
     *
     * Appearances on this site are DERIVED from cast credits, never typed.
     * TMDB credits Tom Hiddleston once for the whole series, as "Loki
     * Laufeyson", so every variant he plays resolves to the main record. There
     * is no President Loki credit to match, and inventing an appearance would
     * be typing the one thing this corpus refuses to type.
     */
    aliases: ["President Loki"],
    category: "villain",
    affiliation: ["Loki variants"],
    universe: ["mcu"],
    species: "Frost Giant",
    powers: [
      { en: "Ran for office, in the Void", ar: "ترشّح للرئاسة، في الفراغ" },
      { en: "Betrayed by his own cabinet", ar: "خانه وزراؤه" },
      { en: "Illusions", ar: "أوهام" },
    ],
    origin: {
      en: "The Loki who conquered a corner of the Void by promising the other Lokis a share of it, and was betrayed by them roughly nine seconds later. He loses a hand for it, which the other Lokis find very funny.",
      ar: "لوكي الذي احتلّ ركنًا من الفراغ بأن وعد بقية الـلوكي بنصيب منه، فخانوه بعد تسع ثوانٍ تقريبًا. ويفقد يده ثمنًا لذلك، وهو ما يراه بقية الـلوكي مضحكًا جدًا.",
    },
    /* Leads the mob of Lokis in the Void. Hiddleston plays him, credited only as Loki. */
    alsoIn: ["loki-s1"],
    related: [
      { id: "loki", kind: "variant" },
      { id: "classic-loki", kind: "ally" },
      { id: "alligator-loki", kind: "ally" },
    ],
  },
  {
    id: "ronan",
    nameEn: "Ronan the Accuser",
    nameAr: "رونان المُتّهِم",
    aliases: ["Ronan", "Ronan the Accuser"],
    category: "villain",
    affiliation: [],
    universe: ["mcu", "legacy"],
    species: "Kree",
    powers: [
      { en: "The Universal Weapon", ar: "السلاح الكوني" },
      { en: "Kree strength", ar: "قوة الكري" },
      { en: "Held the Power Stone", ar: "حمل حجر القوة" },
    ],
    origin: {
      en: "A Kree zealot who refuses the peace treaty his own empire signed and goes to war on his own account, then finds a stone that makes the war winnable. He works for Thanos exactly as long as that suits him.",
      ar: "متعصّب من الكري يرفض معاهدة السلام التي وقّعتها إمبراطوريته، فيخوض الحرب على حسابه الخاص، ثم يجد حجرًا يجعل الحرب قابلة للكسب. ويعمل لدى ثانوس بقدر ما يخدمه ذلك فقط.",
    },
    related: [
      { id: "thanos", kind: "enemy" },
      { id: "nebula", kind: "ally" },
      { id: "gamora", kind: "enemy" },
      { id: "star-lord", kind: "enemy" },
      { id: "captain-marvel", kind: "enemy" },
    ],
  },
  {
    id: "black-knight",
    nameEn: "Black Knight",
    nameAr: "الفارس الأسود",
    aliases: ["Black Knight", "Dane Whitman"],
    category: "hero",
    affiliation: [],
    universe: ["mcu", "legacy"],
    species: "Human",
    powers: [
      { en: "The Ebony Blade", ar: "النصل الأبنوسي" },
      { en: "Cuts anything", ar: "يقطع أي شيء" },
      { en: "The blade wants to be used", ar: "النصل يريد أن يُستعمل" },
    ],
    origin: {
      en: "A museum historian who finds out what his family has been keeping in a case, and reaches for it in the last thirty seconds of a film that never comes back to explain. The Ebony Blade is cursed and the curse is the whole character.",
      ar: "مؤرّخ في متحف يكتشف ما تحفظه عائلته في صندوق، فيمدّ يده إليه في آخر ثلاثين ثانية من فيلم لا يعود ليشرح. النصل الأبنوسي ملعون، واللعنة هي الشخصية كلها.",
    },
    related: [
      { id: "sersi", kind: "ally" },
      { id: "blade", kind: "ally" },
    ],
  },
  {
    id: "phil-coulson",
    nameEn: "Phil Coulson",
    nameAr: "فيل كولسون",
    aliases: ["Phil Coulson", "Agent Coulson", "Agent Phil Coulson", "Coulson"],
    category: "supporting",
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu", "marvel-tv"],
    species: "Human",
    powers: [
      { en: "Turns up before anyone else", ar: "يصل قبل الجميع" },
      { en: "Vintage trading cards", ar: "بطاقات تجميع قديمة" },
      { en: "Unfailingly polite", ar: "مؤدّب دائمًا" },
    ],
    origin: {
      en: "The S.H.I.E.L.D. agent who knocks on the door in the first film and keeps knocking for six more. He is how the early MCU connected to itself before there was an Avengers to connect it: the man in the suit standing in someone's living room explaining that this is bigger than them.",
      ar: "عميل شيلد الذي يطرق الباب في الفيلم الأول ويظل يطرق في ستة أفلام بعده. هو الطريقة التي ارتبط بها عالم مارفل المبكر بنفسه قبل أن يوجد منتقمون يربطونه: الرجل بالبذلة واقفًا في غرفة معيشة أحدهم يشرح أن الأمر أكبر منه.",
    },
    related: [
      { id: "nick-fury", kind: "ally" },
      { id: "iron-man", kind: "ally" },
      { id: "maria-hill", kind: "ally" },
      { id: "captain-marvel", kind: "ally" },
    ],
  },
  {
    id: "spider-punk",
    nameEn: "Spider-Punk",
    nameAr: "سبايدر-بانك",
    aliases: ["Spider-Punk", "Hobie Brown"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "Anarchy, as a method", ar: "الفوضوية بوصفها منهجًا" },
      { en: "A guitar that is also a weapon", ar: "قيثارة هي أيضًا سلاح" },
      { en: "Animates in his own frame rate", ar: "يتحرّك بمعدّل إطاراته الخاص" },
    ],
    origin: {
      en: "A British punk from a London under a fascist regime, who joined the Spider-Society specifically to steal from it. He is animated in a different style and a different frame rate from everyone around him, which is the film saying he does not belong to their system.",
      ar: "بانك بريطاني من لندن تحت حكم فاشي، انضم إلى جمعية العناكب خصّيصًا ليسرق منها. يُرسَم بأسلوب مختلف وبمعدّل إطارات مختلف عمّن حوله، وهي طريقة الفيلم في القول إنه لا ينتمي إلى نظامهم.",
    },
    related: [
      { id: "miles-morales", kind: "ally" },
      { id: "gwen-stacy", kind: "ally" },
      { id: "spider-man-2099", kind: "enemy" },
    ],
  },
  {
    id: "madame-web",
    nameEn: "Madame Web",
    nameAr: "مدام ويب",
    aliases: ["Madame Web", "Cassandra Webb", "Cassie Webb"],
    category: "hero",
    affiliation: [],
    universe: ["sony", "legacy"],
    species: "Human mutate",
    powers: [
      { en: "Sees what has not happened yet", ar: "ترى ما لم يقع بعد" },
      { en: "Clairvoyance", ar: "استبصار" },
      { en: "Blind, in the comics", ar: "كفيفة، في القصص المصوّرة" },
    ],
    origin: {
      en: "A paramedic who drowns, is revived, and comes back seeing a few seconds ahead of everyone else. In the comics she is an elderly blind woman wired into a life-support web, which is where the name comes from and which the film declines to explain.",
      ar: "مسعفة تغرق ثم تُنعش فتعود ترى ثوانيَ قبل الجميع. وفي القصص المصوّرة هي امرأة عجوز كفيفة موصولة بشبكة إنعاش، ومن هناك جاء الاسم، وهو ما يمتنع الفيلم عن شرحه.",
    },
    related: [
      { id: "julia-carpenter", kind: "ally" },
      { id: "ezekiel-sims", kind: "enemy" },
    ],
  },
  {
    id: "julia-carpenter",
    nameEn: "Spider-Woman (Julia Carpenter)",
    nameAr: "المرأة العنكبوت (جوليا كاربنتر)",
    aliases: ["Julia Cornwall", "Julia Carpenter", "Spider-Woman II"],
    category: "hero",
    affiliation: [],
    universe: ["sony", "legacy"],
    species: "Human mutate",
    powers: [
      { en: "Psionic webs", ar: "شباك ذهنية" },
      { en: "Wall-crawling", ar: "تسلّق الجدران" },
      { en: "Becomes the next Madame Web", ar: "تصير مدام ويب التالية" },
    ],
    origin: {
      en: "One of three teenagers a stranger tells will one day be heroes, which is the whole plot of the film she is in. In the comics she is the second Spider-Woman and later inherits the Madame Web name outright.",
      ar: "إحدى ثلاث مراهقات يخبرهنّ غريبٌ بأنهنّ سيصرن بطلات يومًا، وتلك حبكة الفيلم كلها. وفي القصص المصوّرة هي المرأة العنكبوت الثانية، ثم ترث اسم مدام ويب بالكامل.",
    },
    related: [{ id: "madame-web", kind: "ally" }],
  },
  {
    id: "anya-corazon",
    nameEn: "Anya Corazón",
    nameAr: "آنيا كورازون",
    aliases: ["Anya Corazón", "Anya Corazon", "Araña"],
    category: "hero",
    affiliation: [],
    universe: ["sony", "legacy"],
    species: "Human mutate",
    powers: [
      { en: "An exoskeleton she can summon", ar: "هيكل خارجي تستدعيه" },
      { en: "Spider strength and agility", ar: "قوة العنكبوت ورشاقته" },
    ],
    origin: {
      en: "A New York teenager caught up in a war between two ancient spider clans and given an exoskeleton she did not ask for. She goes by Araña before she goes by Spider-Girl.",
      ar: "مراهقة من نيويورك تقع في حرب بين عشيرتَي عناكب قديمتين، فتُمنح هيكلًا خارجيًا لم تطلبه. تُعرف باسم أرانيا قبل أن تُعرف باسم سبايدر-غيرل.",
    },
    related: [{ id: "madame-web", kind: "ally" }],
  },
  {
    id: "mattie-franklin",
    nameEn: "Mattie Franklin",
    nameAr: "ماتي فرانكلين",
    aliases: ["Mattie Franklin", "Martha Franklin"],
    category: "hero",
    affiliation: [],
    universe: ["sony", "legacy"],
    species: "Human mutate",
    powers: [
      { en: "Flight", ar: "طيران" },
      { en: "Spider strength", ar: "قوة العنكبوت" },
      { en: "The third Spider-Woman", ar: "المرأة العنكبوت الثالثة" },
    ],
    origin: {
      en: "A teenager who took her uncle's place in an occult ritual and came out of it with powers, then spent a stretch of the comics standing in for Spider-Man while nobody noticed the difference.",
      ar: "مراهقة حلّت محلّ عمّها في طقس غامض فخرجت منه بقدرات، ثم أمضت فترة في القصص المصوّرة نائبةً عن سبايدرمان من دون أن ينتبه أحد للفرق.",
    },
    related: [{ id: "madame-web", kind: "ally" }],
  },
  {
    id: "ezekiel-sims",
    nameEn: "Ezekiel Sims",
    nameAr: "إزيكيال سيمز",
    aliases: ["Ezekiel Sims", "Ezekiel"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "legacy"],
    species: "Human mutate",
    powers: [
      { en: "The same powers, taken not given", ar: "القدرات نفسها، مأخوذة لا موهوبة" },
      { en: "Knows what the spider means", ar: "يعرف ما يعنيه العنكبوت" },
    ],
    origin: {
      en: "A man who took spider powers in a ritual rather than receiving them by accident, and who spends his time hunting the people fate says will kill him. In the comics he is the first person to tell Peter Parker the bite might not have been chance.",
      ar: "رجل نال قدرات العنكبوت بطقس لا بمصادفة، ويمضي وقته يطارد من يقول القدر إنهم سيقتلونه. وفي القصص المصوّرة هو أول من يخبر بيتر باركر بأن اللدغة ربما لم تكن مصادفة.",
    },
    related: [{ id: "madame-web", kind: "enemy" }],
  },
];

/**
 * THE THREE LIVE-ACTION PETERS.
 *
 * Every one of them is Peter Parker, which is exactly why they could not be
 * told apart by name — and why these records carry NO ALIASES. They join the
 * cast data on `performerOf` instead: character plus actor, both of which TMDB
 * already gives for every credit. So none of them can take a credit from the
 * main Spider-Man record, and the main record is untouched.
 *
 * Their films, their portrayals and their relations are all derived from that
 * one key. Nothing here lists a title.
 *
 * `related` is deliberately empty. The relations are computed: whoever the
 * main Spider-Man is connected to AND who actually shares a film with this
 * Peter. That is how Tobey's ends up with the Green Goblin and Doc Ock,
 * Andrew's with Gwen Stacy and the Lizard, and Tom's with Ned and Mysterio,
 * without anybody typing a single edge.
 */
/**
 * WHITE VISION, who is a different being wearing the same body.
 *
 * WandaVision rebuilds the Vision out of the wreckage, colourless and with no
 * memories, and the season ends with him deciding he is not the one who died.
 * That is the whole argument of the finale, and the corpus had one Vision.
 *
 * He needs `alsoIn` because Paul Bettany is credited as "Vision / The Vision"
 * for both — one credit, two beings. No matcher can split that, and no alias
 * can either: giving this record "Vision" would hand it every film the real
 * one is in. So his single appearance is stated, and his aliases are the names
 * only he answers to.
 */
const whiteVision: CharacterDraft[] = [
  {
    id: "white-vision",
    nameEn: "White Vision",
    nameAr: "الرؤية البيضاء",
    aliases: ["White Vision"],
    category: "antihero",
    affiliation: [],
    universe: ["mcu"],
    species: "Synthezoid",
    powers: [
      { en: "Density control", ar: "التحكم في الكثافة" },
      { en: "Flight", ar: "الطيران" },
      { en: "Total recall, no memory", ar: "ذاكرة كاملة بلا ذكريات" },
    ],
    origin: {
      en: "S.W.O.R.D. rebuilds the Vision's body from the pieces, drained of colour and of everything he was. He is given his memories back by the version of himself he was sent to destroy, and then flies away to work out what that makes him.",
      ar: "تعيد «سورد» بناء جسد الرؤية من الأشلاء، مجرّدًا من لونه ومن كل ما كانه. تعيد إليه ذكرياته نسخةٌ من نفسه أُرسل ليدمّرها، ثم يطير بعيدًا ليكتشف ما الذي يجعله ذلك.",
    },
    /* The finale is his whole existence so far. One credit covers both, so
       nothing reading the cast can find him. */
    alsoIn: ["wandavision-s1"],
    related: [
      { id: "vision", kind: "variant" },
      { id: "scarlet-witch", kind: "ally" },
    ],
  },
];


/**
 * FIVE THE CORPUS HAD MISSED, every one of them a real TMDB credit.
 *
 * Nothing here needs `alsoIn` and nothing needs a `performerOf`: Harley
 * Keener, Trevor Slattery, Aldrich Killian, Surtur and Zemo are all credited
 * by name, so the matcher finds their films the moment the record exists. They
 * were absent for the ordinary reason — nobody had written them down.
 *
 * TREVOR SLATTERY IS NOT THE MANDARIN, and they are two records for exactly
 * that reason. The joke of Iron Man 3 is that the terrifying figure on the
 * broadcast is an actor who has no idea what he is fronting, and Shang-Chi
 * later introduces the real one. Folding them together would erase the
 * distinction both films are built on.
 */
const laterAdditions: CharacterDraft[] = [
  {
    id: "harley-keener",
    nameEn: "Harley Keener",
    nameAr: "هارلي كينر",
    /* A bare given name is a landmine; see Trevor Slattery below. */
    aliases: ["Harley Keener"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Builds things out of nothing", ar: "يصنع الأشياء من لا شيء" },
      { en: "Unimpressed by celebrity", ar: "لا تبهره الشهرة" },
    ],
    origin: {
      en: "A kid in a Tennessee garage who finds Iron Man on his doorstep with a broken suit and no plan. He fixes what he can, argues with him about the rest, and is the only person in that film who treats Tony Stark as ordinary.",
      ar: "فتى في مرآب بولاية تينيسي يجد الرجل الحديدي على عتبته ببذلة معطّلة وبلا خطة. يُصلح ما يستطيع، ويجادله في الباقي، وهو الوحيد في ذلك الفيلم الذي يعامل توني ستارك كشخص عادي.",
    },
    related: [{ id: "iron-man", kind: "ally" }],
  },
  {
    id: "trevor-slattery",
    nameEn: "Trevor Slattery",
    nameAr: "تريفور سلاتري",
    /* NOT bare "Trevor". It matched a character called Trevor in The Gifted,
       a Fox X-Men series he has nothing to do with — the same shared-alias
       failure the C18 guard exists to catch, caught here by reading the
       derived list instead of trusting it. */
    aliases: ["Trevor Slattery"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Stage training", ar: "تدريب مسرحي" },
      { en: "No idea what he is part of", ar: "لا يدرك ما هو جزء منه" },
    ],
    origin: {
      en: "A washed-up British actor hired to play a terrorist on television, who takes the role because it comes with a house and a boat and never asks who is writing his lines. Years later the man whose name he borrowed sends someone to collect him.",
      ar: "ممثل بريطاني انتهى زمنه يُستأجر ليؤدي دور إرهابي على التلفزيون، فيقبل الدور لأنه يأتي مع بيت وقارب، ولا يسأل قط من يكتب جمله. وبعد سنوات يرسل صاحب الاسم الذي استعاره من يقبض عليه.",
    },
    related: [
      { id: "the-mandarin", kind: "enemy" },
      { id: "iron-man", kind: "enemy" },
    ],
  },
  {
    id: "aldrich-killian",
    nameEn: "Aldrich Killian",
    nameAr: "ألدريتش كيليان",
    aliases: ["Aldrich Killian", "Killian"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Extremis regeneration", ar: "تجدّد بواسطة إكستريمِس" },
      { en: "Burns at 3000 degrees", ar: "يشتعل عند ثلاثة آلاف درجة" },
      { en: "Runs a think tank", ar: "يدير مركز أبحاث" },
    ],
    origin: {
      en: "A scientist Tony Stark humiliated on a rooftop in 1999 and forgot about by morning. He spends thirteen years building a company, a treatment that rewrites the human body, and a terrorist who does not exist.",
      ar: "عالِم أذلّه توني ستارك على سطح مبنى عام 1999 ثم نسيه قبل الصباح. يقضي ثلاثة عشر عامًا في بناء شركة، وعلاج يعيد كتابة الجسد البشري، وإرهابيّ لا وجود له.",
    },
    related: [
      { id: "iron-man", kind: "enemy" },
      { id: "trevor-slattery", kind: "ally" },
    ],
  },
  {
    id: "surtur",
    nameEn: "Surtur",
    nameAr: "سورتر",
    aliases: ["Surtur"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Fire demon",
    powers: [
      { en: "The Twilight Sword", ar: "سيف الشفق" },
      { en: "Grows without limit", ar: "ينمو بلا حدّ" },
      { en: "Ragnarok itself", ar: "الرَّاغناروك نفسه" },
    ],
    origin: {
      en: "A prophecy in the shape of a giant, chained in a realm of fire and promising the end of Asgard to anyone who will listen. Thor spends the film trying to prevent him and finishes it doing the opposite.",
      ar: "نبوءة في هيئة عملاق، مقيّد في عالم من النار، يَعِد بنهاية أسغارد كل من يسمعه. يقضي ثور الفيلم محاولًا منعه، ثم ينهيه فاعلًا العكس.",
    },
    related: [
      { id: "thor", kind: "enemy" },
      { id: "hela", kind: "enemy" },
    ],
  },
  {
    id: "zemo",
    nameEn: "Baron Zemo",
    nameAr: "البارون زيمو",
    aliases: ["Zemo", "Baron Zemo", "Helmut Zemo"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "No powers at all", ar: "بلا قدرات إطلاقًا" },
      { en: "Patience", ar: "صبر" },
      { en: "Finds the one true thing", ar: "يجد الحقيقة الواحدة" },
    ],
    origin: {
      en: "A Sokovian officer who loses his family when the Avengers drop a city, and works out that the way to destroy them is not a fight. He needs no powers, and the plan is one true fact revealed at the right moment.",
      ar: "ضابط سوكوفي يفقد عائلته حين يُسقط المنتقمون مدينة، فيدرك أن السبيل إلى تدميرهم ليس القتال. لا يحتاج إلى قدرات، وخطته حقيقة واحدة صادقة تُكشف في اللحظة المناسبة.",
    },
    related: [
      { id: "captain-america", kind: "enemy" },
      { id: "iron-man", kind: "enemy" },
      { id: "winter-soldier", kind: "enemy" },
      { id: "falcon", kind: "enemy" },
    ],
  },
];


/**
 * THE ANTAGONISTS THE CORPUS HAD NEVER WRITTEN DOWN.
 *
 * A site that lists every Marvel project and calls itself a map of who is in
 * them cannot be missing the man Iron Man fights in the first film. These are
 * the villains of titles already in the corpus — every one of them verified
 * against a real TMDB credit before being written, because "a villain I can
 * remember" and "a villain the data can find" are different lists and only one
 * of them belongs here.
 *
 * Six candidates were dropped for exactly that reason: Cottonmouth,
 * Diamondback, Bushmaster, Nuke, Typhoid Mary and Jigsaw are real characters
 * with no credit in anything this corpus holds, so a record for them would
 * have shipped with an empty appearances list and no way to fill it.
 */
/**
 * NOWHERE AND THE OLD CREW — the Vol. 3 credits, read properly.
 *
 * Every one of these is a named credit in a film the corpus already holds and
 * none of them had a record. Cosmo runs Knowhere; Stakar, Martinex, Krugarr
 * and Mainframe are the original Guardians the second film's credits scene
 * reassembles; Lylla, Teefs and Floor are the three the third film is actually
 * about, whatever the poster says.
 */
const knowhere: CharacterDraft[] = [
  /**
   * NOT CREDITED, and in the film. She is one of the children lifted off the
   * High Evolutionary's ship in the last act and standing with the team at the
   * end — TMDB credits the young performers as "Kid", so no rule reading the
   * cast can find her. `alsoIn` is the narrow escape hatch for exactly that.
   */
  {
    id: "phyla-vell",
    nameEn: "Phyla-Vell",
    nameAr: "فيلا-فيل",
    aliases: ["Phyla-Vell", "Phyla"],
    category: "hero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Kree",
    powers: [
      { en: "Kree physiology", ar: "بنية كريّة" },
      { en: "Raised in a cage", ar: "نشأت في قفص" },
      { en: "Newest of the team", ar: "أحدث أعضاء الفريق" },
    ],
    origin: {
      en: "One of the children the High Evolutionary bred and kept, taken off his ship by people who had been kept the same way. She stays with them because there is nowhere she came from to go back to.",
      ar: "إحدى الأطفال الذين استولدهم المُطوِّر الأعلى واحتجزهم، أخرجها من سفينته من عُوملوا مثلها. بقيت معهم لأن لا مكان جاءت منه لتعود إليه.",
    },
    alsoIn: ["guardians-of-the-galaxy-vol-3"],
    related: [
      { id: "rocket", kind: "ally" },
      { id: "star-lord", kind: "ally" },
    ],
  },

  {
    id: "cosmo",
    nameEn: "Cosmo the Spacedog",
    nameAr: "كوزمو كلب الفضاء",
    aliases: ["Cosmo", "Cosmo the Dog", "Cosmo the Spacedog"],
    category: "hero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Uplifted animal",
    powers: [
      { en: "Telepathy", ar: "تخاطر" },
      { en: "Telekinesis", ar: "تحريك بالعقل" },
      { en: "Good dog", ar: "كلب مطيع" },
    ],
    origin: {
      en: "A Soviet space-programme dog who was launched, never came back, and picked up a mind on the way. She keeps Knowhere running and would very much like to be told she is a good dog.",
      ar: "كلبة من برنامج الفضاء السوفييتي أُطلقت ولم تعد، والتقطت في الطريق عقلًا. تدير «نُوهير» وتودّ كثيرًا أن يُقال لها إنها كلبة مطيعة.",
    },
    related: [
      { id: "star-lord", kind: "ally" },
      { id: "rocket", kind: "ally" },
    ],
  },
  {
    id: "stakar-ogord",
    nameEn: "Stakar Ogord",
    nameAr: "ستاكار أوغورد",
    aliases: ["Stakar Ogord", "Stakar", "Starhawk"],
    category: "hero",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Leads the Ravager clans", ar: "يقود عشائر الرافيجرز" },
      { en: "Holds the code", ar: "يحمل القانون" },
      { en: "Exiled his best captain", ar: "نفى أفضل قادته" },
    ],
    origin: {
      en: "The Ravager captain who threw Yondu out for breaking the one rule they all agreed on, and who spent decades refusing to say his name. He gets the old crew back together.",
      ar: "قائد الرافيجرز الذي طرد يوندو لخرقه القاعدة الوحيدة التي اتفقوا عليها جميعًا، وأمضى عقودًا يرفض ذكر اسمه. ثم يعيد جمع الطاقم القديم.",
    },
    related: [
      { id: "yondu", kind: "ally" },
      { id: "martinex", kind: "ally" },
    ],
  },
  {
    id: "martinex",
    nameEn: "Martinex",
    nameAr: "مارتينكس",
    aliases: ["Martinex", "Martinex T'Naga"],
    category: "hero",
    affiliation: [],
    universe: ["mcu"],
    species: "Pluvian",
    powers: [
      { en: "A body of living crystal", ar: "جسد من بلّور حيّ" },
      { en: "Heat and cold at will", ar: "حرارة وبرودة بإرادته" },
      { en: "Stakar's first officer", ar: "نائب ستاكار" },
    ],
    origin: {
      en: "Stakar's second in command, made of crystal and considerably more patient than the man he answers to. He is the one who suggests they call the old team back.",
      ar: "نائب ستاكار، مصنوع من البلّور وأكثر صبرًا بكثير ممن يتبعه. وهو من يقترح استدعاء الفريق القديم.",
    },
    related: [
      { id: "stakar-ogord", kind: "ally" },
    ],
  },
  {
    id: "krugarr",
    nameEn: "Krugarr",
    nameAr: "كروغار",
    aliases: ["Krugarr"],
    category: "hero",
    affiliation: ["Magic"],
    universe: ["mcu"],
    species: "Lem",
    powers: [
      { en: "Sorcerer Supreme of his era", ar: "الساحر الأعظم في زمنه" },
      { en: "Casts without speaking", ar: "يسحر دون كلام" },
      { en: "A very long tail", ar: "ذيل طويل جدًا" },
    ],
    origin: {
      en: "A serpentine sorcerer and one of Stakar's original crew, who says nothing at all and does not need to. The mandalas he draws in the air are the same ones Strange learns much later.",
      ar: "ساحر أفعواني من طاقم ستاكار الأصلي، لا ينطق البتة ولا يحتاج. والدوائر التي يرسمها في الهواء هي نفسها التي يتعلّمها سترينج بعد ذلك بزمن طويل.",
    },
    related: [
      { id: "stakar-ogord", kind: "ally" },
    ],
  },
  {
    id: "mainframe",
    nameEn: "Mainframe",
    nameAr: "مِينفريم",
    aliases: ["Mainframe"],
    category: "hero",
    affiliation: [],
    universe: ["mcu"],
    species: "Artificial intelligence",
    powers: [
      { en: "Runs a whole planet", ar: "تدير كوكبًا بأكمله" },
      { en: "Present everywhere at once", ar: "حاضرة في كل مكان دفعة" },
      { en: "Was once a Vision", ar: "كانت رؤية ذات يوم" },
    ],
    origin: {
      en: "An artificial intelligence that governs a planet and joins the old Ravager crew from wherever she happens to be, which is everywhere on it at the same time.",
      ar: "ذكاء اصطناعي يحكم كوكبًا وينضم إلى طاقم الرافيجرز القديم من حيث هو، أي من كل مكان عليه في آنٍ واحد.",
    },
    related: [
      { id: "stakar-ogord", kind: "ally" },
    ],
  },
  {
    id: "lylla",
    nameEn: "Lylla",
    nameAr: "ليلا",
    aliases: ["Lylla"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Uplifted animal",
    powers: [
      { en: "Mechanical hands", ar: "يدان ميكانيكيتان" },
      { en: "Knows what the sky is for", ar: "تعرف ما السماء" },
      { en: "Rocket's first friend", ar: "أول صديقة لروكِت" },
    ],
    origin: {
      en: "An otter rebuilt with metal hands in the same cage Rocket was, who is the reason he knows what a friend is and the reason he has spent his life not saying so.",
      ar: "قضاعة أُعيد بناؤها بيدين معدنيتين في القفص نفسه الذي كان فيه روكِت، وهي سبب معرفته معنى الصديق، وسبب صمته عن ذلك طوال حياته.",
    },
    related: [
      { id: "rocket", kind: "family" },
    ],
  },
  {
    id: "teefs",
    nameEn: "Teefs",
    nameAr: "تيفس",
    aliases: ["Teefs"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Uplifted animal",
    powers: [
      { en: "Wheels instead of legs", ar: "عجلات بدل الأرجل" },
      { en: "Enormous teeth", ar: "أسنان هائلة" },
      { en: "Cage 89P13's neighbour", ar: "جار القفص 89P13" },
    ],
    origin: {
      en: "A walrus given wheels by people who did not think the question through, and one of the three friends Rocket made before he understood what would happen to them.",
      ar: "فظّ مُنح عجلات على يد من لم يفكّروا في المسألة جيدًا، وأحد الأصدقاء الثلاثة الذين عرفهم روكِت قبل أن يفهم ما سيحلّ بهم.",
    },
    related: [
      { id: "rocket", kind: "family" },
    ],
  },
  {
    id: "floor",
    nameEn: "Floor",
    nameAr: "فلور",
    aliases: ["Floor"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Uplifted animal",
    powers: [
      { en: "Spider legs", ar: "أرجل عنكبوتية" },
      { en: "Speaks in one word", ar: "تتكلّم بكلمة واحدة" },
      { en: "Names things plainly", ar: "تسمّي الأشياء كما هي" },
    ],
    origin: {
      en: "A rabbit given spider legs, who has one word and uses it for everything, and who named herself after the only thing she had ever been able to see.",
      ar: "أرنبة مُنحت أرجل عنكبوت، تملك كلمة واحدة تستعملها لكل شيء، وسمّت نفسها باسم الشيء الوحيد الذي استطاعت رؤيته يومًا.",
    },
    related: [
      { id: "rocket", kind: "family" },
    ],
  },
];

/**
 * THREE MORE, all of them credited and none of them written down.
 *
 * JANET WAS ALREADY HERE, and I wrote her a second time. C24 — the
 * duplicate-id guard added one session earlier, after the same thing happened
 * with M.O.D.O.K. — failed the build before it shipped. Six hundred lines
 * apart in one file is far enough that a grep for the name misses it, which is
 * exactly the case that guard exists for. Her record is above; only the
 * artwork was needed.
 *
 * AGENT VENOM IS FLASH THOMPSON, which is why this record carries both names.
 * "Flash Thompson" was the single most-credited string in the whole corpus
 * that matched nobody — fifteen credits across six films and two series.
 *
 * WHITE TIGER HERE IS AVA AYALA. Hector Ayala, her brother, is the White
 * Tiger of Daredevil: Born Again and is credited only as "Hector Ayala", so he
 * does not match this record and would need one of his own.
 */
const laterHeroes: CharacterDraft[] = [
  /**
   * NOT ON SCREEN, and that is a real state rather than a gap. Northstar has
   * no credit in any of the 170 titles here, so his `appearances` is empty and
   * his page says so — which is a better answer than "no results" to a reader
   * who came looking for one of the first openly gay superheroes Marvel
   * published.
   */
  {
    id: "northstar",
    nameEn: "Northstar",
    nameAr: "نورث ستار",
    aliases: ["Northstar", "Jean-Paul Beaubier"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      { en: "Near light speed", ar: "سرعة تقارب الضوء" },
      { en: "Generates light", ar: "يولّد الضوء" },
      { en: "Flight", ar: "الطيران" },
    ],
    origin: {
      en: "A Quebecois Olympic skier who could always outrun everyone and spent years pretending it was training. Marvel's first openly gay superhero, and the first married in one of its books.",
      ar: "متزلّج أولمبي من كيبيك كان يسبق الجميع دائمًا، وأمضى سنوات يتظاهر بأن السبب التدريب. أول بطل خارق مثليّ معلَن لدى مارفل، وأول من تزوّج في إصداراتها.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "agent-venom",
    /**
     * NAMED AGENT VENOM, as asked, and the caveat is worth keeping.
     *
     * Nine appearances derive from "Flash Thompson" credits, and five of those
     * are live action — Spider-Man, Spider-Man 3, The Amazing Spider-Man, Far
     * From Home, No Way Home. In every one of them he is the school bully, not
     * Agent Venom, who has never been on screen in live action. He becomes
     * Agent Venom in the comics and in Ultimate Spider-Man.
     *
     * One person, two names: the record carries the identity people search for
     * and the alias the credits actually use, so the films stay derived.
     */
    nameEn: "Agent Venom",
    nameAr: "الوكيل فينوم",
    aliases: ["Agent Venom", "Flash Thompson"],
    category: "antihero",
    affiliation: [],
    universe: ["mcu", "sony", "fox", "animation"],
    species: "Symbiote host",
    /* The strain he carries is the VENOM symbiote itself, so it sits in the
       natural lineage. The class describes the symbiote, not the man. */
    symbioteClass: "lineage",
    powers: [
      { en: "Bonded to the symbiote, in print", ar: "متّحد بالسيمبيوت في المطبوع" },
      { en: "Military training", ar: "تدريب عسكري" },
      { en: "Idolises Spider-Man", ar: "يتّخذ سبايدر-مان مثلًا" },
    ],
    origin: {
      en: "The boy who spent school shoving Peter Parker into lockers while worshipping Spider-Man, without ever working out they were the same person. He comes back from a war with two legs missing and is offered a suit.",
      ar: "الفتى الذي أمضى المدرسة يدفع بيتر باركر إلى الخزائن بينما يعبد سبايدر-مان، دون أن يدرك يومًا أنهما شخص واحد. يعود من حرب وقد فقد ساقيه، فيُعرض عليه بذلة.",
    },
    related: [
      { id: "spider-man", kind: "ally" },
      { id: "venom", kind: "host" },
    ],
  },
  {
    id: "white-tiger",
    nameEn: "White Tiger",
    nameAr: "النمر الأبيض",
    aliases: ["White Tiger", "Ava Ayala"],
    category: "hero",
    affiliation: [],
    universe: ["animation"],
    species: "Human",
    powers: [
      { en: "The Jade Tiger amulet", ar: "تميمة النمر اليشمي" },
      { en: "Peak agility", ar: "رشاقة قصوى" },
      { en: "Disciplined to a fault", ar: "منضبطة إلى حدّ العيب" },
    ],
    origin: {
      en: "The youngest of a family the amulet has already cost dearly, who takes it up anyway because leaving it unworn would waste what it took from them.",
      ar: "أصغر أفراد عائلة كلّفتها التميمة الكثير، تحملها رغم ذلك لأن تركها دون حامل يُهدر ما أخذته منهم.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
];

/**
 * FOUR SHOWS WITH NOBODY IN THEM.
 *
 * Cloak & Dagger, Runaways, Helstrom and The New Mutants were all in the
 * corpus as TITLES, and between them held exactly zero characters — every
 * credit matched nobody, so four "who is in this" sections rendered empty.
 * They are the corners that get skipped: two Hulu shows, an ABC one, and the
 * Fox X-Men film nobody counts.
 */
const smallScreen: CharacterDraft[] = [
  {
    id: "cloak",
    nameEn: "Cloak",
    nameAr: "كلوك",
    aliases: ["Cloak", "Tyrone Johnson", "Ty"],
    category: "hero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Enhanced human",
    powers: [
      { en: "Teleports through darkness", ar: "ينتقل عبر الظلام" },
      { en: "A cloak of living dark", ar: "عباءة من ظلام حيّ" },
      { en: "Feeds on light", ar: "يقتات على الضوء" },
    ],
    origin: {
      en: "A boy who watched his brother shot by a policeman and could do nothing, and who wakes with a darkness inside him that goes wherever he needs to be and takes him with it.",
      ar: "فتى رأى شرطيًا يقتل أخاه ولم يستطع شيئًا، ثم استيقظ وفي داخله ظلام يذهب حيث يحتاج أن يكون ويأخذه معه.",
    },
    related: [
      { id: "dagger", kind: "ally" },
    ],
  },
  {
    id: "dagger",
    nameEn: "Dagger",
    nameAr: "داغر",
    aliases: ["Dagger", "Tandy Bowen", "Tandy"],
    category: "hero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Enhanced human",
    powers: [
      { en: "Daggers of pure light", ar: "خناجر من ضوء خالص" },
      { en: "Sees your hope", ar: "ترى أملك" },
      { en: "Heals what she pierces", ar: "تشفي ما تطعنه" },
    ],
    origin: {
      en: "A girl whose father died the same night that boy's brother did, in the same accident, and who has been stealing her way through the city since. The light in her hands shows people what they hope for.",
      ar: "فتاة مات أبوها في الليلة نفسها التي مات فيها أخو ذلك الفتى، في الحادث نفسه، وظلت تسرق طريقها في المدينة منذاك. الضوء في يديها يُري الناس ما يرجونه.",
    },
    related: [
      { id: "cloak", kind: "ally" },
    ],
  },
  {
    id: "mayhem",
    nameEn: "Mayhem",
    nameAr: "مايهم",
    aliases: ["Mayhem", "Brigid O'Reilly", "Brigid OReilly"],
    category: "antihero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Enhanced human",
    powers: [
      { en: "Split in two", ar: "انقسمت إلى اثنتين" },
      { en: "Feels no restraint", ar: "لا تعرف الكبح" },
      { en: "A detective still", ar: "ما زالت محقّقة" },
    ],
    origin: {
      en: "A detective who went into the water after the people she was investigating and came out as two of herself, and the half that surfaced does not believe in warnings.",
      ar: "محقّقة نزلت إلى الماء وراء من كانت تحقّق معهم فخرجت اثنتين، والنصف الذي طفا لا يؤمن بالإنذارات.",
    },
    related: [
      { id: "cloak", kind: "ally" },
      { id: "dagger", kind: "ally" },
    ],
  },
  {
    id: "nico-minoru",
    nameEn: "Nico Minoru",
    nameAr: "نيكو مينورو",
    aliases: ["Nico Minoru", "Nico"],
    category: "hero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Witch",
    powers: [
      { en: "The Staff of One", ar: "عصا الواحد" },
      { en: "Each spell said once", ar: "كل تعويذة تُقال مرة" },
      { en: "Blood opens it", ar: "الدم يفتحها" },
    ],
    origin: {
      en: "The daughter of two people who turn out to be worse than she suspected, holding a staff that grants any spell she can name and refuses to grant the same one twice.",
      ar: "ابنة اثنين تبيّن أنهما أسوأ مما ظنّت، تحمل عصا تحقّق أي تعويذة تسمّيها وترفض أن تحقّق الواحدة مرتين.",
    },
    related: [
      { id: "karolina-dean", kind: "family" },
    ],
  },
  {
    id: "karolina-dean",
    nameEn: "Karolina Dean",
    nameAr: "كارولينا دين",
    aliases: ["Karolina Dean", "Karolina", "Lucy in the Sky"],
    category: "hero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Human hybrid",
    powers: [
      { en: "Flight", ar: "الطيران" },
      { en: "Light in every colour", ar: "ضوء بكل الألوان" },
      { en: "Not from here", ar: "ليست من هنا" },
    ],
    origin: {
      en: "Raised in a church her mother runs, wearing a bracelet she was told never to remove. Taking it off is how she learns what she is and where her parents actually came from.",
      ar: "نشأت في كنيسة تديرها أمها، وترتدي سوارًا قيل لها ألّا تنزعه أبدًا. ونزعه هو ما تعرف به ما هي ومن أين جاء والداها حقًا.",
    },
    related: [
      { id: "nico-minoru", kind: "family" },
    ],
  },
  {
    id: "gert-yorkes",
    nameEn: "Gert Yorkes",
    nameAr: "غيرت يوركس",
    aliases: ["Gert Yorkes", "Gertrude Yorkes", "Gert"],
    category: "hero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Human",
    powers: [
      { en: "Bonded to a dinosaur", ar: "مرتبطة بديناصور" },
      { en: "Reads everything", ar: "تقرأ كل شيء" },
      { en: "Argues on principle", ar: "تجادل مبدئيًا" },
    ],
    origin: {
      en: "The one who names the problem out loud while everyone else is still deciding whether to. Her parents built her a genetically engineered dinosaur that answers to her feelings.",
      ar: "من تسمّي المشكلة بصوت عالٍ بينما لا يزال الآخرون يقرّرون إن كانوا سيفعلون. بنى لها والداها ديناصورًا معدّلًا وراثيًا يستجيب لمشاعرها.",
    },
    related: [
      { id: "chase-stein", kind: "ally" },
    ],
  },
  {
    id: "chase-stein",
    nameEn: "Chase Stein",
    nameAr: "تشيس ستاين",
    aliases: ["Chase Stein", "Chase"],
    category: "hero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Human",
    powers: [
      { en: "Fistigons", ar: "قفازات نارية" },
      { en: "Better with machines", ar: "أفضل مع الآلات" },
      { en: "Underestimated on purpose", ar: "يُستهان به عمدًا" },
    ],
    origin: {
      en: "The athlete everyone reads as the stupid one, including his father, who built the flame gauntlets Chase steals and then works out how to improve.",
      ar: "الرياضي الذي يقرأه الجميع بوصفه الغبي، ومنهم أبوه، الذي صنع قفازات اللهب التي يسرقها تشيس ثم يعرف كيف يحسّنها.",
    },
    related: [
      { id: "gert-yorkes", kind: "ally" },
    ],
  },
  {
    id: "molly-hernandez",
    nameEn: "Molly Hernandez",
    nameAr: "مولي هيرنانديز",
    aliases: ["Molly Hernandez", "Molly"],
    category: "hero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Mutant",
    powers: [
      { en: "Enormous strength", ar: "قوة هائلة" },
      { en: "Sleeps it off", ar: "تنام بعدها" },
      { en: "The youngest", ar: "الأصغر" },
    ],
    origin: {
      en: "The youngest of them by years, strong enough to lift a car and tired enough afterwards to sleep through the argument about what to do next.",
      ar: "أصغرهم بسنوات، تقوى على رفع سيارة وتتعب بعدها بما يكفي لتنام خلال الجدال حول ما يُفعل تاليًا.",
    },
    related: [
      { id: "gert-yorkes", kind: "family" },
    ],
  },
  {
    id: "alex-wilder",
    nameEn: "Alex Wilder",
    nameAr: "أليكس وايلدر",
    aliases: ["Alex Wilder", "Alex"],
    category: "antihero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Human",
    powers: [
      { en: "Plans three moves out", ar: "يخطّط ثلاث نقلات مقدّمًا" },
      { en: "Keeps the group together", ar: "يبقي المجموعة معًا" },
      { en: "Wants his father's chair", ar: "يريد كرسي أبيه" },
    ],
    origin: {
      en: "The one who calls them back together after two years apart, and the one whose reasons for doing it take the longest to come out.",
      ar: "من يدعوهم للاجتماع بعد عامين من الفرقة، ومن تتأخر أسبابه في الظهور أكثر من الجميع.",
    },
    related: [
      { id: "nico-minoru", kind: "ally" },
    ],
  },
  {
    id: "daimon-helstrom",
    nameEn: "Daimon Helstrom",
    nameAr: "دايمون هيلستروم",
    aliases: ["Daimon Helstrom", "Daimon"],
    category: "antihero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Human hybrid",
    powers: [
      { en: "Casts out demons", ar: "يطرد الشياطين" },
      { en: "Hellfire in the blood", ar: "نار الجحيم في دمه" },
      { en: "A trident he will not lift", ar: "رمح ثلاثيّ يأبى حمله" },
    ],
    origin: {
      en: "The son of a serial killer and something worse, teaching ethics by day and pulling demons out of people by night, and refusing the half of himself that makes him good at it.",
      ar: "ابن قاتل متسلسل وشيء أسوأ، يدرّس الأخلاق نهارًا وينتزع الشياطين من الناس ليلًا، ويرفض النصف الذي يجعله بارعًا في ذلك.",
    },
    related: [
      { id: "ana-helstrom", kind: "family" },
    ],
  },
  {
    id: "ana-helstrom",
    nameEn: "Ana Helstrom",
    nameAr: "آنا هيلستروم",
    aliases: ["Ana Helstrom", "Ana"],
    category: "antihero",
    affiliation: [],
    universe: ["marvel-tv"],
    species: "Human hybrid",
    powers: [
      { en: "Reads a life by touch", ar: "تقرأ حياة المرء بلمسة" },
      { en: "Sells antiques", ar: "تبيع التحف" },
      { en: "Settles her own scores", ar: "تسوّي حساباتها بنفسها" },
    ],
    origin: {
      en: "His younger sister, who got the same inheritance and made none of his apologies for it. One touch tells her everything a person has done.",
      ar: "أخته الصغرى، ورثت الشيء نفسه ولم تعتذر عنه كما فعل. لمسة واحدة تخبرها بكل ما فعله المرء.",
    },
    related: [
      { id: "daimon-helstrom", kind: "family" },
    ],
  },
  {
    id: "mirage",
    nameEn: "Mirage",
    nameAr: "ميراج",
    aliases: ["Mirage", "Dani Moonstar", "Danielle Moonstar"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Makes your fear visible", ar: "تجعل خوفك مرئيًا" },
      { en: "Cannot switch it off", ar: "لا تستطيع إيقافه" },
      { en: "Cheyenne", ar: "شايان" },
    ],
    origin: {
      en: "A girl who survives the night her reservation does not, and wakes in a hospital that is not one, with a power she has not been told about and cannot yet control.",
      ar: "فتاة تنجو في الليلة التي لا تنجو فيها محميّتها، وتستيقظ في مستشفى ليس مستشفى، ومعها قدرة لم يخبرها بها أحد ولا تستطيع ضبطها بعد.",
    },
    related: [
      { id: "magik", kind: "ally" },
    ],
  },
  {
    id: "magik",
    nameEn: "Magik",
    nameAr: "ماجيك",
    aliases: ["Magik", "Illyana Rasputin", "Illyana"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Stepping discs", ar: "أقراص العبور" },
      { en: "A soulsword", ar: "سيف الروح" },
      { en: "Limbo is hers", ar: "ليمبو ملكها" },
    ],
    origin: {
      en: "Colossus's sister, who spent years somewhere that is not anywhere and came back with a sword and no patience. She is the cruellest person in the building and the most afraid.",
      ar: "أخت كولوسوس، أمضت سنوات في مكان ليس مكانًا وعادت بسيف وبلا صبر. هي أقسى من في المبنى وأشدهم خوفًا.",
    },
    related: [
      { id: "colossus", kind: "family" },
      { id: "mirage", kind: "ally" },
    ],
  },
  {
    id: "cannonball",
    nameEn: "Cannonball",
    nameAr: "كانونبول",
    aliases: ["Cannonball", "Sam Guthrie", "Samuel Guthrie"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Blasts like a rocket", ar: "ينطلق كصاروخ" },
      { en: "Untouchable in flight", ar: "لا يُمسّ وهو منطلق" },
      { en: "A miner's son", ar: "ابن عامل منجم" },
    ],
    origin: {
      en: "A Kentucky mining boy whose power went off underground the first time and brought the roof down. He has been apologising for it ever since.",
      ar: "فتى من مناجم كنتاكي انطلقت قدرته تحت الأرض أول مرة فأسقطت السقف. وهو يعتذر عن ذلك منذ حينها.",
    },
    related: [
      { id: "mirage", kind: "ally" },
    ],
  },
  {
    id: "wolfsbane",
    nameEn: "Wolfsbane",
    nameAr: "وولفسباين",
    aliases: ["Wolfsbane", "Rahne Sinclair", "Rahne"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Becomes a wolf", ar: "تتحول ذئبة" },
      { en: "Scents a lie", ar: "تشمّ الكذبة" },
      { en: "Raised to hate it", ar: "نشأت على كرهها" },
    ],
    origin: {
      en: "A Scottish girl taught by her church that what she turns into is a sin, who is gentler than anyone else there and the quickest to believe she deserves the room she is locked in.",
      ar: "فتاة اسكتلندية علّمتها كنيستها أن ما تتحوّل إليه خطيئة، وهي أرقّ من في المكان وأسرعهم تصديقًا بأنها تستحق الغرفة التي حُبست فيها.",
    },
    related: [
      { id: "mirage", kind: "ally" },
    ],
  },
  {
    id: "sunspot",
    nameEn: "Sunspot",
    nameAr: "صنسبوت",
    aliases: ["Sunspot", "Roberto da Costa", "Bobby da Costa"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Solar fire", ar: "نار شمسية" },
      { en: "Burns what he touches", ar: "يحرق ما يمسّ" },
      { en: "Very rich, very alone", ar: "ثريّ جدًا ووحيد جدًا" },
    ],
    origin: {
      en: "A Brazilian heir who burned a girl to death the first time it happened, in front of everyone, and has been performing arrogance over it ever since.",
      ar: "وريث برازيلي أحرق فتاة حتى الموت في المرة الأولى، أمام الجميع، وظل يؤدّي الغطرسة فوق ذلك منذاك.",
    },
    related: [
      { id: "magik", kind: "ally" },
    ],
  },
];

/**
 * THE GIFTED AND LEGION, the two Fox shows nobody counts.
 *
 * Both were in the corpus as titles with almost nobody in them — Polaris,
 * Blink and Legion himself matched, and the entire rest of two casts matched
 * nothing. These are the leads.
 */
const foxTv: CharacterDraft[] = [
  {
    id: "eclipse",
    nameEn: "Eclipse",
    nameAr: "إكليبس",
    aliases: ["Eclipse", "Marcos Diaz"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Absorbs and throws light", ar: "يمتصّ الضوء ويقذفه" },
      { en: "Cartel money behind him", ar: "مال العصابة خلفه" },
      { en: "A father in hiding", ar: "أب مختبئ" },
    ],
    origin: {
      en: "A mutant who worked for a cartel because nobody legitimate would take him, and who leaves it to help a network moving mutant families out of the country.",
      ar: "متحوّل عمل لدى عصابة لأن لا جهة شرعية قبلته، ثم تركها ليساعد شبكة تُهرّب عائلات المتحوّلين خارج البلاد.",
    },
    related: [
      { id: "polaris", kind: "family" },
    ],
  },
  {
    id: "thunderbird",
    nameEn: "Thunderbird",
    nameAr: "ثندربيرد",
    aliases: ["Thunderbird", "John Proudstar"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Tracks anyone by trace", ar: "يتعقّب أي أحد بأثره" },
      { en: "Enhanced strength", ar: "قوة معزّزة" },
      { en: "Ex-Marine", ar: "جندي بحرية سابق" },
    ],
    origin: {
      en: "A former Marine who runs the Mutant Underground the way he ran a squad, and who can follow anyone anywhere by the trace they leave behind them.",
      ar: "جندي بحرية سابق يدير المقاومة المتحوّلة كما كان يدير فصيلة، ويستطيع تعقّب أي أحد في أي مكان بالأثر الذي يتركه.",
    },
    related: [
      { id: "eclipse", kind: "ally" },
    ],
  },
  {
    id: "lauren-strucker",
    nameEn: "Lauren Strucker",
    nameAr: "لورين ستراكر",
    aliases: ["Lauren Strucker"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Shapes force into shields", ar: "تشكّل القوة دروعًا" },
      { en: "Stronger with her brother", ar: "أقوى مع أخيها" },
      { en: "Carries a family name", ar: "تحمل اسم عائلة" },
    ],
    origin: {
      en: "A teenager who has hidden what she can do since she was small, and who finds out her family name is one mutants have every reason to fear.",
      ar: "مراهقة أخفت ما تستطيع فعله منذ صغرها، ثم تكتشف أن اسم عائلتها اسم للمتحوّلين كل سبب لأن يخافوه.",
    },
    related: [
      { id: "andy-strucker", kind: "family" },
    ],
  },
  {
    id: "andy-strucker",
    nameEn: "Andy Strucker",
    nameAr: "آندي ستراكر",
    aliases: ["Andy Strucker"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Pulls things apart", ar: "يمزّق الأشياء" },
      { en: "Angrier than he admits", ar: "أغضب مما يعترف" },
      { en: "Stronger with his sister", ar: "أقوى مع أخته" },
    ],
    origin: {
      en: "The younger of the two, whose power arrives the day he is pushed too far, and who finds the people offering him a use for it more persuasive than his family does.",
      ar: "الأصغر بينهما، تصله قدرته يوم يُدفع أبعد مما يحتمل، فيجد من يعرضون عليه استعمالها أكثر إقناعًا من عائلته.",
    },
    related: [
      { id: "lauren-strucker", kind: "family" },
    ],
  },
  {
    id: "shadow-king",
    nameEn: "Shadow King",
    nameAr: "ملك الظل",
    aliases: ["Shadow King", "Amahl Farouk"],
    category: "villain",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Lives in another mind", ar: "يعيش في عقل آخر" },
      { en: "Astral projection", ar: "إسقاط نجمي" },
      { en: "Older than his host", ar: "أقدم من مضيفه" },
    ],
    origin: {
      en: "A telepath with no body of his own, who has been living inside another man's head since that man was a child, and who has been called the illness the whole time.",
      ar: "متخاطر بلا جسد خاص، يعيش داخل رأس رجل آخر منذ كان طفلًا، وظل يُسمّى طوال الوقت مرضًا.",
    },
    related: [
      { id: "legion", kind: "enemy" },
    ],
  },
  {
    id: "syd-barrett",
    nameEn: "Syd Barrett",
    nameAr: "سيد باريت",
    aliases: ["Syd Barrett", "Sydney Barrett", "Sydney ‘Syd’ Barrett"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Swaps bodies by touch", ar: "تبادل الأجساد باللمس" },
      { en: "Cannot be touched", ar: "لا يمكن لمسها" },
      { en: "The reason he stays", ar: "سبب بقائه" },
    ],
    origin: {
      en: "A mutant who takes over the body of anyone who touches her and therefore lets nobody, in love with a man who can enter anybody's mind.",
      ar: "متحوّلة تستولي على جسد كل من يلمسها فلا تدع أحدًا يفعل، تحبّ رجلًا يستطيع دخول أي عقل.",
    },
    related: [
      { id: "legion", kind: "ally" },
    ],
  },
];

const antagonists: CharacterDraft[] = [
  /* Not an antagonist, but he belongs with the batch that added his show's
     villains — the corpus had the series and not the man it is named after. */
  {
    id: "wonder-man",
    nameEn: "Wonder Man",
    nameAr: "وندر مان",
    aliases: ["Wonder Man", "Simon Williams"],
    category: "hero",
    affiliation: [],
    universe: ["mcu", "animation"],
    species: "Enhanced human",
    powers: [
      { en: "Ionic energy body", ar: "جسد من طاقة أيونية" },
      { en: "Does not tire", ar: "لا يتعب" },
      { en: "Wants the part more", ar: "يريد الدور أكثر" },
    ],
    origin: {
      en: "An actor with real powers auditioning to play someone with fake ones, in a town that cannot tell the difference and would rather not find out.",
      ar: "ممثّل يملك قدرات حقيقية يجرّب أداء دور من يملك قدرات زائفة، في مدينة لا تفرّق بين الاثنين وتفضّل ألّا تعرف.",
    },
    related: [{ id: "iron-man", kind: "ally" }],
  },
  {
    id: "obadiah-stane",
    nameEn: "Iron Monger",
    nameAr: "آيرون مونغر",
    aliases: ["Obadiah Stane", "Iron Monger", "Obadiah"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "A suit twice the size", ar: "بذلة بضعف الحجم" },
      { en: "Runs the company", ar: "يدير الشركة" },
      { en: "Bought the war both ways", ar: "اشترى الحرب من طرفيها" },
    ],
    origin: {
      en: "Howard Stark's old partner, who ran the company while Tony grew up and never expected to hand it back. He builds a larger version of the suit out of the parts of the one that got away.",
      ar: "شريك هوارد ستارك القديم، أدار الشركة بينما كان توني يكبر، ولم يتوقّع يومًا أن يعيدها. يبني نسخة أكبر من البذلة من قطع تلك التي أفلتت منه.",
    },
    related: [
      { id: "iron-man", kind: "enemy" },
    ],
  },
  {
    id: "ivan-vanko",
    nameEn: "Whiplash",
    nameAr: "ويبلاش",
    aliases: ["Ivan Vanko", "Whiplash"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Arc-powered whips", ar: "سياط تعمل بمفاعل قوسي" },
      { en: "Builds from scrap", ar: "يبني من الخردة" },
      { en: "A grudge two generations old", ar: "ضغينة عمرها جيلان" },
    ],
    origin: {
      en: "The son of the physicist who co-designed the arc reactor and was deported for it. He builds the same technology in a Moscow flat and takes it to a racetrack in Monaco.",
      ar: "ابن الفيزيائي الذي شارك في تصميم المفاعل القوسي ورُحِّل بسببه. يبني التقنية نفسها في شقة بموسكو، ثم يحملها إلى حلبة سباق في موناكو.",
    },
    related: [
      { id: "iron-man", kind: "enemy" },
      { id: "justin-hammer", kind: "ally" },
    ],
  },
  {
    id: "justin-hammer",
    nameEn: "Justin Hammer",
    nameAr: "جاستن هامر",
    aliases: ["Justin Hammer"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "A rival contractor", ar: "مقاول منافس" },
      { en: "Buys what he cannot build", ar: "يشتري ما لا يستطيع بناءه" },
      { en: "Very fond of a stage", ar: "مولع بالمنصّات" },
    ],
    origin: {
      en: "A weapons manufacturer who has spent his career one step behind Stark Industries and blames everyone but himself. He funds a better engineer and takes the credit in advance.",
      ar: "صانع أسلحة أمضى مسيرته متأخّرًا خطوة عن ستارك إندستريز، ويلوم الجميع إلا نفسه. يموّل مهندسًا أفضل منه، ثم ينسب الفضل لنفسه سلفًا.",
    },
    related: [
      { id: "iron-man", kind: "enemy" },
    ],
  },
  {
    id: "arnim-zola",
    nameEn: "Arnim Zola",
    nameAr: "أرنيم زولا",
    aliases: ["Arnim Zola", "Zola"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Artificial intelligence",
    powers: [
      { en: "A mind on magnetic tape", ar: "عقل على شريط ممغنط" },
      { en: "Algorithmic prediction", ar: "تنبّؤ خوارزمي" },
      { en: "Outlived his own body", ar: "عاش بعد جسده" },
    ],
    origin: {
      en: "Hydra's chief scientist, captured at the end of the war and quietly put to work by the people who caught him. When his body fails he writes himself onto two hundred thousand feet of data tape.",
      ar: "كبير علماء هايدرا، أُسر في نهاية الحرب فشغّله من أسروه بهدوء. وحين خذله جسده كتب نفسه على مئتي ألف قدم من أشرطة البيانات.",
    },
    related: [
      { id: "captain-america", kind: "enemy" },
      { id: "red-skull", kind: "ally" },
    ],
  },
  {
    id: "crossbones",
    nameEn: "Crossbones",
    nameAr: "كروسبونز",
    aliases: ["Crossbones", "Brock Rumlow", "Rumlow"],
    category: "villain",
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Close-quarters specialist", ar: "اختصاصي قتال قريب" },
      { en: "Hydra inside S.H.I.E.L.D.", ar: "هايدرا داخل شيلد" },
      { en: "Explosive vest", ar: "سترة ناسفة" },
    ],
    origin: {
      en: "A S.H.I.E.L.D. strike-team leader who was Hydra the whole time, and who survives the day that reveals it. He comes back for the man who put him in the fire.",
      ar: "قائد فريق اقتحام في شيلد كان تابعًا لهايدرا طوال الوقت، ونجا من اليوم الذي كشف ذلك. ثم عاد بحثًا عمّن ألقى به في النار.",
    },
    related: [
      { id: "captain-america", kind: "enemy" },
      { id: "falcon", kind: "enemy" },
    ],
  },
  {
    id: "alexander-pierce",
    nameEn: "Alexander Pierce",
    nameAr: "ألكسندر بيرس",
    aliases: ["Alexander Pierce"],
    category: "villain",
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Runs the World Security Council", ar: "يترأس مجلس الأمن العالمي" },
      { en: "Patient for decades", ar: "صبور لعقود" },
      { en: "Signs the order himself", ar: "يوقّع الأمر بنفسه" },
    ],
    origin: {
      en: "A senior S.H.I.E.L.D. official and a friend of Nick Fury's, who declined a Nobel Peace Prize and believes order is worth any price. He has been building the machinery to impose it for forty years.",
      ar: "مسؤول رفيع في شيلد وصديق لنيك فيوري، رفض جائزة نوبل للسلام ويؤمن بأن النظام يستحق أي ثمن. وقد أمضى أربعين عامًا يبني الآلة التي تفرضه.",
    },
    related: [
      { id: "captain-america", kind: "enemy" },
      { id: "nick-fury", kind: "enemy" },
    ],
  },
  {
    id: "kaecilius",
    nameEn: "Kaecilius",
    nameAr: "كايسيليوس",
    aliases: ["Kaecilius"],
    category: "villain",
    affiliation: ["Magic"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Mirror-dimension combat", ar: "قتال في بُعد المرآة" },
      { en: "Space folding", ar: "طيّ المكان" },
      { en: "Borrowed from the Dark Dimension", ar: "اقترض من البُعد المظلم" },
    ],
    origin: {
      en: "A student of the Ancient One who read the same book she did and reached a different conclusion about death. He takes three pages and the argument that goes with them.",
      ar: "تلميذ لدى القديمة قرأ الكتاب نفسه الذي قرأته، فوصل إلى استنتاج مختلف عن الموت. أخذ ثلاث صفحات، وأخذ معها الحجّة.",
    },
    related: [
      { id: "doctor-strange", kind: "enemy" },
      { id: "the-ancient-one", kind: "enemy" },
      { id: "dormammu", kind: "ally" },
    ],
  },
  {
    id: "ayesha",
    nameEn: "Ayesha",
    nameAr: "عائشة",
    aliases: ["Ayesha"],
    category: "antivillain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Genetically designed", ar: "مصمَّمة وراثيًا" },
      { en: "Commands a golden fleet", ar: "تقود أسطولًا ذهبيًا" },
      { en: "Cannot be embarrassed twice", ar: "لا تُحرَج مرتين" },
    ],
    origin: {
      en: "The high priestess of a people who breed themselves in pods to be perfect, and who take a theft from their vault as a personal insult. She builds a weapon to answer it.",
      ar: "كاهنة عليا لشعب يستولد نفسه في حاضنات ليكون كاملًا، ويعدّ سرقة من خزائنه إهانة شخصية. فتصنع سلاحًا للردّ.",
    },
    related: [
      { id: "star-lord", kind: "enemy" },
      { id: "adam-warlock", kind: "family" },
    ],
  },
  {
    id: "gorr",
    nameEn: "Gorr the God Butcher",
    nameAr: "غور ذابح الآلهة",
    aliases: ["Gorr", "Gorr the God Butcher"],
    category: "antivillain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "The Necrosword", ar: "سيف الموت" },
      { en: "Shadow monsters", ar: "وحوش من الظل" },
      { en: "Cannot be lied to about gods", ar: "لا يُكذَب عليه في أمر الآلهة" },
    ],
    origin: {
      en: "A man who crossed a desert praying for his daughter and buried her anyway, then found the god he had prayed to laughing. A sword finds him at the worst possible moment and agrees with him.",
      ar: "رجل قطع صحراء داعيًا لأجل ابنته ثم دفنها رغم ذلك، فوجد الإله الذي دعاه يضحك. يجده سيف في أسوأ لحظة ممكنة، ويوافقه الرأي.",
    },
    related: [
      { id: "thor", kind: "enemy" },
    ],
  },
  {
    id: "dreykov",
    nameEn: "Dreykov",
    nameAr: "دريكوف",
    aliases: ["Dreykov", "General Dreykov"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Runs the Red Room", ar: "يدير الغرفة الحمراء" },
      { en: "Chemical subjugation", ar: "إخضاع كيميائي" },
      { en: "Never leaves the building", ar: "لا يغادر المبنى" },
    ],
    origin: {
      en: "The man who built the Red Room and the widows inside it, and who has spent decades convincing the world he is a story. His only real defence is that nobody believes he exists.",
      ar: "الرجل الذي بنى الغرفة الحمراء والأرامل داخلها، وأمضى عقودًا يقنع العالم بأنه مجرد حكاية. دفاعه الحقيقي الوحيد أن لا أحد يصدّق وجوده.",
    },
    related: [
      { id: "black-widow", kind: "enemy" },
    ],
  },
  {
    id: "dar-benn",
    nameEn: "Dar-Benn",
    nameAr: "دار-بِن",
    aliases: ["Dar-Benn"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Kree",
    powers: [
      { en: "The Universal Weapon", ar: "السلاح الكوني" },
      { en: "A bangle of her own", ar: "سوار خاصّ بها" },
      { en: "Tears holes between places", ar: "تمزّق ثقوبًا بين الأماكن" },
    ],
    origin: {
      en: "A Kree accuser inheriting a dying world and a grievance older than she is, who goes looking for the person she holds responsible and takes what that world needs on the way.",
      ar: "متّهِمة كريّة ورثت عالمًا يحتضر وضغينة أقدم منها، فذهبت تبحث عمّن تحمّله المسؤولية، وأخذت في طريقها ما يحتاجه ذلك العالم.",
    },
    related: [
      { id: "captain-marvel", kind: "enemy" },
    ],
  },
  {
    id: "yon-rogg",
    nameEn: "Yon-Rogg",
    nameAr: "يون-روغ",
    aliases: ["Yon-Rogg"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Kree",
    powers: [
      { en: "Starforce commander", ar: "قائد قوة النجم" },
      { en: "Trained her himself", ar: "درّبها بنفسه" },
      { en: "Fights to prove a point", ar: "يقاتل ليثبت وجهة نظر" },
    ],
    origin: {
      en: "A Kree commander and mentor who taught his best soldier that her strength was a gift he could withdraw. Everything he told her about where she came from was chosen carefully.",
      ar: "قائد كريّ ومعلّم علّم أفضل جنوده أن قوّتها هبة يستطيع سحبها. وكل ما أخبرها به عن أصلها كان مُنتقى بعناية.",
    },
    related: [
      { id: "captain-marvel", kind: "enemy" },
    ],
  },
  {
    id: "cassandra-nova",
    nameEn: "Cassandra Nova",
    nameAr: "كاساندرا نوفا",
    aliases: ["Cassandra Nova"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Telepathy without limit", ar: "تخاطر بلا حدّ" },
      { en: "Rules the Void", ar: "تحكم الفراغ" },
      { en: "Reads a man by his hands", ar: "تقرأ المرء من يديه" },
    ],
    origin: {
      en: "Charles Xavier's twin, who he tried to strangle in the womb and who never forgot it. She holds court at the end of the multiverse, where everything discarded eventually arrives.",
      ar: "توأم تشارلز إكزافير التي حاول خنقها في الرحم، ولم تنسَ ذلك قط. تجلس على عرشها في نهاية الأكوان، حيث يصل كل ما يُلقى به آخر الأمر.",
    },
    related: [
      { id: "professor-x", kind: "family" },
      { id: "deadpool", kind: "enemy" },
      { id: "wolverine", kind: "enemy" },
    ],
  },
  {
    id: "kilgrave",
    nameEn: "Kilgrave",
    nameAr: "كيلغريف",
    aliases: ["Kilgrave", "Kevin Thompson", "Purple Man"],
    category: "villain",
    affiliation: [],
    universe: ["defenders"],
    species: "Enhanced human",
    powers: [
      { en: "Says a thing and it is done", ar: "يقول الشيء فيُفعل" },
      { en: "No memory of consent", ar: "لا يعرف معنى الموافقة" },
      { en: "A virus in the breath", ar: "فيروس في الأنفاس" },
    ],
    origin: {
      en: "A man whose voice removes the possibility of saying no, and who has never in his life had to ask for anything. He has decided that the woman who got away belongs to him.",
      ar: "رجل يمحو صوته إمكانية الرفض، ولم يضطر يومًا في حياته أن يطلب شيئًا. وقد قرّر أن المرأة التي أفلتت منه ملكٌ له.",
    },
    related: [
      { id: "jessica-jones", kind: "enemy" },
    ],
  },
  {
    id: "davos",
    nameEn: "Davos",
    nameAr: "دافوس",
    aliases: ["Davos", "Steel Serpent"],
    category: "villain",
    affiliation: [],
    universe: ["defenders"],
    species: "Human",
    powers: [
      { en: "Chi-focused strike", ar: "ضربة مركّزة بالتشي" },
      { en: "Trained at K'un-Lun", ar: "تدرّب في كون-لون" },
      { en: "Believes he earned it", ar: "يؤمن أنه استحقّها" },
    ],
    origin: {
      en: "The best student K'un-Lun had, who watched the honour he had trained his whole life for go to an outsider who then abandoned it. He comes to take it back.",
      ar: "أفضل تلميذ في كون-لون، رأى الشرف الذي تدرّب لأجله طوال عمره يذهب إلى غريب ثم يتخلّى عنه. فجاء يستردّه.",
    },
    related: [
      { id: "iron-fist", kind: "enemy" },
    ],
  },
  {
    id: "mordo",
    nameEn: "Baron Mordo",
    nameAr: "البارون موردو",
    aliases: ["Mordo", "Karl Mordo", "Baron Mordo"],
    category: "antivillain",
    affiliation: ["Masters of the Mystic Arts"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Sling ring", ar: "حلقة العبور" },
      { en: "Staff of the Living Tribunal", ar: "عصا المحكمة الحيّة" },
      { en: "Takes power from sorcerers", ar: "يسلب السحرة قواهم" },
    ],
    origin: {
      en: "The sorcerer who takes Strange in and teaches him the rules, and who then learns that his teacher had been breaking them the whole time. He concludes the world has too many sorcerers in it.",
      ar: "الساحر الذي استقبل سترينج وعلّمه القواعد، ثم اكتشف أن معلّمته كانت تخرقها طوال الوقت. فخلص إلى أن في العالم سحرة أكثر مما ينبغي.",
    },
    related: [
      { id: "doctor-strange", kind: "enemy" },
      { id: "the-ancient-one", kind: "ally" },
    ],
  },
  {
    id: "william-stryker",
    nameEn: "William Stryker",
    nameAr: "ويليام سترايكر",
    aliases: ["William Stryker", "Colonel Stryker", "Stryker"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Human",
    powers: [
      { en: "Runs Weapon X", ar: "يدير سلاح إكس" },
      { en: "Adamantium bonding", ar: "دمج الأداماتيوم" },
      { en: "A father who blames mutants", ar: "أب يحمّل المتحوّلين الذنب" },
    ],
    origin: {
      en: "A military scientist who blames mutants for what happened to his family and has spent his career weaponising them anyway. His best work is a man who cannot remember agreeing to it.",
      ar: "عالم عسكري يحمّل المتحوّلين وزر ما حلّ بعائلته، وأمضى مسيرته رغم ذلك يحوّلهم إلى أسلحة. أفضل أعماله رجل لا يذكر أنه وافق على شيء.",
    },
    related: [
      { id: "wolverine", kind: "enemy" },
      { id: "professor-x", kind: "enemy" },
    ],
  },
  {
    id: "silver-samurai",
    nameEn: "Silver Samurai",
    nameAr: "الساموراي الفضّي",
    aliases: ["Silver Samurai", "Ichiro Yashida"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Human",
    powers: [
      { en: "Adamantium armour", ar: "درع من الأداماتيوم" },
      { en: "A heated blade", ar: "نصل محمّى" },
      { en: "Wants what cannot be given", ar: "يريد ما لا يُوهب" },
    ],
    origin: {
      en: "A dying industrialist inside a suit of adamantium, who owes his life to a soldier at Nagasaki and has spent seventy years working out how to take that soldier's in return.",
      ar: "صناعي يحتضر داخل بذلة من الأداماتيوم، يدين بحياته لجندي في ناغازاكي، وأمضى سبعين عامًا يفكّر كيف يأخذ حياة ذلك الجندي بدلًا منها.",
    },
    related: [
      { id: "wolverine", kind: "enemy" },
    ],
  },
  {
    id: "viper",
    nameEn: "Viper",
    nameAr: "الأفعى",
    aliases: ["Viper", "Madame Hydra"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Immune to every poison", ar: "محصّنة ضد كل سمّ" },
      { en: "Sheds her skin", ar: "تسلخ جلدها" },
      { en: "Poisons by touch", ar: "تسمّم باللمس" },
    ],
    origin: {
      en: "A toxicologist who cannot be poisoned and has built a career on the fact, working for whoever is paying to keep a dying man alive long enough to finish what he started.",
      ar: "عالمة سموم لا تتأثر بالسمّ، وبنت مسيرتها على ذلك، تعمل لدى من يدفع لإبقاء رجل يحتضر حيًّا حتى يُتمّ ما بدأه.",
    },
    related: [
      { id: "wolverine", kind: "enemy" },
      { id: "silver-samurai", kind: "ally" },
    ],
  },
  {
    id: "ajax",
    nameEn: "Ajax",
    nameAr: "أجاكس",
    aliases: ["Ajax", "Francis Freeman", "Francis"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Enhanced human",
    powers: [
      { en: "Feels no pain", ar: "لا يشعر بالألم" },
      { en: "Enhanced reflexes", ar: "ردود فعل معزّزة" },
      { en: "Runs the workshop", ar: "يدير الورشة" },
    ],
    origin: {
      en: "The man who runs the programme that turns dying people into weapons by torturing them until something mutates. He took a mercenary's face and finds the joke has followed him home.",
      ar: "الرجل الذي يدير البرنامج الذي يحوّل المحتضرين إلى أسلحة بتعذيبهم حتى يتحوّر فيهم شيء. أخذ وجه مرتزق، فوجد النكتة تلاحقه إلى بيته.",
    },
    related: [
      { id: "deadpool", kind: "enemy" },
    ],
  },
  {
    id: "bolivar-trask",
    nameEn: "Bolivar Trask",
    nameAr: "بوليفار تراسك",
    aliases: ["Bolivar Trask", "Trask"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Human",
    powers: [
      { en: "Designed the Sentinels", ar: "صمّم الحرّاس" },
      { en: "Reads mutants as a species", ar: "يقرأ المتحوّلين كنوع" },
      { en: "Sells fear as defence", ar: "يبيع الخوف بوصفه دفاعًا" },
    ],
    origin: {
      en: "A weapons designer who looked at mutants and saw the one thing that could make humanity stop fighting itself. His argument is that he is trying to save everyone, and he means it.",
      ar: "مصمّم أسلحة نظر إلى المتحوّلين فرأى الشيء الوحيد القادر على إيقاف البشرية عن قتال نفسها. حجّته أنه يحاول إنقاذ الجميع، وهو يعنيها.",
    },
    related: [
      { id: "mystique", kind: "enemy" },
      { id: "sentinels", kind: "ally" },
    ],
  },
  {
    id: "annihilus",
    nameEn: "Annihilus",
    nameAr: "أنيهيلَس",
    aliases: ["Annihilus"],
    category: "villain",
    affiliation: [],
    universe: ["animation"],
    species: "Cosmic entity",
    powers: [
      { en: "The Cosmic Control Rod", ar: "قضيب التحكّم الكوني" },
      { en: "Commands the Annihilation Wave", ar: "يقود موجة الإبادة" },
      { en: "Fears only ending", ar: "لا يخشى إلا النهاية" },
    ],
    origin: {
      en: "The ruler of the Negative Zone, whose entire existence is organised around not dying, and whose answer to anything that might threaten that is an army the size of a galaxy.",
      ar: "حاكم المنطقة السالبة، وجوده كله منظّم حول ألّا يموت، وجوابه على أي شيء قد يهدّد ذلك جيش بحجم مجرّة.",
    },
    related: [
      { id: "mister-fantastic", kind: "enemy" },
    ],
  },
  {
    id: "mole-man",
    nameEn: "Mole Man",
    nameAr: "رجل الخلد",
    aliases: ["Mole Man", "Harvey Elder"],
    category: "villain",
    affiliation: [],
    universe: ["mcu", "animation"],
    species: "Human",
    powers: [
      { en: "Commands subterranean monsters", ar: "يقود وحوش الأعماق" },
      { en: "Rules Subterranea", ar: "يحكم سبتيرانيا" },
      { en: "Was laughed at once", ar: "ضُحك عليه مرّة" },
    ],
    origin: {
      en: "A scientist the surface world dismissed, who went down instead of out and found a kingdom nobody was using. He has not forgotten who laughed.",
      ar: "عالِم رفضه عالم السطح، فنزل بدل أن يخرج، فوجد مملكة لا يستخدمها أحد. وهو لم ينسَ من ضحك.",
    },
    related: [
      { id: "mister-fantastic", kind: "enemy" },
    ],
  },
  {
    id: "blackheart",
    nameEn: "Blackheart",
    nameAr: "بلاكهارت",
    aliases: ["Blackheart"],
    category: "villain",
    affiliation: [],
    universe: ["legacy"],
    species: "Demon",
    powers: [
      { en: "Son of Mephisto", ar: "ابن مفيستو" },
      { en: "Takes the souls of the damned", ar: "يأخذ أرواح الملعونين" },
      { en: "Wants his father's chair", ar: "يريد كرسي أبيه" },
    ],
    origin: {
      en: "Mephisto's son, who finds his father's arrangements too patient and goes looking for a contract that would let him take a thousand souls at once.",
      ar: "ابن مفيستو، وجد ترتيبات أبيه أكثر صبرًا مما ينبغي، فذهب يبحث عن عقد يتيح له أخذ ألف روح دفعة واحدة.",
    },
    related: [
      { id: "ghost-rider", kind: "enemy" },
      { id: "mephisto", kind: "family" },
    ],
  },
  {
    id: "deacon-frost",
    nameEn: "Deacon Frost",
    nameAr: "ديكون فروست",
    aliases: ["Deacon Frost", "Frost"],
    category: "villain",
    affiliation: [],
    universe: ["legacy"],
    species: "Vampire",
    powers: [
      { en: "Turned, not born", ar: "تحوّل ولم يُولد" },
      { en: "Reads the old blood scriptures", ar: "يقرأ كتب الدم القديمة" },
      { en: "Wants to be a god", ar: "يريد أن يصير إلهًا" },
    ],
    origin: {
      en: "A vampire who was made rather than born, and who is therefore excluded from everything the pure-blood houses run. He decides to end the argument by summoning the thing they all pray to.",
      ar: "مصّاص دماء صُنع ولم يُولد، ولذلك يُستبعد من كل ما تديره بيوت الدم النقي. فقرّر أن ينهي الجدال باستحضار ما يصلّون له جميعًا.",
    },
    related: [
      { id: "blade", kind: "enemy" },
    ],
  },
  {
    id: "nobu",
    nameEn: "Nobu",
    nameAr: "نوبو",
    aliases: ["Nobu", "Nobu Yoshioka"],
    category: "villain",
    affiliation: [],
    universe: ["defenders"],
    species: "Human",
    powers: [
      { en: "Kyoketsu-shoge chain", ar: "سلسلة كيوكِتسو-شوغيه" },
      { en: "Comes back", ar: "يعود" },
      { en: "Answers to the Hand", ar: "يتبع اليد" },
    ],
    origin: {
      en: "The Hand's man in New York, who runs a construction empire as cover and treats the man in the mask as an administrative problem until he stops being one.",
      ar: "رجل «اليد» في نيويورك، يدير إمبراطورية إنشاءات كغطاء، ويعامل الرجل المقنّع كمشكلة إدارية إلى أن يكفّ عن كونها كذلك.",
    },
    related: [
      { id: "daredevil", kind: "enemy" },
      { id: "elektra", kind: "enemy" },
    ],
  },
  {
    id: "muse",
    nameEn: "Muse",
    nameAr: "ميوز",
    aliases: ["Muse"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Paints in blood", ar: "يرسم بالدم" },
      { en: "Takes his materials alive", ar: "يأخذ مواده أحياء" },
      { en: "Believes it is art", ar: "يؤمن أنه فنّ" },
    ],
    origin: {
      en: "A serial killer who treats the city as a gallery and its people as pigment, and who has never once considered that he might be doing something wrong.",
      ar: "قاتل متسلسل يعامل المدينة كصالة عرض وأهلها كأصباغ، ولم يخطر بباله يومًا أنه قد يفعل شيئًا خاطئًا.",
    },
    related: [
      { id: "daredevil", kind: "enemy" },
    ],
  },
  {
    id: "supreme-intelligence",
    nameEn: "The Supreme Intelligence",
    nameAr: "الذكاء الأسمى",
    aliases: ["Supreme Intelligence", "The Supreme Intelligence"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Artificial intelligence",
    powers: [
      { en: "Rules the Kree Empire", ar: "يحكم إمبراطورية الكري" },
      { en: "Wears the face you admire most", ar: "يرتدي أكثر وجه تُعجب به" },
      { en: "Built from Kree minds", ar: "مبنيّ من عقول كريّة" },
    ],
    origin: {
      en: "An artificial mind assembled from the greatest Kree who ever lived, which rules the empire and appears to each citizen as the person they most respect. It has been at war for a very long time.",
      ar: "عقل اصطناعي جُمع من أعظم من عاش من الكري، يحكم الإمبراطورية ويظهر لكل مواطن في هيئة من يحترمه أكثر. وهو في حرب منذ زمن طويل جدًا.",
    },
    related: [
      { id: "captain-marvel", kind: "enemy" },
      { id: "ronan", kind: "ally" },
    ],
  },
  {
    id: "harold-meachum",
    nameEn: "Harold Meachum",
    nameAr: "هارولد ميتشم",
    aliases: ["Harold Meachum"],
    category: "villain",
    affiliation: [],
    universe: ["defenders"],
    species: "Human",
    powers: [
      { en: "Died and did not stay dead", ar: "مات ولم يبقَ ميتًا" },
      { en: "Runs Rand from a penthouse", ar: "يدير راند من شقة علوية" },
      { en: "Owes the Hand everything", ar: "يدين لليد بكل شيء" },
    ],
    origin: {
      en: "Danny Rand's father's business partner, kept alive in a locked penthouse by people who expect to be repaid. Thirteen years of that has left very little of the man his children remember.",
      ar: "شريك والد داني راند في العمل، أُبقي حيًّا في شقة علوية مغلقة على يد من ينتظرون السداد. ثلاثة عشر عامًا من ذلك لم تُبقِ الكثير من الرجل الذي يذكره ولداه.",
    },
    related: [
      { id: "iron-fist", kind: "enemy" },
    ],
  },
];

const livePeters: CharacterDraft[] = [
  {
    id: "spider-man-tobey",
    nameEn: "Spider-Man (Tobey Maguire)",
    nameAr: "سبايدر مان (توبي ماغواير)",
    aliases: [],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Enhanced human",
    powers: [
      { en: "Organic web-shooters", ar: "قاذفات شباك عضوية" },
      { en: "Wall-crawling", ar: "التسلّق على الجدران" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
    ],
    origin: {
      en: "The first one anybody saw. A bite at a science exhibition, an uncle who dies because of something he chose not to do, and the sentence the rest of them have been answering ever since.",
      ar: "أول من رآه الناس. لدغة في معرض علمي، وعمّ يموت بسبب شيء اختار ألّا يفعله، والجملة التي ظل الباقون يجيبون عنها منذ ذلك الحين.",
    },
    /* VARIANTS of each other, not allies. Ally is what you are to someone
       from your own world who fights beside you; these three are the same man
       from three universes, which is the single most interesting fact about
       them and the reason the multiverse section of this site exists. */
    related: [
      { id: "spider-man-andrew", kind: "variant" },
      { id: "spider-man-tom", kind: "variant" },
    ],
    performerOf: { character: "spider-man", actor: "Tobey Maguire" },
  },
  {
    id: "spider-man-andrew",
    nameEn: "Spider-Man (Andrew Garfield)",
    nameAr: "سبايدر مان (أندرو غارفيلد)",
    aliases: [],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Enhanced human",
    powers: [
      { en: "Mechanical web-shooters", ar: "قاذفات شباك ميكانيكية" },
      { en: "Wall-crawling", ar: "التسلّق على الجدران" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
    ],
    origin: {
      en: "The one who lost Gwen. Two films and a long gap, and when he comes back it is the failure he is still carrying that the others need him for.",
      ar: "من فقد غوين. فيلمان ثم انقطاع طويل، وحين يعود يكون الإخفاق الذي ما زال يحمله هو ما يحتاجه الآخرون منه.",
    },
    related: [
      { id: "spider-man-tobey", kind: "variant" },
      { id: "spider-man-tom", kind: "variant" },
      /* HIS Gwen, and only his. Two films, and the second one ends with her.
         For every other Spider-Man the record means Spider-Gwen, who is a
         variant — which is why this cannot live on the base character. */
      { id: "gwen-stacy", kind: "family" },
    ],
    performerOf: { character: "spider-man", actor: "Andrew Garfield" },
  },
  {
    id: "spider-man-tom",
    nameEn: "Spider-Man (Tom Holland)",
    nameAr: "سبايدر مان (توم هولاند)",
    aliases: [],
    category: "hero",
    affiliation: ["Avengers", "Team Iron Man", "Spider-Society"],
    universe: ["mcu", "sony"],
    species: "Enhanced human",
    powers: [
      { en: "Mechanical web-shooters", ar: "قاذفات شباك ميكانيكية" },
      { en: "Wall-crawling", ar: "التسلّق على الجدران" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
    ],
    origin: {
      en: "Introduced in somebody else's film. A fifteen-year-old recruited into a fight between Avengers, given a suit by Tony Stark, and left at the end of it with nobody who remembers his name.",
      ar: "قُدِّم في فيلم شخص آخر. فتى في الخامسة عشرة يُستدعى إلى شجار بين المنتقمين، يمنحه توني ستارك بذلة، ثم يُترك في النهاية دون أحد يذكر اسمه.",
    },
    related: [
      { id: "spider-man-tobey", kind: "variant" },
      { id: "spider-man-andrew", kind: "variant" },
      /* AUTHORED, because it cannot be derived yet. Brand New Day has not
         shipped and TMDB's cast for it does not credit the Rhino, so no rule
         reading the credits can find this. It goes here rather than on the
         base character, where it would be wrong for the other two. */
      { id: "rhino", kind: "enemy" },
    ],
    performerOf: { character: "spider-man", actor: "Tom Holland" },
  },
];

export const characters: CharacterDraft[] = [
  ...avengers,
  ...guardians,
  ...xmen,
  ...spiderVerse,
  ...defenders,
  ...fantasticFour,
  ...villains,
  ...legacyCharacters,
  ...supporting,
  ...ensemble,
  ...abstracts,
  ...celestials,
  ...eternals,
  ...inhumans,
  ...thunderbolts,
  ...hulks,
  ...moreMutants,
  ...symbiotes,
  ...moreSpider,

  ...others,
  ...livePeters,
  ...whiteVision,
  ...laterAdditions,
  ...antagonists,
  ...knowhere,
  ...laterHeroes,
  ...smallScreen,
  ...foxTv,
];
