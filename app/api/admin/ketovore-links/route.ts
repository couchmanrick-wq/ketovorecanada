import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { KETOVORE_LINKS_KV_KEY, sanitizeKetovoreLinks } from "@/lib/ketovoreLinks";

export async function GET() {
  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;
  const raw = await kv.get(KETOVORE_LINKS_KV_KEY);

  let data: unknown = [];
  try {
    data = raw ? JSON.parse(raw) : [];
  } catch {
    data = [];
  }

  return NextResponse.json(sanitizeKetovoreLinks(data), {
    headers: { "Cache-Control": "private, no-store" },
  });
}

export async function PUT(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a list of resources" }, { status: 400 });
  }

  const rows = sanitizeKetovoreLinks(body);
  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;
  await kv.put(KETOVORE_LINKS_KV_KEY, JSON.stringify(rows));

  return NextResponse.json({ ok: true, rows });
}
