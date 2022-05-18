const QuotesSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      trim: true,
    },
    price: Number,
    eventId: { type: mongoose.Types.ObjectId, ref: "Quotes" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotes", QuotesSchema);
