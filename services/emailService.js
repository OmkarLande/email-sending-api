const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendEmail(user) {
  try {
    const info = await transporter.sendMail({
      from: 'SkillHive',
      to: user.email,
      subject: 'Welcome to MathonGo!',
      html: `Hey ${user.name}!<br><br>
        Thank you for signing up with your email ${user.email}.<br>
        We have received your city as ${user.customProperties.city}.<br><br>
        Team MathonGo.`,
    });
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

module.exports = {sendEmail};
