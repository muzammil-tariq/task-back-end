const QuotesSchema = new mongoose.Schema(
  {
    qoute: {
      type: String,
      trim: true,
      required: [true, "A quotation must have Qoute"],
    },
    price: Number,
    eventId: { type: mongoose.Types.ObjectId, ref: "Quotes" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotes", QuotesSchema);
