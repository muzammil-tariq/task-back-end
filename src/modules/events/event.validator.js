const { param, body } = expressValidator;

let addEventPayload = [
  body("title")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("type")
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
  body("scheduledDate")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .withMessage(messages.invalidDataType("Date"))
    .custom((value) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      if (new Date(value) < date) {
        throw new Error(messages.pastDate);
      }
      return true;
    }),
  body("location")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .isIn(["indoor", "outdoor", "virtual"]),
  body("venueName")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("venueAddress")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("numberOfPeople")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isInt()
    .withMessage(messages.invalidDataType("Integer")),
  body("startTime")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String")),
  body("endTime")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isString()
    .withMessage(messages.invalidDataType("String"))
    .custom((endTime, { req }) => {
      const { scheduledDate, startTime } = req.body;
      const startTimeDate = new Date(scheduledDate);
      const endTimeDate = new Date(scheduledDate);
      const [startTimeHours, startTimeMins] = startTime.split(":");
      const [endTimeHours, endTimeMins] = endTime.split(":");
      startTimeDate.setHours(startTimeHours, startTimeMins, 0, 0);
      endTimeDate.setHours(endTimeHours, endTimeMins, 0, 0);
      if (startTime >= endTime) {
        throw new Error(messages.timeLessThanOrEqual("startTime"));
      }
      return true;
    }),
];

module.exports = {
  addEventPayload,
};
