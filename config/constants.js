const constants = {
  PLATFORM_FEES: 0.15,
  EVENT_REQUEST_DISTANCE: 80467, // in meters, 80467 is about 50 miles
  SOCKET_EVENT: {
    MESSAGE: "message",
    INCREMENT_UNREAD_COUNT: "incrementUnreadCount",
  },
  USER_ROLE: {
    CUSTOMER: "Customers",
    VENDOR: "Vendors",
    ADMIN: "Admin",
  },
  PUBLIC_ROUTES: [
    {
      methods: ["POST"],
      path: /^(.+)?\/seeder\/?(.+)?/,
    },
    {
      methods: ["GET"],
      path: /^(.+)?\/login\/?(.+)?/,
    },
    {
      methods: ["POST", "PATCH", "GET"],
      path: /^(.+)?\/auth\/?(.+)?/,
    },
    {
      methods: ["GET"],
      path: /^(.+)?\/public\/?(.+)?/,
    },
    {
      methods: ["GET"],
      path: /^(.+)?\/services\/?$/,
    },
    {
      methods: ["GET"],
      path: /^(.+)?\/services\/([0-9a-fA-F]{24})\/?$/,
    },
    {
      methods: ["GET"],
      path: /^(.+)?\/services\/([0-9a-fA-F]{24})\/vendors\/?$/,
    },
    {
      methods: ["GET"],
      path: /^(.+)?\/events\/types\/?(.+)?/,
    },
    {
      methods: ["POST"],
      path: /^(.+)?\/paypal\/webhook\/?/,
    },
    {
      methods: ["GET"],
      path: /^\/vendors\/([0-9a-fA-F]{24})\/?$/,
    },
  ],
};

module.exports = constants;

global.constants = constants;
