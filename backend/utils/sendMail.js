// utils/email.js
import nodemailer from 'nodemailer';

const sendMail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CAR Rent Team" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log('Mail sent successfully');
  } catch (err) {
    console.error('Mail sending failed:', err);
  }
};

export default sendMail;
