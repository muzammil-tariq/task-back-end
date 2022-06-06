const constants = {
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
  ],
};

module.exports = constants;

global.constants = constants;
