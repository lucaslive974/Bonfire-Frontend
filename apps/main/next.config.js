/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ["@bonfire/ui"],
  optimizeFonts: false,
}

module.exports = nextConfig
