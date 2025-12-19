import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "prefer_not_to_say", "none"],
    },
    dob: {
      type: String,
      required: true,
    },
    passportPhotograph: {
      type: Object,
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
      min: 1,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    roomType: {
      type: String,
      required: true,
      enum: ["single", "double", "suite", "luxury"],
    },
    starRating: {
      type: String,
      enum: ["any", "3", "4", "5"],
      default: "any",
    },
    amenities: [{
      type: String,
      enum: [
        "Free Wifi",
        "Breakfast Included",
        "Swimming Pool",
        "Airport Shuttle",
        "Gym",
        "Parking",
      ],
    }],
    budget: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    isUnread: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["received", "booked", "not booked"],
      default: "received",
    },
    payment: {
      status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
      provider: String,
      transactionId: String,
      amount: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
hotelBookingSchema.index({ fullName: "text", email: "text" });

const HotelBooking = mongoose.model("HotelBooking", hotelBookingSchema);

export default HotelBooking;
