import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Thermometer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/bbt")({
  component: BBTPage,
  head: () => ({ meta: [{ title: "BBT Tracker — My Cycle" }] }),
});

interface BBTEntry { date: string; temp: number; }
const STORE = "my-cycle-bbt";

function BBTPage() {
  const { t } = useI18n();
  const [entries, setEntries] = useState<BBTEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(STORE) || "[]"); } catch { return []; }
  });
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [temp, setTemp] = useState("36.5");

  useEffect(() => { localStorage.setItem(STORE, JSON.stringify(entries)); }, [entries]);

  const add = () => {
    const v = parseFloat(temp);
    if (!Number.isFinite(v) || v < 34 || v > 42) return;
    setEntries((e) => {
      const filtered = e.filter((x) => x.date !== date);
      return [...filtered, { date, temp: v }].sort((a, b) => a.date.localeCompare(b.date));
    });
  };

  const chart = entries.slice(-30).map((e) => ({ date: e.date.slice(5), temp: e.temp }));

  return (
    <div className="min-h-full gradient-hero">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-14 h-14 rounded-2xl gradient-primary mx-auto flex items-center justify-center shadow-lg mb-3">
            <Thermometer className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">{t.bbtTitle}</h1>
          <p className="text-xs text-muted-foreground mt-1">{t.bbtSubtitle}</p>
        </motion.div>

        <div className="card-premium p-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm" />
            <input type="number" step="0.01" min="34" max="42" value={temp} onChange={(e) => setTemp(e.target.value)}
              placeholder="36.50 °C"
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm" />
          </div>
          <button onClick={add} className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold">
            {t.saveTemp}
          </button>
        </div>

        {chart.length > 0 ? (
          <div className="card-premium p-5">
            <h3 className="text-sm font-semibold mb-3">{t.bbtChart}</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[35.5, 37.5]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px" }} />
                <Line type="monotone" dataKey="temp" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--primary)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground">{t.noBbtYet}</p>
        )}

        <p className="text-[10px] text-muted-foreground/70 text-center pb-4">{t.bbtTip}</p>
      </div>
    </div>
  );
}
