import { getCloudflareContext } from "@opennextjs/cloudflare";

export type NewsArticle = {
  url: string;
  sourceName: string;
  title: string;
  summary: string | null;
  matchedTerm: string | null;
  publishedAt: string | null;
};

type ArticleRow = {
  url: string;
  source_name: string;
  title: string;
  summary: string | null;
  matched_term: string | null;
  published_at: string | null;
};

const rowToArticle = (row: ArticleRow): NewsArticle => ({
  url: row.url,
  sourceName: row.source_name,
  title: row.title,
  summary: row.summary,
  matchedTerm: row.matched_term,
  publishedAt: row.published_at,
});

/**
 * Newest-first page of news articles mentioning "ketovore" or "carnivore",
 * gathered 3x/day by the ketovorecanada-ingest Worker. Returns an empty page
 * if the query fails so the route still renders.
 */
export async function getNewsArticles(
  limit = 40,
  offset = 0,
): Promise<{ articles: NewsArticle[]; total: number }> {
  try {
    const { env } = getCloudflareContext();
    const db = (env as unknown as { DB?: D1Database }).DB;
    if (!db) return { articles: [], total: 0 };

    const [page, count] = await Promise.all([
      db
        .prepare(
          `SELECT url, source_name, title, summary, matched_term, published_at
           FROM articles
           WHERE published_at IS NOT NULL
           ORDER BY published_at DESC
           LIMIT ? OFFSET ?`,
        )
        .bind(limit, offset)
        .all<ArticleRow>(),
      db.prepare(`SELECT COUNT(*) AS n FROM articles WHERE published_at IS NOT NULL`).first<{ n: number }>(),
    ]);

    return { articles: (page.results ?? []).map(rowToArticle), total: count?.n ?? 0 };
  } catch (error) {
    console.error("getNewsArticles failed", error);
    return { articles: [], total: 0 };
  }
}
