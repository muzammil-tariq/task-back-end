const { body, oneOf } = expressValidator;
const common = require("../common/common.validator");

let add = [
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
  oneOf([
    body("venue")
      .exists()
      .withMessage(messages.notPresent)
      .notEmpty()
      .withMessage(messages.notEmpty)
      .isString()
      .withMessage(messages.invalidDataType("String")),
    body("link")
      .exists()
      .withMessage(messages.notPresent)
      .notEmpty()
      .withMessage(messages.notEmpty)
      .isURL()
      .withMessage(messages.invalidDataType("URL")),
  ]),
  body("timeZone")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("startTime")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .withMessage(messages.invalidDataType("Date"))
    .custom((value) => {
      const date = new Date();
      if (new Date(value) < date) {
        throw new Error(messages.pastDate);
      }
      return true;
    }),
];

const getList = [...common.pagination, ...common.sort];
const getById = [...common.paramMongoId()];

module.exports = {
  add,
  getList,
  getById,
};
