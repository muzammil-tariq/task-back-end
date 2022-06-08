const featuredVendors = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventCategories",
    },
    vendors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendors",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedVendors", featuredVendors);
