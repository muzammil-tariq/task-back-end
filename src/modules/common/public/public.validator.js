const { param, query } = expressValidator;

const getImageValidation = [
  param("*")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];

module.exports = {
  getImageValidation,
};
