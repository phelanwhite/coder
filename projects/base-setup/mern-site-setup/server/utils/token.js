import jwt from "jsonwebtoken";
import ENV_CONFIG from "../configs/env-config.js";

export const token_utils = {
  generateTokenJWT: async (payload) => {
    const access_token = jwt.sign(payload, ENV_CONFIG.JWT.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refresh_token = jwt.sign(payload, ENV_CONFIG.JWT.JWT_REFRESH_SECRET, {
      expiresIn: "3d",
    });
    return {
      access_token,
      refresh_token,
    };
  },
};
