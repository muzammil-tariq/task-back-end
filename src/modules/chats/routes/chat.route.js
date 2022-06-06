const { USER_ROLES } = constants;
router
  .post(
    "/chats",
    middlewares.verifyUserRole(USER_ROLES.CUSTOMER),
    validators.chats.createThreadPayloadValidation,
    middlewares.validation.request,
    actions.chats.post.newThread
  )
  .get("/chats", actions.chats.get.getThreads)
  .post(
    "/chats/:id",
    middlewares.id_validation.validateId,
    validators.chats.createMessagePayloadValidation,
    middlewares.validation.request,
    actions.chats.post.newMessage
  )
  .get("/chats/new", actions.chats.get.getUnreadMessagesCount)
  .get(
    "/chats/:id",
    middlewares.id_validation.validateId,
    actions.chats.get.getMessages
  )
  .patch(
    "/chats/:id/markAsRead",
    middlewares.id_validation.validateId,
    actions.chats.update.markThreadMessagesAsRead
  );

module.exports = { prefix: "chats", router };
