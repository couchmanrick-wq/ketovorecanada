import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CommentsSection from "@/components/CommentsSection";
import { pageMetadata } from "@/lib/seo";
import { getVideoById } from "@/lib/videos";
import { getComments, turnstileSiteKey } from "@/lib/comments";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const video = await getVideoById(id);
  if (!video) return pageMetadata({ title: "Video", description: "Video", path: `/videos/${id}` });
  return pageMetadata({
    title: video.title,
    description: `${video.channelName} on YouTube — watch and discuss on Ketovore Canada.`,
    path: `/videos/${id}`,
  });
}

export default async function VideoDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ commented?: string }>;
}) {
  const { id } = await params;
  const { commented } = await searchParams;
  const video = await getVideoById(id);
  if (!video) notFound();

  const comments = await getComments("video", id);

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Latest Videos" />

      <section className="w-full">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-black/55">
            <Link href="/videos" className="transition hover:text-[#ba0a07]">
              Videos
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">{video.channelName}</span>
          </nav>

          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ba0a07]">
            Youtube Account:{" "}
            <a
              href={`https://www.youtube.com/channel/${video.channelId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-black/20 underline-offset-2 hover:text-black"
            >
              {video.channelName}
            </a>
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight sm:text-4xl">
            {video.title}
          </h1>

          <div className="mt-6 aspect-video w-full overflow-hidden rounded-sm border border-black/15 bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>

          {video.description ? (
            <p className="mt-6 whitespace-pre-wrap text-sm leading-6 text-black/65">
              {video.description.slice(0, 800)}
              {video.description.length > 800 ? "…" : ""}
            </p>
          ) : null}

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-bold text-[#ba0a07] hover:underline"
          >
            Watch on YouTube ↗
          </a>

          <CommentsSection
            targetType="video"
            targetId={id}
            targetTitle={video.title}
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
