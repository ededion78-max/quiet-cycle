/**
 * PeriodCalendar - Interactive monthly calendar with i18n support
 */

import { useState, useMemo } from "react";
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, isSameMonth, isSameDay, addMonths, subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DayLog, Prediction } from "@/lib/period-tracker";
import { isOvulationDay, isPredictedPeriodDay } from "@/lib/period-tracker";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface PeriodCalendarProps {
  logs: DayLog[];
  prediction: Prediction | null;
  onTogglePeriod: (date: Date) => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

export function PeriodCalendar({ logs, prediction, onTogglePeriod, onSelectDate, selectedDate }: PeriodCalendarProps) {
  const { t } = useI18n();
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const dayNames = [t.mon, t.tue, t.wed, t.thu, t.fri, t.sat, t.sun];

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

  // Month names in current language
  const monthNames: Record<string, string[]> = {
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    sq: ["Janar","Shkurt","Mars","Prill","Maj","Qershor","Korrik","Gusht","Shtator","Tetor","Nëntor","Dhjetor"],
    es: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    fr: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    tr: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
  };

  const { lang } = useI18n();
  const monthLabel = `${(monthNames[lang] || monthNames.en)[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h3 className="text-lg font-semibold text-foreground capitalize">{monthLabel}</h3>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((name) => (
          <div key={name} className="text-center text-xs font-medium text-muted-foreground py-1">{name}</div>
        ))}
      </div>

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
                  onClick={() => { onSelectDate(day); onTogglePeriod(day); }}
                >
                  {format(day, "d")}
                  {isOvulationDay(day, prediction) && !getLogForDate(day)?.isPeriod && (
                    <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-ovulation" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 mt-4 justify-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-period-active" />
          {t.period}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-period-predicted" />
          {t.prediction}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-ovulation" />
          {t.ovulation}
        </div>
      </div>
    </div>
  );
}
