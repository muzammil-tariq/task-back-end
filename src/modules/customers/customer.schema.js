const CustomerSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    password: {
      type: String,
      set: (val) => utils.hash.makeHashValue(val),
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    telephoneNumber: String,
    verificationCode: {
      type: Number,
      default: 0,
    },
    codeExpiryTime: { type: Date },
    isVerified: {
      type: Boolean,
      default: false,
    },
    uId: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

CustomerSchema.methods.verifyPassword = function (pwd) {
  return this.password == utils.hash.makeHashValue(pwd);
};

CustomerSchema.methods.getJWTToken = function () {
  const payload = {
    name: this.firstName + " " + this.lastName,
    email: this.email,
    id: this.id,
    model: "customers",
  };

  return JWT.sign(payload, process.env.JWTSECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

CustomerSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return _.omit(obj, [
    "password",
    "verificationCode",
    "isVerified",
    "codeExpiryTime",
  ]);
};

module.exports = mongoose.model("Customers", CustomerSchema);
