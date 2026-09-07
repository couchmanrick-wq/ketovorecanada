import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = { title: "Comment confirmation", robots: { index: false } };

const MESSAGES: Record<string, { heading: string; body: string }> = {
  expired: {
    heading: "That link has expired",
    body: "Confirmation links are good for 24 hours. Head back to the post and submit your comment again to get a fresh link.",
  },
  invalid: {
    heading: "We couldn't confirm that link",
    body: "The link may have already been used or isn't valid. Try posting your comment again from the post page.",
  },
};

export default async function CommentConfirmed({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const msg = MESSAGES[status ?? "invalid"] ?? MESSAGES.invalid;

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader />
      <section className="w-full">
        <div className="mx-auto max-w-2xl px-6 py-20 lg:px-10">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-[0.02em]">
            {msg.heading}
          </h1>
          <p className="mt-4 leading-7 text-black/65">{msg.body}</p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-sm bg-[#ba0a07] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-black"
          >
            Back to Ketovore Canada
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
