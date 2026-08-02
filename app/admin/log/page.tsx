"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  DayEntry,
  MonthData,
  daysInMonth,
  emptyEntry,
  formatDate,
  months,
  readStoredData,
  STORAGE_KEY,
} from "@/lib/dailyLog";

export default function AdminDailyLog() {
  const [activeMonth, setActiveMonth] = useState(months[0].id);
  const [data, setData] = useState<Record<string, MonthData>>(readStoredData);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const activeMonthMeta = useMemo(
    () => months.find((m) => m.id === activeMonth) ?? months[0],
    [activeMonth]
  );

  const numDays = daysInMonth(activeMonthMeta.year, activeMonthMeta.month);
  const monthData = data[activeMonth] ?? {};

  function updateEntry(dayKey: string, patch: Partial<DayEntry>) {
    setData((prev) => {
      const prevMonth = prev[activeMonth] ?? {};
      const prevEntry = prevMonth[dayKey] ?? emptyEntry;
      return {
        ...prev,
        [activeMonth]: {
          ...prevMonth,
          [dayKey]: { ...prevEntry, ...patch },
        },
      };
    });
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Admin</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            Daily <span className="text-[#ba0a07]">Log</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Weight, steps, workouts, mood, and meals — day by day.
          </p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <nav aria-label="Month tabs" className="flex flex-wrap gap-2 border-b border-black/10 pb-4">
            {months.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMonth(m.id)}
                className={
                  m.id === activeMonth
                    ? "rounded-sm bg-black px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-white"
                    : "rounded-sm border border-black/15 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-black/70 transition hover:border-black/40 hover:text-black"
                }
              >
                {m.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-black text-left text-xs font-extrabold uppercase tracking-[0.15em] text-black/60">
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Weight</th>
                  <th className="py-3 pr-4">Steps Walked</th>
                  <th className="py-3 pr-4 text-center">Gym Workout</th>
                  <th className="py-3 pr-4">Food Diary</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: numDays }, (_, i) => i + 1).map((day) => {
                  const dayKey = String(day);
                  const entry = monthData[dayKey] ?? emptyEntry;
                  return (
                    <Fragment key={day}>
                      <tr className="align-top">
                        <td className="py-2 pr-4 whitespace-nowrap font-semibold">
                          {formatDate(activeMonthMeta.year, activeMonthMeta.month, day)}
                        </td>
                        <td className="py-2 pr-4">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={entry.weight}
                            onChange={(e) => updateEntry(dayKey, { weight: e.target.value })}
                            placeholder="lbs"
                            className="w-20 rounded-sm border border-black/15 bg-white px-2 py-1 focus:border-[#ba0a07] focus:outline-none"
                          />
                        </td>
                        <td className="py-2 pr-4">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={entry.steps}
                            onChange={(e) => updateEntry(dayKey, { steps: e.target.value })}
                            placeholder="0"
                            className="w-24 rounded-sm border border-black/15 bg-white px-2 py-1 focus:border-[#ba0a07] focus:outline-none"
                          />
                        </td>
                        <td className="py-2 pr-4 text-center">
                          <input
                            type="checkbox"
                            checked={entry.gym}
                            onChange={(e) => updateEntry(dayKey, { gym: e.target.checked })}
                            className="h-4 w-4 accent-[#ba0a07]"
                          />
                        </td>
                        <td className="py-2 pr-4">
                          <input
                            type="text"
                            value={entry.food}
                            onChange={(e) => updateEntry(dayKey, { food: e.target.value })}
                            placeholder="What did you eat today?"
                            className="w-full min-w-[220px] rounded-sm border border-black/15 bg-white px-2 py-1 focus:border-[#ba0a07] focus:outline-none"
                          />
                        </td>
                      </tr>
                      <tr className="border-b border-black/10 align-top">
                        <td></td>
                        <td colSpan={3} className="py-2 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.15em] text-black/60">
                              Notes:
                            </span>
                            <input
                              type="text"
                              value={entry.notes}
                              onChange={(e) => updateEntry(dayKey, { notes: e.target.value })}
                              placeholder="Notes"
                              className="w-full rounded-sm border border-black/15 bg-white px-2 py-1 focus:border-[#ba0a07] focus:outline-none"
                            />
                          </div>
                        </td>
                        <td></td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-black/45">
            Entries are saved in your browser on this device.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
