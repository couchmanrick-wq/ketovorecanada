import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ketovore Canada | Carnivore-First, Keto-Inspired Resources",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Rick Couchman", url: `${SITE_URL}/rick` }],
  creator: "Rick Couchman",
  publisher: SITE_NAME,
  category: "Health and wellness",
  keywords: ["ketovore", "carnivore diet Canada", "keto Canada", "metabolic health", "low carb resources", "carnivore resources"],
  icons: {
    icon: [{ url: "/images/leaf-favicon.png", type: "image/png", sizes: "256x256" }],
    shortcut: ["/images/leaf-favicon.png"],
    apple: [{ url: "/images/leaf-favicon.png", type: "image/png", sizes: "256x256" }],
  },
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Ketovore Canada | Carnivore-First, Keto-Inspired Resources",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [{ url: "/og.png", width: 1733, height: 907, alt: "Ketovore Canada — Transform, Educate, Inspire" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ketovore Canada | Carnivore-First, Keto-Inspired Resources",
    description: DEFAULT_DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${montserrat.variable} ${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: SITE_URL,
                logo: { "@type": "ImageObject", url: `${SITE_URL}/images/KC_round_logo.webp` },
                founder: { "@id": `${SITE_URL}/rick#person` },
              },
              {
                "@type": "Person",
                "@id": `${SITE_URL}/rick#person`,
                name: "Rick Couchman",
                url: `${SITE_URL}/rick`,
                worksFor: { "@id": `${SITE_URL}/#organization` },
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                description: DEFAULT_DESCRIPTION,
                inLanguage: "en-CA",
                publisher: { "@id": `${SITE_URL}/#organization` },
              },
            ],
          }}
        />
        {children}
      </body>
    </html>
  );
}
