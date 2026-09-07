"use client";

import { useCallback, useEffect, useState } from "react";

type AdminComment = {
  id: string;
  targetType: string;
  targetId: string;
  authorName: string;
  authorEmail: string;
  body: string;
  status: string;
  createdAt: string;
};

type Payload = {
  comments: AdminComment[];
  pendingCount: number;
  verifiedEmailCount: number;
};

const pathFor = (c: AdminComment) =>
  c.targetType === "video"
    ? `/videos/${c.targetId}`
    : c.targetType === "news"
      ? `/news/${c.targetId}`
      : `/blogs/${c.targetId}`;

export default function CommentsPanel() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/admin/comments", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<Payload>) : Promise.reject(new Error())))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function act(id: string, action: "delete" | "restore") {
    setBusy(id);
    try {
      await fetch(`/api/admin/comments?id=${encodeURIComponent(id)}${action === "restore" ? "&action=restore" : ""}`, {
        method: "DELETE",
      });
      load();
    } finally {
      setBusy(null);
    }
  }

  if (error) {
    return (
      <div className="rounded-sm border border-black/15 bg-white p-6">
        <p className="text-sm text-[#ba0a07]">Couldn&apos;t load comments.</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="rounded-sm border border-black/15 bg-white p-6">
        <p className="text-sm text-black/60">Loading comments…</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.15em] text-black/45">
        {data.comments.filter((c) => c.status === "published").length} published ·{" "}
        {data.verifiedEmailCount} verified email{data.verifiedEmailCount === 1 ? "" : "s"} ·{" "}
        {data.pendingCount} awaiting confirmation
      </p>

      {data.comments.length === 0 ? (
        <p className="text-sm text-black/55">No comments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-black text-left text-xs font-extrabold uppercase tracking-[0.15em] text-black/60">
                <th className="py-3 pr-4">When</th>
                <th className="py-3 pr-4">Who</th>
                <th className="py-3 pr-4">Post</th>
                <th className="py-3 pr-4">Comment</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {data.comments.map((c) => (
                <tr
                  key={c.id}
                  className={`border-b border-black/10 align-top ${c.status === "deleted" ? "opacity-40" : ""}`}
                >
                  <td className="whitespace-nowrap py-2 pr-4 tabular-nums text-black/60">
                    {new Date(c.createdAt).toLocaleString("en-CA", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-2 pr-4">
                    <div className="font-semibold">{c.authorName}</div>
                    <div className="text-xs text-black/45">{c.authorEmail}</div>
                  </td>
                  <td className="py-2 pr-4">
                    <a href={pathFor(c)} target="_blank" rel="noreferrer" className="text-[#ba0a07] hover:underline">
                      {c.targetType}
                    </a>
                  </td>
                  <td className="py-2 pr-4">
                    <p className="max-w-md whitespace-pre-wrap">{c.body}</p>
                  </td>
                  <td className="py-2 pr-4 whitespace-nowrap">
                    {c.status === "deleted" ? (
                      <button
                        type="button"
                        disabled={busy === c.id}
                        onClick={() => act(c.id, "restore")}
                        className="text-xs font-extrabold uppercase tracking-wide text-black/50 hover:text-black"
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={busy === c.id}
                        onClick={() => act(c.id, "delete")}
                        className="text-xs font-extrabold uppercase tracking-wide text-[#ba0a07] hover:text-black"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
