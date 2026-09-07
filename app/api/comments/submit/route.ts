import { NextResponse } from "next/server";
import {
  clientIp,
  commentEnv,
  getCommentCount,
  hashText,
  insertPublishedComment,
  isEmailVerified,
  isValidEmail,
  normalizeEmail,
  recentCommentCountByIp,
  sanitizeBody,
  sanitizeName,
  siteOrigin,
  verifyTurnstile,
  type CommentTargetType,
} from "@/lib/comments";
import { emailConfigured, sendCommentVerificationEmail } from "@/lib/email";

const TARGET_TYPES: CommentTargetType[] = ["video", "news", "blog"];

export async function POST(req: Request) {
  const env = commentEnv();
  if (!env.DB) {
    return NextResponse.json({ error: "Comments are not available right now." }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (key: string) => (typeof payload[key] === "string" ? (payload[key] as string) : "");
  const targetType = str("targetType") as CommentTargetType;
  const targetId = str("targetId").slice(0, 200);
  const targetPath = str("targetPath").startsWith("/") ? str("targetPath").slice(0, 300) : "/";
  const name = sanitizeName(str("name"));
  const email = normalizeEmail(str("email"));
  const body = sanitizeBody(str("body"));
  const honeypot = str("website");
  const turnstileToken = str("turnstileToken");
  const articleTitle = str("articleTitle").slice(0, 200) || "a post";

  if (honeypot) return NextResponse.json({ status: "posted" }); // silently drop bots
  if (!TARGET_TYPES.includes(targetType) || !targetId) {
    return NextResponse.json({ error: "Unknown post." }, { status: 400 });
  }
  if (name.length < 2) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: "Please use a valid email." }, { status: 400 });
  if (body.length < 2) return NextResponse.json({ error: "Please write a comment." }, { status: 400 });

  const ip = clientIp(req);
  const ipHash = ip ? await hashText(ip) : null;

  if (ipHash && (await recentCommentCountByIp(ipHash)) >= 5) {
    return NextResponse.json({ error: "You're posting too fast — try again shortly." }, { status: 429 });
  }

  if (!(await verifyTurnstile(turnstileToken, ip, env))) {
    return NextResponse.json({ error: "Bot check failed — please retry." }, { status: 400 });
  }

  // Already-confirmed email → post immediately.
  if (await isEmailVerified(email)) {
    await insertPublishedComment({ targetType, targetId, authorName: name, authorEmail: email, body, ipHash });
    const count = await getCommentCount(targetType, targetId);
    return NextResponse.json({ status: "posted", count });
  }

  if (!emailConfigured(env)) {
    return NextResponse.json(
      { error: "Comment sign-in by email isn't switched on yet. Check back soon." },
      { status: 503 },
    );
  }

  const token = crypto.randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  await env.DB.prepare(
    `INSERT INTO comment_pending
       (token, target_type, target_id, target_path, author_name, author_email, body, created_at, expires_at, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(token, targetType, targetId, targetPath, name, email, body, now.toISOString(), expires.toISOString(), ipHash)
    .run();

  const verifyUrl = `${siteOrigin(env)}/api/comments/verify?token=${token}`;
  const sent = await sendCommentVerificationEmail(env, email, { name, verifyUrl, articleTitle });
  if (!sent.ok) {
    console.error("comment verification email failed", sent.error);
    return NextResponse.json({ error: "Couldn't send the confirmation email — try again later." }, { status: 502 });
  }

  return NextResponse.json({ status: "check_email" });
}
