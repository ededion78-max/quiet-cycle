/**
 * Period Tracker - Main Page
 * 
 * Combines CycleRing countdown, interactive calendar,
 * and symptom panel into a single cohesive view.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import {
  loadData,
  saveData,
  getPrediction,
  getLogForDate,
  upsertLog,
  type CycleData,
  type DayLog,
} from "@/lib/period-tracker";
import { CycleRing } from "@/components/CycleRing";
import { PeriodCalendar } from "@/components/PeriodCalendar";
import { SymptomPanel } from "@/components/SymptomPanel";

export const Route = createFileRoute("/")({
  component: PeriodTracker,
  head: () => ({
    meta: [
      { title: "Period Tracker — Ndjekësi i Ciklit" },
      { name: "description", content: "Aplikacion profesional për ndjekjen e ciklit menstrual me kalendar interaktiv dhe parashikime." },
    ],
  }),
});

function PeriodTracker() {
  const [data, setData] = useState<CycleData>(() => loadData());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Persist changes to localStorage
  useEffect(() => {
    saveData(data);
  }, [data]);

  const prediction = getPrediction(data.cycleStarts);
  const selectedLog = selectedDate ? getLogForDate(data.logs, selectedDate) : undefined;

  /** Toggle a date as period start */
  const handleTogglePeriod = useCallback(
    (date: Date) => {
      const key = format(date, "yyyy-MM-dd");
      const existing = data.logs.find((l) => l.date === key);

      if (existing?.isPeriod) {
        // Remove period mark
        const newLogs = data.logs.map((l) =>
          l.date === key ? { ...l, isPeriod: false } : l
        );
        const newStarts = data.cycleStarts.filter((s) => s !== key);
        setData({ logs: newLogs, cycleStarts: newStarts });
      } else {
        // Mark as period
        const newLog: DayLog = {
          ...(existing || { date: key }),
          date: key,
          isPeriod: true,
        };
        const newLogs = upsertLog(data.logs, newLog);
        const newStarts = data.cycleStarts.includes(key)
          ? data.cycleStarts
          : [...data.cycleStarts, key].sort();
        setData({ logs: newLogs, cycleStarts: newStarts });
      }
    },
    [data]
  );

  /** Update symptoms for a date */
  const handleUpdateLog = useCallback(
    (log: DayLog) => {
      setData((prev) => ({
        ...prev,
        logs: upsertLog(prev.logs, log),
      }));
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="px-6 pt-8 pb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Heart className="w-5 h-5 text-primary" fill="var(--primary)" />
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Cikli Im
          </h1>
        </div>
        <p className="text-xs text-muted-foreground">
          Ndjekësi personal i ciklit menstrual
        </p>
      </motion.header>

      {/* Main content */}
      <main className="max-w-md mx-auto px-4 pb-12 space-y-6">
        {/* Countdown ring */}
        <motion.section
          className="flex justify-center py-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CycleRing prediction={prediction} />
        </motion.section>

        {/* Calendar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
          transition={{ delay: 0.5 }}
        >
          <SymptomPanel
            selectedDate={selectedDate}
            log={selectedLog}
            onUpdateLog={handleUpdateLog}
          />
        </motion.section>

        {/* Tip */}
        <motion.p
          className="text-center text-xs text-muted-foreground pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Kliko mbi një datë në kalendar për të shënuar fillimin e periodës
        </motion.p>
      </main>
    </div>
  );
}
