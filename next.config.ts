import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel handles its own build output — no "standalone" needed */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // Allow external image domains if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
