import express from "express";
import { createFlightBooking, getFlightBookings } from '../controllers/flightbookingController.js';


const router = express.Router();

router.post("/", createFlightBooking);
router.get("/", getFlightBookings);

export default router;
