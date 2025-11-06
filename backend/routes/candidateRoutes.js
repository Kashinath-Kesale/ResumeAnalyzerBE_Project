import express from "express";
import { updateCandidateProfile, getCandidateProfile, uploadAvatar } from "../controllers/candidateController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getJobsWithMatch } from "../controllers/candidateJobController.js";
import { uploadAvatarStorage } from "../utils/multer.js";


const router = express.Router();

router.post("/profile", protect, updateCandidateProfile);
router.get("/profile", protect, getCandidateProfile);
router.get("/jobs", protect, getJobsWithMatch);
router.post("/avatar", protect, uploadAvatarStorage.single("avatar"), uploadAvatar);


export default router;
