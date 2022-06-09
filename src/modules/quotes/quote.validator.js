const { body } = expressValidator;

const add = [
  body("description")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("price").exists().notEmpty().withMessage(messages.notEmpty),
];
const getListPayload = [
  body("eventId")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
];
const getList = [
  ...getListPayload,
  ...validators.common.pagination,
  ...validators.common.sort,
];
const getById = [...validators.common.paramMongoId()];
const getEventQuotes = [...validators.common.paramMongoId("eventId")];

module.exports = {
  add,
  getList,
  getById,
  getEventQuotes,
};
