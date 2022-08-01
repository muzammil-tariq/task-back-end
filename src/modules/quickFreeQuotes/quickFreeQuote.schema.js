const QuickFreeQuote = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    servicesIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
      },
    ],
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "Vendors",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [
        {
          type: Number,
        },
      ],
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuickFreeQuotes", QuickFreeQuote);
