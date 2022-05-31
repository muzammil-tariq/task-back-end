module.exports = {
  emitEvent: async function ({ event, receiver, data, onError = () => {} }) {
    redisClient.get(receiver, async function (err, socketId) {
      if (err || !socketId) {
        onError();
        throw err;
      } else {
        io.to(socketId).emit(event, data);
      }
    });
  },
};
