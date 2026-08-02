"use client";

import { Fragment, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  MonthData,
  daysInMonth,
  formatDate,
  isEntryFilled,
  months,
  readStoredData,
} from "@/lib/dailyLog";

export default function DailyLog() {
  const [data] = useState<Record<string, MonthData>>(readStoredData);

  const monthsWithEntries = months
    .map((m) => {
      const monthData = data[m.id] ?? {};
      const numDays = daysInMonth(m.year, m.month);
      const rows = Array.from({ length: numDays }, (_, i) => i + 1)
        .map((day) => ({ day, entry: monthData[String(day)] }))
        .filter((row) => row.entry && isEntryFilled(row.entry));
      return { ...m, rows };
    })
    .filter((m) => m.rows.length > 0);

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Daily Log" />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Track it</p>
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
          {monthsWithEntries.length === 0 ? (
            <p className="text-black/60">Nothing logged yet — check back soon.</p>
          ) : (
            monthsWithEntries.map((m) => (
              <div key={m.id} className="mb-12">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-[0.02em]">
                  {m.label}
                </h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black text-left text-xs font-extrabold uppercase tracking-[0.15em] text-black/60">
                        <th className="py-3 pr-4">Date</th>
                        <th className="py-3 pr-4">Weight</th>
                        <th className="py-3 pr-4">Steps Walked</th>
                        <th className="py-3 pr-4 text-center">Gym Workout</th>
                        <th className="py-3 pr-4">Glucose High</th>
                        <th className="py-3 pr-4">Glucose Low</th>
                        <th className="py-3 pr-4">Food Diary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {m.rows.map(({ day, entry }) => (
                        <Fragment key={day}>
                          <tr className="align-top">
                            <td className="py-2 pr-4 whitespace-nowrap font-semibold">
                              {formatDate(m.year, m.month, day)}
                            </td>
                            <td className="py-2 pr-4">{entry!.weight || "—"}</td>
                            <td className="py-2 pr-4">{entry!.steps || "—"}</td>
                            <td className="py-2 pr-4 text-center">{entry!.gym ? "✓" : "—"}</td>
                            <td className="py-2 pr-4">{entry!.glucoseHigh || "—"}</td>
                            <td className="py-2 pr-4">{entry!.glucoseLow || "—"}</td>
                            <td className="py-2 pr-4">{entry!.food || "—"}</td>
                          </tr>
                          <tr className="border-b border-black/10 align-top">
                            <td className="pb-2 pr-4"></td>
                            <td colSpan={6} className="pb-2 pr-4 text-black/60">
                              <span className="font-semibold text-black/80">Notes:</span> {entry!.notes || "—"}
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
