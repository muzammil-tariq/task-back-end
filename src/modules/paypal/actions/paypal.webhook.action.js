const { PAYPAL_WEBHOOK_ID } = process.env;

module.exports.webhook = async (req, res, next) => {
  try {
    const {
      headers: {
        "paypal-transmission-sig": transmission_sig,
        "paypal-auth-algo": auth_algo,
        "paypal-cert-url": cert_url,
        "paypal-transmission-id": transmission_id,
        "paypal-transmission-time": transmission_time,
      },
      body,
    } = req;

    const eventType = body.event_type;

    const webhookEventBody = typeof body === "string" ? JSON.parse(body) : body;

    const payload = {
      auth_algo,
      cert_url,
      transmission_id,
      transmission_sig,
      transmission_time,
      webhook_id: PAYPAL_WEBHOOK_ID,
      webhook_event: webhookEventBody,
    };

    const data = await libs.paypal.verifyWebhookSignature(payload);
    if (data.verification_status === "SUCCESS") {
      res.sendStatus(200);
      if (
        eventType === "MERCHANT.ONBOARDING.COMPLETED" ||
        eventType === "CUSTOMER.MERCHANT-INTEGRATION.SELLER-ALREADY-INTEGRATED"
      ) {
        libs.paypal.merchantOnboardingCompleted({ body });
      } else if (
        eventType === "PAYMENT.CAPTURE.COMPLETED" ||
        eventType === "CHECKOUT.ORDER.COMPLETED"
      ) {
        libs.paypal.paymentCaptureCompleted({ body, eventType });
      }
    }
  } catch (err) {
    next(err);
  }
};
