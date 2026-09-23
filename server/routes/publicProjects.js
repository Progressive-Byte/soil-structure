const express = require("express");
const Project = require("../models/Project");
const { parsePagination, buildMeta } = require("../utils/pagination");

const router = express.Router();

// GET /api/public/projects[?sector=][?status=][?q=][?page=&limit=]
// Pagination is opt-in: no page/limit means "everything" (used by the
// homepage, sitemap, and sector list) — the /projects page passes page/limit
// explicitly and gets a `meta` block back.
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.sector) filter.sector = req.query.sector;
    if (req.query.q) filter.title = { $regex: String(req.query.q), $options: "i" };

    if (!req.query.page && !req.query.limit) {
      const projects = await Project.find(filter).sort({ order: 1 });
      return res.json({ projects });
    }

    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 9, maxLimit: 48 });
    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ order: 1 }).skip(skip).limit(limit),
      Project.countDocuments(filter),
    ]);
    res.json({ projects, meta: buildMeta({ page, limit, total }) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
