import Job from "../models/Job.js";
import Candidate from "../models/Candidate.js";
import { computeMatchPercentage } from "../utils/matching.js";

export const getJobsWithMatch = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ userId: req.user._id });
    const candidateKeywords = candidate?.keywords || [];

    const jobs = await Job.find().sort({ createdAt: -1 });
    const jobsWithMatch = jobs.map(job => {
      const match = computeMatchPercentage(candidateKeywords, job.keywords || []);
      return { job, matchPercentage: match };
    });

    res.json(jobsWithMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
