import type { z } from "zod";
import type { Bilingual } from "./schema";

/**
 * SPOILER-SAFE LINES — the one-liner shown to everyone, shield up or down.
 *
 * Separate from `titles.ts` on purpose: that file is about structure, this one
 * is about voice, and keeping them apart means the editorial pass is one file
 * to read rather than 130 objects to pick through.
 *
 * THE RULE: setup only, never outcome. Roughly trailer-level, nothing past the
 * first act. No deaths, no twists, no cameos, no post-credits, and never "sets
 * up X" — a spoiler with a friendly tone is still a spoiler. "The one where
 * half the universe dies" would fail this rule.
 *
 * No line may name another title in the corpus; `lib/validate.ts` rule B19
 * enforces that mechanically, because "leads into Endgame" is the exact failure
 * this field exists to prevent.
 *
 * Under 120 characters — the schema rejects longer, which is the structural
 * defence against a TMDB synopsis being pasted here. Aim under 80.
 *
 * ✅ REVIEWED. A fluent Arabic reader went through all 130 lines; the pass is
 * recorded in docs/AR-REVIEW.md. The finding was not errors — the drafts were
 * grammatical and spoiler-safe — but REGISTER: the English leans on nominal
 * fragments ("A thief. A soldier. A kingdom."), which is literary in English
 * and reads as translated in Arabic. 126 lines were rewritten as verbal
 * sentences, 2 kept. Section 4 of that document records the pattern, so copy
 * written later matches rather than drifting back.
 */

/**
 * Flips to `true` when a native Arabic reader has been through
 * docs/COPY-TODO.md section 1.
 *
 * Until then `/ar` still BUILDS and still renders — that is how the RTL layout
 * gets looked at — but it carries `noindex` and `scripts/check-publishable.ts`
 * fails, so it cannot be deployed as finished work. Rendering and publishing
 * are different questions.
 */
/**
 * FALSE, deliberately, and it is the gate doing its job.
 *
 * PRD v2 added 17 titles and a character corpus, and every Arabic string that
 * came with them is a non-native draft. `/ar` still renders — that is how the
 * RTL layout gets looked at — but it carries `noindex` and
 * `scripts/check-publishable.ts` fails, so it cannot ship as finished work.
 * It goes back to true after a native reader has been through the new copy.
 */
export const arReviewed = false;

type Line = z.infer<typeof Bilingual>;

export const spoilerSafe: Record<string, Line> = {
  // --- MCU: The Infinity Saga ---------------------------------------------
  "iron-man": {
    en: "A weapons manufacturer is taken hostage, and builds his way out.",
    ar: "صانع أسلحة يقع أسيرًا، فيشق طريقه إلى الحرية بما يصنعه.",
  },
  "the-incredible-hulk": {
    en: "A scientist on the run, trying to cure what he turns into.",
    ar: "عالِم هارب يحاول إيجاد علاج لما يتحول إليه.",
  },
  "iron-man-2": {
    en: "The suit made him famous. Now everyone wants one.",
    ar: "البذلة صنعت شهرته… والآن الجميع يريد مثلها.",
  },
  thor: {
    en: "An arrogant prince is stripped of his power and exiled to Earth.",
    ar: "أمير مغرور يُسلب قوته ويُنفى إلى الأرض.",
  },
  "captain-america-the-first-avenger": {
    en: "A frail volunteer takes an experimental serum in wartime.",
    ar: "متطوّع ضعيف البنية يتلقى مصلًا تجريبيًا في زمن الحرب.",
  },
  "the-avengers": {
    en: "A spy agency gathers six difficult people to stop an invasion.",
    ar: "وكالة استخبارات تجمع ستة أشخاص يصعب العمل معهم لمواجهة غزو وشيك.",
  },

  "iron-man-3": {
    en: "A terrorist with a taste for theatre, and a man who cannot sleep.",
    ar: "إرهابي يعشق الاستعراض… ورجلٌ لا يعرف النوم.",
  },
  "thor-the-dark-world": {
    en: "An ancient enemy wakes, hunting a force older than the realms.",
    ar: "عدوٌّ سحيق يستيقظ، باحثًا عن قوة أقدم من العوالم نفسها.",
  },
  "captain-america-the-winter-soldier": {
    en: "A soldier out of time, and a ghost nobody can identify.",
    ar: "جنديٌّ من زمنٍ آخر، وشبحٌ لا يعرف أحد هويته.",
  },
  "guardians-of-the-galaxy": {
    en: "A thief steals the wrong orb and lands in very bad company.",
    ar: "لصٌّ يسرق كرةً غامضة، فيجد نفسه وسط رفقة لا تُحسد عليها.",
  },
  "avengers-age-of-ultron": {
    en: "A peacekeeping programme wakes up with opinions of its own.",
    ar: "برنامجٌ صُمم لحفظ السلام يطوّر إرادةً خاصة به.",
  },
  "ant-man": {
    en: "An ex-burglar is offered a suit that makes him very small.",
    ar: "لصٌّ سابق يحصل على بذلة تمنحه قدرةً غير مألوفة على التقلص.",
  },

  "captain-america-civil-war": {
    en: "Governments want oversight. The team cannot agree who decides.",
    ar: "الحكومات تطالب بالرقابة، لكن الفريق يختلف حول من يملك القرار.",
  },
  "doctor-strange": {
    en: "A surgeon loses his hands and goes looking for a different medicine.",
    ar: "جرّاح يفقد القدرة على ممارسة مهنته، فيسلك طريقًا لم يكن يتخيله.",
  },
  "spider-man-homecoming": {
    en: "Fifteen, brilliant, and desperate to be taken seriously.",
    ar: "في الخامسة عشرة من عمره، موهوبٌ إلى حدٍّ لافت، ويتوق لأن يُؤخذ على محمل الجد.",
  },
  "guardians-of-the-galaxy-vol-2": {
    en: "A crew of misfits meets the father one of them never had.",
    ar: "مجموعةٌ من الغرباء تلتقي بالأب الذي لم يعرفه أحد أفرادها قط.",
  },
  "thor-ragnarok": {
    en: "A kingdom is promised an ending. Its prince is stuck on a junk planet.",
    ar: "مملكةٌ تقترب من نهايتها، بينما أميرها عالق على كوكبٍ للنفايات.",
  },
  "black-panther": {
    en: "A new king inherits a hidden nation and a contested throne.",
    ar: "ملكٌ جديد يرث أمةً خفية وعرشًا تتنازعه الأطماع.",
  },
  "avengers-infinity-war": {
    en: "A collector of stones comes looking for the last of them.",
    ar: "جامعٌ للأحجار يسعى للحصول على آخرها.",
  },
  "ant-man-and-the-wasp": {
    en: "House arrest, a shrinking laboratory, and a rescue long overdue.",
    ar: "إقامةٌ جبرية، ومختبرٌ يتقلص، ومهمة إنقاذ طال انتظارها.",
  },
  "captain-marvel": {
    en: "A soldier with no memory of Earth is sent back to it.",
    ar: "جندية لا تتذكر شيئًا عن الأرض، فتُرسل إليها من جديد.",
  },
  "avengers-endgame": {
    en: "A second chance is proposed, and nobody thinks it will work.",
    ar: "تلوح فرصة ثانية… لكن لا أحد يصدق أنها قد تنجح.",
  },
  "spider-man-far-from-home": {
    en: "A school trip across Europe, interrupted.",
    ar: "رحلة مدرسية عبر أوروبا، تنحرف عن مسارها.",
  },

  // --- MCU: The Multiverse Saga -------------------------------------------
  "wandavision-s1": {
    en: "A perfect suburban sitcom that keeps changing decade.",
    ar: "حياة مثالية في الضواحي، تتبدل ملامحها مع كل عقدٍ زمني.",
  },
  "the-falcon-and-the-winter-soldier-s1": {
    en: "Two men who never liked each other, handed the same job.",
    ar: "رجلان لم تجمعهما المودة يومًا، يجدان نفسيهما في المهمة نفسها.",
  },
  "loki-s1": {
    en: "A trickster is arrested by an agency that polices time.",
    ar: "مخادع يجد نفسه رهن الاعتقال لدى وكالة تحرس مجرى الزمن.",
  },
  "black-widow": {
    en: "A spy goes back to the family she was assigned, not born to.",
    ar: "جاسوسة تعود إلى العائلة التي اختيرت لها، لا التي وُلدت فيها.",
  },
  "what-if-s1": {
    en: "The same stories, with one decision turned.",
    ar: "القصص نفسها… لكن بقرار واحد تغيّر كل شيء.",
  },
  "shang-chi-and-the-legend-of-the-ten-rings": {
    en: "A valet in San Francisco is called home by a father he left.",
    ar: "عامل صفّ سيارات في سان فرانسيسكو، يستدعيه ماضٍ تركه خلفه.",
  },
  eternals: {
    en: "Immortals who have watched history without interfering. Until now.",
    ar: "خالدون راقبوا التاريخ دون أن يتدخلوا… حتى الآن.",
  },
  "hawkeye-s1": {
    en: "An archer wants to get home for Christmas. Somebody has other plans.",
    ar: "رامي سهام يريد قضاء عيد الميلاد في منزله، لكن الأمور لا تسير كما يشتهي.",
  },
  "spider-man-no-way-home": {
    en: "A spell meant to fix one problem, cast badly.",
    ar: "تعويذة لحل مشكلة واحدة… تُلقى على نحوٍ خاطئ.",
  },
  "moon-knight-s1": {
    en: "A museum gift-shop worker keeps losing days.",
    ar: "موظف في متجر هدايا بأحد المتاحف، يكتشف أن أيامًا كاملة تختفي من ذاكرته.",
  },
  "doctor-strange-in-the-multiverse-of-madness": {
    en: "A girl who falls through universes, and everyone who wants her.",
    ar: "فتاة تعبر بين الأكوان، والجميع يسعى للوصول إليها.",
  },
  "ms-marvel-s1": {
    en: "A fan in Jersey City gets what she has been writing about.",
    ar: "مراهقة تعشق الأبطال، تنال ما اعتادت أن تحلم به.",
  },
  "thor-love-and-thunder": {
    en: "A god in a slump, and someone who hunts gods.",
    ar: "إله يمر بفترة فتور، وشخص يكرّس حياته لمطاردة الآلهة.",
  },
  "the-guardians-of-the-galaxy-holiday-special": {
    en: "A crew decides to give their captain a Christmas.",
    ar: "طاقم يقرر أن يمنح قائده عيد ميلادٍ لا يُنسى.",
  },
  "i-am-groot-s1": {
    en: "Five very short stories about a very small tree.",
    ar: "خمس حكايات قصيرة جدًا عن شجرة صغيرة جدًا.",
  },
  "she-hulk-attorney-at-law-s1": {
    en: "A lawyer would quite like to keep practising law, thank you.",
    ar: "محامية لا تريد أكثر من ممارسة مهنتها… بسلام.",
  },
  "werewolf-by-night": {
    en: "Monster hunters gather at a funeral for a competition.",
    ar: "صيادو وحوش يجتمعون في جنازة، لتبدأ منافسة غير متوقعة.",
  },
  "black-panther-wakanda-forever": {
    en: "A grieving nation is tested by a kingdom under the sea.",
    ar: "أمة تنعى خسارتها، بينما يلوح تهديد من أعماق البحر.",
  },

  "ant-man-and-the-wasp-quantumania": {
    en: "A family is pulled into the world beneath atoms.",
    ar: "عائلة تنجذب إلى عالمٍ يختبئ في أعماق الذرّات.",
  },
  "guardians-of-the-galaxy-vol-3": {
    en: "The crew goes looking for the records of who made one of them.",
    ar: "ينطلق الفريق بحثًا عن ماضي أحد أفراده… ومن صنعه.",
  },
  "secret-invasion-s1": {
    en: "Shape-shifters have been here a long time, and are tired of waiting.",
    ar: "متخفّون بين البشر منذ زمن طويل، وقد نفد صبرهم.",
  },
  "i-am-groot-s2": {
    en: "More very short stories about the same very small tree.",
    ar: "مزيد من الحكايات القصيرة جدًا عن الشجرة الصغيرة نفسها.",
  },
  "loki-s2": {
    en: "The agency that polices time is having trouble with time.",
    ar: "الوكالة التي تحرس الزمن… باتت تعاني من الزمن نفسه.",
  },
  "the-marvels": {
    en: "Three heroes swap places every time they use their powers.",
    ar: "ثلاث بطلات يتبادلن أماكنهن كلما استخدمن قواهن.",
  },
  "what-if-s2": {
    en: "More decisions turned, in more directions.",
    ar: "قرارات أخرى تغيّر مجرى القصص… بطرق جديدة.",
  },
  "echo-s1": {
    en: "A woman goes back to the city and the family she ran from.",
    ar: "امرأة تعود إلى المدينة والعائلة اللتين هربت منهما.",
  },
  "deadpool-and-wolverine": {
    en: "A mercenary needs a partner, and finds a very reluctant one.",
    ar: "مرتزق يبحث عن شريك… فيجد أكثرهم ترددًا.",
  },
  "agatha-all-along-s1": {
    en: "A witch without her power, and a road that might return it.",
    ar: "ساحرة فقدت قواها، وطريق قد يعيدها إليها.",
  },
  "what-if-s3": {
    en: "The last set of turned decisions.",
    ar: "آخر مجموعة من القرارات التي غيّرت مجرى القصص.",
  },
  "your-friendly-neighborhood-spider-man": {
    en: "A high-schooler's first year with powers, in animation.",
    ar: "البدايات الأولى لطالبٍ في الثانوية مع قواه… في مسلسل رسوم متحركة.",
  },
  "captain-america-brave-new-world": {
    en: "A new shield-bearer is invited to the White House.",
    ar: "حامل الدرع الجديد يتلقى دعوة إلى البيت الأبيض.",
  },
  "daredevil-born-again-s1": {
    en: "A blind lawyer is trying very hard to stay retired.",
    ar: "محامٍ كفيف يحاول جاهدًا أن يبتعد عن حياته السابقة.",
  },
  thunderbolts: {
    en: "A government builds a team out of people it usually hides.",
    ar: "الحكومة تجمع فريقًا من أشخاص اعتادت إخفاءهم عن الأنظار.",
  },
  "ironheart-s1": {
    en: "An engineering student builds a suit in a Chicago garage.",
    ar: "طالبة هندسة تبني بذلةً متطورة داخل مرآب في شيكاغو.",
  },

  "the-fantastic-four-first-steps": {
    en: "Four explorers come back from a trip changed.",
    ar: "أربعة مستكشفين يعودون من رحلة وقد تغيّروا إلى الأبد.",
  },
  "eyes-of-wakanda-s1": {
    en: "Warriors sent across history to recover what was taken.",
    ar: "محاربون يُرسلون عبر التاريخ لاستعادة ما سُلب.",
  },
  "marvel-zombies-s1": {
    en: "A plague, and the few still standing.",
    ar: "وباء يجتاح العالم… وقلة فقط ما زالت صامدة.",
  },
  "wonder-man-s1": {
    en: "An actor auditions for a role about a hero.",
    ar: "ممثل يخوض اختبار أداء لدور بطل خارق.",
  },
  "daredevil-born-again-s2": {
    en: "The city gets worse. So does he.",
    ar: "المدينة تزداد قسوة… وهو يتغير معها.",
  },
  "the-punisher-one-last-kill": {
    en: "A man who was finished comes back for one more.",
    ar: "رجل ظن الجميع أن قصته انتهت… يعود لمهمة أخيرة.",
  },
  "spider-man-brand-new-day": {
    en: "A new chapter for a familiar mask.",
    ar: "بداية جديدة خلف قناعٍ مألوف.",
  },

  // --- Sony ----------------------------------------------------------------
  "spider-man": {
    en: "A bite at a science exhibit changes a teenager's summer.",
    ar: "لدغة في معرضٍ علمي تغيّر صيف مراهق إلى الأبد.",
  },
  "spider-man-2": {
    en: "Two years in, the double life is not working.",
    ar: "بعد عامين، لم تعد الحياة المزدوجة تحتمل.",
  },
  "spider-man-3": {
    en: "Fame suits him. Something else suits him better.",
    ar: "الشهرة تناسبه… لكن شيئًا آخر يناسبه أكثر.",
  },
  "the-amazing-spider-man": {
    en: "A teenager goes looking for what happened to his parents.",
    ar: "مراهق ينطلق بحثًا عن الحقيقة وراء اختفاء والديه.",
  },
  "the-amazing-spider-man-2": {
    en: "Graduation, a promise he made, and a company with secrets.",
    ar: "التخرج يقترب، ووعد قديم، وشركة تخفي أكثر مما تُظهر.",
  },
  "spider-man-into-the-spider-verse": {
    en: "A Brooklyn kid discovers he is not the only one.",
    ar: "فتى من بروكلين يكتشف أنه ليس الوحيد.",
  },
  "spider-man-across-the-spider-verse": {
    en: "A society of heroes with one rule he does not like.",
    ar: "مجتمع من الأبطال تحكمه قاعدة واحدة… لا تعجبه.",
  },
  "spider-noir-s1": {
    en: "A private eye in 1930s New York, in black and white.",
    ar: "محقق خاص يجوب نيويورك الثلاثينيات… بالأبيض والأسود.",
  },
  venom: {
    en: "A disgraced reporter picks up a passenger.",
    ar: "صحفي فقد سمعته يجد نفسه برفقةٍ غير مألوفة.",
  },
  "venom-let-there-be-carnage": {
    en: "An awkward flatshare, and a killer who wants an interview.",
    ar: "شريكان على مضض، وقاتل لا يريد سوى مقابلة صحفية.",
  },
  "venom-the-last-dance": {
    en: "On the run from both sides at once.",
    ar: "مطارد من جميع الجهات، ولا مكان يلجأ إليه.",
  },
  morbius: {
    en: "A biochemist tries to cure a rare blood disease. His own.",
    ar: "عالِم كيمياء حيوية يسعى لعلاج مرض دم نادر… مرضه هو.",
  },
  "madame-web": {
    en: "A paramedic starts seeing things a few seconds early.",
    ar: "مسعفة تبدأ برؤية ما سيحدث… قبل وقوعه بثوانٍ.",
  },
  "kraven-the-hunter": {
    en: "A hunter's son, and the animal that made him.",
    ar: "ابن صياد، والوحش الذي صنع منه ما هو عليه.",
  },

  // --- Fox: Fantastic Four -------------------------------------------------
  "fantastic-four-2005": {
    en: "A trip beyond orbit gives four people something they did not want.",
    ar: "رحلة إلى ما وراء الأرض تغيّر حياة أربعة أشخاص على غير إرادتهم.",
  },
  "fantastic-four-rise-of-the-silver-surfer": {
    en: "Something is circling the planet, and the wedding is on Saturday.",
    ar: "جسم غامض يطوف بالأرض، بينما يقترب موعد الزفاف.",
  },
  "fantastic-four-2015": {
    en: "Four young scientists build a way to somewhere else.",
    ar: "أربعة علماء شباب يفتحون طريقًا إلى عالم آخر.",
  },

  // --- The Defenders Saga --------------------------------------------------
  "daredevil-s1": {
    en: "A blind lawyer by day, and something else after dark.",
    ar: "محامٍ كفيف نهارًا… وشخص آخر بعد حلول الظلام.",
  },
  "jessica-jones-s1": {
    en: "A private investigator who would rather be left alone.",
    ar: "محققة خاصة تفضّل أن يتركها الجميع وشأنها.",
  },
  "daredevil-s2": {
    en: "Someone else is cleaning up the neighbourhood, with guns.",
    ar: "شخص آخر يفرض العدالة بطريقته… وبالسلاح.",
  },
  "luke-cage-s1": {
    en: "A man with unbreakable skin, sweeping floors in Harlem.",
    ar: "رجل لا يخترق جلده شيء، يعمل في كنس الأرضيات بحي هارلم.",
  },
  "iron-fist-s1": {
    en: "A missing heir walks back into the city barefoot.",
    ar: "وريث مفقود يعود إلى المدينة… حافي القدمين.",
  },
  "the-defenders-s1": {
    en: "Four people who work alone, in the same building.",
    ar: "أربعة أشخاص اعتادوا العمل بمفردهم… يجمعهم المكان نفسه.",
  },
  "the-punisher-s1": {
    en: "A veteran who would rather be left for dead.",
    ar: "جندي سابق يفضّل أن يظنه الجميع في عداد الموتى.",
  },
  "jessica-jones-s2": {
    en: "Looking into the accident that made her.",
    ar: "تعود إلى الحادث الذي غيّر حياتها.",
  },
  "luke-cage-s2": {
    en: "Harlem has a new owner, and he is charming.",
    ar: "لهارلم صاحب نفوذ جديد… ويجيد كسب القلوب.",
  },
  "iron-fist-s2": {
    en: "Two brothers, one city, and a title neither will drop.",
    ar: "أخوان، مدينة واحدة، ولقب لا ينوي أيٌّ منهما التخلي عنه.",
  },
  "daredevil-s3": {
    en: "Back at the bottom, and an old enemy walks free.",
    ar: "عاد إلى نقطة الصفر… بينما ينعم عدو قديم بحريته.",
  },
  "the-punisher-s2": {
    en: "A roadside diner, a girl in trouble, and a very short peace.",
    ar: "مطعم على الطريق، وفتاة في مأزق، وهدوء لا يدوم طويلًا.",
  },
  "jessica-jones-s3": {
    en: "A man who kills quietly, and a case that will not close.",
    ar: "رجل يقتل بصمت… وقضية ترفض أن تُغلق.",
  },

  // --- Fox: X-Men ----------------------------------------------------------
  "x-men-first-class": {
    en: "Two friends build a school and a war at the same time.",
    ar: "صديقان يؤسسان مدرسة… ويجدان نفسيهما على طرفي حرب.",
  },
  "x-men-origins-wolverine": {
    en: "Two brothers fight their way through a century of wars.",
    ar: "شقيقان يشقان طريقهما عبر قرنٍ من الحروب.",
  },
  "x-men": {
    en: "A runaway with a dangerous touch is found by two sides at once.",
    ar: "هاربة بلمسة قاتلة، يلاحقها طرفان في الوقت نفسه.",
  },
  x2: {
    en: "An attack on the president gives a soldier the excuse he wanted.",
    ar: "هجوم على الرئيس يمنح أحدهم الذريعة التي كان ينتظرها.",
  },
  "x-men-the-last-stand": {
    en: "A cure is announced. Nobody agrees on what that means.",
    ar: "يُعلن عن علاج… لكن لا أحد يتفق على معناه.",
  },
  "the-wolverine": {
    en: "An old debt calls a man to Japan.",
    ar: "دين قديم يقود رجلًا إلى اليابان.",
  },
  "x-men-days-of-future-past": {
    en: "A mind is sent back decades to stop one decision.",
    ar: "عقل يعود عبر الزمن، على أمل تغيير قرار واحد.",
  },
  "x-men-apocalypse": {
    en: "The first of them wakes up, unimpressed with the world.",
    ar: "أقدمهم جميعًا يستيقظ… ولا يعجبه ما آل إليه العالم.",
  },
  "x-men-dark-phoenix": {
    en: "A rescue in orbit goes wrong for one of them.",
    ar: "مهمة إنقاذ في الفضاء تنقلب على إحدى أفراد الفريق.",
  },
  deadpool: {
    en: "A mercenary takes a cure with side effects.",
    ar: "مرتزق يخضع لعلاج… لكن بثمن غير متوقع.",
  },
  "deadpool-2": {
    en: "A very loud man tries to protect a very angry boy.",
    ar: "رجل لا يعرف الهدوء يحاول حماية فتى يشتعل غضبًا.",
  },
  "the-new-mutants": {
    en: "Five teenagers wake up in a hospital they cannot leave.",
    ar: "خمسة مراهقين يستيقظون في مستشفى لا يستطيعون مغادرته.",
  },
  logan: {
    en: "An old man drives a limousine near the border, and hides.",
    ar: "رجل مسن يقود سيارة ليموزين قرب الحدود… ويحرص على ألا يلفت الأنظار.",
  },

  // --- Marvel series, old and new -----------------------------------------
  "agents-of-shield": {
    en: "The people who clean up after the ones with capes.",
    ar: "الفريق الذي يتولى ترتيب الفوضى بعد رحيل أصحاب العباءات.",
  },
  "agent-carter": {
    en: "A wartime officer is handed the filing in peacetime.",
    ar: "ضابطة خدمت في زمن الحرب، تجد نفسها خلف مكتبٍ في زمن السلم.",
  },
  "marvels-inhumans": {
    en: "A royal family with a coup at home and nowhere to go.",
    ar: "عائلة ملكية يطيح بها انقلاب، فتبحث عن ملاذ.",
  },
  runaways: {
    en: "Six teenagers find out what their parents do at night.",
    ar: "ستة مراهقين يكتشفون ما يخفيه آباؤهم عنهم.",
  },
  "cloak-and-dagger": {
    en: "Two strangers from the same disaster, years later.",
    ar: "غريبان جمعتهما كارثة واحدة… بعد سنوات.",
  },
  "the-gifted": {
    en: "A family goes underground when their children are found out.",
    ar: "عائلة تضطر إلى الاختباء بعد انكشاف سر أطفالها.",
  },
  legion: {
    en: "A patient in a psychiatric hospital may not be ill.",
    ar: "مريض في مستشفى للأمراض النفسية… وقد لا يكون مريضًا أصلًا.",
  },

  // --- Legacy, 1998–2011 ---------------------------------------------------
  blade: {
    en: "Half of him is what he hunts.",
    ar: "نصفه ينتمي إلى ما يطارده.",
  },
  "blade-ii": {
    en: "The hunters need his help, which nobody enjoys.",
    ar: "صيادو الوحوش يحتاجون إلى مساعدته… رغم أنهم لا يطيقونه.",
  },
  "daredevil-2003": {
    en: "A lawyer who loses in court wins somewhere else.",
    ar: "محامٍ يخسر قضاياه نهارًا… ويبحث عن العدالة ليلًا.",
  },
  "hulk-2003": {
    en: "A laboratory accident, and a temper with a long history.",
    ar: "حادث في مختبر يوقظ غضبًا ظل دفينًا لسنوات.",
  },
  "blade-trinity": {
    en: "The authorities decide he is the problem.",
    ar: "هذه المرة، تقرر السلطات أن المشكلة تكمن فيه هو.",
  },
  "the-punisher-2004": {
    en: "An agent's last day on the job goes badly.",
    ar: "آخر يوم في الخدمة لا يسير كما ينبغي.",
  },
  elektra: {
    en: "An assassin is hired, then asked to reconsider.",
    ar: "قاتلة مأجورة تُكلَّف بمهمة… ثم تبدأ بالتردد.",
  },
  "ghost-rider": {
    en: "A stunt rider made a deal a long time ago.",
    ar: "سائق استعراضات أبرم صفقة غيّرت حياته إلى الأبد.",
  },
  "ghost-rider-spirit-of-vengeance": {
    en: "Hiding in Eastern Europe, asked for one more job.",
    ar: "مختبئ في أوروبا الشرقية، لكنه يُستدعى لمهمة أخيرة.",
  },

  // --- Animation -----------------------------------------------------------
  "x-men-the-animated-series": {
    en: "The 1990s cartoon, theme tune and all.",
    ar: "المسلسل الكرتوني الكلاسيكي من التسعينيات، بكل ما يميزه.",
  },
  "spider-man-1994": {
    en: "The 1990s cartoon, a new villain most weeks.",
    ar: "المسلسل الكرتوني الشهير من التسعينيات، مع خصم جديد في معظم الحلقات.",
  },
  "the-spectacular-spider-man": {
    en: "High school, homework, and a costume.",
    ar: "مدرسة ثانوية، وواجبات منزلية… وحياة سرية.",
  },
  "ultimate-spider-man": {
    en: "Training with an agency, badly.",
    ar: "يتدرب مع وكالة… لكن الأمور لا تسير كما ينبغي.",
  },
  "spider-man-2017": {
    en: "A scholarship at a science academy, and a night job.",
    ar: "منحة في أكاديمية للعلوم… وحياة مختلفة بعد غروب الشمس.",
  },
  "x-men-97": {
    en: "The 1990s cartoon, picked up where it stopped.",
    ar: "عودة إلى المسلسل الكرتوني الشهير من حيث توقف.",
  },
  // --- added in PRD v2 -----------------------------------------------------
  // Every Arabic line below is a NEW DRAFT. `arReviewed` goes back to false
  // with them, which is what that flag is for.
  "avengers-doomsday": {
    en: "Earth's heroes reassemble, against the man the Multiverse Saga has been pointing at.",
    ar: "أبطال الأرض يجتمعون من جديد، في مواجهة الرجل الذي تشير إليه الملحمة منذ بدايتها.",
  },
  "captain-america-1944": {
    en: "The first Marvel adaptation ever filmed, in fifteen chapters.",
    ar: "أول اقتباس مارفل يُصوَّر، في خمسة عشر فصلًا.",
  },
  "the-marvel-super-heroes-1966": {
    en: "Barely animated comic panels, five heroes a week. The first time any moved.",
    ar: "لوحات مصوّرة تكاد لا تتحرّك، وخمسة أبطال أسبوعيًا. أول مرة يتحرّك فيها أحد.",
  },
  "fantastic-four-1967": {
    en: "Hanna-Barbera's version, made while the comic was still being written.",
    ar: "نسخة هانا-باربيرا، صُنعت والقصة المصوّرة ما زالت تُكتب.",
  },
  "spider-man-1967": {
    en: "The one with the theme tune everybody can sing.",
    ar: "صاحب الشارة التي يستطيع الجميع غناءها.",
  },
  "spider-man-1977": {
    en: "The live-action pilot: a man in a homemade suit on real New York rooftops.",
    ar: "الحلقة التجريبية الحيّة: رجل ببذلة منزلية الصنع فوق أسطح نيويورك الحقيقية.",
  },
  "the-amazing-spider-man-1977": {
    en: "Two seasons of a wall-crawler, shot on real New York rooftops.",
    ar: "موسمان من متسلّق جدران، صُوّرا على أسطح نيويورك الحقيقية.",
  },
  "the-incredible-hulk-1978": {
    en: "Five seasons of a man walking away down a road, and the saddest theme music on television.",
    ar: "خمسة مواسم من رجل يمضي وحيدًا على طريق، وأحزن موسيقى شارة في التلفزيون.",
  },
  "dr-strange-1978": {
    en: "A television pilot that never became a series, and the first Sorcerer Supreme on screen.",
    ar: "حلقة تجريبية تلفزيونية لم تصر مسلسلًا، وأول ساحر أعظم على الشاشة.",
  },
  "the-new-fantastic-four-1978": {
    en: "The one where a robot replaces the Torch, for rights reasons nobody explained.",
    ar: "النسخة التي حلّ فيها روبوت محلّ الشعلة، لأسباب حقوق لم يشرحها أحد.",
  },
  "spider-man-toei-1978": {
    en: "Japan's version, with a spaceship and a giant robot. Licensed and official.",
    ar: "النسخة اليابانية، ومعها مركبة فضائية وروبوت عملاق. مرخَّصة ورسمية.",
  },
  "captain-america-1979": {
    en: "A made-for-television Cap on a motorcycle, with a shield that doubles as a windscreen.",
    ar: "كابتن تلفزيوني على درّاجة نارية، ودرعه يصلح زجاجًا أماميًا.",
  },
  "captain-america-ii-1979": {
    en: "The sequel, with Christopher Lee as a terrorist who has invented rapid ageing.",
    ar: "التتمّة، وفيها كريستوفر لي إرهابيًّا اخترع الشيخوخة السريعة.",
  },
  "spider-woman-1979": {
    en: "Jessica Drew's own series, made before most of her comics existed.",
    ar: "مسلسل جيسيكا درو الخاص، صُنع قبل وجود معظم قصصها المصوّرة.",
  },
  "fred-and-barney-meet-the-thing": {
    en: "A teenager says a magic phrase and becomes the Thing, in a Flintstones block.",
    ar: "مراهق يقول عبارة سحرية فيصير الثينغ، ضمن برنامج عائلة فلينستون.",
  },
  "spider-man-1981": {
    en: "A solo series that ran alongside the Amazing Friends, sharing animation.",
    ar: "مسلسل منفرد عُرض بموازاة «الأصدقاء المذهلون»، يشاركه الرسوم.",
  },
  "spider-man-amazing-friends": {
    en: "A shared flat with Iceman and Firestar, and a character the comics adopted.",
    ar: "شقّة مشتركة مع آيسمان وفايرستار، وشخصية تبنّتها القصص المصوّرة.",
  },
  "the-incredible-hulk-1982": {
    en: "The animated Hulk that ran opposite the live-action one, with Stan Lee narrating.",
    ar: "الهالك المرسوم الذي عُرض مقابل النسخة الحيّة، ورواه ستان لي.",
  },
  "the-incredible-hulk-returns": {
    en: "The reunion film, and the first live-action Thor — in a fur waistcoat.",
    ar: "فيلم اللمّ، وأول ثور بشري حيّ، بصدرية من فرو.",
  },
  "the-trial-of-the-incredible-hulk": {
    en: "The first live-action Daredevil, in a black costume, sharing a film with Banner.",
    ar: "أول ديرديفل بشري حيّ، ببزّة سوداء، يتقاسم فيلمًا مع بانر.",
  },
  "pryde-of-the-x-men": {
    en: "A pilot that never became a series, and why a generation thinks Logan is Australian.",
    ar: "حلقة تجريبية لم تصر مسلسلًا، وسبب ظنّ جيل أن لوغان أسترالي.",
  },
  "the-death-of-the-incredible-hulk": {
    en: "The last of the television films, and it means the title.",
    ar: "آخر الأفلام التلفزيونية، وهو يعني ما يقوله عنوانه.",
  },
  "spider-man-unlimited": {
    en: "Stranded on Counter-Earth, cancelled on a cliffhanger nobody ever resolved.",
    ar: "عالق في الأرض المقابلة، أُلغي عند نهاية معلّقة لم يحلّها أحد.",
  },
  "the-avengers-united-they-stand": {
    en: "The team in powered armour, drawn from the bench rather than the founders.",
    ar: "الفريق في دروع آلية، مُختار من الاحتياط لا من المؤسّسين.",
  },
  "mutant-x": {
    en: "Genetically altered people, made while Fox and Marvel argued in court over it.",
    ar: "بشر معدّلون وراثيًا، صُنع بينما تتنازع فوكس ومارفل عليه في المحكمة.",
  },
  "spider-man-2003": {
    en: "MTV's computer-animated continuation of the Raimi film, set between the first two.",
    ar: "تكملة إم تي في المحوسبة لفيلم رايمي، أحداثها بين الجزأين الأولين.",
  },
  "fantastic-four-worlds-greatest-heroes": {
    en: "A French-American co-production with an anime look, and a superb Doom.",
    ar: "إنتاج فرنسي-أمريكي مشترك بمظهر أنمي، وفيه دووم بديع.",
  },
  "punisher-war-zone": {
    en: "The third and most violent of them, sharing no cast with the other two.",
    ar: "ثالثها وأعنفها، لا يشارك الاثنين الآخرين طاقمًا.",
  },
  "the-super-hero-squad-show": {
    en: "Everybody drawn as a toy, playing the whole universe for jokes.",
    ar: "الجميع مرسومون كألعاب، يؤدّون الكون كله على سبيل النكتة.",
  },
  "iron-man-armored-adventures": {
    en: "Tony Stark as a teenager, and the best-written of the animated versions.",
    ar: "توني ستارك مراهقًا، وأفضل النسخ المرسومة كتابةً.",
  },
  "marvel-anime-iron-man": {
    en: "Madhouse's version for Japanese television, on a separate continuity.",
    ar: "نسخة مادهاوس للتلفزيون الياباني، على استمرارية منفصلة.",
  },
  "marvel-anime-wolverine": {
    en: "Logan in Japan, chasing a woman he loves through the Yashida crime family.",
    ar: "لوغان في اليابان، يطارد امرأة يحبّها عبر عائلة ياشيدا الإجرامية.",
  },
  "marvel-anime-x-men": {
    en: "The team in Japan a year after a loss the series refuses to let them forget.",
    ar: "الفريق في اليابان بعد عام من فقدٍ يأبى المسلسل أن يدعهم ينسونه.",
  },
  "marvel-anime-blade": {
    en: "Blade across Southeast Asia, hunting the vampire who killed his mother.",
    ar: "بليد عبر جنوب شرق آسيا، يطارد مصّاص الدماء الذي قتل أمه.",
  },
  "iron-man-hulk-heroes-united": {
    en: "A computer-animated team-up film, the first of two.",
    ar: "فيلم تعاون محوسب الرسوم، أول اثنين.",
  },
  "iron-man-captain-america-heroes-united": {
    en: "The second of the pair, with Cap replacing the Hulk.",
    ar: "ثاني الاثنين، وقد حلّ الكابتن محلّ الهالك.",
  },
  "marvel-disk-wars-the-avengers": {
    en: "A Japanese series where children carry the team in capture discs.",
    ar: "مسلسل ياباني يحمل فيه أطفال الفريق في أقراص أسر.",
  },
  "marvel-super-hero-adventures-frost-fight": {
    en: "A Christmas film in which Loki and Santa Claus are both plot points.",
    ar: "فيلم عيد ميلاد، ولوكي وبابا نويل فيه عنصران في الحبكة.",
  },
  "powers": {
    en: "Two homicide detectives in a city where superhumans are a public-health problem.",
    ar: "محقّقا جرائم قتل في مدينة يمثّل فيها الخارقون مشكلة صحة عامة.",
  },
  "hulk-where-monsters-dwell": {
    en: "A Halloween film pairing the green one with a sorcerer against a nightmare demon.",
    ar: "فيلم هالوين يجمع الأخضر بساحر ضدّ شيطان كوابيس.",
  },
  "marvel-future-avengers": {
    en: "A Japanese series about children raised by Hydra to replace the Avengers.",
    ar: "مسلسل ياباني عن أطفال ربّتهم هايدرا ليحلّوا محلّ المنتقمين.",
  },
  "avengers-black-panthers-quest": {
    en: "The fifth season of the Avengers cartoon, handed entirely to Wakanda.",
    ar: "الموسم الخامس من رسوم المنتقمين، مُنح كاملًا لواكاندا.",
  },
  "spidey-and-his-amazing-friends": {
    en: "For very small children, and the first Marvel series made for them.",
    ar: "للأطفال الصغار جدًا، وأول مسلسل مارفل يُصنع لهم.",
  },
  "moon-girl-and-devil-dinosaur": {
    en: "A thirteen-year-old genius and the red tyrannosaur she pulled through a portal.",
    ar: "عبقرية في الثالثة عشرة، والتيرانوصور الأحمر الذي جذبته عبر بوابة.",
  },
  "black-panther-3": {
    en: "Wakanda again, with Ryan Coogler back and a new man carrying the mantle.",
    ar: "واكاندا من جديد، بعودة رايان كوغلر ورجل جديد يحمل اللقب.",
  },
  "ghost-rider-2028": {
    en: "The rider comes to Marvel Studios, with Ryan Gosling under the skull.",
    ar: "الفارس يصل إلى مارفل ستوديوز، وريان غوسلينغ تحت الجمجمة.",
  },
  "spider-man-beyond-the-spider-verse": {
    en: "The last part of the trilogy, and the one Miles has been falling toward.",
    ar: "الجزء الأخير من الثلاثية، وهو ما ظل مايلز يهوي نحوه.",
  },
  "avengers-secret-wars": {
    en: "The film the whole Multiverse Saga has been building toward.",
    ar: "الفيلم الذي بُنيت ملحمة الأكوان المتعددة كلها للوصول إليه.",
  },
  visionquest: {
    en: "Vision gets a story of his own, and goes looking for what he used to be.",
    ar: "فيجن يحصل على قصته الخاصة، ويمضي باحثًا عمّا كان عليه.",
  },
  "modok-s1": {
    en: "A giant floating head runs a supervillain company badly and a marriage worse.",
    ar: "رأس عملاق طائر يدير شركة أشرار بسوء، وزواجًا بسوء أكبر.",
  },
  "hit-monkey-s1": {
    en: "A Japanese snow monkey takes up a dead assassin's work, and his ghost.",
    ar: "قرد ثلج ياباني يرث عمل قاتل مأجور ميت، ويرث شبحه أيضًا.",
  },
  "hit-monkey-s2": {
    en: "The monkey goes to New York, where the work is the same and louder.",
    ar: "يذهب القرد إلى نيويورك، حيث العمل نفسه لكنه أصخب.",
  },
  helstrom: {
    en: "A brother and sister with a monstrous inheritance, hunting the worst of it.",
    ar: "أخ وأخت ورثا شيئًا وحشيًا، ويطاردان أسوأ ما فيه.",
  },
  "howard-the-duck": {
    en: "A talking duck from another world lands in Cleveland.",
    ar: "بطة ناطقة من عالم آخر تهبط في مدينة كليفلاند.",
  },
  "the-punisher-1989": {
    en: "Frank Castle's first time on screen, as a one-man war.",
    ar: "أول ظهور لفرانك كاسل على الشاشة، حربًا من رجل واحد.",
  },
  "captain-america-1990": {
    en: "A low-budget first attempt at the shield, eighteen years before the MCU.",
    ar: "محاولة أولى منخفضة الميزانية لحمل الدرع، قبل الكون السينمائي بثمانية عشر عامًا.",
  },
  "generation-x": {
    en: "A television film about young mutants at school, four years before the films.",
    ar: "فيلم تلفزيوني عن متحوّلين صغار في مدرسة، قبل الأفلام بأربع سنوات.",
  },
  "nick-fury-agent-of-shield": {
    en: "A made-for-television Nick Fury, a decade before Samuel L. Jackson.",
    ar: "نيك فيوري في فيلم تلفزيوني، قبل صامويل جاكسون بعقد كامل.",
  },
  "man-thing": {
    en: "Something in a Florida swamp objects to being disturbed.",
    ar: "شيء في مستنقعات فلوريدا يرفض أن يُزعجه أحد.",
  },
  "blade-the-series": {
    en: "The Blade films continued on television, for one season.",
    ar: "أفلام «بليد» تواصلت على التلفزيون، لموسم واحد.",
  },
  "the-consultant": {
    en: "Two agents argue over who has to deliver the bad news.",
    ar: "عميلان يتجادلان حول من عليه أن ينقل الخبر السيئ.",
  },
  "a-funny-thing-happened-on-the-way-to-thors-hammer": {
    en: "Agent Coulson stops for petrol on his way to New Mexico.",
    ar: "العميل كولسون يتوقف لتعبئة الوقود في طريقه إلى نيومكسيكو.",
  },
  "item-47": {
    en: "A couple finds alien tech in the rubble of New York and tries their luck.",
    ar: "ثنائي يعثر على تقنية فضائية بين أنقاض نيويورك، فيجرّب حظه بها.",
  },
  "agent-carter-one-shot": {
    en: "Peggy Carter, a year after the war, doing the job nobody will give her.",
    ar: "بيغي كارتر بعد الحرب بعام، تؤدي العمل الذي يرفض الجميع إسناده إليها.",
  },
  "all-hail-the-king": {
    en: "A documentary maker interviews Trevor Slattery in prison.",
    ar: "صانع أفلام وثائقية يحاور تريفور سلاتري داخل السجن.",
  },
  "x-men-97-s2": {
    en: "The animated series continues, in the same hand-drawn continuity.",
    ar: "المسلسل الكرتوني يتواصل، في السياق المرسوم يدويًا نفسه.",
  },
  "iron-man-1994": {
    en: "Tony Stark and a rotating team of allies, in the Marvel Action Hour.",
    ar: "توني ستارك وفريق متغيّر من الحلفاء، ضمن ساعة مارفل.",
  },
  "fantastic-four-1994": {
    en: "The first family, animated, in the other half of the same hour.",
    ar: "العائلة الأولى في نسخة كرتونية، في النصف الآخر من الساعة نفسها.",
  },
  "the-incredible-hulk-1996": {
    en: "Banner on the run again, drawn, sharing a broadcast hour with another hero.",
    ar: "بانر هاربًا من جديد، مرسومًا، يتقاسم ساعة البث مع بطل آخر.",
  },
  "x-men-evolution": {
    en: "The mutants as teenagers at school, which changes what the stories are about.",
    ar: "المتحوّلون مراهقون في المدرسة، وهذا يغيّر ما تدور حوله القصص.",
  },
  "wolverine-and-the-x-men": {
    en: "The school is gone and Logan is running what is left of it.",
    ar: "المدرسة اختفت ولوغان يدير ما تبقّى منها.",
  },
  "avengers-earths-mightiest-heroes": {
    en: "The team assembled slowly and properly, one hero at a time.",
    ar: "الفريق يتجمّع ببطء وبإتقان، بطلًا بعد بطل.",
  },
  "avengers-assemble": {
    en: "The follow-up series, built around the line-up people knew from the films.",
    ar: "المسلسل التالي، مبني حول التشكيلة التي عرفها الناس من الأفلام.",
  },
  "hulk-and-the-agents-of-smash": {
    en: "Hulk with a team of his own, all of them gamma.",
    ar: "هالك مع فريق خاص به، جميعهم من الغاما.",
  },
  "guardians-of-the-galaxy-2015": {
    en: "The animated Guardians, picking up the tone the films set.",
    ar: "حرّاس المجرّة كرتونيًا، بالنبرة التي أرستها الأفلام.",
  },
  "elektra-the-hand-and-the-devil": {
    en: "An eleven-minute independent short, made outside the studios entirely.",
    ar: "فيلم قصير مستقل مدته إحدى عشرة دقيقة، صُنع خارج الاستوديوهات تمامًا.",
  },
  "hulk-vs": {
    en: "Two shorts: the Hulk against Wolverine, and the Hulk against Asgard.",
    ar: "فيلمان قصيران: هالك في مواجهة وولفرين، وهالك في مواجهة أسجارد.",
  },
  "ultimate-avengers": {
    en: "The team assembled for the first time in animation, from the Ultimate comics.",
    ar: "الفريق يجتمع لأول مرة في الرسوم المتحركة، عن سلسلة ألتيميت المصوّرة.",
  },
  "ultimate-avengers-2": {
    en: "The follow-up, and the first animated outing for the king of Wakanda.",
    ar: "الجزء التالي، وأول ظهور كرتوني لملك واكاندا.",
  },
  "planet-hulk": {
    en: "Banner is exiled to a world that puts him straight into an arena.",
    ar: "بانر يُنفى إلى عالم يزجّ به مباشرة في حلبة قتال.",
  },
  "doctor-strange-2007": {
    en: "The surgeon's origin, animated, nine years before the film.",
    ar: "قصة أصل الجرّاح في نسخة كرتونية، قبل الفيلم بتسع سنوات.",
  },
  "next-avengers": {
    en: "The children of the Avengers, raised in hiding, learning what happened.",
    ar: "أبناء المنتقمين، تربّوا في الخفاء، ويكتشفون ما جرى.",
  },
  "thor-tales-of-asgard": {
    en: "Thor before the hammer, on the first journey his father did not sanction.",
    ar: "ثور قبل المطرقة، في أول رحلة لم يأذن بها أبوه.",
  },
  "iron-man-rise-of-technovore": {
    en: "Stark is framed and goes on the run with a Punisher who is not helping.",
    ar: "ستارك يُلفَّق له اتهام فيهرب، ومعه معاقب لا يساعده كثيرًا.",
  },
  "avengers-confidential": {
    en: "Two people who do not work well together, made to work together.",
    ar: "شخصان لا ينسجمان في العمل، يُجبران على العمل معًا.",
  },
  "the-invincible-iron-man": {
    en: "The armour's animated origin, set largely in China.",
    ar: "قصة أصل البذلة كرتونيًا، وتدور معظمها في الصين.",
  },
  "marvel-rising-secret-warriors": {
    /**
     * "Kamala Khan", not "Ms. Marvel" — the character, not the series of the
     * same name. The cross-reference guard flagged this and it was right to:
     * a reader seeing a title name inside a spoiler-safe line cannot tell
     * whether they are being told about this work or pointed at another one.
     */
    en: "A younger team, built around Kamala Khan and Squirrel Girl.",
    ar: "فريق أصغر سنًا، يتمحور حول كمالا خان وسكويرل غيرل.",
  },
};
