import mongoose from "mongoose";

const flashSaleBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  adults: { type: Number, default: 0 },
  children: { type: Number, default: 0 },
  infants: { type: Number, default: 0 },
  passportPhotograph: { type: String },
  flashSaleId: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashSale', required: true },
  payment: {
    status: { type: String, enum: ["pending","paid","failed"], default: "pending" },
    provider: String,
    transactionId: String,
    amount: Number,
  },
  status: { type: String, enum: ["received", "booked", "not booked"], default: "received" },
  isUnread: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("FlashSaleBooking", flashSaleBookingSchema);
