import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { DAILY_LOG_BACKUP_LATEST_KEY, DAILY_LOG_KV_KEY } from "@/lib/dailyLog";

// Restore the daily log from a backup written by the PUT route.
//   POST /api/admin/daily-log/restore              -> restores from the "latest" snapshot
//   POST /api/admin/daily-log/restore?from=latest  -> same
//   POST /api/admin/daily-log/restore?from=2026-09-01 (or 20260901) -> that day's snapshot
export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;

  const from = (req.nextUrl.searchParams.get("from") || "latest").trim();
  const backupKey =
    from === "latest"
      ? DAILY_LOG_BACKUP_LATEST_KEY
      : `kc-daily-log-backup-${from.replace(/-/g, "")}`;

  const backupRaw = await kv.get(backupKey);
  if (!backupRaw) {
    return NextResponse.json({ error: `No backup found for "${from}" (key: ${backupKey})` }, { status: 404 });
  }

  // Snapshot the current value before overwriting it, so a restore is itself undoable.
  const current = await kv.get(DAILY_LOG_KV_KEY);
  if (current) {
    await kv.put(`${DAILY_LOG_BACKUP_LATEST_KEY}-prerestore`, current, {
      expirationTtl: 60 * 60 * 24 * 7,
    });
  }

  await kv.put(DAILY_LOG_KV_KEY, backupRaw);

  return NextResponse.json({ ok: true, restoredFrom: backupKey });
}
