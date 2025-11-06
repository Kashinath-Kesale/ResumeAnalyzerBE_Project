import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
connectDB();

// Routes
import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(morgan("dev"));

// Static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// Debug route to check if auth routes are loaded
app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Auth routes are working" });
});

// ✅ Add this test route *above* fallback
app.get("/test", (req, res) => {
  console.log("✅ /test route hit");
  res.send("Backend working fine!");
});

// ⚠️ Fallback route should always be last
app.use((req, res) => {
  console.log(`⚠️ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ message: "Route not found", path: req.path, method: req.method });
});

const PORT = process.env.PORT || 5000;

// Export app for testing/importing if needed
export default app;

// Start the server (will be called when imported by index.js)
app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);
