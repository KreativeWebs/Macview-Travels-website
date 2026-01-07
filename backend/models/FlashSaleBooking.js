import mongoose from "mongoose";

const flashSaleBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["male", "female", "other", "none"] },
  adults: { type: Number, default: 0 },
  children: { type: Number, default: 0 },
  infants: { type: Number, default: 0 },
  passportPhotograph: { type: String },
  flashSaleId: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashSale', required: true },
  flashSaleData: {
    destinationCity: String,
    airline: String,
    price: Number,
    departureCity: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true },
  payment: {
    status: { type: String, enum: ["pending","paid","failed"], default: "pending" },
    provider: String,
    transactionId: String,
    amount: Number,
  },
  status: { type: String, enum: ["received", "booked", "not booked", "paid"], default: "received" },
  isUnread: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("FlashSaleBooking", flashSaleBookingSchema);
