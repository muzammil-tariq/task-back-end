const { body, oneOf } = expressValidator;

let update = [
  oneOf([
    body("platformCommission")
      .exists()
      .withMessage(messages.notPresent)
      .notEmpty()
      .withMessage(messages.notEmpty)
      .isNumeric()
      .withMessage(messages.invalidDataType("Number"))
      .custom((value) => {
        if (Number(value) < 0) {
          throw new Error(messages.invalidPayload);
        }
        return true;
      }),
    body("eventRequestDistance")
      .exists()
      .withMessage(messages.notPresent)
      .notEmpty()
      .withMessage(messages.notEmpty)
      .isNumeric()
      .withMessage(messages.invalidDataType("Number"))
      .custom((value) => {
        if (Number(value) < 0) {
          throw new Error(messages.invalidPayload);
        }
        return true;
      }),
  ]),
];

module.exports = {
  update,
};
