const QuotesSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    price: Number,
    servicesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
      },
    ],
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
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotes", QuotesSchema);
