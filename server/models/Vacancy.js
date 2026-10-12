const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    number: { type: String, default: "01" },
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    location: { type: String, default: "Dhaka, Bangladesh" },
    employmentType: { type: String, default: "Full-time" },
    experience: { type: String, default: "" },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    preferredQualifications: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret._id = ret._id.toString();
        ret.createdAt = ret.createdAt.toISOString();
        ret.updatedAt = ret.updatedAt.toISOString();
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Vacancy", vacancySchema);
