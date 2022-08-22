
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(addressee, title, message, html) {
  const msg = {
    to: addressee, // Destinatario
    from: process.env.SENDER_EMAIL, // Email del sender. Podemos crear uno.
    subject: title,
    text: message,
    html: html
  };

  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  });
};

module.exports = {
  sendEmail
}