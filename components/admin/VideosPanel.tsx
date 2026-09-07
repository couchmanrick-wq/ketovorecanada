"use client";

import { useEffect, useState } from "react";
import type { AggregatedVideo } from "@/lib/videos";

type ChannelSummary = {
  channelKey: string;
  channelName: string;
  channelId: string;
  videoCount: number;
  latest: string | null;
};

type Payload = {
  videos: AggregatedVideo[];
  total: number;
  channels: ChannelSummary[];
};

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: Payload; staleCount: number };

const STALE_MS = 1000 * 60 * 60 * 24 * 60; // 60 days

const fmt = (iso: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleString("en-CA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

export default function VideosPanel() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [view, setView] = useState<"feed" | "channels">("feed");
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/admin/videos?limit=${limit}`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<Payload>) : Promise.reject(new Error("bad response"))))
      .then((data) => {
        if (cancelled) return;
        const now = Date.now();
        const staleCount = data.channels.filter(
          (c) => !c.latest || new Date(c.latest).getTime() < now - STALE_MS,
        ).length;
        setState({ status: "ready", data, staleCount });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (state.status === "error") {
    return (
      <div className="rounded-sm border border-black/15 bg-white p-6">
        <p className="text-sm text-[#ba0a07]">Couldn&apos;t load the aggregated videos.</p>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="rounded-sm border border-black/15 bg-white p-6">
        <p className="text-sm text-black/60">Loading aggregated videos…</p>
      </div>
    );
  }

  const { data, staleCount } = state;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {(["feed", "channels"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={
                v === view
                  ? "rounded-sm bg-black px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-white"
                  : "rounded-sm border border-black/15 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-black/70 transition hover:border-black/40"
              }
            >
              {v === "feed" ? "Aggregated feed" : `Channels (${data.channels.length})`}
            </button>
          ))}
        </div>
        <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-black/45">
          {data.total.toLocaleString("en-CA")} videos · newest first
        </p>
      </div>

      {view === "feed" ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-black text-left text-xs font-extrabold uppercase tracking-[0.15em] text-black/60">
                <th className="py-3 pr-4">Published</th>
                <th className="py-3 pr-4">Channel</th>
                <th className="py-3 pr-4">Title</th>
              </tr>
            </thead>
            <tbody>
              {data.videos.map((v) => (
                <tr key={v.videoId} className="border-b border-black/10 align-top">
                  <td className="whitespace-nowrap py-2 pr-4 font-semibold tabular-nums text-black/70">{fmt(v.publishedAt)}</td>
                  <td className="py-2 pr-4 font-semibold">{v.channelName}</td>
                  <td className="py-2 pr-4">
                    <a href={v.url} target="_blank" rel="noopener noreferrer" className="font-bold text-[#ba0a07] hover:underline">
                      {v.title}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.videos.length >= limit ? (
            <button
              type="button"
              onClick={() => setLimit((n) => n + 100)}
              className="mt-4 rounded-sm border border-black/20 px-4 py-2 text-sm font-extrabold uppercase tracking-wide transition hover:border-[#ba0a07] hover:text-[#ba0a07]"
            >
              Load more
            </button>
          ) : null}
        </div>
      ) : (
        <div>
          {staleCount > 0 ? (
            <p className="mb-4 text-xs font-bold text-black/55">
              {staleCount} channel{staleCount === 1 ? "" : "s"} with no upload in 60+ days (or none fetched yet).
            </p>
          ) : null}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-black text-left text-xs font-extrabold uppercase tracking-[0.15em] text-black/60">
                  <th className="py-3 pr-4">Channel</th>
                  <th className="py-3 pr-4">Videos</th>
                  <th className="py-3 pr-4">Latest upload</th>
                </tr>
              </thead>
              <tbody>
                {data.channels.map((c) => (
                  <tr key={c.channelKey} className="border-b border-black/10">
                    <td className="py-2 pr-4 font-semibold">
                      <a
                        href={`https://www.youtube.com/channel/${c.channelId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#ba0a07]"
                      >
                        {c.channelName}
                      </a>
                    </td>
                    <td className="py-2 pr-4 tabular-nums">{c.videoCount}</td>
                    <td className="py-2 pr-4 tabular-nums text-black/70">{fmt(c.latest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
