/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tibiadraptor.com",
        pathname: "/images/monsters/**",
      },
    ],
  },
  transpilePackages: [
    '@mui/material',
    '@mui/system', 
    '@mui/icons-material',
    '@emotion/react',
    '@emotion/styled'
  ],
  reactStrictMode: true,
};

export default nextConfig;
