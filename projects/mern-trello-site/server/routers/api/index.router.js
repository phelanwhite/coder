import express from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware.js";
import authRouter from "./auth.router.js";
import uploadRouter from "./upload.router.js";
import passportRouter from "./passport.router.js";
import boardRouter from "./board.router.js";
import columnRouter from "./column.router.js";
import taskRouter from "./task.router.js";
import actionRouter from "./action.router.js";

const rootRouter = express();

rootRouter.use("/upload", uploadRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/passport", passportRouter);

rootRouter.use("/board", verifyToken, boardRouter);
rootRouter.use("/column", verifyToken, columnRouter);
rootRouter.use("/task", verifyToken, taskRouter);
rootRouter.use("/action", verifyToken, actionRouter);

export default rootRouter;
