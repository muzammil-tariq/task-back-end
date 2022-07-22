const EventCrudService = new services.CrudService(models.Events);
const EventTypeCrudService = new services.CrudService(models.EventTypes);
const { VENDOR_DASHBOARD_URL, VENDOR_DASHBOARD_EVENT_PAGE } = process.env;

exports.add = {
  event: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: customerId },
        user,
      } = req;

      payload["customerId"] = customerId;

      const event = await EventCrudService.add(payload);

      libs.emailService.customerEventSubmittal({
        user,
      });
      sendMailToVendors({ event });
      return res.json({
        status: 201,
        message: messages.created("Event"),
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
  eventType: async (req, res, next) => {
    try {
      const { body: payload } = req;

      const data = await EventTypeCrudService.add(payload);

      return res.json({
        status: 200,
        message: messages.created("EventType"),
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

async function sendMailToVendors({ event }) {
  const { eventRequestDistance } = await helpers.setting.get();
  const where = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: event.location.coordinates,
        },
        $maxDistance: eventRequestDistance,
      },
    },
    skills: {
      $in: event.services.map((item) => item.serviceId),
    },
  };
  const vendors = await models.Vendors.find(where);
  const link =
    VENDOR_DASHBOARD_URL + VENDOR_DASHBOARD_EVENT_PAGE + "/" + event._id;
  for (let vendor of vendors) {
    libs.emailService.vendorReceivingQuotes({
      user: vendor,
      link,
    });
  }
}
