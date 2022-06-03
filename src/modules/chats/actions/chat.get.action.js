module.exports.get = {
  getThreads: async (req, res, next) => {
    try {
      const {
        user: { _id: userId },
        query: { limit = dataConstraint.PAGINATION_LIMIT, cursor },
      } = req;
      let _where = {};
      _where = {
        "users.user": mongoose.Types.ObjectId(userId),
      };
      if (cursor) {
        _where = {
          ..._where,
          _id: {
            $lt: mongoose.Types.ObjectId(cursor),
          },
        };
      }
      let threads = await models.Thread.aggregate([
        {
          $match: _where,
        },
        {
          $lookup: {
            from: "messages",
            localField: "_id",
            foreignField: "thread",
            as: "lastMessage",
          },
        },
        {
          $addFields: {
            lastMessage: {
              $arrayElemAt: ["$lastMessage", -1],
            },
          },
        },
        {
          $match: {
            lastMessage: {
              $exists: true,
            },
          },
        },
        {
          $addFields: {
            metaData: {
              $filter: {
                input: "$users",
                as: "user",
                cond: {
                  $eq: ["$$user.user", mongoose.Types.ObjectId(userId)],
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: "$metaData",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "users.user",
            foreignField: "_id",
            as: "customers",
          },
        },
        {
          $lookup: {
            from: "vendors",
            localField: "users.user",
            foreignField: "_id",
            as: "vendors",
          },
        },
        {
          $sort: {
            "lastMessage.createdAt": -1,
          },
        },
        { $limit: Number(limit) },
        {
          $addFields: {
            users: {
              $concatArrays: ["$customers", "$vendors"],
            },
          },
        },
        {
          $project: {
            users: {
              ...models.Customers.excludedAttributes.reduce(
                (acc, cur) => ({ ...acc, [cur]: 0 }),
                {}
              ),
            },
            customers: 0,
            vendors: 0,
          },
        },
      ]);
      return res.json({
        status: 200,
        message: messages.success,
        data: threads,
      });
    } catch (err) {
      next(err);
    }
  },
  getMessages: async (req, res, next) => {
    try {
      const {
        params: { id: threadId },
        user: { _id: userId },
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          cursor,
          createdAt = -1,
        },
      } = req;
      const thread = await models.Thread.findOne({
        _id: threadId,
        "users.user": userId,
      });
      if (!thread) {
        throw createError(400, messages.notFound("Thread"));
      }
      let whereClause = {
        thread: threadId,
      };
      if (cursor) {
        whereClause = {
          ...whereClause,
          _id: {
            $lt: cursor,
          },
        };
      }
      const threadMessages = await models.Message.find(whereClause)
        .sort({ createdAt })
        .limit(Number(limit));
      return res.json({
        status: 200,
        message: messages.success,
        data: threadMessages,
      });
    } catch (err) {
      next(err);
    }
  },
  getUnreadMessagesCount: async (req, res, next) => {
    try {
      const {
        user: { _id: userId },
      } = req;
      const unreadMessageCount = await models.Thread.aggregate([
        {
          $project: {
            users: {
              $filter: {
                input: "$users",
                as: "user",
                cond: {
                  $eq: ["$$user.user", mongoose.Types.ObjectId(userId)],
                },
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            count: {
              $sum: {
                $sum: "$users.unreadCount",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);
      return res.json({
        status: 200,
        message: messages.success,
        data: unreadMessageCount[0].count,
      });
    } catch (err) {
      next(err);
    }
  },
};
