import express from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import { authValidate } from "../helper/validate.js";
import userModel from "../model/user.js";
import { handleResponse } from "../helper/response.js";
import { authService } from "../helper/service.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../config/multer-config.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../config/cloudinary-config.js";
import jwt from "jsonwebtoken";
import env from "../config/env-config.js";
import { sendEmailForgotPassword } from "../helper/email.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
  try {
    const body = req.body;
    const schema = authValidate.signup(body);
    if (schema.error) {
      throw new createHttpError(schema.error.message);
    }

    const userExists = await userModel.findOne({
      email: body.email,
    });
    if (userExists) {
      throw new createHttpError(409, "Email already exists");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await userModel.create({
      ...body,
      password: hashedPassword,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/signin", async (req, res, next) => {
  try {
    const body = req.body;
    const schema = authValidate.signin(body);
    if (schema.error) {
      throw new createHttpError(schema.error.message);
    }

    const userExists = await userModel.findOne({
      email: body.email,
    });
    if (!userExists) {
      throw createHttpError.NotFound("Invalid email or password");
    }

    const matchPassword = await bcrypt.compare(
      body.password,
      userExists.password
    );
    if (!matchPassword) {
      throw createHttpError.NotFound("Invalid email or password");
    }

    // save token in cookie
    const token = authService.generateToken({
      _id: userExists._id,
      role: userExists.role,
    });
    res.cookie(`token`, token, {
      httpOnly: true,
      // secure:true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 1,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User signed in successfully",
      data: userExists,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.delete("/signout", (req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("connect.sid");
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.put(
  "/update-profile",
  verifyToken,
  upload.single(`file`),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;

      let avatar = body.avatar;
      if (req.file) {
        avatar = (await cloudinary_uploadImageFile(req.file)).secure_url;
        await cloudinary_deleteFile(body.avatar);
      }

      const data = await userModel.findByIdAndUpdate(
        user._id,
        { ...body, avatar },
        { new: true }
      );

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Profile updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.put(`/forgot-password`, async (req, res, next) => {
  try {
    const body = req.body;
    const userExists = await userModel.findOne({ email: body.email });
    if (!userExists) {
      throw new createHttpError(404, "User not found");
    }
    const token = authService.generateToken(
      userExists._id + Math.random().toString(),
      `3m`
    );
    await userModel.findOneAndUpdate({
      email: body.email,
      tokenResetPassword: token,
    });
    sendEmailForgotPassword(
      body.email,
      env.PORT_CLIENT + "/reset-password/" + token
    );
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "The password reset link has been sent to your email",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.put(`/reset-password`, async (req, res, next) => {
  try {
    const body = req.body;
    const schema = authValidate.resetPassword(body);
    if (schema.error) {
      throw new createHttpError(schema.error.message);
    }

    jwt.verify(body.token, env.JWT_SECRET, (error, decode) => {
      if (error) throw new createHttpError(error.message);
    });

    const userExists = await userModel.findOne({
      tokenResetPassword: body.token,
    });
    if (!userExists) {
      throw new createHttpError(404, "User not found");
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);
    await userModel.findOneAndUpdate(
      {
        tokenResetPassword: body.token,
      },
      {
        password: hashedPassword,
        tokenResetPassword: "",
      }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.put("/change-password", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;

    const schema = authValidate.changePassword(body);
    if (schema.error) {
      throw new createHttpError(schema.error.message);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);

    const data = await userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Password changed successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
