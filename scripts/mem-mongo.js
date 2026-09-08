// Temporary in-memory MongoDB for local preview (see CONTINUE_HERE.md §4B).
// Run in its own terminal and leave open: node scripts/mem-mongo.js
// Data resets when this process stops — use Atlas for anything persistent.
const { MongoMemoryServer } = require("mongodb-memory-server");

(async () => {
  const server = await MongoMemoryServer.create({
    instance: { port: 27017, dbName: "soil_structure" },
  });
  console.log("MEM_MONGO_READY", server.getUri());
  process.stdin.resume(); // keep alive
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
