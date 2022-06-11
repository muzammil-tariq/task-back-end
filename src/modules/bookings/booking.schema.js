const BookingsSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Events" },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendors",
    },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers" },
    status: {
      type: String,
      enum: ["pending", "paid", "disputed", "completed", "cancelled"],
      default: "pending",
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
    paypalOrderId: {
      type: String,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookings", BookingsSchema);
