import tokenModel from "../models/token.model.js";

export const cookies_utils = {
  saveCookie: (res, { name, value, maxAge }) => {
    res.cookie(name, value, {
      httpOnly: true,
      // secure:true,
      sameSite: "strict",
      maxAge: maxAge || 1000 * 60 * 60 * 24 * 3, //3day
    });
  },
  saveTokenJWT: async (res, { access_token, refresh_token }) => {
    res.cookie(`access_token`, access_token, {
      httpOnly: true,
      // secure:true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 3,
    });
    res.cookie(`refresh_token`, refresh_token, {
      httpOnly: true,
      // secure:true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 30,
    });
    await tokenModel.create({
      token: refresh_token,
    });
  },
};
