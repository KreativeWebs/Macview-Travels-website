import express from "express";
import Package from "../models/Package.js";

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

export default router;
