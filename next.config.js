/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "https://backend.pioneerentertainment.org"],
  },
}

module.exports = nextConfig
