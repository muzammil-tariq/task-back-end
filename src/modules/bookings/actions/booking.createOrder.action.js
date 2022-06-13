const { PLATFORM_PAYPAL_ACCOUNT } = process.env;
const { PLATFORM_FEES } = constants;

module.exports.createOrder = async (req, res, next) => {
  try {
    const {
      user: { _id: userId },
      params: { id: bookingId },
    } = req;
    const booking = await models.Bookings.findOne({
      _id: bookingId,
    }).populate("vendorId", ["paypalMerchantId"]);
    if (!booking) {
      throw createError(404, messages.notFound("Booking"));
    }
    if (
      booking.paypalOrderId &&
      (booking.status === "paid" || booking.status === "completed")
    ) {
      throw createError(400, messages.alreadyPaid);
    }
    if (booking.paypalOrderId && booking.status === "pending") {
      return res.json({
        status: 200,
        message: messages.success,
        data: {
          id: booking.paypalOrderId,
        },
      });
    }
    const order = await libs.paypal.createOrder({
      body: {
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: booking.amount,
            },
            payee: {
              merchant_id: booking.vendorId.paypalMerchantId,
            },
            description: "Event booking",
            payment_instruction: {
              platform_fees: [
                {
                  amount: {
                    value: PLATFORM_FEES * booking.amount,
                    currency_code: "USD",
                  },
                  payee: {
                    email_address: PLATFORM_PAYPAL_ACCOUNT,
                  },
                },
              ],
            },
          },
        ],
        intent: "CAPTURE",
      },
    });

    await models.Bookings.findOneAndUpdate(
      {
        customerId: userId,
        _id: bookingId,
      },
      {
        paypalOrderId: order.id,
      }
    );
    return res.json({
      status: 200,
      message: messages.success,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
