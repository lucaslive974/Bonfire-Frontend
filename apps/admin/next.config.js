/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ["@bonfire/ui", "@bonfire/core"],
}

module.exports = nextConfig
