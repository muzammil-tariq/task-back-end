const { SENDGRID_APIKEY } = process.env;

sgMail.setApiKey(SENDGRID_APIKEY);

async function sendEmail(msg) {
  await sgMail.send(msg).catch((error) => {
    console.log(error.message);
  });
}

exports.customerSignup = async function ({ user, verificationCode }) {
  await sendEmail(emailConstraints.signup({ user, verificationCode }));
};

exports.customerEventSubmittal = async function ({ user }) {
  await sendEmail(emailConstraints.customerEventSubmittal({ user }));
};

exports.customerBooking = async function ({ user }) {
  await sendEmail(emailConstraints.customerBooking({ user }));
};

exports.vendorSignup = async function ({ user, verificationCode }) {
  await sendEmail(emailConstraints.vendorSignup({ user, verificationCode }));
};

exports.vendorApproval = async function ({ user }) {
  await sendEmail(emailConstraints.vendorApproval({ user }));
};

exports.vendorReceivingQuotes = async function ({ user, link }) {
  await sendEmail(emailConstraints.vendorReceivingQuotes({ user, link }));
};

exports.vendorBooking = async function ({ user }) {
  await sendEmail(emailConstraints.vendorBooking({ user }));
};

exports.verificationCode = async function ({ user, verificationCode }) {
  await sendEmail(
    emailConstraints.verificationCode({ user, verificationCode })
  );
};

exports.forgotPassword = async function ({ user }) {
  await sendEmail(emailConstraints.forgotPassword({ user }));
};
