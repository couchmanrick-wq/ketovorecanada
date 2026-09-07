import Link from "next/link";
import type { FeedItem } from "@/lib/feed";
import { relativeTime } from "@/lib/feed";

const PILL: Record<FeedItem["contentType"], string> = {
  news: "news",
  video: "video",
  blog: "blog",
};

function FeedCard({ item }: { item: FeedItem }) {
  const time = relativeTime(item.publishedAt);
  const titleClass =
    "font-[family-name:var(--font-display)] text-xl font-extrabold leading-tight text-black transition group-hover:text-[#ba0a07] sm:text-2xl";

  return (
    <article className="border border-black/12 bg-white p-6 transition hover:border-black/25">
      <span className="inline-block rounded-sm bg-black/[0.06] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black/60">
        {PILL[item.contentType]}
      </span>

      {item.external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="group mt-4 block no-underline">
          <h3 className={titleClass}>{item.title}</h3>
        </a>
      ) : (
        <Link href={item.href} className="group mt-4 block no-underline">
          <h3 className={titleClass}>{item.title}</h3>
        </Link>
      )}

      {item.summary ? (
        <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-black/55">{item.summary}</p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-black/45">
        <span className="uppercase tracking-[0.1em] text-black/60">{item.source}</span>
        {time ? (
          <time dateTime={item.publishedAt ?? undefined}>{time}</time>
        ) : null}
      </div>
    </article>
  );
}

export default function FeedList({ items }: { items: FeedItem[] }) {
  if (items.length === 0) {
    return <p className="py-10 text-black/55">Nothing here yet — check back soon.</p>;
  }
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <FeedCard key={item.id} item={item} />
      ))}
    </div>
  );
}
