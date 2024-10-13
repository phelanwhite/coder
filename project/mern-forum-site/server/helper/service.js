import jwt from "jsonwebtoken";
import env from "../config/env-config.js";

export const authService = {
  generateToken: (data, expiresIn) => {
    const token = jwt.sign({ ...data }, env.JWT_SECRET, {
      expiresIn: expiresIn || "1d",
    });
    return token;
  },
};
