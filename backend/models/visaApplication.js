import mongoose from "mongoose";

// Schema for individual documents
const docSchema = new mongoose.Schema({
  label: String,
  fileUrl: String,    // S3 or storage URL
  textValue: String,  // Optional text input
});

// Main visa application schema
const visaApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  nationality: String,               // Optional if you want to track it
  destinationCountry: { type: String, required: true },
  visaType: { type: String, required: true },
  travelDate: Date,
  processingTime: String,
  notes: String,
  documents: [docSchema],
  payment: {
    status: { type: String, enum: ["pending","paid","failed"], default: "pending" },
    provider: String,
    transactionId: String,
    amount: Number,
  },
  status: { type: String, enum: ["received", "processing", "approved", "rejected"], default: "received" }, // e.g. received, processing, completed
  addedByAdmin: { type: Boolean, default: false }, // Flag for admin-added applications
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("VisaApplication", visaApplicationSchema);
