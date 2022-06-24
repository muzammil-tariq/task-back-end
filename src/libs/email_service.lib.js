const { SENDGRID_APIKEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_APIKEY);

async function sendEmail(msg) {
  await sgMail.send(msg).catch((error) => {
    console.log(error.message);
  });
}

exports.emailCustomerSignup = async function (user, verificationCode) {
  await sendEmail(emailConstraints.signup({ user, verificationCode }));
};

exports.emailCustomerEventSubmittal = async function (user) {
  await sendEmail(emailConstraints.customerEventSubmittal({ user }));
};

exports.emailCustomerBooking = async function (user) {
  await sendEmail(emailConstraints.customerBooking({ user }));
};

exports.emailVendorSignup = async function (user, verificationCode) {
  await sendEmail(emailConstraints.vendorSignup({ user, verificationCode }));
};

exports.emailVendorApproval = async function (user, verificationCode) {
  await sendEmail(emailConstraints.vendorApproval({ user, verificationCode }));
};

exports.emailVendorReceivingQuotes = async function (user, verificationCode) {
  await sendEmail(
    emailConstraints.vendorReceivingQuotes({ user, verificationCode })
  );
};

exports.emailvendorBooking = async function (user, verificationCode) {
  await sendEmail(emailConstraints.vendorBooking({ user, verificationCode }));
};

exports.sendEmail = async function (user) {
  const msg = {
    to: user.email,
    from: EMAIL_FROM,
    subject: "Subject",
    text: "verification code",
    html: "Your verification code is " + user.verificationCode,
  };

  var sgResp = await sgMail.send(msg).catch((error) => {
    console.error(error.message);
  });
  console.log(sgResp);
};
