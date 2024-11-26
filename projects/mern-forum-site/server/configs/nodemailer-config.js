import nodemailer from "nodemailer";
import ENV_CONFIG from "./env-config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV_CONFIG.EMAIL.EMAIL_USER,
    pass: ENV_CONFIG.EMAIL.EMAIL_PASSWORD,
  },
});

export default transporter;
