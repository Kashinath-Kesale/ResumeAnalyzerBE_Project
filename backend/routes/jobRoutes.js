import express from "express";
import { createJob, listJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: list all jobs
router.get("/", listJobs);

// Recruiter: create new job
router.post("/", protect, createJob);

// Recruiter: list my jobs
// (needs controller function later: listMyJobs)
router.get("/my", protect, (req, res) => {
  res.json({ message: "TODO: implement listMyJobs" });
});

// Recruiter: update a job
// (needs controller function later: updateJob)
router.patch("/:id", protect, (req, res) => {
  res.json({ message: "TODO: implement updateJob" });
});

// Recruiter: delete a job
// (needs controller function later: deleteJob)
router.delete("/:id", protect, (req, res) => {
  res.json({ message: "TODO: implement deleteJob" });
});

export default router;
