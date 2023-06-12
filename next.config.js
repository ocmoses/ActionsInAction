/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "amazonpartner.com.ng",
      "10.1.29.122",
      "10.1.29.123",
      "10.1.44.40",
    ],
  },
  experimental: {
    appDir: true,
  },
};
