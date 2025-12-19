import FlightBooking from "../models/flightbooking.js";

// Create new booking
export const createFlightBooking = async (req, res) => {
  try {
    const data = req.body;

    //If it's a multi-city booking
    if (data.tripType === "multi-city") {
      const newBooking = new FlightBooking({
        tripType: data.tripType,
        multiCityFlights: data.multiCityFlights,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender || "",
        dob: data.dob || "",
        passportDatapage: data.passportDatapage,
        preferredAirline: data.preferredAirline || "",
        travelClass: data.travelClass,
        adults: data.adults,
        children: data.children || 0,
        infants: data.infants || 0,
        notes: data.notes || "",
      });

      await newBooking.save();

      // Emit real-time update to admin dashboard
      if (global.io) {
        global.io.emit('newFlightBooking', {
          _id: newBooking._id,
          fullName: newBooking.fullName,
          email: newBooking.email,
          phoneNumber: newBooking.phoneNumber,
          gender: newBooking.gender,
          dob: newBooking.dob,
          tripType: newBooking.tripType,
          departureCity: newBooking.departureCity,
          destinationCity: newBooking.destinationCity,
          departureDate: newBooking.departureDate,
          returnDate: newBooking.returnDate,
          multiCityFlights: newBooking.multiCityFlights,
          preferredAirline: newBooking.preferredAirline,
          travelClass: newBooking.travelClass,
          adults: newBooking.adults,
          children: newBooking.children,
          infants: newBooking.infants,
          notes: newBooking.notes,
          createdAt: newBooking.createdAt,
          isNew: true
        });

        // Emit updated stats
        const FlightBooking = (await import("../models/flightbooking.js")).default;
        const flightCount = await FlightBooking.countDocuments();
        global.io.emit('statsUpdate', {
          flightRequests: flightCount
        });
      }

      return res
        .status(201)
        .json({ message: "Flight booking submitted successfully!" });
    }

    //Otherwise, handle one-way or round-trip
    const newBooking = new FlightBooking({
      tripType: data.tripType,
      departureCity: data.departureCity,
      destinationCity: data.destinationCity,
      departureDate: data.departureDate,
      returnDate: data.returnDate || "",
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender || "",
      dob: data.dob || "",
      passportDatapage: data.passportDatapage,
      preferredAirline: data.preferredAirline || "",
      travelClass: data.travelClass,
      adults: data.adults,
      children: data.children || 0,
      infants: data.infants || 0,
      notes: data.notes || "",
    });

    await newBooking.save();

    // Emit real-time update to admin dashboard
    if (global.io) {
      global.io.emit('newFlightBooking', {
        _id: newBooking._id,
        fullName: newBooking.fullName,
        email: newBooking.email,
        phoneNumber: newBooking.phoneNumber,
        gender: newBooking.gender,
        dob: newBooking.dob,
        tripType: newBooking.tripType,
        departureCity: newBooking.departureCity,
        destinationCity: newBooking.destinationCity,
        departureDate: newBooking.departureDate,
        returnDate: newBooking.returnDate,
        multiCityFlights: newBooking.multiCityFlights,
        preferredAirline: newBooking.preferredAirline,
        travelClass: newBooking.travelClass,
        adults: newBooking.adults,
        children: newBooking.children,
        infants: newBooking.infants,
        notes: newBooking.notes,
        createdAt: newBooking.createdAt,
        isNew: true
      });

      // Emit updated stats
      const FlightBooking = (await import("../models/flightbooking.js")).default;
      const flightCount = await FlightBooking.countDocuments();
      global.io.emit('statsUpdate', {
        flightRequests: flightCount
      });
    }

    res.status(201).json({ message: "Flight booking submitted successfully!" });
  } catch (error) {
    console.error("Error saving flight booking:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

//Get all flight bookings (for admin)
export const getFlightBookings = async (req, res) => {
  try {
    const bookings = await FlightBooking.find().sort({ createdAt: -1 });
     return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching flight bookings:", error);
    res.status(500).json({ message: "Error fetching flight bookings" });
  }
};

//Get single flight booking by ID (for admin)
export const getFlightBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await FlightBooking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Flight booking not found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching flight booking:", error);
    res.status(500).json({ message: "Error fetching flight booking" });
  }
};
