import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import env from "../configs/env-config.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      throw createHttpError.Forbidden("Invalid token");
    }

    jwt.verify(token, env.JWT.JWT_SECRET, (error, decode) => {
      if (error) {
        throw createHttpError.Forbidden(error.message);
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};
