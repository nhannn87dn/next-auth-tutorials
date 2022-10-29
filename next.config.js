/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    loginPage: "/login",
    denyPage: "/deny"
  }
}

module.exports = nextConfig
