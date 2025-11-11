import VisaApplication from "../models/visaApplication.js";
import FlightBooking from "../models/flightbooking.js";
import HotelBooking from "../models/HotelBooking.js";

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
    const tourPackagesCount = 0;

    res.json({
      visaApplications: visaApplicationsCount,
      flightBookings: flightBookingsCount,
      messages: messagesCount,
      newUsers: newUsersCount,
      hotelBookings: hotelBookingsCount,
      tourPackages: tourPackagesCount,
    });
  } catch (error) {
    console.error("Error fetching overview data:", error);
    res.status(500).json({ message: "Error fetching overview data" });
  }
};
