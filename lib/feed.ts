import { blogPosts } from "@/lib/blog";
import { getAggregatedVideos } from "@/lib/videos";

export type FeedContentType = "news" | "video" | "blog";

export type FeedItem = {
  id: string;
  contentType: FeedContentType;
  /** Publisher / channel / "Ketovore Canada" */
  source: string;
  title: string;
  summary: string | null;
  /** External link (video) or internal path (blog) */
  href: string;
  external: boolean;
  publishedAt: string | null;
  /** Label shown before the source, e.g. "Youtube Account:" */
  sourcePrefix?: string;
  /** If set, the source name links here (opens in a new tab) */
  sourceUrl?: string;
};

const blogItem = (p: (typeof blogPosts)[number]): FeedItem => ({
  id: `blog:${p.slug}`,
  contentType: "blog",
  source: "Ketovore Canada",
  title: p.title,
  summary: p.excerpt,
  href: "/blogs",
  external: false,
  publishedAt: p.date,
});

export function getBlogFeed(): FeedItem[] {
  return [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(blogItem);
}

export async function getVideoFeed(
  limit = 30,
  offset = 0,
): Promise<{ items: FeedItem[]; total: number }> {
  const { videos, total } = await getAggregatedVideos(limit, offset);
  return {
    total,
    items: videos.map((v) => ({
      id: `video:${v.videoId}`,
      contentType: "video" as const,
      source: v.channelName,
      title: v.title,
      summary: v.description,
      href: v.url,
      external: true,
      publishedAt: v.publishedAt,
      sourcePrefix: "Youtube Account:",
      sourceUrl: `https://www.youtube.com/channel/${v.channelId}`,
    })),
  };
}

/**
 * Combined newest-first feed for the homepage: every aggregated video plus
 * Rick's blog posts, interleaved by publish date.
 */
export async function getCombinedFeed(
  page = 1,
  pageSize = 20,
): Promise<{ items: FeedItem[]; page: number; pageCount: number; total: number }> {
  // Pull a generous window of videos to merge against; blog volume is tiny.
  const { items: videoItems, total: videoTotal } = await getVideoFeed(500, 0);
  const all = [...videoItems, ...getBlogFeed()].sort(byPublishedDesc);

  const total = videoTotal + blogPosts.length;
  const pageCount = Math.max(1, Math.ceil(all.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;

  return {
    items: all.slice(start, start + pageSize),
    page: current,
    pageCount,
    total,
  };
}

function byPublishedDesc(a: FeedItem, b: FeedItem): number {
  const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
  const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
  return bt - at;
}

export function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const diffMin = Math.round((Date.now() - then) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const hours = Math.round(diffMin / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.round(months / 12)} yr${Math.round(months / 12) === 1 ? "" : "s"} ago`;
}

export function contentTypeLabel(type: FeedContentType): string {
  return type;
}
