export const KETOVORE_LINKS_KV_KEY = "kc-ketovore-links";

export type KetovoreLink = {
  id: string;
  resource: string;
  website: string;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  podcast: string;
};

export const emptyKetovoreLink: KetovoreLink = {
  id: "",
  resource: "",
  website: "",
  instagram: "",
  facebook: "",
  youtube: "",
  tiktok: "",
  podcast: "",
};

export const ketovoreLinkFields: Array<{
  key: Exclude<keyof KetovoreLink, "id">;
  label: string;
}> = [
  { key: "resource", label: "Resource" },
  { key: "website", label: "Website" },
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "youtube", label: "YouTube" },
  { key: "tiktok", label: "TikTok" },
  { key: "podcast", label: "Podcast" },
];

export function sanitizeKetovoreLinks(value: unknown): KetovoreLink[] {
  if (!Array.isArray(value)) return [];

  return value.slice(0, 250).map((item, index) => {
    const row = item && typeof item === "object" ? item as Record<string, unknown> : {};
    const text = (key: string, maxLength: number) =>
      typeof row[key] === "string" ? row[key].trim().slice(0, maxLength) : "";

    return {
      id: text("id", 100) || `resource-${index + 1}`,
      resource: text("resource", 160),
      website: text("website", 2048),
      instagram: text("instagram", 2048),
      facebook: text("facebook", 2048),
      youtube: text("youtube", 2048),
      tiktok: text("tiktok", 2048),
      podcast: text("podcast", 2048),
    };
  });
}

export function toExternalHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function fetchKetovoreLinks(): Promise<KetovoreLink[]> {
  try {
    const response = await fetch("/api/admin/ketovore-links", { cache: "no-store" });
    if (!response.ok) return [];
    return sanitizeKetovoreLinks(await response.json());
  } catch {
    return [];
  }
}

export async function saveKetovoreLinks(rows: KetovoreLink[]) {
  try {
    const response = await fetch("/api/admin/ketovore-links", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rows),
    });
    return response.ok;
  } catch {
    return false;
  }
}
