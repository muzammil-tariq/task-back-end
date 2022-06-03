const QuotesSchema = new mongoose.Schema(
  {
    price: Number,
    eventId: { type: mongoose.Types.ObjectId, ref: "Events" },
    description: { type: String, trim: true },
    vendorId: { type: mongoose.Types.ObjectId, ref: "Vendors" },
    location: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotes", QuotesSchema);
