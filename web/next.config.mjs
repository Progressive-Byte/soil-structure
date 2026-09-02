/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is local in this phase. When the CMS/API is added, whitelist
    // remote hosts here (e.g. the MongoDB-backed asset/CDN domain).
    remotePatterns: [],
  },
};

export default nextConfig;
