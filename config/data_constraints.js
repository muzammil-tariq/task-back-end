const passwordMinimumLength = 8;
const oneHour = 60 * 60 * 1000;

module.exports = {
  PASSWORD_MIN_LENGTH: passwordMinimumLength,
  PHONE_NUMBER_REGEX:
    /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
  EMAIL_REGEX:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  CODE_EXPIRY_TIME: oneHour,
  PAGINATION_LIMIT: 10,
  CURRENT_PAGE: 1,
  MULTER_LIMIT_CODE: "LIMIT_UNEXPECTED_FILE",
  attachmentsLimit: 5,
  URL_REGEX:
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
};
