import { StatusCodes } from "http-status-codes";
import express from "express";
import passport from "passport";
import createHttpError from "http-errors";
import env from "../configs/env-config.js";
import userModel from "../models/user.model.js";
import { authService, cookiesService } from "../helpers/services.js";
import { handleResponse } from "../helpers/responses.js";

const PORT_CLIENT =
  env.NODE_ENV === "production"
    ? env.PORT.PORT_CLIENT_PRODUCTION
    : env.PORT.PORT_CLIENT_DEV;

const passportRouter = express.Router();

// google
passportRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

passportRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: PORT_CLIENT,
    failureRedirect: env.PASSPORT.PASSPORT_REDIRECT_FAILED,
  })
);

// response
passportRouter.get("/signin-passport/success", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createHttpError.Unauthorized(`Authentication failed`);
    }

    const userExists = await userModel.findOne({
      email: req.user.email,
    });

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
