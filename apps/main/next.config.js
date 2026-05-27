/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ["@bonfire/ui", "@bonfire/core"],
  optimizeFonts: false,
}

module.exports = nextConfig
