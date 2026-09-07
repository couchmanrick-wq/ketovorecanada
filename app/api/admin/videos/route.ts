import { NextRequest, NextResponse } from "next/server";
import { getAggregatedChannels, getAggregatedVideos } from "@/lib/videos";

export async function GET(request: NextRequest) {
  const limit = Math.min(200, Math.max(1, Number.parseInt(request.nextUrl.searchParams.get("limit") ?? "100", 10) || 100));
  const offset = Math.max(0, Number.parseInt(request.nextUrl.searchParams.get("offset") ?? "0", 10) || 0);

  const [{ videos, total }, channels] = await Promise.all([
    getAggregatedVideos(limit, offset),
    getAggregatedChannels(),
  ]);

  return NextResponse.json(
    { videos, total, channels },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
