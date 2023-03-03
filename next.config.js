/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    removeConsole: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["amazonpartner.com.ng", "10.1.29.122", "10.1.29.123"],
  },
  experimental: {
    appDir: true,
  },
}
