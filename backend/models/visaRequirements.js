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
    processingTime: { type: String },
    requirements: [requirementSchema]             // array of required items
  }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("VisaRequirement", visaRequirementSchema);
