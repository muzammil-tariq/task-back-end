const { PAYPAL_PARTNER_MERCHANT_ID } = process.env;
const paypalClient = libs.axios.create({
  baseURL: "https://api-m.sandbox.paypal.com",
  headers: {
    Authorization: "Bearer " + process.env.PAYPAL_AUTH_TOKEN,
  },
});

module.exports = {
  async getAuthToken() {
    const res = await paypalClient.post(
      "/v1/oauth2/token",
      qs.stringify({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization: `Basic ${process.env.PAYPAL_AUTH_TOKEN}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return { Authorization: `Bearer ${res.access_token}` };
  },
  async generateSignUpLink({ trackingId }) {
    const token = await this.getAuthToken();
    const res = await paypalClient.post(
      "/v2/customer/partner-referrals",
      {
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
      },
      {
        headers: token,
      }
    );
    return res;
  },
  async getSellerMerchantId({ trackingId }) {
    const token = await this.getAuthToken();
    return await paypalClient.get(
      `/v1/customer/partners/${PAYPAL_PARTNER_MERCHANT_ID}/merchant-integrations?tracking_id=${trackingId}`,
      {
        headers: token,
      }
    );
  },
  async getSellerOnboardingStatus({ sellerMerchantId }) {
    const token = await this.getAuthToken();
    return await paypalClient.get(
      `/v1/customer/partners/${PAYPAL_PARTNER_MERCHANT_ID}/merchant-integrations/${sellerMerchantId}`,
      {
        headers: token,
      }
    );
  },
  async disbureFunds({ referenceId }) {
    const token = await this.getAuthToken();
    return await paypalClient.post(
      "/v1/payments/referenced-payouts-items",
      {
        reference_id: referenceId,
        reference_type: "TRANSACTION_ID",
      },
      {
        headers: token,
      }
    );
  },
  async getOrderDetails({ orderId }) {
    const token = await this.getAuthToken();
    return await paypalClient.get(`/v2/checkout/orders/${orderId}`, {
      headers: token,
    });
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
    const token = await this.getAuthToken();
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
      },
      {
        headers: token,
      }
    );
  },
  async createOrder({ body }) {
    const token = await this.getAuthToken();
    return await paypalClient.post(`/v2/checkout/orders`, body, {
      headers: token,
    });
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
    } else if (eventType === "CHECKOUT.ORDER.COMPLETED") {
      var orderId = body.resource.id;
    }
    await models.Bookings.findOneAndUpdate(
      {
        paypalOrderId: orderId,
      },
      {
        status: "paid",
      }
    );
  },
};
