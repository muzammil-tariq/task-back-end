const QuotesSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    price: Number,
    eventId: { type: mongoose.Types.ObjectId, ref: "Events" },
    description: { type: String, trim: true },
    vendorId: { type: mongoose.Types.ObjectId, ref: "Vendors" },
    location: { type: String },
=======
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
      ref: "Vendors",
    },
    status: {
      type: String,
      enum: ["pending", "booked", "declined"],
      default: "pending",
    },
>>>>>>> 1f482e14af22ea845839f8254c271f70bf372634
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotes", QuotesSchema);
