import jwt from "jsonwebtoken";
import envConfig from "../configs/env.config.js";
import createHttpError from "http-errors";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1];
    if (!token) {
      throw createHttpError.Forbidden(`Token is required`);
    }
    jwt.verify(token, envConfig.JWT_SECRET, function (err, decoded) {
      if (err) {
        throw createHttpError.Unauthorized(err.message);
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};
