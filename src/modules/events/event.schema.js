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
    location: { type: String, enum: ["indoor", "outdoor", "virtual"] },
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
    vendorIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendors",
      },
    ],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

EventSchema.virtual("quotes", {
  ref: "Quotes",
  localField: "_id",
  foreignField: "eventId",
});

module.exports = mongoose.model("Events", EventSchema);
