import Joi from "joi";

export const auth_utils = {
  schemaSignup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  }),
  schemaSignin: Joi.object({
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
  }),
  schemaChangePassword: Joi.object({
    new_password: Joi.string().required(),
    confirm_new_password: Joi.string()
      .valid(Joi.ref("new_password"))
      .required(),
  }),
  schemaForgotPassword: Joi.object({
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
  }),
  schemaResetPassword: Joi.object({
    new_password: Joi.string().required(),
    confirm_new_password: Joi.string()
      .valid(Joi.ref("new_password"))
      .required(),
  }),
};
