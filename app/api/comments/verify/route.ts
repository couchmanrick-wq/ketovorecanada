import { NextResponse } from "next/server";
import { commentEnv, insertPublishedComment, normalizeEmail, siteOrigin } from "@/lib/comments";

type PendingRow = {
  token: string;
  target_type: "video" | "news" | "blog";
  target_id: string;
  target_path: string;
  author_name: string;
  author_email: string;
  body: string;
  expires_at: string;
  ip_hash: string | null;
};

export async function GET(req: Request) {
  const env = commentEnv();
  const origin = siteOrigin(env);
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";

  const fail = (reason: string) => NextResponse.redirect(`${origin}/comment-confirmed?status=${reason}`, 303);

  if (!env.DB || !token) return fail("invalid");

  const pending = await env.DB.prepare(`SELECT * FROM comment_pending WHERE token = ?`)
    .bind(token)
    .first<PendingRow>();

  if (!pending) return fail("invalid");

  // Always clear the pending row — one shot.
  await env.DB.prepare(`DELETE FROM comment_pending WHERE token = ?`).bind(token).run();

  if (Date.parse(pending.expires_at) < Date.now()) return fail("expired");

  const email = normalizeEmail(pending.author_email);

  await insertPublishedComment({
    targetType: pending.target_type,
    targetId: pending.target_id,
    authorName: pending.author_name,
    authorEmail: email,
    body: pending.body,
    ipHash: pending.ip_hash,
  });

  await env.DB.prepare(
    `INSERT OR IGNORE INTO comment_verified_emails (email, first_verified_at) VALUES (?, ?)`,
  )
    .bind(email, new Date().toISOString())
    .run();

  const back = pending.target_path.startsWith("/") ? pending.target_path : "/";
  return NextResponse.redirect(`${origin}${back}?commented=1#comments`, 303);
}
