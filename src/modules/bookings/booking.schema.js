const BookingsSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Events" },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendors",
    },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers" },
    zipCode: { type: Number },

    quoteId: { type: mongoose.Schema.Types.ObjectId, ref: "Quotes" },
    status: {
      type: String,
      enum: ["started", "disputed", "completed", "cancelled"],
      default: "started",
    },
    endedBy: {
      customerEnded: { type: Boolean, default: false },
      vendorEnded: { type: Boolean, default: false },
    },
    disputeFilerId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "disputeFilerModel",
    },
    disputeFilerModel: {
      type: String,
      enum: ["Customers", "Vendors"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookings", BookingsSchema);
