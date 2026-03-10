import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    optimizePackageImports: [
      "@repo/database",
      "@repo/tibia-utils",
      "@repo/theme",
      "@mui/material",
      "@mui/icons-material",
      "@mui/x-charts",
      "@mui/x-date-pickers",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saoouvvhunyuohwqmbwy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
