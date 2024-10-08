/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: true },
  images: {
    domains: ['localhost'],
  },
}

export default nextConfig
