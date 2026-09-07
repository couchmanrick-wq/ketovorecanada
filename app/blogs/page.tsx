import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FilterNav from "@/components/FilterNav";
import FeedList from "@/components/FeedList";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { getBlogFeed, withCommentCounts } from "@/lib/feed";
import { blogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Ketovore Blog: Carnivore, Keto and Metabolic Health",
  description:
    "Read practical lessons, personal results, and honest observations from Rick Couchman's carnivore-first, keto-inspired health journey.",
  path: "/blogs",
});

export default async function BlogsPage() {
  const items = await withCommentCounts(getBlogFeed());

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Blog" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/blogs#webpage`,
          url: `${SITE_URL}/blogs`,
          name: "Ketovore Blog: Carnivore, Keto and Metabolic Health",
          description:
            "Practical lessons and personal observations from Rick Couchman's carnivore-first, keto-inspired health journey.",
          inLanguage: "en-CA",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: blogPosts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "CreativeWork",
                name: post.title,
                description: post.excerpt,
                dateCreated: post.date,
                author: { "@id": `${SITE_URL}/rick#person` },
              },
            })),
          },
        }}
      />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Rick&apos;s journey</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            The <span className="text-[#ba0a07]">Blog</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">Thoughts and lessons along the way.</p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/15">
            <FilterNav />
          </div>
          <FeedList items={items} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
