/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },
  reactStrictMode: true,
  images: {
    domains: ["amazonpartner.com.ng", "10.1.29.77"],
  },
  experimental: {
    appDir: true,
  },
}
