import express from "express";
import authRouter from "./auth.router.js";
import uploadRouter from "./upload.router.js";
import passportRouter from "./passport.router.js";
import postRouter from "./post.router.js";

const rootRouter = express();

rootRouter.use("/upload", uploadRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/passport", passportRouter);

rootRouter.use("/post", postRouter);

export default rootRouter;
