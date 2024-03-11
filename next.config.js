/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  basePath: '/rising-repo',

  images: {
    unoptimized: true,
  },

  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  experimental: {},
}
module.exports = nextConfig
