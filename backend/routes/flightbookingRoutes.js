import express from "express";
import { createFlightBooking, getFlightBookings } from "../controllers/flightbookingController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", createFlightBooking);
router.get("/", getFlightBookings);

// File Upload Route using Cloudinary
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
