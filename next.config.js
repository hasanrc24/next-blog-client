/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    minimumCacheTTL: 60,
    disableStaticImages: true,
    writeToCacheDir: false,
  },
};

module.exports = nextConfig;
