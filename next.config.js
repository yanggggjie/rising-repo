/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  experimental: {
    // windowHistorySupport: true,
  },
}
module.exports = nextConfig
