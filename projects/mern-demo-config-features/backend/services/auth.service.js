import Joi from "joi";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import envConfig from "../configs/env.config.js";

// validate
export const signup_validate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
  password: Joi.string().required(),
  cf_password: Joi.string().required(),
});
export const signin_validate = Joi.object({
  email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
  password: Joi.string().required(),
});
export const forgot_password_validate = Joi.object({
  email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
});
export const reset_password_validate = Joi.object({
  password: Joi.string().required(),
  cf_password: Joi.string().required(),
});

// generate jwt
export const generateToken = async (token, res) => {
  const accessToken = jwt.sign({ ...token }, envConfig.JWT_SECRET, {
    expiresIn: envConfig.JWT_EXPIRE,
  });
  const refreshToken = jwt.sign({ ...token }, envConfig.JWT_REFRESH_SECRET, {
    expiresIn: envConfig.JWT_REFRESH_EXPIRE,
  });
  // save refreshToken in database and cookie
  res.cookie(`refreshToken`, refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    // secure:true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    // maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  await userModel.findByIdAndUpdate(token._id, { refreshToken }, { new: true });

  return { accessToken, refreshToken };
};
