const RequestQuotesSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Events" },
    vendors: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vendors",
        },
        status: { type: String, enum: ["pending", "accepted", "rejected"] },
        quote: { type: mongoose.Schema.Types.ObjectId, ref: "Quotes" },
      },
    ],
    zipCode: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requests", RequestQuotesSchema);
