import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
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
  metadataBase: new URL("https://ketovorecanada.com"),
  title: "Ketovore Canada",
  description: "A Ketovore Canada site exploring carnivore, keto, resources, Rick's journey, and daily logs.",
  openGraph: {
    title: "Ketovore Canada",
    description: "Carnivore first. Keto inspired. Built for real life.",
    url: "https://ketovorecanada.com",
    siteName: "Ketovore Canada",
    images: [{ url: "/og.png", width: 1733, height: 907, alt: "Ketovore Canada — Transform, Educate, Inspire" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ketovore Canada",
    description: "Carnivore first. Keto inspired. Built for real life.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
