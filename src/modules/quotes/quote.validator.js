const { body } = expressValidator;

const add = [
  body("description")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("price").exists().notEmpty().withMessage(messages.notEmpty),
];

module.exports = {
  add,
};
