//@ts-ignore

const EventCategoriesSchema = new mongoose.Schema(
  {
    category: { type: String, trim: true },
    description: { type: String },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventCategories", EventCategoriesSchema);
