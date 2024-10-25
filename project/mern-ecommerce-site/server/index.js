import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import passportConfig from "./config/passport-config.js";
import env from "./config/env-config.js";
import { handleError } from "./helper/response.js";
import router from "./router/index.js";
import connectMongoDB from "./config/db-config.js";

connectMongoDB();
const app = express();
app.listen(env.PORT_SERVER, () => {
  console.log(`Server is running on port ${env.PORT_SERVER}`);
});
app.use(
  cors({
    credentials: true,
    origin: [env.PORT_CLIENT],
  })
);
app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
// passport
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(`/api`, router);

// deploy
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, `/client/dist`)));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.use(handleError);
