exports.get = {
  listServices: async (req, res, next) => {
    try {
      const {
        query: {
          text = "",
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
        },
      } = req;
      const where = { isDeleted: false };
      if (text) where["name"] = { $regex: text, $options: "i" };
      const data = await models.Services.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit);
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  serviceById: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const data = await models.Services.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!data) throw createError(404, messages.notFound("Service"));
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  vendorsByServices: async (req, res, next) => {
    try {
      const {
        params: { id },
        query: {
          text = "",
          coordinates,
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "rating",
          minorityEligibility,
          sortDirection = -1,
        },
      } = req;
      const serviceWhere = { _id: id };
      const services = await models.Services.find(serviceWhere).select("_id");
      const servicesId = services.map((service) => service._id);
      const where = { skills: { $in: servicesId } };
      if (text) where["fullName"] = { $regex: text, $options: "i" };
      if (coordinates?.length && coordinates?.length === 2) {
        const { eventRequestDistance } = await helpers.setting.get();
        where["location"] = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates,
            },
            $maxDistance: eventRequestDistance,
          },
        };
      }

      if (minorityEligibility)
        where.minorityEligibility = {
          $in: minorityEligibility,
        };
      const data = await models.Vendors.find(where)
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
    } catch (error) {
      next(error);
    }
  },
  favouritedVendorsByServices: async (req, res, next) => {
    try {
      const {
        params: { id },
        query: {
          text = "",
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "rating",
          sortDirection = -1,
        },
        user: { _id: customerId },
      } = req;
      const serviceWhere = { _id: id };
      const services = await models.Services.find(serviceWhere).select("_id");
      const servicesId = services.map((service) => service._id);
      const vendorWhere = {
        skills: { $in: servicesId },
      };
      if (text) vendorWhere["fullName"] = { $regex: text, $options: "i" };
      const data = await models.FavouritedVendors.findOne({
        customerId,
      }).populate({
        path: "vendorIds",
        match: vendorWhere,
        options: {
          skip: limit * currentPage - limit,
          limit,
          sort: { [sortBy]: sortDirection },
        },
      });
      return res.json({
        status: 200,
        message: messages.success,
        data: data?.vendorIds,
      });
    } catch (error) {
      next(error);
    }
  },
};
