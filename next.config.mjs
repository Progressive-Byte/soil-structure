import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// One .env at the repo root for both web/ and server/ — loaded explicitly
// here since Next only auto-loads .env* files from its own project directory
// (web/), and NEXT_PUBLIC_* vars need to be in process.env before Next embeds
// them into the client bundle.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

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
