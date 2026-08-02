import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { DAILY_LOG_KV_KEY, type MonthData } from "@/lib/dailyLog";


export async function PUT(req: NextRequest) {
  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;

  let data: Record<string, MonthData>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  await kv.put(DAILY_LOG_KV_KEY, JSON.stringify(data));

  return NextResponse.json({ ok: true });
}
