const { USER_ROLE } = constants;
module.exports = {
  getList: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          eventId,
          status = "",
          sortDirection = -1,
          search = "",
        },
        user: {
          _id: userId,
          collection: { modelName },
        },
      } = req;
      const isVendor = modelName === USER_ROLE.VENDOR;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const where = {
        ...(search
          ? {
              title: { $regex: search, $options: "i" },
            }
          : null),
        ...(eventId
          ? {
              eventId,
            }
          : null),
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      };
      if (status) where["status"] = status;
      const data = await models.Quotes.find(!isAdmin ? where : {})
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("eventId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate({
          path: "vendorId",
          select: ["fullName", "profilePhoto", "skills", "rating"],
          populate: [
            { path: "skills" },
            {
              path: "threads",
              match: {
                "users.0.user": userId,
              },
              select:
                "-users._id -users.isDeleted -users.showNotifications -users.unreadCount -users.userModel -createdAt -updatedAt",
            },
          ],
        })
        .select(
          !isAdmin
            ? isVendor
              ? { vendorId: 0 }
              : {
                  customerId: 0,
                }
            : {}
        );
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
        user: {
          _id: userId,
          collection: { modelName },
        },
      } = req;
      const isVendor = modelName === USER_ROLE.VENDOR;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const where = {
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      };
      const data = await models.Quotes.findOne({
        _id: id,
        ...(!isAdmin ? where : {}),
      })
        .populate("eventId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate({
          path: "vendorId",
          select: ["fullName", "profilePhoto", "skills", "rating"],
          populate: [
            { path: "skills" },
            {
              path: "threads",
              match: {
                "users.0.user": userId,
              },
              select:
                "-users._id -users.isDeleted -users.showNotifications -users.unreadCount -users.userModel -createdAt -updatedAt",
            },
          ],
        })
        .select(
          !isAdmin
            ? isVendor
              ? { vendorId: 0 }
              : {
                  customerId: 0,
                }
            : {}
        );
      let jsonData = null;
      if (data) {
        const pastEvents = await models.Bookings.aggregate([
          {
            $match: {
              vendorId: mongoose.Types.ObjectId(data.vendorId._id),
              status: {
                $in: ["completedByCustomer", "completedByVendor", "completed"],
              },
            },
          },
          {
            $group: {
              _id: {
                eventId: "$eventId",
              },
              count: {
                $sum: 1,
              },
            },
          },
          {
            $group: {
              _id: null,
              count: {
                $sum: "$count",
              },
            },
          },
        ]);
        jsonData = data.toJSON();
        jsonData.vendorId.pastEventsCount = pastEvents[0]
          ? pastEvents[0].count
          : 0;
      }
      return res.json({
        status: 200,
        message: messages.success,
        data: jsonData,
      });
    } catch (err) {
      next(err);
    }
  },
  getEventQuotes: async (req, res, next) => {
    try {
      const {
        params: { eventId },
        user: {
          _id: userId,
          collection: { modelName },
        },
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
      } = req;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const where = {
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      };
      const data = await models.Quotes.find({
        eventId,
        ...(!isAdmin ? where : {}),
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
};
