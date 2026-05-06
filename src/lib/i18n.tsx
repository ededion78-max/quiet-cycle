/**
 * i18n - Multi-language support
 * Supports: English (default), Albanian, Spanish, French, German, Turkish
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language = "en" | "sq" | "es" | "fr" | "de" | "tr";

export const languageNames: Record<Language, string> = {
  en: "English",
  sq: "Shqip",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  tr: "Türkçe",
};

type TranslationKeys = {
  // Navigation
  navHome: string;
  navTips: string;
  navAnalytics: string;
  navNotes: string;
  navAbout: string;

  // Home
  appTitle: string;
  appSubtitle: string;
  days: string;
  untilNextCycle: string;
  markFirstCycle: string;
  cycle: string;
  day: string;
  nextCycle: string;
  ovulation: string;
  calendarTip: string;

  // Tracking modes
  modeNormal: string;
  modePregnancy: string;
  modeSymptom: string;

  // Calendar
  period: string;
  prediction: string;
  mon: string; tue: string; wed: string; thu: string; fri: string; sat: string; sun: string;

  // Symptoms
  symptoms: string;
  flow: string;
  light: string;
  medium: string;
  heavy: string;
  pain: string;
  yes: string;
  no: string;
  mood: string;
  happy: string;
  sad: string;
  irritable: string;
  energy: string;
  high: string;
  low: string;
  bloating: string;
  headache: string;
  cravings: string;

  // Conditions
  conditions: string;
  pcos: string;
  endometriosis: string;
  none: string;

  // Tips page
  tipsTitle: string;
  tipsSubtitle: string;
  tipsPainRelief: string;
  tipsPainReliefDesc: string;
  tipsPositions: string;
  tipsPositionsDesc: string;
  tipsFood: string;
  tipsFoodDesc: string;
  tipsDrinks: string;
  tipsDrinksDesc: string;
  tipsAvoid: string;
  tipsAvoidDesc: string;
  tipsExercise: string;
  tipsExerciseDesc: string;
  tipsRelaxation: string;
  tipsRelaxationDesc: string;
  tipsCyclePhases: string;
  tipsCyclePhasesDesc: string;

  // Analytics
  analyticsTitle: string;
  analyticsSubtitle: string;
  cycleLengthTrend: string;
  avgCycleLength: string;
  totalCyclesLogged: string;
  symptomFrequency: string;
  noDataYet: string;

  // Notes
  notesTitle: string;
  notesSubtitle: string;
  addNote: string;
  notePlaceholder: string;
  save: string;
  delete: string;
  search: string;
  noNotes: string;

  // About
  aboutTitle: string;
  aboutSubtitle: string;
  createdBy: string;
  aboutDescription: string;
  privacyTitle: string;
  privacyDescription: string;
  featuresTitle: string;
  version: string;

  // Language
  language: string;
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    navHome: "Home",
    navTips: "Health Tips",
    navAnalytics: "Analytics",
    navNotes: "Journal",
    navAbout: "About",
    appTitle: "My Cycle",
    appSubtitle: "Personal menstrual cycle tracker",
    days: "days",
    untilNextCycle: "until next cycle",
    markFirstCycle: "Mark your first cycle",
    cycle: "Cycle",
    day: "Day",
    nextCycle: "Next cycle",
    ovulation: "Ovulation",
    calendarTip: "Click on a date to mark the start of your period",
    modeNormal: "Normal Tracking",
    modePregnancy: "Pregnancy Planning",
    modeSymptom: "Symptom Management",
    period: "Period",
    prediction: "Prediction",
    mon: "Mo", tue: "Tu", wed: "We", thu: "Th", fri: "Fr", sat: "Sa", sun: "Su",
    symptoms: "Symptoms",
    flow: "Flow",
    light: "Light",
    medium: "Medium",
    heavy: "Heavy",
    pain: "Pain",
    yes: "Yes",
    no: "No",
    mood: "Mood",
    happy: "Happy",
    sad: "Sad",
    irritable: "Irritable",
    energy: "Energy",
    high: "High",
    low: "Low",
    bloating: "Bloating",
    headache: "Headache",
    cravings: "Cravings",
    conditions: "Conditions",
    pcos: "PCOS",
    endometriosis: "Endometriosis",
    none: "None",
    tipsTitle: "Health Tips",
    tipsSubtitle: "Evidence-based advice for your well-being",
    tipsPainRelief: "Pain Relief",
    tipsPainReliefDesc: "Apply a warm heating pad to your lower abdomen or lower back. Take warm baths. Gentle massage in circular motions on your belly can also help relieve cramping.",
    tipsPositions: "Comfortable Positions",
    tipsPositionsDesc: "Fetal position (lying on your side with knees pulled up) reduces pressure on abdominal muscles. Child's pose in yoga stretches the lower back. Lying face down with a pillow under your hips can ease cramps.",
    tipsFood: "What to Eat",
    tipsFoodDesc: "Iron-rich foods: spinach, lentils, red meat. Anti-inflammatory foods: salmon, berries, leafy greens, turmeric. Magnesium-rich: dark chocolate, bananas, avocados. Whole grains and fiber-rich foods.",
    tipsDrinks: "What to Drink",
    tipsDrinksDesc: "Stay hydrated with water. Ginger tea reduces nausea and cramps. Chamomile tea has anti-inflammatory properties. Peppermint tea eases bloating. Warm lemon water helps with digestion.",
    tipsAvoid: "What to Avoid",
    tipsAvoidDesc: "Limit caffeine (can worsen cramps). Reduce salt intake (causes water retention). Avoid processed sugars (increases inflammation). Limit alcohol (can worsen mood swings and dehydration).",
    tipsExercise: "Gentle Exercise",
    tipsExerciseDesc: "Light walking improves blood flow. Yoga poses like cat-cow and supine twist help. Swimming reduces cramp pain. Stretching the hips and lower back provides relief.",
    tipsRelaxation: "Relaxation Techniques",
    tipsRelaxationDesc: "Deep breathing exercises (4-7-8 method). Progressive muscle relaxation. Meditation and mindfulness. Aromatherapy with lavender or clary sage essential oils.",
    tipsCyclePhases: "Understanding Your Cycle Phases",
    tipsCyclePhasesDesc: "Menstrual (Days 1-5): Rest and nourish. Follicular (Days 6-13): Energy rises, great for planning. Ovulation (Day 14): Peak energy and fertility. Luteal (Days 15-28): Wind down, practice self-care.",
    analyticsTitle: "Analytics",
    analyticsSubtitle: "Track your patterns and trends",
    cycleLengthTrend: "Cycle Length Trend",
    avgCycleLength: "Average Cycle Length",
    totalCyclesLogged: "Total Cycles Logged",
    symptomFrequency: "Symptom Frequency",
    noDataYet: "Start tracking to see your analytics",
    notesTitle: "Journal",
    notesSubtitle: "Your private notes and reflections",
    addNote: "Add Note",
    notePlaceholder: "Write your thoughts, symptoms, or anything you want to remember...",
    save: "Save",
    delete: "Delete",
    search: "Search notes...",
    noNotes: "No notes yet. Start journaling to track your thoughts!",
    aboutTitle: "About",
    aboutSubtitle: "Your trusted cycle companion",
    createdBy: "Created by",
    aboutDescription: "My Cycle is a comprehensive menstrual cycle tracking application designed to help you understand your body better. Track your periods, symptoms, moods, and more with complete privacy.",
    privacyTitle: "Your Privacy Matters",
    privacyDescription: "All your data is stored locally on your device. Nothing is sent to any server. Your health information stays private and secure.",
    featuresTitle: "Features",
    version: "Version",
    language: "Language",
  },
  sq: {
    navHome: "Kryefaqja",
    navTips: "Këshilla",
    navAnalytics: "Analiza",
    navNotes: "Ditari",
    navAbout: "Rreth Nesh",
    appTitle: "Cikli Im",
    appSubtitle: "Ndjekësi personal i ciklit menstrual",
    days: "ditë",
    untilNextCycle: "deri në ciklin tjetër",
    markFirstCycle: "Shëno ciklin tënd të parë",
    cycle: "Cikli",
    day: "Dita",
    nextCycle: "Cikli i ardhshëm",
    ovulation: "Ovulimi",
    calendarTip: "Kliko mbi një datë për të shënuar fillimin e periodës",
    modeNormal: "Gjurmim Normal",
    modePregnancy: "Planifikim Shtatzënie",
    modeSymptom: "Menaxhim Simptomash",
    period: "Perioda",
    prediction: "Parashikim",
    mon: "Hë", tue: "Ma", wed: "Më", thu: "En", fri: "Pr", sat: "Sh", sun: "Di",
    symptoms: "Simptomat",
    flow: "Fluksi",
    light: "Lehtë",
    medium: "Mesatar",
    heavy: "I rëndë",
    pain: "Dhimbje",
    yes: "Po",
    no: "Jo",
    mood: "Humori",
    happy: "I lumtur",
    sad: "I trishtuar",
    irritable: "I irrituar",
    energy: "Energjia",
    high: "Lartë",
    low: "Ulët",
    bloating: "Fryrje",
    headache: "Dhimbje koke",
    cravings: "Dëshira",
    conditions: "Kushte",
    pcos: "PCOS",
    endometriosis: "Endometrioza",
    none: "Asnjë",
    tipsTitle: "Këshilla Shëndetësore",
    tipsSubtitle: "Këshilla të bazuara në shkencë për mirëqenien tuaj",
    tipsPainRelief: "Lehtësimi i Dhimbjes",
    tipsPainReliefDesc: "Vendosni një ngrohëse të ngrohtë në bark ose në shpinë. Bëni banja të ngrohta. Masazhi i butë me lëvizje rrethore në bark gjithashtu ndihmon në lehtësimin e krampeve.",
    tipsPositions: "Pozicionet e Rehatshme",
    tipsPositionsDesc: "Pozicioni fetal (e shtrirë në krahë me gjunjë të tërhequra) ul presionin në muskujt e barkut. Pozicioni i fëmijës në joga shtrin shpinën. E shtrirë me fytyrë poshtë me jastëk nën bel lehtëson krampet.",
    tipsFood: "Çfarë të Hani",
    tipsFoodDesc: "Ushqime të pasura me hekur: spinaq, thjerrëza, mish i kuq. Ushqime anti-inflamatore: salmon, boronica, perime me gjethe. Magnez: çokollatë e zezë, banane, avokado.",
    tipsDrinks: "Çfarë të Pini",
    tipsDrinksDesc: "Pini shumë ujë. Çaji i xhenxhefilit ul nauzenë dhe krampet. Çaji i kamomilit ka veti anti-inflamatore. Çaji i mentës lehtëson fryrjen. Uji i ngrohtë me limon ndihmon tretjen.",
    tipsAvoid: "Çfarë të Shmangni",
    tipsAvoidDesc: "Kufizoni kafeinën (mund të përkeqësojë krampet). Ulni kripën (shkakton mbajtje uji). Shmangni sheqerin e përpunuar (rrit inflamacionin). Kufizoni alkoolin.",
    tipsExercise: "Ushtrime të Lehta",
    tipsExerciseDesc: "Ecja e lehtë përmirëson qarkullimin e gjakut. Pozicionet e jogës si macja-lopa ndihmojnë. Noti ul dhimbjen e krampeve. Shtrimet e brezit dhe shpinës japin lehtësim.",
    tipsRelaxation: "Teknika Relaksimi",
    tipsRelaxationDesc: "Ushtrime frymëmarrjeje (metoda 4-7-8). Relaksim progresiv i muskujve. Meditim dhe ndërgjegjësim. Aromaterapi me vajra esenciale lavandre.",
    tipsCyclePhases: "Fazat e Ciklit Tuaj",
    tipsCyclePhasesDesc: "Menstruale (Ditët 1-5): Pushim. Folikulare (Ditët 6-13): Energjia rritet. Ovulimi (Dita 14): Energji maksimale. Luteale (Ditët 15-28): Kujdes për veten.",
    analyticsTitle: "Analiza",
    analyticsSubtitle: "Ndiqni trendet dhe modelet tuaja",
    cycleLengthTrend: "Trendi i Gjatësisë së Ciklit",
    avgCycleLength: "Gjatësia Mesatare e Ciklit",
    totalCyclesLogged: "Total Cikle të Regjistruara",
    symptomFrequency: "Frekuenca e Simptomave",
    noDataYet: "Filloni gjurmimin për të parë analizat",
    notesTitle: "Ditari",
    notesSubtitle: "Shënimet dhe reflektimet tuaja private",
    addNote: "Shto Shënim",
    notePlaceholder: "Shkruani mendimet, simptomat, ose çdo gjë që doni të mbani mend...",
    save: "Ruaj",
    delete: "Fshi",
    search: "Kërko shënime...",
    noNotes: "Nuk ka shënime. Filloni të shkruani ditarin tuaj!",
    aboutTitle: "Rreth Nesh",
    aboutSubtitle: "Shoqëruesi juaj i besuar i ciklit",
    createdBy: "Krijuar nga",
    aboutDescription: "Cikli Im është një aplikacion gjithëpërfshirës për gjurmimin e ciklit menstrual i dizajnuar për t'ju ndihmuar të kuptoni trupin tuaj më mirë. Gjurmoni periodat, simptomat, humorin dhe më shumë me privatësi të plotë.",
    privacyTitle: "Privatësia Juaj ka Rëndësi",
    privacyDescription: "Të gjitha të dhënat tuaja ruhen lokalisht në pajisjen tuaj. Asgjë nuk dërgohet në asnjë server. Informacioni juaj shëndetësor mbetet privat dhe i sigurt.",
    featuresTitle: "Veçoritë",
    version: "Versioni",
    language: "Gjuha",
  },
  es: {
    navHome: "Inicio",
    navTips: "Consejos",
    navAnalytics: "Análisis",
    navNotes: "Diario",
    navAbout: "Acerca de",
    appTitle: "Mi Ciclo",
    appSubtitle: "Seguimiento personal del ciclo menstrual",
    days: "días",
    untilNextCycle: "hasta el próximo ciclo",
    markFirstCycle: "Marca tu primer ciclo",
    cycle: "Ciclo",
    day: "Día",
    nextCycle: "Próximo ciclo",
    ovulation: "Ovulación",
    calendarTip: "Haz clic en una fecha para marcar el inicio de tu período",
    modeNormal: "Seguimiento Normal",
    modePregnancy: "Planificación de Embarazo",
    modeSymptom: "Gestión de Síntomas",
    period: "Período",
    prediction: "Predicción",
    mon: "Lu", tue: "Ma", wed: "Mi", thu: "Ju", fri: "Vi", sat: "Sá", sun: "Do",
    symptoms: "Síntomas",
    flow: "Flujo",
    light: "Ligero",
    medium: "Medio",
    heavy: "Abundante",
    pain: "Dolor",
    yes: "Sí",
    no: "No",
    mood: "Ánimo",
    happy: "Feliz",
    sad: "Triste",
    irritable: "Irritable",
    energy: "Energía",
    high: "Alta",
    low: "Baja",
    bloating: "Hinchazón",
    headache: "Dolor de cabeza",
    cravings: "Antojos",
    conditions: "Condiciones",
    pcos: "SOP",
    endometriosis: "Endometriosis",
    none: "Ninguna",
    tipsTitle: "Consejos de Salud",
    tipsSubtitle: "Consejos basados en evidencia para tu bienestar",
    tipsPainRelief: "Alivio del Dolor",
    tipsPainReliefDesc: "Aplica una almohadilla térmica en el abdomen bajo o espalda baja. Toma baños calientes. El masaje suave con movimientos circulares también ayuda.",
    tipsPositions: "Posiciones Cómodas",
    tipsPositionsDesc: "Posición fetal (de lado con rodillas recogidas). Postura del niño en yoga. Boca abajo con almohada bajo las caderas.",
    tipsFood: "Qué Comer",
    tipsFoodDesc: "Alimentos ricos en hierro: espinacas, lentejas, carne roja. Anti-inflamatorios: salmón, frutos rojos, verduras de hoja verde. Magnesio: chocolate oscuro, plátanos, aguacates.",
    tipsDrinks: "Qué Beber",
    tipsDrinksDesc: "Mantente hidratada. Té de jengibre para náuseas. Té de manzanilla anti-inflamatorio. Té de menta para hinchazón. Agua tibia con limón.",
    tipsAvoid: "Qué Evitar",
    tipsAvoidDesc: "Limita cafeína, sal, azúcar procesada y alcohol.",
    tipsExercise: "Ejercicio Suave",
    tipsExerciseDesc: "Caminar ligero. Yoga. Natación. Estiramientos de cadera y espalda baja.",
    tipsRelaxation: "Técnicas de Relajación",
    tipsRelaxationDesc: "Ejercicios de respiración. Relajación muscular progresiva. Meditación. Aromaterapia con lavanda.",
    tipsCyclePhases: "Fases del Ciclo",
    tipsCyclePhasesDesc: "Menstrual (Días 1-5): Descanso. Folicular (Días 6-13): Energía en aumento. Ovulación (Día 14): Máxima energía. Lútea (Días 15-28): Autocuidado.",
    analyticsTitle: "Análisis",
    analyticsSubtitle: "Rastrea tus patrones y tendencias",
    cycleLengthTrend: "Tendencia de Duración del Ciclo",
    avgCycleLength: "Duración Promedio del Ciclo",
    totalCyclesLogged: "Total de Ciclos Registrados",
    symptomFrequency: "Frecuencia de Síntomas",
    noDataYet: "Comienza a rastrear para ver análisis",
    notesTitle: "Diario",
    notesSubtitle: "Tus notas y reflexiones privadas",
    addNote: "Agregar Nota",
    notePlaceholder: "Escribe tus pensamientos, síntomas o lo que quieras recordar...",
    save: "Guardar",
    delete: "Eliminar",
    search: "Buscar notas...",
    noNotes: "Sin notas aún. ¡Comienza a escribir tu diario!",
    aboutTitle: "Acerca de",
    aboutSubtitle: "Tu compañero de ciclo de confianza",
    createdBy: "Creado por",
    aboutDescription: "Mi Ciclo es una aplicación completa de seguimiento del ciclo menstrual diseñada para ayudarte a entender mejor tu cuerpo.",
    privacyTitle: "Tu Privacidad Importa",
    privacyDescription: "Todos tus datos se almacenan localmente en tu dispositivo. Nada se envía a ningún servidor.",
    featuresTitle: "Características",
    version: "Versión",
    language: "Idioma",
  },
  fr: {
    navHome: "Accueil",
    navTips: "Conseils",
    navAnalytics: "Analyses",
    navNotes: "Journal",
    navAbout: "À propos",
    appTitle: "Mon Cycle",
    appSubtitle: "Suivi personnel du cycle menstruel",
    days: "jours",
    untilNextCycle: "jusqu'au prochain cycle",
    markFirstCycle: "Marquez votre premier cycle",
    cycle: "Cycle",
    day: "Jour",
    nextCycle: "Prochain cycle",
    ovulation: "Ovulation",
    calendarTip: "Cliquez sur une date pour marquer le début de vos règles",
    modeNormal: "Suivi Normal",
    modePregnancy: "Planification de Grossesse",
    modeSymptom: "Gestion des Symptômes",
    period: "Règles",
    prediction: "Prédiction",
    mon: "Lu", tue: "Ma", wed: "Me", thu: "Je", fri: "Ve", sat: "Sa", sun: "Di",
    symptoms: "Symptômes",
    flow: "Flux",
    light: "Léger",
    medium: "Moyen",
    heavy: "Abondant",
    pain: "Douleur",
    yes: "Oui",
    no: "Non",
    mood: "Humeur",
    happy: "Heureuse",
    sad: "Triste",
    irritable: "Irritable",
    energy: "Énergie",
    high: "Haute",
    low: "Basse",
    bloating: "Ballonnement",
    headache: "Mal de tête",
    cravings: "Envies",
    conditions: "Conditions",
    pcos: "SOPK",
    endometriosis: "Endométriose",
    none: "Aucune",
    tipsTitle: "Conseils Santé",
    tipsSubtitle: "Conseils basés sur la science pour votre bien-être",
    tipsPainRelief: "Soulagement de la Douleur",
    tipsPainReliefDesc: "Appliquez une bouillotte sur le bas-ventre ou le dos. Prenez des bains chauds. Le massage doux aide aussi.",
    tipsPositions: "Positions Confortables",
    tipsPositionsDesc: "Position fœtale. Posture de l'enfant en yoga. Sur le ventre avec un coussin sous les hanches.",
    tipsFood: "Quoi Manger",
    tipsFoodDesc: "Aliments riches en fer: épinards, lentilles. Anti-inflammatoires: saumon, baies. Magnésium: chocolat noir, bananes.",
    tipsDrinks: "Quoi Boire",
    tipsDrinksDesc: "Restez hydratée. Thé au gingembre. Camomille. Menthe poivrée. Eau tiède au citron.",
    tipsAvoid: "À Éviter",
    tipsAvoidDesc: "Limitez caféine, sel, sucre transformé et alcool.",
    tipsExercise: "Exercice Doux",
    tipsExerciseDesc: "Marche légère. Yoga. Natation. Étirements.",
    tipsRelaxation: "Techniques de Relaxation",
    tipsRelaxationDesc: "Exercices de respiration. Relaxation musculaire. Méditation. Aromathérapie.",
    tipsCyclePhases: "Phases du Cycle",
    tipsCyclePhasesDesc: "Menstruelle (Jours 1-5): Repos. Folliculaire (Jours 6-13): Énergie croissante. Ovulation (Jour 14): Pic d'énergie. Lutéale (Jours 15-28): Prendre soin de soi.",
    analyticsTitle: "Analyses",
    analyticsSubtitle: "Suivez vos tendances et modèles",
    cycleLengthTrend: "Tendance de Durée du Cycle",
    avgCycleLength: "Durée Moyenne du Cycle",
    totalCyclesLogged: "Total de Cycles Enregistrés",
    symptomFrequency: "Fréquence des Symptômes",
    noDataYet: "Commencez le suivi pour voir les analyses",
    notesTitle: "Journal",
    notesSubtitle: "Vos notes et réflexions privées",
    addNote: "Ajouter Note",
    notePlaceholder: "Écrivez vos pensées, symptômes ou ce que vous voulez retenir...",
    save: "Enregistrer",
    delete: "Supprimer",
    search: "Rechercher...",
    noNotes: "Pas de notes. Commencez votre journal!",
    aboutTitle: "À propos",
    aboutSubtitle: "Votre compagnon de cycle de confiance",
    createdBy: "Créé par",
    aboutDescription: "Mon Cycle est une application complète de suivi du cycle menstruel conçue pour vous aider à mieux comprendre votre corps.",
    privacyTitle: "Votre Vie Privée Compte",
    privacyDescription: "Toutes vos données sont stockées localement sur votre appareil. Rien n'est envoyé à un serveur.",
    featuresTitle: "Fonctionnalités",
    version: "Version",
    language: "Langue",
  },
  de: {
    navHome: "Startseite",
    navTips: "Gesundheitstipps",
    navAnalytics: "Analysen",
    navNotes: "Tagebuch",
    navAbout: "Über uns",
    appTitle: "Mein Zyklus",
    appSubtitle: "Persönlicher Menstruationszyklus-Tracker",
    days: "Tage",
    untilNextCycle: "bis zum nächsten Zyklus",
    markFirstCycle: "Markiere deinen ersten Zyklus",
    cycle: "Zyklus",
    day: "Tag",
    nextCycle: "Nächster Zyklus",
    ovulation: "Eisprung",
    calendarTip: "Klicke auf ein Datum, um den Beginn deiner Periode zu markieren",
    modeNormal: "Normales Tracking",
    modePregnancy: "Schwangerschaftsplanung",
    modeSymptom: "Symptommanagement",
    period: "Periode",
    prediction: "Vorhersage",
    mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So",
    symptoms: "Symptome",
    flow: "Fluss",
    light: "Leicht",
    medium: "Mittel",
    heavy: "Stark",
    pain: "Schmerzen",
    yes: "Ja",
    no: "Nein",
    mood: "Stimmung",
    happy: "Glücklich",
    sad: "Traurig",
    irritable: "Reizbar",
    energy: "Energie",
    high: "Hoch",
    low: "Niedrig",
    bloating: "Blähungen",
    headache: "Kopfschmerzen",
    cravings: "Gelüste",
    conditions: "Bedingungen",
    pcos: "PCOS",
    endometriosis: "Endometriose",
    none: "Keine",
    tipsTitle: "Gesundheitstipps",
    tipsSubtitle: "Evidenzbasierte Ratschläge für dein Wohlbefinden",
    tipsPainRelief: "Schmerzlinderung",
    tipsPainReliefDesc: "Lege ein Wärmekissen auf den Unterbauch oder unteren Rücken. Nimm warme Bäder. Sanfte Massage hilft auch.",
    tipsPositions: "Bequeme Positionen",
    tipsPositionsDesc: "Fötale Position. Kindhaltung im Yoga. Auf dem Bauch mit Kissen unter der Hüfte.",
    tipsFood: "Was Essen",
    tipsFoodDesc: "Eisenreiche Lebensmittel: Spinat, Linsen. Entzündungshemmend: Lachs, Beeren. Magnesium: Dunkle Schokolade, Bananen.",
    tipsDrinks: "Was Trinken",
    tipsDrinksDesc: "Hydratisiert bleiben. Ingwertee. Kamillentee. Pfefferminztee. Warmes Zitronenwasser.",
    tipsAvoid: "Was Vermeiden",
    tipsAvoidDesc: "Koffein, Salz, verarbeiteten Zucker und Alkohol einschränken.",
    tipsExercise: "Sanfte Bewegung",
    tipsExerciseDesc: "Leichtes Spazierengehen. Yoga. Schwimmen. Dehnübungen.",
    tipsRelaxation: "Entspannungstechniken",
    tipsRelaxationDesc: "Atemübungen. Progressive Muskelentspannung. Meditation. Aromatherapie.",
    tipsCyclePhases: "Zyklusphasen",
    tipsCyclePhasesDesc: "Menstruation (Tage 1-5): Ausruhen. Follikelphase (Tage 6-13): Energie steigt. Eisprung (Tag 14): Maximale Energie. Lutealphase (Tage 15-28): Selbstfürsorge.",
    analyticsTitle: "Analysen",
    analyticsSubtitle: "Verfolge deine Muster und Trends",
    cycleLengthTrend: "Zykluslängentrend",
    avgCycleLength: "Durchschnittliche Zykluslänge",
    totalCyclesLogged: "Gesamt erfasste Zyklen",
    symptomFrequency: "Symptomhäufigkeit",
    noDataYet: "Beginne mit dem Tracking für Analysen",
    notesTitle: "Tagebuch",
    notesSubtitle: "Deine privaten Notizen und Reflexionen",
    addNote: "Notiz Hinzufügen",
    notePlaceholder: "Schreibe deine Gedanken, Symptome oder was du dir merken möchtest...",
    save: "Speichern",
    delete: "Löschen",
    search: "Notizen suchen...",
    noNotes: "Noch keine Notizen. Beginne dein Tagebuch!",
    aboutTitle: "Über uns",
    aboutSubtitle: "Dein vertrauenswürdiger Zyklusbegleiter",
    createdBy: "Erstellt von",
    aboutDescription: "Mein Zyklus ist eine umfassende Menstruationszyklus-Tracking-App, die dir hilft, deinen Körper besser zu verstehen.",
    privacyTitle: "Deine Privatsphäre Zählt",
    privacyDescription: "Alle Daten werden lokal auf deinem Gerät gespeichert. Nichts wird an Server gesendet.",
    featuresTitle: "Funktionen",
    version: "Version",
    language: "Sprache",
  },
  tr: {
    navHome: "Ana Sayfa",
    navTips: "Sağlık İpuçları",
    navAnalytics: "Analizler",
    navNotes: "Günlük",
    navAbout: "Hakkında",
    appTitle: "Döngüm",
    appSubtitle: "Kişisel adet döngüsü takipçisi",
    days: "gün",
    untilNextCycle: "sonraki döngüye",
    markFirstCycle: "İlk döngünüzü işaretleyin",
    cycle: "Döngü",
    day: "Gün",
    nextCycle: "Sonraki döngü",
    ovulation: "Yumurtlama",
    calendarTip: "Adet başlangıcını işaretlemek için bir tarihe tıklayın",
    modeNormal: "Normal Takip",
    modePregnancy: "Hamilelik Planlaması",
    modeSymptom: "Semptom Yönetimi",
    period: "Adet",
    prediction: "Tahmin",
    mon: "Pt", tue: "Sa", wed: "Ça", thu: "Pe", fri: "Cu", sat: "Ct", sun: "Pz",
    symptoms: "Semptomlar",
    flow: "Akış",
    light: "Hafif",
    medium: "Orta",
    heavy: "Yoğun",
    pain: "Ağrı",
    yes: "Evet",
    no: "Hayır",
    mood: "Ruh Hali",
    happy: "Mutlu",
    sad: "Üzgün",
    irritable: "Sinirli",
    energy: "Enerji",
    high: "Yüksek",
    low: "Düşük",
    bloating: "Şişkinlik",
    headache: "Baş ağrısı",
    cravings: "İstekler",
    conditions: "Koşullar",
    pcos: "PKOS",
    endometriosis: "Endometriozis",
    none: "Yok",
    tipsTitle: "Sağlık İpuçları",
    tipsSubtitle: "Sağlığınız için kanıta dayalı tavsiyeler",
    tipsPainRelief: "Ağrı Giderme",
    tipsPainReliefDesc: "Alt karına veya bele sıcak uygulayın. Sıcak banyo yapın. Nazik dairesel masaj da krampları hafifletir.",
    tipsPositions: "Rahat Pozisyonlar",
    tipsPositionsDesc: "Cenin pozisyonu. Yoga çocuk pozu. Kalçanın altına yastık koyarak yüzüstü yatma.",
    tipsFood: "Ne Yenmeli",
    tipsFoodDesc: "Demir açısından zengin: ıspanak, mercimek. Anti-inflamatuar: somon, yaban mersini. Magnezyum: bitter çikolata, muz.",
    tipsDrinks: "Ne İçilmeli",
    tipsDrinksDesc: "Su için. Zencefil çayı. Papatya çayı. Nane çayı. Ilık limonlu su.",
    tipsAvoid: "Nelerden Kaçınmalı",
    tipsAvoidDesc: "Kafein, tuz, işlenmiş şeker ve alkolü sınırlayın.",
    tipsExercise: "Hafif Egzersiz",
    tipsExerciseDesc: "Hafif yürüyüş. Yoga. Yüzme. Esneme hareketleri.",
    tipsRelaxation: "Rahatlama Teknikleri",
    tipsRelaxationDesc: "Nefes egzersizleri. Kas gevşetme. Meditasyon. Aromaterapi.",
    tipsCyclePhases: "Döngü Evreleri",
    tipsCyclePhasesDesc: "Adet (Gün 1-5): Dinlenme. Foliküler (Gün 6-13): Enerji artar. Yumurtlama (Gün 14): Zirve enerji. Luteal (Gün 15-28): Kendine bakım.",
    analyticsTitle: "Analizler",
    analyticsSubtitle: "Kalıplarınızı ve trendlerinizi takip edin",
    cycleLengthTrend: "Döngü Süresi Trendi",
    avgCycleLength: "Ortalama Döngü Süresi",
    totalCyclesLogged: "Toplam Kayıtlı Döngü",
    symptomFrequency: "Semptom Sıklığı",
    noDataYet: "Analizleri görmek için takibe başlayın",
    notesTitle: "Günlük",
    notesSubtitle: "Özel notlarınız ve düşünceleriniz",
    addNote: "Not Ekle",
    notePlaceholder: "Düşüncelerinizi, semptomlarınızı veya hatırlamak istediğiniz şeyleri yazın...",
    save: "Kaydet",
    delete: "Sil",
    search: "Not ara...",
    noNotes: "Henüz not yok. Günlüğünüze yazmaya başlayın!",
    aboutTitle: "Hakkında",
    aboutSubtitle: "Güvenilir döngü arkadaşınız",
    createdBy: "Oluşturan",
    aboutDescription: "Döngüm, vücudunuzu daha iyi anlamanıza yardımcı olmak için tasarlanmış kapsamlı bir adet döngüsü takip uygulamasıdır.",
    privacyTitle: "Gizliliğiniz Önemli",
    privacyDescription: "Tüm verileriniz cihazınızda yerel olarak saklanır. Hiçbir sunucuya gönderilmez.",
    featuresTitle: "Özellikler",
    version: "Sürüm",
    language: "Dil",
  },
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
      if (saved && saved in translations) return saved as Language;
    } catch {}
    return "en";
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try { localStorage.setItem(LANG_STORAGE_KEY, l); } catch {}
  }, []);

  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
