import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import FilterNav from "@/components/FilterNav";
import FeedList from "@/components/FeedList";
import FeedPagination from "@/components/FeedPagination";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { getNewsFeed } from "@/lib/feed";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 30;
const PAGE_URL = `${SITE_URL}/news`;

export const metadata: Metadata = pageMetadata({
  title: "Ketovore & Carnivore Diet News",
  description:
    "The latest news articles and research mentioning ketovore or carnivore, gathered from across the web three times a day.",
  path: "/news",
});

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  const { items, total } = await getNewsFeed(PAGE_SIZE, (page - 1) * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Daily News & Views" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${PAGE_URL}#webpage`,
          url: PAGE_URL,
          name: "Ketovore & Carnivore Diet News",
          description:
            "Latest news articles and research mentioning ketovore or carnivore, updated three times a day.",
          inLanguage: "en-CA",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Read it</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            <span className="text-[#ba0a07]">News</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            The latest articles and research mentioning <strong>ketovore</strong> or{" "}
            <strong>carnivore</strong>, gathered from across the web three times a day.
          </p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/15">
            <FilterNav />
            {total > 0 ? (
              <p className="hidden pb-4 text-xs font-extrabold uppercase tracking-wide text-black/40 sm:block">
                {total.toLocaleString("en-CA")} articles
              </p>
            ) : null}
          </div>

          {items.length === 0 ? (
            <div className="border border-dashed border-black/20 bg-white p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-black/45">
                No articles yet
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">
                The news search runs three times a day — check back soon.
              </p>
            </div>
          ) : (
            <>
              <FeedList items={items} />
              <FeedPagination page={page} pageCount={pageCount} basePath="/news" />
              <p className="mt-8 text-xs leading-5 text-black/40">
                Headlines are gathered automatically from public news search and research
                indexes. A listing is not an endorsement.
              </p>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
