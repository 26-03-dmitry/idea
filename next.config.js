const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/idea' : '',
  assetPrefix: isProd ? '/idea/' : '',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'example.com'],
  },
};

module.exports = nextConfig; 