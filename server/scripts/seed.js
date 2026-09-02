// One-time migration: loads the original static fixture (web/data/projects.json)
// into MongoDB, upserted by slug so it's safe to re-run. After this, the site
// reads Projects from the database — this script (and the JSON file it reads)
// is the historical seed source only.
require("../bootstrap");

const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Project = require("../models/Project");

const fixturePath = path.join(__dirname, "../../web/data/projects.json");
const projects = require(fixturePath);

async function seed() {
  await connectDB();

  for (const project of projects) {
    const { _id, createdAt, updatedAt, ...doc } = project;
    await Project.findOneAndUpdate({ slug: doc.slug }, doc, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    console.log(`Seeded: ${doc.slug}`);
  }

  console.log(`Done — ${projects.length} project(s) seeded.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
