//@ts-ignore

const EventSubCategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventCategories",
    },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventSubCategories", EventSubCategoriesSchema);
