import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import FilterNav from "@/components/FilterNav";
import FeedList from "@/components/FeedList";
import FeedPagination from "@/components/FeedPagination";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { getVideoFeed, withCommentCounts } from "@/lib/feed";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 30;
const PAGE_URL = `${SITE_URL}/videos`;

export const metadata: Metadata = pageMetadata({
  title: "Latest Carnivore & Ketovore YouTube Videos",
  description:
    "A live, aggregated feed of the newest YouTube uploads from every carnivore, ketovore, keto and metabolic health creator in the Ketovore Canada directory — newest first.",
  path: "/videos",
});

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  const { items: rawItems, total } = await getVideoFeed(PAGE_SIZE, (page - 1) * PAGE_SIZE);
  const items = await withCommentCounts(rawItems);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Latest Videos" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${PAGE_URL}#webpage`,
          url: PAGE_URL,
          name: "Latest Carnivore & Ketovore YouTube Videos",
          description:
            "Aggregated newest-first feed of YouTube uploads from the Ketovore Canada influencers and authorities directory.",
          inLanguage: "en-CA",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">Watch it</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-5xl">
            Latest <span className="text-[#ba0a07]">Videos</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Every new upload from the carnivore, ketovore, keto and metabolic health creators in our{" "}
            <Link href="/ketovore-links" className="font-bold text-white underline">
              directory
            </Link>
            , aggregated and sorted newest first.
          </p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/15">
            <FilterNav />
            {total > 0 ? (
              <p className="hidden pb-4 text-xs font-extrabold uppercase tracking-wide text-black/40 sm:block">
                {total.toLocaleString("en-CA")} videos
              </p>
            ) : null}
          </div>

          {items.length === 0 ? (
            <p className="py-10 text-black/60">
              No videos yet — the aggregator runs every 30 minutes. Check back soon.
            </p>
          ) : (
            <>
              <FeedList items={items} />
              <FeedPagination page={page} pageCount={pageCount} basePath="/videos" />
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
