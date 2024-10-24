import joi from "joi";
export const authValidate = {
  signup: (data) => {
    const schema = joi.object({
      name: joi.string().required(),
      email: joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
      password: joi.string().min(6).required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
    });
    return schema.validate(data);
  },
  signin: (data) => {
    const schema = joi.object({
      email: joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
      password: joi.string().min(6).required(),
    });
    return schema.validate(data);
  },
  changePassword: (data) => {
    const schema = joi.object({
      newPassword: joi.string().min(6).required(),
      confirmPassword: joi.string().valid(joi.ref("newPassword")).required(),
    });
    return schema.validate(data);
  },
  resetPassword: (data) => {
    const schema = joi.object({
      token: joi.string(),
      newPassword: joi.string().min(6).required(),
      confirmPassword: joi.string().valid(joi.ref("newPassword")).required(),
    });
    return schema.validate(data);
  },
};
