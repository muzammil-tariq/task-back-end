//@ts-ignore

const EventSchema = new mongoose.Schema(
  {
    title: { type: String },
    type: { type: String },
    customer: {
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
    scheduledDate: { type: Date },
    location: { type: String, enum: ["indoor", "outdoor", "virtual"] },
    venuName: { type: String },
    venuAddress: { type: String },
    numberOfPeople: { type: Number },
    startTime: { type: String },
    endTime: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", EventSchema);
