import jwt from "jsonwebtoken";
import env from "../configs/env-config.js";
import Joi from "joi";

// auth
export const authService = {
  generateToken: (data, expiresIn) => {
    const token = jwt.sign({ ...data }, env.JWT.JWT_SECRET, {
      expiresIn: expiresIn || "3d",
    });
    return token;
  },
  generateRefreshToken: (data, expiresIn) => {
    const token = jwt.sign({ ...data }, env.JWT.JWT_REFRESH_SECRET, {
      expiresIn: expiresIn || "30d",
    });
    return token;
  },
  schemaSignup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }),
  schemaSignin: Joi.object({
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
  }),
  schemaChangePassword: Joi.object({
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
  }),
};

// cookies
export const cookiesService = {
  saveCookies: (res, { name, data, maxAge }) => {
    res.cookie(name, data, {
      httpOnly: true,
      // secure:true,
      sameSite: "strict",
      maxAge: maxAge || 1000 * 60 * 60 * 24 * 3,
    });
  },
};
