/**
 * CycleRing - Central countdown circle
 * Shows days until next period with an animated ring indicator.
 */

import { motion } from "framer-motion";
import type { Prediction } from "@/lib/period-tracker";
import { format } from "date-fns";

interface CycleRingProps {
  prediction: Prediction | null;
}

export function CycleRing({ prediction }: CycleRingProps) {
  // Ring geometry
  const size = 220;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate progress (how far through the cycle we are)
  const progress = prediction
    ? Math.min(prediction.currentCycleDay / prediction.cycleLength, 1)
    : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background ring */}
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--cycle-ring-bg)"
            strokeWidth={stroke}
          />
          {/* Progress ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--cycle-ring)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {prediction ? (
            <>
              <motion.span
                className="text-5xl font-bold text-foreground"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {prediction.daysUntilNextPeriod}
              </motion.span>
              <span className="text-sm text-muted-foreground mt-1">
                {prediction.daysUntilNextPeriod === 1 ? "ditë" : "ditë"}
              </span>
              <span className="text-xs text-muted-foreground">
                deri në ciklin tjetër
              </span>
            </>
          ) : (
            <>
              <span className="text-lg font-medium text-muted-foreground text-center px-6">
                Shëno ciklin tënd të parë
              </span>
            </>
          )}
        </div>
      </div>

      {/* Cycle info below the ring */}
      {prediction && (
        <motion.div
          className="flex gap-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <p className="text-xs text-muted-foreground">Cikli</p>
            <p className="text-sm font-semibold text-foreground">
              Dita {prediction.currentCycleDay}/{prediction.cycleLength}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Cikli i ardhshëm</p>
            <p className="text-sm font-semibold text-foreground">
              {format(prediction.nextPeriodDate, "d MMM")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ovulimi</p>
            <p className="text-sm font-semibold text-ovulation">
              {format(prediction.ovulationWindowStart, "d")}-{format(prediction.ovulationWindowEnd, "d MMM")}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
