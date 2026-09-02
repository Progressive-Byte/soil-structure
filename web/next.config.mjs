import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// The env file lives at the repo root (one .env for both web/ and server/),
// one level up from this file — Next.js only auto-loads .env* from its own
// directory, so it's loaded explicitly here before NEXT_PUBLIC_* vars get
// embedded into the client bundle.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Project images uploaded through the admin panel are hosted on Cloudinary.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
