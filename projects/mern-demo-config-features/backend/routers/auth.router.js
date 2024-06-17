import express from "express";
import createHttpError from "http-errors";
import bcryptjs from "bcryptjs";
import cryptojs from "crypto-js";
import jwt from "jsonwebtoken";
import { responseHandle } from "../helpers/commons.js";
import { StatusCodes } from "http-status-codes";
import userModel from "../models/user.model.js";
import envConfig from "../configs/env.config.js";
import { templateForgotPassword } from "../helpers/tempalte.js";
import { sendEmail } from "../configs/email.config.js";
import {
  signup_validate,
  forgot_password_validate,
  reset_password_validate,
  signin_validate,
  generateAccessToken,
  generateRefreshToken,
} from "../services/auth.service.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import multerConfig from "../configs/multer.config.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadFile,
} from "../configs/cloudinary.config.js";

const clientURL = `http://localhost:3000`;

const authRouter = express.Router();
authRouter.post(`/signup`, async (req, res, next) => {
  try {
    const body = req.body;
    const schema = signup_validate.validate(body);
    if (schema.error) {
      throw createHttpError(schema.error.message);
    }

    if (body.password !== body.cf_password) {
      throw createHttpError(`Passwords do not match`);
    }

    const userExists = await userModel.findOne({ email: body.email });
    if (userExists) {
      throw createHttpError(`User already exists`);
    }

    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(body.password, salt);

    await userModel.create({ ...body, password: hashPassword });

    return responseHandle(res, {
      status: StatusCodes.CREATED,
      message: `Signup successfully`,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post(`/signin`, async (req, res, next) => {
  try {
    const body = req.body;
    const schema = signin_validate.validate(body);
    if (schema.error) {
      throw createHttpError(schema.error.message);
    }

    const userExists = await userModel
      .findOne({ email: body.email })
      .select([`-resetPasswordToken`, `-refreshToken`]);
    if (!userExists) {
      throw createHttpError(`User does not exists`);
    }

    const checkPassword = await bcryptjs.compare(
      body.password,
      userExists.password
    );
    if (!checkPassword) {
      throw createHttpError("Invalid email or password");
    }

    const accessToken = await generateAccessToken({
      _id: userExists._id,
      role: userExists.role,
    });
    const refreshToken = await generateRefreshToken(
      { _id: userExists._id },
      res
    );

    return responseHandle(res, {
      status: StatusCodes.OK,
      message: `Signin successfully`,
      result: { data: userExists, accessToken },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post(`/refresh-token`, async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;

    if (!refreshTokenCookie) {
      throw createHttpError.Forbidden(`Refresh token is required`);
    }
    jwt.verify(
      refreshTokenCookie,
      envConfig.JWT_REFRESH_SECRET,
      async function (err, decode) {
        if (err) {
          throw createHttpError.Unauthorized(err?.message);
        }

        const userExists = await userModel.findById(decode._id);

        const accessToken = await generateAccessToken({
          _id: userExists._id,
          role: userExists.role,
        });
        const refreshToken = await generateRefreshToken(
          { _id: userExists._id },
          res
        );

        return responseHandle(res, {
          status: StatusCodes.OK,
          message: `Refresh token successfully`,
          result: accessToken,
        });
      }
    );
  } catch (error) {
    next(error);
  }
});

authRouter.post(`/signout`, async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) {
      throw createHttpError.Forbidden(`Refresh token is required`);
    }

    jwt.verify(
      refreshTokenCookie,
      envConfig.JWT_REFRESH_SECRET,
      async function (err, decode) {
        if (err) {
          throw createHttpError.Unauthorized(err?.message);
        }
        // clear refreshToken in database and cookie
        await userModel.findByIdAndUpdate(
          decode?._id,
          { refreshToken: "" },
          { new: true }
        );
        res.clearCookie(`refreshToken`);

        return responseHandle(res, {
          status: StatusCodes.OK,
          message: `Signout successfully`,
        });
      }
    );
  } catch (error) {
    next(error);
  }
});

authRouter.post(`/forgot-password`, async (req, res, next) => {
  try {
    const body = req.body;
    const schema = forgot_password_validate.validate(body);
    if (schema.error) {
      throw createHttpError(schema.error.message);
    }

    const resetToken = await cryptojs.SHA256(body.email).toString();
    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(resetToken, salt);

    await userModel.findOneAndUpdate(
      { email: body.email },
      { resetPasswordToken: hashPassword },
      { new: true }
    );

    const link = `${clientURL}/reset-password?token=${hashPassword}`;

    sendEmail({
      from: envConfig.GOOGLE_EMAIL,
      to: body.email,
      subject: `Forgot Password`,
      html: templateForgotPassword(link),
    });

    return responseHandle(res, {
      status: StatusCodes.OK,
      message: `Forgot Password successfully`,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post(`/reset-password`, async (req, res, next) => {
  try {
    const token = req.query.token;
    const body = req.body;

    const schema = reset_password_validate.validate(body);
    if (schema.error) {
      throw createHttpError(schema.error.message);
    }

    if (body.password !== body.cf_password) {
      throw createHttpError(`Passwords do not match`);
    }

    const userExists = await userModel.findOne({ resetPasswordToken: token });
    if (!userExists) {
      throw createHttpError(`User does not exists`);
    }

    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(body.password, salt);

    await userModel.findOneAndUpdate(
      { resetPasswordToken: token },
      { password: hashPassword, resetPasswordToken: "" },
      { new: true }
    );

    return responseHandle(res, {
      status: StatusCodes.OK,
      message: `Reset Password successfully`,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get(`/get-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const userExists = await userModel.findById(user._id);

    return responseHandle(res, {
      status: StatusCodes.OK,
      result: userExists,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post(
  `/update-me`,
  verifyToken,
  multerConfig.single("file"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const file = req.file;

      let avatar = body.avatar;
      if (file) {
        avatar = (await cloudinary_uploadFile(file, `user`)).url;
        await cloudinary_deleteFile(body.avatar, `user`);
      }

      const userExists = await userModel.findOneAndUpdate(
        { _id: user._id },
        { ...body, avatar: avatar },
        { new: true }
      );

      return responseHandle(res, {
        status: StatusCodes.OK,
        message: `Update profile successfully`,
        result: userExists,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get(`/get-list-user`, async (req, res, next) => {
  try {
    const userExists = await userModel.find();

    return responseHandle(res, {
      status: StatusCodes.OK,
      result: userExists,
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
