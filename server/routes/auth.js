const express = require("express");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Static single-admin login — credentials live in server/.env, compared
// directly (no Admin collection, per the project's simplified auth scope).
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin", username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "12h",
  });

  res.json({ token, admin: { username } });
});

router.get("/me", protect, (req, res) => {
  res.json({ admin: { username: req.admin.username } });
});

module.exports = router;
