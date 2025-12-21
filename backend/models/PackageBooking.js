import mongoose from "mongoose";

// Schema for individual documents
const docSchema = new mongoose.Schema({
  label: String,
  fileUrl: String,    // Cloudinary URL
  textValue: String,  // Optional text input
});

// Main package booking schema
const packageBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String, required: true },
  email: { type: String },
  whatsappNumber: { type: String, required: true },
  travelDate: { type: Date, required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  packageTitle: { type: String, required: true },
  packagePrice: { type: Number, required: true },
  packageCurrency: { type: String, required: true },
  packageCity: { type: String, required: true },
  documents: [docSchema],
  payment: {
    status: { type: String, enum: ["pending","paid","failed"], default: "pending" },
    provider: String,
    transactionId: String,
    amount: Number,
  },
  discountApplied: { type: Boolean, default: false },
  discountPercentage: { type: Number, default: 0 },
  discountedPrice: { type: Number },
  status: { type: String, enum: ["received", "confirmed", "cancelled"], default: "received" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("PackageBooking", packageBookingSchema);
