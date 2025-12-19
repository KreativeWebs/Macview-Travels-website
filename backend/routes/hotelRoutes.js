import express from "express";
import {
  createHotelBooking,
  getHotelBookings,
  getHotelBookingById,
  updateHotelBooking,
  deleteHotelBooking,
  updateHotelBookingStatus,
} from "../controllers/hotelController.js";
import upload from "../config/multer.js";

const router = express.Router();

// Routes for hotel bookings
router.post("/", createHotelBooking); // Create new hotel booking
router.get("/", getHotelBookings); // Get all hotel bookings (with pagination and search)
router.get("/:id", getHotelBookingById); // Get single hotel booking by ID
router.put("/:id", updateHotelBooking); // Update hotel booking
router.put("/:id/status", updateHotelBookingStatus); // Update hotel booking status
router.delete("/:id", deleteHotelBooking); // Delete hotel booking

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
