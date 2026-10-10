const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Vacancy = require("../models/Vacancy");
const Application = require("../models/Application");
const cloudinary = require("../config/cloudinary");
const { protect } = require("../middleware/auth");
const { parsePagination, buildMeta } = require("../utils/pagination");
const { uniqueSlug } = require("../utils/slug");

const router = express.Router();
router.use(protect);

router.get("/applications", async (req, res) => {
  try {
    const { page, limit, skip } = parsePagination(req.query, {
      defaultLimit: 10,
      maxLimit: 100,
    });
    const filter = {};
    if (req.query.q)
      filter.$or = ["name", "email", "vacancyTitle", "$oid"].map((key) => ({
        [key]: { $regex: String(req.query.q), $options: "i" },
      }));
    if (req.query.status) filter.status = String(req.query.status);
    if (req.query.vacancy) filter.vacancy = String(req.query.vacancy);
    const [applications, total] = await Promise.all([
      Application.find(filter)
        .select("-cvData -cvMimeType")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(filter),
    ]);
    res.json({ applications, meta: buildMeta({ page, limit, total }) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting applications with status 'new'
router.get("/applications/new-counts", async (req, res) => {
  try {
    const counts = await Application.aggregate([
      {
        $match: {
          status: "new",
        },
      },
      {
        $group: {
          _id: "$vacancy",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json({
      counts: counts.map((item) => ({
        vacancy: String(item._id),
        count: item.count,
      })),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/applications/:id/cv", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid application id" });
  }

  try {
    const application = await Application.findById(req.params.id).select(
      "+cvData +cvMimeType",
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (!application.cvData && application.cvUrl) {
      let fileResponse;

      if (application.cvPublicId) {
        const format = path.extname(application.cvName).slice(1).toLowerCase();
        const downloadUrl = cloudinary.utils.private_download_url(
          application.cvPublicId,
          format,
          {
            resource_type: "raw",
            type: application.cvDeliveryType || "upload",
            expires_at: Math.floor(Date.now() / 1000) + 120,
            attachment: true,
          },
        );
        fileResponse = await fetch(downloadUrl);
      }

      // Older applications may not have a Cloudinary public ID saved.
      if (!fileResponse || !fileResponse.ok) {
        fileResponse = await fetch(application.cvUrl);
      }
      if (!fileResponse.ok || !fileResponse.body) {
        console.error(
          `CV download failed for application ${application._id}: storage returned ${fileResponse.status}`,
        );
        return res.status(502).json({ message: "Unable to retrieve CV file from storage" });
      }
      const safeName = application.cvName.replace(/[\r\n"\\]/g, "_");
      res.set(
        "Content-Type",
        fileResponse.headers.get("content-type") || "application/octet-stream",
      );
      res.set("Content-Disposition", `attachment; filename="${safeName}"`);
      return res.send(Buffer.from(await fileResponse.arrayBuffer()));
    }
    if (!application.cvData) {
      return res.status(404).json({ message: "CV file not found" });
    }
    const safeName = application.cvName.replace(/[\r\n"\\]/g, "_");
    res.set("Content-Type", application.cvMimeType);
    res.set("Content-Disposition", `attachment; filename="${safeName}"`);
    res.send(application.cvData);
  } catch (err) {
    console.error(`CV download failed for application ${req.params.id}:`, err);
    res.status(502).json({ message: "Unable to retrieve CV file from storage" });
  }
});

router.patch("/applications/:id", async (req, res) => {
  if (
    !["new", "reviewing", "shortlisted", "rejected"].includes(req.body.status)
  )
    return res.status(400).json({ message: "Invalid application status" });
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json({ application });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.cvPublicId) {
      const result = await cloudinary.uploader.destroy(application.cvPublicId, {
        resource_type: "raw",
      });
      if (result.result !== "ok" && result.result !== "not found") {
        return res
          .status(502)
          .json({ message: "Could not delete the CV from Cloudinary" });
      }
    }

    await application.deleteOne();
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page, limit, skip } = parsePagination(req.query, {
      defaultLimit: 10,
      maxLimit: 100,
    });
    const filter = {};
    if (req.query.q)
      filter.$or = ["title", "department", "location"].map((key) => ({
        [key]: { $regex: String(req.query.q), $options: "i" },
      }));
    if (req.query.status) filter.status = String(req.query.status);
    if (req.query.department) filter.department = String(req.query.department);
    const sortFields = {
      recent: { createdAt: -1 },
      oldest: { createdAt: 1 },
      az: { title: 1 },
      za: { title: -1 },
    };
    const requestedSort = sortFields[String(req.query.sort)] || {
      order: 1,
      createdAt: -1,
    };
    const sort = { status: -1, ...requestedSort };
    const [vacancies, total] = await Promise.all([
      Vacancy.find(filter).sort(sort).skip(skip).limit(limit),
      Vacancy.countDocuments(filter),
    ]);
    const departments = await Vacancy.distinct("department");
    res.json({
      vacancies,
      departments: departments.filter(Boolean).sort(),
      meta: buildMeta({ page, limit, total }),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);
    if (!vacancy) return res.status(404).json({ message: "Vacancy not found" });
    res.json({ vacancy });
  } catch {
    res.status(400).json({ message: "Invalid vacancy id" });
  }
});
router.post("/", async (req, res) => {
  try {
    const required = ["title", "department", "summary", "description"];
    const missing = required.find((key) => !String(req.body[key] || "").trim());
    if (missing)
      return res.status(400).json({ message: `${missing} is required` });
    const vacancy = await Vacancy.create({
      ...req.body,
      slug: await uniqueSlug(Vacancy, req.body.slug || req.body.title),
    });
    res.status(201).json({ vacancy });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.slug || update.title)
      update.slug = await uniqueSlug(
        Vacancy,
        update.slug || update.title,
        req.params.id,
      );
    const vacancy = await Vacancy.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!vacancy) return res.status(404).json({ message: "Vacancy not found" });
    res.json({ vacancy });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    // if (await Application.exists({ vacancy: req.params.id }))
    //   return res.status(409).json({
    //     message: "This vacancy has applications and cannot be deleted.",
    //   });
    const vacancy = await Vacancy.findByIdAndDelete(req.params.id);
    if (!vacancy) return res.status(404).json({ message: "Vacancy not found" });
    res.json({ message: "Vacancy deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
