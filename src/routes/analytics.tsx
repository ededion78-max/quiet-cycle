import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { BarChart3, TrendingUp, Calendar, Activity, Droplets } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
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

const CHART_COLORS = ["var(--primary)", "var(--coral-warm)", "var(--ovulation)", "var(--premium-accent)", "var(--chart-4)"];

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
    const counts: Record<string, number> = {};
    data.logs.forEach((log) => {
      if (log.pain) counts[t.pain] = (counts[t.pain] || 0) + 1;
      if (log.mood === "happy") counts[t.happy] = (counts[t.happy] || 0) + 1;
      if (log.mood === "sad") counts[t.sad] = (counts[t.sad] || 0) + 1;
      if (log.mood === "irritable") counts[t.irritable] = (counts[t.irritable] || 0) + 1;
      if (log.bloating) counts[t.bloating] = (counts[t.bloating] || 0) + 1;
      if (log.headache) counts[t.headache] = (counts[t.headache] || 0) + 1;
      if (log.cravings) counts[t.cravings] = (counts[t.cravings] || 0) + 1;
      if (log.energy) counts[t.energy] = (counts[t.energy] || 0) + 1;
      if (log.flow === "light") counts[t.lightFlow] = (counts[t.lightFlow] || 0) + 1;
      if (log.flow === "medium") counts[t.mediumFlow] = (counts[t.mediumFlow] || 0) + 1;
      if (log.flow === "heavy") counts[t.heavyFlow] = (counts[t.heavyFlow] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [data.logs, t]);

  const periodDays = data.logs.filter((l) => l.isPeriod).length;
  const hasData = data.cycleStarts.length > 0;
  const hasSymptomsData = symptomData.length > 0;

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

      {/* Stats cards - always visible */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        <div className="card-premium p-5 text-center">
          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{avgLength}</p>
          <p className="text-[10px] text-muted-foreground">{t.avgCycleLength}</p>
        </div>
        <div className="card-premium p-5 text-center">
          <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{data.cycleStarts.length}</p>
          <p className="text-[10px] text-muted-foreground">{t.totalCyclesLogged}</p>
        </div>
        <div className="card-premium p-5 text-center">
          <Droplets className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{periodDays}</p>
          <p className="text-[10px] text-muted-foreground">{t.periodDaysLogged}</p>
        </div>
        <div className="card-premium p-5 text-center">
          <Activity className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{data.logs.length}</p>
          <p className="text-[10px] text-muted-foreground">{t.totalEntries}</p>
        </div>
      </motion.div>

      {!hasData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-premium p-8 text-center mb-6"
        >
          <BarChart3 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground font-medium mb-1">{t.noDataYet}</p>
          <p className="text-xs text-muted-foreground/70">{t.noDataHelp}</p>
        </motion.div>
      )}

      {/* Cycle length trend */}
      {cycleLengths.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium p-5 mb-6"
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
      {hasSymptomsData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-premium p-5 mb-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">{t.symptomFrequency}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={symptomData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="var(--muted-foreground)" angle={-35} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {symptomData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Symptom distribution pie chart */}
      {hasSymptomsData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">{t.symptomDistribution}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={symptomData.slice(0, 6)}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="count"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                fontSize={10}
              >
                {symptomData.slice(0, 6).map((_, index) => (
                  <Cell key={`pie-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
}
