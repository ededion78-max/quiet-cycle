/**
 * Period Tracker - Core Logic
 * 
 * Manages cycle data, predictions, and localStorage persistence.
 * Default cycle length: 28 days. Predictions based on average of last 3 cycles.
 * Ovulation window: approximately 14 days before next predicted period.
 */

import { differenceInDays, addDays, format, isSameDay, isWithinInterval, startOfDay } from "date-fns";

// ---- Types ----

export type FlowIntensity = "light" | "medium" | "heavy";
export type MoodType = "happy" | "sad" | "irritable";

export interface DayLog {
  date: string; // ISO date string YYYY-MM-DD
  isPeriod: boolean;
  flow?: FlowIntensity;
  pain?: boolean;
  mood?: MoodType;
  notes?: string;
}

export interface CycleData {
  logs: DayLog[];
  cycleStarts: string[]; // sorted ISO date strings of period start dates
}

const STORAGE_KEY = "period-tracker-data";
const DEFAULT_CYCLE_LENGTH = 28;
const OVULATION_OFFSET = 14; // days before next period

// ---- Persistence (LocalStorage) ----

export function loadData(): CycleData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore parse errors */ }
  return { logs: [], cycleStarts: [] };
}

export function saveData(data: CycleData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---- Cycle length calculation ----

/** Calculate average cycle length from last N cycle starts (default 3). */
export function getAverageCycleLength(cycleStarts: string[], count = 3): number {
  if (cycleStarts.length < 2) return DEFAULT_CYCLE_LENGTH;

  const sorted = [...cycleStarts].sort();
  const lengths: number[] = [];

  for (let i = 1; i < sorted.length; i++) {
    lengths.push(differenceInDays(new Date(sorted[i]), new Date(sorted[i - 1])));
  }

  // Take the last `count` lengths
  const recent = lengths.slice(-count);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  return Math.round(avg);
}

// ---- Predictions ----

export interface Prediction {
  nextPeriodDate: Date;
  ovulationWindowStart: Date;
  ovulationWindowEnd: Date;
  daysUntilNextPeriod: number;
  cycleLength: number;
  currentCycleDay: number;
}

export function getPrediction(cycleStarts: string[]): Prediction | null {
  if (cycleStarts.length === 0) return null;

  const sorted = [...cycleStarts].sort();
  const lastStart = new Date(sorted[sorted.length - 1]);
  const cycleLength = getAverageCycleLength(sorted);
  const nextPeriod = addDays(lastStart, cycleLength);
  const today = startOfDay(new Date());
  const daysUntil = differenceInDays(nextPeriod, today);
  const currentDay = differenceInDays(today, lastStart) + 1;

  // Ovulation window: days 12-16 (centered on day 14 before next period)
  const ovulationDay = addDays(nextPeriod, -OVULATION_OFFSET);
  const ovulationStart = addDays(ovulationDay, -2);
  const ovulationEnd = addDays(ovulationDay, 2);

  return {
    nextPeriodDate: nextPeriod,
    ovulationWindowStart: ovulationStart,
    ovulationWindowEnd: ovulationEnd,
    daysUntilNextPeriod: Math.max(0, daysUntil),
    cycleLength,
    currentCycleDay: Math.max(1, currentDay),
  };
}

// ---- Day log helpers ----

export function getLogForDate(logs: DayLog[], date: Date): DayLog | undefined {
  const key = format(date, "yyyy-MM-dd");
  return logs.find((l) => l.date === key);
}

export function upsertLog(logs: DayLog[], log: DayLog): DayLog[] {
  const idx = logs.findIndex((l) => l.date === log.date);
  if (idx >= 0) {
    const updated = [...logs];
    updated[idx] = log;
    return updated;
  }
  return [...logs, log];
}

/** Check if a date falls in the predicted ovulation window */
export function isOvulationDay(date: Date, prediction: Prediction | null): boolean {
  if (!prediction) return false;
  return isWithinInterval(date, {
    start: prediction.ovulationWindowStart,
    end: prediction.ovulationWindowEnd,
  });
}

/** Check if a date is a predicted period day (first 5 days of predicted cycle) */
export function isPredictedPeriodDay(date: Date, prediction: Prediction | null): boolean {
  if (!prediction) return false;
  const nextStart = prediction.nextPeriodDate;
  return isWithinInterval(date, {
    start: nextStart,
    end: addDays(nextStart, 4),
  });
}
