/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "images.unsplash.com",
      "firebasestorage.googleapis.com",
      "www.shutterstock.com",
    ],
  },
};

export default nextConfig;
