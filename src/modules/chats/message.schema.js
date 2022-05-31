const { ROLE } = constants;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "User",
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
