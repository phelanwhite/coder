import express from "express";
import passportRouter from "./passport.router.js";
import authRouter from "./auth.router.js";
import blogRouter from "./blog.router.js";
import authorRouter from "./author.router.js";
import bookmarkRouter from "./bookmark.router.js";
import historyRouter from "./history.router.js";
import favoriteRouter from "./favorite.router.js";
import followRouter from "./follow.router.js";
import commentRouter from "./comment.router.js";
import adminRouter from "./admin.router.js";
import { verifyTokenAdmin } from "../middlewares/verifyToken.middleware.js";
import notificationRouter from "./notification.router.js";
import topicRouter from "./topic.router.js";
import listRouter from "./list.router.js";

const router = express.Router();

router.use(`/passport`, passportRouter);
router.use(`/auth`, authRouter);
router.use(`/blog`, blogRouter);
router.use(`/author`, authorRouter);
router.use(`/bookmark`, bookmarkRouter);
router.use(`/history`, historyRouter);
router.use(`/favorite`, favoriteRouter);
router.use(`/follow`, followRouter);
router.use(`/comment`, commentRouter);
router.use(`/notification`, notificationRouter);
router.use(`/list`, listRouter);
router.use(`/topic`, topicRouter);

router.use(`/admin`, verifyTokenAdmin, adminRouter);

export default router;
