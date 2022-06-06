//@ts-ignore
const { USER_ROLE } = constants;

const VendorSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
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
    informationSteps: {
      type: String,
      enum: ["business", "address", "completed"],
    },
    businessCriteria: {
      type: String,
      enum: ["licensed", "bonded", "insured"],
    },
    dateOfRegisteration: {
      type: Date,
    },
    birthDate: {
      type: Date,
    },
    businessName: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "no-answer"],
    },
    languages: {
      type: [String],
    },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    twitterUrl: { type: String },
    contactName: { type: String },
    contactTitle: { type: String },
    contactEmail: { type: String, trim: true },
    contactPhoneNumber: { type: String },
    serviceDescription: { type: String },
    businessType: { type: String },
    virtualEvents: { type: Boolean },
    convictedFelony: { type: Boolean },
    felonyDescription: { type: String },
    minorityEligibility: { type: [String] },
    businessAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: Number },
    country: { type: String },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventSubCategories",
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

VendorSchema.methods.verifyPassword = function (pwd) {
  return this.password == utils.hash.makeHashValue(pwd);
};

VendorSchema.methods.getJWTToken = function () {
  const payload = {
    name: this.fullName,
    email: this.email,
    id: this.id,
    model: USER_ROLE.VENDOR,
  };

  return JWT.sign(payload, process.env.JWTSECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

VendorSchema.statics.excludedAttributes = [
  "password",
  "accessToken",
  "verificationCode",
  "isVerified",
  "codeExpiryTime",
  "uId",
];

VendorSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return _.omit(obj, VendorSchema.statics.excludedAttributes);
};

module.exports = mongoose.model("Vendors", VendorSchema);
