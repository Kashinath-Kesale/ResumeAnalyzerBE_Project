import express from "express";
import { updateRecruiterProfile, getRecruiterProfile } from "../controllers/recruiterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/profile", protect, updateRecruiterProfile);

router.get("/profile", protect, getRecruiterProfile);

export default router;
