// Loads .env before any other module reads process.env — must be the first
// line required by index.js and every standalone script (e.g. scripts/seed.js).
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
