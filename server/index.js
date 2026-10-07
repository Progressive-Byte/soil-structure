require("./bootstrap"); // must be first — loads server/.env before anything else reads process.env

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const adminProjectsRoutes = require("./routes/adminProjects");
const publicProjectsRoutes = require("./routes/publicProjects");
const uploadRoutes = require("./routes/upload");
const contactRoutes = require("./routes/contact");
const adminCareersRoutes = require("./routes/adminCareers");
const publicCareersRoutes = require("./routes/publicCareers");

connectDB();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin/projects", adminProjectsRoutes);
app.use("/api/public/projects", publicProjectsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/careers", adminCareersRoutes);
app.use("/api/public/careers", publicCareersRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok", timestamp: new Date() }));

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
