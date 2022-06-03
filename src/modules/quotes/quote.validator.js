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
const getList = [...validators.common.pagination, ...validators.common.sort];
const getById = [...validators.common.paramMongoId()];
const getEventQuotes = [...validators.common.paramMongoId("eventId")];

module.exports = {
  add,
  getList,
  getById,
  getEventQuotes,
};
