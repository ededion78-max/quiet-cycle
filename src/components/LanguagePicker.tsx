/**
 * LanguagePicker - Full-screen language selector with flags and search
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Globe, Check } from "lucide-react";
import { useI18n, languageNames, type Language } from "@/lib/i18n";

// Country flag emoji mapping for each language
const languageFlags: Record<Language, string> = {
  en: "🇬🇧", sq: "🇦🇱", es: "🇪🇸", fr: "🇫🇷", de: "🇩🇪",
  tr: "🇹🇷", it: "🇮🇹", pt: "🇵🇹", nl: "🇳🇱", pl: "🇵🇱",
  ru: "🇷🇺", uk: "🇺🇦", cs: "🇨🇿", sk: "🇸🇰", hr: "🇭🇷",
  sr: "🇷🇸", bg: "🇧🇬", ro: "🇷🇴", hu: "🇭🇺", el: "🇬🇷",
  sv: "🇸🇪", da: "🇩🇰", no: "🇳🇴", fi: "🇫🇮", et: "🇪🇪",
  lv: "🇱🇻", lt: "🇱🇹", sl: "🇸🇮", mk: "🇲🇰", bs: "🇧🇦",
  ar: "🇸🇦", fa: "🇮🇷", hi: "🇮🇳", bn: "🇧🇩", ur: "🇵🇰",
  zh: "🇨🇳", ja: "🇯🇵", ko: "🇰🇷", th: "🇹🇭", vi: "🇻🇳",
  id: "🇮🇩", ms: "🇲🇾", tl: "🇵🇭", sw: "🇹🇿", am: "🇪🇹",
  he: "🇮🇱", ka: "🇬🇪", hy: "🇦🇲", az: "🇦🇿", uz: "🇺🇿",
  kk: "🇰🇿", mn: "🇲🇳", ne: "🇳🇵", si: "🇱🇰", my: "🇲🇲", km: "🇰🇭",
};

// All languages sorted alphabetically by native name
const allLanguages = (Object.keys(languageNames) as Language[]).sort((a, b) =>
  languageNames[a].localeCompare(languageNames[b])
);

interface LanguagePickerProps {
  open: boolean;
  onClose: () => void;
}

export function LanguagePicker({ open, onClose }: LanguagePickerProps) {
  const { lang, setLang, t } = useI18n();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return allLanguages;
    const q = search.toLowerCase();
    return allLanguages.filter(
      (l) =>
        languageNames[l].toLowerCase().includes(q) ||
        l.toLowerCase().includes(q)
    );
  }, [search]);

  const handleSelect = (l: Language) => {
    setLang(l);
    onClose();
    setSearch("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">{t.language}</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {allLanguages.length}
              </span>
            </div>
            <button
              onClick={() => { onClose(); setSearch(""); }}
              className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.search || "Search languages..."}
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Language list */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="space-y-1">
              {filtered.map((l) => (
                <motion.button
                  key={l}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => handleSelect(l)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all ${
                    lang === l
                      ? "gradient-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted/60"
                  }`}
                >
                  <span className="text-2xl leading-none">{languageFlags[l]}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${lang === l ? "text-primary-foreground" : "text-foreground"}`}>
                      {languageNames[l]}
                    </p>
                    <p className={`text-[10px] uppercase tracking-wider ${lang === l ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {l}
                    </p>
                  </div>
                  {lang === l && <Check className="w-5 h-5 text-primary-foreground shrink-0" />}
                </motion.button>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-muted-foreground">No languages found</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
