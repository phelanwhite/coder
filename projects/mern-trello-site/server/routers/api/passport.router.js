import { StatusCodes } from "http-status-codes";
import express from "express";
import passport from "passport";
import createHttpError from "http-errors";
import ENV_CONFIG from "../../configs/env-config.js";
import userModel from "../../models/user.model.js";
import { token_utils } from "../../utils/token.js";
import { cookies_utils } from "../../utils/cookie.js";
import { handleResponse } from "../../helpers/responses.js";

const passportRouter = express.Router();

// google
passportRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
passportRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: ENV_CONFIG.PASSPORT.PASSPORT_REDIRECT_SUCCESS,
    failureRedirect: ENV_CONFIG.PASSPORT.PASSPORT_REDIRECT_FAILED,
  })
);

// response
passportRouter.get("/signin-passport/success", async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw createHttpError.Unauthorized(`Authentication failed`);
    }

    const userExists = await userModel.findOne({
      email: user.email,
    });

    // save token in cookie
    const access_token = token_utils.generateToken({
      _id: userExists._id,
      role: userExists.role,
    });

    cookies_utils.saveCookie(res, {
      name: "access_token",
      value: access_token,
    });

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
