/**
 * PeriodCalendar - Interactive monthly calendar
 * Users can click dates to mark period start/end days.
 * Shows period days, predicted days, and ovulation window.
 */

import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { sq } from "date-fns/locale/sq";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DayLog, Prediction } from "@/lib/period-tracker";
import { isOvulationDay, isPredictedPeriodDay } from "@/lib/period-tracker";
import { cn } from "@/lib/utils";

interface PeriodCalendarProps {
  logs: DayLog[];
  prediction: Prediction | null;
  onTogglePeriod: (date: Date) => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

export function PeriodCalendar({
  logs,
  prediction,
  onTogglePeriod,
  onSelectDate,
  selectedDate,
}: PeriodCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Build calendar grid
  const weeks = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const result: Date[][] = [];
    let day = calStart;
    while (day <= calEnd) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      result.push(week);
    }
    return result;
  }, [currentMonth]);

  const dayNames = ["Hë", "Ma", "Më", "En", "Pr", "Sh", "Di"];

  const getLogForDate = (date: Date) =>
    logs.find((l) => l.date === format(date, "yyyy-MM-dd"));

  const getDayClasses = (date: Date) => {
    const log = getLogForDate(date);
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const isToday = isSameDay(date, new Date());
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isPeriod = log?.isPeriod;
    const isOvulation = isOvulationDay(date, prediction);
    const isPredicted = isPredictedPeriodDay(date, prediction);

    return cn(
      "relative w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all cursor-pointer",
      !isCurrentMonth && "opacity-30",
      isCurrentMonth && "hover:bg-symptom-hover",
      isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      isPeriod && "bg-period-active text-primary-foreground font-semibold",
      !isPeriod && isPredicted && "bg-period-predicted",
      !isPeriod && !isPredicted && isOvulation && "bg-ovulation/20 text-foreground",
      isSelected && !isPeriod && "ring-2 ring-primary",
    );
  };

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h3 className="text-lg font-semibold text-foreground capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: sq })}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((name) => (
          <div key={name} className="text-center text-xs font-medium text-muted-foreground py-1">
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentMonth, "yyyy-MM")}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
              {week.map((day) => (
                <button
                  key={day.toISOString()}
                  className={getDayClasses(day)}
                  onClick={() => {
                    onSelectDate(day);
                    onTogglePeriod(day);
                  }}
                >
                  {format(day, "d")}
                  {/* Ovulation dot indicator */}
                  {isOvulationDay(day, prediction) && !getLogForDate(day)?.isPeriod && (
                    <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-ovulation" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-period-active" />
          Perioda
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-period-predicted" />
          Parashikim
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-ovulation" />
          Ovulim
        </div>
      </div>
    </div>
  );
}
