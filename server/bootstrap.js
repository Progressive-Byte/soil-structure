// Loads .env before any other module reads process.env — must be the first
// line imported by index.js and every standalone script (e.g. scripts/seed.js).
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });
