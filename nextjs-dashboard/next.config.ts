// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.hardcover.app",
        port: "",
        pathname: "/**", // Matches any path under this domain
      },
    ],
  },
  // ...other Next.js configurations
};

export default nextConfig;
