//@ts-ignore
const { USER_ROLE } = constants;

const CustomerSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    username: { type: String, trim: true },
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
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [
        {
          type: Number,
        },
      ],
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },
    languages: [
      {
        type: String,
      },
    ],
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
      enum: ["male", "female", "non-binary", "prefer-not-to-answer"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CustomerSchema.index({ location: "2dsphere" });

CustomerSchema.methods.verifyPassword = function (pwd) {
  return this.password == utils.hash.makeHashValue(pwd);
};

CustomerSchema.methods.getJWTToken = function () {
  const payload = {
    name: this.firstName + " " + this.lastName,
    email: this.email,
    id: this.id,
    model: USER_ROLE.CUSTOMER,
  };

  return JWT.sign(payload, process.env.JWTSECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

CustomerSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

// attributes to be excluded from the response
CustomerSchema.statics.privateAttributes = [
  "password",
  "accessToken",
  "verificationCode",
  "codeExpiryTime",
  "uId",
  "provider",
];

CustomerSchema.statics.createForbiddenAttributes = [
  ..._.without(CustomerSchema.statics.privateAttributes, "password"),
  "createdAt",
  "updatedAt",
  "isVerified",
];
CustomerSchema.statics.updateForbiddenAttributes = [
  ...CustomerSchema.statics.createForbiddenAttributes,
  "password",
  "username",
  "email",
];

CustomerSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return _.omit(obj, CustomerSchema.statics.privateAttributes);
};

module.exports = mongoose.model("Customers", CustomerSchema);
