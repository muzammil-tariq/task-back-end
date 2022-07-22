const FavouritedVendorsSchema = new mongoose.Schema(
  {
    vendorIds: [{ type: mongoose.Types.ObjectId, ref: "Vendors" }],
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Customers",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FavouritedVendors", FavouritedVendorsSchema);
