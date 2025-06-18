const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/idea',
  assetPrefix: '/idea/',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'example.com'],
  },
};

module.exports = nextConfig; 