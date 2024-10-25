import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import env from "../config/env-config.js";
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

export const verifyTokenAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw createHttpError.Unauthorized("Invalid token");
    }

    jwt.verify(token, env.JWT_SECRET, (error, decode) => {
      if (error) {
        throw createHttpError.Unauthorized(error.message);
      }

      if (decode?.role !== "admin") {
        throw createHttpError.Forbidden("Unauthorized to access this resource");
      }
      req.user = decode;
      req.admin = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};
