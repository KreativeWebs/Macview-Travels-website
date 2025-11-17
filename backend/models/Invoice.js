import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    bookingType: {
      type: String,
      required: true,
      enum: ["flight", "hotel"],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    details: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    paymentProvider: String,
    transactionId: String,
  },
  { timestamps: true }
);

// Index for efficient queries
invoiceSchema.index({ bookingId: 1, bookingType: 1 });

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
