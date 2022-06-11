const { body } = expressValidator;
const common = require("../common/common.validator");

let add = [
  ...common.bodyMongoId("eventId"),
  ...common.bodyMongoId("vendorId"),
  body("title")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("description")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];

const getList = [...common.pagination, ...common.sort];
const getById = [...common.paramMongoId()];
const getEventBookings = [...common.paramMongoId("eventId")];

module.exports = {
  add,
  getList,
  getById,
  getEventBookings,
};
