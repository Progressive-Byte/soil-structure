const jwt = require("jsonwebtoken");

// There's no Admin collection — this is a single static admin credential
// (see routes/auth.js), so protect() only needs to verify the JWT itself.
function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { protect };
