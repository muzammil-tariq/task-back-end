const MeetingsSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendors",
    },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers" },
    venue: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    people: [
      {
        type: String,
      },
    ],
    timeZone: {
      type: String,
    },
    startTime: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meetings", MeetingsSchema);
