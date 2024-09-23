import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectMongoDB from "./config/db-config.js";
import env from "./config/env-config.js";
import { handleError } from "./helper/response.js";
import passportConfig from "./config/passport-config.js";
import passport from "passport";
import session from "express-session";
import path from "path";
import router from "./router/index.js";
import passportRouter from "./router/passport.js";
import authRouter from "./router/auth.js";

connectMongoDB();
const app = express();
app.listen(env.PORT_SERVER, () => {
  console.log(`Server is running on port ${env.PORT_SERVER}`);
});

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

app.use(
  cors({
    credentials: true,
    origin: [env.PORT_CLIENT],
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// app.use(`/auth`, authRouter);
// app.use(`/passport`, passportRouter);
app.use(router);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, `/public`)));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use(handleError);
