const { body } = expressValidator;
let signInPayloadValidation = [
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .matches(dataConstraint.EMAIL_REGEX)
    .withMessage(messages.invalidFormat("Email")),
  body("password")
    .exists()
    .withMessage(messages.notPresent)
    .isLength({ min: dataConstraint.PASSWORD_MIN_LENGTH })
    .withMessage(messages.invalidLength),
];

module.exports = {
  signInPayloadValidation,
};
