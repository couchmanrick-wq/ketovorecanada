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
  avgGlucose: string;
  food: string;
  notes: string;
};

export type MonthData = Record<string, DayEntry>;

export const emptyEntry: DayEntry = {
  weight: "",
  steps: "",
  gym: false,
  avgGlucose: "",
  food: "",
  notes: "",
};

export const DAILY_LOG_KV_KEY = "kc-daily-log";

export function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function formatDate(year: number, month: number, day: number) {
  const d = new Date(year, month, day);
  return d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });
}

export async function fetchDailyLog(): Promise<Record<string, MonthData>> {
  try {
    const res = await fetch("/api/daily-log", { cache: "no-store" });
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export async function saveDailyLog(data: Record<string, MonthData>): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/daily-log", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function isEntryFilled(entry: DayEntry) {
  return Boolean(
    entry.weight || entry.steps || entry.gym || entry.avgGlucose || entry.food || entry.notes
  );
}
