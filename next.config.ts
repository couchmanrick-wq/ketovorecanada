import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    inlineCss: true,
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
