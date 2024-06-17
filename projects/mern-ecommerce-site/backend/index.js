import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoute from "./routes/auth.route.js";

import { errorHandle } from "./helpers/commons.js";
import commonRoute from "./routes/common.route.js";

const port = process.env.PORT;
const app = express();
app.use(
  cors({
    credentials: true,
    origin: [`http://localhost:3000`],
    // origin: "*",
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

app.use("/auth", authRoute);
app.use("/common", commonRoute);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(errorHandle);
