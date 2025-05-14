import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.sidearmdev.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dxbhsrqyrr690.cloudfront.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "d33mrnwqfel57x.cloudfront.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
