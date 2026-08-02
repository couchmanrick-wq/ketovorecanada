import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Admin | Ketovore Canada",
  robots: { index: false, follow: false },
};

const navTabs = [
  { label: "Today", href: "/admin", active: true },
  { label: "Blog", href: "#" },
  { label: "AI Visibility", href: "#" },
  { label: "AI Crawl", href: "#" },
  { label: "SEO", href: "#" },
  { label: "Health", href: "#" },
  { label: "CRM", href: "#" },
  { label: "Daily Log", href: "/admin/log" },
];

export default function Admin() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader />

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="rounded-lg border-2 border-[#ba0a07] bg-white p-6 sm:p-8">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-4xl">
              Ketovore Canada Command Centre
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {navTabs.map((tab) =>
                tab.active ? (
                  <span
                    key={tab.label}
                    className="rounded-full bg-black px-5 py-2 text-sm font-extrabold text-white"
                  >
                    {tab.label}
                  </span>
                ) : (
                  <Link
                    key={tab.label}
                    href={tab.href}
                    className="no-underline rounded-full border border-black/20 px-5 py-2 text-sm font-extrabold text-black transition hover:border-[#ba0a07] hover:text-[#ba0a07]"
                  >
                    {tab.label}
                  </Link>
                )
              )}

              <Link
                href="/"
                className="no-underline ml-auto rounded-full bg-[#ba0a07] px-5 py-2 text-sm font-extrabold text-white transition hover:bg-black"
              >
                Log out
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 pb-14 lg:px-10">
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
