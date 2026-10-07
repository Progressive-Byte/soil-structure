const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Vacancy = require("../models/Vacancy");
const Application = require("../models/Application");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) =>
    cb(null, /\.(pdf|doc|docx)$/i.test(file.originalname)),
});

async function uploadCv(file) {
  const config = cloudinary.config();
  const uploadForm = new FormData();
  const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
  const publicId = `${Date.now()}-${safeName}`;
  uploadForm.set(
    "file",
    new Blob([file.buffer], { type: file.mimetype }),
    safeName,
  );
  uploadForm.set("folder", "soil-structure/cvs");
  uploadForm.set("public_id", publicId);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(config.cloud_name)}/raw/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.api_key}:${config.api_secret}`).toString("base64")}`,
      },
      body: uploadForm,
    },
  );
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Cloudinary upload failed (${response.status}): ${result.error?.message || "No error details returned"}`,
    );
  }
  return result;
}

router.get("/", async (_req, res) => {
  try {
    const vacancies = await Vacancy.find({
      status: "open",
    }).sort({ order: 1 });

    res.json({ vacancies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const vacancy = await Vacancy.findOne({
      slug: req.params.slug,
      status: "open",
    });

    if (!vacancy) {
      return res
        .status(404)
        .json({ message: "Vacancy not found" });
    }

    res.json({ vacancy });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/applications",
  upload.single("cv"),
  async (req, res) => {
    const {
      name,
      email,
      phone,
      location,
      coverLetter,
      vacancy,
    } = req.body;

    if (
      ![name, email, phone, location, coverLetter].every(
        (v) => String(v || "").trim()
      ) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "") ||
      !req.file ||
      !vacancy
    ) {
      return res.status(400).json({
        message:
          "Complete all required fields and attach a PDF, DOC or DOCX CV under 5MB.",
      });
    }

    try {
      const position = await Vacancy.findOne({
        _id: vacancy,
        status: "open",
      });

      if (!position) {
        return res
          .status(404)
          .json({ message: "This vacancy is no longer open." });
      }

      const file = await uploadCv(req.file);

      await Application.create({
        vacancy: position._id,
        vacancyTitle: position.title,
        name,
        email,
        phone,
        location,
        coverLetter,
        cvUrl: file.secure_url,
        cvPublicId: file.public_id,
        cvName: req.file.originalname,
      });

      res.status(201).json({
        message: "Application received.",
      });
    } catch (err) {
      console.error(
        "Failed to save job application:",
        err
      );

      res.status(502).json({
        message:
          "Unable to submit your application. Please try again.",
      });
    }
  }
);

module.exports = router;
