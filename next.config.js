    /** @type {import('next').NextConfig} */
    const nextConfig = {
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
