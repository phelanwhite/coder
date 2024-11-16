import ENV_CONFIG from "../configs/env-config.js";
import transporter from "../configs/nodemailer-config.js";
import teamplate from "../helpers/teamplate.js";

export const mail_services = {
  sendMailWelcome: ({ to }) => {
    const message = teamplate.emailWelcome();
    var mailOptions = {
      from: ENV_CONFIG.EMAIL.EMAIL_USER,
      to: to,
      subject: message.subject,
      html: message.html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },

  sendMailForgotPassword: ({ to, data }) => {
    const message = teamplate.emailForgotPassword(data);

    var mailOptions = {
      from: ENV_CONFIG.EMAIL.EMAIL_USER,
      to: to,
      subject: message.subject,
      html: message.html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
