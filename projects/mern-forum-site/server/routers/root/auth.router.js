import express from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import cryptojs from "crypto-js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { auth_utils } from "../../utils/auth.js";
import userModel from "../../models/user.model.js";
import { handleResponse } from "../../helpers/responses.js";
import { verifyToken } from "../../middlewares/verifyToken.middleware.js";
import ENV_CONFIG from "../../configs/env-config.js";
import { mail_services } from "../../services/mail.js";
import upload from "../../configs/multer-config.js";
import storage_utils from "../../services/storage.js";
import tokenModel from "../../models/token.model.js";

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
    const token = await auth_utils.generateTokenJWT({
      _id: userExists._id,
      role: userExists.role,
    });
    await auth_utils.saveTokenJWTToCookie(res, {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    });

    // return
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User signed in successfully",
      data: {
        user: userExists,
        access_token: token.access_token,
      },
    });
  } catch (error) {
    next(error);
  }
});
authRouter.delete("/signout", async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.clearCookie("connect.sid");
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});
authRouter.post("/refresh-token", async (req, res, next) => {
  try {
    const refresh_token_cookie = req.cookies.refresh_token;
    if (!refresh_token_cookie) {
      throw createHttpError.Forbidden("Invalid token");
    }

    jwt.verify(
      refresh_token_cookie,
      ENV_CONFIG.JWT.JWT_REFRESH_SECRET,
      async (err, decode) => {
        if (err) throw createHttpError.Forbidden(err.message);

        const tokenExists = await tokenModel.findOne({
          token: refresh_token_cookie,
        });

        if (!tokenExists) {
          throw createHttpError.Forbidden("Invalid token");
        }

        // save token in cookie and delete token in database
        const token = await auth_utils.generateTokenJWT({
          _id: decode._id,
          role: decode.role,
        });
        await auth_utils.saveTokenJWTToCookie(res, {
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        });
        await tokenModel.findOneAndDelete(
          {
            token: refresh_token_cookie,
          },
          { new: true }
        );

        return handleResponse(res, {
          status: StatusCodes.OK,
          message: "Token refreshed successfully",
          data: {
            access_token: token.access_token,
          },
        });
      }
    );
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
authRouter.get(`/get-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;

    const getData = await userModel.findById(user._id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User data fetched successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
authRouter.put(
  `/update-me`,
  upload.fields([
    {
      name: "avatarFile",
    },
    {
      name: "bannerFile",
    },
  ]),
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const files = req.files;

      const avatarFile = files?.avatarFile?.[0];
      const bannerFile = files?.bannerFile?.[0];

      let avatar = body?.avatar;
      let banner = body?.banner;

      if (avatarFile) {
        avatar = (await storage_utils.cloudinary.uploadImageFile(avatarFile))
          .url;
        await storage_utils.cloudinary.deleteFile(body?.avatar);
      }
      if (bannerFile) {
        banner = (await storage_utils.cloudinary.uploadImageFile(bannerFile))
          .url;
        await storage_utils.cloudinary.deleteFile(body?.banner);
      }

      const updateData = await userModel.findByIdAndUpdate(
        user._id,
        {
          ...body,
          avatar,
          banner,
        },
        { new: true }
      );

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
      ENV_CONFIG.URL.URL_WEBSITE + `/reset-password/` + resetPasswordToken;

    mail_services.sendMailForgotPassword({ to: body.email, data: makeLink });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Check your email",
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
