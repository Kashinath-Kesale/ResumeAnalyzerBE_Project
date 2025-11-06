import dotenv from "dotenv";
dotenv.config();

import("./server.js")
  .then(() => {
    console.log("🚀 Backend started successfully");
  })
  .catch((err) => {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  });
