import { blogPosts } from "@/lib/blog";
import { getCommentCounts } from "@/lib/comments";
import { getNewsArticles } from "@/lib/news";
import { getAggregatedVideos } from "@/lib/videos";

export type FeedContentType = "news" | "video" | "blog";

export type FeedItem = {
  id: string;
  /** The comments target id (video_id / article id / blog slug) */
  targetId: string;
  contentType: FeedContentType;
  /** Publisher / channel / "Ketovore Canada" */
  source: string;
  title: string;
  summary: string | null;
  /** External link (video/news) or internal path (blog) that the title links to */
  href: string;
  external: boolean;
  /** Internal detail page for this item (has the comments section) */
  detailHref: string;
  publishedAt: string | null;
  /** Label shown before the source, e.g. "Youtube Account:" */
  sourcePrefix?: string;
  /** If set, the source name links here (opens in a new tab) */
  sourceUrl?: string;
  /** Published comment count (filled in by withCommentCounts) */
  commentCount?: number;
};

/** Attach published comment counts to a list of feed items in one query. */
export async function withCommentCounts(items: FeedItem[]): Promise<FeedItem[]> {
  const counts = await getCommentCounts(
    items.map((i) => ({ type: i.contentType, id: i.targetId })),
  );
  return items.map((i) => ({ ...i, commentCount: counts.get(`${i.contentType}:${i.targetId}`) ?? 0 }));
}

const blogItem = (p: (typeof blogPosts)[number]): FeedItem => ({
  id: `blog:${p.slug}`,
  targetId: p.slug,
  contentType: "blog",
  source: "Ketovore Canada",
  title: p.title,
  summary: p.excerpt,
  href: `/blogs/${p.slug}`,
  external: false,
  detailHref: `/blogs/${p.slug}`,
  publishedAt: p.date,
});

export function getBlogFeed(): FeedItem[] {
  return [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(blogItem);
}

export async function getNewsFeed(
  limit = 40,
  offset = 0,
): Promise<{ items: FeedItem[]; total: number }> {
  const { articles, total } = await getNewsArticles(limit, offset);
  return {
    total,
    items: articles.map((a) => ({
      id: `news:${a.id}`,
      targetId: String(a.id),
      contentType: "news" as const,
      source: a.sourceName,
      title: a.title,
      summary: a.summary,
      href: a.url,
      external: true,
      detailHref: `/news/${a.id}`,
      publishedAt: a.publishedAt,
    })),
  };
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
      targetId: v.videoId,
      contentType: "video" as const,
      source: v.channelName,
      title: v.title,
      summary: v.description,
      href: v.url,
      external: true,
      detailHref: `/videos/${v.videoId}`,
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
  // Pull a generous window of each feed to merge; blog volume is tiny.
  const [{ items: videoItems, total: videoTotal }, { items: newsItems, total: newsTotal }] =
    await Promise.all([getVideoFeed(500, 0), getNewsFeed(200, 0)]);
  const all = [...videoItems, ...newsItems, ...getBlogFeed()].sort(byPublishedDesc);

  const total = videoTotal + newsTotal + blogPosts.length;
  const pageCount = Math.max(1, Math.ceil(all.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;

  return {
    items: await withCommentCounts(all.slice(start, start + pageSize)),
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
