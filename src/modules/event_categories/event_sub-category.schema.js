//@ts-ignore

const EventSubCategoriesSchema = new mongoose.Schema(
  {
    subCategory: { type: String, trim: true, set: (val) => val.toLowerCase() },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventCategories",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventSubCategories", EventSubCategoriesSchema);
