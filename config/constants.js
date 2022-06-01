const constants = {
  SOCKET_EVENT: {
    MESSAGE: "message",
    INCREMENT_UNREAD_COUNT: "incrementUnreadCount",
  },
  USER_ROLE: {
    CUSTOMER: "Customers",
    VENDOR: "Vendors",
  },
};

module.exports = constants;

global.constants = constants;
