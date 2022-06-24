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
    venue: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    people: [
      {
        type: String,
      },
    ],
    timeZone: {
      type: String,
    },
    startTime: { type: Date },
    status: {
      type: String,
      enum: [
        "pending",
        "inProgress",
        "disputed",
        "completedByCustomer",
        "completedByVendor",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "returned"],
      default: "pending",
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
    amount: {
      type: Number,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookings", BookingsSchema);
