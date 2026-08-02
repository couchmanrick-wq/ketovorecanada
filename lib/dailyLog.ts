export const months = [
  { id: "2026-08", label: "Aug 26", year: 2026, month: 7 },
  { id: "2026-09", label: "Sept 26", year: 2026, month: 8 },
  { id: "2026-10", label: "Oct 26", year: 2026, month: 9 },
  { id: "2026-11", label: "Nov 26", year: 2026, month: 10 },
  { id: "2026-12", label: "Dec 26", year: 2026, month: 11 },
];

export type DayEntry = {
  weight: string;
  steps: string;
  gym: boolean;
  glucoseHigh: string;
  glucoseLow: string;
  food: string;
  notes: string;
};

export type MonthData = Record<string, DayEntry>;

export const emptyEntry: DayEntry = {
  weight: "",
  steps: "",
  gym: false,
  glucoseHigh: "",
  glucoseLow: "",
  food: "",
  notes: "",
};

export const STORAGE_KEY = "kc-daily-log";

export function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function formatDate(year: number, month: number, day: number) {
  const d = new Date(year, month, day);
  return d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });
}

export function readStoredData(): Record<string, MonthData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function isEntryFilled(entry: DayEntry) {
  return Boolean(
    entry.weight || entry.steps || entry.gym || entry.glucoseHigh || entry.glucoseLow || entry.food || entry.notes
  );
}
