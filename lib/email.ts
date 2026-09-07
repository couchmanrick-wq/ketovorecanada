import type { CommentEnv } from "@/lib/comments";

type SendResult = { ok: true } | { ok: false; error: string };

export function emailConfigured(env: CommentEnv): boolean {
  return Boolean(env.RESEND_API_KEY);
}

/**
 * Sends the "confirm your comment" link via Resend. Requires RESEND_API_KEY and
 * (ideally) a verified COMMENTS_FROM_EMAIL on the ketovorecanada.com domain.
 */
export async function sendCommentVerificationEmail(
  env: CommentEnv,
  to: string,
  opts: { name: string; verifyUrl: string; articleTitle: string },
): Promise<SendResult> {
  if (!env.RESEND_API_KEY) return { ok: false, error: "email not configured" };
  const from = env.COMMENTS_FROM_EMAIL || "Ketovore Canada <comments@ketovorecanada.com>";

  const text = [
    `Hi ${opts.name},`,
    "",
    `Please confirm this email address to post your comment on "${opts.articleTitle}":`,
    "",
    opts.verifyUrl,
    "",
    "This link expires in 24 hours. If you didn't write a comment on ketovorecanada.com, you can ignore this message.",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p>Hi ${escapeHtml(opts.name)},</p>
      <p>Please confirm this email address to post your comment on
        &ldquo;${escapeHtml(opts.articleTitle)}&rdquo;:</p>
      <p><a href="${escapeHtml(opts.verifyUrl)}"
        style="display:inline-block;background:#ba0a07;color:#fff;font-weight:700;
        text-decoration:none;padding:12px 20px;border-radius:4px">Confirm &amp; post my comment</a></p>
      <p style="color:#666;font-size:13px">This link expires in 24 hours. If you didn&rsquo;t write a
        comment on ketovorecanada.com, you can ignore this message.</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "Confirm your comment on Ketovore Canada",
        text,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      return { ok: false, error: `resend ${res.status}: ${detail.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
