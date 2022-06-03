const { USER_ROLE } = constants;

module.exports.post = {
  newThread: async (req, res, next) => {
    try {
      const {
        body: {
          userId: otherUserId,
          content,
          userModel: otherUserModel = USER_ROLE.VENDOR,
        },
        user: {
          _id: userId,
          collection: { modelName },
        },
      } = req;

      const otherUser = await models[otherUserModel]
        .findById(otherUserId)
        .select("_id")
        .lean();

      if (!otherUser) {
        throw createError(400, messages.notFound("User"));
      }

      const threadAlreadyExists = await models.Thread.findOne({
        "users.user": {
          $all: [userId, otherUserId],
        },
      });
      if (threadAlreadyExists) {
        throw createError(400, messages.alreadyExists("Thread"));
      }

      const thread = await models.Thread.create({
        users: [
          {
            user: userId,
            userModel: modelName,
          },
          {
            user: otherUserId,
            userModel: otherUserModel,
          },
        ],
      });
      await models.Message.create({
        sender: userId,
        senderModel: modelName,
        thread: thread._id,
        content,
      });
      helpers.chat.sendMessage({
        data: {
          sender: userId._id,
          content,
          thread: thread._id,
          receiver: otherUserId,
          createdAt: new Date(),
        },
      });
      return res.json({
        status: 200,
        message: messages.success,
        data: thread,
      });
    } catch (err) {
      next(err);
    }
  },
  newMessage: async (req, res, next) => {
    try {
      const {
        body: { content },
        user: { _id: userId },
        params: { id: threadId },
      } = req;
      const thread = await models.Thread.findOne({
        _id: threadId,
        "users.user": userId,
      });
      if (!thread) {
        throw createError(400, messages.notFound("Thread"));
      }
      const message = await models.Message.create({
        sender: userId,
        thread: threadId,
        content,
      });
      return res.json({
        status: 200,
        message: messages.success,
        data: message,
      });
    } catch (err) {
      next(err);
    }
  },
};
