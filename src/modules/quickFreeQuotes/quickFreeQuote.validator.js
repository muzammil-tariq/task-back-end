const { body } = expressValidator;

const add = [
  body("description")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("fullName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("servicesIds")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isArray()
    .withMessage(messages.invalidDataType("Array")),
  body("location").notEmpty().withMessage(messages.notEmpty),
  body("location.coordinates")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isArray()
    .withMessage(messages.invalidDataType("Array"))
    .custom((value) => {
      if (!value?.length) {
        throw createError(
          400,
          messages.invalidDataType("location.coordinates")
        );
      }
      if (value?.length !== 2) {
        throw createError(400, messages.invalidFormat("coordinates"));
      }
      value.forEach((item) => {
        if (typeof item !== "number") {
          throw createError(400, messages.invalidFormat("coordinates"));
        }
      });
      return true;
    }),
  body("location.address")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("location.state")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("location.country")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];

module.exports = {
  add,
};
