const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    vacancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },
    vacancyTitle: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    coverLetter: { type: String, required: true },
    cvUrl: { type: String },
    cvPublicId: { type: String },
    cvName: { type: String, required: true },
    cvData: { type: Buffer },
    cvMimeType: { type: String },
    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected"],
      default: "new",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret._id = ret._id.toString();
        ret.vacancy = ret.vacancy?.toString();
        ret.createdAt = ret.createdAt.toISOString();
        ret.updatedAt = ret.updatedAt.toISOString();
        delete ret.cvData;
        delete ret.cvMimeType;
        delete ret.cvUrl;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Application", applicationSchema);
