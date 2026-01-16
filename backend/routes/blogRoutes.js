import express from "express";
import upload from "../config/multer.js";
import {
  getBlogs,
  getRecentBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  uploadBlogImage,
} from "../controllers/blogController.js";

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/recent", getRecentBlogs);
router.get("/:id", getBlogById);

// Admin routes
router.post("/", upload.single("image"), createBlog);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);
router.get("/admin/all", getAllBlogs);
router.post("/upload-image", upload.single("image"), uploadBlogImage);

export default router;
