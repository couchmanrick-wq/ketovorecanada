import { NextResponse } from "next/server";
import { commentEnv } from "@/lib/comments";

type Row = {
  id: string;
  target_type: string;
  target_id: string;
  author_name: string;
  author_email: string;
  body: string;
  status: string;
  created_at: string;
};

export async function GET() {
  const { DB } = commentEnv();
  if (!DB) return NextResponse.json({ comments: [] });

  const { results } = await DB.prepare(
    `SELECT id, target_type, target_id, author_name, author_email, body, status, created_at
     FROM comments
     ORDER BY created_at DESC
     LIMIT 300`,
  ).all<Row>();

  const pending = await DB.prepare(`SELECT COUNT(*) AS n FROM comment_pending`).first<{ n: number }>();
  const verified = await DB.prepare(`SELECT COUNT(*) AS n FROM comment_verified_emails`).first<{ n: number }>();

  return NextResponse.json(
    {
      comments: (results ?? []).map((r) => ({
        id: r.id,
        targetType: r.target_type,
        targetId: r.target_id,
        authorName: r.author_name,
        authorEmail: r.author_email,
        body: r.body,
        status: r.status,
        createdAt: r.created_at,
      })),
      pendingCount: pending?.n ?? 0,
      verifiedEmailCount: verified?.n ?? 0,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

export async function DELETE(req: Request) {
  const { DB } = commentEnv();
  if (!DB) return NextResponse.json({ error: "no database" }, { status: 503 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  const action = new URL(req.url).searchParams.get("action");
  const status = action === "restore" ? "published" : "deleted";
  await DB.prepare(`UPDATE comments SET status = ? WHERE id = ?`).bind(status, id).run();

  return NextResponse.json({ ok: true, status });
}
