import express from "express";
import Package from "../models/Package.js";
import PackageBooking from "../models/PackageBooking.js";
import upload from "../config/multer.js";

const router = express.Router();

// Get all active packages (public route - no auth required)
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ packages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Error fetching packages" });
  }
});

// Get single package by ID (public route - no auth required)
router.get("/:id", async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({ package: packageData });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: "Error fetching package" });
  }
});

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

// Route: POST /api/packages/book
router.post("/book", async (req, res) => {
  try {
    const { fullName, whatsappNumber, travelDate, packageId, packageTitle, packagePrice, packageCurrency, documents, email } = req.body;

    const newBooking = new PackageBooking({
      fullName,
      email,
      whatsappNumber,
      travelDate,
      packageId,
      packageTitle,
      packagePrice,
      packageCurrency,
      documents,
      status: "received",
    });

    await newBooking.save();

    if (global.io) {
      global.io.emit("newPackageBooking", {
        id: newBooking._id,
        fullName: newBooking.fullName,
        whatsappNumber: newBooking.whatsappNumber,
        travelDate: newBooking.travelDate,
        packageTitle: newBooking.packageTitle,
        packagePrice: newBooking.packagePrice,
        packageCurrency: newBooking.packageCurrency,
        documents: newBooking.documents,
        status: newBooking.status,
        createdAt: newBooking.createdAt,
        isNew: true,
      });

      const PackageBooking = (await import("../models/PackageBooking.js")).default;
      const bookingCount = await PackageBooking.countDocuments();
      global.io.emit("statsUpdate", { packageBookings: bookingCount });
    }

    res.status(201).json({
      success: true,
      message: "✅ Package booking submitted successfully!",
      data: newBooking,
    });

  } catch (error) {
    console.error("❌ Error submitting package booking:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting package booking.",
      error: error.message,
    });
  }
});

export default router;
