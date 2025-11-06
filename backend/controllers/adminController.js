import Recruiter from "../models/Recruiter.js";

// Get all pending recruiters
export const getPendingRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find({ status: "pending" });
    res.json(recruiters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve recruiter
export const approveRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

    recruiter.status = "approved";
    await recruiter.save();

    res.json({ message: "Recruiter approved", recruiter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject recruiter
export const rejectRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

    recruiter.status = "rejected";
    await recruiter.save();

    res.json({ message: "Recruiter rejected", recruiter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
