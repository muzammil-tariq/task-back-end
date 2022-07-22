const { body, param } = expressValidator;
let signUpPayloadValidation = [
  body("fullName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
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
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .isLength({ min: dataConstraint.PASSWORD_MIN_LENGTH })
    .withMessage(messages.invalidLength),
  body("businessCriteria")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .isIn(["licensed", "bonded", "insured"])
    .optional(),
  body("dateOfRegisteration")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isDate()
    .withMessage(messages.invalidDataType("Date"))
    .custom((value) => {
      const date = new Date();
      if (new Date(value) > date) {
        throw new Error(messages.futureDate);
      }
      return true;
    })
    .optional(),
  body("birthDate")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isDate()
    .withMessage(messages.invalidDataType("Date"))
    .custom((value) => {
      const date = new Date();
      if (new Date(value) > date) {
        throw new Error(messages.futureDate);
      }
      return true;
    })
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
    .matches(dataConstraint.URL_REGEX)
    .withMessage(messages.invalidFormat("WebsiteUrl"))
    .optional(),
  body("gender")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .isIn(["male", "female", "non-binary", "no-answer"])
    .optional(),
  body("languages")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isArray()
    .withMessage(messages.invalidDataType("Array"))
    .optional(),
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
    .withMessage(messages.invalidLogin)
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
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isEmail()
    .withMessage(messages.invalidEmail),
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
let featurePayloadValidation = [
  param("id").exists(),
  body("isFeatured")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .isBoolean()
    .withMessage(messages.invalidDataType("Boolean")),
];
let businessInfoValidation = [
  body("facebookUrl")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .matches(dataConstraint.URL_REGEX)
    .withMessage(messages.invalidFormat("facebookUrl"))
    .optional(),
  body("instagramUrl")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .matches(dataConstraint.URL_REGEX)
    .withMessage(messages.invalidFormat("instagramUrl"))
    .optional(),
  body("twitterUrl")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .matches(dataConstraint.URL_REGEX)
    .withMessage(messages.invalidFormat("twitterUrl"))
    .optional(),
  body("contactName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("contactTitle")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("contactEmail")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .matches(dataConstraint.EMAIL_REGEX)
    .withMessage(messages.invalidFormat("Email"))
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("contactPhoneNumber")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .matches(dataConstraint.PHONE_NUMBER_REGEX)
    .withMessage(messages.invalidFormat("PhoneNumber")),
  body("serviceDescription")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("businessType")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("virtualEvents")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isBoolean()
    .withMessage(messages.invalidDataType("Boolean")),
];

let addressInfoValidation = [
  body("convictedFelony")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isBoolean()
    .withMessage(messages.invalidDataType("Boolean")),
  body("felonyDescription")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .optional(),
  body("minorityEligibility")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isArray()
    .withMessage(messages.invalidDataType("Array"))
    .optional(),
  body("businessAddress")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("city")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("state")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
];

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
    .isArray()
    .withMessage(messages.invalidDataType("Array"))
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

const favourited = [...validators.common.bodyMongoId("vendorId")];

let updateAccountStatus = [
  validators.common.paramMongoId(),
  body("status")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .isIn(Object.values(models.Vendors.status)),
];
let updateAccountStatusBulk = [
  body("ids")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isArray()
    .withMessage(messages.invalidDataType("Array")),
  ...validators.common.bodyMongoId("ids.*"),
  body("status")
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .isIn(Object.values(models.Vendors.status)),
];

module.exports = {
  signUpPayloadValidation,
  signInPayloadValidation,
  emailPayloadValidation,
  resetPasswordPayload,
  verifyCodePayloadValidation,
  resendCodePayloadValidation,
  businessInfoValidation,
  addressInfoValidation,
  update,
  favourited,
  featurePayloadValidation,
  updateAccountStatus,
  updateAccountStatusBulk,
};
