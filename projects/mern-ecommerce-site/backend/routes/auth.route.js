import express from "express";
import createHttpError from "http-errors";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

import userModel from "../models/user.model.js";
import env from "../configs/env.config.js";
import multerConfig from "../configs/multer.config.js";
import {
  cloudinary_uploadFile,
  cloudinary_deleteFile,
} from "../configs/cloudinary.config.js";

export const auth_signup = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(new RegExp("@gmail.com")).email().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().required(),
});
export const auth_signin = Joi.object({
  email: Joi.string().pattern(new RegExp("@gmail.com")).email().required(),
  password: Joi.string().required(),
});
export const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createHttpError.Unauthorized(`Invalid access token`);
    }
    jwt.verify(
      accessToken,
      env.jwt.JWT_ACCESS_TOKEN_SECRET,
      async (err, decode) => {
        if (err) {
          throw createHttpError.Conflict(err.message);
        }

        const userExists = await userModel.findById(decode?._id);
        if (!userExists) {
          throw createHttpError.Unauthorized(`Invalid access token`);
        }
        req.user = decode;
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

const authRoute = express.Router();

authRoute.post("/signup", async (req, res, next) => {
  try {
    const body = req.body;
    const schema = auth_signup.validate(body);
    if (schema.error) {
      throw createHttpError(schema.error.message);
    }

    if (req.body.password !== req.body.confirm_password) {
      throw createHttpError("Confirm password error");
    }

    const userExists = await userModel.findOne({ email: body.email });
    if (userExists) {
      throw createHttpError("User already exists");
    }

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(body.password, salt);
    const newUser = new userModel({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json(`Signup successfully`);
  } catch (error) {
    next(error);
  }
});

authRoute.post("/signin", async (req, res, next) => {
  try {
    const body = req.body;
    const schema = auth_signin.validate(body);
    if (schema.error) {
      throw createHttpError(schema.error.message);
    }

    const userExists = await userModel.findOne({ email: body.email });
    if (!userExists) {
      throw createHttpError("Invalid email or password");
    }

    const checkPassword = await bcryptjs.compare(
      body.password,
      userExists.password
    );
    if (!checkPassword) {
      throw createHttpError("Invalid email or password");
    }

    const accessToken = jwt.sign(
      { _id: userExists._id },
      env.jwt.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: env.jwt.JWT_ACCESS_TOKEN_EXPIRES_IN,
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: `Signin successfully`,
      result: userExists,
    });
  } catch (error) {
    next(error);
  }
});
authRoute.post("/signout", async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json(`Signout successfully`);
  } catch (error) {
    next(error);
  }
});

authRoute.get("/get-me", verifyToken, async (req, res, next) => {
  try {
    const user = req.user;

    const resData = await userModel.findById(user._id);
    res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
});
authRoute.put(
  "/update-me",
  verifyToken,
  multerConfig.single("file"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const file = req.file;

      let avatar = req.body?.avatar;
      if (file) {
        avatar = (await cloudinary_uploadFile(file, `user`)).url;
        await cloudinary_deleteFile(body.avatar, `user`);
      }

      const resData = await userModel.findByIdAndUpdate(
        user._id,
        { ...body, avatar },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Update profile successfully", data: resData });
    } catch (error) {
      next(error);
    }
  }
);
export default authRoute;
