import passportConfig from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import envConfig from "./env.config.js";

const GOOGLE_CLIENT_ID = envConfig.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = envConfig.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = envConfig.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = envConfig.GITHUB_CLIENT_SECRET;

const FACEBOOK_APP_ID = envConfig.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = envConfig.FACEBOOK_APP_SECRET;

passportConfig.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        done(null, profile);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passportConfig.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passportConfig.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passportConfig.serializeUser((user, done) => {
  done(null, user);
});

passportConfig.deserializeUser((user, done) => {
  done(null, user);
});

export default passportConfig;
