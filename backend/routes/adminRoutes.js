import express from "express";
import { getOverviewData } from "../controllers/adminController.js";
import { getFlightBookings } from "../controllers/flightbookingController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import VisaApplication from "../models/visaApplication.js";
import FlightBooking from "../models/flightbooking.js";

const router = express.Router();

// Apply admin authentication to all admin routes
router.use(authenticateAdmin);

router.get("/overview", getOverviewData);

// Get flight bookings
router.get("/flight-bookings", getFlightBookings);

// Get flight bookings count for a specific month
router.get("/flight-bookings/count", async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1); // Month is 0-indexed in JS
    const endDate = new Date(year, month, 1);

    const count = await FlightBooking.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching flight bookings count:", error);
    res.status(500).json({ message: "Error fetching flight bookings count" });
  }
});

// Get recent flight bookings (last 5)
router.get("/flight-bookings/recent", async (req, res) => {
  try {
    const bookings = await FlightBooking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName tripType departureCity destinationCity multiCityFlights createdAt');

    res.json({ bookings });
  } catch (error) {
    console.error("Error fetching recent flight bookings:", error);
    res.status(500).json({ message: "Error fetching recent flight bookings" });
  }
});

// Get visa applications count for a specific month
router.get("/visa-applications/count", async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const count = await VisaApplication.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching visa applications count:", error);
    res.status(500).json({ message: "Error fetching visa applications count" });
  }
});

// Get recent visa applications (last 5)
router.get("/visa-applications/recent", async (req, res) => {
  try {
    const applications = await VisaApplication.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName destinationCountry visaType status createdAt');

    res.json({ applications });
  } catch (error) {
    console.error("Error fetching recent visa applications:", error);
    res.status(500).json({ message: "Error fetching recent visa applications" });
  }
});

// Get all visa applications
router.get("/visa-applications", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    let query = {};

    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }

    // Search by fullName or email if provided
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await VisaApplication.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('fullName email phoneNumber nationality destinationCountry visaType travelDate status payment createdAt documents notes');

    const total = await VisaApplication.countDocuments(query);

    res.json({
      applications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Error fetching visa applications:", error);
    res.status(500).json({ message: "Error fetching visa applications" });
  }
});

// Get single visa application by ID
router.get("/visa-applications/:id", async (req, res) => {
  try {
    const application = await VisaApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    res.json({ application });
  } catch (error) {
    console.error("Error fetching visa application:", error);
    res.status(500).json({ message: "Error fetching visa application" });
  }
});

// Update visa application status
router.put("/visa-applications/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await VisaApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    res.json({ application });
  } catch (error) {
    console.error("Error updating visa application status:", error);
    res.status(500).json({ message: "Error updating visa application status" });
  }
});

export default router;
