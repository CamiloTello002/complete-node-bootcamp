const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
  });
  // 2) Define email options
  const localOptions = {
    from: '"Mi hija querida" <emily2033@gmail.com>', // sender address
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: '<b>Hello world?</b>', // html body
  };
  // 3) Deliver the message
  await transporter.sendMail(localOptions);
};

module.exports = sendEmail;
