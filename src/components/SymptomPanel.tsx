/**
 * SymptomPanel - Log symptoms for a selected date
 * Flow intensity, pain, and mood tracking.
 */

import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ThermometerSun, Smile, Frown, Angry } from "lucide-react";
import type { DayLog, FlowIntensity, MoodType } from "@/lib/period-tracker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SymptomPanelProps {
  selectedDate: Date | null;
  log: DayLog | undefined;
  onUpdateLog: (log: DayLog) => void;
}

export function SymptomPanel({ selectedDate, log, onUpdateLog }: SymptomPanelProps) {
  if (!selectedDate) return null;

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  const currentLog: DayLog = log || {
    date: dateKey,
    isPeriod: false,
  };

  const setFlow = (flow: FlowIntensity) => {
    onUpdateLog({ ...currentLog, date: dateKey, flow: currentLog.flow === flow ? undefined : flow });
  };

  const togglePain = () => {
    onUpdateLog({ ...currentLog, date: dateKey, pain: !currentLog.pain });
  };

  const setMood = (mood: MoodType) => {
    onUpdateLog({ ...currentLog, date: dateKey, mood: currentLog.mood === mood ? undefined : mood });
  };

  const flowOptions: { value: FlowIntensity; label: string; drops: number }[] = [
    { value: "light", label: "Lehtë", drops: 1 },
    { value: "medium", label: "Mesatar", drops: 2 },
    { value: "heavy", label: "I rëndë", drops: 3 },
  ];

  const moodOptions: { value: MoodType; label: string; icon: typeof Smile }[] = [
    { value: "happy", label: "I lumtur", icon: Smile },
    { value: "sad", label: "I trishtuar", icon: Frown },
    { value: "irritable", label: "I irrituar", icon: Angry },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={dateKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-card rounded-2xl p-5 shadow-sm border border-border"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Simptomat — {format(selectedDate, "d MMMM yyyy")}
        </h3>

        {/* Flow intensity */}
        <div className="mb-5">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5" /> Fluksi
          </p>
          <div className="flex gap-2">
            {flowOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFlow(opt.value)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all border",
                  currentLog.flow === opt.value
                    ? "bg-symptom-selected text-primary-foreground border-symptom-selected"
                    : "bg-background text-muted-foreground border-border hover:bg-symptom-hover"
                )}
              >
                <span className="flex items-center justify-center gap-1">
                  {Array.from({ length: opt.drops }).map((_, i) => (
                    <Droplets key={i} className="w-3 h-3" />
                  ))}
                </span>
                <span className="mt-1 block">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pain toggle */}
        <div className="mb-5">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
            <ThermometerSun className="w-3.5 h-3.5" /> Dhimbje
          </p>
          <div className="flex gap-2">
            {[
              { value: true, label: "Po" },
              { value: false, label: "Jo" },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                onClick={togglePain}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all border",
                  currentLog.pain === opt.value
                    ? "bg-symptom-selected text-primary-foreground border-symptom-selected"
                    : "bg-background text-muted-foreground border-border hover:bg-symptom-hover"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Humori</p>
          <div className="flex gap-2">
            {moodOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setMood(opt.value)}
                  className={cn(
                    "flex-1 py-2.5 px-3 rounded-xl text-xs font-medium transition-all border flex flex-col items-center gap-1",
                    currentLog.mood === opt.value
                      ? "bg-symptom-selected text-primary-foreground border-symptom-selected"
                      : "bg-background text-muted-foreground border-border hover:bg-symptom-hover"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
