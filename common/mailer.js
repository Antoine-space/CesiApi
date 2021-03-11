const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.HOST_MAILER, // HOST_MAILER=smtp.gmail.com
  port: process.env.PORT_MAILER, // PORT_MAILER=587
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_MAILER, // generated ethereal user
    pass: process.env.PASSWORD_MAILER, // generated ethereal password
  },
});



const sendEmail = async (to, subject) => {
  let info = await transporter.sendMail({
    from: process.env.EMAIL_MAILER,
    to: to,
    subject: subject,
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });
  return info;
};



module.exports = { sendEmail };