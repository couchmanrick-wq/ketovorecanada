import type { Metadata } from "next";

export const SITE_NAME = "Ketovore Canada";
export const SITE_URL = "https://ketovorecanada.com";
export const DEFAULT_DESCRIPTION =
  "Ketovore Canada shares practical carnivore-first, keto-inspired resources, metabolic health information, trusted accounts, and Rick Couchman's personal health journey.";

const socialImage = {
  url: "/og.png",
  width: 1733,
  height: 907,
  alt: "Ketovore Canada — Transform, Educate, Inspire",
};

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_CA",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [socialImage.url],
    },
  };
}
