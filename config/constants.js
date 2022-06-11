const constants = {
  PLATFORM_FEES: 0.15,
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
      methods: ["POST"],
      path: /^(.+)?\/paypal\/webhook\/?/,
    },
    {
      methods: ["POST"],
      path: /^\/vendors\/([0-9a-fA-F]{24})\/?$/,
    },
  ],
};

module.exports = constants;

global.constants = constants;
