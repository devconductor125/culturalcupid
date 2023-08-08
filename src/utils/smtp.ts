import nodemailer from "nodemailer";
import { getSmtpInfo } from "./credentials";

export const sendEmail = async (to, subject, text) => {
  try {
    const smtpInfo = await getSmtpInfo();

    const transporter = nodemailer.createTransport({
      host: smtpInfo.smtpHost,
      port: Number(smtpInfo.smtpPort),
      secure: false,
      auth: {
        user: smtpInfo.smtpUsername,
        pass: smtpInfo.smtpPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: smtpInfo.smtpSenderMail,
      to: to,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
