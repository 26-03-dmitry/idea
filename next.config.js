    /** @type {import('next').NextConfig} */
    const nextConfig = {
      basePath: process.env.NODE_ENV === 'production' ? '/idea' : undefined,
      output: 'export',
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
