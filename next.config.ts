import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com", // Replace with your actual Cloudflare R2 domain
      },
      {
        hostname: "pub-6f38cb291c774862bfef08b6b3a9e2eb.r2.dev", // Replace with your actual Cloudflare R2 domain
      },
      {
        hostname: "images.unsplash.com", // Replace with your actual Cloudflare R2 domain
      },
    ],
  },
};

export default nextConfig;
