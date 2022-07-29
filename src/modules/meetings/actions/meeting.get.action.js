const { USER_ROLE } = constants;
module.exports.get = {
  list: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
          text = "",
        },
        user: {
          _id: userId,
          collection: { modelName },
        },
      } = req;
      const isVendor = modelName === USER_ROLE.VENDOR;
      const isAdmin = modelName === USER_ROLE.ADMIN;

      const where = {
        $and: [],
      };
      if (!isAdmin) {
        where.$and.push({
          $or: [
            {
              vendorId: userId,
            },
            {
              customerId: userId,
            },
          ],
        });
      }
      if (text)
        where.$and.push({
          $or: [
            {
              title: {
                $regex: text,
                $options: "i",
              },
            },
            {
              description: {
                $regex: text,
                $options: "i",
              },
            },
          ],
        });

      const data = await models.Meetings.find(!isAdmin ? where : {})
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"])
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
  byId: async (req, res, next) => {
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
      const data = await models.Meetings.findOne({
        _id: id,
        ...(!isAdmin ? where : {}),
      })
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"])
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
  listByVendorId: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
        params: { id: vendorId },
      } = req;
      const where = {
        vendorId,
      };
      const data = await models.Meetings.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"]);
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  listByCustomerId: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
        params: { id: customerId },
      } = req;
      const where = {
        customerId,
      };
      const data = await models.Meetings.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"]);
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
