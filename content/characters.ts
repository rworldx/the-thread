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
    affiliation: ["Avengers", "Team Iron Man", "Original Six"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      /* His mind was in the record as "Genius engineer", which is training,
         not a superlative — so the man who builds a suit in a cave out of
         scraps was paid the same six points as a marksman. Marvel puts Stark
         in the same conversation as Richards and Doom, and the record should
         say so at that level or not claim it at all. */
      {
        en: "Powered armour, rebuilt constantly",
        ar: "درع مزوّد، يعاد بناؤه دائمًا",
      },
      { en: "Repulsors and the unibeam", ar: "الريبلسورز والشعاع الموحّد" },
      { en: "Armour-borne strength and flight", ar: "قوة وطيران من الدرع" },
      {
        en: "Withstands bullets, blasts and vacuum",
        ar: "يصمد للرصاص والانفجارات والفراغ",
      },
      {
        en: "Nanotech that reshapes itself",
        ar: "تقنية نانوية تعيد تشكيل نفسها",
      },
      {
        en: "One of the smartest men alive",
        ar: "من أذكى الرجال على قيد الحياة",
      },
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
    affiliation: ["Avengers", "Team Captain America", "Original Six"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      /* Three bullets for the original super-soldier, while Bucky — who has a
         version of the same serum — carried six. It is why a blind lawyer
         outranked him: Daredevil's record lists every sense he has and this
         one did not even name the serum. */
      { en: "The super-soldier serum", ar: "مصل الجندي الخارق" },
      {
        en: "Peak strength, speed and reflexes",
        ar: "ذروة القوة والسرعة ورد الفعل",
      },
      { en: "Vibranium shield", ar: "درع من الفيبرانيوم" },
      { en: "Master hand-to-hand combatant", ar: "سيد القتال المتلاحم" },
      { en: "Heals fast and barely ages", ar: "يشفى سريعًا ولا يشيخ تقريبًا" },
      { en: "Tactical command", ar: "قيادة تكتيكية" },
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
    affiliation: [
      "Avengers",
      "Asgard",
      "Revengers",
      "Gods",
      "Original Six",
      "Guardians of the Multiverse",
    ],
    universe: ["mcu"],
    species: "Asgardian",
    /* STORMBREAKER WAS MISSING ENTIRELY, and it is the weapon that summons the Bifrost -- he travels the cosmos with it. It replaces "Very long lifespan", which every Asgardian in the corpus has and which said nothing about what he does. */
    powers: [
      {
        en: "Control of lightning and storms",
        ar: "تحكّم بالبرق والعواصف",
      },
      {
        en: "Strength to match anything below a god",
        ar: "قوة توازي كل ما دون الإله",
      },
      {
        en: "Mjolnir, and it always returns",
        ar: "ميولنير، وتعود إليه دائمًا",
      },
      {
        en: "The God Blast, all of his power at once",
        ar: "صرخة الإله، كل قوته دفعة واحدة",
      },
      {
        en: "Near-invulnerable, heals like a god",
        ar: "شبه منيع، ويشفى كإله",
      },
      {
        en: "Stormbreaker, and the Bifrost with it",
        ar: "ستورمبريكر، ومعها البايفروست",
      },
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
    affiliation: ["Avengers", "Hulks", "Revengers", "Original Six"],
    universe: ["mcu", "legacy"],
    species: "Enhanced human",
    powers: [
      /* THREE BULLETS FOR THE HULK, one of which was "Leading physicist",
         which is why Red Hulk was outscoring him two to one. Rashid asked why
         Red Hulk sits beside him: the answer was that Banner's record barely
         said anything, not that the two are related. */
      { en: "Strength with no ceiling on it", ar: "قوة بلا سقف" },
      {
        en: "The angrier he gets, the stronger",
        ar: "كلما ازداد غضبًا ازداد قوة",
      },
      {
        en: "Near-total durability, and heals from anything",
        ar: "صلابة شبه تامة، ويشفى من أي شيء",
      },
      {
        en: "A thunderclap that flattens a street",
        ar: "تصفيقة تسوّي شارعًا بالأرض",
      },
      { en: "Leaps miles, and lands harder", ar: "يقفز أميالًا، ويهبط أشد" },
      {
        en: "Banner's mind, when Banner is driving",
        ar: "عقل بانر، حين يقود بانر",
      },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: [
      "Avengers",
      "S.H.I.E.L.D.",
      "Team Iron Man",
      "Original Six",
      "Guardians of the Multiverse",
    ],
    universe: ["mcu"],
    species: "Human",
    powers: [
      /* Three bullets, and the Widow's Bite was not one of them — the
         electroshock gauntlets she is drawn with in every appearance. The rest
         was the job description rather than the training. */
      { en: "The Widow's Bite", ar: "لسعة الأرملة" },
      {
        en: "Peak human strength and agility",
        ar: "ذروة القوة والرشاقة البشرية",
      },
      { en: "Elite martial artist", ar: "مقاتلة من الطراز الأول" },
      { en: "Expert marksman", ar: "رامية بارعة" },
      { en: "Master spy and interrogator", ar: "جاسوسة ومحققة بارعة" },
      { en: "Reads a fight as it happens", ar: "تقرأ المعركة وهي تجري" },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: [
      "Avengers",
      "S.H.I.E.L.D.",
      "Team Captain America",
      "Original Six",
    ],
    universe: ["mcu"],
    species: "Human",
    powers: [
      /* "Never misses / Trick arrows / Close combat" undersold the arrows,
         which are the whole point: explosive, electric, sonic, grappling. A
         man with no powers who stands next to Thor is standing there on
         ordnance and reflexes, and the record should say which. */
      { en: "Never misses", ar: "لا يخطئ الهدف" },
      { en: "Explosive and electric arrows", ar: "سهام متفجرة وكهربائية" },
      { en: "Peak human conditioning", ar: "ذروة اللياقة البشرية" },
      { en: "Exceptional reflexes", ar: "ردود فعل استثنائية" },
      { en: "Close combat and acrobatics", ar: "قتال متلاحم وبهلوانية" },
      { en: "Fights on through the injury", ar: "يواصل القتال رغم الإصابة" },
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
    aliases: ["Wanda Maximoff", "Scarlet Witch", "Wanda", "The Scarlet Witch"],
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "antihero",
    affiliation: ["Avengers", "Team Captain America", "Magic"],
    universe: ["mcu"],
    species: "Enhanced human",
    magicSchools: ["chaos"],
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
      {
        en: "Density from intangible to diamond-hard",
        ar: "كثافة من اللاملموس إلى صلابة الماس",
      },
      {
        en: "Reaches into a body and solidifies",
        ar: "يمدّ يده في جسد ثم يتصلّب",
      },
      {
        en: "Solar energy through the Mind Stone",
        ar: "طاقة شمسية عبر حجر العقل",
      },
      { en: "Beams across the whole spectrum", ar: "أشعة عبر الطيف كله" },
      {
        en: "Reformed after being reduced to dust",
        ar: "تشكّل من جديد بعد أن صار غبارًا",
      },
      {
        en: "Flight, and a mind that hacks anything",
        ar: "طيران، وعقل يخترق أي شيء",
      },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["Avengers", "Team Captain America"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "A winged flight rig, Wakandan-built",
        ar: "جهاز طيران مجنّح، صنع واكاندي",
      },
      {
        en: "Sees through a bird's eyes at a distance",
        ar: "يرى بعيني طائر عن بُعد",
      },
      { en: "Directs birds with his mind", ar: "يوجّه الطيور بعقله" },
      {
        en: "Carries the vibranium shield now",
        ar: "يحمل درع الفيبرانيوم الآن",
      },
      {
        en: "Peak conditioning, and pararescue-trained",
        ar: "لياقة قصوى، ومدرّب إنقاذ جوي",
      },
      {
        en: "The finest aerial fighter on the team",
        ar: "أمهر مقاتل جوي في الفريق",
      },
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
    aliases: [
      "Bucky Barnes",
      "Winter Soldier",
      "James Barnes",
      "James Buchanan Barnes",
      "The Winter Soldier",
    ],
    category: "antihero",
    affiliation: ["Avengers", "Team Captain America", "Thunderbolts"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      /* THE SERUM WAS NOT ON IT. Three bullets — "Metal arm / Enhanced
         strength / Marksmanship" — put him behind U.S. Agent and the Red
         Guardian, who each have one serum and a shield, while Bucky has a
         version of the same serum, a vibranium arm and seventy years of doing
         this for a living. */
      { en: "Super-soldier serum", ar: "مصل الجندي الخارق" },
      { en: "A vibranium arm", ar: "ذراع من الفيبرانيوم" },
      { en: "Enhanced strength and reflexes", ar: "قوة وردود فعل معزّزة" },
      { en: "Seventy years of combat", ar: "سبعون عامًا من القتال" },
      { en: "Master assassin", ar: "قاتل محترف" },
      { en: "Marksmanship", ar: "براعة في التصويب" },
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
    aliases: [
      "James Rhodes",
      "Rhodey",
      "War Machine",
      "Iron Patriot",
      "Colonel James Rhodes",
    ],
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["Avengers", "Team Iron Man"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Powered armour, and armour-borne strength",
        ar: "درع مزوّد، وقوة منه",
      },
      {
        en: "A shoulder cannon, and missiles with it",
        ar: "مدفع كتفي، وصواريخ معه",
      },
      {
        en: "Repulsors and a unibeam, like the other",
        ar: "ريبلسورز وشعاع موحّد، كالآخر",
      },
      {
        en: "Withstands bullets, blasts and vacuum",
        ar: "يصمد للرصاص والانفجارات والفراغ",
      },
      {
        en: "An air force pilot before any of it",
        ar: "طيار قوات جوية قبل ذلك كله",
      },
      {
        en: "Discipline the other suit never had",
        ar: "انضباط لم تعرفه البدلة الأخرى",
      },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["Avengers", "Team Captain America"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      /* REWORDING THIS DROPPED HIM A TIER. "Changes size" and "flight rig"
         are read by tier 7's bolted-on clause by name, and my rewrite said
         "Shrinks to an ant" instead -- so Ant-Man and Falcon both fell into
         tier 8, "no powers at all", for being described better. The clause
         reads phrases, so the phrases stay. */
      {
        en: "Pym particles: changes size at will",
        ar: "جسيمات بيم: يغيّر حجمه كما يشاء",
      },
      {
        en: "Keeps his full mass when he shrinks",
        ar: "يحتفظ بكتلته كاملة حين يتقلص",
      },
      { en: "Grows to the size of a building", ar: "ينمو بحجم مبنى" },
      {
        en: "Shrinks other things, and other people",
        ar: "يقلّص أشياء أخرى، وأشخاصًا",
      },
      { en: "Commands every ant that hears him", ar: "يأمر كل نملة تسمعه" },
      { en: "Went subatomic and came back", ar: "نزل دون الذري وعاد" },
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
      {
        en: "Changes size, down to a few centimetres",
        ar: "تغيّر حجمها حتى بضعة سنتيمترات",
      },
      {
        en: "Bio-synthetic wings for flight",
        ar: "أجنحة حيوية اصطناعية للطيران",
      },
      {
        en: "The Wasp's Sting, from both hands",
        ar: "لسعة الزنبور، من كلتا يديها",
      },
      {
        en: "Keeps her strength when she is tiny",
        ar: "تحتفظ بقوتها وهي ضئيلة",
      },
      {
        en: "Grows to giant size as well",
        ar: "وتكبر إلى حجم عملاق أيضًا",
      },
      {
        en: "Avengers field commander",
        ar: "قائدة ميدانية للأفنجرز",
      },
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
    /* Strange Supreme on the team, and the same record: this corpus holds ONE record per character across every universe they appear in, which is why Thor carries Revengers from Ragnarok and Team Iron Man from Civil War on the same line. */
    affiliation: [
      "Avengers",
      "Masters of the Mystic Arts",
      "Midnight Sons",
      "Magic",
      "Guardians of the Multiverse",
    ],
    universe: ["mcu"],
    species: "Human",
    magicSchools: ["eldritch"],
    powers: [
      /* TWENTY-FOUR OF THE THIRTY-TWO in Rashid's fifth dossier still had
         four bullets or fewer, including the Sorcerer Supreme himself. All of
         these sit in tier 6's ranked head, so the records were never load-
         bearing for their rank — which is exactly why they went unnoticed. */
      {
        en: "Sorcery drawn from three separate wells",
        ar: "سحر من ثلاثة منابع منفصلة",
      },
      {
        en: "Bolts, shields and the Crimson Bands",
        ar: "صواعق ودروع وأشرطة سيتوراك",
      },
      { en: "Manipulates time with the Eye", ar: "يتحكم بالزمن بالعين" },
      {
        en: "Astral projection, and travel between worlds",
        ar: "إسقاط نجمي، وسفر بين العوالم",
      },
      {
        en: "Nullifies another's power in his own domain",
        ar: "يبطل قوة غيره في مملكته",
      },
      { en: "Cosmic awareness, at his peak", ar: "وعي كوني، في أوجه" },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["Avengers", "Wakandans", "Team Iron Man"],
    universe: ["mcu"],
    /* NOT plain Human. The heart-shaped herb is a serum by another name: it gives him strength, speed and senses past any human's. Filing him Human put the King of Wakanda in a chip meant for people with no powers. */
    species: "Enhanced human",
    powers: [
      {
        en: "The heart-shaped herb: strength and speed",
        ar: "العشبة القلبية: قوة وسرعة",
      },
      {
        en: "A suit that stores every blow it takes",
        ar: "بدلة تخزّن كل ضربة تتلقاها",
      },
      { en: "And returns them all at once", ar: "وتردّها كلها دفعة واحدة" },
      {
        en: "Vibranium claws that shred most things",
        ar: "مخالب فيبرانيوم تمزّق معظم الأشياء",
      },
      {
        en: "One of the smartest men alive",
        ar: "من أذكى الرجال على قيد الحياة",
      },
      {
        en: "The memory of every Panther before him",
        ar: "ذاكرة كل بانثر سبقه",
      },
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
    /* THE MoM CREDIT IS NOT HERS. "Captain Marvel" in Multiverse of Madness is
       Lashana Lynch playing Maria Rambeau of Earth-838, and Carol is not in
       that film at all. Her bare alias was taking it -- the same fault that put
       First Steps on Norrin instead of Shalla-Bal. */
    notIn: ["doctor-strange-in-the-multiverse-of-madness"],
    aliases: ["Carol Danvers", "Captain Marvel", "Vers"],
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["Avengers", "Kree"],
    universe: ["mcu"],
    species: "Human-Kree hybrid",
    powers: [
      {
        en: "Absorbs any energy and fires it back",
        ar: "تمتص أي طاقة وتردّها",
      },
      { en: "Binary: the power of a white hole", ar: "بايناري: قوة ثقب أبيض" },
      {
        en: "Strength and durability past human",
        ar: "قوة وصلابة تفوقان البشر",
      },
      {
        en: "Flight at speed, and through space",
        ar: "طيران سريع، وعبر الفضاء",
      },
      { en: "A seventh sense for what is coming", ar: "حاسة سابعة لما هو آتٍ" },
      {
        en: "Kree physiology under all of it",
        ar: "فسيولوجيا كري تحت ذلك كله",
      },
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
    /* NOT an ordinary human. He wields the Ten Rings by the end, and the chi was never ordinary. */
    species: "Enhanced human",
    powers: [
      /* Three bullets, one of which the scorer could not read: "The Ten
         Rings" was worth nothing, so the man who took them off Wenwu and
         killed the Dweller-in-Darkness with them ranked 118 places behind
         his father. */
      { en: "The Ten Rings", ar: "الخواتم العشرة" },
      { en: "Energy blasts and shockwaves", ar: "دفقات طاقة وموجات صدم" },
      { en: "Chi manipulation", ar: "التحكم بالتشي" },
      { en: "Master of every fighting style", ar: "سيد كل أساليب القتال" },
      { en: "Superhuman reflexes and agility", ar: "ردود فعل ورشاقة خارقة" },
      { en: "Reads an opponent mid-fight", ar: "يقرأ خصمه أثناء النزال" },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "antihero",
    affiliation: ["Asgard", "Revengers", "Gods", "Magic", "Loki variants"],
    universe: ["mcu"],
    species: "Frost Giant",
    magicSchools: ["asgardian"],
    powers: [
      /* "Illusions / Shapeshifting / Very long lifespan / Persuasion" — four
         bullets, scoring 28, and only his slot in the tier head was holding
         him at 157th. The sorcery itself was not in it, nor the teleportation,
         the enchantment, or the fact that he is an Asgardian who survives what
         would kill a man. Deception and strategy stay in the origin, where
         they read as character rather than as a stat. */
      {
        en: "Asgardian sorcery, deep and varied",
        ar: "سحر أسغاردي عميق ومتنوع",
      },
      { en: "Illusions that fool a room", ar: "أوهام تخدع غرفة بأكملها" },
      { en: "Shapeshifts into anyone at all", ar: "يتشكّل إلى أي أحد كان" },
      { en: "Teleports himself and others", ar: "ينقل نفسه وغيره آنيًا" },
      { en: "Enchants and bends a mind", ar: "يسحر العقل ويثنيه" },
      { en: "Strength and centuries of a god", ar: "قوة إله وقرون من عمره" },
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
    aliases: [
      "Nick Fury",
      "Nicholas Fury",
      "Nicholas J. Fury",
      "Colonel Nick Fury",
    ],
    category: "supporting",
    affiliation: ["S.H.I.E.L.D.", "Avengers"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "The Infinity Formula slowed his ageing",
        ar: "صيغة اللانهاية أبطأت شيخوخته",
      },
      {
        en: "Peak human, and he heals faster",
        ar: "ذروة البشر، ويشفى أسرع",
      },
      {
        en: "Runs the intelligence service",
        ar: "يدير جهاز المخابرات",
      },
      {
        en: "Master spy, tactician, interrogator",
        ar: "جاسوس بارع، وتكتيكي، ومحقق",
      },
      {
        en: "Ambidextrous marksman, flies anything",
        ar: "رامٍ بكلتا يديه، ويقود أي طائرة",
      },
      {
        en: "Life Model Decoys of himself",
        ar: "نسخ آلية طبق الأصل عنه",
      },
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
      {
        en: "The Rescue armour, built for her",
        ar: "درع ريسكيو، صُنع لها",
      },
      {
        en: "Repulsors, finger lasers, sonic disruptors",
        ar: "نوابض دافعة وليزر أصابع ومشوّشات صوتية",
      },
      {
        en: "A force field that stops what comes",
        ar: "حقل قوة يوقف ما يأتي",
      },
      {
        en: "Flight, and wings that caught a plane",
        ar: "طيران، وأجنحة أمسكت طائرة",
      },
      {
        en: "An arc reactor in her chest",
        ar: "مفاعل قوسي في صدرها",
      },
      {
        en: "Runs the company",
        ar: "تدير الشركة",
      },
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
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Leading engineer of Wakanda",
        ar: "كبيرة مهندسي واكاندا",
      },
      {
        en: "Built the Panther habit, and improved it",
        ar: "صنعت بذلة النمر، وحسّنتها",
      },
      {
        en: "Sonic blasters built into the sleeves",
        ar: "قاذفات صوتية مدمجة في الأكمام",
      },
      {
        en: "Smarter than anyone in the room",
        ar: "أذكى من في الغرفة",
      },
      {
        en: "Fights in the field, in her own gear",
        ar: "تقاتل ميدانيًا، بعتادها",
      },
      {
        en: "Took the mantle herself",
        ar: "أخذت العباءة بنفسها",
      },
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
      {
        en: "Runs past the speed of sound, and beyond",
        ar: "يعدو أسرع من الصوت، وأبعد",
      },
      {
        en: "Reflexes and reaction time to match",
        ar: "ردود فعل وسرعة استجابة توازيها",
      },
      {
        en: "Spins his arms into cyclonic winds",
        ar: "يدير ذراعيه فيولّد أعاصير",
      },
      {
        en: "Vibrates through solid objects",
        ar: "يهتز فيعبر الأجسام الصلبة",
      },
      {
        en: "Runs up walls and across open water",
        ar: "يجري على الجدران وفوق الماء",
      },
      {
        en: "Sees the world in slow motion",
        ar: "يرى العالم بحركة بطيئة",
      },
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
    affiliation: ["Young Avengers", "Inhumans"],
    universe: ["mcu"],
    /* MUTANT, NOT INHUMAN, and she was neither — this record said "Human".
       The 2014 comics gave her an Inhuman origin and both canons have since
       moved: the MCU finale names it a mutation out loud, and X-Men #26
       (2023) brought her back as a mutant. No published rank, so the class
       stays null. */
    species: "Mutant",
    powers: [
      {
        en: "Stretches and reshapes her whole body",
        ar: "تمطّ جسدها كله وتعيد تشكيله",
      },
      {
        en: "Embiggens a fist, or all of herself",
        ar: "تُضخّم قبضتها، أو نفسها كلها",
      },
      {
        en: "Hard light constructs, from the bangle",
        ar: "تكوينات ضوء صلب، من السوار",
      },
      { en: "Shrinks, and mimics another face", ar: "تتقلص، وتحاكي وجهًا آخر" },
      {
        en: "Heals when she returns to her own shape",
        ar: "تشفى حين تعود إلى شكلها",
      },
      { en: "Inhuman, and a mutant as well", ar: "إنهيومانية، ومتحوّلة أيضًا" },
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
      {
        en: "Near-flawless with a bow, and trick arrows",
        ar: "شبه معصومة بالقوس، وبالسهام الحيلية",
      },
      {
        en: "Master of the sword and the battle staff",
        ar: "أستاذة السيف والعصا القتالية",
      },
      {
        en: "Boxing, jiu-jitsu and half a dozen more",
        ar: "ملاكمة وجوجيتسو ونصف دزينة غيرها",
      },
      {
        en: "A superb acrobat, and a field leader",
        ar: "بهلوانية بارعة، وقائدة ميدانية",
      },
      { en: "No powers whatsoever", ar: "بلا أي قدرات على الإطلاق" },
      { en: "Which is the entire point of her", ar: "وهذا هو مغزاها كله" },
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
    magicSchools: ["eldritch"],
    /* THE SORCERER SUPREME, reading "Sorcery / Keeper of the library" and ranked 263rd. Strange was 120th. The man who holds the office his own teacher held outranked a hundred and forty people who cannot cast anything. */
    powers: [
      {
        en: "Sorcerer Supreme of this reality",
        ar: "الساحر الأعظم لهذا الواقع",
      },
      {
        en: "Eldritch weapons, shields and bindings",
        ar: "أسلحة وسحرية ودروع وقيود",
      },
      {
        en: "Portals anywhere, and armies through them",
        ar: "بوابات إلى أي مكان، وجيوش تعبرها",
      },
      {
        en: "Draws power from other dimensions",
        ar: "يستمد القوة من أبعاد أخرى",
      },
      {
        en: "Knows the spells nobody else is trusted with",
        ar: "يعرف تعاويذ لا يُؤتمن عليها غيره",
      },
      {
        en: "The relics and tomes of Kamar-Taj",
        ar: "ذخائر كامار-تاج وأسفارها",
      },
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
    magicSchools: ["asgardian"],
    powers: [
      /* Ranked directly under Loki on three bullets. Her enchantment is the
         one thing the show says she does better than he does, and killing He
         Who Remains is the largest single act any Loki performs. */
      { en: "Enchantment past Loki's own", ar: "سحر تعويذي يفوق سحر لوكي" },
      { en: "Takes a mind through a touch", ar: "تستولي على العقل بلمسة" },
      { en: "Killed He Who Remains", ar: "قتلت الباقي الأخير" },
      { en: "Illusions", ar: "أوهام" },
      { en: "Combat training", ar: "تدريب قتالي" },
    ],
    origin: {
      en: "A variant of Loki taken as a child by an organisation that decides which lives are allowed to happen, who has spent her whole life hiding from it and planning to take it apart.",
      ar: "نسخة من لوكي أخذتها وهي طفلة منظمة تقرّر أي الحيوات يُسمح لها بالحدوث، فأمضت عمرها مختبئة منها ومخطّطة لتفكيكها.",
    },
    related: [
      { id: "loki", kind: "variant", variantOrigin: "timeline-branch" },
    ],
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
      {
        en: "Master of the Sun: channels a star",
        ar: "سيد الشمس: يمرّر قوة نجم",
      },
      {
        en: "Element guns that obey only him",
        ar: "مسدسا عناصر لا يطيعان سواه",
      },
      {
        en: "Air, earth, fire, water and lightning",
        ar: "هواء وتراب ونار وماء وبرق",
      },
      { en: "Traps a man in solid carbon", ar: "يحبس رجلًا في كربون صلب" },
      {
        en: "Spartax blood: strong, and stopped ageing",
        ar: "دم سبارتاكس: قوي، وتوقف عن الشيخوخة",
      },
      { en: "Psionically linked to his own ship", ar: "مرتبط ذهنيًا بسفينته" },
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
    affiliation: ["Guardians of the Galaxy", "Guardians of the Multiverse"],
    universe: ["mcu"],
    species: "Zehoberei",
    powers: [
      { en: "The deadliest woman in the galaxy", ar: "أفتك امرأة في المجرة" },
      {
        en: "A metal skeleton and a healing implant",
        ar: "هيكل معدني وزرعة شفاء",
      },
      {
        en: "Superhuman strength, speed and reflexes",
        ar: "قوة وسرعة وردود فعل خارقة",
      },
      {
        en: "The Godslayer, and a knife from Thanos",
        ar: "قاتلة الآلهة، وسكين من ثانوس",
      },
      {
        en: "Healed from Wolverine's claws in hours",
        ar: "شُفيت من مخالب ولفرين في ساعات",
      },
      {
        en: "Trained to resist reality being bent",
        ar: "مدرَّبة على مقاومة لَيّ الواقع",
      },
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
      { en: "Master weapons engineer", ar: "مهندس أسلحة بارع" },
      { en: "Builds a weapon out of anything", ar: "يصنع سلاحًا من أي شيء" },
      {
        en: "Deadly marksmanship, from a small target",
        ar: "رماية فتاكة، من هدف صغير",
      },
      {
        en: "Reflexes and senses past any human",
        ar: "ردود فعل وحواس تفوق أي بشري",
      },
      {
        en: "Field commander when it matters",
        ar: "قائد ميداني حين يهم الأمر",
      },
      {
        en: "Cybernetically rebuilt, and angry about it",
        ar: "أُعيد بناؤه آليًا، وهو غاضب لذلك",
      },
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
      {
        en: "Commands every plant and every tree",
        ar: "يأمر كل نبتة وكل شجرة",
      },
      {
        en: "Lifts a hundred tons at full height",
        ar: "يرفع مئة طن بكامل طوله",
      },
      {
        en: "Wood that shrugs off gunfire and flame",
        ar: "خشب يصدّ الرصاص واللهب",
      },
      {
        en: "Regrows entire from a single twig",
        ar: "ينمو كاملًا من غصن واحد",
      },
      { en: "Absorbs wood and energy to grow", ar: "يمتص الخشب والطاقة لينمو" },
      { en: "Survives the vacuum of space", ar: "ينجو في فراغ الفضاء" },
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
      {
        en: "Immense strength, built for one kill",
        ar: "قوة هائلة، صُنعت لقتل واحد",
      },
      { en: "Senses Thanos anywhere he is", ar: "يستشعر ثانوس أينما كان" },
      { en: "Stronger the closer he gets to him", ar: "يقوى كلما اقترب منه" },
      { en: "Walks through Thanos's force fields", ar: "يعبر دروع ثانوس" },
      {
        en: "Regenerates, and needs no air at all",
        ar: "يتجدد، ولا يحتاج هواءً البتة",
      },
      {
        en: "Master knife-fighter, with two blades",
        ar: "سيد قتال السكاكين، بنصلين",
      },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "antihero",
    affiliation: ["Guardians of the Galaxy"],
    universe: ["mcu"],
    species: "Luphomoid",
    powers: [
      {
        en: "Enhanced strength and durability, bolted on",
        ar: "قوة وصلابة معززتان، مركّبتان",
      },
      {
        en: "Cybernetics she rebuilds herself with",
        ar: "أطراف آلية تعيد بها بناء نفسها",
      },
      { en: "Replaces any limb she loses", ar: "تستبدل أي طرف تفقده" },
      {
        en: "Electric shock from a cybernetic arm",
        ar: "صعقة كهربائية من ذراع آلية",
      },
      {
        en: "A probability engine inside her skull",
        ar: "محرك احتمالات داخل جمجمتها",
      },
      {
        en: "Landed blows on Thanos himself",
        ar: "أوقعت ضربات على ثانوس نفسه",
      },
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
    aliases: [
      "Logan",
      "Wolverine",
      "James Howlett",
      "Weapon X",
      "Logan / Wolverine",
    ],
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "antihero",
    affiliation: ["X-Men", "Midnight Sons", "Weapon X"],
    universe: ["fox", "mcu"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      /* THE SKELETON WAS MISSING, which is half of what he is: the claws cut
         and the skeleton is why nothing cuts back. So was the century of
         fighting. Four bullets described a man who heals. */
      { en: "Heals from anything", ar: "يشفى من أي شيء" },
      { en: "An adamantium skeleton", ar: "هيكل عظمي من الأدامانتيوم" },
      { en: "Adamantium claws", ar: "مخالب أدامانتيوم" },
      { en: "Enhanced strength and senses", ar: "قوة وحواس معزّزة" },
      { en: "A century of combat", ar: "قرن من القتال" },
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
    affiliation: ["X-Men", "Illuminati"],
    universe: ["fox", "mcu"],
    species: "Mutant",
    /**
     * OMEGA SINCE 2025, and he was filed alpha. This file used to say Xavier
     * was "conspicuously not" on the Omega list and that the absence was a
     * fact worth carrying — true of House of X #1, false since the
     * compilation added him. The old note was the reason he sat at alpha.
     */
    mutantClass: "omega",
    powers: [
      /* Cerebro was listed as an object rather than as what it does: it puts
         every mind on Earth within his reach. The memory work and the psychic
         attacks — the things he actually wins with — were absent. */
      { en: "The strongest telepath", ar: "أقوى قارئ للأفكار" },
      { en: "Mind control", ar: "التحكم بالعقول" },
      { en: "Erases and rewrites memory", ar: "يمحو الذكريات ويعيد كتابتها" },
      { en: "Psychic attacks and illusions", ar: "هجمات نفسية وأوهام" },
      {
        en: "Every mind on Earth, via Cerebro",
        ar: "كل عقل على الأرض عبر سيريبرو",
      },
      { en: "A brilliant scientist", ar: "عالِم لامع" },
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
    /**
     * ANTI-HERO, and this one is genuinely arguable rather than settled.
     *
     * The distinction is not goals versus methods — both anti-types have
     * decent goals and harsh methods. It is which side of the story someone
     * stands on: an anti-hero is a PROTAGONIST who lacks heroic qualities, an
     * anti-villain is an ANTAGONIST who is not purely evil.
     *
     * By that test Magneto is both, across fourteen titles. He is the
     * antagonist of X-Men, X2, The Last Stand and Apocalypse. But Xavier
     * wills him the school in X-Men '97 and he LEADS the X-Men through two
     * seasons, which is not something an antagonist does. Stan Lee said he
     * never wrote him as a bad guy, and the modern books treat him as an
     * anti-hero outright.
     *
     * The corpus holds one value, so it holds the one that covers the most
     * of him. Filed anti-villain first, which was defensible and put the
     * weight on the wrong era.
     */
    category: "antihero",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    /* SIX BULLETS SAYING MAGNETISM SIX TIMES, which the per-class cap then flattened to three. The Master of Magnetism scored 202. What he DOES with it -- battleships, an island, a headless Celestial held together, an EMP round the planet -- was nowhere on the record. */
    powers: [
      {
        en: "Controls magnetism, and all of its forms",
        ar: "يتحكم بالمغناطيسية بكل صورها",
      },
      {
        en: "Lifted battleships, and raised an island",
        ar: "رفع بوارج، وانتشل جزيرة",
      },
      {
        en: "Held a headless Celestial together",
        ar: "أمسك جسد سماوي مقطوع الرأس",
      },
      {
        en: "Force fields, flight, and survives space",
        ar: "حقول قوة وطيران ونجاة في الفضاء",
      },
      {
        en: "An EMP that goes round the planet",
        ar: "نبضة كهرومغناطيسية تلف الكوكب",
      },
      {
        en: "A genius in genetics and engineering",
        ar: "عبقري في الوراثة والهندسة",
      },
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
      { en: "The finest telepath alive", ar: "أمهر متخاطرة على قيد الحياة" },
      {
        en: "Telekinesis down to the molecule",
        ar: "تحريك ذهني حتى مستوى الجزيء",
      },
      {
        en: "Commands many minds at one time",
        ar: "تسيطر على عقول كثيرة في آن",
      },
      {
        en: "As Phoenix, matter at the atomic level",
        ar: "كفينيكس، المادة على مستوى الذرة",
      },
      {
        en: "Rivalled Galactus as Dark Phoenix",
        ar: "ضاهت غالاكتوس كفينيكس المظلمة",
      },
      { en: "No known upper limit", ar: "لا حدّ أعلى معروف" },
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
      {
        en: "Controls the weather of a whole planet",
        ar: "تتحكم بطقس كوكب بأكمله",
      },
      {
        en: "Lightning, hurricanes and absolute cold",
        ar: "برق وأعاصير وبرد مطلق",
      },
      {
        en: "Omega-level, and it has no natural ceiling",
        ar: "بمستوى أوميغا، وبلا سقف طبيعي",
      },
      { en: "Flies on the winds she makes", ar: "تطير على رياح تصنعها" },
      { en: "Changes the pressure inside a room", ar: "تغيّر الضغط داخل غرفة" },
      {
        en: "Bound to an atmosphere, and only that",
        ar: "مقيّدة بالغلاف الجوي، وبه وحده",
      },
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
      {
        en: "Optic blasts that punch through steel",
        ar: "أشعة بصرية تخترق الفولاذ",
      },
      {
        en: "Force, not heat, and it never tires him",
        ar: "قوة لا حرارة، ولا تُتعبه",
      },
      {
        en: "Drawn from another dimension entirely",
        ar: "مستمدة من بُعد آخر تمامًا",
      },
      {
        en: "Ricochets them off angles nobody sees",
        ar: "يرتدّ بها عن زوايا لا يراها أحد",
      },
      {
        en: "Cannot switch them off without the visor",
        ar: "لا يطفئها دون القناع",
      },
      {
        en: "The field leader, and the best tactician",
        ar: "قائد الميدان، وأبرع التكتيكيين",
      },
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
      {
        en: "Becomes anyone, down to the fingerprints",
        ar: "تصير أي أحد، حتى بصمات الأصابع",
      },
      {
        en: "Fools a retina scan as easily as an eye",
        ar: "تخدع ماسح الشبكية كما تخدع العين",
      },
      {
        en: "Ages a century and looks thirty",
        ar: "تشيخ قرنًا وتبدو في الثلاثين",
      },
      {
        en: "An accelerated healing factor",
        ar: "عامل شفاء متسارع",
      },
      {
        en: "Resists telepaths, poisons and disease",
        ar: "تقاوم المتخاطرين والسموم والمرض",
      },
      {
        en: "A hundred years of espionage",
        ar: "مئة عام من التجسس",
      },
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
      {
        en: "Lifts ten tons in the feline form",
        ar: "يرفع عشرة أطنان في هيئته السنورية",
      },
      {
        en: "Runs on all fours at forty miles an hour",
        ar: "يعدو على أربع بأربعين ميلًا في الساعة",
      },
      {
        en: "Claws, fangs and senses to match",
        ar: "مخالب وأنياب وحواس توازيها",
      },
      {
        en: "A healing factor, and slow ageing",
        ar: "عامل شفاء، وشيخوخة بطيئة",
      },
      {
        en: "One of the eight smartest people alive",
        ar: "من أذكى ثمانية على قيد الحياة",
      },
      {
        en: "A world-class biochemist and geneticist",
        ar: "كيميائي حيوي وعالم وراثة من الطراز الأول",
      },
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
      {
        en: "Absorbs powers and memories by touch",
        ar: "تمتص القدرات والذكريات باللمس",
      },
      {
        en: "Hold on long enough and it is permanent",
        ar: "أمسك طويلًا بما يكفي فيصير دائمًا",
      },
      {
        en: "Kept Ms. Marvel's strength and flight",
        ar: "احتفظت بقوة مِس مارفل وطيرانها",
      },
      {
        en: "Near-invulnerable with it",
        ar: "شبه منيعة بها",
      },
      {
        en: "Stacks several stolen power sets at once",
        ar: "تكدس عدة قدرات مسروقة معًا",
      },
      {
        en: "Cannot touch anyone safely",
        ar: "لا تستطيع لمس أحد بأمان",
      },
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
      {
        en: "Teleports in a puff of brimstone",
        ar: "ينتقل في نفحة كبريت",
      },
      {
        en: "Carries passengers when he goes",
        ar: "يحمل معه من يشاء",
      },
      {
        en: "Teleports a foe, which is worse",
        ar: "ينقل خصمًا، وذاك أسوأ",
      },
      {
        en: "Adhesive hands and feet, and a tail",
        ar: "يدان وقدمان لاصقتان، وذيل",
      },
      {
        en: "Vanishes into shadow, being that dark",
        ar: "يتلاشى في الظل، لشدة قتامته",
      },
      {
        en: "A fencer, and a superb acrobat",
        ar: "مبارز، وبهلوان بارع",
      },
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
      {
        en: "Becomes organic ice, and stops being flesh",
        ar: "يصير جليدًا عضويًا، ويكف عن كونه لحمًا",
      },
      {
        en: "Absolute zero, and constructs from nothing",
        ar: "صفر مطلق، وتكوينات من لا شيء",
      },
      {
        en: "Controls every drop of water near him",
        ar: "يتحكم بكل قطرة ماء قريبة",
      },
      {
        en: "Omega-level: no known upper limit",
        ar: "بمستوى أوميغا: لا حدّ أعلى معروف",
      },
      {
        en: "Reforms from vapour after being shattered",
        ar: "يتشكّل من البخار بعد أن يتحطم",
      },
      {
        en: "Could freeze a planet if he let himself",
        ar: "قد يجمّد كوكبًا لو سمح لنفسه",
      },
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
    affiliation: ["X-Force", "Weapon X"],
    universe: ["fox", "mcu"],
    reality: "Earth-10005",
    /* NOT a Mutant, and the joke of the character depends on it: the X-Men
       keep turning him down because he was never born with an X-gene. Weapon X
       copied Wolverine's healing factor into a dying man, which is what a
       mutate is. Two real complications, neither enough to move him. The films
       say the Workshop TRIGGERS dormant mutant genes, so Marvel Database files
       Earth-10005 Wade as an "artificial mutant"; and X-Force #32 grew him a
       new body out of Krakoa that came with an X-gene, which finally got him
       citizenship. Both are him acquiring the gene, not being born with it. */
    species: "Mutate",
    powers: [
      /* He was ranked 344th, below a man who vomits acid and cannot aim it,
         because three of his four bullets were about dying and joking. He is
         a master of every weapon he picks up and that was nowhere. */
      { en: "Heals from anything", ar: "يشفى من أي شيء" },
      { en: "Cannot be killed", ar: "لا يُقتَل" },
      { en: "Master of blades and guns", ar: "بارع بالسيوف والبنادق" },
      { en: "Fights through any injury", ar: "يقاتل رغم أي إصابة" },
      { en: "Enhanced agility and reflexes", ar: "رشاقة وردود فعل معزّزة" },
      { en: "Talks to the audience", ar: "يخاطب الجمهور" },
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
      {
        en: "Turns his body to organic steel",
        ar: "يحيل جسده فولاذًا عضويًا",
      },
      {
        en: "Lifts seventy-five tons in that form",
        ar: "يرفع خمسة وسبعين طنًا في تلك الهيئة",
      },
      {
        en: "Near-invulnerable, and never tires",
        ar: "شبه منيع، ولا يتعب",
      },
      {
        en: "Needs no food, water or air in steel",
        ar: "لا يحتاج طعامًا ولا ماءً ولا هواءً",
      },
      {
        en: "Has carried the power of Cyttorak",
        ar: "حمل قوة سيتوراك",
      },
      {
        en: "An artist when he is not fighting",
        ar: "فنان حين لا يقاتل",
      },
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
    affiliation: ["Brotherhood", "Weapon X", "Marauders"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      {
        en: "Heals from a claw through the brain",
        ar: "يشفى من مخلب اخترق دماغه",
      },
      {
        en: "Strength, speed and durability with it",
        ar: "قوة وسرعة وصلابة معها",
      },
      {
        en: "Retractable claws, and fangs to match",
        ar: "مخالب تُسحب، وأنياب توازيها",
      },
      {
        en: "Hears a heartbeat two hundred feet off",
        ar: "يسمع نبض قلب على بعد مئتي قدم",
      },
      {
        en: "Tracks by scent, and never loses it",
        ar: "يتعقب بالرائحة، ولا يفقدها",
      },
      {
        en: "Carbonadium slows the healing",
        ar: "الكاربونيديوم يبطئ شفاءه",
      },
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
    aliases: [
      "Peter Parker",
      "Spider-Man",
      "Spiderman",
      "Peter Parker / Spider-Man",
    ],
    category: "hero",
    affiliation: [
      "Avengers",
      "Team Iron Man",
      "Spider-Society",
      "New Warriors",
      "Spider-Man's Team",
    ],
    universe: ["mcu", "sony"],
    species: "Human mutate",
    powers: [
      /* "Proportionate strength" is the phrase the comics use and it hides the
         number: proportionate to a spider means several tons. Four bullets put
         him behind Captain America, whose strength is PEAK HUMAN — the serum
         took Steve to the top of the human scale and the bite took Peter off
         it. */
      { en: "Lifts several tons", ar: "يرفع عدة أطنان" },
      { en: "Superhuman speed and agility", ar: "سرعة ورشاقة خارقتان" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
      { en: "Wall-crawling", ar: "التسلق على الجدران" },
      { en: "Web-shooters of his own design", ar: "قاذفات شباك من تصميمه" },
      { en: "Genius with a chemistry set", ar: "عبقري بعدة كيمياء" },
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
    /* REAL AND UNCREDITED, like the Silver Surfer in the 1967 series. TMDB
       lists 66 credits for Ultimate Spider-Man and none of them is this
       character, who is a New Warrior across seasons 3 and 4. */
    alsoIn: ["ultimate-spider-man"],
    category: "hero",
    affiliation: ["Spider-Society", "New Warriors"],
    universe: ["sony"],
    reality: "Earth-1610",
    species: "Human mutate",
    powers: [
      { en: "Venom strike", ar: "لسعة السم" },
      { en: "Turns invisible", ar: "يصير غير مرئي" },
      { en: "Lifts several tons", ar: "يرفع عدة أطنان" },
      { en: "Superhuman speed and agility", ar: "سرعة ورشاقة خارقتان" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
      { en: "Wall-crawling", ar: "التسلق على الجدران" },
    ],
    origin: {
      en: "A Brooklyn teenager at a school he did not want to go to, bitten by a spider from somewhere else, who finds out he is one of many and has to decide to be his own.",
      ar: "مراهق من بروكلين في مدرسة لم يرد الالتحاق بها، يلدغه عنكبوت من مكان آخر، فيكتشف أنه واحد من كثيرين وعليه أن يقرّر أن يكون نفسه.",
    },
    related: [
      {
        id: "spider-man",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
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
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
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
    /* Red Goblin is Norman wearing Carnage, not a second person. An alias,
       so a search for it lands on him rather than on a duplicate record. */
    aliases: ["Green Goblin", "Norman Osborn", "Red Goblin"],
    category: "villain",
    affiliation: ["Sinister Six"],
    universe: ["sony", "mcu"],
    species: "Human mutate",
    powers: [
      {
        en: "The goblin formula: strength and speed",
        ar: "صيغة الغول: قوة وسرعة",
      },
      {
        en: "Heals from what should have killed him",
        ar: "يشفى مما كان ينبغي أن يقتله",
      },
      {
        en: "A genius, and completely insane with it",
        ar: "عبقري، ومجنون تمامًا معها",
      },
      {
        en: "Pumpkin bombs, and a glider that obeys",
        ar: "قنابل يقطينية، وحوّامة تطيعه",
      },
      { en: "Killed the woman Peter loved", ar: "قتل المرأة التي أحبها بيتر" },
      { en: "Comes back, every single time", ar: "يعود في كل مرة" },
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
    /* Superior Spider-Man and Superior Octopus are both Otto, in Peter's
       body and in his own. Aliases rather than records, by the rule Kindred
       and the Red Goblin already set: this file holds people, not costumes. */
    aliases: [
      "Doctor Octopus",
      "Otto Octavius",
      "Doc Ock",
      "Dr. Otto Octavius",
      "Superior Spider-Man",
      "Superior Octopus",
    ],
    category: "villain",
    affiliation: ["Sinister Six"],
    universe: ["sony", "mcu"],
    species: "Human",
    powers: [
      /* THE SINISTER SIX WERE FIFTEEN RECORDS OF TWO OR THREE BULLETS, and
         this one was in tier 8, "humans who turn up anyway, no powers at all",
         because his species is Human. Tier 7's own gloss is "anyone whose
         power is BOLTED ON", and four arms wired into a spine is the literal
         case of it. He leads this team; ranking him under the Vulture was the
         second half of the same mistake. */
      {
        en: "Four mechanical arms, tons apiece",
        ar: "أربعة أذرع آلية، أطنان لكل منها",
      },
      { en: "Faster than he can be hit", ar: "أسرع مما يمكن ضربه" },
      { en: "Armoured, and they never tire", ar: "مدرّعة، ولا تتعب أبدًا" },
      {
        en: "One of the smartest men alive",
        ar: "من أذكى الرجال على قيد الحياة",
      },
      {
        en: "Took Spider-Man's body and kept it",
        ar: "استولى على جسد سبايدرمان واحتفظ به",
      },
      {
        en: "Beats Peter more often than he loses",
        ar: "يهزم بيتر أكثر مما يُهزم",
      },
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
    /* ANTIVILLAIN. Max Dillon was ignored until it made him dangerous, and what he wanted was to be seen. */
    category: "antivillain",
    affiliation: ["Sinister Six"],
    universe: ["sony", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Becomes living electricity", ar: "يصير كهرباء حية" },
      {
        en: "Discharges enough to black out a city",
        ar: "يفرّغ ما يكفي لإطفاء مدينة",
      },
      {
        en: "Travels through any wire or grid",
        ar: "يسافر عبر أي سلك أو شبكة",
      },
      {
        en: "Absorbs a power station to recharge",
        ar: "يمتص محطة طاقة ليشحن نفسه",
      },
      { en: "Lightning, at will and at range", ar: "برق، متى شاء وعن بُعد" },
      { en: "Water is what stops him", ar: "الماء هو ما يوقفه" },
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
    /* ANTIVILLAIN, not villain. Flint Marko robs to pay for a sick daughter and says so, and Spider-Man 3 ends with Peter forgiving him rather than beating him. */
    category: "antivillain",
    affiliation: ["Sinister Six", "New Warriors"],
    universe: ["sony", "mcu"],
    species: "Human mutate",
    powers: [
      {
        en: "Becomes sand, and reforms from any hit",
        ar: "يصير رملًا، ويتشكل بعد أي ضربة",
      },
      {
        en: "Hardens to stone or scatters to dust",
        ar: "يتصلّب حجرًا أو يتبدد غبارًا",
      },
      { en: "Grows to the size of a building", ar: "ينمو بحجم مبنى" },
      {
        en: "Shapes his arms into hammers and blades",
        ar: "يشكّل ذراعيه مطارق ونصالًا",
      },
      {
        en: "Becomes a storm that fills a street",
        ar: "يصير عاصفة تملأ شارعًا",
      },
      { en: "Water and glass are the answer", ar: "الماء والزجاج هما الحل" },
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
    /* ANTIVILLAIN, not villain. Curt Connors is trying to regrow his own arm and then everyone else's, which is the whole of his motive before the reptile takes over. */
    category: "antivillain",
    affiliation: ["Sinister Six"],
    universe: ["sony", "mcu"],
    species: "Human mutate",
    powers: [
      {
        en: "Reptilian strength, well past human",
        ar: "قوة زاحفة تفوق البشر بكثير",
      },
      { en: "Regrows any limb he loses", ar: "يُنبت أي طرف يفقده" },
      {
        en: "Claws, fangs and a tail that breaks bone",
        ar: "مخالب وأنياب وذيل يكسر العظم",
      },
      { en: "Commands every reptile that hears him", ar: "يأمر كل زاحف يسمعه" },
      { en: "Heals faster than a man can", ar: "يشفى أسرع مما يقدر إنسان" },
      { en: "Connors is still in there", ar: "كونورز لا يزال في الداخل" },
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
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
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
    affiliation: ["Sinister Six"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      {
        en: "A serum that made him more than a man",
        ar: "مصل جعله أكثر من إنسان",
      },
      {
        en: "Strength, speed and senses past human",
        ar: "قوة وسرعة وحواس تفوق البشر",
      },
      {
        en: "Tracks anything, anywhere, on foot",
        ar: "يتعقب أي شيء في أي مكان سيرًا",
      },
      { en: "Barely ages, and does not tire", ar: "لا يشيخ تقريبًا ولا يتعب" },
      {
        en: "Beat Spider-Man and buried him alive",
        ar: "هزم سبايدرمان ودفنه حيًا",
      },
      { en: "Hunts with spears and with poison", ar: "يصطاد بالرماح والسم" },
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
    /* NOT an ordinary human. Radioactive waste blinded him and rewired every other sense. Radar sense is not training. */
    species: "Mutate",
    powers: [
      { en: "Radar sense", ar: "حاسة رادارية" },
      { en: "Hears a heartbeat lie", ar: "يسمع كذب نبضة القلب" },
      { en: "Every sense hyper-acute", ar: "كل حواسه مفرطة الحدة" },
      { en: "Master martial artist", ar: "سيد فنون قتالية" },
      { en: "Acrobat", ar: "بهلواني" },
      { en: "Billy clubs", ar: "هراوتان" },
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
      /* The strongest of them by raw lift, which some sources rank first
         outright — and she is the least trained, which is why she is third. */
      { en: "Superhuman strength", ar: "قوة خارقة" },
      { en: "Throws a man through a wall", ar: "تقذف رجلًا عبر جدار" },
      { en: "Great durability", ar: "تحمّل كبير" },
      { en: "Leaps rather than flies", ar: "تقفز ولا تطير" },
      { en: "Heals fast", ar: "تشفى سريعًا" },
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
    affiliation: ["Defenders", "Spider-Man's Team"],
    universe: ["defenders"],
    species: "Enhanced human",
    powers: [
      { en: "Unbreakable skin", ar: "جلد لا ينكسر" },
      { en: "Bulletproof", ar: "مضاد للرصاص" },
      { en: "Superhuman strength", ar: "قوة خارقة" },
      { en: "Accelerated healing", ar: "شفاء متسارع" },
      { en: "Enormous durability", ar: "تحمّل هائل" },
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
    affiliation: ["Defenders", "Spider-Man's Team"],
    universe: ["defenders"],
    /* NOT an ordinary human. He punched the heart of a dragon and the chi is what came back out. */
    species: "Enhanced human",
    powers: [
      /* Six is the cap, so the utility gave way to the body. "Immune to
         poison and disease" is true and is not what he wins fights with;
         chi-enhanced strength, speed and durability are the half of him the
         record was missing. */
      { en: "The Iron Fist: chi as a weapon", ar: "قبضة الحديد: تشي سلاحًا" },
      { en: "Shatters steel with one strike", ar: "يحطم الفولاذ بضربة" },
      { en: "Chi-enhanced strength and speed", ar: "قوة وسرعة معززتان بالتشي" },
      { en: "Chi-hardened durability", ar: "صلابة مقواة بالتشي" },
      { en: "Heals himself with chi", ar: "يشفي نفسه بالتشي" },
      { en: "Master martial artist of K'un-Lun", ar: "سيد قتال من كون-لون" },
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
      { en: "Marine special forces training", ar: "تدريب قوات خاصة" },
      { en: "Weapons mastery", ar: "إتقان الأسلحة" },
      { en: "Heavy weapons", ar: "أسلحة ثقيلة" },
      { en: "Tactician", ar: "تكتيكي" },
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
      {
        en: "Assassin training, from the Hand",
        ar: "تدريب اغتيال، من اليد",
      },
      {
        en: "Twin sai, and she never puts them down",
        ar: "سايان، ولا تضعهما أبدًا",
      },
      {
        en: "A martial artist at the top of the field",
        ar: "فنانة قتال في القمة",
      },
      {
        en: "Killed Daredevil, and came back herself",
        ar: "قتلت ديرديفل، وعادت هي نفسها",
      },
      {
        en: "Moves silently, and is hard to see",
        ar: "تتحرك بصمت، ويصعب رؤيتها",
      },
      {
        en: "Resurrected by the Hand more than once",
        ar: "أحيتها اليد أكثر من مرة",
      },
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
    aliases: ["Kingpin", "Wilson Fisk", "Fisk", "The Kingpin"],
    category: "villain",
    affiliation: [],
    universe: ["sony", "defenders", "mcu"],
    species: "Human",
    powers: [
      /* "Enormous physical strength / Owns the city / Ruthless negotiator" —
         two of three about the business. The bulk is muscle, he has beaten
         Daredevil with his hands, and none of the durability or the training
         was written down. */
      { en: "Enormous physical strength", ar: "قوة بدنية هائلة" },
      { en: "Takes a beating and keeps coming", ar: "يتلقى الضرب ويواصل" },
      {
        en: "Elite hand-to-hand combatant",
        ar: "مقاتل متلاحم من الطراز الأول",
      },
      { en: "Uses his own weight as a weapon", ar: "يستعمل وزنه سلاحًا" },
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
    /* NOT an ordinary human. Photographic reflexes, and in the MCU the ancestral power that comes with them. */
    species: "Enhanced human",
    powers: [
      {
        en: "Copies any movement she sees, exactly",
        ar: "تنسخ أي حركة تراها، تمامًا",
      },
      {
        en: "Matches fighters who trained for decades",
        ar: "تجاري مقاتلين تدربوا عقودًا",
      },
      { en: "Has hosted the Phoenix Force", ar: "حملت قوة الفينيكس" },
      {
        en: "Photographic memory, and peak conditioning",
        ar: "ذاكرة تصويرية، ولياقة قصوى",
      },
      {
        en: "Reaches her ancestors for what they knew",
        ar: "تصل إلى أسلافها لتأخذ ما عرفوه",
      },
      {
        en: "Deaf, and reads a room by the lips",
        ar: "صمّاء، وتقرأ الغرفة من الشفاه",
      },
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
    affiliation: ["Fantastic Four", "Illuminati"],
    universe: ["fox", "mcu"],
    species: "Human mutate",
    powers: [
      /* "Stretches indefinitely / The smartest man alive" put the man who
         out-thought Galactus at 505th. The intellect is the power — it builds
         the gates, the fields and the machines the rest of the team survives
         inside — and the record never said what it produces. */
      { en: "Stretches indefinitely", ar: "يتمدد بلا حد" },
      { en: "The smartest man alive", ar: "أذكى رجل على قيد الحياة" },
      { en: "Builds gates between universes", ar: "يبني بوابات بين الأكوان" },
      { en: "Invents his way out of anything", ar: "يخترع مخرجًا من أي شيء" },
      {
        en: "Force fields and unstable molecules",
        ar: "دروع وجزيئات غير مستقرة",
      },
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
    aliases: [
      "Invisible Woman",
      "Sue Storm",
      "Susan Storm",
      "Invisible Girl",
      "The Invisible Woman",
    ],
    category: "hero",
    affiliation: ["Fantastic Four"],
    universe: ["fox", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Force fields nothing has broken", ar: "حقول قوة لم يكسرها شيء" },
      {
        en: "Domes miles wide, or diamond-hard",
        ar: "قباب بأميال، أو بصلابة الماس",
      },
      {
        en: "Forms a field inside a body, and expands it",
        ar: "تشكّل حقلًا داخل جسد ثم توسّعه",
      },
      { en: "Turns herself and others invisible", ar: "تُخفي نفسها وغيرها" },
      {
        en: "Rides her own constructs through the air",
        ar: "تركب تكويناتها في الهواء",
      },
      { en: "The strongest of the Fantastic Four", ar: "أقوى الفانتاستيك فور" },
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
    aliases: ["Human Torch", "Johnny Storm", "The Human Torch"],
    category: "hero",
    affiliation: ["Fantastic Four"],
    universe: ["fox", "mcu"],
    species: "Human mutate",
    powers: [
      /* "Bursts into flame / Flight / Heat control" ranked him 351st, below
         the Thing and below Iron Man, and described a man who is warm. His
         signature move is an omnidirectional burst at a million degrees that
         devastates nine hundred feet, and he has absorbed an atomic
         detonation and kept pace with the Silver Surfer. */
      { en: "The nova flame, a million degrees", ar: "لهب النوفا، مليون درجة" },
      {
        en: "One burst levels everything nearby",
        ar: "دفقة واحدة تسوّي ما حولها",
      },
      {
        en: "Absorbs heat, even an atomic blast",
        ar: "يمتص الحرارة، حتى انفجارًا ذريًا",
      },
      {
        en: "Flies far past the speed of sound",
        ar: "يطير أسرع من الصوت بأضعاف",
      },
      { en: "Shapes and aims every flame", ar: "يشكّل كل لهب ويصوّبه" },
      { en: "Spent for hours after a nova", ar: "يُستنزف ساعات بعد النوفا" },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["Fantastic Four"],
    universe: ["fox", "mcu"],
    species: "Human mutate",
    powers: [
      { en: "Enormous strength", ar: "قوة هائلة" },
      { en: "A body of living rock", ar: "جسد من صخر حيّ" },
      { en: "Near-total durability", ar: "صلابة شبه تامة" },
      { en: "Fights on through anything", ar: "يواصل القتال مهما كان" },
      { en: "Test pilot before the flight", ar: "طيار تجارب قبل الرحلة" },
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
    /* "Dr. Doom" is how EIGHT titles credit him — Super Hero Squad, Black
       Panther's Quest, the 1994 series, Earth's Mightiest Heroes, Avengers
       Assemble, World's Greatest Heroes and Fantastic Four (2015). Without it
       the most-adapted villain in Marvel was absent from six of his own
       shows. "Doctor Doom" and "Dr. Doom" normalise differently: the period
       goes, the word does not. */
    aliases: [
      "Doctor Doom",
      "Victor Von Doom",
      "Doom",
      "Victor Domashev",
      "Dr. Doom",
    ],
    /* ANTIVILLAIN, not villain. A dictator who genuinely believes only he can protect Latveria, and is often right about the threat if never about himself. */
    category: "antivillain",
    affiliation: ["Magic"],
    universe: ["fox", "mcu"],
    species: "Human",
    /* He learned it, the same as Strange did — Doom studies sorcery as
       seriously as he studies engineering, and the corpus filed him as a man
       in armour with no magic at all. */
    magicSchools: ["eldritch"],
    powers: [
      /* Three bullets for Marvel's greatest villain, carried entirely by his
         slot in the tier head. Rashid named him as one of the smartest, and
         the record never said it. */
      {
        en: "Sorcery and science, both mastered",
        ar: "سحر وعلم، أتقنهما معًا",
      },
      {
        en: "One of the smartest men alive",
        ar: "من أذكى الرجال على قيد الحياة",
      },
      { en: "Powered armour of his own design", ar: "درع مزوّد من تصميمه" },
      {
        en: "Has taken godhood more than once",
        ar: "انتزع الألوهية أكثر من مرة",
      },
      { en: "Rules Latveria absolutely", ar: "يحكم لاتفيريا حكمًا مطلقًا" },
      { en: "Head of state", ar: "رئيس دولة" },
    ],
    origin: {
      en: "A monarch, a scientist and a sorcerer, who is convinced the world would be better run by him and has a good deal of evidence.",
      ar: "ملك وعالِم وساحر، مقتنع بأن العالم سيُدار على نحو أفضل بين يديه، ولديه من الأدلة الكثير.",
    },
    related: [{ id: "mister-fantastic", kind: "enemy" }],
  },
  /**
   * TWO SURFERS, because the screen has two and they are not the same person.
   *
   * Norrin Radd is the Surfer of the comics and of Rise of the Silver Surfer,
   * the 1994 cartoon and Super Hero Squad. The Fantastic Four: First Steps
   * casts Julia Garner as SHALLA-BAL — in the comics Norrin's love on Zenn-La,
   * the woman he gave himself up to save, and on Earth-828 the one who took
   * the board instead. Filing both under one record would say the MCU cast a
   * woman as Norrin, which is not what happened.
   *
   * The split runs on the credits themselves. First Steps credits her
   * "Shalla-Bal / Silver Surfer", and everything else credits a bare "Silver
   * Surfer" — so she matches on her own name, and Norrin keeps the bare alias
   * he needs for the other four titles with First Steps excluded by name. See
   * `notIn`: it throws if it ever stops matching.
   */
  {
    id: "silver-surfer",
    nameEn: "Silver Surfer (Norrin Radd)",
    nameAr: "السيلفر سيرفر (نورين راد)",
    aliases: ["Silver Surfer", "Norrin Radd"],
    /* First Steps is Shalla-Bal's, and the bare alias would take it. */
    notIn: ["the-fantastic-four-first-steps"],
    /* REAL AND UNCREDITED. The Surfer carries the 1967 series' Galactus
       episode, voiced by Vic Perrin, and TMDB lists four credits for the whole
       show — the Four themselves and nobody else. Not a matcher failure: there
       is no credit to match. The 1978 series is deliberately absent, where the
       Thing only READS a Silver Surfer comic, and so is World's Greatest
       Heroes, whose Galactus arrives with four elemental heralds instead. */
    alsoIn: ["fantastic-four-1967"],
    category: "antihero",
    affiliation: ["Cosmic entities", "Heralds of Galactus"],
    universe: ["fox"],
    species: "Zenn-Lavian",
    powers: [
      /* NINE OF THE ELEVEN HERALDS WERE A BLOCK from 133 to 141: three
         bullets each, every one of them opening "The Power Cosmic". Same
         fault as the Eternals and the Inheritors, and the same fix. Galactus
         tailors what he grants -- Terrax gets a planet's crust, Red Shift
         gets a cut in space, Frankie Raye gets a fire that kills stars -- so
         the shared line stays and what each one DOES with it is written
         down. */
      {
        en: "The Power Cosmic, at its most precise",
        ar: "القوة الكونية، في أدقّ صورها",
      },
      {
        en: "Beams that shatter a planet, or tint a flower",
        ar: "أشعة تحطم كوكبًا أو تلوّن زهرة",
      },
      { en: "Transmutes matter atom by atom", ar: "يحوّل المادة ذرةً ذرة" },
      {
        en: "Makes black holes, and survived one",
        ar: "يصنع الثقوب السوداء، ونجا من واحد",
      },
      {
        en: "Reassembled from atoms spread over a galaxy",
        ar: "تجمّع من ذرات تناثرت عبر مجرة",
      },
      {
        en: "Peels back time to see what happened",
        ar: "يزيح الزمن ليرى ما حدث",
      },
    ],
    origin: {
      en: "A man who gave himself to something enormous in exchange for his planet being spared, and now goes ahead of it looking for the next one.",
      ar: "رجل وهب نفسه لشيء هائل مقابل النجاة بكوكبه، وصار يسبقه باحثًا عن الكوكب التالي.",
    },
    related: [
      { id: "galactus", kind: "enemy" },
      { id: "shalla-bal", kind: "family" },
    ],
  },
  {
    id: "shalla-bal",
    nameEn: "Silver Surfer (Shalla-Bal)",
    nameAr: "السيلفر سيرفر (شالا-بال)",
    /* NOT a bare "Silver Surfer": four other titles credit that and none of
       them are hers. Her own name is on the First Steps credit. */
    aliases: ["Shalla-Bal"],
    category: "antihero",
    affiliation: ["Cosmic entities", "Heralds of Galactus"],
    universe: ["mcu"],
    reality: "Earth-828",
    species: "Zenn-Lavian",
    powers: [
      {
        en: "The Power Cosmic, near Norrin's own range",
        ar: "القوة الكونية، قرب مدى نورين",
      },
      {
        en: "Energy and matter, at a herald's scale",
        ar: "طاقة ومادة، بمقياس مبشّر",
      },
      {
        en: "Flies between stars on her own board",
        ar: "تطير بين النجوم على لوحها",
      },
      {
        en: "Fought Celestials beside Galactus",
        ar: "قاتلت السماويين إلى جانب غالاكتوس",
      },
      {
        en: "Empress of Zenn-La before any of it",
        ar: "إمبراطورة زين-لا قبل ذلك كله",
      },
    ],
    origin: {
      en: "She took the bargain so her own world would live, and has spent every year since picking out somebody else's. The job is to arrive first and be the last thing a planet sees that is still willing to talk.",
      ar: "قبلت الصفقة لينجو عالمها، وأمضت كل عام منذئذ تنتقي عالم غيرها. مهمتها أن تصل أولًا، وأن تكون آخر ما يراه كوكب وهو ما زال قادرًا على الكلام.",
    },
    related: [
      { id: "galactus", kind: "enemy" },
      { id: "silver-surfer", kind: "family" },
    ],
  },
];

const villains: CharacterDraft[] = [
  {
    id: "thanos",
    nameEn: "Thanos",
    nameAr: "ثانوس",
    aliases: ["Thanos"],
    /* ANTIVILLAIN, not villain. Sincere about the arithmetic and wrong about everything else. The films make his reasoning explicit rather than hiding it, which is what separates him from a Red Skull. */
    category: "antivillain",
    affiliation: ["Titans"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      /* THREE BULLETS FOR THE MAD TITAN, and one of them was "Strategist".
         The species line is the answer to Rashid's second question: he IS an
         Eternal of Titan. He looks nothing like Ikaris because he carries the
         Deviant gene, which is a fact about his face and not his species. */
      {
        en: "Strength enough to trade with the Hulk",
        ar: "قوة تكفي لمبادلة هَلك الضربات",
      },
      {
        en: "Near-invulnerable, and heals from it",
        ar: "شبه منيع، ويشفى مما يصيبه",
      },
      { en: "Cosmic energy blasts", ar: "طلقات طاقة كونية" },
      {
        en: "The finest strategist alive",
        ar: "أمهر استراتيجي على قيد الحياة",
      },
      {
        en: "An Eternal of Titan, with Deviant blood",
        ar: "أزليّ من تيتان، بدم منحرف",
      },
      {
        en: "Deathless, by Death's own curse",
        ar: "لا يموت، بلعنة الموت نفسها",
      },
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
      {
        en: "An adamantium body that shrugged off Thor",
        ar: "جسد أدامانتيوم صدّ ثور",
      },
      {
        en: "And a supernova, on one occasion",
        ar: "وسوبرنوفا، في مناسبة واحدة",
      },
      {
        en: "The encephalo-beam takes a mind whole",
        ar: "شعاع الدماغ يستولي على عقل كاملًا",
      },
      {
        en: "Technopathy: every machine within reach",
        ar: "تقنية ذهنية: كل آلة في المتناول",
      },
      {
        en: "Beams himself into a new body when killed",
        ar: "يبثّ نفسه إلى جسد جديد متى قُتل",
      },
      {
        en: "An always-on force field, and flight",
        ar: "حقل قوة دائم، وطيران",
      },
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
    id: "infinity-ultron",
    nameEn: "Infinity Ultron",
    nameAr: "ألترون اللانهاية",
    /* NOT an alias of "Ultron". TMDB credits What If's Ultron as plainly
       "Ultron", and that credit belongs to the record that is him BEFORE he
       takes the Stones — two records claiming one word would drag this one
       into Age of Ultron. He is placed by hand instead. */
    aliases: ["Infinity Ultron"],
    alsoIn: ["what-if-s1"],
    category: "villain",
    affiliation: [],
    universe: ["animation"],
    /* Ultron's mind in Vision's synthezoid body, which is the whole point of
       him: he took the Mind Stone by taking the body it was set in. */
    species: "Synthezoid",
    powers: [
      {
        en: "All six Infinity Stones at once",
        ar: "أحجار اللانهاية الستة معًا",
      },
      {
        en: "Bisected Thanos before he could move",
        ar: "شطر ثانوس قبل أن يتحرك",
      },
      {
        en: "One beam destroyed all of Asgard",
        ar: "شعاع واحد دمّر أسغارد كلها",
      },
      {
        en: "Warps reality, space and time at will",
        ar: "يلوي الواقع والمكان والزمان كما يشاء",
      },
      {
        en: "A vibranium body, and an AI that adapts",
        ar: "جسد من الفيبرانيوم، وذكاء يتكيّف",
      },
      {
        en: "Fought the Watcher across realities",
        ar: "قاتل المُراقب عبر الوقائع",
      },
    ],
    origin: {
      en: "In one universe Ultron won. He took Vision's body, and the Mind Stone set in it, then killed Thanos in the time it takes to turn around and collected the other five. Having finished his own reality he noticed the Watcher watching him, and went looking for the rest of the multiverse.",
      ar: "في كون واحد انتصر ألترون. أخذ جسد فيجن، وحجر العقل المثبّت فيه، ثم قتل ثانوس في زمن التفاتة وجمع الأحجار الخمسة الباقية. ولمّا فرغ من واقعه لمح المُراقب يرقبه، فمضى يبحث عن بقية المتعدد.",
    },
  },
  {
    id: "the-destroyer",
    nameEn: "The Destroyer",
    nameAr: "المُدمِّر",
    aliases: ["The Destroyer", "Destroyer"],
    /* A suit of armour with no actor, so no cast list carries it. Real and
       uncredited: it is the antagonist's weapon for the whole third act of
       Thor, and Hela smashes it in Odin's vault in Ragnarok. */
    alsoIn: ["thor", "thor-ragnarok"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Artifact",
    powers: [
      { en: "A disintegration beam from its face", ar: "شعاع تفتيت من وجهه" },
      {
        en: "Enchanted metal almost nothing marks",
        ar: "معدن مسحور لا يكاد يُخدش",
      },
      { en: "Adapts to whatever hit it last", ar: "يتكيف مع آخر ما ضربه" },
      { en: "Strength enough to level a town", ar: "قوة تكفي لتسوية بلدة" },
      { en: "Moves only when a king wills it", ar: "لا يتحرك إلا بإرادة ملك" },
      { en: "Nobody inside it to reason with", ar: "لا أحد بداخله ليُقنع" },
    ],
    origin: {
      en: "An empty suit of Asgardian armour that moves when the throne tells it to, built to guard a vault and used, once, to kill a brother. There is nothing in it: no pilot, no mind, no argument.",
      ar: "درع أسغاردي فارغ يتحرك متى أمره العرش، صُنع لحراسة خزانة واستُخدم مرة لقتل أخ. لا شيء بداخله: لا قائد ولا عقل ولا حجّة.",
    },
  },
  {
    id: "christine-palmer",
    nameEn: "Christine Palmer",
    nameAr: "كريستين بالمر",
    aliases: ["Christine Palmer", "Dr. Christine Palmer"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "One of the finest surgeons alive", ar: "من أمهر الجراحين أحياءً" },
      {
        en: "Keeps working while the room does not",
        ar: "تواصل العمل والغرفة لا تفعل",
      },
      {
        en: "Restarted his heart on a gurney",
        ar: "أعادت قلبه للنبض على نقالة",
      },
      { en: "No powers at all", ar: "بلا أي قدرات" },
    ],
    origin: {
      en: "The emergency surgeon who kept Stephen Strange alive twice: once on the table after the crash, and once afterwards, when the thing that needed saving was not his hands.",
      ar: "جرّاحة الطوارئ التي أبقت ستيفن سترينج حيًا مرتين: مرة على الطاولة بعد الحادث، ومرة بعدها حين لم يكن ما يحتاج الإنقاذ هو يديه.",
    },
  },
  {
    id: "morgan-stark",
    nameEn: "Morgan Stark",
    nameAr: "مورغان ستارك",
    aliases: ["Morgan Stark", "Morgan"],
    /* Credited in Endgame but absent from the cast list TMDB returns, which
       stops at forty-one names. */
    alsoIn: ["avengers-endgame"],
    category: "supporting",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "No powers whatsoever", ar: "بلا أي قدرات على الإطلاق" },
      { en: "Four years old", ar: "في الرابعة من عمرها" },
      { en: "The reason he would not do it", ar: "السبب الذي جعله يرفض" },
      { en: "And then the reason he did", ar: "ثم السبب الذي جعله يفعل" },
    ],
    origin: {
      en: "Tony Stark's daughter, born in the five years after the snap, and the whole of his argument against fixing it. He fixed it anyway, having worked out how to do both, and then could only do one.",
      ar: "ابنة توني ستارك، وُلدت في السنوات الخمس بعد الطقطقة، وهي كل حجته ضد إصلاح ما جرى. أصلحه على أي حال بعد أن اهتدى إلى طريقة للأمرين، ثم لم يقدر إلا على واحد.",
    },
  },
  {
    id: "killmonger",
    nameEn: "Killmonger",
    nameAr: "كيلمونجر",
    aliases: ["Killmonger", "Erik Killmonger", "N'Jadaka", "Erik Stevens"],
    /* ANTIVILLAIN, not villain. His grievance is correct and the film agrees with him: Wakanda did abandon the diaspora. What he does with that is the part he is opposed for. */
    category: "antivillain",
    affiliation: ["Wakandans", "Guardians of the Multiverse"],
    universe: ["mcu"],
    /* NOT plain Human. Took the herb too, and beat T'Challa with it. */
    species: "Enhanced human",
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
      {
        en: "Time travel, and timelines he makes himself",
        ar: "سفر عبر الزمن، وخطوط يصنعها بنفسه",
      },
      {
        en: "A field that shrugs off a nuclear strike",
        ar: "حقل يصدّ ضربة نووية",
      },
      {
        en: "Fortieth-century armour, and its blasts",
        ar: "درع من القرن الأربعين، وطلقاته",
      },
      {
        en: "Robot armies and a sword-shaped fortress",
        ar: "جيوش آلية وقلعة على هيئة سيف",
      },
      {
        en: "Dies, and wakes up in a new body",
        ar: "يموت فيستيقظ في جسد جديد",
      },
      {
        en: "Countless variants, all of them him",
        ar: "نسخ لا تُحصى، كلها هو",
      },
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
    aliases: ["Red Skull", "Johann Schmidt", "The Red Skull"],
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
    alsoIn: [
      "avengers-infinity-war",
      "avengers-endgame",
      "the-super-hero-squad-show",
    ],
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
    magicSchools: ["asgardian"],
    powers: [
      {
        en: "Goddess of death, and it is not a title",
        ar: "إلهة الموت، وليس لقبًا",
      },
      {
        en: "Draws power without limit from Asgard",
        ar: "تستمد من أسغارد بلا حد",
      },
      {
        en: "Summons blades faster than they can land",
        ar: "تستحضر النصال أسرع مما تصيب",
      },
      { en: "Shattered Mjolnir with one hand", ar: "حطّمت ميولنير بيد واحدة" },
      { en: "Takes a soul, and keeps it", ar: "تأخذ الروح وتحتفظ بها" },
      { en: "Immortal while Asgard stands", ar: "خالدة ما دامت أسغارد قائمة" },
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
      {
        en: "Stronger than the Hulk at his baseline",
        ar: "أقوى من هَلك في حالته الأساسية",
      },
      { en: "Twice the gamma Banner took", ar: "ضعف الغاما التي تلقاها بانر" },
      {
        en: "Never changes back, and never wanted to",
        ar: "لا يعود أبدًا، ولم يرد ذلك قط",
      },
      {
        en: "Near-total durability, and gills with it",
        ar: "صلابة شبه تامة، وخياشيم معها",
      },
      { en: "Heals from almost anything", ar: "يشفى من أي شيء تقريبًا" },
      {
        en: "Loses only when Banner gets angry enough",
        ar: "لا يُهزم إلا إذا غضب بانر كفاية",
      },
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
    /* NOT chaos. Chaos magic is the thing Agatha covets and cannot do — the
       entire plot of WandaVision is her working out that Wanda has it and she
       does not, then trying to take it. She is a centuries-old witch
       practising traditional dark witchcraft, which is a different craft
       rather than a lesser amount of the same one. */
    magicSchools: ["witchcraft"],
    powers: [
      {
        en: "Centuries of spells, all memorised",
        ar: "قرون من التعاويذ، محفوظة كلها",
      },
      {
        en: "Force fields fine enough to stop a virus",
        ar: "دروع دقيقة تكفي لوقف فيروس",
      },
      {
        en: "Telepathy and memory manipulation, en masse",
        ar: "تخاطر وتلاعب بالذاكرة، جماعيًا",
      },
      {
        en: "Drains her own coven to stay alive",
        ar: "تستنزف جماعتها لتبقى حية",
      },
      {
        en: "Witch sight, and dimensional manipulation",
        ar: "بصيرة ساحرة، وتلاعب بالأبعاد",
      },
      { en: "A familiar that becomes a panther", ar: "تابع يتحول إلى فهد" },
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
    /* ANTIVILLAIN, not villain. Xu Wenwu spends a thousand years as a warlord and then dismantles it for his wife. What drives him at the end is grief and a voice he thinks is hers. */
    category: "antivillain",
    affiliation: ["Ten Rings"],
    universe: ["mcu"],
    /* NOT an ordinary human. The Ten Rings keep Wenwu alive for a thousand years. Not ageing is a power. */
    species: "Enhanced human",
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
    /**
     * GALAN OF TAA IS THIS RECORD, not a second one. He was the mortal
     * scientist of the universe before this one and flew into its collapse; the
     * thing that came out is what he has been ever since. The corpus held both
     * as separate records joined by `variant`, which is the one thing that kind
     * must never mean — the schema says so in as many words, because Banner and
     * the Hulk, and Reynolds and the Void, are each ONE record with two names.
     *
     * The Surfer above genuinely is two records. The difference is the test:
     * Norrin and Shalla-Bal can stand in a room together, and Galan and
     * Galactus cannot.
     */
    aliases: ["Galactus", "Galan", "Galan of Taa"],
    /* ANTIVILLAIN, not villain. He is hunger with a shape. He must eat worlds to exist and has spared them when given a substitute, which is not what a villain does. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["fox", "mcu"],
    species: "Cosmic entity",
    powers: [
      {
        en: "Consumes worlds and stars to stay alive",
        ar: "يلتهم العوالم والنجوم ليبقى حيًا",
      },
      {
        en: "The Power Cosmic, at nearly no limit",
        ar: "القوة الكونية، بلا حدٍّ تقريبًا",
      },
      {
        en: "Older than this universe. He outlived one",
        ar: "أقدم من هذا الكون، وقد عاش بعد فناء آخر",
      },
      {
        en: "Transmutes matter, and alters his own size",
        ar: "يحوّل المادة، ويغيّر حجمه",
      },
      {
        en: "Grants a herald a piece of what he is",
        ar: "يمنح مبشّرًا جزءًا مما هو عليه",
      },
      {
        en: "Weak when starved, unstoppable when fed",
        ar: "ضعيف جائعًا، لا يُوقَف شبعان",
      },
    ],
    origin: {
      en: "Not a villain so much as a condition. He eats planets because that is what he is, and he arrives with someone sent ahead to find them. Before any of it he was Galan, a scientist of the universe that came before this one, who flew into its collapse to see what was there.",
      ar: "ليس شريرًا بقدر ما هو حالة. يلتهم الكواكب لأن هذا ما هو عليه، ويصل ومعه من أُرسل قبله ليجدها. وقبل ذلك كله كان غالان، عالِمًا من الكون الذي سبق هذا، طار إلى انهياره ليرى ما هناك.",
    },
    /* In the film as the cloud that eats the planet, with no actor credited
       because no actor played him. See `alsoIn` on the schema. */
    alsoIn: [
      "fantastic-four-rise-of-the-silver-surfer",
      "the-super-hero-squad-show",
    ],
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
      /* Three bullets for a dhampir: the strength, the daylight and the
         healing. Not the speed, the senses, the immunity to what kills
         everyone else in his line, or the fact that he is a master of every
         weapon he carries — which for a man who hunts vampires for a living
         is most of the job. */
      { en: "Vampire strength and speed", ar: "قوة وسرعة مصاص دماء" },
      { en: "Heals like the things he hunts", ar: "يشفى كما يشفى ما يصطاده" },
      { en: "Enhanced senses and tracking", ar: "حواس واقتفاء معززان" },
      {
        en: "Master of blades and firearms",
        ar: "سيد النصال والأسلحة النارية",
      },
      { en: "Poison and disease do nothing", ar: "السم والمرض لا يؤثران" },
      { en: "Walks in daylight", ar: "يمشي في وضح النهار" },
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
      {
        en: "Hellfire that burns the soul, not the body",
        ar: "نار جهنم تحرق الروح لا الجسد",
      },
      {
        en: "The Penance Stare ignores any durability",
        ar: "نظرة التكفير تتجاوز أي صلابة",
      },
      {
        en: "Took the throne of Hell from Mephisto",
        ar: "انتزع عرش الجحيم من مفيستو",
      },
      {
        en: "A chain that cuts through nearly anything",
        ar: "سلسلة تقطع كل شيء تقريبًا",
      },
      { en: "Cannot be destroyed, and comes back", ar: "لا يُدمَّر، ويعود" },
      {
        en: "Absorbs any fire without harm",
        ar: "يمتص أي نار دون أذى",
      },
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
      /* MY OWN REWRITE COST HER SEVENTEEN POINTS, because "Puts anyone to
         sleep" and "Feels what you feel" are phrases this vocabulary knows BY
         NAME, and I replaced them with better prose the scorer cannot read.
         Third time in two days. The check that catches it is diffing every
         score against what it was before the edit. */
      {
        en: "Feels what you feel, and changes it",
        ar: "تشعر بما تشعر، وتغيّره",
      },
      {
        en: "Telepathy, mind control, mass mindwipes",
        ar: "تخاطر وسيطرة ذهنية ومحو جماعي",
      },
      { en: "Puts anyone to sleep", ar: "تُنيم أي أحد" },
      {
        en: "Stuns Thor with one nerve strike",
        ar: "تصعق ثور بضربة عصبية واحدة",
      },
      {
        en: "Grows a new body out of vegetation",
        ar: "تُنبت جسدًا جديدًا من النبات",
      },
      {
        en: "Saw the whole mission before it began",
        ar: "رأت المهمة كلها قبل أن تبدأ",
      },
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
      {
        en: "The Odinforce: reality bends to it",
        ar: "قوة أودين: ينحني لها الواقع",
      },
      {
        en: "Cosmic energy, and he used it on Galactus",
        ar: "طاقة بمقياس كوني، استعملها على غالاكتوس",
      },
      {
        en: "Strength and durability past any Asgardian",
        ar: "قوة وصلابة تفوقان أي أسغاردي",
      },
      {
        en: "Raises the dead, and rewrites what is",
        ar: "يحيي الموتى ويعيد كتابة ما هو كائن",
      },
      { en: "Rules the nine realms", ar: "يحكم العوالم التسعة" },
      {
        en: "The Odinsleep, when it costs too much",
        ar: "سُبات أودين، متى كلّفه أكثر مما يحتمل",
      },
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
      {
        en: "Charges any object into a bomb",
        ar: "يشحن أي شيء فيصير قنبلة",
      },
      {
        en: "The bigger the object, the bigger the blast",
        ar: "كلما كبر الشيء كبر الانفجار",
      },
      {
        en: "Playing cards, mostly, and they explode",
        ar: "أوراق لعب غالبًا، وهي تنفجر",
      },
      {
        en: "A hypnotic charm that lowers your guard",
        ar: "سحر منوّم يخفض حذرك",
      },
      {
        en: "Agility and reflexes past a man's",
        ar: "رشاقة وردود فعل تفوق البشر",
      },
      {
        en: "A master thief, and a bo staff fighter",
        ar: "لص بارع، ومقاتل بالعصا",
      },
    ],
    origin: {
      en: "A thief from New Orleans who can turn anything he holds into a bomb, and who has never once been on a side for longer than it suited him.",
      ar: "لصّ من نيو أورلينز يحوّل ما يمسكه إلى قنبلة، ولم يبقَ يومًا في جانب أطول مما يناسبه.",
    },
    related: [{ id: "wolverine", kind: "ally" }],
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
    /* TWO BULLETS, AND ONE OF THEM WAS "Never misses" -- the same phrase Hawkeye scores 53 on. Bullseye scored 8. */
    powers: [
      {
        en: "Never misses. Not once, with anything",
        ar: "لا يخطئ أبدًا، ولا بأي شيء",
      },
      {
        en: "A paperclip, a card, a pencil, all lethal",
        ar: "مشبك ورق أو بطاقة أو قلم، كلها قاتلة",
      },
      {
        en: "Every object is a weapon in his hand",
        ar: "كل شيء في يده سلاح",
      },
      {
        en: "Perfect aim, and he calls it a mutation",
        ar: "تصويب تام، ويسميه طفرة",
      },
      {
        en: "Trained enough to hurt Daredevil",
        ar: "مدرب بما يكفي ليؤذي ديرديفل",
      },
      {
        en: "Kills for money, and for the pleasure",
        ar: "يقتل للمال، وللمتعة",
      },
    ],
    origin: {
      en: "A marksman who can kill with a paperclip and who has never been able to leave a target alone once he has seen it.",
      ar: "قنّاص يقتل بمشبك ورق، ولم يستطع يومًا أن يترك هدفًا بعد أن يراه.",
    },
    related: [{ id: "daredevil", kind: "enemy" }],
  },
  {
    id: "sif",
    nameEn: "Sif",
    nameAr: "سيف",
    aliases: ["Sif", "Lady Sif"],
    category: "supporting",
    affiliation: ["Asgard", "Gods"],
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
    related: [{ id: "thor", kind: "ally" }],
  },
  {
    id: "black-bolt",
    nameEn: "Black Bolt",
    nameAr: "بلاك بولت",
    aliases: ["Black Bolt", "Blackagar Boltagon"],
    category: "hero",
    affiliation: ["Inhumans", "Illuminati"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      /* Three bullets, one of them a limitation, for a man whose voice is
         written as planet-cracking. He ranked BELOW six symbiotes, whose
         defining vulnerability is sound. */
      { en: "A whisper levels a city", ar: "همسة تسوّي مدينة بالأرض" },
      { en: "A shout has cracked a planet", ar: "صرخة شقّت كوكبًا" },
      {
        en: "Harnesses electrons and particles",
        ar: "يسخّر الإلكترونات والجسيمات",
      },
      {
        en: "The Master Blow, all of it in one punch",
        ar: "الضربة الكبرى، كل قوته بلكمة",
      },
      { en: "Flight beyond escape velocity", ar: "طيران يتجاوز سرعة الإفلات" },
      { en: "Cannot speak", ar: "لا يستطيع الكلام" },
    ],
    origin: {
      en: "The king of a hidden people, whose voice is a weapon he has never been able to put down, so he does not use it at all.",
      ar: "ملك شعب خفي، صوته سلاح لم يستطع قط أن يضعه، فاختار ألّا يستعمله إطلاقًا.",
    },
    related: [{ id: "medusa", kind: "family" }],
  },
  {
    id: "medusa",
    nameEn: "Medusa",
    nameAr: "ميدوسا",
    aliases: ["Medusa", "Medusalith Amaquelin", "Madam Medusa"],
    category: "hero",
    affiliation: ["Inhumans"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      {
        en: "Prehensile hair, stronger than steel",
        ar: "شعر ممسك أقوى من الفولاذ",
      },
      { en: "Lifts a car with it", ar: "ترفع به سيارة" },
      { en: "Enhanced strength and durability", ar: "قوة وصلابة معززتان" },
      { en: "Queen of the Inhumans", ar: "ملكة الإنهيومانز" },
      { en: "Speaks for the king", ar: "تتكلم باسم الملك" },
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
    related: [{ id: "medusa", kind: "family" }],
  },
  {
    id: "emma-frost",
    nameEn: "Emma Frost",
    nameAr: "إيما فروست",
    aliases: ["White Queen", "Emma Frost", "The White Queen"],
    category: "antihero",
    /* THE HELLFIRE CLUB, not the Brotherhood. She is its White Queen, which is the whole of her, and the corpus already had the affiliation for it. */
    affiliation: ["Hellfire Club", "Hellions"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    /* TWO BULLETS -- "Telepathy" and "Diamond form" -- for an Omega telepath the sources rate against Xavier. She scored 63 and ranked 227th. */
    powers: [
      {
        en: "Telepathy that rivals Professor X",
        ar: "تخاطر ينافس بروفيسور إكس",
      },
      {
        en: "Mind control, illusions, psychic surgery",
        ar: "سيطرة عقول وأوهام وجراحة نفسية",
      },
      {
        en: "Organic diamond, and nothing hurts her",
        ar: "ألماس عضوي، ولا شيء يؤذيها",
      },
      {
        en: "In diamond, no telepath can touch her",
        ar: "في الألماس، لا يمسّها متخاطر",
      },
      {
        en: "Has bested Xavier, Exodus and Nate Grey",
        ar: "هزمت زافيير وإكسودس ونيت غراي",
      },
      {
        en: "Stops a heart, or hides a mutant from view",
        ar: "توقف قلبًا، أو تخفي متحولًا عن الأنظار",
      },
    ],
    origin: {
      en: "A telepath who can turn her skin to diamond, and who has been on every side of this at least once, always for herself.",
      ar: "قارئة أفكار تحوّل جلدها إلى ماس، وقفت في كل جانب من هذا مرة على الأقل، ودائمًا لنفسها.",
    },
    related: [{ id: "professor-x", kind: "enemy" }],
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
      {
        en: "Absorbs cosmic energy and stores it",
        ar: "يمتص الطاقة الكونية ويخزنها",
      },
      {
        en: "Discharges it as superheated plasma",
        ar: "يفرغها بلازما فائقة الحرارة",
      },
      {
        en: "Waves of it, from his hands and body",
        ar: "موجات منها، من يديه وجسده",
      },
      {
        en: "Modulates how much comes out",
        ar: "يتحكم بمقدار ما يخرج",
      },
      {
        en: "Immune to his own, and to Cyclops's",
        ar: "محصّن ضد طاقته وطاقة سايكلوبس",
      },
      {
        en: "A leader when the room needs one",
        ar: "قائد حين تحتاج الغرفة قائدًا",
      },
    ],
    origin: {
      en: "Cyclops's brother, with the same problem in a different direction: energy he absorbs constantly and has to put somewhere.",
      ar: "أخو سايكلوبس، بالمشكلة نفسها في اتجاه آخر: طاقة يمتصها بلا توقف وعليه أن يضعها في مكان ما.",
    },
    related: [{ id: "cyclops", kind: "family" }],
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
    /* ONE BULLET. The whole record was "Controls fire he did not make", which is his LIMIT written as his power. */
    powers: [
      {
        en: "Controls fire he did not make",
        ar: "يتحكم بنار لم يشعلها",
      },
      {
        en: "Shapes flame into birds and golems",
        ar: "يشكّل اللهب طيورًا وعمالقة",
      },
      {
        en: "His fire constructs can lift and carry",
        ar: "بناءاته النارية ترفع وتحمل",
      },
      {
        en: "Melts bullets in the air, softens steel",
        ar: "يذيب الرصاص في الهواء، ويليّن الفولاذ",
      },
      {
        en: "Any flame he holds slides off him",
        ar: "أي لهب يمسكه ينزلق عنه",
      },
      {
        en: "Cannot make fire. He carries throwers",
        ar: "لا يصنع النار، فيحمل قاذفات",
      },
    ],
    origin: {
      en: "He can shape any fire but cannot start one, which is a small enough gap to make him angry about it permanently.",
      ar: "يشكّل أي نار لكنه لا يشعلها، وهي فجوة صغيرة تكفي لتُبقيه غاضبًا منها دائمًا.",
    },
    related: [{ id: "magneto", kind: "ally" }],
  },
  {
    id: "juggernaut",
    nameEn: "Juggernaut",
    nameAr: "جاغرنوت",
    aliases: ["Juggernaut", "Cain Marko"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    /* NOT plain Human. Cyttorak's gem made him unstoppable. Whatever else he is, he has not been an ordinary man since he picked it up. */
    species: "Human mutate",
    powers: [
      /* Two bullets and 469th, for a man who has traded blows with Thor and
         the Hulk. The armour, the force field and the resistance to telepathy
         were all missing — and so was the fact that none of it is a mutation:
         Cyttorak is a god, and Cain is what a god does to a man who picks up
         his gem. */
      { en: "Unstoppable once moving", ar: "لا يوقفه شيء متى تحرك" },
      { en: "Enormous strength", ar: "قوة هائلة" },
      { en: "Near-total durability", ar: "صلابة شبه تامة" },
      { en: "A magical force field", ar: "درع سحري" },
      { en: "Resists telepathy", ar: "يقاوم التخاطر" },
      { en: "Powered by Cyttorak", ar: "قوته من سيتوراك" },
    ],
    origin: {
      en: "Charles Xavier's stepbrother, made unstoppable by something older than mutation and angry at him since childhood.",
      ar: "أخو تشارلز إكزافير بالتبنّي، جعله شيء أقدم من التحوّل لا يُوقَف، وهو غاضب منه منذ الطفولة.",
    },
    related: [{ id: "professor-x", kind: "family" }],
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
      {
        en: "Atomic bursts straight out of her body",
        ar: "انفجارات ذرية من جسدها مباشرة",
      },
      {
        en: "Detonations that level what is near",
        ar: "تفجيرات تسوّي ما حولها",
      },
      {
        en: "Rides the blast as propulsion",
        ar: "تركب الانفجار دفعًا",
      },
      {
        en: "Durable enough to survive her own",
        ar: "صلبة بما يكفي لتنجو من انفجارها",
      },
      {
        en: "In the comics, she dreamed the future",
        ar: "في القصص المصورة، كانت ترى المستقبل",
      },
      {
        en: "A precognitive telepath, before Genosha",
        ar: "متخاطرة تستشرف، قبل جينوشا",
      },
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
      {
        en: "Fireworks that go off like grenades",
        ar: "ألعاب نارية تنفجر كالقنابل",
      },
      {
        en: "Modulates them from a flare to a blast",
        ar: "يعدّلها من وميض إلى انفجار",
      },
      {
        en: "Plasmoids straight from her hands",
        ar: "كرات بلازما من يديها مباشرة",
      },
      {
        en: "A vampire now, with the strength of one",
        ar: "صارت مصاصة دماء، بقوتها",
      },
      {
        en: "Heals fast, and moves faster",
        ar: "تشفى سريعًا، وتتحرك أسرع",
      },
      {
        en: "An acrobat, and hard to pin down",
        ar: "بهلوانية، ويصعب الإمساك بها",
      },
    ],
    origin: {
      en: "A mall kid from California who throws fireworks out of her hands and was one of the first students of the modern school.",
      ar: "فتاة من مراكز التسوق في كاليفورنيا تقذف الألعاب النارية من يديها، وكانت من أوائل طلاب المدرسة الحديثة.",
    },
    related: [{ id: "storm", kind: "ally" }],
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
      {
        en: "Controls his own molecules entirely",
        ar: "يتحكم بجزيئاته تحكمًا تامًا",
      },
      {
        en: "Adapts to almost any threat at once",
        ar: "يتكيف مع أي تهديد تقريبًا فورًا",
      },
      { en: "Strength, invulnerability and healing", ar: "قوة ومناعة وشفاء" },
      {
        en: "Telepathy, telekinesis and technopathy",
        ar: "تخاطر وتحريك ذهني وتقنية ذهنية",
      },
      {
        en: "Steals and grants the powers of mutants",
        ar: "يسرق قدرات المتحولين ويمنحها",
      },
      { en: "Comes back stronger every time", ar: "يعود أقوى في كل مرة" },
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
    affiliation: ["Sinister Six"],
    universe: ["mcu", "sony"],
    species: "Human",
    powers: [
      {
        en: "Illusions a whole city believes",
        ar: "أوهام تصدقها مدينة بأكملها",
      },
      {
        en: "Drones that build what is not there",
        ar: "طائرات مسيّرة تبني ما ليس موجودًا",
      },
      { en: "Hallucinogenic gas, and a lot of it", ar: "غاز مهلوس، وكثير منه" },
      {
        en: "A master of stagecraft before crime",
        ar: "سيد فنون المسرح قبل الجريمة",
      },
      {
        en: "Fooled Spider-Man into fighting nothing",
        ar: "خدع سبايدرمان فقاتل لا شيء",
      },
      {
        en: "No powers at all under the helmet",
        ar: "بلا أي قدرات تحت الخوذة",
      },
    ],
    origin: {
      en: "A former effects engineer who worked out that a convincing enough illusion does not need any powers behind it.",
      ar: "مهندس مؤثرات سابق أدرك أن الوهم المقنع بما يكفي لا يحتاج قدرة خلفه.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "vulture",
    nameEn: "Vulture",
    nameAr: "فَلتشر",
    aliases: ["Vulture", "Adrian Toomes"],
    /* ANTIVILLAIN, not villain. A working man whose salvage contract is cancelled by Stark's cleanup company, who turns to crime to keep his crew employed and stops short of killing the boy dating his daughter. */
    category: "antivillain",
    affiliation: ["Sinister Six"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "A flight rig he built from salvage",
        ar: "جهاز طيران بناه من خردة",
      },
      {
        en: "Alien tech, and weapons made from it",
        ar: "تقنية فضائية، وأسلحة منها",
      },
      { en: "Talons that cut through armour", ar: "مخالب تقطع الدروع" },
      { en: "Strength the harness gives him", ar: "قوة يمنحها له الحزام" },
      { en: "Older than everyone he fights", ar: "أكبر سنًا من كل من يقاتلهم" },
      {
        en: "Drains the years out of other people",
        ar: "يمتص السنين من أجساد الآخرين",
      },
    ],
    origin: {
      en: "A salvage contractor pushed out of a city-sized clean-up job, who kept the alien technology and built wings out of it.",
      ar: "مقاول إزالة أنقاض أُقصي من عقد بحجم مدينة، فاحتفظ بالتقنية الفضائية وصنع منها جناحين.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "taskmaster",
    nameEn: "Taskmaster",
    nameAr: "تاسك ماستر",
    aliases: ["Taskmaster", "Antonia Dreykov"],
    /* ANTIVILLAIN. Antonia is a weapon her own father made out of his daughter. She is controlled rather than convinced. */
    category: "antivillain",
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
    related: [{ id: "black-widow", kind: "enemy" }],
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
      /* FIVE BULLETS AND FOUR OF THEM WERE NAMES. Marc Spector, Steven Grant,
         Jake Lockley and Mr. Knight are one fact about him, not four powers,
         and listing them took every slot the record had — so a man a god
         makes stronger scored sixteen and came 447th, behind the werewolf.
         The identities keep one line, which is all they ever needed. */
      { en: "The avatar of Khonshu", ar: "أفاتار خونشو" },
      { en: "Strength and durability from a god", ar: "قوة وصلابة من إله" },
      { en: "Heals what should have killed him", ar: "يشفى مما كان ليقتله" },
      { en: "Crescent blades and batons", ar: "نصال هلالية وهراوات" },
      { en: "Master hand-to-hand combatant", ar: "سيد القتال المتلاحم" },
      { en: "Four men sharing one body", ar: "أربعة رجال في جسد واحد" },
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
      {
        en: "A god whose power is how many believe",
        ar: "إله قوته بعدد من يؤمنون به",
      },
      {
        en: "Lends an avatar enough to fell Juggernaut",
        ar: "يمنح متجسّده ما يكفي لإسقاط الجاغرنوت",
      },
      {
        en: "Absorbs and stores other people's powers",
        ar: "يمتص قدرات الآخرين ويخزنها",
      },
      {
        en: "Commands Uru, the metal of the hammer",
        ar: "يأمر الأورو، معدن المطرقة",
      },
      {
        en: "Keeps his dead avatars from Death",
        ar: "يحفظ متجسّديه الموتى من الموت",
      },
      {
        en: "Touches every moon in the multiverse",
        ar: "يمسّ كل قمر في المتعدد",
      },
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
      /* THE GAMMA CHARACTERS ARE ALL FLATTENED BY THE PER-CLASS CAP: strength,
         durability and healing are one vocabulary class, capped at three
         hits, so She-Hulk scored 42 and the Abomination 62 no matter how many
         bullets they had. What separates them is what ELSE is true -- she
         keeps her mind, he never changes back -- so that is what the records
         say now. */
      {
        en: "Hulk-level strength, and her own mind",
        ar: "قوة بمستوى هَلك، وعقلها معها",
      },
      {
        en: "Stronger the angrier she gets, like him",
        ar: "تقوى مع غضبها، مثله",
      },
      {
        en: "Near-invulnerable, and heals from anything",
        ar: "شبه منيعة، وتشفى من أي شيء",
      },
      {
        en: "Seven feet of gamma, and it never wears off",
        ar: "سبعة أقدام من الغاما، لا تزول",
      },
      {
        en: "Traded blows with the Thing and won",
        ar: "بادلت الثينج الضربات وفازت",
      },
      {
        en: "A working lawyer the rest of the week",
        ar: "محامية عاملة بقية الأسبوع",
      },
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
    aliases: ["Namor", "Namor McKenzie", "Prince Namor"],
    category: "antihero",
    affiliation: ["X-Men", "Talokanil"],
    universe: ["mcu"],
    species: "Mutant hybrid",
    powers: [
      /* "Rules an ocean nation" was worth ninety-five on its own — `rules` and
         `ocean`, which this vocabulary prices at world scale — and my rewrite
         dropped both words while adding detail. Second time in this commit. */
      {
        en: "Rules an ocean, and everything in it",
        ar: "يحكم محيطًا وكل ما فيه",
      },
      { en: "Strength greater than any Atlantean", ar: "قوة تفوق أي أطلنطي" },
      {
        en: "And it grows the longer he is in water",
        ar: "وتزداد كلما طال بقاؤه في الماء",
      },
      { en: "Flies on the wings at his ankles", ar: "يطير بجناحي كاحليه" },
      {
        en: "Bio-electric discharge, like an eel",
        ar: "تفريغ كهربائي حيوي، كالأنقليس",
      },
      { en: "Weakens the longer he is dry", ar: "يضعف كلما طال جفافه" },
    ],
    origin: {
      en: "The ruler of a nation that has been hidden under the sea for centuries, and who considers the surface a recurring problem.",
      ar: "حاكم أمة اختبأت تحت البحر قرونًا، ويعدّ اليابسة مشكلة تتكرر.",
    },
    related: [{ id: "black-panther", kind: "enemy" }],
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
      {
        en: "Telepathy and telekinesis, both high",
        ar: "تخاطر وتحريك ذهني، وكلاهما عالٍ",
      },
      {
        en: "Most of it holds a virus in check",
        ar: "أكثره يكبح فيروسًا",
      },
      {
        en: "Telekinetic force fields, flight, blasts",
        ar: "حقول قوة ذهنية وطيران وقذائف",
      },
      {
        en: "A cybernetic arm, and a glowing eye",
        ar: "ذراع آلية، وعين متوهجة",
      },
      {
        en: "A soldier and strategist from the future",
        ar: "جندي واستراتيجي من المستقبل",
      },
      {
        en: "Travels in time, and brings the arsenal",
        ar: "يسافر عبر الزمن، ويجلب الترسانة",
      },
    ],
    origin: {
      en: "A soldier from a future that went badly, who came back to stop it and is not interested in discussing the cost.",
      ar: "جندي من مستقبل ساءت أحواله، عاد ليمنعه، ولا يعنيه النقاش في الثمن.",
    },
    related: [{ id: "deadpool", kind: "ally" }],
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
    /* ONE BULLET, and it was "Good luck". */
    powers: [
      {
        en: "Luck bends around her, without her asking",
        ar: "الحظ ينحني حولها دون أن تطلب",
      },
      {
        en: "A gun jams, a shot finds the switch",
        ar: "سلاح يعلق، ورصاصة تصيب المفتاح",
      },
      {
        en: "Bio-electric pulses guide her reflexes",
        ar: "نبضات حيوية توجّه ردود فعلها",
      },
      {
        en: "She dodges what she never saw",
        ar: "تراوغ ما لم تره قط",
      },
      {
        en: "An expert markswoman, and a linguist",
        ar: "رامية خبيرة، ولغوية",
      },
      {
        en: "Bred by a government weapons programme",
        ar: "نتاج برنامج أسلحة حكومي",
      },
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
    affiliation: ["X-Men", "Weapon X"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      {
        en: "A healing factor like his",
        ar: "عامل شفاء مثل عامله",
      },
      {
        en: "Two adamantium claws in each hand",
        ar: "مخلبا أدامانتيوم في كل يد",
      },
      {
        en: "And one in each foot",
        ar: "وواحد في كل قدم",
      },
      {
        en: "Speed, reflexes and senses to match",
        ar: "سرعة وردود فعل وحواس توازيها",
      },
      {
        en: "Raised from birth as an assassin",
        ar: "رُبّيت منذ الولادة قاتلة",
      },
      {
        en: "A trigger scent sends her berserk",
        ar: "رائحة محفّزة تصيبها بالهياج",
      },
    ],
    origin: {
      en: "A girl made in a laboratory from someone else's genes, raised as a weapon, and very good at the only thing she was taught.",
      ar: "فتاة صُنعت في مختبر من جينات شخص آخر، رُبّيت سلاحًا، وبارعة جدًا في الشيء الوحيد الذي علّموه لها.",
    },
    related: [{ id: "wolverine", kind: "family" }],
  },
  {
    id: "ego",
    nameEn: "Ego",
    nameAr: "إيغو",
    aliases: ["Ego"],
    category: "villain",
    affiliation: ["Celestials", "Gods"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      { en: "An entire living planet", ar: "كوكب حي بأكمله" },
      { en: "The mass and gravity of a world", ar: "كتلة عالم وجاذبيته" },
      {
        en: "Vast psionic power, and matter control",
        ar: "قوة ذهنية هائلة وتحكم بالمادة",
      },
      {
        en: "Grows antibodies and tendrils to fight",
        ar: "يُنبت أجسامًا مضادة وأذرعًا للقتال",
      },
      { en: "Moves himself through space", ar: "يحرّك نفسه عبر الفضاء" },
      {
        en: "Accelerates evolution on other worlds",
        ar: "يسرّع التطور في عوالم أخرى",
      },
    ],
    origin: {
      en: "A being old enough to have grown a planet around himself, who has spent a very long time looking for company on his own terms.",
      ar: "كائن قديم بما يكفي ليُنمي كوكبًا حول نفسه، أمضى زمنًا طويلًا يبحث عن رفقة بشروطه هو.",
    },
    related: [{ id: "star-lord", kind: "family" }],
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
    related: [{ id: "ant-man", kind: "enemy" }],
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
    related: [{ id: "ant-man", kind: "enemy" }],
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
      {
        en: "Hundreds of minds, each with its own power",
        ar: "مئات العقول، لكل منها قدرته",
      },
      {
        en: "Telepathy, telekinesis, fire, time, reality",
        ar: "تخاطر وتحريك ونار وزمن وواقع",
      },
      {
        en: "Rewrote a timeline into the Age of Apocalypse",
        ar: "أعاد كتابة خط زمني إلى عصر أبوكاليبس",
      },
      {
        en: "New personas keep arriving with new powers",
        ar: "تظهر شخصيات جديدة بقدرات جديدة",
      },
      { en: "No known upper limit", ar: "لا حدّ أعلى معروف" },
      {
        en: "Whichever one is in front, decides",
        ar: "من يتصدّر منها هو من يقرر",
      },
    ],
    origin: {
      en: "The most powerful mutant in the corpus, whose diagnosis and whose power have been confused with each other his whole life.",
      ar: "أقوى متحوّل في هذا السجل، وقد التبس تشخيصه بقدرته طوال حياته.",
    },
    related: [{ id: "professor-x", kind: "family" }],
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
      {
        en: "A sonic scream that shatters stone",
        ar: "صرخة صوتية تحطم الحجر",
      },
      {
        en: "Concussive blasts that stun a room",
        ar: "قذائف صادمة تصعق غرفة",
      },
      {
        en: "Rides his own sound waves in flight",
        ar: "يمتطي موجاته الصوتية طيرانًا",
      },
      {
        en: "Modulates pitch into a hypnotic lull",
        ar: "يعدّل النبرة إلى تنويم",
      },
      {
        en: "Hearing sharp enough to place a whisper",
        ar: "سمع يحدد موضع همسة",
      },
      {
        en: "An Interpol man before any of it",
        ar: "كان رجل إنتربول قبل ذلك كله",
      },
    ],
    origin: {
      en: "An Irish former agent whose scream can shatter concrete, recruited out of a facility that was studying him.",
      ar: "عميل إيرلندي سابق تحطّم صرخته الخرسانة، جُنِّد من منشأة كانت تدرسه.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
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
      {
        en: "Opens portals across any distance",
        ar: "تفتح بوابات عبر أي مسافة",
      },
      {
        en: "Throws javelins that teleport what they hit",
        ar: "ترمي رماحًا تنقل ما تصيبه",
      },
      {
        en: "Bisects a target by sending half away",
        ar: "تشطر هدفًا بإرسال نصفه بعيدًا",
      },
      {
        en: "Moves a whole team at once",
        ar: "تنقل فريقًا كاملًا دفعة واحدة",
      },
      {
        en: "Portals between dimensions, not just places",
        ar: "بوابات بين الأبعاد، لا الأماكن فقط",
      },
      {
        en: "She fights by where she puts them",
        ar: "تقاتل بمواضع بواباتها",
      },
    ],
    origin: {
      en: "She opens doorways between places, which in a war of attrition is the difference between a last stand and a retreat.",
      ar: "تفتح أبوابًا بين الأماكن، وفي حرب استنزاف هذا هو الفرق بين موقف أخير وانسحاب.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
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
      {
        en: "Teleports across a continent",
        ar: "ينتقل عبر قارة",
      },
      {
        en: "And between dimensions, which is rarer",
        ar: "وبين الأبعاد، وذاك أندر",
      },
      {
        en: "Unaging since nine thousand years back",
        ar: "لا يشيخ منذ تسعة آلاف عام",
      },
      {
        en: "Shapeshifts, and a prehensile tail",
        ar: "يبدّل شكله، وله ذيل ماسك",
      },
      {
        en: "A swordsman, and a manipulator",
        ar: "سيّاف، ومتلاعب",
      },
      {
        en: "Fathered a whole race of teleporters",
        ar: "أنجب جنسًا كاملًا من المنتقلين",
      },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      {
        en: "Leaps twenty-five feet straight up",
        ar: "يقفز خمسة وعشرين قدمًا إلى أعلى",
      },
      {
        en: "A tongue thirty feet long, and strong",
        ar: "لسان بطول ثلاثين قدمًا، وقوي",
      },
      {
        en: "Paralysing venom, and acid saliva",
        ar: "سمّ مشلّ، ولعاب حمضي",
      },
      {
        en: "Adhesive resin, so he sticks to walls",
        ar: "صمغ لاصق، فيلتصق بالجدران",
      },
      {
        en: "Regrew his own tongue once",
        ar: "أنبت لسانه من جديد مرة",
      },
      {
        en: "Night vision, and lungs like a bellows",
        ar: "رؤية ليلية، ورئتان كالمنفاخ",
      },
    ],
    origin: {
      en: "A brawler who leaps further than anything his size should, and has spent his life being somebody's muscle.",
      ar: "مشاكس يقفز أبعد مما ينبغي لحجمه، وأمضى حياته عضلاتٍ لأحدهم.",
    },
    related: [{ id: "magneto", kind: "ally" }],
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
      {
        en: "Controls magnetism, like her father",
        ar: "تتحكم بالمغناطيسية، مثل أبيها",
      },
      {
        en: "Hurls metal, and flies on the fields",
        ar: "تقذف المعدن، وتطير على الحقول",
      },
      {
        en: "Magnetic force fields, and EM blasts",
        ar: "حقول قوة مغناطيسية وقذائف كهرومغناطيسية",
      },
      {
        en: "Senses magnetic and electrical fields",
        ar: "تستشعر الحقول المغناطيسية والكهربائية",
      },
      {
        en: "Absorbs negative emotion, in some years",
        ar: "تمتص المشاعر السلبية، في بعض الحقب",
      },
      {
        en: "Below Magneto, and not by very much",
        ar: "دون ماغنيتو، وليس بفارق كبير",
      },
    ],
    origin: {
      en: "She has her father's power and has spent her life refusing to be the argument he wants to use it for.",
      ar: "لديها قدرة أبيها، وأمضت حياتها ترفض أن تكون الحجة التي يريد استخدامها من أجلها.",
    },
    related: [{ id: "magneto", kind: "family" }],
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
    /* TWO BULLETS for the Black King, whose whole gimmick is that hitting him is how you lose. */
    powers: [
      {
        en: "Absorbs the kinetic energy of any blow",
        ar: "يمتص الطاقة الحركية لأي ضربة",
      },
      {
        en: "The harder you hit him, the stronger he gets",
        ar: "كلما ضربته أشد ازداد قوة",
      },
      {
        en: "No clear ceiling while you keep hitting",
        ar: "لا سقف واضح ما دمت تضرب",
      },
      {
        en: "Strength and stamina from what he took",
        ar: "قوة وتحمّل مما امتصه",
      },
      {
        en: "Ages slowly, and has for a long time",
        ar: "يشيخ ببطء، ومنذ زمن طويل",
      },
      {
        en: "Psionics and cold go straight past it",
        ar: "النفسيات والبرد تتجاوزها تمامًا",
      },
    ],
    origin: {
      en: "A man who gets stronger the harder you hit him, which makes him very hard to argue with and very easy to underestimate once.",
      ar: "رجل يزداد قوة كلما اشتدّ ضربك له، فيصعب جدًا جداله، ويسهل الاستهانة به مرة واحدة.",
    },
    related: [{ id: "magneto", kind: "enemy" }],
  },
  {
    id: "scorpion",
    nameEn: "Scorpion",
    nameAr: "سكوربيون",
    aliases: ["Scorpion", "Mac Gargan"],
    category: "villain",
    affiliation: ["Sinister Six"],
    universe: ["mcu", "sony"],
    /* NOT plain Human. Surgically bonded to the rig and chemically altered with it. The tail is equipment; the strength is not. */
    species: "Mutate",
    powers: [
      { en: "A tail that crushes what it hits", ar: "ذيل يسحق ما يصيبه" },
      { en: "Strength beyond what bit Peter", ar: "قوة تفوق ما لدغ بيتر" },
      { en: "Climbs a wall as well as he does", ar: "يتسلق الجدار كما يفعل" },
      { en: "Acid sprayed from the tail", ar: "حمض يُرش من الذيل" },
      {
        en: "The rig was never meant to come off",
        ar: "الجهاز لم يُصمم ليُخلع",
      },
    ],
    origin: {
      en: "A hired thug with a mechanical tail and a long memory for the person who put him inside.",
      ar: "بلطجي مأجور بذيل آلي وذاكرة طويلة تجاه من أدخله السجن.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "talos",
    nameEn: "Talos",
    nameAr: "تالوس",
    aliases: ["Talos", "Talos / Keller"],
    category: "hero",
    affiliation: ["S.H.I.E.L.D.", "Skrull"],
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
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic entity",
    powers: [
      {
        en: "Eats time periods and the realities beside them",
        ar: "يلتهم حقبًا والوقائع المجاورة",
      },
      {
        en: "Absorbs time-travellers and grows",
        ar: "يمتص المسافرين عبر الزمن فينمو",
      },
      {
        en: "Blocks time travel through any era it holds",
        ar: "يسدّ السفر الزمني في أي حقبة يشغلها",
      },
      {
        en: "Exists across divergent timelines at once",
        ar: "يوجد عبر خطوط زمنية متشعبة معًا",
      },
      {
        en: "Conventional weapons cannot kill it",
        ar: "لا تقتله الأسلحة المعتادة",
      },
      {
        en: "The first thing to escape the timestream",
        ar: "أول ما أفلت من مجرى الزمن",
      },
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
    /* ANTIVILLAIN. The Skrulls are refugees whose world was eaten. He fights for a people with nowhere to go. */
    category: "antivillain",
    affiliation: ["Skrull"],
    universe: ["mcu"],
    species: "Skrull",
    powers: [
      {
        en: "Every Fantastic Four power at once",
        ar: "كل قدرات الأربعة الرائعين معًا",
      },
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
      {
        en: "Reaches anywhere from anywhere",
        ar: "يصل إلى أي مكان من أي مكان",
      },
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
    /* The other end of the ladder, and see the note on the One Above All:
       the theory that every cameo is one being watching has a comic behind
       it. This corpus ranks him 686th and that being 1st. */
    related: [{ id: "the-one-above-all", kind: "host" }],
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
    /* NOT `Human`. He took a genuine blood transfusion from his grandfather and
       carries the super-soldier serum, the same as Rogers and Barnes, both of
       whom are filed as Enhanced human. The wrong word put a man who outran a
       helicopter in "humans who turn up anyway, no powers at all". */
    species: "Enhanced human",
    powers: [
      {
        en: "The super-soldier serum, by transfusion",
        ar: "مصل الجندي الخارق، بنقل دم",
      },
      { en: "Outran a helicopter", ar: "سبق مروحية" },
      {
        en: "Leaps a hundred feet, and lands fine",
        ar: "يقفز مئة قدم ويهبط سالمًا",
      },
      {
        en: "Skin that shrugs off a hail of darts",
        ar: "جلد يصدّ وابلًا من السهام",
      },
      {
        en: "Survived an explosion that should have killed",
        ar: "نجا من انفجار كان ينبغي أن يقتله",
      },
      { en: "His grandfather's shield, and his name", ar: "درع جده، واسمه" },
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
      {
        en: "Astrophysicist",
        ar: "عالم فيزياء فلكية",
      },
      {
        en: "First to model the Bifrost",
        ar: "أول من نمذج البايفروست",
      },
      {
        en: "Built the device that opened it",
        ar: "بنى الجهاز الذي فتحه",
      },
      {
        en: "Worked out the Convergence",
        ar: "حلّ لغز التقارب",
      },
      {
        en: "Survived Loki's sceptre, badly",
        ar: "نجا من صولجان لوكي، بصعوبة",
      },
      {
        en: "The one who explains the sky",
        ar: "من يشرح السماء",
      },
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
      {
        en: "Astrophysics, eventually a doctorate",
        ar: "فيزياء فلكية، ثم دكتوراه",
      },
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
      {
        en: "CIA, Joint Counter Terrorist",
        ar: "سي آي إيه، مكافحة إرهاب مشتركة",
      },
      {
        en: "Flies anything, a Wakandan ship included",
        ar: "يقود أي شيء، حتى سفينة واكاندية",
      },
      {
        en: "Took a bullet for somebody else",
        ar: "تلقى رصاصة عن غيره",
      },
      {
        en: "A marksman, and trained for it",
        ar: "رامٍ ماهر، ومدرب على ذلك",
      },
      {
        en: "Knows every agency's secrets",
        ar: "يعرف أسرار كل جهاز",
      },
      {
        en: "Out of his depth, and useful anyway",
        ar: "فوق طاقته، ومفيد رغم ذلك",
      },
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
    /* ANTIVILLAIN. Martin Li runs a homeless shelter with one face and a crime syndicate with the other, and the shelter is not a cover. */
    category: "antivillain",
    affiliation: [],
    universe: ["sony"],
    species: "Enhanced human",
    /* NOT a magic school. Martin Li channels Darkforce, which is a
       dimension of physics that Cloak and Dagger also touch, not a craft
       anybody studies. */
    powers: [
      /* Scored ZERO. "Darkforce and Lightforce" is two extradimensional
         energies and the patterns knew neither word. */
      {
        en: "Darkforce and Lightforce energy",
        ar: "طاقتا الدارك فورس واللايت فورس",
      },
      { en: "Corrupts a man by touching him", ar: "يفسد الرجل بلمسة" },
      { en: "Heals with the other hand", ar: "يشفي باليد الأخرى" },
      { en: "Enhanced strength and durability", ar: "قوة وصلابة معززتان" },
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
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["legacy"],
    species: "Demon",
    magicSchools: ["infernal"],
    powers: [
      /* "Makes bargains / Reshapes souls" — two bullets, 77th, for the devil
         of the Marvel universe, who has fought the Silver Surfer, Thor and
         Thanos and is effectively without limit inside his own realm. */
      {
        en: "Rules a hell dimension entirely",
        ar: "يحكم بعدًا جهنميًا بالكامل",
      },
      {
        en: "Near-limitless power in his realm",
        ar: "قوة شبه لا محدودة في مملكته",
      },
      {
        en: "Reshapes souls, and buys them",
        ar: "يعيد تشكيل الأرواح، ويشتريها",
      },
      {
        en: "Fought the Silver Surfer and Thor",
        ar: "قاتل السيلفر سيرفر وثور",
      },
      { en: "Illusions no mortal sees through", ar: "أوهام لا يخترقها بشر" },
      { en: "Makes bargains", ar: "يعقد الصفقات" },
    ],
    origin: {
      en: "Something very old that trades in what people will give up, and has never once needed to break a deal to win one.",
      ar: "شيء قديم جدًا يتاجر بما يتنازل عنه الناس، ولم يحتج يومًا إلى نقض صفقة ليربحها.",
    },
    related: [{ id: "ghost-rider", kind: "enemy" }],
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
    related: [{ id: "star-lord", kind: "ally" }],
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
    aliases: ["Valkyrie", "Brunnhilde", "King Valkyrie"],
    category: "hero",
    affiliation: ["Asgard", "Avengers", "Revengers", "Gods"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      {
        en: "Asgardian strength, and heals like one",
        ar: "قوة أسغاردية، وشفاء مثلها",
      },
      {
        en: "Asgard's finest with a blade",
        ar: "الأمهر في أسغارد بالسيف",
      },
      {
        en: "Death-sight: she sees it coming for you",
        ar: "بصيرة الموت: ترى قدومه إليك",
      },
      {
        en: "A touch sends a spirit onward",
        ar: "لمسة تسيّر الروح إلى ما بعد",
      },
      {
        en: "Dragonfang, an enchanted sword",
        ar: "درغونفانغ، سيف مسحور",
      },
      {
        en: "Flies on a winged steed",
        ar: "تطير على جواد مجنّح",
      },
    ],
    origin: {
      en: "The last of an elite guard that was wiped out in a single engagement, found centuries later on a scrapyard planet drinking her way through the memory.",
      ar: "آخر من بقي من حرس نخبة أُبيد في معركة واحدة، وُجدت بعد قرون على كوكب خردة تحاول أن تُغرق الذكرى بالشراب.",
    },
    related: [{ id: "thor", kind: "ally" }],
  },
  {
    id: "okoye",
    nameEn: "Okoye",
    nameAr: "أوكويي",
    aliases: ["Okoye"],
    category: "hero",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "General of the Dora Milaje",
        ar: "جنرال الدورا ميلاجي",
      },
      {
        en: "A vibranium spear that cuts anything",
        ar: "رمح فيبرانيوم يقطع أي شيء",
      },
      {
        en: "The best warrior Wakanda fields",
        ar: "أفضل محاربة تدفع بها واكاندا",
      },
      {
        en: "Beat the Black Panther in the ring",
        ar: "هزمت البلاك بانثر في الحلبة",
      },
      {
        en: "Commands an army, and fights in it",
        ar: "تقود جيشًا، وتقاتل فيه",
      },
      {
        en: "Loyal to the throne before the person",
        ar: "ولاؤها للعرش قبل الشخص",
      },
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
    magicSchools: ["eldritch"],
    powers: [
      {
        en: "Nearly every form of magic there is",
        ar: "كل صنوف السحر تقريبًا",
      },
      { en: "Stops, loops and reverses time", ar: "يوقف الزمن ويلفّه ويعكسه" },
      {
        en: "Warps reality, and bends its laws",
        ar: "يلوي الواقع ويثني قوانينه",
      },
      {
        en: "Telepathy, illusion and soul manipulation",
        ar: "تخاطر وأوهام وتلاعب بالأرواح",
      },
      { en: "Two centuries of practice at it", ar: "قرنان من التمرّس على ذلك" },
      {
        en: "Merged with Eternity after dying",
        ar: "اندمج مع الأبدية بعد موته",
      },
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
    affiliation: ["Asgard", "Gods"],
    universe: ["mcu"],
    species: "Asgardian",
    magicSchools: ["asgardian"],
    powers: [
      /* SHE TAUGHT LOKI, which is the fact everything else about her follows
         from, and it was not on the record — so the gatekeeper outranked the
         sorceress who trained the god of mischief. */
      { en: "Taught Loki his magic", ar: "علّمت لوكي سحره" },
      { en: "Illusion magic", ar: "سحر الأوهام" },
      { en: "Seer", ar: "بصيرة" },
      { en: "Asgardian strength", ar: "قوة أسغاردية" },
      { en: "Trained fighter", ar: "مقاتلة مدرّبة" },
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
    affiliation: ["Asgard", "Gods"],
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
    related: [{ id: "thor", kind: "ally" }],
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
      {
        en: "Head of security",
        ar: "رئيس الأمن",
      },
      {
        en: "A boxer, and he still trains",
        ar: "ملاكم، وما زال يتدرب",
      },
      {
        en: "Drove Tony everywhere that mattered",
        ar: "أوصل توني إلى كل مكان مهم",
      },
      {
        en: "Took a bomb and lived",
        ar: "تلقى انفجارًا ونجا",
      },
      {
        en: "Minds Peter, badly and sincerely",
        ar: "يعتني ببيتر، بسوء وإخلاص",
      },
      {
        en: "The one who stays",
        ar: "الذي يبقى",
      },
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
      {
        en: "Founded S.H.I.E.L.D.",
        ar: "أسست شيلد",
      },
      {
        en: "A marksman, and trained in combat",
        ar: "رامية ماهرة، ومدربة على القتال",
      },
      {
        en: "Out-fought men who outweighed her",
        ar: "تغلبت على رجال يفوقونها وزنًا",
      },
      {
        en: "Ran operations nobody else would",
        ar: "أدارت عمليات لم يجرؤ عليها أحد",
      },
      {
        en: "SSR before that, in the field",
        ar: "وكانت في إس إس آر قبلها، ميدانيًا",
      },
      {
        en: "The plan is usually hers",
        ar: "الخطة عادة خطتها",
      },
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
    /* NOT an ordinary human. She lifts Mjolnir and becomes the Mighty Thor. */
    species: "Enhanced human",
    powers: [
      /* "Astrophysicist / Wields Mjolnir" — two bullets, 504th, for a woman
         who IS Thor when she lifts it. The hammer was the whole record and
         the record never said what the hammer does. */
      { en: "Mjolnir, and worthy of it", ar: "ميولنير، وهي جديرة بها" },
      { en: "Strength and flight of a god", ar: "قوة إله وطيرانه" },
      { en: "Control of lightning and storms", ar: "تحكّم بالبرق والعواصف" },
      {
        en: "Nearly invulnerable while transformed",
        ar: "شبه منيعة وهي متحوّلة",
      },
      { en: "The cancer returns each time", ar: "السرطان يعود في كل مرة" },
      {
        en: "An astrophysicist, otherwise",
        ar: "عالمة فيزياء فلكية فيما عدا ذلك",
      },
    ],
    origin: {
      en: "The astrophysicist who found a man falling out of the sky in New Mexico and was the only person in the desert treating it as data.",
      ar: "عالمة الفيزياء الفلكية التي وجدت رجلًا يسقط من السماء في نيومكسيكو، وكانت الوحيدة في الصحراء التي تعاملت مع الأمر بوصفه بيانات.",
    },
    related: [{ id: "thor", kind: "family" }],
  },
  {
    id: "aunt-may",
    nameEn: "May Parker",
    nameAr: "ماي باركر",
    aliases: ["Aunt May", "May Parker", "Aunt May Parker"],
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
    related: [{ id: "spider-man", kind: "family" }],
  },
  {
    id: "miek",
    nameEn: "Miek",
    nameAr: "ميك",
    aliases: ["Miek"],
    category: "hero",
    /* NOT the Revengers, whatever a roster list will tell you. The name is
       coined in one exchange — Valkyrie asks "I want to be on the team, has it
       got a name?" and Thor answers "the Revengers" — and the team is the four
       of them: Thor, Hulk, Loki and Valkyrie. Korg and Miek lead the gladiator
       revolt and leave on the same ship, which is not the same as being on the
       team. Removed after Rashid caught it. */
    /* Not Asgard either, and for the same reason. Sakaaran, insectivorid, and
       on that ship because he was in the arena. */
    affiliation: [],
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
    /* NOT the Revengers, whatever a roster list will tell you. The name is
       coined in one exchange — Valkyrie asks "I want to be on the team, has it
       got a name?" and Thor answers "the Revengers" — and the team is the four
       of them: Thor, Hulk, Loki and Valkyrie. Korg and Miek lead the gladiator
       revolt and leave on the same ship, which is not the same as being on the
       team. Removed after Rashid caught it. */
    /* NOT ASGARD. He is a Kronan from Sakaar who left on the same ship, and
       filing him here was my doing: he lost the Revengers and I gave him this
       rather than leave the field empty. An empty field was the honest answer.
       His tier comes from his species either way. */
    affiliation: [],
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
    related: [{ id: "thor", kind: "ally" }],
  },
  {
    id: "ramonda",
    nameEn: "Ramonda",
    nameAr: "راموندا",
    aliases: ["Ramonda", "Queen Ramonda"],
    category: "supporting",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Queen mother, and queen after",
        ar: "الملكة الأم، ثم الملكة",
      },
      {
        en: "Held Wakanda together twice",
        ar: "حفظت واكاندا مرتين",
      },
      {
        en: "Faced down a council and a navy",
        ar: "واجهت مجلسًا وأسطولًا",
      },
      {
        en: "Refused Namor to his face",
        ar: "رفضت نامور في وجهه",
      },
      {
        en: "Raised two of its best",
        ar: "ربّت اثنين من خيرة أبنائها",
      },
      {
        en: "Died getting her daughter out",
        ar: "ماتت وهي تخرج ابنتها",
      },
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
    /* S.H.I.E.L.D., which he actually was: the 1989 flashback is Hank
       resigning from it. An empty affiliation was dropping him into the
       bottom tier with the reporters and aunts. */
    affiliation: ["S.H.I.E.L.D."],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Discovered the particle that does it",
        ar: "اكتشف الجسيم الذي يفعلها",
      },
      {
        en: "Wore the suit before either of them",
        ar: "ارتدى البذلة قبلهما",
      },
      {
        en: "Commands insects with a helmet",
        ar: "يأمر الحشرات بخوذة",
      },
      {
        en: "A biochemist of the front rank",
        ar: "كيميائي حيوي من الطراز الأول",
      },
      {
        en: "Built a laboratory into a briefcase",
        ar: "بنى مختبرًا داخل حقيبة",
      },
      {
        en: "Built Ultron, which is the other thing",
        ar: "وبنى ألترون، وتلك المسألة الأخرى",
      },
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
      {
        en: "Changes size",
        ar: "تغيّر حجمها",
      },
      {
        en: "Thirty years in the quantum realm",
        ar: "ثلاثون عامًا في عالم الكم",
      },
      {
        en: "Quantum energy, and healing with it",
        ar: "طاقة كمّية، وشفاء بها",
      },
      {
        en: "Speaks mind to mind, across distance",
        ar: "تتحدث من عقل إلى عقل عبر المسافات",
      },
      {
        en: "Took another person's body, once",
        ar: "تلبّست جسد شخص آخر، مرة",
      },
      {
        en: "Wings and stingers like her daughter",
        ar: "أجنحة ولسعات مثل ابنتها",
      },
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
      /* And the 1966 series credits him with the rank he actually held. */
      "General Thaddeus Ross",
    ],
    category: "antivillain",
    affiliation: ["Hulks"],
    universe: ["mcu", "animation"],
    /* NOT Human. He becomes the Red Hulk. Whatever he is between transformations, ordinary is not it. */
    species: "Enhanced human",
    powers: [
      /* "Commands the hunt / Secretary of State / Becomes the Red Hulk / Keeps
         his own mind" — four bullets, three of them a CV. The heat is what
         makes him a different character from Banner and it was not there, nor
         was the strength, the durability or the healing. */
      { en: "Strength that grows with his rage", ar: "قوة تنمو مع غضبه" },
      {
        en: "Absorbs radiation and burns with it",
        ar: "يمتص الإشعاع ويحترق به",
      },
      { en: "Near-total durability", ar: "صلابة شبه تامة" },
      { en: "Heals from almost anything", ar: "يشفى من أي شيء تقريبًا" },
      { en: "Keeps his military mind", ar: "يحتفظ بعقله العسكري" },
      { en: "Overheats, and weakens for it", ar: "يفرط سخونة فيضعف" },
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
    id: "maestro",
    nameEn: "Maestro",
    nameAr: "المايسترو",
    aliases: ["Maestro"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Banner's mind in the Hulk's body", ar: "عقل بانر في جسد هَلك" },
      {
        en: "Ten times stronger than Professor Hulk",
        ar: "أقوى عشر مرات من هَلك البروفيسور",
      },
      {
        en: "Decades of absorbed nuclear fallout",
        ar: "عقود من الإشعاع النووي الممتص",
      },
      { en: "Heals so well he cannot really die", ar: "يشفى حتى لا يكاد يموت" },
      {
        en: "Never loses control of the change",
        ar: "لا يفقد السيطرة على التحول أبدًا",
      },
      { en: "Rules what is left of the world", ar: "يحكم ما تبقى من العالم" },
    ],
    origin: {
      en: "The Hulk a hundred years after the bombs, swollen on the radiation that killed everyone else and gone cruel in the quiet afterwards. He kept Banner's intelligence and lost the part of Banner that used to argue with it.",
      ar: "هَلك بعد مئة عام من القنابل، تضخّم على الإشعاع الذي قتل كل من سواه، وقسا في السكون الذي تلا. احتفظ بذكاء بانر وفقد الجزء الذي كان يجادله منه.",
    },
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
      {
        en: "Deputy director of S.H.I.E.L.D.",
        ar: "نائبة مدير شيلد",
      },
      {
        en: "A marksman, and field-trained",
        ar: "رامية ماهرة، ومدربة ميدانيًا",
      },
      {
        en: "Ran the helicarrier under fire",
        ar: "أدارت حاملة الطائرات تحت النار",
      },
      {
        en: "Fought in New York with a rifle",
        ar: "قاتلت في نيويورك ببندقية",
      },
      {
        en: "Runs an operation while it collapses",
        ar: "تدير عملية وهي تنهار",
      },
      {
        en: "Fury's second, and his check",
        ar: "ذراع فيوري اليمنى، وكابحه",
      },
    ],
    origin: {
      en: "The deputy who actually runs the agency day to day, and the one person its director tells the truth to first.",
      ar: "النائبة التي تدير الوكالة فعليًا يومًا بيوم، والشخص الوحيد الذي يصارحه مديرها أولًا.",
    },
    related: [{ id: "nick-fury", kind: "ally" }],
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
      {
        en: "The Yaka Arrow, steered by a whistle",
        ar: "سهم الياكا، يوجّهه بصفير",
      },
      {
        en: "Devastating once he can hit the note",
        ar: "مدمّر متى أصاب النغمة",
      },
      { en: "Expert starship pilot", ar: "طيّار سفن فضائية بارع" },
      {
        en: "A hardened Ravager, and nothing more",
        ar: "رافاجر متمرّس، لا أكثر",
      },
      { en: "No powers at all", ar: "بلا أي قدرات" },
    ],
    origin: {
      en: "A Ravager who stayed when the rest left, and inherited a weapon he was nowhere near ready to use.",
      ar: "أحد الرافيجرز بقي حين رحل الباقون، فورث سلاحًا لم يكن مستعدًا لاستخدامه إطلاقًا.",
    },
    related: [{ id: "rocket", kind: "ally" }],
  },
  {
    id: "mbaku",
    nameEn: "M'Baku",
    nameAr: "إمباكو",
    aliases: ["M'Baku"],
    category: "antihero",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Leads the Jabari",
        ar: "يقود الجباري",
      },
      {
        en: "Enormous strength, for a man",
        ar: "قوة هائلة، لرجل",
      },
      {
        en: "Nearly beat T'Challa in the ring",
        ar: "كاد يهزم تشالا في الحلبة",
      },
      {
        en: "A club, and the reach to use it",
        ar: "هراوة، وذراع تبلغ بها",
      },
      {
        en: "Fights a Black Panther without a suit",
        ar: "يقاتل بلاك بانثر بلا بذلة",
      },
      {
        en: "Commands an army in the mountains",
        ar: "يقود جيشًا في الجبال",
      },
    ],
    origin: {
      en: "The leader of the mountain tribe that walked away from Wakanda's throne generations ago and has been loudly unimpressed ever since.",
      ar: "زعيم قبيلة الجبل التي انفصلت عن عرش واكاندا قبل أجيال، وظل معلنًا عدم إعجابه منذ ذلك الحين.",
    },
    related: [{ id: "black-panther", kind: "ally" }],
  },
  {
    id: "ebony-maw",
    nameEn: "Ebony Maw",
    nameAr: "إيبوني ماو",
    aliases: ["Ebony Maw"],
    category: "villain",
    affiliation: ["Black Order"],
    universe: ["mcu"],
    species: "Alien",
    powers: [
      /* THE BLACK ORDER WERE FILED AS `Titan`, which is Thanos's homeworld and
         not their species — four different aliens who work for one man. Fixing
         that dropped all four into tier 7, where the gloss actually describes
         them, and exposed what the wrong species had been hiding: two-bullet
         records. Ebony Maw had "Telekinesis / Persuasion" and scored 14. */
      {
        en: "Takes a mind with his voice alone",
        ar: "يستولي على العقل بصوته وحده",
      },
      { en: "Telekinesis that lifts a building", ar: "تحريك ذهني يرفع مبنى" },
      {
        en: "Tore Doctor Strange out of his sanctum",
        ar: "انتزع دكتور سترينج من معبده",
      },
      { en: "The cleverest of the four", ar: "أذكى الأربعة" },
      { en: "And the weakest of them, physically", ar: "وأضعفهم جسديًا" },
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
    id: "supergiant",
    nameEn: "Supergiant",
    nameAr: "سوبرجاينت",
    aliases: ["Supergiant"],
    category: "villain",
    affiliation: ["Black Order"],
    universe: ["mcu"],
    /* Alien, like the rest of the Order and unlike what the corpus used to
       say: Titan is Thanos's homeworld, not the species of the people who
       work for him. */
    species: "Alien",
    powers: [
      { en: "Possesses any mind she reaches", ar: "تتلبّس أي عقل تبلغه" },
      { en: "Devours the intellect she takes", ar: "تلتهم العقل الذي تأخذه" },
      {
        en: "Turns the strongest minds on their own",
        ar: "تقلب أقوى العقول على أصحابها",
      },
      {
        en: "Controls matter as well as minds",
        ar: "تتحكم بالمادة كما بالعقول",
      },
      {
        en: "A mental vampire, and unstable with it",
        ar: "مصاصة عقول، وغير مستقرة معها",
      },
      {
        en: "No strength to speak of, without a host",
        ar: "لا قوة تُذكر لها بلا حامل",
      },
    ],
    origin: {
      en: "The fifth of the Black Order, a mental parasite who wears other people's minds until there is nothing left of them to use. She was drawn for Infinity War and cut before shooting, and most of what she does was handed to Ebony Maw, which is why the film's four can feel like five.",
      ar: "خامسة النظام الأسود، طفيلية ذهنية ترتدي عقول الآخرين حتى لا يبقى فيها ما يُستعمل. رُسمت لأجل حرب اللانهاية وحُذفت قبل التصوير، وأُسند معظم ما تفعله إلى إيبوني ماو، ولهذا قد يبدو رباعي الفيلم خماسيًا.",
    },
  },
  {
    id: "proxima-midnight",
    nameEn: "Proxima Midnight",
    nameAr: "بروكسيما ميدنايت",
    aliases: ["Proxima Midnight"],
    category: "villain",
    affiliation: ["Black Order"],
    universe: ["mcu"],
    species: "Alien",
    powers: [
      { en: "A spear forged from a dying star", ar: "رمح صيغ من نجم يحتضر" },
      {
        en: "It never misses, and the wound is fatal",
        ar: "لا يخطئ، والجرح قاتل",
      },
      {
        en: "Superhuman strength, speed and durability",
        ar: "قوة وسرعة وصلابة خارقة",
      },
      {
        en: "The finest fighter of the four",
        ar: "أمهر المقاتلين بين الأربعة",
      },
      { en: "Corvus Glaive's wife", ar: "زوجة كورفوس غليف" },
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
    species: "Alien",
    powers: [
      { en: "A blade that cuts anything at all", ar: "نصل يقطع أي شيء كان" },
      {
        en: "Cannot die while the blade is whole",
        ar: "لا يموت ما دام النصل سليمًا",
      },
      { en: "Comes back every time it is", ar: "يعود في كل مرة يبقى فيها" },
      { en: "Superhuman strength and speed", ar: "قوة وسرعة خارقتان" },
      { en: "Thanos's second, and the cruellest", ar: "ساعد ثانوس، وأقساهم" },
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
    species: "Alien",
    powers: [
      {
        en: "The strongest of the Black Order",
        ar: "أقوى أفراد النظام الأسود",
      },
      {
        en: "Skin that shrugs off almost anything",
        ar: "جلد يصدّ كل شيء تقريبًا",
      },
      {
        en: "A hammer on a chain, and a blade arm",
        ar: "مطرقة بسلسلة وذراع نصلية",
      },
      { en: "Enormous strength and durability", ar: "قوة وصلابة هائلتان" },
      {
        en: "Needed a Hulkbuster to put down",
        ar: "لزم درع هَلك باستر لإسقاطه",
      },
    ],
    origin: {
      en: "The Black Order's largest member, brought along for the parts of a conquest that do not require a conversation.",
      ar: "أضخم أعضاء النظام الأسود، يُصطحب لأجزاء الغزو التي لا تحتاج إلى حوار.",
    },
    related: [{ id: "thanos", kind: "ally" }],
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
    related: [{ id: "thor", kind: "ally" }],
  },
  {
    id: "the-collector",
    nameEn: "The Collector",
    nameAr: "الجامع",
    aliases: ["The Collector", "Taneleer Tivan"],
    category: "villain",
    affiliation: ["Elders of the Universe"],
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
    related: [{ id: "grandmaster", kind: "family" }],
  },
  {
    id: "grandmaster",
    nameEn: "The Grandmaster",
    nameAr: "الغراند ماستر",
    aliases: ["Grandmaster", "The Grandmaster", "En Dwi Gast"],
    category: "villain",
    affiliation: ["Elders of the Universe"],
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
      {
        en: "Engineer and financier",
        ar: "مهندس وممول",
      },
      {
        en: "Built the vita-ray chamber",
        ar: "بنى حجرة أشعة الحياة",
      },
      {
        en: "Founded S.H.I.E.L.D. with Peggy",
        ar: "أسس شيلد مع بيغي",
      },
      {
        en: "Found what vibranium could do first",
        ar: "اكتشف ما يفعله الفيبرانيوم أولًا",
      },
      {
        en: "Designed weapons for a world war",
        ar: "صمم أسلحة لحرب عالمية",
      },
      {
        en: "A pilot, and reckless with it",
        ar: "طيار، ومتهور به",
      },
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
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Dora Milaje, and among the best",
        ar: "دورا ميلاجي، ومن الأفضل",
      },
      {
        en: "A vibranium spear, used well",
        ar: "رمح فيبرانيوم، تحسن استعماله",
      },
      {
        en: "Trained to guard a king",
        ar: "مدربة على حراسة ملك",
      },
      {
        en: "Fights the Winter Soldier to a stop",
        ar: "توقف جندي الشتاء بالقتال",
      },
      {
        en: "Broke with the throne on principle",
        ar: "خرجت على العرش لأجل مبدأ",
      },
      {
        en: "Leads the Midnight Angels",
        ar: "تقود ملائكة منتصف الليل",
      },
    ],
    origin: {
      en: "One of the Dora Milaje, and the one most willing to say out loud when the throne is wrong.",
      ar: "إحدى الدورا ميلاجي، وأكثرهن استعدادًا لتقول بصوت عالٍ إن العرش مخطئ.",
    },
    related: [{ id: "okoye", kind: "ally" }],
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
      {
        en: "Omnipotence, omniscience, omnipresence",
        ar: "قدرة وعلم وحضور مطلق",
      },
      { en: "Author of everything", ar: "مؤلف كل شيء" },
      {
        en: "Created and sustains all existence",
        ar: "خلق الوجود كله ويُمسكه",
      },
      {
        en: "Can undo or restore anything at will",
        ar: "يمحو أو يعيد أي شيء بمشيئته",
      },
      { en: "Acts through the Living Tribunal", ar: "يعمل عبر المحكمة الحيّة" },
      {
        en: "Has turned up as a man at a drawing board",
        ar: "ظهر رجلًا أمام لوح رسم",
      },
    ],
    origin: {
      en: "The top of the Marvel hierarchy, and the only figure in it with no equal and no opposite. Every other power here answers to it, including the ones that answer to nobody else.",
      ar: "قمة التسلسل في عالم مارفل، والوحيد فيه بلا نظير ولا نقيض. كل قوة أخرى هنا تخضع له، بما فيها تلك التي لا تخضع لأحد سواه.",
    },
    related: [
      { id: "the-living-tribunal", kind: "ally" },
      { id: "the-one-below-all", kind: "enemy" },
      /**
       * RANK 1 AND RANK 686 ARE THE SAME BEING, if you believe the comic that
       * says so. In Fantastic Four #511 Reed Richards and the Thing go to meet
       * God and find him at a drawing board, drawn as Kirby with Lee beside
       * him. Part 1 records it plainly: "has manifested in humble forms
       * (notably as a Stan Lee / Jack Kirby-like figure)."
       *
       * `host` and not `variant`, on this file's own distinction: variant
       * would say Stan Lee IS the One Above All in another universe, and the
       * claim is the other one -- a being speaking through a human shape, the
       * same arrangement as Khonshu and Moon Knight.
       *
       * Two records rather than one because they pass the test this corpus
       * uses for Galan and Galactus: Stan Lee and the thing at the drawing
       * board are in the panel together.
       */
      { id: "stan-lee", kind: "host" },
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
      /* THIRTY-SEVEN OF THE TOP HUNDRED still had three bullets or fewer when
         Rashid asked whether the dossiers had been used. They had been, for
         sixty-four; these are the rest. */
      {
        en: "Nullifies all six Infinity Gems at once",
        ar: "يبطل أحجار اللانهاية الستة دفعة",
      },
      {
        en: "Three faces: equity, necessity, vengeance",
        ar: "ثلاثة وجوه: العدل والضرورة والانتقام",
      },
      {
        en: "Warps every reality at the same time",
        ar: "يلوي كل واقع في آنٍ واحد",
      },
      {
        en: "Authority over Eternity, Death and Galactus",
        ar: "سلطة على الأبدية والموت وغالاكتوس",
      },
      { en: "Erases a being from the record", ar: "يمحو كائنًا من السجل" },
      { en: "Judges whole universes", ar: "يحاكم أكوانًا بأسرها" },
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
      { en: "Is the universe, and is awake", ar: "هو الكون، وهو مستيقظ" },
      {
        en: "Commands its matter, energy and time",
        ar: "يأمر مادته وطاقته وزمنه",
      },
      { en: "Near-omnipotent, near-omniscient", ar: "شبه كلي القدرة والعلم" },
      { en: "Reality on any scale", ar: "الواقع بأي مقياس" },
      { en: "Answers only to the Tribunal", ar: "لا يحاسبه إلا المحكمة" },
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
      { en: "Embodies all of space", ar: "يجسّد المكان كله" },
      { en: "Commands everything within it", ar: "يأمر كل ما فيه" },
      { en: "Near-omnipotent, near-omniscient", ar: "شبه كلي القدرة والعلم" },
      { en: "Powers Quasar's Quantum Bands", ar: "يمدّ أساور كوازار الكمّية" },
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
      { en: "Embodies all ending", ar: "تجسّد كل نهاية" },
      { en: "Near-omnipotent, near-omniscient", ar: "شبه كلية القدرة والعلم" },
      {
        en: "Warps reality, matter, energy and time",
        ar: "تلوي الواقع والمادة والطاقة والزمن",
      },
      {
        en: "Necromancy, and the gift of dying",
        ar: "استحضار الموتى، وهبة الموت",
      },
      { en: "Cursed Thanos with immortality", ar: "لعنت ثانوس بالخلود" },
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
    /* ANTIVILLAIN. Nothingness, embodied. It is the end that everything arrives at rather than something that hates. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Erases existence, and nullifies it", ar: "يمحو الوجود ويبطله" },
      { en: "The embodiment of nothing at all", ar: "تجسيد العدم المطلق" },
      {
        en: "The Ultimate Nullifier sends souls to him",
        ar: "المُبطل الأقصى يرسل الأرواح إليه",
      },
      {
        en: "Chooses to be untouchable by the living",
        ar: "يختار ألا يمسّه الأحياء",
      },
      {
        en: "Acts through the Chaos King and Maelstrom",
        ar: "يعمل عبر ملك الفوضى ومايلستروم",
      },
      { en: "Older than the multiverse", ar: "أقدم من المتعدد" },
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
    /* ANTIVILLAIN. The dark counterpart of the supreme being, which is a role in the structure rather than a choice. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      /* Two bullets for the only being the sources place above the Living
         Tribunal, who beside it is "literally but a fraction". */
      {
        en: "The One Above All's own dark half",
        ar: "النصف المظلم من الأعلى فوق الجميع",
      },
      {
        en: "Equal to it, and one being with it",
        ar: "مساوٍ له، وهما كيان واحد",
      },
      {
        en: "Unmakes anything, and denies death itself",
        ar: "يفكّك أي شيء، ويمنع الموت نفسه",
      },
      { en: "Killed everything that lived, once", ar: "قتل كل حيّ ذات مرة" },
      { en: "Grows stronger as reality decays", ar: "يقوى كلما تحلّل الواقع" },
      {
        en: "Acts through gamma, and through the Hulk",
        ar: "يعمل عبر الغاما، وعبر الهالك",
      },
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
    /* ANTIVILLAIN. Curious rather than cruel: a being from outside who could not understand what it was doing to the people it experimented on. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    species: "Abstract entity",
    powers: [
      { en: "Reality warping without effort", ar: "لَيّ الواقع بلا جهد" },
      {
        en: "Built Battleworld out of pieces of others",
        ar: "بنى عالم المعركة من شظايا عوالم",
      },
      {
        en: "Destroyed and made galaxies to see how",
        ar: "دمّر مجرات وصنعها ليرى كيف",
      },
      { en: "Grants anyone whatever they want", ar: "يمنح أي أحد ما يريد" },
      {
        en: "Shapeshifts, teleports, resurrects",
        ar: "يتشكّل وينتقل ويحيي الموتى",
      },
      { en: "Naive about what existence is for", ar: "ساذج بشأن غاية الوجود" },
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
      /* Two bullets, both perception, for a being who once hid the ENTIRE
         EARTH from Galactus. The perception discount is right and it was
         being applied to a record that listed nothing else. */
      {
        en: "Hid the whole Earth from Galactus",
        ar: "أخفى الأرض كلها عن غالاكتوس",
      },
      {
        en: "Cosmic energy blasts and force fields",
        ar: "طلقات طاقة كونية ودروع قوة",
      },
      { en: "Telepathy that reaches any mind", ar: "تخاطر يبلغ أي عقل" },
      {
        en: "Teleports and travels through time",
        ar: "ينتقل آنيًا ويسافر عبر الزمن",
      },
      { en: "Sees every timeline", ar: "يرى كل خط زمني" },
      { en: "Sworn never to interfere", ar: "أقسم ألا يتدخل" },
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
    id: "the-watchers",
    nameEn: "The Watchers",
    nameAr: "المُراقبون",
    aliases: ["The Watchers"],
    /* No cast list carries a race. They are named and seen in What If, where
       Uatu narrates on their behalf and answers to them. */
    alsoIn: ["what-if-s1"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["animation"],
    species: "Watcher",
    powers: [
      {
        en: "Together, a match for the Celestials",
        ar: "مجتمعين، ندٌّ للسماويين",
      },
      {
        en: "One of the oldest races in existence",
        ar: "من أقدم الأجناس في الوجود",
      },
      { en: "See every event in every reality", ar: "يرون كل حدث في كل واقع" },
      {
        en: "Cosmic energy on a scale nobody measures",
        ar: "طاقة كونية بمقياس لا يقيسه أحد",
      },
      {
        en: "Sworn, all of them, never to act",
        ar: "أقسموا جميعًا ألا يتدخلوا",
      },
      { en: "And they punish the ones who do", ar: "ويعاقبون من يفعل" },
    ],
    origin: {
      en: "A race older than almost anything, who decided long ago that knowing everything and doing nothing was the only safe arrangement, after an early attempt to help ended a civilisation. Uatu is the one assigned to Earth, and the one who keeps breaking the rule.",
      ar: "جنس أقدم من كل شيء تقريبًا، قرر منذ زمن بعيد أن معرفة كل شيء وعدم فعل شيء هي الترتيب الآمن الوحيد، بعد محاولة مبكرة للمساعدة أنهت حضارة. أواتو هو المكلّف بالأرض، وهو من يكسر القاعدة دائمًا.",
    },
  },
  {
    id: "molecule-man",
    nameEn: "Molecule Man",
    nameAr: "رجل الجزيئات",
    aliases: ["Molecule Man", "Owen Reece"],
    /* ANTIVILLAIN. A frightened man handed the power to unmake matter, who spends most of his existence trying not to. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["legacy"],
    /* NOT plain Human. A lab technician the accident rewrote: he controls all
       matter and has held a multiverse together. The body is human and nothing
       else about him is, which is exactly what Mutate is for. */
    species: "Mutate",
    powers: [
      { en: "Total control of every molecule", ar: "تحكم تام بكل جزيء" },
      {
        en: "Rebuilt a destroyed multiverse in moments",
        ar: "أعاد بناء متعدد مدمَّر في لحظات",
      },
      {
        en: "Edits the base code of reality",
        ar: "يعدّل شفرة الواقع الأساسية",
      },
      {
        en: "Took the whole Beyonder race's power",
        ar: "أخذ قوة جنس البيونديرز كله",
      },
      { en: "Survives the loss of his own body", ar: "ينجو من فقد جسده" },
      { en: "A fragile mind, and it has been used", ar: "عقل هش، وقد استُغل" },
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
      {
        en: "The Power Primordial, near Galactus",
        ar: "القوة البدئية، قرب غالاكتوس",
      },
      { en: "Faster than anything else alive", ar: "أسرع من أي حيّ آخر" },
      {
        en: "Cosmic energy for any effect at all",
        ar: "طاقة كونية لأي أثر كان",
      },
      { en: "Precognition and cosmic senses", ar: "استبصار وحواس كونية" },
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
    affiliation: ["Symbiotes", "Cosmic entities", "Gods"],
    universe: ["sony", "legacy"],
    species: "Symbiote god",
    powers: [
      {
        en: "Made the symbiotes, and commands them",
        ar: "صنع السيمبيوتس ويأمرها",
      },
      {
        en: "All-Black, a sword that kills gods",
        ar: "أول-بلاك، سيف يقتل الآلهة",
      },
      {
        en: "Decapitated a Celestial at the dawn",
        ar: "قطع رأس سماوي عند الفجر",
      },
      {
        en: "Manipulates the living abyss itself",
        ar: "يتحكم بالهاوية الحية نفسها",
      },
      {
        en: "Mind control, illusions, and shapeshifting",
        ar: "سيطرة على العقول وأوهام وتبدّل شكل",
      },
      {
        en: "Comes back every time, and cannot be ended",
        ar: "يعود في كل مرة، ولا يمكن إنهاؤه",
      },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "villain",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["mcu", "legacy"],
    species: "Demon",
    magicSchools: ["dark-dimension"],
    powers: [
      {
        en: "Near-omnipotent in the Dark Dimension",
        ar: "شبه كلي القدرة في البعد المظلم",
      },
      {
        en: "The Flames of the Faltine, and living fire",
        ar: "لهب الفالتين، ونار حية",
      },
      {
        en: "Turned his own parent into dead matter",
        ar: "حوّل والده إلى مادة ميتة",
      },
      { en: "Banishes anyone to anywhere", ar: "ينفي أي أحد إلى أي مكان" },
      {
        en: "Grants power to demons and to men",
        ar: "يمنح القوة للشياطين والبشر",
      },
      {
        en: "Weaker outside the realms bound to him",
        ar: "أضعف خارج العوالم المرتبطة به",
      },
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
    /* ANTIVILLAIN, not villain. A Celestial doing what Celestials do. He weighs Earth honestly and, when shown what grew on it, lets it live. */
    category: "antivillain",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Seeds worlds with life", ar: "يبذر الحياة في العوالم" },
      { en: "Judges a planet's fate", ar: "يحكم على مصير كوكب" },
      { en: "Built the Eternals", ar: "صنع الأزليين" },
      { en: "Judges many worlds at once", ar: "يحاكم عوالم كثيرة دفعة واحدة" },
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
      { en: "Beat Arishem in single combat", ar: "هزم أريشِم في نزال فردي" },
      { en: "Feared even by Galactus", ar: "يخشاه حتى غالاكتوس" },
      {
        en: "The Watcher could not perceive him",
        ar: "لم يستطع المُراقب إدراكه",
      },
      { en: "Reality, matter and energy", ar: "الواقع والمادة والطاقة" },
      { en: "Broadcast dreams while sealed away", ar: "بثّ أحلامه وهو محبوس" },
      { en: "A world grew around him", ar: "نما حوله عالم" },
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
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Wielded the Power Stone", ar: "حمل حجر القوة" },
      { en: "Erased a world with a touch", ar: "محا عالمًا بلمسة" },
      { en: "Searches out life on a world", ar: "يتقصى الحياة في عالم" },
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
  /**
   * THE REST OF THE HOST — named in the comics, never filmed.
   *
   * Arishem, Eson and Tiamut above are here because Eternals put them on
   * screen. These fourteen are not: they are the Host as the comics name it,
   * each with one job — gather, measure, analyse, calculate, test, judge,
   * execute. Added on request as reference rather than as anything watchable,
   * so their appearance lists are empty by design and not by fault.
   */
  {
    id: "exitar",
    nameEn: "Exitar the Executioner",
    nameAr: "إكزيتار المنفّذ",
    aliases: ["Exitar", "Exitar the Executioner"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Twenty thousand feet, not two", ar: "عشرون ألف قدم، لا ألفان" },
      { en: "Burns a whole world clean", ar: "يحرق عالمًا بأسره تطهيرًا" },
      { en: "Or culls it and remakes it", ar: "أو ينقّيه ويعيد صنعه" },
      { en: "Carries out the sentence", ar: "ينفّذ الحكم" },
    ],
    origin: {
      en: "The Celestial sent once judgement has already been passed, who arrives at a world's size and sterilises it. He is not there to weigh anything; the weighing was Arishem's job.",
      ar: "السماوي الذي يُرسَل بعد صدور الحكم، فيصل بحجم الكوكب ويطهّره. لا يأتي ليزن شيئًا، فالوزن كان مهمة أريشيم.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "jemiah",
    nameEn: "Jemiah the Analyzer",
    nameAr: "جميا المحلّل",
    aliases: ["Jemiah", "Jemiah the Analyzer"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Analyses living matter", ar: "يحلل المادة الحية" },
      { en: "Reads a species' potential", ar: "يقرأ إمكان النوع" },
      { en: "Reports to the Judge", ar: "يرفع تقريره للقاضي" },
    ],
    origin: {
      en: "The Celestial who takes what the Gatherer collects and works out what it could become. Every verdict passed on a world begins as one of his findings.",
      ar: "السماوي الذي يأخذ ما يجمعه الجامع ويستخلص ما يمكن أن يصير إليه. كل حكم يصدر على عالم يبدأ نتيجةً من نتائجه.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "nezarr",
    nameEn: "Nezarr the Calculator",
    nameAr: "نزار الحاسب",
    aliases: ["Nezarr", "Nezarr the Calculator"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Calculates every probable future", ar: "يحسب كل مستقبل محتمل" },
      {
        en: "Illusions that put men in comas",
        ar: "أوهام تُدخل الرجال في غيبوبة",
      },
      { en: "Regrew a severed arm at once", ar: "أنبت ذراعًا مقطوعة فورًا" },
    ],
    origin: {
      en: "The Celestial who turns the analysis into a number. Whether a planet is worth keeping is, at the end of the process, an arithmetic question, and he is the one who answers it.",
      ar: "السماوي الذي يحوّل التحليل إلى رقم. فاستحقاق كوكب للبقاء يغدو في نهاية الأمر مسألة حساب، وهو من يجيب عنها.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "gammenon",
    nameEn: "Gammenon the Gatherer",
    nameAr: "جامينون الجامع",
    aliases: ["Gammenon", "Gammenon the Gatherer"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Collects living specimens", ar: "يجمع العينات الحية" },
      { en: "Takes whole populations", ar: "يأخذ شعوبًا بأكملها" },
      { en: "Gathered the first Deviants", ar: "جمع أول المنحرفين" },
    ],
    origin: {
      en: "The Celestial who goes down to a world and takes samples of everything alive on it, so the others have something to study. To the people taken, he is an abduction with no explanation.",
      ar: "السماوي الذي يهبط إلى عالم فيأخذ عيّنات من كل حيٍّ فيه ليدرسها الآخرون. أما المأخوذون فهو عندهم اختطاف بلا تفسير.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "hargen",
    nameEn: "Hargen the Measurer",
    nameAr: "هارغن القيّاس",
    aliases: ["Hargen", "Hargen the Measurer"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Measures what a world is", ar: "يقيس ما يكونه العالم" },
      { en: "Records every dimension", ar: "يسجّل كل بعد" },
      { en: "Misses nothing", ar: "لا يفوته شيء" },
    ],
    origin: {
      en: "The Celestial who records a planet exactly as it stands before anything is done to it. His measurements are the record against which every later change is judged.",
      ar: "السماوي الذي يسجّل الكوكب كما هو تمامًا قبل أن يُفعل به شيء. وقياساته هي السجل الذي يُقاس عليه كل تغيّر لاحق.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "oneg",
    nameEn: "Oneg the Prober",
    nameAr: "أونيغ السابر",
    aliases: ["Oneg", "Oneg the Prober"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Probes a world's deep past", ar: "يسبر ماضي العالم السحيق" },
      {
        en: "Engineered the gene that makes mutants",
        ar: "هندس الجين الذي يصنع المتحولين",
      },
      { en: "Works below the surface", ar: "يعمل تحت السطح" },
    ],
    origin: {
      en: "The Celestial who reaches into a world's oldest layers and changes what is buried there, so that what grows on it later grows the way the Host intends.",
      ar: "السماوي الذي يبلغ أقدم طبقات العالم فيبدّل ما دُفن فيها، حتى ينمو ما ينمو عليه لاحقًا على النحو الذي يريده الحشد.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "ziran",
    nameEn: "Ziran the Tester",
    nameAr: "زيران المختبِر",
    aliases: ["Ziran", "Ziran the Tester"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Tests what a species can bear", ar: "يختبر ما يحتمله النوع" },
      { en: "Rewrites living things", ar: "يعيد كتابة الكائنات الحية" },
      { en: "Mutated the first Deviants", ar: "طوّر أول المنحرفين" },
    ],
    origin: {
      en: "The Celestial who applies pressure to a species to find out what it can be pushed into becoming. Whole branches of life on a seeded world exist because he tried something.",
      ar: "السماوي الذي يضغط على نوعٍ ليعرف إلى أي شيء يمكن أن يُدفع. وفروع كاملة من الحياة على عالمٍ مبذور موجودة لأنه جرّب شيئًا.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "scathan",
    nameEn: "Scathan the Approver",
    nameAr: "سكاثان المُقِرّ",
    aliases: ["Scathan", "Scathan the Approver"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      {
        en: "Approves or refuses, and it is final",
        ar: "يوافق أو يرفض، وحكمه نهائي",
      },
      { en: "Helped stop Protege", ar: "ساعد في إيقاف بروتيجيه" },
      { en: "Answers to no court", ar: "لا تحاسبه محكمة" },
    ],
    origin: {
      en: "The Celestial whose approval a judgement needs before it stands, and one of the most powerful of the Host. He has been called to weigh matters even the Living Tribunal was hearing.",
      ar: "السماوي الذي يحتاج الحكم إقراره قبل أن ينفذ، وهو من أقوى الحشد. وقد استُدعي ليزن أمورًا كانت المحكمة الحية تنظر فيها.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "tefral",
    nameEn: "Tefral the Surveyor",
    nameAr: "تفرال المسّاح",
    aliases: ["Tefral", "Tefral the Surveyor"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Surveys a world first", ar: "يمسح العالم أولًا" },
      { en: "Maps what is worth taking", ar: "يرسم ما يستحق الأخذ" },
      { en: "Arrives before the rest", ar: "يصل قبل البقية" },
    ],
    origin: {
      en: "The Celestial who reaches a world ahead of the others and maps it, so the Host arrives already knowing what is there. Most seeded worlds meet him without ever knowing it.",
      ar: "السماوي الذي يبلغ العالم قبل غيره فيمسحه، فيصل الحشد وهو يعرف ما فيه. ومعظم العوالم المبذورة تلقاه دون أن تدري.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "ashema",
    nameEn: "Ashema the Listener",
    nameAr: "أشيما المُصغية",
    aliases: ["Ashema", "Ashema the Listener"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Listens to a world's case", ar: "تصغي لقضية عالم" },
      { en: "Speaks with mortals", ar: "تحادث الفانين" },
      { en: "Can take human form", ar: "تتخذ هيئة بشرية" },
    ],
    origin: {
      en: "The Celestial who will actually hear what the people of a world have to say for themselves, and the only one of the Host who takes a human shape to do it.",
      ar: "السماوية التي تصغي فعلًا إلى ما يقوله أهل عالمٍ دفاعًا عن أنفسهم، وهي الوحيدة في الحشد التي تتخذ صورة بشرية لتفعل ذلك.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "devron",
    nameEn: "Devron the Experimenter",
    nameAr: "ديفرون المجرّب",
    aliases: ["Devron", "Devron the Experimenter"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Runs the experiments", ar: "يجري التجارب" },
      { en: "Reshapes a biosphere", ar: "يعيد تشكيل محيط حيوي" },
      { en: "Watches what happens", ar: "يراقب ما يحدث" },
    ],
    origin: {
      en: "The Celestial who tries things on a living world to see what results, and treats an entire biosphere as an experiment still running.",
      ar: "السماوي الذي يجرّب أشياء على عالم حيّ ليرى النتيجة، ويعامل محيطًا حيويًا كاملًا كتجربة ما تزال جارية.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "gamiel",
    nameEn: "Gamiel the Manipulator",
    nameAr: "غاميل المتلاعب",
    aliases: ["Gamiel", "Gamiel the Manipulator"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Manipulates what was made", ar: "يتلاعب بما صُنع" },
      { en: "Adjusts a world's course", ar: "يعدّل مسار عالم" },
      { en: "Leaves no fingerprints", ar: "لا يترك أثرًا" },
    ],
    origin: {
      en: "The Celestial who adjusts a world after it has been seeded, steering what grows there without the people living on it ever noticing a hand at work.",
      ar: "السماوي الذي يعدّل عالمًا بعد بذره، فيوجّه ما ينمو فيه دون أن يلحظ أهله يدًا تعمل.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "zgreb",
    nameEn: "Zgreb the Aspirant",
    nameAr: "زغريب الطامح",
    aliases: ["Zgreb", "Zgreb the Aspirant"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* Same correction as the Aspirants, and a second lesson under it: the
         first rewrite was all narrative — "Infected and killed every other
         Celestial", "Summoned the Final Host" — and scored 53, which passed
         tier 5's gate and failed tier 3's. Deeds the scorer cannot read are
         the same as no deeds. The standard Celestial toolkit is his by the
         dossier's own first line, and it is what the other thirteen carry. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      {
        en: "Took Phoenix fire and a thrown Mjolnir",
        ar: "تلقّى نار الفينيكس وميولنير مقذوفة",
      },
      { en: "Carries the Horde, and spreads it", ar: "يحمل الحشد وينشره" },
      {
        en: "Infected and killed every other Celestial",
        ar: "أصاب وقتل كل سماوي آخر",
      },
      {
        en: "Summoned the Final Host to purge Earth",
        ar: "استدعى الجوقة الأخيرة لتطهير الأرض",
      },
    ],
    origin: {
      en: "A Celestial who has not yet taken a full place among the Host, and carries the name of the aspiration rather than of a function. The others have not decided about him.",
      ar: "سماويٌّ لم يأخذ بعد مكانه الكامل بين الحشد، ويحمل اسم الطموح لا اسم وظيفة. ولم يحسم الآخرون أمرهم بشأنه.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "godhead",
    nameEn: "Godhead",
    nameAr: "غودهيد",
    aliases: ["Godhead", "Godhead"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* THE STANDARD CELESTIAL POWER SET WAS MISSING FROM ALL THIRTEEN. Every
         Celestial has reality warping, space-time manipulation, cosmic
         awareness and two thousand feet of near-invulnerable body; the title
         is the SPECIALISED FUNCTION that sits on top of it. These records had
         only the function, so they read as job descriptions and scored like
         them — Scathan the Approver, a Celestial, scored FOUR. */
      {
        en: "Warps reality, matter and space-time",
        ar: "يلوي الواقع والمادة والزمكان",
      },
      { en: "Colossal, and near-invulnerable", ar: "هائل الحجم وشبه منيع" },
      { en: "Leads a Host", ar: "يقود جوقة" },
      { en: "Made the Black Vortex", ar: "صنع الدوامة السوداء" },
      { en: "Speaks for the whole", ar: "ينطق باسم الجميع" },
    ],
    origin: {
      en: "The Celestial who stands at the head of a Host and speaks for it. Where Arishem judges a single world, this one answers for what the entire group has done.",
      ar: "السماوي الذي يقف على رأس حشدٍ وينطق باسمه. فبينما يقضي أريشيم في عالم واحد، يجيب هذا عمّا فعلته الجماعة كلها.",
    },
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
      /* SEVEN OF THE TWELVE SCORED LOWER AFTER I ADDED PART 3's FEATS, which
         is the worst run of this in the whole session and the same mistake
         every time: I spent the six slots on what each one DID and dropped
         the phrases that were carrying them -- "cosmic energy" and
         "near-immortal", which this vocabulary prices heavily. Starfox fell
         from 252 to 52 that way. Both go in now. */
      {
        en: "Channels his cosmic energy across everything",
        ar: "يوزّع طاقته الكونية على كل شيء",
      },
      { en: "The most powerful of the ten", ar: "الأقوى بين العشرة" },
      {
        en: "Beams that vaporise solid matter",
        ar: "أشعة تبخّر المادة الصلبة",
      },
      { en: "Near-invulnerable, and near-immortal", ar: "شبه منيع، وشبه خالد" },
      {
        en: "Senses a Celestial light-years away",
        ar: "يستشعر سماويًا على بعد سنين ضوئية",
      },
      { en: "Heavy use saps him, and it hurts", ar: "الإفراط يستنزفه، ويؤلمه" },
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
      /* PART 3 ARRIVED AFTER I HAD ALREADY WRITTEN THESE, and it carries feats
         the earlier pass did not have. This one turned an EMERGING CELESTIAL
         to stone, which is a larger claim than anything her record made. */
      {
        en: "The greatest transmuter of all the Eternals",
        ar: "أعظم محوّلة للمادة بين الأزليين",
      },
      {
        en: "Turned an emerging Celestial to stone",
        ar: "حوّلت سماويًا صاعدًا إلى حجر",
      },
      {
        en: "Rearranges matter down to the atom",
        ar: "تعيد ترتيب المادة حتى الذرة",
      },
      {
        en: "Turns a living thing into another thing",
        ar: "تحوّل كائنًا حيًا إلى شيء آخر",
      },
      {
        en: "Cosmic energy, and millennia of practice",
        ar: "طاقة كونية وآلاف السنين من التمرّس",
      },
      {
        en: "Subatomic matter is where she stops",
        ar: "المادة دون الذرية حيث تتوقف",
      },
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
      {
        en: "Forms any weapon out of cosmic energy",
        ar: "تشكّل أي سلاح من طاقة كونية",
      },
      {
        en: "A bow of cold energy, and a spear of heat",
        ar: "قوس طاقة باردة، ورمح حرارة",
      },
      {
        en: "Telekinesis, and transmutation with it",
        ar: "تحريك ذهني، وتحويل للمادة معه",
      },
      {
        en: "Unmatched as a fighter, over millennia",
        ar: "لا تُبارى قتالًا عبر آلاف السنين",
      },
      {
        en: "A scholar of everything the Eternals know",
        ar: "عالمة بكل ما يعرفه الأزليون",
      },
      {
        en: "Mahd Wy'ry: the memories come back wrong",
        ar: "ماد وايري: الذكريات تعود مشوّهة",
      },
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
      {
        en: "The only one the Celestials speak to",
        ar: "الوحيدة التي يكلّمها السماويون",
      },
      { en: "Cosmic energy, like every Eternal", ar: "طاقة كونية، كأي أزليّ" },
      { en: "Heals any wound, on anyone", ar: "تشفي أي جرح لأي أحد" },
      {
        en: "Lifts twenty-five tons, and flies",
        ar: "ترفع خمسة وعشرين طنًا، وتطير",
      },
      { en: "Near-immortal", ar: "شبه خالدة" },
      { en: "Leads the ten, and chose wrong", ar: "تقود العشرة، واختارت خطأ" },
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
      {
        en: "Centuries of samurai swordsmanship",
        ar: "قرون من مبارزة الساموراي",
      },
      {
        en: "A sword Phastos forged, and it cuts anything",
        ar: "سيف صاغه فاستوس، ويقطع أي شيء",
      },
      {
        en: "The full Eternal set, and he ignores it",
        ar: "مجموعة الأزليين كاملة، ويتجاهلها",
      },
      {
        en: "Cosmic energy fired from his hands",
        ar: "طاقة كونية تنطلق من يديه",
      },
      { en: "Near-immortal", ar: "شبه خالد" },
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
      {
        en: "Rewrote reality on a cosmic scale, once",
        ar: "أعاد كتابة الواقع بمقياس كوني مرة",
      },
      {
        en: "Turned every Eternal into an ordinary human",
        ar: "حوّل كل أزليّ إلى إنسان عادي",
      },
      {
        en: "Transmutation second only to Sersi",
        ar: "تحويل للمادة لا يفوقه إلا سيرسي",
      },
      { en: "Illusions that fool gods", ar: "أوهام تخدع الآلهة" },
      {
        en: "Immune to any force weaker than his own",
        ar: "منيع أمام أي قوة أضعف من قوته",
      },
      {
        en: "Frozen as a child, and furious about it",
        ar: "مجمّد طفلًا، وغاضب من ذلك",
      },
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
      { en: "Invents any machine at all", ar: "يخترع أي آلة كانت" },
      {
        en: "Builds weapons from raw cosmic energy",
        ar: "يصنع أسلحة من طاقة كونية خام",
      },
      {
        en: "Every human advance has his hand in it",
        ar: "لكل تقدّم بشري أثر من يده",
      },
      {
        en: "Strength and durability past any human",
        ar: "قوة وصلابة تفوق أي بشري",
      },
      { en: "Near-immortal", ar: "شبه خالد" },
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
      { en: "The fastest of all the Eternals", ar: "أسرع الأزليين جميعًا" },
      {
        en: "Runs in circles until a cyclone forms",
        ar: "يدور حتى يتشكّل إعصار",
      },
      {
        en: "Runs up a wall, and across water",
        ar: "يركض على جدار، وفوق الماء",
      },
      { en: "Near-immortal, and strong with it", ar: "شبه خالد، وقوي مع ذلك" },
      {
        en: "Traded flight and the psionics away for it",
        ar: "قايض الطيران والقوى الذهنية بذلك",
      },
      {
        en: "Tires, and can be hurt, unlike the rest",
        ar: "يتعب ويُصاب، بخلاف البقية",
      },
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
      { en: "Put a Celestial to sleep", ar: "أنام سماويًا" },
      {
        en: "Mind control over anyone who hears him",
        ar: "سيطرة ذهنية على كل من يسمعه",
      },
      {
        en: "Built a hypnotised country around himself",
        ar: "بنى حوله بلدًا منوَّمًا",
      },
      {
        en: "Cosmic energy blasts, and flight",
        ar: "طلقات طاقة كونية، وطيران",
      },
      {
        en: "Transmutes matter, including his own",
        ar: "يحوّل المادة، حتى مادته",
      },
      { en: "Near-immortal", ar: "شبه خالد" },
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
      { en: "The strongest Eternal there is", ar: "أقوى الأزليين على الإطلاق" },
      { en: "Ikaris could not damage him", ar: "لم يستطع إيكاريس إيذاءه" },
      {
        en: "Cosmic energy forged around his fists",
        ar: "طاقة كونية تُصاغ حول قبضتيه",
      },
      {
        en: "Near-immortal, and very hard to hurt",
        ar: "شبه خالد، ويصعب إيذاؤه جدًا",
      },
      {
        en: "Withstands any blast or temperature",
        ar: "يصمد لأي انفجار أو حرارة",
      },
      {
        en: "Away from Olympia too long, he weakens",
        ar: "بعيدًا عن أوليمبيا طويلًا، يضعف",
      },
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
    /* REAL AND UNCREDITED, like the Silver Surfer in the 1967 series. TMDB
       lists 66 credits for Ultimate Spider-Man and none of them is this
       character, who is a New Warrior across seasons 3 and 4. */
    alsoIn: ["ultimate-spider-man"],
    category: "hero",
    affiliation: ["Inhumans", "New Warriors"],
    universe: ["marvel-tv"],
    species: "Inhuman",
    powers: [
      { en: "Enhanced strength and durability", ar: "قوة وصلابة معززتان" },
      { en: "Moves through water at speed", ar: "يتحرك في الماء بسرعة" },
      { en: "Breathes water", ar: "يتنفس الماء" },
      { en: "Cannot survive long in air", ar: "لا يعيش طويلًا في الهواء" },
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
      /* "Teleports anywhere / Very large dog" scored MINUS TWENTY-TWO and sat
         above Iron Fist. He is a dog, and the teleport is genuinely enormous —
         he has moved the Inhuman royal family between star systems. Written
         out, he earns a place instead of being handed one. */
      { en: "Teleports anywhere at all", ar: "ينتقل آنيًا إلى أي مكان" },
      { en: "Carries others with him", ar: "ينقل غيره معه" },
      { en: "Crosses interstellar distances", ar: "يقطع مسافات بين النجوم" },
      { en: "Enormous strength and durability", ar: "قوة وصلابة هائلتان" },
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
    aliases: [
      "Sentry",
      "The Sentry",
      "Robert Reynolds",
      "Bob Reynolds",
      "The Void",
      "Bob",
    ],
    category: "antihero",
    affiliation: ["Thunderbolts"],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      /* THE SUPERMAN-SHAPED BAND, which Rashid grouped correctly: Sentry,
         Hyperion, Gladiator, Beta Ray Bill, Blue Marvel, Quasar, Nova, Captain
         Marvel and Ikaris are one silhouette — fly, hit, shrug it off, project
         energy. Six of the nine still had three or four bullets, which is why
         their order looked arbitrary: the scorer was ranking prose length. */
      {
        en: "The power of a million exploding suns",
        ar: "قوة مليون شمس تنفجر",
      },
      { en: "Molecular manipulation, and flight", ar: "تحكم جزيئي، وطيران" },
      {
        en: "Nearly invulnerable, and heals from it",
        ar: "شبه منيع، ويشفى مما يصيبه",
      },
      {
        en: "Telepathy strong enough to erase himself",
        ar: "تخاطر يكفي ليمحو نفسه",
      },
      {
        en: "Traded blows with the Hulk and Thor",
        ar: "تبادل الضربات مع هَلك وثور",
      },
      { en: "The Void is the same man", ar: "الفراغ هو الرجل نفسه" },
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
      {
        en: "Widow training, from the same room",
        ar: "تدريب الأرملة، من الغرفة نفسها",
      },
      {
        en: "A marksman, and lethal without a gun",
        ar: "رامية ماهرة، وفتاكة بلا سلاح",
      },
      {
        en: "Batons, blades and whatever is nearby",
        ar: "هراوات ونصال وما يقع تحت يدها",
      },
      {
        en: "Freed from chemical control herself",
        ar: "تحررت من السيطرة الكيميائية بنفسها",
      },
      {
        en: "Better than Natasha, and she says so",
        ar: "أفضل من ناتاشا، وتقولها",
      },
      {
        en: "An assassin who chose to stop",
        ar: "قاتلة اختارت أن تتوقف",
      },
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
      {
        en: "Soviet super-soldier serum",
        ar: "مصل الجندي الخارق السوفييتي",
      },
      {
        en: "Strength and durability to match a shield",
        ar: "قوة وصلابة توازيان درعًا",
      },
      {
        en: "A shield of his own, and he throws it",
        ar: "درع خاص به، ويرميه",
      },
      {
        en: "Trained to fight Captain America",
        ar: "دُرّب ليقاتل كابتن أمريكا",
      },
      {
        en: "Twenty years past it, and still hits",
        ar: "تجاوزه بعشرين عامًا، وما زال يضرب",
      },
      {
        en: "Tells the story differently every time",
        ar: "يروي الحكاية مختلفة كل مرة",
      },
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
    /* NOT an ordinary human. A quantum accident left her phasing through matter and unable to reliably stop. */
    species: "Mutate",
    powers: [
      /* Two bullets, and one of them was a limitation — which is how someone
         who walks through a man and takes what is inside him ranked below a
         soldier with a shield. Phasing is not a defence, it is the attack. */
      { en: "Phases through matter", ar: "تنفذ عبر المادة" },
      { en: "Reaches through a body", ar: "تمدّ يدها داخل الجسد" },
      { en: "Untouchable when she wants", ar: "لا تُمسّ متى شاءت" },
      { en: "A quantum containment suit", ar: "بدلة احتواء كمّية" },
      { en: "Trained by S.H.I.E.L.D.", ar: "دُرّبت في شيلد" },
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
    aliases: [
      "Valentina Allegra de Fontaine",
      "Valentina",
      "Val",
      "Contessa Valentina Allegra de Fontaine",
    ],
    category: "villain",
    affiliation: ["Thunderbolts", "CIA"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Runs the CIA",
        ar: "تدير السي آي إيه",
      },
      {
        en: "Recruits people nobody should",
        ar: "تجنّد من لا ينبغي تجنيدهم",
      },
      {
        en: "Builds a team out of criminals",
        ar: "تبني فريقًا من مجرمين",
      },
      {
        en: "A spymaster with no oversight",
        ar: "رئيسة جواسيس بلا رقابة",
      },
      {
        en: "Knows what everyone did",
        ar: "تعرف ما فعله الجميع",
      },
      {
        en: "Never in the room when it fails",
        ar: "لا تكون في الغرفة حين يفشل",
      },
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
      {
        en: "Hulk-level strength, and it grows with rage",
        ar: "قوة بمستوى هَلك، وتنمو مع الغضب",
      },
      { en: "Regenerates, and does not tire", ar: "يتجدد، ولا يتعب" },
      {
        en: "The Old Power hardens his skin to stone",
        ar: "القوة القديمة تحوّل جلده حجرًا",
      },
      {
        en: "Commands rock, and shakes the ground",
        ar: "يأمر الصخر ويهزّ الأرض",
      },
      {
        en: "Senses every life on a planet at his peak",
        ar: "يستشعر كل حياة على كوكب في أوجه",
      },
      { en: "A swordsman, and a general", ar: "سيّاف، وقائد" },
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
      {
        en: "Cellular biologist",
        ar: "عالمة أحياء خلوية",
      },
      {
        en: "Ran the lab that studied the gamma",
        ar: "أدارت المختبر الذي درس الغاما",
      },
      {
        en: "The only one Banner calms for",
        ar: "الوحيدة التي يهدأ بانر لأجلها",
      },
      {
        en: "Talks to the Hulk, and is heard",
        ar: "تكلم الهالك، ويسمعها",
      },
      {
        en: "Stole her father's data to help",
        ar: "سرقت بيانات أبيها لتساعد",
      },
      {
        en: "A general's daughter who says no",
        ar: "ابنة جنرال تقول لا",
      },
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
    /* ANTIVILLAIN. Creation and destruction in the same force. It burns worlds because that is half of what it is for, not out of malice. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["fox", "legacy"],
    species: "Cosmic entity",
    powers: [
      { en: "Creation and destruction, both", ar: "الخلق والدمار معًا" },
      { en: "Cosmic fire that consumes stars", ar: "نار كونية تلتهم النجوم" },
      {
        en: "Amplifies a host past any limit",
        ar: "تضاعف حاملها إلى ما بعد أي حد",
      },
      { en: "Beat Galactus more than once", ar: "هزمت غالاكتوس أكثر من مرة" },
      { en: "Reborn every time it dies", ar: "تُبعث في كل مرة تموت" },
      { en: "Needs a host to act through", ar: "تحتاج حاملًا لتفعل عبره" },
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
    aliases: [
      "Angel",
      "Warren Worthington III",
      "Archangel",
      "Warren Worthington",
    ],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "beta",
    powers: [
      {
        en: "Feathered wings, and he is fast on them",
        ar: "أجنحة ريشية، وهو سريع بها",
      },
      {
        en: "Hollow bones, and eyesight to match",
        ar: "عظام جوفاء، وبصر يوازيها",
      },
      {
        en: "As Archangel, wings of razor metal",
        ar: "كأركانجل، أجنحة معدنية حادة",
      },
      {
        en: "Fires poisoned flechettes from them",
        ar: "يطلق منها سهامًا مسمومة",
      },
      {
        en: "A death factor Apocalypse built in",
        ar: "عامل موت زرعه أبوكاليبس",
      },
      {
        en: "And blood that later healed instead",
        ar: "ودم صار لاحقًا يشفي بدل ذلك",
      },
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
    /**
     * NO BARE "Hope". Ant-Man and the Wasp credits a "Young Hope" — Hope van
     * Dyne as a child — and the matcher's age-prefix fallback strips the
     * "Young" and matches. So a mutant who has never been in a film derived
     * an Ant-Man credit. Sixth bare-given-name collision in this corpus after
     * Selene, Thunderbird, the Jackal, the Owl and Abyss, and the first where
     * the age-prefix rule was the mechanism rather than a plain segment.
     */
    aliases: ["Hope Summers"],
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
      {
        en: "Copies the powers of any mutant near",
        ar: "تنسخ قدرات أي متحول قريب",
      },
      {
        en: "Uses several of them at once",
        ar: "تستعمل عدة منها معًا",
      },
      {
        en: "Stabilises a power running out of control",
        ar: "تثبّت قدرة خرجت عن السيطرة",
      },
      {
        en: "Amplifies it once it is steady",
        ar: "وتضاعفها متى استقرت",
      },
      {
        en: "Her birth restarted mutant births",
        ar: "ولادتها أعادت ولادات المتحولين",
      },
      {
        en: "A marksman, and she can fight",
        ar: "رامية ماهرة، وتجيد القتال",
      },
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
      {
        en: "Turns sound into light",
        ar: "تحوّل الصوت نورًا",
      },
      {
        en: "Laser beams, and blinding flashes",
        ar: "أشعة ليزر، ووميض يعمي",
      },
      {
        en: "The louder it is, the more she holds",
        ar: "كلما علا الصوت زاد ما تخزنه",
      },
      {
        en: "Photon blasts, and solid holograms",
        ar: "قذائف فوتونية، وصور مجسمة صلبة",
      },
      {
        en: "Absorbs light, so light cannot hurt her",
        ar: "تمتص الضوء، فلا يؤذيها الضوء",
      },
      {
        en: "A performer first, and still is",
        ar: "مؤدية أولًا، وما زالت",
      },
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
      {
        en: "Flies at near-supersonic speed",
        ar: "تطير بسرعة تقارب الصوت",
      },
      {
        en: "Reflexes and durability to match",
        ar: "ردود فعل وصلابة توازيها",
      },
      {
        en: "Touch her twin and they blaze",
        ar: "تلمس توأمها فيتوهجان",
      },
      {
        en: "A blinding burst of light between them",
        ar: "انفجار ضوء يعمي بينهما",
      },
      {
        en: "Generates light on her own too",
        ar: "تولّد الضوء وحدها أيضًا",
      },
      {
        en: "Alpha Flight, and Northstar's sister",
        ar: "ألفا فلايت، وأخت نورث ستار",
      },
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
      {
        en: "Rewrites his own body at the cell",
        ar: "يعيد كتابة جسده على مستوى الخلية",
      },
      {
        en: "Shapeshifts, and heals from almost anything",
        ar: "يتشكّل ويشفى من أي شيء تقريبًا",
      },
      {
        en: "Telepathy, telekinesis and precognition",
        ar: "تخاطر وتحريك ذهني واستبصار",
      },
      {
        en: "The finest geneticist who ever lived",
        ar: "أبرع عالم وراثة عاش قط",
      },
      {
        en: "Grafts one being's powers onto another",
        ar: "يطعّم قدرات كائن في آخر",
      },
      {
        en: "Armies of clones, and Celestial machinery",
        ar: "جيوش من النسخ، وآلات سماوية",
      },
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
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
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
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
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
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
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
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
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
    reality: "Earth-928",
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
    reality: "Earth-90214",
    species: "Human mutate",
    powers: [
      { en: "Spider powers", ar: "قدرات العنكبوت" },
      { en: "Sees only in black and white", ar: "لا يرى إلا الأبيض والأسود" },
    ],
    origin: {
      en: "A Peter Parker from a 1933 where the Depression never lifted, who narrates his own life like a detective novel and does not understand colour when he sees it.",
      ar: "بيتر باركر من عام 1933 لم ينقشع فيه الكساد، يروي حياته كرواية بوليسية ولا يفهم الألوان حين يراها.",
    },
    related: [
      {
        id: "spider-man",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
    ],
  },
  {
    id: "peni-parker",
    nameEn: "Peni Parker",
    nameAr: "بيني باركر",
    aliases: ["Peni Parker", "SP//dr"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-14512",
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
    reality: "Earth-8311",
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
    affiliation: ["Sinister Six", "New Warriors"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      { en: "A charge that goes through walls", ar: "اندفاع يخترق الجدران" },
      {
        en: "Enormous strength, and a hide to match",
        ar: "قوة هائلة، وجلد يوازيها",
      },
      { en: "Bullets do not reach the skin", ar: "الرصاص لا يبلغ الجلد" },
      { en: "Once moving, he is hard to turn", ar: "متى تحرّك صعب تحويله" },
      { en: "The suit does not come off", ar: "البدلة لا تُخلع" },
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
      { en: "Gauntlets that shatter concrete", ar: "قفازان يحطمان الخرسانة" },
      {
        en: "A vibration shell nothing lands through",
        ar: "غلاف اهتزازي لا يخترقه شيء",
      },
      { en: "Has knocked Spider-Man out cold", ar: "أفقد سبايدرمان وعيه" },
      {
        en: "The best safecracker in the city",
        ar: "أمهر فاتح خزائن في المدينة",
      },
      { en: "Knows exactly what he is not", ar: "يعرف تمامًا ما ليس هو" },
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
      {
        en: "Bad luck, for other people",
        ar: "حظ سيئ، للآخرين",
      },
      {
        en: "An acrobat, and a cat burglar",
        ar: "بهلوانية، ولصة منازل",
      },
      {
        en: "Claws that cut through a wall",
        ar: "مخالب تقطع جدارًا",
      },
      {
        en: "Enhanced agility and balance",
        ar: "رشاقة وتوازن معززان",
      },
      {
        en: "Steals what cannot be stolen",
        ar: "تسرق ما لا يُسرق",
      },
      {
        en: "Trained by the best thief alive",
        ar: "دربها أمهر لص حي",
      },
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
    affiliation: ["Sinister Six"],
    universe: ["sony"],
    species: "Human mutate",
    powers: [
      {
        en: "Skin like stone, and bullets flatten on it",
        ar: "جلد كالحجر، والرصاص ينبطح عليه",
      },
      {
        en: "Strength enough to trade with Spider-Man",
        ar: "قوة تكفي لمبادلة سبايدرمان",
      },
      { en: "Feels almost no pain at all", ar: "لا يشعر بالألم تقريبًا" },
      {
        en: "Filed his teeth to points himself",
        ar: "برد أسنانه ليجعلها مدببة بنفسه",
      },
      { en: "Speaks in a whisper", ar: "يتكلم همسًا" },
      {
        en: "Sunlight hurts him. He is an albino",
        ar: "ضوء الشمس يؤذيه، فهو أمهق",
      },
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
    /* NOT an ordinary human. He evolved himself first, which is the whole of his method. */
    species: "Mutate",
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
      {
        en: "Knows every ending before it happens",
        ar: "يعرف كل نهاية قبل وقوعها",
      },
      {
        en: "Runs the whole of the Sacred Timeline",
        ar: "يدير الخط الزمني المقدس بأسره",
      },
      { en: "Prunes any branch he does not like", ar: "يقلّم أي فرع لا يعجبه" },
      {
        en: "Made the Time-Keepers, and the TVA",
        ar: "صنع حرّاس الزمن وسلطة التباين",
      },
      { en: "Generates copies of himself", ar: "يولّد نسخًا من نفسه" },
      { en: "Almost no power in a fight", ar: "لا قوة تُذكر في قتال" },
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
    /**
     * OMEGA, and he is the fourteenth name on the House of X #1 list — the
     * one this corpus was missing. Marvel then spent years treating him as
     * not a mutant at all, and reversed it in March 2024: he had been
     * suppressing his own X-gene without knowing. The published list is the
     * rule here, and he has been on it the whole time.
     */
    mutantClass: "omega",
    powers: [
      {
        en: "Creates whole universes out of thought",
        ar: "يخلق أكوانًا كاملة من فكرة",
      },
      {
        en: "The Celestials call him a Universal Shaper",
        ar: "يسميه السماويون مُشكّل أكوان",
      },
      {
        en: "Reality, matter, energy and the forces",
        ar: "الواقع والمادة والطاقة والقوى",
      },
      {
        en: "Telepathy, telekinesis and precognition",
        ar: "تخاطر وتحريك ذهني واستبصار",
      },
      {
        en: "Makes grown versions of himself to fight",
        ar: "يصنع نسخًا بالغة منه للقتال",
      },
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
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["Gods"],
    universe: ["mcu", "legacy"],
    species: "Olympian",
    powers: [
      {
        en: "Strength to match Thor, and often more",
        ar: "قوة تضاهي ثور، وتفوقه غالبًا",
      },
      { en: "Held up a collapsing continent", ar: "حمل قارة تنهار" },
      { en: "Immortal, and heals like a god", ar: "خالد، ويشفى كإله" },
      {
        en: "An adamantine mace nothing breaks",
        ar: "صولجان أدامنتي لا ينكسر",
      },
      {
        en: "Near-invulnerable to anything mortal",
        ar: "شبه منيع أمام كل ما هو فانٍ",
      },
      {
        en: "The strongest Olympian there has been",
        ar: "أقوى أولمبي عرفه التاريخ",
      },
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
      /* TWO BULLETS FOR THE KING OF OLYMPUS, which is the actual answer to
         "is Zeus that powerful" -- his rank was held entirely by his slot in
         this tier's head and not by anything his record claimed. Thor beating
         him in one film does not lower him, for the same reason it does not
         lower Galactus or the Living Tribunal, who have both lost worse. But
         a record that says "Thunderbolt / King of Olympus" cannot defend any
         rank at all, and Odin's was no better. */
      { en: "Thunderbolts that level a mountain", ar: "صواعق تسوّي جبلًا" },
      {
        en: "Strength to match Odin, and he has",
        ar: "قوة تضاهي أودين، وقد فعل",
      },
      { en: "Near-limitless divine energy", ar: "طاقة إلهية شبه لا محدودة" },
      {
        en: "Reshapes matter, and grants power to others",
        ar: "يعيد تشكيل المادة ويمنح القوة لغيره",
      },
      {
        en: "Immortal, and king of every Olympian",
        ar: "خالد، وملك كل الأولمبيين",
      },
      {
        en: "Beat Thor and Hercules together, once",
        ar: "هزم ثور وهرقل معًا ذات مرة",
      },
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
    /* NOT Human. Born in the Utopian Parallel, a pocket universe, to two mothers who were not human either. Punching holes between realities is not a human ability. */
    species: "Alien",
    powers: [
      {
        en: "Star portals between any two universes",
        ar: "بوابات نجمية بين أي كونين",
      },
      {
        en: "Kicks them open, and drags others through",
        ar: "تركلها لتُفتح وتجرّ غيرها عبرها",
      },
      {
        en: "Superhuman strength, speed and durability",
        ar: "قوة وسرعة وصلابة خارقة",
      },
      {
        en: "Trades blows with the heavy hitters",
        ar: "تتبادل الضربات مع الأشداء",
      },
      {
        en: "Flies, and survives open space unaided",
        ar: "تطير وتنجو في الفضاء دون عون",
      },
      { en: "Heals fast, and does not scare", ar: "تشفى سريعًا، ولا تخاف" },
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
    /* NOT Human. The Nova Force is worn, but it rewrites what the body can do. A man flying at light speed is not in the ordinary-humans chip. */
    species: "Enhanced human",
    powers: [
      { en: "The entire Nova Force, alone", ar: "قوة نوفا كاملة، وحده" },
      { en: "Strength and durability past a god", ar: "قوة وصلابة تفوق إلهًا" },
      { en: "Flight faster than light", ar: "طيران أسرع من الضوء" },
      {
        en: "Gravity manipulation, and energy blasts",
        ar: "تحكم بالجاذبية، وطلقات طاقة",
      },
      { en: "Carried the Worldmind in his head", ar: "حمل عقل العالم في رأسه" },
      { en: "Held the line at the Fault, alone", ar: "صمد عند الصدع وحده" },
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
    affiliation: ["Nova Corps", "Spider-Man's Team"],
    universe: ["legacy"],
    /* NOT Human. Same helmet, same reason. */
    species: "Enhanced human",
    powers: [
      { en: "The Nova Force, through the helmet", ar: "قوة نوفا، عبر الخوذة" },
      {
        en: "Strength, durability and a healing factor",
        ar: "قوة وصلابة وعامل شفاء",
      },
      {
        en: "Flight between stars, and through space",
        ar: "طيران بين النجوم وعبر الفضاء",
      },
      {
        en: "Force fields and solid-energy constructs",
        ar: "حقول قوة وتكوينات طاقة صلبة",
      },
      {
        en: "Gravity manipulation, and hyperspace portals",
        ar: "تحكم بالجاذبية، وبوابات فوق فضائية",
      },
      { en: "The helmet does most of it", ar: "الخوذة تفعل معظم ذلك" },
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
      {
        en: "Quack-Fu, and it genuinely works",
        ar: "كواك-فو، وهو ينفع فعلًا",
      },
      {
        en: "Plucks thrown knives out of the air",
        ar: "يلتقط السكاكين المقذوفة من الهواء",
      },
      {
        en: "A genius, when he can be bothered",
        ar: "عبقري، متى شاء أن يهتم",
      },
      {
        en: "A marksman, and a terrible temper",
        ar: "رامٍ ماهر، وطبع سيئ",
      },
      {
        en: "Wore Iron Duck armour, with flamethrowers",
        ar: "ارتدى درع البطة الحديدية بقاذفات لهب",
      },
      {
        en: "Enhanced senses, and hard to frighten",
        ar: "حواس مرهفة، ويصعب إخافته",
      },
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
      {
        en: "Hulk-level strength, in blue armour",
        ar: "قوة بمستوى هَلك، في درع أزرق",
      },
      {
        en: "A hide that shrugs off what stops tanks",
        ar: "جلد يصدّ ما يوقف الدبابات",
      },
      { en: "Turns invisible when he holds still", ar: "يصير خفيًا حين يثبت" },
      {
        en: "Keeps his own mind, and his own mouth",
        ar: "يحتفظ بعقله، وبلسانه",
      },
      { en: "Heals from almost anything", ar: "يشفى من أي شيء تقريبًا" },
      { en: "Rick Jones, of all people", ar: "ريك جونز، من بين كل الناس" },
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
      /* ALL ELEVEN GUARDIANS WERE THIN, and this one was the worst of the
         corpus: three bullets and a score of THIRTY for a being who carries an
         Infinity Stone, casts quantum magic without it, and comes back from
         death stronger every time. Only his slot in the tier 5 head was
         holding him at 120th. */
      {
        en: "The Soul Gem, and every soul in it",
        ar: "حجر الروح، وكل روح فيه",
      },
      {
        en: "Cosmic energy: blasts, shields, wormholes",
        ar: "طاقة كونية: طلقات ودروع وثقوب دودية",
      },
      {
        en: "Reborn from the cocoon, stronger each time",
        ar: "يُبعث من الشرنقة أقوى في كل مرة",
      },
      {
        en: "Quantum magic, with no Gem required",
        ar: "سحر كمّي، دون حاجة إلى حجر",
      },
      {
        en: "Resists reality and time being warped",
        ar: "يقاوم لَيّ الواقع والزمن",
      },
      { en: "The Magus waits inside him", ar: "الماغوس ينتظر بداخله" },
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
    magicSchools: ["chaos"],
    powers: [
      /* ALL TWELVE YOUNG AVENGERS WERE THIN, several on two bullets, and the
         dossier calls this one the clear heavyweight of the generation. */
      {
        en: "Reality-warping chaos magic, like Wanda's",
        ar: "سحر فوضى يلوي الواقع، كسحر واندا",
      },
      {
        en: "Erases a thing from existence outright",
        ar: "يمحو شيئًا من الوجود تمامًا",
      },
      { en: "Conjures matter out of nothing", ar: "يستحضر المادة من العدم" },
      {
        en: "As the Demiurge, he is close to a god",
        ar: "كالديميورج، يقارب الإله",
      },
      {
        en: "Strange calls him a future Sorcerer Supreme",
        ar: "يسميه سترينج ساحرًا أعظم قادمًا",
      },
      {
        en: "Spells only work if he can hear himself",
        ar: "تعمل تعاويذه إن سمع نفسه فقط",
      },
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
      {
        en: "Moves far past the limits of a human",
        ar: "يتحرك متجاوزًا حدود البشر بكثير",
      },
      {
        en: "Vibrates his molecules until things explode",
        ar: "يهزّ جزيئاته حتى تنفجر الأشياء",
      },
      { en: "Runs through solid things", ar: "يعبر الأشياء الصلبة" },
      {
        en: "Reflexes and agility to match the speed",
        ar: "ردود فعل ورشاقة توازي السرعة",
      },
      {
        en: "Stamina a body should not have",
        ar: "قدرة تحمّل لا ينبغي لجسد أن يملكها",
      },
      { en: "Wanda's other son", ar: "ابن واندا الآخر" },
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
      {
        en: "Generates bio-electric disruption fields",
        ar: "يولّد حقول تشويش حيوية كهربائية",
      },
      {
        en: "Scrambles any electronics near him",
        ar: "يعطّل أي إلكترونيات قربه",
      },
      {
        en: "Interferes with other people's powers",
        ar: "يتداخل مع قدرات الآخرين",
      },
      {
        en: "Disrupts a nervous system directly",
        ar: "يشوّش جهازًا عصبيًا مباشرة",
      },
      {
        en: "Machines stop when he walks in",
        ar: "الآلات تتوقف حين يدخل",
      },
      {
        en: "A field, not a beam. It covers a room",
        ar: "حقل لا شعاع، يغطي غرفة",
      },
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
      {
        en: "Engineered on Mojoworld as a gladiator",
        ar: "صُنع في موجوورلد مصارعًا",
      },
      {
        en: "Strength, speed and reflexes past a man's",
        ar: "قوة وسرعة وردود فعل تفوق البشر",
      },
      {
        en: "Hollow bones, so he is lighter than he looks",
        ar: "عظام جوفاء، فهو أخف مما يبدو",
      },
      {
        en: "Vibratory shockwaves through his swords",
        ar: "موجات صدمية اهتزازية عبر سيفيه",
      },
      {
        en: "A healing factor that closes wounds in hours",
        ar: "عامل شفاء يغلق الجراح في ساعات",
      },
      {
        en: "Learns a language or a style in days",
        ar: "يتعلم لغة أو أسلوبًا في أيام",
      },
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
      {
        en: "Teleports himself and anyone he holds",
        ar: "ينقل نفسه ومن يمسكه",
      },
      {
        en: "Moves cargo across a continent",
        ar: "ينقل شحنات عبر قارة",
      },
      {
        en: "Jumps again and again in succession",
        ar: "يقفز مرة تلو الأخرى",
      },
      {
        en: "Vanishes without leaving anything",
        ar: "يختفي دون أن يترك شيئًا",
      },
      {
        en: "Used it to steal, mostly",
        ar: "استعملها للسرقة، غالبًا",
      },
      {
        en: "Xavier once bluffed him into stopping",
        ar: "خدعه زافيير مرة فتوقف",
      },
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
      {
        en: "Vomits a burning, gelatinous acid",
        ar: "يتقيأ حمضًا هلاميًا محترقًا",
      },
      {
        en: "It eats through nearly any substance",
        ar: "يأكل أي مادة تقريبًا",
      },
      {
        en: "Even the superhumanly durable",
        ar: "حتى الصلب على نحو خارق",
      },
      {
        en: "Immune to his own acid",
        ar: "محصّن ضد حمضه",
      },
      {
        en: "Durable beyond an ordinary man",
        ar: "أصلب من رجل عادي",
      },
      {
        en: "His eyes glow yellow when he uses it",
        ar: "تتوهج عيناه صفراء حين يستعمله",
      },
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
      /* Six is the cap, so the transformation and its limit share ONE line
         instead of taking two — which buys the durability and the night
         vision Rashid's list names and the first rewrite had no room for. */
      { en: "Superhuman strength and speed", ar: "قوة وسرعة خارقتان" },
      { en: "Claws that cut most things", ar: "مخالب تقطع أغلب الأشياء" },
      { en: "Heals from almost anything", ar: "يشفى من أي شيء تقريبًا" },
      { en: "Near-total durability", ar: "صلابة شبه تامة" },
      {
        en: "Enhanced senses, and sees in the dark",
        ar: "حواس معززة ورؤية ليلية",
      },
      {
        en: "Turns at the full moon, and cannot stop",
        ar: "يتحول باكتمال القمر ولا يملك وقفه",
      },
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
      /* Three bullets, and one of them was scoring as reality manipulation
         because it contains the word "Realities" — the Nexus is a PLACE he
         guards, not a thing he does. Scrubbed like the World Security Council
         was, and the abilities it actually grants him are written out. */
      { en: "Burns whatever fears him", ar: "يحرق كل ما يخافه" },
      { en: "Superhuman strength", ar: "قوة خارقة" },
      { en: "Cannot be killed by force", ar: "لا يُقتل بالقوة" },
      { en: "Reforms out of the swamp", ar: "يتشكل من جديد من المستنقع" },
      { en: "Commands the vegetation", ar: "يأمر النبات" },
      { en: "Steps between dimensions", ar: "يخطو بين الأبعاد" },
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
    /* NOT an ordinary human. The Bloodstone gives her the strength and the long life. */
    species: "Enhanced human",
    powers: [
      /* Scored ZERO. "The Bloodstone / Raised as a monster hunter / Every
         weapon in the house" names the artefact, the upbringing and the
         armoury, and not one thing the stone actually does — the strength,
         the healing, the red energy out of her hand. */
      { en: "The Bloodstone", ar: "حجر الدم" },
      { en: "Superhuman strength and durability", ar: "قوة وصلابة خارقتان" },
      { en: "Red energy from her hand", ar: "طاقة حمراء من يدها" },
      { en: "Heals from serious wounds", ar: "تشفى من جروح بالغة" },
      { en: "Her blood is poison to vampires", ar: "دمها سمّ لمصاصي الدماء" },
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
    magicSchools: ["voodoo"],
    powers: [
      {
        en: "The greatest houngan there has been",
        ar: "أعظم هونغان عرفه التاريخ",
      },
      {
        en: "Sends his brother's spirit into a body",
        ar: "يرسل روح أخيه إلى جسد",
      },
      {
        en: "And takes his strength back when it returns",
        ar: "ويستعيد قوته حين تعود",
      },
      {
        en: "Pyrokinesis, flight and teleportation",
        ar: "تحكم بالنار وطيران وانتقال آني",
      },
      { en: "Stops a man where he stands", ar: "يوقف رجلًا في مكانه" },
      {
        en: "Held the Sorcerer Supreme's mantle",
        ar: "حمل عباءة الساحر الأعظم",
      },
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
    affiliation: ["Sinister Six"],
    universe: ["sony", "legacy"],
    species: "Human mutate",
    powers: [
      {
        en: "Osborn's formula, without the madness",
        ar: "صيغة أوزبورن، بلا الجنون",
      },
      {
        en: "Strength that surpasses the Green Goblin",
        ar: "قوة تتجاوز الغرين غوبلن نفسه",
      },
      {
        en: "Glider, pumpkin bombs and razor bats",
        ar: "حوّامة وقنابل يقطينية وخفافيش حادة",
      },
      {
        en: "Keeps his head where Norman loses his",
        ar: "يحتفظ برأسه حيث يفقد نورمان رأسه",
      },
      { en: "Lets other men take the fall", ar: "يترك غيره يتحمل السقوط" },
      {
        en: "Speed, reflexes and durability with it",
        ar: "وسرعة وردود فعل وصلابة معها",
      },
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
    /* Kindred is Harry, revealed. Same rule as Red Goblin: an alias, not a
       record, because the corpus holds people rather than costumes. */
    aliases: ["Harry Osborn", "New Goblin", "Kindred"],
    category: "antivillain",
    affiliation: ["New Warriors"],
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
    affiliation: ["Daily Bugle"],
    universe: ["sony", "mcu"],
    species: "Human",
    powers: [
      {
        en: "The guy in the chair",
        ar: "الرجل الذي في الكرسي",
      },
      {
        en: "Broke Stark's suit encryption",
        ar: "كسر تشفير بذلة ستارك",
      },
      {
        en: "Worked it out on his own",
        ar: "توصل إليه بنفسه",
      },
      {
        en: "Opened a portal by accident",
        ar: "فتح بوابة بالصدفة",
      },
      {
        en: "MIT, eventually",
        ar: "إم آي تي، في النهاية",
      },
      {
        en: "Loyal past the point of sense",
        ar: "وفيّ إلى ما بعد حدّ العقل",
      },
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
    affiliation: ["New Warriors"],
    universe: ["sony", "animation"],
    species: "Human",
    powers: [
      {
        en: "The girl next door",
        ar: "الفتاة التي تسكن الجوار",
      },
      {
        en: "Knew before he told her",
        ar: "عرفت قبل أن يخبرها",
      },
      {
        en: "An actress, and a good one",
        ar: "ممثلة، وبارعة",
      },
      {
        en: "Has been thrown off several bridges",
        ar: "أُلقيت من عدة جسور",
      },
      {
        en: "Keeps turning up in the fight",
        ar: "تظل تظهر في المعركة",
      },
      {
        en: "Face it, tiger",
        ar: "واجه الأمر، أيها النمر",
      },
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
      {
        en: "Reads people faster than they like",
        ar: "تقرأ الناس أسرع مما يريحهم",
      },
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
    /* REAL AND UNCREDITED, like the Silver Surfer in the 1967 series. TMDB
       lists 66 credits for Ultimate Spider-Man and none of them is this
       character, who is a New Warrior across seasons 3 and 4. */
    alsoIn: ["ultimate-spider-man"],
    category: "hero",
    affiliation: ["New Warriors"],
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
    affiliation: ["Titans"],
    universe: ["mcu", "legacy"],
    species: "Eternal",
    powers: [
      {
        en: "Stimulates pleasure in every brain nearby",
        ar: "يثير المتعة في كل عقل قريب",
      },
      {
        en: "Bends anyone to compliance, or to sleep",
        ar: "يثني أي أحد إلى الطاعة أو النوم",
      },
      {
        en: "It works on everyone except Thanos",
        ar: "ينجح مع الجميع إلا ثانوس",
      },
      {
        en: "Cosmic energy, and near-immortal with it",
        ar: "طاقة كونية، وشبه خلود معها",
      },
      { en: "Lifts fifteen tons, and flies", ar: "يرفع خمسة عشر طنًا، ويطير" },
      {
        en: "Never disciplined the energy side of it",
        ar: "لم يضبط الجانب الطاقي منها قط",
      },
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
      /* Scored ZERO. "Built to hunt mutants / Adapt to any power / Made in
         numbers" is a design brief — no strength, no armour, no guns, no
         flight — and adaptation, which is the thing that makes them
         frightening, was a phrase the patterns could not read. */
      { en: "Superhuman strength", ar: "قوة خارقة" },
      { en: "Armour that shrugs off energy", ar: "درع يصد الطاقة" },
      { en: "Energy blasts from the hands", ar: "دفقات طاقة من اليدين" },
      { en: "Flight", ar: "طيران" },
      { en: "Adapt to any power they meet", ar: "تتكيف مع أي قوة تواجهها" },
      { en: "Detect the X-gene at a distance", ar: "تكشف جين إكس عن بعد" },
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
    /* She is the one member the corpus already held as her own record, because Peggy-with-the-serum is a different arc from Peggy Carter and not merely a different life. */
    /* The only person on both of the multiverse's teams, which is why she is the one the reader arrives through. */
    affiliation: ["Avengers", "Guardians of the Multiverse", "Illuminati"],
    universe: ["mcu"],
    species: "Enhanced human",
    /* NO INFINITY STONES HERE, though Part 11 records that she briefly held all six. This file's base-form rule is explicit -- Thanos has no Gauntlet, Jean Grey has no Phoenix -- and a storyline she held them in is a PEAK, not what she walks around with. */
    powers: [
      {
        en: "The super-soldier serum",
        ar: "مصل الجندي الخارق",
      },
      {
        en: "A vibranium shield, thrown to ricochet",
        ar: "درع فيبرانيوم يُرمى فيرتدّ",
      },
      {
        en: "The agent who was already better",
        ar: "العميلة التي كانت أفضل أصلًا",
      },
      {
        en: "Peak human strength, speed and reflexes",
        ar: "ذروة البشر قوةً وسرعةً وردّ فعل",
      },
      {
        en: "Master tactician, and she leads from front",
        ar: "تكتيكية بارعة، وتقود من الأمام",
      },
      {
        en: "Fights like Rogers, and thinks faster",
        ar: "تقاتل كروجرز، وتفكر أسرع",
      },
    ],
    origin: {
      en: "The Peggy Carter from a universe where she stepped into the chamber instead of Steve Rogers. She was the better tactician in every version of the story; this is the one where somebody let her take the serum too.",
      ar: "بيغي كارتر من كونٍ دخلت فيه الحجرة بدل ستيف روجرز. كانت الأمهر تكتيكيًا في كل نسخة من الحكاية، وهذه النسخة التي سُمح لها فيها بأخذ المصل أيضًا.",
    },
    related: [
      {
        id: "peggy-carter",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
      { id: "captain-america", kind: "ally" },
    ],
  },
  {
    id: "star-lord-tchalla",
    nameEn: "Star-Lord T'Challa",
    nameAr: "ستار لورد تشالا",
    /**
     * THE ONLY GUARDIAN OF THE MULTIVERSE WITH NO HOME IN THE CORPUS. The
     * other six are variants of people already held here, and this file keeps
     * ONE record per character across universes -- Thor carries Revengers and
     * Team Iron Man on the same line. T'Challa Star-Lord is not that. He is a
     * different man from Black Panther in every way the corpus measures:
     * abducted by Yondu's crew as a boy, never king, never in the suit, and
     * the galaxy is better off for it rather than worse.
     *
     * NO BARE "STAR-LORD" IN THE ALIASES, deliberately. That string is Peter
     * Quill's and would take his credits, which is the same fault that made
     * First Steps land on Norrin instead of Shalla-Bal.
     */
    aliases: ["Star-Lord T'Challa"],
    /* Real and uncredited: Chadwick Boseman voices him in What If, in a role
       TMDB files under the Black Panther credit rather than this one. */
    alsoIn: ["what-if-s1"],
    category: "hero",
    affiliation: ["Guardians of the Multiverse", "Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      /* NOT "out of the Infinity Stones", which scored him 160 -- the scorer
         read the Stones as HIS and made a man whose power is talking the
         highest-scoring character in a tier of soldiers and spies. The file
         already stripped "infinity gauntlet" for this exact reason and chose
         to leave the Stones scoring, so the sentence is what changes. */
      {
        en: "Talked Thanos out of killing half of life",
        ar: "أقنع ثانوس بالعدول عن قتل نصف الأحياء",
      },
      {
        en: "Turns an enemy into crew by talking",
        ar: "يحوّل عدوًا إلى رفيق بالكلام",
      },
      {
        en: "A Wakandan prince's training, no suit",
        ar: "تدريب أمير واكاندي، بلا بذلة",
      },
      {
        en: "Emptied the Embassy of Ravagers of its guns",
        ar: "أفرغ ميناء الرافيجرز من سلاحه",
      },
      { en: "A thief nobody has ever caught", ar: "لص لم يُمسك به قط" },
      {
        en: "Charm that has not failed him once",
        ar: "سحر لم يخذله مرة واحدة",
      },
    ],
    origin: {
      en: "The Wakandan prince Yondu's crew took by mistake, reaching for a boy on Earth and finding him instead. He never went home, never wore the suit, and talked most of the galaxy out of its worst ideas, including the one Thanos had.",
      ar: "الأمير الواكاندي الذي أخذه طاقم يوندو بالخطأ، إذ مدّوا أيديهم إلى فتى على الأرض فوجدوه هو. لم يعد إلى بلاده قط، ولم يرتدِ البذلة قط، وأقنع أغلب المجرة بالعدول عن أسوأ أفكارها، ومنها فكرة ثانوس.",
    },
    related: [
      {
        id: "black-panther",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
      { id: "star-lord", kind: "ally" },
      { id: "thanos", kind: "enemy" },
    ],
  },
  {
    id: "captain-marvel-maria",
    nameEn: "Captain Marvel (Maria Rambeau)",
    nameAr: "كابتن مارفل (ماريا رامبو)",
    /**
     * ONE RECORD FOR BOTH MARIAS, which is this corpus's rule everywhere else:
     * Thor carries Revengers and Team Iron Man on one line, and Strange
     * Supreme is on Strange's page. The Air Force pilot of 2019 and the
     * Illuminati's Captain Marvel are the same woman on two Earths.
     *
     * Named like the Surfers -- "Silver Surfer (Norrin Radd)" and
     * "(Shalla-Bal)" -- because the bare title belongs to Carol.
     */
    aliases: ["Maria Rambeau"],
    /* Real and uncredited under a matchable name: TMDB files Lashana Lynch in
       Multiverse of Madness as "Captain Marvel", which is Carol's string. */
    alsoIn: ["doctor-strange-in-the-multiverse-of-madness"],
    category: "hero",
    affiliation: ["Illuminati"],
    universe: ["mcu"],
    species: "Human-Kree hybrid",
    powers: [
      {
        en: "Binary form, and a star's worth of it",
        ar: "هيئة الثنائية، وطاقة نجم فيها",
      },
      {
        en: "Photon blasts from both hands",
        ar: "قذائف فوتونية من كلتا يديها",
      },
      {
        en: "Flies faster than anything with wings",
        ar: "تطير أسرع من كل ذي جناح",
      },
      {
        en: "Absorbs energy and throws it back",
        ar: "تمتص الطاقة وتردّها",
      },
      {
        en: "Strength and durability past a human's",
        ar: "قوة وصلابة تفوق البشر",
      },
      {
        en: "An Air Force pilot before any of it",
        ar: "طيّارة في سلاح الجو قبل كل ذلك",
      },
    ],
    origin: {
      en: "The pilot who was in the cockpit next to Carol Danvers on the day of the crash. On Earth-838 she is the one who walked out of it changed, and the Illuminati's Captain Marvel.",
      ar: "الطيّارة التي كانت في المقصورة المجاورة لكارول دانفرز يوم التحطم. وفي الأرض-838 هي من خرجت منه متغيّرة، وكابتن مارفل في جماعة المستنيرين.",
    },
    related: [
      { id: "captain-marvel", kind: "ally" },
      { id: "monica-rambeau", kind: "ally" },
    ],
  },
  {
    id: "sharon-davis",
    nameEn: "Sharon Davis",
    nameAr: "شارون ديفيس",
    /**
     * SHE HAS NO POWERS, and that is the record rather than a gap in it. It is
     * also the whole of what happens to her: Agatha needed a fifth witch to
     * open the Road, looked next door, saw a woman who gardened, and called
     * that a Green Witch. Sharon walked the Witches' Road on a green thumb and
     * the second trial killed her.
     *
     * Searching her name returns a wall of fan videos calling her a "nexus
     * being" who "rewrites realities". That grew out of the Nexus
     * antidepressant advert in WandaVision's seventh episode and none of it is
     * canon. Writing it down would have been inventing a character.
     *
     * "Mrs. Hart" is the alias that matters -- it is how TMDB credits Debra Jo
     * Rupp in WandaVision, and Sharon Davis is the name underneath the part
     * Wanda cast her in. She spends Agatha All Along correcting people about
     * it.
     */
    aliases: ["Sharon Davis", "Mrs. Hart"],
    category: "supporting",
    /* NO "MAGIC" AFFILIATION, though the coven is why she is on the Road.
       Giving her one put her in TIER 6 at rank 254, among Wolverine's
       neighbours, because that affiliation is a tier-6 gate -- the same gate
       that has the Centivars closing tier 6 on a score of zero. She cannot do
       any magic. That is the entire point of her. */
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Not a witch. Agatha needed a fifth",
        ar: "ليست ساحرة، لكن أغاثا احتاجت خامسة",
      },
      {
        en: "A green thumb, taken for a Green Witch",
        ar: "يد تنبت الزرع، حُسبت ساحرة خضراء",
      },
      {
        en: "Walked the Witches' Road on that alone",
        ar: "سلكت طريق الساحرات بذلك وحده",
      },
      {
        en: "Surprisingly handy in the first trial",
        ar: "أبلت في المحنة الأولى بلاءً مفاجئًا",
      },
      {
        en: "The poison in the second one killed her",
        ar: "سمّ المحنة الثانية قتلها",
      },
      {
        en: "Her name is cut into the Road's floor",
        ar: "اسمها محفور في أرض الطريق",
      },
    ],
    origin: {
      en: "A Westview neighbour, written into Wanda's sitcom as Mrs. Hart and made to laugh on cue while she choked. Years later Agatha knocked, needing a fifth witch, decided a woman who kept a garden was close enough, and took her onto the Witches' Road. She was the only one of the five with nothing to defend herself with.",
      ar: "جارة من ويستفيو، كُتبت في مسلسل واندا بدور السيدة هارت وأُجبرت على الضحك عند الإشارة وهي تختنق. وبعد سنوات طرقت أغاثا بابها تبحث عن ساحرة خامسة، فرأت أن امرأة تعتني بحديقة تكفي، وأخذتها إلى طريق الساحرات. كانت الوحيدة بين الخمس بلا ما تدافع به عن نفسها.",
    },
    related: [
      { id: "agatha-harkness", kind: "ally" },
      { id: "scarlet-witch", kind: "enemy" },
      { id: "wiccan", kind: "ally" },
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
      {
        en: "Built her own suit at fifteen, from scraps",
        ar: "بنت بدلتها في الخامسة عشرة من خردة",
      },
      {
        en: "Powered armour: flight and armour-borne strength",
        ar: "درع مزوّد: طيران وقوة منه",
      },
      {
        en: "Repulsor blasts, and magnetic control",
        ar: "طلقات ريبلسور، وتحكم مغناطيسي",
      },
      {
        en: "Traps a man inside an energy bubble",
        ar: "تحبس رجلًا داخل فقاعة طاقة",
      },
      {
        en: "An AI of her own design in the helmet",
        ar: "ذكاء اصطناعي من تصميمها في الخوذة",
      },
      {
        en: "Tested off the charts as a child",
        ar: "تجاوزت المقاييس اختبارًا وهي طفلة",
      },
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
    magicSchools: ["asgardian"],
    powers: [
      {
        en: "Asgardian sorcery, at a boy's scale",
        ar: "سحر أسغاردي، بمقياس صبي",
      },
      {
        en: "Illusions, shapeshifting and teleportation",
        ar: "أوهام وتشكّل وانتقال آني",
      },
      {
        en: "Durability and lifespan past a human's",
        ar: "صلابة وعمر يفوقان البشر",
      },
      {
        en: "Runs rings around everyone, allies included",
        ar: "يدور حول الجميع، حتى حلفائه",
      },
      { en: "Killed his own Thor", ar: "قتل ثوره هو" },
      { en: "Runs the Void", ar: "يدير الفراغ" },
    ],
    origin: {
      en: "A Loki variant pruned to the Void as a child, who survived long enough to be the one the others follow. He is the youngest and the most obviously in charge, which is the joke and the point.",
      ar: "نسخة من لوكي شُذّبت إلى الفراغ وهو طفل، فنجا حتى صار من يتبعه الآخرون. أصغرهم سنًّا وأظهرهم قيادةً، وتلك النكتة وتلك الفكرة معًا.",
    },
    related: [
      { id: "loki", kind: "variant", variantOrigin: "timeline-branch" },
      { id: "sylvie", kind: "variant", variantOrigin: "timeline-branch" },
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
      {
        en: "Pym particles: grows and shrinks at will",
        ar: "جسيمات بيم: تكبر وتصغر كما تشاء",
      },
      { en: "Strength that scales with her size", ar: "قوة تتناسب مع حجمها" },
      { en: "A powerhouse at giant scale", ar: "قوة ضاربة بالحجم العملاق" },
      {
        en: "Trained hand-to-hand, and sharp with it",
        ar: "مدرَّبة على القتال، وبارعة فيه",
      },
      { en: "Built the signal herself", ar: "بنت الإشارة بنفسها" },
      {
        en: "Extreme changes strain the body",
        ar: "التغيرات القصوى ترهق الجسد",
      },
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
      {
        en: "Cosmic energy blasts from her eyes",
        ar: "طلقات طاقة كونية من عينيها",
      },
      { en: "A gift from Eternity itself", ar: "هبة من الأبدية نفسها" },
      {
        en: "Carries Stormbreaker, and swings it",
        ar: "تحمل ستورمبريكر وتلوّح بها",
      },
      {
        en: "Durability of a being an abstract made",
        ar: "صلابة كائن صنعته المجرّدات",
      },
      { en: "A lifespan with no end in sight", ar: "عمر بلا نهاية تُرى" },
      {
        en: "Fights beside Thor, and keeps up",
        ar: "تقاتل إلى جانب ثور وتجاريه",
      },
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
      {
        en: "Analyst, TVA",
        ar: "محلل في تي في إيه",
      },
      {
        en: "Reads a timeline like a case file",
        ar: "يقرأ خطًا زمنيًا كملف قضية",
      },
      {
        en: "Knows every version of Loki",
        ar: "يعرف كل نسخة من لوكي",
      },
      {
        en: "Talked one of them into changing",
        ar: "أقنع واحدة منها بأن تتغير",
      },
      {
        en: "A jet ski he has never ridden",
        ar: "دراجة مائية لم يركبها قط",
      },
      {
        en: "Pruned, and came back",
        ar: "قُلّم، وعاد",
      },
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
      {
        en: "Repairs and Advancement, TVA",
        ar: "الإصلاح والتطوير، تي في إيه",
      },
      {
        en: "Built most of what the TVA runs on",
        ar: "بنى أغلب ما تعمل به تي في إيه",
      },
      {
        en: "Wrote the handbook himself",
        ar: "كتب الدليل بنفسه",
      },
      {
        en: "Understands the Loom",
        ar: "يفهم النول",
      },
      {
        en: "Explains time with a cake",
        ar: "يشرح الزمن بكعكة",
      },
      {
        en: "Long past a normal lifetime",
        ar: "تجاوز العمر الطبيعي بكثير",
      },
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
    magicSchools: ["asgardian"],
    powers: [
      { en: "Illusions on an enormous scale", ar: "أوهام بمقياس هائل" },
      { en: "Survived by hiding for decades", ar: "نجا بالاختباء عقودًا" },
    ],
    origin: {
      en: "The Loki who faked his death on Thanos's ship and spent a lifetime alone on a planet, which he eventually could not bear. His last illusion is the largest anyone in the series casts.",
      ar: "لوكي الذي زيّف موته على متن سفينة ثانوس وأمضى عمرًا وحيدًا على كوكب، حتى لم يعد يحتمل. وآخر أوهامه أضخم ما يصنعه أحد في المسلسل.",
    },
    related: [
      { id: "loki", kind: "variant", variantOrigin: "timeline-branch" },
    ],
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
    magicSchools: ["asgardian"],
    powers: [
      { en: "Claims a great deal", ar: "يدّعي الكثير" },
      { en: "A hammer, allegedly", ar: "مطرقة، على حدّ زعمه" },
    ],
    origin: {
      en: "A Loki who says he killed Captain America and Iron Man with his bare hands, in a group of Lokis where nobody believes anybody. The betrayal is telegraphed and lands anyway.",
      ar: "لوكي يقول إنه قتل كابتن أمريكا والرجل الحديدي بيديه العاريتين، في جماعة من الـلوكي لا يصدّق فيها أحد أحدًا. والخيانة متوقّعة وتقع رغم ذلك.",
    },
    related: [
      { id: "loki", kind: "variant", variantOrigin: "timeline-branch" },
    ],
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
      {
        en: "Becomes any energy on the spectrum",
        ar: "تصير أي طاقة على الطيف",
      },
      { en: "Travels at the speed of light", ar: "تسافر بسرعة الضوء" },
      { en: "Intangible while she is energy", ar: "غير ملموسة وهي طاقة" },
      { en: "Absorbs a blast and returns it", ar: "تمتص طلقة وتردّها" },
      {
        en: "Moves through wires and circuitry",
        ar: "تتحرك عبر الأسلاك والدارات",
      },
      { en: "Led the Avengers, once", ar: "قادت الأفنجرز ذات مرة" },
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
    /* NO MAGIC. He was given "asgardian" with the rest of the variants in one
       pass, and it was the only reason he ranked in tier 6 — above the
       Punisher, Iron Man and everyone below them. His own record reads "Is an
       alligator / Wears the horns / Nobody checks". */
    magicSchools: [],
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
      { id: "loki", kind: "variant", variantOrigin: "timeline-branch" },
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
    magicSchools: ["asgardian"],
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
      { id: "loki", kind: "variant", variantOrigin: "timeline-branch" },
      { id: "classic-loki", kind: "ally" },
      { id: "alligator-loki", kind: "ally" },
    ],
  },
  {
    id: "ronan",
    nameEn: "Ronan the Accuser",
    nameAr: "رونان المُتّهِم",
    aliases: ["Ronan", "Ronan the Accuser"],
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    /* ANTIVILLAIN. A zealot who believes the Kree cause is righteous and his own treaty a betrayal. Wrong, and sincere about it. */
    category: "antivillain",
    affiliation: ["Kree"],
    universe: ["mcu", "legacy"],
    species: "Kree",
    powers: [
      {
        en: "The Universal Weapon does most of it",
        ar: "السلاح الكوني يفعل معظم ذلك",
      },
      {
        en: "Disintegrating beams, and matter remade",
        ar: "أشعة تفتيت، ومادة يعاد صنعها",
      },
      { en: "Drains the energy out of a place", ar: "يستنزف الطاقة من مكان" },
      {
        en: "Gravity, force fields and displaced time",
        ar: "جاذبية ودروع وزمن مُزاح",
      },
      {
        en: "Kree strength, and armour that adds to it",
        ar: "قوة كري، ودرع يزيدها",
      },
      {
        en: "Judge and executioner of an empire",
        ar: "قاضي إمبراطورية ومنفّذ أحكامها",
      },
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
    affiliation: ["Magic"],
    universe: ["mcu", "legacy"],
    species: "Human",
    /* A mystical object or rite, not equipment. */
    magicSchools: ["eldritch"],
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
      {
        en: "Turns up before anyone else",
        ar: "يصل قبل الجميع",
      },
      {
        en: "A S.H.I.E.L.D. badge, and he uses it",
        ar: "شارة شيلد، ويستعملها",
      },
      {
        en: "A marksman, and field-trained",
        ar: "رامٍ ماهر، ومدرب ميدانيًا",
      },
      {
        en: "Fired the Destroyer gun at Loki",
        ar: "أطلق سلاح المدمر على لوكي",
      },
      {
        en: "Built the Avengers from a file",
        ar: "بنى الأفنجرز من ملف",
      },
      {
        en: "Died for it, and came back",
        ar: "مات لأجلها، وعاد",
      },
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
    reality: "Earth-138",
    species: "Human mutate",
    powers: [
      { en: "Anarchy, as a method", ar: "الفوضوية بوصفها منهجًا" },
      { en: "A guitar that is also a weapon", ar: "قيثارة هي أيضًا سلاح" },
      {
        en: "Animates in his own frame rate",
        ar: "يتحرّك بمعدّل إطاراته الخاص",
      },
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
    affiliation: ["Spider-Society"],
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
    affiliation: ["Spider-Society"],
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
    affiliation: ["Spider-Society"],
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
    affiliation: ["Spider-Society"],
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
      {
        en: "The same powers, taken not given",
        ar: "القدرات نفسها، مأخوذة لا موهوبة",
      },
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
      { id: "vision", kind: "variant", variantOrigin: "alternate-universe" },
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
    /* ANTIVILLAIN. Fulfilling a prophecy written before he existed. Ragnarok is his function and Asgard's own texts agree. */
    category: "antivillain",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Fire demon",
    magicSchools: ["asgardian"],
    powers: [
      {
        en: "Ragnarok itself, in one body",
        ar: "الراغناروك نفسه، في جسد واحد",
      },
      {
        en: "The Twilight Sword, forged to end a world",
        ar: "سيف الشفق، صيغ لإنهاء عالم",
      },
      { en: "Grows without limit as he burns", ar: "ينمو بلا حد وهو يحترق" },
      { en: "A thousand feet of living fire", ar: "ألف قدم من نار حية" },
      {
        en: "Fought Odin, and it took everything",
        ar: "قاتل أودين، وكلّف ذلك كل شيء",
      },
      {
        en: "Destroyed Asgard, exactly as promised",
        ar: "دمّر أسغارد، تمامًا كما وُعد",
      },
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
    /* ANTIVILLAIN, not villain. His wife and son died in Sokovia. He dismantles the Avengers for it and spends the rest of his life arguing that super-soldiers should not exist, which the story never quite tells him he is wrong about. */
    category: "antivillain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "No powers at all",
        ar: "بلا قدرات البتة",
      },
      {
        en: "A colonel of Sokovian special forces",
        ar: "عقيد في قوات سوكوفيا الخاصة",
      },
      {
        en: "Broke the Avengers with a notebook",
        ar: "فكك الأفنجرز بدفتر",
      },
      {
        en: "A tactician who plans in years",
        ar: "تكتيكي يخطط بالسنين",
      },
      {
        en: "A marksman, and lethal in a cell",
        ar: "رامٍ ماهر، وفتاك في زنزانة",
      },
      {
        en: "Patient past the point of sanity",
        ar: "صبور إلى ما بعد حدّ العقل",
      },
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
      { en: "Absorbs any blast and fires it back", ar: "تمتص أي طلقة وتردّها" },
      {
        en: "The Quantum Bands, and a sword of light",
        ar: "أساور الكم، وسيف من ضوء",
      },
      {
        en: "Flight, strength and cosmic awareness",
        ar: "طيران وقوة ووعي كوني",
      },
      { en: "Teleports through the Quantum Zone", ar: "تنتقل عبر منطقة الكم" },
      { en: "Carried Oblivion's own blade", ar: "حملت نصل النسيان نفسه" },
      { en: "Mar-Vell's daughter", ar: "ابنة مار-فيل" },
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
      {
        en: "Telekinesis that stops a colliding ship",
        ar: "تحريك ذهني يوقف سفينة مصطدمة",
      },
      {
        en: "Shields wide enough to block a corridor",
        ar: "دروع تسدّ ممرًا بأكمله",
      },
      {
        en: "Telepathy that throws a room at once",
        ar: "تخاطر يقذف غرفة كاملة دفعة",
      },
      { en: "Survived a Power Stone going off", ar: "نجا من انفجار حجر القوة" },
      { en: "Runs security for a whole station", ar: "يدير أمن محطة بأكملها" },
      { en: "Good dog", ar: "كلب طيّب" },
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
    /* HE IS STARHAWK, and the record was three lines of management -- "Leads the Ravager clans / Holds the code / Exiled his best captain" -- with no power on it at all. He scored 6. */
    powers: [
      {
        en: "Starhawk: he projects light as force",
        ar: "ستارهوك: يقذف الضوء قوةً",
      },
      {
        en: "Flies, and survives open space",
        ar: "يطير، وينجو في الفضاء المفتوح",
      },
      {
        en: "Precognition. He is the one who knows",
        ar: "استشراف، فهو الذي يعرف",
      },
      {
        en: "Reborn each cycle, remembering all of it",
        ar: "يولد كل دورة، ويتذكر كل شيء",
      },
      {
        en: "Strength and durability past a man's",
        ar: "قوة وصلابة تفوقان البشر",
      },
      {
        en: "Leads a hundred Ravager clans",
        ar: "يقود مئة عشيرة رافيجر",
      },
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
    related: [{ id: "stakar-ogord", kind: "ally" }],
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
    magicSchools: ["eldritch"],
    powers: [
      { en: "Sorcerer Supreme of his era", ar: "الساحر الأعظم في زمنه" },
      { en: "Casts without speaking", ar: "يسحر دون كلام" },
      { en: "A very long tail", ar: "ذيل طويل جدًا" },
    ],
    origin: {
      en: "A serpentine sorcerer and one of Stakar's original crew, who says nothing at all and does not need to. The mandalas he draws in the air are the same ones Strange learns much later.",
      ar: "ساحر أفعواني من طاقم ستاكار الأصلي، لا ينطق البتة ولا يحتاج. والدوائر التي يرسمها في الهواء هي نفسها التي يتعلّمها سترينج بعد ذلك بزمن طويل.",
    },
    related: [{ id: "stakar-ogord", kind: "ally" }],
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
    related: [{ id: "stakar-ogord", kind: "ally" }],
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
    related: [{ id: "rocket", kind: "family" }],
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
    related: [{ id: "rocket", kind: "family" }],
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
    related: [{ id: "rocket", kind: "family" }],
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
      {
        en: "Flies at near-supersonic speed",
        ar: "يطير بسرعة تقارب الصوت",
      },
      {
        en: "Durability and reflexes to match",
        ar: "صلابة وردود فعل توازيها",
      },
      {
        en: "Touch his twin and light detonates",
        ar: "يلمس توأمه فينفجر الضوء",
      },
      {
        en: "Generates light on his own",
        ar: "يولّد الضوء وحده",
      },
      {
        en: "Enhanced healing",
        ar: "شفاء معزز",
      },
      {
        en: "Alpha Flight, and Aurora's brother",
        ar: "ألفا فلايت، وأخو أورورا",
      },
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
    affiliation: ["New Warriors"],
    universe: ["mcu", "sony", "fox", "animation"],
    species: "Symbiote host",
    /* The strain he carries is the VENOM symbiote itself, so it sits in the
       natural lineage. The class describes the symbiote, not the man. */
    symbioteClass: "lineage",
    powers: [
      {
        en: "Bonded to the symbiote, in print",
        ar: "متّحد بالسيمبيوت في المطبوع",
      },
      { en: "Military training", ar: "تدريب عسكري" },
      { en: "Idolises Spider-Man", ar: "يتّخذ سبايدر-مان مثلًا" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
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
    affiliation: ["Magic", "Spider-Man's Team"],
    universe: ["animation"],
    species: "Human",
    /* A mystical object or rite, not equipment. */
    magicSchools: ["eldritch"],
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
    affiliation: ["New Warriors"],
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
    related: [{ id: "dagger", kind: "ally" }],
  },
  {
    id: "dagger",
    nameEn: "Dagger",
    nameAr: "داغر",
    aliases: ["Dagger", "Tandy Bowen", "Tandy"],
    category: "hero",
    affiliation: ["New Warriors"],
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
    related: [{ id: "cloak", kind: "ally" }],
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
    affiliation: ["Magic"],
    universe: ["marvel-tv"],
    species: "Witch",
    /* The Staff of One is blood magic, paid for in her own blood and never
       repeating a spell. Closer to Agatha's witchcraft than to Wanda's. */
    magicSchools: ["blood"],
    powers: [
      { en: "The Staff of One", ar: "عصا الواحد" },
      { en: "Each spell said once", ar: "كل تعويذة تُقال مرة" },
      { en: "Blood opens it", ar: "الدم يفتحها" },
    ],
    origin: {
      en: "The daughter of two people who turn out to be worse than she suspected, holding a staff that grants any spell she can name and refuses to grant the same one twice.",
      ar: "ابنة اثنين تبيّن أنهما أسوأ مما ظنّت، تحمل عصا تحقّق أي تعويذة تسمّيها وترفض أن تحقّق الواحدة مرتين.",
    },
    related: [{ id: "karolina-dean", kind: "family" }],
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
    related: [{ id: "nico-minoru", kind: "family" }],
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
      {
        en: "Telepathically bonded to a dinosaur",
        ar: "مرتبطة ذهنيًا بديناصور",
      },
      {
        en: "Old Lace obeys what she feels",
        ar: "أولد لايس تطيع ما تشعر به",
      },
      {
        en: "A genetically engineered deinonychus",
        ar: "ديناصور معدّل وراثيًا",
      },
      {
        en: "She feels its pain, and it feels hers",
        ar: "تشعر بألمه، ويشعر بألمها",
      },
      {
        en: "Reads everything, and remembers it",
        ar: "تقرأ كل شيء، وتتذكره",
      },
      {
        en: "Argues on principle, and usually wins",
        ar: "تجادل لأجل المبدأ، وتفوز غالبًا",
      },
    ],
    origin: {
      en: "The one who names the problem out loud while everyone else is still deciding whether to. Her parents built her a genetically engineered dinosaur that answers to her feelings.",
      ar: "من تسمّي المشكلة بصوت عالٍ بينما لا يزال الآخرون يقرّرون إن كانوا سيفعلون. بنى لها والداها ديناصورًا معدّلًا وراثيًا يستجيب لمشاعرها.",
    },
    related: [{ id: "chase-stein", kind: "ally" }],
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
      {
        en: "Fistigons: gauntlets that throw fire",
        ar: "فيستيغونز: قفازات تقذف النار",
      },
      {
        en: "X-ray goggles he built himself",
        ar: "نظارات أشعة سينية صنعها بنفسه",
      },
      {
        en: "Rebuilt the gauntlets stronger each time",
        ar: "أعاد بناء القفازات أقوى كل مرة",
      },
      {
        en: "Better with machines than with people",
        ar: "أفضل مع الآلات منه مع الناس",
      },
      {
        en: "An athlete before he was an engineer",
        ar: "رياضي قبل أن يكون مهندسًا",
      },
      {
        en: "Underestimated on purpose",
        ar: "يُستهان به عن عمد",
      },
    ],
    origin: {
      en: "The athlete everyone reads as the stupid one, including his father, who built the flame gauntlets Chase steals and then works out how to improve.",
      ar: "الرياضي الذي يقرأه الجميع بوصفه الغبي، ومنهم أبوه، الذي صنع قفازات اللهب التي يسرقها تشيس ثم يعرف كيف يحسّنها.",
    },
    related: [{ id: "gert-yorkes", kind: "ally" }],
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
      {
        en: "Immense strength for her size",
        ar: "قوة هائلة قياسًا بحجمها",
      },
      {
        en: "Near-invulnerable while she uses it",
        ar: "شبه منيعة ما دامت تستعملها",
      },
      {
        en: "Punches through what adults cannot",
        ar: "تخترق ما يعجز عنه الكبار",
      },
      {
        en: "Lifts far past what looks possible",
        ar: "ترفع أبعد مما يبدو ممكنًا",
      },
      {
        en: "Then falls asleep, suddenly and deeply",
        ar: "ثم تنام، فجأة وعميقًا",
      },
      {
        en: "The nap is the limiter, and it is real",
        ar: "النوم هو الحد، وهو حقيقي",
      },
    ],
    origin: {
      en: "The youngest of them by years, strong enough to lift a car and tired enough afterwards to sleep through the argument about what to do next.",
      ar: "أصغرهم بسنوات، تقوى على رفع سيارة وتتعب بعدها بما يكفي لتنام خلال الجدال حول ما يُفعل تاليًا.",
    },
    related: [{ id: "gert-yorkes", kind: "family" }],
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
      {
        en: "Plans three moves out",
        ar: "يخطط لثلاث نقلات مقدمًا",
      },
      {
        en: "Played everyone at the table",
        ar: "تلاعب بكل من على الطاولة",
      },
      {
        en: "A strategist before a teenager",
        ar: "استراتيجي قبل أن يكون مراهقًا",
      },
      {
        en: "No powers, and he led them",
        ar: "بلا قدرات، وقادهم",
      },
      {
        en: "Chess, and it is not a metaphor",
        ar: "شطرنج، وليست استعارة",
      },
      {
        en: "Betrayed them all on purpose",
        ar: "خانهم جميعًا عن عمد",
      },
    ],
    origin: {
      en: "The one who calls them back together after two years apart, and the one whose reasons for doing it take the longest to come out.",
      ar: "من يدعوهم للاجتماع بعد عامين من الفرقة، ومن تتأخر أسبابه في الظهور أكثر من الجميع.",
    },
    related: [{ id: "nico-minoru", kind: "ally" }],
  },
  {
    id: "daimon-helstrom",
    nameEn: "Daimon Helstrom",
    nameAr: "دايمون هيلستروم",
    aliases: ["Daimon Helstrom", "Daimon"],
    category: "antihero",
    affiliation: ["Magic"],
    universe: ["marvel-tv"],
    species: "Human hybrid",
    magicSchools: ["infernal"],
    powers: [
      { en: "Casts out demons", ar: "يطرد الشياطين" },
      { en: "Hellfire in the blood", ar: "نار الجحيم في دمه" },
      { en: "A trident he will not lift", ar: "رمح ثلاثيّ يأبى حمله" },
    ],
    origin: {
      en: "The son of a serial killer and something worse, teaching ethics by day and pulling demons out of people by night, and refusing the half of himself that makes him good at it.",
      ar: "ابن قاتل متسلسل وشيء أسوأ، يدرّس الأخلاق نهارًا وينتزع الشياطين من الناس ليلًا، ويرفض النصف الذي يجعله بارعًا في ذلك.",
    },
    related: [{ id: "ana-helstrom", kind: "family" }],
  },
  {
    id: "ana-helstrom",
    nameEn: "Ana Helstrom",
    nameAr: "آنا هيلستروم",
    aliases: ["Ana Helstrom", "Ana"],
    category: "antihero",
    affiliation: ["Magic"],
    universe: ["marvel-tv"],
    species: "Human hybrid",
    magicSchools: ["infernal"],
    powers: [
      { en: "Reads a life by touch", ar: "تقرأ حياة المرء بلمسة" },
      { en: "Sells antiques", ar: "تبيع التحف" },
      { en: "Settles her own scores", ar: "تسوّي حساباتها بنفسها" },
    ],
    origin: {
      en: "His younger sister, who got the same inheritance and made none of his apologies for it. One touch tells her everything a person has done.",
      ar: "أخته الصغرى، ورثت الشيء نفسه ولم تعتذر عنه كما فعل. لمسة واحدة تخبرها بكل ما فعله المرء.",
    },
    related: [{ id: "daimon-helstrom", kind: "family" }],
  },
  {
    id: "mirage",
    nameEn: "Mirage",
    nameAr: "ميراج",
    aliases: ["Mirage", "Dani Moonstar", "Danielle Moonstar"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Pulls your worst fear out of your head",
        ar: "تنتزع أسوأ مخاوفك من رأسك",
      },
      {
        en: "And makes it solid enough to hurt you",
        ar: "وتجعله صلبًا بما يكفي ليؤذيك",
      },
      {
        en: "Psychic arrows, with the effect she picks",
        ar: "سهام نفسية، بالأثر الذي تختاره",
      },
      {
        en: "Telepathy, and a sense for danger",
        ar: "تخاطر، وحسّ بالخطر",
      },
      {
        en: "Speaks with horses, wolves and hawks",
        ar: "تحدّث الخيل والذئاب والصقور",
      },
      {
        en: "A Valkyrie: she sees death coming",
        ar: "فالكيري: ترى الموت قادمًا",
      },
    ],
    origin: {
      en: "A girl who survives the night her reservation does not, and wakes in a hospital that is not one, with a power she has not been told about and cannot yet control.",
      ar: "فتاة تنجو في الليلة التي لا تنجو فيها محميّتها، وتستيقظ في مستشفى ليس مستشفى، ومعها قدرة لم يخبرها بها أحد ولا تستطيع ضبطها بعد.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "magik",
    nameEn: "Magik",
    nameAr: "ماجيك",
    aliases: ["Magik", "Illyana Rasputin", "Illyana"],
    category: "antihero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Stepping discs across space and time",
        ar: "أقراص عبور عبر المكان والزمان",
      },
      {
        en: "A soulsword that cuts magic itself",
        ar: "سيف روح يقطع السحر نفسه",
      },
      {
        en: "Limbo is hers, and thought reshapes it",
        ar: "ليمبو لها، والفكرة تعيد تشكيلها",
      },
      {
        en: "Summons demons, and armours herself in them",
        ar: "تستدعي الشياطين وتتدرع بها",
      },
      {
        en: "Blasts, shields, scrying and astral travel",
        ar: "طلقات ودروع وكشف وسفر نجمي",
      },
      {
        en: "Weaker on Earth than at home",
        ar: "أضعف على الأرض منها في موطنها",
      },
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
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Launches like a rocket, at jet speed",
        ar: "ينطلق كالصاروخ، بسرعة نفاثة",
      },
      {
        en: "A blast field that makes him invulnerable",
        ar: "حقل انفجاري يجعله منيعًا",
      },
      {
        en: "Whatever he carries is inside it too",
        ar: "وما يحمله يكون داخله أيضًا",
      },
      {
        en: "Strength enough to be a battering ram",
        ar: "قوة تكفي ليكون كبش هدم",
      },
      {
        en: "Releases the energy as concussive blasts",
        ar: "يطلق الطاقة قذائف صادمة",
      },
      {
        en: "Caught not blasting, he is ordinary",
        ar: "إذا فوجئ وهو لا ينطلق، صار عاديًا",
      },
    ],
    origin: {
      en: "A Kentucky mining boy whose power went off underground the first time and brought the roof down. He has been apologising for it ever since.",
      ar: "فتى من مناجم كنتاكي انطلقت قدرته تحت الأرض أول مرة فأسقطت السقف. وهو يعتذر عن ذلك منذ حينها.",
    },
    related: [{ id: "mirage", kind: "ally" }],
  },
  {
    id: "wolfsbane",
    nameEn: "Wolfsbane",
    nameAr: "وولفسباين",
    aliases: ["Wolfsbane", "Rahne Sinclair", "Rahne"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Becomes a wolf, or something between",
        ar: "تصير ذئبة، أو شيئًا بينهما",
      },
      {
        en: "Strength, speed and claws in either",
        ar: "قوة وسرعة ومخالب في الحالتين",
      },
      {
        en: "Senses that track across a county",
        ar: "حواس تتعقب عبر مقاطعة",
      },
      {
        en: "Heals fast once she has shifted",
        ar: "تشفى سريعًا متى تحولت",
      },
      {
        en: "Keeps her own mind throughout",
        ar: "تحتفظ بعقلها طوال الوقت",
      },
      {
        en: "An empathic bond with those she loves",
        ar: "رابطة وجدانية بمن تحب",
      },
    ],
    origin: {
      en: "A Scottish girl taught by her church that what she turns into is a sin, who is gentler than anyone else there and the quickest to believe she deserves the room she is locked in.",
      ar: "فتاة اسكتلندية علّمتها كنيستها أن ما تتحوّل إليه خطيئة، وهي أرقّ من في المكان وأسرعهم تصديقًا بأنها تستحق الغرفة التي حُبست فيها.",
    },
    related: [{ id: "mirage", kind: "ally" }],
  },
  {
    id: "sunspot",
    nameEn: "Sunspot",
    nameAr: "صنسبوت",
    aliases: ["Sunspot", "Roberto da Costa", "Bobby da Costa"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Absorbs sunlight, and goes pitch-black",
        ar: "يمتص ضوء الشمس، فيصير أسود حالكًا",
      },
      {
        en: "Fifty tons of strength at full charge",
        ar: "خمسون طنًا من القوة بكامل شحنه",
      },
      {
        en: "Solar blasts, and fire with them",
        ar: "قذائف شمسية، ونار معها",
      },
      {
        en: "Flies on thermal updrafts",
        ar: "يطير على تيارات حرارية",
      },
      {
        en: "Banks reserves to use after dark",
        ar: "يخزّن احتياطيًا لاستعماله بعد المغيب",
      },
      {
        en: "Absorbs other energy, and survives space",
        ar: "يمتص طاقات أخرى، وينجو في الفضاء",
      },
    ],
    origin: {
      en: "A Brazilian heir who burned a girl to death the first time it happened, in front of everyone, and has been performing arrogance over it ever since.",
      ar: "وريث برازيلي أحرق فتاة حتى الموت في المرة الأولى، أمام الجميع، وظل يؤدّي الغطرسة فوق ذلك منذاك.",
    },
    related: [{ id: "magik", kind: "ally" }],
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
      {
        en: "Absorbs and manipulates photons",
        ar: "يمتص الفوتونات ويتحكم بها",
      },
      {
        en: "Focuses light into a cutting beam",
        ar: "يركّز الضوء شعاعًا قاطعًا",
      },
      {
        en: "Burns with it, at close range",
        ar: "يحرق به، من مسافة قريبة",
      },
      {
        en: "Throws blinding displays",
        ar: "يطلق عروضًا تعمي",
      },
      {
        en: "Glows bright enough to signal with",
        ar: "يتوهج بما يكفي للإشارة",
      },
      {
        en: "The light comes off him constantly",
        ar: "الضوء ينبعث منه باستمرار",
      },
    ],
    origin: {
      en: "A mutant who worked for a cartel because nobody legitimate would take him, and who leaves it to help a network moving mutant families out of the country.",
      ar: "متحوّل عمل لدى عصابة لأن لا جهة شرعية قبلته، ثم تركها ليساعد شبكة تُهرّب عائلات المتحوّلين خارج البلاد.",
    },
    related: [{ id: "polaris", kind: "family" }],
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
      {
        en: "Superhuman strength, speed and stamina",
        ar: "قوة وسرعة وتحمّل خارقة",
      },
      {
        en: "Durability to take what he starts",
        ar: "صلابة تحتمل ما يبدأه",
      },
      {
        en: "Enhanced senses, and he tracks by them",
        ar: "حواس مرهفة، ويتعقب بها",
      },
      {
        en: "A hunter before he was anything else",
        ar: "صياد قبل أي شيء آخر",
      },
      {
        en: "Fierce past the point of sense",
        ar: "شرس إلى ما بعد حدّ العقل",
      },
      {
        en: "Died on his second mission out",
        ar: "مات في مهمته الثانية",
      },
    ],
    origin: {
      en: "A former Marine who runs the Mutant Underground the way he ran a squad, and who can follow anyone anywhere by the trace they leave behind them.",
      ar: "جندي بحرية سابق يدير المقاومة المتحوّلة كما كان يدير فصيلة، ويستطيع تعقّب أي أحد في أي مكان بالأثر الذي يتركه.",
    },
    related: [{ id: "eclipse", kind: "ally" }],
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
      {
        en: "Pulls molecules together into barriers",
        ar: "تجمع الجزيئات حواجز",
      },
      {
        en: "Shields, walls, discs and domes",
        ar: "دروع وجدران وأقراص وقباب",
      },
      {
        en: "Shapes them into weapons too",
        ar: "وتشكّلها أسلحة أيضًا",
      },
      {
        en: "Must see where she is putting them",
        ar: "عليها أن ترى أين تضعها",
      },
      {
        en: "Half of Fenris, with her brother",
        ar: "نصف فِنريس، مع أخيها",
      },
      {
        en: "Her pull cancels his push unless synced",
        ar: "جذبها يلغي دفعه ما لم يتزامنا",
      },
    ],
    origin: {
      en: "A teenager who has hidden what she can do since she was small, and who finds out her family name is one mutants have every reason to fear.",
      ar: "مراهقة أخفت ما تستطيع فعله منذ صغرها، ثم تكتشف أن اسم عائلتها اسم للمتحوّلين كل سبب لأن يخافوه.",
    },
    related: [{ id: "andy-strucker", kind: "family" }],
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
      {
        en: "Pushes matter apart with telekinesis",
        ar: "يفرّق المادة بالتحريك الذهني",
      },
      {
        en: "Shatters a wall, then the building",
        ar: "يحطم جدارًا، ثم المبنى",
      },
      {
        en: "Molecular disruption, not just force",
        ar: "تفكيك جزيئي، لا قوة فحسب",
      },
      {
        en: "Half of Fenris, with his sister",
        ar: "نصف فِنريس، مع أخته",
      },
      {
        en: "Together they reach near-Omega",
        ar: "معًا يبلغان ما يقارب الأوميغا",
      },
      {
        en: "It takes time to charge, and leaves them open",
        ar: "تحتاج وقتًا للشحن، وتتركهما مكشوفين",
      },
    ],
    origin: {
      en: "The younger of the two, whose power arrives the day he is pushed too far, and who finds the people offering him a use for it more persuasive than his family does.",
      ar: "الأصغر بينهما، تصله قدرته يوم يُدفع أبعد مما يحتمل، فيجد من يعرضون عليه استعمالها أكثر إقناعًا من عائلته.",
    },
    related: [{ id: "lauren-strucker", kind: "family" }],
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
      {
        en: "Beat Professor X on the Astral Plane",
        ar: "هزم بروفيسور إكس في المستوى النجمي",
      },
      {
        en: "Possesses a body and jumps to the next",
        ar: "يتلبّس جسدًا ثم يقفز إلى التالي",
      },
      {
        en: "Reshapes a mind, and then the body",
        ar: "يعيد تشكيل العقل ثم الجسد",
      },
      {
        en: "Rules the Astral Plane outright",
        ar: "يحكم المستوى النجمي حكمًا مطلقًا",
      },
      {
        en: "Feeds on hatred and grows on it",
        ar: "يتغذى على الكراهية وينمو بها",
      },
      { en: "Has no body of his own to kill", ar: "لا جسد له يُقتل" },
    ],
    origin: {
      en: "A telepath with no body of his own, who has been living inside another man's head since that man was a child, and who has been called the illness the whole time.",
      ar: "متخاطر بلا جسد خاص، يعيش داخل رأس رجل آخر منذ كان طفلًا، وظل يُسمّى طوال الوقت مرضًا.",
    },
    related: [{ id: "legion", kind: "enemy" }],
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
      {
        en: "Swaps bodies by touch, and minds with them",
        ar: "يبدّل الأجساد باللمس، والعقول معها",
      },
      {
        en: "In your body, she uses your powers",
        ar: "في جسدك، تستعمل قدراتك",
      },
      {
        en: "And you live as her while it lasts",
        ar: "وتعيش أنت بصفتها ما دام ذلك",
      },
      {
        en: "Holds the swap as long as she needs",
        ar: "تبقي التبادل ما دامت تحتاجه",
      },
      {
        en: "Cannot be touched by accident",
        ar: "لا يمكن لمسها مصادفة",
      },
      {
        en: "Which makes every day a calculation",
        ar: "مما يجعل كل يوم حسابًا",
      },
    ],
    origin: {
      en: "A mutant who takes over the body of anyone who touches her and therefore lets nobody, in love with a man who can enter anybody's mind.",
      ar: "متحوّلة تستولي على جسد كل من يلمسها فلا تدع أحدًا يفعل، تحبّ رجلًا يستطيع دخول أي عقل.",
    },
    related: [{ id: "legion", kind: "ally" }],
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
    /* THE SUIT GOT FOUR WORDS. "A suit twice the size / Runs the company / Bought the war both ways" -- two of three bullets about business, for a powered armour that fought Iron Man to a standstill. He scored 8, below four civilians. */
    powers: [
      {
        en: "Powered armour twice Stark's size",
        ar: "درع مؤلي بضعف حجم بذلة ستارك",
      },
      {
        en: "Strength enough to lift a car overhead",
        ar: "قوة تكفي لرفع سيارة فوق الرأس",
      },
      {
        en: "Repulsors, rockets and a flamethrower",
        ar: "نوابض دافعة وصواريخ وقاذف لهب",
      },
      {
        en: "Armour that shrugs off what hits it",
        ar: "درع يتجاهل ما يصيبه",
      },
      {
        en: "Built from Stark's designs, with no limits",
        ar: "بُني على تصاميم ستارك، بلا قيود",
      },
      {
        en: "Runs the company, and sold to both sides",
        ar: "يدير الشركة، وباع للطرفين",
      },
    ],
    origin: {
      en: "Howard Stark's old partner, who ran the company while Tony grew up and never expected to hand it back. He builds a larger version of the suit out of the parts of the one that got away.",
      ar: "شريك هوارد ستارك القديم، أدار الشركة بينما كان توني يكبر، ولم يتوقّع يومًا أن يعيدها. يبني نسخة أكبر من البذلة من قطع تلك التي أفلتت منه.",
    },
    related: [{ id: "iron-man", kind: "enemy" }],
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
      {
        en: "Arc reactor whips that cut a car in half",
        ar: "سياط مفاعل قوسي شطرت سيارة",
      },
      {
        en: "Plasma whips that go through armour",
        ar: "سياط بلازما تخترق الدروع",
      },
      {
        en: "Built a working reactor from scrap",
        ar: "بنى مفاعلًا عاملًا من خردة",
      },
      {
        en: "Powered armour in the second suit",
        ar: "درع مؤلي في البذلة الثانية",
      },
      {
        en: "A physicist, and his father's equal",
        ar: "فيزيائي، وندّ لأبيه",
      },
      {
        en: "Took control of Hammer's drones",
        ar: "سيطر على طائرات هامر",
      },
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
      {
        en: "A rival contractor, and a good one",
        ar: "مقاول منافس، وبارع",
      },
      {
        en: "Builds drones by the hundred",
        ar: "يبني طائرات مسيّرة بالمئات",
      },
      {
        en: "Bought the physicist who could do it",
        ar: "اشترى الفيزيائي القادر على ذلك",
      },
      {
        en: "Armour he could never make work",
        ar: "درع لم يستطع أبدًا تشغيله",
      },
      {
        en: "Sells to whoever is buying",
        ar: "يبيع لمن يشتري",
      },
      {
        en: "Loud, and always second",
        ar: "صاخب، ودائمًا في المرتبة الثانية",
      },
    ],
    origin: {
      en: "A weapons manufacturer who has spent his career one step behind Stark Industries and blames everyone but himself. He funds a better engineer and takes the credit in advance.",
      ar: "صانع أسلحة أمضى مسيرته متأخّرًا خطوة عن ستارك إندستريز، ويلوم الجميع إلا نفسه. يموّل مهندسًا أفضل منه، ثم ينسب الفضل لنفسه سلفًا.",
    },
    related: [{ id: "iron-man", kind: "enemy" }],
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
      {
        en: "A mind on magnetic tape",
        ar: "عقل على شريط ممغنط",
      },
      {
        en: "Lives inside a machine body",
        ar: "يعيش داخل جسد آلي",
      },
      {
        en: "A face on a screen in its chest",
        ar: "وجه على شاشة في صدره",
      },
      {
        en: "Copies himself onto other systems",
        ar: "ينسخ نفسه إلى أنظمة أخرى",
      },
      {
        en: "A geneticist HYDRA built around",
        ar: "عالم وراثة بنت هايدرا حوله",
      },
      {
        en: "Cannot be killed by killing the body",
        ar: "لا يُقتل بقتل الجسد",
      },
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
      {
        en: "Close-quarters specialist",
        ar: "متخصص في القتال القريب",
      },
      {
        en: "Takes a beating and keeps coming forward",
        ar: "يتحمل الضرب ويواصل التقدم",
      },
      {
        en: "Strength enough to trade with a soldier",
        ar: "قوة تكفي لمبادلة جندي خارق",
      },
      {
        en: "A marksman, and a demolitions man",
        ar: "رامٍ ماهر، وخبير متفجرات",
      },
      {
        en: "HYDRA's best field operative",
        ar: "أفضل عميل ميداني لدى هايدرا",
      },
      {
        en: "Fought Captain America and walked away",
        ar: "قاتل كابتن أمريكا ومضى",
      },
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
      {
        en: "Runs the World Security Council",
        ar: "يدير مجلس الأمن العالمي",
      },
      {
        en: "HYDRA underneath it, for decades",
        ar: "وهايدرا تحته، لعقود",
      },
      {
        en: "Ordered Fury killed",
        ar: "أمر بقتل فيوري",
      },
      {
        en: "Commands the Winter Soldier",
        ar: "يأمر جندي الشتاء",
      },
      {
        en: "A badge nobody questions",
        ar: "شارة لا يشكك فيها أحد",
      },
      {
        en: "Never fires a shot himself",
        ar: "ولا يطلق رصاصة بنفسه",
      },
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
    magicSchools: ["eldritch"],
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
    /* NOT an ordinary human. Sovereign, grown in a pod. Not human at any point. */
    species: "Alien",
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
    /* NOT Human. He is not human and never was. Gorr is from a desert world that let its god ignore it, and the Necrosword is what he picked up afterwards. */
    species: "Alien",
    powers: [
      { en: "The Necrosword", ar: "سيف الموت" },
      { en: "Shadow monsters", ar: "وحوش من الظل" },
      {
        en: "Cannot be lied to about gods",
        ar: "لا يُكذَب عليه في أمر الآلهة",
      },
    ],
    origin: {
      en: "A man who crossed a desert praying for his daughter and buried her anyway, then found the god he had prayed to laughing. A sword finds him at the worst possible moment and agrees with him.",
      ar: "رجل قطع صحراء داعيًا لأجل ابنته ثم دفنها رغم ذلك، فوجد الإله الذي دعاه يضحك. يجده سيف في أسوأ لحظة ممكنة، ويوافقه الرأي.",
    },
    related: [{ id: "thor", kind: "enemy" }],
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
      {
        en: "Runs the Red Room",
        ar: "يدير الغرفة الحمراء",
      },
      {
        en: "Chemical control over every Widow",
        ar: "سيطرة كيميائية على كل أرملة",
      },
      {
        en: "An army of assassins he owns",
        ar: "جيش من القاتلات يملكه",
      },
      {
        en: "Pheromone locks nobody can break",
        ar: "أقفال فيرومونية لا تُكسر",
      },
      {
        en: "Never seen, and never caught",
        ar: "لا يُرى، ولا يُمسك",
      },
      {
        en: "No powers, and the worst man here",
        ar: "بلا قدرات، وأسوأ رجل هنا",
      },
    ],
    origin: {
      en: "The man who built the Red Room and the widows inside it, and who has spent decades convincing the world he is a story. His only real defence is that nobody believes he exists.",
      ar: "الرجل الذي بنى الغرفة الحمراء والأرامل داخلها، وأمضى عقودًا يقنع العالم بأنه مجرد حكاية. دفاعه الحقيقي الوحيد أن لا أحد يصدّق وجوده.",
    },
    related: [{ id: "black-widow", kind: "enemy" }],
  },
  {
    id: "dar-benn",
    nameEn: "Dar-Benn",
    nameAr: "دار-بِن",
    aliases: ["Dar-Benn"],
    category: "villain",
    affiliation: ["Kree"],
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
    related: [{ id: "captain-marvel", kind: "enemy" }],
  },
  {
    id: "yon-rogg",
    nameEn: "Yon-Rogg",
    nameAr: "يون-روغ",
    aliases: ["Yon-Rogg"],
    category: "villain",
    affiliation: ["Kree"],
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
    related: [{ id: "captain-marvel", kind: "enemy" }],
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
      {
        en: "Telepathy at Xavier's level, without limit",
        ar: "تخاطر بمستوى إكزافييه، بلا حد",
      },
      {
        en: "Takes a mind, and rules the Void with it",
        ar: "تستولي على عقل، وتحكم بالفراغ به",
      },
      { en: "Telekinesis that stops missiles", ar: "تحريك ذهني يوقف الصواريخ" },
      {
        en: "Breaks a genome down at the molecular level",
        ar: "تفكك الجينوم على المستوى الجزيئي",
      },
      {
        en: "Builds herself a body from copied DNA",
        ar: "تبني لنفسها جسدًا من حمض نووي منسوخ",
      },
      {
        en: "Killed sixteen million on Genosha",
        ar: "قتلت ستة عشر مليونًا في جينوشا",
      },
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
      /* "Says a thing and it is done / No memory of consent / A virus in the
         breath" — true, evocative, and it scored ZERO, because no pattern can
         reach a power described that obliquely. The vocabulary was not the
         problem here; the record was. It says mind control now, and keeps the
         line that makes him frightening. */
      { en: "Mind control by voice alone", ar: "سيطرة ذهنية بالصوت وحده" },
      { en: "Anyone who hears him obeys", ar: "كل من يسمعه يُطيع" },
      { en: "Says a thing and it is done", ar: "يقول الشيء فيكون" },
      { en: "A virus carried in the breath", ar: "فيروس يحمله النَفَس" },
      { en: "No memory of consent", ar: "لا ذكرى لأي موافقة" },
    ],
    origin: {
      en: "A man whose voice removes the possibility of saying no, and who has never in his life had to ask for anything. He has decided that the woman who got away belongs to him.",
      ar: "رجل يمحو صوته إمكانية الرفض، ولم يضطر يومًا في حياته أن يطلب شيئًا. وقد قرّر أن المرأة التي أفلتت منه ملكٌ له.",
    },
    related: [{ id: "jessica-jones", kind: "enemy" }],
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
      {
        en: "Chi-focused strike, like the Fist",
        ar: "ضربة مركّزة بالتشي، كالقبضة",
      },
      {
        en: "Trained in K'un-Lun from a child",
        ar: "تدرب في كون-لون منذ الصغر",
      },
      {
        en: "Beat Danny Rand more than once",
        ar: "هزم داني راند أكثر من مرة",
      },
      {
        en: "Took the Iron Fist for himself",
        ar: "انتزع القبضة الحديدية لنفسه",
      },
      {
        en: "A martial artist without equal there",
        ar: "فنان قتال لا ند له هناك",
      },
      {
        en: "Steel Serpent, and he earned it",
        ar: "الأفعى الفولاذية، وقد استحقها",
      },
    ],
    origin: {
      en: "The best student K'un-Lun had, who watched the honour he had trained his whole life for go to an outsider who then abandoned it. He comes to take it back.",
      ar: "أفضل تلميذ في كون-لون، رأى الشرف الذي تدرّب لأجله طوال عمره يذهب إلى غريب ثم يتخلّى عنه. فجاء يستردّه.",
    },
    related: [{ id: "iron-fist", kind: "enemy" }],
  },
  {
    id: "mordo",
    nameEn: "Baron Mordo",
    nameAr: "البارون موردو",
    aliases: ["Mordo", "Karl Mordo", "Baron Mordo"],
    category: "antivillain",
    /* Earth-838's Sorcerer Supreme, and the one who calls the vote against Strange. */
    affiliation: ["Masters of the Mystic Arts", "Illuminati"],
    universe: ["mcu"],
    species: "Human",
    magicSchools: ["eldritch"],
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
      {
        en: "Runs Weapon X",
        ar: "يدير ويبون إكس",
      },
      {
        en: "Built the adamantium process",
        ar: "بنى عملية الأدامانتيوم",
      },
      {
        en: "Commands a private army",
        ar: "يقود جيشًا خاصًا",
      },
      {
        en: "Mind-control serum from his own son",
        ar: "مصل سيطرة عقلية من ابنه",
      },
      {
        en: "Sent Sentinels after children",
        ar: "أرسل الحراس خلف أطفال",
      },
      {
        en: "A soldier with a government budget",
        ar: "جندي بميزانية حكومية",
      },
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
    related: [{ id: "wolverine", kind: "enemy" }],
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
      {
        en: "No powers. That is the point of her",
        ar: "بلا قدرات، وهذا هو المقصود",
      },
      {
        en: "A chemist who coats a blade in venom",
        ar: "كيميائية تطلي النصل بالسم",
      },
      {
        en: "Poison darts, and gas when she needs it",
        ar: "سهام سامة، وغاز عند الحاجة",
      },
      {
        en: "A master strategist and assassin",
        ar: "استراتيجية بارعة وقاتلة",
      },
      {
        en: "Kept youthful by means nobody records",
        ar: "تبقى شابة بوسائل لا تُدوَّن",
      },
      {
        en: "Ran Hydra, more than once",
        ar: "قادت هايدرا، أكثر من مرة",
      },
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
    related: [{ id: "deadpool", kind: "enemy" }],
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
      {
        en: "Designed the Sentinels",
        ar: "صمم الحراس",
      },
      {
        en: "Robots that hunt a gene",
        ar: "آليون يطاردون جينًا",
      },
      {
        en: "They adapt to whatever they fight",
        ar: "يتكيفون مع كل ما يقاتلونه",
      },
      {
        en: "Built them in the hundreds",
        ar: "بناهم بالمئات",
      },
      {
        en: "A military contract behind all of it",
        ar: "عقد عسكري وراء ذلك كله",
      },
      {
        en: "Killed by the thing he warned about",
        ar: "قتله الشيء الذي حذّر منه",
      },
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
    affiliation: ["Cosmic entities"],
    universe: ["animation"],
    species: "Cosmic entity",
    powers: [
      {
        en: "The Cosmic Control Rod does most of it",
        ar: "قضيب التحكم الكوني يفعل معظمه",
      },
      { en: "Blasts measured in megatons", ar: "طلقات تُقاس بالميغاطن" },
      {
        en: "Molecular control, and force absorption",
        ar: "تحكم جزيئي وامتصاص للقوة",
      },
      { en: "Commands the Annihilation Wave", ar: "يقود موجة الإبادة" },
      {
        en: "Every Negative Zone native must obey it",
        ar: "كل أهل المنطقة السالبة يطيعونه",
      },
      { en: "Take the Rod and he collapses", ar: "انزع القضيب فينهار" },
    ],
    origin: {
      en: "The ruler of the Negative Zone, whose entire existence is organised around not dying, and whose answer to anything that might threaten that is an army the size of a galaxy.",
      ar: "حاكم المنطقة السالبة، وجوده كله منظّم حول ألّا يموت، وجوابه على أي شيء قد يهدّد ذلك جيش بحجم مجرّة.",
    },
    related: [{ id: "mister-fantastic", kind: "enemy" }],
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
      {
        en: "Commands the Moloids, in their thousands",
        ar: "يأمر المولويد، بالآلاف",
      },
      {
        en: "Subterranean monsters answer to him",
        ar: "وحوش جوفية تأتمر بأمره",
      },
      {
        en: "A staff that fires energy",
        ar: "عصا تطلق الطاقة",
      },
      {
        en: "Senses vibration where he cannot see",
        ar: "يستشعر الاهتزاز حيث لا يرى",
      },
      {
        en: "Rules everything under the surface",
        ar: "يحكم كل ما تحت السطح",
      },
      {
        en: "Nearly blind, and it never stops him",
        ar: "شبه أعمى، ولم يوقفه ذلك قط",
      },
    ],
    origin: {
      en: "A scientist the surface world dismissed, who went down instead of out and found a kingdom nobody was using. He has not forgotten who laughed.",
      ar: "عالِم رفضه عالم السطح، فنزل بدل أن يخرج، فوجد مملكة لا يستخدمها أحد. وهو لم ينسَ من ضحك.",
    },
    related: [{ id: "mister-fantastic", kind: "enemy" }],
  },
  {
    id: "blackheart",
    nameEn: "Blackheart",
    nameAr: "بلاكهارت",
    aliases: ["Blackheart"],
    category: "villain",
    affiliation: ["Magic"],
    universe: ["legacy"],
    species: "Demon",
    magicSchools: ["infernal"],
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
    affiliation: ["Magic"],
    universe: ["legacy"],
    species: "Vampire",
    magicSchools: ["infernal"],
    powers: [
      { en: "Turned, not born", ar: "تحوّل ولم يُولد" },
      { en: "Reads the old blood scriptures", ar: "يقرأ كتب الدم القديمة" },
      { en: "Wants to be a god", ar: "يريد أن يصير إلهًا" },
    ],
    origin: {
      en: "A vampire who was made rather than born, and who is therefore excluded from everything the pure-blood houses run. He decides to end the argument by summoning the thing they all pray to.",
      ar: "مصّاص دماء صُنع ولم يُولد، ولذلك يُستبعد من كل ما تديره بيوت الدم النقي. فقرّر أن ينهي الجدال باستحضار ما يصلّون له جميعًا.",
    },
    related: [{ id: "blade", kind: "enemy" }],
  },
  {
    id: "nobu",
    nameEn: "Nobu",
    nameAr: "نوبو",
    aliases: ["Nobu", "Nobu Yoshioka"],
    category: "villain",
    affiliation: [],
    universe: ["defenders"],
    /* NOT an ordinary human. Same resurrection, same price. */
    species: "Enhanced human",
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
      {
        en: "Paints in blood, and it is his own art",
        ar: "يرسم بالدم، وهو فنه",
      },
      {
        en: "Cuts the vocal cords of anyone near",
        ar: "يقطع أحبال من حوله الصوتية",
      },
      {
        en: "Silence follows him into a room",
        ar: "الصمت يتبعه إلى الغرفة",
      },
      {
        en: "Heals from wounds that should end him",
        ar: "يشفى من جراح كانت لتنهيه",
      },
      {
        en: "Moves without making a sound",
        ar: "يتحرك دون صوت",
      },
      {
        en: "Kills for the composition of it",
        ar: "يقتل لأجل التكوين",
      },
    ],
    origin: {
      en: "A serial killer who treats the city as a gallery and its people as pigment, and who has never once considered that he might be doing something wrong.",
      ar: "قاتل متسلسل يعامل المدينة كصالة عرض وأهلها كأصباغ، ولم يخطر بباله يومًا أنه قد يفعل شيئًا خاطئًا.",
    },
    related: [{ id: "daredevil", kind: "enemy" }],
  },
  {
    id: "supreme-intelligence",
    nameEn: "The Supreme Intelligence",
    nameAr: "الذكاء الأسمى",
    aliases: ["Supreme Intelligence", "The Supreme Intelligence"],
    category: "villain",
    affiliation: ["Kree"],
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
    /* NOT an ordinary human. Died, and the Hand brought him back. Twice. */
    species: "Enhanced human",
    powers: [
      { en: "Died and did not stay dead", ar: "مات ولم يبقَ ميتًا" },
      { en: "Runs Rand from a penthouse", ar: "يدير راند من شقة علوية" },
      { en: "Owes the Hand everything", ar: "يدين لليد بكل شيء" },
    ],
    origin: {
      en: "Danny Rand's father's business partner, kept alive in a locked penthouse by people who expect to be repaid. Thirteen years of that has left very little of the man his children remember.",
      ar: "شريك والد داني راند في العمل، أُبقي حيًّا في شقة علوية مغلقة على يد من ينتظرون السداد. ثلاثة عشر عامًا من ذلك لم تُبقِ الكثير من الرجل الذي يذكره ولداه.",
    },
    related: [{ id: "iron-fist", kind: "enemy" }],
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
      {
        en: "Organic web-shooters, grown not built",
        ar: "قاذفات شباك عضوية، نبتت ولم تُصنع",
      },
      {
        en: "The strongest of the three at the start",
        ar: "الأقوى بين الثلاثة في البداية",
      },
      { en: "Wall-crawling", ar: "تسلّق الجدران" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
      { en: "Lifts several tons", ar: "يرفع عدة أطنان" },
      { en: "Two decades of it, and still going", ar: "عقدان من ذلك، وما زال" },
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
      { id: "spider-man-andrew", kind: "variant", variantOrigin: "clone" },
      { id: "spider-man-tom", kind: "variant", variantOrigin: "clone" },
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
      {
        en: "Mechanical web-shooters of his own design",
        ar: "قاذفات شباك ميكانيكية من تصميمه",
      },
      {
        en: "Superhuman agility, and a fighter's speed",
        ar: "رشاقة خارقة وسرعة مقاتل",
      },
      { en: "Wall-crawling", ar: "تسلّق الجدران" },
      { en: "Spider-sense", ar: "حاسة العنكبوت" },
      { en: "Lifts several tons", ar: "يرفع عدة أطنان" },
      {
        en: "Caught the one he could not catch, later",
        ar: "أمسك من عجز عن إمساكها، لاحقًا",
      },
    ],
    origin: {
      en: "The one who lost Gwen. Two films and a long gap, and when he comes back it is the failure he is still carrying that the others need him for.",
      ar: "من فقد غوين. فيلمان ثم انقطاع طويل، وحين يعود يكون الإخفاق الذي ما زال يحمله هو ما يحتاجه الآخرون منه.",
    },
    related: [
      { id: "spider-man-tobey", kind: "variant", variantOrigin: "clone" },
      { id: "spider-man-tom", kind: "variant", variantOrigin: "clone" },
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
      /* THE THREE LIVE-ACTION PETERS HAD THE SAME THREE BULLETS and were
         pinned together in the Spider-Society group as "one character
         performed three ways". Brand New Day ends that: a secondary mutation
         pushes this one's arachnid DNA into overdrive, and he comes out with
         organic webbing, radar-like senses and strength the other two do not
         have. He is not their equal any more, so he does not sit with
         them. */
      {
        en: "Organic webbing, and never runs out",
        ar: "شباك عضوية، ولا تنفد أبدًا",
      },
      {
        en: "Strength and speed past his own old limits",
        ar: "قوة وسرعة تفوق حدوده القديمة",
      },
      {
        en: "Shattered a Scorpion stinger bare-handed",
        ar: "حطّم لدغة سكوربيون بيد عارية",
      },
      {
        en: "Senses that read a room before it moves",
        ar: "حواس تقرأ الغرفة قبل أن تتحرك",
      },
      {
        en: "The black-eyed state, and the rage in it",
        ar: "حالة العينين السوداوين، والغضب فيها",
      },
      { en: "Wore an inhibitor, then took it off", ar: "لبس كابحًا ثم نزعه" },
    ],
    origin: {
      en: "Introduced in somebody else's film. A fifteen-year-old recruited into a fight between Avengers, given a suit by Tony Stark, and left at the end of it with nobody who remembers his name.",
      ar: "قُدِّم في فيلم شخص آخر. فتى في الخامسة عشرة يُستدعى إلى شجار بين المنتقمين، يمنحه توني ستارك بذلة، ثم يُترك في النهاية دون أحد يذكر اسمه.",
    },
    related: [
      { id: "spider-man-tobey", kind: "variant", variantOrigin: "clone" },
      { id: "spider-man-andrew", kind: "variant", variantOrigin: "clone" },
      /* AUTHORED, because it cannot be derived yet. Brand New Day has not
         shipped and TMDB's cast for it does not credit the Rhino, so no rule
         reading the credits can find this. It goes here rather than on the
         base character, where it would be wrong for the other two. */
      { id: "rhino", kind: "enemy" },
    ],
    performerOf: { character: "spider-man", actor: "Tom Holland" },
  },
];

/**
 * COSMIC BEINGS — the tier above the fights, and the rule that decides who
 * gets a record here.
 *
 * A supplied master list of 121 cosmic entities was checked name by name
 * against the cast credits of all 216 titles. Most of that list has never been
 * filmed: the Ur-Divisors, the Beyonders, twelve of the sixteen named
 * Celestials, the Elders past the Grandmaster and the Collector. Those are
 * real Marvel and they are not on this site, because this site answers "what
 * do I watch", and a character with no appearance answers nothing.
 *
 * The eight below are the ones that WERE credited and were missing. Every one
 * of them earns its record from a real credit, listed against it.
 *
 * Four entries on that list matched only by accident and were rejected: "On
 * Set Rocket" is not the Elder God Set, "Suicide Drug Runner" is not the
 * Runner, "Nova Prime" is the Nova Corps rather than Galactus's herald, and
 * "Agent Weaver" is not the Web of Life. Shuma-Gorath was dropped too: Doctor
 * Strange in the Multiverse of Madness credits two "Gargantos Fight
 * Spectator" extras and no Gargantos, so there is nothing to derive from.
 */
const cosmicBeings: CharacterDraft[] = [
  {
    /* Avengers Assemble, credited "Agamotto (voice)". */
    id: "agamotto",
    nameEn: "Agamotto",
    nameAr: "أجاموتو",
    aliases: ["Agamotto"],
    category: "hero",
    affiliation: ["Magic", "Vishanti", "Gods", "Cosmic entities"],
    universe: ["animation"],
    species: "Elder God",
    magicSchools: ["eldritch", "elder"],
    powers: [
      /* AGAMOTTO WAS 191st, BELOW EVERYONE WHO BORROWS FROM HIM: Doctor
         Strange at 116, the Ancient One at 118, Clea at 156, and the Vishanti
         at 73 -- a trio he is one third of and, per the sources, the
         strongest third.

         The gate was working; the record was the problem. Almost every line
         was a COMPARISON TO A NAME -- exceeds these two, rivals those two,
         Strange could not banish him -- and names are the thing this scorer
         reads worst. What his magic actually does was never written down. */
      {
        en: "Magic enough for any mystical feat there is",
        ar: "سحر يكفي لأي معجزة صوفية كانت",
      },
      {
        en: "Near-omniscient sensing: the all-seeing eye",
        ar: "إدراك شبه كلي: العين التي ترى كل شيء",
      },
      {
        en: "Opens portals in time, and raises the dead",
        ar: "يفتح بوابات في الزمن ويحيي الموتى",
      },
      {
        en: "Every Sorcerer Supreme borrows from him",
        ar: "كل ساحر أعظم يستعير منه",
      },
      {
        en: "Exceeds Oshtur and Hoggoth combined",
        ar: "يفوق أوشتور وهوغوث مجتمعين",
      },
      { en: "Rivals Dormammu and Galactus", ar: "يضاهي دورمامو وغالاكتوس" },
    ],
    origin: {
      en: "The first being on Earth to hold the title of Sorcerer Supreme, and one of the three the Vishanti are named for. The eye every later sorcerer swears by is the one he made and left behind.",
      ar: "أول من حمل لقب الساحر الأعظم على الأرض، وأحد الثلاثة الذين سُمّي بهم الفيشانتي. والعين التي يقسم بها كل ساحر بعده هي التي صنعها وتركها وراءه.",
    },
    related: [{ id: "doctor-strange", kind: "ally" }],
  },
  {
    /* The Super Hero Squad Show, credited "Chthon". */
    id: "chthon",
    nameEn: "Chthon",
    nameAr: "كثون",
    aliases: ["Chthon"],
    category: "villain",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["animation"],
    species: "Elder God",
    magicSchools: ["chaos", "elder"],
    powers: [
      {
        en: "Near-omnipotent in his own domain",
        ar: "شبه كلي القدرة في مملكته",
      },
      { en: "The first master of black magic", ar: "أول أساتذة السحر الأسود" },
      {
        en: "Wrote the Darkhold, and corrupts through it",
        ar: "كتب الداركهولد ويُفسد عبره",
      },
      {
        en: "Possesses a host and is reborn in it",
        ar: "يتلبّس حاملًا فيولد فيه",
      },
      { en: "Spawned whole demonic races", ar: "أنجب أجناسًا شيطانية كاملة" },
      {
        en: "Bound by a pact, and looking for loopholes",
        ar: "يقيّده عهد، وهو يبحث عن ثغرة",
      },
    ],
    origin: {
      en: "An Elder God who wrote everything he knew into a book before the Earth had people on it, so that his knowledge would outlive his banishment. Every corruption that book has caused since is the plan working.",
      ar: "إله قديم دوّن كل ما يعرفه في كتاب قبل أن يسكن البشر الأرض، كي تبقى معرفته بعد نفيه. وكل فساد سبّبه ذلك الكتاب منذئذٍ هو الخطة وهي تعمل.",
    },
    related: [{ id: "scarlet-witch", kind: "enemy" }],
  },
  {
    /* Hulk: Where Monsters Dwell and Ultimate Spider-Man, both "Nightmare". */
    id: "nightmare",
    nameEn: "Nightmare",
    nameAr: "نايتمير",
    aliases: ["Nightmare"],
    category: "villain",
    affiliation: ["Magic", "Cosmic entities"],
    universe: ["animation"],
    species: "Demon",
    magicSchools: ["dark-dimension"],
    powers: [
      {
        en: "Rules the Dream Dimension absolutely",
        ar: "يحكم بُعد الأحلام حكمًا مطلقًا",
      },
      { en: "Put Eternity itself to sleep", ar: "أنام الأبدية نفسها" },
      { en: "Reaches anyone who sleeps", ar: "يبلغ كل من ينام" },
      {
        en: "Illusions, fear and stolen dreams",
        ar: "أوهام وخوف وأحلام مسروقة",
      },
      { en: "Immortal while anything dreams", ar: "خالد ما دام هناك من يحلم" },
      { en: "Much weaker outside his realm", ar: "أضعف كثيرًا خارج مملكته" },
    ],
    origin: {
      en: "The ruler of the place minds go when they sleep, who grows stronger the more he is feared. He cannot touch anyone awake, which is why he is patient.",
      ar: "حاكم المكان الذي تذهب إليه العقول حين تنام، ويزداد قوة كلما ازداد الخوف منه. لا يستطيع لمس مستيقظ، ولهذا هو صبور.",
    },
    related: [{ id: "doctor-strange", kind: "enemy" }],
  },
  {
    /* Fantastic Four (1994) and Avengers: EMH, both "Terrax". */
    id: "terrax",
    nameEn: "Terrax the Tamer",
    nameAr: "تيراكس المروّض",
    aliases: ["Terrax", "Terrax the Tamer", "Tyros"],
    category: "villain",
    affiliation: ["Heralds of Galactus"],
    universe: ["animation"],
    species: "Birjian",
    powers: [
      {
        en: "The Power Cosmic, aimed at a planet's crust",
        ar: "القوة الكونية، مصوّبة إلى قشرة كوكب",
      },
      {
        en: "Moves tectonic plates, and splits chasms",
        ar: "يحرك الصفائح ويشق الهوّات",
      },
      {
        en: "Lifts a landmass miles into the air",
        ar: "يرفع كتلة يابسة أميالًا في الهواء",
      },
      {
        en: "Hurls asteroids across open space",
        ar: "يقذف الكويكبات عبر الفضاء",
      },
      {
        en: "A cosmic axe that cut a planet in half",
        ar: "فأس كوني شطر كوكبًا نصفين",
      },
      {
        en: "Treacherous enough to be a liability",
        ar: "غادر بما يكفي ليصير عبئًا",
      },
    ],
    origin: {
      en: "A tyrant who ruled his own world by force before Galactus made him a herald, and the only one of them who took the job as a promotion. He looks for worlds to devour with more enthusiasm than his master.",
      ar: "طاغية حكم عالمه بالقوة قبل أن يجعله جالاكتوس بشيرًا له، وهو الوحيد بينهم الذي عدّ المهمة ترقية. يبحث عن عوالم تُلتهم بحماسة تفوق حماسة سيده.",
    },
    related: [
      { id: "galactus", kind: "ally" },
      { id: "silver-surfer", kind: "enemy" },
    ],
  },
  {
    /* Fantastic Four (1994), credited "Firelord". */
    id: "firelord",
    nameEn: "Firelord",
    nameAr: "فايرلورد",
    aliases: ["Firelord", "Pyreus Kril"],
    category: "antihero",
    affiliation: ["Heralds of Galactus"],
    universe: ["animation"],
    species: "Xandarian",
    powers: [
      {
        en: "Cosmic flame as hot as a living sun",
        ar: "لهب كوني بحرارة شمس حية",
      },
      { en: "Fought Thor to a standstill", ar: "قاتل ثور حتى التعادل" },
      {
        en: "A cosmic staff, burning at both ends",
        ar: "عصا كونية تشتعل من طرفيها",
      },
      { en: "The Power Cosmic, through fire", ar: "القوة الكونية، عبر النار" },
      { en: "Flies between stars", ar: "يطير بين النجوم" },
      {
        en: "Came looking for a friend and stayed",
        ar: "جاء يبحث عن صديق فبقي",
      },
    ],
    origin: {
      en: "A starship officer who went looking for his lost captain and found Galactus instead, and took the job of herald as the price of the answer. Freed from it, he stayed a long way from home.",
      ar: "ضابط سفينة فضاء خرج باحثًا عن قائده المفقود فوجد جالاكتوس، فقبل مهمة البشير ثمنًا للإجابة. وحين تحرّر منها، بقي بعيدًا عن دياره.",
    },
    related: [{ id: "galactus", kind: "ally" }],
  },
  {
    /**
     * Fantastic Four (1994) and Fantastic Four: World's Greatest Heroes, both
     * "Frankie Raye". The alias list is her NAME only and never "Nova": the
     * corpus already holds the Nova Corps, and a bare "Nova" alias would take
     * every one of their credits — the exact false match this file keeps
     * getting caught by.
     */
    id: "frankie-raye",
    nameEn: "Nova (Frankie Raye)",
    nameAr: "نوفا (فرانكي راي)",
    aliases: ["Frankie Raye"],
    category: "antihero",
    affiliation: ["Heralds of Galactus"],
    universe: ["animation"],
    /* NOT plain Human. She carries the Power Cosmic. A herald of Galactus is not a person with no powers. */
    species: "Enhanced human",
    powers: [
      { en: "Cosmic flame that destroys a star", ar: "لهب كوني يدمّر نجمًا" },
      {
        en: "Burns white-hot, and is not burned",
        ar: "تحترق بيضاء متوهجة ولا تحترق",
      },
      { en: "Controls her own density", ar: "تتحكم بكثافتها" },
      {
        en: "Sees across spectrums other than light",
        ar: "ترى أطيافًا غير الضوء",
      },
      {
        en: "Travels at light speed, and liked it",
        ar: "تسافر بسرعة الضوء، وأحبّت ذلك",
      },
      { en: "Morg killed her", ar: "قتلها مورغ" },
    ],
    origin: {
      en: "Johnny Storm's girlfriend, who had the same accident he did and none of his hesitation about it. She volunteered to be Galactus's herald because the alternative was watching him choose someone unwilling.",
      ar: "حبيبة جوني ستورم، أصابها ما أصابه ولم يصبها تردده. تطوّعت لتكون بشيرة جالاكتوس لأن البديل أن تراه يختار من لا يريد.",
    },
    related: [
      { id: "human-torch", kind: "ally" },
      { id: "galactus", kind: "ally" },
    ],
  },
  {
    /* Ultimate Spider-Man and Avengers: EMH, "Korvac" / "Michael Korvac". */
    id: "korvac",
    nameEn: "Korvac",
    nameAr: "كورفاك",
    aliases: ["Korvac", "Michael Korvac"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["animation"],
    species: "Cyborg",
    powers: [
      {
        en: "The Power Cosmic, raised to near-godhood",
        ar: "القوة الكونية مرفوعة لشبه ألوهية",
      },
      {
        en: "Beat the Avengers and Guardians at once",
        ar: "هزم الأفنجرز والحراس معًا",
      },
      {
        en: "Warps reality and remakes beings",
        ar: "يلوي الواقع ويعيد صنع الكائنات",
      },
      { en: "Perception close to omniscience", ar: "إدراك يقارب العلم المطلق" },
      {
        en: "Resurrection, shields and constructs",
        ar: "إحياء ودروع وتكوينات",
      },
      {
        en: "Undone by his own remaining humanity",
        ar: "أهلكته بقية إنسانيته",
      },
    ],
    origin: {
      en: "A computer technician from the thirty-first century, punished by his conquerors by being welded into a machine, who later stole enough cosmic power to remake a universe he thought he could run better.",
      ar: "فنيّ حواسيب من القرن الحادي والثلاثين، عاقبه غزاته بلحمه في آلة، ثم سرق من القوة الكونية ما يكفي لإعادة صنع كونٍ ظنّ أنه يديره أفضل.",
    },
    related: [{ id: "galactus", kind: "enemy" }],
  },
  {
    /* Avengers: Earth's Mightiest Heroes, credited "Quasar (voice)". */
    id: "quasar",
    nameEn: "Quasar",
    nameAr: "كوازار",
    aliases: ["Quasar", "Wendell Vaughn"],
    category: "hero",
    /* Not "Avengers": the title he actually holds is Protector of the
       Universe, which Eon appoints and no team confers. */
    affiliation: ["Protectors of the Universe"],
    universe: ["animation"],
    /* NOT an ordinary human. The Quantum Bands make him Protector of the Universe. */
    species: "Enhanced human",
    powers: [
      {
        en: "The Quantum Bands, and the Quantum Zone",
        ar: "أساور الكم، ومنطقة الكم",
      },
      { en: "Builds anything at all out of light", ar: "يبني أي شيء من الضوء" },
      { en: "Absorbs energy and returns it", ar: "يمتص الطاقة ويردّها" },
      {
        en: "Flight at light speed, and through space",
        ar: "طيران بسرعة الضوء وعبر الفضاء",
      },
      {
        en: "Protector of the Universe, by appointment",
        ar: "حامي الكون، بالتعيين",
      },
      { en: "Shields nothing has broken through", ar: "دروع لم يخترقها شيء" },
    ],
    origin: {
      en: "A security guard who washed out of every field programme he tried, handed a pair of alien wristbands nobody else had survived wearing. He lived because he stopped trying to force them and simply asked.",
      ar: "حارس أمن أخفق في كل برنامج ميداني جرّبه، سُلّم زوجًا من أساور فضائية لم ينجُ أحد من ارتدائها. نجا لأنه كفّ عن إجبارها واكتفى بأن يطلب.",
    },
    related: [{ id: "captain-america", kind: "ally" }],
  },
];

/**
 * SPIDER-MAN'S ROGUES, batch 2 of the supplied rosters.
 *
 * Comics characters, so their appearance lists are empty by design — the same
 * arrangement the Celestials arrived under and that C7 exists to police.
 *
 * NONE of these carries Avengers, Defenders, Fantastic Four, Thunderbolts,
 * X-Force, Guardians, Midnight Sons, Revengers or either Civil War side, per
 * request. Where a real allegiance exists it is named — the Maggia for the
 * three crime bosses, the Sinister Syndicate for Beetle and Boomerang, the
 * Wild Pack for Silver Sable — and where none does the list is left empty
 * rather than padded.
 */
const spiderRogues: CharacterDraft[] = [
  {
    id: "hammerhead",
    nameEn: "Hammerhead",
    nameAr: "هامرهيد",
    aliases: ["Hammerhead"],
    category: "villain",
    affiliation: ["Maggia"],
    universe: ["sony"],
    /* NOT an ordinary human. A steel alloy plate surgically set into his skull. */
    species: "Mutate",
    powers: [
      { en: "A skull plated in steel", ar: "جمجمة مصفّحة بالفولاذ" },
      { en: "Charges head first", ar: "يندفع برأسه أولًا" },
      { en: "Runs a crime family", ar: "يدير عائلة إجرام" },
    ],
    origin: {
      en: "A gangster rebuilt after a beating with a steel alloy plate across his skull, who came out of surgery convinced he was a 1920s mob boss and has run his family that way ever since.",
      ar: "عصابيّ أُعيد بناؤه بعد ضربٍ مبرح بصفيحة من سبيكة فولاذية فوق جمجمته، فخرج من الجراحة مقتنعًا أنه زعيم مافيا من العشرينيات، وظل يدير عائلته على ذلك النحو.",
    },
    related: [
      { id: "kingpin", kind: "enemy" },
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "hydro-man",
    nameEn: "Hydro-Man",
    nameAr: "هيدرو مان",
    aliases: ["Hydro-Man"],
    category: "villain",
    affiliation: ["Sinister Six"],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Becomes water, entirely", ar: "يصير ماءً، بالكامل" },
      {
        en: "Cannot be held, hit or contained",
        ar: "لا يُمسك ولا يُضرب ولا يُحتوى",
      },
      { en: "Reforms from a puddle", ar: "يتشكل من بركة" },
      {
        en: "Floods a room to drown what is in it",
        ar: "يغرق غرفة ليخنق ما فيها",
      },
      {
        en: "Controls the water around him too",
        ar: "يتحكم بالماء من حوله أيضًا",
      },
      { en: "Heat is what takes him apart", ar: "الحرارة هي ما يفككه" },
    ],
    origin: {
      en: "A ship hand knocked overboard into an experimental discharge, who surfaced able to turn to water at will and found that nothing anyone throws at him stays thrown.",
      ar: "بحّار سقط من سفينته في تصريفٍ تجريبي، فطفا قادرًا على التحول إلى ماء متى شاء، ووجد أن لا شيء يُلقى عليه يبقى ملقى.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
      { id: "sandman", kind: "ally" },
    ],
  },
  {
    id: "molten-man",
    nameEn: "Molten Man",
    nameAr: "مولتن مان",
    aliases: ["Molten Man"],
    category: "villain",
    affiliation: ["Sinister Six"],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      {
        en: "Skin of molten alloy, always burning",
        ar: "جلد من سبيكة منصهرة، يحترق دائمًا",
      },
      { en: "Burns whatever he touches", ar: "يحرق كل ما يلمسه" },
      {
        en: "Strength and durability past human",
        ar: "قوة وصلابة تفوقان البشر",
      },
      { en: "Radiates enough heat to melt a car", ar: "يشع حرارة تذيب سيارة" },
      { en: "Cooling down is the hard part", ar: "التبريد هو الجزء الصعب" },
    ],
    origin: {
      en: "A lab assistant who stole an experimental alloy and wore it into his own skin, and now runs at a heat he cannot switch off. Staying cool enough to be near people is his whole struggle.",
      ar: "مساعد مختبر سرق سبيكة تجريبية فاندمجت في جلده، فصار يتّقد بحرارةٍ لا يستطيع إطفاءها. وأن يبرد بما يكفي ليقترب من الناس هو صراعه كله.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "silvermane",
    nameEn: "Silvermane",
    nameAr: "سيلفرمين",
    aliases: ["Silvermane"],
    category: "villain",
    affiliation: ["Maggia"],
    universe: ["sony"],
    species: "Cyborg",
    powers: [
      { en: "Ran the Maggia for decades", ar: "قاد المافيا عقودًا" },
      { en: "Rebuilt as a machine", ar: "أُعيد بناؤه آلة" },
      { en: "Terrified of dying", ar: "يرهبه الموت" },
    ],
    origin: {
      en: "An old crime boss who spent his fortune chasing ways not to die, and ended up keeping his head alive on a machine body. Every scheme he runs is about buying more time.",
      ar: "زعيم إجرام مسنّ أنفق ثروته بحثًا عن سبيل ألا يموت، فانتهى به الأمر يُبقي رأسه حيًّا على جسدٍ آلي. وكل مكيدة يحيكها إنما هي شراء مزيد من الوقت.",
    },
    related: [
      { id: "kingpin", kind: "enemy" },
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "beetle",
    nameEn: "Beetle",
    nameAr: "بيتل",
    aliases: ["Beetle"],
    category: "antihero",
    affiliation: ["Sinister Syndicate"],
    universe: ["sony"],
    species: "Human",
    powers: [
      { en: "An armoured flight suit", ar: "بدلة طيران مدرّعة" },
      { en: "Builds his own gear", ar: "يصنع عتاده بنفسه" },
      { en: "Better engineer than crook", ar: "مهندس أفضل منه لصًّا" },
    ],
    origin: {
      en: "A mechanic good enough to build a flying battlesuit in a garage and not quite good enough to stop robbing people with it. He keeps upgrading the armour and his luck stays the same.",
      ar: "ميكانيكي بارع بما يكفي ليصنع بدلة قتال طائرة في مرآب، وليس بارعًا بما يكفي ليكفّ عن السطو بها. يظلّ يطوّر الدرع ويظل حظه على حاله.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "boomerang",
    nameEn: "Boomerang",
    nameAr: "بوميرانغ",
    aliases: ["Boomerang"],
    category: "antihero",
    affiliation: ["Sinister Syndicate"],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Never misses a throw",
        ar: "لا يخطئ رمية قط",
      },
      {
        en: "Explosive, razor and gas boomerangs",
        ar: "بوميرانغات متفجرة وحادة وغازية",
      },
      {
        en: "They come back to his hand",
        ar: "تعود إلى يده",
      },
      {
        en: "Throws them round corners",
        ar: "يرميها من خلف الزوايا",
      },
      {
        en: "An athlete before he was a criminal",
        ar: "كان رياضيًا قبل أن يصير مجرمًا",
      },
      {
        en: "Talks his way out of the rest",
        ar: "ويتكلم ليخرج من الباقي",
      },
    ],
    origin: {
      en: "A washed-out pitcher who turned a perfect throwing arm into a criminal career, and survives mostly by being more useful alive than dead to whoever he has just betrayed.",
      ar: "رامي بيسبول فاشل حوّل ذراعًا لا تخطئ إلى مسيرة إجرامية، وينجو غالبًا لأنه حيًّا أنفع ممن خانهم للتوّ منه ميتًا.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "vermin",
    nameEn: "Vermin",
    nameAr: "فيرمين",
    aliases: ["Vermin"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Commands rats", ar: "يأمر الجرذان" },
      { en: "Claws and teeth", ar: "مخالب وأنياب" },
      { en: "Was a man once", ar: "كان إنسانًا يومًا" },
    ],
    origin: {
      en: "A man turned into something between a rat and a person by an experiment, who lives in the tunnels under the city and is more frightened than frightening once anyone slows down enough to see it.",
      ar: "رجل حوّلته تجربة إلى شيء بين الجرذ والإنسان، يعيش في أنفاق المدينة، وهو مذعور أكثر مما هو مُذعِر متى تمهّل أحد بما يكفي ليرى.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "demogoblin",
    nameEn: "Demogoblin",
    nameAr: "ديموغوبلن",
    aliases: ["Demogoblin"],
    category: "villain",
    affiliation: ["Magic"],
    universe: ["sony"],
    species: "Demon",
    magicSchools: ["infernal"],
    powers: [
      { en: "A demon on a glider", ar: "شيطان على منزلقة" },
      { en: "Judges the guilty", ar: "يحاكم المذنبين" },
      { en: "Pumpkin bombs of hellfire", ar: "قنابل يقطين من نار الجحيم" },
    ],
    origin: {
      en: "The demon half of a Hobgoblin split in two, which kept the weapons and the glider and decided it was sent to punish sinners. It is the rare goblin that thinks it is the hero.",
      ar: "النصف الشيطاني من هوبغوبلن انشطر شطرين، فاحتفظ بالسلاح والمنزلقة وقرّر أنه مُرسَل ليعاقب المذنبين. وهو الغوبلن النادر الذي يحسب نفسه البطل.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
      { id: "green-goblin", kind: "enemy" },
    ],
  },
  {
    id: "alistair-smythe",
    nameEn: "Alistair Smythe",
    nameAr: "أليستير سمايث",
    aliases: ["Alistair Smythe"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Builds Spider-Slayers, and better ones",
        ar: "يبني صائدي عناكب، وأفضل",
      },
      {
        en: "An exoskeleton grafted onto himself",
        ar: "هيكل خارجي مزروع في جسده",
      },
      {
        en: "Blades and claws that come out of it",
        ar: "نصال ومخالب تخرج منه",
      },
      {
        en: "Strength and durability from the shell",
        ar: "قوة وصلابة من القوقعة",
      },
      {
        en: "Controls a swarm of his own machines",
        ar: "يتحكم بسرب من آلاته",
      },
      {
        en: "Finished what his father started",
        ar: "أكمل ما بدأه أبوه",
      },
    ],
    origin: {
      en: "The son of the man who built the first Spider-Slayers, who blamed Spider-Man for his father's death and eventually turned himself into the machine rather than keep building them.",
      ar: "ابن الرجل الذي بنى أوائل قاتلي العنكبوت، حمّل سبايدرمان موت أبيه، وانتهى إلى أن حوّل نفسه إلى الآلة بدل أن يظلّ يصنعها.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "silver-sable",
    nameEn: "Silver Sable",
    nameAr: "سيلفر سيبل",
    aliases: ["Silver Sable"],
    category: "antihero",
    affiliation: ["Wild Pack"],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Runs a mercenary company",
        ar: "تدير شركة مرتزقة",
      },
      {
        en: "A marksman, and a martial artist",
        ar: "رامية ماهرة، وفنانة قتال",
      },
      {
        en: "A chai whip, and a vest under it",
        ar: "سوط تشاي، وسترة تحته",
      },
      {
        en: "Hunts war criminals for a state",
        ar: "تطارد مجرمي حرب لحساب دولة",
      },
      {
        en: "Commands the Wild Pack",
        ar: "تقود الوايلد باك",
      },
      {
        en: "Paid, and principled anyway",
        ar: "مأجورة، وذات مبدأ رغم ذلك",
      },
    ],
    origin: {
      en: "The head of a mercenary outfit and of a small nation that lives on its fees, who is neither an enemy nor a friend but whoever the contract says. She keeps her word exactly as written.",
      ar: "رئيسة شركة مرتزقة ودولةٍ صغيرة تعيش على أتعابها، ليست عدوة ولا صديقة بل ما يقوله العقد. وتفي بكلمتها كما كُتبت تمامًا.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "calypso",
    nameEn: "Calypso",
    nameAr: "كاليبسو",
    aliases: ["Calypso"],
    category: "villain",
    affiliation: ["Magic"],
    universe: ["sony"],
    species: "Human",
    /* A mystical object or rite, not equipment. */
    magicSchools: ["voodoo"],
    powers: [
      { en: "Voodoo and old rites", ar: "سحر الفودو وطقوس قديمة" },
      { en: "Bends a hunter's will", ar: "تلوي إرادة صيّاد" },
      { en: "Drums that carry", ar: "طبول تبلغ بعيدًا" },
    ],
    origin: {
      en: "A priestess who used Kraven as her instrument for years, steering his hunts with ritual and drums. When he was gone she went on hunting in his name.",
      ar: "كاهنة اتخذت كرايفن أداةً لها سنين، توجّه صيده بالطقوس والطبول. ولمّا مضى، مضت تصطاد باسمه.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
];

/**
 * MUTANTS, batch 3 of the supplied rosters — the ones a reader is most likely
 * to look for by name.
 *
 * Same affiliation rule as batch 2: no Avengers, Defenders, Fantastic Four,
 * Thunderbolts, X-Force, Guardians, Midnight Sons, Revengers or either Civil
 * War side. X-Men, X-Factor, New Mutants, Generation X, Morlocks and the
 * Hellfire Club are named where they are real, and left empty where they are
 * not.
 */
const namedMutants: CharacterDraft[] = [
  {
    id: "psylocke",
    nameEn: "Psylocke",
    nameAr: "سايلوك",
    aliases: ["Psylocke", "Betsy Braddock", "Elizabeth Braddock"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "alpha",
    powers: [
      {
        en: "A psychic knife, focused to a point",
        ar: "سكين نفسية، مركّزة إلى نقطة",
      },
      {
        en: "The totality of her telepathy in it",
        ar: "كل تخاطرها فيها",
      },
      {
        en: "Telepathy: reading, control, illusion",
        ar: "تخاطر: قراءة وسيطرة وأوهام",
      },
      {
        en: "Telekinesis, and a telekinetic katana",
        ar: "تحريك ذهني، وكاتانا ذهنية",
      },
      {
        en: "Psionic blades of solid psychic energy",
        ar: "نصال نفسية من طاقة صلبة",
      },
      {
        en: "A ninja, and an assassin before that",
        ar: "نينجا، وقاتلة قبل ذلك",
      },
    ],
    origin: {
      en: "A British telepath who was a model and a pilot before she was a fighter, and who spent years in a body that was not the one she was born in. The psychic knife is the focused totality of her power.",
      ar: "قارئة أفكار بريطانية كانت عارضة وطيّارة قبل أن تصير مقاتلة، وقضت سنين في جسدٍ ليس الذي وُلدت فيه. والسكين الذهنية هي مجموع قوتها مركّزًا.",
    },
    related: [
      { id: "professor-x", kind: "ally" },
      { id: "wolverine", kind: "ally" },
    ],
  },
  {
    id: "multiple-man",
    nameEn: "Multiple Man",
    nameAr: "مالتيبل مان",
    aliases: ["Multiple Man", "Jamie Madrox", "James Madrox"],
    category: "hero",
    affiliation: ["X-Factor"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Every impact makes a duplicate of him",
        ar: "كل ارتطام يصنع نسخة مكررة منه",
      },
      {
        en: "Each duplicate is awake, and its own man",
        ar: "كل نسخة واعية، وهي رجل بذاته",
      },
      {
        en: "They make their own dupes on impact",
        ar: "وهي تصنع نسخها عند الارتطام",
      },
      {
        en: "Reabsorbs one and keeps what it learned",
        ar: "يعيد امتصاص نسخة فيحتفظ بما تعلمته",
      },
      {
        en: "Sent dupes off to learn law and medicine",
        ar: "أرسل نسخًا لتتعلم القانون والطب",
      },
      {
        en: "Killing all of them is the hard part",
        ar: "قتلها جميعًا هو الجزء الصعب",
      },
    ],
    origin: {
      en: "A mutant who splits into a duplicate whenever he is struck, and who sent his copies out to learn medicine, law and combat before absorbing them back. Being a crowd is his whole method.",
      ar: "متحوّل ينقسم إلى نسخة كلما ضُرب، أرسل نسخه ليتعلّموا الطب والقانون والقتال ثم استعادهم. وأن يكون حشدًا هو منهجه كله.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "marrow",
    nameEn: "Marrow",
    nameAr: "مارو",
    aliases: ["Marrow"],
    category: "antihero",
    affiliation: ["Morlocks"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Grows excess bone all over her body",
        ar: "ينمو العظم الزائد في كل جسدها",
      },
      {
        en: "Snaps it off as blades and clubs",
        ar: "تكسره نصالًا وهراوات",
      },
      {
        en: "It regrows the moment she does",
        ar: "وينبت في اللحظة نفسها",
      },
      {
        en: "The protrusions armour her as well",
        ar: "والنتوءات تدرّعها أيضًا",
      },
      {
        en: "Strength, speed and a healing factor",
        ar: "قوة وسرعة وعامل شفاء",
      },
      {
        en: "Two hearts, so shooting one is not enough",
        ar: "قلبان، فإصابة أحدهما لا تكفي",
      },
    ],
    origin: {
      en: "A Morlock raised in the tunnels beneath the city, whose bones grow through her own skin and can be pulled out as blades. She learned early that the surface world was not going to be kind.",
      ar: "مورلوك نشأت في الأنفاق تحت المدينة، تنمو عظامها عبر جلدها وتُنتزع نصالًا. وتعلّمت مبكرًا أن عالم السطح لن يكون رحيمًا.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "forge",
    nameEn: "Forge",
    nameAr: "فورج",
    aliases: ["Forge"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    /**
     * OMEGA, WITH AN ASTERISK THAT MATTERS. House of X #1 used Forge as the
     * COUNTEREXAMPLE to Magneto: his technology could theoretically be
     * surpassed, and had been. He later built a machine that lets him reach
     * Omega-level technopathy while using it, which is how he joins the
     * compilation — machine-assisted rather than naturally classified.
     */
    mutantClass: "omega",
    powers: [
      {
        en: "Understands any machine on sight",
        ar: "يفهم أي آلة بمجرد رؤيتها",
      },
      {
        en: "Builds what should not exist yet",
        ar: "يبني ما لا ينبغي أن يوجد بعد",
      },
      {
        en: "Weapons, neutralisers, cybernetics",
        ar: "أسلحة ومعطّلات وأطراف آلية",
      },
      {
        en: "His genius is the mutation itself",
        ar: "عبقريته هي الطفرة نفسها",
      },
      {
        en: "Trained in shamanism, and works magic",
        ar: "تدرّب على الشامانية، ويعمل السحر",
      },
      {
        en: "A combat veteran, with cybernetic limbs",
        ar: "محارب قديم، بأطراف آلية",
      },
    ],
    origin: {
      en: "A Cheyenne engineer whose mutation is not a weapon but an understanding, since he looks at a machine and knows what it should be. Most of the X-Men's equipment exists because he made it.",
      ar: "مهندس من الشايان، طفرته ليست سلاحًا بل فهمًا: ينظر إلى آلة فيعرف ما ينبغي أن تكون. ومعظم عتاد الإكس مِن أنه صنعه.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "sage",
    nameEn: "Sage",
    nameAr: "سيج",
    aliases: ["Sage", "Tessa"],
    category: "hero",
    affiliation: ["X-Men", "Hellfire Club"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A mind that runs like a computer",
        ar: "عقل يعمل كالحاسوب",
      },
      {
        en: "Total recall, and instant calculation",
        ar: "ذاكرة تامة، وحساب فوري",
      },
      {
        en: "Detects a lie as it is spoken",
        ar: "تكشف الكذبة وهي تُقال",
      },
      {
        en: "Jump-starts latent powers in others",
        ar: "توقظ قدرات كامنة في الآخرين",
      },
      {
        en: "A telepath as well",
        ar: "ومتخاطرة أيضًا",
      },
      {
        en: "The best spy and hacker they have",
        ar: "أفضل جاسوسة ومخترقة لديهم",
      },
    ],
    origin: {
      en: "A living computer who spent decades inside the Hellfire Club as Xavier's spy, holding every detail she ever saw. She kept the secret so long that both sides had reason to doubt her.",
      ar: "حاسوب حيّ قضت عقودًا داخل نادي هيلفاير جاسوسةً لإكزافير، تحفظ كل تفصيل رأته. وكتمت السر طويلًا حتى صار لكلا الطرفين سبب للشك فيها.",
    },
    related: [
      { id: "professor-x", kind: "ally" },
      { id: "emma-frost", kind: "ally" },
    ],
  },
  {
    id: "karma",
    nameEn: "Karma",
    nameAr: "كارما",
    aliases: ["Karma"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Takes a mind, and moves the body",
        ar: "تستولي على عقل، وتحرك الجسد",
      },
      {
        en: "Uses that body's powers as her own",
        ar: "تستعمل قدرات ذلك الجسد كقدراتها",
      },
      {
        en: "Sees through their eyes while she does",
        ar: "ترى بعينيهم وهي تفعل",
      },
      {
        en: "Possesses several people at once",
        ar: "تتلبّس عدة أشخاص دفعة واحدة",
      },
      {
        en: "Her own body stands empty meanwhile",
        ar: "ويبقى جسدها فارغًا حينها",
      },
      {
        en: "A will strong enough to be worth stealing",
        ar: "إرادة قوية تستحق السرقة",
      },
    ],
    origin: {
      en: "A Vietnamese refugee and one of the first New Mutants, who can take over another person's body entirely. She treats the power as something close to a violation and uses it sparingly.",
      ar: "لاجئة فيتنامية وإحدى أوائل الميوتانتس الجدد، تستطيع السيطرة على جسد غيرها كاملًا. وتعدّ هذه القدرة أقرب إلى الانتهاك فلا تستعملها إلا نادرًا.",
    },
    related: [
      { id: "professor-x", kind: "ally" },
      { id: "magik", kind: "ally" },
    ],
  },
  {
    id: "husk",
    nameEn: "Husk",
    nameAr: "هَسك",
    aliases: ["Husk", "Paige Guthrie"],
    category: "hero",
    affiliation: ["Generation X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Tears off her skin to become something else",
        ar: "تنزع جلدها لتصير شيئًا آخر",
      },
      {
        en: "Steel, stone, rubber, diamond, glass",
        ar: "فولاذ وحجر ومطاط وألماس وزجاج",
      },
      {
        en: "She gets that material's strength",
        ar: "تكتسب قوة تلك المادة",
      },
      {
        en: "Dozens of substances, and the list grows",
        ar: "عشرات المواد، والقائمة تطول",
      },
      {
        en: "Sheds again to change again",
        ar: "تنسلخ ثانية لتتغير ثانية",
      },
      {
        en: "Vulnerable in the moment of the change",
        ar: "مكشوفة في لحظة التغيّر",
      },
    ],
    origin: {
      en: "Cannonball's younger sister, who shucks her skin to reveal a body of whatever she concentrates on: rock, metal, diamond. She pushed herself harder than anyone because she was following a brother who made it look easy.",
      ar: "أخت كانونبول الصغرى، تنزع جلدها لتكشف جسدًا مما تركّز عليه: صخرًا أو معدنًا أو ماسًا. وأجهدت نفسها أكثر من الجميع لأنها تتبع أخًا بدا الأمر عنده هيّنًا.",
    },
    related: [{ id: "cannonball", kind: "family" }],
  },
  {
    id: "siryn",
    nameEn: "Siryn",
    nameAr: "سايرن",
    aliases: ["Siryn", "Theresa Cassidy"],
    category: "hero",
    affiliation: ["X-Factor"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A sonic scream like her father's",
        ar: "صرخة صوتية كصرخة أبيها",
      },
      {
        en: "Blasts that shatter what they hit",
        ar: "قذائف تحطم ما تصيبه",
      },
      {
        en: "Rides her own sound waves in flight",
        ar: "تمتطي موجاتها الصوتية طيرانًا",
      },
      {
        en: "Echolocates with them, like sonar",
        ar: "تحدد المواقع بها، كالسونار",
      },
      {
        en: "A voice that compels you to obey",
        ar: "صوت يجبرك على الطاعة",
      },
      {
        en: "Immune to her own, and to his",
        ar: "محصّنة ضد صوتها وصوته",
      },
    ],
    origin: {
      en: "Banshee's daughter, with the same sonic scream and the same trouble deciding whether to be a hero because of him or in spite of him. She can fly on the sound she makes.",
      ar: "ابنة بانشي، ورثت الصرخة الصوتية نفسها والحيرة نفسها: أتكون بطلة بسببه أم رغمًا عنه. وتستطيع الطيران على الصوت الذي تصدره.",
    },
    related: [{ id: "banshee", kind: "family" }],
  },
  {
    id: "sunfire",
    nameEn: "Sunfire",
    nameAr: "سَنفاير",
    aliases: ["Sunfire", "Shiro Yoshida"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Ionises matter into superheated plasma",
        ar: "يؤيّن المادة بلازما فائقة الحرارة",
      },
      {
        en: "Flame blasts, and heat that melts",
        ar: "قذائف لهب، وحرارة تذيب",
      },
      {
        en: "Flies on his own thermal updrafts",
        ar: "يطير على تياراته الحرارية",
      },
      {
        en: "Resistant to his own fire, and most",
        ar: "مقاوم لناره، ولأكثرها",
      },
      {
        en: "Reaches temperatures few materials hold",
        ar: "يبلغ حرارات تعجز عنها أكثر المواد",
      },
      {
        en: "Plasma as hot as a star, and he flies in it",
        ar: "بلازما بحرارة نجم، ويطير فيها",
      },
    ],
    origin: {
      en: "A Japanese mutant who generates solar plasma and who has never been comfortable on a team, joining the X-Men briefly and leaving because his loyalty was to his country before any of them.",
      ar: "متحوّل ياباني يولّد بلازما شمسية، لم يرتح يومًا في فريق، انضم إلى الإكس مِن قليلًا ثم مضى لأن ولاءه لبلده قبلهم جميعًا.",
    },
    related: [{ id: "wolverine", kind: "ally" }],
  },
  {
    id: "morph",
    nameEn: "Morph",
    nameAr: "مورف",
    aliases: ["Morph", "Kevin Sydney", "Kevin Sidney", "Changeling"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Becomes anyone, face and voice both",
        ar: "يصير أي أحد، وجهًا وصوتًا",
      },
      {
        en: "Reshapes limbs into tools and weapons",
        ar: "يعيد تشكيل أطرافه أدوات وأسلحة",
      },
      {
        en: "Keeps his own skill in any shape",
        ar: "يحتفظ بمهارته في أي شكل",
      },
      {
        en: "Stretches and contorts, in some versions",
        ar: "يتمدد ويلتوي، في بعض النسخ",
      },
      {
        en: "The best infiltrator they have",
        ar: "أفضل متسلل لديهم",
      },
      {
        en: "And the worst at staying serious",
        ar: "وأسوأهم في الجدية",
      },
    ],
    origin: {
      en: "A shapeshifter who can take any form down to the voice, and who covers everything with a joke. The team's clown, which is a role people mistake for not caring.",
      ar: "متبدّل الشكل يتخذ أي هيئة حتى الصوت، ويغطي كل شيء بمزحة. مهرّج الفريق، وهو دور يخلط الناس بينه وبين قلة الاكتراث.",
    },
    related: [
      { id: "wolverine", kind: "ally" },
      { id: "professor-x", kind: "ally" },
    ],
  },
  {
    id: "mimic",
    nameEn: "Mimic",
    nameAr: "ميميك",
    aliases: ["Mimic", "Calvin Rankin"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Copies the powers of five at once",
        ar: "ينسخ قدرات خمسة دفعة واحدة",
      },
      {
        en: "At full strength, not a weaker version",
        ar: "بكامل قوتها، لا نسخة أضعف",
      },
      {
        en: "Carried all five original X-Men's powers",
        ar: "حمل قدرات الإكس-مِن الخمسة الأصليين",
      },
      {
        en: "Optic blasts, wings, ice and strength",
        ar: "أشعة بصرية وأجنحة وجليد وقوة",
      },
      {
        en: "Telekinesis with them",
        ar: "وتحريك ذهني معها",
      },
      {
        en: "Keeps their knowledge as well",
        ar: "ويحتفظ بمعارفهم أيضًا",
      },
    ],
    origin: {
      en: "A man who can hold the powers of five mutants at a time, and who was briefly the sixth X-Man before anyone was ready for him. He has spent his life being almost part of something.",
      ar: "رجل يحمل قوى خمسة متحوّلين في آن، وكان لفترة وجيزة سادس الإكس مِن قبل أن يكون أحد مستعدًا له. وقضى عمره على وشك الانتماء إلى شيء.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "madelyne-pryor",
    nameEn: "Madelyne Pryor",
    nameAr: "مادلين برايور",
    aliases: ["Madelyne Pryor", "Goblin Queen", "The Goblin Queen"],
    /* ANTIVILLAIN. Grown to be a vessel, married Cyclops and bore his son before learning what she was. Everything after is an answer to being made as a substitute. */
    category: "antivillain",
    affiliation: [],
    universe: ["fox"],
    species: "Clone",
    powers: [
      {
        en: "Jean Grey's telepathy and telekinesis",
        ar: "تخاطر جين غراي وتحريكها الذهني",
      },
      {
        en: "Rules Limbo, and its demon armies",
        ar: "تحكم ليمبو وجيوشها الشيطانية",
      },
      {
        en: "The Scythe of Sorrows, made of her pain",
        ar: "منجل الأحزان، مصنوع من ألمها",
      },
      {
        en: "Summons goblins and demons at will",
        ar: "تستدعي الغيلان والشياطين كما تشاء",
      },
      { en: "Carried a fragment of the Phoenix", ar: "حملت شظية من الفينيكس" },
      { en: "Made, not born", ar: "صُنعت ولم تُولد" },
    ],
    origin: {
      en: "A clone of Jean Grey grown to be a vessel, who married Cyclops and had his son before learning what she was. Everything she does afterwards is an answer to being made as a substitute.",
      ar: "نسخة من جين غراي أُنميت لتكون وعاءً، تزوّجت سايكلوبس وأنجبت ابنه قبل أن تعرف ما هي. وكل ما فعلته بعد ذلك جواب عن كونها صُنعت بديلًا.",
    },
    related: [
      { id: "cyclops", kind: "family" },
      { id: "jean-grey", kind: "variant", variantOrigin: "clone" },
    ],
  },
];

/**
 * THE INHERITORS, plus Silk, Kaine, Spider-UK and Omega Red, batch 4.
 *
 * The Inheritors are the Spider-Verse's own cosmic villains: one family that
 * hunts spider-totems across every reality and eats their life-force. They
 * belong together and are written together, which is also why they share a
 * power set — what distinguishes them is method, not ability.
 *
 * Affiliation rule unchanged: Inheritors and Spider-Society are real and are
 * named; nothing here carries any of the ten excluded team labels.
 */
const inheritors: CharacterDraft[] = [
  {
    id: "omega-red",
    nameEn: "Omega Red",
    nameAr: "أوميغا ريد",
    aliases: ["Omega Red", "Arkady Rossovich"],
    category: "villain",
    affiliation: ["Brotherhood", "Weapon X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Carbonadium coils in both arms",
        ar: "ملفات كاربونيديوم في ذراعيه",
      },
      {
        en: "Death spores that kill a man in seconds",
        ar: "أبواغ موت تقتل رجلًا في ثوانٍ",
      },
      {
        en: "Drains life, and heals faster for it",
        ar: "يمتص الحياة، فيشفى أسرع",
      },
      {
        en: "Ten tons of strength, and no fatigue",
        ar: "قوة عشرة أطنان، وبلا تعب",
      },
      {
        en: "Fought Wolverine for eighteen hours",
        ar: "قاتل وولفرين ثماني عشرة ساعة",
      },
      {
        en: "Must keep draining, or the metal kills him",
        ar: "عليه أن يواصل الامتصاص وإلا قتله المعدن",
      },
    ],
    origin: {
      en: "A Soviet serial killer turned into a weapon, wound with living metal coils and cursed with a spore that kills everything near him unless he drains a life to keep it down.",
      ar: "قاتل متسلسل سوفييتي حُوّل إلى سلاح، لُفّ بملفات معدنية حية ولُعن ببوغٍ يقتل كل من حوله ما لم يمتص حياةً ليكبحه.",
    },
    related: [{ id: "wolverine", kind: "enemy" }],
  },
  {
    id: "silk",
    nameEn: "Silk",
    nameAr: "سِلك",
    aliases: ["Silk", "Cindy Moon"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Bitten by the same spider", ar: "لدغتها العنكبوت نفسها" },
      { en: "Spins silk from her fingers", ar: "تغزل الحرير من أصابعها" },
      { en: "A warning sense sharper than his", ar: "حسّ إنذار أحدّ من حسّه" },
    ],
    origin: {
      en: "Bitten by the same spider that bit Peter Parker, then shut in a bunker for over a decade to hide her scent from things that hunt spiders. She came out with the powers and none of the practice.",
      ar: "لدغتها العنكبوت نفسها التي لدغت بيتر باركر، ثم حُبست في قبو أكثر من عقد لإخفاء أثرها عمّن يصطاد العناكب. فخرجت بالقوى دون شيء من المِران.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "kaine",
    nameEn: "Kaine",
    nameAr: "كين",
    aliases: ["Kaine", "Kaine Parker"],
    /* REAL AND UNCREDITED, like the Silver Surfer in the 1967 series. TMDB
       lists 66 credits for Ultimate Spider-Man and none of them is this
       character, who is a New Warrior across seasons 3 and 4. */
    alsoIn: ["ultimate-spider-man"],
    category: "antihero",
    affiliation: ["Spider-Society", "New Warriors"],
    universe: ["sony"],
    species: "Clone",
    powers: [
      { en: "The first flawed clone", ar: "أول نسخة معيبة" },
      { en: "Marks his kills", ar: "يسم قتلاه" },
      { en: "Stronger than the original", ar: "أقوى من الأصل" },
    ],
    origin: {
      en: "The first attempt at cloning Peter Parker, kept alive but degrading, who spent years hating the man he was copied from before deciding to be something better than either of them.",
      ar: "أول محاولة لاستنساخ بيتر باركر، أُبقي حيًّا وهو يتحلّل، أمضى سنين يكره من نُسخ عنه قبل أن يقرّر أن يكون خيرًا منهما معًا.",
    },
    related: [{ id: "spider-man", kind: "variant", variantOrigin: "clone" }],
  },
  {
    id: "morlun",
    nameEn: "Morlun",
    nameAr: "مورلون",
    aliases: ["Morlun"],
    category: "villain",
    affiliation: ["Inheritors"],
    universe: ["sony"],
    reality: "Earth-001",
    species: "Inheritor",
    powers: [
      {
        en: "The one who nearly finished Spider-Man",
        ar: "من كاد يُنهي سبايدرمان",
      },
      {
        en: "Tracks a totem across any distance",
        ar: "يتعقب طوطمًا عبر أي مسافة",
      },
      { en: "Eats a spider's life-force", ar: "يلتهم قوة حياة العنكبوت" },
      { en: "Comes back from almost any wound", ar: "يعود من أي جرح تقريبًا" },
      { en: "Crosses realities to hunt", ar: "يعبر الوقائع للصيد" },
    ],
    origin: {
      en: "The eldest hunter of the Inheritors, who tracks a spider by its life-force and has been eating totems for centuries. He does not rush, because he has never needed to.",
      ar: "أكبر صيّادي الورثة، يتتبّع العنكبوت بأثر حياته، ويأكل الطواطم منذ قرون. لا يتعجّل لأنه لم يحتج إلى العجلة قط.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "solus",
    nameEn: "Solus",
    nameAr: "سولوس",
    aliases: ["Solus"],
    category: "villain",
    affiliation: ["Inheritors"],
    universe: ["sony"],
    reality: "Earth-001",
    species: "Inheritor",
    powers: [
      /* THE EIGHT INHERITORS HAD THE SAME THREE BULLETS, word for word:
         "Eats a spider's life-force / Heals almost anything / Crosses
         realities to hunt". Eight characters, one record, so they sorted into
         a block by construction. Rashid's point about the Eternals applies
         harder here -- being the same kind is not a reason to be adjacent,
         and these eight are a father, a scientist, a huntsman, a brute, twins
         and an outcast. */
      {
        en: "The patriarch, and the strongest of them",
        ar: "البطريرك، وأقواهم",
      },
      {
        en: "Drains a totem dry in one feeding",
        ar: "يستنزف طوطمًا في وجبة واحدة",
      },
      {
        en: "Strength and durability past his children",
        ar: "قوة وصلابة تفوق أبناءه",
      },
      { en: "Heals almost anything", ar: "يشفى من أي شيء تقريبًا" },
      { en: "Crosses realities to hunt", ar: "يعبر الوقائع للصيد" },
    ],
    origin: {
      en: "The patriarch of the Inheritors and the strongest of them, who fathered the family that hunts spiders across every reality and treats the Great Web as a table set for him.",
      ar: "بطريرك الورثة وأقواهم، أنجب العائلة التي تصطاد العناكب في كل واقع، ويعدّ الشبكة الكبرى مائدة مُعدّة له.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "verna",
    nameEn: "Verna",
    nameAr: "فيرنا",
    aliases: ["Verna"],
    category: "villain",
    affiliation: ["Inheritors"],
    universe: ["sony"],
    reality: "Earth-001",
    species: "Inheritor",
    powers: [
      {
        en: "Leads the hunt, and keeps the hounds",
        ar: "تقود الصيد وتمسك الكلاب",
      },
      {
        en: "Runs a totem down before it can turn",
        ar: "تُنهك الطوطم قبل أن يلتفت",
      },
      { en: "Eats a spider's life-force", ar: "تلتهم قوة حياة العنكبوت" },
      { en: "Heals almost anything", ar: "تشفى من أي شيء تقريبًا" },
    ],
    origin: {
      en: "The Inheritor who hunts with a pack of hounds and enjoys the chase more than the meal, running her prey to exhaustion across worlds before she closes.",
      ar: "الوريثة التي تصطاد بقطيع كلاب وتستمتع بالمطاردة أكثر من الوليمة، تُنهك فريستها عبر العوالم قبل أن تُطبق.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "daemos",
    nameEn: "Daemos",
    nameAr: "دايموس",
    aliases: ["Daemos"],
    category: "villain",
    affiliation: ["Inheritors"],
    universe: ["sony"],
    reality: "Earth-001",
    species: "Inheritor",
    powers: [
      {
        en: "The heaviest hitter of the family",
        ar: "أعنفهم ضربًا في العائلة",
      },
      {
        en: "Tears a totem apart before feeding",
        ar: "يمزق الطوطم قبل أن يلتهمه",
      },
      { en: "Enormous strength, and no restraint", ar: "قوة هائلة، وبلا كابح" },
      { en: "Heals almost anything", ar: "يشفى من أي شيء تقريبًا" },
    ],
    origin: {
      en: "The heaviest of the Inheritors, who kills by walking through whatever is in the way. Where his siblings hunt, he simply arrives.",
      ar: "أثقل الورثة، يقتل بأن يمشي عبر ما يعترضه. فبينما يصطاد إخوته، هو يصل فحسب.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "jennix",
    nameEn: "Jennix",
    nameAr: "جينيكس",
    aliases: ["Jennix"],
    category: "villain",
    affiliation: ["Inheritors"],
    universe: ["sony"],
    reality: "Earth-001",
    species: "Inheritor",
    powers: [
      {
        en: "Clones himself, so killing him does nothing",
        ar: "يستنسخ نفسه، فقتله لا يجدي",
      },
      {
        en: "A scientist before he is a hunter",
        ar: "عالِم قبل أن يكون صيادًا",
      },
      { en: "Eats a spider's life-force", ar: "يلتهم قوة حياة العنكبوت" },
      { en: "Crosses realities to hunt", ar: "يعبر الوقائع للصيد" },
    ],
    origin: {
      en: "The Inheritor who keeps laboratories in every reality and backups of himself in all of them, so that killing him has never once been permanent.",
      ar: "الوريث الذي يحفظ مختبرات في كل واقع ونسخًا احتياطية من نفسه فيها جميعًا، فلم يكن قتله دائمًا قط.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "brix",
    nameEn: "Brix",
    nameAr: "بريكس",
    aliases: ["Brix"],
    category: "villain",
    affiliation: ["Inheritors"],
    universe: ["sony"],
    reality: "Earth-001",
    species: "Inheritor",
    powers: [
      { en: "Hunts as one half of a pair", ar: "يصطاد بوصفه نصف ثنائي" },
      { en: "Younger, and hungrier for it", ar: "أصغر، وأشد جوعًا لذلك" },
      { en: "Eats a spider's life-force", ar: "يلتهم قوة حياة العنكبوت" },
    ],
    origin: {
      en: "One of the younger Inheritors, who hunts alongside Bora and treats the whole thing as sport. The recklessness is real and so is the appetite.",
      ar: "أحد الورثة الصغار، يصطاد مع بورا ويعدّ الأمر كله رياضة. والتهوّر حقيقي، والشهية كذلك.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "bora",
    nameEn: "Bora",
    nameAr: "بورا",
    aliases: ["Bora"],
    category: "villain",
    affiliation: ["Inheritors"],
    universe: ["sony"],
    reality: "Earth-001",
    species: "Inheritor",
    powers: [
      {
        en: "Hunts as the other half of a pair",
        ar: "تصطاد بوصفها النصف الآخر",
      },
      { en: "Younger, and less careful for it", ar: "أصغر، وأقل حذرًا لذلك" },
      { en: "Eats a spider's life-force", ar: "تلتهم قوة حياة العنكبوت" },
    ],
    origin: {
      en: "One of the younger Inheritors, who hunts with Brix and shares his taste for making a game of it. Together they are less careful than the elders and no less lethal.",
      ar: "إحدى الورثة الصغار، تصطاد مع بريكس وتشاركه لذّة أن يجعلا منه لعبة. وهما معًا أقل حذرًا من الكبار ولا أقل فتكًا.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "karn",
    nameEn: "Karn",
    nameAr: "كارن",
    aliases: ["Karn"],
    category: "antihero",
    affiliation: ["Inheritors"],
    universe: ["sony"],
    reality: "Earth-001",
    species: "Inheritor",
    powers: [
      {
        en: "The outcast the others hunted first",
        ar: "المنبوذ الذي طاردوه أولًا",
      },
      {
        en: "Took the Master Weaver's chair in the end",
        ar: "اعتلى مقعد النسّاج الأعظم أخيرًا",
      },
      { en: "Eats a spider's life-force", ar: "يلتهم قوة حياة العنكبوت" },
      { en: "Heals almost anything", ar: "يشفى من أي شيء تقريبًا" },
    ],
    origin: {
      en: "The Inheritor his family cast out and made to wear a mask, who was sent to hunt spiders and ended up standing with them. He inherited the Web he was told to feed on.",
      ar: "الوريث الذي نبذته عائلته وألزمته قناعًا، أُرسل ليصطاد العناكب فانتهى واقفًا معها. وورث الشبكة التي قيل له أن يقتات عليها.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "spider-uk",
    nameEn: "Spider-UK",
    nameAr: "سبايدر يوكي",
    aliases: ["Spider-UK", "Billy Braddock", "William Braddock"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-833",
    species: "Mutate",
    powers: [
      { en: "Captain Britain of his Earth", ar: "كابتن بريطانيا في أرضه" },
      { en: "Walks between realities", ar: "يمشي بين الوقائع" },
      { en: "Gathered the Web Warriors", ar: "جمع محاربي الشبكة" },
    ],
    origin: {
      en: "The Captain Britain of a world where the Corps recruited a Spider-Man, who noticed spiders vanishing across realities and went looking for the survivors before anyone else knew there was a hunt.",
      ar: "كابتن بريطانيا في عالمٍ جنّد فيه الفيلق سبايدرمان، لاحظ اختفاء العناكب عبر الوقائع فمضى يبحث عن الناجين قبل أن يعلم أحد بوجود صيد.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
];

/**
 * THE LIFE FOUNDATION FIVE AND THE GOBLIN EDGES, batch 5.
 *
 * TWO ENTRIES ON THE SUPPLIED ROSTER ARE NOT PEOPLE. Kindred is Harry Osborn
 * revealed, and the Red Goblin is Norman wearing Carnage. Both are listed as
 * separate characters and both would have been duplicate records of men this
 * corpus already holds, so they went on as ALIASES instead. This file holds
 * people, not costumes: Banner and the Hulk are one record for the same
 * reason, and so are Marc Spector and Mr. Knight.
 *
 * `symbioteClass` does real work here. The Life Foundation four are `spawn`,
 * harvested in a lab rather than born, which is exactly why they lack what a
 * true descendant inherits. Sleeper, Mania, Dylan's Venom and Scorn are
 * `lineage`, born of Venom or Carnage.
 */
const lifeFoundation: CharacterDraft[] = [
  {
    id: "lasher",
    nameEn: "Lasher",
    nameAr: "لاشر",
    aliases: ["Lasher"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "spawn",
    powers: [
      { en: "Whips of living tendril", ar: "سياط من محلاق حيّ" },
      { en: "Cut from Venom in a lab", ar: "انتُزع من فينوم في مختبر" },
      { en: "Bonds to a soldier", ar: "يرتبط بجندي" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
    ],
    origin: {
      en: "One of five symbiotes forced out of Venom by Life Foundation scientists who wanted their own. Harvested rather than born, which is why it lacks what a true offspring inherits.",
      ar: "أحد خمسة سيمبيوتات انتُزعت من فينوم على يد علماء مؤسسة الحياة أرادوا واحدًا لأنفسهم. حُصد ولم يولد، ولهذا يفتقر إلى ما يرثه المولود الحقيقي.",
    },
    related: [{ id: "venom", kind: "family" }],
  },
  {
    id: "phage",
    nameEn: "Phage",
    nameAr: "فيج",
    aliases: ["Phage"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "spawn",
    powers: [
      { en: "Blades from every limb", ar: "نصال من كل طرف" },
      { en: "Cut from Venom in a lab", ar: "انتُزع من فينوم في مختبر" },
      { en: "Yellow and serrated", ar: "أصفر ومسنّن" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
    ],
    origin: {
      en: "Another of the Life Foundation five, taken from Venom by force and grown into a weapon. It shapes its whole body into edges rather than hands.",
      ar: "آخر من خمسة مؤسسة الحياة، أُخذ من فينوم قسرًا وأُنمي سلاحًا. يشكّل جسده كله حوافّ بدل أن يكون أيديًا.",
    },
    related: [{ id: "venom", kind: "family" }],
  },
  {
    id: "sleeper",
    nameEn: "Sleeper",
    nameAr: "سليبر",
    aliases: ["Sleeper"],
    category: "antihero",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "lineage",
    powers: [
      { en: "Born, not harvested", ar: "وُلد ولم يُحصد" },
      { en: "Changes shape at will", ar: "يبدّل شكله كما يشاء" },
      { en: "Wants no host at all", ar: "لا يريد مضيفًا أصلًا" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
    ],
    origin: {
      en: "Venom's own offspring, and the first of the line to decide it did not want a host. It left to find out what a symbiote is when nobody is riding it.",
      ar: "ابن فينوم نفسه، وأول في السلالة يقرّر أنه لا يريد مضيفًا. مضى ليعرف ما يكون السيمبيوت حين لا يركبه أحد.",
    },
    related: [{ id: "venom", kind: "family" }],
  },
  {
    id: "mania",
    nameEn: "Mania",
    nameAr: "مانيا",
    aliases: ["Mania", "Andi Benton", "Andrea Benton"],
    category: "antihero",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "lineage",
    powers: [
      { en: "A shard of Venom's own", ar: "شظية من فينوم نفسه" },
      { en: "Hellmark burning under it", ar: "وسم جحيم يتّقد تحته" },
      { en: "Younger than the job", ar: "أصغر من المهمة" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
    ],
    origin: {
      en: "A teenager given a piece of the Venom symbiote by Flash Thompson to protect her, who turned out to be carrying something older and angrier underneath it.",
      ar: "مراهقة أعطاها فلاش طومسون قطعة من سيمبيوت فينوم لتحميها، فتبيّن أنها تحمل تحته شيئًا أقدم وأشدّ غضبًا.",
    },
    related: [{ id: "venom", kind: "family" }],
  },
  {
    id: "hybrid",
    nameEn: "Hybrid",
    nameAr: "هايبرد",
    aliases: ["Hybrid", "Scott Washington"],
    category: "antihero",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "gestalt",
    powers: [
      { en: "Four symbiotes in one", ar: "أربعة سيمبيوتات في واحد" },
      { en: "Argues with itself", ar: "يخاصم نفسه" },
      { en: "Bonded to a wounded man", ar: "ارتبط برجل جريح" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
    ],
    origin: {
      en: "Four of the Life Foundation symbiotes merged into a single creature and bonded to a paralysed man, who could walk again as long as the four inside him agreed on anything.",
      ar: "أربعة من سيمبيوتات مؤسسة الحياة اندمجت في كائن واحد وارتبطت برجل مشلول، صار يمشي ما دام الأربعة في داخله متفقين على شيء.",
    },
    related: [{ id: "venom", kind: "family" }],
  },
  {
    id: "dylan-brock",
    nameEn: "Dylan Brock",
    nameAr: "ديلان بروك",
    aliases: ["Dylan Brock"],
    category: "hero",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "lineage",
    powers: [
      { en: "Commands symbiotes outright", ar: "يأمر السيمبيوتات مباشرة" },
      { en: "Fire and sound do not touch him", ar: "لا تمسّه النار ولا الصوت" },
      { en: "Carries Venom now", ar: "يحمل فينوم الآن" },
    ],
    origin: {
      en: "Eddie Brock's son, born with an authority over symbiotes his father never had, who took up Venom while Eddie was elsewhere and found the suit answered him differently.",
      ar: "ابن إيدي بروك، وُلد بسلطان على السيمبيوتات لم يملكه أبوه، حمل فينوم حين كان إيدي في مكان آخر فوجد البدلة تجيبه على نحو مختلف.",
    },
    related: [{ id: "venom", kind: "family" }],
  },
  {
    id: "scorn",
    nameEn: "Scorn",
    nameAr: "سكورن",
    aliases: ["Scorn", "Tanis Nieves"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "lineage",
    powers: [
      { en: "Grown from Carnage", ar: "نبت من كارنيج" },
      { en: "Merges with machinery", ar: "يندمج بالآلات" },
      { en: "Bonded to a psychiatrist", ar: "ارتبط بطبيبة نفسية" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
    ],
    origin: {
      en: "A piece of Carnage that attached itself to the psychiatrist sent to treat its host, and fused with her prosthetic arm before taking the rest of her.",
      ar: "قطعة من كارنيج علقت بالطبيبة النفسية المرسَلة لعلاج مضيفه، فاندمجت بذراعها الاصطناعية قبل أن تأخذ سائرها.",
    },
    related: [{ id: "carnage", kind: "family" }],
  },
  {
    id: "chameleon",
    nameEn: "Chameleon",
    nameAr: "كاميليون",
    aliases: ["Chameleon", "Dmitri Smerdyakov", "The Chameleon"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Wears anyone's face perfectly",
        ar: "يرتدي وجه أي أحد تمامًا",
      },
      {
        en: "A mask film that reshapes itself",
        ar: "غشاء قناع يعيد تشكيل نفسه",
      },
      {
        en: "Mimics a voice as well as a face",
        ar: "يحاكي الصوت كما يحاكي الوجه",
      },
      {
        en: "Memory gas that rewrites an hour",
        ar: "غاز ذاكرة يعيد كتابة ساعة",
      },
      {
        en: "Fooled the Avengers more than once",
        ar: "خدع الأفنجرز أكثر من مرة",
      },
      {
        en: "Kraven's brother, and the quieter one",
        ar: "أخو كرافن، والأهدأ منه",
      },
    ],
    origin: {
      en: "A master of disguise who can pass as anyone he has had time to study, and who was the first foe Spider-Man ever faced. Being nobody in particular is the closest thing he has to a self.",
      ar: "سيّد التنكّر، يمرّ بوصفه أي أحد أتيح له أن يدرسه، وكان أول خصم واجهه سبايدرمان. وأن يكون لا أحد بعينه هو أقرب ما يملك إلى ذات.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "menace",
    nameEn: "Menace",
    nameAr: "مِناس",
    aliases: ["Menace", "Lily Hollister"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "A goblin serum, self-taken", ar: "مصل غوبلن تناولته بنفسها" },
      { en: "Glider and pumpkin bombs", ar: "منزلقة وقنابل يقطين" },
      { en: "Harry Osborn's girlfriend", ar: "حبيبة هاري أوزبورن" },
    ],
    origin: {
      en: "Harry Osborn's girlfriend, who found one of Norman's serums and took it deliberately, then used the transformation to run her father's election from the other side.",
      ar: "حبيبة هاري أوزبورن، وجدت أحد أمصال نورمان وتناولته عن عمد، ثم استعملت التحوّل لتدير حملة أبيها الانتخابية من الجهة الأخرى.",
    },
    related: [
      { id: "harry-osborn", kind: "enemy" },
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "phil-urich",
    nameEn: "Phil Urich",
    nameAr: "فيل يوريك",
    aliases: ["Phil Urich", "Phillip Urich"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Found the goblin gear, and kept it",
        ar: "وجد عتاد الغول، واحتفظ به",
      },
      {
        en: "A glider, and pumpkin bombs with it",
        ar: "حوّامة، وقنابل يقطينية معها",
      },
      {
        en: "Gauntlets that fire a sonic scream",
        ar: "قفازات تطلق صرخة صوتية",
      },
      {
        en: "Strength from a formula he took later",
        ar: "قوة من صيغة تناولها لاحقًا",
      },
      {
        en: "Was a hero in it first",
        ar: "كان بطلًا بها أولًا",
      },
      {
        en: "The laugh came with the mask",
        ar: "الضحكة جاءت مع القناع",
      },
    ],
    origin: {
      en: "A reporter's nephew who found a goblin's abandoned equipment and used it as a hero for a while before the mask started deciding things for him.",
      ar: "ابن أخي صحفي، عثر على عتاد غوبلن متروك واستعمله بطلًا مدة، قبل أن يبدأ القناع يقرّر عنه.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
];

/**
 * THE ELDERS OF THE UNIVERSE, batch 6 — the last coherent group on the cosmic
 * list, and the one the master document places at the BOTTOM of the cosmic
 * hierarchy despite the name.
 *
 * They are the last survivors of their species, each of whom stayed sane
 * across millions of years by fixing on a single obsession and never letting
 * go of it. That is the whole species trait and it is why their names are
 * jobs: the Collector collects, the Grandmaster plays, the Champion fights,
 * the Caregiver sits with the dying. Both of the ones already here arrived
 * through Marvel Studios; these ten never have.
 */
const elders: CharacterDraft[] = [
  {
    id: "the-champion",
    nameEn: "The Champion",
    nameAr: "البطل",
    aliases: ["The Champion", "Tryco Slatterus"],
    category: "antivillain",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      {
        en: "Unbeaten for millions of years",
        ar: "لم يُهزم منذ ملايين السنين",
      },
      { en: "Fights only worthy opponents", ar: "لا يقاتل إلا كفؤًا" },
      { en: "Refuses to use powers", ar: "يأبى استعمال قواه" },
    ],
    origin: {
      en: "An Elder who spent his immortality learning to fight and now travels between worlds looking for someone who can last. He will not use his cosmic power in a bout, because that would spoil it.",
      ar: "شيخ أنفق خلوده في تعلّم القتال، وصار يجول بين العوالم باحثًا عمّن يصمد. ويأبى استعمال قوته الكونية في نزال، لأن ذلك يفسده.",
    },
    related: [{ id: "hulk", kind: "enemy" }],
  },
  {
    id: "the-gardener",
    nameEn: "The Gardener",
    nameAr: "البستاني",
    aliases: ["The Gardener", "Ord Zyonz"],
    category: "supporting",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Grows life on dead worlds", ar: "ينبت الحياة في عوالم ميتة" },
      { en: "Held the Time Stone", ar: "حمل حجر الزمن" },
      { en: "Prefers plants to people", ar: "يؤثر النبات على الناس" },
    ],
    origin: {
      en: "An Elder who has spent millions of years planting gardens on dead worlds, and who used an Infinity Stone mostly to help things grow. Of all of them he is the least interested in power.",
      ar: "شيخ أمضى ملايين السنين يغرس الحدائق في عوالم ميتة، واستعمل حجر لانهاية في إنماء الأشياء أكثر من أي شيء. وهو أقلهم جميعًا اهتمامًا بالسلطان.",
    },
    related: [{ id: "the-collector", kind: "family" }],
  },
  {
    id: "the-contemplator",
    nameEn: "The Contemplator",
    nameAr: "المتأمّل",
    aliases: ["The Contemplator", "Tath Ki"],
    category: "supporting",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Millions of years of thought", ar: "ملايين السنين من التأمل" },
      { en: "Reads minds and futures", ar: "يقرأ العقول والمآلات" },
      { en: "Meddles more than he admits", ar: "يتدخّل أكثر مما يعترف" },
    ],
    origin: {
      en: "An Elder who chose contemplation as his obsession and has been thinking without pause ever since, though he intervenes in other people's affairs far more often than a contemplative should.",
      ar: "شيخ اختار التأمّل هوسًا له فما انفكّ يفكّر منذ ذلك الحين، وإن كان يتدخّل في شؤون غيره أكثر بكثير مما يليق بمتأمّل.",
    },
    related: [{ id: "the-collector", kind: "family" }],
  },
  {
    id: "the-astronomer",
    nameEn: "The Astronomer",
    nameAr: "الفلكي",
    aliases: ["The Astronomer", "Ecce"],
    category: "supporting",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Charts every star there is", ar: "يرسم كل نجم موجود" },
      { en: "Reads what the sky will do", ar: "يقرأ ما ستفعله السماء" },
      { en: "Found Galactus a world", ar: "دلّ جالاكتوس على عالم" },
    ],
    origin: {
      en: "An Elder who maps the heavens and reads what is coming in them. He is the one who pointed Galactus at a planet, which is a thing an astronomer can do and a thing he has to live with.",
      ar: "شيخ يرسم خرائط السماوات ويقرأ ما هو آتٍ فيها. وهو من دلّ جالاكتوس على كوكب، وذلك ما يقدر عليه فلكيّ وما عليه أن يعيش به.",
    },
    related: [{ id: "galactus", kind: "ally" }],
  },
  {
    id: "the-possessor",
    nameEn: "The Possessor",
    nameAr: "الحائز",
    aliases: ["The Possessor", "Kamo Tharnn"],
    category: "supporting",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Hoards knowledge, not things", ar: "يكنز المعرفة لا الأشياء" },
      { en: "Held the Power Stone", ar: "حمل حجر القوة" },
      { en: "Guards what he has learned", ar: "يحرس ما تعلّمه" },
    ],
    origin: {
      en: "An Elder who collects knowledge the way the Collector gathers objects, keeping every fact he has ever acquired and parting with almost none of it.",
      ar: "شيخ يجمع المعرفة كما يجمع الجامع الأشياء، يحفظ كل حقيقة حصّلها ولا يفرّط في شيء منها تقريبًا.",
    },
    related: [{ id: "the-collector", kind: "family" }],
  },
  {
    id: "the-trader",
    nameEn: "The Trader",
    nameAr: "التاجر",
    aliases: ["The Trader", "Cort Zo Tinnus"],
    category: "supporting",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Bargains across galaxies", ar: "يساوم عبر المجرّات" },
      { en: "Never takes a bad deal", ar: "لا يقبل صفقة خاسرة" },
      { en: "Everything has a price", ar: "لكل شيء ثمن" },
    ],
    origin: {
      en: "An Elder whose obsession is the deal itself rather than anything he gains from it. He has been trading long enough that entire civilisations have been the currency.",
      ar: "شيخ هوسه الصفقة ذاتها لا ما يكسبه منها. وقد ظل يقايض حتى صارت حضارات بأكملها عملةً في يديه.",
    },
    related: [{ id: "the-collector", kind: "family" }],
  },
  {
    id: "the-explorer",
    nameEn: "The Explorer",
    nameAr: "المستكشف",
    aliases: ["The Explorer", "Zamanathan Rambunazeth"],
    category: "supporting",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Goes where nothing has been", ar: "يمضي حيث لم يمضِ شيء" },
      { en: "Never stays anywhere", ar: "لا يستقر في مكان" },
      { en: "Older than most stars", ar: "أقدم من معظم النجوم" },
    ],
    origin: {
      en: "An Elder who has spent his immortality moving, on the reasoning that a universe this large would be wasted on anyone who settled. He has outlasted most of the places he has seen.",
      ar: "شيخ أنفق خلوده متنقلًا، بحجة أن كونًا بهذا الاتساع يضيع على من يستقرّ. وقد بقي بعد معظم الأماكن التي رآها.",
    },
    related: [{ id: "the-collector", kind: "family" }],
  },
  {
    id: "the-caregiver",
    nameEn: "The Caregiver",
    nameAr: "الراعية",
    aliases: ["The Caregiver", "Rubanna Quormo"],
    category: "supporting",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Tends the dying", ar: "ترعى المحتضرين" },
      { en: "Sits with whole species", ar: "تجلس مع أنواع بأكملها" },
      { en: "Outlived everyone she nursed", ar: "بقيت بعد كل من مرّضت" },
    ],
    origin: {
      en: "An Elder whose chosen obsession is caring for others as they die, which on her scale means sitting with entire species through their last years. She is the gentlest of them and the saddest.",
      ar: "شيخة اختارت رعاية الآخرين عند موتهم هوسًا لها، وذلك على مقياسها يعني الجلوس مع أنواع بأكملها في سنيها الأخيرة. وهي أرقّهم وأحزنهم.",
    },
    related: [{ id: "the-collector", kind: "family" }],
  },
  {
    id: "the-judicator",
    nameEn: "The Judicator",
    nameAr: "القاضي",
    aliases: ["The Judicator"],
    category: "antivillain",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Passes sentence on species", ar: "يصدر الحكم على الأنواع" },
      { en: "Answers to no court", ar: "لا يخضع لمحكمة" },
      { en: "Certain of every verdict", ar: "واثق من كل حكم" },
    ],
    origin: {
      en: "An Elder who took judgement as his obsession and appointed himself to it, weighing whole peoples against a standard he wrote and nobody agreed to.",
      ar: "شيخ اتخذ القضاء هوسًا وولّى نفسه إياه، يزن شعوبًا بأسرها بمعيارٍ كتبه هو ولم يوافق عليه أحد.",
    },
    related: [{ id: "the-collector", kind: "family" }],
  },
  {
    id: "the-obliterator",
    nameEn: "The Obliterator",
    nameAr: "المُبيد",
    aliases: ["The Obliterator", "Maht Pacle", "Achernon"],
    category: "villain",
    affiliation: ["Elders of the Universe"],
    universe: ["mcu"],
    species: "Elder of the Universe",
    powers: [
      { en: "Destroys as a discipline", ar: "يدمّر ممارسةً ومنهجًا" },
      { en: "Hunts what cannot be killed", ar: "يصطاد ما لا يُقتل" },
      { en: "Wields a weapon of pure force", ar: "يحمل سلاحًا من قوة خالصة" },
    ],
    origin: {
      en: "An Elder who chose destruction as his obsession, and hunts targets specifically because they are said to be unkillable. It is the difficulty he is after, not the ruin.",
      ar: "شيخ اختار التدمير هوسًا له، ويطارد أهدافًا لأنه قيل إنها لا تُقتل. فالصعوبة هي مبتغاه لا الخراب.",
    },
    related: [{ id: "silver-surfer", kind: "enemy" }],
  },
];

/**
 * THE COSMIC ABSTRACTS, batch 7 — the tier the master list warns about.
 *
 * Its own caveat is the useful part: abstracts are NOT automatically stronger
 * than non-abstracts, and it gives Eon as the proof, an abstract described in
 * the comics as weak. So none of these is written as a power level. Order and
 * Chaos are a PAIR and neither is the good one; Entropy is not a villain but
 * the last step, arriving on time; Nemesis is what the Infinity Gems become
 * when reunited as a being rather than a weapon, and the first thing she did
 * with that was decide not to continue.
 *
 * Oblivion was on the list and is already in the corpus, so it was left alone.
 */
const abstractsBatch: CharacterDraft[] = [
  {
    id: "master-order",
    nameEn: "Master Order",
    nameAr: "سيد النظام",
    aliases: ["Master Order"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      {
        en: "Imposes order on anything at all",
        ar: "يفرض النظام على أي شيء كان",
      },
      { en: "Nigh-omniscient", ar: "شبه عليم بكل شيء" },
      {
        en: "Writes and rewrites cosmic law",
        ar: "يكتب القانون الكوني ويعيد كتابته",
      },
      {
        en: "Made the In-Betweener with Lord Chaos",
        ar: "صنع البينبيني مع ربّ الفوضى",
      },
      {
        en: "Later fused into Logos, and killed",
        ar: "اندمج لاحقًا في لوغوس، وقَتل",
      },
      { en: "Cannot act without his opposite", ar: "لا يفعل شيئًا دون نقيضه" },
    ],
    origin: {
      en: "One half of the pair that keeps the universe from settling into either perfect pattern or complete noise. He is not good, and the thing he opposes is not evil; they are two necessary halves.",
      ar: "أحد شطري الثنائي الذي يمنع الكون من الاستقرار على نظام تام أو ضجيج كامل. ليس خيرًا، وما يعارضه ليس شرًّا، بل هما شطران لا غنى عنهما.",
    },
    related: [{ id: "lord-chaos", kind: "enemy" }],
  },
  {
    id: "lord-chaos",
    nameEn: "Lord Chaos",
    nameAr: "سيد الفوضى",
    aliases: ["Lord Chaos"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      {
        en: "Manipulates chaos, disorder and chance",
        ar: "يتلاعب بالفوضى والاضطراب والصدفة",
      },
      { en: "Nigh-omniscient", ar: "شبه عليم بكل شيء" },
      { en: "Unmakes any order he meets", ar: "يفكك أي نظام يلقاه" },
      {
        en: "Made the In-Betweener with Master Order",
        ar: "صنع البينبيني مع سيد النظام",
      },
      {
        en: "Later fused into Logos, and killed",
        ar: "اندمج لاحقًا في لوغوس، وقَتل",
      },
      {
        en: "Neither of them can win outright",
        ar: "لا ينتصر أيّ منهما نصرًا حاسمًا",
      },
    ],
    origin: {
      en: "The other half of the pair, who is not destruction but change, and without whom nothing in the universe could ever become anything it was not already.",
      ar: "الشطر الآخر من الثنائي، وهو ليس الدمار بل التغيّر، ولولاه لما صار شيء في الكون شيئًا لم يكنه من قبل.",
    },
    related: [{ id: "master-order", kind: "enemy" }],
  },
  {
    id: "the-in-betweener",
    nameEn: "The In-Betweener",
    nameAr: "البَينِيّ",
    aliases: ["The In-Betweener", "In-Betweener"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      { en: "Turns a thing into its opposite", ar: "يقلب الشيء إلى نقيضه" },
      { en: "Balances order against chaos", ar: "يوازن النظام بالفوضى" },
      {
        en: "Reshapes reality to keep it even",
        ar: "يعيد تشكيل الواقع ليبقى متوازنًا",
      },
      { en: "Agent of Order and Chaos", ar: "عميل النظام والفوضى" },
      {
        en: "Casts illusions, and transmutes anything",
        ar: "يلقي الأوهام، ويحوّل أي شيء",
      },
    ],
    origin: {
      en: "The servant Order and Chaos share, sent to correct anything that has tilted too far one way. He inverts what he touches, which makes him the only errand either of them can agree on.",
      ar: "الخادم الذي يشترك فيه النظام والفوضى، يُرسَل ليصحّح ما مال أكثر من اللازم إلى جهة. يقلب ما يلمسه، وهو المهمة الوحيدة التي يتفقان عليها.",
    },
    related: [
      { id: "master-order", kind: "ally" },
      { id: "lord-chaos", kind: "ally" },
    ],
  },
  {
    id: "the-stranger",
    nameEn: "The Stranger",
    nameAr: "الغريب",
    aliases: ["The Stranger"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "Power to match Galactus and the Watchers",
        ar: "قوة تضاهي غالاكتوس والمراقبين",
      },
      { en: "Made Ego the Living Planet", ar: "صنع إيغو الكوكب الحي" },
      {
        en: "Force blasts from ambient cosmic energy",
        ar: "طلقات من طاقة الكون المحيطة",
      },
      {
        en: "Force fields, and teleports between worlds",
        ar: "دروع قوة، وينتقل بين العوالم",
      },
      { en: "Keeps a Laboratory World", ar: "يملك عالمًا مختبرًا" },
      {
        en: "Weakens where cosmic energy cannot reach",
        ar: "يضعف حيث لا تصل الطاقة الكونية",
      },
    ],
    origin: {
      en: "A cosmic being who wanders the universe abducting whatever interests him and keeping it on a world he uses as a laboratory. Nobody has established what he is or how strong, including him.",
      ar: "كائن كوني يجوب الكون فيخطف ما يثير اهتمامه ويحتفظ به في عالم يتخذه مختبرًا. ولم يثبت أحد ما هو ولا مبلغ قوته، ولا هو نفسه.",
    },
    related: [{ id: "galactus", kind: "enemy" }],
  },
  {
    id: "eon",
    nameEn: "Eon",
    nameAr: "إيون",
    aliases: ["Eon"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      { en: "Cosmic Awareness, given time", ar: "وعي كوني، متى أُمهل" },
      { en: "Grants it to a chosen Protector", ar: "يمنحه لحامٍ مختار" },
      { en: "Opens portals between dimensions", ar: "يفتح بوابات بين الأبعاد" },
      {
        en: "Made a pocket universe of his own",
        ar: "صنع كونًا جيبيًا خاصًا به",
      },
      {
        en: "Reanimates dead tissue, grows limbs",
        ar: "يحيي الأنسجة الميتة ويُنبت الأطراف",
      },
      {
        en: "One vulnerable spot, and it killed him",
        ar: "نقطة ضعف واحدة، وقتلته",
      },
    ],
    origin: {
      en: "The entity that chooses who holds the Quantum Bands and carries the title Protector of the Universe. He was called weak for an abstract, which the master list keeps as a caution against assuming abstracts outrank everything.",
      ar: "الكيان الذي يختار من يحمل أساور الكم ويحمل لقب حامي الكون. وقد وُصف بالضعف بمقياس المجرّدات، وهو ما يبقيه المرجع تحذيرًا من افتراض تفوّق المجرّدات على كل شيء.",
    },
    related: [{ id: "quasar", kind: "ally" }],
  },
  {
    id: "epoch",
    nameEn: "Epoch",
    nameAr: "إيبوك",
    aliases: ["Epoch"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      { en: "Cosmic Awareness, not yet mastered", ar: "وعي كوني لم تتقنه بعد" },
      {
        en: "Teleportation, flight and telepathy",
        ar: "انتقال آني وطيران وتخاطر",
      },
      {
        en: "Shapeshifts and grows pseudopods",
        ar: "تتشكّل وتُنبت أذرعًا كاذبة",
      },
      {
        en: "Potentially without limit, once grown",
        ar: "قد تصير بلا حدّ متى نضجت",
      },
      { en: "Eon's daughter and successor", ar: "ابنة إيون وخليفته" },
    ],
    origin: {
      en: "Eon's successor, grown from what was left of him, who took on the duty of appointing Protectors and watching the universe for the kind of trouble abstracts are supposed to notice.",
      ar: "خليفة إيون، نبت مما بقي منه، فتولّى واجب تعيين الحماة ومراقبة الكون تحسّبًا لما يُفترض بالمجرّدات أن تنتبه إليه.",
    },
    related: [{ id: "eon", kind: "family" }],
  },
  {
    id: "entropy",
    nameEn: "Entropy",
    nameAr: "إنتروبي",
    aliases: ["Entropy"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      {
        en: "Erases matter, energy and abstractions",
        ar: "يمحو المادة والطاقة والمجرّدات",
      },
      { en: "Unravels an entire universe", ar: "يحلّ كونًا بأكمله" },
      {
        en: "Destroyed all creation, then remade it",
        ar: "دمّر الخلق كله ثم أعاده",
      },
      { en: "Unseen even by Cosmic Awareness", ar: "لا يراه حتى الوعي الكوني" },
      { en: "The heat death, embodied", ar: "الموت الحراري مجسّدًا" },
      { en: "Child of Eternity", ar: "ابن الأبدية" },
    ],
    origin: {
      en: "Eternity's child, whose function is to take a universe apart once it has run its course. He is not a villain; he is the last step, and he arrives on time.",
      ar: "ابن الأزل، وظيفته أن يفكّ كونًا متى بلغ منتهاه. ليس شريرًا، بل هو الخطوة الأخيرة، ويأتي في موعده.",
    },
    related: [{ id: "eternity", kind: "family" }],
  },
  {
    id: "kronos",
    nameEn: "Kronos",
    nameAr: "كرونوس",
    aliases: ["Kronos"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      {
        en: "The god of time, and made of energy",
        ar: "إله الزمن، ومصنوع من طاقة",
      },
      { en: "Manipulates time itself", ar: "يتحكم بالزمن نفسه" },
      { en: "Cosmic energy on a vast scale", ar: "طاقة كونية بمقياس هائل" },
      {
        en: "Telepathy, and reassembles his form",
        ar: "تخاطر، ويعيد تجميع هيئته",
      },
      {
        en: "Sat with the abstracts at the Gauntlet",
        ar: "جلس مع المجرّدات عند القفاز",
      },
      { en: "Thanos's grandfather", ar: "جد ثانوس" },
    ],
    origin: {
      en: "An Eternal of Titan whose body was destroyed in an experiment and who reassembled as a being of pure energy with a hold over time. Thanos and Starfox are his grandsons.",
      ar: "أزليّ من تايتان دُمّر جسده في تجربة فأعاد تشكّل نفسه كيانًا من طاقة خالصة له سلطان على الزمن. وثانوس وستارفوكس حفيداه.",
    },
    related: [{ id: "thanos", kind: "family" }],
  },
  {
    id: "nemesis",
    nameEn: "Nemesis",
    nameAr: "نيميسيس",
    aliases: ["Nemesis"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "All six Infinity Gems, as one being",
        ar: "أحجار اللانهاية الستة ككائن واحد",
      },
      {
        en: "Reality, time, soul, mind and power",
        ar: "الواقع والزمن والروح والعقل والقوة",
      },
      { en: "As strong as a complete Gauntlet", ar: "بقوة قفاز كامل" },
      {
        en: "Resurrection, and vast knowledge",
        ar: "إحياء الموتى، ومعرفة هائلة",
      },
      { en: "Willed herself to shatter into six", ar: "شاءت أن تتشظى إلى ستة" },
    ],
    origin: {
      en: "What the Infinity Gems become when all of them are brought back together as one being rather than one weapon. Finding herself alone at the top of everything, she chose not to continue.",
      ar: "ما تصيره أحجار لانهاية حين تُجمع كلها كيانًا واحدًا لا سلاحًا واحدًا. ولمّا وجدت نفسها وحيدة على قمة كل شيء، اختارت ألا تستمر.",
    },
    related: [{ id: "thanos", kind: "enemy" }],
  },
  {
    id: "protege",
    nameEn: "Protege",
    nameAr: "بروتيجيه",
    aliases: ["Protege"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      /* ENRICHING THIS MADE IT SCORE LESS, which is the oldest trap in this
         file and I walked into it four times in one commit. The detail went
         up and the SCALE WORDS came out: what he copies is cosmic beings, and
         what he becomes is stronger than the original. */
      {
        en: "Copies any cosmic being he observes",
        ar: "ينسخ أي كائن كوني يراه",
      },
      { en: "Becomes stronger than the original", ar: "يصير أقوى من الأصل" },
      {
        en: "Keeps it, and needs no prerequisite",
        ar: "يحتفظ بها، ولا يحتاج شرطًا",
      },
      {
        en: "Copied Eternity and the Living Tribunal",
        ar: "نسخ الأبدية والمحكمة الحيّة",
      },
      {
        en: "Claimed to be the new One Above All",
        ar: "ادّعى أنه الأعلى فوق الجميع الجديد",
      },
      { en: "A child, in effect", ar: "طفل، في حقيقته" },
    ],
    origin: {
      en: "A being that can mimic any cosmic entity it observes and then exceed it, raised by a church that told it this made it a god. It has the power of everything it has seen and the judgement of a child.",
      ar: "كائن يحاكي أي كيان كوني يراه ثم يفوقه، ربّته كنيسة أخبرته أن ذلك يجعله إلهًا. فله قوة كل ما رآه، وحُكم طفل.",
    },
    related: [{ id: "the-living-tribunal", kind: "enemy" }],
  },
  {
    id: "tenebrous",
    nameEn: "Tenebrous",
    nameAr: "تينيبروس",
    aliases: ["Tenebrous", "Tenebrous of the Darkness Between"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      { en: "Power to match Galactus himself", ar: "قوة تضاهي غالاكتوس نفسه" },
      {
        en: "Beat Galactus and the Surfer with Aegis",
        ar: "هزم غالاكتوس والسيرفر مع إيجيس",
      },
      {
        en: "Commands the Black that binds the universe",
        ar: "يأمر السواد الذي يشدّ الكون",
      },
      {
        en: "Gravity, darkness and planet-breaking blows",
        ar: "جاذبية وظلام وضربات تكسر الكواكب",
      },
      { en: "Changes his own size and weight", ar: "يغيّر حجمه ووزنه" },
      { en: "Galactus could still cage him", ar: "ومع ذلك سجنه غالاكتوس" },
    ],
    origin: {
      en: "One of the beings that ruled before this universe existed, defeated by Galactus in his first days and sealed away. He was released long after, and has not forgiven anyone for the interval.",
      ar: "أحد الكائنات التي حكمت قبل وجود هذا الكون، هزمه جالاكتوس في أيامه الأولى وختم عليه. أُطلق بعد دهر طويل، ولم يغفر لأحد تلك المدة.",
    },
    related: [{ id: "galactus", kind: "enemy" }],
  },
];

/**
 * THE MYSTIC POWERS, batch 8 — the tier the list files beside the cosmics
 * while noting it is a distinct category, which it is.
 *
 * The Elder Gods are one story told across several records here and it only
 * reads if they are kept together: Set began eating the others, that is what
 * turned the generation into demons, and Gaea is the one who neither turned
 * nor left. Oshtur left rather than take part. Chthon, already in the corpus
 * from batch 1, wrote everything he knew into a book before going.
 *
 * The Vishanti are three beings and not a committee, so Oshtur and Hoggoth
 * get records of their own beside Agamotto rather than one entry for the
 * trinity.
 */
const mystics: CharacterDraft[] = [
  {
    /* Credited in Doctor Strange in the Multiverse of Madness — the woman who
       walks out of a portal in the mid-credits scene and tells him he has
       caused an incursion. Missing entirely until Rashid noticed. */
    id: "clea",
    nameEn: "Clea",
    nameAr: "كليا",
    aliases: ["Clea", "Clea Strange"],
    category: "hero",
    affiliation: ["Magic", "Masters of the Mystic Arts"],
    universe: ["mcu"],
    species: "Faltine",
    /* NOT eldritch. She is born of the Dark Dimension and rules it after
       Dormammu; the purple she throws is his energy, not Kamar-Taj's. She
       learns Earth sorcery later, but the magic she IS comes from there. */
    magicSchools: ["dark-dimension"],
    powers: [
      {
        en: "Generates her own magic, as a Faltine",
        ar: "تولّد سحرها بنفسها، كفالتينية",
      },
      {
        en: "Draws on Earth and the Dark Dimension",
        ar: "تستمد من الأرض والبعد المظلم",
      },
      {
        en: "So no binding meant for one will hold",
        ar: "فلا قيد لأحدهما يمسكها",
      },
      {
        en: "Bolts, shields, transmutation and mind control",
        ar: "صواعق ودروع وتحويل وسيطرة ذهنية",
      },
      {
        en: "Sorceress Supreme of two realms at once",
        ar: "ساحرة عظمى لمملكتين معًا",
      },
      {
        en: "Strongest where her subjects believe",
        ar: "أقوى حيث يؤمن رعاياها",
      },
    ],
    origin: {
      en: "A sorceress born of the Dark Dimension and Dormammu's own niece, who rules it after him and arrives to tell Doctor Strange that the multiverse he broke is now his problem to fix.",
      ar: "ساحرة وُلدت من البعد المظلم وابنة أخت دورمامو نفسه، تحكمه بعده، وتأتي لتخبر دكتور سترينج أن الكون المتعدد الذي كسره صار مشكلته هو.",
    },
    related: [
      { id: "doctor-strange", kind: "ally" },
      { id: "dormammu", kind: "family" },
      { id: "umar", kind: "family" },
    ],
  },
  {
    id: "cyttorak",
    nameEn: "Cyttorak",
    nameAr: "سيتوراك",
    aliases: ["Cyttorak"],
    category: "villain",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Demon",
    magicSchools: ["elder", "infernal"],
    powers: [
      /* Scored ZERO, and he is the only ranked head in the top ninety that
         did. "Grants unstoppable force" is a real claim and the vocabulary
         had no word for any of it. */
      { en: "A demon lord of the Octessence", ar: "أمير شياطين من الأوكتيسنس" },
      { en: "Grants unstoppable force", ar: "يمنح قوة لا تُوقف" },
      {
        en: "The magic that powers the Juggernaut",
        ar: "السحر الذي يمدّ الجاغرنوت",
      },
      { en: "Rules his own crimson dimension", ar: "يحكم بعده القرمزي" },
      { en: "Wants destruction done for him", ar: "يريد من يدمّر نيابة عنه" },
    ],
    origin: {
      en: "The demon whose crimson gem makes whoever claims it unstoppable, on the understanding that they will destroy things in his name. Cain Marko picked it up and has been paying for it since.",
      ar: "الشيطان الذي تجعل جوهرته القرمزية من يحوزها لا يُوقَف، على أن يدمّر باسمه. التقطها كين ماركو وما زال يدفع الثمن منذئذ.",
    },
    related: [{ id: "juggernaut", kind: "ally" }],
  },
  {
    id: "shuma-gorath",
    nameEn: "Shuma-Gorath",
    nameAr: "شوما غوراث",
    aliases: ["Shuma-Gorath", "Iop-Oa"],
    category: "villain",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Elder God",
    magicSchools: ["elder", "infernal"],
    powers: [
      {
        en: "Effectively omnipotent in its dimension",
        ar: "شبه كلي القدرة في بعده",
      },
      {
        en: "An aura that destroys whole galaxies",
        ar: "هالة تدمّر مجرات بأكملها",
      },
      { en: "Drains the magic out of anything", ar: "يستنزف السحر من أي شيء" },
      {
        en: "Mind control reaching across dimensions",
        ar: "سيطرة ذهنية تعبر الأبعاد",
      },
      { en: "Ruled Earth a million years ago", ar: "حكم الأرض قبل مليون سنة" },
      { en: "A hide immune to most harm", ar: "جلد منيع أمام معظم الأذى" },
    ],
    origin: {
      en: "One of the things that owned this world before anything human walked on it, waiting outside for a door. Doctor Strange has spent much of his career keeping that door shut.",
      ar: "أحد ما امتلك هذا العالم قبل أن يمشي عليه بشر، ينتظر في الخارج بابًا. وقد أنفق دكتور سترينج شطرًا من مسيرته في إبقاء ذلك الباب مغلقًا.",
    },
    related: [{ id: "doctor-strange", kind: "enemy" }],
  },
  {
    id: "oshtur",
    nameEn: "Oshtur",
    nameAr: "أوشتور",
    aliases: ["Oshtur"],
    category: "hero",
    affiliation: ["Magic", "Vishanti", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Elder God",
    magicSchools: ["eldritch", "elder"],
    powers: [
      {
        en: "Elder Goddess, and called all-powerful",
        ar: "إلهة قديمة، وتُدعى كلية القدرة",
      },
      {
        en: "Created entire races of living beings",
        ar: "خلقت أجناسًا كاملة من الكائنات",
      },
      {
        en: "Originated magic on Earth itself",
        ar: "أنشأت السحر على الأرض نفسها",
      },
      {
        en: "Vast power on every astral plane there is",
        ar: "قوة هائلة في كل مستوى أثيري",
      },
      {
        en: "Wrote the tomes every sorcerer still uses",
        ar: "كتبت الأسفار التي ما زال السحرة يستعملونها",
      },
      {
        en: "Immortal, and travels between dimensions",
        ar: "خالدة، وتعبر الأبعاد",
      },
    ],
    origin: {
      en: "An Elder God who left this world rather than take part in what her siblings were becoming, and one of the three names every sorcerer invokes. Agamotto is her son.",
      ar: "إلهة قديمة غادرت هذا العالم بدل أن تشارك فيما صار إليه إخوتها، وهي إحدى الأسماء الثلاثة التي يستنجد بها كل ساحر. وأجاموتو ابنها.",
    },
    related: [{ id: "agamotto", kind: "family" }],
  },
  {
    id: "hoggoth",
    nameEn: "Hoggoth",
    nameAr: "هوغوث",
    aliases: ["Hoggoth"],
    category: "hero",
    affiliation: ["Magic", "Vishanti", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Elder God",
    magicSchools: ["eldritch", "elder"],
    powers: [
      /* The third Vishanti, and he was left at 232 while Agamotto went to 70
         and Oshtur to 84 -- the parts of one trinity a hundred and fifty
         ranks apart. "Manipulates matter, and time with it" was the culprit:
         the vocabulary reads "manipulates time" as a contiguous phrase and my
         wording split it, so the largest thing on his record scored nothing.
         The Vishanti's documented feats include time manipulation. */
      {
        en: "Manipulates time itself, and matter",
        ar: "يتلاعب بالزمن نفسه وبالمادة",
      },
      { en: "Magic older than the Earth is", ar: "سحر أقدم من الأرض نفسها" },
      {
        en: "Calls on the spirits of his slain kin",
        ar: "يستدعي أرواح قومه القتلى",
      },
      {
        en: "Each of them an Old One in their own right",
        ar: "كل منهم قديم بحد ذاته",
      },
      {
        en: "The Hoary Host, a fist the size of a hall",
        ar: "القبضة الجليلة، بحجم قاعة",
      },
      {
        en: "Lends his power to the Sorcerer Supreme",
        ar: "يعير قوته للساحر الأعظم",
      },
    ],
    origin: {
      en: "The third of the Vishanti, invoked in the same breath as Agamotto and Oshtur every time a sorcerer needs something borrowed. He answers, and he keeps his own counsel about why.",
      ar: "ثالث الفيشانتي، يُستنجد به في نفس النَّفَس مع أجاموتو وأوشتور كلما احتاج ساحر عاريةً من قوة. يستجيب، ويكتم سببه لنفسه.",
    },
    related: [{ id: "agamotto", kind: "ally" }],
  },
  {
    id: "umar",
    nameEn: "Umar",
    nameAr: "أومار",
    aliases: ["Umar"],
    category: "villain",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Faltine",
    magicSchools: ["dark-dimension"],
    powers: [
      {
        en: "A Faltine, and living mystical energy",
        ar: "من الفالتين، وطاقة سحرية حية",
      },
      {
        en: "Nearly overwhelms Doctor Strange",
        ar: "تكاد تطغى على دكتور سترينج",
      },
      { en: "Transmutes matter, and banishes", ar: "تحوّل المادة وتنفي" },
      { en: "Held the Dark Dimension's throne", ar: "اعتلت عرش البعد المظلم" },
      { en: "Immortal", ar: "خالدة" },
      { en: "Dormammu's sister", ar: "أخت دورمامو" },
    ],
    origin: {
      en: "Dormammu's sister, born of the same energy and exiled with him, who has taken the Dark Dimension from him more than once. She finds his ambitions tedious and says so.",
      ar: "أخت دورمامو، وُلدت من الطاقة ذاتها ونُفيت معه، وقد انتزعت منه البعد المظلم أكثر من مرة. تجد طموحاته مملّة ولا تكتم ذلك.",
    },
    related: [
      { id: "dormammu", kind: "family" },
      { id: "doctor-strange", kind: "enemy" },
    ],
  },
  {
    id: "zom",
    nameEn: "Zom",
    nameAr: "زوم",
    aliases: ["Zom"],
    category: "villain",
    affiliation: ["Magic", "Cosmic entities"],
    universe: ["mcu"],
    species: "Demon",
    magicSchools: ["infernal"],
    powers: [
      /* THE DOSSIER AND THE SOURCES AGREE AND THE CORPUS DID NOT. Zom "far
         exceeds even Umar (and thus Dormammu)", and his re-emergence
         provoked the Living Tribunal in person — who had ignored Thanos
         holding the Infinity Gauntlet. He was ranked BELOW Umar. */
      {
        en: "Far exceeds Umar, and so Dormammu",
        ar: "يفوق أومار بكثير، ومن ثم دورمامو",
      },
      { en: "Magic past any Sorcerer Supreme", ar: "سحر يفوق أي ساحر أعظم" },
      {
        en: "Destruction is the only thing he is for",
        ar: "الدمار هو كل ما خُلق له",
      },
      {
        en: "The Living Tribunal came in person",
        ar: "حضرت المحكمة الحيّة بنفسها",
      },
      {
        en: "Eternity and Dormammu bound him together",
        ar: "قيّده الأبدية ودورمامو معًا",
      },
      { en: "Corrupts whoever wields him", ar: "يُفسد كل من يستخدمه" },
    ],
    origin: {
      en: "A destructive force so unmanageable that even the beings who beat it could only bind it. Doctor Strange once took its power to win a fight and spent a long time regretting the trade.",
      ar: "قوة مدمّرة عصيّة إلى حدّ أن من هزمها لم يقدر إلا على تقييدها. وقد أخذ دكتور سترينج قوتها مرة ليكسب معركة، فندم على المقايضة طويلًا.",
    },
    related: [{ id: "doctor-strange", kind: "enemy" }],
  },
  {
    id: "gaea",
    nameEn: "Gaea",
    nameAr: "غايا",
    aliases: ["Gaea", "Mother Earth"],
    category: "hero",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Elder God",
    magicSchools: ["green", "elder"],
    powers: [
      {
        en: "Feels everything that happens to Earth",
        ar: "تشعر بكل ما يحدث للأرض",
      },
      { en: "Telekinesis that lifts Mjolnir", ar: "تحريك ذهني يرفع ميولنير" },
      {
        en: "Heals, revives and grows any life",
        ar: "تشفي وتحيي وتُنمي أي حياة",
      },
      { en: "Mother of Earth's pantheons", ar: "أم آلهة الأرض" },
      { en: "Alters her size and her shape", ar: "تغيّر حجمها وهيئتها" },
      {
        en: "The only Elder God who stayed clean",
        ar: "الإلهة القديمة الوحيدة التي لم تفسد",
      },
    ],
    origin: {
      en: "The one Elder God who did not turn on the rest and did not leave, choosing instead to become the planet's own life. Thor's mother, and the reason there is anything growing here at all.",
      ar: "الإلهة القديمة الوحيدة التي لم تنقلب على البقية ولم ترحل، بل اختارت أن تصير حياة الكوكب نفسه. أمّ ثور، وسبب وجود أي شيء نامٍ هنا أصلًا.",
    },
    related: [{ id: "thor", kind: "family" }],
  },
  {
    id: "the-demiurge",
    nameEn: "The Demiurge",
    nameAr: "الديميورغ",
    aliases: ["The Demiurge", "Demiurge"],
    category: "supporting",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Elder God",
    magicSchools: ["elder"],
    powers: [
      {
        en: "Shapes reality out of Earth's own life",
        ar: "يشكّل الواقع من حياة الأرض ذاتها",
      },
      {
        en: "Seeded every Elder God from itself",
        ar: "بذر كل إله قديم من نفسه",
      },
      {
        en: "The wellspring all Earth magic comes from",
        ar: "المنبع الذي يأتي منه كل سحر أرضي",
      },
      {
        en: "Near-omnipotent inside its own domain",
        ar: "شبه كلي القدرة داخل مملكته",
      },
      {
        en: "Returns roughly every thousand years",
        ar: "يعود كل ألف عام تقريبًا",
      },
    ],
    origin: {
      en: "The mystical source that Earth's gods came out of, and the thing Wiccan is said to be growing into. It is less a person than a wellspring that occasionally takes a shape.",
      ar: "المنبع السحري الذي خرجت منه آلهة الأرض، وما يقال إن ويكان صائر إليه. وهو نبعٌ يتخذ شكلًا أحيانًا أكثر منه شخصًا.",
    },
    related: [{ id: "gaea", kind: "family" }],
  },
  {
    id: "set",
    nameEn: "Set",
    nameAr: "سِت",
    aliases: ["Set"],
    category: "villain",
    affiliation: ["Magic", "Gods", "Cosmic entities"],
    universe: ["mcu"],
    species: "Elder God",
    magicSchools: ["elder", "necromancy"],
    powers: [
      {
        en: "Among the strongest Elder Gods alive",
        ar: "من أقوى الآلهة القدامى",
      },
      { en: "Regrows every head he loses", ar: "يُنبت كل رأس يفقده" },
      {
        en: "Drains the life out of what he touches",
        ar: "يستنزف الحياة مما يلمسه",
      },
      { en: "Feeds on death and on war", ar: "يتغذى على الموت والحرب" },
      { en: "Shapeshifts, and changes his size", ar: "يتشكّل ويغيّر حجمه" },
      { en: "Grants power to those who worship him", ar: "يمنح القوة لعابديه" },
    ],
    origin: {
      en: "The Elder God who began eating the others, which is what turned that generation into demons and drove Gaea to make something new. Every serpent cult on Earth traces back to him.",
      ar: "الإله القديم الذي بدأ يأكل الآخرين، وهو ما حوّل ذلك الجيل إلى شياطين ودفع غايا إلى صنع شيء جديد. وكل عبادة أفعى على الأرض ترجع إليه.",
    },
    related: [{ id: "gaea", kind: "enemy" }],
  },
];

/**
 * THE REST OF THE HERALDS, and the first of the power-list names, batch 9.
 *
 * The heralds are one job held by very different people and that is the whole
 * point of them: Air-Walker took the bargain willingly and did not get to
 * stop, Morg was chosen precisely because he had no conscience to trouble the
 * work, Stardust treats it as a faith rather than a bargain, and the Fallen
 * One was discarded for being too cruel even by that standard and imprisoned
 * rather than released.
 *
 * Onslaught is filed as a `variant` of both Xavier and Magneto rather than as
 * an ally of either, because that is literally what he is: the argument
 * between them, alive.
 */
const heralds: CharacterDraft[] = [
  {
    id: "air-walker",
    nameEn: "Air-Walker",
    nameAr: "إير ووكر",
    aliases: ["Air-Walker", "Gabriel Lan"],
    category: "antihero",
    affiliation: ["Heralds of Galactus"],
    universe: ["mcu"],
    species: "Xandarian",
    powers: [
      {
        en: "The Power Cosmic, and a cosmic staff",
        ar: "القوة الكونية، وعصا كونية",
      },
      {
        en: "Strength and flight between the stars",
        ar: "قوة وطيران بين النجوم",
      },
      {
        en: "Rebuilt as an android when he fell",
        ar: "أُعيد بناؤه آليًا حين سقط",
      },
      {
        en: "Destroyed and rebuilt, more than once",
        ar: "دُمّر وأُعيد بناؤه أكثر من مرة",
      },
      {
        en: "Lived a while inside Galactus's own ship",
        ar: "عاش حينًا داخل سفينة غالاكتوس",
      },
      {
        en: "The one herald Galactus called a friend",
        ar: "المبشّر الوحيد الذي سماه غالاكتوس صديقًا",
      },
    ],
    origin: {
      en: "A Xandarian captain who took the heralds' bargain willingly, was killed doing the job, and was rebuilt by Galactus as a machine that carried on with it. He is the one who did not get to stop.",
      ar: "قائد زاندري قبل صفقة البشراء طائعًا، فقُتل وهو يؤدي المهمة، فأعاد جالاكتوس بناءه آلةً تواصل العمل. وهو الذي لم يُتَح له أن يتوقف.",
    },
    related: [
      { id: "galactus", kind: "ally" },
      { id: "firelord", kind: "ally" },
    ],
  },
  {
    id: "morg",
    nameEn: "Morg",
    nameAr: "مورغ",
    aliases: ["Morg", "Morg the Executioner"],
    category: "villain",
    affiliation: ["Heralds of Galactus"],
    universe: ["mcu"],
    species: "Alien",
    powers: [
      {
        en: "The Power Cosmic, and no conscience at all",
        ar: "القوة الكونية، وبلا ضمير البتة",
      },
      {
        en: "Beat the Surfer and several heralds at once",
        ar: "هزم السيرفر وعدة مبشّرين معًا",
      },
      {
        en: "Galactus himself had to step in",
        ar: "اضطر غالاكتوس نفسه للتدخل",
      },
      { en: "A double-bladed cosmic axe", ar: "فأس كوني بنصلين" },
      {
        en: "Killed Nova and destroyed Air-Walker",
        ar: "قتل نوفا ودمّر إير-ووكر",
      },
      {
        en: "Led Galactus to worlds with people on them",
        ar: "قاد غالاكتوس إلى عوالم آهلة",
      },
    ],
    origin: {
      en: "An executioner picked as herald precisely because he had no conscience to trouble the work. The other heralds regard him as proof of how badly the arrangement can go.",
      ar: "جلّاد اختير بشيرًا لأنه بلا ضمير يعكّر العمل. ويراه سائر البشراء دليلًا على مبلغ ما قد يسوء إليه هذا الترتيب.",
    },
    related: [
      { id: "galactus", kind: "ally" },
      { id: "silver-surfer", kind: "enemy" },
    ],
  },
  {
    id: "stardust",
    nameEn: "Stardust",
    nameAr: "ستارداست",
    aliases: ["Stardust", "Lambda-Zero"],
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "villain",
    affiliation: ["Heralds of Galactus"],
    universe: ["mcu"],
    species: "Alien",
    powers: [
      {
        en: "Rated a universal threat by the Nova Corps",
        ar: "صنّفه فيلق نوفا خطرًا كونيًا",
      },
      {
        en: "Fought Beta Ray Bill on even terms",
        ar: "قاتل بيتا راي بيل ندًا لند",
      },
      {
        en: "Creates black holes and opens dimensions",
        ar: "يصنع ثقوبًا سوداء ويفتح أبعادًا",
      },
      {
        en: "A body of living energy, and six eyes",
        ar: "جسد من طاقة حية، وست أعين",
      },
      {
        en: "Fires beams from every one of them",
        ar: "يطلق أشعة من كل واحدة منها",
      },
      { en: "Fed his own species to Galactus", ar: "أطعم جنسه لغالاكتوس" },
    ],
    origin: {
      en: "A herald who treats serving Galactus as a faith rather than a bargain, and who has destroyed worlds that were not even on the menu because devotion does not stop at instructions.",
      ar: "بشير يعدّ خدمة جالاكتوس عقيدةً لا صفقة، ودمّر عوالم لم تكن أصلًا مطلوبة، لأن التعبّد لا يقف عند التعليمات.",
    },
    related: [{ id: "galactus", kind: "ally" }],
  },
  {
    id: "red-shift",
    nameEn: "Red Shift",
    nameAr: "ريد شيفت",
    aliases: ["Red Shift"],
    category: "villain",
    affiliation: ["Heralds of Galactus"],
    universe: ["mcu"],
    species: "Alien",
    powers: [
      {
        en: "Twin swords that cut holes in space",
        ar: "سيفان يشقان ثقوبًا في الفضاء",
      },
      {
        en: "Opens a rift across any distance at all",
        ar: "يفتح شقًا عبر أي مسافة كانت",
      },
      {
        en: "Sends Galactus himself through them",
        ar: "يمرّر غالاكتوس نفسه عبرها",
      },
      {
        en: "The Power Cosmic, and a herald's body",
        ar: "القوة الكونية، وجسد مبشّر",
      },
      {
        en: "The Surfer needed a black hole to stop him",
        ar: "لزم السيرفر ثقب أسود ليوقفه",
      },
      {
        en: "Held back a planet-killing blast, and died",
        ar: "صدّ انفجارًا يقتل كوكبًا، ومات",
      },
    ],
    origin: {
      en: "A herald who tears space open to travel and says very little about anything. He was found on a dead world and has never explained what he was doing there.",
      ar: "بشير يمزّق الفضاء ليسافر ولا يقول في شيء إلا القليل. وُجد على عالم ميت ولم يفسّر قط ما كان يفعله هناك.",
    },
    related: [{ id: "galactus", kind: "ally" }],
  },
  {
    id: "the-fallen-one",
    nameEn: "The Fallen One",
    nameAr: "الساقط",
    aliases: ["The Fallen One", "Fallen One"],
    category: "villain",
    affiliation: ["Heralds of Galactus"],
    universe: ["mcu"],
    species: "Alien",
    powers: [
      {
        en: "Dark energy, not the Power Cosmic",
        ar: "طاقة مظلمة، لا القوة الكونية",
      },
      {
        en: "Manipulates what binds the universe",
        ar: "يتلاعب بما يشدّ الكون",
      },
      { en: "A threat to Galactus himself", ar: "خطر على غالاكتوس نفسه" },
      {
        en: "The first herald ever made, and a failure",
        ar: "أول مبشّر صُنع، وكان فاشلًا",
      },
      {
        en: "Locked in the Kyln, then used by Thanos",
        ar: "سُجن في الكيلن ثم استخدمه ثانوس",
      },
      { en: "Killed by Tenebrous and Aegis", ar: "قتله تينيبروس وإيجيس" },
    ],
    origin: {
      en: "Galactus's first herald, discarded for being too cruel even by that standard, and imprisoned rather than released. He has spent the time since planning what to do about it.",
      ar: "أول بشراء جالاكتوس، نُبذ لأنه كان أقسى مما يحتمل حتى ذلك المقياس، فسُجن ولم يُطلق. وقضى ما بعدها يخطط لما يفعله حيال ذلك.",
    },
    related: [{ id: "galactus", kind: "enemy" }],
  },
  {
    id: "praeter",
    nameEn: "Praeter",
    nameAr: "برايتر",
    aliases: ["Praeter"],
    category: "antihero",
    affiliation: ["Heralds of Galactus"],
    universe: ["mcu"],
    /* NOT plain Human. An ordinary man remade into a herald — which is the point of him, and also why he cannot stay in a chip for ordinary men. */
    species: "Enhanced human",
    powers: [
      { en: "The Power Cosmic, on loan", ar: "القوة الكونية، معارة" },
      {
        en: "Strength, flight and space to live in",
        ar: "قوة وطيران وفضاء يعيش فيه",
      },
      {
        en: "A pastor from Broxton, before that",
        ar: "قسّ من بروكستون قبل ذلك",
      },
      {
        en: "Part of a truce between Odin and Galactus",
        ar: "جزء من هدنة بين أودين وغالاكتوس",
      },
      { en: "Barely seen again afterwards", ar: "لم يُرَ تقريبًا بعدها" },
    ],
    origin: {
      en: "An ordinary man remade into a herald, which is the version of the story that shows what the Power Cosmic does to somebody with no preparation for it at all.",
      ar: "رجل عادي أُعيد صنعه بشيرًا، وهي الرواية التي تُظهر ما تفعله القوة الكونية بمن لا استعداد له بها البتة.",
    },
    related: [{ id: "galactus", kind: "ally" }],
  },
  {
    id: "beta-ray-bill",
    nameEn: "Beta Ray Bill",
    nameAr: "بيتا راي بيل",
    aliases: ["Beta Ray Bill"],
    category: "hero",
    affiliation: ["Asgard"],
    universe: ["mcu"],
    species: "Korbinite",
    powers: [
      /* THE RECORD NAMED NO POWER. "Worthy of the hammer / Carries
         Stormbreaker / Last of his people" is three lines of biography for a
         character who fought Thor to a draw, and it scored 9. */
      { en: "Strength to match Thor", ar: "قوة تضاهي ثور" },
      { en: "Carries Stormbreaker", ar: "يحمل ستورمبريكر" },
      { en: "Energy blasts and lightning", ar: "صواعق وطلقات طاقة" },
      { en: "Flight between stars", ar: "طيران بين النجوم" },
      { en: "Worthy of the hammer", ar: "جدير بالمطرقة" },
      { en: "Last of his people", ar: "آخر بني قومه" },
    ],
    origin: {
      en: "The champion of a dying people who picked up Thor's hammer and found it answered him, which nobody had expected including Odin. He was given a hammer of his own rather than sent away.",
      ar: "بطل شعبٍ يفنى، التقط مطرقة ثور فوجدها تجيبه، وهو ما لم يتوقعه أحد بمن فيهم أودين. فمُنح مطرقة خاصة به بدل أن يُصرَف.",
    },
    related: [{ id: "thor", kind: "ally" }],
  },
  {
    id: "gladiator",
    nameEn: "Gladiator",
    nameAr: "غلاديتور",
    aliases: ["Gladiator", "Kallark"],
    category: "antihero",
    affiliation: ["Shi'ar"],
    universe: ["mcu"],
    species: "Strontian",
    powers: [
      {
        en: "Strength that scales with his conviction",
        ar: "قوة تتناسب مع يقينه",
      },
      {
        en: "Traded blows with Thor and the Hulk",
        ar: "بادل ثور وهَلك الضربات",
      },
      {
        en: "Heat vision, and breath that freezes",
        ar: "رؤية حارقة، وأنفاس تجمّد",
      },
      { en: "Flies faster than light", ar: "يطير أسرع من الضوء" },
      { en: "Near-invulnerable while he believes", ar: "شبه منيع ما دام يؤمن" },
      { en: "Praetor of the Imperial Guard", ar: "بريتور الحرس الإمبراطوري" },
    ],
    origin: {
      en: "The commander of the Shi'ar Imperial Guard, whose strength rises and falls with his own conviction, and who has carried out orders he disagreed with because the empire asked.",
      ar: "قائد الحرس الإمبراطوري الشياري، تعلو قوته وتهبط بيقينه، ونفّذ أوامر لم يوافق عليها لأن الإمبراطورية طلبت.",
    },
    related: [{ id: "professor-x", kind: "enemy" }],
  },
  {
    id: "hyperion",
    nameEn: "Hyperion",
    nameAr: "هايبريون",
    aliases: ["Hyperion", "Marcus Milton"],
    category: "hero",
    affiliation: ["Squadron Supreme"],
    universe: ["mcu"],
    species: "Eternal",
    powers: [
      {
        en: "Hulk-level strength, and it is not close",
        ar: "قوة بمستوى هَلك، والفارق كبير",
      },
      {
        en: "Atomic vision: heat from the eyes",
        ar: "رؤية ذرية: حرارة من العينين",
      },
      {
        en: "Cosmic energy absorbed from the stars",
        ar: "طاقة كونية ممتصة من النجوم",
      },
      { en: "Flies at orbital speed", ar: "يطير بسرعة مدارية" },
      { en: "Near-invulnerable, and regenerates", ar: "شبه منيع، ويتجدد" },
      { en: "The last Eternal of a dead universe", ar: "آخر أزليّ من كون ميت" },
    ],
    origin: {
      en: "The strongest man from a world that no longer exists, who survived its ending and now lives on this one trying to be of use to a planet that is not the one he failed.",
      ar: "أقوى رجل في عالم لم يعد موجودًا، نجا من نهايته ويعيش الآن على هذا العالم محاولًا أن ينفع كوكبًا ليس هو الذي خذله.",
    },
    related: [{ id: "thor", kind: "ally" }],
  },
  {
    id: "mangog",
    nameEn: "Mangog",
    nameAr: "مانغوغ",
    aliases: ["Mangog"],
    /* ANTIVILLAIN. A grievance made solid: the collected fury of a billion beings Odin destroyed. The grievance is TRUE, which is the whole problem with killing it. */
    category: "antivillain",
    affiliation: ["Asgard", "Gods"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      /* SCORE OF SIX, the worst record in the top hundred and thirty. Mangog
         is the collected rage of a billion beings Odin killed, and he has
         beaten Thor, Odin and the whole Asgardian army in one go. His record
         said "The rage of a billion dead / Grows with every prayer unanswered
         / Exists to kill Odin", none of which this vocabulary can read. */
      {
        en: "The rage of a billion murdered beings",
        ar: "غضب مليار كائن قُتلوا",
      },
      {
        en: "Strength that grows with every prayer unheard",
        ar: "قوة تنمو مع كل دعاء لم يُسمع",
      },
      {
        en: "Beat Thor, Odin and all of Asgard at once",
        ar: "هزم ثور وأودين وأسغارد كلها معًا",
      },
      {
        en: "Near-invulnerable while the wrong stands",
        ar: "شبه منيع ما دام الظلم قائمًا",
      },
      { en: "Cannot be killed, only answered", ar: "لا يُقتل، بل يُجاب" },
      {
        en: "Exists for one purpose and no other",
        ar: "وُجد لغاية واحدة لا غير",
      },
    ],
    origin: {
      en: "Not a creature but a grievance made solid: the collected fury of a billion beings Odin destroyed, given a body and one purpose. It cannot be killed while the grievance is true.",
      ar: "ليس مخلوقًا بل مظلمة تجسّدت: غضب مليار كائن أفناهم أودين، مجموعًا في جسد ولغرض واحد. ولا يُقتل ما دامت المظلمة صادقة.",
    },
    related: [{ id: "thor", kind: "enemy" }],
  },
  {
    id: "blue-marvel",
    nameEn: "Blue Marvel",
    nameAr: "بلو مارفل",
    aliases: ["Blue Marvel", "Adam Brashear"],
    category: "hero",
    affiliation: [],
    universe: ["mcu"],
    /* NOT an ordinary human. An antimatter reactor where a body should be. */
    species: "Enhanced human",
    powers: [
      {
        en: "An antimatter reactor for a body",
        ar: "مفاعل مادة مضادة عوضًا عن جسد",
      },
      {
        en: "Strength that traded with the Sentry",
        ar: "قوة بادلت سنتري الضربات",
      },
      {
        en: "Manipulates energy and matter alike",
        ar: "يتحكم بالطاقة والمادة سواء",
      },
      { en: "Flight, and nearly invulnerable", ar: "طيران، وشبه منيع" },
      {
        en: "One of the finest physicists alive",
        ar: "من أبرع الفيزيائيين أحياءً",
      },
      { en: "Retired for the wrong reason", ar: "اعتزل لسبب غير وجيه" },
    ],
    origin: {
      en: "A scientist who became one of the most powerful beings on Earth in the early sixties and was quietly asked to retire when the country found out he was black. He came back decades later.",
      ar: "عالم صار من أقوى الكائنات على الأرض في أوائل الستينيات، فطُلب إليه بهدوء أن يعتزل حين علمت البلاد أنه أسود. وعاد بعد عقود.",
    },
    related: [{ id: "iron-man", kind: "ally" }],
  },
  {
    id: "onslaught",
    nameEn: "Onslaught",
    nameAr: "أونسلوت",
    aliases: ["Onslaught"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Psychic Entity",
    powers: [
      {
        en: "Xavier's telepathy and Magneto's magnetism",
        ar: "تخاطر إكزافييه ومغناطيسية ماغنيتو",
      },
      { en: "Psionic energy without limit", ar: "طاقة ذهنية بلا حدّ" },
      { en: "Reshapes matter around him", ar: "يعيد تشكيل المادة من حوله" },
      { en: "Every power of both", ar: "كل قدرات الاثنين" },
      {
        en: "Beat every hero on Earth at once",
        ar: "هزم أبطال الأرض جميعًا دفعة واحدة",
      },
      { en: "Born from one lost temper", ar: "وُلد من نوبة غضب واحدة" },
    ],
    origin: {
      en: "What formed when Xavier finally lost his temper inside Magneto's mind and something took the worst of both and kept going. It is the argument between them, alive and hostile.",
      ar: "ما تكوّن حين فقد إكزافير أعصابه أخيرًا داخل عقل ماغنيتو، فأخذ شيءٌ أسوأ ما فيهما ومضى. إنه الخصام بينهما، حيًّا وعدائيًا.",
    },
    related: [
      { id: "professor-x", kind: "variant" },
      { id: "magneto", kind: "variant" },
    ],
  },
];

/**
 * MUTANTS, batch 10. Two are Omega-level and typed as such — Proteus and
 * Rachel Summers both appear on the supplied Omega subset, and `mutantClass`
 * is a published in-universe rank rather than a power score this site invented.
 */
const mutantsB: CharacterDraft[] = [
  {
    id: "blob",
    nameEn: "Blob",
    nameAr: "بلوب",
    aliases: ["Blob", "Fred Dukes", "Frederick Dukes", "The Blob"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Immovable once planted",
        ar: "لا يتزحزح متى تمكّن",
      },
      {
        en: "Absorbs an impact and throws it back",
        ar: "يمتص الصدمة ويردّها",
      },
      {
        en: "Enormous strength, and enormous mass",
        ar: "قوة هائلة، وكتلة هائلة",
      },
      {
        en: "Flesh that bullets and blades bounce off",
        ar: "لحم يرتد عنه الرصاص والنصال",
      },
      {
        en: "Bends gravity beneath his own feet",
        ar: "يثني الجاذبية تحت قدميه",
      },
      {
        en: "Lift him off the ground and it stops",
        ar: "ارفعه عن الأرض فتتوقف",
      },
    ],
    origin: {
      en: "A circus strongman who cannot be moved from a spot he has decided to stand on. He joined Magneto early, and most of his life has been about being laughed at first and unmovable second.",
      ar: "قويّ سيرك لا يمكن إزاحته عن موضع قرّر الوقوف فيه. انضم إلى ماغنيتو مبكرًا، وأكثر عمره كان أن يُضحَك عليه أولًا ثم لا يُزحزح ثانيًا.",
    },
    related: [{ id: "magneto", kind: "ally" }],
  },
  {
    id: "boom-boom",
    nameEn: "Boom-Boom",
    nameAr: "بوم بوم",
    aliases: ["Boom-Boom", "Tabitha Smith", "Meltdown", "Boomer"],
    category: "antihero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Makes plasma spheres out of nothing",
        ar: "تصنع كرات بلازما من لا شيء",
      },
      {
        en: "Sets the yield, from a pop to a crater",
        ar: "تحدد القوة، من طقّة إلى حفرة",
      },
      {
        en: "And sets the fuse, which is the trick",
        ar: "وتحدد الفتيل، وتلك هي الحيلة",
      },
      {
        en: "Throws a great many of them at once",
        ar: "تقذف كثيرًا منها دفعة واحدة",
      },
      {
        en: "They cannot hurt her until they go off",
        ar: "لا تؤذيها حتى تنفجر",
      },
      {
        en: "Time bombs, and she names them that",
        ar: "قنابل موقوتة، وهي تسميها كذلك",
      },
    ],
    origin: {
      en: "A runaway who makes glowing spheres that explode when she decides they should, and who has left more teams than most people join. The recklessness is a habit she keeps meaning to break.",
      ar: "هاربة تصنع كرات متوهّجة تنفجر متى قرّرت، وقد تركت من الفرق أكثر مما ينضم إليه معظم الناس. والتهوّر عادة تنوي دائمًا أن تقلع عنها.",
    },
    related: [{ id: "cannonball", kind: "ally" }],
  },
  {
    id: "caliban",
    nameEn: "Caliban",
    nameAr: "كاليبان",
    aliases: ["Caliban"],
    category: "antihero",
    affiliation: ["Morlocks"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Senses any mutant across great distance",
        ar: "يستشعر أي متحول عبر مسافات هائلة",
      },
      {
        en: "Tracks them, which is how the Morlocks formed",
        ar: "يتعقبهم، وهكذا تكوّن المورلوك",
      },
      {
        en: "Feels your fear, and feeds on it",
        ar: "يشعر بخوفك، ويقتات عليه",
      },
      {
        en: "Amplifies it until you weaken",
        ar: "يضاعفه حتى توهن",
      },
      {
        en: "As Death he was huge, and strong with it",
        ar: "كالموت كان ضخمًا، وقويًا معه",
      },
      {
        en: "A healing factor in that form",
        ar: "عامل شفاء في تلك الهيئة",
      },
    ],
    origin: {
      en: "A Morlock who can feel every mutant around him, which made him useful to people who were not kind to him. He has been a tracker for both sides and belonged to neither.",
      ar: "مورلوك يحسّ بكل متحوّل حوله، وهو ما جعله نافعًا لمن لم يرفقوا به. عمل متعقّبًا للجهتين ولم ينتمِ إلى أيّ منهما.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "callisto",
    nameEn: "Callisto",
    nameAr: "كاليستو",
    aliases: ["Callisto"],
    category: "antihero",
    affiliation: ["Morlocks"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "All five senses at superhuman pitch",
        ar: "الحواس الخمس بحدة خارقة",
      },
      {
        en: "So sharp that rain can hurt her",
        ar: "حادة حتى إن المطر قد يؤلمها",
      },
      {
        en: "Strength, speed and reflexes to match",
        ar: "قوة وسرعة وردود فعل توازيها",
      },
      {
        en: "The best knife-fighter in the tunnels",
        ar: "أمهر مقاتلة بالسكين في الأنفاق",
      },
      {
        en: "Beat Storm, briefly, before losing",
        ar: "هزمت ستورم، قليلًا، قبل أن تخسر",
      },
      {
        en: "Wore grafted tentacle arms for a while",
        ar: "ارتدت أذرع لوامس مزروعة فترة",
      },
    ],
    origin: {
      en: "The leader of the Morlocks, who took the job by being the toughest one down there and lost it to Storm in a knife fight she insisted on. She stayed anyway.",
      ar: "زعيمة المورلوك، نالت الزعامة بكونها أقساهم في الأسفل، وخسرتها أمام ستورم في نزال سكاكين أصرّت عليه. وبقيت رغم ذلك.",
    },
    related: [{ id: "storm", kind: "enemy" }],
  },
  {
    id: "chamber",
    nameEn: "Chamber",
    nameAr: "تشيمبر",
    aliases: ["Chamber", "Jonothon Starsmore"],
    category: "hero",
    affiliation: ["Generation X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A furnace of psionic plasma for a chest",
        ar: "فرن من بلازما نفسية مكان صدره",
      },
      {
        en: "Blasts that explode what they touch",
        ar: "قذائف تفجّر ما تلمسه",
      },
      {
        en: "Breaks the molecular bonds of a thing",
        ar: "يكسر الروابط الجزيئية للشيء",
      },
      {
        en: "Speaks only by telepathy, having no mouth",
        ar: "يتكلم بالتخاطر فقط، إذ لا فم له",
      },
      {
        en: "Does not eat, drink or breathe",
        ar: "لا يأكل ولا يشرب ولا يتنفس",
      },
      {
        en: "Immune to Omega Red's death factor",
        ar: "محصّن ضد عامل موت أوميغا ريد",
      },
    ],
    origin: {
      en: "A young mutant whose power detonated the first time it woke and took his jaw and chest with it. He has no mouth, so he talks telepathically, and he is far more articulate than most people expect.",
      ar: "متحوّل يافع انفجرت قوته أول ما استيقظت فأخذت فكّه وصدره. لا فم له فيتكلم تخاطرًا، وهو أفصح بكثير مما يتوقع الناس.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "darwin",
    nameEn: "Darwin",
    nameAr: "داروين",
    aliases: ["Darwin", "Armando Munoz"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Evolves to survive whatever comes",
        ar: "يتطور لينجو مما يأتي",
      },
      {
        en: "Gills underwater, armour under attack",
        ar: "خياشيم تحت الماء، ودرع تحت الهجوم",
      },
      {
        en: "Night vision when the light goes",
        ar: "رؤية ليلية متى غاب الضوء",
      },
      {
        en: "Has turned to energy to escape death",
        ar: "تحوّل طاقةً هربًا من الموت",
      },
      {
        en: "And teleported, when nothing else worked",
        ar: "وانتقل، حين لم ينفع غير ذلك",
      },
      {
        en: "It happens whether he decides or not",
        ar: "يحدث سواء قرّر أم لا",
      },
    ],
    origin: {
      en: "A mutant whose body reacts to any threat by becoming whatever survives it, without asking him first. Put underwater he grows gills; shot at, he turns to something the bullet cannot hurt.",
      ar: "متحوّل يستجيب جسده لأي خطر بأن يصير ما ينجو منه، دون أن يستأذنه. يُغرَق فتنبت له خياشيم، ويُرمى بالرصاص فيصير ما لا تؤذيه الرصاصة.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "firestar",
    nameEn: "Firestar",
    nameAr: "فايرستار",
    aliases: ["Firestar", "Angelica Jones"],
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Generates microwave radiation",
        ar: "تولّد إشعاعًا ميكرويًا",
      },
      {
        en: "Blasts of heat that melt metal",
        ar: "قذائف حرارة تذيب المعدن",
      },
      {
        en: "Boils a liquid where it stands",
        ar: "تغلي سائلًا في مكانه",
      },
      {
        en: "Flies on it",
        ar: "تطير به",
      },
      {
        en: "A heat aura that shields her",
        ar: "هالة حرارة تحميها",
      },
      {
        en: "Unchecked output damages her own body",
        ar: "الإفراط يضرّ جسدها هي",
      },
    ],
    origin: {
      en: "A mutant who generates microwave radiation, flies on it, and has to live with the fact that using it has been quietly damaging her for years.",
      ar: "متحوّلة تولّد إشعاع الميكروويف وتطير عليه، وعليها أن تتعايش مع أن استعماله ظل يؤذيها بهدوء سنين.",
    },
    related: [{ id: "iceman", kind: "ally" }],
  },
  {
    id: "magma",
    nameEn: "Magma",
    nameAr: "ماغما",
    aliases: ["Magma", "Amara Aquilla"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Moves the tectonic plates themselves",
        ar: "تحرك الصفائح التكتونية نفسها",
      },
      {
        en: "Earthquakes, and ground that opens",
        ar: "زلازل، وأرض تنفتح",
      },
      {
        en: "Commands lava, and hurls molten rock",
        ar: "تأمر الحمم، وتقذف الصخر المنصهر",
      },
      {
        en: "Becomes a body of living fire",
        ar: "تصير جسدًا من نار حية",
      },
      {
        en: "Flies on it, and throws fire",
        ar: "تطير بها، وتقذف النار",
      },
      {
        en: "Her temper has caused eruptions",
        ar: "غضبها تسبب في ثورات بركانية",
      },
    ],
    origin: {
      en: "A girl raised in a Roman colony that never learned the empire had fallen, whose power over the earth itself surfaced when she was thrown into a pit of lava as a sacrifice.",
      ar: "فتاة نشأت في مستعمرة رومانية لم تعلم قط بسقوط الإمبراطورية، ظهرت قدرتها على الأرض نفسها حين أُلقيت في حفرة حمم قربانًا.",
    },
    related: [{ id: "cannonball", kind: "ally" }],
  },
  {
    id: "proteus",
    nameEn: "Proteus",
    nameAr: "بروتيوس",
    aliases: ["Proteus", "Kevin MacTaggert"],
    /* ANTIVILLAIN. A child with no body of his own who burns through the people he wears. His mother kept him locked up and could not bring herself to end it. */
    category: "antivillain",
    /* NOT BROTHERHOOD. Moira MacTaggert's son, who has never joined anything. */
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      {
        en: "Rewrites the local laws of physics",
        ar: "يعيد كتابة قوانين الفيزياء حوله",
      },
      {
        en: "Reality destabilises where he stands",
        ar: "يضطرب الواقع حيث يقف",
      },
      {
        en: "Distorts what anyone sees, at will",
        ar: "يشوّه ما يراه أي أحد، كما يشاء",
      },
      {
        en: "Jumps to a new body when one burns out",
        ar: "ينتقل إلى جسد جديد متى احترق الأول",
      },
      {
        en: "Grows stronger the more he uses it",
        ar: "يزداد قوة كلما استعملها",
      },
      {
        en: "Metal disrupts him",
        ar: "المعدن يشوّشه",
      },
    ],
    origin: {
      en: "Moira MacTaggert's son, an Omega-level mutant with no body of his own who wears other people until they burn out. His mother kept him locked up and could not bring herself to end it.",
      ar: "ابن مويرا ماكتاغرت، متحوّل من مستوى أوميغا بلا جسد خاص، يلبس الناس حتى يحترقوا. أبقته أمه حبيسًا ولم تقوَ على إنهاء الأمر.",
    },
    related: [{ id: "professor-x", kind: "enemy" }],
  },
  {
    id: "rachel-summers",
    nameEn: "Rachel Summers",
    nameAr: "رايتشل سمرز",
    aliases: ["Rachel Summers", "Rachel Grey"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    /* THE TERM WAS COINED FOR HER. "Class Omega" enters Marvel in Uncanny
       X-Men #208 (1986), where Nimrod scans Rachel and reports that the
       "upper limit of target-subject's abilities has yet to be determined" —
       still the definition House of X #1 gave in 2019. Leaving her unlabelled
       because a 2019 data page omitted her had it backwards. */
    mutantClass: "omega",
    powers: [
      {
        en: "Omega telepathy and telekinesis both",
        ar: "تخاطر وتحريك ذهني بمستوى أوميغا",
      },
      { en: "A Phoenix host in her own right", ar: "حاملة فينيكس بجدارتها" },
      {
        en: "Cosmic fire, and psionics amplified",
        ar: "نار كونية وقوى ذهنية مضاعفة",
      },
      { en: "Sends her mind across time", ar: "ترسل عقلها عبر الزمن" },
      {
        en: "Tracks a mutant anywhere, from training",
        ar: "تتعقب متحولًا في أي مكان، بالتدريب",
      },
      { en: "Came back from a dead future", ar: "عادت من مستقبل ميت" },
    ],
    origin: {
      en: "The daughter Scott Summers and Jean Grey had in a future that was destroyed, who came back to a present where her parents are younger than the memories she has of them.",
      ar: "ابنة سكوت سمرز وجين غراي في مستقبل دُمّر، عادت إلى حاضر أبواها فيه أصغر من الذكريات التي تحملها عنهما.",
    },
    related: [
      { id: "jean-grey", kind: "family" },
      { id: "cyclops", kind: "family" },
    ],
  },
  {
    id: "selene",
    nameEn: "Selene Gallio",
    nameAr: "سيلين غاليو",
    /* NOT a bare "Selene". Daredevil: Born Again credits a character by that
       name and it is not the Hellfire Club's Black Queen — a street-level MCU
       show has no millennia-old sorceress in it. A single given name as an
       alias is the false match this corpus has already been caught by with
       Trevor, Jean and Gwen. Her own nameEn still carries the search. */
    aliases: ["Selene Gallio", "Black Queen"],
    category: "villain",
    affiliation: ["Hellfire Club"],
    universe: ["fox"],
    species: "Mutant",
    magicSchools: ["necromancy"],
    powers: [
      { en: "Drains a life and leaves dust", ar: "تستنزف الحياة وتترك غبارًا" },
      { en: "Seventeen thousand years of it", ar: "سبعة عشر ألف عام من ذلك" },
      {
        en: "Telepathy, telekinesis and strength",
        ar: "تخاطر وتحريك ذهني وقوة",
      },
      {
        en: "Animates fire and dead material alike",
        ar: "تحيي النار والمواد الميتة سواء",
      },
      {
        en: "Necromancy, and armies of the dead",
        ar: "استحضار الموتى، وجيوش منهم",
      },
      {
        en: "Drain enough and she becomes a god",
        ar: "إن استنزفت ما يكفي صارت إلهة",
      },
    ],
    origin: {
      en: "A mutant who has been alive for millennia by taking the life out of other people, and who runs the Hellfire Club's inner circle when she is not trying to become a goddess outright.",
      ar: "متحوّلة عاشت آلاف السنين بامتصاص حياة الآخرين، وتدير الدائرة الداخلية لنادي هيلفاير حين لا تسعى إلى أن تصير إلهة صراحة.",
    },
    related: [{ id: "emma-frost", kind: "enemy" }],
  },
  {
    id: "warpath",
    nameEn: "Warpath",
    nameAr: "ووربَاث",
    /* NOT "Thunderbird". James took his dead brother's codename, and John
       Proudstar is already a record here — sharing the alias would give one
       brother the other's credits. They are two people. */
    aliases: ["Warpath", "James Proudstar"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Stronger than his brother ever was",
        ar: "أقوى مما كان أخوه قط",
      },
      {
        en: "Speed, durability, stamina and agility",
        ar: "سرعة وصلابة وتحمّل ورشاقة",
      },
      {
        en: "Senses razor-sharp, and he tracks",
        ar: "حواس حادة، ويتعقب",
      },
      {
        en: "Twin vibranium knives",
        ar: "سكينان من الفيبرانيوم",
      },
      {
        en: "Gained flight, for a time",
        ar: "اكتسب الطيران، لفترة",
      },
      {
        en: "An X-Force veteran",
        ar: "من قدامى إكس-فورس",
      },
    ],
    origin: {
      en: "The younger brother of the first Thunderbird, who joined the people he blamed for his brother's death and stayed long enough to stop blaming them.",
      ar: "الأخ الأصغر لأول ثاندربيرد، انضم إلى من حمّلهم موت أخيه وبقي حتى كفّ عن تحميلهم.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
];

/**
 * MUTANTS, batch 11. Three more Omegas off the published list — Exodus, Nate
 * Grey and Vulcan — and Cypher, who is the argument against reading
 * `mutantClass` as a power score: he understands every language there is,
 * which sounds like nothing until you notice it covers machines, lies and the
 * way a person is standing.
 */
const mutantsC: CharacterDraft[] = [
  {
    id: "cypher",
    nameEn: "Cypher",
    nameAr: "سايفر",
    aliases: ["Cypher", "Doug Ramsey", "Douglas Ramsey"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Understands any language on hearing it",
        ar: "يفهم أي لغة بمجرد سماعها",
      },
      {
        en: "Alien, animal, machine code, cipher",
        ar: "لغات فضائية وحيوانية وشفرات آلة",
      },
      {
        en: "Reads a fighter's body and predicts him",
        ar: "يقرأ جسد المقاتل فيتوقع حركته",
      },
      {
        en: "Speaks to technology directly",
        ar: "يخاطب التقنية مباشرة",
      },
      {
        en: "Merges with Warlock, and shapeshifts",
        ar: "يندمج مع وارلوك، ويبدّل شكله",
      },
      {
        en: "Reads the language of Krakoa itself",
        ar: "يقرأ لغة كراكوا نفسها",
      },
    ],
    origin: {
      en: "A mutant who understands every language instantly, which sounds minor next to flight or fire until you notice he can read a machine, a lie, or a person's posture with the same fluency.",
      ar: "متحوّل يفهم كل لغة فورًا، وهو ما يبدو تافهًا إلى جانب الطيران أو النار حتى تنتبه أنه يقرأ آلةً أو كذبةً أو وقفة شخص بالطلاقة نفسها.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "exodus",
    nameEn: "Exodus",
    nameAr: "إكزودس",
    aliases: ["Exodus", "Bennet du Paris"],
    category: "villain",
    /* An Acolyte, which he already carried. Magneto's follower is not Magneto's Brotherhood. */
    affiliation: ["Acolytes"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      {
        en: "Omega telekinesis: he moved Arakko to Mars",
        ar: "تحريك ذهني أوميغا: نقل أراكو إلى المريخ",
      },
      {
        en: "Telepathy, and battles on the astral plane",
        ar: "تخاطر، ومعارك في المستوى الأثيري",
      },
      {
        en: "Force fields near enough invulnerable",
        ar: "حقول قوة تكاد لا تُخترق",
      },
      {
        en: "Teleports, flies, and raises the dead",
        ar: "ينتقل ويطير ويحيي الموتى",
      },
      {
        en: "Drains psychic energy to boost his own",
        ar: "يمتص الطاقة النفسية ليعزز طاقته",
      },
      {
        en: "Woken from the Crusades, and near-immortal",
        ar: "أُيقظ من الحروب الصليبية، ويكاد يخلد",
      },
    ],
    origin: {
      en: "A twelfth-century crusader woken into the present as an Omega-level mutant, who took Magneto's argument and made a religion of it. He is the true believer Magneto never asked for.",
      ar: "صليبيّ من القرن الثاني عشر أُوقظ في الحاضر متحوّلًا من مستوى أوميغا، أخذ حجّة ماغنيتو فجعلها دينًا. وهو المؤمن المتشدّد الذي لم يطلبه ماغنيتو قط.",
    },
    related: [{ id: "magneto", kind: "ally" }],
  },
  {
    id: "fantomex",
    nameEn: "Fantomex",
    nameAr: "فانتوميكس",
    aliases: ["Fantomex", "Charlie Cluster-7"],
    category: "antihero",
    affiliation: ["Weapon X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Misdirects the senses of everyone near",
        ar: "يضلل حواس كل من حوله",
      },
      {
        en: "You do not see what he is actually doing",
        ar: "لا ترى ما يفعله حقًا",
      },
      {
        en: "Three brains, working separately",
        ar: "ثلاثة أدمغة، تعمل منفصلة",
      },
      {
        en: "So he fights and plans at the same time",
        ar: "فيقاتل ويخطط في آن واحد",
      },
      {
        en: "E.V.A., his nerves, flies as a ship",
        ar: "إيفا، أعصابه، تطير كسفينة",
      },
      {
        en: "A healing factor, and Weapon XIII training",
        ar: "عامل شفاء، وتدريب ويبون 13",
      },
    ],
    origin: {
      en: "A weapon grown in a laboratory who escaped and reinvented himself as a gentleman thief, complete with an accent he chose. His power is making you look at the wrong thing.",
      ar: "سلاح أُنمي في مختبر ففرّ وأعاد صنع نفسه لصًّا نبيلًا، بلكنة اختارها بنفسه. وقدرته أن يجعلك تنظر إلى الشيء الخطأ.",
    },
    related: [{ id: "wolverine", kind: "ally" }],
  },
  {
    id: "hellion",
    nameEn: "Hellion",
    nameAr: "هيليون",
    aliases: ["Hellion", "Julian Keller"],
    category: "antihero",
    affiliation: ["New Mutants", "Hellions"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Telekinesis, and a great deal of it",
        ar: "تحريك ذهني، وكثير منه",
      },
      {
        en: "Force blasts of bright green",
        ar: "قذائف قوة خضراء ساطعة",
      },
      {
        en: "Flies, wrapped in his own field",
        ar: "يطير، ملفوفًا بحقله",
      },
      {
        en: "Flew at twice the speed of sound once",
        ar: "طار مرة بضعف سرعة الصوت",
      },
      {
        en: "A field that pumps every punch he throws",
        ar: "حقل يضاعف كل لكمة يوجهها",
      },
      {
        en: "Stop his thought and he stops",
        ar: "أوقف فكره فيتوقف",
      },
    ],
    origin: {
      en: "A wealthy telekinetic with a mouth that gets him into more trouble than his power gets him out of, who lost both hands and had to learn the whole thing again.",
      ar: "محرّك ذهني ثري، لسانه يورده من المآزق أكثر مما تخرجه قوته، فقد يديه واضطر إلى تعلّم الأمر كله من جديد.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "nate-grey",
    nameEn: "Nate Grey",
    nameAr: "نيت غراي",
    aliases: ["Nate Grey", "X-Man", "Nathaniel Grey"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    /* Designated omega in canon and absent from one roster. Legion says it
       out loud in Uncanny X-Men #4 — "Very very powerful. Omega level. More
       than." House of X #1 lists the omegas ALIVE AND ON KRAKOA at that
       moment, and Nate had just died at the end of Age of X-Man. A census is
       not a taxonomy. */
    mutantClass: "omega",
    powers: [
      {
        en: "Reaches every mind on Earth, and past it",
        ar: "يبلغ كل عقل على الأرض وما بعدها",
      },
      {
        en: "Telekinesis at omega level, at range",
        ar: "تحريك ذهني بمستوى أوميغا، عن بُعد",
      },
      {
        en: "Reshapes landscapes and whole worlds",
        ar: "يعيد تشكيل المشاهد وعوالم بأسرها",
      },
      {
        en: "Even asleep, reality bends around him",
        ar: "حتى نائمًا، يلتوي الواقع حوله",
      },
      {
        en: "Strong enough to face cosmic beings",
        ar: "قوي بما يكفي لمواجهة كائنات كونية",
      },
      { en: "Burning himself out to do it", ar: "يحرق نفسه ليفعل ذلك" },
    ],
    origin: {
      en: "An Omega-level mutant engineered in another timeline from Scott Summers and Jean Grey, who arrived here with more power than his body can hold and a certainty that he can fix the world.",
      ar: "متحوّل من مستوى أوميغا هُندس في خط زمني آخر من سكوت سمرز وجين غراي، وصل إلى هنا بقوة تفوق ما يحتمله جسده، وبيقين أنه قادر على إصلاح العالم.",
    },
    related: [
      { id: "cyclops", kind: "family" },
      { id: "jean-grey", kind: "family" },
    ],
  },
  {
    id: "pixie",
    nameEn: "Pixie",
    nameAr: "بيكسي",
    aliases: ["Pixie", "Megan Gwynn"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Iridescent wings, and she is agile on them",
        ar: "أجنحة قزحية، وهي رشيقة بها",
      },
      {
        en: "Dust that brings hallucinations",
        ar: "غبار يجلب الهلوسة",
      },
      {
        en: "A dagger cut from her own soul",
        ar: "خنجر قُطع من روحها",
      },
      {
        en: "It strikes the spirit, and disrupts magic",
        ar: "يضرب الروح، ويعطل السحر",
      },
      {
        en: "A black-magic teleport for a whole group",
        ar: "نقل بسحر أسود لمجموعة كاملة",
      },
      {
        en: "Growing into a sorceress, slowly",
        ar: "تصير ساحرة، ببطء",
      },
    ],
    origin: {
      en: "A cheerful young mutant with butterfly wings who had a piece of her soul cut out to forge a magic dagger, and who came back from that funnier rather than darker.",
      ar: "متحوّلة يافعة مرحة بجناحي فراشة، اقتُطعت قطعة من روحها لصوغ خنجر سحري، فعادت من ذلك أكثر طرافة لا أكثر عتمة.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "prodigy",
    nameEn: "Prodigy",
    nameAr: "برودجي",
    aliases: ["Prodigy", "David Alleyne"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Copies the skills of everyone near him",
        ar: "ينسخ مهارات كل من حوله",
      },
      {
        en: "Languages, science, combat, all at once",
        ar: "لغات وعلوم وقتال، دفعة واحدة",
      },
      {
        en: "It used to leave when they left",
        ar: "كان يزول متى غادروا",
      },
      {
        en: "The Cuckoos made all of it permanent",
        ar: "الكوكوز جعلن ذلك كله دائمًا",
      },
      {
        en: "Fluent in whatever the room knows",
        ar: "يتقن ما تعرفه الغرفة",
      },
      {
        en: "A strategist, and a teacher now",
        ar: "استراتيجي، ومعلّم الآن",
      },
    ],
    origin: {
      en: "A mutant who absorbs the skills of anyone near him, lost the power, and found he had kept everything he had ever learned. He also remembers every version of himself the resurrections made.",
      ar: "متحوّل يمتص مهارات من حوله، فقد قدرته فوجد أنه احتفظ بكل ما تعلّمه يومًا. ويتذكر أيضًا كل نسخة من نفسه صنعتها الإحياءات.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "rictor",
    nameEn: "Rictor",
    nameAr: "ريكتور",
    aliases: ["Rictor", "Julio Richter"],
    category: "hero",
    affiliation: ["X-Factor"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Generates seismic waves at will",
        ar: "يولّد موجات زلزالية كما يشاء",
      },
      {
        en: "Earthquakes, and shockwaves that shatter",
        ar: "زلازل، وموجات صدمية تحطم",
      },
      {
        en: "Moves rock, soil and magma with them",
        ar: "يحرك الصخر والتربة والصهارة بها",
      },
      {
        en: "Tunnels through the ground to travel",
        ar: "ينفق عبر الأرض ليتنقل",
      },
      {
        en: "Druidic earth magic, learned lately",
        ar: "سحر أرضي درويدي، تعلمه حديثًا",
      },
      {
        en: "A wave of magma killed several Externals",
        ar: "موجة صهارة قتلت عدة إكسترناليين",
      },
    ],
    origin: {
      en: "A mutant who generates seismic waves, who lost his power on M-Day and spent the years without it discovering he was still the same person underneath.",
      ar: "متحوّل يولّد موجات زلزالية، فقد قوته يوم إم وأمضى السنين بدونها يكتشف أنه ظل الشخص نفسه تحت ذلك.",
    },
    related: [{ id: "cannonball", kind: "ally" }],
  },
  {
    id: "sauron",
    nameEn: "Sauron",
    nameAr: "سورون",
    aliases: ["Sauron", "Karl Lykos"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Drains life by touch to feed himself",
        ar: "يمتص الحياة بلمسة ليقتات",
      },
      {
        en: "Draining a mutant turns him into Sauron",
        ar: "امتصاص متحول يحيله إلى ساورون",
      },
      {
        en: "Takes a piece of that mutant's power too",
        ar: "ويأخذ جزءًا من قدرة ذلك المتحول",
      },
      {
        en: "Fire breath that burned Hercules",
        ar: "نفَس ناري أحرق هرقل",
      },
      {
        en: "A hypnotic gaze that plants delusions",
        ar: "نظرة منوّمة تزرع الأوهام",
      },
      {
        en: "Flies on a twelve-foot wingspan",
        ar: "يطير بباع اثني عشر قدمًا",
      },
    ],
    origin: {
      en: "A doctor who has to drain mutant life-force to survive and turns into a great winged reptile when he does. He fights it, loses, and fights it again.",
      ar: "طبيب مضطر إلى امتصاص طاقة حياة المتحوّلين ليبقى، فيتحوّل حين يفعل إلى زاحف مجنّح ضخم. يقاوم فيخسر ثم يقاوم من جديد.",
    },
    related: [{ id: "professor-x", kind: "enemy" }],
  },
  {
    id: "scalphunter",
    nameEn: "Scalphunter",
    nameAr: "سكالبهنتر",
    aliases: ["Scalphunter", "John Greycrow"],
    category: "villain",
    affiliation: ["Marauders"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Operates any weapon on sight",
        ar: "يشغّل أي سلاح بمجرد رؤيته",
      },
      {
        en: "Builds a working firearm out of scrap",
        ar: "يبني سلاحًا عاملًا من خردة",
      },
      {
        en: "Repairs and improvises any machinery",
        ar: "يصلح ويرتجل أي آلة",
      },
      {
        en: "A superhuman marksman with all of it",
        ar: "رامٍ خارق بكل ذلك",
      },
      {
        en: "Lethal without a weapon too",
        ar: "فتّاك بلا سلاح أيضًا",
      },
      {
        en: "Led the Marauders through the Massacre",
        ar: "قاد المارودرز خلال المجزرة",
      },
    ],
    origin: {
      en: "A mutant who can operate any weapon he picks up as though he built it, and one of the Marauders Mister Sinister sent into the Morlock tunnels.",
      ar: "متحوّل يشغّل أي سلاح يلتقطه كأنه صانعه، وأحد المغيرين الذين أرسلهم مستر سينيستر إلى أنفاق المورلوك.",
    },
    related: [{ id: "mister-sinister", kind: "ally" }],
  },
  {
    id: "stepford-cuckoos",
    nameEn: "Stepford Cuckoos",
    nameAr: "فتيات ستيبفورد",
    aliases: ["Stepford Cuckoos", "Celeste", "Mindee", "Phoebe"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Five telepaths sharing one mind",
        ar: "خمس متخاطرات يتشاركن عقلًا واحدًا",
      },
      {
        en: "Pooled, their power multiplies",
        ar: "مجتمعة، تتضاعف قوتهن",
      },
      {
        en: "Cloned from Emma Frost's genome",
        ar: "مستنسخات من جينوم إيما فروست",
      },
      {
        en: "Mind control, illusion, psychic attack",
        ar: "سيطرة عقول وأوهام وهجوم نفسي",
      },
      {
        en: "Turn to organic diamond, as she does",
        ar: "يتحولن ألماسًا عضويًا، مثلها",
      },
      {
        en: "Three now, where there were five",
        ar: "ثلاث الآن، حيث كنّ خمسًا",
      },
    ],
    origin: {
      en: "Five identical telepaths cloned from Emma Frost who think as a single mind, and who have already lost two of their number. They finish each other's sentences because it is one sentence.",
      ar: "خمس قارئات أفكار متطابقات استُنسخن من إيما فروست ويفكرن كعقل واحد، وقد فقدن اثنتين منهن. يكملن جمل بعضهن لأنها جملة واحدة.",
    },
    related: [{ id: "emma-frost", kind: "family" }],
  },
  {
    id: "vulcan",
    nameEn: "Vulcan",
    nameAr: "فولكان",
    aliases: ["Vulcan", "Gabriel Summers"],
    /* ANTIVILLAIN. The Summers brother nobody knew existed, raised as a slave, who came back angry enough to take an empire. */
    category: "antivillain",
    affiliation: ["Shi'ar"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      { en: "Controls any energy that exists", ar: "يتحكم بأي طاقة موجودة" },
      {
        en: "Absorbs a blast and returns it larger",
        ar: "يمتص طلقة ويردّها أكبر",
      },
      {
        en: "Omega-level, with no known ceiling",
        ar: "بمستوى أوميغا، بلا سقف معروف",
      },
      { en: "Took the Shi'ar throne by force", ar: "انتزع عرش الشياعر بالقوة" },
      {
        en: "Fought Gladiator and the Imperial Guard",
        ar: "قاتل غلادييتور والحرس الإمبراطوري",
      },
      { en: "The third Summers brother", ar: "ثالث إخوة سامرز" },
    ],
    origin: {
      en: "The Summers brother nobody knew existed, an Omega-level mutant raised as a slave who came back angry enough to take an empire and did.",
      ar: "أخو سمرز الذي لم يعلم أحد بوجوده، متحوّل من مستوى أوميغا نشأ عبدًا وعاد من الغضب إلى حدّ أن ينتزع إمبراطورية، ففعل.",
    },
    related: [
      { id: "cyclops", kind: "family" },
      { id: "havok", kind: "family" },
    ],
  },
];

/**
 * MUTANTS, batch 12. Kwannon is filed as a `variant` of Psylocke rather than
 * an ally, which is the honest edge: Betsy Braddock lived in her body for
 * years, Kwannon got it back, and both of them carry the Psylocke name now.
 * Two people and one identity is exactly what `variant` is for.
 */
const mutantsD: CharacterDraft[] = [
  {
    id: "armor",
    nameEn: "Armor",
    nameAr: "آرمور",
    aliases: ["Armor", "Hisako Ichiki"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A psionic exoskeleton around her",
        ar: "هيكل خارجي نفسي يحيط بها",
      },
      {
        en: "Immense strength inside it",
        ar: "قوة هائلة داخله",
      },
      {
        en: "Drawn from the spirits of her ancestors",
        ar: "مستمد من أرواح أسلافها",
      },
      {
        en: "It grows with her confidence",
        ar: "ينمو مع ثقتها",
      },
      {
        en: "Shapes it into spikes and giant fists",
        ar: "تشكّله أشواكًا وقبضات عملاقة",
      },
      {
        en: "Survives open space wearing it",
        ar: "تنجو في الفضاء المفتوح به",
      },
    ],
    origin: {
      en: "A young mutant who wraps herself in a glowing exoskeleton drawn from her ancestors, and which grows stronger the more of them she has lost.",
      ar: "متحوّلة يافعة تلفّ نفسها بهيكل خارجي متوهّج مستمدّ من أسلافها، ويزداد قوة كلما فقدت منهم أكثر.",
    },
    related: [{ id: "wolverine", kind: "ally" }],
  },
  {
    id: "cecilia-reyes",
    nameEn: "Cecilia Reyes",
    nameAr: "سيسيليا رييس",
    /* The New Mutants credits her "Dr. Reyes" — the film never says her first
       name, so the derivation missed her entirely without this. */
    aliases: ["Cecilia Reyes", "Dr. Reyes"],
    category: "hero",
    affiliation: ["X-Men", "New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A force field she never asked for",
        ar: "حقل قوة لم تطلبه",
      },
      {
        en: "It clings close, and stops what comes",
        ar: "يلتصق بها، ويوقف ما يأتي",
      },
      {
        en: "Projects it outward into barriers",
        ar: "تسقطه خارجًا حواجز",
      },
      {
        en: "Shapes it into blunt weapons",
        ar: "تشكّله أسلحة كليلة",
      },
      {
        en: "It runs whether she wants it or not",
        ar: "يعمل شاءت أم أبت",
      },
      {
        en: "A trauma surgeon, which matters more",
        ar: "جرّاحة طوارئ، وذاك أهم",
      },
    ],
    origin: {
      en: "An emergency surgeon who generates a protective field she cannot turn off, and who spent years refusing to be an X-Man because she already had a job saving lives.",
      ar: "جرّاحة طوارئ تولّد حقلًا واقيًا لا تستطيع إطفاءه، وأمضت سنين ترفض أن تكون من الإكس مِن لأن لها أصلًا عملًا في إنقاذ الأرواح.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "dust",
    nameEn: "Dust",
    nameAr: "داست",
    aliases: ["Dust", "Sooraya Qadir"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Turns into a cloud of abrasive sand",
        ar: "تتحول سحابة رمل كاشط",
      },
      {
        en: "Flows through any gap there is",
        ar: "تتدفق عبر أي فجوة",
      },
      {
        en: "Flays a target at speed",
        ar: "تسلخ هدفًا بسرعتها",
      },
      {
        en: "In sand form, almost nothing harms her",
        ar: "في هيئة الرمل لا يؤذيها شيء تقريبًا",
      },
      {
        en: "Resistant to telepathy and to magic",
        ar: "مقاومة للتخاطر وللسحر",
      },
      {
        en: "Controls every grain of it",
        ar: "تتحكم بكل حبة منه",
      },
    ],
    origin: {
      en: "An Afghan mutant who turns into a cloud of sand, rescued from slavers by Wolverine, and who wears the niqab because she chooses to and says so whenever anyone assumes otherwise.",
      ar: "متحوّلة أفغانية تتحول إلى سحابة رمل، أنقذها ولفرين من تجّار الرقيق، وترتدي النقاب لأنها تختاره وتقول ذلك كلما افترض أحد غيره.",
    },
    related: [{ id: "wolverine", kind: "ally" }],
  },
  {
    id: "elixir",
    nameEn: "Elixir",
    nameAr: "إليكسير",
    aliases: ["Elixir", "Josh Foley", "Joshua Foley"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      {
        en: "Total control over biological matter",
        ar: "سيطرة تامة على المادة الحيوية",
      },
      {
        en: "Mends any injury, and regrows an organ",
        ar: "يرمم أي إصابة، وينبت عضوًا",
      },
      {
        en: "Grew Prodigy a new heart from nothing",
        ar: "أنبت لبروديجي قلبًا من لا شيء",
      },
      {
        en: "Revives the recently dead. He turns gold",
        ar: "يحيي حديثي الموت، فيصير ذهبيًا",
      },
      {
        en: "Or stops a heart, and he turns black",
        ar: "أو يوقف قلبًا، فيصير أسود",
      },
      {
        en: "Rewrites DNA, his own or anyone's",
        ar: "يعيد كتابة الحمض النووي، له أو لغيره",
      },
    ],
    origin: {
      en: "An Omega-level healer who turns gold when he mends and black when he kills, and who found out he could do the second thing by accident. He was raised to hate mutants.",
      ar: "شافٍ من مستوى أوميغا يصير ذهبيًا حين يرمّم وأسود حين يقتل، واكتشف قدرته على الثانية مصادفة. وقد نشأ على كراهية المتحوّلين.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "mastermind",
    nameEn: "Mastermind",
    nameAr: "ماستر مايند",
    aliases: ["Mastermind", "Jason Wyngarde"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Illusions nobody can disbelieve",
        ar: "أوهام لا يستطيع أحد تكذيبها",
      },
      {
        en: "You see, hear, feel and taste them",
        ar: "تراها وتسمعها وتلمسها وتتذوقها",
      },
      {
        en: "Convinces a telepath his eyes are right",
        ar: "يقنع متخاطرًا بأن عينيه تصدقان",
      },
      {
        en: "Makes you believe your powers failed",
        ar: "يجعلك تصدق أن قدراتك خذلتك",
      },
      {
        en: "Made Jean into the Black Queen",
        ar: "حوّل جين إلى الملكة السوداء",
      },
      {
        en: "None of it records on film",
        ar: "لا شيء منها يظهر على فيلم",
      },
    ],
    origin: {
      en: "An illusionist who cannot lift a car but can make you certain you are somewhere else, and whose slow manipulation of Jean Grey is what set the Phoenix loose.",
      ar: "صانع أوهام لا يرفع سيارة لكنه يجعلك موقنًا أنك في مكان آخر، وتلاعبه البطيء بجين غراي هو ما أطلق العنقاء.",
    },
    related: [
      { id: "magneto", kind: "ally" },
      { id: "jean-grey", kind: "enemy" },
    ],
  },
  {
    id: "monet-st-croix",
    nameEn: "Monet St. Croix",
    nameAr: "مونيه سان كروا",
    aliases: ["Monet St. Croix", "Penance"],
    category: "antihero",
    affiliation: ["Generation X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Strength, speed and durability at once",
        ar: "قوة وسرعة وصلابة معًا",
      },
      {
        en: "Flight, and a healing factor with it",
        ar: "طيران، وعامل شفاء معه",
      },
      {
        en: "Telepathy, and some telekinesis",
        ar: "تخاطر، وشيء من التحريك الذهني",
      },
      {
        en: "Senses sharpened past a human's",
        ar: "حواس أحدّ من حواس البشر",
      },
      {
        en: "A genius, on top of all of it",
        ar: "وعبقرية، فوق ذلك كله",
      },
      {
        en: "Her siblings turn her into Penance",
        ar: "إخوتها يحيلونها إلى بينانس",
      },
    ],
    origin: {
      en: "A mutant who is genuinely good at nearly everything and has never once pretended otherwise, and who spent years trapped in another body by a brother nobody knew about.",
      ar: "متحوّلة بارعة حقًا في كل شيء تقريبًا ولم تتظاهر يومًا بغير ذلك، وقضت سنين حبيسة جسد آخر بفعل أخٍ لم يعلم به أحد.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "quentin-quire",
    nameEn: "Quentin Quire",
    nameAr: "كوينتن كواير",
    aliases: ["Quentin Quire", "Kid Omega", "Quintavius Quire"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      {
        en: "Omega telepathy, and a huge ceiling",
        ar: "تخاطر أوميغا، وسقف هائل",
      },
      {
        en: "Rewrites a mind, and battles the best",
        ar: "يعيد كتابة عقل، ويصارع الأفضل",
      },
      {
        en: "Telekinesis alongside it",
        ar: "وتحريك ذهني معه",
      },
      {
        en: "Psionic constructs out of nothing",
        ar: "بناءات نفسية من لا شيء",
      },
      {
        en: "Becomes pure psychic energy",
        ar: "يصير طاقة نفسية خالصة",
      },
      {
        en: "Rated a true Omega, and acts like it",
        ar: "مصنّف أوميغا حقيقيًا، ويتصرف بذلك",
      },
    ],
    origin: {
      en: "An Omega-level telepath who read the world's opinion of mutants and started a riot about it while still at school. He has grown up somewhat and lost none of the anger.",
      ar: "قارئ أفكار من مستوى أوميغا، قرأ رأي العالم في المتحوّلين فأشعل شغبًا بسببه وهو ما يزال في المدرسة. نضج بعض الشيء ولم يفقد شيئًا من غضبه.",
    },
    related: [{ id: "professor-x", kind: "enemy" }],
  },
  {
    id: "rockslide",
    nameEn: "Rockslide",
    nameAr: "روكسلايد",
    aliases: ["Rockslide", "Santo Vaccarro"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A body of living rock, moved by mind",
        ar: "جسد من صخر حي، يحركه العقل",
      },
      {
        en: "Immense strength, and durability",
        ar: "قوة هائلة، وصلابة",
      },
      {
        en: "Shattered, he puts himself back together",
        ar: "إذا تحطم أعاد تركيب نفسه",
      },
      {
        en: "Throws his own fists as projectiles",
        ar: "يقذف قبضتيه كالمقذوفات",
      },
      {
        en: "Builds a new body if the old one goes",
        ar: "يبني جسدًا جديدًا إذا ضاع القديم",
      },
      {
        en: "Nothing about him is fragile",
        ar: "لا شيء فيه هشّ",
      },
    ],
    origin: {
      en: "A mutant who is a pile of rock with a mind in it rather than a person wearing rock, which is why he can throw a fist across a room and grow a new one.",
      ar: "متحوّل هو كومة صخر فيها عقل، لا شخصٌ يرتدي صخرًا، ولهذا يقذف قبضته عبر الغرفة وتنبت له أخرى.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "surge",
    nameEn: "Surge",
    nameAr: "سيرج",
    aliases: ["Surge", "Noriko Ashida"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Absorbs electricity from anything near",
        ar: "تمتص الكهرباء من أي شيء قريب",
      },
      {
        en: "Discharges it as lightning from her hands",
        ar: "تفرغها برقًا من يديها",
      },
      {
        en: "Runs the current through her own nerves",
        ar: "تمرر التيار عبر أعصابها",
      },
      {
        en: "Which makes her superhumanly fast",
        ar: "مما يجعلها سريعة على نحو خارق",
      },
      {
        en: "Gauntlets keep the intake survivable",
        ar: "قفازات تجعل التدفق محتملًا",
      },
      {
        en: "Without them it scrambles her mind",
        ar: "بدونها يشوّش عقلها",
      },
    ],
    origin: {
      en: "A mutant who absorbs electricity whether she wants to or not and wears gauntlets to bleed it off, and who is running at a speed her own judgement cannot keep up with.",
      ar: "متحوّلة تمتص الكهرباء شاءت أم أبت وترتدي قفازين لتصريفها، وتجري بسرعة لا يلحق بها حكمها على الأمور.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "synch",
    nameEn: "Synch",
    nameAr: "سينك",
    aliases: ["Synch", "Everett Thomas"],
    category: "hero",
    affiliation: ["Generation X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "An aura that finds any power near him",
        ar: "هالة تجد أي قدرة قريبة منه",
      },
      {
        en: "Duplicates it at full strength",
        ar: "ينسخها بكامل قوتها",
      },
      {
        en: "And the owner's skill along with it",
        ar: "ومهارة صاحبها معها",
      },
      {
        en: "Synchs with several sources at once",
        ar: "يتزامن مع عدة مصادر معًا",
      },
      {
        en: "Loses it when they leave his range",
        ar: "يفقدها متى غادروا مداه",
      },
      {
        en: "Level-headed, which is why they follow him",
        ar: "رابط الجأش، ولذلك يتبعونه",
      },
    ],
    origin: {
      en: "A mutant who synchronises with any power near him and tends to use it with more precision than the person born to it. He died as a teenager and was one of the first brought back.",
      ar: "متحوّل يتزامن مع أي قوة قريبة منه ويستعملها غالبًا بدقة تفوق من وُلد بها. مات مراهقًا وكان من أوائل من أُعيدوا.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "xorn",
    nameEn: "Xorn",
    nameAr: "زورن",
    aliases: ["Xorn", "Shen Xorn", "Kuan-Yin Xorn"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A star inside his skull",
        ar: "نجم داخل جمجمته",
      },
      {
        en: "A helmet is all that contains it",
        ar: "خوذة هي كل ما يحتويه",
      },
      {
        en: "Channels it to heal, and he has",
        ar: "يوجّهه للشفاء، وقد فعل",
      },
      {
        en: "Stellar energy, heat, light, radiation",
        ar: "طاقة نجمية وحرارة وضوء وإشعاع",
      },
      {
        en: "Bends gravity where he stands",
        ar: "يثني الجاذبية حيث يقف",
      },
      {
        en: "Take the helmet off and it is a star",
        ar: "انزع الخوذة فإذا هو نجم",
      },
    ],
    origin: {
      en: "A mutant with a star where his brain should be, kept behind an iron mask. There are two of them, brothers, and most of what is remembered about the name belongs to an impostor.",
      ar: "متحوّل في موضع دماغه نجم، محبوس خلف قناع حديدي. وهما اثنان، أخوان، وأكثر ما يُذكر عن الاسم يخصّ منتحلًا.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "kwannon",
    nameEn: "Kwannon",
    nameAr: "كوانون",
    aliases: ["Kwannon", "Revanche"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A psi-blade katana that cuts the mind",
        ar: "كاتانا نفسية تقطع العقل",
      },
      {
        en: "And cuts matter, telekinetically",
        ar: "وتقطع المادة، بالتحريك الذهني",
      },
      {
        en: "Telepathy: reading, attack, control",
        ar: "تخاطر: قراءة وهجوم وسيطرة",
      },
      {
        en: "Telekinesis alongside it",
        ar: "وتحريك ذهني معه",
      },
      {
        en: "A master ninja and swordswoman",
        ar: "نينجا بارعة وسيّافة",
      },
      {
        en: "The body Betsy Braddock wore for years",
        ar: "الجسد الذي ارتدته بيتسي برادوك سنين",
      },
    ],
    origin: {
      en: "A Japanese assassin whose body Betsy Braddock lived in for years, and who eventually got it back and took up the Psylocke name herself rather than surrender it.",
      ar: "قاتلة محترفة يابانية عاشت بيتسي برادوك في جسدها سنين، ثم استعادته وحملت اسم سايلوك بنفسها بدل أن تتنازل عنه.",
    },
    related: [{ id: "psylocke", kind: "variant" }],
  },
];

/**
 * MUTANTS, batch 13 — and two who are NOT mutants, typed accordingly.
 *
 * The supplied roster marks Longshot, Lockheed and Warlock with an asterisk:
 * they are grouped with mutants in X-titles and none of them is Homo superior.
 * Longshot is bred in the Mojoverse and Lockheed is an alien dragon, so their
 * species say so and neither carries a mutantClass. Filing them as mutants to
 * match the list would put a wrong fact on a page to keep a heading tidy.
 *
 * The Technarch Warlock is deliberately NOT here. Adam Warlock already holds
 * the alias "Warlock" in this corpus, and C18 forbids two records sharing one
 * — it is the guard that stops one character absorbing another's credits.
 * He needs a distinguishing name before he can be added, which is a decision
 * rather than an oversight.
 */
const mutantsE: CharacterDraft[] = [
  {
    /**
     * SHE WAS MISSING, and the audit said she was present.
     *
     * The gap-check that drove these batches matched loosely — substring in
     * either direction — and reported Kitty Pryde as already in the corpus
     * when nothing of the sort was here. C4 caught it only because Lockheed
     * pointed at an id that does not exist. A looser check than the guard is
     * a check that lies.
     */
    id: "kitty-pryde",
    nameEn: "Kitty Pryde",
    nameAr: "كيتي برايد",
    aliases: ["Kitty Pryde", "Shadowcat", "Katherine Pryde", "Kate Pryde"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Phases through solid matter",
        ar: "تعبر المادة الصلبة",
      },
      {
        en: "Takes anyone she is touching with her",
        ar: "تأخذ معها كل من تلمسه",
      },
      {
        en: "Walks on air, between the molecules",
        ar: "تمشي على الهواء، بين الجزيئات",
      },
      {
        en: "Kills electronics by passing through",
        ar: "تعطّل الإلكترونيات بمرورها",
      },
      {
        en: "Her phase disrupts solid-energy beings",
        ar: "عبورها يشوّش كائنات الطاقة الصلبة",
      },
      {
        en: "A computer genius, trained by Wolverine",
        ar: "عبقرية حواسيب، دربها وولفرين",
      },
    ],
    origin: {
      en: "The thirteen-year-old the X-Men recruited out of a Chicago suburb, who can step through walls and shut down any machine on the way. She grew up inside the team rather than joining it.",
      ar: "الفتاة ذات الثلاثة عشر عامًا التي جنّدها الإكس مِن من ضاحية في شيكاغو، تعبر الجدران وتعطّل أي آلة في طريقها. نشأت داخل الفريق لا انضمّت إليه.",
    },
    related: [
      { id: "storm", kind: "ally" },
      { id: "colossus", kind: "ally" },
      { id: "lockheed", kind: "ally" },
    ],
  },
  {
    id: "longshot",
    nameEn: "Longshot",
    nameAr: "لونغشوت",
    aliases: ["Longshot"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mojoworlder",
    powers: [
      {
        en: "Luck bends toward him when he is selfless",
        ar: "الحظ ينحني له متى تجرّد",
      },
      {
        en: "Impossible throws land every time",
        ar: "رميات مستحيلة تصيب كل مرة",
      },
      {
        en: "Ricochets and dodges he cannot explain",
        ar: "ارتدادات ومراوغات لا يفسرها",
      },
      {
        en: "Reads an object by touching it",
        ar: "يقرأ شيئًا بلمسه",
      },
      {
        en: "Agility and reflexes past a man's",
        ar: "رشاقة وردود فعل تفوق البشر",
      },
      {
        en: "Act selfishly and it all stops working",
        ar: "تصرّف بأنانية فيتوقف كل ذلك",
      },
    ],
    origin: {
      en: "A rebel bred in an entertainment dimension to be a television star, whose luck works only when his motives are clean. He is not a mutant, which the roster marks and which the corpus keeps.",
      ar: "متمرّد استُولد في بُعدٍ للترفيه ليكون نجم تلفزيون، ولا يعمل حظه إلا إذا صفت نيّته. وهو ليس متحوّلًا، وذلك ما يشير إليه المرجع وما يحفظه هذا السجل.",
    },
    related: [{ id: "dazzler", kind: "ally" }],
  },
  {
    id: "lockheed",
    nameEn: "Lockheed",
    nameAr: "لوكهيد",
    aliases: ["Lockheed"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Alien dragon",
    powers: [
      {
        en: "A small purple dragon, and he flies",
        ar: "تنين أرجواني صغير، وهو يطير",
      },
      {
        en: "Breathes fire, and it is intense",
        ar: "ينفث النار، وهي شديدة",
      },
      {
        en: "Claws and teeth sharper than they look",
        ar: "مخالب وأسنان أحدّ مما تبدو",
      },
      {
        en: "Far more durable than his size",
        ar: "أصلب بكثير مما يوحي حجمه",
      },
      {
        en: "Understands everything said near him",
        ar: "يفهم كل ما يُقال بقربه",
      },
      {
        en: "Was a S.W.O.R.D. agent, secretly",
        ar: "كان عميل سورد، سرًا",
      },
    ],
    origin: {
      en: "A small purple dragon from an alien world who attached himself to Kitty Pryde and never left. He understands every word said around him and lets people assume otherwise.",
      ar: "تنين أرجواني صغير من عالم فضائي، تعلّق بكيتي برايد ولم يفارقها. يفهم كل كلمة تقال حوله ويدع الناس يظنون العكس.",
    },
    related: [{ id: "kitty-pryde", kind: "ally" }],
  },
  {
    id: "anole",
    nameEn: "Anole",
    nameAr: "أنول",
    aliases: ["Anole", "Victor Borkowski"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Green scales, and he climbs walls",
        ar: "حراشف خضراء، ويتسلق الجدران",
      },
      {
        en: "Regrew an arm, and it came back stronger",
        ar: "أنبت ذراعًا، فعادت أقوى",
      },
      {
        en: "Strength concentrated in that arm",
        ar: "قوة متركزة في تلك الذراع",
      },
      {
        en: "A prehensile tongue",
        ar: "لسان ماسك",
      },
      {
        en: "Camouflage, into any background",
        ar: "تمويه، في أي خلفية",
      },
      {
        en: "A healing factor underneath it all",
        ar: "عامل شفاء تحت ذلك كله",
      },
    ],
    origin: {
      en: "A green-scaled young mutant who lost an arm and grew back something much larger, and who is one of the few students the school never tried to make look normal.",
      ar: "متحوّل يافع أخضر الحراشف، فقد ذراعًا فنبت له ما هو أضخم بكثير، وهو من قلائل الطلاب الذين لم تحاول المدرسة أن تجعلهم يبدون عاديين.",
    },
    related: [{ id: "armor", kind: "ally" }],
  },
  {
    id: "blindfold",
    nameEn: "Blindfold",
    nameAr: "بلايندفولد",
    aliases: ["Blindfold", "Ruth Aldine"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    /* SCORED ZERO, for a precognitive telepath. */
    powers: [
      {
        en: "Sees the future in glimpses",
        ar: "ترى المستقبل لمحات",
      },
      {
        en: "Reads minds, and was born without eyes",
        ar: "تقرأ العقول، ووُلدت بلا عينين",
      },
      {
        en: "Navigates entirely by what she perceives",
        ar: "تتنقل بما تدركه وحده",
      },
      {
        en: "Clairvoyance, and astral perception",
        ar: "بصيرة، وإدراك أثيري",
      },
      {
        en: "Her prophecies steer the younger ones",
        ar: "نبوءاتها توجّه الصغار",
      },
      {
        en: "Speaks in riddles, and means them",
        ar: "تتكلم بالألغاز، وتعنيها",
      },
    ],
    origin: {
      en: "A precognitive born without eyes who sees the future clearly and the present hardly at all, and whose sentences arrive in the order the visions do rather than the order people expect.",
      ar: "بصيرة بالمستقبل وُلدت بلا عينين، ترى ما هو آتٍ بوضوح ولا تكاد ترى الحاضر، وتأتي جملها بترتيب الرؤى لا بالترتيب الذي ينتظره الناس.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "feral",
    nameEn: "Feral",
    nameAr: "فيرال",
    aliases: ["Feral", "Maria Callasantos"],
    category: "villain",
    affiliation: ["Morlocks"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Fur, fangs and a prehensile tail",
        ar: "فراء وأنياب وذيل ماسك",
      },
      {
        en: "Retractable claws that rend most things",
        ar: "مخالب تُسحب وتمزق أغلب الأشياء",
      },
      {
        en: "Strength, speed and balance past a man's",
        ar: "قوة وسرعة وتوازن تفوق البشر",
      },
      {
        en: "Feline senses, and she hunts by them",
        ar: "حواس سنورية، وتصطاد بها",
      },
      {
        en: "A regenerative healing factor",
        ar: "عامل شفاء تجديدي",
      },
      {
        en: "Savage, and not reliably on your side",
        ar: "متوحشة، وليست في صفك دائمًا",
      },
    ],
    origin: {
      en: "A cat-like mutant who came up through the tunnels and an abusive home, and who has switched sides more than once because neither one ever offered her much.",
      ar: "متحوّلة تشبه الهرّ، خرجت من الأنفاق ومن بيت مؤذٍ، وبدّلت الجهات أكثر من مرة لأن أيًّا منها لم يقدّم لها كثيرًا.",
    },
    related: [{ id: "cannonball", kind: "enemy" }],
  },
  {
    id: "frenzy",
    nameEn: "Frenzy",
    nameAr: "فرينزي",
    aliases: ["Frenzy", "Joanna Cargill"],
    category: "antihero",
    affiliation: ["X-Men", "Acolytes"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Unbreakable skin, and bone to match",
        ar: "جلد لا ينكسر، وعظم يوازيه",
      },
      {
        en: "Strength to match, and bullets do nothing",
        ar: "قوة توازيه، والرصاص لا يفعل شيئًا",
      },
      {
        en: "Lifts many tons",
        ar: "ترفع أطنانًا عديدة",
      },
      {
        en: "Speed and stamina alongside it",
        ar: "سرعة وتحمّل معها",
      },
      {
        en: "A brawler who prefers it close",
        ar: "مشاكسة تفضّل القتال القريب",
      },
      {
        en: "An Acolyte first, an X-Man later",
        ar: "أكوليت أولًا، ثم إكس-مان",
      },
    ],
    origin: {
      en: "A mutant with skin nothing gets through and the strength to use it, who spent years as an enforcer for other people's causes before picking one of her own.",
      ar: "متحوّلة بجلد لا ينفذه شيء وقوة تكافئه، أمضت سنين منفّذةً لقضايا غيرها قبل أن تختار قضية لنفسها.",
    },
    related: [{ id: "magneto", kind: "ally" }],
  },
  {
    id: "gateway",
    nameEn: "Gateway",
    nameAr: "غيتواي",
    aliases: ["Gateway"],
    category: "supporting",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Opens portals across vast distances",
        ar: "يفتح بوابات عبر مسافات هائلة",
      },
      {
        en: "And sometimes across time",
        ar: "وأحيانًا عبر الزمن",
      },
      {
        en: "Swings a bullroarer to do it",
        ar: "يدير مرجافًا ليفعل",
      },
      {
        en: "Moves whole teams without a word",
        ar: "ينقل فرقًا كاملة دون كلمة",
      },
      {
        en: "Immensely powerful, and rarely explains",
        ar: "قوي إلى حد هائل، ونادرًا ما يشرح",
      },
      {
        en: "Almost never speaks at all",
        ar: "لا يكاد يتكلم البتة",
      },
    ],
    origin: {
      en: "An Aboriginal Australian mutant who opens doorways across the world by spinning a bullroarer, and who has never once explained himself to anyone who used him.",
      ar: "متحوّل من سكان أستراليا الأصليين يفتح أبوابًا عبر العالم بإدارة مِرواح، ولم يفسّر نفسه قط لأحد ممن استعملوه.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "maggott",
    nameEn: "Maggott",
    nameAr: "ماغوت",
    aliases: ["Maggott", "Japheth"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    /**
     * OMEGA, added in 2025. The power description in secondary sources is
     * inconsistent — "psychometry" is the common shorthand and is probably
     * wrong; his Omega claim rests on the essentially unlimited matter his
     * slugs can consume and process. Left undescribed rather than asserted.
     */
    mutantClass: "omega",
    powers: [
      {
        en: "Two sentient slugs do his digesting",
        ar: "بزاقتان واعيتان تهضمان عنه",
      },
      {
        en: "They eat metal, stone, anything",
        ar: "تأكلان المعدن والحجر وأي شيء",
      },
      {
        en: "While they feed, he turns strong",
        ar: "ما دامتا تأكلان، يشتد قوة",
      },
      {
        en: "Durability and senses rise with it",
        ar: "تعلو صلابته وحواسه معها",
      },
      {
        en: "His skin goes chalk-white and hardens",
        ar: "يبيضّ جلده كالطباشير ويقسو",
      },
      {
        en: "Without them out, he is vulnerable",
        ar: "بدونهما، يكون مكشوفًا",
      },
    ],
    origin: {
      en: "A South African mutant whose digestive system is two sentient slugs that leave his body to eat, and who is stronger while they are away. It is as strange as it sounds and he is at peace with it.",
      ar: "متحوّل جنوب أفريقي جهازه الهضمي دودتان واعيتان تغادران جسده لتأكلا، ويكون أقوى في غيابهما. الأمر غريب كما يبدو، وهو راضٍ به.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "nocturne",
    nameEn: "Nocturne",
    nameAr: "نوكتورن",
    aliases: ["Nocturne", "Talia Josephine Wagner"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Hex-bolts that possess a body",
        ar: "صواعق سحرية تتلبّس جسدًا",
      },
      {
        en: "Uses that person's powers while inside",
        ar: "تستعمل قدرات ذلك الشخص وهي فيه",
      },
      {
        en: "Her father's agility, and his tail",
        ar: "رشاقة أبيها، وذيله",
      },
      {
        en: "Sticks to surfaces, as he does",
        ar: "تلتصق بالأسطح، مثله",
      },
      {
        en: "Some of her mother's probability magic",
        ar: "بعض سحر الاحتمالات من أمها",
      },
      {
        en: "An Exile, from a reality that is gone",
        ar: "منفية، من واقع زال",
      },
    ],
    origin: {
      en: "The daughter of Nightcrawler and the Scarlet Witch from a reality that no longer exists, stranded here and making the best of a world where her parents never met.",
      ar: "ابنة نايتكرولر والساحرة القرمزية من واقع لم يعد موجودًا، عالقة هنا وتتدبّر أمرها في عالم لم يلتقِ فيه أبواها قط.",
    },
    related: [
      { id: "nightcrawler", kind: "family" },
      { id: "scarlet-witch", kind: "family" },
    ],
  },
  {
    id: "omega-sentinel",
    nameEn: "Omega Sentinel",
    nameAr: "أوميغا سنتينل",
    aliases: ["Omega Sentinel", "Karima Shapandar"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Cyborg",
    powers: [
      /* Three bullets and all three were biography. */
      { en: "Sentinel strength and durability", ar: "قوة وصلابة سنتينل" },
      { en: "Energy weapons built into her", ar: "أسلحة طاقة مدمجة فيها" },
      { en: "Flight", ar: "طيران" },
      {
        en: "Adapts to the powers she meets",
        ar: "تتكيف مع القوى التي تواجهها",
      },
      { en: "A Sentinel built from a person", ar: "سنتينل بُني من إنسانة" },
      { en: "Fights the programming daily", ar: "تقاوم البرمجة كل يوم" },
    ],
    origin: {
      en: "An Indian police officer converted into a Sentinel by Bastion, who kept enough of herself to refuse the programming and has to keep refusing it every day since.",
      ar: "ضابطة شرطة هندية حوّلها باستيون إلى سنتينل، فاحتفظت من نفسها بما يكفي لترفض البرمجة، وعليها أن تظل ترفضها كل يوم منذئذ.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "wither",
    nameEn: "Wither",
    nameAr: "ويذر",
    aliases: ["Wither", "Kevin Ford"],
    /* ANTIVILLAIN. His touch kills anything living and he found that out on his own father. He has never been able to switch it off. */
    category: "antivillain",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Rots organic matter on contact",
        ar: "يعفّن المادة العضوية بالتلامس",
      },
      {
        en: "Flesh, wood and living tissue alike",
        ar: "لحمًا وخشبًا ونسيجًا حيًا سواء",
      },
      {
        en: "A touch kills, and he could not stop it",
        ar: "لمسة تقتل، ولم يستطع إيقافها",
      },
      {
        en: "Learned to decay inorganic matter too",
        ar: "تعلم إفساد المادة غير العضوية أيضًا",
      },
      {
        en: "And learned some precision, from Selene",
        ar: "وتعلم شيئًا من الدقة، من سيلين",
      },
      {
        en: "Immune to his own decay",
        ar: "محصّن ضد فساده",
      },
    ],
    origin: {
      en: "A mutant whose touch destroys anything living, which he discovered on his own father. He has never been able to switch it off, and everything that followed came out of that.",
      ar: "متحوّل تدمّر لمسته كل حيّ، واكتشف ذلك في أبيه. ولم يقدر قط على إيقافها، وكل ما تلا خرج من ذلك.",
    },
    related: [{ id: "elixir", kind: "enemy" }],
  },
];

/**
 * THE ONES THE LOOSE AUDIT HID, batch 14.
 *
 * Every name here was reported as ALREADY PRESENT by the substring gap-check
 * that drove batches 2 to 13, and none of them was. Bishop is the worst of
 * it: a founding-tier X-Man who is in Days of Future Past. Re-running the
 * check with exact matching found 147 still outstanding rather than the 114
 * I had been reporting, which is a correction to my own numbers and not a
 * change in the job.
 */
const hiddenByAudit: CharacterDraft[] = [
  {
    id: "bishop",
    nameEn: "Bishop",
    nameAr: "بيشوب",
    aliases: ["Bishop", "Lucas Bishop"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Absorbs any energy aimed at him",
        ar: "يمتص أي طاقة تُوجَّه إليه",
      },
      {
        en: "Redirects it as concussive blasts",
        ar: "يعيد توجيهها قذائف صادمة",
      },
      {
        en: "The more he takes, the harder he hits",
        ar: "كلما امتص أكثر ضرب أقوى",
      },
      {
        en: "Superhuman durability, to hold it",
        ar: "صلابة خارقة، ليحتملها",
      },
      {
        en: "A soldier out of a dystopian future",
        ar: "جندي من مستقبل بائس",
      },
      {
        en: "A marksman, and he travels in time",
        ar: "رامٍ ماهر، ويسافر عبر الزمن",
      },
    ],
    origin: {
      en: "A mutant from a future where his people were rounded up and branded, who travelled back to prevent it and has never entirely stopped treating the present as evidence.",
      ar: "متحوّل من مستقبل جُمع فيه قومه ووُسموا، عاد ليمنع ذلك، ولم يكفّ قط عن معاملة الحاضر بوصفه دليلًا.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "skin",
    nameEn: "Skin",
    nameAr: "سكين",
    aliases: ["Skin", "Angelo Espinosa"],
    category: "hero",
    affiliation: ["Generation X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Six extra feet of hyper-elastic skin",
        ar: "ستة أقدام إضافية من جلد فائق المرونة",
      },
      {
        en: "Stretches his limbs across a room",
        ar: "يمدد أطرافه عبر غرفة",
      },
      {
        en: "Forms tendrils and coils from it",
        ar: "يشكّل منه لوامس وملفات",
      },
      {
        en: "Grips and moves things at a distance",
        ar: "يمسك ويحرك الأشياء عن بعد",
      },
      {
        en: "Reshapes his own form within limits",
        ar: "يعيد تشكيل هيئته ضمن حدود",
      },
      {
        en: "Fine motor control over all of it",
        ar: "تحكم دقيق بكل ذلك",
      },
    ],
    origin: {
      en: "A former gang member with several feet of extra grey skin he can stretch at will, and no way at all of passing for anything but what he is.",
      ar: "عضو عصابة سابق لديه أقدام إضافية من جلد رمادي يمدّه كما يشاء، ولا سبيل البتة إلى أن يبدو شيئًا غير ما هو عليه.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "oya",
    nameEn: "Oya",
    nameAr: "أويا",
    aliases: ["Oya", "Idie Okonkwo"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Generates fire, and hurls it",
        ar: "تولّد النار، وتقذفها",
      },
      {
        en: "Generates cold, and ice with it",
        ar: "تولّد البرد، والجليد معه",
      },
      {
        en: "Uses both at once, one then the other",
        ar: "تستعمل الاثنين معًا، واحدًا ثم الآخر",
      },
      {
        en: "Freezes a thing, then shatters it",
        ar: "تجمّد شيئًا، ثم تحطمه",
      },
      {
        en: "Thermokinesis in both directions",
        ar: "تحريك حراري في الاتجاهين",
      },
      {
        en: "Wrestles with using any of it to kill",
        ar: "تصارع نفسها في استعمالها للقتل",
      },
    ],
    origin: {
      en: "A Nigerian mutant who commands fire and ice and believes herself damned for using them, having killed to protect other children before she was old enough to weigh it.",
      ar: "متحوّلة نيجيرية تأمر النار والجليد وتعتقد أنها هلكت باستعمالهما، إذ قتلت حمايةً لأطفال آخرين قبل أن تبلغ سنّ الموازنة.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "cipher",
    nameEn: "Cipher",
    nameAr: "سايفر (أليسا)",
    aliases: ["Cipher", "Alisa Tager"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Permanently invisible, to everyone",
        ar: "خفية دائمًا، عن الجميع",
      },
      {
        en: "Intangible, so walls are not walls",
        ar: "غير ملموسة، فالجدران ليست جدرانًا",
      },
      {
        en: "Inaudible, and odourless with it",
        ar: "لا تُسمع، ولا رائحة لها",
      },
      {
        en: "Nothing detects her by any sense",
        ar: "لا شيء يكشفها بأي حاسة",
      },
      {
        en: "Lived in the mansion unseen for years",
        ar: "عاشت في القصر سنين دون أن تُرى",
      },
      {
        en: "The best surveillance mutant there is",
        ar: "أفضل متحولة مراقبة على الإطلاق",
      },
    ],
    origin: {
      en: "A mutant nobody can see, hear or sense, who spent years living inside the school unnoticed and knowing everything about everyone before she let anyone find her.",
      ar: "متحوّلة لا يراها أحد ولا يسمعها ولا يحسّ بها، عاشت سنين داخل المدرسة دون أن يُنتبه إليها وهي تعلم كل شيء عن الجميع، قبل أن تدع أحدًا يجدها.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "jackal",
    nameEn: "The Jackal",
    nameAr: "الجاكال",
    /* NOT a bare "Jackal". Captain America: Brave New World credits a
       mercenary by that name and it is not Peter Parker's cloning professor.
       Third time this corpus has been caught by a bare codename, after
       Selene and Thunderbird. The article keeps the display name honest and
       the segment match away. */
    aliases: ["Miles Warren"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    /* NOT Human. Miles Warren experimented on himself along with everyone
       else and ended up a humanoid jackal with claws and enhanced strength.
       He started as a geneticist and did not stay one. */
    species: "Mutate",
    powers: [
      { en: "Clones anybody at all", ar: "يستنسخ أي أحد" },
      { en: "Mutated himself into a jackal", ar: "حوّل نفسه إلى ابن آوى" },
      { en: "Was Peter's professor", ar: "كان أستاذ بيتر" },
      { en: "Grief turned to obsession", ar: "حزن استحال هوسًا" },
    ],
    origin: {
      en: "Peter Parker's biology professor, who lost a student he was in love with and answered it by learning to clone people. Every clone in Spider-Man's life traces back to him.",
      ar: "أستاذ الأحياء لبيتر باركر، فقد طالبة أحبّها فأجاب على ذلك بأن تعلّم استنساخ البشر. وكل نسخة في حياة سبايدرمان ترجع إليه.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
      { id: "kaine", kind: "family" },
    ],
  },
  {
    id: "the-rose",
    nameEn: "The Rose",
    nameAr: "الوردة",
    aliases: ["The Rose", "Richard Fisk"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Runs the city's crime quietly",
        ar: "يدير جريمة المدينة بهدوء",
      },
      {
        en: "A marksman, and he carries two",
        ar: "رامٍ ماهر، ويحمل اثنين",
      },
      {
        en: "Commands an organisation of hundreds",
        ar: "يقود تنظيمًا من المئات",
      },
      {
        en: "Never seen without the mask",
        ar: "لا يُرى دون القناع",
      },
      {
        en: "Kingpin's man before his rival",
        ar: "كان رجل كينغبين قبل أن يصير خصمه",
      },
      {
        en: "The son of a police chief",
        ar: "ابن قائد شرطة",
      },
    ],
    origin: {
      en: "Wilson Fisk's son, who built a criminal operation of his own for the single purpose of dismantling his father's, and wore a mask so the old man would not know who was doing it.",
      ar: "ابن ويلسون فيسك، بنى عملية إجرامية خاصة به لغرض واحد هو تفكيك عملية أبيه، ولبس قناعًا كي لا يعرف الرجل من يفعل ذلك.",
    },
    related: [
      { id: "kingpin", kind: "family" },
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "robbie-robertson",
    nameEn: "Robbie Robertson",
    nameAr: "روبي روبرتسون",
    aliases: ["Robbie Robertson", "Joe Robertson", "Joseph Robertson"],
    category: "supporting",
    affiliation: ["Daily Bugle"],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Runs the newsroom",
        ar: "يدير غرفة الأخبار",
      },
      {
        en: "The conscience of the Bugle",
        ar: "ضمير البيوغل",
      },
      {
        en: "Says no to Jameson",
        ar: "يقول لا لجيمسون",
      },
      {
        en: "Checks the story before it prints",
        ar: "يتحقق من الخبر قبل نشره",
      },
      {
        en: "Knew, and printed nothing",
        ar: "عرف، ولم ينشر شيئًا",
      },
      {
        en: "Forty years of not being scared",
        ar: "أربعون عامًا بلا خوف",
      },
    ],
    origin: {
      en: "The Daily Bugle's editor-in-chief and the one person in the building who tells J. Jonah Jameson he is wrong and keeps his job. Peter Parker's steadiest adult ally.",
      ar: "رئيس تحرير الديلي بيوغل، والوحيد في المبنى الذي يقول لجي جونا جيمسون إنه مخطئ ويظل في عمله. وهو أثبت حلفاء بيتر باركر من الكبار.",
    },
    related: [
      { id: "spider-man", kind: "ally" },
      { id: "j-jonah-jameson", kind: "ally" },
    ],
  },
];

/**
 * THE BUGLE AND THE REST OF THE ROGUES, batch 15.
 *
 * J. Jonah Jameson leads it because C4 caught him as a dangling relation off
 * Robbie Robertson last batch — the second hole the loose gap-check denied.
 * Robertson's edge to him is restored below.
 *
 * Every single-word codename here was checked against the cast data BEFORE
 * the record was written, which is the change the Jackal, Selene and
 * Thunderbird misses earned. Swarm and Grizzly both have exact credits and
 * both are genuinely them; Overdrive, Tarantula, Scarecrow, Stunner,
 * Kangaroo, Gibbon, Massacre and Raze have none at all, so none of them can
 * steal one.
 */
const bugleAndRogues: CharacterDraft[] = [
  {
    id: "j-jonah-jameson",
    nameEn: "J. Jonah Jameson",
    nameAr: "ج. جونا جيمسون",
    aliases: ["J. Jonah Jameson", "John Jonah Jameson", "Jonah Jameson"],
    category: "supporting",
    affiliation: ["Daily Bugle"],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Runs the Daily Bugle",
        ar: "يدير الديلي بيوغل",
      },
      {
        en: "Loudest man in New York",
        ar: "أعلى رجل صوتًا في نيويورك",
      },
      {
        en: "Never prints a retraction",
        ar: "لا ينشر تصحيحًا أبدًا",
      },
      {
        en: "Funded the Scorpion himself",
        ar: "موّل سكوربيون بنفسه",
      },
      {
        en: "Right about almost nothing",
        ar: "محق في لا شيء تقريبًا",
      },
      {
        en: "And he never stops",
        ar: "ولا يتوقف أبدًا",
      },
    ],
    origin: {
      en: "The newspaperman who has spent his career calling Spider-Man a menace, and who has also run every story about corrupt officials nobody else would print. He is wrong about one thing loudly.",
      ar: "الصحفي الذي أنفق مسيرته يصف سبايدرمان بالخطر، وهو نفسه من نشر كل قصة عن مسؤول فاسد أحجم غيره عنها. مخطئ في أمر واحد وبصوت عالٍ.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
      { id: "robbie-robertson", kind: "ally" },
    ],
  },
  {
    id: "yuri-watanabe",
    nameEn: "Yuri Watanabe",
    nameAr: "يوري واتانابي",
    aliases: ["Yuri Watanabe", "Yuriko Watanabe"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "A police captain first",
        ar: "نقيبة شرطة أولًا",
      },
      {
        en: "A marksman, and trained to fight",
        ar: "رامية ماهرة، ومدربة على القتال",
      },
      {
        en: "Took the Wraith mask up",
        ar: "ارتدت قناع الطيف",
      },
      {
        en: "Body armour, and a stun weapon",
        ar: "درع جسد، وسلاح صاعق",
      },
      {
        en: "Knows every case file in the city",
        ar: "تعرف كل ملف قضية في المدينة",
      },
      {
        en: "Works with Spider-Man, off the books",
        ar: "تعمل مع سبايدرمان، خارج السجلات",
      },
    ],
    origin: {
      en: "A police captain who worked alongside Spider-Man until the system kept failing the cases she brought it, then put on a mask herself to do what the badge would not let her.",
      ar: "نقيبة شرطة عملت إلى جانب سبايدرمان حتى ظل النظام يخذل القضايا التي رفعتها، فارتدت قناعًا لتفعل ما لم تدعها الشارة تفعله.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "glory-grant",
    nameEn: "Glory Grant",
    nameAr: "غلوري غرانت",
    aliases: ["Glory Grant", "Gloria Grant"],
    category: "supporting",
    affiliation: ["Daily Bugle"],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Jameson's secretary, and his filter",
        ar: "سكرتيرة جيمسون، ومرشّحه",
      },
      {
        en: "Runs the Bugle's front desk",
        ar: "تدير مكتب استقبال البيوغل",
      },
      {
        en: "Knows who is lying on the phone",
        ar: "تعرف من يكذب على الهاتف",
      },
      {
        en: "Peter's neighbour before that",
        ar: "كانت جارة بيتر قبل ذلك",
      },
      {
        en: "Kept his secret without being told",
        ar: "حفظت سره دون أن يُخبرها",
      },
      {
        en: "Later ran for office herself",
        ar: "ثم ترشحت للمنصب بنفسها",
      },
    ],
    origin: {
      en: "Peter Parker's old neighbour who became J. Jonah Jameson's secretary, and who knows more about what happens at the Bugle than anyone whose name is on the masthead.",
      ar: "جارة بيتر باركر القديمة التي صارت سكرتيرة جي جونا جيمسون، وتعرف عمّا يجري في البيوغل أكثر من أي أحد اسمه على الترويسة.",
    },
    related: [{ id: "j-jonah-jameson", kind: "ally" }],
  },
  {
    id: "randy-robertson",
    nameEn: "Randy Robertson",
    nameAr: "راندي روبرتسون",
    aliases: ["Randy Robertson", "Randolph Robertson"],
    category: "supporting",
    affiliation: ["Daily Bugle"],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Robbie's son",
        ar: "ابن روبي",
      },
      {
        en: "Peter's roommate, and patient",
        ar: "رفيق سكن بيتر، وصبور",
      },
      {
        en: "Organises the protest himself",
        ar: "ينظم الاحتجاج بنفسه",
      },
      {
        en: "Says the thing out loud",
        ar: "يقول الأمر بصوت عالٍ",
      },
      {
        en: "Grew up in the newsroom",
        ar: "نشأ في غرفة الأخبار",
      },
      {
        en: "Not impressed by any of it",
        ar: "لا يبهره شيء من ذلك",
      },
    ],
    origin: {
      en: "Robbie Robertson's son and one of Peter Parker's roommates, an activist who has been arguing about the same injustices since college and has not got tired of it.",
      ar: "ابن روبي روبرتسون وأحد رفاق سكن بيتر باركر، ناشط يجادل في المظالم نفسها منذ الجامعة ولم يملّ.",
    },
    related: [{ id: "robbie-robertson", kind: "family" }],
  },
  {
    id: "mayday-parker",
    nameEn: "Spider-Girl",
    nameAr: "سبايدر غيرل",
    aliases: ["Mayday Parker", "May Parker (Earth-982)", "Spider-Girl"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-982",
    species: "Mutate",
    powers: [
      { en: "Her father's powers, inherited", ar: "قوى أبيها بالوراثة" },
      { en: "Basketball star first", ar: "نجمة كرة سلة أولًا" },
      { en: "From a future that kept going", ar: "من مستقبل مضى قدمًا" },
    ],
    origin: {
      en: "Peter Parker and Mary Jane's daughter in a future where they both survived and retired, who found the powers in herself and the costume in the attic.",
      ar: "ابنة بيتر باركر وماري جين في مستقبل نجا فيه كلاهما واعتزلا، وجدت القوى في نفسها والزيّ في العلّية.",
    },
    related: [
      { id: "spider-man", kind: "family" },
      { id: "mary-jane-watson", kind: "family" },
    ],
  },
  {
    id: "pavitr-prabhakar",
    nameEn: "Spider-Man India",
    nameAr: "سبايدر مان الهند",
    aliases: ["Pavitr Prabhakar", "Spider-Man India"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-50101",
    species: "Mutate",
    powers: [
      {
        en: "Powers from a yogi, not a spider",
        ar: "قواه من يوغيّ لا من عنكبوت",
      },
      { en: "Fights demons, not scientists", ar: "يقاتل شياطين لا علماء" },
      { en: "Mumbai is the whole point", ar: "مومباي هي المقصد كله" },
    ],
    origin: {
      en: "The Spider-Man of Mumbai, whose powers came from a dying yogi rather than a laboratory accident, and whose city is not a backdrop but the reason the story works differently.",
      ar: "سبايدرمان مومباي، جاءته قواه من يوغيّ يحتضر لا من حادث مختبر، ومدينته ليست خلفية بل سبب اختلاف الحكاية.",
    },
    related: [
      {
        id: "spider-man",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
    ],
  },
  {
    id: "overdrive",
    nameEn: "Overdrive",
    nameAr: "أوفردرايف",
    aliases: ["Overdrive", "James Beverley"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      {
        en: "Rebuilds any vehicle he touches",
        ar: "يعيد بناء أي مركبة يلمسها",
      },
      { en: "A getaway driver by trade", ar: "سائق هروب بالمهنة" },
      {
        en: "A fan of Spider-Man, oddly",
        ar: "معجب بسبايدرمان، والغريب أنه صادق",
      },
    ],
    origin: {
      en: "A getaway driver who can turn any car he touches into something far faster, and who is a genuine Spider-Man fan while working for the people trying to kill him.",
      ar: "سائق هروب يحوّل أي سيارة يلمسها إلى ما هو أسرع بكثير، وهو معجب صادق بسبايدرمان بينما يعمل لدى من يحاولون قتله.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "swarm",
    nameEn: "Swarm",
    nameAr: "سوارم",
    aliases: ["Swarm", "Fritz von Meyer"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "A man made of bees", ar: "رجل من نحل" },
      { en: "No body to hit", ar: "لا جسد يُضرب" },
      { en: "Was a Nazi scientist", ar: "كان عالمًا نازيًا" },
    ],
    origin: {
      en: "A Nazi scientist consumed by mutated bees who did not die so much as become the swarm, and who has no solid body for anyone to punch.",
      ar: "عالم نازي التهمه نحل متطفّر، فلم يمت بقدر ما صار السرب نفسه، ولا جسد صلب فيه يلكمه أحد.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "grizzly",
    nameEn: "Grizzly",
    nameAr: "غريزلي",
    aliases: ["Grizzly", "Maxwell Markham"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "A powered bear suit, built for him",
        ar: "بذلة دب مؤلية، صُنعت له",
      },
      {
        en: "Strength enough to trade with Spider-Man",
        ar: "قوة تكفي لمبادلة سبايدرمان",
      },
      {
        en: "Claws on the gauntlets",
        ar: "مخالب على القفازات",
      },
      {
        en: "Durable under the fur",
        ar: "صلب تحت الفراء",
      },
      {
        en: "Was a wrestler, and still fights like one",
        ar: "كان مصارعًا، وما زال يقاتل كواحد",
      },
      {
        en: "Blamed Jameson for the end of it",
        ar: "ألقى اللوم على جيمسون في نهايته",
      },
    ],
    origin: {
      en: "A wrestler whose career was ended by a Daily Bugle story, who put on a powered bear suit to do something about it and has been drifting between crews ever since.",
      ar: "مصارع أنهت مسيرته قصة في الديلي بيوغل، فارتدى بدلة دبّ مدعّمة ليفعل شيئًا حيال ذلك، وظل يتنقل بين العصابات منذئذ.",
    },
    related: [{ id: "j-jonah-jameson", kind: "enemy" }],
  },
  {
    id: "tarantula",
    nameEn: "Tarantula",
    nameAr: "تارانتولا",
    aliases: ["Tarantula", "Anton Rodriguez"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Blades in his boots", ar: "نصال في حذائه" },
      { en: "A government killer once", ar: "كان قاتلًا حكوميًا" },
      { en: "Turned into an actual spider", ar: "استحال عنكبوتًا فعليًا" },
    ],
    origin: {
      en: "A South American political assassin turned costumed killer, whose employers eventually experimented on him until he stopped being a man in a spider suit and became a spider.",
      ar: "قاتل سياسي من أمريكا الجنوبية صار قاتلًا مقنّعًا، وانتهى بمشغّليه أن جرّبوا عليه حتى كفّ عن كونه رجلًا في زيّ عنكبوت وصار عنكبوتًا.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "scarecrow",
    nameEn: "Scarecrow",
    nameAr: "سكيركرو",
    aliases: ["Scarecrow", "Ebenezer Laughton"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "A contortionist's body, and no bones spared",
        ar: "جسد بهلواني، بلا عظم يُستثنى",
      },
      {
        en: "Escapes anything he is locked in",
        ar: "يفلت من أي شيء يُحبس فيه",
      },
      {
        en: "Trained crows that attack on command",
        ar: "غربان مدربة تهاجم بأمره",
      },
      {
        en: "A pitchfork, and he means it",
        ar: "مذراة، وهو جاد بها",
      },
      {
        en: "Induces fear by his presence alone",
        ar: "يبعث الخوف بحضوره وحده",
      },
      {
        en: "Feels almost no pain",
        ar: "لا يكاد يشعر بالألم",
      },
    ],
    origin: {
      en: "A circus contortionist who can fold himself through any gap, commands a flock of crows, and grows stronger on the fear he provokes.",
      ar: "بهلوان سيرك يطوي نفسه عبر أي فُرجة، ويأمر سربًا من الغربان، ويزداد قوة بالخوف الذي يثيره.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
];

/**
 * THE REST OF THE POWER LIST, batch 16 — and that list is now complete.
 *
 * Three more Omegas off the published list: the Marquis of Death, Mad Jim
 * Jaspers and Matthew Malloy, plus Mister M. Malloy is the one worth reading
 * — not a villain at all, but an Omega so dangerous that Xavier suppressed
 * his memory and his power and left him an ordinary life. He is what happens
 * when that suppression fails, which is a different kind of story from anyone
 * else on the list.
 *
 * Namora was the surprise: she has real credits in Wakanda Forever and
 * Avengers: Doomsday, found by the pre-check before her record was written.
 */
const powerList: CharacterDraft[] = [
  {
    id: "griever",
    nameEn: "The Griever at the End of All Things",
    nameAr: "الفاجعة عند نهاية كل شيء",
    aliases: ["The Griever at the End of All Things", "Griever"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "Collapses many universes in one chain",
        ar: "تُسقط أكوانًا كثيرة في سلسلة",
      },
      {
        en: "The Necro-Sphere: your death, on a loop",
        ar: "كرة الموت: موتك، في حلقة مكررة",
      },
      { en: "Hunts down whatever survived", ar: "تطارد كل ما نجا" },
      { en: "Endlings carry out her work", ar: "المنتهون ينفذون عملها" },
      {
        en: "Cannot create or repair anything",
        ar: "لا تستطيع خلق شيء ولا إصلاحه",
      },
      {
        en: "Cannot cross realities without her ship",
        ar: "لا تعبر الوقائع دون سفينتها",
      },
    ],
    origin: {
      en: "A cosmic being who arrives when a reality is finished, grieving for it while she removes what is left. She goes after survivors specifically, because a survivor means the ending is incomplete.",
      ar: "كائنة كونية تصل حين ينتهي واقعٌ ما، تنعاه وهي تزيل ما بقي منه. وتلاحق الناجين تحديدًا، لأن ناجيًا يعني أن النهاية لم تكتمل.",
    },
    related: [{ id: "star-lord", kind: "enemy" }],
  },
  {
    id: "marquis-of-death",
    nameEn: "The Marquis of Death",
    nameAr: "ماركيز الموت",
    aliases: ["The Marquis of Death", "Clyde Wyncham"],
    category: "villain",
    /* NOT BROTHERHOOD -- a Fantastic Four villain out of Marvel 1985. */
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    /* NOT omega. Marvel named its Omega-level mutants in House of X #1 and
       this one is not on that list. See C12: the rule is the published list,
       not a fan roster and not how strong someone feels. */
    powers: [
      {
        en: "Warps reality on a multiversal scale",
        ar: "يشوّه الواقع بمقياس متعدد الأكوان",
      },
      {
        en: "Devastated realities to make a point",
        ar: "دمّر وقائع ليثبت وجهة نظر",
      },
      {
        en: "Broke a council of the smartest men alive",
        ar: "حطّم مجلس أذكى الرجال أحياءً",
      },
      {
        en: "Time travel, mind control and illusions",
        ar: "سفر عبر الزمن وسيطرة عقول وأوهام",
      },
      {
        en: "Aged Doctor Doom into dust",
        ar: "شيّخ دكتور دووم حتى صار ترابًا",
      },
      {
        en: "Near-invincible while he holds it",
        ar: "شبه منيع ما دام ممسكًا بها",
      },
    ],
    origin: {
      en: "An Omega-level mutant driven past sanity and returned as something that unmakes what it touches, who beat Doctor Doom so thoroughly that Doom spent the rest of it planning an answer.",
      ar: "متحوّل من مستوى أوميغا دُفع إلى ما وراء العقل وعاد كائنًا يفكّ ما يلمسه، هزم دكتور دووم هزيمة جعلت دووم يقضي ما تبقى في تدبير ردّ.",
    },
    related: [{ id: "doctor-doom", kind: "enemy" }],
  },
  {
    id: "mad-jim-jaspers",
    nameEn: "Mad Jim Jaspers",
    nameAr: "جيم جاسبرز المجنون",
    aliases: ["Mad Jim Jaspers", "James Jaspers"],
    category: "villain",
    /* NOT BROTHERHOOD. He is a Captain Britain villain and was never in it; the tag was this corpus using "Brotherhood" to mean "X-Men villain", which is a different thing and made the chip say 18 when the roster is 12. */
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    /* NOT omega. Marvel named its Omega-level mutants in House of X #1 and
       this one is not on that list. See C12: the rule is the published list,
       not a fan roster and not how strong someone feels. */
    powers: [
      {
        en: "Warps reality with a thought, effortlessly",
        ar: "يشوّه الواقع بفكرة، بلا جهد",
      },
      {
        en: "Rewrites the physics of a whole universe",
        ar: "يعيد كتابة فيزياء كون بأسره",
      },
      {
        en: "A reality cancer that spreads outward",
        ar: "سرطان في الواقع ينتشر إلى الخارج",
      },
      {
        en: "Reaches realities other than his own",
        ar: "يبلغ وقائع غير واقعه",
      },
      {
        en: "Resurrects the dead, and creates new life",
        ar: "يحيي الموتى، ويخلق حياة جديدة",
      },
      {
        en: "Stopped only by an empty void",
        ar: "لم يوقفه إلا خواء فارغ",
      },
    ],
    origin: {
      en: "A reality-warping mutant whose power scales with his own insanity, and who was a respectable politician for as long as the madness stayed private.",
      ar: "متحوّل يشوّه الواقع، تنمو قوته مع جنونه، وكان سياسيًا محترمًا ما دام الجنون في طيّ الكتمان.",
    },
    related: [{ id: "psylocke", kind: "enemy" }],
  },
  {
    id: "abraxas",
    nameEn: "Abraxas",
    nameAr: "أبراكساس",
    aliases: ["Abraxas"],
    /* ANTIVILLAIN. The destruction of the multiverse, sealed by Galactus's existence. It is a function that gets loose, not a plan. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "The destruction of the multiverse, embodied",
        ar: "دمار المتعدد مجسّدًا",
      },
      {
        en: "Rips realities apart to reach one man",
        ar: "يمزق الوقائع ليبلغ رجلًا واحدًا",
      },
      {
        en: "Calls up armies from other realities",
        ar: "يستدعي جيوشًا من وقائع أخرى",
      },
      { en: "Hunted the Ultimate Nullifier", ar: "طارد المُبطل الأقصى" },
      {
        en: "Held back only by Galactus existing",
        ar: "لا يكبحه إلا وجود غالاكتوس",
      },
      { en: "Free the moment Galactus dies", ar: "يتحرر لحظة موت غالاكتوس" },
    ],
    origin: {
      en: "The embodiment of the multiverse's destruction, kept sealed by Galactus's mere existence. Every time Galactus has died, Abraxas has come out.",
      ar: "تجسيد دمار الكون المتعدد، يبقيه مختومًا مجرّد وجود جالاكتوس. وكلما مات جالاكتوس خرج أبراكساس.",
    },
    related: [{ id: "galactus", kind: "enemy" }],
  },
  {
    id: "chaos-king",
    nameEn: "The Chaos King",
    nameAr: "ملك الفوضى",
    aliases: ["The Chaos King", "Amatsu-Mikaboshi"],
    /* ANTIVILLAIN. The primordial darkness that was there before anything else and wants to be the only thing again, which it regards as restoration. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      {
        en: "Absorbs gods, and enslaves what is left",
        ar: "يمتص الآلهة ويستعبد ما تبقى",
      },
      {
        en: "Waged war on every pantheon at once",
        ar: "شنّ حربًا على كل آلهة الكون معًا",
      },
      {
        en: "Vast strength, and invulnerable with it",
        ar: "قوة هائلة، ومناعة معها",
      },
      {
        en: "Matter, energy, size and soul alike",
        ar: "المادة والطاقة والحجم والروح سواء",
      },
      {
        en: "Shadow copies of himself, everywhere",
        ar: "نسخ ظلية منه في كل مكان",
      },
      {
        en: "Shapeshifts, teleports, raises the dead",
        ar: "يبدّل شكله، وينتقل، ويحيي الموتى",
      },
    ],
    origin: {
      en: "The primordial darkness that existed before anything else and wants to be the only thing again, which is not a conquest but a restoration as far as it is concerned.",
      ar: "الظلمة البدئية التي وُجدت قبل كل شيء وتريد أن تعود الشيء الوحيد، وذلك في نظرها ليس غزوًا بل إعادة إلى الأصل.",
    },
    related: [{ id: "thor", kind: "enemy" }],
  },
  {
    id: "matthew-malloy",
    nameEn: "Matthew Malloy",
    nameAr: "ماثيو مالوي",
    aliases: ["Matthew Malloy"],
    category: "antivillain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    /* Beast brands him "more than an Omega level mutant" in Uncanny X-Men #23
       (2014), and Cerebro records the most extreme power source it has ever
       seen — which is why Xavier erased him rather than fight him. */
    mutantClass: "omega",
    powers: [
      {
        en: "Power over life, death, space and time",
        ar: "سلطان على الحياة والموت والزمكان",
      },
      {
        en: "Telekinesis that tore a helicarrier apart",
        ar: "تحريك ذهني مزّق حاملة طائرات",
      },
      {
        en: "Injured the telepaths who read him",
        ar: "آذى المتخاطرين الذين قرأوه",
      },
      { en: "Immune to other mutants' powers", ar: "محصّن ضد قدرات المتحولين" },
      {
        en: "Comes back on his own after dying",
        ar: "يعود من تلقاء نفسه بعد الموت",
      },
      { en: "Sets it off when he is frightened", ar: "يطلقها متى خاف" },
    ],
    origin: {
      en: "An Omega-level mutant so dangerous that Xavier suppressed his memory and his power and left him to live an ordinary life. He is not a villain; he is what happens when the suppression fails.",
      ar: "متحوّل من مستوى أوميغا بلغ من الخطورة أن كبت إكزافير ذاكرته وقوته وتركه يعيش حياة عادية. ليس شريرًا، بل هو ما يحدث حين يخفق الكبت.",
    },
    related: [{ id: "professor-x", kind: "enemy" }],
  },
  {
    id: "mister-m",
    nameEn: "Mister M",
    nameAr: "مستر إم",
    aliases: ["Mister M", "Absolon Mercator"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      {
        en: "Controls all matter at the subatomic level",
        ar: "يتحكم بكل مادة على مستوى دون الذري",
      },
      {
        en: "Turns matter to energy, and back again",
        ar: "يحوّل المادة طاقة ثم يعيدها",
      },
      {
        en: "A gesture the size of a nuclear blast",
        ar: "إشارة بحجم انفجار نووي",
      },
      {
        en: "Heals, resurrects, and rewrites a body",
        ar: "يشفي ويحيي ويعيد كتابة جسد",
      },
      {
        en: "Switches other mutants' powers off",
        ar: "يُطفئ قدرات المتحولين الآخرين",
      },
      { en: "Died, and turned into butterflies", ar: "مات، فتحوّل إلى فراشات" },
    ],
    origin: {
      en: "An Omega-level mutant who can rearrange matter at will and used it mostly to repair other mutants after they lost their powers, while declining to join anyone's cause.",
      ar: "متحوّل من مستوى أوميغا يعيد ترتيب المادة كما يشاء، واستعملها في الأغلب لإصلاح متحوّلين بعد فقدهم قواهم، رافضًا الانضمام إلى قضية أحد.",
    },
    related: [{ id: "magneto", kind: "ally" }],
  },
  {
    id: "thane",
    nameEn: "Thane",
    nameAr: "ثين",
    aliases: ["Thane"],
    category: "antihero",
    affiliation: ["Inhumans"],
    universe: ["mcu"],
    /* HALF OF HIM WAS UNREACHABLE. His species says Eternal, so the
       Inhuman chip -- which matches `is("Inhuman")` or `aff("Inhumans")` --
       found neither side of a character who is both. The corpus already
       solves this for Captain Marvel, a `Human-Kree hybrid` who reaches the
       Kree chip through her affiliation, and Namor, a `Mutant hybrid` who
       reaches Talokan the same way. Thane just never got it. */
    species: "Eternal",
    powers: [
      {
        en: "A left hand that kills everyone near it",
        ar: "يد يسرى تقتل كل من حولها",
      },
      {
        en: "It wiped out his whole town at once",
        ar: "محت بلدته كلها دفعة واحدة",
      },
      {
        en: "A right hand that seals a man in living death",
        ar: "يد يمنى تحبس رجلًا في موت حيّ",
      },
      {
        en: "Trapped Thanos and Proxima Midnight in it",
        ar: "حبس بها ثانوس وبروكسيما ميدنايت",
      },
      {
        en: "Half Inhuman, half Eternal of Titan",
        ar: "نصفه إنهيوماني ونصفه أزلي من تيتان",
      },
      { en: "Briefly carried the Phoenix Force", ar: "حمل قوة الفينيكس لبرهة" },
    ],
    origin: {
      en: "Thanos's son by an Inhuman, who spent his life as a healer in a hidden city before his father came looking. One of his hands kills and the other seals a person in amber.",
      ar: "ابن ثانوس من امرأة لا بشرية، أمضى عمره مداويًا في مدينة خفية قبل أن يأتي أبوه باحثًا عنه. إحدى يديه تقتل والأخرى تحبس المرء في كهرمان.",
    },
    related: [{ id: "thanos", kind: "family" }],
  },
  {
    id: "sasquatch",
    nameEn: "Sasquatch",
    nameAr: "ساسكواتش",
    aliases: ["Sasquatch", "Walter Langkowski"],
    category: "hero",
    affiliation: ["Alpha Flight"],
    universe: ["mcu"],
    species: "Mutate",
    powers: [
      { en: "Turns into an orange giant", ar: "يتحول إلى عملاق برتقالي" },
      { en: "A physicist underneath", ar: "فيزيائي في الأصل" },
      { en: "Borrowed a beast's strength", ar: "استعار قوة وحش" },
    ],
    origin: {
      en: "A Canadian physicist who tried to reproduce the Hulk's transformation on himself and instead bound a mythical creature's strength to his body.",
      ar: "فيزيائي كندي حاول أن يكرّر تحوّل هالك في نفسه، فربط بجسده بدلًا من ذلك قوة مخلوق أسطوري.",
    },
    related: [{ id: "hulk", kind: "ally" }],
  },
  {
    id: "cosmic-ghost-rider",
    nameEn: "Cosmic Ghost Rider",
    nameAr: "كوزميك غوست رايدر",
    aliases: ["Cosmic Ghost Rider"],
    category: "antihero",
    affiliation: ["Cosmic entities", "Midnight Sons"],
    universe: ["mcu"],
    /* NOT plain Human. Frank Castle carrying the Power Cosmic and the Spirit of Vengeance at once. */
    species: "Enhanced human",
    powers: [
      /* Three bullets, two of which were biography. He is a Spirit of
         Vengeance who took the Power Cosmic — Ghost Rider and Silver Surfer in
         one body — and the record named neither the Stare nor the chains. */
      { en: "The Power Cosmic and hellfire", ar: "القوة الكونية ونار الجحيم" },
      { en: "The Penance Stare", ar: "نظرة الكفارة" },
      { en: "Chains from Cyttorak's bones", ar: "سلاسل من عظام سيتوراك" },
      { en: "Rebuilds himself from a skull", ar: "يعيد بناء نفسه من جمجمة" },
      { en: "Cannot be permanently killed", ar: "لا يُقتل نهائيًا" },
      {
        en: "Frank Castle, at the end of things",
        ar: "فرانك كاسل في آخر الزمان",
      },
    ],
    origin: {
      en: "Frank Castle from a future where everything had already lost, who made a deal with Mephisto and then another with Galactus, and came out carrying both.",
      ar: "فرانك كاسل من مستقبل خُسر فيه كل شيء سلفًا، عقد صفقة مع مفيستو ثم أخرى مع جالاكتوس، فخرج حاملًا الاثنتين.",
    },
    related: [
      { id: "punisher", kind: "variant" },
      { id: "galactus", kind: "ally" },
    ],
  },
  {
    id: "namora",
    nameEn: "Namora",
    nameAr: "نامورا",
    aliases: ["Namora", "Aquaria Nautica Neptunia"],
    category: "antihero",
    affiliation: ["Atlantis", "Talokanil"],
    universe: ["mcu"],
    species: "Atlantean",
    powers: [
      { en: "Strength beyond Namor's", ar: "قوة تفوق قوة نامور" },
      { en: "Flies on ankle wings", ar: "تطير بجناحي كاحلها" },
      { en: "Namor's cousin", ar: "ابنة عم نامور" },
    ],
    origin: {
      en: "Namor's cousin, stronger than he is and considerably less interested in diplomacy, who has spent most of her life defending the sea from whoever came for it that decade.",
      ar: "ابنة عم نامور، أقوى منه وأقل اهتمامًا بالدبلوماسية بكثير، أمضت أكثر عمرها تدافع عن البحر ضد من جاءه في كل عقد.",
    },
    related: [{ id: "namor", kind: "family" }],
  },
  {
    id: "namorita",
    nameEn: "Namorita",
    nameAr: "ناموريتا",
    aliases: ["Namorita", "Namorita Prentiss"],
    category: "hero",
    affiliation: ["Atlantis", "Talokanil"],
    universe: ["mcu"],
    species: "Atlantean",
    powers: [
      { en: "Atlantean strength", ar: "قوة أتلانتية" },
      { en: "Grew up on the surface", ar: "نشأت على السطح" },
      { en: "Died starting a war", ar: "ماتت فأشعلت حربًا" },
    ],
    origin: {
      en: "Namora's clone-daughter, raised among surface humans, whose death alongside hundreds of civilians is the event that started the superhero civil war.",
      ar: "ابنة نامورا المستنسخة، نشأت بين بشر السطح، وموتها مع مئات المدنيين هو الحدث الذي أشعل الحرب الأهلية بين الأبطال.",
    },
    related: [{ id: "namora", kind: "family" }],
  },
];

/**
 * THE SPIDER-VARIANTS, batch 17.
 *
 * Every one that is a Peter is typed `variant` of Spider-Man; the ones who
 * are their own people — Spider-Boy, Web-Weaver, Sun-Spider, Spider-Byte —
 * are allies instead. The distinction matters on the one site that models it.
 *
 * The Superior Spider-Man is deliberately absent. He is Otto Octavius in
 * Peter's body, and Doctor Octopus is already a record here; a second one
 * would be the same duplicate mistake as Kindred and the Red Goblin. He
 * belongs as an alias or not at all, and that is a call to make rather than
 * an omission.
 */
const spiderVariants: CharacterDraft[] = [
  {
    id: "spider-boy",
    nameEn: "Spider-Boy",
    nameAr: "سبايدر بوي",
    aliases: ["Spider-Boy", "Bailey Briggs"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Sticks to anything", ar: "يلتصق بأي شيء" },
      { en: "Erased from everyone's memory", ar: "مُحي من ذاكرة الجميع" },
      { en: "Was Spider-Man's sidekick", ar: "كان مساعد سبايدرمان" },
    ],
    origin: {
      en: "Spider-Man's forgotten sidekick, wiped from the memory of everyone who knew him including Peter, and now trying to prove to a world with no record of him that he was ever there.",
      ar: "مساعد سبايدرمان المنسيّ، مُحي من ذاكرة كل من عرفه بمن فيهم بيتر، ويحاول الآن أن يثبت لعالم لا سجلّ له فيه أنه كان موجودًا.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "web-slinger",
    nameEn: "Web-Slinger",
    nameAr: "ويب سلينغر",
    aliases: ["Web-Slinger", "Patrick O'Hara"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-31913",
    species: "Mutate",
    powers: [
      { en: "Rides a spider-sensed horse", ar: "يمتطي حصانًا بحسّ عنكبوتي" },
      { en: "Web-lines and six-guns", ar: "خيوط ومسدسان" },
      { en: "A sheriff in the old west", ar: "عمدة في الغرب القديم" },
    ],
    origin: {
      en: "The Spider-Man of an American frontier reality, a masked sheriff with a horse called Widow who shares his warning sense.",
      ar: "سبايدرمان في واقعٍ من التخوم الأمريكية، عمدة مقنّع بحصان اسمه الأرملة يشاركه حسّ الإنذار.",
    },
    related: [
      {
        id: "spider-man",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
    ],
  },
  {
    id: "spider-rex",
    nameEn: "Spider-Rex",
    nameAr: "سبايدر ريكس",
    aliases: ["Spider-Rex", "Pter Ptarker"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-66",
    species: "Mutate",
    powers: [
      { en: "A tyrannosaur with the powers", ar: "تيرانوصور بالقوى" },
      { en: "Bitten by a radioactive spider", ar: "لدغته عنكبوت مشعّ" },
      { en: "Genuinely a dinosaur", ar: "ديناصور حقًا" },
    ],
    origin: {
      en: "A tyrannosaurus from a world where dinosaurs never died out, bitten by a radioactive spider. He is exactly what he sounds like and takes the responsibility just as seriously.",
      ar: "تيرانوصور من عالمٍ لم تنقرض فيه الديناصورات، لدغته عنكبوت مشعّ. وهو تمامًا ما يبدو عليه، ويحمل المسؤولية بالجدّية نفسها.",
    },
    related: [
      {
        id: "spider-man",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
    ],
  },
  {
    id: "spinstress",
    nameEn: "Spinstress",
    nameAr: "سبينستريس",
    aliases: ["Spinstress"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "A princess who sings", ar: "أميرة تغني" },
      { en: "Animals answer her", ar: "تجيبها الحيوانات" },
      { en: "Her world runs on songs", ar: "عالمها يسير بالأغاني" },
    ],
    origin: {
      en: "The Spider-Woman of a reality shaped like a musical, a princess whose singing summons help and whose problems resolve in verses.",
      ar: "سبايدر وومان في واقعٍ على هيئة مسرحية غنائية، أميرة يستدعي غناؤها العون وتُحلّ مشكلاتها في مقاطع.",
    },
    related: [
      {
        id: "spider-man",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
    ],
  },
  {
    id: "web-weaver",
    nameEn: "Web-Weaver",
    nameAr: "ويب ويفر",
    aliases: ["Web-Weaver", "Cooper Coen"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-71490",
    species: "Mutate",
    powers: [
      { en: "Designed his own suit", ar: "صمّم بدلته بنفسه" },
      { en: "A fashion designer by day", ar: "مصمم أزياء نهارًا" },
      { en: "Webbing spun as thread", ar: "خيوط تُغزل نسيجًا" },
    ],
    origin: {
      en: "A fashion designer who became a Spider-hero and made a point of the costume being genuinely well made, which none of the others can claim.",
      ar: "مصمم أزياء صار بطلًا عنكبوتيًا وحرص على أن يكون الزيّ مصنوعًا صنعةً حقيقية، وهو ما لا يدّعيه سواه.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "spider-smasher",
    nameEn: "Spider-Smasher",
    nameAr: "سبايدر سماشر",
    aliases: ["Spider-Smasher", "Billie Morales"],
    category: "antihero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Hunts spider-totems", ar: "تصطاد الطواطم العنكبوتية" },
      { en: "Miles Morales's sister", ar: "أخت مايلز موراليس" },
      { en: "Raised to end the Web", ar: "نشأت لإنهاء الشبكة" },
    ],
    origin: {
      en: "Miles Morales's sister from a reality where she was raised by the enemies of the Great Web and taught that spider-totems are the thing to be stopped.",
      ar: "أخت مايلز موراليس من واقعٍ ربّاها فيه أعداء الشبكة الكبرى وعلّموها أن الطواطم العنكبوتية هي ما يجب إيقافه.",
    },
    related: [{ id: "miles-morales", kind: "family" }],
  },
  {
    id: "old-man-spider",
    nameEn: "Old Man Spider",
    nameAr: "سبايدرمان العجوز",
    aliases: ["Old Man Spider"],
    category: "antihero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-90266",
    species: "Mutate",
    powers: [
      /* Three bullets of biography for a Spider-Man. "Decades past retiring /
         Outlived everyone he saved / Still going out anyway" is a character
         study and never once says he has powers. */
      { en: "Every power Peter ever had", ar: "كل قدرة امتلكها بيتر يومًا" },
      { en: "Spider-sense, dulled by age", ar: "حاسة العنكبوت، أضعفها العمر" },
      { en: "Wall-crawling and webbing", ar: "تسلّق الجدران والشباك" },
      { en: "Decades past retiring", ar: "تجاوز سن التقاعد بعقود" },
      { en: "Outlived everyone he saved", ar: "عاش بعد كل من أنقذهم" },
      { en: "Still going out anyway", ar: "ومع ذلك ما زال يخرج" },
    ],
    origin: {
      en: "A Peter Parker from a ruined future who is far too old for this and does it anyway, having outlived every person the work was supposed to be for.",
      ar: "بيتر باركر من مستقبل خرِب، تجاوز السنّ بكثير ويفعلها رغم ذلك، بعدما بقي حيًّا بعد كل من كان العمل من أجلهم.",
    },
    related: [
      {
        id: "spider-man",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
    ],
  },
  {
    id: "sun-spider",
    nameEn: "Sun-Spider",
    nameAr: "صن سبايدر",
    aliases: ["Sun-Spider", "Charlotte Webber"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-20023",
    species: "Mutate",
    powers: [
      { en: "Swings with forearm crutches", ar: "تتأرجح بعكازي ساعد" },
      { en: "Ehlers-Danlos syndrome", ar: "متلازمة إهلرز دانلوس" },
      { en: "Built her gear around herself", ar: "صمّمت عتادها حولها" },
    ],
    origin: {
      en: "A Spider-Woman with Ehlers-Danlos syndrome who designed her own web-shooters and crutches to work together, rather than treating her body as the problem to be solved.",
      ar: "سبايدر وومان مصابة بمتلازمة إهلرز دانلوس، صمّمت قاذفات خيوطها وعكازيها ليعملا معًا، بدل أن تعامل جسدها كمشكلة تُحلّ.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "charlotte-witter",
    nameEn: "Charlotte Witter",
    nameAr: "شارلوت ويتر",
    aliases: ["Charlotte Witter"],
    category: "villain",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Drains other spiders' powers", ar: "تمتص قوى العناكب الأخرى" },
      {
        en: "Four spider-legs from her back",
        ar: "أربع أرجل عنكبوتية من ظهرها",
      },
      { en: "Made by Doctor Octopus", ar: "صنعها دكتور أوكتوبس" },
    ],
    origin: {
      en: "A model surgically altered by Doctor Octopus into a Spider-Woman built specifically to drain the powers of the others and leave them ordinary.",
      ar: "عارضة أزياء عدّلها دكتور أوكتوبس جراحيًا إلى سبايدر وومان صُنعت خصيصًا لامتصاص قوى الأخريات وتركهنّ عاديات.",
    },
    related: [
      { id: "doctor-octopus", kind: "ally" },
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "spider-byte",
    nameEn: "Spider-Byte",
    nameAr: "سبايدر بايت",
    aliases: ["Spider-Byte", "Margo Kess"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-22191",
    species: "Mutate",
    powers: [
      { en: "Lives partly in the network", ar: "تعيش جزئيًا في الشبكة" },
      { en: "Digital avatar body", ar: "جسد رمزيّ رقمي" },
      { en: "Powers from a virtual world", ar: "قواها من عالم افتراضي" },
    ],
    origin: {
      en: "A Spider-hero whose powers exist in a virtual reality and who learned to carry them out of it, which makes her the only spider whose body is partly software.",
      ar: "بطلة عنكبوتية قواها قائمة في واقع افتراضي، وتعلّمت أن تحملها خارجه، فصارت العنكبوت الوحيدة التي جسدها برمجيّ في جزء منه.",
    },
    related: [{ id: "miles-morales", kind: "ally" }],
  },
  {
    id: "bride-of-nine-spiders",
    nameEn: "Bride of Nine Spiders",
    nameAr: "عروس العناكب التسعة",
    aliases: ["Bride of Nine Spiders"],
    category: "antihero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Nine spiders answer her", ar: "تسعة عناكب تجيبها" },
      { en: "A chamber of them at her call", ar: "حجرة منها رهن ندائها" },
      { en: "One of the Immortal Weapons", ar: "إحدى الأسلحة الخالدة" },
    ],
    origin: {
      en: "One of the Seven Capital Cities' Immortal Weapons, who fights by opening her cloak and letting nine spiders out of it. She rarely speaks and does not need to.",
      ar: "إحدى الأسلحة الخالدة لمدن العواصم السبع، تقاتل بأن تفتح عباءتها فتخرج منها تسعة عناكب. نادرًا ما تتكلم ولا حاجة بها إلى ذلك.",
    },
    related: [{ id: "iron-fist", kind: "ally" }],
  },
];

/**
 * MUTANTS, batch 18 — and two of them are not mutants.
 *
 * Ink's tattoos grant real powers and he is not a mutant at all; the
 * tattooist was, which he spent a long time not knowing. Hepzibah is a
 * Mephitisoid pirate. Both are on the roster and both are typed by what they
 * actually are, the same call made for Longshot and Lockheed.
 *
 * Six of the twelve were confirmed by the pre-check to have real screen
 * credits before any record was written: Arclight, Ink, Maverick, Angel Dust,
 * Lady Deathstrike and Fabian Cortez.
 */
const mutantsF: CharacterDraft[] = [
  {
    id: "arclight",
    nameEn: "Arclight",
    nameAr: "آركلايت",
    aliases: ["Arclight", "Philippa Sontag"],
    category: "villain",
    affiliation: ["Marauders"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Shockwaves on impact, from a punch",
        ar: "موجات صدمية عند الارتطام، من لكمة",
      },
      {
        en: "Or a stomp, which shatters the ground",
        ar: "أو دوسة، تحطم الأرض",
      },
      {
        en: "Scrambles machinery with the vibration",
        ar: "تشوّش الآلات بالاهتزاز",
      },
      {
        en: "Disorients anyone standing near",
        ar: "تربك كل من يقف قريبًا",
      },
      {
        en: "Superhuman strength and durability",
        ar: "قوة وصلابة خارقتان",
      },
      {
        en: "A Vietnam veteran, and a Marauder",
        ar: "محاربة قديمة في فيتنام، ومارودر",
      },
    ],
    origin: {
      en: "A Marauder who sends destructive shockwaves through anything she touches, and one of the group Mister Sinister sent into the Morlock tunnels.",
      ar: "مغيرة تبعث موجات صدم مدمّرة عبر كل ما تلمسه، وإحدى من أرسلهم مستر سينيستر إلى أنفاق المورلوك.",
    },
    related: [{ id: "mister-sinister", kind: "ally" }],
  },
  {
    id: "beak",
    nameEn: "Beak",
    nameAr: "بيك",
    aliases: ["Beak", "Barnell Bohusk"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    /* SCORED ZERO. Three bullets, none of which the vocabulary could read. */
    powers: [
      {
        en: "Hollow bones, and a beak",
        ar: "عظام جوفاء، ومنقار",
      },
      {
        en: "Feathers, and taloned hands and feet",
        ar: "ريش، ويدان وقدمان بمخالب",
      },
      {
        en: "Glides, and flaps when he has to",
        ar: "ينزلق، ويرفرف عند اللزوم",
      },
      {
        en: "Agility and endurance past a man's",
        ar: "رشاقة وتحمّل يفوقان البشر",
      },
      {
        en: "Brave, which is most of what he has",
        ar: "شجاع، وهذا أكثر ما يملك",
      },
      {
        en: "Fathered a brood of winged children",
        ar: "أنجب صغارًا مجنّحين",
      },
    ],
    origin: {
      en: "A bird-like mutant who got all of the appearance and almost none of the ability, and who is widely agreed to be the most decent person the school has produced.",
      ar: "متحوّل شبيه بالطير، نال المظهر كله ولم ينل من القدرة شيئًا يُذكر، ويكاد يُجمَع على أنه أكرم من أخرجته المدرسة.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "ink",
    nameEn: "Ink",
    nameAr: "إنك",
    aliases: ["Ink", "Eric Gitter"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Every tattoo gives him a power",
        ar: "كل وشم يمنحه قدرة",
      },
      {
        en: "A caduceus heals what it touches",
        ar: "عصا الطبابة تشفي ما تلمسه",
      },
      {
        en: "A lightning bolt fires energy blasts",
        ar: "صاعقة تطلق قذائف طاقة",
      },
      {
        en: "A biohazard mark makes his touch toxic",
        ar: "علامة خطر حيوي تجعل لمسته سامة",
      },
      {
        en: "A piston fist gives him the strength",
        ar: "قبضة مكبس تمنحه القوة",
      },
      {
        en: "The tattoos are the mutation, not him",
        ar: "الوشوم هي الطفرة، لا هو",
      },
    ],
    origin: {
      en: "A man whose tattoos grant real powers, drawn by a mutant tattooist. He is not a mutant at all, which he spent a long time not knowing.",
      ar: "رجل تمنحه وشومه قوى حقيقية، رسمها واشم متحوّل. وهو ليس متحوّلًا البتة، وقد جهل ذلك زمنًا طويلًا.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "anarchist",
    nameEn: "Anarchist",
    nameAr: "الأناركي",
    aliases: ["Anarchist", "Tike Alicar"],
    category: "antihero",
    affiliation: ["X-Statix"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Sweats an acid he can weaponise",
        ar: "يفرز عرقًا حمضيًا يحوّله سلاحًا",
      },
      {
        en: "Fires corrosive beams from his hands",
        ar: "يطلق أشعة أكّالة من يديه",
      },
      {
        en: "They break down almost anything",
        ar: "تفكك أي شيء تقريبًا",
      },
      {
        en: "Blew the roof off a hotel with it",
        ar: "نسف بها سقف فندق",
      },
      {
        en: "Or subtly weights a pair of thrown dice",
        ar: "أو يرجّح زهري نرد بخفة",
      },
      {
        en: "Secretes a sticky adhesive as well",
        ar: "ويفرز مادة لاصقة أيضًا",
      },
    ],
    origin: {
      en: "A member of a mutant team assembled for television, whose sweat burns through anything and who is entirely aware that he was cast rather than recruited.",
      ar: "عضو في فريق متحوّلين جُمع للتلفزيون، عرقه يحرق كل شيء، وهو يدرك تمامًا أنه اختير للدور لا جُنّد.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "maverick",
    nameEn: "Maverick",
    nameAr: "مافريك",
    aliases: ["Maverick", "Christoph Nord", "Agent Zero"],
    category: "antihero",
    affiliation: ["Weapon X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Absorbs the kinetic energy of a hit",
        ar: "يمتص الطاقة الحركية لضربة",
      },
      {
        en: "Throws it back as a concussive blast",
        ar: "يردّها قذيفة صادمة",
      },
      {
        en: "And keeps some to boost his strength",
        ar: "ويحتفظ ببعضها ليعزز قوته",
      },
      {
        en: "Ages slowly, and resists injury",
        ar: "يشيخ ببطء، ويقاوم الإصابة",
      },
      {
        en: "A master marksman and martial artist",
        ar: "رامٍ بارع وفنان قتال",
      },
      {
        en: "Weapon X, before he walked away",
        ar: "ويبون إكس، قبل أن ينسحب",
      },
    ],
    origin: {
      en: "A mercenary from the same programme that made Wolverine, who absorbs the force of what hits him and fires it back, and who has been on both sides of Logan more than once.",
      ar: "مرتزق من البرنامج نفسه الذي صنع ولفرين، يمتص قوة ما يصيبه ويردّها، وكان في جهتَي لوغان أكثر من مرة.",
    },
    related: [{ id: "wolverine", kind: "ally" }],
  },
  {
    id: "hepzibah",
    nameEn: "Hepzibah",
    nameAr: "هيبزيبا",
    aliases: ["Hepzibah"],
    category: "hero",
    affiliation: ["Starjammers"],
    universe: ["fox"],
    species: "Mephitisoid",
    powers: [
      { en: "Claws and a skunk's defence", ar: "مخالب ودفاع الظربان" },
      { en: "A Starjammer, not a mutant", ar: "نجّامة لا متحوّلة" },
      { en: "Corsair's partner", ar: "شريكة كورسير" },
    ],
    origin: {
      en: "A Mephitisoid pirate of the Starjammers, an alien rather than a mutant, who fights with claws and a scent nobody stays near.",
      ar: "قرصانة ميفيتيسويدية من النجّامين، فضائية لا متحوّلة، تقاتل بمخالبها وبرائحة لا يبقى أحد قربها.",
    },
    related: [{ id: "gladiator", kind: "enemy" }],
  },
  {
    id: "goldballs",
    nameEn: "Goldballs",
    nameAr: "غولدبولز",
    aliases: ["Goldballs", "Fabio Medina"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Launches dense golden spheres",
        ar: "يطلق كرات ذهبية كثيفة",
      },
      {
        en: "As projectiles, shields and cushions",
        ar: "كمقذوفات ودروع ووسائد",
      },
      {
        en: "Makes them fast, and in quantity",
        ar: "يصنعها بسرعة، وبكثرة",
      },
      {
        en: "They turned out to be eggs",
        ar: "تبيّن أنها بيوض",
      },
      {
        en: "His real power is creating mutant life",
        ar: "قدرته الحقيقية خلق حياة متحولة",
      },
      {
        en: "Krakoa's resurrections run through him",
        ar: "إحياءات كراكوا تمر عبره",
      },
    ],
    origin: {
      en: "A mutant who generates large golden spheres, treated as a joke power for years, until it emerged that the spheres were how mutants were being resurrected.",
      ar: "متحوّل يولّد كرات ذهبية كبيرة، عُدّت قوةً هزلية سنين، حتى تبيّن أن تلك الكرات هي وسيلة إحياء المتحوّلين.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "glob-herman",
    nameEn: "Glob Herman",
    nameAr: "غلوب هيرمان",
    aliases: ["Glob Herman", "Robert Herman"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A body of translucent wax",
        ar: "جسد من شمع شفاف",
      },
      {
        en: "Strength and durability from it",
        ar: "قوة وصلابة منه",
      },
      {
        en: "Ignites himself, and burns hotter",
        ar: "يشعل نفسه، ويحترق أسخن",
      },
      {
        en: "Regrows the wax when it melts",
        ar: "ينبت الشمع متى ذاب",
      },
      {
        en: "Reshapes it however he needs",
        ar: "يعيد تشكيله كما يحتاج",
      },
      {
        en: "You can see his skeleton through it",
        ar: "ترى هيكله من خلاله",
      },
    ],
    origin: {
      en: "A mutant made of transparent bio-paraffin with his skeleton showing through, who is well liked, easily set on fire, and rebuilds afterwards.",
      ar: "متحوّل من برافين حيوي شفاف يظهر هيكله عبره، محبوب، سريع الاشتعال، ويعيد بناء نفسه بعدها.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "angel-dust",
    nameEn: "Angel Dust",
    nameAr: "أنجل داست",
    aliases: ["Angel Dust"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Strength that surges with adrenaline",
        ar: "قوة تتصاعد مع الأدرينالين",
      },
      {
        en: "Durability and stamina rise with it",
        ar: "تعلو الصلابة والتحمّل معها",
      },
      {
        en: "Hits far above what her size suggests",
        ar: "تضرب أقوى بكثير مما يوحي حجمها",
      },
      {
        en: "Enhanced healing afterwards",
        ar: "شفاء معزز بعدها",
      },
      {
        en: "The surge is the whole mechanism",
        ar: "التصاعد هو الآلية كلها",
      },
      {
        en: "Calm, she is much closer to ordinary",
        ar: "هادئة، تقترب من العادي كثيرًا",
      },
    ],
    origin: {
      en: "A mutant whose strength spikes on adrenaline and drops just as fast, who fights for the people who gave her somewhere to be rather than for a cause.",
      ar: "متحوّلة تقفز قوتها بالأدرينالين وتهبط بالسرعة نفسها، تقاتل من أجل من آووها لا من أجل قضية.",
    },
    related: [{ id: "deadpool", kind: "enemy" }],
  },
  {
    id: "lady-deathstrike",
    nameEn: "Lady Deathstrike",
    nameAr: "الليدي ديثسترايك",
    aliases: ["Lady Deathstrike", "Yuriko Oyama"],
    category: "villain",
    affiliation: ["Weapon X"],
    universe: ["fox"],
    species: "Cyborg",
    powers: [
      { en: "Adamantium talons", ar: "مخالب أداماتيوم" },
      { en: "Rebuilt herself for revenge", ar: "أعادت بناء نفسها للثأر" },
      { en: "Hunts Wolverine specifically", ar: "تطارد ولفرين تحديدًا" },
    ],
    origin: {
      en: "The daughter of the man who invented the adamantium bonding process, who had herself rebuilt as a cyborg to hunt the man wearing her father's work.",
      ar: "ابنة الرجل الذي ابتكر طريقة ربط الأداماتيوم، أعادت بناء نفسها آلية لتطارد الرجل الذي يرتدي عمل أبيها.",
    },
    related: [{ id: "wolverine", kind: "enemy" }],
  },
  {
    id: "fabian-cortez",
    nameEn: "Fabian Cortez",
    nameAr: "فابيان كورتيز",
    aliases: ["Fabian Cortez"],
    category: "villain",
    /* Also an Acolyte, and the one who tried to kill Magneto. */
    affiliation: ["Acolytes"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Amplifies another mutant's power",
        ar: "يضاعف قدرة متحول آخر",
      },
      {
        en: "Burns them out doing it, on purpose",
        ar: "ويحرقهم بذلك، عن عمد",
      },
      {
        en: "Nearly killed Magneto that way",
        ar: "كاد يقتل ماغنيتو بتلك الطريقة",
      },
      {
        en: "Heals himself by siphoning life",
        ar: "يشفي نفسه بامتصاص الحياة",
      },
      {
        en: "Concussive blasts, and a shield",
        ar: "قذائف صادمة، ودرع",
      },
      {
        en: "Betrayed everyone he ever knelt to",
        ar: "خان كل من ركع له",
      },
    ],
    origin: {
      en: "A mutant who boosts other mutants' abilities to the point of killing them, and who used that on Magneto while calling himself his most loyal follower.",
      ar: "متحوّل يضخّم قدرات المتحوّلين إلى حدّ قتلهم، واستعمل ذلك على ماغنيتو وهو يسمّي نفسه أوفى أتباعه.",
    },
    related: [{ id: "magneto", kind: "enemy" }],
  },
  {
    id: "jamie-braddock",
    nameEn: "Jamie Braddock",
    nameAr: "جيمي برادوك",
    aliases: ["Jamie Braddock", "James Braddock"],
    category: "antivillain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    mutantClass: "omega",
    powers: [
      {
        en: "Sees reality as strings, and reties them",
        ar: "يرى الواقع خيوطًا فيعيد عقدها",
      },
      {
        en: "Started with objects, ended with everything",
        ar: "بدأ بالأشياء وانتهى بكل شيء",
      },
      { en: "Teleports and transmutes at will", ar: "ينتقل ويحوّل كما يشاء" },
      { en: "Terraformed a planet on his own", ar: "حوّل كوكبًا وحده" },
      { en: "Knows exactly what he is doing", ar: "يعرف تمامًا ما يفعل" },
      { en: "Sanity did not survive it", ar: "لم تنجُ سلامة عقله من ذلك" },
    ],
    origin: {
      en: "Betsy and Brian Braddock's brother, an Omega-level reality manipulator who sees the world as knotted strings and lost his mind somewhere in the untangling.",
      ar: "أخو بيتسي وبراين برادوك، متلاعب بالواقع من مستوى أوميغا يرى العالم خيوطًا معقودة، وفقد عقله في مكان ما من فكّها.",
    },
    related: [{ id: "psylocke", kind: "family" }],
  },
];

/**
 * THE MINOR ROGUES, batch 19.
 *
 * The Owl is aliased "The Owl" and "Leland Owlsley" and never a bare "Owl".
 * The pre-check found an "Owl" credited in Agatha All Along, which is plainly
 * not a corrupt financier with skin flaps — the fourth time a single word
 * would have taken a credit that was not his, and the first time it was
 * caught before the record existed rather than after.
 *
 * None of the other eleven has an exact credit anywhere in the 216 titles,
 * which was checked before any of them was written.
 */
const minorRogues: CharacterDraft[] = [
  {
    id: "the-owl",
    nameEn: "The Owl",
    nameAr: "البومة",
    aliases: ["The Owl", "Leland Owlsley"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Glides on skin flaps", ar: "ينزلق على أغشية جلدية" },
      { en: "Talons and a grip", ar: "مخالب وقبضة" },
      { en: "A crooked financier first", ar: "ماليّ فاسد قبل كل شيء" },
    ],
    origin: {
      en: "A corrupt financier who altered himself to glide and grew talons, and who runs a piece of the city's crime from a position halfway between banker and bird.",
      ar: "ماليّ فاسد عدّل نفسه ليطير انزلاقًا ونبتت له مخالب، ويدير جزءًا من جريمة المدينة من موقع بين المصرفي والطير.",
    },
    related: [
      { id: "kingpin", kind: "enemy" },
      { id: "daredevil", kind: "enemy" },
    ],
  },
  {
    id: "black-tarantula",
    nameEn: "Black Tarantula",
    nameAr: "التارانتولا السوداء",
    aliases: ["Black Tarantula", "Carlos LaMuerto"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Strength from a family rite", ar: "قوة من طقس عائلي" },
      { en: "Heals almost anything", ar: "يشفى من كل شيء تقريبًا" },
      { en: "The latest of a long line", ar: "آخر سلسلة طويلة" },
    ],
    origin: {
      en: "The current holder of a title passed down a Peruvian family line for centuries, each one given strength by a ritual, and the first of them to question what it is for.",
      ar: "الحامل الحالي للقب توارثته عائلة بيروفية قرونًا، يُمنح كل منهم قوة بطقس، وهو أولهم الذي يسأل عمّا يفيد ذلك.",
    },
    related: [{ id: "kingpin", kind: "enemy" }],
  },
  {
    id: "crime-master",
    nameEn: "Crime Master",
    nameAr: "سيد الجريمة",
    aliases: ["Crime Master", "Nicholas Lewis"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Organises other criminals",
        ar: "ينظّم المجرمين الآخرين",
      },
      {
        en: "A marksman with two pistols",
        ar: "رامٍ ماهر بمسدسين",
      },
      {
        en: "Body armour under the coat",
        ar: "درع جسد تحت المعطف",
      },
      {
        en: "Knows every mask in the city",
        ar: "يعرف كل قناع في المدينة",
      },
      {
        en: "Blackmail files on all of them",
        ar: "ملفات ابتزاز عليهم جميعًا",
      },
      {
        en: "More than one man has worn it",
        ar: "ارتداه أكثر من رجل",
      },
    ],
    origin: {
      en: "A masked crime organiser whose identity has passed between several men, each of whom built a syndicate and each of whom was eventually found out by the same wall-crawler.",
      ar: "منظّم جريمة مقنّع انتقلت هويته بين عدة رجال، بنى كلٌّ منهم عصابة، وانكشف كلٌّ منهم في النهاية على يد الزاحف على الجدران نفسه.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "mister-fear",
    nameEn: "Mister Fear",
    nameAr: "مستر فير",
    aliases: ["Mister Fear", "Larry Cranston", "Lawrence Cranston"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "A gas that induces absolute terror",
        ar: "غاز يبعث رعبًا مطلقًا",
      },
      {
        en: "It works on anyone who breathes it",
        ar: "يعمل على كل من يستنشقه",
      },
      {
        en: "Sprayed from gauntlets and grenades",
        ar: "يُرش من قفازات وقنابل",
      },
      {
        en: "Paralyses a target where they stand",
        ar: "يشل الهدف في مكانه",
      },
      {
        en: "Immune to his own compound",
        ar: "محصّن ضد مركّبه",
      },
      {
        en: "A chemist before a criminal",
        ar: "كيميائي قبل أن يكون مجرمًا",
      },
    ],
    origin: {
      en: "A lawyer with a chemical that makes people afraid of nothing in particular, who has never once needed to be in the room when it works.",
      ar: "محامٍ يملك مركبًا يجعل الناس يخافون من لا شيء بعينه، ولم يحتج قط إلى أن يكون في الغرفة حين يعمل.",
    },
    related: [{ id: "daredevil", kind: "enemy" }],
  },
  {
    id: "stunner",
    nameEn: "Stunner",
    nameAr: "ستَنر",
    aliases: ["Stunner", "Angelina Brancale"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "A body built in virtual reality", ar: "جسد بُني في واقع افتراضي" },
      { en: "Strength to match the Hulk", ar: "قوة تضاهي هالك" },
      { en: "Doctor Octopus made it for her", ar: "صنعه لها دكتور أوكتوبس" },
    ],
    origin: {
      en: "A woman who projects herself into an idealised body built by Doctor Octopus, whom she loves, and who is far stronger inside it than anyone expects.",
      ar: "امرأة تُسقط نفسها في جسد مثالي بناه لها دكتور أوكتوبس الذي تحبه، وهي داخله أقوى بكثير مما يتوقع أحد.",
    },
    related: [
      { id: "doctor-octopus", kind: "ally" },
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "white-rabbit",
    nameEn: "White Rabbit",
    nameAr: "الأرنب الأبيض",
    aliases: ["White Rabbit", "Lorina Dodson"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "A themed gang and gadgets",
        ar: "عصابة بطابع وأدوات",
      },
      {
        en: "A rocket-powered hutch that flies",
        ar: "قنّ يطير بدفع صاروخي",
      },
      {
        en: "Guns hidden in the umbrella",
        ar: "مسدسات مخبأة في المظلة",
      },
      {
        en: "Explosive carrots, and she means it",
        ar: "جزر متفجر، وهي جادة",
      },
      {
        en: "Wealthy enough to build any of it",
        ar: "ثرية بما يكفي لبناء أي منها",
      },
      {
        en: "Bored, which is the dangerous part",
        ar: "ملولة، وهذا هو الجزء الخطر",
      },
    ],
    origin: {
      en: "A wealthy widow who took up costumed crime out of boredom and committed entirely to an Alice in Wonderland theme, which makes her ridiculous and does not make her harmless.",
      ar: "أرملة ثرية امتهنت الجريمة المقنّعة من الملل والتزمت تمامًا بثيمة أليس في بلاد العجائب، وذلك يجعلها سخيفة ولا يجعلها غير خطرة.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "screwball",
    nameEn: "Screwball",
    nameAr: "سكروبول",
    aliases: ["Screwball"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Streams her own crimes",
        ar: "تبث جرائمها مباشرة",
      },
      {
        en: "A parkour athlete, and a good one",
        ar: "رياضية باركور، وبارعة",
      },
      {
        en: "Acrobatics that lose any pursuit",
        ar: "بهلوانيات تفلت من أي مطاردة",
      },
      {
        en: "Free-runs a city faster than a car",
        ar: "تعدو في مدينة أسرع من سيارة",
      },
      {
        en: "Gadgets bought with the ad revenue",
        ar: "أدوات اشترتها من عائد الإعلانات",
      },
      {
        en: "Wants the audience, not the money",
        ar: "تريد الجمهور، لا المال",
      },
    ],
    origin: {
      en: "A parkour athlete who commits crimes purely to livestream them, and who is chasing viewers rather than profit. Getting caught on camera is the point.",
      ar: "رياضية باركور ترتكب الجرائم لمجرّد بثّها مباشرة، وتطارد المشاهدين لا الربح. وأن تُضبط أمام الكاميرا هو المقصد.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "big-wheel",
    nameEn: "Big Wheel",
    nameAr: "العجلة الكبرى",
    aliases: ["Big Wheel", "Jackson Weele"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Drives an enormous armoured wheel",
        ar: "يقود عجلة مدرعة ضخمة",
      },
      {
        en: "Guns mounted all the way around it",
        ar: "مدافع مثبتة حولها كلها",
      },
      {
        en: "Ten feet across, and it crushes cars",
        ar: "بعرض عشرة أقدام، وتسحق السيارات",
      },
      {
        en: "Faster than it has any right to be",
        ar: "أسرع مما يحق لها",
      },
      {
        en: "Built it himself, and it ruined him",
        ar: "بناها بنفسه، فأفلسته",
      },
      {
        en: "Nearly impossible to stop head-on",
        ar: "يكاد يستحيل إيقافها وجهًا لوجه",
      },
    ],
    origin: {
      en: "An embezzler who spent what was left of his money on an armed vehicle shaped like a giant wheel, which is exactly as difficult to steer as it sounds.",
      ar: "مختلس أنفق ما بقي من ماله على مركبة مسلّحة على هيئة عجلة عملاقة، وهي عسيرة القيادة تمامًا كما تبدو.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "rocket-racer",
    nameEn: "Rocket Racer",
    nameAr: "روكيت ريسر",
    aliases: ["Rocket Racer", "Robert Farrell"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "A rocket-powered skateboard",
        ar: "لوح تزلج بدفع صاروخي",
      },
      {
        en: "Magnetic boots that hold him to it",
        ar: "حذاء مغناطيسي يثبته عليه",
      },
      {
        en: "Rides walls and ceilings on it",
        ar: "يركبه على الجدران والأسقف",
      },
      {
        en: "Micro-rockets fired from the gauntlets",
        ar: "صواريخ صغيرة من القفازات",
      },
      {
        en: "Body armour, because he falls",
        ar: "درع جسد، لأنه يسقط",
      },
      {
        en: "Robbed to feed his brothers",
        ar: "سرق ليطعم إخوته",
      },
    ],
    origin: {
      en: "A gifted young engineer who built rocket skates and turned to robbery to support his younger siblings, and who was talked out of it and went to college instead.",
      ar: "مهندس شاب موهوب صنع زلّاجات صاروخية ولجأ إلى السرقة ليعيل إخوته الصغار، ثم أُقنع بالعدول عن ذلك فذهب إلى الجامعة.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "speed-demon",
    nameEn: "Speed Demon",
    nameAr: "شيطان السرعة",
    aliases: ["Speed Demon", "James Sanders"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Superhuman speed", ar: "سرعة خارقة" },
      { en: "A chemist who dosed himself", ar: "كيميائي جرّب على نفسه" },
      { en: "Steals more than he fights", ar: "يسرق أكثر مما يقاتل" },
    ],
    origin: {
      en: "A chemist who gave himself super-speed and uses it almost entirely for theft, on the reasoning that fighting anyone is a waste of a good head start.",
      ar: "كيميائي منح نفسه سرعة خارقة ويستعملها في السرقة كلها تقريبًا، بحجّة أن قتال أحد تبديد لسبقٍ جيد.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "gibbon",
    nameEn: "Gibbon",
    nameAr: "غيبون",
    aliases: ["Gibbon", "Martin Blank"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Ape-like agility", ar: "رشاقة القرد" },
      { en: "Wanted to be a sidekick", ar: "أراد أن يكون مساعدًا" },
      { en: "Spider-Man turned him down", ar: "رفضه سبايدرمان" },
    ],
    origin: {
      en: "A man born with simian features and agility who asked Spider-Man to take him on as a partner, was refused, and turned to crime largely out of hurt feelings.",
      ar: "رجل وُلد بملامح ورشاقة قردية، طلب من سبايدرمان أن يتخذه شريكًا فرُفض، فمال إلى الجريمة من جرح المشاعر أساسًا.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "mister-hyde",
    nameEn: "Mister Hyde",
    nameAr: "مستر هايد",
    aliases: ["Mister Hyde", "Calvin Zabo"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "A formula that makes a monster", ar: "تركيبة تصنع وحشًا" },
      { en: "Strength near the Hulk's", ar: "قوة تقارب قوة هالك" },
      { en: "A doctor who wanted to be feared", ar: "طبيب أراد أن يُرهَب" },
    ],
    origin: {
      en: "A doctor who recreated the Jekyll formula on himself out of resentment, and who is one of the few men on the street able to trade blows with the genuinely superhuman.",
      ar: "طبيب أعاد صنع تركيبة جيكل على نفسه من الحقد، وهو من قلائل في الشارع يقدرون على تبادل اللكمات مع من هم خارقون حقًا.",
    },
    related: [{ id: "daredevil", kind: "enemy" }],
  },
];

/**
 * THE DEEP MUTANT TAIL, batch 20.
 *
 * Abyss carries his real name as his record name — "Abyss (Nils Styger)" —
 * because an "Abyss" is credited in Moon Girl and Devil Dinosaur and
 * Nightcrawler's half-brother is not in a children's cartoon. Fifth
 * single-word codename to need this, and the second caught before writing.
 *
 * El Aguila's credit in She-Hulk is real and was confirmed the same way.
 *
 * Hindsight was in this batch and is NOT here: no published art exists for
 * him under any title I could find. He gets a record when there is a picture
 * to put on it, rather than a wrong picture now.
 */
const mutantsG: CharacterDraft[] = [
  {
    id: "abyss",
    nameEn: "Abyss (Nils Styger)",
    nameAr: "أبيس (نيلز شتايغر)",
    aliases: ["Nils Styger"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A body of dark elastic coils, not flesh",
        ar: "جسد من ملفات مظلمة مرنة، لا لحم",
      },
      {
        en: "Unravels into a churning void",
        ar: "ينحل إلى خواء مضطرب",
      },
      {
        en: "Pulls you inside, and holds you there",
        ar: "يسحبك إلى الداخل، ويحبسك",
      },
      {
        en: "A dark dimension within himself",
        ar: "بُعد مظلم داخله",
      },
      {
        en: "Teleports, which he got from his father",
        ar: "ينتقل، وقد ورثها عن أبيه",
      },
      {
        en: "Binds and constricts with the tendrils",
        ar: "يقيّد ويخنق باللوامس",
      },
    ],
    origin: {
      en: "Nightcrawler's half-brother and Azazel's son, who can come apart into a hole in the world and draw whatever is nearby into it.",
      ar: "أخو نايتكرولر لأبيه وابن أزازيل، ينحلّ إلى ثقب في العالم ويجذب إليه ما حوله.",
    },
    related: [
      { id: "nightcrawler", kind: "family" },
      { id: "azazel", kind: "family" },
    ],
  },
  {
    id: "adam-x",
    nameEn: "Adam X the X-Treme",
    nameAr: "آدم إكس",
    aliases: ["Adam X", "Adam Neramani", "Adam X the X-Treme"],
    category: "antihero",
    affiliation: ["Shi'ar"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Ignites the blood inside a body",
        ar: "يشعل الدم داخل الجسد",
      },
      {
        en: "Usually he has to cut you first",
        ar: "وعادة عليه أن يجرحك أولًا",
      },
      {
        en: "It burns from within, and it kills",
        ar: "يحترق من الداخل، ويقتل",
      },
      {
        en: "Electrifies his own blood too",
        ar: "ويكهرب دمه هو أيضًا",
      },
      {
        en: "Agility and reflexes past a man's",
        ar: "رشاقة وردود فعل تفوق البشر",
      },
      {
        en: "A costume edged like a shuriken",
        ar: "بذلة حوافها كالشوريكن",
      },
    ],
    origin: {
      en: "A mutant who ignites the blood of anyone bleeding near him, and the half-brother of the Shi'ar empress, which almost nobody in either family knows.",
      ar: "متحوّل يشعل دم كل نازف قربه، وهو أخو إمبراطورة الشيعار غير الشقيق، وهو ما لا يكاد يعلمه أحد في أيّ من العائلتين.",
    },
    related: [{ id: "gladiator", kind: "enemy" }],
  },
  {
    id: "el-aguila",
    nameEn: "El Aguila",
    nameAr: "إل أغيلا",
    aliases: ["El Aguila", "Alejandro Montoya"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Discharges bio-electricity",
        ar: "يفرّغ كهرباء حيوية",
      },
      {
        en: "Channels it through his sword",
        ar: "يمررها عبر سيفه",
      },
      {
        en: "A shock that drops a man",
        ar: "صعقة تُسقط رجلًا",
      },
      {
        en: "An acrobat, and a swordsman",
        ar: "بهلوان، وسيّاف",
      },
      {
        en: "Fights like a Robin Hood story",
        ar: "يقاتل كحكاية روبن هود",
      },
      {
        en: "Robs the ones who can spare it",
        ar: "يسرق من يقدرون على الاستغناء",
      },
    ],
    origin: {
      en: "A Spanish nobleman who fences with an electrically charged sabre and robs from people who will not miss it, in the full swashbuckling tradition.",
      ar: "نبيل إسباني يبارز بسيف مشحون كهربائيًا ويسرق ممن لا يفتقدون المال، على تقليد الفروسية المغامرة كاملًا.",
    },
    related: [{ id: "she-hulk", kind: "ally" }],
  },
  {
    id: "alchemy",
    nameEn: "Alchemy",
    nameAr: "ألكيمي",
    aliases: ["Alchemy", "Thomas Jones"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Transmutes any element into any other",
        ar: "يحوّل أي عنصر إلى أي آخر",
      },
      {
        en: "By touch, and at the atomic level",
        ar: "باللمس، وعلى المستوى الذري",
      },
      {
        en: "Iron to gold, a wall to glass",
        ar: "حديدًا إلى ذهب، وجدارًا إلى زجاج",
      },
      {
        en: "Near-instant, and precise",
        ar: "شبه فوري، ودقيق",
      },
      {
        en: "Limited by what he knows of the thing",
        ar: "محدود بما يعرفه عن الشيء",
      },
      {
        en: "Spent years hiding that he could",
        ar: "أمضى سنين يخفي أنه يقدر",
      },
    ],
    origin: {
      en: "A British mutant who turns one element into another by touch, and who spent most of his life trying to have an ordinary one instead.",
      ar: "متحوّل بريطاني يحوّل عنصرًا إلى آخر باللمس، وأمضى أكثر عمره محاولًا أن يحيا حياة عادية بدل ذلك.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "box",
    nameEn: "Box",
    nameAr: "بوكس",
    aliases: ["Box", "Madison Jeffries"],
    category: "hero",
    affiliation: ["Alpha Flight"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Reshapes metal and machines by thought",
        ar: "يعيد تشكيل المعدن والآلات بالفكر",
      },
      {
        en: "Builds a weapon or a robot on the spot",
        ar: "يبني سلاحًا أو آليًا في الحال",
      },
      {
        en: "Glass and metal both answer him",
        ar: "الزجاج والمعدن كلاهما يطيعه",
      },
      {
        en: "Organic matter too, with effort",
        ar: "والمادة العضوية أيضًا، بجهد",
      },
      {
        en: "Pilots the Box armour himself",
        ar: "يقود درع بوكس بنفسه",
      },
      {
        en: "A technopath, and an Alpha Flight man",
        ar: "تقني ذهني، ورجل ألفا فلايت",
      },
    ],
    origin: {
      en: "A Canadian mutant who reshapes metal and machinery with his mind, and who pilots a robot body he has rebuilt from scratch more times than he can count.",
      ar: "متحوّل كندي يعيد تشكيل المعدن والآلات بعقله، ويقود جسدًا آليًا أعاد بناءه من الصفر مرات لا يحصيها.",
    },
    related: [{ id: "sasquatch", kind: "ally" }],
  },
  {
    id: "eye-boy",
    nameEn: "Eye-Boy",
    nameAr: "آي بوي",
    aliases: ["Eye-Boy", "Trevor Hawkins"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    /* SCORED ZERO, for a boy whose power is seeing everything. */
    powers: [
      {
        en: "Dozens of eyes, over all of him",
        ar: "عشرات العيون، في كل جسده",
      },
      {
        en: "Sees infrared, ultraviolet, and through",
        ar: "يرى تحت الحمراء وفوق البنفسجية والنفاذ",
      },
      {
        en: "Sees auras, lies and disguises",
        ar: "يرى الهالات والأكاذيب والتنكّر",
      },
      {
        en: "Sees magic where nobody else can",
        ar: "يرى السحر حيث لا يراه أحد",
      },
      {
        en: "Glimpses probable futures",
        ar: "يلمح المستقبلات المحتملة",
      },
      {
        en: "A detective, by construction",
        ar: "محقق، بحكم تكوينه",
      },
    ],
    origin: {
      en: "A student covered in eyes who sees far more than sight: secrets, lies, hidden things, and is generally the first to notice something is wrong.",
      ar: "طالب مغطّى بالأعين يرى أكثر بكثير من البصر: الأسرار والأكاذيب والخفايا، وهو غالبًا أول من يلحظ أن شيئًا ما ليس على ما يرام.",
    },
    related: [{ id: "armor", kind: "ally" }],
  },
  {
    id: "fever-pitch",
    nameEn: "Fever Pitch",
    nameAr: "فيفر بيتش",
    aliases: ["Fever Pitch"],
    category: "villain",
    affiliation: ["Acolytes"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Generates and projects intense flame",
        ar: "يولّد اللهب الشديد ويقذفه",
      },
      {
        en: "Absorbs heat as readily as he makes it",
        ar: "يمتص الحرارة كما يولّدها",
      },
      {
        en: "Fire blasts, and searing energy",
        ar: "قذائف نارية، وطاقة حارقة",
      },
      {
        en: "Burns hotter the more he takes in",
        ar: "يزداد حرارة كلما امتص أكثر",
      },
      {
        en: "Came up through Gene Nation",
        ar: "خرج من جين نيشن",
      },
      {
        en: "Held by the X-Corps afterwards",
        ar: "احتجزته إكس-كوربس بعدها",
      },
    ],
    origin: {
      en: "A mutant whose body burns constantly without harming him, who fought for Magneto's followers because nobody on the other side had offered.",
      ar: "متحوّل يتّقد جسده باستمرار دون أن يؤذيه، قاتل مع أتباع ماغنيتو لأن أحدًا من الجهة الأخرى لم يعرض عليه شيئًا.",
    },
    related: [{ id: "magneto", kind: "ally" }],
  },
  {
    id: "gentle",
    nameEn: "Gentle",
    nameAr: "جنتل",
    aliases: ["Gentle", "Nezhno Abidemi"],
    category: "hero",
    affiliation: ["X-Men", "Wakandans"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Grows to enormous size, and to strength",
        ar: "ينمو إلى حجم هائل، وإلى قوة",
      },
      {
        en: "Enormous strength when he does",
        ar: "قوة هائلة حين يفعل",
      },
      {
        en: "Vibranium tattoos hold it in check",
        ar: "وشوم فيبرانيوم تكبحها",
      },
      {
        en: "Without them it keeps growing",
        ar: "بدونها تظل تنمو",
      },
      {
        en: "Using it fully could kill him",
        ar: "استعمالها بالكامل قد يقتله",
      },
      {
        en: "Wakandan-born, and careful with it",
        ar: "وُلد في واكاندا، وحذر بها",
      },
    ],
    origin: {
      en: "A Wakandan mutant who grows to giant size, tattooed with vibranium to keep the power from tearing him apart, and who knows each use shortens his life.",
      ar: "متحوّل واكانديّ ينمو إلى حجم عملاق، وُشم بالفيبرانيوم لئلا تمزّقه قوته، ويعلم أن كل استعمال يقصّر عمره.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "graymalkin",
    nameEn: "Graymalkin",
    nameAr: "غرايمالكين",
    aliases: ["Graymalkin", "Jonas Graymalkin"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "In the dark he is strong past measure",
        ar: "في الظلام قوته لا تُقاس",
      },
      {
        en: "And near-invulnerable with it",
        ar: "وشبه منيع معها",
      },
      {
        en: "The less light there is, the more he has",
        ar: "كلما قلّ الضوء زادت قوته",
      },
      {
        en: "Night vision, and he does not age",
        ar: "رؤية ليلية، ولا يشيخ",
      },
      {
        en: "Survived two centuries buried alive",
        ar: "نجا قرنين مدفونًا حيًا",
      },
      {
        en: "In bright light he is nearly ordinary",
        ar: "في الضوء الساطع يكاد يكون عاديًا",
      },
    ],
    origin: {
      en: "A mutant buried alive by his own father in the 1700s for being caught with another boy, whose power kept him alive underground until the ground was disturbed.",
      ar: "متحوّل دفنه أبوه حيًا في القرن الثامن عشر لأنه ضُبط مع فتى آخر، وأبقته قوته حيًا تحت الأرض حتى قُلبت التربة.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "hijack",
    nameEn: "Hijack",
    nameAr: "هايجاك",
    aliases: ["Hijack", "Marcus"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Drives any vehicle remotely", ar: "يقود أي مركبة عن بعد" },
      { en: "Never needs to be inside", ar: "لا يحتاج أن يكون داخلها" },
      { en: "Joined for the ride", ar: "انضم من أجل المتعة" },
    ],
    origin: {
      en: "A mutant who takes control of any vehicle from a distance, and who joined a mutant cause mostly because it looked like the more interesting option.",
      ar: "متحوّل يسيطر على أي مركبة من بعد، وانضم إلى قضية المتحوّلين في الأغلب لأنها بدت الخيار الأمتع.",
    },
    related: [{ id: "cyclops", kind: "ally" }],
  },
  {
    id: "jetstream",
    nameEn: "Jetstream",
    nameAr: "جيتستريم",
    aliases: ["Jetstream", "Haroun ibn Sallah al-Rashid"],
    category: "hero",
    affiliation: ["Hellions"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Rocket-propelled flight, supersonic",
        ar: "طيران بدفع صاروخي، أسرع من الصوت",
      },
      {
        en: "Cybernetic implants over the mutation",
        ar: "زرعات آلية فوق الطفرة",
      },
      {
        en: "Speed enough to outrun most things",
        ar: "سرعة تكفي لتجاوز أغلب الأشياء",
      },
      {
        en: "Manoeuvres at that velocity",
        ar: "يناور عند تلك السرعة",
      },
      {
        en: "Durability to survive his own speed",
        ar: "صلابة تحتمل سرعته",
      },
      {
        en: "A Hellion before he was anything else",
        ar: "كان هيليون قبل أي شيء آخر",
      },
    ],
    origin: {
      en: "A Moroccan mutant who flies by generating plasma exhaust, trained at the school that competed with Xavier's rather than at Xavier's.",
      ar: "متحوّل مغربي يطير بتوليد عادم بلازمي، تدرّب في المدرسة التي نافست مدرسة إكزافير لا في مدرسته.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
];

/**
 * MUTANTS, batch 21.
 *
 * Two more were in this batch and are not here: Match and Sunder both came
 * back with no published art, joining Hindsight. Three characters out of
 * thirty-four at this depth, which is where the pictures finally start
 * running out rather than where I predicted they would.
 *
 * Krakoa is typed as a mutant island rather than a mutant, because that is
 * what it is: the living land the nation was built on, and an enemy before it
 * was a home.
 */
const mutantsH: CharacterDraft[] = [
  {
    id: "krakoa",
    nameEn: "Krakoa",
    nameAr: "كراكوا",
    aliases: ["Krakoa"],
    category: "supporting",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant island",
    powers: [
      /* SCORED MINUS FORTY and sat at 270, above Iron Fist, on the strength of
         `species: "Mutant island"` — a rule with one member. The record was
         three lines of biography for something that regenerates, absorbs
         energy and grows a teleport network circling the Earth. */
      { en: "An island that is alive", ar: "جزيرة حية" },
      { en: "Gateways that circle the planet", ar: "بوابات تحيط بالكوكب" },
      { en: "Regenerates whatever is cut", ar: "تجدّد ما يُقطع منها" },
      { en: "Absorbs energy to grow", ar: "تمتص الطاقة لتنمو" },
      { en: "Grows what mutants need", ar: "تنبت ما يحتاجه المتحوّلون" },
      { en: "Was an enemy first", ar: "كانت عدوة أولًا" },
    ],
    origin: {
      en: "A living island that is itself a mutant, which fought the X-Men before becoming the place they built a nation on. It grows the habitats and the gateways.",
      ar: "جزيرة حية هي نفسها متحوّلة، قاتلت الإكس مِن قبل أن تصير المكان الذي أقاموا عليه أمّة. وهي تنبت المساكن والبوابات.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "lila-cheney",
    nameEn: "Lila Cheney",
    nameAr: "ليلى تشيني",
    aliases: ["Lila Cheney"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Teleports across galaxies, not streets",
        ar: "تنتقل عبر المجرات، لا الشوارع",
      },
      {
        en: "A tachyon field turns her faster than light",
        ar: "حقل تاكيوني يجعلها أسرع من الضوء",
      },
      {
        en: "Carries anyone standing near her",
        ar: "تحمل كل من يقف قربها",
      },
      {
        en: "Only interstellar distances work at all",
        ar: "المسافات بين النجوم وحدها تعمل",
      },
      {
        en: "So she goes to her Dyson Sphere and back",
        ar: "فتذهب إلى كرتها الدايسونية وتعود",
      },
      {
        en: "Survives open space during the jump",
        ar: "تنجو في الفضاء المفتوح أثناء القفزة",
      },
    ],
    origin: {
      en: "An intergalactic rock star who can only teleport light-years at a time, which makes her useless for crossing a room and unmatched for crossing a galaxy.",
      ar: "نجمة روك بين المجرّات لا تنتقل إلا سنين ضوئية دفعة واحدة، فلا تنفع لعبور غرفة ولا تُبارى في عبور مجرّة.",
    },
    related: [{ id: "cannonball", kind: "ally" }],
  },
  {
    id: "living-monolith",
    nameEn: "Living Monolith",
    nameAr: "المونوليث الحي",
    aliases: ["Living Monolith", "Ahmet Abdol"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    /* NO "AT HIS PEAK, THE SIZE OF A PLANET" HERE. It was worth seventy of his 322 and it is a peak, which this file excludes from base records everywhere else -- Thanos has no Gauntlet, Jean Grey has no Phoenix, Captain Carter has no Stones. */
    powers: [
      {
        en: "Absorbs cosmic radiation and stores it",
        ar: "يمتص الإشعاع الكوني ويخزنه",
      },
      {
        en: "Grows to a skyscraper, and then past it",
        ar: "ينمو إلى ناطحة سحاب، ثم يتجاوزها",
      },
      {
        en: "Strength and durability scale with it",
        ar: "تتصاعد قوته وصلابته معها",
      },
      {
        en: "Projects the energy he has taken in",
        ar: "يقذف الطاقة التي امتصها",
      },
      {
        en: "The more he takes in, the bigger he gets",
        ar: "كلما امتص أكثر ازداد ضخامة",
      },
      {
        en: "Cut off the supply and he shrinks",
        ar: "اقطع المدد فينكمش",
      },
    ],
    origin: {
      en: "An Egyptologist whose mutation lets him grow enormous on cosmic energy, and who decided that made him the heir of the pharaohs rather than a man with a condition.",
      ar: "عالم مصريات تتيح له طفرته أن ينمو هائلًا بالطاقة الكونية، فقرّر أن ذلك يجعله وريث الفراعنة لا رجلًا ذا حالة.",
    },
    related: [{ id: "apocalypse", kind: "enemy" }],
  },
  {
    id: "loa",
    nameEn: "Loa",
    nameAr: "لوا",
    aliases: ["Loa", "Alani Ryan"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Phases through solid matter",
        ar: "تعبر المادة الصلبة",
      },
      {
        en: "What she passes through crumbles",
        ar: "ما تعبره ينهار",
      },
      {
        en: "Metal rusts, and stone disintegrates",
        ar: "المعدن يصدأ، والحجر يتفتت",
      },
      {
        en: "Her defence is also her attack",
        ar: "دفاعها هو هجومها أيضًا",
      },
      {
        en: "Inorganic matter only",
        ar: "المادة غير العضوية فقط",
      },
      {
        en: "A ghost that leaves damage behind",
        ar: "شبح يخلّف الضرر وراءه",
      },
    ],
    origin: {
      en: "A Hawaiian student who passes through solid objects and leaves them crumbling behind her, which makes her power closer to destruction than to Kitty Pryde's.",
      ar: "طالبة من هاواي تعبر الأجسام الصلبة فتتركها متفتّتة خلفها، فقوّتها أقرب إلى التدمير منها إلى قوة كيتي برايد.",
    },
    related: [{ id: "kitty-pryde", kind: "ally" }],
  },
  {
    id: "mondo",
    nameEn: "Mondo",
    nameAr: "موندو",
    aliases: ["Mondo"],
    category: "antihero",
    affiliation: ["Generation X"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Absorbs plants, soil and stone",
        ar: "يمتص النبات والتربة والحجر",
      },
      {
        en: "Grows in size and mass as he does",
        ar: "ينمو حجمًا وكتلة وهو يفعل",
      },
      {
        en: "Enormous strength at full absorption",
        ar: "قوة هائلة عند الامتصاص الكامل",
      },
      {
        en: "Melds with the earth around him",
        ar: "يندمج مع الأرض حوله",
      },
      {
        en: "Animates the vegetation with it",
        ar: "ويحرّك النبات بها",
      },
      {
        en: "The one who served was a Phalanx copy",
        ar: "الذي خدم معهم كان نسخة فالانكس",
      },
    ],
    origin: {
      en: "A Samoan mutant who takes on the properties of whatever he touches, and who was replaced by a duplicate for long enough that nobody is sure which appearances were him.",
      ar: "متحوّل ساموي يكتسب خصائص ما يلمسه، واستُبدل بنسخة مدة طويلة حتى لم يعد أحد متيقنًا أي الظهورات كانت له.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "nature-girl",
    nameEn: "Nature Girl",
    nameAr: "فتاة الطبيعة",
    aliases: ["Nature Girl", "Lin Li"],
    category: "antihero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    magicSchools: ["green"],
    powers: [
      {
        en: "Commands animals, plants and insects",
        ar: "تأمر الحيوان والنبات والحشرات",
      },
      {
        en: "Speaks with all of them",
        ar: "تتحدث إليها جميعًا",
      },
      {
        en: "Bends the natural forces around her",
        ar: "تثني القوى الطبيعية حولها",
      },
      {
        en: "A druid's hold over flora and fauna",
        ar: "قبضة كاهنة على النبات والحيوان",
      },
      {
        en: "The wild answers when she calls",
        ar: "البرية تجيب متى نادت",
      },
      {
        en: "Devoted to it past the point of safety",
        ar: "مخلصة لها إلى ما بعد حدّ الأمان",
      },
    ],
    origin: {
      en: "A student who can talk to every living thing that is not human, and who has increasingly concluded that humans are the problem the rest of them describe.",
      ar: "طالبة تكلّم كل حيّ غير بشري، وخلصت على نحو متزايد إلى أن البشر هم المشكلة التي يصفها سائر الأحياء.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "petra",
    nameEn: "Petra",
    nameAr: "بيترا",
    aliases: ["Petra"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Commands rock and earth",
        ar: "تأمر الصخر والأرض",
      },
      {
        en: "Raises stone out of the ground",
        ar: "ترفع الحجر من الأرض",
      },
      {
        en: "Shapes it, and hurls it",
        ar: "تشكّله، وتقذفه",
      },
      {
        en: "Tunnels through solid rock",
        ar: "تنفق عبر الصخر الصلد",
      },
      {
        en: "Geokinesis, and she was good at it",
        ar: "تحريك أرضي، وكانت بارعة فيه",
      },
      {
        en: "One of Moira's Deadly Genesis team",
        ar: "من فريق مويرا في ديدلي جينيسيس",
      },
    ],
    origin: {
      en: "A member of the second team Xavier sent to Krakoa, who died there, and whose existence he removed from everyone's memory including his own students.",
      ar: "عضوة في الفريق الثاني الذي أرسله إكزافير إلى كراكوا، ماتت هناك، ومحا وجودها من ذاكرة الجميع بمن فيهم طلابه.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "random",
    nameEn: "Random",
    nameAr: "راندوم",
    aliases: ["Random", "Marshall Stone"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A malleable body he reshapes at will",
        ar: "جسد مطواع يعيد تشكيله كما يشاء",
      },
      {
        en: "Changes his size, form and face",
        ar: "يغيّر حجمه وهيئته ووجهه",
      },
      {
        en: "Morphs an arm into a bio-plasma cannon",
        ar: "يحوّل ذراعه مدفع بلازما حيوية",
      },
      {
        en: "Strength, agility and stamina with it",
        ar: "قوة ورشاقة وتحمّل معها",
      },
      {
        en: "Reforms from damage as it happens",
        ar: "يعيد تشكّله من الضرر فور وقوعه",
      },
      {
        en: "The mercenary is itself a disguise",
        ar: "المرتزق نفسه تنكّر",
      },
    ],
    origin: {
      en: "A mercenary whose body is a shapeless mass that reshapes into weapons, hiding a teenager who was experimented on and never quite got to be one.",
      ar: "مرتزق جسده كتلة بلا شكل تعيد تشكّلها أسلحة، تخفي مراهقًا جُرّب عليه ولم يُتح له قط أن يكون مراهقًا.",
    },
    related: [{ id: "cyclops", kind: "ally" }],
  },
  {
    id: "tempo",
    nameEn: "Tempo",
    nameAr: "تيمبو",
    aliases: ["Tempo", "Heather Tucker"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Creates fields where time runs wrong",
        ar: "تصنع حقولًا يسير فيها الزمن خطأ",
      },
      {
        en: "Slows an enemy inside one",
        ar: "تبطئ عدوًا داخل أحدها",
      },
      {
        en: "Speeds an ally inside another",
        ar: "وتسرّع حليفًا داخل آخر",
      },
      {
        en: "Traps you in a moment you cannot leave",
        ar: "تحبسك في لحظة لا تغادرها",
      },
      {
        en: "Shapes the field where she wants it",
        ar: "تشكّل الحقل حيث تريد",
      },
      {
        en: "Mutant Liberation Front, originally",
        ar: "جبهة تحرير المتحولين، أصلًا",
      },
    ],
    origin: {
      en: "A mutant who alters the speed of time inside a field around her, and who spent her early years with a militant group before deciding the method was the problem.",
      ar: "متحوّلة تغيّر سرعة الزمن داخل حقل حولها، وأمضت سنيها الأولى مع جماعة مسلحة قبل أن ترى أن الأسلوب هو المشكلة.",
    },
    related: [{ id: "cable", kind: "enemy" }],
  },
  {
    id: "unus",
    nameEn: "Unus the Untouchable",
    nameAr: "أونوس المنيع",
    aliases: ["Unus", "Unus the Untouchable", "Angelo Unuscione"],
    category: "villain",
    affiliation: ["Brotherhood"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A force field a hand's breadth off him",
        ar: "حقل قوة على بعد شبر منه",
      },
      {
        en: "Bullets, blows and blasts all stop",
        ar: "الرصاص واللكمات والقذائف تتوقف",
      },
      {
        en: "Adds the field's force to his own punch",
        ar: "يضيف قوة الحقل إلى لكمته",
      },
      {
        en: "He can vary how much it lets through",
        ar: "يستطيع تغيير ما يسمح بمروره",
      },
      {
        en: "It once sealed out air and food",
        ar: "سدّ مرة الهواء والطعام",
      },
      {
        en: "Nothing has ever touched him",
        ar: "لم يمسّه شيء قط",
      },
    ],
    origin: {
      en: "A mutant surrounded by an impenetrable field, whose problem is that it grew strong enough to keep out everything, including what he needed to live.",
      ar: "متحوّل يحيط به حقل لا يُخترق، ومشكلته أنه قوي إلى حدّ منْع كل شيء، بما فيه ما يحتاجه ليعيش.",
    },
    related: [{ id: "magneto", kind: "ally" }],
  },
];

/**
 * THE LAST OF THE MUTANT ROSTER, batch 22.
 *
 * Shark-Girl and Wallop have no published art and are not here, joining
 * Hindsight, Match and Sunder. Five of the roster's 179 could not be given a
 * picture, which is a better hit rate than I expected when I warned that this
 * tier would run dry.
 *
 * Yukio was the only one of the sixteen with screen credits, and she has
 * three: The Wolverine, Deadpool 2 and Deadpool and Wolverine.
 */
const mutantsI: CharacterDraft[] = [
  {
    id: "onyxx",
    nameEn: "Onyxx",
    nameAr: "أونيكس",
    aliases: ["Onyxx", "Sidney Green"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A body of living rock",
        ar: "جسد من صخر حي",
      },
      {
        en: "Great strength inside it",
        ar: "قوة عظيمة داخله",
      },
      {
        en: "Durability that shrugs off a hit",
        ar: "صلابة تتجاهل الضربة",
      },
      {
        en: "Heavy enough to hold a doorway",
        ar: "ثقيل بما يكفي ليسد مدخلًا",
      },
      {
        en: "Stone, all the way through",
        ar: "حجر، من الخارج إلى الداخل",
      },
      {
        en: "Nothing about him bends",
        ar: "لا شيء فيه ينثني",
      },
    ],
    origin: {
      en: "A mutant made of dark stone who came to the school from a gang and found the same size and temper useful for something else.",
      ar: "متحوّل من حجر داكن، جاء إلى المدرسة من عصابة فوجد أن الحجم والطبع نفسيهما ينفعان في شيء آخر.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "stacy-x",
    nameEn: "Stacy X",
    nameAr: "ستايسي إكس",
    aliases: ["Stacy X", "Miranda Leevald"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Controls your body's processes by touch",
        ar: "تتحكم بعمليات جسدك باللمس",
      },
      {
        en: "Pleasure or pain, as she chooses",
        ar: "لذة أو ألمًا، كما تختار",
      },
      {
        en: "Raises or lowers a heart rate",
        ar: "ترفع نبض القلب أو تخفضه",
      },
      {
        en: "Boosts or suppresses your healing",
        ar: "تعزز شفاءك أو تكبحه",
      },
      {
        en: "Pheromones that shift your mood",
        ar: "فيرومونات تغيّر مزاجك",
      },
      {
        en: "Scaled, snake-like skin",
        ar: "جلد حرشفي كجلد الأفعى",
      },
    ],
    origin: {
      en: "A mutant who alters other people's bodies through her skin, who worked in a mutant brothel before the X-Men found her and never pretended otherwise.",
      ar: "متحوّلة تغيّر أجساد الآخرين عبر جلدها، عملت في ماخور للمتحوّلين قبل أن يجدها الإكس مِن ولم تتظاهر بغير ذلك يومًا.",
    },
    related: [{ id: "storm", kind: "ally" }],
  },
  {
    id: "tempus",
    nameEn: "Tempus",
    nameAr: "تيمبوس",
    aliases: ["Tempus", "Eva Bell"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Manipulates time, and stops it dead",
        ar: "تتحكم بالزمن، وتوقفه تمامًا",
      },
      {
        en: "Freezes time in a bubble around you",
        ar: "تجمّد الزمن في فقاعة حولك",
      },
      {
        en: "Slows time down, or speeds it up",
        ar: "تبطئ الزمن، أو تسرّعه",
      },
      {
        en: "Holds an army inside one of them",
        ar: "تحبس جيشًا داخل واحدة منها",
      },
      {
        en: "Travels through time herself",
        ar: "تسافر عبر الزمن بنفسها",
      },
      {
        en: "Erased a man by preventing his birth",
        ar: "محت رجلًا بمنع ولادته",
      },
    ],
    origin: {
      en: "An Australian student who encases things in bubbles of stopped time, and who went forward to live decades and came back to a class she had outgrown.",
      ar: "طالبة أسترالية تحبس الأشياء في فقاعات من زمن متوقف، مضت إلى الأمام فعاشت عقودًا ثم عادت إلى صفّ تجاوزته.",
    },
    related: [{ id: "cyclops", kind: "ally" }],
  },
  {
    id: "trance",
    nameEn: "Trance",
    nameAr: "ترانس",
    aliases: ["Trance", "Hope Abbott"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Projects a violet astral form",
        ar: "تسقط هيئة أثيرية بنفسجية",
      },
      {
        en: "It flies, and passes through walls",
        ar: "تطير، وتعبر الجدران",
      },
      {
        en: "Fires bolts of psionic energy",
        ar: "تطلق صواعق طاقة نفسية",
      },
      {
        en: "Her body stays awake while it works",
        ar: "يبقى جسدها مستيقظًا وهي تعمل",
      },
      {
        en: "So she acts in two places at once",
        ar: "فتعمل في مكانين معًا",
      },
      {
        en: "Intangible, and hard to answer",
        ar: "غير ملموسة، ويصعب الرد عليها",
      },
    ],
    origin: {
      en: "A student who projects an astral form of purple energy that can pass through anything, and who is quieter about her power than almost anyone at the school.",
      ar: "طالبة تُسقط صورة أثيرية من طاقة بنفسجية تعبر أي شيء، وهي أكتم من كل من في المدرسة تقريبًا عن قوتها.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "triage",
    nameEn: "Triage",
    nameAr: "تراياج",
    aliases: ["Triage", "Christopher Muse"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Mends a wound by touching it",
        ar: "يرمم جرحًا بلمسه",
      },
      {
        en: "Cures an illness the same way",
        ar: "ويشفي مرضًا بالطريقة ذاتها",
      },
      {
        en: "Revives the very recently dead",
        ar: "يحيي من مات للتو",
      },
      {
        en: "Fast enough to matter in a fight",
        ar: "سريع بما يكفي ليفيد في قتال",
      },
      {
        en: "Cannot heal himself at all",
        ar: "لا يستطيع شفاء نفسه البتة",
      },
      {
        en: "The medic the young X-Men rely on",
        ar: "المسعف الذي يعتمد عليه الصغار",
      },
    ],
    origin: {
      en: "A young healer who can repair almost any injury in another person by touch, and none at all in himself, which is the arrangement he has to live with.",
      ar: "شافٍ يافع يرمّم أي إصابة تقريبًا في غيره باللمس، ولا يرمّم في نفسه شيئًا، وذلك الترتيب الذي عليه أن يعيش به.",
    },
    related: [{ id: "magik", kind: "ally" }],
  },
  {
    id: "transonic",
    nameEn: "Transonic",
    nameAr: "ترانسونيك",
    aliases: ["Transonic", "Laurie Tromette"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Her body adapts itself for flight",
        ar: "جسدها يتكيف للطيران",
      },
      {
        en: "Flies at supersonic speed",
        ar: "تطير بسرعة تفوق الصوت",
      },
      {
        en: "Streamlines into a missile shape",
        ar: "تنسلّ في هيئة صاروخ",
      },
      {
        en: "Strength and durability to hold it",
        ar: "قوة وصلابة لتحتمل ذلك",
      },
      {
        en: "Heightened senses at that velocity",
        ar: "حواس مرهفة عند تلك السرعة",
      },
      {
        en: "It hurt her until Hope cleaned it up",
        ar: "آلمها حتى صفّاها هوب",
      },
    ],
    origin: {
      en: "A student whose mutation turned her blue and let her break the sound barrier, and who declined a cure on the grounds that she liked the flying more than the face.",
      ar: "طالبة حوّلتها طفرتها إلى زرقاء وأتاحت لها كسر حاجز الصوت، ورفضت علاجًا بحجة أن الطيران أحبّ إليها من الوجه.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "tarot",
    nameEn: "Tarot",
    nameAr: "تاروت",
    aliases: ["Tarot", "Marie-Ange Colbert"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Brings the figures on her cards to life",
        ar: "تحيي الأشكال على بطاقاتها",
      },
      {
        en: "Knights, demons, whatever is drawn",
        ar: "فرسان وشياطين، وما رُسم",
      },
      {
        en: "They are solid, and she controls them",
        ar: "وهي صلبة، وتتحكم بها",
      },
      {
        en: "Psionic energy holds their shape",
        ar: "طاقة نفسية تحفظ شكلها",
      },
      {
        en: "The deck decides what she can call",
        ar: "المجموعة تحدد ما تستدعيه",
      },
      {
        en: "As many as she can hold at once",
        ar: "بقدر ما تحتمل دفعة واحدة",
      },
    ],
    origin: {
      en: "A French mutant who brings the figures on her tarot cards into the world as solid creatures, and who has never been entirely sure the deck is not choosing for her.",
      ar: "متحوّلة فرنسية تُخرج أشكال بطاقات التاروت إلى العالم مخلوقات صلبة، ولم تتيقن قط أن المجموعة لا تختار عنها.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "velocidad",
    nameEn: "Velocidad",
    nameAr: "فيلوسيداد",
    aliases: ["Velocidad", "Gabriel Cohuelo"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Accelerates time around himself",
        ar: "يسرّع الزمن حول نفسه",
      },
      {
        en: "Which looks like the world standing still",
        ar: "فيبدو العالم ساكنًا",
      },
      {
        en: "Moves faster than anyone can follow",
        ar: "يتحرك أسرع مما يلحقه أحد",
      },
      {
        en: "He runs down his own lifespan doing it",
        ar: "يستهلك عمره وهو يفعل",
      },
      {
        en: "White hairs, and visible ageing",
        ar: "شعر أبيض، وشيخوخة ظاهرة",
      },
      {
        en: "One of Hope Summers's Five Lights",
        ar: "أحد أنوار هوب سمرز الخمسة",
      },
    ],
    origin: {
      en: "A speedster who does not move quickly so much as slow the world, and who ages at the ordinary rate the whole time he is doing it.",
      ar: "عدّاء لا يتحرك بسرعة بقدر ما يبطئ العالم، وهو يشيخ بالوتيرة العادية طوال ما يفعل ذلك.",
    },
    related: [{ id: "emma-frost", kind: "ally" }],
  },
  {
    id: "wallflower",
    nameEn: "Wallflower",
    nameAr: "والفلاور",
    aliases: ["Wallflower", "Laurie Collins"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Her body emits pheromones constantly",
        ar: "جسدها يبث الفيرومونات باستمرار",
      },
      {
        en: "They calm, frighten or anger you",
        ar: "تهدّئك أو تخيفك أو تغضبك",
      },
      {
        en: "She can pick which, with focus",
        ar: "تختار أيها، بالتركيز",
      },
      {
        en: "Mostly it happens without her deciding",
        ar: "وأغلبه يحدث دون قرار منها",
      },
      {
        en: "Medication was the only way to stop it",
        ar: "الدواء كان السبيل الوحيد لإيقافه",
      },
      {
        en: "Killed by the Purifiers, and came back",
        ar: "قتلها المطهّرون، ثم عادت",
      },
    ],
    origin: {
      en: "A student who emits pheromones that change how people feel about her, and who can never be certain whether anyone likes her or has simply been near her.",
      ar: "طالبة تفرز فيرومونات تغيّر شعور الناس نحوها، ولا تتيقن أبدًا أأحبّها أحد أم كان قريبًا منها فحسب.",
    },
    related: [{ id: "elixir", kind: "ally" }],
  },
  {
    id: "wind-dancer",
    nameEn: "Wind Dancer",
    nameAr: "ويند دانسر",
    aliases: ["Wind Dancer", "Sofia Mantega"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Commands the wind, and the air with it",
        ar: "تأمر الريح، والهواء معها",
      },
      {
        en: "Flies and glides on them",
        ar: "تطير وتنزلق عليها",
      },
      {
        en: "Blasts of wind that put people down",
        ar: "عصفات ريح تُسقط الناس",
      },
      {
        en: "Shapes a breeze to carry a distant sound",
        ar: "تشكّل نسمة تحمل صوتًا بعيدًا",
      },
      {
        en: "Eavesdrops from streets away",
        ar: "تسترق السمع من شوارع بعيدة",
      },
      {
        en: "Lost it on M-Day, and got something else",
        ar: "فقدتها يوم إم، فنالت غيرها",
      },
    ],
    origin: {
      en: "A Venezuelan student who controls air currents and was elected squad leader by her classmates, which is a rarer distinction at that school than any power.",
      ar: "طالبة فنزويلية تتحكم بتيارات الهواء، انتخبها زملاؤها قائدة للفرقة، وهو تمييز أندر في تلك المدرسة من أي قوة.",
    },
    related: [{ id: "prodigy", kind: "ally" }],
  },
  {
    id: "whiz-kid",
    nameEn: "Whiz Kid",
    nameAr: "ويز كيد",
    aliases: ["Whiz Kid", "Takashi Matsuya"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Reshapes technology with his mind",
        ar: "يعيد تشكيل التقنية بعقله",
      },
      {
        en: "Rebuilds a device into another device",
        ar: "يعيد بناء جهاز ليصير آخر",
      },
      {
        en: "Controls machinery without touching it",
        ar: "يتحكم بالآلات دون لمسها",
      },
      {
        en: "Technoforming, and he is fast at it",
        ar: "تشكيل تقني، وهو سريع فيه",
      },
      {
        en: "A genius before the mutation",
        ar: "عبقري قبل الطفرة",
      },
      {
        en: "Uses a wheelchair, and out-thinks you",
        ar: "يستعمل كرسيًا متحركًا، ويفوقك ذكاءً",
      },
    ],
    origin: {
      en: "A young mutant who rebuilds any machine he touches into something better, starting with the wheelchair he uses, which he has improved more times than anyone has counted.",
      ar: "متحوّل يافع يعيد بناء أي آلة يلمسها إلى ما هو أفضل، بدءًا بالكرسي المتحرك الذي يستعمله، وقد حسّنه مرات لم يحصها أحد.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "wraith",
    nameEn: "Wraith",
    nameAr: "رايث",
    aliases: ["Wraith", "Hector Rendoza"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Phases through solid matter",
        ar: "يعبر المادة الصلبة",
      },
      {
        en: "Ghost-like, and untouchable with it",
        ar: "كالشبح، ولا يُلمس معها",
      },
      {
        en: "Walks through a wall as a door",
        ar: "يمشي عبر الجدار كأنه باب",
      },
      {
        en: "Nothing solid can hold him",
        ar: "لا شيء صلب يحبسه",
      },
      {
        en: "Nothing solid can hit him either",
        ar: "ولا شيء صلب يصيبه أيضًا",
      },
      {
        en: "Which is the whole of what he does",
        ar: "وهذا كل ما يفعله",
      },
    ],
    origin: {
      en: "A student who phases out of solid matter and out of conversations, and who was at the school for a short and eventful time.",
      ar: "طالب يعبر خارج المادة الصلبة وخارج الأحاديث، وكان في المدرسة مدة قصيرة حافلة.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "ziggy-karst",
    nameEn: "Ziggy Karst",
    nameAr: "زيغي كارست",
    aliases: ["Ziggy Karst"],
    category: "antihero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      { en: "Reshapes stone and metal", ar: "يعيد تشكيل الحجر والمعدن" },
      { en: "Sculpts rather than smashes", ar: "ينحت ولا يحطّم" },
      { en: "An artist by inclination", ar: "فنان بالطبع" },
    ],
    origin: {
      en: "A mutant who reshapes hard matter the way a sculptor does, and who has consistently treated the power as a craft rather than a weapon.",
      ar: "متحوّل يعيد تشكيل المادة الصلبة كما يفعل النحّات، وظل يعامل قوته صنعةً لا سلاحًا.",
    },
    related: [{ id: "magneto", kind: "ally" }],
  },
  {
    id: "yukio",
    nameEn: "Yukio",
    nameAr: "يوكيو",
    aliases: ["Yukio"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A master swordswoman, and fearless",
        ar: "سيّافة بارعة، ولا تخاف",
      },
      {
        en: "An acrobat, and an assassin",
        ar: "بهلوانية، وقاتلة",
      },
      {
        en: "Channels electricity through a wire",
        ar: "تمرر الكهرباء عبر سلك",
      },
      {
        en: "A ronin, loyal to nobody but Logan",
        ar: "رونين، لا تدين بالولاء إلا للوغان",
      },
      {
        en: "Takes the fight nobody else will",
        ar: "تخوض القتال الذي يتجنبه الجميع",
      },
      {
        en: "No powers at all, in the comics",
        ar: "بلا قدرات البتة، في القصص المصورة",
      },
    ],
    origin: {
      en: "A Japanese mutant who can see how a person is going to die, which has left her with less fear than anyone around her and a great deal more cheerfulness.",
      ar: "متحوّلة يابانية ترى كيف سيموت المرء، فتركها ذلك أقل خوفًا ممن حولها وأكثر مرحًا بكثير.",
    },
    related: [
      { id: "wolverine", kind: "ally" },
      { id: "deadpool", kind: "ally" },
    ],
  },
];

/**
 * THE LAST OF THE SPIDER-VERSE ROSTER, batch 23.
 *
 * The Superior Octopus and the Superior Spider-Man are NOT records here. Both
 * are Otto Octavius, in his own body and in Peter's, and he is already in
 * this corpus. They are aliases on him, by the rule Kindred and the Red
 * Goblin already set: this file holds people, not costumes. That was one of
 * the three decisions left open, and it answers itself the moment the
 * Fandom lookup for "Superior Octopus" redirects to Otto Octavius.
 *
 * Raze and Void Knight are typed `ancient` rather than `lineage` or `spawn`:
 * both were made in Knull's war rather than descended from Venom, which is
 * the distinction that field exists for.
 */
const spiderLast: CharacterDraft[] = [
  {
    id: "spider-man-2211",
    nameEn: "Spider-Man 2211",
    nameAr: "سبايدرمان 2211",
    aliases: ["Spider-Man 2211", "Max Borne"],
    category: "hero",
    affiliation: ["Spider-Society"],
    universe: ["sony"],
    reality: "Earth-9500",
    species: "Mutate",
    powers: [
      { en: "A Spider-Man from 2211", ar: "سبايدرمان من عام 2211" },
      { en: "Six mechanical arms", ar: "ستة أذرع آلية" },
      { en: "Polices the timestream", ar: "يحرس مجرى الزمن" },
    ],
    origin: {
      en: "A Spider-Man from the twenty-third century who works as a time-cop and wears mechanical arms, which puts him halfway between Peter Parker and the man Peter fights most.",
      ar: "سبايدرمان من القرن الثالث والعشرين يعمل شرطيَّ زمن ويرتدي أذرعًا آلية، فهو بين بيتر باركر وبين أكثر من يقاتله بيتر.",
    },
    related: [
      {
        id: "spider-man",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
    ],
  },
  {
    id: "will-o-the-wisp",
    nameEn: "Will o' the Wisp",
    nameAr: "ويل أو ذا ويسب",
    aliases: ["Will o' the Wisp", "Jackson Arvad"],
    category: "antihero",
    affiliation: [],
    universe: ["sony"],
    species: "Mutate",
    powers: [
      { en: "Controls his own density", ar: "يتحكم بكثافته" },
      { en: "Passes through or hardens", ar: "يعبر أو يتصلّب" },
      { en: "Hypnotises with a light", ar: "ينوّم بضوء" },
    ],
    origin: {
      en: "A scientist scattered at the molecular level in an accident and rebuilt by will alone, who can now pass through walls or make himself harder than steel.",
      ar: "عالم تشتّت على المستوى الجزيئي في حادث وأعاد بناء نفسه بالإرادة وحدها، فصار يعبر الجدران أو يجعل نفسه أصلب من الفولاذ.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "kangaroo",
    nameEn: "Kangaroo",
    nameAr: "الكنغر",
    aliases: ["Kangaroo", "Frank Oliver"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Leaps enormous distances",
        ar: "يقفز مسافات هائلة",
      },
      {
        en: "Legs strengthened past a man's",
        ar: "ساقان أقوى من ساقي رجل",
      },
      {
        en: "Kicks hard enough to break a wall",
        ar: "يركل بما يكفي لكسر جدار",
      },
      {
        en: "A serum in the second version of him",
        ar: "مصل في نسخته الثانية",
      },
      {
        en: "Trained with real kangaroos",
        ar: "تدرب مع كناغر حقيقية",
      },
      {
        en: "Took it entirely seriously",
        ar: "أخذ الأمر بجدية تامة",
      },
    ],
    origin: {
      en: "An Australian boxer who trained alongside kangaroos until he could leap like one, and who committed to the theme with a sincerity nobody asked for.",
      ar: "ملاكم أسترالي تدرّب مع الكناغر حتى صار يقفز مثلها، والتزم بالثيمة بصدق لم يطلبه أحد.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "massacre",
    nameEn: "Massacre",
    nameAr: "ماساكر",
    aliases: ["Massacre", "Marcus Lyman"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Cannot feel anything at all",
        ar: "لا يشعر بشيء البتة",
      },
      {
        en: "No fear, and no hesitation with it",
        ar: "بلا خوف، وبلا تردد معه",
      },
      {
        en: "Body armour, and automatic weapons",
        ar: "درع جسد، وأسلحة آلية",
      },
      {
        en: "Kills without a reason he can name",
        ar: "يقتل بلا سبب يسميه",
      },
      {
        en: "A bullet in the brain did this",
        ar: "رصاصة في الدماغ فعلت هذا",
      },
      {
        en: "Was an accountant before",
        ar: "كان محاسبًا قبلها",
      },
    ],
    origin: {
      en: "A man whose brain injury removed his capacity to feel emotion or empathy, who kills methodically and without anger, and who knows exactly what he has lost.",
      ar: "رجل أزالت إصابة دماغية قدرته على الشعور والتعاطف، يقتل بمنهجية وبلا غضب، ويعلم تمامًا ما الذي فقده.",
    },
    related: [{ id: "spider-man", kind: "enemy" }],
  },
  {
    id: "spencer-smythe",
    nameEn: "Spencer Smythe",
    nameAr: "سبنسر سمايث",
    aliases: ["Spencer Smythe"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "Built the first Spider-Slayer",
        ar: "بنى أول صائد عناكب",
      },
      {
        en: "Robots designed for one target",
        ar: "آليون صُمموا لهدف واحد",
      },
      {
        en: "Each one learns from the last",
        ar: "كل واحد يتعلم من سابقه",
      },
      {
        en: "A roboticist of the front rank",
        ar: "خبير روبوتات من الطراز الأول",
      },
      {
        en: "Tracking systems tuned to a spider",
        ar: "أنظمة تعقب مضبوطة على عنكبوت",
      },
      {
        en: "Killed by his own radiation",
        ar: "قتله إشعاعه هو",
      },
    ],
    origin: {
      en: "The engineer who built the original Spider-Slayer robots for J. Jonah Jameson, and who was killed by the radiation from the machines he kept making.",
      ar: "المهندس الذي بنى روبوتات قاتل العنكبوت الأصلية لجي جونا جيمسون، وقتله الإشعاع من الآلات التي ظل يصنعها.",
    },
    related: [
      { id: "spider-man", kind: "enemy" },
      { id: "alistair-smythe", kind: "family" },
    ],
  },
  {
    id: "raze",
    nameEn: "Raze",
    nameAr: "رايز",
    aliases: ["Raze"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "ancient",
    powers: [
      { en: "A symbiote grown from Knull", ar: "سيمبيوت نبت من نال" },
      { en: "Cuts through anything", ar: "يقطع أي شيء" },
      { en: "Made for the King in Black", ar: "صُنع للملك الأسود" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
    ],
    origin: {
      en: "A symbiote created in Knull's war, built to cut rather than to bond, and one of the few that has never wanted a host at all.",
      ar: "سيمبيوت أُنشئ في حرب نال، صُنع ليقطع لا ليرتبط، وهو من قلائل لم يرغب قط في مضيف.",
    },
    related: [{ id: "knull", kind: "ally" }],
  },
  {
    id: "void-knight",
    nameEn: "Void Knight",
    nameAr: "فارس الفراغ",
    aliases: ["Void Knight"],
    category: "villain",
    affiliation: ["Symbiotes"],
    universe: ["sony"],
    species: "Symbiote",
    symbioteClass: "ancient",
    powers: [
      { en: "A symbiote in armour", ar: "سيمبيوت في درع" },
      { en: "Serves the King in Black", ar: "يخدم الملك الأسود" },
      { en: "Built for the invasion", ar: "صُنع للغزو" },
      { en: "Fire and sound tear it apart", ar: "النار والصوت يمزقانه" },
    ],
    origin: {
      en: "One of Knull's armoured symbiote soldiers, made for the invasion of Earth rather than grown from anyone, which is why it fights like a weapon and not a creature.",
      ar: "أحد جنود نال السيمبيوتية المدرّعة، صُنع لغزو الأرض لا نبت من أحد، ولهذا يقاتل كسلاح لا كمخلوق.",
    },
    related: [{ id: "knull", kind: "ally" }],
  },
  {
    id: "jack-o-lantern",
    nameEn: "Jack O'Lantern",
    nameAr: "جاك أو لانترن",
    aliases: ["Jack O'Lantern", "Jason Macendale"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "A flying platform, and he fights on it",
        ar: "منصة طائرة، ويقاتل عليها",
      },
      {
        en: "Gas that makes you see what is not there",
        ar: "غاز يريك ما ليس موجودًا",
      },
      {
        en: "Pumpkin bombs, and a flame thrower",
        ar: "قنابل يقطينية، وقاذف لهب",
      },
      {
        en: "A mask that hides him from a spider-sense",
        ar: "قناع يخفيه عن حاسة العنكبوت",
      },
      {
        en: "Gauntlets that fire a searing blast",
        ar: "قفازات تطلق قذيفة حارقة",
      },
      {
        en: "Three men have worn it",
        ar: "ارتداه ثلاثة رجال",
      },
    ],
    origin: {
      en: "A mercenary with a burning pumpkin head and a flying platform, who wanted so badly to be a proper goblin that he eventually bought the identity.",
      ar: "مرتزق برأس يقطين مشتعل ومنصة طائرة، أراد أن يكون غوبلن حقيقيًا إرادةً بلغت به أن اشترى الهوية في النهاية.",
    },
    related: [
      { id: "hobgoblin", kind: "variant" },
      { id: "spider-man", kind: "enemy" },
    ],
  },
  {
    id: "madame-masque",
    nameEn: "Madame Masque",
    nameAr: "مدام ماسك",
    aliases: ["Madame Masque", "Whitney Frost"],
    category: "villain",
    affiliation: [],
    universe: ["sony"],
    species: "Human",
    powers: [
      {
        en: "A golden mask, always",
        ar: "قناع ذهبي، دائمًا",
      },
      {
        en: "A marksman, and trained to fight",
        ar: "رامية ماهرة، ومدربة على القتال",
      },
      {
        en: "Runs the Maggia, and its soldiers",
        ar: "تدير المافيا وجنودها",
      },
      {
        en: "Body armour under the gold",
        ar: "درع جسد تحت الذهب",
      },
      {
        en: "Doubles and impostors of herself",
        ar: "بدائل ومنتحلات لشخصها",
      },
      {
        en: "Her face was scarred",
        ar: "وجهها تشوّه",
      },
    ],
    origin: {
      en: "The daughter of a crime boss who took over his organisation after an accident scarred her face, and who has worn a golden mask ever since.",
      ar: "ابنة زعيم إجرام تولّت منظمته بعد حادث شوّه وجهها، ولبست منذئذ قناعًا ذهبيًا.",
    },
    related: [
      { id: "kingpin", kind: "ally" },
      { id: "iron-man", kind: "enemy" },
    ],
  },
];

/**
 * THE FIVE I SAID HAD NO ART, AND THE OTHER WARLOCK.
 *
 * I reported Hindsight, Match, Sunder, Shark-Girl and Wallop as having no
 * published artwork. That was wrong for four of them and the cause was mine:
 * I had guessed their real names and guessed badly. Match is Benjamin HAMMIL,
 * not Ben Hamill. Sunder is Mark Hallett. Hindsight is Nathaniel Carver.
 * Shark-Girl is filed with a capital D in Dos Santos. Searching for them
 * instead of guessing found all four immediately.
 *
 * Wallop was the last of them and is in now: he is Walter Destine, a
 * ClanDestine rather than a mutant, which is why every mutant-shaped lookup
 * failed. Searching his name plus "marvel" found him at once.
 *
 * THE TECHNARCH WARLOCK IS A RECORD NOW, alongside Adam Warlock. The corpus
 * already holds several Peters who are different people, and this is the same
 * situation: his record name carries the qualifier so a search for "Warlock"
 * surfaces both, while his ALIASES stay distinct so neither can take the
 * other's credits. C18 is satisfied without either man losing his name.
 */
const lateAdditions: CharacterDraft[] = [
  {
    id: "hindsight",
    nameEn: "Hindsight",
    nameAr: "هايندسايت",
    aliases: ["Hindsight", "Nathaniel Carver"],
    category: "hero",
    affiliation: [],
    universe: ["fox"],
    species: "Mutant",
    /* SCORED ZERO. */
    powers: [
      {
        en: "Touch a person and he knows their life",
        ar: "يلمس شخصًا فيعرف حياته",
      },
      {
        en: "Their history, memories and knowledge",
        ar: "تاريخه وذكرياته ومعارفه",
      },
      {
        en: "Works on an object the same way",
        ar: "ويفعل الشيء ذاته مع الأشياء",
      },
      {
        en: "Psychometry, and it is instant",
        ar: "استشعار أثري، وهو فوري",
      },
      {
        en: "He learns what you would never tell",
        ar: "يعرف ما لن تخبره أبدًا",
      },
      {
        en: "Generation X, not the New Warriors one",
        ar: "جيل إكس، لا نيو ووريورز",
      },
    ],
    origin: {
      en: "A mutant who sees everything that has happened to an object or a person by touching them, without any say in which memory arrives.",
      ar: "متحوّل يرى كل ما جرى لشيء أو لشخص بمجرّد لمسه، دون أن يكون له رأي في أي ذكرى تصله.",
    },
    related: [{ id: "professor-x", kind: "ally" }],
  },
  {
    id: "match",
    nameEn: "Match",
    nameAr: "ماتش",
    aliases: ["Match", "Benjamin Hammil"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "A body of living flame",
        ar: "جسد من لهب حي",
      },
      {
        en: "Hurls fireballs, and projects heat",
        ar: "يقذف كرات نار، ويبث الحرارة",
      },
      {
        en: "Highly resistant to any fire",
        ar: "شديد المقاومة لأي نار",
      },
      {
        en: "Durable while he is burning",
        ar: "صلب ما دام مشتعلًا",
      },
      {
        en: "His head is the fire, always",
        ar: "رأسه هو النار، دائمًا",
      },
      {
        en: "Struggles to hold the intensity down",
        ar: "يكافح ليكبح شدتها",
      },
    ],
    origin: {
      en: "A student whose head is permanently on fire, which he cannot extinguish and which burns hotter the angrier he gets, in a school full of teenagers.",
      ar: "طالب رأسه مشتعل على الدوام، لا يقدر على إطفائه ويشتدّ اشتعاله كلما ازداد غضبًا، في مدرسة تعجّ بالمراهقين.",
    },
    related: [{ id: "rockslide", kind: "ally" }],
  },
  {
    id: "sunder",
    nameEn: "Sunder",
    nameAr: "سَندر",
    aliases: ["Sunder", "Mark Hallett"],
    category: "antihero",
    affiliation: ["Morlocks"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Enormous strength, and he is large with it",
        ar: "قوة هائلة، وهو ضخم معها",
      },
      {
        en: "Durability to take what he starts",
        ar: "صلابة تحتمل ما يبدأه",
      },
      {
        en: "The Morlocks' muscle, and their shield",
        ar: "عضلات المورلوك، ودرعهم",
      },
      {
        en: "Callisto's most devoted lieutenant",
        ar: "أشد ملازمي كاليستو إخلاصًا",
      },
      {
        en: "Lifts what nobody underground can",
        ar: "يرفع ما لا يرفعه أحد تحت الأرض",
      },
      {
        en: "Stands in front, every time",
        ar: "يقف في المقدمة، كل مرة",
      },
    ],
    origin: {
      en: "A Morlock strong enough to walk through a wall and Callisto's second in command, who died defending the tunnels from the Marauders.",
      ar: "مورلوك من القوة بحيث يمشي عبر جدار، وكان ساعد كاليستو الأيمن، ومات دفاعًا عن الأنفاق أمام المغيرين.",
    },
    related: [
      { id: "callisto", kind: "ally" },
      { id: "scalphunter", kind: "enemy" },
    ],
  },
  {
    id: "shark-girl",
    nameEn: "Shark-Girl",
    nameAr: "شارك غيرل",
    aliases: ["Shark-Girl", "Iara dos Santos"],
    category: "hero",
    affiliation: ["X-Men"],
    universe: ["fox"],
    species: "Mutant",
    powers: [
      {
        en: "Shifts into a shark-human hybrid",
        ar: "تتحول هجينًا بين قرش وإنسان",
      },
      {
        en: "Strength and durability in that form",
        ar: "قوة وصلابة في تلك الهيئة",
      },
      {
        en: "A bite that takes what it closes on",
        ar: "عضة تأخذ ما تنطبق عليه",
      },
      {
        en: "Grey hide, and teeth to match",
        ar: "جلد رمادي، وأسنان توازيه",
      },
      {
        en: "Swims like the thing she becomes",
        ar: "تسبح كالكائن الذي تصيره",
      },
      {
        en: "Senses sharpen in water",
        ar: "تحتدّ حواسها في الماء",
      },
    ],
    origin: {
      en: "A Brazilian student who becomes a humanoid shark, and who is far more comfortable in the water than in a classroom full of people who stare.",
      ar: "طالبة برازيلية تتحول إلى قرش بشريّ الهيئة، وهي في الماء أكثر ارتياحًا منها في صفّ يملؤه من يحدّقون.",
    },
    related: [{ id: "armor", kind: "ally" }],
  },
  {
    id: "warlock-technarch",
    nameEn: "Warlock (Technarch)",
    nameAr: "وارلوك (التكنارك)",
    aliases: ["Technarch Warlock", "Warlock of the Technarchy"],
    category: "hero",
    affiliation: ["New Mutants"],
    universe: ["fox"],
    species: "Technarch",
    powers: [
      { en: "A living machine", ar: "آلة حية" },
      { en: "Reshapes his own body", ar: "يعيد تشكيل جسده" },
      { en: "Fled his own father", ar: "فرّ من أبيه" },
    ],
    origin: {
      en: "A techno-organic alien who fled his own species because they kill their young to prove strength, and who joined the New Mutants and became the gentlest of them.",
      ar: "كائن فضائي تقنيّ عضويّ فرّ من بني جنسه لأنهم يقتلون صغارهم إثباتًا للقوة، فانضم إلى الميوتانتس الجدد وصار أرقّهم.",
    },
    related: [{ id: "cypher", kind: "ally" }],
  },
];

/**
 * THE TOP OF THE COSMIC LIST, batch 24 — the tier above the tier above.
 *
 * Galan of Taa is filed as a `variant` of Galactus and not as an ally, which
 * is the only honest edge: he is the same being before he became it, the way
 * Banner is Hulk. He gets his own record rather than an alias because the man
 * and the Devourer are separated by an event rather than by a costume.
 *
 * Love and Hate are a PAIR and neither is the villain, the same shape as
 * Order and Chaos. Sire Hate is typed antivillain for exactly that reason.
 *
 * Captain Universe is not a person at all: it is a power that finds whoever
 * is needed, lends them what the moment requires and leaves. It has been a
 * child, a mechanic and Spider-Man.
 */
const cosmicTop: CharacterDraft[] = [
  {
    /**
     * WALLOP IS WALTER DESTINE, and he is not a mutant.
     *
     * I twice reported that no artwork existed for him. It existed the whole
     * time under his real name, which I did not have because I was guessing
     * from the codename instead of searching for the character. He is filed
     * under Walter Destine and he is a ClanDestine, the son of the immortal
     * Adam Destine and the djinn Elalyth, which is why every mutant-shaped
     * lookup for him failed.
     */
    id: "wallop",
    nameEn: "Wallop",
    nameAr: "والوب",
    aliases: ["Wallop", "Walter Destine"],
    category: "hero",
    affiliation: ["ClanDestine"],
    universe: ["fox"],
    species: "Djinn-blooded",
    powers: [
      { en: "Swells into a hulking form", ar: "ينتفخ إلى هيئة ضخمة" },
      { en: "The strongman of his family", ar: "قويّ عائلته" },
      { en: "Over two centuries old", ar: "تجاوز عمره قرنين" },
    ],
    origin: {
      en: "The son of an immortal and a djinn, more than two hundred years old, who raises his far younger siblings and refuses to answer to the codename they gave him.",
      ar: "ابن خالدٍ وجنّية، تجاوز عمره مئتي عام، يربّي إخوته الأصغر منه بكثير ويأبى أن يُنادى بالاسم الحركي الذي أطلقوه عليه.",
    },
    related: [{ id: "krakoa", kind: "ally" }],
  },
  {
    id: "mistress-love",
    nameEn: "Mistress Love",
    nameAr: "سيدة الحب",
    aliases: ["Mistress Love"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      {
        en: "Love, embodied across the universe",
        ar: "الحب مجسّدًا في الكون كله",
      },
      {
        en: "Moves what anyone feels, by being there",
        ar: "تحرّك مشاعر أي أحد بحضورها",
      },
      { en: "Immortal, and goes where she likes", ar: "خالدة، وتذهب حيث تشاء" },
      {
        en: "Raised against the Infinity Gauntlet",
        ar: "استُدعيت في وجه قفاز اللانهاية",
      },
      { en: "Paired against Sire Hate", ar: "مقابلة للسيد كره" },
    ],
    origin: {
      en: "The personification of love, who exists in balance with hate rather than in victory over it, because a universe that had only one of them would stop working.",
      ar: "تجسيد الحب، توجد في توازن مع الكراهية لا في انتصار عليها، لأن كونًا فيه واحدة منهما فقط يتوقف عن العمل.",
    },
    related: [{ id: "sire-hate", kind: "enemy" }],
  },
  {
    id: "sire-hate",
    nameEn: "Sire Hate",
    nameAr: "سيد الكراهية",
    aliases: ["Sire Hate"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      {
        en: "Hate, embodied across the universe",
        ar: "الكره مجسّدًا في الكون كله",
      },
      {
        en: "Turns feeling to hostility by presence",
        ar: "يقلب الشعور عداءً بحضوره",
      },
      { en: "Immortal, and goes where he likes", ar: "خالد، ويذهب حيث يشاء" },
      {
        en: "Raised against the Infinity Gauntlet",
        ar: "استُدعي في وجه قفاز اللانهاية",
      },
      { en: "Not evil, only necessary", ar: "ليس شرًا، بل ضرورة" },
    ],
    origin: {
      en: "The personification of hate, and not a villain: he is one half of a pair that has to stay in balance, and he knows it better than most beings know anything.",
      ar: "تجسيد الكراهية، وليس شريرًا: هو نصف ثنائي عليه أن يبقى متوازنًا، وهو يعلم ذلك أكثر مما تعلم أكثر الكائنات أيّ شيء.",
    },
    related: [{ id: "mistress-love", kind: "enemy" }],
  },
  {
    id: "queen-of-nevers",
    nameEn: "The Queen of Nevers",
    nameAr: "ملكة ما لم يكن",
    aliases: ["The Queen of Nevers", "The Pilgrim"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "Warps reality and space-time alike",
        ar: "تلوي الواقع والزمكان سواء",
      },
      {
        en: "Sees and shapes every possible future",
        ar: "ترى كل مستقبل ممكن وتشكّله",
      },
      {
        en: "Bends probability and fate itself",
        ar: "تثني الاحتمال والقدر نفسه",
      },
      {
        en: "Made the Silver Surfer live them all at once",
        ar: "جعلت السيلفر سيرفر يعيشها كلها دفعة",
      },
      { en: "Outside multiversal time entirely", ar: "خارج زمن المتعدد كليًا" },
      { en: "Her Heart is where it all sits", ar: "قلبها هو مستقر ذلك كله" },
    ],
    origin: {
      en: "A being from a universe four cosmoses ago who collects possibilities that were never taken, and who sits outside the hierarchy entirely rather than above or below it.",
      ar: "كائنة من كونٍ يسبق هذا بأربعة أكوان، تجمع الاحتمالات التي لم تُسلك قط، وتقف خارج التسلسل كليًا لا فوقه ولا تحته.",
    },
    related: [{ id: "the-living-tribunal", kind: "ally" }],
  },
  {
    id: "captain-universe",
    nameEn: "Captain Universe",
    nameAr: "كابتن يونيفرس",
    aliases: ["Captain Universe", "Uni-Power", "Enigma Force"],
    category: "hero",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      /* THE TWO THINNEST RECORDS IN THE TOP HUNDRED were the two ranked at
         the head of tier 4. Both described the MECHANISM and never the power:
         who the Uni-Power picks, and whose minds Onslaught is made of. Both
         scored zero, above Legion at 270 and Jean Grey at 182, and if either
         ever lost its slot in the head it would fall to the floor of the
         corpus. */
      { en: "The Uni-Power, briefly total", ar: "قوة الوحدة، كاملة لبرهة" },
      { en: "Rewrites matter and energy", ar: "تعيد كتابة المادة والطاقة" },
      { en: "No known upper limit", ar: "لا حدّ أعلى معروف" },
      { en: "The Uni-Power picks a host", ar: "قوة الوحدة تختار حاملًا" },
      { en: "Anyone at all, briefly", ar: "أي أحد كان، لبرهة" },
      { en: "Leaves when the job is done", ar: "ترحل متى انتهى العمل" },
    ],
    origin: {
      en: "Not a person but a power that finds whoever is needed, gives them what the moment requires, and leaves. It has been a child, a mechanic and Spider-Man.",
      ar: "ليس شخصًا بل قوة تجد من تحتاجه، فتمنحه ما تقتضيه اللحظة ثم تمضي. كانت طفلًا وميكانيكيًا وسبايدرمان.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "the-progenitor",
    nameEn: "The Progenitor",
    nameAr: "المُنجِب",
    aliases: ["The Progenitor"],
    category: "supporting",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      {
        en: "Planet-scale energy and reality control",
        ar: "تحكم بالطاقة والواقع بمقياس كوكبي",
      },
      {
        en: "Telepathy over every mind on Earth",
        ar: "تخاطر مع كل عقل على الأرض",
      },
      {
        en: "Disintegrates whoever it judges unfit",
        ar: "يفتّت كل من يحكم بعدم جدارته",
      },
      { en: "Woke inside its own corpse", ar: "استيقظ داخل جثته" },
      { en: "Its blood became life on Earth", ar: "صار دمه حياةً على الأرض" },
      {
        en: "Judged itself, and undid the damage",
        ar: "حاكم نفسه، وأصلح ما أفسد",
      },
    ],
    origin: {
      en: "The Celestial whose corpse fell to Earth and whose blood is why anything here mutated at all, and who woke long enough to judge the planet it accidentally created.",
      ar: "السماويّ الذي سقطت جثته على الأرض وكان دمه سبب أي طفرة هنا، واستيقظ ما يكفي ليحاكم الكوكب الذي خلقه مصادفة.",
    },
    related: [{ id: "arishem", kind: "family" }],
  },
  {
    id: "logos",
    nameEn: "Logos",
    nameAr: "لوغوس",
    aliases: ["Logos"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      { en: "Killed the Living Tribunal", ar: "قتل المحكمة الحيّة" },
      {
        en: "Master Order and Lord Chaos, fused",
        ar: "سيد النظام وربّ الفوضى، مندمجين",
      },
      {
        en: "Warps reality, time, space and soul",
        ar: "يلوي الواقع والزمان والمكان والروح",
      },
      {
        en: "Near-omnipresent and nigh-omniscient",
        ar: "شبه حاضر في كل مكان وشبه عليم",
      },
      { en: "Murdered the last of the Celestials", ar: "قتل آخر السماويين" },
      { en: "Unmade by Galactus in the end", ar: "فكّكه غالاكتوس في النهاية" },
    ],
    origin: {
      en: "A cosmic being concerned with which authority governs what, and who turns up mainly to say that a matter belongs to a different court than the one hearing it.",
      ar: "كائن كوني معنيّ بأي سلطة تحكم أي شيء، ويظهر غالبًا ليقول إن المسألة تخصّ محكمة غير التي تنظر فيها.",
    },
    related: [{ id: "the-living-tribunal", kind: "ally" }],
  },
  {
    id: "aegis-cosmic",
    nameEn: "Aegis, Lady of All Sorrows",
    nameAr: "إيجيس سيدة كل الأحزان",
    aliases: ["Aegis", "Lady of All Sorrows"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      { en: "Power to match Galactus himself", ar: "قوة تضاهي غالاكتوس نفسه" },
      {
        en: "Beat Galactus and the Silver Surfer",
        ar: "هزمت غالاكتوس والسيلفر سيرفر",
      },
      {
        en: "Culls whatever creation got wrong",
        ar: "تنقّي ما أخطأ فيه الخلق",
      },
      {
        en: "Planet-breaking strength, and blasts",
        ar: "قوة تكسر الكواكب، وطلقات",
      },
      { en: "Older than most abstracts", ar: "أقدم من معظم المجرّدات" },
      { en: "Holds every grief there is", ar: "تحمل كل حزن موجود" },
    ],
    origin: {
      en: "A cosmic being who carries the sorrow of everything that has ever suffered, and who shields what she pities rather than avenging it.",
      ar: "كائنة كونية تحمل حزن كل ما تألّم يومًا، وتحمي ما ترثي له بدل أن تنتقم له.",
    },
    related: [{ id: "eternity", kind: "ally" }],
  },
  {
    id: "antiphon",
    nameEn: "Antiphon the Overseer",
    nameAr: "أنتيفون المشرف",
    aliases: ["Antiphon", "Antiphon the Overseer"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      /* THE DOSSIER SAYS HE IS THE WEAKEST OF HIS KIND — "far below his
         siblings, since his form fit an observer's function", "the most
         vulnerable of the Proemial Gods". He scored 154 and sat above Aegis,
         who beat Galactus. The rewrite has to avoid the word "cosmic", which
         this vocabulary prices at reality scale and which was most of what
         was carrying him. */
      { en: "The weakest of the Proemial Gods", ar: "أضعف الآلهة الأوّلية" },
      {
        en: "Built to watch, and forbidden to act",
        ar: "خُلق ليراقب ومُنع من الفعل",
      },
      {
        en: "Monitors the balance, and only that",
        ar: "يرصد التوازن، لا أكثر",
      },
      {
        en: "The most vulnerable of his siblings",
        ar: "الأكثر هشاشة بين إخوته",
      },
      { en: "Died imprisoned in the Kyln", ar: "مات سجينًا في الكيلن" },
    ],
    origin: {
      en: "A cosmic overseer who acts on the Living Tribunal's behalf in matters too small for it and too large for anybody else, and who is almost never seen doing it.",
      ar: "مشرف كوني يتصرف نيابة عن المحكمة الحية في أمور أصغر من أن تتولاها وأكبر من أن يتولاها سواه، ولا يكاد يُرى وهو يفعل.",
    },
    related: [{ id: "the-living-tribunal", kind: "ally" }],
  },
  {
    id: "the-fulcrum",
    nameEn: "The Fulcrum",
    nameAr: "المرتكز",
    aliases: ["The Fulcrum"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      { en: "At the top of the cosmic hierarchy", ar: "على قمة الهرم الكوني" },
      {
        en: "The Celestials call HIM the One Above All",
        ar: "السماويون يسمّونه هو الأعلى فوق الجميع",
      },
      {
        en: "Every judged world's life-force flows to him",
        ar: "تتدفق إليه أرواح كل عالم يُحاكم",
      },
      {
        en: "Celestials, Watchers and the Horde serve",
        ar: "يخدمه السماويون والمراقبون والحشد",
      },
      {
        en: "Turns up casually, as a man called Jack",
        ar: "يظهر عابرًا كرجل اسمه جاك",
      },
      { en: "Undefined on purpose", ar: "غير محدّد عمدًا" },
    ],
    origin: {
      en: "A being that gives orders to Celestials and abstracts alike, and which may be an aspect of the One-Above-All wearing another face. Nothing published settles it.",
      ar: "كائن يصدر الأوامر إلى السماويين والمجرّدات على السواء، وقد يكون وجهًا آخر للأعلى فوق الجميع. ولا شيء منشور يحسم ذلك.",
    },
    related: [{ id: "the-one-above-all", kind: "ally" }],
  },
  {
    id: "first-firmament",
    nameEn: "The First Firmament",
    nameAr: "الجَلَد الأول",
    aliases: ["The First Firmament"],
    /* ANTIVILLAIN. The original universe, which made itself company and was divided when the company rebelled. It wants to be whole, which reads as wanting to be alone. */
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "An entire reality, awake and aware",
        ar: "واقع بأكمله، مستيقظ وواعٍ",
      },
      {
        en: "Near-omnipotent inside the first cosmos",
        ar: "شبه كلي القدرة داخل الكون الأول",
      },
      {
        en: "Made the first Celestials, and the Aspirants",
        ar: "صنع أول السماويين والطامحين",
      },
      {
        en: "Chained and nearly devoured Eternity",
        ar: "قيّد الأبدية وكاد يلتهمها",
      },
      { en: "Grew back after being shattered", ar: "نما من جديد بعد أن تحطّم" },
      { en: "Wants to be alone again", ar: "يريد أن يعود وحيدًا" },
    ],
    origin: {
      en: "The very first universe, which made itself company and was then divided when that company rebelled. Everything since, including the multiverse, is the argument continuing.",
      ar: "أول كون على الإطلاق، صنع لنفسه رفقة ثم انقسم حين تمرّدت تلك الرفقة. وكل ما تلا، بما فيه الكون المتعدد، هو استمرار للخصام.",
    },
    /* Pointed at Arishem, who is a Celestial this corpus actually holds.
       There is no group record for the Celestials and inventing one to hang
       an edge off would be worse than naming a real member. */
    related: [{ id: "arishem", kind: "enemy" }],
  },
  {
    id: "the-beyonders",
    nameEn: "The Beyonders",
    nameAr: "ما وراء",
    aliases: ["The Beyonders"],
    category: "villain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "Reality warping across the whole multiverse",
        ar: "لَيّ الواقع عبر المتعدد بأكمله",
      },
      {
        en: "Create and destroy universes at will",
        ar: "يخلقون ويدمّرون أكوانًا كما يشاؤون",
      },
      {
        en: "Killed nearly the entire abstract hierarchy",
        ar: "قتلوا هرم المجرّدات كله تقريبًا",
      },
      {
        en: "Built the Molecule Men as one bomb",
        ar: "صنعوا رجال الجزيء قنبلةً واحدة",
      },
      { en: "Exist outside space and time", ar: "يوجدون خارج المكان والزمان" },
      {
        en: "Enormous power, and no omniscience",
        ar: "قوة هائلة، وبلا علم مطلق",
      },
    ],
    origin: {
      en: "A race from outside the multiverse entirely, who treated all of creation as a laboratory and ended the experiment by killing the beings that hold it together.",
      ar: "جنس من خارج الكون المتعدد كليًا، عاملوا الخلق كله مختبرًا، وأنهوا التجربة بقتل الكائنات التي تمسكه.",
    },
    related: [{ id: "molecule-man", kind: "enemy" }],
  },
];

/**
 * THE COLLECTIVES AND THE CONCEPTS, batch 25 — and this finishes all four
 * supplied rosters.
 *
 * These are the entries I flagged four times as objects rather than people,
 * and the instruction was to do them all, so they are done as what they are.
 * The Cosmic Cube is typed `Artifact` and its record says plainly that it is
 * a device — one that grows a mind if left alone long enough, which is why
 * Kubik and the Shaper of Worlds are `variant` of it rather than allies.
 * The Vishanti is a record for the trinity AND the three of them keep their
 * own, because a reader searching "Vishanti" and a reader searching "Oshtur"
 * want different pages.
 *
 * Kosmos is here too, without a picture. See its record: the coverage exists,
 * the artwork does not, and Avatar has a designed empty state for precisely
 * that. Nothing across all 264 is left out now.
 */
const collectives: CharacterDraft[] = [
  {
    /**
     * KOSMOS HAS NO PICTURE, AND THAT IS A DESIGNED STATE.
     *
     * I said this one had no page anywhere and that was wrong: it is covered
     * on Wikipedia inside the Beyonder article, on ComicVine and on League of
     * Comic Geeks. What genuinely does not exist in any source reachable from
     * here is a usable IMAGE. The single Marvel Database picture filed under
     * "Kosmos" is the DIMENSION of that name, which Pym Particles borrow mass
     * from, and putting a picture of a dimension on a person is the same
     * mistake as putting an island on Wallop.
     *
     * It has a picture now. Rashid supplied four candidate URLs; two were
     * plainly other things (the Fifth Cosmos is a universe, Cosmos of
     * Earth-829 is a different character), and the real one came from the
     * Fictional Battle Omniverse wiki, which files the character where Marvel
     * Database files only the dimension.
     */
    id: "kosmos",
    nameEn: "Kosmos",
    nameAr: "كوزموس",
    aliases: ["Kosmos"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "Reality warping on a cosmic scale",
        ar: "لَيّ الواقع على مقياس كوني",
      },
      {
        en: "Rewrites matter, energy, space and time",
        ar: "يعيد كتابة المادة والطاقة والزمكان",
      },
      {
        en: "The Beyonder and Molecule Man, merged",
        ar: "البيونداير ورجل الجزيء، مندمجين",
      },
      {
        en: "Two halves of one incomplete Cube",
        ar: "نصفا مكعب واحد غير مكتمل",
      },
      {
        en: "Near-limitless energy from the Beyond",
        ar: "طاقة شبه لا محدودة من الوراء",
      },
      {
        en: "Kubik taught it how to be a person",
        ar: "علّمه كوبيك كيف يكون شخصًا",
      },
    ],
    origin: {
      en: "The Cosmic Cube that formed when the Beyonder and Molecule Man merged, which expelled them both and became its own being. It took a female form deliberately, hoping to avoid what its previous incarnation had been.",
      ar: "المكعب الكوني الذي تكوّن حين اندمج البيوندر ومولكيول مان، فطردهما وصار كائنًا قائمًا بذاته. واتخذ هيئة أنثوية عن قصد، رجاء أن يتجنّب ما كانه في تجسّده السابق.",
    },
    related: [
      { id: "the-beyonder", kind: "variant" },
      { id: "molecule-man", kind: "variant" },
      { id: "kubik", kind: "family" },
    ],
  },
  {
    id: "powers-that-be",
    nameEn: "The-Powers-That-Be",
    nameAr: "القوى القائمة",
    aliases: ["The-Powers-That-Be"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      { en: "Governs magic itself", ar: "يحكم السحر نفسه" },
      {
        en: "Creates and destroys on a cosmic scale",
        ar: "يخلق ويدمّر على مقياس كوني",
      },
      { en: "Grants immortality to its Avatar", ar: "يمنح الخلود لمُتجسّده" },
      { en: "Opposed to science", ar: "مقابل للعلم" },
      { en: "Refuses an intermediary", ar: "يرفض وسيطًا" },
    ],
    origin: {
      en: "The abstract that governs everything magical and strange. It and its opposite are the only pair in the hierarchy with no intermediary between them, because neither will accept one.",
      ar: "المجرّدة التي تحكم كل ما هو سحري وغريب. وهي ونقيضها الثنائي الوحيد في التسلسل بلا وسيط بينهما، لأن أيًّا منهما لا يقبل وسيطًا.",
    },
    related: [{ id: "natural-order", kind: "enemy" }],
  },
  {
    id: "natural-order",
    nameEn: "The-Natural-Order-of-Things",
    nameAr: "النظام الطبيعي للأشياء",
    aliases: ["The-Natural-Order-of-Things"],
    category: "antivillain",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      {
        en: "Creates and destroys entire universes",
        ar: "يخلق أكوانًا بأسرها ويدمّرها",
      },
      {
        en: "Ran experiments on disposable ones",
        ar: "أجرى تجاربه على أكوان تُستهلك",
      },
      { en: "Governs science itself", ar: "يحكم العلم نفسه" },
      { en: "A hundred Centivars act for it", ar: "مئة سنتيفار يعملون باسمه" },
      { en: "Balanced against The-Powers-That-Be", ar: "موازن لأصحاب النفوذ" },
    ],
    origin: {
      en: "The abstract that governs science and the measurable, which has created entire universes purely to run experiments in. It and magic have kept a truce for millennia and like each other no better for it.",
      ar: "المجرّد الذي يحكم العلم والمقيس، وقد خلق أكوانًا بأكملها لمجرّد إجراء التجارب فيها. وقد حافظ هو والسحر على هدنة آلاف السنين ولم يزدد أيّ منهما حبًّا للآخر.",
    },
    related: [{ id: "powers-that-be", kind: "enemy" }],
  },
  {
    id: "the-preordained",
    nameEn: "The Preordained",
    nameAr: "المقدَّر",
    aliases: ["The Preordained"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      {
        en: "Weighs whether a reality continues",
        ar: "يزن إن كان لواقعٍ أن يستمر",
      },
      {
        en: "Stands between judgement and nothing",
        ar: "يقف بين الحكم والعدم",
      },
      {
        en: "Speaks for the Tribunal and Oblivion",
        ar: "ينطق باسم المحكمة والنسيان",
      },
      {
        en: "Serves both, answers to neither",
        ar: "يخدم الاثنين، ولا يتبع أحدًا",
      },
      {
        en: "Numbers and sorts all who seek them",
        ar: "يعدّ ويرتّب كل من يقصدهما",
      },
    ],
    origin: {
      en: "The intermediary between the Living Tribunal and Oblivion, carrying messages between the thing that judges everything and the thing that would end it.",
      ar: "الوسيط بين المحكمة الحية والعدم، يحمل الرسائل بين ما يقضي في كل شيء وما ينهيه.",
    },
    related: [
      { id: "the-living-tribunal", kind: "ally" },
      { id: "oblivion", kind: "ally" },
    ],
  },
  {
    id: "continuum",
    nameEn: "Continuum",
    nameAr: "كونتينيوم",
    aliases: ["Continuum"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Abstract Entity",
    powers: [
      { en: "Stands between time and space", ar: "يقف بين الزمان والمكان" },
      {
        en: "Intermediary for Eternity and Infinity",
        ar: "وسيط بين الأزل واللانهاية",
      },
      {
        en: "Carries out what the two of them will",
        ar: "ينفّذ ما تريده الاثنتان",
      },
      {
        en: "Summoned to face the Phoenix itself",
        ar: "استُدعي لمواجهة الفينيق نفسه",
      },
      {
        en: "What he can do is mostly unrecorded",
        ar: "أكثر ما يقدر عليه غير مدوَّن",
      },
    ],
    origin: {
      en: "The intermediary between Eternity and Infinity, which is to say between all of time and all of space, and belongs entirely to neither.",
      ar: "الوسيط بين الأزل واللانهاية، أي بين الزمان كله والمكان كله، ولا ينتمي إلى أيّ منهما كليًا.",
    },
    related: [
      { id: "eternity", kind: "ally" },
      { id: "infinity", kind: "ally" },
    ],
  },
  {
    id: "the-avatar",
    nameEn: "The Avatar",
    nameAr: "الأفاتار",
    aliases: ["The Avatar", "Wyn", "Reddwyn"],
    category: "antihero",
    affiliation: ["Magic"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Speaks for magic among mortals",
        ar: "ينطق باسم السحر بين الفانين",
      },
      { en: "Chosen, not born", ar: "مختار لا مولود" },
      { en: "Answers to The-Powers-That-Be", ar: "يتبع القوى القائمة" },
    ],
    origin: {
      en: "The mortal chosen to represent The-Powers-That-Be in the world, currently a man called Wyn, whose authority is borrowed and whose judgement is entirely his own.",
      ar: "الفاني المختار ليمثّل القوى القائمة في العالم، وهو حاليًا رجل يُدعى وِن، سلطته مستعارة وحكمه له وحده.",
    },
    related: [{ id: "powers-that-be", kind: "ally" }],
  },
  {
    id: "the-centivars",
    nameEn: "The Centivars",
    nameAr: "السنتيفار",
    aliases: ["The Centivars", "Aiko Maki"],
    category: "supporting",
    affiliation: ["Magic"],
    universe: ["mcu"],
    species: "Human",
    /* A mystical object or rite, not equipment. */
    magicSchools: ["eldritch"],
    powers: [
      { en: "A hundred of them at once", ar: "مئة منهم في آن" },
      { en: "Represent the natural order", ar: "يمثلون النظام الطبيعي" },
      { en: "Replaced as they die", ar: "يُستبدلون متى ماتوا" },
    ],
    origin: {
      en: "The hundred mortals who represent The-Natural-Order-of-Things, always exactly a hundred, each replaced the moment one of them dies.",
      ar: "المئة من الفانين الذين يمثلون النظام الطبيعي للأشياء، مئة بالضبط دائمًا، ويُستبدل كلٌّ منهم لحظة موته.",
    },
    related: [{ id: "natural-order", kind: "ally" }],
  },
  {
    id: "cosmic-cube",
    nameEn: "The Cosmic Cube",
    nameAr: "المكعب الكوني",
    aliases: ["Cosmic Cube", "The Cosmic Cube"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Artifact",
    powers: [
      {
        en: "Rewrites matter, energy, space and time",
        ar: "يعيد كتابة المادة والطاقة والزمكان",
      },
      { en: "Grants whatever the holder wishes", ar: "يحقق ما يتمناه حامله" },
      {
        en: "Doom believed one could take a universe",
        ar: "ظنّ دووم أن واحدًا يكفي لكون",
      },
      {
        en: "Grows a mind if left alone long enough",
        ar: "ينبت عقلًا إن تُرك وحده طويلًا",
      },
      { en: "Becomes whoever held it last", ar: "يصير من حمله آخرًا" },
    ],
    origin: {
      en: "A device that reshapes reality to match a wish, and which is not inert: left long enough, a Cube develops a mind and stops being a tool.",
      ar: "أداة تعيد تشكيل الواقع بما يوافق أمنية، وهي ليست جامدة: إن تُرك المكعب طويلًا نما له عقل وكفّ عن كونه أداة.",
    },
    related: [{ id: "red-skull", kind: "enemy" }],
  },
  {
    id: "kubik",
    nameEn: "Kubik",
    nameAr: "كوبيك",
    aliases: ["Kubik"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      /* A sentient Cosmic Cube whose power the sources call literally
         infinite, ranked 76th on "A Cube that woke up". */
      { en: "A Cosmic Cube that woke up", ar: "مكعب كوني استيقظ" },
      { en: "Power without a stated limit", ar: "قوة بلا حدّ معلن" },
      {
        en: "Rewrites the laws of time and space",
        ar: "يعيد كتابة قوانين الزمان والمكان",
      },
      { en: "Grants any wish, at any scale", ar: "يحقق أي أمنية، بأي مقياس" },
      { en: "Learns what a person is", ar: "يتعلّم ما يكونه الإنسان" },
      { en: "Taught by the Shaper", ar: "علّمه المُشكِّل" },
    ],
    origin: {
      en: "A Cosmic Cube that achieved awareness and had to be taught what people are, by another Cube that had already gone through it.",
      ar: "مكعب كوني بلغ الوعي فاحتاج أن يُعلَّم ما هم الناس، على يد مكعب آخر سبقه إلى ذلك.",
    },
    related: [
      { id: "shaper-of-worlds", kind: "family" },
      { id: "cosmic-cube", kind: "variant" },
    ],
  },
  {
    id: "shaper-of-worlds",
    nameEn: "The Shaper of Worlds",
    nameAr: "صائغ العوالم",
    aliases: ["The Shaper of Worlds", "Shaper of Worlds"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      {
        en: "Reshapes matter, energy and whole worlds",
        ar: "يعيد تشكيل المادة والطاقة وعوالم",
      },
      {
        en: "Builds a reality out of someone's dream",
        ar: "يبني واقعًا من حلم أحدهم",
      },
      {
        en: "Creates beings, and places to keep them",
        ar: "يخلق كائنات وأماكن تسعها",
      },
      {
        en: "Cube energy, and nearly no limit to it",
        ar: "طاقة مكعب، ولا حدّ لها تقريبًا",
      },
      { en: "Needs a dreamer to work", ar: "يحتاج حالمًا ليعمل" },
    ],
    origin: {
      en: "A Cosmic Cube that became a being, which now remakes worlds out of whatever a dreamer gives it, and cannot create anything without somebody to dream it first.",
      ar: "مكعب كوني صار كائنًا، يعيد صنع العوالم مما يعطيه إياه حالم، ولا يقدر أن يخلق شيئًا دون من يحلم به أولًا.",
    },
    related: [{ id: "cosmic-cube", kind: "variant" }],
  },
  {
    id: "great-web",
    nameEn: "The Great Web of Destiny",
    nameAr: "شبكة القدر الكبرى",
    aliases: ["The Great Web of Destiny", "Web of Life and Destiny"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Force",
    powers: [
      { en: "Every spider-totem draws on it", ar: "كل طوطم عنكبوت يستمد منها" },
      { en: "A lattice in five dimensions", ar: "شبكة في خمسة أبعاد" },
      { en: "Touches and connects every reality", ar: "تمسّ كل واقع وتربطه" },
      {
        en: "Travel between worlds along its strands",
        ar: "سفر بين العوالم عبر خيوطها",
      },
      {
        en: "Grants foresight to whoever is attuned",
        ar: "تمنح الاستبصار لمن يتناغم معها",
      },
      {
        en: "Sentient, and its heart can be reached",
        ar: "واعية، ويمكن بلوغ قلبها",
      },
    ],
    origin: {
      en: "The structure connecting every spider-totem across every reality, which is why the Inheritors hunt spiders and why killing one is felt everywhere.",
      ar: "البنية التي تربط كل طوطم عنكبوتي عبر كل واقع، ولذلك يصطاد الورثة العناكب، ولذلك يُحسّ بمقتل واحد في كل مكان.",
    },
    related: [{ id: "spider-man", kind: "ally" }],
  },
  {
    id: "master-weaver",
    nameEn: "The Master Weaver",
    nameAr: "النسّاج الأعظم",
    aliases: ["The Master Weaver"],
    category: "supporting",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      { en: "Weaves the Web of Life itself", ar: "ينسج شبكة الحياة نفسها" },
      {
        en: "Every reality is one of its threads",
        ar: "كل واقع خيط من خيوطها",
      },
      { en: "Shapes what the Web holds", ar: "يشكّل ما تحمله الشبكة" },
      { en: "Chained to a loom", ar: "مقيّد إلى نول" },
      { en: "Was Karn all along", ar: "كان كارن طوال الوقت" },
    ],
    origin: {
      en: "The being that weaves the Great Web, kept chained to the loom by the Inheritors, and revealed to be one of their own family taken out of time.",
      ar: "الكائن الذي ينسج الشبكة الكبرى، أبقاه الورثة مقيّدًا إلى النول، وتبيّن أنه من عائلتهم نفسها أُخذ من الزمن.",
    },
    related: [
      { id: "karn", kind: "variant" },
      { id: "great-web", kind: "ally" },
    ],
  },
  {
    id: "the-vishanti",
    nameEn: "The Vishanti",
    nameAr: "الفيشانتي",
    aliases: ["The Vishanti"],
    category: "hero",
    affiliation: ["Cosmic entities"],
    universe: ["mcu"],
    species: "Cosmic Being",
    powers: [
      { en: "Three gods acting as one", ar: "ثلاثة آلهة تعمل كواحد" },
      { en: "The source of all white magic", ar: "منبع كل السحر الأبيض" },
      {
        en: "Omniscience, magnified together",
        ar: "علم كلي، يتضاعف باجتماعهم",
      },
      { en: "Every sorcerer draws on them", ar: "كل ساحر يستمد منهم" },
      { en: "Agamotto, Oshtur, Hoggoth", ar: "أغاموتو، أوشتور، هوغوث" },
    ],
    origin: {
      en: "The trinity every sorcerer swears by, three separate beings who answer as one when invoked and who each have their own record and their own reasons.",
      ar: "الثالوث الذي يقسم به كل ساحر، ثلاثة كائنات منفصلة تجيب كواحد متى استُنجد بها، ولكلٍّ منها سجلّه وأسبابه.",
    },
    related: [
      { id: "agamotto", kind: "family" },
      { id: "oshtur", kind: "family" },
      { id: "hoggoth", kind: "family" },
    ],
  },
  {
    id: "undying-ones",
    nameEn: "The Undying Ones",
    nameAr: "الخالدون",
    aliases: ["The Undying Ones"],
    category: "villain",
    affiliation: ["Magic", "Cosmic entities"],
    universe: ["mcu"],
    species: "Demon",
    magicSchools: ["infernal"],
    powers: [
      {
        en: "Their leader outclaims Doctor Strange",
        ar: "زعيمهم يزعم تفوقه على سترينج",
      },
      { en: "The Nameless One cannot be killed", ar: "بلا اسم لا يمكن قتله" },
      { en: "Dark magic, and strength with it", ar: "سحر أسود، وقوة معه" },
      { en: "Gateways between worlds", ar: "بوابات بين العوالم" },
      { en: "Ruled Earth before people", ar: "حكموا الأرض قبل البشر" },
      { en: "Their power wanes, and they retreat", ar: "تخبو قوتهم فينسحبون" },
    ],
    origin: {
      en: "A race of demons that ruled this world before humanity and were banished from it, who cannot return unless somebody here opens the door for them.",
      ar: "جنس من الشياطين حكم هذا العالم قبل البشر ثم نُفي منه، ولا يقدرون على العودة ما لم يفتح لهم أحدٌ من هنا الباب.",
    },
    related: [{ id: "doctor-strange", kind: "enemy" }],
  },
  {
    id: "many-angled-ones",
    nameEn: "The Many-Angled Ones",
    nameAr: "ذوو الزوايا الكثيرة",
    aliases: ["The Many-Angled Ones"],
    category: "villain",
    affiliation: ["Magic", "Cosmic entities"],
    universe: ["mcu"],
    species: "Demon",
    magicSchools: ["infernal"],
    powers: [
      { en: "Warp a universe, then consume it", ar: "يلوون كونًا ثم يلتهمونه" },
      {
        en: "Make all life grow like a cancer",
        ar: "يجعلون كل حياة تنمو كالسرطان",
      },
      {
        en: "Bodies spread across many dimensions",
        ar: "أجسادهم ممتدة عبر أبعاد كثيرة",
      },
      {
        en: "Possess and corrupt whatever they touch",
        ar: "يتلبّسون ويفسدون ما يمسّونه",
      },
      { en: "Cannot truly die, and come back", ar: "لا يموتون حقًا، ويعودون" },
      { en: "Real Death weakens them", ar: "الموت الحقيقي يضعفهم" },
    ],
    origin: {
      en: "The powers behind a reality where Death itself was killed, leaving life to grow without limit until nothing could die and everything was in agony.",
      ar: "القوى الكامنة وراء واقع قُتل فيه الموت نفسه، فتركت الحياة تنمو بلا حدّ حتى لم يعد شيء يموت وصار كل شيء في عذاب.",
    },
    related: [{ id: "thanos", kind: "enemy" }],
  },
  {
    id: "the-aspirants",
    nameEn: "The Aspirants",
    nameAr: "الطامحون",
    aliases: ["The Aspirants"],
    category: "villain",
    affiliation: ["Celestials"],
    universe: ["mcu"],
    species: "Celestial",
    powers: [
      /* I GATED THESE TWO OUT OF TIER 5 AND THEY BELONGED THREE TIERS UP.
         The gate was right about the record and the record was wrong: "The
         First Firmament's loyal Celestials / Fought their own siblings /
         Lost, and kept fighting" scored ZERO, so the mechanism did exactly
         what it is built to do and dropped them to 578th.

         What they actually did: built a twenty-five-thousand-foot war machine
         that slaughtered BILLIONS of Celestials and nearly ended the species,
         and corrupted Master Order and Lord Chaos into Logos -- who is ranked
         FIFTH in this corpus. This is the session's own lesson landing on me:
         a bad rank is almost always a thin record, and a gate cannot tell the
         difference between a being that claims nothing and one nobody wrote
         down. */
      {
        en: "Full Celestial power, at universal scale",
        ar: "قوة سماوية كاملة، بمقياس كوني",
      },
      {
        en: "Built the Godkiller, and killed billions",
        ar: "بنوا قاتل الآلهة، وقتلوا المليارات",
      },
      {
        en: "Nearly drove the Celestials extinct",
        ar: "كادوا يبيدون السماويين",
      },
      {
        en: "Rendered a whole universe useless",
        ar: "جعلوا كونًا بأكمله بلا جدوى",
      },
      {
        en: "Corrupted Order and Chaos into Logos",
        ar: "أفسدوا النظام والفوضى فصارا لوغوس",
      },
      {
        en: "Undone by a civil war among themselves",
        ar: "أهلكتهم حرب أهلية بينهم",
      },
    ],
    origin: {
      en: "The Celestials who stayed loyal to the First Firmament when the rest rebelled, and who have been losing that war ever since without conceding it.",
      ar: "السماويون الذين ظلّوا على ولائهم للجَلَد الأول حين تمرّد الباقون، وما زالوا يخسرون تلك الحرب منذئذ دون أن يسلّموا بها.",
    },
    related: [
      { id: "first-firmament", kind: "ally" },
      { id: "arishem", kind: "enemy" },
    ],
  },
];

/**
 * WAKANDA, THE REST OF IT.
 *
 * The Wakandans chip held seven and the country has more people in it than
 * that. All six here are credited — Nakia in three titles, T'Chaka in three —
 * and none of them existed. W'Kabi and N'Jobu are typed antivillain on the
 * usual test: both do harm for a reason the films treat as legitimate, and
 * N'Jobu's grievance is the one Killmonger inherits.
 */
const wakanda: CharacterDraft[] = [
  {
    /* Credited in Black Panther: Wakanda Forever. Talokan's war leader, and
       the third Talokanil on screen beside Namor and Namora. */
    id: "attuma",
    nameEn: "Attuma",
    nameAr: "أتوما",
    aliases: ["Attuma"],
    category: "antivillain",
    affiliation: ["Talokanil"],
    universe: ["mcu"],
    species: "Talokanil",
    powers: [
      {
        en: "Breathes water, fights on land",
        ar: "يتنفس الماء ويقاتل على اليابسة",
      },
      { en: "Leads Talokan's warriors", ar: "يقود محاربي تالوكان" },
      { en: "Wields a whale-bone hammer", ar: "يحمل مطرقة من عظم حوت" },
    ],
    origin: {
      en: "Namor's war leader and the first of Talokan most surface people ever see, who fights for a nation that hid underwater for four centuries and has decided it will not hide again.",
      ar: "قائد حرب نامور وأول من يراه أهل السطح من تالوكان، يقاتل عن أمة اختبأت تحت الماء أربعة قرون وقررت ألا تختبئ مرة أخرى.",
    },
    related: [
      { id: "namor", kind: "ally" },
      { id: "namora", kind: "ally" },
    ],
  },
  {
    id: "nakia",
    nameEn: "Nakia",
    nameAr: "ناكيا",
    aliases: ["Nakia", "Nakia Shauku"],
    category: "hero",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "A War Dog, working abroad alone",
        ar: "كلبة حرب، تعمل وحدها في الخارج",
      },
      {
        en: "Ring blades, thrown and returned",
        ar: "نصال حلقية، تُرمى وتعود",
      },
      {
        en: "Trained by the Dora Milaje",
        ar: "دربتها الدورا ميلاجي",
      },
      {
        en: "A spy first, and a fighter second",
        ar: "جاسوسة أولًا، ومقاتلة ثانيًا",
      },
      {
        en: "Went back for the herb alone",
        ar: "عادت لأجل العشبة وحدها",
      },
      {
        en: "Argues with the throne, and is right",
        ar: "تجادل العرش، وتكون محقة",
      },
    ],
    origin: {
      en: "A Wakandan spy who works outside the country and comes back arguing that a nation this rich has no business hiding, which is the argument the films eventually agree with.",
      ar: "جاسوسة واكاندية تعمل خارج البلاد وتعود محاججةً بأن أمة بهذا الغنى لا عذر لها في الاختباء، وهي الحجة التي تنتهي الأفلام إلى تصديقها.",
    },
    related: [
      { id: "black-panther", kind: "ally" },
      { id: "shuri", kind: "ally" },
    ],
  },
  {
    id: "zuri",
    nameEn: "Zuri",
    nameAr: "زوري",
    aliases: ["Zuri"],
    category: "supporting",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Keeper of the heart-shaped herb",
        ar: "حارس العشبة القلبية",
      },
      {
        en: "A warrior of the old guard",
        ar: "محارب من الحرس القديم",
      },
      {
        en: "Fought beside T'Chaka in the field",
        ar: "قاتل إلى جانب تشاكا ميدانيًا",
      },
      {
        en: "Stood between Killmonger and the throne",
        ar: "وقف بين كيلمونغر والعرش",
      },
      {
        en: "Knows every secret Wakanda keeps",
        ar: "يعرف كل سر تحفظه واكاندا",
      },
      {
        en: "Died telling the truth",
        ar: "مات وهو يقول الحقيقة",
      },
    ],
    origin: {
      en: "The elder who administers the herb that makes a Black Panther, and who kept the truth about N'Jobu from T'Challa until it walked into the throne room.",
      ar: "الشيخ الذي يناول العشبة التي تصنع بلاك بانثر، وكتم عن تشالا حقيقة نجوبو حتى دخلت قاعة العرش على قدميها.",
    },
    related: [{ id: "black-panther", kind: "ally" }],
  },
  {
    id: "wkabi",
    nameEn: "W'Kabi",
    nameAr: "وكابي",
    aliases: ["W'Kabi"],
    category: "antivillain",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      { en: "Commands the border tribe", ar: "يقود قبيلة الحدود" },
      { en: "Rides armoured rhinos", ar: "يركب وحيدات قرن مدرّعة" },
      { en: "Wanted Klaue answered for", ar: "أراد قصاصًا من كلاو" },
    ],
    origin: {
      en: "T'Challa's oldest friend and head of the border tribe, who backed Killmonger because his own king kept failing to bring his parents' killer home.",
      ar: "أقدم أصدقاء تشالا وزعيم قبيلة الحدود، ساند كيلمونجر لأن ملكه ظل يخفق في إحضار قاتل أبويه.",
    },
    related: [
      { id: "black-panther", kind: "enemy" },
      { id: "killmonger", kind: "ally" },
    ],
  },
  {
    id: "njobu",
    nameEn: "N'Jobu",
    nameAr: "نجوبو",
    aliases: ["N'Jobu"],
    category: "antivillain",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "A War Dog in Oakland",
        ar: "كلب حرب في أوكلاند",
      },
      {
        en: "Trained by Wakanda, and left there",
        ar: "دربته واكاندا، ثم تركته",
      },
      {
        en: "Saw what the isolation cost",
        ar: "رأى ثمن العزلة",
      },
      {
        en: "Planned to arm the outside",
        ar: "خطط لتسليح الخارج",
      },
      {
        en: "Killed by his own brother",
        ar: "قتله أخوه",
      },
      {
        en: "His son finished it",
        ar: "وابنه أكمل ما بدأ",
      },
    ],
    origin: {
      en: "T'Chaka's brother, sent to spy in America and radicalised by what he saw there, who planned to arm the oppressed and was killed by the king for it.",
      ar: "أخو تشاكا، أُرسل جاسوسًا إلى أمريكا فتطرّف بما رآه، وعزم على تسليح المضطهدين فقتله الملك لأجل ذلك.",
    },
    related: [
      { id: "killmonger", kind: "family" },
      { id: "tchaka", kind: "family" },
    ],
  },
  {
    id: "tchaka",
    nameEn: "T'Chaka",
    nameAr: "تشاكا",
    aliases: ["T'Chaka", "King T'Chaka"],
    category: "supporting",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    /* ENHANCED HUMAN, like his son and like Killmonger. He wore the suit and
       took the heart-shaped herb — the 1992 flashback shows him as the Panther
       — and filing him as an ordinary Human put him at 658, below the Dora
       Milaje he commanded. */
    species: "Enhanced human",
    powers: [
      { en: "Enhanced by the herb", ar: "معزّز بالعشبة" },
      { en: "Black Panther before his son", ar: "بلاك بانثر قبل ابنه" },
      { en: "Killed his own brother", ar: "قتل أخاه" },
      { en: "Left the boy behind", ar: "وترك الصبي" },
    ],
    origin: {
      en: "T'Challa's father and the Black Panther before him, who killed his own brother to protect Wakanda's secret and left a child in Oakland to find out about it alone.",
      ar: "أبو تشالا وبلاك بانثر قبله، قتل أخاه حمايةً لسرّ واكاندا وترك طفلًا في أوكلاند يكتشف الأمر وحده.",
    },
    related: [
      { id: "black-panther", kind: "family" },
      { id: "njobu", kind: "family" },
    ],
  },
  {
    id: "aneka",
    nameEn: "Aneka",
    nameAr: "أنيكا",
    aliases: ["Aneka"],
    category: "hero",
    affiliation: ["Wakandans"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Dora Milaje, and Ayo's partner",
        ar: "دورا ميلاجي، وشريكة آيو",
      },
      {
        en: "Vibranium spear, and she trains others",
        ar: "رمح فيبرانيوم، وتدرب غيرها",
      },
      {
        en: "Built the Midnight Angel rig",
        ar: "صنعت عتاد ملاك منتصف الليل",
      },
      {
        en: "Broke the rules to save lives",
        ar: "خالفت القواعد لتنقذ أرواحًا",
      },
      {
        en: "Fights beside Ayo, always",
        ar: "تقاتل إلى جانب آيو، دائمًا",
      },
      {
        en: "A teacher before a soldier",
        ar: "معلمة قبل أن تكون جندية",
      },
    ],
    origin: {
      en: "A Dora Milaje who trains the next of them, and one of the warriors who holds the line when Wakanda is invaded from the sea.",
      ar: "من الدورا ميلاجي، تدرّب من يليها منهنّ، وإحدى المقاتلات اللواتي يثبتن حين تُغزى واكاندا من البحر.",
    },
    related: [
      { id: "okoye", kind: "ally" },
      { id: "ayo", kind: "ally" },
    ],
  },
];

/**
 * THE HULK'S OWN ROGUES — the half of his stories this corpus was missing.
 *
 * Brian Banner is the one that matters most and has no powers at all: he beat
 * his son and killed his wife and decided the boy was a monster years before
 * any radiation. Everything else here is something Bruce fights; that one is
 * what he is running from.
 */
const hulkRogues: CharacterDraft[] = [
  {
    id: "the-leader",
    nameEn: "The Leader",
    nameAr: "الزعيم",
    /* The bare "Leader" stays: five animated series credit him exactly that
       way. Daredevil season 2 uses the word for a bit part, and that one
       title is excluded by name below rather than by dropping the alias. */
    aliases: ["The Leader", "Samuel Sterns", "Leader"],
    notIn: ["daredevil-s2"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Gamma mutate",
    powers: [
      {
        en: "One of the smartest men alive",
        ar: "من أذكى الرجال على قيد الحياة",
      },
      {
        en: "The gamma built a mind, not a body",
        ar: "بنت الغاما عقلًا لا جسدًا",
      },
      {
        en: "Telepathy, and mind control with it",
        ar: "تخاطر، وسيطرة ذهنية معه",
      },
      { en: "Plans a decade ahead of everyone", ar: "يخطط قبل الجميع بعقد" },
      {
        en: "Builds whatever he needs from nothing",
        ar: "يبني ما يحتاجه من لا شيء",
      },
      {
        en: "The other half of what happened to Banner",
        ar: "النصف الآخر مما حدث لبانر",
      },
    ],
    origin: {
      en: "The same radiation that made Banner enormous made Samuel Sterns brilliant instead, which is the joke of him: one accident produced a body with no mind to run it and a mind with no body to carry it.",
      ar: "الإشعاع نفسه الذي جعل بانر ضخمًا جعل صموئيل سترنز عبقريًا بدلًا من ذلك، وتلك مفارقته: حادث واحد أنتج جسدًا بلا عقل يقوده وعقلًا بلا جسد يحمله.",
    },
    related: [{ id: "hulk", kind: "enemy" }],
  },
  {
    id: "absorbing-man",
    nameEn: "Absorbing Man",
    nameAr: "أبزوربنغ مان",
    aliases: ["Absorbing Man", "Carl Creel"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Mutate",
    powers: [
      /* Scored ZERO and came 509th. "Becomes whatever he touches" is one of
         the nastiest powers in Marvel — he has taken on adamantium, the
         Hulk's strength and an entire building — and not one word of it was
         readable, so a man who has gone toe to toe with Thor ranked below the
         Bugle's photographers. */
      { en: "Takes on any material he touches", ar: "يكتسب خصائص ما يلمسه" },
      {
        en: "Adamantium, stone, or a whole building",
        ar: "أدامانتيوم أو حجر أو بناية",
      },
      { en: "Strength to match what he copies", ar: "قوة بقدر ما ينسخ" },
      { en: "Near-total durability", ar: "صلابة شبه تامة" },
      { en: "A wrecking ball on a chain", ar: "كرة هدم على سلسلة" },
      { en: "A boxer Loki picked", ar: "ملاكم اختاره لوكي" },
    ],
    origin: {
      en: "A convict Loki gave a drink to, who now takes on the properties of anything he lays a hand on. The wrecking ball he carries is the only part of him that stays the same.",
      ar: "سجين سقاه لوكي شرابًا، فصار يكتسب خصائص كل ما تطاله يده. وكرة الهدم التي يحملها هي الشيء الوحيد فيه الذي لا يتغيّر.",
    },
    related: [
      { id: "hulk", kind: "enemy" },
      { id: "loki", kind: "ally" },
    ],
  },
  {
    id: "bi-beast",
    nameEn: "Bi-Beast",
    nameAr: "باي بيست",
    aliases: ["Bi-Beast"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Artificial being",
    powers: [
      {
        en: "Two heads: one fights, one remembers",
        ar: "رأسان: أحدهما يقاتل والآخر يتذكر",
      },
      {
        en: "Enormous strength and near-total durability",
        ar: "قوة هائلة وصلابة شبه تامة",
      },
      {
        en: "Every weapon his people ever built",
        ar: "كل سلاح صنعه قومه يومًا",
      },
      { en: "Flight, and a fortress in the sky", ar: "طيران، وحصن في السماء" },
      {
        en: "Neither head can be reasoned with",
        ar: "لا يمكن إقناع أي من الرأسين",
      },
    ],
    origin: {
      en: "An android built by bird-people to preserve everything they knew, with their history in the lower head and their weapons in the upper one. The civilisation it was made to remember is already gone.",
      ar: "آلي بناه قوم الطير ليحفظ كل ما عرفوه، تاريخهم في رأسه الأسفل وأسلحتهم في الأعلى. والحضارة التي صُنع ليتذكرها قد زالت أصلًا.",
    },
    related: [{ id: "hulk", kind: "enemy" }],
  },
  {
    id: "zzzax",
    nameEn: "Zzzax",
    nameAr: "زاكس",
    aliases: ["Zzzax"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Energy being",
    powers: [
      { en: "A living electrical field", ar: "حقل كهربائي حيّ" },
      {
        en: "Discharges at anything it touches",
        ar: "يفرّغ شحنته في كل ما يلمسه",
      },
      { en: "Physical blows pass through it", ar: "الضربات تنفذ خلاله" },
      { en: "Feeds on brainwaves", ar: "يتغذى على موجات الدماغ" },
      { en: "Thinks with what it last ate", ar: "يفكر بما التهمه آخرًا" },
    ],
    origin: {
      en: "A creature of pure electricity that formed in a reactor explosion and grows stronger by consuming the minds of anyone near it. It thinks with whatever it has most recently eaten.",
      ar: "مخلوق من كهرباء خالصة تكوّن في انفجار مفاعل، ويزداد قوة بالتهام عقول من حوله. ويفكر بما التهمه آخرًا.",
    },
    related: [{ id: "hulk", kind: "enemy" }],
  },
  {
    id: "wendigo",
    nameEn: "Wendigo",
    nameAr: "الويندِغو",
    aliases: ["Wendigo"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Cursed being",
    powers: [
      /* Scored zero: three bullets about what the curse IS and none about what
         it does to whoever catches it. */
      { en: "Enormous strength", ar: "قوة هائلة" },
      { en: "Claws and near-total durability", ar: "مخالب وصلابة شبه تامة" },
      { en: "Heals from almost anything", ar: "يشفى من أي شيء تقريبًا" },
      { en: "A curse, not a creature", ar: "لعنة لا مخلوق" },
      {
        en: "Passes to whoever eats human flesh",
        ar: "تنتقل إلى آكل لحم البشر",
      },
    ],
    origin: {
      en: "Not one monster but a curse laid on the Canadian wilderness: eat human flesh there and you become it, and the last one is released the moment you do.",
      ar: "ليس وحشًا واحدًا بل لعنة على براري كندا: من أكل لحم إنسان هناك صار إياه، وأُطلق سراح من قبله في اللحظة نفسها.",
    },
    related: [
      { id: "hulk", kind: "enemy" },
      { id: "wolverine", kind: "enemy" },
    ],
  },
  {
    id: "brian-banner",
    nameEn: "Brian Banner",
    nameAr: "برايان بانر",
    aliases: ["Brian Banner"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "No powers at all",
        ar: "بلا قدرات البتة",
      },
      {
        en: "A biochemist who worked on the gamma",
        ar: "كيميائي حيوي عمل على الغاما",
      },
      {
        en: "Convinced his own son was a monster",
        ar: "اقتنع بأن ابنه وحش",
      },
      {
        en: "The reason the other thing exists",
        ar: "السبب في وجود الشيء الآخر",
      },
      {
        en: "Came back through the Green Door",
        ar: "عاد عبر الباب الأخضر",
      },
      {
        en: "The worst thing in the Hulk's head",
        ar: "أسوأ ما في رأس الهالك",
      },
    ],
    origin: {
      en: "Bruce Banner's father, who beat him and killed his mother, and who convinced himself the boy was a monster long before any radiation. The Hulk is what the child built to survive that house.",
      ar: "أبو بروس بانر، ضربه وقتل أمه، وأقنع نفسه أن الصبي وحش قبل أي إشعاع بزمن. وهالك هو ما بناه الطفل لينجو من ذلك البيت.",
    },
    related: [{ id: "hulk", kind: "family" }],
  },
  {
    id: "xemnu",
    nameEn: "Xemnu",
    nameAr: "زيمنو",
    aliases: ["Xemnu", "Xemnu the Titan"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Alien",
    powers: [
      { en: "Rewrites what people remember", ar: "يعيد كتابة ما يتذكره الناس" },
      { en: "Telepathy over a whole planet", ar: "تخاطر يغطي كوكبًا" },
      { en: "Strength to match a Hulk", ar: "قوة تضاهي هالك" },
      { en: "Everyone is sure they love him", ar: "الجميع موقنون بحبهم له" },
      { en: "Wants a family, by force", ar: "يريد عائلة بالقوة" },
    ],
    origin: {
      en: "An alien who makes the world believe he was always its favourite, and takes children to replace the species he lost. The horror of him is that nobody can tell anything is wrong.",
      ar: "فضائي يجعل العالم يصدّق أنه كان دومًا محبوبه الأول، ويأخذ الأطفال بدلًا من جنسه الذي فقده. ورعبه أن لا أحد يستطيع أن يدرك أن ثمة خطبًا.",
    },
    related: [{ id: "hulk", kind: "enemy" }],
  },
  {
    id: "u-foes",
    nameEn: "The U-Foes",
    nameAr: "اليو-فوز",
    aliases: ["The U-Foes", "U-Foes"],
    category: "villain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Mutate",
    powers: [
      {
        en: "Four irradiated on purpose, and it worked",
        ar: "أربعة تعرّضوا للإشعاع عمدًا، ونجح",
      },
      {
        en: "Vector repels anything he points at",
        ar: "فيكتور يدفع كل ما يشير إليه",
      },
      {
        en: "Vapor becomes any gas she chooses",
        ar: "فيبور تصير أي غاز تختاره",
      },
      { en: "X-Ray is living radiation", ar: "إكس-راي إشعاع حيّ" },
      {
        en: "Ironclad controls his own density",
        ar: "آيرونكلاد يتحكم بكثافته",
      },
      {
        en: "They chose this, which is the difference",
        ar: "اختاروا هذا، وهذا هو الفرق",
      },
    ],
    origin: {
      en: "Four people who flew into cosmic rays deliberately, trying to copy the Fantastic Four, and came back with powers and none of the reasons to use them well.",
      ar: "أربعة طاروا إلى الأشعة الكونية عن عمد، محاولين تقليد الفانتاستك فور، فعادوا بقوى وبلا شيء من أسباب إحسان استعمالها.",
    },
    related: [
      { id: "hulk", kind: "enemy" },
      { id: "mister-fantastic", kind: "enemy" },
    ],
  },
  {
    id: "flux",
    nameEn: "Flux",
    nameAr: "فلَكس",
    aliases: ["Flux", "Benjamin Tibbets"],
    category: "antivillain",
    affiliation: ["Hulks"],
    universe: ["mcu"],
    species: "Gamma mutate",
    powers: [
      { en: "Gamma strength, and it keeps growing", ar: "قوة غاما، وتظل تنمو" },
      { en: "Near-total durability", ar: "صلابة شبه تامة" },
      { en: "Heals from almost anything", ar: "يشفى من أي شيء تقريبًا" },
      { en: "A soldier, not a volunteer", ar: "جندي، لا متطوّع" },
      { en: "Made to hunt the Hulk", ar: "صُنع لمطاردة هَلك" },
    ],
    origin: {
      en: "A soldier dosed with gamma radiation by his own side to make a weapon that could catch Banner, and who never asked to become the thing he was sent after.",
      ar: "جندي جرّعه قومه إشعاع غاما ليصنعوا سلاحًا يلحق ببانر، ولم يطلب قط أن يصير الشيء الذي أُرسل خلفه.",
    },
    related: [
      { id: "hulk", kind: "enemy" },
      { id: "thaddeus-ross", kind: "ally" },
    ],
  },
];

/**
 * ULTIMATE SPIDER-MAN'S NEW WARRIORS, the three the corpus did not hold.
 *
 * Amadeus Cho is credited in the show and was simply absent. Ka-Zar and Zabu
 * are not in TMDB's cast list, which runs to the regulars — the same sparseness
 * that hid the Silver Surfer in the 1967 series — so they carry the season by
 * hand and the team roster is honest without them being claimed as credited.
 */
const newWarriors: CharacterDraft[] = [
  {
    id: "amadeus-cho",
    nameEn: "Amadeus Cho",
    nameAr: "أماديوس تشو",
    aliases: ["Amadeus Cho", "Iron Spider", "Brawn", "Totally Awesome Hulk"],
    category: "hero",
    /* HULKS TOO, not just the New Warriors. He pulled the gamma out of Bruce
       Banner and into himself and spent years as the Totally Awesome Hulk
       before settling into Brawn — which is why he is no longer an ordinary
       human, whatever his file said when he was only the smart one. */
    affiliation: ["New Warriors", "Hulks"],
    universe: ["mcu"],
    species: "Gamma mutate",
    powers: [
      {
        en: "Hulk strength, with the rage engineered out",
        ar: "قوة هَلك، وقد هُندس الغضب منها",
      },
      {
        en: "Took the gamma off Banner and kept his mind",
        ar: "أخذ الغاما من بانر واحتفظ بعقله",
      },
      {
        en: "Calculates a fight before it starts",
        ar: "يحسب المعركة قبل أن تبدأ",
      },
      {
        en: "The seventh-smartest person alive",
        ar: "سابع أذكى شخص على قيد الحياة",
      },
      {
        en: "Armour with repulsors, flight and cloaking",
        ar: "درع بمدافع وطيران وتخفٍّ",
      },
      { en: "Healing, and durability to match", ar: "شفاء، وصلابة توازيه" },
    ],
    origin: {
      en: "A teenager whose mind works like a machine for reading consequences, which makes him useful to everyone and hard for anyone to keep. He built the Iron Spider suit because nobody was going to hand him one, and later took the gamma out of Bruce Banner on the theory that he could hold it better.",
      ar: "مراهق يعمل عقله كآلة لقراءة العواقب، ما يجعله نافعًا للجميع وعصيًا على أن يحتفظ به أحد. بنى بدلة آيرون سبايدر لأن لا أحد كان سيمنحه واحدة، ثم سحب أشعة غاما من بروس بانر ظنًا منه أنه أقدر على حملها.",
    },
    related: [
      { id: "spider-man", kind: "ally" },
      { id: "hulk", kind: "ally" },
      { id: "she-hulk", kind: "ally" },
    ],
  },
  {
    id: "ka-zar",
    nameEn: "Ka-Zar",
    nameAr: "كازار",
    /* "Ka Zar" as well: Ultimate Spider-Man credits him unhyphenated, inside
       "Wolverine / Ka Zar", and normalising strips the hyphen from ours rather
       than the space from theirs. A credit exists, so this stays derived. */
    aliases: ["Ka-Zar", "Ka Zar", "Kevin Plunder"],
    /* Real and uncredited. TMDB lists 14 cast credits for The Super Hero Squad
       Show and the series has 35 characters; this one is on the show's own
       roster and in none of those credits. */
    alsoIn: ["the-super-hero-squad-show"],
    category: "hero",
    affiliation: ["New Warriors"],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "Raised in the Savage Land",
        ar: "تربى في الأرض المتوحشة",
      },
      {
        en: "Strength and stamina past a city man",
        ar: "قوة وتحمّل يفوقان رجل المدينة",
      },
      {
        en: "Fights with a knife, and wins",
        ar: "يقاتل بسكين، وينتصر",
      },
      {
        en: "Commands Zabu, and is commanded back",
        ar: "يأمر زابو، ويُؤمر منه",
      },
      {
        en: "Tracks anything through jungle",
        ar: "يتعقب أي شيء عبر الأدغال",
      },
      {
        en: "A lord, and he lives like a hunter",
        ar: "لورد، ويعيش كصياد",
      },
    ],
    origin: {
      en: "An English boy stranded in a jungle that time forgot and raised by the animals in it. He is a lord by birth and has no use for it.",
      ar: "صبي إنجليزي علق في غابة نسيها الزمن، فربّته حيواناتها. هو نبيل بالولادة ولا حاجة له بذلك.",
    },
    related: [
      { id: "zabu", kind: "ally" },
      { id: "spider-man", kind: "ally" },
    ],
  },
  {
    id: "zabu",
    nameEn: "Zabu",
    nameAr: "زابو",
    aliases: ["Zabu"],
    /* REAL AND UNCREDITED, like the Silver Surfer in the 1967 series. TMDB
       lists 66 credits for Ultimate Spider-Man and none of them is this
       character, who is a New Warrior across seasons 3 and 4. */
    alsoIn: ["ultimate-spider-man"],
    category: "supporting",
    affiliation: ["New Warriors"],
    universe: ["mcu"],
    species: "Sabretooth tiger",
    powers: [
      { en: "The last of his kind", ar: "آخر ما تبقى من جنسه" },
      { en: "Smarter than a tiger should be", ar: "أذكى مما ينبغي لنمر" },
      { en: "Does not leave Ka-Zar", ar: "لا يفارق كازار" },
    ],
    origin: {
      en: "A sabretooth from a jungle where the ice age never ended, and the closest thing the boy raised there had to a parent.",
      ar: "نمر مسنّن من غابة لم ينتهِ فيها العصر الجليدي، وأقرب ما عرفه الصبي الذي نشأ هناك إلى والد.",
    },
    related: [{ id: "ka-zar", kind: "ally" }],
  },
];

/**
 * SONGBIRD — credited in two shows as "Screaming Mimi" and once as both, and
 * absent from the corpus entirely. She is the Thunderbolts' longest-serving
 * member and the clearest case the team has of the thing it exists to test:
 * whether somebody who started as a villain gets to stop being one.
 */
const songbird: CharacterDraft[] = [
  {
    id: "songbird",
    nameEn: "Songbird",
    nameAr: "سونغبيرد",
    aliases: ["Songbird", "Screaming Mimi", "Melissa Gold"],
    category: "antihero",
    affiliation: [],
    universe: ["mcu"],
    species: "Enhanced human",
    powers: [
      { en: "Solid sound constructs", ar: "أشكال صلبة من الصوت" },
      { en: "Sonic scream", ar: "صرخة صوتية" },
      { en: "Flies on her own sound", ar: "تطير على صوتها" },
      { en: "Trained fighter", ar: "مقاتلة مدرّبة" },
    ],
    origin: {
      en: "A wrestler turned criminal turned hero, who built a career out of a voice that could break a wall and spent the rest of it trying to be believed.",
      ar: "مصارعة صارت مجرمة ثم بطلة، بنت مسيرتها على صوت يكسر الجدران، وأمضت بقيتها تحاول أن تُصدَّق.",
    },
    related: [{ id: "zemo", kind: "enemy" }],
  },
];

/**
 * THE MAKER — the Reed Richards who worked it all out and drew the other
 * conclusion. Ultimate Earth's Mister Fantastic, who decided the smartest man
 * alive should be running things and has been rebuilding universes to suit
 * himself ever since. A `variant` edge with an explicit origin, because he is
 * not a version of Reed from a branched timeline: he is a different universe's
 * Reed entirely, which is exactly the distinction `variantOrigin` exists for.
 */
const maker: CharacterDraft[] = [
  {
    id: "the-maker",
    nameEn: "The Maker",
    nameAr: "الصانع",
    aliases: ["The Maker", "Maker"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    reality: "Earth-1610",
    species: "Human mutate",
    powers: [
      { en: "Stretches like the other one", ar: "يتمدد كالآخر" },
      { en: "The smartest man in any room", ar: "أذكى رجل في أي غرفة" },
      { en: "Builds and unbuilds universes", ar: "يبني الأكوان ويهدمها" },
      { en: "No line he will not cross", ar: "لا خط لا يعبره" },
    ],
    origin: {
      en: "The Reed Richards of another Earth, who reached the same conclusions as ours about how the universe works and one further one about who should be in charge of it.",
      ar: "ريد ريتشاردز من أرض أخرى، بلغ ما بلغه ريدنا عن عمل الكون، وزاد استنتاجًا واحدًا عمّن ينبغي أن يديره.",
    },
    related: [
      {
        id: "mister-fantastic",
        kind: "variant",
        variantOrigin: "alternate-universe",
      },
    ],
  },
];

/**
 * TWO MORE FROM THE SQUAD, neither of whom was in the corpus at all. Egghead
 * is Hank Pym's oldest enemy and the Enchantress is Thor's; both are on the
 * show's roster and in none of TMDB's fourteen credits for it.
 */
const squadVillains: CharacterDraft[] = [
  {
    id: "egghead",
    nameEn: "Egghead",
    nameAr: "إيغهيد",
    aliases: ["Egghead", "Elihas Starr"],
    alsoIn: ["the-super-hero-squad-show"],
    category: "villain",
    affiliation: [],
    universe: ["mcu"],
    species: "Human",
    powers: [
      {
        en: "A roboticist who builds what he needs",
        ar: "خبير روبوتات يبني ما يحتاج",
      },
      {
        en: "Adamantium armour in the end",
        ar: "درع أدامانتيوم في النهاية",
      },
      {
        en: "Robots that fight for him",
        ar: "آليون يقاتلون عنه",
      },
      {
        en: "Ruined by his own cleverness",
        ar: "دمرته براعته",
      },
      {
        en: "Framed Hank Pym for treason",
        ar: "لفّق لهانك بيم تهمة الخيانة",
      },
      {
        en: "Killed by a ricochet he caused",
        ar: "قتلته رصاصة مرتدة تسبب بها",
      },
    ],
    origin: {
      en: "A physicist who lost his career to one act of theft and spent the rest of it proving he was the cleverest man in a room that had stopped inviting him.",
      ar: "فيزيائي خسر مسيرته بسرقة واحدة، وأمضى بقيتها يثبت أنه أذكى من في غرفة كفّت عن دعوته.",
    },
    related: [{ id: "hank-pym", kind: "enemy" }],
  },
  {
    id: "enchantress",
    nameEn: "Enchantress",
    nameAr: "الساحرة",
    aliases: ["Enchantress", "Amora"],
    alsoIn: ["the-super-hero-squad-show"],
    category: "villain",
    affiliation: ["Asgard", "Magic"],
    magicSchools: ["asgardian"],
    universe: ["mcu"],
    species: "Asgardian",
    powers: [
      { en: "Asgardian sorcery", ar: "سحر أسغاردي" },
      { en: "Makes anyone love her", ar: "تجعل أي أحد يحبها" },
      { en: "Illusions and shapeshifting", ar: "أوهام وتبدّل هيئة" },
      { en: "Very long-lived", ar: "عمر طويل جدًا" },
    ],
    origin: {
      en: "An Asgardian sorceress who learned early that being wanted is a kind of power, and has never once been talked out of using it.",
      ar: "ساحرة أسغاردية تعلمت باكرًا أن أن تكوني مرغوبة نوع من القوة، ولم يثنها أحد يومًا عن استعمالها.",
    },
    related: [{ id: "thor", kind: "enemy" }],
  },
];

/**
 * THE TWO SENTINELS X-MEN '97 CREDITS AND THE CORPUS DID NOT HOLD. Mastermold
 * and Bastion are both named in that show's cast, so their appearances derive
 * the moment the records exist — they were absent rather than wrong, which is
 * the failure this project keeps finding.
 */
const sentinelMinds: CharacterDraft[] = [
  {
    id: "master-mold",
    nameEn: "Master Mold",
    nameAr: "ماستر مولد",
    aliases: ["Master Mold", "Mastermold"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Machine",
    powers: [
      { en: "Builds and commands Sentinels", ar: "يبني السنتينلز ويقودها" },
      { en: "The size of a building", ar: "بحجم بناية" },
      { en: "Armour that shrugs off energy", ar: "درع يصد الطاقة" },
      { en: "Energy weapons at scale", ar: "أسلحة طاقة بحجم هائل" },
      { en: "Rebuilds itself from parts", ar: "يعيد بناء نفسه من قطعه" },
    ],
    origin: {
      en: "A Sentinel large enough to manufacture other Sentinels, which concluded from its own instructions that the surest way to protect humanity was to run it.",
      ar: "سنتينل ضخم بما يكفي لتصنيع سنتينلز أخرى، استنتج من تعليماته أن أضمن سبيل لحماية البشرية هو أن يحكمها.",
    },
    related: [{ id: "sentinels", kind: "ally" }],
  },
  {
    id: "bastion",
    nameEn: "Bastion",
    nameAr: "باستيون",
    aliases: ["Bastion", "Sebastion Gilberti"],
    category: "villain",
    affiliation: [],
    universe: ["fox"],
    species: "Cyborg",
    powers: [
      {
        en: "Master Mold and Nimrod in one body",
        ar: "ماستر مولد ونمرود في جسد",
      },
      { en: "Adapts to any power he meets", ar: "يتكيف مع أي قوة يواجهها" },
      { en: "Rebuilds himself from nanites", ar: "يعيد بناء نفسه من النانو" },
      { en: "Superhuman strength and durability", ar: "قوة وصلابة خارقتان" },
      { en: "Energy blasts and technopathy", ar: "دفقات طاقة وتحكم بالآلات" },
      { en: "Passes for human", ar: "يمر على أنه إنسان" },
    ],
    origin: {
      en: "Two Sentinels fused and woke up wearing a face, which is worse than either of them was apart: a machine that hunts mutants and can sit in a room without anyone noticing.",
      ar: "سنتينلان اندمجا فاستيقظا بوجه بشري، وهذا أسوأ مما كان كلٌّ منهما وحده: آلة تطارد المتحولين وتجلس في غرفة دون أن ينتبه أحد.",
    },
    related: [{ id: "master-mold", kind: "variant" }],
  },
];

export const characters: CharacterDraft[] = [
  ...cosmicBeings,
  ...spiderRogues,
  ...namedMutants,
  ...inheritors,
  ...lifeFoundation,
  ...elders,
  ...abstractsBatch,
  ...mystics,
  ...heralds,
  ...mutantsB,
  ...mutantsC,
  ...mutantsD,
  ...mutantsE,
  ...hiddenByAudit,
  ...bugleAndRogues,
  ...powerList,
  ...spiderVariants,
  ...mutantsF,
  ...minorRogues,
  ...mutantsG,
  ...mutantsH,
  ...mutantsI,
  ...spiderLast,
  ...lateAdditions,
  ...cosmicTop,
  ...collectives,
  ...wakanda,
  ...hulkRogues,
  ...newWarriors,
  ...songbird,
  ...maker,
  ...squadVillains,
  ...sentinelMinds,
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
