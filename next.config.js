/** @type {import('next').NextConfig} */
const { withNextDevtools } = require('@next-devtools/core/plugin')

const nextConfig = {
  /* config options here */
  reactStrictMode: false,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = withNextDevtools(nextConfig)
