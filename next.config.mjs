/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Mission & Values page was merged into /about; keep old links working.
  async redirects() {
    return [
      { source: "/mission-values", destination: "/about#mission", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      // Project images uploaded through the admin panel are hosted on Cloudinary.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
