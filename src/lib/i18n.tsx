/**
 * i18n - Multi-language support (50+ languages)
 * Uses English as base with fallback for missing keys
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
  navHome: string; navTips: string; navAnalytics: string; navNotes: string; navAbout: string; navSettings: string;
  appTitle: string; appSubtitle: string; days: string; untilNextCycle: string; markFirstCycle: string;
  cycle: string; day: string; nextCycle: string; ovulation: string; calendarTip: string;
  modeNormal: string; modePregnancy: string; modeSymptom: string;
  period: string; prediction: string;
  mon: string; tue: string; wed: string; thu: string; fri: string; sat: string; sun: string;
  symptoms: string; flow: string; light: string; medium: string; heavy: string;
  pain: string; yes: string; no: string; mood: string; happy: string; sad: string; irritable: string;
  energy: string; high: string; low: string; bloating: string; headache: string; cravings: string;
  conditions: string; pcos: string; endometriosis: string; none: string;
  tipsTitle: string; tipsSubtitle: string;
  tipsPainRelief: string; tipsPainReliefDesc: string; tipsPositions: string; tipsPositionsDesc: string;
  tipsFood: string; tipsFoodDesc: string; tipsDrinks: string; tipsDrinksDesc: string;
  tipsAvoid: string; tipsAvoidDesc: string; tipsExercise: string; tipsExerciseDesc: string;
  tipsRelaxation: string; tipsRelaxationDesc: string; tipsCyclePhases: string; tipsCyclePhasesDesc: string;
  analyticsTitle: string; analyticsSubtitle: string; cycleLengthTrend: string; avgCycleLength: string;
  totalCyclesLogged: string; symptomFrequency: string; noDataYet: string;
  notesTitle: string; notesSubtitle: string; addNote: string; notePlaceholder: string;
  save: string; delete: string; search: string; noNotes: string;
  aboutTitle: string; aboutSubtitle: string; createdBy: string; aboutDescription: string;
  privacyTitle: string; privacyDescription: string; featuresTitle: string; version: string;
  language: string;
  settingsTitle: string; settingsSubtitle: string; darkMode: string; notifications: string;
  exportData: string; importData: string; resetData: string; resetConfirm: string;
  waterReminder: string; selfCare: string; fertileWindow: string;
};

const en: TranslationKeys = {
  navHome: "Home", navTips: "Health Tips", navAnalytics: "Analytics", navNotes: "Journal", navAbout: "About", navSettings: "Settings",
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
  tipsTitle: "Health Tips", tipsSubtitle: "Evidence-based advice for your well-being",
  tipsPainRelief: "Pain Relief",
  tipsPainReliefDesc: "Apply a warm heating pad to your lower abdomen or lower back. Take warm baths. Gentle massage in circular motions on your belly can also help relieve cramping.",
  tipsPositions: "Comfortable Positions",
  tipsPositionsDesc: "Fetal position (lying on your side with knees pulled up) reduces pressure on abdominal muscles. Child's pose in yoga stretches the lower back.",
  tipsFood: "What to Eat",
  tipsFoodDesc: "Iron-rich foods: spinach, lentils, red meat. Anti-inflammatory foods: salmon, berries, leafy greens. Magnesium: dark chocolate, bananas, avocados.",
  tipsDrinks: "What to Drink",
  tipsDrinksDesc: "Stay hydrated with water. Ginger tea reduces nausea and cramps. Chamomile tea has anti-inflammatory properties. Peppermint tea eases bloating.",
  tipsAvoid: "What to Avoid",
  tipsAvoidDesc: "Limit caffeine (can worsen cramps). Reduce salt intake. Avoid processed sugars. Limit alcohol.",
  tipsExercise: "Gentle Exercise",
  tipsExerciseDesc: "Light walking improves blood flow. Yoga poses like cat-cow and supine twist help. Swimming reduces cramp pain.",
  tipsRelaxation: "Relaxation Techniques",
  tipsRelaxationDesc: "Deep breathing exercises (4-7-8 method). Progressive muscle relaxation. Meditation and mindfulness. Aromatherapy with lavender.",
  tipsCyclePhases: "Understanding Your Cycle Phases",
  tipsCyclePhasesDesc: "Menstrual (Days 1-5): Rest. Follicular (Days 6-13): Energy rises. Ovulation (Day 14): Peak energy. Luteal (Days 15-28): Self-care.",
  analyticsTitle: "Analytics", analyticsSubtitle: "Track your patterns and trends",
  cycleLengthTrend: "Cycle Length Trend", avgCycleLength: "Average Cycle Length",
  totalCyclesLogged: "Total Cycles Logged", symptomFrequency: "Symptom Frequency",
  noDataYet: "Start tracking to see your analytics",
  notesTitle: "Journal", notesSubtitle: "Your private notes and reflections",
  addNote: "Add Note", notePlaceholder: "Write your thoughts, symptoms, or anything you want to remember...",
  save: "Save", delete: "Delete", search: "Search notes...", noNotes: "No notes yet. Start journaling!",
  aboutTitle: "About", aboutSubtitle: "Your trusted cycle companion", createdBy: "Created by",
  aboutDescription: "My Cycle is a comprehensive menstrual cycle tracking application designed to help you understand your body better.",
  privacyTitle: "Your Privacy Matters",
  privacyDescription: "All your data is stored locally on your device. Nothing is sent to any server.",
  featuresTitle: "Features", version: "Version", language: "Language",
  settingsTitle: "Settings", settingsSubtitle: "Customize your experience",
  darkMode: "Dark Mode", notifications: "Notifications", exportData: "Export Data",
  importData: "Import Data", resetData: "Reset All Data", resetConfirm: "Are you sure? This cannot be undone.",
  waterReminder: "Water Reminder", selfCare: "Self Care", fertileWindow: "Fertile Window",
};

// Each language only needs to override the UI-critical keys; longer descriptions fall back to English
const translations: Record<Language, Partial<TranslationKeys>> = {
  en,
  sq: {
    navHome: "Kryefaqja", navTips: "Këshilla", navAnalytics: "Analiza", navNotes: "Ditari", navAbout: "Rreth Nesh", navSettings: "Cilësimet",
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
    tipsTitle: "Këshilla Shëndetësore", tipsSubtitle: "Këshilla të bazuara në shkencë",
    tipsPainRelief: "Lehtësimi i Dhimbjes", tipsPositions: "Pozicione Rehatshme",
    tipsFood: "Çfarë të Hani", tipsDrinks: "Çfarë të Pini", tipsAvoid: "Çfarë të Shmangni",
    tipsExercise: "Ushtrime të Lehta", tipsRelaxation: "Teknika Relaksimi", tipsCyclePhases: "Fazat e Ciklit",
    tipsPainReliefDesc: "Vendosni një ngrohëse të ngrohtë në bark ose në shpinë. Bëni banja të ngrohta. Masazhi i butë ndihmon.",
    tipsPositionsDesc: "Pozicioni fetal ul presionin në bark. Pozicioni i fëmijës në joga shtrin shpinën.",
    tipsFoodDesc: "Spinaq, thjerrëza, mish i kuq. Salmon, boronica. Çokollatë e zezë, banane, avokado.",
    tipsDrinksDesc: "Pini shumë ujë. Çaji i xhenxhefilit, kamomilit, mentës.",
    tipsAvoidDesc: "Kufizoni kafeinën, kripën, sheqerin dhe alkoolin.",
    tipsExerciseDesc: "Ecja e lehtë, yoga, noti, shtrimet.",
    tipsRelaxationDesc: "Ushtrime frymëmarrjeje. Meditim. Aromaterapi me lavandër.",
    tipsCyclePhasesDesc: "Menstruale (1-5): Pushim. Folikulare (6-13): Energji. Ovulimi (14): Maksimum. Luteale (15-28): Kujdes.",
    analyticsTitle: "Analiza", analyticsSubtitle: "Ndiqni trendet tuaja",
    cycleLengthTrend: "Trendi i Ciklit", avgCycleLength: "Gjatësia Mesatare",
    totalCyclesLogged: "Cikle të Regjistruara", symptomFrequency: "Frekuenca e Simptomave",
    noDataYet: "Filloni gjurmimin për analiza",
    notesTitle: "Ditari", notesSubtitle: "Shënimet tuaja private",
    addNote: "Shto Shënim", notePlaceholder: "Shkruani mendimet tuaja...",
    save: "Ruaj", delete: "Fshi", search: "Kërko...", noNotes: "Nuk ka shënime ende!",
    aboutTitle: "Rreth Nesh", aboutSubtitle: "Shoqëruesi i besuar i ciklit", createdBy: "Krijuar nga",
    aboutDescription: "Cikli Im është një aplikacion gjithëpërfshirës për gjurmimin e ciklit menstrual.",
    privacyTitle: "Privatësia Juaj", privacyDescription: "Të dhënat ruhen lokalisht në pajisjen tuaj.",
    featuresTitle: "Veçoritë", version: "Versioni", language: "Gjuha",
    settingsTitle: "Cilësimet", settingsSubtitle: "Personalizoni përvojën tuaj",
    darkMode: "Modi i Errët", notifications: "Njoftimet", exportData: "Eksporto të Dhënat",
    importData: "Importo të Dhënat", resetData: "Rivendos të Dhënat", resetConfirm: "Jeni të sigurt?",
    waterReminder: "Kujtesë Uji", selfCare: "Kujdes për Veten", fertileWindow: "Dritarja Fertile",
  },
  es: {
    navHome: "Inicio", navTips: "Consejos", navAnalytics: "Análisis", navNotes: "Diario", navAbout: "Acerca de", navSettings: "Ajustes",
    appTitle: "Mi Ciclo", appSubtitle: "Seguimiento del ciclo menstrual",
    days: "días", untilNextCycle: "hasta el próximo ciclo", markFirstCycle: "Marca tu primer ciclo",
    cycle: "Ciclo", day: "Día", nextCycle: "Próximo ciclo", ovulation: "Ovulación",
    calendarTip: "Haz clic en una fecha para marcar el inicio",
    modeNormal: "Normal", modePregnancy: "Embarazo", modeSymptom: "Síntomas",
    period: "Período", prediction: "Predicción",
    mon: "Lu", tue: "Ma", wed: "Mi", thu: "Ju", fri: "Vi", sat: "Sá", sun: "Do",
    symptoms: "Síntomas", flow: "Flujo", light: "Ligero", medium: "Medio", heavy: "Abundante",
    pain: "Dolor", yes: "Sí", no: "No", mood: "Ánimo", happy: "Feliz", sad: "Triste", irritable: "Irritable",
    energy: "Energía", high: "Alta", low: "Baja", bloating: "Hinchazón", headache: "Dolor de cabeza", cravings: "Antojos",
    none: "Ninguna", tipsTitle: "Consejos de Salud", analyticsTitle: "Análisis",
    notesTitle: "Diario", addNote: "Agregar Nota", save: "Guardar", delete: "Eliminar", search: "Buscar...",
    aboutTitle: "Acerca de", createdBy: "Creado por", language: "Idioma",
    settingsTitle: "Ajustes", darkMode: "Modo Oscuro", exportData: "Exportar Datos",
  },
  fr: {
    navHome: "Accueil", navTips: "Conseils", navAnalytics: "Analyses", navNotes: "Journal", navAbout: "À propos", navSettings: "Paramètres",
    appTitle: "Mon Cycle", appSubtitle: "Suivi du cycle menstruel",
    days: "jours", untilNextCycle: "jusqu'au prochain cycle", markFirstCycle: "Marquez votre premier cycle",
    cycle: "Cycle", day: "Jour", nextCycle: "Prochain cycle", ovulation: "Ovulation",
    modeNormal: "Normal", modePregnancy: "Grossesse", modeSymptom: "Symptômes",
    period: "Règles", prediction: "Prédiction",
    mon: "Lu", tue: "Ma", wed: "Me", thu: "Je", fri: "Ve", sat: "Sa", sun: "Di",
    symptoms: "Symptômes", flow: "Flux", light: "Léger", medium: "Moyen", heavy: "Abondant",
    pain: "Douleur", yes: "Oui", no: "Non", mood: "Humeur", happy: "Heureuse", sad: "Triste", irritable: "Irritable",
    energy: "Énergie", high: "Haute", low: "Basse", bloating: "Ballonnement", headache: "Maux de tête", cravings: "Envies",
    none: "Aucune", tipsTitle: "Conseils Santé", analyticsTitle: "Analyses",
    notesTitle: "Journal", addNote: "Ajouter Note", save: "Enregistrer", delete: "Supprimer", search: "Rechercher...",
    aboutTitle: "À propos", createdBy: "Créé par", language: "Langue",
    settingsTitle: "Paramètres", darkMode: "Mode Sombre", exportData: "Exporter",
  },
  de: {
    navHome: "Start", navTips: "Tipps", navAnalytics: "Analysen", navNotes: "Tagebuch", navAbout: "Über uns", navSettings: "Einstellungen",
    appTitle: "Mein Zyklus", appSubtitle: "Persönlicher Zyklustracker",
    days: "Tage", untilNextCycle: "bis zum nächsten Zyklus", markFirstCycle: "Ersten Zyklus markieren",
    cycle: "Zyklus", day: "Tag", nextCycle: "Nächster Zyklus", ovulation: "Eisprung",
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
  },
  tr: {
    navHome: "Ana Sayfa", navTips: "İpuçları", navAnalytics: "Analizler", navNotes: "Günlük", navAbout: "Hakkında", navSettings: "Ayarlar",
    appTitle: "Döngüm", appSubtitle: "Kişisel adet döngüsü takipçisi",
    days: "gün", untilNextCycle: "sonraki döngüye", markFirstCycle: "İlk döngünüzü işaretleyin",
    cycle: "Döngü", day: "Gün", nextCycle: "Sonraki döngü", ovulation: "Yumurtlama",
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
  },
  it: {
    navHome: "Home", navTips: "Consigli", navAnalytics: "Analisi", navNotes: "Diario", navAbout: "Info", navSettings: "Impostazioni",
    appTitle: "Il Mio Ciclo", appSubtitle: "Tracker del ciclo mestruale",
    days: "giorni", untilNextCycle: "al prossimo ciclo", markFirstCycle: "Segna il primo ciclo",
    cycle: "Ciclo", day: "Giorno", nextCycle: "Prossimo ciclo", ovulation: "Ovulazione",
    period: "Mestruazioni", prediction: "Previsione",
    mon: "Lu", tue: "Ma", wed: "Me", thu: "Gi", fri: "Ve", sat: "Sa", sun: "Do",
    symptoms: "Sintomi", flow: "Flusso", light: "Leggero", medium: "Medio", heavy: "Abbondante",
    pain: "Dolore", yes: "Sì", no: "No", mood: "Umore", happy: "Felice", sad: "Triste", irritable: "Irritabile",
    energy: "Energia", high: "Alta", low: "Bassa", bloating: "Gonfiore", headache: "Mal di testa", cravings: "Voglie",
    none: "Nessuno", save: "Salva", delete: "Elimina", search: "Cerca...", language: "Lingua",
    settingsTitle: "Impostazioni", darkMode: "Modalità Scura",
  },
  pt: {
    navHome: "Início", navTips: "Dicas", navAnalytics: "Análises", navNotes: "Diário", navAbout: "Sobre", navSettings: "Configurações",
    appTitle: "Meu Ciclo", appSubtitle: "Rastreador do ciclo menstrual",
    days: "dias", untilNextCycle: "até o próximo ciclo", markFirstCycle: "Marque seu primeiro ciclo",
    cycle: "Ciclo", day: "Dia", nextCycle: "Próximo ciclo", ovulation: "Ovulação",
    period: "Período", prediction: "Previsão",
    mon: "Se", tue: "Te", wed: "Qu", thu: "Qu", fri: "Se", sat: "Sá", sun: "Do",
    symptoms: "Sintomas", flow: "Fluxo", light: "Leve", medium: "Médio", heavy: "Intenso",
    pain: "Dor", yes: "Sim", no: "Não", mood: "Humor", happy: "Feliz", sad: "Triste", irritable: "Irritável",
    none: "Nenhum", save: "Salvar", delete: "Excluir", search: "Pesquisar...", language: "Idioma",
    settingsTitle: "Configurações", darkMode: "Modo Escuro",
  },
  nl: {
    navHome: "Home", navTips: "Tips", navAnalytics: "Analyses", navNotes: "Dagboek", navAbout: "Over", navSettings: "Instellingen",
    appTitle: "Mijn Cyclus", appSubtitle: "Persoonlijke menstruatietracker",
    days: "dagen", untilNextCycle: "tot de volgende cyclus", cycle: "Cyclus", day: "Dag",
    period: "Menstruatie", prediction: "Voorspelling", ovulation: "Ovulatie",
    symptoms: "Symptomen", pain: "Pijn", mood: "Stemming", happy: "Blij", sad: "Verdrietig",
    save: "Opslaan", delete: "Verwijderen", search: "Zoeken...", language: "Taal",
  },
  pl: {
    navHome: "Strona główna", navTips: "Porady", navAnalytics: "Analizy", navNotes: "Dziennik", navAbout: "O nas", navSettings: "Ustawienia",
    appTitle: "Mój Cykl", appSubtitle: "Osobisty tracker cyklu",
    days: "dni", untilNextCycle: "do następnego cyklu", cycle: "Cykl", day: "Dzień",
    period: "Okres", prediction: "Prognoza", ovulation: "Owulacja",
    symptoms: "Objawy", pain: "Ból", mood: "Nastrój", happy: "Szczęśliwa", sad: "Smutna",
    save: "Zapisz", delete: "Usuń", search: "Szukaj...", language: "Język",
  },
  ru: {
    navHome: "Главная", navTips: "Советы", navAnalytics: "Аналитика", navNotes: "Дневник", navAbout: "О нас", navSettings: "Настройки",
    appTitle: "Мой Цикл", appSubtitle: "Трекер менструального цикла",
    days: "дней", untilNextCycle: "до следующего цикла", markFirstCycle: "Отметьте первый цикл",
    cycle: "Цикл", day: "День", nextCycle: "Следующий цикл", ovulation: "Овуляция",
    period: "Менструация", prediction: "Прогноз",
    mon: "Пн", tue: "Вт", wed: "Ср", thu: "Чт", fri: "Пт", sat: "Сб", sun: "Вс",
    symptoms: "Симптомы", flow: "Поток", light: "Лёгкий", medium: "Средний", heavy: "Обильный",
    pain: "Боль", yes: "Да", no: "Нет", mood: "Настроение", happy: "Счастливая", sad: "Грустная", irritable: "Раздражительная",
    energy: "Энергия", high: "Высокая", low: "Низкая", bloating: "Вздутие", headache: "Головная боль", cravings: "Тяга к еде",
    none: "Нет", save: "Сохранить", delete: "Удалить", search: "Поиск...", language: "Язык",
    settingsTitle: "Настройки", darkMode: "Тёмная тема",
  },
  uk: {
    navHome: "Головна", navTips: "Поради", navAnalytics: "Аналітика", navNotes: "Щоденник", navAbout: "Про нас", navSettings: "Налаштування",
    appTitle: "Мій Цикл", days: "днів", cycle: "Цикл", day: "День", period: "Менструація",
    ovulation: "Овуляція", symptoms: "Симптоми", pain: "Біль", mood: "Настрій",
    save: "Зберегти", delete: "Видалити", search: "Пошук...", language: "Мова",
  },
  cs: {
    navHome: "Domů", navTips: "Tipy", navNotes: "Deník", navAbout: "O nás", navSettings: "Nastavení",
    appTitle: "Můj Cyklus", days: "dní", cycle: "Cyklus", day: "Den", period: "Menstruace",
    ovulation: "Ovulace", symptoms: "Příznaky", pain: "Bolest", mood: "Nálada",
    save: "Uložit", delete: "Smazat", language: "Jazyk",
  },
  sk: {
    navHome: "Domov", appTitle: "Môj Cyklus", days: "dní", cycle: "Cyklus", day: "Deň",
    period: "Menštruácia", ovulation: "Ovulácia", pain: "Bolesť",
    save: "Uložiť", delete: "Zmazať", language: "Jazyk",
  },
  hr: {
    navHome: "Početna", appTitle: "Moj Ciklus", days: "dana", cycle: "Ciklus", day: "Dan",
    period: "Menstruacija", ovulation: "Ovulacija", pain: "Bol",
    save: "Spremi", delete: "Obriši", language: "Jezik",
  },
  sr: {
    navHome: "Почетна", appTitle: "Мој Циклус", days: "дана", cycle: "Циклус", day: "Дан",
    period: "Менструација", ovulation: "Овулација", pain: "Бол",
    save: "Сачувај", delete: "Обриши", language: "Језик",
  },
  bg: {
    navHome: "Начало", appTitle: "Моят Цикъл", days: "дни", cycle: "Цикъл", day: "Ден",
    period: "Менструация", ovulation: "Овулация", pain: "Болка",
    save: "Запази", delete: "Изтрий", language: "Език",
  },
  ro: {
    navHome: "Acasă", appTitle: "Ciclul Meu", days: "zile", cycle: "Ciclu", day: "Zi",
    period: "Menstruație", ovulation: "Ovulație", pain: "Durere",
    save: "Salvare", delete: "Șterge", language: "Limbă",
  },
  hu: {
    navHome: "Főoldal", appTitle: "Ciklusom", days: "nap", cycle: "Ciklus", day: "Nap",
    period: "Menstruáció", ovulation: "Ovuláció", pain: "Fájdalom",
    save: "Mentés", delete: "Törlés", language: "Nyelv",
  },
  el: {
    navHome: "Αρχική", appTitle: "Ο Κύκλος Μου", days: "ημέρες", cycle: "Κύκλος", day: "Ημέρα",
    period: "Περίοδος", ovulation: "Ωορρηξία", pain: "Πόνος",
    save: "Αποθήκευση", delete: "Διαγραφή", language: "Γλώσσα",
  },
  sv: {
    navHome: "Hem", appTitle: "Min Cykel", days: "dagar", cycle: "Cykel", day: "Dag",
    period: "Mens", ovulation: "Ägglossning", pain: "Smärta",
    save: "Spara", delete: "Radera", language: "Språk",
  },
  da: {
    navHome: "Hjem", appTitle: "Min Cyklus", days: "dage", cycle: "Cyklus", day: "Dag",
    period: "Menstruation", ovulation: "Ægløsning", pain: "Smerte",
    save: "Gem", delete: "Slet", language: "Sprog",
  },
  no: {
    navHome: "Hjem", appTitle: "Min Syklus", days: "dager", cycle: "Syklus", day: "Dag",
    period: "Menstruasjon", ovulation: "Eggløsning", pain: "Smerte",
    save: "Lagre", delete: "Slett", language: "Språk",
  },
  fi: {
    navHome: "Koti", appTitle: "Syklini", days: "päivää", cycle: "Sykli", day: "Päivä",
    period: "Kuukautiset", ovulation: "Ovulaatio", pain: "Kipu",
    save: "Tallenna", delete: "Poista", language: "Kieli",
  },
  et: {
    navHome: "Avaleht", appTitle: "Minu Tsükkel", days: "päeva", cycle: "Tsükkel", day: "Päev",
    period: "Menstruatsioon", ovulation: "Ovulatsioon", pain: "Valu",
    save: "Salvesta", delete: "Kustuta", language: "Keel",
  },
  lv: {
    navHome: "Sākums", appTitle: "Mans Cikls", days: "dienas", cycle: "Cikls", day: "Diena",
    period: "Menstruācija", ovulation: "Ovulācija", pain: "Sāpes",
    save: "Saglabāt", delete: "Dzēst", language: "Valoda",
  },
  lt: {
    navHome: "Pradžia", appTitle: "Mano Ciklas", days: "dienos", cycle: "Ciklas", day: "Diena",
    period: "Menstruacija", ovulation: "Ovuliacija", pain: "Skausmas",
    save: "Išsaugoti", delete: "Ištrinti", language: "Kalba",
  },
  sl: {
    navHome: "Domov", appTitle: "Moj Cikel", days: "dni", cycle: "Cikel", day: "Dan",
    period: "Menstruacija", ovulation: "Ovulacija", pain: "Bolečina",
    save: "Shrani", delete: "Izbriši", language: "Jezik",
  },
  mk: {
    navHome: "Почетна", appTitle: "Мој Циклус", days: "денови", cycle: "Циклус", day: "Ден",
    period: "Менструација", ovulation: "Овулација", pain: "Болка",
    save: "Зачувај", delete: "Избриши", language: "Јазик",
  },
  bs: {
    navHome: "Početna", appTitle: "Moj Ciklus", days: "dana", cycle: "Ciklus", day: "Dan",
    period: "Menstruacija", ovulation: "Ovulacija", pain: "Bol",
    save: "Spremi", delete: "Obriši", language: "Jezik",
  },
  ar: {
    navHome: "الرئيسية", navTips: "نصائح", navAnalytics: "تحليلات", navNotes: "المذكرات", navAbout: "حول", navSettings: "الإعدادات",
    appTitle: "دورتي", appSubtitle: "متتبع الدورة الشهرية",
    days: "أيام", untilNextCycle: "حتى الدورة القادمة", cycle: "الدورة", day: "يوم",
    period: "الحيض", prediction: "التوقع", ovulation: "الإباضة",
    symptoms: "الأعراض", pain: "الألم", mood: "المزاج", happy: "سعيدة", sad: "حزينة",
    save: "حفظ", delete: "حذف", search: "بحث...", language: "اللغة",
  },
  fa: {
    navHome: "خانه", appTitle: "دوره من", days: "روز", cycle: "دوره", day: "روز",
    period: "قاعدگی", ovulation: "تخمک‌گذاری", pain: "درد",
    save: "ذخیره", delete: "حذف", language: "زبان",
  },
  hi: {
    navHome: "होम", appTitle: "मेरा चक्र", days: "दिन", cycle: "चक्र", day: "दिन",
    period: "मासिक धर्म", ovulation: "ओव्यूलेशन", pain: "दर्द",
    save: "सहेजें", delete: "मिटाएं", language: "भाषा",
  },
  bn: {
    navHome: "হোম", appTitle: "আমার চক্র", days: "দিন", cycle: "চক্র", day: "দিন",
    period: "ঋতুস্রাব", ovulation: "ডিম্বস্ফোটন", pain: "ব্যথা",
    save: "সংরক্ষণ", delete: "মুছুন", language: "ভাষা",
  },
  ur: {
    navHome: "ہوم", appTitle: "میرا سائیکل", days: "دن", cycle: "سائیکل", day: "دن",
    period: "ماہواری", ovulation: "بیضہ دانی", pain: "درد",
    save: "محفوظ کریں", delete: "حذف کریں", language: "زبان",
  },
  zh: {
    navHome: "首页", navTips: "健康建议", navAnalytics: "数据分析", navNotes: "日记", navAbout: "关于", navSettings: "设置",
    appTitle: "我的周期", appSubtitle: "个人月经周期追踪器",
    days: "天", untilNextCycle: "距下次月经", markFirstCycle: "标记第一个周期",
    cycle: "周期", day: "天", nextCycle: "下次月经", ovulation: "排卵",
    period: "月经", prediction: "预测",
    mon: "一", tue: "二", wed: "三", thu: "四", fri: "五", sat: "六", sun: "日",
    symptoms: "症状", flow: "流量", light: "轻量", medium: "中等", heavy: "大量",
    pain: "疼痛", yes: "是", no: "否", mood: "情绪", happy: "开心", sad: "难过", irritable: "烦躁",
    energy: "精力", high: "高", low: "低", bloating: "腹胀", headache: "头痛", cravings: "食欲",
    none: "无", save: "保存", delete: "删除", search: "搜索...", language: "语言",
    settingsTitle: "设置", darkMode: "深色模式",
  },
  ja: {
    navHome: "ホーム", navTips: "ヒント", navAnalytics: "分析", navNotes: "日記", navAbout: "情報", navSettings: "設定",
    appTitle: "マイサイクル", appSubtitle: "月経周期トラッカー",
    days: "日", untilNextCycle: "次の周期まで", cycle: "周期", day: "日",
    period: "月経", prediction: "予測", ovulation: "排卵",
    mon: "月", tue: "火", wed: "水", thu: "木", fri: "金", sat: "土", sun: "日",
    symptoms: "症状", pain: "痛み", mood: "気分", happy: "嬉しい", sad: "悲しい",
    save: "保存", delete: "削除", search: "検索...", language: "言語",
  },
  ko: {
    navHome: "홈", navTips: "건강 팁", navAnalytics: "분석", navNotes: "일기", navAbout: "정보", navSettings: "설정",
    appTitle: "나의 주기", appSubtitle: "월경 주기 추적기",
    days: "일", untilNextCycle: "다음 주기까지", cycle: "주기", day: "일",
    period: "월경", prediction: "예측", ovulation: "배란",
    symptoms: "증상", pain: "통증", mood: "기분", happy: "행복", sad: "슬픔",
    save: "저장", delete: "삭제", search: "검색...", language: "언어",
  },
  th: {
    navHome: "หน้าแรก", appTitle: "รอบเดือนของฉัน", days: "วัน", cycle: "รอบ", day: "วัน",
    period: "ประจำเดือน", ovulation: "ตกไข่", pain: "ปวด",
    save: "บันทึก", delete: "ลบ", language: "ภาษา",
  },
  vi: {
    navHome: "Trang chủ", appTitle: "Chu Kỳ Của Tôi", days: "ngày", cycle: "Chu kỳ", day: "Ngày",
    period: "Kinh nguyệt", ovulation: "Rụng trứng", pain: "Đau",
    save: "Lưu", delete: "Xóa", language: "Ngôn ngữ",
  },
  id: {
    navHome: "Beranda", appTitle: "Siklus Saya", days: "hari", cycle: "Siklus", day: "Hari",
    period: "Menstruasi", ovulation: "Ovulasi", pain: "Nyeri",
    save: "Simpan", delete: "Hapus", language: "Bahasa",
  },
  ms: {
    navHome: "Laman Utama", appTitle: "Kitaran Saya", days: "hari", cycle: "Kitaran", day: "Hari",
    period: "Haid", ovulation: "Ovulasi", pain: "Sakit",
    save: "Simpan", delete: "Padam", language: "Bahasa",
  },
  tl: {
    navHome: "Home", appTitle: "Aking Siklo", days: "araw", cycle: "Siklo", day: "Araw",
    period: "Regla", ovulation: "Ovulasyon", pain: "Sakit",
    save: "I-save", delete: "Burahin", language: "Wika",
  },
  sw: {
    navHome: "Nyumbani", appTitle: "Mzunguko Wangu", days: "siku", cycle: "Mzunguko", day: "Siku",
    period: "Hedhi", ovulation: "Ovulation", pain: "Maumivu",
    save: "Hifadhi", delete: "Futa", language: "Lugha",
  },
  am: {
    navHome: "መነሻ", appTitle: "የእኔ ዑደት", days: "ቀናት", cycle: "ዑደት", day: "ቀን",
    period: "ወር አበባ", pain: "ህመም", save: "አስቀምጥ", delete: "ሰርዝ", language: "ቋንቋ",
  },
  he: {
    navHome: "ראשי", appTitle: "המחזור שלי", days: "ימים", cycle: "מחזור", day: "יום",
    period: "מחזור", ovulation: "ביוץ", pain: "כאב",
    save: "שמור", delete: "מחק", language: "שפה",
  },
  ka: {
    navHome: "მთავარი", appTitle: "ჩემი ციკლი", days: "დღე", cycle: "ციკლი", day: "დღე",
    period: "მენსტრუაცია", pain: "ტკივილი", save: "შენახვა", delete: "წაშლა", language: "ენა",
  },
  hy: {
    navHome: "Գլխավոր", appTitle: "Իմ Ցիկլը", days: "օր", cycle: " Delays", day: "Օdelays",
    period: "Դashdelays", pain: "Ցավ", save: "Պahpanel", delete: "Ջndelay", language: "Լelay",
  },
  az: {
    navHome: "Ana səhifə", appTitle: "Mənim Dövrüm", days: "gün", cycle: "Dövr", day: "Gün",
    period: "Menstruasiya", ovulation: "Ovulyasiya", pain: "Ağrı",
    save: "Saxla", delete: "Sil", language: "Dil",
  },
  uz: {
    navHome: "Bosh sahifa", appTitle: "Mening Sikl", days: "kun", cycle: "Sikl", day: "Kun",
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
    period: "माहावारी", pain: "दुखाइ", save: "बचत गर्नुहोस्", delete: "मेटाउनुहोस्", language: "भाषा",
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

// Merge with English fallback
function getTranslation(lang: Language): TranslationKeys {
  return { ...en, ...(translations[lang] || {}) } as TranslationKeys;
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
    } catch {}
    return "en";
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try { localStorage.setItem(LANG_STORAGE_KEY, l); } catch {}
  }, []);

  const t = getTranslation(lang);

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
