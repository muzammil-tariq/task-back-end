module.exports = {
  vendorUpcomingEvents: async ({
    userId,
    limit,
    currentPage,
    sortBy,
    sortDirection,
  }) => {
    const bookings = await models.Bookings.find({
      vendorId: userId,
      isDeleted: false,
      status: {
        $in: ["pending", "inProgress"],
      },
    }).select("eventId");
    const eventIds = bookings.map((booking) => booking.eventId);
    return await models.Events.find({
      _id: {
        $in: eventIds,
      },
      startTime: {
        $gte: moment().toISOString(),
      },
    })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .sort({
        [sortBy]: sortDirection,
      })
      .populate("type.eventTypeId", ["name", "images"])
      .populate("services.serviceId");
  },
  customerUpcomingEvents: async ({
    userId,
    limit,
    currentPage,
    sortBy,
    sortDirection,
  }) => {
    return await models.Events.find({
      customerId: userId,
      isDeleted: false,
      startTime: {
        $gte: moment().toISOString(),
      },
    })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .sort({ [sortBy]: sortDirection })
      .populate("type.eventTypeId", ["name", "images"])
      .populate("services.serviceId");
  },
};
