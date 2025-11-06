import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationTokenHash: { type: String },
    verificationExpires: { type: Date },
    resetPasswordTokenHash: { type: String },
    resetPasswordExpires: { type: Date },
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
