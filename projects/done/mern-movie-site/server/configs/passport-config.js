import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import env from "./env-config.js";
import userModel from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.PASSPORT.GOOGLE_CLIENT_ID,
      clientSecret: env.PASSPORT.GOOGLE_CLIENT_SECRET,
      callbackURL: env.PASSPORT.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
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
          name: body.name,
          email: body.email,
          password: hashedPassword,
          avatar: body.picture,
          provider_google: body?.sub,
        });
      }

      if (!userExists?.provider_google) {
        userExists = await userModel.findByIdAndUpdate(userExists?._id, {
          provider_google: body?.sub,
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
