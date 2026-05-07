/**
 * SymptomPanel - Premium symptom logging
 */

import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ThermometerSun, Smile, Frown, Angry, Zap, Wind, Brain, Cookie } from "lucide-react";
import type { DayLog, FlowIntensity, MoodType } from "@/lib/period-tracker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface SymptomPanelProps {
  selectedDate: Date | null;
  log: DayLog | undefined;
  onUpdateLog: (log: DayLog) => void;
}

export function SymptomPanel({ selectedDate, log, onUpdateLog }: SymptomPanelProps) {
  const { t } = useI18n();
  if (!selectedDate) return null;

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const currentLog: DayLog = log || { date: dateKey, isPeriod: false };

  const update = (partial: Partial<DayLog>) => {
    onUpdateLog({ ...currentLog, date: dateKey, ...partial });
  };

  const setFlow = (flow: FlowIntensity) => update({ flow: currentLog.flow === flow ? undefined : flow });
  const togglePain = () => update({ pain: !currentLog.pain });
  const setMood = (mood: MoodType) => update({ mood: currentLog.mood === mood ? undefined : mood });

  const flowOptions: { value: FlowIntensity; label: string; drops: number }[] = [
    { value: "light", label: t.light, drops: 1 },
    { value: "medium", label: t.medium, drops: 2 },
    { value: "heavy", label: t.heavy, drops: 3 },
  ];

  const moodOptions: { value: MoodType; label: string; icon: typeof Smile }[] = [
    { value: "happy", label: t.happy, icon: Smile },
    { value: "sad", label: t.sad, icon: Frown },
    { value: "irritable", label: t.irritable, icon: Angry },
  ];

  const btnClass = (active: boolean) => cn(
    "flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all",
    active
      ? "gradient-primary text-primary-foreground shadow-md shadow-primary/20"
      : "bg-muted/50 text-muted-foreground border border-border hover:bg-muted"
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={dateKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="card-premium p-5"
      >
        <h3 className="text-sm font-bold text-foreground mb-4 tracking-tight">
          {t.symptoms} — {format(selectedDate, "d MMMM yyyy")}
        </h3>

        {/* Flow */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2 flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5" /> {t.flow}
          </p>
          <div className="flex gap-2">
            {flowOptions.map((opt) => (
              <button key={opt.value} onClick={() => setFlow(opt.value)} className={btnClass(currentLog.flow === opt.value)}>
                <span className="flex items-center justify-center gap-0.5">
                  {Array.from({ length: opt.drops }).map((_, i) => (
                    <Droplets key={i} className="w-3 h-3" />
                  ))}
                </span>
                <span className="mt-1 block">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pain */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2 flex items-center gap-1.5">
            <ThermometerSun className="w-3.5 h-3.5" /> {t.pain}
          </p>
          <div className="flex gap-2">
            {[{ value: true, label: t.yes }, { value: false, label: t.no }].map((opt) => (
              <button key={String(opt.value)} onClick={togglePain} className={btnClass(currentLog.pain === opt.value)}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">{t.mood}</p>
          <div className="flex gap-2">
            {moodOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setMood(opt.value)}
                  className={cn(btnClass(currentLog.mood === opt.value), "flex flex-col items-center gap-1")}
                >
                  <Icon className="w-5 h-5" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Extra symptoms */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { key: "energy", icon: Zap, label: t.energy },
            { key: "bloating", icon: Wind, label: t.bloating },
            { key: "headache", icon: Brain, label: t.headache },
            { key: "cravings", icon: Cookie, label: t.cravings },
          ].map((s) => {
            const Icon = s.icon;
            const active = currentLog[s.key] === true;
            return (
              <button
                key={s.key}
                onClick={() => update({ [s.key]: !active })}
                className={cn(
                  "py-2.5 rounded-xl text-[10px] font-semibold transition-all flex flex-col items-center gap-1",
                  active
                    ? "gradient-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted/50 text-muted-foreground border border-border hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                {s.label}
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
