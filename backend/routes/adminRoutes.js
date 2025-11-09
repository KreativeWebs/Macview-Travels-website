import express from "express";
import { getFlightBookings } from "../controllers/flightbookingController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply admin authentication to all admin routes
router.use(authenticateAdmin);

router.get("/flight-bookings", getFlightBookings);

export default router;
