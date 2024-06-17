import nodemailer from "nodemailer";
import envConfig from "./env.config.js";

export function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envConfig.GOOGLE_EMAIL,
      pass: envConfig.GOOGLE_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
