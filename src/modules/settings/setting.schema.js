//@ts-ignore

const SettingSchema = new mongoose.Schema(
  {
    platformCommission: { type: Number, min: 0 }, // in percentage
    eventRequestDistance: { type: Number, min: 0 }, // in meters
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", SettingSchema);
