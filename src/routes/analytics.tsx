import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { differenceInDays } from "date-fns";
import { useI18n } from "@/lib/i18n";
import { loadData, type CycleData } from "@/lib/period-tracker";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
  head: () => ({
    meta: [
      { title: "Analytics — My Cycle" },
      { name: "description", content: "Cycle analytics, trends, and symptom frequency insights." },
    ],
  }),
});

function AnalyticsPage() {
  const { t } = useI18n();
  const [data, setData] = useState<CycleData>({ logs: [], cycleStarts: [] });

  useEffect(() => {
    setData(loadData());
  }, []);

  const cycleLengths = useMemo(() => {
    const sorted = [...data.cycleStarts].sort();
    const lengths: { cycle: number; days: number }[] = [];
    for (let i = 1; i < sorted.length; i++) {
      lengths.push({
        cycle: i,
        days: differenceInDays(new Date(sorted[i]), new Date(sorted[i - 1])),
      });
    }
    return lengths;
  }, [data.cycleStarts]);

  const avgLength = cycleLengths.length > 0
    ? Math.round(cycleLengths.reduce((a, b) => a + b.days, 0) / cycleLengths.length)
    : 28;

  const symptomData = useMemo(() => {
    const counts: Record<string, number> = { pain: 0, happy: 0, sad: 0, irritable: 0, light: 0, medium: 0, heavy: 0 };
    data.logs.forEach((log) => {
      if (log.pain) counts.pain++;
      if (log.mood) counts[log.mood]++;
      if (log.flow) counts[log.flow]++;
    });
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, count]) => ({ name, count }));
  }, [data.logs]);

  const hasData = data.cycleStarts.length > 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground">{t.analyticsTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.analyticsSubtitle}</p>
      </motion.div>

      {!hasData ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <BarChart3 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">{t.noDataYet}</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-card rounded-2xl p-5 border border-border text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{avgLength}</p>
              <p className="text-xs text-muted-foreground">{t.avgCycleLength}</p>
            </div>
            <div className="bg-card rounded-2xl p-5 border border-border text-center">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{data.cycleStarts.length}</p>
              <p className="text-xs text-muted-foreground">{t.totalCyclesLogged}</p>
            </div>
          </motion.div>

          {/* Cycle length trend */}
          {cycleLengths.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">{t.cycleLengthTrend}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={cycleLengths}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="cycle" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" domain={["dataMin - 2", "dataMax + 2"]} />
                  <Tooltip
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }}
                  />
                  <Line type="monotone" dataKey="days" stroke="var(--primary)" strokeWidth={2.5} dot={{ fill: "var(--primary)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Symptom frequency */}
          {symptomData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">{t.symptomFrequency}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={symptomData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }}
                  />
                  <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
