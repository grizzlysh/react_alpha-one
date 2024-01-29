/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode            : true,
  swcMinify                  : true,
  staticPageGenerationTimeout: 100,
  eslint                     : {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer(
//   // your Next.js configuration
//   nextConfig
// )