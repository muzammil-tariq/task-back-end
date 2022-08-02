module.exports = {
  generalError: "Something went wrong.",
  invalidLogin: "Invalid email or password",
  InvalidToken: "Invalid token.",
  invalidModel: "Invalid model type",
  created: (name) => {
    return `${name} has been created successfully!`;
  },
  signedIn: "You have been signed in successfully",
  updatedModel: (model) => {
    return `${model} has been updated successfully!`;
  },
  userExists: "This user already exists!",
  invalidPayload: "Invalid payload",
  userNotFound: "Couldn't find your Account",
  success: "Success!",
  notFound: (model) => {
    return `${model} does not exist!`;
  },
  verified: "Email verified successfully",
  notVerified: "Email not verified",
  invalidCode: "Invalid code",
  alreadyVerified: "Your Email is already verified",
  resendCode: "verification code has been sent to you again",
  SocialSignInMessage: (provider) => {
    return `You have been signed In successfully using ${provider}`;
  },
  SocialSignUpMessage: (provider) => {
    return `You have been registered successfully using ${provider}`;
  },
  badRequest: "Bad request",
  notPresent: "Not present in the payload",
  invalidFormat: (service) => {
    return `Invalid ${service} Format`;
  },
  invalidLength: "Invalid Length!",
  notEmpty: "This field must not be empty!",
  invalidDataType: (val) => {
    return `Please provide valid ${val}!`;
  },
  emailExists: "Email already exists!",
  sessionExpiry: "Session has been expired!",
  updateAttr: (attr) => {
    return `${attr} has been updated successfully!`;
  },
  codeExpried: "Your code has been expired!",
  invalidEmail: "invalid email",
  invalidEmailOrPassword: "invalid email or password",
  missingExistingPassword: "You must provide existing password",
  invalidPassword: "You have entered an invalid password",
  samePassword: "New password can not be same as old password",
  sameEmail: "New email can not be same as old email",
  invalidId: "Invalid Id!",
  invalidQuery: (param) => {
    return `Query param ${param} cannot be empty`;
  },
  filesLengthExceeded: "File Limit Exceeded",
  missingAttr: (attr) => {
    return `${attr} is missing in the payload`;
  },
  missingStep: (step) => {
    return `Complete ${step} first to continue!`;
  },
  alreadyExists: (attr) => {
    return `${attr} already exists!`;
  },
  bookingNotCompleted: "Can't mark booking as completed yet",
  cantAddReview:
    "You can't add review without paying the amount and completing the booking",
  usernameAlreadyInUse: "This username is already in use",
  eventAlreadyExists: "Event already scheduled at this time. Try another slot!",
  eventNotForThisCustomer: "Event does not belong to this customer",
  pastDate: "Past date is not allowed!",
  futureDate: "Future date is not allowed!",
  timeLessThanOrEqual: (date) => `Should not be less than or equal to ${date}`,
  forbidden: "You do not have enough privileges to perform this action",
  paypalNotConnected: "Paypal is not connected",
  paypalAlreadyConnected: "Paypal is already connected",
  alreadyPaid: "You have already paid for this booking",
  vendorRequestPending: "Your profile is being reviewed",
  vendorRequestRejected: "Your request has been rejected",
  vendorRequestSuspended: "Your account has been suspended",
  criteriaDidNotMatch:
    "Criteria din't match! you can't request a free quote to this vendor",
};
