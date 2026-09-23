const mongoose = require("mongoose");

const imageAssetSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
  },
  { _id: false },
);

const projectStatSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    sector: { type: String, required: true, trim: true },
    // Mirrors PROJECT_STATUSES in lib/data/projects.ts. Projects saved before
    // this field existed read back as "completed" via the default.
    status: { type: String, enum: ["ongoing", "completed"], default: "completed" },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: "" },
    year: { type: String, default: "" },
    client: { type: String, default: "" },
    services: { type: [String], default: [] },
    coverImage: { type: imageAssetSchema, required: true },
    gallery: { type: [imageAssetSchema], default: [] },
    stats: { type: [projectStatSchema], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret._id = ret._id.toString();
        ret.createdAt = ret.createdAt.toISOString();
        ret.updatedAt = ret.updatedAt.toISOString();
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Project", projectSchema);
