/**
 * i18n - Multi-language support (56 languages)
 * Uses English as base; missing keys fall back to English automatically.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language =
  | "en" | "sq" | "es" | "fr" | "de" | "tr" | "it" | "pt" | "nl" | "pl"
  | "ru" | "uk" | "cs" | "sk" | "hr" | "sr" | "bg" | "ro" | "hu" | "el"
  | "sv" | "da" | "no" | "fi" | "et" | "lv" | "lt" | "sl" | "mk" | "bs"
  | "ar" | "fa" | "hi" | "bn" | "ur" | "zh" | "ja" | "ko" | "th" | "vi"
  | "id" | "ms" | "tl" | "sw" | "am" | "he" | "ka" | "hy" | "az" | "uz"
  | "kk" | "mn" | "ne" | "si" | "my" | "km";

export const languageNames: Record<Language, string> = {
  en: "English", sq: "Shqip", es: "Español", fr: "Français", de: "Deutsch",
  tr: "Türkçe", it: "Italiano", pt: "Português", nl: "Nederlands", pl: "Polski",
  ru: "Русский", uk: "Українська", cs: "Čeština", sk: "Slovenčina", hr: "Hrvatski",
  sr: "Српски", bg: "Български", ro: "Română", hu: "Magyar", el: "Ελληνικά",
  sv: "Svenska", da: "Dansk", no: "Norsk", fi: "Suomi", et: "Eesti",
  lv: "Latviešu", lt: "Lietuvių", sl: "Slovenščina", mk: "Македонски", bs: "Bosanski",
  ar: "العربية", fa: "فارسی", hi: "हिन्दी", bn: "বাংলা", ur: "اردو",
  zh: "中文", ja: "日本語", ko: "한국어", th: "ไทย", vi: "Tiếng Việt",
  id: "Bahasa Indonesia", ms: "Bahasa Melayu", tl: "Filipino", sw: "Kiswahili",
  am: "አማርኛ", he: "עברית", ka: "ქართული", hy: "Հայերեն", az: "Azərbaycan",
  uz: "Oʻzbek", kk: "Қазақ", mn: "Монгол", ne: "नेपाली", si: "සිංහල",
  my: "မြန်မာ", km: "ខ្មែរ",
};

export type TranslationKeys = {
  // Navigation
  navHome: string; navTips: string; navAnalytics: string; navNotes: string;
  navAbout: string; navSettings: string; navHydration: string; navFaq: string;
  menu: string;
  // App + home
  appTitle: string; appSubtitle: string; days: string; untilNextCycle: string;
  markFirstCycle: string; cycle: string; day: string; nextCycle: string;
  ovulation: string; calendarTip: string;
  modeNormal: string; modePregnancy: string; modeSymptom: string;
  period: string; prediction: string;
  mon: string; tue: string; wed: string; thu: string; fri: string; sat: string; sun: string;
  // Symptoms
  symptoms: string; flow: string; light: string; medium: string; heavy: string;
  pain: string; yes: string; no: string; mood: string; happy: string; sad: string; irritable: string;
  energy: string; high: string; low: string; bloating: string; headache: string; cravings: string;
  conditions: string; pcos: string; endometriosis: string; none: string;
  lightFlow: string; mediumFlow: string; heavyFlow: string;
  // Tips
  tipsTitle: string; tipsSubtitle: string;
  tipsPainRelief: string; tipsPainReliefDesc: string;
  tipsPositions: string; tipsPositionsDesc: string;
  tipsFood: string; tipsFoodDesc: string;
  tipsDrinks: string; tipsDrinksDesc: string;
  tipsAvoid: string; tipsAvoidDesc: string;
  tipsExercise: string; tipsExerciseDesc: string;
  tipsRelaxation: string; tipsRelaxationDesc: string;
  tipsCyclePhases: string; tipsCyclePhasesDesc: string;
  understandingCycle: string; generalTips: string;
  fetalPosition: string; fetalPositionDesc: string;
  childPose: string; childPoseDesc: string;
  catCowStretch: string; catCowStretchDesc: string;
  supineTwist: string; supineTwistDesc: string;
  menstrualPhase: string; menstrualPhaseDesc: string;
  follicularPhase: string; follicularPhaseDesc: string;
  ovulationPhase: string; ovulationPhaseDesc: string;
  lutealPhase: string; lutealPhaseDesc: string;
  // Analytics
  analyticsTitle: string; analyticsSubtitle: string;
  cycleLengthTrend: string; avgCycleLength: string;
  totalCyclesLogged: string; symptomFrequency: string; symptomDistribution: string;
  periodDaysLogged: string; totalEntries: string;
  noDataYet: string; noDataHelp: string;
  // Notes
  notesTitle: string; notesSubtitle: string; addNote: string; notePlaceholder: string;
  save: string; delete: string; search: string; noNotes: string;
  // About
  aboutTitle: string; aboutSubtitle: string; createdBy: string; aboutDescription: string;
  privacyTitle: string; privacyDescription: string; featuresTitle: string; version: string;
  language: string;
  featureCycleTracking: string; featureSymptomLogging: string; featureAnalytics: string;
  featureHealthEducation: string; featureLanguages: string; featureOffline: string;
  featureHydration: string; featureFaq: string;
  // Settings
  settingsTitle: string; settingsSubtitle: string; darkMode: string;
  darkThemeActive: string; lightThemeActive: string;
  notifications: string; exportData: string; importData: string;
  exportDesc: string; importDesc: string;
  resetData: string; resetConfirm: string; removeAllData: string;
  cancel: string; confirm: string;
  // Hydration
  hydrationTitle: string; hydrationSubtitle: string; glasses: string;
  thisWeek: string; hydrationTipsTitle: string;
  hydrationTip1: string; hydrationTip2: string; hydrationTip3: string;
  hydrationTip4: string; hydrationTip5: string;
  waterReminder: string; selfCare: string; fertileWindow: string;
  // FAQ
  faqTitle: string; faqSubtitle: string;
  faqQ1: string; faqA1: string; faqQ2: string; faqA2: string;
  faqQ3: string; faqA3: string; faqQ4: string; faqA4: string;
  faqQ5: string; faqA5: string; faqQ6: string; faqA6: string;
  faqQ7: string; faqA7: string; faqQ8: string; faqA8: string;
  faqQ9: string; faqA9: string; faqQ10: string; faqA10: string;
};

const en: TranslationKeys = {
  navHome: "Home", navTips: "Health Tips", navAnalytics: "Analytics", navNotes: "Journal",
  navAbout: "About", navSettings: "Settings", navHydration: "Hydration", navFaq: "FAQ", menu: "Menu",
  appTitle: "My Cycle", appSubtitle: "Personal menstrual cycle tracker",
  days: "days", untilNextCycle: "until next cycle", markFirstCycle: "Mark your first cycle",
  cycle: "Cycle", day: "Day", nextCycle: "Next cycle", ovulation: "Ovulation",
  calendarTip: "Click on a date to mark the start of your period",
  modeNormal: "Normal", modePregnancy: "Pregnancy", modeSymptom: "Symptoms",
  period: "Period", prediction: "Prediction",
  mon: "Mo", tue: "Tu", wed: "We", thu: "Th", fri: "Fr", sat: "Sa", sun: "Su",
  symptoms: "Symptoms", flow: "Flow", light: "Light", medium: "Medium", heavy: "Heavy",
  pain: "Pain", yes: "Yes", no: "No", mood: "Mood", happy: "Happy", sad: "Sad", irritable: "Irritable",
  energy: "Energy", high: "High", low: "Low", bloating: "Bloating", headache: "Headache", cravings: "Cravings",
  conditions: "Conditions", pcos: "PCOS", endometriosis: "Endometriosis", none: "None",
  lightFlow: "Light Flow", mediumFlow: "Medium Flow", heavyFlow: "Heavy Flow",
  tipsTitle: "Health Tips", tipsSubtitle: "Evidence-based advice for your well-being",
  tipsPainRelief: "Pain Relief",
  tipsPainReliefDesc: "Apply a warm heating pad to your lower abdomen or lower back. Take warm baths. Gentle massage in circular motions on your belly can also help relieve cramping.",
  tipsPositions: "Comfortable Positions",
  tipsPositionsDesc: "Fetal position reduces pressure on abdominal muscles. Child's pose stretches the lower back.",
  tipsFood: "What to Eat",
  tipsFoodDesc: "Iron-rich foods: spinach, lentils, red meat. Anti-inflammatory foods: salmon, berries, leafy greens. Magnesium: dark chocolate, bananas, avocados.",
  tipsDrinks: "What to Drink",
  tipsDrinksDesc: "Stay hydrated with water. Ginger tea reduces nausea and cramps. Chamomile tea has anti-inflammatory properties. Peppermint tea eases bloating.",
  tipsAvoid: "What to Avoid",
  tipsAvoidDesc: "Limit caffeine. Reduce salt. Avoid processed sugars. Limit alcohol.",
  tipsExercise: "Gentle Exercise",
  tipsExerciseDesc: "Light walking improves blood flow. Yoga poses like cat-cow help. Swimming reduces cramp pain.",
  tipsRelaxation: "Relaxation Techniques",
  tipsRelaxationDesc: "Deep breathing (4-7-8). Progressive muscle relaxation. Meditation. Aromatherapy with lavender.",
  tipsCyclePhases: "Understanding Your Cycle Phases",
  tipsCyclePhasesDesc: "Menstrual (1-5): Rest. Follicular (6-13): Energy rises. Ovulation (14): Peak. Luteal (15-28): Self-care.",
  understandingCycle: "Understanding Your Cycle", generalTips: "General Tips",
  fetalPosition: "Fetal Position",
  fetalPositionDesc: "Lie on your side with knees pulled up to your chest. This reduces pressure on the abdominal muscles and helps relieve cramps.",
  childPose: "Child's Pose (Balasana)",
  childPoseDesc: "Kneel on the floor, sit back on your heels, and stretch your arms forward. This gently stretches the lower back and eases tension.",
  catCowStretch: "Cat-Cow Stretch",
  catCowStretchDesc: "On your hands and knees, alternate between arching your back (cat) and dropping your belly (cow). Improves flexibility and relieves back pain.",
  supineTwist: "Supine Twist",
  supineTwistDesc: "Lie on your back, bring your knees to one side while keeping shoulders flat. This stretches the lower back and relieves bloating.",
  menstrualPhase: "Menstrual Phase (Days 1-5)",
  menstrualPhaseDesc: "Your uterus sheds its lining. You may experience cramps, fatigue, and mood changes. Rest is key. Drink warm liquids and eat iron-rich foods.",
  follicularPhase: "Follicular Phase (Days 6-13)",
  follicularPhaseDesc: "Estrogen rises, you feel more energetic. Great time for starting new projects, exercising intensely, and socializing. Skin may look better.",
  ovulationPhase: "Ovulation (Day 14)",
  ovulationPhaseDesc: "An egg is released. You're at peak fertility. Energy and libido are highest. You might notice mild ovulation pain on one side.",
  lutealPhase: "Luteal Phase (Days 15-28)",
  lutealPhaseDesc: "Progesterone rises, PMS symptoms may appear: bloating, mood swings, cravings, breast tenderness. Practice self-care and reduce salt intake.",
  analyticsTitle: "Analytics", analyticsSubtitle: "Track your patterns and trends",
  cycleLengthTrend: "Cycle Length Trend", avgCycleLength: "Average Cycle Length",
  totalCyclesLogged: "Total Cycles Logged", symptomFrequency: "Symptom Frequency",
  symptomDistribution: "Symptom Distribution",
  periodDaysLogged: "Period Days Logged", totalEntries: "Total Entries",
  noDataYet: "Start tracking to see your analytics",
  noDataHelp: "Go to the Home page and click on dates to mark your period start days. After logging 2+ cycles, trend charts will appear here.",
  notesTitle: "Journal", notesSubtitle: "Your private notes and reflections",
  addNote: "Add Note", notePlaceholder: "Write your thoughts, symptoms, or anything you want to remember...",
  save: "Save", delete: "Delete", search: "Search notes...", noNotes: "No notes yet. Start journaling!",
  aboutTitle: "About", aboutSubtitle: "Your trusted cycle companion", createdBy: "Created by",
  aboutDescription: "My Cycle is a comprehensive menstrual cycle tracking application designed to help you understand your body better.",
  privacyTitle: "Your Privacy Matters",
  privacyDescription: "All your data is stored locally on your device. Nothing is sent to any server.",
  featuresTitle: "Features", version: "Version", language: "Language",
  featureCycleTracking: "Cycle Tracking & Predictions", featureSymptomLogging: "Symptom & Mood Logging",
  featureAnalytics: "Analytics & Insights", featureHealthEducation: "Health Education",
  featureLanguages: "56+ Languages", featureOffline: "Works Offline",
  featureHydration: "Hydration Tracker", featureFaq: "FAQ & Guides",
  settingsTitle: "Settings", settingsSubtitle: "Customize your experience",
  darkMode: "Dark Mode", darkThemeActive: "Dark theme active", lightThemeActive: "Light theme active",
  notifications: "Notifications", exportData: "Export Data", importData: "Import Data",
  exportDesc: "Download your data as JSON backup", importDesc: "Restore from a JSON backup file",
  resetData: "Reset All Data", resetConfirm: "Are you sure? This cannot be undone.",
  removeAllData: "Remove all tracking data", cancel: "Cancel", confirm: "Confirm",
  hydrationTitle: "Hydration", hydrationSubtitle: "Stay hydrated throughout your cycle",
  glasses: "glasses", thisWeek: "This Week", hydrationTipsTitle: "Hydration Tips",
  hydrationTip1: "Drink at least 8 glasses (2L) of water daily",
  hydrationTip2: "During your period, increase intake to reduce bloating",
  hydrationTip3: "Herbal teas count toward your daily goal",
  hydrationTip4: "Set hourly reminders on your phone",
  hydrationTip5: "Carry a reusable water bottle everywhere",
  waterReminder: "Water Reminder", selfCare: "Self Care", fertileWindow: "Fertile Window",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Everything you need to know about your cycle",
  faqQ1: "What is a normal menstrual cycle length?",
  faqA1: "A normal cycle ranges from 21 to 35 days, with an average of 28 days. Slight variations are normal. Consistently shorter than 21 or longer than 35 days warrants a check-up.",
  faqQ2: "How does the prediction algorithm work?",
  faqA2: "The app averages your last 3 cycle lengths to predict your next period. The more cycles you log, the more accurate the prediction becomes.",
  faqQ3: "What is ovulation and when does it occur?",
  faqA3: "Ovulation is when an egg is released from the ovary. It typically occurs around day 14 of a 28-day cycle. The fertile window covers about 5 days around ovulation.",
  faqQ4: "Is my data private?",
  faqA4: "Yes. All data is stored locally on your device using localStorage. Nothing is sent to any server. You can export or delete it anytime in Settings.",
  faqQ5: "What is PMS and when does it start?",
  faqA5: "Premenstrual Syndrome includes mood swings, bloating, cramps, headaches and cravings. It usually begins 1–2 weeks before your period and ends when menstruation starts.",
  faqQ6: "How can I make my periods less painful?",
  faqA6: "Apply heat to the lower abdomen, try gentle yoga, drink ginger or chamomile tea, eat anti-inflammatory foods, walk, and practice deep breathing.",
  faqQ7: "What does PCOS mean for my cycle?",
  faqA7: "Polycystic Ovary Syndrome can cause irregular or missed periods and heavy bleeding. PCOS mode adjusts predictions to account for longer, variable cycles.",
  faqQ8: "How do I know if my flow is normal?",
  faqA8: "Average blood loss is 30–40 ml per cycle. Soaking through a pad every 1–2 hours, or periods longer than 7 days, may be heavy bleeding worth discussing with a doctor.",
  faqQ9: "Why should I track my symptoms?",
  faqA9: "Tracking helps identify patterns, anticipate PMS, communicate with healthcare providers, and understand how your cycle affects daily life.",
  faqQ10: "Can I use this app for pregnancy planning?",
  faqA10: "Yes. Switch to Pregnancy mode on the home screen — the app highlights your fertile window and ovulation day to help with conception timing.",
};

const sq: TranslationKeys = {
  navHome: "Kryefaqja", navTips: "Këshilla", navAnalytics: "Analiza", navNotes: "Ditari",
  navAbout: "Rreth Nesh", navSettings: "Cilësimet", navHydration: "Hidratimi", navFaq: "Pyetje", menu: "Menyja",
  appTitle: "Cikli Im", appSubtitle: "Ndjekësi personal i ciklit menstrual",
  days: "ditë", untilNextCycle: "deri në ciklin tjetër", markFirstCycle: "Shëno ciklin e parë",
  cycle: "Cikli", day: "Dita", nextCycle: "Cikli tjetër", ovulation: "Ovulimi",
  calendarTip: "Kliko mbi një datë për të shënuar fillimin e periodës",
  modeNormal: "Normal", modePregnancy: "Shtatzëni", modeSymptom: "Simptoma",
  period: "Perioda", prediction: "Parashikim",
  mon: "Hë", tue: "Ma", wed: "Më", thu: "En", fri: "Pr", sat: "Sh", sun: "Di",
  symptoms: "Simptomat", flow: "Fluksi", light: "Lehtë", medium: "Mesatar", heavy: "I rëndë",
  pain: "Dhimbje", yes: "Po", no: "Jo", mood: "Humori", happy: "I lumtur", sad: "I trishtuar", irritable: "I irrituar",
  energy: "Energjia", high: "Lartë", low: "Ulët", bloating: "Fryrje", headache: "Dhimbje koke", cravings: "Dëshira",
  conditions: "Kushte", pcos: "PCOS", endometriosis: "Endometrioza", none: "Asnjë",
  lightFlow: "Fluks i lehtë", mediumFlow: "Fluks mesatar", heavyFlow: "Fluks i rëndë",
  tipsTitle: "Këshilla Shëndetësore", tipsSubtitle: "Këshilla të bazuara në shkencë",
  tipsPainRelief: "Lehtësimi i Dhimbjes",
  tipsPainReliefDesc: "Vendos një ngrohëse të ngrohtë në bark ose në shpinë. Bëj banja të ngrohta. Masazhi i butë në bark me lëvizje rrethore ndihmon për lehtësimin e ngërçeve.",
  tipsPositions: "Pozicione Rehatshme",
  tipsPositionsDesc: "Pozicioni fetal redukton presionin në muskujt e barkut. Pozicioni i fëmijës shtrin shpinën e poshtme.",
  tipsFood: "Çfarë të Hash",
  tipsFoodDesc: "Ushqime me hekur: spinaq, thjerrëza, mish i kuq. Anti-inflamatore: salmon, boronica, perime me gjethe. Magnez: çokollatë e zezë, banane, avokado.",
  tipsDrinks: "Çfarë të Pish",
  tipsDrinksDesc: "Pi shumë ujë. Çaji i xhenxhefilit redukton përzierjen dhe ngërçet. Kamomili ka veti anti-inflamatore. Menta ndihmon kundër fryrjes.",
  tipsAvoid: "Çfarë të Shmangësh",
  tipsAvoidDesc: "Kufizo kafeinën (mund të përkeqësojë ngërçet). Redukto kripën. Shmang sheqernat e përpunuara. Kufizo alkoolin.",
  tipsExercise: "Ushtrime të Lehta",
  tipsExerciseDesc: "Ecja e lehtë përmirëson qarkullimin e gjakut. Pozicione joga si cat-cow ndihmojnë. Noti redukton dhimbjen.",
  tipsRelaxation: "Teknika Relaksimi",
  tipsRelaxationDesc: "Ushtrime frymëmarrjeje (metoda 4-7-8). Relaksim progresiv i muskujve. Meditim. Aromaterapi me lavandër.",
  tipsCyclePhases: "Kupto Fazat e Ciklit",
  tipsCyclePhasesDesc: "Menstruale (1-5): Pushim. Folikulare (6-13): Energji në rritje. Ovulimi (14): Maksimumi. Luteale (15-28): Kujdes për veten.",
  understandingCycle: "Kupto Ciklin Tënd", generalTips: "Këshilla të Përgjithshme",
  fetalPosition: "Pozicioni Fetal",
  fetalPositionDesc: "Shtrihu në krah me gjunjët të tërhequr drejt gjoksit. Kjo redukton presionin në muskujt e barkut dhe lehtëson ngërçet.",
  childPose: "Pozicioni i Fëmijës",
  childPoseDesc: "Gjunjëzohu në dysheme, ulu mbi thembrat dhe shtri krahët para. Shtrin butësisht shpinën e poshtme dhe lehtëson tensionin.",
  catCowStretch: "Shtrirja Mace-Lopë",
  catCowStretchDesc: "Mbi duar dhe gjunjë, alterno midis harkimit të shpinës (mace) dhe uljes së barkut (lopë). Përmirëson fleksibilitetin dhe lehtëson dhimbjen.",
  supineTwist: "Rrotullim i Shtrirë",
  supineTwistDesc: "Shtrihu në shpinë, sill gjunjët në një anë duke mbajtur shpatullat të sheshta. Shtrin shpinën e poshtme dhe lehtëson fryrjen.",
  menstrualPhase: "Faza Menstruale (Ditët 1-5)",
  menstrualPhaseDesc: "Mitra hedh shtresën e brendshme. Mund të ndjesh ngërçe, lodhje dhe ndryshime humori. Pushimi është kyç. Pi lëngje të ngrohta dhe ushqime me hekur.",
  follicularPhase: "Faza Folikulare (Ditët 6-13)",
  follicularPhaseDesc: "Estrogjeni rritet, ndihesh më energjike. Kohë e mirë për projekte të reja, ushtrime intensive dhe socializim. Lëkura mund të duket më mirë.",
  ovulationPhase: "Ovulimi (Dita 14)",
  ovulationPhaseDesc: "Lëshohet një vezë. Je në fertilitet maksimal. Energjia dhe libido janë në kulm. Mund të ndjesh dhimbje të lehtë në një anë.",
  lutealPhase: "Faza Luteale (Ditët 15-28)",
  lutealPhaseDesc: "Progesteroni rritet, mund të shfaqen simptoma PMS: fryrje, ndryshime humori, dëshira, ndjeshmëri gjoksi. Kujdesu për veten dhe redukto kripën.",
  analyticsTitle: "Analiza", analyticsSubtitle: "Ndiq trendet dhe modelet tuaja",
  cycleLengthTrend: "Trendi i Gjatësisë së Ciklit", avgCycleLength: "Gjatësia Mesatare",
  totalCyclesLogged: "Cikle të Regjistruara", symptomFrequency: "Frekuenca e Simptomave",
  symptomDistribution: "Shpërndarja e Simptomave",
  periodDaysLogged: "Ditë të Periodës", totalEntries: "Hyrje Gjithsej",
  noDataYet: "Fillo gjurmimin për të parë analizat",
  noDataHelp: "Shko në Kryefaqe dhe kliko mbi datat për të shënuar fillimin e periodës. Pas regjistrimit të 2+ cikleve, do të shfaqen grafikët e trendeve këtu.",
  notesTitle: "Ditari", notesSubtitle: "Shënimet dhe reflektimet tuaja private",
  addNote: "Shto Shënim", notePlaceholder: "Shkruaj mendimet, simptomat ose çdo gjë që dëshiron të mbash mend...",
  save: "Ruaj", delete: "Fshi", search: "Kërko shënime...", noNotes: "Nuk ka shënime ende. Fillo të shkruash!",
  aboutTitle: "Rreth Nesh", aboutSubtitle: "Shoqëruesi yt i besuar i ciklit", createdBy: "Krijuar nga",
  aboutDescription: "Cikli Im është një aplikacion gjithëpërfshirës për gjurmimin e ciklit menstrual, i krijuar për të të ndihmuar të kuptosh më mirë trupin tënd.",
  privacyTitle: "Privatësia Juaj është e Rëndësishme",
  privacyDescription: "Të gjitha të dhënat tuaja ruhen lokalisht në pajisjen tuaj. Asgjë nuk dërgohet në server.",
  featuresTitle: "Veçoritë", version: "Versioni", language: "Gjuha",
  featureCycleTracking: "Gjurmimi i Ciklit dhe Parashikime", featureSymptomLogging: "Regjistrimi i Simptomave dhe Humorit",
  featureAnalytics: "Analiza dhe Njohuri", featureHealthEducation: "Edukim Shëndetësor",
  featureLanguages: "56+ Gjuhë", featureOffline: "Funksionon Offline",
  featureHydration: "Gjurmues i Hidratimit", featureFaq: "Pyetje dhe Udhëzues",
  settingsTitle: "Cilësimet", settingsSubtitle: "Personalizo përvojën tënde",
  darkMode: "Modi i Errët", darkThemeActive: "Tema e errët është aktive", lightThemeActive: "Tema e ndritshme është aktive",
  notifications: "Njoftimet", exportData: "Eksporto të Dhënat", importData: "Importo të Dhënat",
  exportDesc: "Shkarko të dhënat si rezervë JSON", importDesc: "Rivendos nga një skedar rezervë JSON",
  resetData: "Rivendos të Dhënat", resetConfirm: "Je e sigurt? Ky veprim nuk mund të zhbëhet.",
  removeAllData: "Hiq të gjitha të dhënat e gjurmimit", cancel: "Anulo", confirm: "Konfirmo",
  hydrationTitle: "Hidratimi", hydrationSubtitle: "Mbaj veten të hidratuar gjatë gjithë ciklit",
  glasses: "gota", thisWeek: "Kjo Javë", hydrationTipsTitle: "Këshilla për Hidratim",
  hydrationTip1: "Pi të paktën 8 gota (2L) ujë në ditë",
  hydrationTip2: "Gjatë periodës, rrit sasinë për të reduktuar fryrjen",
  hydrationTip3: "Çajrat bimore numërojnë në synimin tënd ditor",
  hydrationTip4: "Vendos kujtesa orare në telefon",
  hydrationTip5: "Mbaj me vete një shishe uji të ripërdorshme",
  waterReminder: "Kujtesë Uji", selfCare: "Kujdes për Veten", fertileWindow: "Dritarja Fertile",
  faqTitle: "Pyetjet më të Shpeshta",
  faqSubtitle: "Gjithçka që duhet të dish për ciklin tënd",
  faqQ1: "Sa është gjatësia normale e ciklit menstrual?",
  faqA1: "Një cikël normal varion nga 21 deri në 35 ditë, mesatarja është 28 ditë. Variacione të vogla janë normale. Nëse cikli është vazhdimisht më i shkurtër se 21 ose më i gjatë se 35 ditë, konsulto mjekun.",
  faqQ2: "Si funksionon algoritmi i parashikimit?",
  faqA2: "Aplikacioni llogarit mesataren e 3 cikleve të fundit për të parashikuar periodën tjetër. Sa më shumë cikle të regjistrosh, aq më i saktë bëhet parashikimi.",
  faqQ3: "Çfarë është ovulimi dhe kur ndodh?",
  faqA3: "Ovulimi është kur lëshohet një vezë nga vezorja. Zakonisht ndodh rreth ditës së 14-të të një cikli 28-ditor. Dritarja fertile mbulon rreth 5 ditë rreth ovulimit.",
  faqQ4: "A janë të dhënat e mia private?",
  faqA4: "Po. Të gjitha të dhënat ruhen lokalisht në pajisjen tuaj me localStorage. Asgjë nuk dërgohet në server. Mund t'i eksportosh ose fshish në çdo kohë.",
  faqQ5: "Çfarë është PMS dhe kur fillon?",
  faqA5: "Sindroma Paramenstruale përfshin ndryshime humori, fryrje, ngërçe, dhimbje koke dhe dëshira. Zakonisht fillon 1-2 javë para periodës dhe përfundon kur fillon menstruacioni.",
  faqQ6: "Si t'i bëj periodat më pak të dhimbshme?",
  faqA6: "Vendos ngrohje në bark, provo joga të lehtë, pi çaj xhenxhefili ose kamomili, ha ushqime anti-inflamatore, ec dhe praktiko frymëmarrje të thellë.",
  faqQ7: "Çfarë do të thotë PCOS për ciklin tim?",
  faqA7: "Sindroma e Vezores Policistike mund të shkaktojë cikle të parregullta ose të mungojnë, dhe gjakderdhje të rëndë. Modi PCOS rregullon parashikimet për cikle më të gjata e të ndryshueshme.",
  faqQ8: "Si ta di nëse fluksi im është normal?",
  faqA8: "Humbja mesatare e gjakut është 30-40 ml për cikël. Nëse ndërron pad çdo 1-2 orë ose perioda zgjat më shumë se 7 ditë, mund të jetë gjakderdhje e rëndë — konsulto mjekun.",
  faqQ9: "Pse duhet të gjurmoj simptomat?",
  faqA9: "Gjurmimi ndihmon të identifikosh modele, të parashikosh PMS, të komunikosh me mjekun dhe të kuptosh si ndikon cikli në jetën e përditshme.",
  faqQ10: "A mund ta përdor këtë aplikacion për planifikim shtatzënie?",
  faqA10: "Po. Kalo në modin Shtatzëni në kryefaqe — aplikacioni thekson dritaren fertile dhe ditën e ovulimit për të të ndihmuar me momentin e konceptimit.",
};

// Other languages: keep partial translations; missing keys fall back to English.
const partial: Record<Exclude<Language, "en" | "sq">, Partial<TranslationKeys>> = {
  es: {
    navHome: "Inicio", navTips: "Consejos", navAnalytics: "Análisis", navNotes: "Diario", navAbout: "Acerca de", navSettings: "Ajustes", navHydration: "Hidratación", navFaq: "FAQ", menu: "Menú",
    appTitle: "Mi Ciclo", appSubtitle: "Seguimiento del ciclo menstrual",
    days: "días", untilNextCycle: "hasta el próximo ciclo", markFirstCycle: "Marca tu primer ciclo",
    cycle: "Ciclo", day: "Día", nextCycle: "Próximo ciclo", ovulation: "Ovulación",
    calendarTip: "Haz clic en una fecha para marcar el inicio del periodo",
    modeNormal: "Normal", modePregnancy: "Embarazo", modeSymptom: "Síntomas",
    period: "Período", prediction: "Predicción",
    mon: "Lu", tue: "Ma", wed: "Mi", thu: "Ju", fri: "Vi", sat: "Sá", sun: "Do",
    symptoms: "Síntomas", flow: "Flujo", light: "Ligero", medium: "Medio", heavy: "Abundante",
    pain: "Dolor", yes: "Sí", no: "No", mood: "Ánimo", happy: "Feliz", sad: "Triste", irritable: "Irritable",
    energy: "Energía", high: "Alta", low: "Baja", bloating: "Hinchazón", headache: "Dolor de cabeza", cravings: "Antojos",
    none: "Ninguna", tipsTitle: "Consejos de Salud", tipsSubtitle: "Consejos basados en evidencia",
    analyticsTitle: "Análisis", analyticsSubtitle: "Sigue tus patrones y tendencias",
    notesTitle: "Diario", notesSubtitle: "Tus notas privadas", addNote: "Agregar Nota",
    notePlaceholder: "Escribe tus pensamientos...", save: "Guardar", delete: "Eliminar", search: "Buscar...",
    noNotes: "Aún no hay notas",
    aboutTitle: "Acerca de", aboutSubtitle: "Tu compañero de ciclo de confianza", createdBy: "Creado por",
    aboutDescription: "Mi Ciclo es una aplicación integral para el seguimiento del ciclo menstrual.",
    privacyTitle: "Tu Privacidad Importa",
    privacyDescription: "Todos tus datos se almacenan localmente en tu dispositivo.",
    featuresTitle: "Características", version: "Versión", language: "Idioma",
    settingsTitle: "Ajustes", settingsSubtitle: "Personaliza tu experiencia",
    darkMode: "Modo Oscuro", exportData: "Exportar Datos", importData: "Importar Datos",
    resetData: "Restablecer Datos", cancel: "Cancelar", confirm: "Confirmar",
    hydrationTitle: "Hidratación", hydrationSubtitle: "Mantente hidratada durante tu ciclo",
    glasses: "vasos", thisWeek: "Esta Semana", hydrationTipsTitle: "Consejos de Hidratación",
    faqTitle: "Preguntas Frecuentes", faqSubtitle: "Todo lo que necesitas saber sobre tu ciclo",
  },
  fr: {
    navHome: "Accueil", navTips: "Conseils", navAnalytics: "Analyses", navNotes: "Journal", navAbout: "À propos", navSettings: "Paramètres", navHydration: "Hydratation", navFaq: "FAQ", menu: "Menu",
    appTitle: "Mon Cycle", appSubtitle: "Suivi du cycle menstruel",
    days: "jours", untilNextCycle: "jusqu'au prochain cycle", markFirstCycle: "Marquez votre premier cycle",
    cycle: "Cycle", day: "Jour", nextCycle: "Prochain cycle", ovulation: "Ovulation",
    calendarTip: "Cliquez sur une date pour marquer le début des règles",
    modeNormal: "Normal", modePregnancy: "Grossesse", modeSymptom: "Symptômes",
    period: "Règles", prediction: "Prédiction",
    mon: "Lu", tue: "Ma", wed: "Me", thu: "Je", fri: "Ve", sat: "Sa", sun: "Di",
    symptoms: "Symptômes", flow: "Flux", light: "Léger", medium: "Moyen", heavy: "Abondant",
    pain: "Douleur", yes: "Oui", no: "Non", mood: "Humeur", happy: "Heureuse", sad: "Triste", irritable: "Irritable",
    energy: "Énergie", high: "Haute", low: "Basse", bloating: "Ballonnement", headache: "Maux de tête", cravings: "Envies",
    none: "Aucune", tipsTitle: "Conseils Santé", tipsSubtitle: "Conseils basés sur la science",
    analyticsTitle: "Analyses", notesTitle: "Journal", addNote: "Ajouter Note",
    save: "Enregistrer", delete: "Supprimer", search: "Rechercher...",
    aboutTitle: "À propos", createdBy: "Créé par", language: "Langue",
    settingsTitle: "Paramètres", darkMode: "Mode Sombre", exportData: "Exporter",
    cancel: "Annuler", confirm: "Confirmer",
    hydrationTitle: "Hydratation", glasses: "verres", thisWeek: "Cette Semaine",
    faqTitle: "Questions Fréquentes",
  },
  de: {
    navHome: "Start", navTips: "Tipps", navAnalytics: "Analysen", navNotes: "Tagebuch", navAbout: "Über uns", navSettings: "Einstellungen", navHydration: "Hydration", navFaq: "FAQ", menu: "Menü",
    appTitle: "Mein Zyklus", appSubtitle: "Persönlicher Zyklustracker",
    days: "Tage", untilNextCycle: "bis zum nächsten Zyklus", markFirstCycle: "Ersten Zyklus markieren",
    cycle: "Zyklus", day: "Tag", nextCycle: "Nächster Zyklus", ovulation: "Eisprung",
    calendarTip: "Klicke auf ein Datum, um den Periodenbeginn zu markieren",
    modeNormal: "Normal", modePregnancy: "Schwangerschaft", modeSymptom: "Symptome",
    period: "Periode", prediction: "Vorhersage",
    mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So",
    symptoms: "Symptome", flow: "Fluss", light: "Leicht", medium: "Mittel", heavy: "Stark",
    pain: "Schmerzen", yes: "Ja", no: "Nein", mood: "Stimmung", happy: "Glücklich", sad: "Traurig", irritable: "Reizbar",
    energy: "Energie", high: "Hoch", low: "Niedrig", bloating: "Blähungen", headache: "Kopfschmerzen", cravings: "Gelüste",
    none: "Keine", tipsTitle: "Gesundheitstipps", analyticsTitle: "Analysen",
    notesTitle: "Tagebuch", addNote: "Notiz hinzufügen", save: "Speichern", delete: "Löschen", search: "Suchen...",
    aboutTitle: "Über uns", createdBy: "Erstellt von", language: "Sprache",
    settingsTitle: "Einstellungen", darkMode: "Dunkler Modus", exportData: "Daten exportieren",
    cancel: "Abbrechen", confirm: "Bestätigen",
    hydrationTitle: "Hydration", glasses: "Gläser", thisWeek: "Diese Woche",
    faqTitle: "Häufig gestellte Fragen",
  },
  tr: {
    navHome: "Ana Sayfa", navTips: "İpuçları", navAnalytics: "Analizler", navNotes: "Günlük", navAbout: "Hakkında", navSettings: "Ayarlar", navHydration: "Hidrasyon", navFaq: "SSS", menu: "Menü",
    appTitle: "Döngüm", appSubtitle: "Kişisel adet döngüsü takipçisi",
    days: "gün", untilNextCycle: "sonraki döngüye", markFirstCycle: "İlk döngünüzü işaretleyin",
    cycle: "Döngü", day: "Gün", nextCycle: "Sonraki döngü", ovulation: "Yumurtlama",
    calendarTip: "Adet başlangıcını işaretlemek için bir tarihe tıklayın",
    modeNormal: "Normal", modePregnancy: "Hamilelik", modeSymptom: "Semptomlar",
    period: "Adet", prediction: "Tahmin",
    mon: "Pt", tue: "Sa", wed: "Ça", thu: "Pe", fri: "Cu", sat: "Ct", sun: "Pz",
    symptoms: "Semptomlar", flow: "Akış", light: "Hafif", medium: "Orta", heavy: "Yoğun",
    pain: "Ağrı", yes: "Evet", no: "Hayır", mood: "Ruh Hali", happy: "Mutlu", sad: "Üzgün", irritable: "Sinirli",
    energy: "Enerji", high: "Yüksek", low: "Düşük", bloating: "Şişkinlik", headache: "Baş ağrısı", cravings: "İstekler",
    none: "Yok", tipsTitle: "Sağlık İpuçları", analyticsTitle: "Analizler",
    notesTitle: "Günlük", addNote: "Not Ekle", save: "Kaydet", delete: "Sil", search: "Ara...",
    aboutTitle: "Hakkında", createdBy: "Oluşturan", language: "Dil",
    settingsTitle: "Ayarlar", darkMode: "Karanlık Mod", exportData: "Veri Dışa Aktar",
    cancel: "İptal", confirm: "Onayla",
    hydrationTitle: "Hidrasyon", glasses: "bardak", thisWeek: "Bu Hafta",
    faqTitle: "Sık Sorulan Sorular",
  },
  it: {
    navHome: "Home", navTips: "Consigli", navAnalytics: "Analisi", navNotes: "Diario", navAbout: "Info", navSettings: "Impostazioni", navHydration: "Idratazione", navFaq: "FAQ", menu: "Menu",
    appTitle: "Il Mio Ciclo", appSubtitle: "Tracker del ciclo mestruale",
    days: "giorni", untilNextCycle: "al prossimo ciclo", markFirstCycle: "Segna il primo ciclo",
    cycle: "Ciclo", day: "Giorno", nextCycle: "Prossimo ciclo", ovulation: "Ovulazione",
    period: "Mestruazioni", prediction: "Previsione",
    mon: "Lu", tue: "Ma", wed: "Me", thu: "Gi", fri: "Ve", sat: "Sa", sun: "Do",
    symptoms: "Sintomi", flow: "Flusso", light: "Leggero", medium: "Medio", heavy: "Abbondante",
    pain: "Dolore", yes: "Sì", no: "No", mood: "Umore", happy: "Felice", sad: "Triste", irritable: "Irritabile",
    energy: "Energia", high: "Alta", low: "Bassa", bloating: "Gonfiore", headache: "Mal di testa", cravings: "Voglie",
    none: "Nessuno", save: "Salva", delete: "Elimina", search: "Cerca...", language: "Lingua",
    settingsTitle: "Impostazioni", darkMode: "Modalità Scura", cancel: "Annulla", confirm: "Conferma",
    hydrationTitle: "Idratazione", glasses: "bicchieri", faqTitle: "Domande Frequenti",
  },
  pt: {
    navHome: "Início", navTips: "Dicas", navAnalytics: "Análises", navNotes: "Diário", navAbout: "Sobre", navSettings: "Configurações", navHydration: "Hidratação", navFaq: "FAQ", menu: "Menu",
    appTitle: "Meu Ciclo", appSubtitle: "Rastreador do ciclo menstrual",
    days: "dias", untilNextCycle: "até o próximo ciclo", markFirstCycle: "Marque seu primeiro ciclo",
    cycle: "Ciclo", day: "Dia", nextCycle: "Próximo ciclo", ovulation: "Ovulação",
    period: "Período", prediction: "Previsão",
    mon: "Se", tue: "Te", wed: "Qu", thu: "Qu", fri: "Se", sat: "Sá", sun: "Do",
    symptoms: "Sintomas", flow: "Fluxo", light: "Leve", medium: "Médio", heavy: "Intenso",
    pain: "Dor", yes: "Sim", no: "Não", mood: "Humor", happy: "Feliz", sad: "Triste", irritable: "Irritável",
    none: "Nenhum", save: "Salvar", delete: "Excluir", search: "Pesquisar...", language: "Idioma",
    settingsTitle: "Configurações", darkMode: "Modo Escuro", cancel: "Cancelar", confirm: "Confirmar",
    hydrationTitle: "Hidratação", glasses: "copos", faqTitle: "Perguntas Frequentes",
  },
  nl: {
    navHome: "Home", navTips: "Tips", navAnalytics: "Analyses", navNotes: "Dagboek", navAbout: "Over", navSettings: "Instellingen", navHydration: "Hydratatie", navFaq: "FAQ", menu: "Menu",
    appTitle: "Mijn Cyclus", days: "dagen", untilNextCycle: "tot de volgende cyclus",
    cycle: "Cyclus", day: "Dag", period: "Menstruatie", prediction: "Voorspelling", ovulation: "Ovulatie",
    symptoms: "Symptomen", pain: "Pijn", mood: "Stemming", happy: "Blij", sad: "Verdrietig",
    save: "Opslaan", delete: "Verwijderen", search: "Zoeken...", language: "Taal",
    cancel: "Annuleren", confirm: "Bevestigen",
  },
  pl: {
    navHome: "Strona główna", navTips: "Porady", navAnalytics: "Analizy", navNotes: "Dziennik", navAbout: "O nas", navSettings: "Ustawienia", navHydration: "Nawodnienie", navFaq: "FAQ", menu: "Menu",
    appTitle: "Mój Cykl", days: "dni", untilNextCycle: "do następnego cyklu",
    cycle: "Cykl", day: "Dzień", period: "Okres", prediction: "Prognoza", ovulation: "Owulacja",
    symptoms: "Objawy", pain: "Ból", mood: "Nastrój", happy: "Szczęśliwa", sad: "Smutna",
    save: "Zapisz", delete: "Usuń", search: "Szukaj...", language: "Język",
    cancel: "Anuluj", confirm: "Potwierdź",
  },
  ru: {
    navHome: "Главная", navTips: "Советы", navAnalytics: "Аналитика", navNotes: "Дневник", navAbout: "О нас", navSettings: "Настройки", navHydration: "Гидратация", navFaq: "FAQ", menu: "Меню",
    appTitle: "Мой Цикл", appSubtitle: "Трекер менструального цикла",
    days: "дней", untilNextCycle: "до следующего цикла", markFirstCycle: "Отметьте первый цикл",
    cycle: "Цикл", day: "День", nextCycle: "Следующий цикл", ovulation: "Овуляция",
    calendarTip: "Нажмите на дату, чтобы отметить начало менструации",
    modeNormal: "Обычный", modePregnancy: "Беременность", modeSymptom: "Симптомы",
    period: "Менструация", prediction: "Прогноз",
    mon: "Пн", tue: "Вт", wed: "Ср", thu: "Чт", fri: "Пт", sat: "Сб", sun: "Вс",
    symptoms: "Симптомы", flow: "Поток", light: "Лёгкий", medium: "Средний", heavy: "Обильный",
    pain: "Боль", yes: "Да", no: "Нет", mood: "Настроение", happy: "Счастливая", sad: "Грустная", irritable: "Раздражительная",
    energy: "Энергия", high: "Высокая", low: "Низкая", bloating: "Вздутие", headache: "Головная боль", cravings: "Тяга к еде",
    none: "Нет", save: "Сохранить", delete: "Удалить", search: "Поиск...", language: "Язык",
    settingsTitle: "Настройки", darkMode: "Тёмная тема", cancel: "Отмена", confirm: "Подтвердить",
    hydrationTitle: "Гидратация", glasses: "стаканов", faqTitle: "Часто задаваемые вопросы",
  },
  uk: {
    navHome: "Головна", navTips: "Поради", navAnalytics: "Аналітика", navNotes: "Щоденник", navAbout: "Про нас", navSettings: "Налаштування",
    appTitle: "Мій Цикл", days: "днів", cycle: "Цикл", day: "День", period: "Менструація",
    ovulation: "Овуляція", symptoms: "Симптоми", pain: "Біль", mood: "Настрій",
    save: "Зберегти", delete: "Видалити", search: "Пошук...", language: "Мова",
    cancel: "Скасувати", confirm: "Підтвердити",
  },
  cs: {
    navHome: "Domů", navTips: "Tipy", navAnalytics: "Analýzy", navNotes: "Deník", navAbout: "O nás", navSettings: "Nastavení",
    appTitle: "Můj Cyklus", days: "dní", cycle: "Cyklus", day: "Den", period: "Menstruace",
    ovulation: "Ovulace", symptoms: "Příznaky", pain: "Bolest", mood: "Nálada",
    save: "Uložit", delete: "Smazat", language: "Jazyk", cancel: "Zrušit", confirm: "Potvrdit",
  },
  sk: {
    navHome: "Domov", appTitle: "Môj Cyklus", days: "dní", cycle: "Cyklus", day: "Deň",
    period: "Menštruácia", ovulation: "Ovulácia", pain: "Bolesť",
    save: "Uložiť", delete: "Zmazať", language: "Jazyk", cancel: "Zrušiť", confirm: "Potvrdiť",
  },
  hr: {
    navHome: "Početna", appTitle: "Moj Ciklus", days: "dana", cycle: "Ciklus", day: "Dan",
    period: "Menstruacija", ovulation: "Ovulacija", pain: "Bol",
    save: "Spremi", delete: "Obriši", language: "Jezik", cancel: "Odustani", confirm: "Potvrdi",
  },
  sr: {
    navHome: "Почетна", appTitle: "Мој Циклус", days: "дана", cycle: "Циклус", day: "Дан",
    period: "Менструација", ovulation: "Овулација", pain: "Бол",
    save: "Сачувај", delete: "Обриши", language: "Језик", cancel: "Откажи", confirm: "Потврди",
  },
  bg: {
    navHome: "Начало", appTitle: "Моят Цикъл", days: "дни", cycle: "Цикъл", day: "Ден",
    period: "Менструация", ovulation: "Овулация", pain: "Болка",
    save: "Запази", delete: "Изтрий", language: "Език", cancel: "Отказ", confirm: "Потвърди",
  },
  ro: {
    navHome: "Acasă", appTitle: "Ciclul Meu", days: "zile", cycle: "Ciclu", day: "Zi",
    period: "Menstruație", ovulation: "Ovulație", pain: "Durere",
    save: "Salvare", delete: "Șterge", language: "Limbă", cancel: "Anulare", confirm: "Confirmă",
  },
  hu: {
    navHome: "Főoldal", appTitle: "Ciklusom", days: "nap", cycle: "Ciklus", day: "Nap",
    period: "Menstruáció", ovulation: "Ovuláció", pain: "Fájdalom",
    save: "Mentés", delete: "Törlés", language: "Nyelv", cancel: "Mégse", confirm: "Megerősít",
  },
  el: {
    navHome: "Αρχική", appTitle: "Ο Κύκλος Μου", days: "ημέρες", cycle: "Κύκλος", day: "Ημέρα",
    period: "Περίοδος", ovulation: "Ωορρηξία", pain: "Πόνος",
    save: "Αποθήκευση", delete: "Διαγραφή", language: "Γλώσσα", cancel: "Άκυρο", confirm: "Επιβεβαίωση",
  },
  sv: {
    navHome: "Hem", appTitle: "Min Cykel", days: "dagar", cycle: "Cykel", day: "Dag",
    period: "Mens", ovulation: "Ägglossning", pain: "Smärta",
    save: "Spara", delete: "Radera", language: "Språk", cancel: "Avbryt", confirm: "Bekräfta",
  },
  da: {
    navHome: "Hjem", appTitle: "Min Cyklus", days: "dage", cycle: "Cyklus", day: "Dag",
    period: "Menstruation", ovulation: "Ægløsning", pain: "Smerte",
    save: "Gem", delete: "Slet", language: "Sprog", cancel: "Annuller", confirm: "Bekræft",
  },
  no: {
    navHome: "Hjem", appTitle: "Min Syklus", days: "dager", cycle: "Syklus", day: "Dag",
    period: "Menstruasjon", ovulation: "Eggløsning", pain: "Smerte",
    save: "Lagre", delete: "Slett", language: "Språk", cancel: "Avbryt", confirm: "Bekreft",
  },
  fi: {
    navHome: "Koti", appTitle: "Syklini", days: "päivää", cycle: "Sykli", day: "Päivä",
    period: "Kuukautiset", ovulation: "Ovulaatio", pain: "Kipu",
    save: "Tallenna", delete: "Poista", language: "Kieli", cancel: "Peruuta", confirm: "Vahvista",
  },
  et: {
    navHome: "Avaleht", appTitle: "Minu Tsükkel", days: "päeva", cycle: "Tsükkel", day: "Päev",
    period: "Menstruatsioon", ovulation: "Ovulatsioon", pain: "Valu",
    save: "Salvesta", delete: "Kustuta", language: "Keel", cancel: "Tühista", confirm: "Kinnita",
  },
  lv: {
    navHome: "Sākums", appTitle: "Mans Cikls", days: "dienas", cycle: "Cikls", day: "Diena",
    period: "Menstruācija", ovulation: "Ovulācija", pain: "Sāpes",
    save: "Saglabāt", delete: "Dzēst", language: "Valoda", cancel: "Atcelt", confirm: "Apstiprināt",
  },
  lt: {
    navHome: "Pradžia", appTitle: "Mano Ciklas", days: "dienos", cycle: "Ciklas", day: "Diena",
    period: "Menstruacija", ovulation: "Ovuliacija", pain: "Skausmas",
    save: "Išsaugoti", delete: "Ištrinti", language: "Kalba", cancel: "Atšaukti", confirm: "Patvirtinti",
  },
  sl: {
    navHome: "Domov", appTitle: "Moj Cikel", days: "dni", cycle: "Cikel", day: "Dan",
    period: "Menstruacija", ovulation: "Ovulacija", pain: "Bolečina",
    save: "Shrani", delete: "Izbriši", language: "Jezik", cancel: "Prekliči", confirm: "Potrdi",
  },
  mk: {
    navHome: "Почетна", appTitle: "Мој Циклус", days: "денови", cycle: "Циклус", day: "Ден",
    period: "Менструација", ovulation: "Овулација", pain: "Болка",
    save: "Зачувај", delete: "Избриши", language: "Јазик", cancel: "Откажи", confirm: "Потврди",
  },
  bs: {
    navHome: "Početna", appTitle: "Moj Ciklus", days: "dana", cycle: "Ciklus", day: "Dan",
    period: "Menstruacija", ovulation: "Ovulacija", pain: "Bol",
    save: "Spremi", delete: "Obriši", language: "Jezik", cancel: "Otkaži", confirm: "Potvrdi",
  },
  ar: {
    navHome: "الرئيسية", navTips: "نصائح", navAnalytics: "تحليلات", navNotes: "المذكرات", navAbout: "حول", navSettings: "الإعدادات", navHydration: "الترطيب", navFaq: "الأسئلة", menu: "القائمة",
    appTitle: "دورتي", appSubtitle: "متتبع الدورة الشهرية",
    days: "أيام", untilNextCycle: "حتى الدورة القادمة", markFirstCycle: "حددي دورتك الأولى",
    cycle: "الدورة", day: "يوم", nextCycle: "الدورة القادمة", ovulation: "الإباضة",
    period: "الحيض", prediction: "التوقع",
    symptoms: "الأعراض", flow: "التدفق", light: "خفيف", medium: "متوسط", heavy: "غزير",
    pain: "الألم", yes: "نعم", no: "لا", mood: "المزاج", happy: "سعيدة", sad: "حزينة", irritable: "متهيجة",
    energy: "الطاقة", bloating: "انتفاخ", headache: "صداع", cravings: "اشتهاء",
    save: "حفظ", delete: "حذف", search: "بحث...", language: "اللغة",
    cancel: "إلغاء", confirm: "تأكيد",
    hydrationTitle: "الترطيب", glasses: "أكواب", faqTitle: "الأسئلة الشائعة",
  },
  fa: {
    navHome: "خانه", appTitle: "دوره من", days: "روز", cycle: "دوره", day: "روز",
    period: "قاعدگی", ovulation: "تخمک‌گذاری", pain: "درد",
    save: "ذخیره", delete: "حذف", language: "زبان", cancel: "لغو", confirm: "تایید",
  },
  hi: {
    navHome: "होम", navTips: "सुझाव", navAnalytics: "विश्लेषण", navNotes: "डायरी", navAbout: "के बारे में", navSettings: "सेटिंग्स",
    appTitle: "मेरा चक्र", days: "दिन", cycle: "चक्र", day: "दिन",
    period: "मासिक धर्म", ovulation: "ओव्यूलेशन", pain: "दर्द",
    symptoms: "लक्षण", mood: "मनोदशा", happy: "खुश", sad: "उदास",
    save: "सहेजें", delete: "मिटाएं", language: "भाषा", cancel: "रद्द करें", confirm: "पुष्टि करें",
  },
  bn: {
    navHome: "হোম", appTitle: "আমার চক্র", days: "দিন", cycle: "চক্র", day: "দিন",
    period: "ঋতুস্রাব", ovulation: "ডিম্বস্ফোটন", pain: "ব্যথা",
    save: "সংরক্ষণ", delete: "মুছুন", language: "ভাষা", cancel: "বাতিল", confirm: "নিশ্চিত করুন",
  },
  ur: {
    navHome: "ہوم", appTitle: "میرا سائیکل", days: "دن", cycle: "سائیکل", day: "دن",
    period: "ماہواری", ovulation: "بیضہ دانی", pain: "درد",
    save: "محفوظ کریں", delete: "حذف کریں", language: "زبان", cancel: "منسوخ", confirm: "تصدیق",
  },
  zh: {
    navHome: "首页", navTips: "健康建议", navAnalytics: "数据分析", navNotes: "日记", navAbout: "关于", navSettings: "设置", navHydration: "补水", navFaq: "常见问题", menu: "菜单",
    appTitle: "我的周期", appSubtitle: "个人月经周期追踪器",
    days: "天", untilNextCycle: "距下次月经", markFirstCycle: "标记第一个周期",
    cycle: "周期", day: "天", nextCycle: "下次月经", ovulation: "排卵",
    calendarTip: "点击日期标记月经开始",
    modeNormal: "普通", modePregnancy: "备孕", modeSymptom: "症状",
    period: "月经", prediction: "预测",
    mon: "一", tue: "二", wed: "三", thu: "四", fri: "五", sat: "六", sun: "日",
    symptoms: "症状", flow: "流量", light: "轻量", medium: "中等", heavy: "大量",
    pain: "疼痛", yes: "是", no: "否", mood: "情绪", happy: "开心", sad: "难过", irritable: "烦躁",
    energy: "精力", high: "高", low: "低", bloating: "腹胀", headache: "头痛", cravings: "食欲",
    none: "无", save: "保存", delete: "删除", search: "搜索...", language: "语言",
    settingsTitle: "设置", darkMode: "深色模式", cancel: "取消", confirm: "确认",
    hydrationTitle: "补水", glasses: "杯", thisWeek: "本周", faqTitle: "常见问题",
  },
  ja: {
    navHome: "ホーム", navTips: "ヒント", navAnalytics: "分析", navNotes: "日記", navAbout: "情報", navSettings: "設定", navHydration: "水分補給", navFaq: "FAQ", menu: "メニュー",
    appTitle: "マイサイクル", appSubtitle: "月経周期トラッカー",
    days: "日", untilNextCycle: "次の周期まで", cycle: "周期", day: "日",
    period: "月経", prediction: "予測", ovulation: "排卵",
    mon: "月", tue: "火", wed: "水", thu: "木", fri: "金", sat: "土", sun: "日",
    symptoms: "症状", pain: "痛み", mood: "気分", happy: "嬉しい", sad: "悲しい",
    save: "保存", delete: "削除", search: "検索...", language: "言語",
    cancel: "キャンセル", confirm: "確認", hydrationTitle: "水分補給", glasses: "杯",
  },
  ko: {
    navHome: "홈", navTips: "건강 팁", navAnalytics: "분석", navNotes: "일기", navAbout: "정보", navSettings: "설정", navHydration: "수분", navFaq: "FAQ", menu: "메뉴",
    appTitle: "나의 주기", appSubtitle: "월경 주기 추적기",
    days: "일", untilNextCycle: "다음 주기까지", cycle: "주기", day: "일",
    period: "월경", prediction: "예측", ovulation: "배란",
    symptoms: "증상", pain: "통증", mood: "기분", happy: "행복", sad: "슬픔",
    save: "저장", delete: "삭제", search: "검색...", language: "언어",
    cancel: "취소", confirm: "확인",
  },
  th: {
    navHome: "หน้าแรก", appTitle: "รอบเดือนของฉัน", days: "วัน", cycle: "รอบ", day: "วัน",
    period: "ประจำเดือน", ovulation: "ตกไข่", pain: "ปวด",
    save: "บันทึก", delete: "ลบ", language: "ภาษา", cancel: "ยกเลิก", confirm: "ยืนยัน",
  },
  vi: {
    navHome: "Trang chủ", appTitle: "Chu Kỳ Của Tôi", days: "ngày", cycle: "Chu kỳ", day: "Ngày",
    period: "Kinh nguyệt", ovulation: "Rụng trứng", pain: "Đau",
    save: "Lưu", delete: "Xóa", language: "Ngôn ngữ", cancel: "Hủy", confirm: "Xác nhận",
  },
  id: {
    navHome: "Beranda", appTitle: "Siklus Saya", days: "hari", cycle: "Siklus", day: "Hari",
    period: "Menstruasi", ovulation: "Ovulasi", pain: "Nyeri",
    save: "Simpan", delete: "Hapus", language: "Bahasa", cancel: "Batal", confirm: "Konfirmasi",
  },
  ms: {
    navHome: "Laman Utama", appTitle: "Kitaran Saya", days: "hari", cycle: "Kitaran", day: "Hari",
    period: "Haid", ovulation: "Ovulasi", pain: "Sakit",
    save: "Simpan", delete: "Padam", language: "Bahasa", cancel: "Batal", confirm: "Sahkan",
  },
  tl: {
    navHome: "Home", appTitle: "Aking Siklo", days: "araw", cycle: "Siklo", day: "Araw",
    period: "Regla", ovulation: "Ovulasyon", pain: "Sakit",
    save: "I-save", delete: "Burahin", language: "Wika", cancel: "Kanselahin", confirm: "Kumpirmahin",
  },
  sw: {
    navHome: "Nyumbani", appTitle: "Mzunguko Wangu", days: "siku", cycle: "Mzunguko", day: "Siku",
    period: "Hedhi", ovulation: "Ovulation", pain: "Maumivu",
    save: "Hifadhi", delete: "Futa", language: "Lugha", cancel: "Ghairi", confirm: "Thibitisha",
  },
  am: {
    navHome: "መነሻ", appTitle: "የእኔ ዑደት", days: "ቀናት", cycle: "ዑደት", day: "ቀን",
    period: "ወር አበባ", pain: "ህመም", save: "አስቀምጥ", delete: "ሰርዝ", language: "ቋንቋ",
  },
  he: {
    navHome: "ראשי", appTitle: "המחזור שלי", days: "ימים", cycle: "מחזור", day: "יום",
    period: "מחזור", ovulation: "ביוץ", pain: "כאב",
    save: "שמור", delete: "מחק", language: "שפה", cancel: "בטל", confirm: "אשר",
  },
  ka: {
    navHome: "მთავარი", appTitle: "ჩემი ციკლი", days: "დღე", cycle: "ციკლი", day: "დღე",
    period: "მენსტრუაცია", pain: "ტკივილი", save: "შენახვა", delete: "წაშლა", language: "ენა",
  },
  hy: {
    navHome: "Գլխավոր", appTitle: "Իմ Ցիկլը", days: "օր", cycle: "Ցիկլ", day: "Օր",
    period: "Դաշտան", pain: "Ցավ", save: "Պահպանել", delete: "Ջնջել", language: "Լեզու",
  },
  az: {
    navHome: "Ana səhifə", appTitle: "Mənim Dövrüm", days: "gün", cycle: "Dövr", day: "Gün",
    period: "Menstruasiya", ovulation: "Ovulyasiya", pain: "Ağrı",
    save: "Saxla", delete: "Sil", language: "Dil", cancel: "Ləğv et", confirm: "Təsdiqlə",
  },
  uz: {
    navHome: "Bosh sahifa", appTitle: "Mening Siklim", days: "kun", cycle: "Sikl", day: "Kun",
    period: "Hayz", pain: "Ogʻriq", save: "Saqlash", delete: "Oʻchirish", language: "Til",
  },
  kk: {
    navHome: "Басты", appTitle: "Менің Циклім", days: "күн", cycle: "Цикл", day: "Күн",
    period: "Етеккір", pain: "Ауырсыну", save: "Сақтау", delete: "Жою", language: "Тіл",
  },
  mn: {
    navHome: "Нүүр", appTitle: "Миний Мөчлөг", days: "өдөр", cycle: "Мөчлөг", day: "Өдөр",
    period: "Сарын тэмдэг", pain: "Өвдөлт", save: "Хадгалах", delete: "Устгах", language: "Хэл",
  },
  ne: {
    navHome: "गृहपृष्ठ", appTitle: "मेरो चक्र", days: "दिन", cycle: "चक्र", day: "दिन",
    period: "महावारी", pain: "दुखाइ", save: "बचत गर्नुहोस्", delete: "मेटाउनुहोस्", language: "भाषा",
  },
  si: {
    navHome: "මුල් පිටුව", appTitle: "මගේ චක්‍රය", days: "දින", cycle: "චක්‍රය", day: "දිනය",
    period: "ඔසප්", pain: "වේදනාව", save: "සුරකින්න", delete: "මකන්න", language: "භාෂාව",
  },
  my: {
    navHome: "ပင်မ", appTitle: "ကျွန်မရဲ့ သံသရာ", days: "ရက်", cycle: "သံသရာ", day: "ရက်",
    period: "လစဉ်", pain: "နာကျင်မှု", save: "သိမ်းဆည်း", delete: "ဖျက်", language: "ဘာသာ",
  },
  km: {
    navHome: "ទំព័រដើម", appTitle: "វដ្តរបស់ខ្ញុំ", days: "ថ្ងៃ", cycle: "វដ្ត", day: "ថ្ងៃ",
    period: "រដូវ", pain: "ឈឺចាប់", save: "រក្សាទុក", delete: "លុប", language: "ភាសា",
  },
};

// Compose translations: en is full, sq is full, others merge with English fallback
function getTranslation(lang: Language): TranslationKeys {
  if (lang === "en") return en;
  if (lang === "sq") return sq;
  return { ...en, ...partial[lang] };
}

// Language groups for organized display
export const languageGroups = {
  popular: ["en", "sq", "es", "fr", "de", "it", "pt", "tr", "ru", "zh", "ja", "ko", "ar", "hi"] as Language[],
  european: ["nl", "pl", "cs", "sk", "hu", "ro", "bg", "hr", "sr", "sl", "mk", "bs", "el", "uk", "sv", "da", "no", "fi", "et", "lv", "lt"] as Language[],
  asian: ["bn", "th", "vi", "id", "ms", "tl", "ne", "si", "my", "km", "mn"] as Language[],
  middleEast: ["fa", "ur", "he", "ka", "hy", "az", "uz", "kk"] as Language[],
  african: ["sw", "am"] as Language[],
};

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextValue | null>(null);
const LANG_STORAGE_KEY = "period-tracker-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved && saved in languageNames) return saved as Language;
    } catch { /* ignore */ }
    return "en";
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try { localStorage.setItem(LANG_STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const t = getTranslation(lang);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
