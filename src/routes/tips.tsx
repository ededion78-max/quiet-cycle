import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Flame,
  Sofa,
  Apple,
  GlassWater,
  Ban,
  Dumbbell,
  Wind,
  Moon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/tips")({
  component: TipsPage,
  head: () => ({
    meta: [
      { title: "Health Tips — My Cycle" },
      { name: "description", content: "Evidence-based health tips for managing your menstrual cycle, pain relief, nutrition, and wellness." },
    ],
  }),
});

function TipsPage() {
  const { t } = useI18n();

  const tips = [
    { icon: Flame, title: t.tipsPainRelief, desc: t.tipsPainReliefDesc, color: "bg-destructive/10 text-destructive" },
    { icon: Sofa, title: t.tipsPositions, desc: t.tipsPositionsDesc, color: "bg-primary/10 text-primary" },
    { icon: Apple, title: t.tipsFood, desc: t.tipsFoodDesc, color: "bg-accent/20 text-accent-foreground" },
    { icon: GlassWater, title: t.tipsDrinks, desc: t.tipsDrinksDesc, color: "bg-chart-4/15 text-foreground" },
    { icon: Ban, title: t.tipsAvoid, desc: t.tipsAvoidDesc, color: "bg-destructive/10 text-destructive" },
    { icon: Dumbbell, title: t.tipsExercise, desc: t.tipsExerciseDesc, color: "bg-ovulation/15 text-foreground" },
    { icon: Wind, title: t.tipsRelaxation, desc: t.tipsRelaxationDesc, color: "bg-primary/10 text-primary" },
    { icon: Moon, title: t.tipsCyclePhases, desc: t.tipsCyclePhasesDesc, color: "bg-chart-3/15 text-foreground" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground">{t.tipsTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.tipsSubtitle}</p>
      </motion.div>

      <div className="space-y-4">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tip.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1.5">{tip.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
