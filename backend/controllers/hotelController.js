import HotelBooking from "../models/HotelBooking.js";

export const createHotelBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Create new hotel booking
    const newBooking = new HotelBooking({
      ...bookingData,
      isUnread: true, // Mark as unread for admin notification
    });

    const savedBooking = await newBooking.save();

    // Emit real-time update to admin dashboard
    if (global.io) {
      global.io.emit("newHotelBooking", savedBooking);
    }

    res.status(201).json({
      message: "Hotel booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating hotel booking:", error);
    res.status(500).json({
      message: "Failed to create hotel booking",
      error: error.message,
    });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { userEmail: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Get total count for pagination
    const totalBookings = await HotelBooking.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalBookings / limitNum);

    // Get bookings with pagination and sorting (newest first)
    const bookings = await HotelBooking.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    res.json({
      bookings,
      currentPage: pageNum,
      totalPages,
      totalBookings,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    });
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    res.status(500).json({
      message: "Failed to fetch hotel bookings",
      error: error.message,
    });
  }
};

export const getHotelBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await HotelBooking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching hotel booking:", error);
    res.status(500).json({
      message: "Failed to fetch hotel booking",
      error: error.message,
    });
  }
};

export const updateHotelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBooking = await HotelBooking.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    // Emit update to admin dashboard
    if (global.io) {
      global.io.emit("hotelBookingUpdated", updatedBooking);
    }

    res.json({
      message: "Hotel booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating hotel booking:", error);
    res.status(500).json({
      message: "Failed to update hotel booking",
      error: error.message,
    });
  }
};

export const deleteHotelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await HotelBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    // Emit deletion to admin dashboard
    if (global.io) {
      global.io.emit("hotelBookingDeleted", id);
    }

    res.json({
      message: "Hotel booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hotel booking:", error);
    res.status(500).json({
      message: "Failed to delete hotel booking",
      error: error.message,
    });
  }
};

export const updateHotelBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await HotelBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Hotel booking not found" });
    }

    // Emit real-time update to admin dashboard
    if (global.io) {
      global.io.emit('hotelBookingStatusUpdate', {
        id: updatedBooking._id,
        status: updatedBooking.status
      });
    }

    res.json({
      message: "Hotel booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating hotel booking status:", error);
    res.status(500).json({
      message: "Failed to update hotel booking status",
      error: error.message,
    });
  }
};
