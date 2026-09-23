const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/auth");
const { parsePagination, buildMeta } = require("../utils/pagination");
const { uniqueSlug } = require("../utils/slug");

const router = express.Router();
router.use(protect);

// Matches impact-reports' sort options: recent|oldest|az|za. Falls back to
// the manual `order` field (what the "Order" column shows) when unset.
const SORT_OPTIONS = {
  recent: { createdAt: -1 },
  oldest: { createdAt: 1 },
  az: { title: 1 },
  za: { title: -1 },
};

function validateProjectPayload(body, { partial = false } = {}) {
  const required = ["title", "sector", "summary", "description"];
  for (const field of required) {
    if (!partial && !String(body[field] ?? "").trim()) {
      return `${field} is required`;
    }
  }
  if (body.status !== undefined && !["ongoing", "completed"].includes(body.status)) {
    return "status must be ongoing or completed";
  }
  if (!partial || body.coverImage !== undefined) {
    if (!body.coverImage?.src || !body.coverImage?.alt) {
      return "coverImage.src and coverImage.alt are required";
    }
  }
  return null;
}

// GET /api/admin/projects?page=&limit=&q=&sector=&sort=recent|oldest|az|za
router.get("/", async (req, res) => {
  try {
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 10, maxLimit: 100 });
    const filter = {};
    if (req.query.q) {
      filter.title = { $regex: String(req.query.q), $options: "i" };
    }
    if (req.query.sector) {
      filter.sector = String(req.query.sector);
    }
    const sortSpec = SORT_OPTIONS[req.query.sort] || { order: 1, createdAt: -1 };
    const [projects, total] = await Promise.all([
      Project.find(filter).sort(sortSpec).skip(skip).limit(limit),
      Project.countDocuments(filter),
    ]);
    res.json({ projects, meta: buildMeta({ page, limit, total }) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/projects/sectors — distinct values for the admin form's datalist
router.get("/sectors", async (_req, res) => {
  try {
    const sectors = await Project.distinct("sector");
    res.json({ sectors: sectors.filter(Boolean).sort() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (err) {
    res.status(400).json({ message: "Invalid project id" });
  }
});

router.post("/", async (req, res) => {
  try {
    const error = validateProjectPayload(req.body);
    if (error) return res.status(400).json({ message: error });

    const slug = await uniqueSlug(Project, req.body.slug || req.body.title);
    const project = await Project.create({ ...req.body, slug });
    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const error = validateProjectPayload(req.body, { partial: true });
    if (error) return res.status(400).json({ message: error });

    const update = { ...req.body };
    if (update.slug || update.title) {
      update.slug = await uniqueSlug(Project, update.slug || update.title, req.params.id);
    }

    const project = await Project.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
