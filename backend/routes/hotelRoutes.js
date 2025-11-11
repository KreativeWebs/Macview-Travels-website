import express from "express";
import {
  createHotelBooking,
  getHotelBookings,
  getHotelBookingById,
  updateHotelBooking,
  deleteHotelBooking,
  updateHotelBookingStatus,
} from "../controllers/hotelController.js";

const router = express.Router();

// Routes for hotel bookings
router.post("/", createHotelBooking); // Create new hotel booking
router.get("/", getHotelBookings); // Get all hotel bookings (with pagination and search)
router.get("/:id", getHotelBookingById); // Get single hotel booking by ID
router.put("/:id", updateHotelBooking); // Update hotel booking
router.put("/:id/status", updateHotelBookingStatus); // Update hotel booking status
router.delete("/:id", deleteHotelBooking); // Delete hotel booking

export default router;
