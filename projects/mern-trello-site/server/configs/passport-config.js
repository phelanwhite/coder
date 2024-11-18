import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import ENV_CONFIG from "./env-config.js";
import { PROVIDER_TYPE } from "../constants/index.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV_CONFIG.PASSPORT.GOOGLE_CLIENT_ID,
      clientSecret: ENV_CONFIG.PASSPORT.GOOGLE_CLIENT_SECRET,
      callbackURL: ENV_CONFIG.PASSPORT.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      if (!profile.id) {
        throw createHttpError(`Authentication failed`);
      }

      const body = profile._json;

      let userExists = await userModel.findOne({
        email: body?.email,
      });

      if (!userExists) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(body?.sub, salt);

        userExists = await userModel.create({
          name: body?.name,
          email: body?.email,
          password: hashedPassword,
          avatar: body?.picture,
          provider: [
            {
              provider_type: PROVIDER_TYPE.GOOGLE,
              provider_id: body?.sub,
            },
          ],
        });
      }

      if (
        !userExists?.provider?.find(
          (item) => item?.provider_type === PROVIDER_TYPE.GOOGLE
        )
      ) {
        userExists = await userModel.findByIdAndUpdate(userExists?._id, {
          $push: {
            provider: {
              provider_type: PROVIDER_TYPE.GOOGLE,
              provider_id: body?.sub,
            },
          },
        });
      }

      return done(null, userExists);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;
