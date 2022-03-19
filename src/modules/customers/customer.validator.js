const { body, param } = expressValidator;
let signUpPayloadValidation = [
  body("firstName")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("lastName")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .matches(dataConstraint.EMAIL_REGEX)
    .withMessage(messages.invalidFormat("Email"))
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("password")
    .isLength({ min: dataConstraint.PASSWORD_MIN_LENGTH })
    .withMessage(messages.invalidLength)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  // body("hash")
  //   .isString()
  //   .withMessage(messages.invalidDataType("String"))
  //   .optional(true),
];

let signInPayloadValidation = [
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("password")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: dataConstraint.PASSWORD_MIN_LENGTH })
    .withMessage(messages.invalidLength)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];
let emailPayloadValidation = [
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isEmail()
    .withMessage(messages.invalidEmail),
];

let resetPasswordPayload = [
  param("id").exists(),
  body("code")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isNumeric()
    .withMessage(messages.invalidDataType("Integer")),
  body("password")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: dataConstraint.PASSWORD_MIN_LENGTH })
    .withMessage(messages.invalidLength)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .isLength({ min: dataConstraint.PASSWORD_MIN_LENGTH })
    .withMessage(messages.invalidLength),
];
let verifyCodePayloadValidation = [
  param("id").exists(),
  body("code")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isNumeric()
    .withMessage(messages.invalidDataType("Integer")),
];

let resendCodePayloadValidation = [param("id").exists()];

module.exports = {
  signUpPayloadValidation,
  signInPayloadValidation,
  emailPayloadValidation,
  resetPasswordPayload,
  verifyCodePayloadValidation,
  resendCodePayloadValidation,
};
