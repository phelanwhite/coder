import createHttpError from "http-errors";
import express from "express";
import bcryptjs from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { handleResponse } from "../helper/response.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../config/cloudinary-config.js";
import upload from "../config/multer-config.js";
import userModel from "../model/user.js";
import { authService } from "../helper/service.js";

const authRouter = express.Router();

authRouter.post(`/register`, async (req, res, next) => {
  try {
    const body = req.body;

    // validate data
    const authValidate = authService.schemaRegister.validate(body);
    if (authValidate.error) {
      throw createHttpError(authValidate.error.message);
    }

    // check exists user
    const existsUser = await userModel.findOne({ email: body.email });
    if (existsUser) {
      throw createHttpError("User already exists");
    }

    // hash passwords
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(body.password, salt);

    // create user
    await userModel.create({
      ...body,
      password: hashedPassword,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post(`/login`, async (req, res, next) => {
  try {
    const body = req.body;

    // validate data
    const authValidate = authService.schemaLogin.validate(body);
    if (authValidate.error) {
      throw createHttpError(authValidate.error.message);
    }

    // check exists user
    const existsUser = await userModel.findOne({ email: body.email });
    if (!existsUser) {
      throw createHttpError("Invalid email or password");
    }

    // check password
    const isMatch = await bcryptjs.compare(body.password, existsUser.password);
    if (!isMatch) {
      throw createHttpError("Invalid email or password");
    }

    // create token and save token to cookie
    const token = authService.generateToken({
      _id: existsUser._id,
      role: existsUser.role,
    });

    res.cookie(`token`, token, {
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User logged in successfully",
      data: existsUser,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.put(
  "/update-profile",
  upload.single("file"),
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;

      const files = req.file;
      let avatar = body.avatar;

      if (files) {
        avatar = (await cloudinary_uploadImageFile(files))?.secure_url;
        await cloudinary_deleteFile(body.avatar);
      }

      const updateData = await userModel.findByIdAndUpdate(
        user?._id,
        {
          ...body,
          avatar,
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

authRouter.put(`/change-password`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const getUser = await userModel.findById(user._id);

    // validate data
    const authValidate = authService.schemaChangePassword.validate(body);
    if (authValidate.error) {
      throw createHttpError(authValidate.error.message);
    }

    // check old password
    const isMatch = await bcryptjs.compare(body.oldPassword, getUser.password);
    if (!isMatch) {
      throw createHttpError("Invalid old password");
    }

    // hash new password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(body.newPassword, salt);

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
    const profile = await userModel.findById(user?._id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User fetched successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.delete("/signout", async (req, res, next) => {
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

export default authRouter;
