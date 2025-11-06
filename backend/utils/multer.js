import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsRoot = path.join(process.cwd(), "uploads");

// ensure folder exists
fs.mkdirSync(uploadsRoot, { recursive: true });

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // store by user id folder if available
    const userId = req.user ? String(req.user._id) : "anonymous";
    const dir = path.join(uploadsRoot, "resumes", userId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fname = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
    cb(null, fname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx", ".txt"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowed.includes(ext)) return cb(new Error("Only PDF/DOC/DOCX/TXT allowed"), false);
  cb(null, true);
};

export const uploadResumeStorage = multer({
  storage: resumeStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user ? String(req.user._id) : "anonymous";
    const dir = path.join(uploadsRoot, "avatars", userId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fname = `avatar-${Date.now()}${ext}`;
    cb(null, fname);
  },
});

const avatarFileFilter = (req, file, cb) => {
  const allowed = [".png", ".jpg", ".jpeg", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowed.includes(ext)) return cb(new Error("Only PNG/JPG/JPEG/WEBP allowed"), false);
  cb(null, true);
};

export const uploadAvatarStorage = multer({
  storage: avatarStorage,
  fileFilter: avatarFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
