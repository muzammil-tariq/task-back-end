module.exports = {
  getList: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = 1,
        },
      } = req;
      const events = await models.Events.find(
        {
          status: {
            $ne: "cancelled",
          },
        },
        {
          _id: 1,
        }
      );
      const eventIds = events.map((event) => event._id);
      const data = await models.Quotes.find({
        eventId: eventIds,
      })
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        });
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const data = await models.Quotes.findOne({
        _id: id,
      });
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  getEventQuotes: async (req, res, next) => {
    try {
      const {
        params: { eventId },
      } = req;
      const data = await models.Quotes.find({
        eventId,
      });
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
