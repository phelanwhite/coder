import express from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import cryptojs from "crypto-js";
import { StatusCodes } from "http-status-codes";
import { auth_utils } from "../../utils/auth.js";
import userModel from "../../models/user.model.js";
import { handleResponse } from "../../helpers/responses.js";
import { token_utils } from "../../utils/token.js";
import { cookies_utils } from "../../utils/cookie.js";
import { verifyToken } from "../../middlewares/verifyToken.middleware.js";
import ENV_CONFIG from "../../configs/env-config.js";
import { mail_services } from "../../services/mail.js";
import upload from "../../configs/multer-config.js";
import storage_utils from "../../services/storage.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
  try {
    const body = req.body;

    // validate
    const validate = auth_utils.schemaSignup.validate(body);
    if (validate.error) {
      throw createHttpError.BadRequest(validate.error.message);
    }

    // check exists user
    const userExists = await userModel.findOne({
      email: body.email,
    });
    if (userExists) {
      throw createHttpError.Conflict("Email already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // create user
    const newUser = await userModel.create({
      ...body,
      password: hashedPassword,
    });

    mail_services.sendMailWelcome({ to: newUser.email });

    // return
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
});
authRouter.post("/signin", async (req, res, next) => {
  try {
    const body = req.body;

    // validate
    const validate = auth_utils.schemaSignin.validate(body);
    if (validate.error) {
      throw createHttpError.BadRequest(validate.error.message);
    }

    // check exists user
    const userExists = await userModel.findOne({
      email: body.email,
    });
    if (!userExists) {
      throw createHttpError.NotFound("Invalid email or password");
    }

    // check password
    const isMatchPassword = await bcrypt.compare(
      body.password,
      userExists.password
    );
    if (!isMatchPassword) {
      throw createHttpError.NotFound("Invalid email or password");
    }

    // save token in cookie
    const access_token = token_utils.generateToken({
      _id: userExists._id,
      role: userExists.role,
    });
    cookies_utils.saveCookie(res, {
      name: "access_token",
      value: access_token,
    });

    // return
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User signed in successfully",
      data: {
        user: userExists,
        access_token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
});
authRouter.delete("/signout", async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("connect.sid");
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});
authRouter.put(`/change-password`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    // validate data
    const validate = auth_utils.schemaChangePassword.validate(body);
    if (validate.error) {
      throw createHttpError.BadRequest(validate.error.message);
    }

    // hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(body.new_password, salt);

    // update password
    await userModel.findByIdAndUpdate(
      user?._id,
      { password: hashedPassword },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
});
authRouter.put(
  `/update-me`,
  upload.single("file"),
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const file = req.file;

      let avatar = body.avatar;
      if (file) {
        avatar = await storage_utils.cloudinary.uploadImageFile(file);
      }

      const updateData = await userModel.findByIdAndUpdate(user._id, {
        ...body,
        avatar,
      });

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Profile updated successfully",
        data: updateData,
      });
    } catch (error) {
      next(error);
    }
  }
);
authRouter.put(`/forgot-password`, async (req, res, next) => {
  try {
    const body = req.body;

    // validate data
    const validate = auth_utils.schemaForgotPassword.validate(body);
    if (validate.error) {
      throw createHttpError.BadRequest(validate.error.message);
    }

    //token
    const resetPasswordToken = await cryptojs.SHA256(body.email).toString();
    const resetPasswordExpires = Date.now() + 60 * 1000; // 1 minute

    // update user
    await userModel.findOneAndUpdate(
      { email: body.email },
      {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: resetPasswordExpires,
      },
      { new: true }
    );

    // send email with link
    const makeLink =
      ENV_CONFIG.URL.URL_CLIENT + `/reset-password/` + resetPasswordToken;

    mail_services.sendMailForgotPassword({ to: body.email, data: makeLink });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Reset password link sent successfully",
    });
  } catch (error) {
    next(error);
  }
});
authRouter.put(`/reset-password/:token`, async (req, res, next) => {
  try {
    const token = req.params.token;
    const body = req.body;

    // validate data
    const validate = auth_utils.schemaResetPassword.validate(body);
    if (validate.error) {
      throw createHttpError.BadRequest(validate.error.message);
    }

    // check exists user
    const userExists = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!userExists) {
      throw createHttpError.NotFound("Invalid email address");
    }

    // hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(body.new_password, salt);

    // update password
    await userModel.findOneAndUpdate(
      {
        resetPasswordToken: token,
      },
      {
        password: hashedPassword,
        resetPasswordToken: "",
        resetPasswordExpires: "",
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
