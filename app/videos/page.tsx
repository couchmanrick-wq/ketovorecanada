import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { formatVideoDate, getAggregatedVideos, relativeTime } from "@/lib/videos";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 60;
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
  const offset = (page - 1) * PAGE_SIZE;

  const { videos, total } = await getAggregatedVideos(PAGE_SIZE, offset);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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
          {total > 0 ? (
            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white/55">
              {total.toLocaleString("en-CA")} videos tracked
            </p>
          ) : null}
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          {videos.length === 0 ? (
            <p className="text-black/60">
              No videos yet — the aggregator runs every 30 minutes. Check back soon.
            </p>
          ) : (
            <>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((v) => (
                  <li key={v.videoId} className="flex flex-col border border-black/15 bg-white">
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      aria-label={`${v.title} — ${v.channelName} on YouTube`}
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-black/5">
                        {v.thumbnailUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={v.thumbnailUrl}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                          />
                        ) : null}
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#ba0a07]">
                          {v.channelName}
                        </p>
                        <h2 className="mt-2 line-clamp-3 font-[family-name:var(--font-display)] text-base font-extrabold leading-snug group-hover:text-[#ba0a07]">
                          {v.title}
                        </h2>
                        <p className="mt-2 text-xs font-semibold text-black/50">
                          <time dateTime={v.publishedAt ?? undefined} title={formatVideoDate(v.publishedAt)}>
                            {relativeTime(v.publishedAt)}
                          </time>
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              <nav
                aria-label="Pagination"
                className="mt-12 flex items-center justify-between border-t-2 border-black pt-6 text-sm font-extrabold uppercase tracking-wide"
              >
                {page > 1 ? (
                  <Link href={`/videos?page=${page - 1}`} className="transition hover:text-[#ba0a07]">
                    ← Newer
                  </Link>
                ) : (
                  <span className="text-black/25">← Newer</span>
                )}
                <span className="text-black/55">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link href={`/videos?page=${page + 1}`} className="transition hover:text-[#ba0a07]">
                    Older →
                  </Link>
                ) : (
                  <span className="text-black/25">Older →</span>
                )}
              </nav>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
