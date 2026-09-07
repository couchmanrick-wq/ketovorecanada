import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CommentsSection from "@/components/CommentsSection";
import { pageMetadata } from "@/lib/seo";
import { getArticleById } from "@/lib/news";
import { formatVideoDate } from "@/lib/videos";
import { getComments, turnstileSiteKey } from "@/lib/comments";

export const dynamic = "force-dynamic";

function parseId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numId = parseId(id);
  const article = numId ? await getArticleById(numId) : null;
  if (!article) return pageMetadata({ title: "News", description: "News", path: `/news/${id}` });
  return pageMetadata({
    title: article.title,
    description: `${article.sourceName} — read the summary and discuss on Ketovore Canada.`,
    path: `/news/${id}`,
  });
}

export default async function NewsDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ commented?: string }>;
}) {
  const { id } = await params;
  const { commented } = await searchParams;
  const numId = parseId(id);
  const article = numId ? await getArticleById(numId) : null;
  if (!article) notFound();

  const comments = await getComments("news", String(article.id));

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Daily News & Views" />

      <section className="w-full">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-black/55">
            <Link href="/news" className="transition hover:text-[#ba0a07]">
              News
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">{article.sourceName}</span>
          </nav>

          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ba0a07]">{article.sourceName}</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight sm:text-4xl">
            {article.title}
          </h1>
          {article.publishedAt ? (
            <p className="mt-2 text-xs font-semibold text-black/45">
              <time dateTime={article.publishedAt}>{formatVideoDate(article.publishedAt)}</time>
            </p>
          ) : null}

          {article.summary ? (
            <p className="mt-6 text-base leading-7 text-black/70">{article.summary}</p>
          ) : (
            <p className="mt-6 text-sm italic leading-6 text-black/45">
              This article is aggregated from {article.sourceName}. Read the full piece at the source.
            </p>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-sm border border-black/25 px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide transition hover:border-[#ba0a07] hover:text-[#ba0a07]"
          >
            Read the full article at {article.sourceName} ↗
          </a>

          <p className="mt-4 text-xs leading-5 text-black/40">
            Headlines are aggregated automatically. A listing is not an endorsement.
          </p>

          <CommentsSection
            targetType="news"
            targetId={String(article.id)}
            targetTitle={article.title}
            siteKey={turnstileSiteKey()}
            comments={comments}
            justCommented={commented === "1"}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
