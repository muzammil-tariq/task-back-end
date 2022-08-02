exports.create = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const { eventRequestDistance } = await helpers.setting.get();

    const _where = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: body.location.coordinates,
          },
          $maxDistance: eventRequestDistance,
        },
      },
      skills: {
        $in: body.servicesIds,
      },
    };
    const vendor = await models.Vendors.findOne({
      _id: id,
      ..._where,
    });
    if (!vendor) throw createError(400, messages.criteriaDidNotMatch);
    const quickFreeQuote = await models.QuickFreeQuotes.create({
      ..._.omit(body, models.QuickFreeQuotes.createForbiddenAttributes),
      vendorId: id,
    });
    await libs.emailService.quickFreeQuote({
      email: vendor.email,
      fullName: vendor.fullName,
    });
    return res.json({
      status: 200,
      message: messages.success,
      data: quickFreeQuote,
    });
  } catch (error) {
    next(error);
  }
};
