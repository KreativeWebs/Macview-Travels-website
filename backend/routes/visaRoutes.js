import express from "express";
import { getVisaRequirements } from "../controllers/visaController.js";
import { upload } from "../middleware/upload.js";
import VisaApplication from "../models/visaApplication.js";

const router = express.Router();

// Route: GET /api/visa/requirements/:country
router.get("/requirements/:country", getVisaRequirements);

// Route: POST /api/visa/apply
router.post("/apply", upload.array("documents", 5), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      country,
      nationality,
      gender,
      dob,
      passportNumber,
      notes,
      visaType,
      travelDate,
    } = req.body;

    // Build documents array (schema expects label, fileUrl, textValue)
    const documents = req.files.map((file) => ({
      label: file.fieldname, // e.g. "passportCopy"
      fileUrl: `/uploads/${file.filename}`, // local path or cloud URL
      textValue: "", // empty for now
    }));

    // Create new visa application
    const newApplication = new VisaApplication({
      fullName,
      email,
      phoneNumber,
      nationality,
      destinationCountry: country,
      visaType,
      travelDate,
      gender,
      dob,
      passportNumber,
      notes,
      documents,
      payment: {
        status: "pending",
      },
    });

    await newApplication.save();

    // Emit real-time update to admin dashboard
    if (global.io) {
      // Emit new application
      global.io.emit('newVisaApplication', {
        id: newApplication._id,
        fullName: newApplication.fullName,
        destinationCountry: newApplication.destinationCountry,
        visaType: newApplication.visaType,
        status: newApplication.status,
        createdAt: newApplication.createdAt,
        isNew: true
      });

      // Emit updated stats
      const VisaApplication = (await import("../models/visaApplication.js")).default;
      const visaCount = await VisaApplication.countDocuments();
      global.io.emit('statsUpdate', {
        visaApplications: visaCount
      });
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
