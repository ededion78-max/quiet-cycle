import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Moon, Sun, Download, Upload, Trash2, Bell, Droplets, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings — My Cycle" },
      { name: "description", content: "Customize your period tracker experience." },
    ],
  }),
});

function SettingsPage() {
  const { t } = useI18n();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleExport = () => {
    const data: Record<string, string | null> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("period-tracker")) {
        data[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-cycle-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          Object.entries(data).forEach(([k, v]) => {
            if (typeof v === "string") localStorage.setItem(k, v);
          });
          window.location.reload();
        } catch { /* ignore */ }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("period-tracker")) keys.push(key);
    }
    keys.forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  };

  const settingsSections = [
    {
      icon: darkMode ? Moon : Sun,
      title: t.darkMode,
      desc: darkMode ? "Dark theme active" : "Light theme active",
      action: (
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-7 rounded-full transition-all relative ${
            darkMode ? "gradient-primary" : "bg-muted"
          }`}
        >
          <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
            darkMode ? "left-5.5 translate-x-0" : "left-0.5"
          }`} />
        </button>
      ),
    },
    {
      icon: Download,
      title: t.exportData,
      desc: "Download your data as JSON backup",
      action: (
        <button onClick={handleExport} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
          {t.exportData}
        </button>
      ),
    },
    {
      icon: Upload,
      title: t.importData,
      desc: "Restore from a JSON backup file",
      action: (
        <button onClick={handleImport} className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
          {t.importData}
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">{t.settingsTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.settingsSubtitle}</p>
      </motion.div>

      <div className="space-y-3">
        {settingsSections.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card-premium p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{s.title}</p>
                    <p className="text-[10px] text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                {s.action}
              </div>
            </motion.div>
          );
        })}

        {/* Privacy info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">{t.privacyTitle}</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{t.privacyDescription}</p>
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.resetData}</p>
                <p className="text-[10px] text-muted-foreground">Remove all tracking data</p>
              </div>
            </div>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors"
              >
                {t.resetData}
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setShowResetConfirm(false)} className="px-3 py-2 rounded-xl bg-muted text-muted-foreground text-xs font-medium">
                  Cancel
                </button>
                <button onClick={handleReset} className="px-3 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-medium">
                  Confirm
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
