// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.hardcover.app",
        port: "",
        pathname: "/external_data/**",
      },
      {
        protocol: "https",
        hostname: "assets.hardcover.app",
        port: "",
        pathname: "/edition/**",
      },
      // Add more patterns if needed
    ],
  },
  // ...other Next.js configurations
};

export default nextConfig;
