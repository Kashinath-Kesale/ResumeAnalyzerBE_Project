import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: String, required: true },
    rollNo: { type: String, required: true },
    branch: { type: String, required: true },
    avatarUrl: { type: String },
    education: {
      year: { type: String },
      cgpa: { type: String },
    },
    resumeUrl: { type: String },
    parsedText: { type: String },     // full extracted text from resume
    keywords: [{ type: String }],     // keywords extracted from resume
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);
