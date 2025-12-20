import express from "express";
import mongoose from "mongoose";
import { getOverviewData, getFlashSaleBookings, createFlashSale, updateFlashSale, deleteFlashSale, getFlashSales } from "../controllers/adminController.js";
import { getFlightBookings, getFlightBookingById } from "../controllers/flightbookingController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import VisaApplication from "../models/visaApplication.js";
import FlightBooking from "../models/flightbooking.js";
import HotelBooking from "../models/HotelBooking.js";
import VisaRequirement from "../models/visaRequirements.js";
import Package from "../models/Package.js";
import PackageBooking from "../models/PackageBooking.js";
import upload from "../config/multer.js";
import FlashSale from "../models/FlashSale.js";
import FlashSaleBooking from "../models/FlashSaleBooking.js";

const router = express.Router();

// Apply admin authentication to all admin routes
router.use(authenticateAdmin);

router.get("/overview", getOverviewData);

// Get flight bookings
router.get("/flight-bookings", async (req, res) => {
  try {
    const { page = 1, limit = 10, tripType, search, status, year, month, week } = req.query;

    let query = {};
    let conditions = [];

    // Filter by trip type if provided
    if (tripType && tripType !== 'all') {
      conditions.push({ tripType });
    }

    // Filter by status if provided
    if (status && status !== 'all') {
      conditions.push({ status });
    }

    // Search by fullName or email if provided
    if (search) {
      let searchTerm = search.trim();
      // Escape regex special characters
      searchTerm = searchTerm.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
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

    // Date filtering by year/month/week (similar to visa route)
    if (year || month || week) {
      let startDate, endDate;

      if (year && month && week) {
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        const parsedWeek = parseInt(week, 10);

        const monthStart = new Date(parsedYear, parsedMonth, 1);
        const firstDayOfMonth = monthStart.getDay();
        const weekStartOffset = (parsedWeek - 1) * 7 - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
        startDate = new Date(parsedYear, parsedMonth, 1 + weekStartOffset);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
      } else if (year && month) {
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        startDate = new Date(parsedYear, parsedMonth, 1);
        endDate = new Date(parsedYear, parsedMonth + 1, 1);
      } else if (year) {
        const parsedYear = parseInt(year, 10);
        startDate = new Date(parsedYear, 0, 1);
        endDate = new Date(parsedYear + 1, 0, 1);
      }

      if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lt: endDate };
      }
    }

    const bookings = await FlightBooking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('fullName email phoneNumber gender dob tripType departureCity destinationCity departureDate returnDate multiCityFlights preferredAirline travelClass adults children infants notes createdAt status payment passportDatapage');

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

// Get flight bookings for PDF report by month and year
router.get("/flight-bookings/report", async (req, res) => {
  try {
    const { month, year } = req.query;

    // Validate and parse month and year
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    if (!month || !year || isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12 || parsedYear < 1900 || parsedYear > 2100) {
      return res.status(400).json({ message: "Invalid month or year. Month must be 1-12, year must be a valid number." });
    }

    const startDate = new Date(parsedYear, parsedMonth - 1, 1); // Month is 0-indexed in JS
    const endDate = new Date(parsedYear, parsedMonth, 1);

    const bookings = await FlightBooking.find({
      createdAt: { $gte: startDate, $lt: endDate }
    })
      .sort({ createdAt: -1 })
      .select('fullName email phoneNumber tripType departureCity destinationCity departureDate returnDate multiCityFlights travelClass adults children infants notes status payment createdAt');

    res.json({ bookings, month: parsedMonth, year: parsedYear });
  } catch (error) {
    console.error("Error fetching flight bookings for report:", error);
    res.status(500).json({ message: "Error fetching flight bookings for report" });
  }
});

// Get single flight booking by ID
router.get("/flight-bookings/:id", getFlightBookingById);

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

// Get visa applications for PDF report by month and year
router.get("/visa-applications/report", async (req, res) => {
  try {
    const { month, year } = req.query;

    // Validate and parse month and year
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    if (!month || !year || isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12 || parsedYear < 1900 || parsedYear > 2100) {
      return res.status(400).json({ message: "Invalid month or year. Month must be 1-12, year must be a valid number." });
    }

    const startDate = new Date(parsedYear, parsedMonth - 1, 1); // Month is 0-indexed in JS
    const endDate = new Date(parsedYear, parsedMonth, 1);

    const applications = await VisaApplication.find({
      createdAt: { $gte: startDate, $lt: endDate }
    })
      .sort({ createdAt: -1 })
      .select('fullName email phoneNumber destinationCountry visaType status payment createdAt documents notes addedByAdmin');

    res.json({ applications, month: parsedMonth, year: parsedYear });
  } catch (error) {
    console.error("Error fetching visa applications for report:", error);
    res.status(500).json({ message: "Error fetching visa applications for report" });
  }
});

// Get all visa applications
router.get("/visa-applications", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search, year, month, week } = req.query;

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

    // Date filtering
    if (year || month || week) {
      const now = new Date();
      let startDate, endDate;

      if (year && month && week) {
        // Filter by specific week in month/year
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1; // JS months are 0-indexed
        const parsedWeek = parseInt(week, 10);

        // Calculate start of month
        const monthStart = new Date(parsedYear, parsedMonth, 1);
        // Calculate start of week (weeks start on Monday)
        const firstDayOfMonth = monthStart.getDay();
        const weekStartOffset = (parsedWeek - 1) * 7 - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
        startDate = new Date(parsedYear, parsedMonth, 1 + weekStartOffset);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
      } else if (year && month) {
        // Filter by month and year
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        startDate = new Date(parsedYear, parsedMonth, 1);
        endDate = new Date(parsedYear, parsedMonth + 1, 1);
      } else if (year) {
        // Filter by year
        const parsedYear = parseInt(year, 10);
        startDate = new Date(parsedYear, 0, 1);
        endDate = new Date(parsedYear + 1, 0, 1);
      }

      if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lt: endDate };
      }
    }

    const applications = await VisaApplication.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('fullName email phoneNumber nationality destinationCountry visaType processingTime status payment createdAt documents notes isNew');

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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

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

// Update visa application payment status
router.put('/visa-applications/:id/payment', async (req, res) => {
  try {
    const { status } = req.body; // expected 'paid' or 'pending' or 'failed'

    const application = await VisaApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Visa application not found' });

    application.payment = application.payment || {};
    application.payment.status = status;
    await application.save();

    if (global.io) {
      global.io.emit('visaApplicationPaymentUpdate', { id: application._id, payment: application.payment });
    }

    res.json({ application });
  } catch (error) {
    console.error('Error updating visa application payment status:', error);
    res.status(500).json({ message: 'Error updating payment status' });
  }
});

// Create new visa application from admin
router.post("/visa-applications", async (req, res) => {
  try {
    const { fullName, destinationCountry, status } = req.body;

    // Get admin email from authenticated user
    const adminEmail = req.admin?.email || 'admin@macviewtravels.com';

    const newApplication = new VisaApplication({
      fullName,
      email: adminEmail,
      phoneNumber: "+2348169056956",
      destinationCountry,
      visaType: "Tourist",
      status,
      payment: {
        status: "paid"
      },
      documents: [{
        label: "Document",
        textValue: "added by admin"
      }],
      addedByAdmin: true,
      createdAt: new Date()
    });

    await newApplication.save();

    // Emit real-time update to all connected admin clients
    if (global.io) {
      global.io.emit("newVisaApplication", {
        _id: newApplication._id,
        fullName: newApplication.fullName,
        email: newApplication.email,
        destinationCountry: newApplication.destinationCountry,
        visaType: newApplication.visaType,
        status: newApplication.status,
        createdAt: newApplication.createdAt,
        isNew: true
      });
    }

    res.status(201).json({ application: newApplication });
  } catch (error) {
    console.error("Error creating visa application:", error);
    res.status(500).json({ message: "Error creating visa application" });
  }
});

// Create new flight booking from admin
router.post("/flight-bookings", async (req, res) => {
  try {
    const { fullName, tripType, departureCity, destinationCity, departureDate, returnDate, multiCityFlights, status } = req.body;

    // Use admin email as the submitter
    const adminEmail = req.admin?.email || 'admin@macviewtravels.com';

    const newBooking = new FlightBooking({
      fullName,
      email: adminEmail,
      // Provide minimal required fields with sensible defaults for admin-created entries
        // Use explicit 'none' defaults per admin-requested behavior (WhatsApp/phone, gender, dob)
        phoneNumber: req.body.phoneNumber || "none",
        // gender and dob are required by schema; provide 'none' defaults to pass validation
        gender: req.body.gender || "none",
        dob: req.body.dob || "none",
      tripType,
      departureCity: tripType === 'multi-city' ? undefined : departureCity,
      destinationCity: tripType === 'multi-city' ? undefined : destinationCity,
      departureDate: tripType === 'multi-city' ? undefined : departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : '',
      multiCityFlights: tripType === 'multi-city' ? (multiCityFlights || []) : [],
  travelClass: req.body.travelClass || 'none',
      adults: Number(req.body.adults || 1),
      children: Number(req.body.children || 0),
      infants: Number(req.body.infants || 0),
      status: status || 'received',
      payment: { status: 'paid' },
      addedByAdmin: true,
      createdAt: new Date()
    });

  await newBooking.save();

    // Emit real-time update to admin clients
    if (global.io) {
      global.io.emit('newFlightBooking', {
        _id: newBooking._id,
        fullName: newBooking.fullName,
        email: newBooking.email,
        tripType: newBooking.tripType,
        departureCity: newBooking.departureCity,
        destinationCity: newBooking.destinationCity,
        departureDate: newBooking.departureDate,
        returnDate: newBooking.returnDate,
        multiCityFlights: newBooking.multiCityFlights,
        status: newBooking.status,
        payment: newBooking.payment,
        createdAt: newBooking.createdAt,
        isNew: true
      });

      const FlightBookingModel = (await import("../models/flightbooking.js")).default;
      const flightCount = await FlightBookingModel.countDocuments();
      global.io.emit('statsUpdate', { flightRequests: flightCount });
    }

    res.status(201).json({ booking: newBooking });
  } catch (error) {
    console.error("Error creating flight booking from admin:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error creating flight booking" });
  }
});

// Get hotel bookings
router.get("/hotel-bookings", async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, year, month, week } = req.query;

    let query = {};
    let conditions = [];

    // Filter by status if provided
    if (status && status !== 'all') {
      conditions.push({ status });
    }

    // Search by fullName or email if provided
    if (search) {
      let searchTerm = search.trim();
      // Escape regex special characters
      searchTerm = searchTerm.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
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

    // Date filtering by year/month/week (similar to visa/flight)
    if (year || month || week) {
      let startDate, endDate;

      if (year && month && week) {
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        const parsedWeek = parseInt(week, 10);

        const monthStart = new Date(parsedYear, parsedMonth, 1);
        const firstDayOfMonth = monthStart.getDay();
        const weekStartOffset = (parsedWeek - 1) * 7 - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
        startDate = new Date(parsedYear, parsedMonth, 1 + weekStartOffset);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
      } else if (year && month) {
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        startDate = new Date(parsedYear, parsedMonth, 1);
        endDate = new Date(parsedYear, parsedMonth + 1, 1);
      } else if (year) {
        const parsedYear = parseInt(year, 10);
        startDate = new Date(parsedYear, 0, 1);
        endDate = new Date(parsedYear + 1, 0, 1);
      }

      if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lt: endDate };
      }
    }

    const bookings = await HotelBooking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('fullName email phoneNumber gender dob passportPhotograph destination checkInDate checkOutDate rooms guests roomType starRating amenities budget purpose notes isUnread status createdAt payment');

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

// Create new hotel booking from admin
router.post("/hotel-bookings", async (req, res) => {
  try {
    const {
      fullName,
      destination,
      checkInDate,
      checkOutDate,
      rooms,
      guests,
      roomType,
      starRating,
      amenities,
      budget,
      purpose,
      notes,
      status,
    } = req.body;

    const adminEmail = req.admin?.email || 'admin@macviewtravels.com';

    const newBooking = new HotelBooking({
      fullName,
      email: adminEmail,
      phoneNumber: req.body.phoneNumber || 'none',
      gender: req.body.gender || 'none',
      dob: req.body.dob || 'none',
      destination,
      checkInDate: checkInDate ? new Date(checkInDate) : undefined,
      checkOutDate: checkOutDate ? new Date(checkOutDate) : undefined,
      rooms: Number(rooms || 1),
      guests: Number(guests || 1),
      roomType: roomType || 'single',
      starRating: starRating || 'any',
      amenities: amenities || [],
      budget,
      purpose,
      notes,
      status: status || 'received',
      payment: { status: 'paid' },
      createdAt: new Date(),
    });

    await newBooking.save();

    if (global.io) {
      global.io.emit('newHotelBooking', {
        _id: newBooking._id,
        fullName: newBooking.fullName,
        email: newBooking.email,
        destination: newBooking.destination,
        checkInDate: newBooking.checkInDate,
        checkOutDate: newBooking.checkOutDate,
        status: newBooking.status,
        payment: newBooking.payment,
        createdAt: newBooking.createdAt,
        isNew: true,
      });

      const HotelBookingModel = (await import("../models/HotelBooking.js")).default;
      const hotelCount = await HotelBookingModel.countDocuments();
      global.io.emit('statsUpdate', { hotelBookings: hotelCount });
    }

    res.status(201).json({ booking: newBooking });
  } catch (error) {
    console.error('Error creating hotel booking from admin:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error creating hotel booking' });
  }
});

// Get hotel bookings for PDF report by month and year
router.get("/hotel-bookings/report", async (req, res) => {
  try {
    const { month, year } = req.query;

    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    if (!month || !year || isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12 || parsedYear < 1900 || parsedYear > 2100) {
      return res.status(400).json({ message: "Invalid month or year. Month must be 1-12, year must be a valid number." });
    }

    const startDate = new Date(parsedYear, parsedMonth - 1, 1);
    const endDate = new Date(parsedYear, parsedMonth, 1);

    const bookings = await HotelBooking.find({ createdAt: { $gte: startDate, $lt: endDate } })
      .sort({ createdAt: -1 })
      .select('fullName email destination status starRating createdAt');

    res.json({ bookings, month: parsedMonth, year: parsedYear });
  } catch (error) {
    console.error('Error fetching hotel bookings for report:', error);
    res.status(500).json({ message: 'Error fetching hotel bookings for report' });
  }
});

// Update hotel booking payment status
router.put('/hotel-bookings/:id/payment', async (req, res) => {
  try {
    const { status } = req.body; // expected 'paid' or 'pending' or 'failed'

    const booking = await HotelBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Hotel booking not found' });

    booking.payment = booking.payment || {};
    booking.payment.status = status;
    await booking.save();

    if (global.io) {
      global.io.emit('hotelBookingPaymentUpdate', { id: booking._id, payment: booking.payment });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Error updating hotel booking payment status:', error);
    res.status(500).json({ message: 'Error updating payment status' });
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

// Get single hotel booking by ID
router.get("/hotel-bookings/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid hotel booking ID" });
    }

    const booking = await HotelBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    res.json({ booking });
  } catch (error) {
    console.error("Error fetching hotel booking:", error);
    res.status(500).json({ message: "Error fetching hotel booking" });
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

// Update flight booking payment status
router.put('/flight-bookings/:id/payment', async (req, res) => {
  try {
    const { status } = req.body; // expected 'paid' or 'pending' or 'failed'

    const booking = await FlightBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Flight booking not found' });

    booking.payment = booking.payment || {};
    booking.payment.status = status;
    await booking.save();

    if (global.io) {
      global.io.emit('flightBookingPaymentUpdate', { id: booking._id, payment: booking.payment });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Error updating flight booking payment status:', error);
    res.status(500).json({ message: 'Error updating payment status' });
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

// Get all visa requirements
router.get("/visa-requirements", async (req, res) => {
  try {
    const requirements = await VisaRequirement.find().sort({ country: 1 });
    res.json({ requirements });
  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    res.status(500).json({ message: "Error fetching visa requirements" });
  }
});

// Get single visa requirement by ID
router.get("/visa-requirements/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid visa requirement ID" });
    }

    const requirement = await VisaRequirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: "Visa requirement not found" });
    }

    res.json({ requirement });
  } catch (error) {
    console.error("Error fetching visa requirement:", error);
    res.status(500).json({ message: "Error fetching visa requirement" });
  }
});

// Create new visa requirement
router.post("/visa-requirements", async (req, res) => {
  try {
    const { country, visaTypes } = req.body;

    const newRequirement = new VisaRequirement({
      country,
      visaTypes,
      updatedAt: new Date()
    });

    await newRequirement.save();
    // Emit real-time update so frontend clients can refresh their lists
    if (global.io) {
      global.io.emit("visaRequirementsUpdated", { action: "created", requirement: newRequirement });
    }

    res.status(201).json({ requirement: newRequirement });
  } catch (error) {
    console.error("Error creating visa requirement:", error);
    res.status(500).json({ message: "Error creating visa requirement" });
  }
});

// Update visa requirement
router.put("/visa-requirements/:id", async (req, res) => {
  try {
    const { country, visaTypes } = req.body;

    const requirement = await VisaRequirement.findByIdAndUpdate(
      req.params.id,
      { country, visaTypes, updatedAt: new Date() },
      { new: true }
    );

    if (!requirement) {
      return res.status(404).json({ message: "Visa requirement not found" });
    }

    // Emit real-time update so frontend clients can refresh their lists
    if (global.io) {
      global.io.emit("visaRequirementsUpdated", { action: "updated", requirement });
    }

    res.json({ requirement });
  } catch (error) {
    console.error("Error updating visa requirement:", error);
    res.status(500).json({ message: "Error updating visa requirement" });
  }
});

// Delete visa requirement
router.delete("/visa-requirements/:id", async (req, res) => {
  try {
    const requirement = await VisaRequirement.findByIdAndDelete(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: "Visa requirement not found" });
    }

    // Emit real-time update so frontend clients can refresh their lists
    if (global.io) {
      global.io.emit("visaRequirementsUpdated", { action: "deleted", id: requirement._id });
    }

    res.json({ message: "Visa requirement deleted successfully" });
  } catch (error) {
    console.error("Error deleting visa requirement:", error);
    res.status(500).json({ message: "Error deleting visa requirement" });
  }
});

// Get all packages
router.get("/packages", async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ packages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Error fetching packages" });
  }
});

// Get single package by ID
router.get("/packages/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }

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

// Create new package
router.post("/packages", upload.single("backgroundImage"), async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      nights,
      persons,
      price,
      currency,
      inclusions,
      requirements,
      promoCode,
      discountPercentage,
    } = req.body;

    let backgroundImageUrl = "";
    if (req.file) {
      backgroundImageUrl = req.file.path; // Cloudinary URL
    }

    const newPackage = new Package({
      title,
      description,
      city,
      nights: Number(nights),
      persons: Number(persons),
      price: Number(price),
      currency,
      backgroundImage: backgroundImageUrl,
      inclusions: inclusions ? JSON.parse(inclusions) : [],
      requirements: requirements ? JSON.parse(requirements) : [],
      promoCode: promoCode || "",
      discountPercentage: Number(discountPercentage) || 0,
    });

    await newPackage.save();

    res.status(201).json({ package: newPackage });
  } catch (error) {
    console.error("Error creating package:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error creating package" });
  }
});

// Update package
router.put("/packages/:id", upload.single("backgroundImage"), async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      nights,
      persons,
      price,
      currency,
      inclusions,
      requirements,
      promoCode,
      discountPercentage,
    } = req.body;

    const updateData = {
      title,
      description,
      city,
      nights: Number(nights),
      persons: Number(persons),
      price: Number(price),
      currency,
      inclusions: inclusions ? JSON.parse(inclusions) : [],
      requirements: requirements ? JSON.parse(requirements) : [],
      promoCode: promoCode || "",
      discountPercentage: Number(discountPercentage) || 0,
    };

    if (req.file) {
      updateData.backgroundImage = req.file.path; // Cloudinary URL
    }

    const packageData = await Package.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({ package: packageData });
  } catch (error) {
    console.error("Error updating package:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error updating package" });
  }
});

// Delete package
router.delete("/packages/:id", async (req, res) => {
  try {
    const packageData = await Package.findByIdAndDelete(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Error deleting package" });
  }
});

// Get package bookings
router.get("/package-bookings", async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, year, month, week } = req.query;

    let query = {};
    let conditions = [];

    // Filter by status if provided
    if (status && status !== 'all') {
      conditions.push({ status });
    }

    // Search by fullName, email, whatsappNumber, or packageTitle if provided
    if (search) {
      let searchTerm = search.trim();
      // Escape regex special characters
      searchTerm = searchTerm.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
      conditions.push({
        $or: [
          { fullName: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
          { whatsappNumber: { $regex: searchTerm, $options: 'i' } },
          { packageTitle: { $regex: searchTerm, $options: 'i' } }
        ]
      });
    }

    if (conditions.length > 0) {
      query.$and = conditions;
    }

    // Date filtering by year/month/week
    if (year || month || week) {
      let startDate, endDate;

      if (year && month && week) {
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        const parsedWeek = parseInt(week, 10);

        const monthStart = new Date(parsedYear, parsedMonth, 1);
        const firstDayOfMonth = monthStart.getDay();
        const weekStartOffset = (parsedWeek - 1) * 7 - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
        startDate = new Date(parsedYear, parsedMonth, 1 + weekStartOffset);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
      } else if (year && month) {
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        startDate = new Date(parsedYear, parsedMonth, 1);
        endDate = new Date(parsedYear, parsedMonth + 1, 1);
      } else if (year) {
        const parsedYear = parseInt(year, 10);
        startDate = new Date(parsedYear, 0, 1);
        endDate = new Date(parsedYear + 1, 0, 1);
      }

      if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lt: endDate };
      }
    }

    const bookings = await PackageBooking.find(query)
      .populate('packageId', 'city')
      .populate('userId', 'email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('_id fullName email whatsappNumber travelDate packageTitle packagePrice packageCurrency documents status payment.status payment.amount createdAt userId');

    const total = await PackageBooking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Error fetching package bookings:", error);
    res.status(500).json({ message: "Error fetching package bookings" });
  }
});

// Get recent package bookings (last 5)
router.get("/package-bookings/recent", async (req, res) => {
  try {
    const bookings = await PackageBooking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName packageTitle travelDate status createdAt');

    res.json({ bookings });
  } catch (error) {
    console.error("Error fetching recent package bookings:", error);
    res.status(500).json({ message: "Error fetching recent package bookings" });
  }
});

// Get package bookings count for a specific month
router.get("/package-bookings/count", async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1); // Month is 0-indexed in JS
    const endDate = new Date(year, month, 1);

    const count = await PackageBooking.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching package bookings count:", error);
    res.status(500).json({ message: "Error fetching package bookings count" });
  }
});

// Get package bookings for PDF report by month and year
router.get("/package-bookings/report", async (req, res) => {
  try {
    console.log('Package bookings report request:', req.query);
    const { month, year } = req.query;

    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    console.log('Parsed month/year:', parsedMonth, parsedYear);

    if (!month || !year || isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12 || parsedYear < 1900 || parsedYear > 2100) {
      return res.status(400).json({ message: "Invalid month or year. Month must be 1-12, year must be a valid number." });
    }

    const startDate = new Date(parsedYear, parsedMonth - 1, 1);
    const endDate = new Date(parsedYear, parsedMonth, 1);

    console.log('Date range:', startDate, endDate);

    const bookings = await PackageBooking.find({ createdAt: { $gte: startDate, $lt: endDate } })
      .sort({ createdAt: -1 })
      .select('fullName whatsappNumber packageTitle packagePrice packageCurrency travelDate status createdAt');

    console.log('Found bookings:', bookings.length);

    res.json({ bookings, month: parsedMonth, year: parsedYear });
  } catch (error) {
    console.error('Error fetching package bookings for report:', error);
    res.status(500).json({ message: 'Error fetching package bookings for report' });
  }
});

// Get single package booking by ID
router.get("/package-bookings/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid package booking ID" });
    }

    const booking = await PackageBooking.findById(req.params.id).populate('packageId');

    if (!booking) {
      return res.status(404).json({ message: "Package booking not found" });
    }

    res.json({ booking });
  } catch (error) {
    console.error("Error fetching package booking:", error);
    res.status(500).json({ message: "Error fetching package booking" });
  }
});

// Update package booking status
router.put("/package-bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await PackageBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Package booking not found" });
    }

    // Emit real-time update to all connected admin clients
    if (global.io) {
      global.io.emit("packageBookingStatusUpdate", {
        id: booking._id,
        status: booking.status,
        updatedAt: booking.updatedAt,
      });
    }

    res.json({ booking });
  } catch (error) {
    console.error("Error updating package booking status:", error);
    res.status(500).json({ message: "Error updating package booking status" });
  }
});

// Update package booking payment status
router.put('/package-bookings/:id/payment', async (req, res) => {
  try {
    const { status } = req.body; // expected 'paid' or 'pending' or 'failed'

    const booking = await PackageBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Package booking not found' });

    booking.payment = booking.payment || {};
    booking.payment.status = status;
    await booking.save();

    if (global.io) {
      global.io.emit('packageBookingPaymentUpdate', { id: booking._id, payment: booking.payment });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Error updating package booking payment status:', error);
    res.status(500).json({ message: 'Error updating payment status' });
  }
});

// Get flash sale bookings
router.get("/flash-sale-bookings", async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, year, month, week } = req.query;

    let query = {};
    let conditions = [];

    // Filter by status if provided
    if (status && status !== 'all') {
      conditions.push({ status });
    }

    // Search by name or whatsappNumber if provided
    if (search) {
      let searchTerm = search.trim();
      searchTerm = searchTerm.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
      conditions.push({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { whatsappNumber: { $regex: searchTerm, $options: 'i' } }
        ]
      });
    }

    if (conditions.length > 0) {
      query.$and = conditions;
    }

    // Date filtering by year/month/week
    if (year || month || week) {
      let startDate, endDate;

      if (year && month && week) {
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        const parsedWeek = parseInt(week, 10);

        const monthStart = new Date(parsedYear, parsedMonth, 1);
        const firstDayOfMonth = monthStart.getDay();
        const weekStartOffset = (parsedWeek - 1) * 7 - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
        startDate = new Date(parsedYear, parsedMonth, 1 + weekStartOffset);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
      } else if (year && month) {
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10) - 1;
        startDate = new Date(parsedYear, parsedMonth, 1);
        endDate = new Date(parsedYear, parsedMonth + 1, 1);
      } else if (year) {
        const parsedYear = parseInt(year, 10);
        startDate = new Date(parsedYear, 0, 1);
        endDate = new Date(parsedYear + 1, 0, 1);
      }

      if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lt: endDate };
      }
    }

    const bookings = await FlashSaleBooking.find(query)
      .populate('flashSaleId', 'destinationCity airline price')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('_id name whatsappNumber dateOfBirth gender flashSaleId status payment createdAt');

    const total = await FlashSaleBooking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Error fetching flash sale bookings:", error);
    res.status(500).json({ message: "Error fetching flash sale bookings" });
  }
});

// Get recent flash sale bookings (last 5)
router.get("/flash-sale-bookings/recent", async (req, res) => {
  try {
    const bookings = await FlashSaleBooking.find()
      .populate('flashSaleId', 'destinationCity')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name flashSaleId status createdAt');

    res.json({ bookings });
  } catch (error) {
    console.error("Error fetching recent flash sale bookings:", error);
    res.status(500).json({ message: "Error fetching recent flash sale bookings" });
  }
});

// Get flash sale bookings for PDF report by month and year
router.get("/flash-sale-bookings/report", async (req, res) => {
  try {
    console.log('Flash sale bookings report request:', req.query);
    const { month, year } = req.query;

    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    console.log('Parsed month/year:', parsedMonth, parsedYear);

    if (!month || !year || isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12 || parsedYear < 1900 || parsedYear > 2100) {
      return res.status(400).json({ message: "Invalid month or year. Month must be 1-12, year must be a valid number." });
    }

    const startDate = new Date(parsedYear, parsedMonth - 1, 1);
    const endDate = new Date(parsedYear, parsedMonth, 1);

    console.log('Date range:', startDate, endDate);

    const bookings = await FlashSaleBooking.find({ createdAt: { $gte: startDate, $lt: endDate } })
      .populate('flashSaleId', 'destinationCity airline price')
      .sort({ createdAt: -1 })
      .select('name whatsappNumber flashSaleId status createdAt');

    console.log('Found bookings:', bookings.length);

    res.json({ bookings, month: parsedMonth, year: parsedYear });
  } catch (error) {
    console.error('Error fetching flash sale bookings for report:', error);
    res.status(500).json({ message: 'Error fetching flash sale bookings for report' });
  }
});

// Get flash sale bookings count for a specific month
router.get("/flash-sale-bookings/count", async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const count = await FlashSaleBooking.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching flash sale bookings count:", error);
    res.status(500).json({ message: "Error fetching flash sale bookings count" });
  }
});

// Get single flash sale booking by ID
router.get("/flash-sale-bookings/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await FlashSaleBooking.findById(req.params.id).populate('flashSaleId');

    if (!booking) {
      return res.status(404).json({ message: "Flash sale booking not found" });
    }

    res.json({ booking });
  } catch (error) {
    console.error("Error fetching flash sale booking:", error);
    res.status(500).json({ message: "Error fetching flash sale booking" });
  }
});

// Update flash sale booking status
router.put("/flash-sale-bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await FlashSaleBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Flash sale booking not found" });
    }

    // Emit real-time update to all connected admin clients
    if (global.io) {
      global.io.emit("flashSaleBookingStatusUpdate", {
        id: booking._id,
        status: booking.status,
        updatedAt: booking.updatedAt,
      });
    }

    res.json({ booking });
  } catch (error) {
    console.error("Error updating flash sale booking status:", error);
    res.status(500).json({ message: "Error updating flash sale booking status" });
  }
});

// Update flash sale booking payment status
router.put('/flash-sale-bookings/:id/payment', async (req, res) => {
  try {
    const { status } = req.body; // expected 'paid' or 'pending' or 'failed'

    const booking = await FlashSaleBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Flash sale booking not found' });

    booking.payment = booking.payment || {};
    booking.payment.status = status;
    await booking.save();

    if (global.io) {
      global.io.emit('flashSaleBookingPaymentUpdate', { id: booking._id, payment: booking.payment });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Error updating flash sale booking payment status:', error);
    res.status(500).json({ message: 'Error updating payment status' });
  }
});

// Get all flash sales
router.get("/flash-sales", async (req, res) => {
  try {
    const flashSales = await FlashSale.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ flashSales });
  } catch (error) {
    console.error("Error fetching flash sales:", error);
    res.status(500).json({ message: "Error fetching flash sales" });
  }
});

// Get single flash sale by ID
router.get("/flash-sales/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid flash sale ID" });
    }

    const flashSale = await FlashSale.findById(req.params.id);

    if (!flashSale) {
      return res.status(404).json({ message: "Flash sale not found" });
    }

    res.json({ flashSale });
  } catch (error) {
    console.error("Error fetching flash sale:", error);
    res.status(500).json({ message: "Error fetching flash sale" });
  }
});

// Create new flash sale
router.post("/flash-sales", upload.single("backgroundImage"), async (req, res) => {
  try {
    const { price, destinationCity, departureCity, dateValidFrom, dateValid, airline } = req.body;

    let backgroundImageUrl = "";
    if (req.file) {
      backgroundImageUrl = req.file.path; // Cloudinary URL
    } else {
      return res.status(400).json({ message: "Background image is required" });
    }

    const newFlashSale = new FlashSale({
      backgroundImage: backgroundImageUrl,
      price: Number(price),
      destinationCity,
      departureCity,
      dateValidFrom: new Date(dateValidFrom),
      dateValid: new Date(dateValid),
      airline,
    });

    await newFlashSale.save();

    res.status(201).json({ flashSale: newFlashSale });
  } catch (error) {
    console.error("Error creating flash sale:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error creating flash sale" });
  }
});

// Update flash sale
router.put("/flash-sales/:id", upload.single("backgroundImage"), async (req, res) => {
  try {
    const { price, destinationCity, departureCity, dateValidFrom, dateValid, airline } = req.body;

    const updateData = {
      price: Number(price),
      destinationCity,
      departureCity,
      dateValidFrom: new Date(dateValidFrom),
      dateValid: new Date(dateValid),
      airline,
    };

    if (req.file) {
      updateData.backgroundImage = req.file.path; // Cloudinary URL
    }

    const flashSale = await FlashSale.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!flashSale) {
      return res.status(404).json({ message: "Flash sale not found" });
    }

    res.json({ flashSale });
  } catch (error) {
    console.error("Error updating flash sale:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error updating flash sale" });
  }
});

// Delete flash sale
router.delete("/flash-sales/:id", async (req, res) => {
  try {
    const flashSale = await FlashSale.findByIdAndDelete(req.params.id);

    if (!flashSale) {
      return res.status(404).json({ message: "Flash sale not found" });
    }

    res.json({ message: "Flash sale deleted successfully" });
  } catch (error) {
    console.error("Error deleting flash sale:", error);
    res.status(500).json({ message: "Error deleting flash sale" });
  }
});

export default router;
