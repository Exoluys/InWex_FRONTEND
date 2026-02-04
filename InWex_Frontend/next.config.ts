import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sgp1.digitaloceanspaces.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
