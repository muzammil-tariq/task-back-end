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
    if (!vendor) throw createError(400, messages.notFound("vendor"));
    const quickFreeQuote = await models.QuickFreeQuotes.create({
      // ...body,
      ..._.omit(body, models.QuickFreeQuotes.createForbiddenAttributes),
      vendorId: id,
    });
    await libs.emailService.sendEmailToSubscriber({
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
