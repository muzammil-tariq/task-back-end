module.exports.get = {
  stats: async (req, res, next) => {
    try {
      const {
        query: {
          timestamp = Math.floor(Date.now() / 1000),
          timePeriod = Math.floor(Date.now() / 1000),
        },
      } = req;
      const startDate = new Date((timestamp - timePeriod) * 1000);
      const endDate = new Date(timestamp * 1000);
      const dateRange = {
        $gte: startDate,
        $lte: endDate,
      };
      const where = {
        createdAt: dateRange,
      };
      const [quotes, events, vendors, customers, revenue] = await Promise.all([
        models.Quotes.find(where).count(),
        models.Events.find(where).count(),
        models.Vendors.find(where).count(),
        models.Customers.find(where).count(),
        models.Bookings.aggregate([
          {
            $match: where,
          },
          {
            $group: {
              _id: null,
              totalAmount: {
                $sum: "$amount",
              },
            },
          },
        ]),
      ]);
      return res.json({
        status: 200,
        message: messages.success,
        data: {
          quotes,
          events,
          vendors,
          customers,
          revenue: revenue[0].totalAmount,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
