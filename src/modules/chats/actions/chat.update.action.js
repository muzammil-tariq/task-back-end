module.exports.update = {
  markThreadMessagesAsRead: async (req, res, next) => {
    try {
      const {
        params: { id: threadId },
        user: { _id: userId },
      } = req;
      const thread = await models.Thread.findOneAndUpdate(
        {
          _id: threadId,
          "users.user": userId,
        },
        {
          "users.$.unreadCount": 0,
        },
        {
          new: true,
        }
      );
      return res.json({
        status: 200,
        message: messages.success,
        data: thread,
      });
    } catch (err) {
      next(err);
    }
  },
};
