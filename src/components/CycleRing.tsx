/**
 * CycleRing - Central countdown circle
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
  const size = 200;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = prediction
    ? Math.min(prediction.currentCycleDay / prediction.cycleLength, 1)
    : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--cycle-ring-bg)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke="var(--cycle-ring)" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {prediction ? (
            <>
              <motion.span
                className="text-4xl font-bold text-foreground"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {prediction.daysUntilNextPeriod}
              </motion.span>
              <span className="text-xs text-muted-foreground mt-0.5">{t.days}</span>
              <span className="text-[10px] text-muted-foreground">{t.untilNextCycle}</span>
            </>
          ) : (
            <span className="text-sm font-medium text-muted-foreground text-center px-6">
              {t.markFirstCycle}
            </span>
          )}
        </div>
      </div>

      {prediction && (
        <motion.div
          className="flex gap-5 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <p className="text-[10px] text-muted-foreground">{t.cycle}</p>
            <p className="text-xs font-semibold text-foreground">
              {t.day} {prediction.currentCycleDay}/{prediction.cycleLength}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">{t.nextCycle}</p>
            <p className="text-xs font-semibold text-foreground">
              {format(prediction.nextPeriodDate, "d MMM")}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">{t.ovulation}</p>
            <p className="text-xs font-semibold text-ovulation">
              {format(prediction.ovulationWindowStart, "d")}-{format(prediction.ovulationWindowEnd, "d MMM")}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
