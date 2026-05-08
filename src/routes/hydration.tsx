import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Droplets, Plus, Minus, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { useI18n } from "@/lib/i18n";

const HYDRATION_KEY = "period-tracker-hydration";
const DAILY_GOAL = 8; // glasses

interface HydrationData {
  [date: string]: number;
}

function loadHydration(): HydrationData {
  try {
    const raw = localStorage.getItem(HYDRATION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveHydration(data: HydrationData) {
  localStorage.setItem(HYDRATION_KEY, JSON.stringify(data));
}

export const Route = createFileRoute("/hydration")({
  component: HydrationPage,
  head: () => ({
    meta: [
      { title: "Hydration Tracker — My Cycle" },
      { name: "description", content: "Track your daily water intake to stay hydrated throughout your cycle." },
    ],
  }),
});

function HydrationPage() {
  const { t } = useI18n();
  const today = format(new Date(), "yyyy-MM-dd");
  const [data, setData] = useState<HydrationData>({});
  const glasses = data[today] || 0;
  const progress = Math.min((glasses / DAILY_GOAL) * 100, 100);

  useEffect(() => {
    setData(loadHydration());
  }, []);

  const update = useCallback((delta: number) => {
    setData((prev) => {
      const current = prev[today] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev, [today]: next };
      saveHydration(updated);
      return updated;
    });
  }, [today]);

  const reset = useCallback(() => {
    setData((prev) => {
      const updated = { ...prev, [today]: 0 };
      saveHydration(updated);
      return updated;
    });
  }, [today]);

  // Last 7 days
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = format(d, "yyyy-MM-dd");
    return { day: format(d, "EEE"), glasses: data[key] || 0 };
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">{t.waterReminder || "Hydration"}</h1>
        <p className="text-sm text-muted-foreground mt-1">Stay hydrated throughout your cycle</p>
      </motion.div>

      {/* Progress Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle cx="100" cy="100" r="85" fill="none" stroke="var(--muted)" strokeWidth="12" />
            <circle
              cx="100" cy="100" r="85" fill="none"
              stroke="var(--primary)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${progress * 5.34} 534`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Droplets className="w-8 h-8 text-primary mb-1" />
            <span className="text-3xl font-bold text-foreground">{glasses}</span>
            <span className="text-xs text-muted-foreground">/ {DAILY_GOAL} glasses</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button onClick={() => update(-1)} className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <Minus className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={() => update(1)} className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            <Plus className="w-6 h-6 text-primary-foreground" />
          </button>
          <button onClick={reset} className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <RotateCcw className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Weekly overview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-premium p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">This Week</h3>
        <div className="flex justify-between items-end gap-2">
          {last7.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="w-full bg-muted rounded-full overflow-hidden" style={{ height: "80px" }}>
                <div
                  className="w-full gradient-primary rounded-full transition-all duration-300"
                  style={{ height: `${Math.min((d.glasses / DAILY_GOAL) * 100, 100)}%`, marginTop: `${100 - Math.min((d.glasses / DAILY_GOAL) * 100, 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{d.day}</span>
              <span className="text-[10px] font-semibold text-foreground">{d.glasses}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-premium p-5 mt-4"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3">💧 Hydration Tips</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li>• Drink at least 8 glasses (2L) of water daily</li>
          <li>• During your period, increase intake to reduce bloating</li>
          <li>• Herbal teas count toward your daily goal</li>
          <li>• Set hourly reminders on your phone</li>
          <li>• Carry a reusable water bottle everywhere</li>
        </ul>
      </motion.div>
    </div>
  );
}
