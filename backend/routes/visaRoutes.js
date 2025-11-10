import express from "express";
import { getVisaRequirements } from "../controllers/visaController.js";
import VisaApplication from "../models/visaApplication.js";
import upload from "../config/multer.js"; 

const router = express.Router();

// Route: GET /api/visa/requirements/:country
router.get("/requirements/:country", getVisaRequirements);

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

// Route: POST /api/visa/apply
router.post("/apply", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, destinationCountry, visaType, documents, payment, processingTime } = req.body;

    const newApplication = new VisaApplication({
      fullName,
      email,
      phoneNumber,
      destinationCountry,
      visaType,
      documents,
      payment,
      processingTime,
      status: "received",
    });

    await newApplication.save();

    if (global.io) {
      global.io.emit("newVisaApplication", {
        id: newApplication._id,
        fullName: newApplication.fullName,
        email: newApplication.email,
        phoneNumber: newApplication.phoneNumber,
        destinationCountry: newApplication.destinationCountry,
        visaType: newApplication.visaType,
        documents: newApplication.documents,
        payment: newApplication.payment,
        processingTime: newApplication.processingTime,
        status: newApplication.status,
        createdAt: newApplication.createdAt,
        isNew: true,
      });

      const VisaApplication = (await import("../models/visaApplication.js")).default;
      const visaCount = await VisaApplication.countDocuments();
      global.io.emit("statsUpdate", { visaApplications: visaCount });
    }

    res.status(201).json({
      success: true,
      message: "✅ Visa application submitted successfully!",
      data: newApplication,
    });

  } catch (error) {
    console.error("❌ Error submitting visa application:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting visa application.",
      error: error.message,
    });
  }
});

export default router;
