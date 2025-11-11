import express from "express";
import { getOverviewData } from "../controllers/adminController.js";
import { getFlightBookings } from "../controllers/flightbookingController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import VisaApplication from "../models/visaApplication.js";
import FlightBooking from "../models/flightbooking.js";
import HotelBooking from "../models/HotelBooking.js";

const router = express.Router();

// Apply admin authentication to all admin routes
router.use(authenticateAdmin);

router.get("/overview", getOverviewData);

// Get flight bookings
router.get("/flight-bookings", async (req, res) => {
  try {
    const { page = 1, limit = 10, tripType, search } = req.query;

    let query = {};
    let conditions = [];

    // Filter by trip type if provided
    if (tripType && tripType !== 'all') {
      conditions.push({ tripType });
    }

    // Search by fullName or email if provided
    if (search) {
      let searchTerm = search.trim();
      // Escape regex special characters
      searchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      conditions.push({
        $or: [
          { fullName: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } }
        ]
      });
    }

    if (conditions.length > 0) {
      query.$and = conditions;
    }

    const bookings = await FlightBooking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('fullName email phoneNumber gender dob tripType departureCity destinationCity departureDate returnDate multiCityFlights preferredAirline travelClass adults children infants notes createdAt status payment');

    const total = await FlightBooking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Error fetching flight bookings:", error);
    res.status(500).json({ message: "Error fetching flight bookings" });
  }
});

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
      .select('fullName tripType departureCity destinationCity multiCityFlights status createdAt');

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
      .select('fullName email phoneNumber nationality destinationCountry visaType processingTime status payment createdAt documents notes');

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

    // Emit real-time update to all connected admin clients
    if (global.io) {
      global.io.emit("visaApplicationStatusUpdate", {
        id: application._id,
        status: application.status,
        updatedAt: application.updatedAt,
      });
    }

    res.json({ application });
  } catch (error) {
    console.error("Error updating visa application status:", error);
    res.status(500).json({ message: "Error updating visa application status" });
  }
});

// Get hotel bookings
router.get("/hotel-bookings", async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = {};

    // Search by fullName or email if provided
    if (search) {
      let searchTerm = search.trim();
      // Escape regex special characters
      searchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { fullName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    const bookings = await HotelBooking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('fullName email phoneNumber gender dob destination checkInDate checkOutDate rooms guests roomType starRating amenities budget purpose notes isUnread status createdAt');

    const total = await HotelBooking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    res.status(500).json({ message: "Error fetching hotel bookings" });
  }
});

// Get hotel bookings count for a specific month
router.get("/hotel-bookings/count", async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1); // Month is 0-indexed in JS
    const endDate = new Date(year, month, 1);

    const count = await HotelBooking.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching hotel bookings count:", error);
    res.status(500).json({ message: "Error fetching hotel bookings count" });
  }
});

// Get recent hotel bookings (last 5)
router.get("/hotel-bookings/recent", async (req, res) => {
  try {
    const bookings = await HotelBooking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName destination checkInDate checkOutDate isUnread status createdAt');

    res.json({ bookings });
  } catch (error) {
    console.error("Error fetching recent hotel bookings:", error);
    res.status(500).json({ message: "Error fetching recent hotel bookings" });
  }
});

// Mark hotel booking as read
router.put("/hotel-bookings/:id/read", async (req, res) => {
  try {
    const booking = await HotelBooking.findByIdAndUpdate(
      req.params.id,
      { isUnread: false },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    // Emit real-time update to all connected admin clients
    if (global.io) {
      global.io.emit("hotelBookingRead", {
        id: booking._id,
        isUnread: false,
        updatedAt: booking.updatedAt,
      });
    }

    res.json({ booking });
  } catch (error) {
    console.error("Error marking hotel booking as read:", error);
    res.status(500).json({ message: "Error marking hotel booking as read" });
  }
});

// Update flight booking status
router.put("/flight-bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await FlightBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Flight booking not found" });
    }

    // Emit real-time update to all connected admin clients
    if (global.io) {
      global.io.emit("flightBookingStatusUpdate", {
        id: booking._id,
        status: booking.status,
        updatedAt: booking.updatedAt,
      });
    }

    res.json({ booking });
  } catch (error) {
    console.error("Error updating flight booking status:", error);
    res.status(500).json({ message: "Error updating flight booking status" });
  }
});

// Update hotel booking status
router.put("/hotel-bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await HotelBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    // Emit real-time update to all connected admin clients
    if (global.io) {
      global.io.emit("hotelBookingStatusUpdate", {
        id: booking._id,
        status: booking.status,
        updatedAt: booking.updatedAt,
      });
    }

    res.json({ booking });
  } catch (error) {
    console.error("Error updating hotel booking status:", error);
    res.status(500).json({ message: "Error updating hotel booking status" });
  }
});

export default router;
