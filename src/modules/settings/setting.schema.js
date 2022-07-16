//@ts-ignore

const SettingSchema = new mongoose.Schema(
  {
    platformCommission: { type: Number, min: 0 },
    eventRequestDistance: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", SettingSchema);
