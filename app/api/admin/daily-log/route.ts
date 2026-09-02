import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  DAILY_LOG_BACKUP_LATEST_KEY,
  DAILY_LOG_KV_KEY,
  countFilledEntries,
  dailyLogDatedBackupKey,
  type MonthData,
} from "@/lib/dailyLog";

// Keep per-day backups for 30 days, then let KV expire them automatically.
const DATED_BACKUP_TTL_SECONDS = 60 * 60 * 24 * 30;

function safeParse(raw: string | null): Record<string, MonthData> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export async function PUT(req: NextRequest) {
  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;

  let data: Record<string, MonthData>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return NextResponse.json({ error: "Expected an object keyed by month" }, { status: 400 });
  }

  const existingRaw = await kv.get(DAILY_LOG_KV_KEY);
  const existingFilled = countFilledEntries(safeParse(existingRaw));
  const incomingFilled = countFilledEntries(data);

  // Guard against wiping every entry in one write (the mistake that lost the log
  // once already). A genuine full clear must opt in with ?confirmClear=1.
  const confirmClear = req.nextUrl.searchParams.get("confirmClear") === "1";
  if (existingFilled > 0 && incomingFilled === 0 && !confirmClear) {
    return NextResponse.json(
      {
        error:
          "Refusing to clear all daily-log entries in a single save. Retry with ?confirmClear=1 if this is intentional.",
        existingFilled,
      },
      { status: 409 }
    );
  }

  const nextRaw = JSON.stringify(data);

  // Back up the current value before overwriting it.
  if (existingRaw && existingRaw !== nextRaw) {
    await kv.put(DAILY_LOG_BACKUP_LATEST_KEY, existingRaw);

    // Preserve the first pre-edit snapshot of each day (don't overwrite later today).
    const datedKey = dailyLogDatedBackupKey();
    const alreadyBackedUpToday = await kv.get(datedKey);
    if (!alreadyBackedUpToday) {
      await kv.put(datedKey, existingRaw, { expirationTtl: DATED_BACKUP_TTL_SECONDS });
    }
  }

  await kv.put(DAILY_LOG_KV_KEY, nextRaw);

  return NextResponse.json({
    ok: true,
    backedUp: Boolean(existingRaw && existingRaw !== nextRaw),
    existingFilled,
    incomingFilled,
  });
}
