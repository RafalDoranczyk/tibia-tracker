import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@repo/database",
      "@repo/tibia-utils",
      "@mui/material",
      "@mui/icons-material",
    ],
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saoouvvhunyuohwqmbwy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "tibiadraptor.com",
        pathname: "/images/monsters/**",
      },
    ],
  },
  transpilePackages: [
    "@mui/material",
    "@mui/system",
    "@mui/icons-material",
    "@emotion/react",
    "@emotion/styled",
    "@repo/database",
    "@repo/scrapers",
    "@repo/tibia-utils",
    "@repo/tibia-data",
    "@repo/validation",
    "@repo/errors",
  ],
  reactStrictMode: true,
};

export default nextConfig;
