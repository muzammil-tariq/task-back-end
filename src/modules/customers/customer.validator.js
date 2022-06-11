const { body, param } = expressValidator;
let signUpPayloadValidation = [
  body("firstName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("lastName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("username")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("telephoneNumber")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .matches(dataConstraint.PHONE_NUMBER_REGEX)
    .withMessage(messages.invalidFormat("PhoneNumber")),
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .matches(dataConstraint.EMAIL_REGEX)
    .withMessage(messages.invalidFormat("Email")),
  body("password")
    .isLength({ min: dataConstraint.PASSWORD_MIN_LENGTH })
    .withMessage(messages.invalidLength)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("country")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("location")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .custom((value) => {
      if (!value?.coordinates?.length) {
        throw createError(
          400,
          messages.invalidDataType("location.coordinates")
        );
      }
      if (value?.coordinates?.length !== 2) {
        throw createError(400, messages.invalidFormat("coordinates"));
      }
      value?.coordinates.forEach((item) => {
        if (typeof item !== "number") {
          throw createError(400, messages.invalidFormat("coordinates"));
        }
      });
      return true;
    }),
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
let usernameAvailabilityValidation = [param("username").exists()];

const update = [
  body("firstName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("lastName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("username")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("telephoneNumber")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .matches(dataConstraint.PHONE_NUMBER_REGEX)
    .withMessage(messages.invalidFormat("PhoneNumber"))
    .optional(),
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .matches(dataConstraint.EMAIL_REGEX)
    .withMessage(messages.invalidFormat("Email"))
    .optional(),
  body("existingPassword")
    .isLength({ min: dataConstraint.PASSWORD_MIN_LENGTH })
    .withMessage(messages.invalidLength)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("password").custom((value, { req }) => {
    const { existingPassword } = req.body;
    if (value && !existingPassword) {
      throw new Error(messages.missingExistingPassword);
    }
    if (value && value.length < dataConstraint.PASSWORD_MIN_LENGTH) {
      throw new Error(messages.invalidLength);
    }
    return true;
  }),
  body("languages")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isInt()
    .withMessage(messages.invalidDataType("Integer"))
    .optional(),
  body("birthDate")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isDate()
    .withMessage(messages.invalidDataType("Date"))
    .optional(),
  body("businessName")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("websiteUrl")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
];

const getById = [...validators.common.paramMongoId()];
const getList = [...validators.common.pagination, ...validators.common.sort];

module.exports = {
  signUpPayloadValidation,
  signInPayloadValidation,
  emailPayloadValidation,
  resetPasswordPayload,
  verifyCodePayloadValidation,
  resendCodePayloadValidation,
  usernameAvailabilityValidation,
  update,
  getById,
  getList,
};
