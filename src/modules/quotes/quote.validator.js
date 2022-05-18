const { param, body } = expressValidator;

let quotePayload = [
  body("quote")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("price").exists().notEmpty().withMessage(messages.notEmpty),
  body("eventId")
    .exists()
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];

module.exports = {
  quotePayload,
};
