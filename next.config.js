const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/idea", // закомментировано, так как gh-pages-redirect.js решает проблему с путем
  output: 'export', // раскомментировал для сборки
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