import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema({
  label: { type: String, required: true },        // e.g. "Passport photo"
  type: { type: String, enum: ["file","text","date"], default: "file" },
  required: { type: Boolean, default: true },
  hint: { type: String },                         // optional guidance
});

const visaRequirementSchema = new mongoose.Schema({
  country: { type: String, required: true },     // e.g. "Kenya"
  visaTypes: [{
    name: { type: String, required: true },      // "tourist", "business"
    fee: { type: Number, default: 0 },
    currency: { type: String, enum: ["NGN", "USD"], default: "NGN" },
    processingTime: { type: String },
    paymentMethod: { type: String, enum: ["paystack", "manual"], default: "paystack" },
    requirements: [requirementSchema]             // array of required items
  }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("VisaRequirement", visaRequirementSchema);
