import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Admin | Ketovore Canada",
  robots: { index: false, follow: false },
};

export default function Admin() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Behind the scenes</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            Admin
          </h1>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <Link
            href="/admin/log"
            className="no-underline inline-block rounded-sm border border-black/15 bg-white p-6 transition hover:border-[#ba0a07]"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">Daily Log</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-[0.02em]">
              Enter today&apos;s numbers
            </h2>
            <p className="mt-2 text-sm text-black/60">Weight, steps, gym, feeling, and food diary.</p>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
