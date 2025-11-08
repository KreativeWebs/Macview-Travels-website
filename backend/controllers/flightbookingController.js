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
        preferredAirline: data.preferredAirline || "",
        travelClass: data.travelClass,
        adults: data.adults,
        children: data.children || 0,
        infants: data.infants || 0,
        notes: data.notes || "",
      });

      await newBooking.save();
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
      preferredAirline: data.preferredAirline || "",
      travelClass: data.travelClass,
      adults: data.adults,
      children: data.children || 0,
      infants: data.infants || 0,
      notes: data.notes || "",
    });

    await newBooking.save();
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
