import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import passport from "passport";
import path from "path";
import corsConfig from "./configs/cors.config.js";
import envConfig from "./configs/env.config.js";
import passportConfig from "./configs/passport.config.js";
import { errorHandle } from "./helpers/commons.js";
import routes from "./routers/index.js";
import cookieSessionConfig from "./configs/cookieSession.config.js";
import cookieSession from "cookie-session";

const app = express();
const port = envConfig.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.use(cookieSessionConfig);
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["lama"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
app.use(passport.initialize());
app.use(passport.session());

app.use(corsConfig);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

// deploy
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, `/frontend/dist`)));
app.get(`*`, async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, `frontend`, `dist`, `index.html`));
  } catch (error) {
    next(error);
  }
});

app.use(errorHandle);
