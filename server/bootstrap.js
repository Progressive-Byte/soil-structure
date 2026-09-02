// Loads the repo-root .env before any other module reads process.env — must
// be the first line required by index.js and every standalone script (e.g.
// scripts/seed.js). One .env for both web/ and server/ — see .env.example.
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });
