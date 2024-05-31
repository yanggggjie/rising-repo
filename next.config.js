/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  basePath: '/rising-repo',

  images: {
    unoptimized: true,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
  },
}
module.exports = nextConfig
