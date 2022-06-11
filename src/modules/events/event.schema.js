//@ts-ignore

const EventSchema = new mongoose.Schema(
  {
    title: { type: String },
    type: { type: String },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventSubCategories",
      },
    ],
    description: { type: String },
    venue: { type: String, enum: ["indoor", "outdoor", "virtual"] },
    venueName: { type: String },
    venueAddress: { type: String },
    numberOfPeople: { type: Number },
    startTime: { type: Date },
    endTime: { type: Date },
    status: {
      type: String,
      enum: ["upcoming", "canceled", "completed"],
      default: "upcoming",
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

EventSchema.index({ location: "2dsphere" });

EventSchema.virtual("quotes", {
  ref: "Quotes",
  localField: "_id",
  foreignField: "eventId",
});

module.exports = mongoose.model("Events", EventSchema);
