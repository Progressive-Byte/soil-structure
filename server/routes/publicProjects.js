const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// No pagination here — the public /projects grid shows everything, same as
// when it read from the static JSON fixture.
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.sector) filter.sector = req.query.sector;
    const projects = await Project.find(filter).sort({ order: 1 });
    res.json({ projects });
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
