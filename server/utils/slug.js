const slugify = require("slugify");

function toSlug(value) {
  return slugify(value || "", { lower: true, strict: true });
}

// Appends -2, -3, ... until the slug is free. `excludeId` lets an edit keep
// its own slug without colliding with itself.
async function uniqueSlug(Model, base, excludeId) {
  const root = toSlug(base) || "project";
  let candidate = root;
  let suffix = 2;
  while (true) {
    const query = { slug: candidate };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Model.findOne(query).select("_id").lean();
    if (!existing) return candidate;
    candidate = `${root}-${suffix}`;
    suffix += 1;
  }
}

module.exports = { toSlug, uniqueSlug };
