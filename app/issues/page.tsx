import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Health Issues | Ketovore Canada",
  description: "The health challenges that started Rick's carnivore-first, keto-inspired journey.",
};

export default function HealthIssues() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Health Issues" />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Rick&apos;s journey</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            Health <span className="text-[#ba0a07]">Issues</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            The challenges that started it.
          </p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Where it started</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[48px] font-extrabold uppercase tracking-[0.03em]">The wake-up call</h2>
              <p className="mt-5 text-lg leading-8 text-black/65">
                Before Ketovore Canada, there were the health issues that forced a change: the labs, the symptoms, and the honest reckoning with how I&apos;d been eating and living.
              </p>
              <p className="mt-5 text-lg leading-8 text-black/65">
                This page is where I lay out those challenges in detail, so you can see exactly what pushed me toward a carnivore-first, keto-inspired way of eating, and why I stuck with it.
              </p>
            </div>

            <aside className="space-y-10 bg-[#f0f0f0] p-6">
              <section className="border-t-4 border-black pt-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">Rick&apos;s focus for Ketovore Canada</p>
                <blockquote className="mt-4 font-[family-name:var(--font-display)] text-[22px] font-extrabold uppercase leading-tight tracking-[0.03em]">
                  Transform. Educate. Inspire.
                </blockquote>
                <p className="mt-3 text-sm leading-6 text-black/55">Real food, honest measurement, and useful lessons from one Canadian&apos;s health journey.</p>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
