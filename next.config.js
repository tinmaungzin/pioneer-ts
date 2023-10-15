/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/download_image/**",
      },
      {
        protocol: "https",
        hostname: "backend.pioneerentertainment.org",
        port: "",
        pathname: "/download_image/**",
      },
      {
        protocol: "http",
        hostname: "178.128.60.220",
        port: "",
        pathname: "/download_image/**",
      },
    ],
  },
};

module.exports = nextConfig;
