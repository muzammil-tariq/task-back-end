const { body } = expressValidator;

let addServicePayload = [
  body("name")
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
  body("image")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];
let updateServicePayload = [
  body("name")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("description")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
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
  addServicePayload,
  updateServicePayload,
  getList,
};
