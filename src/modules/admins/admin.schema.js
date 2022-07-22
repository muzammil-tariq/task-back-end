const { USER_ROLE } = constants;

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      set: (val) => utils.hash.makeHashValue(val),
    },
  },
  { timestamps: true }
);

adminSchema.methods.verifyPassword = function (pwd) {
  return this.password == utils.hash.makeHashValue(pwd);
};

adminSchema.methods.getJWTToken = function () {
  const payload = { email: this.email, id: this.id, model: USER_ROLE.ADMIN };
  return JWT.sign(payload, process.env.JWTSECRET, { expiresIn: 15000 });
};

adminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return _.omit(obj, ["password"]);
};

module.exports = mongoose.model("Admin", adminSchema);
