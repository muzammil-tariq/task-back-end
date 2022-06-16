const EventTypesSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    image: {
      type: String,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventTypes", EventTypesSchema);
