//@ts-ignore

const SubServicesSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: {
      type: String,
      trim: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubServices", SubServicesSchema);
