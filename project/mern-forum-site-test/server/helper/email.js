import nodemailer from "nodemailer";
import env from "../config/env-config.js";
import { templateForgotPassword } from "./template.js";

export const sendEmail = (mailOptions) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const sendEmailForgotPassword = (email, link) => {
  const mailOptions = {
    from: env.EMAIL_USER,
    to: email,
    subject: "Sending Email using Node.js",
    html: templateForgotPassword(link),
  };
  sendEmail(mailOptions);
};
