/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
  ],
  reactStrictMode: true,
};

export default nextConfig;
