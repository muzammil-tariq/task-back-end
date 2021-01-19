const { SENDGRID_APIKEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_APIKEY);

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
