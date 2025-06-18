/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'example.com'],
  },
  i18n: {
    locales: ['ka', 'en', 'ru'],
    defaultLocale: 'ka',
  },
}

module.exports = nextConfig 