import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import corsConfig from "./configs/cors.config.js";
import envConfig from "./configs/env.config.js";
import { errorHandle } from "./helpers/commons.js";
import routes from "./routers/index.js";

const app = express();
const port = envConfig.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
app.use(corsConfig);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

app.use(errorHandle);
