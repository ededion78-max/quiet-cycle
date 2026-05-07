/**
 * Period Tracker - Main Page (Premium Design)
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Heart, Baby, Activity, Stethoscope, Sparkles } from "lucide-react";
import {
  loadData, saveData, getPrediction, getLogForDate, upsertLog,
  type CycleData, type DayLog,
} from "@/lib/period-tracker";
import { CycleRing } from "@/components/CycleRing";
import { PeriodCalendar } from "@/components/PeriodCalendar";
import { SymptomPanel } from "@/components/SymptomPanel";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: PeriodTracker,
  head: () => ({
    meta: [
      { title: "My Cycle — Period Tracker" },
      { name: "description", content: "Professional menstrual cycle tracking with predictions, symptom logging, and health insights." },
    ],
  }),
});

type TrackingMode = "normal" | "pregnancy" | "symptom";
type HealthCondition = "none" | "pcos" | "endometriosis";

const MODE_KEY = "period-tracker-mode";
const CONDITION_KEY = "period-tracker-condition";

function PeriodTracker() {
  const { t } = useI18n();
  const [data, setData] = useState<CycleData>(() => loadData());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mode, setMode] = useState<TrackingMode>(() => {
    if (typeof window === "undefined") return "normal";
    return (localStorage.getItem(MODE_KEY) as TrackingMode) || "normal";
  });
  const [condition, setCondition] = useState<HealthCondition>(() => {
    if (typeof window === "undefined") return "none";
    return (localStorage.getItem(CONDITION_KEY) as HealthCondition) || "none";
  });

  useEffect(() => { saveData(data); }, [data]);
  useEffect(() => { localStorage.setItem(MODE_KEY, mode); }, [mode]);
  useEffect(() => { localStorage.setItem(CONDITION_KEY, condition); }, [condition]);

  const prediction = getPrediction(data.cycleStarts);
  const selectedLog = selectedDate ? getLogForDate(data.logs, selectedDate) : undefined;

  const handleTogglePeriod = useCallback((date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    const existing = data.logs.find((l) => l.date === key);
    if (existing?.isPeriod) {
      const newLogs = data.logs.map((l) => l.date === key ? { ...l, isPeriod: false } : l);
      const newStarts = data.cycleStarts.filter((s) => s !== key);
      setData({ logs: newLogs, cycleStarts: newStarts });
    } else {
      const newLog: DayLog = { ...(existing || { date: key }), date: key, isPeriod: true };
      const newLogs = upsertLog(data.logs, newLog);
      const newStarts = data.cycleStarts.includes(key) ? data.cycleStarts : [...data.cycleStarts, key].sort();
      setData({ logs: newLogs, cycleStarts: newStarts });
    }
  }, [data]);

  const handleUpdateLog = useCallback((log: DayLog) => {
    setData((prev) => ({ ...prev, logs: upsertLog(prev.logs, log) }));
  }, []);

  const modes = [
    { key: "normal" as const, label: t.modeNormal, icon: Heart },
    { key: "pregnancy" as const, label: t.modePregnancy, icon: Baby },
    { key: "symptom" as const, label: t.modeSymptom, icon: Activity },
  ];

  const conditions = [
    { key: "none" as const, label: t.none },
    { key: "pcos" as const, label: t.pcos },
    { key: "endometriosis" as const, label: t.endometriosis },
  ];

  return (
    <div className="min-h-full gradient-hero">
      <div className="max-w-md mx-auto px-4 py-6 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold mb-2">
            <Sparkles className="w-3 h-3" />
            {t.appTitle}
          </div>
        </motion.div>

        {/* Tracking Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-2"
        >
          {modes.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`flex-1 py-2.5 px-2 rounded-2xl text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  mode === m.key
                    ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {m.label}
              </button>
            );
          })}
        </motion.div>

        {/* Condition toggle */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <Stethoscope className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <div className="flex gap-1.5 flex-wrap">
            {conditions.map((c) => (
              <button
                key={c.key}
                onClick={() => setCondition(c.key)}
                className={`text-[10px] px-3 py-1 rounded-full font-semibold transition-all ${
                  condition === c.key
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Countdown ring */}
        <motion.section
          className="flex justify-center py-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <CycleRing prediction={prediction} />
        </motion.section>

        {/* Calendar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <PeriodCalendar
            logs={data.logs}
            prediction={prediction}
            onTogglePeriod={handleTogglePeriod}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </motion.section>

        {/* Symptom panel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <SymptomPanel
            selectedDate={selectedDate}
            log={selectedLog}
            onUpdateLog={handleUpdateLog}
          />
        </motion.section>

        {/* Footer tip */}
        <motion.p
          className="text-center text-[11px] text-muted-foreground/60 pt-1 pb-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t.calendarTip}
        </motion.p>
      </div>
    </div>
  );
}
