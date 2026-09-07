"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Comment, CommentTargetType } from "@/lib/comments";

type Props = {
  targetType: CommentTargetType;
  targetId: string;
  targetTitle: string;
  siteKey: string;
  comments: Comment[];
  justCommented?: boolean;
};

type Status = "idle" | "submitting" | "posted" | "check_email" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - Date.parse(iso);
  if (Number.isNaN(diff)) return "";
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

export default function CommentsSection({
  targetType,
  targetId,
  targetTitle,
  siteKey,
  comments,
  justCommented,
}: Props) {
  const router = useRouter();
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", body: "", website: "" });

  useEffect(() => {
    if (!scriptReady || !widgetRef.current || widgetId.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      callback: (t: string) => setToken(t),
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
      theme: "light",
    });
  }, [scriptReady, siteKey]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/comments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetId,
          targetPath: window.location.pathname,
          articleTitle: targetTitle,
          name: form.name,
          email: form.email,
          body: form.body,
          website: form.website,
          turnstileToken: token,
        }),
      });
      const data = (await res.json()) as { status?: string; error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        window.turnstile?.reset(widgetId.current ?? undefined);
        setToken("");
        return;
      }
      if (data.status === "check_email") {
        setStatus("check_email");
        return;
      }
      // posted
      setStatus("posted");
      setForm({ name: "", email: "", body: "", website: "" });
      window.turnstile?.reset(widgetId.current ?? undefined);
      setToken("");
      router.refresh();
    } catch {
      setStatus("error");
      setError("Network error — please try again.");
    }
  }

  const disabled = status === "submitting" || !token || !form.name || !form.email || !form.body;

  return (
    <section id="comments" className="mt-14 scroll-mt-8 border-t-2 border-black pt-10">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-[0.02em]">
        {comments.length} Comment{comments.length === 1 ? "" : "s"} - Add Yours!
      </h2>

      {justCommented ? (
        <p className="mt-4 rounded-sm border border-green-700/30 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
          Thanks — your email is confirmed and your comment is posted.
        </p>
      ) : null}

      <ul className="mt-6 space-y-6">
        {comments.length === 0 ? (
          <li className="text-sm text-black/50">No comments yet. Be the first.</li>
        ) : (
          comments.map((c) => (
            <li key={c.id} className="border-b border-black/10 pb-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-extrabold">{c.authorName}</span>
                <time className="text-xs font-semibold text-black/40" dateTime={c.createdAt}>
                  {timeAgo(c.createdAt)}
                </time>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/75">{c.body}</p>
            </li>
          ))
        )}
      </ul>

      {status === "check_email" ? (
        <div className="mt-8 rounded-sm border border-[#ba0a07]/30 bg-[#fff3f3] p-5">
          <p className="text-sm font-bold">Almost there — check your inbox.</p>
          <p className="mt-2 text-sm leading-6 text-black/65">
            We sent a confirmation link to <strong>{form.email}</strong>. Click it and your comment
            posts right away. The link expires in 24 hours. After your first confirmed comment, future
            comments post immediately.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 max-w-2xl space-y-4">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold uppercase">
            Leave a comment
          </h3>
          {status === "posted" ? (
            <p className="rounded-sm border border-green-700/30 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
              Comment posted. Thanks!
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-sm border border-[#ba0a07]/40 bg-[#fff3f3] px-4 py-3 text-sm font-semibold text-[#ba0a07]">
              {error}
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-bold">
              Name
              <input
                type="text"
                required
                maxLength={60}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-sm border border-black/20 bg-white px-3 py-2 font-normal focus:border-[#ba0a07] focus:outline-none"
              />
            </label>
            <label className="block text-sm font-bold">
              Email <span className="font-normal text-black/45">(not published)</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1 w-full rounded-sm border border-black/20 bg-white px-3 py-2 font-normal focus:border-[#ba0a07] focus:outline-none"
              />
            </label>
          </div>

          <label className="block text-sm font-bold">
            Comment
            <textarea
              required
              rows={4}
              maxLength={4000}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              className="mt-1 w-full rounded-sm border border-black/20 bg-white px-3 py-2 font-normal leading-6 focus:border-[#ba0a07] focus:outline-none"
            />
          </label>

          {/* Honeypot — real users never fill this */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            className="hidden"
            aria-hidden="true"
          />

          <div ref={widgetRef} className="min-h-[65px]" />

          <button
            type="submit"
            disabled={disabled}
            className="rounded-sm bg-[#ba0a07] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "submitting" ? "Posting…" : "Post comment"}
          </button>
          <p className="text-xs leading-5 text-black/40">
            First-time commenters confirm their email with a one-click link. We use your email only to
            prevent spam — it is never shown or shared.
          </p>
        </form>
      )}
    </section>
  );
}
