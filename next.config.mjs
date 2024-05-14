/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "imagedelivery.net"],
  },
};

export default nextConfig;
