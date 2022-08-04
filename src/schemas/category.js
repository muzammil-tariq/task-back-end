const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", BrandSchema);
