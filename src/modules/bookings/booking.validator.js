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
  body("venue")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("link")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isURL()
    .withMessage(messages.invalidDataType("URL"))
    .optional(),
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
  body("amount")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isNumeric()
    .withMessage(messages.invalidDataType("Number"))
    .custom((value) => {
      if (Number(value) === 0 || Number(value) < 0) {
        throw new Error(messages.invalidPayload);
      }
      return true;
    }),
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
