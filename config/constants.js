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
      methods: ["POST"],
      path: /^(.+)?\/newsLetter\/?(.+)?$/,
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
      methods: ["POST"],
      path: /^(.+)?\/quickFreeQuote\/vendors\/([0-9a-fA-F]{24})\/?$/,
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
