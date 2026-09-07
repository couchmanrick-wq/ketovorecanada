import { getCloudflareContext } from "@opennextjs/cloudflare";

export type CommentTargetType = "video" | "news" | "blog";

export type Comment = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
};

type CommentRow = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
};

export type CommentEnv = {
  DB?: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_SITE_KEY?: string;
  RESEND_API_KEY?: string;
  COMMENTS_FROM_EMAIL?: string;
  SITE_ORIGIN?: string;
};

export function commentEnv(): CommentEnv {
  try {
    return getCloudflareContext().env as unknown as CommentEnv;
  } catch {
    return {};
  }
}

// Cloudflare Turnstile test keys — always pass. Replace via Worker vars/secrets
// for real bot protection (see db/comments.sql header / README).
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

export function turnstileSiteKey(env: CommentEnv = commentEnv()): string {
  return env.TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export async function hashText(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

export async function verifyTurnstile(token: string, ip: string | null, env: CommentEnv): Promise<boolean> {
  if (!token) return false;
  const secret = env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET_KEY;
  try {
    const body = new FormData();
    body.append("secret", secret);
    body.append("response", token);
    if (ip) body.append("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function getComments(
  targetType: CommentTargetType,
  targetId: string,
): Promise<Comment[]> {
  try {
    const db = commentEnv().DB;
    if (!db) return [];
    const { results } = await db
      .prepare(
        `SELECT id, author_name, body, created_at
         FROM comments
         WHERE target_type = ? AND target_id = ? AND status = 'published'
         ORDER BY created_at ASC`,
      )
      .bind(targetType, targetId)
      .all<CommentRow>();
    return (results ?? []).map((r) => ({
      id: r.id,
      authorName: r.author_name,
      body: r.body,
      createdAt: r.created_at,
    }));
  } catch (error) {
    console.error("getComments failed", error);
    return [];
  }
}

export async function getCommentCount(
  targetType: CommentTargetType,
  targetId: string,
): Promise<number> {
  try {
    const db = commentEnv().DB;
    if (!db) return 0;
    const row = await db
      .prepare(
        `SELECT COUNT(*) AS n FROM comments
         WHERE target_type = ? AND target_id = ? AND status = 'published'`,
      )
      .bind(targetType, targetId)
      .first<{ n: number }>();
    return row?.n ?? 0;
  } catch {
    return 0;
  }
}

export async function isEmailVerified(email: string): Promise<boolean> {
  try {
    const db = commentEnv().DB;
    if (!db) return false;
    const row = await db
      .prepare(`SELECT 1 AS ok FROM comment_verified_emails WHERE email = ?`)
      .bind(normalizeEmail(email))
      .first<{ ok: number }>();
    return Boolean(row);
  } catch {
    return false;
  }
}

export async function insertPublishedComment(input: {
  targetType: CommentTargetType;
  targetId: string;
  authorName: string;
  authorEmail: string;
  body: string;
  ipHash: string | null;
}): Promise<void> {
  const db = commentEnv().DB;
  if (!db) throw new Error("no database binding");
  await db
    .prepare(
      `INSERT INTO comments (id, target_type, target_id, author_name, author_email, body, status, created_at, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?)`,
    )
    .bind(
      crypto.randomUUID(),
      input.targetType,
      input.targetId,
      input.authorName,
      normalizeEmail(input.authorEmail),
      input.body,
      new Date().toISOString(),
      input.ipHash,
    )
    .run();
}

export async function recentCommentCountByIp(ipHash: string, minutes = 10): Promise<number> {
  try {
    const db = commentEnv().DB;
    if (!db || !ipHash) return 0;
    const since = new Date(Date.now() - minutes * 60_000).toISOString();
    const row = await db
      .prepare(`SELECT COUNT(*) AS n FROM comments WHERE ip_hash = ? AND created_at > ?`)
      .bind(ipHash, since)
      .first<{ n: number }>();
    const pending = await db
      .prepare(`SELECT COUNT(*) AS n FROM comment_pending WHERE ip_hash = ? AND created_at > ?`)
      .bind(ipHash, since)
      .first<{ n: number }>();
    return (row?.n ?? 0) + (pending?.n ?? 0);
  } catch {
    return 0;
  }
}

export function clientIp(req: Request): string | null {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}

export function siteOrigin(env: CommentEnv = commentEnv()): string {
  return env.SITE_ORIGIN || "https://ketovorecanada.com";
}

export function sanitizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 60);
}

export function sanitizeBody(value: string): string {
  return value.trim().slice(0, 4000);
}
