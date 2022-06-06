//@ts-ignore

const EventCategoriesSchema = new mongoose.Schema(
  {
    category: { type: String, trim: true, set: (val) => val.toLowerCase() },
    description: { type: String },
    img: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventCategories", EventCategoriesSchema);
