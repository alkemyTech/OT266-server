
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(addressee, title, message, html) { 
  
  let dataTitle = html.replace('T&iacute;tulo',title);
  let dataBody = dataTitle.replace('Texto del email',message);
  let dataOrg = dataBody.replace('Datos de contacto de ONG',
  `Datos de contacto de ONG:
  ● Mail: somosfundacionmas@gmail.com
  ● Instagram: SomosMás
  ● Facebook: Somos_Más
  ● Teléfono de contacto: 1160112988`);
  
  const msg = {
    to: addressee, // Destinatario
    from: process.env.SENDER_EMAIL, // Email del sender. Podemos crear uno.
    subject: title,
    text: message,
    html: dataOrg
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