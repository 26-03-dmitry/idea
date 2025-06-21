const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Apply assetPrefix only for production builds
  assetPrefix: process.env.NODE_ENV === 'production' ? '/idea/' : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};

module.exports = nextConfig; 