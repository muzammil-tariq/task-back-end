const QuotesSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    price: Number,
    eventId: { type: mongoose.Types.ObjectId, ref: "Events" },
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "Vendors",
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Customers",
    },
    status: {
      type: String,
      enum: ["pending", "booked", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotes", QuotesSchema);
