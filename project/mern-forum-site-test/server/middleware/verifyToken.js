import jwt from "jsonwebtoken";
import env from "../config/env-config.js";
import createHttpError from "http-errors";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw createHttpError.Unauthorized("Invalid token");
    }

    jwt.verify(token, env.JWT_SECRET, (error, decode) => {
      if (error) {
        throw createHttpError.Unauthorized(error.message);
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};
