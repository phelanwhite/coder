import express from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware.js";
import postRouter from "./post.router.js";
import historyRouter from "./history.router.js";
import bookmarkRouter from "./bookmark.router.js";
import favoriteRouter from "./favorite.router.js";
import authorRouter from "./author.router.js";
import followRouter from "./follow.router.js";

const apiRouter = express();

apiRouter.use("/author", authorRouter);
apiRouter.use("/post", postRouter);
apiRouter.use("/history", verifyToken, historyRouter);
apiRouter.use("/bookmark", verifyToken, bookmarkRouter);
apiRouter.use("/favorite", verifyToken, favoriteRouter);
apiRouter.use("/follow", verifyToken, followRouter);

export default apiRouter;
