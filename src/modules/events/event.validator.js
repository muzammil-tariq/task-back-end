const { param, body } = expressValidator;

let addEventPayload = [
  body("title")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("type")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
  body("type.name")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  ...validators.common.bodyMongoId("type.eventTypeId"),
  body("description")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),

  body("venueType")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .isIn(["indoor", "outdoor", "virtual"]),
  body("venueName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("venueAddress")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("numberOfPeople")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isInt()
    .withMessage(messages.invalidDataType("Integer")),
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
  body("endTime")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .withMessage(messages.invalidDataType("Date"))
    .custom((endTime, { req }) => {
      const { startTime } = req.body;
      if (startTime >= endTime) {
        throw new Error(messages.timeLessThanOrEqual("endTime"));
      }
      return true;
    }),
];

const getList = [...validators.common.pagination, ...validators.common.sort];

const addEventTypePayload = [
  body("name")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("images")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isArray()
    .withMessage(messages.invalidDataType("Array")),
];
const updateEventTypePayload = [
  ...validators.common.paramMongoId(),
  body("name")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("images")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isArray()
    .withMessage(messages.invalidDataType("Array"))
    .optional(),
];

module.exports = {
  addEventPayload,
  getList,
  addEventTypePayload,
  updateEventTypePayload,
};
