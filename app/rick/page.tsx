import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Who Is Rick? Rick Couchman's Ketovore Journey",
  description: "Meet Rick Couchman, founder of Ketovore Canada, and learn why he began sharing his practical carnivore-first, keto-inspired health journey.",
  path: "/rick",
});

const journeyLinks = [
  { title: "Who Is Rick", detail: "The guy behind Ketovore Canada", href: "/rick" },
  { title: "Health Issues", detail: "The challenges that started it", href: "/issues" },
  { title: "Daily Log", detail: "The numbers, meals, and movement", href: "/log" },
  { title: "Blog", detail: "Thoughts, lessons along the journey", href: "/blog" },
];

export default function WhoIsRick() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="About" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/rick#webpage`,
          url: `${SITE_URL}/rick`,
          name: "Who Is Rick? Rick Couchman's Ketovore Journey",
          description: "Meet Rick Couchman, founder of Ketovore Canada, and learn about his carnivore-first, keto-inspired health journey.",
          inLanguage: "en-CA",
          mainEntity: { "@id": `${SITE_URL}/rick#person` },
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Rick&apos;s journey</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            Who is <span className="text-[#ba0a07]">Rick?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            The guy behind Ketovore Canada.
          </p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Start here</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[42px] font-extrabold uppercase tracking-[0.03em]">My story</h2>
              <p className="mt-5 text-lg leading-8 text-black/65">
                I&apos;m Rick Couchman, a Canadian who went carnivore-first and keto-inspired to take my health back. Ketovore Canada is where I share what&apos;s actually working: the meals, the numbers, and the honest setbacks along the way.
              </p>
              <p className="mt-5 text-lg leading-8 text-black/65">
                This isn&apos;t about perfection. It&apos;s about finding a sustainable way of eating and living that supports real health, and sharing the resources and lessons I wish I&apos;d had when I started.
              </p>
            </div>

            <aside aria-label="About Rick Couchman" className="space-y-10 bg-[#f0f0f0] p-6">
              <nav aria-label="Rick Couchman pages">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Meet the site owner</p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-[22px] font-extrabold uppercase leading-tight tracking-[0.04em]">
                  About Rick Couchman
                </h2>
                <ol className="mt-5">
                  {journeyLinks.map((item, index) => (
                    <li key={item.href} className="grid grid-cols-[28px_1fr] gap-3 border-b border-black/15 py-4 first:pt-3">
                      <span aria-hidden="true" className="font-[family-name:var(--font-display)] text-xl font-bold text-[#ba0a07]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-extrabold">
                          <Link
                            href={item.href}
                            aria-current={item.href === "/rick" ? "page" : undefined}
                            className="underline decoration-[#ba0a07] decoration-1 underline-offset-4 transition hover:text-[#ba0a07]"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-black/65">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>

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
