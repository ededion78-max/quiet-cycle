import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Shield,
  Calendar,
  BarChart3,
  Heart,
  BookOpen,
  Globe,
  Smartphone,
  Droplets,
  HelpCircle,
} from "lucide-react";
import appIcon from "@/assets/app-icon.png";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — My Cycle" },
      { name: "description", content: "About My Cycle — a professional period tracking app created by DS Interactive." },
    ],
  }),
});

function AboutPage() {
  const { t } = useI18n();

  const features = [
    { icon: Calendar, label: t.featureCycleTracking },
    { icon: Heart, label: t.featureSymptomLogging },
    { icon: BarChart3, label: t.featureAnalytics },
    { icon: BookOpen, label: t.featureHealthEducation },
    { icon: Globe, label: t.featureLanguages },
    { icon: Smartphone, label: t.featureOffline },
    { icon: Droplets, label: t.featureHydration },
    { icon: HelpCircle, label: t.featureFaq },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg">
          <img src={appIcon} alt="My Cycle" width={80} height={80} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">{t.appTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.aboutSubtitle}</p>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border mb-4"
      >
        <p className="text-sm text-muted-foreground leading-relaxed">{t.aboutDescription}</p>
      </motion.div>

      {/* Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border border-border mb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">{t.privacyTitle}</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{t.privacyDescription}</p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-6 border border-border mb-4"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">{t.featuresTitle}</h3>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/50">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs text-foreground font-medium">{f.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Created by */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center py-8"
      >
        <p className="text-xs text-muted-foreground mb-1">{t.createdBy}</p>
        <p className="text-lg font-bold text-foreground tracking-tight">DS Interactive</p>
        <p className="text-[10px] text-muted-foreground mt-2">{t.version} 1.0.0</p>
      </motion.div>
    </div>
  );
}
