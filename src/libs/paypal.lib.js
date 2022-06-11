const { PAYPAL_PARTNER_MERCHANT_ID } = process.env;
const paypalClient = libs.axios.create({
  baseURL: "https://api-m.sandbox.paypal.com",
  headers: {
    Authorization: "Bearer " + process.env.PAYPAL_AUTH_TOKEN,
  },
});

module.exports = {
  async generateSignUpLink({ trackingId }) {
    const res = await paypalClient.post("/v2/customer/partner-referrals", {
      tracking_id: trackingId,
      operations: [
        {
          operation: "API_INTEGRATION",
          api_integration_preference: {
            rest_api_integration: {
              integration_method: "PAYPAL",
              integration_type: "THIRD_PARTY",
              third_party_details: {
                features: [
                  "PAYMENT",
                  "REFUND",
                  "PARTNER_FEE",
                  "DELAY_FUNDS_DISBURSEMENT",
                ],
              },
            },
          },
        },
      ],
      products: ["EXPRESS_CHECKOUT"],
      legal_consents: [
        {
          type: "SHARE_DATA_CONSENT",
          granted: true,
        },
      ],
    });
    return res;
  },
  async getSellerMerchantId({ trackingId }) {
    return await paypalClient.get(
      `/v1/customer/partners/${PAYPAL_PARTNER_MERCHANT_ID}/merchant-integrations?tracking_id=${trackingId}`
    );
  },
  async getSellerOnboardingStatus({ sellerMerchantId }) {
    return await paypalClient.get(
      `/v1/customer/partners/${PAYPAL_PARTNER_MERCHANT_ID}/merchant-integrations/${sellerMerchantId}`
    );
  },
  async disbureFunds({ referenceId }) {
    return await paypalClient.post("/v1/payments/referenced-payouts-items", {
      reference_id: referenceId,
      reference_type: "TRANSACTION_ID",
    });
  },
  async getOrderDetails({ orderId }) {
    return await paypalClient.get(`/v2/checkout/orders/${orderId}`);
  },
  async verifyWebhookSignature({
    auth_algo,
    cert_url,
    transmission_id,
    transmission_sig,
    transmission_time,
    webhook_id,
    webhook_event,
  }) {
    return await paypalClient.post(
      `/v1/notifications/verify-webhook-signature`,
      {
        auth_algo: auth_algo,
        cert_url: cert_url,
        transmission_id: transmission_id,
        transmission_sig: transmission_sig,
        transmission_time: transmission_time,
        webhook_id: webhook_id,
        webhook_event: webhook_event,
      }
    );
  },
  async createOrder({ body }) {
    return await paypalClient.post(`/v2/checkout/orders`, body);
  },

  // WEBHOOK TRIGGERS
  async merchantOnboardingCompleted({ body }) {
    const merchantId = body.resource.merchant_id;
    const vendorId = body.resource.tracking_id;
    if (merchantId) {
      await models.Vendors.findOneAndUpdate(
        {
          _id: vendorId,
        },
        {
          paypalMerchantId: merchantId,
        }
      );
    }
  },
  async paymentCaptureCompleted({ body, eventType }) {
    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      var orderId = body.resource.supplementary_data.related_ids.order_id;
      var amount = body.resource.amount.value;
    } else if (eventType === "CHECKOUT.ORDER.COMPLETED") {
      var orderId = body.resource.id;
      var amount = body.resource.purchase_units[0].amount.value;
    }
    await models.Bookings.findOneAndUpdate(
      {
        paypalOrderId: orderId,
      },
      {
        amount,
        status: "PAID",
      }
    );
  },
};
