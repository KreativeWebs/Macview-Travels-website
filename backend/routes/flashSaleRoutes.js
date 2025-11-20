import express from "express";
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

export default router;
