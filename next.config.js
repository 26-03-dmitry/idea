const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // This line is commented out to allow middleware to run in development
  // Apply assetPrefix only for production builds
  assetPrefix: process.env.NODE_ENV === 'production' ? '/idea/' : undefined,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'example.com'],
  },
};

module.exports = nextConfig; 