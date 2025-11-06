import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String }, 
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter" },
    description: { type: String },
    keywords: [{ type: String }], // recruiter can add important skill keywords
    location: { type: String },
    minExperience: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
