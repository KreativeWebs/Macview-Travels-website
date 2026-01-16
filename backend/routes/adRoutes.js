import express from "express";
import upload from "../config/multer.js";
import {
  getAdsByBlog,
  createAd,
  updateAd,
  deleteAd,
  getAllAds,
} from "../controllers/adController.js";

const router = express.Router();

// Public routes
router.get("/blog/:blogId", getAdsByBlog);

// Admin routes
router.post("/", upload.single("image"), createAd);
router.put("/:id", upload.single("image"), updateAd);
router.delete("/:id", deleteAd);
router.get("/admin/all", getAllAds);

export default router;
