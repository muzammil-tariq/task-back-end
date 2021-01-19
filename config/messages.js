module.exports = {
  generalError: "Something went wrong.",
  invalidLogin: "Invalid email or password",
  InvalidToken: "Invalid token.",
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
  invalidId: "Invalid Id!",
  invalidQuery: (param) => {
    return `Query param ${param} cannot be empty`;
  },
};
