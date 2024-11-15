import jwt from "jsonwebtoken";
import ENV_CONFIG from "../configs/env-config.js";

export const token_utils = {
  generateToken: (payload) => {
    return jwt.sign(payload, ENV_CONFIG.JWT.JWT_SECRET, { expiresIn: "3d" });
  },

  refreshToken: (payload) => {
    return jwt.sign(payload, ENV_CONFIG.JWT.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
  },
};
