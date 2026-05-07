/**
 * CycleRing - Premium countdown circle with glow effects
 */

import { motion } from "framer-motion";
import type { Prediction } from "@/lib/period-tracker";
import { format } from "date-fns";
import { useI18n } from "@/lib/i18n";

interface CycleRingProps {
  prediction: Prediction | null;
}

export function CycleRing({ prediction }: CycleRingProps) {
  const { t } = useI18n();
  const size = 220;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = prediction
    ? Math.min(prediction.currentCycleDay / prediction.cycleLength, 1)
    : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-soft/30 to-premium-accent/10 blur-xl scale-110" />
        
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--cycle-ring)" />
              <stop offset="100%" stopColor="var(--coral-warm)" />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--cycle-ring-bg)" strokeWidth={stroke} opacity="0.4" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke="url(#ringGradient)" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {prediction ? (
            <>
              <motion.span
                className="text-5xl font-extrabold text-gradient"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              >
                {prediction.daysUntilNextPeriod}
              </motion.span>
              <span className="text-xs font-medium text-muted-foreground mt-1">{t.days}</span>
              <span className="text-[10px] text-muted-foreground/70">{t.untilNextCycle}</span>
            </>
          ) : (
            <span className="text-sm font-medium text-muted-foreground text-center px-8 leading-relaxed">
              {t.markFirstCycle}
            </span>
          )}
        </div>
      </div>

      {prediction && (
        <motion.div
          className="flex gap-6 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex flex-col">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60">{t.cycle}</p>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {t.day} {prediction.currentCycleDay}/{prediction.cycleLength}
            </p>
          </div>
          <div className="w-px bg-border" />
          <div className="flex flex-col">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60">{t.nextCycle}</p>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {format(prediction.nextPeriodDate, "d MMM")}
            </p>
          </div>
          <div className="w-px bg-border" />
          <div className="flex flex-col">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60">{t.ovulation}</p>
            <p className="text-sm font-bold text-ovulation mt-0.5">
              {format(prediction.ovulationWindowStart, "d")}-{format(prediction.ovulationWindowEnd, "d MMM")}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
