import { getCloudflareContext } from "@opennextjs/cloudflare";

export type AggregatedVideo = {
  videoId: string;
  channelKey: string;
  channelId: string;
  channelName: string;
  title: string;
  url: string;
  thumbnailUrl: string | null;
  description: string | null;
  publishedAt: string | null;
};

type VideoRow = {
  video_id: string;
  channel_key: string;
  channel_id: string;
  channel_name: string;
  title: string;
  url: string;
  thumbnail_url: string | null;
  description: string | null;
  published_at: string | null;
};

const rowToVideo = (row: VideoRow): AggregatedVideo => ({
  videoId: row.video_id,
  channelKey: row.channel_key,
  channelId: row.channel_id,
  channelName: row.channel_name,
  title: row.title,
  url: row.url,
  thumbnailUrl: row.thumbnail_url,
  description: row.description,
  publishedAt: row.published_at,
});

/**
 * Newest-first page of aggregated YouTube uploads from every channel in the
 * Influencers & Authorities directory. Populated by the ketovorecanada-ingest
 * Worker; returns an empty page if the query fails so the route still renders.
 */
export async function getAggregatedVideos(
  limit = 60,
  offset = 0,
): Promise<{ videos: AggregatedVideo[]; total: number }> {
  try {
    const { env } = getCloudflareContext();
    const db = (env as unknown as { DB?: D1Database }).DB;
    if (!db) return { videos: [], total: 0 };

    const [page, count] = await Promise.all([
      db
        .prepare(
          `SELECT video_id, channel_key, channel_id, channel_name, title, url,
                  thumbnail_url, description, published_at
           FROM videos
           WHERE published_at IS NOT NULL
           ORDER BY published_at DESC
           LIMIT ? OFFSET ?`,
        )
        .bind(limit, offset)
        .all<VideoRow>(),
      db.prepare(`SELECT COUNT(*) AS n FROM videos WHERE published_at IS NOT NULL`).first<{ n: number }>(),
    ]);

    return {
      videos: (page.results ?? []).map(rowToVideo),
      total: count?.n ?? 0,
    };
  } catch (error) {
    console.error("getAggregatedVideos failed", error);
    return { videos: [], total: 0 };
  }
}

export async function getAggregatedChannels(): Promise<
  Array<{ channelKey: string; channelName: string; channelId: string; videoCount: number; latest: string | null }>
> {
  try {
    const { env } = getCloudflareContext();
    const db = (env as unknown as { DB?: D1Database }).DB;
    if (!db) return [];

    const { results } = await db
      .prepare(
        `SELECT channel_key, channel_name, channel_id,
                COUNT(*) AS video_count, MAX(published_at) AS latest
         FROM videos
         GROUP BY channel_key
         ORDER BY channel_name COLLATE NOCASE ASC`,
      )
      .all<{ channel_key: string; channel_name: string; channel_id: string; video_count: number; latest: string | null }>();

    return (results ?? []).map((r) => ({
      channelKey: r.channel_key,
      channelName: r.channel_name,
      channelId: r.channel_id,
      videoCount: r.video_count,
      latest: r.latest,
    }));
  } catch (error) {
    console.error("getAggregatedChannels failed", error);
    return [];
  }
}

export function formatVideoDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

export function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 1)} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} mo ago`;
  const years = Math.round(months / 12);
  return `${years} yr${years === 1 ? "" : "s"} ago`;
}
