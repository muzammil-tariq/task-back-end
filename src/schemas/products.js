const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
    },
    year: {
      type: Number,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", BrandSchema);
