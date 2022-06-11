module.exports.get = {
  generateSignUpLink: async (req, res, next) => {
    try {
      const {
        user: { _id: userId, paypalMerchantId },
      } = req;
      if (paypalMerchantId) {
        throw createError(400, messages.paypalAlreadyConnected);
      }
      const data = await libs.paypal.generateSignUpLink({
        trackingId: userId,
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
  onboardingStatus: async (req, res, next) => {
    try {
      const {
        user: { paypalMerchantId },
      } = req;
      if (!paypalMerchantId) {
        throw createError(400, messages.paypalNotConnected);
      }
      const data = await libs.paypal.getSellerOnboardingStatus({
        sellerMerchantId: paypalMerchantId,
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
  orderDetails: async (req, res, next) => {
    try {
      const {
        params: { orderId },
      } = req;
      const data = await libs.paypal.getOrderDetails({
        orderId,
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
