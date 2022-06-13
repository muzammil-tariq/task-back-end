const { param, body } = expressValidator;

let addCategoryPayload = [
  body("category")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("description")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("subCategories")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isArray()
    .withMessage(messages.invalidDataType("Array"))
    .optional(),
  body("image")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
];

const getList = [
  ...validators.common.getById,
  ...validators.common.pagination,
  ...validators.common.sort,
];

module.exports = {
  addCategoryPayload,
  getList,
};
