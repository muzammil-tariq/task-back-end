const { body } = expressValidator;
const common = require("../common/common.validator");

let add = [
  common.bodyMongoId("meetingId")[0].optional(),
  common.bodyMongoId("eventId")[0],
  common.bodyMongoId("vendorId")[0],
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

let addReview = [
  body("description")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("rating")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isNumeric()
    .withMessage(messages.invalidDataType("Number"))
    .custom((value) => {
      if (Number(value) < 1 || Number(value) > 5) {
        throw new Error(messages.invalidPayload);
      }
      return true;
    }),
];

module.exports = {
  add,
  addReview,
  getList,
  getById,
  getEventBookings,
};
