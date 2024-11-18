export const cookies_utils = {
  saveCookie: (res, { name, value, maxAge }) => {
    res.cookie(name, value, {
      httpOnly: true,
      // secure:true,
      sameSite: "strict",
      maxAge: maxAge || 1000 * 60 * 60 * 24 * 3,
    });
  },
};
