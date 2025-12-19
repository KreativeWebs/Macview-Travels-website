import mongoose from "mongoose";

const flightBookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    passportDatapage: {
      fileUrl: { type: String },
      originalName: { type: String },
    },

    tripType: {
      type: String,
      required: true,
      enum: ["one-way", "round-trip", "multi-city"],
    },

    //Conditionally required (only if NOT multi-city)
    departureCity: {
      type: String,
      required: function () {
        return this.tripType !== "multi-city";
      },
    },
    destinationCity: {
      type: String,
      required: function () {
        return this.tripType !== "multi-city";
      },
    },
    departureDate: {
      type: String,
      required: function () {
        return this.tripType !== "multi-city";
      },
    },
    returnDate: { type: String },

    //Multi-city array (each object can have from, to, date)
    multiCityFlights: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],

    preferredAirline: { type: String },
    travelClass: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number },
    infants: { type: Number },
    notes: { type: String },
    status: { type: String, default: "received" }, // received, booked, not booked
    payment: {
      status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
      provider: String,
      transactionId: String,
      amount: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FlightBooking", flightBookingSchema);
