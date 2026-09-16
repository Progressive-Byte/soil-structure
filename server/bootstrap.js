// Loads the repo-root .env before any other module reads process.env — must
// be the first line required by index.js and every standalone script (e.g.
// scripts/seed.js). One .env for both web/ and server/ — see .env.example.
const dotenv = require("dotenv");
const net = require("net");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

// This host's resolver returns unreachable NAT64-synthesized IPv6 addresses
// alongside real IPv4 ones, and Node's default Happy Eyeballs (RFC 8305)
// connection racing times out on those before falling back — breaking every
// outbound HTTPS call (Cloudinary uploads, SMTP). Forcing sequential
// connection attempts skips straight to the working IPv4 address.
net.setDefaultAutoSelectFamily(false);
