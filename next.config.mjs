/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: ["drive.google.com", "cdn.shopify.com", "imagedelivery.net"],
  },
};

export default nextConfig;
