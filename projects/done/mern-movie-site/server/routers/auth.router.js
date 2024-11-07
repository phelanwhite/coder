import express from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import upload from "../configs/multer-config.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { handleResponse } from "../helpers/responses.js";
import { authService, cookiesService } from "../helpers/services.js";
import userModel from "../models/user.model.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../configs/cloudinary-config.js";
import env from "../configs/env-config.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
  try {
    const body = req.body;

    // validate
    const authValidate = authService.schemaSignup.validate(body);
    if (authValidate.error) {
      throw createHttpError.BadRequest(authValidate.error.message);
    }

    // check exists user
    const userExists = await userModel.findOne({ email: body.email });
    if (userExists) {
      throw createHttpError.Conflict("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(body.password, salt);

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

authRouter.post(`/signin`, async (req, res, next) => {
  try {
    const body = req.body;

    // validate data
    const authValidate = authService.schemaSignin.validate(body);
    if (authValidate.error) {
      throw createHttpError.BadRequest(authValidate.error.message);
    }

    // check exists user
    const userExists = await userModel.findOne({ email: body.email });
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
    const access_token = authService.generateToken({
      _id: userExists._id,
      role: userExists.role,
    });

    cookiesService.saveCookies(res, {
      name: "access_token",
      data: access_token,
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

authRouter.put(
  "/update-profile",
  upload.single("file"),
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;

      const file = req.file;

      let avatar = body.avatar;

      if (file) {
        avatar = (await cloudinary_uploadImageFile(file))?.secure_url;
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
      throw createHttpError.BadRequest(authValidate.error.message);
    }

    // hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);

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

authRouter.post(`/refresh-token`, verifyToken, async (req, res, next) => {
  try {
    const refresh_token_cookie = req.cookies.refresh_token;

    jwt.verify(
      refresh_token_cookie,
      env.JWT.JWT_REFRESH_SECRET,
      (error, decode) => {
        if (error) {
          throw createHttpError.Unauthorized(error.message);
        }
        // save token in cookie
        const access_token = authService.generateToken({
          _id: userExists._id,
          role: userExists.role,
        });
        const refresh_token = authService.generateToken(
          {
            _id: userExists._id,
            role: userExists.role,
          },
          `30d`
        );

        cookiesService.saveCookies(res, {
          name: "access_token",
          data: access_token,
        });
        cookiesService.saveCookies(res, {
          name: "refresh_token",
          data: refresh_token,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        return handleResponse(res, {
          status: StatusCodes.OK,
          message: "Token refreshed successfully",
        });
      }
    );
  } catch (error) {
    next(error);
  }
});

authRouter.get(`/get-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const getUser = await userModel.findById(user?._id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User fetched successfully",
      data: getUser,
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

export default authRouter;
