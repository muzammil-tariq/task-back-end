const { SOCKET_EVENT } = constants;
module.exports = {
  verifySenderAndSendMessage: async function ({ socket, data }) {
    const threadExists = await models.Thread.findOne({
      _id: data.thread,
      "users.user": {
        $all: [data.receiver, data.sender],
      },
    });
    if (!threadExists || String(data.sender) !== String(socket.user._id)) {
      return;
    }
    helpers.chat.sendMessage({ data });
  },
  sendMessage: async function ({ data }) {
    // If the user is offline then update the unreadCount
    // Else frontend will check and send an event to update it if the message does not belongs to the opened thread
    await helpers.socket.emitEvent({
      event: SOCKET_EVENT.MESSAGE,
      receiver: data.receiver,
      data: _.omit(data, ["receiver"]),
      onError: () =>
        helpers.chat.updateUnreadCount({
          threadId: data.thread,
          receiverId: data.receiver,
          incrementBy: 1,
        }),
    });
  },
  updateUnreadCount: async function ({
    threadId,
    receiverId,
    incrementBy = 1,
  }) {
    await models.Thread.updateOne(
      { _id: threadId, "users.user": mongoose.Types.ObjectId(receiverId) },
      {
        $inc: { "users.$.unreadCount": incrementBy },
      }
    );
  },
};
