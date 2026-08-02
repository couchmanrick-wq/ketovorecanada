import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { DAILY_LOG_KV_KEY, type MonthData } from "@/lib/dailyLog";


export async function GET() {
  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;
  const raw = await kv.get(DAILY_LOG_KV_KEY);
  const data: Record<string, MonthData> = raw ? JSON.parse(raw) : {};

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=120" },
  });
}
