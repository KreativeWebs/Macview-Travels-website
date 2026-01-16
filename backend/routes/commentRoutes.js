import express from "express";
import {
  getCommentsByBlog,
  createComment,
  replyToComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentController.js";

const router = express.Router();

// Public routes
router.get("/blog/:blogId", getCommentsByBlog);
router.post("/", createComment);

// Admin routes
router.post("/:id/reply", replyToComment);
router.delete("/:id", deleteComment);
router.get("/admin/all", getAllComments);

export default router;
