/** @type {import('next').NextConfig} */
module.exports = {
  // compiler: {
  //   removeConsole: true,
  // },
  reactStrictMode: true,
  images: {
    domains: ["amazonpartner.com.ng", "10.1.29.77"],
  },
  experimental: {
    appDir: true,
  },
}
