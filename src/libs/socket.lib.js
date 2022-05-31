const { SOCKET_EVENT } = constants;
exports.initialize = async function (server) {
  var io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  global.io = io;

  io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      JWT.verify(
        socket.handshake.query.token,
        process.env.JWTSECRET,
        async function (err, user) {
          if (err) return next(new Error("Authentication error"));
          const userObj = await models.Users.findById(user.id);
          socket.user = userObj;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  });
  io.on("connection", function (socket) {
    redisClient.set(String(socket.user?._id), socket.id);

    socket.on(SOCKET_EVENT.MESSAGE, async function (data) {
      helpers.chat.verifySenderAndSendMessage({
        socket,
        data,
      });
    });

    socket.on(SOCKET_EVENT.INCREMENT_UNREAD_COUNT, async function (data) {
      helpers.chat.updateUnreadCount({
        threadId: data.thread,
        receiverId: data.receiver,
        incrementBy: 1,
      });
    });

    socket.on("disconnect", () => {
      redisClient.del(String(socket.user?._id));
    });
  });
};
