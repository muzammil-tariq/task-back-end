const { USER_ROLE } = constants;
const threadSchema = new mongoose.Schema(
  {
    users: [
      {
        isDeleted: {
          type: Boolean,
          default: false,
        },
        showNotifications: {
          type: Boolean,
          default: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "userModel",
        },
        userModel: {
          type: String,
          enum: [USER_ROLE.CUSTOMER, USER_ROLE.VENDOR],
        },
        unreadCount: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thread", threadSchema);
