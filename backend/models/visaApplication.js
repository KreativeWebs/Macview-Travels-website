import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
  label: String,
  fileUrl: String,    // S3 or storage URL
  textValue: String,
});

const visaApplicationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  nationality: String,
  destinationCountry: String,
  visaType: String,
  travelDate: Date,
  notes: String,
  documents: [docSchema],
  payment: {
    status: { type: String, enum: ["pending","paid","failed"], default: "pending" },
    provider: String,
    transactionId: String,
    amount: Number,
  },
  status: { type: String, default: "received" }, // e.g. received, processing, completed
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("VisaApplication", visaApplicationSchema);
