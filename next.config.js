const {
  withHydrationOverlay,
} = require('@builder.io/react-hydration-overlay/next')

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
module.exports = withHydrationOverlay({
  /**
   * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
   * for Next.js apps with pages directory. If you are using the app directory, you should change this to `main`.
   */
  appRootSelector: '#__next',
})(nextConfig)
