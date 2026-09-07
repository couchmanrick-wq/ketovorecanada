import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FilterNav from "@/components/FilterNav";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ketovore & Metabolic Health News",
  description:
    "News and headlines relevant to carnivore, ketovore, keto and low-carbohydrate approaches to metabolic health.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Daily News & Views" />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Read it</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            <span className="text-[#ba0a07]">News</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Headlines and studies relevant to carnivore, ketovore, keto and metabolic health.
          </p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/15">
            <FilterNav />
          </div>
          <div className="border border-dashed border-black/20 bg-white p-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-black/45">
              News feed coming soon
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">
              In the meantime, see the{" "}
              <a href="/videos" className="font-bold text-[#ba0a07]">
                latest videos
              </a>{" "}
              and{" "}
              <a href="/blogs" className="font-bold text-[#ba0a07]">
                blog posts
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
