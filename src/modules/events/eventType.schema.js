const EventTypesSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    images: [
      {
        type: String,
      },
    ],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventTypes", EventTypesSchema);
