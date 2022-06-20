//@ts-ignore

const ServicesSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ServicesSchema.virtual("subServices", {
  ref: "SubServices",
  localField: "_id",
  foreignField: "serviceId",
});

module.exports = mongoose.model("Services", ServicesSchema);
