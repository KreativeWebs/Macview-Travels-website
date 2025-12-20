import express from "express";
import upload from "../config/multer.js";
import FlashSale from "../models/FlashSale.js";
import { getFlashSaleById, createFlashSaleBooking } from "../controllers/adminController.js";

const router = express.Router();

// Get all flash sales
router.get("/", async (req, res) => {
  try {
    const flashSales = await FlashSale.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ flashSales });
  } catch (error) {
    console.error("Error fetching flash sales:", error);
    res.status(500).json({ message: "Error fetching flash sales" });
  }
});

// Get single flash sale by ID
router.get("/:id", getFlashSaleById);

// Create flash sale booking
router.post("/book", createFlashSaleBooking);

// Upload document
router.post("/upload-document", upload.single("file"), (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded"
      });
    }

    return res.json({
      success: true,
      fileUrl: req.file.path, // Cloudinary file URL returned
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
