import express from "express";
import { body, validationResult } from "express-validator";
import {
  createBlog,
  delBlog,
  getRecentBlogs,
  updateBlog,
  getBlogs,
  singleBlog,
  getBlogStats
} from "../Controllers/blogsController.js";
import { authenticate } from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const blogRouter = express.Router();

// =================== MULTER CONFIG ===================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname)); // ✅ EXTENSION SAFE
  },
});

// Image-only filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid =
    allowedTypes.test(file.mimetype) &&
    allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValid) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};

const upload = multer({ storage, fileFilter });

// =================== ROUTES ===================

// Public
blogRouter.get("/", getBlogs);
blogRouter.get("/one/:id", singleBlog);
blogRouter.get("/recentBlogs", getRecentBlogs);
blogRouter.get("/stats", getBlogStats); // Added /stats route

// Create Blog
blogRouter.post(
  "/",
  authenticate,                 // ✅ auth first
  upload.single("image"),
  [
    body("title")
      .trim()
      .notEmpty().withMessage("Title is required")
      .isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),
    body("content").notEmpty().withMessage("Content is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("metaDesc")
      .optional()
      .isLength({ max: 160 }).withMessage("Meta desc max 160 chars"),
    body("metaKeywords")
      .optional()
      .isLength({ max: 100 }).withMessage("Meta keywords max 100 chars"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    next();
  },
  createBlog
);

// Update Blog
blogRouter.put(
  "/:id",
  authenticate,
  upload.single("image"),
  [
    body("title").optional().isLength({ min: 5 }),
    body("content").optional(),
    body("category").optional(),
    body("metaDesc").optional().isLength({ max: 160 }),
    body("metaKeywords").optional().isLength({ max: 100 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    next();
  },
  updateBlog
);

// Delete Blog
blogRouter.delete("/:id", authenticate, delBlog);

export default blogRouter;
