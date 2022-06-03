const { USER_ROLE } = constants;
const { body } = expressValidator;

let createThreadPayloadValidation = [
  body("userId")
    .exists()
    .withMessage(messages.notPresent)
    .matches(dataConstraint.MONGO_ID_REGEX)
    .withMessage(messages.invalidId)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("content")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("userModel")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .isIn([USER_ROLE.VENDOR])
    .withMessage(messages.invalidDataType("String")),
];
let createMessagePayloadValidation = [
  body("content")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];
module.exports = {
  createThreadPayloadValidation,
  createMessagePayloadValidation,
};
