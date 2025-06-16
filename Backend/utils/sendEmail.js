import {configDotenv} from 'dotenv'
configDotenv()
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in", 
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD
  }
});

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Omnexa Global Trade" <${process.env.ZOHO_EMAIL}>`,
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
