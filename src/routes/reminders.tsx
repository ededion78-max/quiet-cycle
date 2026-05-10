import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Pill, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { loadData, getPrediction } from "@/lib/period-tracker";
import { toast } from "sonner";

export const Route = createFileRoute("/reminders")({
  component: RemindersPage,
  head: () => ({ meta: [{ title: "Reminders — My Cycle" }] }),
});

interface Reminder {
  id: string; type: "cycle" | "pill"; time: string; enabled: boolean; label?: string;
}

const STORE = "my-cycle-reminders";

function RemindersPage() {
  const { t } = useI18n();
  const [perm, setPerm] = useState<NotificationPermission>("default");
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(STORE) || "[]"); } catch { return []; }
  });
  const [pillTime, setPillTime] = useState("21:00");
  const [cycleDaysBefore, setCycleDaysBefore] = useState(2);

  useEffect(() => {
    if (typeof Notification !== "undefined") setPerm(Notification.permission);
  }, []);

  useEffect(() => { localStorage.setItem(STORE, JSON.stringify(reminders)); }, [reminders]);

  // simple foreground checker every 60s
  useEffect(() => {
    const tick = () => {
      if (perm !== "granted") return;
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      reminders.forEach((r) => {
        if (!r.enabled) return;
        if (r.type === "pill" && r.time === hhmm) {
          new Notification("💊 " + t.pillReminder, { body: t.pillReminderBody });
        }
        if (r.type === "cycle") {
          const data = loadData();
          const pred = getPrediction(data.cycleStarts);
          if (pred && pred.daysUntilNextPeriod === Number(r.label)) {
            if (r.time === hhmm) {
              new Notification("🌸 " + t.cycleReminder, { body: t.cycleReminderBody.replace("{n}", r.label || "") });
            }
          }
        }
      });
    };
    const id = window.setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [reminders, perm, t]);

  const requestPerm = async () => {
    const p = await Notification.requestPermission();
    setPerm(p);
    if (p === "granted") toast.success(t.notifEnabled);
    else toast.error(t.notifDenied);
  };

  const addPill = () => {
    setReminders((r) => [...r, { id: crypto.randomUUID(), type: "pill", time: pillTime, enabled: true }]);
  };
  const addCycle = () => {
    setReminders((r) => [...r, { id: crypto.randomUUID(), type: "cycle", time: "09:00", enabled: true, label: String(cycleDaysBefore) }]);
  };
  const toggle = (id: string) =>
    setReminders((r) => r.map((x) => x.id === id ? { ...x, enabled: !x.enabled } : x));
  const remove = (id: string) =>
    setReminders((r) => r.filter((x) => x.id !== id));

  return (
    <div className="min-h-full gradient-hero">
      <div className="max-w-md mx-auto px-4 py-8 space-y-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-14 h-14 rounded-2xl gradient-primary mx-auto flex items-center justify-center shadow-lg mb-3">
            <Bell className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">{t.remindersTitle}</h1>
          <p className="text-xs text-muted-foreground mt-1">{t.remindersSubtitle}</p>
        </motion.div>

        {perm !== "granted" && (
          <div className="card-premium p-5 text-center">
            <p className="text-sm mb-3">{t.notifPermAsk}</p>
            <button onClick={requestPerm} className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold">
              {t.enableNotifications}
            </button>
          </div>
        )}

        <div className="card-premium p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Pill className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">{t.addPillReminder}</h3>
          </div>
          <div className="flex gap-2">
            <input type="time" value={pillTime} onChange={(e) => setPillTime(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm" />
            <button onClick={addPill} className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-xs font-semibold">
              {t.add}
            </button>
          </div>
        </div>

        <div className="card-premium p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">{t.addCycleReminder}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <input type="number" min={0} max={14} value={cycleDaysBefore}
              onChange={(e) => setCycleDaysBefore(Number(e.target.value))}
              className="w-20 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm" />
            <span className="text-xs text-muted-foreground flex-1">{t.daysBeforeCycle}</span>
            <button onClick={addCycle} className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-xs font-semibold">
              {t.add}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {reminders.map((r) => (
            <div key={r.id} className="card-premium p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                {r.type === "pill" ? <Pill className="w-4 h-4 text-primary" /> : <Bell className="w-4 h-4 text-primary" />}
              </div>
              <div className="flex-1 text-xs">
                <p className="font-semibold">
                  {r.type === "pill" ? t.pillReminder : `${t.cycleReminder} (${r.label} ${t.daysShort})`}
                </p>
                <p className="text-muted-foreground">{r.time}</p>
              </div>
              <input type="checkbox" checked={r.enabled} onChange={() => toggle(r.id)} className="w-4 h-4" />
              <button onClick={() => remove(r.id)} className="text-xs text-destructive">×</button>
            </div>
          ))}
          {reminders.length === 0 && (
            <p className="text-center text-xs text-muted-foreground py-4">{t.noReminders}</p>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground/60 text-center pb-4">{t.remindersFootnote}</p>
      </div>
    </div>
  );
}
