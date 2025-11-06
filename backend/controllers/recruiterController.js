import Recruiter from "../models/Recruiter.js";
import Job from "../models/Job.js";

// ✅ Update or create recruiter profile
export const updateRecruiterProfile = async (req, res) => {
  try {
    let recruiter = await Recruiter.findOne({ userId: req.user._id });

    if (!recruiter) {
      recruiter = new Recruiter({
        userId: req.user._id,
        companyName: req.body.companyName,
        designation: req.body.designation,
        companyWebsite: req.body.companyWebsite,
        status: "pending", // default
      });
    } else {
      recruiter.companyName = req.body.companyName || recruiter.companyName;
      recruiter.designation = req.body.designation || recruiter.designation;
      recruiter.companyWebsite = req.body.companyWebsite || recruiter.companyWebsite;
    }

    await recruiter.save();
    res.json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get recruiter profile
export const getRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({ userId: req.user._id });
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter profile not found" });
    }
    res.json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all jobs posted by logged-in recruiter
export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({ userId: req.user._id });
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter profile not found" });
    }

    const jobs = await Job.find({ recruiterId: recruiter._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
