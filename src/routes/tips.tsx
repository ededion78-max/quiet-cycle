import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Flame, Sofa, Apple, GlassWater, Ban, Dumbbell, Wind, Moon,
  ThermometerSun, Heart, Clock, Pill,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import fetalImg from "@/assets/position-fetal.png";
import childPoseImg from "@/assets/position-child-pose.png";
import catCowImg from "@/assets/position-cat-cow.png";
import supineTwistImg from "@/assets/position-supine-twist.png";

export const Route = createFileRoute("/tips")({
  component: TipsPage,
  head: () => ({
    meta: [
      { title: "Health Tips — My Cycle" },
      { name: "description", content: "Evidence-based health tips for managing your menstrual cycle, pain relief, nutrition, and wellness." },
    ],
  }),
});

const positions = [
  {
    name: "Fetal Position",
    desc: "Lie on your side with knees pulled up to your chest. This reduces pressure on the abdominal muscles and helps relieve cramps.",
    img: fetalImg,
  },
  {
    name: "Child's Pose (Balasana)",
    desc: "Kneel on the floor, sit back on your heels, and stretch your arms forward. This gently stretches the lower back and eases tension.",
    img: childPoseImg,
  },
  {
    name: "Cat-Cow Stretch",
    desc: "On your hands and knees, alternate between arching your back (cat) and dropping your belly (cow). Improves flexibility and relieves back pain.",
    img: catCowImg,
  },
  {
    name: "Supine Twist",
    desc: "Lie on your back, bring your knees to one side while keeping shoulders flat. This stretches the lower back and relieves bloating.",
    img: supineTwistImg,
  },
];

function TipsPage() {
  const { t } = useI18n();

  const tips = [
    { icon: Flame, title: t.tipsPainRelief, desc: t.tipsPainReliefDesc, color: "bg-destructive/10 text-destructive" },
    { icon: Apple, title: t.tipsFood, desc: t.tipsFoodDesc, color: "bg-accent/20 text-accent-foreground" },
    { icon: GlassWater, title: t.tipsDrinks, desc: t.tipsDrinksDesc, color: "bg-chart-4/15 text-foreground" },
    { icon: Ban, title: t.tipsAvoid, desc: t.tipsAvoidDesc, color: "bg-destructive/10 text-destructive" },
    { icon: Dumbbell, title: t.tipsExercise, desc: t.tipsExerciseDesc, color: "bg-ovulation/15 text-foreground" },
    { icon: Wind, title: t.tipsRelaxation, desc: t.tipsRelaxationDesc, color: "bg-primary/10 text-primary" },
    { icon: Moon, title: t.tipsCyclePhases, desc: t.tipsCyclePhasesDesc, color: "bg-chart-3/15 text-foreground" },
  ];

  const cycleInfo = [
    { icon: Clock, title: "Menstrual Phase (Days 1-5)", desc: "Your uterus sheds its lining. You may experience cramps, fatigue, and mood changes. Rest is key. Drink warm liquids and eat iron-rich foods." },
    { icon: ThermometerSun, title: "Follicular Phase (Days 6-13)", desc: "Estrogen rises, you feel more energetic. Great time for starting new projects, exercising intensely, and socializing. Skin may look better." },
    { icon: Heart, title: "Ovulation (Day 14)", desc: "An egg is released. You're at peak fertility. Energy and libido are highest. You might notice mild ovulation pain (mittelschmerz) on one side." },
    { icon: Pill, title: "Luteal Phase (Days 15-28)", desc: "Progesterone rises, PMS symptoms may appear: bloating, mood swings, cravings, breast tenderness. Practice self-care and reduce salt intake." },
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

      {/* Pain Relief Positions with Images */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sofa className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">{t.tipsPositions}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {positions.map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="card-premium overflow-hidden"
            >
              <div className="bg-muted/30 p-4 flex items-center justify-center">
                <img
                  src={pos.img}
                  alt={pos.name}
                  loading="lazy"
                  width={280}
                  height={200}
                  className="w-full max-w-[220px] h-auto object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm mb-1">{pos.name}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{pos.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Understanding Your Cycle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">Understanding Your Cycle</h2>
        <div className="space-y-3">
          {cycleInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="card-premium p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1.5">{info.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{info.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* General Health Tips */}
      <h2 className="text-lg font-bold text-foreground mb-4">General Tips</h2>
      <div className="space-y-4">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              className="card-premium p-5"
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
