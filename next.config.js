/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "nextjs-blog-strapi-production.up.railway.app",
    ],
  },
};

module.exports = nextConfig;
