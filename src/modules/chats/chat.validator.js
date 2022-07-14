const { USER_ROLE } = constants;
const { body, oneOf } = expressValidator;

let createMessagePayloadValidation = [
  oneOf([
    body("content")
      .exists()
      .withMessage(messages.notPresent)
      .notEmpty()
      .withMessage(messages.notEmpty)
      .isString()
      .withMessage(messages.invalidDataType("String")),
    body("attachments")
      .exists()
      .withMessage(messages.notPresent)
      .notEmpty()
      .withMessage(messages.notEmpty)
      .isArray()
      .withMessage(messages.invalidDataType("Array")),
  ]),
  body("attachments.*")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];

let createThreadPayloadValidation = [
  body("userId")
    .exists()
    .withMessage(messages.notPresent)
    .matches(dataConstraint.MONGO_ID_REGEX)
    .withMessage(messages.invalidId)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  ...createMessagePayloadValidation,
];

module.exports = {
  createThreadPayloadValidation,
  createMessagePayloadValidation,
};
