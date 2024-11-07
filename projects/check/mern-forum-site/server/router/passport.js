import { StatusCodes } from "http-status-codes";
import express from "express";
import passport from "passport";
import env from "../config/env-config.js";
import userModel from "../model/user.js";
import { authService } from "../helper/service.js";
import { handleResponse } from "../helper/response.js";
import createHttpError from "http-errors";

const passportRouter = express.Router();

// google
passportRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

passportRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: env.PORT_CLIENT,
    failureRedirect: env.PASSPORT_REDIRECT_FAILED,
  })
);

// response
passportRouter.get("/signin-passport/success", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createHttpError(`Authentication failed`);
    }

    const userExists = await userModel.findOne({
      email: req.user.email,
    });

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
      message: "User authenticated successfully",
      data: userExists,
    });
  } catch (error) {
    next(error);
  }
});

passportRouter.get("/signin-passport/failed", async (req, res, next) => {
  try {
    return handleResponse(res, {
      status: StatusCodes.UNAUTHORIZED,
      message: "Authentication failed",
    });
  } catch (error) {
    next(error);
  }
});

export default passportRouter;
