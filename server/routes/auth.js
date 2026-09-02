const express = require("express");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Static single-admin login — credentials live in server/.env, compared
// directly (no Admin collection, per the project's simplified auth scope).
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (
    email.toLowerCase() !== String(process.env.ADMIN_EMAIL).toLowerCase() ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "12h",
  });

  res.json({ token, admin: { email } });
});

router.get("/me", protect, (req, res) => {
  res.json({ admin: { email: req.admin.email } });
});

module.exports = router;
