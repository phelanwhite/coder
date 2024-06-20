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
app.use(passport.initialize());
app.use(passport.session());

app.use(corsConfig);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

// deploy
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, `/frontend/build`)));
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend", "build", "index.html"));
});

app.use(errorHandle);
