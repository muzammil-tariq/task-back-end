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
          ref: "User",
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
