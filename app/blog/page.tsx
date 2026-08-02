import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Blog | Ketovore Canada",
  description: "Thoughts and lessons along Rick's carnivore-first, keto-inspired journey.",
};

const posts = [
  {
    date: "2026-07-28",
    title: "Why I Went Carnivore First",
    excerpt: "The short version of a long decision: how years of frustration with standard advice led me to strip things back to meat, eggs, and fat.",
  },
  {
    date: "2026-07-14",
    title: "What My Labs Actually Looked Like",
    excerpt: "A plain-language walk through the numbers that scared me into changing how I eat, and what's changed since.",
  },
  {
    date: "2026-06-30",
    title: "The First 30 Days Were Rough",
    excerpt: "Adaptation, cravings, and the mistakes I made trying to do this without a plan.",
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Blog" />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Rick&apos;s journey</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            The <span className="text-[#ba0a07]">Blog</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Thoughts and lessons along the way.
          </p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <div className="border-b border-black/20 pb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Latest posts</p>
              </div>

              <div className="mt-2">
                {posts.map((post) => (
                  <article key={post.title} className="group grid gap-3 border-b border-black/15 py-9">
                    <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-black/45">
                      {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold leading-tight transition group-hover:text-[#ba0a07] sm:text-3xl">
                      {post.title}
                    </h2>
                    <p className="max-w-3xl leading-7 text-black/60">{post.excerpt}</p>
                  </article>
                ))}
              </div>
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
