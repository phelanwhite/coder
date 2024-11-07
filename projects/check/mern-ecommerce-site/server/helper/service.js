import jwt from "jsonwebtoken";
import env from "../config/env-config.js";
import Joi from "joi";

export const authService = {
  generateToken: (data, expiresIn) => {
    const token = jwt.sign({ ...data }, env.JWT_SECRET, {
      expiresIn: expiresIn || "1d",
    });
    return token;
  },
  schemaRegister: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }),
  schemaLogin: Joi.object({
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
  }),
  schemaChangePassword: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
  }),
};
