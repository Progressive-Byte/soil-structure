const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { protect } = require("../middleware/auth");

const MAX_SIZE_MB = 5;

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "soil-structure/projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPEG, PNG, and WebP images are allowed"));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 } });

const router = express.Router();
router.use(protect);

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file received" });
  res.json({ url: req.file.path });
});

router.use((err, _req, res, _next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: `File too large — maximum size is ${MAX_SIZE_MB} MB` });
  }
  res.status(400).json({ message: err.message || "Upload failed" });
});

module.exports = router;
