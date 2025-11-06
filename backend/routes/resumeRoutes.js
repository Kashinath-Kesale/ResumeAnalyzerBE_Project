import express from "express";
import { uploadResume } from "../controllers/resumeController.js";
import { uploadResumeStorage } from "../utils/multer.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, uploadResumeStorage.single("resume"), uploadResume);

export default router;
