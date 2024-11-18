import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import passportConfig from "./configs/passport-config.js";
import router from "./routers/index.router.js";
import { handleError } from "./helpers/responses.js";
import ENV_CONFIG from "./configs/env-config.js";
import { connectMongoDB } from "./configs/database-config.js";

connectMongoDB();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [ENV_CONFIG.URL.URL_CLIENT, `http://127.0.0.1:5500`],
  })
);
app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.listen(ENV_CONFIG.PORT.PORT_SERVER, function () {
  console.log(`Server is running on port ${ENV_CONFIG.PORT.PORT_SERVER}`);
});

// passport
app.use(
  session({
    secret: ENV_CONFIG.PASSPORT.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(`/api/v1`, router);

app.use(handleError);
