import VisaApplication from "../models/visaApplication.js";
import FlightBooking from "../models/flightbooking.js";
import HotelBooking from "../models/HotelBooking.js";
import PackageBooking from "../models/PackageBooking.js";
import FlashSale from "../models/FlashSale.js";
import FlashSaleBooking from "../models/FlashSaleBooking.js";

export const getFlashSaleBookings = async (req, res) => {
  try {
    const bookings = await FlashSaleBooking.find().populate('flashSaleId').sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    console.error("Error fetching flash sale bookings:", error);
    res.status(500).json({ message: "Error fetching flash sale bookings" });
  }
};

export const createFlashSale = async (req, res) => {
  try {
    const { price, destinationCity, departureCity, dateValidFrom, dateValid, airline } = req.body;
    const backgroundImage = req.file ? req.file.path : null; // Assuming multer handles file upload

    if (!backgroundImage) {
      return res.status(400).json({ message: "Background image is required" });
    }

    const flashSale = new FlashSale({
      backgroundImage,
      price,
      destinationCity,
      departureCity,
      dateValidFrom,
      dateValid,
      airline,
    });

    await flashSale.save();
    res.status(201).json({ message: "Flash sale created successfully", flashSale });
  } catch (error) {
    console.error("Error creating flash sale:", error);
    res.status(500).json({ message: "Error creating flash sale" });
  }
};

export const updateFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      updates.backgroundImage = req.file.path;
    }

    const flashSale = await FlashSale.findByIdAndUpdate(id, updates, { new: true });
    if (!flashSale) {
      return res.status(404).json({ message: "Flash sale not found" });
    }

    res.json({ message: "Flash sale updated successfully", flashSale });
  } catch (error) {
    console.error("Error updating flash sale:", error);
    res.status(500).json({ message: "Error updating flash sale" });
  }
};

export const deleteFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const flashSale = await FlashSale.findByIdAndDelete(id);
    if (!flashSale) {
      return res.status(404).json({ message: "Flash sale not found" });
    }

    res.json({ message: "Flash sale deleted successfully" });
  } catch (error) {
    console.error("Error deleting flash sale:", error);
    res.status(500).json({ message: "Error deleting flash sale" });
  }
};

export const getAllFlashSales = async (req, res) => {
  try {
    const flashSales = await FlashSale.find().sort({ createdAt: -1 });
    res.json({ flashSales });
  } catch (error) {
    console.error("Error fetching flash sales:", error);
    res.status(500).json({ message: "Error fetching flash sales" });
  }
};

export const getFlashSales = async (req, res) => {
  try {
    const flashSales = await FlashSale.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ flashSales });
  } catch (error) {
    console.error("Error fetching flash sales:", error);
    res.status(500).json({ message: "Error fetching flash sales" });
  }
};

export const getFlashSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const flashSale = await FlashSale.findById(id);
    if (!flashSale || !flashSale.isActive) {
      return res.status(404).json({ message: "Flash sale not found" });
    }
    res.json({ flashSale });
  } catch (error) {
    console.error("Error fetching flash sale:", error);
    res.status(500).json({ message: "Error fetching flash sale" });
  }
};

export const createFlashSaleBooking = async (req, res) => {
  try {
    const { name, whatsappNumber, dateOfBirth, gender, flashSaleId, passportPhotograph, payment } = req.body;

    const flashSale = await FlashSale.findById(flashSaleId);
    if (!flashSale || !flashSale.isActive) {
      return res.status(404).json({ message: "Flash sale not found or inactive" });
    }

    const booking = new FlashSaleBooking({
      name,
      whatsappNumber,
      dateOfBirth,
      gender,
      flashSaleId,
      passportPhotograph,
      payment: payment || { status: 'pending' },
      status: 'received',
    });

    await booking.save();
    res.status(201).json({ message: "Flash sale booking created successfully", booking });
  } catch (error) {
    console.error("Error creating flash sale booking:", error);
    res.status(500).json({ message: "Error creating flash sale booking" });
  }
};



export const getOverviewData = async (req, res) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const visaApplicationsCount = await VisaApplication.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    const flightBookingsCount = await FlightBooking.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    // Placeholders for other data
    const messagesCount = 0;
    const newUsersCount = 0;
    const hotelBookingsCount = await HotelBooking.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });
    const packageBookingsCount = await PackageBooking.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });
    const flashSaleBookingsCount = await FlashSaleBooking.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });
    const tourPackagesCount = 0;

    res.json({
      visaApplications: visaApplicationsCount,
      flightBookings: flightBookingsCount,
      messages: messagesCount,
      newUsers: newUsersCount,
      hotelBookings: hotelBookingsCount,
      packageBookings: packageBookingsCount,
      flashSaleBookings: flashSaleBookingsCount,
      tourPackages: tourPackagesCount,
    });
  } catch (error) {
    console.error("Error fetching overview data:", error);
    res.status(500).json({ message: "Error fetching overview data" });
  }
};
