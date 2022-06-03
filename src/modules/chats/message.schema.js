const { USER_ROLE } = constants;
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      enum: [USER_ROLE.CUSTOMER, USER_ROLE.VENDOR],
    },
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
    content: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
