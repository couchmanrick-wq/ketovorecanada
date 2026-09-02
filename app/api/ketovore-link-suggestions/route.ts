import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

const SUGGESTION_KEY_PREFIX = "kc-link-suggestion";

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

const linkFields = ["website", "youtube", "tiktok", "facebook", "instagram", "podcast", "spotifyPodcast"] as const;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    const value: unknown = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid body");
    body = value as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (cleanText(body.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const suggestion = {
    name: cleanText(body.name, 100),
    email: cleanText(body.email, 254),
    resource: cleanText(body.resource, 160),
    website: cleanText(body.website, 2048),
    youtube: cleanText(body.youtube, 2048),
    tiktok: cleanText(body.tiktok, 2048),
    facebook: cleanText(body.facebook, 2048),
    instagram: cleanText(body.instagram, 2048),
    podcast: cleanText(body.podcast, 2048),
    spotifyPodcast: cleanText(body.spotifyPodcast, 2048),
    note: cleanText(body.note, 2000),
    submittedAt: new Date().toISOString(),
  };

  if (suggestion.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(suggestion.email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const submittedLinks = linkFields.map((field) => suggestion[field]).filter(Boolean);
  if (submittedLinks.some((value) => {
    try {
      const url = new URL(value);
      return url.protocol !== "http:" && url.protocol !== "https:";
    } catch {
      return true;
    }
  })) {
    return NextResponse.json({ error: "Enter valid web links" }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;
  const key = `${SUGGESTION_KEY_PREFIX}:${Date.now()}:${crypto.randomUUID()}`;
  await kv.put(key, JSON.stringify(suggestion));

  return NextResponse.json({ ok: true }, { status: 201 });
}
