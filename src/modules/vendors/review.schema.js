const ReviewSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
    },
    bookingId: { type: mongoose.Types.ObjectId, ref: "Bookings" },
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "Vendors",
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Customers",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reviews", ReviewSchema);
