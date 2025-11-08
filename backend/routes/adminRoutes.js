import express from "express";
import { getFlightBookings } from "../controllers/flightbookingController.js";


const router = express.Router();

router.get("/flight-bookings", getFlightBookings);

export default router;