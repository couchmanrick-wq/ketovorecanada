import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CommentsSection from "@/components/CommentsSection";
import { pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";
import { getComments, turnstileSiteKey } from "@/lib/comments";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return pageMetadata({ title: "Blog", description: "Blog", path: `/blogs/${slug}` });
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blogs/${slug}` });
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ commented?: string }>;
}) {
  const { slug } = await params;
  const { commented } = await searchParams;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const comments = await getComments("blog", slug);

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Blog" />

      <section className="w-full">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-black/55">
            <Link href="/blogs" className="transition hover:text-[#ba0a07]">
              Blog
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">{post.title}</span>
          </nav>

          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ba0a07]">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-6 whitespace-pre-wrap text-base leading-7 text-black/75">{post.excerpt}</div>

          <CommentsSection
            targetType="blog"
            targetId={slug}
            targetTitle={post.title}
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
