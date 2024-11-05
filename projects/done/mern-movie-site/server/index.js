import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

// import configs
import passportConfig from "./configs/passport-config.js";
import env from "./configs/env-config.js";
import { connectMongoDB } from "./configs/database-config.js";

// import helpers
import { handleError } from "./helpers/responses.js";

// import routers
import router from "./routers/index.js";

connectMongoDB();

const app = express();
app.listen(env.PORT.PORT_SERVER, () => {
  console.log(`Server running on port ${env.PORT.PORT_SERVER}`);
});
app.use(cors({ origin: [env.PORT.PORT_CLIENT_DEV], credentials: true }));
app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

// passport
app.use(
  session({
    secret: env.PASSPORT.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// router
app.use(`/api`, router);

// deploy
if (env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    try {
      const tmdbToken = env.TMDB_TOKEN;
      res.cookie("tmdbToken", tmdbToken);
      next();
    } catch (error) {
      next(error);
    }
  });

  const _dirname = path.resolve();
  app.use(express.static(path.join(_dirname, "client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
  });
}

// Error handling middleware
app.use(handleError);
