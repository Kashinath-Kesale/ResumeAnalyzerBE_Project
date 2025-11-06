import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    website: { type: String },
    address: { type: String },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Recruiter", recruiterSchema);
