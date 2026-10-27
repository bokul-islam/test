import type { NextConfig } from "next";

const isPages =
  process.env.GITHUB_PAGES === "true" || process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  images: {
    unoptimized: isPages,
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

if (isPages) {
  nextConfig.output = "export";
  nextConfig.basePath = "/test";
  nextConfig.trailingSlash = true;
}

export default nextConfig;
